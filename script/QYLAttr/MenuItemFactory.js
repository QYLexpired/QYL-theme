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
        div.appendChild(this.createSubmenuItems(items));
        return div;
    }
    createSubmenuItems(items) {
        const div = document.createElement("div");
        div.className = "b3-menu__items";
        items.forEach(item => div.appendChild(item));
        return div;
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
        button.innerHTML = `
            <svg class="b3-menu__icon" style=""><use xlink:href="${icon}"></use></svg>
            <span class="b3-menu__label">${label}</span>
        `;
        if (group) {
            button.innerHTML += `<span class="b3-menu__accelerator">${group}</span>`;
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
            let ancestor = button.parentElement;
            while (ancestor && !ancestor.classList.contains('b3-menu__item')) {
                ancestor = ancestor.parentElement;
            }
            if (ancestor && ancestor !== button) {
                if (ancestor.querySelector('.QYLAttrActive')) {
                    ancestor.classList.add('QYLAttrActiveMenu');
                } else {
                    ancestor.classList.remove('QYLAttrActiveMenu');
                }
            }
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
            let ancestor = textarea.parentElement;
            while (ancestor && !ancestor.classList.contains('b3-menu__item')) {
                ancestor = ancestor.parentElement;
            }
            if (currentValue && currentValue.trim() !== "") {
                if (ancestor && ancestor !== textarea) {
                    ancestor.classList.add('QYLAttrActiveMenu');
                }
            } else {
                if (ancestor && ancestor !== textarea) {
                    ancestor.classList.remove('QYLAttrActiveMenu');
                }
            }
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
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrcolsbgapsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.colsbgap, "#iconSuper", submenu);
    }
    createRowsBGapItem(selectid) {
        const items = [
            ...this.menuData.rowsBGapOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrrowsbgapsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.rowsbgap, "#iconSuper", submenu);
    }
    createListViewItem(selectid) {
        const items = [
            ...this.menuData.listViewOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrlistviewsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.listview, "#iconList", submenu);
    }
    createLineHeightItem(selectid) {
        const items = [
            ...this.menuData.lineHeightOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrlineheightsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.lineheight, "#iconContract", submenu);
    }
    createBlankBlockRemindItem(selectid) {
        const items = [
            ...this.menuData.blankBlockRemindOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group ? this.i18n[option.group] : null, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrblankblockremindsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blankblockremind, "#iconInfo", submenu);
    }
    createFlashCardItem(selectid) {
        const items = [
            ...this.menuData.flashCardOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, option.group ? this.i18n[option.group] : null, false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrflashcardsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.flashcard, "#iconRiffCard", submenu);
    }
    createTableStyleItem(selectid) {
        const items = [
            ...this.menuData.tableOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrtablestylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.tablestyle, "#iconTable", submenu);
    }
    createHeadingStyleItem(selectid) {
        const items = [
            ...this.menuData.headingStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrhstylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.headingstyle, "#iconHeadings", submenu);
    }
    createImgStyleItem(selectid) {
        const items = [
            ...this.menuData.imgStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrimgsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.imgstyle, "#iconImage", submenu);
    }
    createHeightItem(selectid) {
        const items = [
            ...this.menuData.heightOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrheightsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.maxheight, "#iconContract", submenu);
    }
    createFileStyleItem(selectid) {
        const items = [
            ...this.menuData.fileStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            )
        ];
        const submenu = this.createSubmenu("QYLattrfilestylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.fileblockstyle, "#iconTheme", submenu);
    }
    createBlockStyleItem(selectid) {
        const items = [
            ...this.menuData.blockStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            ),
            this.createNoteSubmenu(selectid),
            this.createLeftBorderSubmenu(selectid)
        ];
        const submenu = this.createSubmenu("QYLattrstylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstyle, "#iconTheme", submenu);
    }
    createNoteSubmenu(selectid) {
        const items = this.menuData.noteColorOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
        );
        const submenu = this.createSubmenu("QYLstylenotesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstylenote, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.noteSubmenu.group]);
    }
    createLeftBorderSubmenu(selectid) {
        const items = this.menuData.leftBorderColorOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
        );
        const submenu = this.createSubmenu("QYLstyleleftbordersub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstyleleftborder, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.leftBorderSubmenu.group]);
    }
    createFontFamilyItem(selectid) {
        const items = [
            ...this.menuData.fontOptions.map(option => {
                const button = this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid);
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
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
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
