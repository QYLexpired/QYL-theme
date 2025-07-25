import { MenuData } from './MenuData.js';
const QYLAttrHighlightManager = {
    items: new Set(), 
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
    async refreshAll() {
        const idAttrMap = {};
        for (const item of this.items) {
            if (!idAttrMap[item.selectid]) idAttrMap[item.selectid] = new Set();
            idAttrMap[item.selectid].add(item.attrName);
        }
        const allResults = {};
        const api = this.items.size > 0 ? (this.items.values().next().value.el._QYLAttrAPI || null) : null;
        if (!api) return;
        for (const [selectid, attrSet] of Object.entries(idAttrMap)) {
            try {
                const attrs = await api.getBlockAttributes(selectid, Array.from(attrSet));
                allResults[selectid] = attrs || {};
            } catch {
                allResults[selectid] = {};
            }
        }
        for (const item of this.items) {
            const attrs = allResults[item.selectid] || {};
            item.updateFn(attrs[item.attrName]);
        }
    }
};
export class MenuItemFactory {
    constructor(i18n, api) {
        this.i18n = i18n;
        this.api = api;
        this.menuData = new MenuData();
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
        button.setAttribute("data-node-id", selectid);
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
            const id = button.getAttribute("data-node-id");
            const attrNameFull = 'custom-' + button.getAttribute("custom-attr-name");
            if (isActive) {
                await this.api.setCustomAttribute(id, attrNameFull, '');
            } else {
                await this.QYLcustomattrset(e);
            }
            await QYLAttrHighlightManager.refreshAll();
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
        textarea.setAttribute("data-node-id", selectid);
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
            e.target.setAttribute("custom-attr-value", value);
            await this.QYLcustomattrset({ currentTarget: e.target });
            await QYLAttrHighlightManager.refreshAll();
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
                this.createMenuItem(this.i18n[option.label], option.icon, this.menuData.attrNameConfig.colsBGap, option.value, this.i18n[option.group], false, selectid)
            ),
            (() => {
                const config = this.menuData.clearButtonConfig.colsBGap;
                const btn = this.createMenuItem(this.i18n[this.menuData.deleteButtonConfig.label], this.menuData.deleteButtonConfig.icon, config.attrName, "", this.menuData.deleteButtonConfig.group ? this.i18n[this.menuData.deleteButtonConfig.group] : null, this.menuData.deleteButtonConfig.isWarning, selectid);
                btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                return btn;
            })()
        ];
        const submenu = this.createSubmenu("QYLattrcolsbgapsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.colsbgap, "#iconSuper", submenu);
    }
    createRowsBGapItem(selectid) {
        const items = [
            ...this.menuData.rowsBGapOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, this.menuData.attrNameConfig.rowsBGap, option.value, this.i18n[option.group], false, selectid)
            ),
            (() => {
                const config = this.menuData.clearButtonConfig.rowsBGap;
                const btn = this.createMenuItem(this.i18n[this.menuData.deleteButtonConfig.label], this.menuData.deleteButtonConfig.icon, config.attrName, "", this.menuData.deleteButtonConfig.group ? this.i18n[this.menuData.deleteButtonConfig.group] : null, this.menuData.deleteButtonConfig.isWarning, selectid);
                btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                return btn;
            })()
        ];
        const submenu = this.createSubmenu("QYLattrrowsbgapsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.rowsbgap, "#iconSuper", submenu);
    }
    createListViewItem(selectid) {
        const items = [
            ...this.menuData.listViewOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, this.menuData.attrNameConfig.listView, option.value, this.i18n[option.group], false, selectid)
            ),
            ...this.menuData.listStyleSpecialOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], option.isWarning || false, selectid)
            ),
            (() => {
                const config = this.menuData.clearButtonConfig.listView;
                const btn = this.createMenuItem(this.i18n[this.menuData.deleteButtonConfig.label], this.menuData.deleteButtonConfig.icon, config.attrName, "", this.menuData.deleteButtonConfig.group ? this.i18n[this.menuData.deleteButtonConfig.group] : null, this.menuData.deleteButtonConfig.isWarning, selectid);
                btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                return btn;
            })()
        ];
        const submenu = this.createSubmenu("QYLattrlistviewsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.listview, "#iconList", submenu);
    }
    createLineHeightItem(selectid) {
        const items = [
            ...this.menuData.lineHeightOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, this.menuData.attrNameConfig.lineHeight, option.value, this.i18n[option.group], false, selectid)
            ),
            (() => {
                const config = this.menuData.clearButtonConfig.lineHeight;
                const btn = this.createMenuItem(this.i18n[this.menuData.deleteButtonConfig.label], this.menuData.deleteButtonConfig.icon, config.attrName, "", this.menuData.deleteButtonConfig.group ? this.i18n[this.menuData.deleteButtonConfig.group] : null, this.menuData.deleteButtonConfig.isWarning, selectid);
                btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                return btn;
            })()
        ];
        const submenu = this.createSubmenu("QYLattrlineheightsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.lineheight, "#iconContract", submenu);
    }
    createBlankBlockRemindItem(selectid) {
        const items = [
            ...this.menuData.blankBlockRemindOptions.map(option => {
                const btn = this.createMenuItem(this.i18n[option.label], option.icon, this.menuData.attrNameConfig.blankBlockRemind, option.value, option.group ? this.i18n[option.group] : null, option.isWarning || false, selectid);
                if (option.isWarning) {
                    const config = this.menuData.clearButtonConfig.blankBlockRemind;
                    btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                }
                return btn;
            })
        ];
        const submenu = this.createSubmenu("QYLattrblankblockremindsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blankblockremind, "#iconInfo", submenu);
    }
    createTableStyleItem(selectid) {
        const items = [
            ...this.menuData.tableStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            ),
            ...this.menuData.tableColorOptions.map(color => 
                this.createMenuItem(this.i18n[color.label], color.icon, this.menuData.attrNameConfig.tableColor, color.value, this.i18n[color.group], false, selectid)
            ),
            (() => {
                const config = this.menuData.clearButtonConfig.tableStyle;
                const btn = this.createMenuItem(this.i18n[this.menuData.deleteButtonConfig.label], this.menuData.deleteButtonConfig.icon, config.attrName, "", this.menuData.deleteButtonConfig.group ? this.i18n[this.menuData.deleteButtonConfig.group] : null, this.menuData.deleteButtonConfig.isWarning, selectid);
                btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                return btn;
            })()
        ];
        const submenu = this.createSubmenu("QYLattrtablestylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.tablestyle, "#iconTable", submenu);
    }
    createHeadingStyleItem(selectid) {
        const items = [
            ...this.menuData.headingStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            ),
            (() => {
                const config = this.menuData.clearButtonConfig.headingStyle;
                const btn = this.createMenuItem(this.i18n[this.menuData.deleteButtonConfig.label], this.menuData.deleteButtonConfig.icon, config.attrName, "", this.menuData.deleteButtonConfig.group ? this.i18n[this.menuData.deleteButtonConfig.group] : null, this.menuData.deleteButtonConfig.isWarning, selectid);
                btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                return btn;
            })()
        ];
        const submenu = this.createSubmenu("QYLattrhstylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.headingstyle, "#iconHeadings", submenu);
    }
    createImgStyleItem(selectid) {
        const items = [
            ...this.menuData.imgStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], false, selectid)
            ),
            (() => {
                const config = this.menuData.clearButtonConfig.imgStyle;
                const btn = this.createMenuItem(this.i18n[this.menuData.deleteButtonConfig.label], this.menuData.deleteButtonConfig.icon, config.attrName, "", this.menuData.deleteButtonConfig.group ? this.i18n[this.menuData.deleteButtonConfig.group] : null, this.menuData.deleteButtonConfig.isWarning, selectid);
                btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                return btn;
            })()
        ];
        const submenu = this.createSubmenu("QYLattrimgsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.imgstyle, "#iconImage", submenu);
    }
    createHeightItem(selectid) {
        const items = [
            ...this.menuData.heightOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, this.menuData.attrNameConfig.height, option.value, this.i18n[option.group], false, selectid)
            ),
            (() => {
                const config = this.menuData.clearButtonConfig.height;
                const btn = this.createMenuItem(this.i18n[this.menuData.deleteButtonConfig.label], this.menuData.deleteButtonConfig.icon, config.attrName, "", this.menuData.deleteButtonConfig.group ? this.i18n[this.menuData.deleteButtonConfig.group] : null, this.menuData.deleteButtonConfig.isWarning, selectid);
                btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                return btn;
            })()
        ];
        const submenu = this.createSubmenu("QYLattrheightsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.maxheight, "#iconContract", submenu);
    }
    createFileStyleItem(selectid) {
        const items = [
            ...this.menuData.fileStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, this.menuData.attrNameConfig.style, option.value, this.i18n[option.group], false, selectid)
            ),
            (() => {
                const config = this.menuData.clearButtonConfig.fileStyle;
                const btn = this.createMenuItem(this.i18n[this.menuData.deleteButtonConfig.label], this.menuData.deleteButtonConfig.icon, config.attrName, "", this.menuData.deleteButtonConfig.group ? this.i18n[this.menuData.deleteButtonConfig.group] : null, this.menuData.deleteButtonConfig.isWarning, selectid);
                btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                return btn;
            })()
        ];
        const submenu = this.createSubmenu("QYLattrfilestylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.fileblockstyle, "#iconTheme", submenu);
    }
    createBlockStyleItem(selectid) {
        const items = [
            ...this.menuData.blockStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, this.menuData.attrNameConfig.style, option.value, this.i18n[option.group], false, selectid)
            ),
            this.createNoteSubmenu(selectid),
            this.createLeftBorderSubmenu(selectid),
            ...this.menuData.flashcardStyleOptions.map(option => 
                this.createMenuItem(this.i18n[option.label], option.icon, "style-flashcard", option.value, this.i18n[option.group], false, selectid)
            ),
            (() => {
                const config = this.menuData.clearButtonConfig.blockStyle;
                const btn = this.createMenuItem(this.i18n[this.menuData.deleteButtonConfig.label], this.menuData.deleteButtonConfig.icon, config.attrName, "", this.menuData.deleteButtonConfig.group ? this.i18n[this.menuData.deleteButtonConfig.group] : null, this.menuData.deleteButtonConfig.isWarning, selectid);
                btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                return btn;
            })()
        ];
        const submenu = this.createSubmenu("QYLattrstylesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstyle, "#iconTheme", submenu);
    }
    createNoteSubmenu(selectid) {
        const items = this.menuData.noteColorOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, this.menuData.attrNameConfig.style, option.value, this.i18n[option.group], false, selectid)
        );
        const submenu = this.createSubmenu("QYLstylenotesub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstylenote, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.noteSubmenu.group]);
    }
    createLeftBorderSubmenu(selectid) {
        const items = this.menuData.leftBorderColorOptions.map(option => 
            this.createMenuItem(this.i18n[option.label], option.icon, this.menuData.attrNameConfig.style, option.value, this.i18n[option.group], false, selectid)
        );
        const submenu = this.createSubmenu("QYLstyleleftbordersub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockstyleleftborder, "#iconTheme", submenu, this.i18n[this.menuData.submenuConfig.leftBorderSubmenu.group]);
    }
    createFontFamilyItem(selectid) {
        const items = [
            ...this.menuData.fontOptions.map(option => {
                const button = this.createMenuItem(option.label, "#iconFont", this.menuData.attrNameConfig.fontFamily, option.value, this.i18n[option.group], false, selectid);
                button.style.fontFamily = option.fontFamily;
                return button;
            }),
            (() => {
                const config = this.menuData.clearButtonConfig.fontFamily;
                const btn = this.createMenuItem(this.i18n[this.menuData.deleteButtonConfig.label], this.menuData.deleteButtonConfig.icon, config.attrName, "", this.menuData.deleteButtonConfig.group ? this.i18n[this.menuData.deleteButtonConfig.group] : null, this.menuData.deleteButtonConfig.isWarning, selectid);
                btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                return btn;
            })()
        ];
        const submenu = this.createSubmenu("QYLattrfontfamilysub", items);
        return this.createMenuItemWithSubmenu(this.i18n.fontfamily, "#iconFont", submenu);
    }
    createCalloutColorItem(selectid) {
        const items = [
            ...this.menuData.calloutColorOptions.map(color => 
                this.createMenuItem(this.i18n[color.label], color.icon, this.menuData.attrNameConfig.calloutColor, color.value, this.i18n[color.group], false, selectid)
            ),
            ...this.menuData.calloutSpecialOptions.map(option => {
                const btn = this.createMenuItem(this.i18n[option.label], option.icon, option.attrName, option.value, this.i18n[option.group], option.isWarning || false, selectid);
                if (option.label === 'attrsdelete') {
                    const config = this.menuData.clearButtonConfig.callout;
                    btn.setAttribute('data-attr-clear-list', config.clearList.join(','));
                }
                return btn;
            })
        ];
        const submenu = this.createSubmenu("QYLattrbqcalloutcolorsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.calloutcolor, "#iconQuote", submenu);
    }
    async QYLcustomattrset(event) {
        let id = event.currentTarget.getAttribute("data-node-id");
        let attrName = 'custom-' + event.currentTarget.getAttribute("custom-attr-name");
        let attrValue = event.currentTarget.getAttribute("custom-attr-value");
        let clearList = event.currentTarget.getAttribute('data-attr-clear-list');
        let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`);
        if (clearList) {
            for (const attr of clearList.split(',')) {
                let fullAttr = 'custom-' + attr;
                if (blocks) {
                    blocks.forEach(block => block.removeAttribute(fullAttr));
                }
                await this.api.setCustomAttribute(id, fullAttr, '');
            }
        } else {
            if (blocks) {
                blocks.forEach(block => block.setAttribute(attrName, attrValue));
            }
            await this.api.setCustomAttribute(id, attrName, attrValue);
        }
    }
}
export function destroyMenuObservers(menuRoot) {
    if (!menuRoot) return;
    menuRoot.querySelectorAll('button').forEach(btn => {
        if (btn._QYLAttrSelfRemoveObserver) {
            btn._QYLAttrSelfRemoveObserver.disconnect();
            btn._QYLAttrSelfRemoveObserver = null;
        }
        QYLAttrHighlightManager.unregister(btn);
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
    await QYLAttrHighlightManager.refreshAll();
}
