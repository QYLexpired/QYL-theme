import { getFile } from '../basic/API.js';
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
        }, 100);
        this.refreshTimeouts.set(selectid, timeoutId);
    },
    async refreshBySelectIdImmediate(selectid) {
        if (this.refreshTimeouts.has(selectid)) {
            clearTimeout(this.refreshTimeouts.get(selectid));
            this.refreshTimeouts.delete(selectid);
        }
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
    }
};
export class QYLMenuItem {
    constructor(i18n, api) {
        this.i18n = i18n;
        this.api = api;
        QYLAttrHighlightManager.clearAll();
        if (typeof window !== 'undefined') {
            window.QYLMenuItem = this;
        }
    }
    updateParentHighlights(element) {
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
    }
    createSubmenu(id, items) {
        const div = document.createElement("div");
        div.id = id;
        div.className = "b3-menu__submenu";
        const itemsDiv = document.createElement("div");
        itemsDiv.className = "b3-menu__items";
        items.forEach(item => {
            itemsDiv.appendChild(item);
        });
        div.appendChild(itemsDiv);
        return div;
    }
    createMenuItemWithSubmenu(label, icon, submenu) {
        const button = document.createElement("button");
        button.className = "b3-menu__item";
        button.innerHTML = `
            <svg class="b3-menu__icon"><use xlink:href="${icon}"></use></svg>
            <span class="b3-menu__label">${label}</span>
            <svg class="b3-menu__icon b3-menu__icon--small"><use xlink:href="#iconRight"></use></svg>
        `;
        button.appendChild(submenu);
        return button;
    }
    createMenuItem(label, icon, attrName, attrValue, isWarning = false, selectid = "") {
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
            <svg class="b3-menu__icon"><use xlink:href="${icon}"></use></svg>
            <span class="b3-menu__label">${label}</span>
        `;
        const attrFullName = 'custom-' + attrName;
        const updateActiveClass = (currentValue) => {
            if (attrValue !== "" && currentValue === attrValue) {
                button.classList.add('QYLAttrActive');
            } else {
                button.classList.remove('QYLAttrActive');
            }
            this.updateParentHighlights(button);
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
                } else {
                    await this.api.setCustomAttribute(id, attrNameFull, attrValue);
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
        textarea.style.height = "100px";
        textarea.style.width = "200px";
        textarea.style.color = "var(--b3-theme-on-surface)";
        textarea.setAttribute("spellcheck", "false");
        textarea.setAttribute("data-QYL-attr-id", selectid);
        textarea.setAttribute("custom-attr-name", "css");
        textarea.value = "";
        textarea.placeholder = this.i18n.CSSplaceholder;
        const updateCSSActiveClass = (currentValue) => {
            this.updateParentHighlights(textarea);
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
                const selectid = e.target.getAttribute("data-QYL-attr-id");
                await this.api.setCustomAttribute(selectid, 'custom-css', value);
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
    createBlockFullWidthItem(selectid) {
        const items = [
            this.createMenuItem(this.i18n.enable, "#iconSelect", "blockfullwidth", "fullwidth", false, selectid)
        ];
        const submenu = this.createSubmenu("QYLattrblockfullwidthsub", items);
        return this.createMenuItemWithSubmenu(this.i18n.blockfullwidth, "#iconMax", submenu);
    }
}
export function QYLAttrInitialUpdateAll(menuElement) {
    const selectid = menuElement.getAttribute('data-QYL-attr-id') || 
                    menuElement.querySelector('[data-QYL-attr-id]')?.getAttribute('data-QYL-attr-id');
    if (selectid) {
        QYLAttrHighlightManager.refreshBySelectIdImmediate(selectid);
    }
}