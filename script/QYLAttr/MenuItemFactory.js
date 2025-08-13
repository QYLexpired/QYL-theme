import { MenuData } from './MenuData.js';
import { getFile } from '../basic/API.js';
import { QYLSelfConfigAttr } from './QYLSelfConfigAttr.js';
import { QYLTimeAttr } from './QYLTimeAttr.js';
export const QYLAttrHighlightManager = {
    items: new Set(),
    refreshTimeouts: new Map(), 
    register(el, selectid, attrName, updateFn) {
        this.items.add({ el, selectid, attrName, updateFn });
    },
    unregister(el) {
        for (const item of this.items) {
            if (item.el === el) {
                this.items.delete(item);
                break;
            }
        }
    },
    clearBySelectId(selectid) {
        const itemsToRemove = [];
        for (const item of this.items) {
            if (item.selectid === selectid) {
                itemsToRemove.push(item);
            }
        }
        itemsToRemove.forEach(item => this.items.delete(item));
        if (this.refreshTimeouts.has(selectid)) {
            clearTimeout(this.refreshTimeouts.get(selectid));
            this.refreshTimeouts.delete(selectid);
        }
    },
    clearAll() {
        this.items.clear();
        this.refreshTimeouts.forEach(timeout => clearTimeout(timeout));
        this.refreshTimeouts.clear();
    },
    async refreshBySelectId(selectid) {
        if (this.refreshTimeouts.has(selectid)) {
            clearTimeout(this.refreshTimeouts.get(selectid));
        }
        const timeoutId = setTimeout(async () => {
            const itemsForSelectId = Array.from(this.items).filter(item => item.selectid === selectid);
            if (itemsForSelectId.length === 0) return;
            const attrSet = new Set();
            itemsForSelectId.forEach(item => attrSet.add(item.attrName));
            const api = itemsForSelectId[0].el._QYLAttrAPI || null;
            if (!api) return;
            try {
                const attrs = await api.getBlockAttributes(selectid, Array.from(attrSet));
                const results = attrs || {};
                itemsForSelectId.forEach(item => {
                    try {
                        item.updateFn(results[item.attrName]);
                    } catch (error) {
                    }
                });
            } catch (error) {
            }
            this.refreshTimeouts.delete(selectid);
        }, 50); 
        this.refreshTimeouts.set(selectid, timeoutId);
    },
    async refreshBySelectIdImmediate(selectid) {
        const itemsForSelectId = Array.from(this.items).filter(item => item.selectid === selectid);
        if (itemsForSelectId.length === 0) return;
        const attrSet = new Set();
        itemsForSelectId.forEach(item => attrSet.add(item.attrName));
        const api = itemsForSelectId[0].el._QYLAttrAPI || null;
        if (!api) return;
        try {
            const attrs = await api.getBlockAttributes(selectid, Array.from(attrSet));
            const results = attrs || {};
            itemsForSelectId.forEach(item => {
                try {
                    item.updateFn(results[item.attrName]);
                } catch (error) {
                }
            });
        } catch (error) {
        }
    },
    async refreshAll() {
        if (this.items.size === 0) return;
        const idAttrMap = {};
        for (const item of this.items) {
            if (!idAttrMap[item.selectid]) idAttrMap[item.selectid] = new Set();
            idAttrMap[item.selectid].add(item.attrName);
        }
        const allResults = {};
        const api = this.items.values().next().value.el._QYLAttrAPI || null;
        if (!api) return;
        for (const [selectid, attrSet] of Object.entries(idAttrMap)) {
            try {
                const attrs = await api.getBlockAttributes(selectid, Array.from(attrSet));
                allResults[selectid] = attrs || {};
            } catch (error) {
                allResults[selectid] = {};
            }
        }
        for (const item of this.items) {
            try {
                const attrs = allResults[item.selectid] || {};
                item.updateFn(attrs[item.attrName]);
            } catch (error) {
            }
        }
    }
};
export class MenuItemFactory {
    constructor(i18n, api) {
        this.i18n = i18n;
        this.api = api;
        this.menuData = new MenuData();
        this.selfConfigAttr = new QYLSelfConfigAttr(i18n, api, QYLAttrHighlightManager);
        this.timeAttr = new QYLTimeAttr(i18n, api, this.selfConfigAttr);
        this.timeAttr.setMenuData(this.menuData);
        QYLAttrHighlightManager.clearAll();
        if (typeof window !== 'undefined') {
            window.QYLAttrMenuFactory = this;
        }
    }
    createSubmenu(id, items) {
        const div = document.createElement("div");
        div.id = id;
        div.className = "b3-menu__submenu";
        div.appendChild(this.createSubmenuItemsWithSeparators(items));
        return div;
    }
    createSubmenuItems(items) {
        const div = document.createElement("div");
        div.className = "b3-menu__items";
        items.forEach(item => div.appendChild(item));
        return div;
    }
    createSeparator() {
        const separator = document.createElement("button");
        separator.className = "b3-menu__separator";
        separator.disabled = true;
        return separator;
    }
    createSubmenuItemsWithSeparators(items) {
        const div = document.createElement("div");
        div.className = "b3-menu__items";
        const sortedItems = this.sortItemsByGroup(items);
        let currentGroup = null;
        sortedItems.forEach((item, index) => {
            const itemGroup = item.getAttribute('data-group');
            if (itemGroup && itemGroup !== currentGroup && currentGroup !== null) {
                div.appendChild(this.createSeparator());
            }
            div.appendChild(item);
            currentGroup = itemGroup;
        });
        return div;
    }
    sortItemsByGroup(items) {
        const groupOrder = [
            'group1', 'group2', 'group3', 'group4', 'group5', 'group6', 'group7', 'group8', 'group9', 'group10',
            'config-options', 'edit-config' 
        ];
        return items.sort((a, b) => {
            const groupA = a.getAttribute('data-group');
            const groupB = b.getAttribute('data-group');
            if (!groupA && !groupB) {
                return 0;
            }
            if (!groupA) return 1;
            if (!groupB) return -1;
            const indexA = groupOrder.indexOf(groupA);
            const indexB = groupOrder.indexOf(groupB);
            if (indexA === -1 && indexB === -1) {
                return groupA.localeCompare(groupB);
            }
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });
    }
    createMenuItemWithSubmenu(label, icon, submenu, group = null) {
        const button = document.createElement("button");
        button.className = "b3-menu__item";
        button.innerHTML = `
            <svg class="b3-menu__icon" style="null"><use xlink:href="${icon}"></use></svg>
            <span class="b3-menu__label" style="">${label}</span>
            <svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg>
        `;
        if (group) {
            button.innerHTML += `<span class="b3-menu__accelerator">${group}</span>`;
        }
        button.appendChild(submenu);
        return button;
    }
    createMenuItem(label, icon, attrName, attrValue, group = null, isWarning = false, selectid = "") {
        const button = document.createElement("button");
        button.className = "b3-menu__item";
        if (isWarning) {
            button.className += " b3-menu__item--warning";
            button.style.color = "var(--b3-theme-error)";
        }
        button.setAttribute("data-QYL-attr-id", selectid);
        button.setAttribute("custom-attr-name", attrName);
        button.setAttribute("custom-attr-value", attrValue);
        let displayGroup = group;
        let dataGroup = group;
        if (group && this.i18n[group]) {
            displayGroup = this.i18n[group];
        }
        if (dataGroup) {
            button.setAttribute("data-group", dataGroup);
        }
        button.innerHTML = `
            <svg class="b3-menu__icon" style=""><use xlink:href="${icon}"></use></svg>
            <span class="b3-menu__label">${label}</span>
        `;
        if (displayGroup) {
            button.innerHTML += `<span class="b3-menu__accelerator">${displayGroup}</span>`;
        }
        const attrFullName = 'custom-' + attrName;
        const updateActiveClass = (currentValue) => {
            if (
                attrValue !== "" &&
                currentValue === attrValue
            ) {
                button.classList.add('QYLAttrActive');
            } else {
                button.classList.remove('QYLAttrActive');
            }
            const updateParentHighlights = (element) => {
                let ancestor = element.parentElement;
                while (ancestor) {
                    if (ancestor.classList.contains('b3-menu__item') && ancestor.querySelector('.b3-menu__submenu')) {
                        const submenu = ancestor.querySelector('.b3-menu__submenu');
                        const hasActiveChild = submenu.querySelector('.QYLAttrActive') !== null || 
                                             (submenu.querySelector('textarea.QYLcssinput') && 
                                              submenu.querySelector('textarea.QYLcssinput').getAttribute('custom-attr-value') && 
                                              submenu.querySelector('textarea.QYLcssinput').getAttribute('custom-attr-value').trim() !== '');
                        if (hasActiveChild) {
                            ancestor.classList.add('QYLAttrActiveMenu');
                        } else {
                            ancestor.classList.remove('QYLAttrActiveMenu');
                        }
                    }
                    ancestor = ancestor.parentElement;
                }
            };
            updateParentHighlights(button);
        };
        button._QYLAttrUpdateActiveClass = updateActiveClass;
        button._QYLAttrAPI = this.api;
        QYLAttrHighlightManager.register(button, selectid, attrFullName, updateActiveClass);
        const selfRemoveObserver = new MutationObserver(() => {
            if (!button.isConnected) {
                QYLAttrHighlightManager.unregister(button);
                selfRemoveObserver.disconnect();
            }
        });
        selfRemoveObserver.observe(document.body, { subtree: true, childList: true });
        button._QYLAttrSelfRemoveObserver = selfRemoveObserver;
        button.onclick = async (e) => {
            const isActive = button.classList.contains('QYLAttrActive');
            const id = button.getAttribute("data-QYL-attr-id");
            const attrNameFull = 'custom-' + button.getAttribute("custom-attr-name");
            try {
                if (isActive) {
                    await this.api.setCustomAttribute(id, attrNameFull, '');
                    try {
                        await this.selfConfigAttr.showNotification(this.i18n.attrCanceled);
                    } catch (error) {
                    }
                } else {
                    await this.selfConfigAttr.QYLcustomattrset(e);
                    try {
                        await this.selfConfigAttr.showNotification(this.i18n.attrSetSuccess);
                    } catch (error) {
                    }
                }
                await QYLAttrHighlightManager.refreshBySelectIdImmediate(id);
            } catch (error) {
            }
        };
        return button;
    }
    createCSSItem(selectid) {
        const submenu = this.createSubmenu("QYLattrcsssub", [
            this.createCSSTextarea(selectid)
        ]);
        return this.createMenuItemWithSubmenu("CSS", "#iconSettings", submenu);
    }
    createCSSTextarea(selectid) {
        const div = document.createElement("div");
        div.className = "b3-menu__items";
        div.style.padding = "2px 10px";
        const textarea = document.createElement("textarea");
        textarea.className = "b3-text-field QYLcssinput";
        textarea.style.height = "150px";
        textarea.style.width = "550px";
        textarea.style.color = "var(--b3-theme-on-surface)";
        textarea.setAttribute("spellcheck", "false");
        textarea.setAttribute("data-QYL-attr-id", selectid);
        textarea.setAttribute("custom-attr-name", "css");
        textarea.value = "";
        textarea.placeholder = this.i18n.CSSplaceholder;
        const updateCSSActiveClass = (currentValue) => {
            const updateParentHighlights = (element) => {
                let ancestor = element.parentElement;
                while (ancestor) {
                    if (ancestor.classList.contains('b3-menu__item') && ancestor.querySelector('.b3-menu__submenu')) {
                        const submenu = ancestor.querySelector('.b3-menu__submenu');
                        const hasActiveChild = submenu.querySelector('.QYLAttrActive') !== null || 
                                             (submenu.querySelector('textarea.QYLcssinput') && 
                                              submenu.querySelector('textarea.QYLcssinput').getAttribute('custom-attr-value') && 
                                              submenu.querySelector('textarea.QYLcssinput').getAttribute('custom-attr-value').trim() !== '');
                        if (hasActiveChild) {
                            ancestor.classList.add('QYLAttrActiveMenu');
                        } else {
                            ancestor.classList.remove('QYLAttrActiveMenu');
                        }
                    }
                    ancestor = ancestor.parentElement;
                }
            };
            updateParentHighlights(textarea);
        };
        textarea._QYLCSSUpdateActiveClass = updateCSSActiveClass;
        textarea._QYLAttrAPI = this.api;
        QYLAttrHighlightManager.register(textarea, selectid, 'custom-css', updateCSSActiveClass);
        this.api.queryCSSAttribute(selectid).then(customcssvalue => {
            if (customcssvalue) {
                textarea.value = customcssvalue;
                textarea.setAttribute("custom-attr-value", customcssvalue);
            } else {
                textarea.setAttribute("custom-attr-value", "");
            }
            updateCSSActiveClass(customcssvalue);
        });
        textarea.addEventListener('blur', async (e) => {
            const value = e.target.value;
            const originalValue = e.target.getAttribute("custom-attr-value");
            e.target.setAttribute("custom-attr-value", value);
            try {
                await this.selfConfigAttr.QYLcustomattrset({ currentTarget: e.target });
                if (value !== originalValue) {
                    try {
                        if (value.trim() === '') {
                            await this.selfConfigAttr.showNotification(this.i18n.cssAttrCanceled);
                        } else {
                            await this.selfConfigAttr.showNotification(this.i18n.cssAttrSetSuccess);
                        }
                    } catch (error) {
                    }
                }
                const selectid = e.target.getAttribute("data-QYL-attr-id");
                await QYLAttrHighlightManager.refreshBySelectIdImmediate(selectid);
            } catch (error) {
            }
        });
        const selfRemoveObserver = new MutationObserver(() => {
            if (!textarea.isConnected) {
                QYLAttrHighlightManager.unregister(textarea);
                selfRemoveObserver.disconnect();
            }
        });
        selfRemoveObserver.observe(document.body, { subtree: true, childList: true });
        textarea._QYLCSSSelfRemoveObserver = selfRemoveObserver;
        div.appendChild(textarea);
        return div;
    }
    createColsBGapItem(selectid) {
        const items = [
            ...this.menuData.colsBGapOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrcolsbgapsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.colsbgap, "#iconSuper", submenu);
    }
    createRowsBGapItem(selectid) {
        const items = [
            ...this.menuData.rowsBGapOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrrowsbgapsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.rowsbgap, "#iconSuper", submenu);
    }
    createListViewItem(selectid) {
        const items = [
            ...this.menuData.listViewOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrlistviewsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.listview, "#iconList", submenu);
    }
    createLineHeightItem(selectid) {
        const items = [
            ...this.menuData.lineHeightOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrlineheightsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.lineheight, "#iconContract", submenu);
    }
    createBlankBlockRemindItem(selectid) {
        const items = [
            ...this.menuData.blankBlockRemindOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrblankblockremindsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blankblockremind, "#iconInfo", submenu);
    }
    createFlashCardItem(selectid) {
        const items = [
            ...this.menuData.flashCardOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrflashcardsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.flashcard, "#iconRiffCard", submenu);
    }
    createTableStyleItem(selectid) {
        const items = [
            ...this.menuData.tableOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrtablestylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.tablestyle, "#iconTable", submenu);
    }
    createHeadingStyleItem(selectid) {
        const items = [
            ...this.menuData.headingStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrhstylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.headingstyle, "#iconHeadings", submenu);
    }
    createImgStyleItem(selectid) {
        const items = [
            ...this.menuData.imgStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrimgsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.imgstyle, "#iconImage", submenu);
    }
    createHeightItem(selectid) {
        const items = [
            ...this.menuData.heightOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrheightsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.maxheight, "#iconContract", submenu);
    }
    createFileStyleItem(selectid) {
        const items = [
            ...this.menuData.fileStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrfilestylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.fileblockstyle, "#iconTheme", submenu);
    }
    createBlockStyleItem(selectid) {
        const items = [
            ...this.menuData.blockStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            ),
            this.createWarningSubmenu(selectid),
            this.createTipSubmenu(selectid),
            this.createInfoSubmenu(selectid),
            this.createImportantSubmenu(selectid),
            this.createCommentSubmenu(selectid),
            this.createQuoteSubmenu(selectid),
            this.createTodoSubmenu(selectid),
            this.createDoneSubmenu(selectid),
            this.createNoteSubmenu(selectid),
            this.createLeftBorderSubmenu(selectid)
        ];
        const submenu = this.createSubmenu("QYLattrstylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstyle, "#iconTheme", submenu);
    }
    createNoteSubmenu(selectid) {
        const items = this.menuData.noteColorOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
        );
        const submenu = this.createSubmenu("QYLstylenotesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstylenote, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.noteSubmenu.group]);
    }
    createLeftBorderSubmenu(selectid) {
        const items = this.menuData.leftBorderColorOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
        );
        const submenu = this.createSubmenu("QYLstyleleftbordersub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstyleleftborder, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.leftBorderSubmenu.group]);
    }
    createWarningSubmenu(selectid) {
        const items = this.menuData.warningStyleOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
        );
        const submenu = this.createSubmenu("QYLstylewarningsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstylewarning, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.warningSubmenu.group]);
    }
    createTipSubmenu(selectid) {
        const items = this.menuData.tipStyleOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
        );
        const submenu = this.createSubmenu("QYLstyletipsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstyletip, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.tipSubmenu.group]);
    }
    createInfoSubmenu(selectid) {
        const items = this.menuData.infoStyleOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
        );
        const submenu = this.createSubmenu("QYLstyleinfosub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstyleinfo, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.infoSubmenu.group]);
    }
    createImportantSubmenu(selectid) {
        const items = this.menuData.importantStyleOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
        );
        const submenu = this.createSubmenu("QYLstyleimportantsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstyleimportant, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.importantSubmenu.group]);
    }
    createCommentSubmenu(selectid) {
        const items = this.menuData.commentStyleOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
        );
        const submenu = this.createSubmenu("QYLstylecommentsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstylecomment, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.commentSubmenu.group]);
    }
    createQuoteSubmenu(selectid) {
        const items = this.menuData.quoteStyleOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
        );
        const submenu = this.createSubmenu("QYLstylequotesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstylequote, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.quoteSubmenu.group]);
    }
    createTodoSubmenu(selectid) {
        const items = this.menuData.todoStyleOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
        );
        const submenu = this.createSubmenu("QYLstyletodosub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstyletodo, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.todoSubmenu.group]);
    }
    createDoneSubmenu(selectid) {
        const items = this.menuData.doneStyleOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
        );
        const submenu = this.createSubmenu("QYLstyledonesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstyledone, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.doneSubmenu.group]);
    }
    createFontFamilyItem(selectid) {
        const items = [
            ...this.menuData.fontOptions.map(option => {
                const button = this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid);
                button.style.fontFamily = option.fontFamily;
                return button;
            })
        ];
        const submenu = this.createSubmenu("QYLattrfontfamilysub", items);
        return this.createMenuItemWithSubmenu(this.i18n.fontfamily, "#iconFont", submenu);
    }
    createCalloutColorItem(selectid) {
        const items = [
            ...this.menuData.calloutOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrbqcalloutcolorsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.calloutcolor, "#iconQuote", submenu);
    }
    createTimeItem(selectid) {
        const items = this.timeAttr.createTimeItem(selectid, this.menuData);
        const submenu = this.createSubmenu("QYLattrtimesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.time, "#iconClock", submenu);
    }
    async createSelfConfigAttrItem(selectid, menuType = 'all') {
        return await this.selfConfigAttr.createSelfConfigAttrItem(selectid, menuType);
    }
}
export function destroyMenuObservers(menuRoot) {
    if (!menuRoot) return;
    const selectIds = new Set();
    menuRoot.querySelectorAll('button, textarea').forEach(el => {
        const selectid = el.getAttribute('data-QYL-attr-id');
        if (selectid) {
            selectIds.add(selectid);
        }
    });
    selectIds.forEach(selectid => {
        QYLAttrHighlightManager.clearBySelectId(selectid);
    });
    menuRoot.querySelectorAll('button').forEach(btn => {
        if (btn._QYLAttrSelfRemoveObserver) {
            btn._QYLAttrSelfRemoveObserver.disconnect();
            btn._QYLAttrSelfRemoveObserver = null;
        }
        QYLAttrHighlightManager.unregister(btn);
        if (btn._QYLSelfConfigAttrNames) {
            btn._QYLSelfConfigAttrNames = null;
        }
        if (btn._QYLSelfConfigActiveAttrs) {
            btn._QYLSelfConfigActiveAttrs.clear();
            btn._QYLSelfConfigActiveAttrs = null;
        }
    });
    menuRoot.querySelectorAll('textarea.QYLcssinput').forEach(textarea => {
        if (textarea._QYLCSSSelfRemoveObserver) {
            textarea._QYLCSSSelfRemoveObserver.disconnect();
            textarea._QYLCSSSelfRemoveObserver = null;
        }
        QYLAttrHighlightManager.unregister(textarea);
    });
}
(function autoDestroyQYLAttrObservers() {
    const setupObserver = () => {
        const menuRoot = document.getElementById('QYLattr');
        if (menuRoot && menuRoot.parentNode) {
            const parent = menuRoot.parentNode;
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    mutation.removedNodes.forEach(node => {
                        if (node === menuRoot) {
                            destroyMenuObservers(menuRoot);
                            observer.disconnect();
                            setTimeout(setupObserver, 0);
                        }
                    });
                });
            });
            observer.observe(parent, { childList: true });
        } else {
            setTimeout(setupObserver, 300);
        }
    };
    setupObserver();
})();
export async function QYLAttrInitialUpdateAll(menuRoot) {
    if (!menuRoot) return;
    setTimeout(async () => {
        try {
            await QYLAttrHighlightManager.refreshAll();
        } catch (error) {
        }
    }, 100);
}
export async function QYLAttrRefreshBySelectId(selectid) {
    await QYLAttrHighlightManager.refreshBySelectId(selectid);
}
export async function QYLAttrRefreshBySelectIdImmediate(selectid) {
    await QYLAttrHighlightManager.refreshBySelectIdImmediate(selectid);
}
export function QYLAttrClearBySelectId(selectid) {
    QYLAttrHighlightManager.clearBySelectId(selectid);
}
export function QYLAttrGlobalCleanup() {
    QYLAttrHighlightManager.clearAll();
}
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
        QYLAttrGlobalCleanup();
    });
}
