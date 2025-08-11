import i18n from '../../i18n/i18n.js';
import { QYLAttrMenu } from './QYLAttrMenu.js';
import { QYLAttrAPI } from './QYLAttrAPI.js';
import { initQYLcustomattrCSS, cleanupQYLcustomattrCSS } from './QYLAttrCSSImport.js';
import { initCustomCSS, cleanupCustomCSS } from './CustomCSS.js';
class QYLAttr {
    constructor() {
        this.i18n = i18n;
        this.api = new QYLAttrAPI();
        this.menu = new QYLAttrMenu(this.i18n, this.api);
        this.isClickMonitorActive = false;
        this.commonMenuObserver = null;
        this.commonMenuElement = null;
        this.searchAttempts = 0;
        this.maxSearchAttempts = 15;
        this.searchInterval = 100;
        this.menuShowTimeout = null; 
        this.isCreatingQYLAttr = false; 
    }
    init() {
        initQYLcustomattrCSS();
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
        this.initQYLattr({});
        this.initQYLattrforfile({});
        setTimeout(() => {
            this.isCreatingQYLAttr = false;
        }, 100);
    }
    debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
    initQYLattr(e) {
        const selectinfo = this.getBlockSelected();
        if (selectinfo) {
            this.menu.insertQYLattr(selectinfo.id, selectinfo.type, selectinfo.sbLayout);
            this.api.queryCSSAttribute(selectinfo.id);
        }
    }
    initQYLattrforfile() {
        const selectinfo = this.getFileBlockSelected();
        if (selectinfo) {
            this.menu.insertQYLattrforfile(selectinfo.id, selectinfo.type);
            this.api.queryCSSAttribute(selectinfo.id);
        }
    }
    getBlockSelected() {
        const node_list = document.querySelectorAll('.protyle-wysiwyg--select');
        if (node_list.length === 1 && node_list[0].dataset.nodeId != null) {
            return {
                id: node_list[0].dataset.nodeId,
                type: node_list[0].dataset.type,
                subtype: node_list[0].dataset.subtype,
                sbLayout: node_list[0].dataset.sbLayout,
            };
        }
        return null;
    }
    getFileBlockSelected() {
        const node_list = document.querySelectorAll('.b3-list-item--focus[data-type="navigation-file"]');
        if (node_list.length === 1 && node_list[0].dataset.nodeId != null) {
            return {
                id: node_list[0].dataset.nodeId,
                type: node_list[0].dataset.type,
                subtype: node_list[0].dataset.subtype,
            };
        }
        return null;
    }
    cleanup() {
        cleanupQYLcustomattrCSS();
        cleanupCustomCSS();
        if (this.isClickMonitorActive) {
            if (this.commonMenuObserver) {
                this.commonMenuObserver.disconnect();
                this.commonMenuObserver = null;
            }
            this.isClickMonitorActive = false;
            this.handleBlockEvent = null;
            this.handleFileEvent = null;
        }
        this.commonMenuElement = null;
        this.searchAttempts = 0;
        this.isCreatingQYLAttr = false;
        clearTimeout(this.menuShowTimeout);
        this.cleanupMenuElements();
        if (this.api) {
            this.api.commonMenuCache = { elem: null, timestamp: 0 };
        }
        if (window.QYLAttrMenuFactory && window.QYLAttrMenuFactory.selfConfigAttr) {
            window.QYLAttrMenuFactory.selfConfigAttr.closeQYLSelfConfigAttr();
        }
        if (window.QYLAttrMenuFactory) {
            window.QYLAttrMenuFactory = null;
        }
        if (window.QYLAttrInstance) {
            window.QYLAttrInstance = null;
        }
    }
    cleanupMenuElements() {
        const QYLAttrElements = document.querySelectorAll('#QYLattr');
        QYLAttrElements.forEach(element => {
            element.remove();
        });
        const separators = document.querySelectorAll('.b3-menu__separator');
        separators.forEach(separator => {
            const nextElement = separator.nextElementSibling;
            if (nextElement && nextElement.id === 'QYLattr') {
                separator.remove();
            }
        });
        const QYLMenuItems = document.querySelectorAll('[data-custom-attr-name]');
        QYLMenuItems.forEach(item => {
            if (item.parentNode) {
                item.parentNode.removeChild(item);
            }
        });
        const QYLSubmenus = document.querySelectorAll('[id*="QYLattr"]');
        QYLSubmenus.forEach(menu => {
            if (menu.parentNode) {
                menu.parentNode.removeChild(menu);
            }
        });
        const QYLStyleElements = document.querySelectorAll('.QYLAttrActive, .QYLAttrActiveMenu');
        QYLStyleElements.forEach(element => {
            element.classList.remove('QYLAttrActive', 'QYLAttrActiveMenu');
        });
    }
}
export default QYLAttr;
