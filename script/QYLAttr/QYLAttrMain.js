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
        this.handleEvent = this.debounce((e) => {
            this.initQYLattr(e);
            this.initQYLattrforfile(e);
        }, 100);
        window.addEventListener('mouseup', this.handleEvent);
        window.addEventListener('keyup', this.handleEvent);
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
            const node_list = document.querySelectorAll('.protyle-wysiwyg--select');
            const selectinfo = this.getBlockSelected();
            if (selectinfo) {
                this.insertTimeout = setTimeout(() => {
                    this.menu.insertQYLattr(selectinfo.id, selectinfo.type, selectinfo.sbLayout);
                    this.api.queryCSSAttribute(selectinfo.id);
                }, 200);
            } else if (node_list.length > 1) {
                let lang = (window.siyuan && window.siyuan.config && window.siyuan.config.lang) || 'zh_CN';
                let msg = '';
                switch (lang) {
                    case 'zh_CN':
                        msg = this.i18n.QYLAttrMultiSelectWarn || '其他文档存在选中的块，QYL自定义属性菜单无法创建';
                        break;
                    case 'zh_TW':
                    case 'zh_CHT':
                        msg = this.i18n.QYLAttrMultiSelectWarn || '其他文件存在選中的塊，QYL自定義屬性菜單無法創建';
                        break;
                    case 'en_US':
                    default:
                        msg = this.i18n.QYLAttrMultiSelectWarn || 'Custom attribute menu cannot be created when blocks are selected in multiple documents.';
                        break;
                }
                if (e && e.target && e.target.closest && e.target.closest('.protyle-gutters')) {
                    fetch('/api/notification/pushMsg', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ msg, timeout: 3000 })
                    });
                }
            }
        }, 0);
    }
    initQYLattrforfile() {
        clearTimeout(this.fileInitTimeout);
        clearTimeout(this.fileInsertTimeout);
        this.fileInitTimeout = setTimeout(() => {
            const selectinfo = this.getFileBlockSelected();
            if (selectinfo) {
                this.fileInsertTimeout = setTimeout(() => {
                    this.menu.insertQYLattrforfile(selectinfo.id, selectinfo.type);
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
        if (this.isClickMonitorActive && this.handleEvent) {
            window.removeEventListener('mouseup', this.handleEvent);
            window.removeEventListener('keyup', this.handleEvent);
            this.isClickMonitorActive = false;
            this.handleEvent = null;
        }
        clearTimeout(this.initTimeout);
        clearTimeout(this.insertTimeout);
        clearTimeout(this.fileInitTimeout);
        clearTimeout(this.fileInsertTimeout);
        this.cleanupMenuElements();
        if (this.api) {
            this.api.commonMenuCache = { elem: null, timestamp: 0 };
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
    }
}
export default QYLAttr;
