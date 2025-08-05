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
        this.initTimeout = null;
        this.insertTimeout = null;
        this.fileInitTimeout = null;
        this.fileInsertTimeout = null;
        this.handleEvent = null; 
    }
    init() {
        initQYLcustomattrCSS();
        initCustomCSS();
        this.startClickMonitor();
    }
    startClickMonitor() {
        if (this.isClickMonitorActive) return;
        this.isClickMonitorActive = true;
        this.handleBlockEvent = this.debounce((e) => {
            this.initQYLattr(e);
        }, 100);
        this.handleFileEvent = this.debounce((e) => {
            this.initQYLattrforfile(e);
        }, 100);
        this.handleMouseEvent = (e) => {
            if (e.target.closest('.protyle-gutters')) {
                this.handleBlockEvent(e);
            }
            if (e.target.closest('.b3-list-item')) {
                this.handleFileEvent(e);
            }
        };
        this.handleKeyEvent = (e) => {
            if (e.ctrlKey || e.metaKey) {
                this.handleBlockEvent(e);
            }
        };
        window.addEventListener('mouseup', this.handleMouseEvent);
        window.addEventListener('keyup', this.handleKeyEvent);
    }
    debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
    initQYLattr(e) {
        clearTimeout(this.initTimeout);
        clearTimeout(this.insertTimeout);
        this.initTimeout = setTimeout(() => {
            const selectinfo = this.getBlockSelected();
            if (selectinfo) {
                this.insertTimeout = setTimeout(async () => {
                    await this.menu.insertQYLattr(selectinfo.id, selectinfo.type, selectinfo.sbLayout);
                    this.api.queryCSSAttribute(selectinfo.id);
                }, 200);
            }
        }, 0);
    }
    initQYLattrforfile() {
        clearTimeout(this.fileInitTimeout);
        clearTimeout(this.fileInsertTimeout);
        this.fileInitTimeout = setTimeout(() => {
            const selectinfo = this.getFileBlockSelected();
            if (selectinfo) {
                this.fileInsertTimeout = setTimeout(async () => {
                    await this.menu.insertQYLattrforfile(selectinfo.id, selectinfo.type);
                    this.api.queryCSSAttribute(selectinfo.id);
                }, 200);
            }
        }, 0);
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
            window.removeEventListener('mouseup', this.handleMouseEvent);
            window.removeEventListener('keyup', this.handleKeyEvent);
            this.isClickMonitorActive = false;
            this.handleBlockEvent = null;
            this.handleFileEvent = null;
            this.handleMouseEvent = null;
            this.handleKeyEvent = null;
        }
        clearTimeout(this.initTimeout);
        clearTimeout(this.insertTimeout);
        clearTimeout(this.fileInitTimeout);
        clearTimeout(this.fileInsertTimeout);
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
