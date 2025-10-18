import i18n from '../../i18n/i18n.js';
import { QYLAttrAPI } from './QYLAttrAPI.js';
import { QYLMenuItem } from './QYLAttrMenuItem.js';
import { QYLAttrInitialUpdateAll } from './QYLAttrMenuItem.js';
import { initCustomCSS } from './QYLAttrCSS.js';
class QYLAttr {
    constructor() {
        this.i18n = i18n;
        this.api = new QYLAttrAPI();
        this.factory = new QYLMenuItem(i18n, this.api);
        this.isClickMonitorActive = false;
        this.commonMenuObserver = null;
        this.commonMenuElement = null;
        this.searchAttempts = 0;
        this.maxSearchAttempts = 15;
        this.searchInterval = 100;
        this.isCreatingQYLAttr = false;
        initCustomCSS();
        this.startCommonMenuMonitor();
    }
    startCommonMenuMonitor() {
        if (this.isClickMonitorActive) return;
        this.isClickMonitorActive = true;
        this.searchCommonMenu();
    }
    searchCommonMenu() {
        this.commonMenuElement = document.querySelector('#commonMenu');
        if (this.commonMenuElement) {
            this.setupCommonMenuObserver();
        } else {
            this.searchAttempts++;
            if (this.searchAttempts < this.maxSearchAttempts) {
                setTimeout(() => {
                    this.searchCommonMenu();
                }, this.searchInterval);
            }
        }
    }
    setupCommonMenuObserver() {
        if (this.commonMenuObserver) {
            this.commonMenuObserver.disconnect();
        }
        this.commonMenuObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    const oldValue = mutation.oldValue || '';
                    const newValue = target.className;
                    const hadFnNone = oldValue.includes('fn__none');
                    const hasFnNone = newValue.includes('fn__none');
                    if (hadFnNone && !hasFnNone) {
                        this.handleCommonMenuShow();
                    }
                }
            });
        });
        this.commonMenuObserver.observe(this.commonMenuElement, {
            attributes: true,
            attributeFilter: ['class'],
            attributeOldValue: true
        });
    }
    handleCommonMenuShow() {
        if (this.isCreatingQYLAttr || document.querySelector('#QYLattr')) {
            return;
        }
        this.isCreatingQYLAttr = true;
        const blockInfo = this.getBlockSelected();
        if (blockInfo) {
            this.insertQYLattr(blockInfo.id, blockInfo.type);
        } else {
            const fileInfo = this.getFileBlockSelected();
            if (fileInfo) {
                this.insertQYLattrforfile(fileInfo.id, fileInfo.type);
            }
        }
        setTimeout(() => {
            this.isCreatingQYLAttr = false;
        }, 100);
    }
    async insertQYLattr(selectid, selecttype) {
        const menu = this.getCommonMenu();
        if (!menu) return;
        const hasExport = Array.from(menu.children).find(child => child.getAttribute('data-id') === 'export');
        const hasUpdate = Array.from(menu.children).find(child => child.getAttribute('data-id') === 'updateAndCreatedAt');
        const attritem = menu.querySelector('#QYLattr');
        if (!hasExport && hasUpdate && !attritem) {
            const QYLBtn = await this.createQYLattrItem(selectid, selecttype);
            menu.insertBefore(QYLBtn, hasUpdate);
            if (QYLBtn.nextSibling) {
                menu.insertBefore(this.createMenuSeparator(), QYLBtn.nextSibling);
            } else {
                menu.appendChild(this.createMenuSeparator());
            }
            QYLAttrInitialUpdateAll(QYLBtn);
            this.api.queryCSSAttribute(selectid);
        }
    }
    async insertQYLattrforfile(selectid, selecttype) {
        const menu = this.getCommonMenu();
        if (!menu) return;
        const hasExport = Array.from(menu.children).find(child => child.getAttribute('data-id') === 'export');
        const hasUpdate = Array.from(menu.children).find(child => child.getAttribute('data-id') === 'updateAndCreatedAt');
        const hasFileHistory = Array.from(menu.children).find(child => child.getAttribute('data-id') === 'fileHistory');
        const attritem = menu.querySelector('#QYLattr');
        if (hasExport && !hasUpdate && !attritem && hasFileHistory) {
            const QYLBtn = await this.createQYLattrItem(selectid, selecttype);
            menu.appendChild(QYLBtn);
            menu.insertBefore(this.createMenuSeparator(), QYLBtn);
            QYLAttrInitialUpdateAll(QYLBtn);
            this.api.queryCSSAttribute(selectid);
        }
    }
    getCommonMenu() {
        const commonMenu = document.querySelector("#commonMenu .b3-menu__items");
        return commonMenu;
    }
    createMenuSeparator(className = `b3-menu__separator`) {
        let node = document.createElement(`button`);
        node.className = className;
        return node;
    }
    async createQYLattrItem(selectid, selecttype) {
        let button = document.createElement("button");
        button.id = "QYLattr";
        button.className = "b3-menu__item";
        button.innerHTML = `<svg t="1748926087349" class="b3-menu__icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="55665"><path d="M204.8 426.666667c0 10.24 6.826667 17.066667 17.066667 17.066666s17.066667-6.826667 17.066666-17.066666c0-81.92 10.24-126.293333 37.546667-150.186667s68.266667-37.546667 150.186667-37.546667c10.24 0 17.066667-6.826667 17.066666-17.066666s-6.826667-17.066667-17.066666-17.066667c-81.92 0-126.293333-10.24-150.186667-37.546667S238.933333 98.986667 238.933333 17.066667c0-10.24-6.826667-17.066667-17.066666-17.066667S204.8 6.826667 204.8 17.066667c0 81.92-10.24 126.293333-37.546667 150.186666S98.986667 204.8 17.066667 204.8c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666c81.92 0 126.293333 10.24 150.186666 37.546667s37.546667 68.266667 37.546667 150.186667zM409.6 119.466667c30.72 0 47.786667 3.413333 54.613333 13.653333 10.24 6.826667 13.653333 23.893333 13.653334 54.613333 0 10.24 6.826667 17.066667 17.066666 17.066667s17.066667-6.826667 17.066667-17.066667c0-30.72 3.413333-47.786667 13.653333-54.613333 10.24-10.24 23.893333-13.653333 54.613334-13.653333 10.24 0 17.066667-6.826667 17.066666-17.066667s-6.826667-17.066667-17.066666-17.066667c-30.72 0-47.786667-3.413333-54.613334-13.653333-10.24-6.826667-13.653333-23.893333-13.653333-54.613333 0-10.24-6.826667-17.066667-17.066667-17.066667s-17.066667 6.826667-17.066666 17.066667c0 30.72-3.413333 47.786667-13.653334 54.613333-10.24 10.24-23.893333 13.653333-54.613333 13.653333-10.24 0-17.066667-6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066667zM433.493333 488.106667c-17.066667-17.066667-23.893333-44.373333-23.893333-95.573334 0-10.24-6.826667-17.066667-17.066667-17.066666s-17.066667 6.826667-17.066666 17.066666c0 54.613333-6.826667 81.92-23.893334 95.573334-13.653333 17.066667-40.96 23.893333-95.573333 23.893333-10.24 0-17.066667-6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666c54.613333 0 81.92 6.826667 95.573333 23.893334 17.066667 17.066667 23.893333 44.373333 23.893334 95.573333 0 10.24 6.826667 17.066667 17.066666 17.066667s17.066667-6.826667 17.066667-17.066667c0-54.613333 6.826667-81.92 23.893333-95.573333 17.066667-17.066667 44.373333-23.893333 95.573334-23.893334 10.24 0 17.066667-6.826667 17.066666-17.066666s-6.826667-17.066667-17.066666-17.066667c-54.613333 0-81.92-6.826667-95.573334-23.893333z" fill="" p-id="55666"></path><path d="M737.28 109.226667c-6.826667-3.413333-13.653333 0-20.48 3.413333-3.413333 3.413333-6.826667 13.653333-3.413333 20.48C737.28 187.733333 750.933333 245.76 750.933333 307.2c0 245.76-197.973333 443.733333-443.733333 443.733333-61.44 0-119.466667-13.653333-177.493333-37.546666-6.826667-3.413333-13.653333 0-20.48 3.413333s-6.826667 13.653333-3.413334 20.48C184.32 911.36 354.986667 1024 546.133333 1024c262.826667 0 477.866667-215.04 477.866667-477.866667 0-191.146667-112.64-361.813333-286.72-436.906666z" fill="" p-id="55667"></path></svg><span class="b3-menu__label" style="">${this.i18n.QYLcustomattr}</span><svg class="b3-menu__icon b3-menu__icon--small"><use xlink:href="#iconRight"></use></svg></button>`;
        if (selecttype === "NodeList") {
            button.appendChild(await this.createListSubmenu(selectid));
        } else if (selecttype === "navigation-file") {
            button.appendChild(await this.createFileSubmenu(selectid));
        } else {
            button.appendChild(await this.createStandardSubmenu(selectid));
        }
        return button;
    }
    async createStandardSubmenu(selectid) {
        const items = [
            this.factory.createCSSItem(selectid),
            this.factory.createBlockFullWidthItem(selectid)
        ];
        return this.factory.createSubmenu("QYLNodeStandardsub", items);
    }
    async createListSubmenu(selectid) {
        const items = [
            this.factory.createCSSItem(selectid),
            this.factory.createBlockFullWidthItem(selectid)
        ];
        return this.factory.createSubmenu("QYLNodeListsub", items);
    }
    async createFileSubmenu(selectid) {
        const items = [
            this.factory.createCSSItem(selectid)
        ];
        return this.factory.createSubmenu("QYLNodeFilesub", items);
    }
    _getSelectedElement(selector) {
        const node_list = document.querySelectorAll(selector);
        if (node_list.length === 1 && node_list[0].dataset.nodeId != null) {
            return {
                id: node_list[0].dataset.nodeId,
                type: node_list[0].dataset.type,
            };
        }
        return null;
    }
    getBlockSelected() {
        return this._getSelectedElement('.protyle-wysiwyg--select');
    }
    getFileBlockSelected() {
        return this._getSelectedElement('.b3-list-item--focus[data-type="navigation-file"]');
    }
}
new QYLAttr();
