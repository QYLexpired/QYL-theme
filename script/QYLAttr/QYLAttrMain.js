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
        this.touchStartTime = 0;
        this.touchStartTarget = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.longPressDelay = 500;
        this.retryCount = 0;
        this.fileRetryCount = 0; 
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
            if (
                e.target.closest('.protyle-gutters') ||
                e.target.closest('.keyboard__action[data-type="block"]')
            ) {
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
        this.handleTouchStart = (e) => {
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                this.touchStartTime = Date.now();
                this.touchStartTarget = e.target;
                this.touchStartX = touch.clientX;
                this.touchStartY = touch.clientY;
            }
        };
        this.handleTouchEnd = (e) => {
            if (this.touchStartTime && this.touchStartTarget) {
                const pressDuration = Date.now() - this.touchStartTime;
                if (pressDuration >= this.longPressDelay) {
                    this.handleLongPress(e);
                } else {
                    this.handleTouchClick(e);
                }
            }
            this.touchStartTime = 0;
            this.touchStartTarget = null;
            this.touchStartX = 0;
            this.touchStartY = 0;
        };
        this.handleTouchMove = (e) => {
            if (this.touchStartTarget) {
                const touch = e.touches[0];
                const moveDistance = Math.sqrt(
                    Math.pow(touch.clientX - this.touchStartX, 2) + 
                    Math.pow(touch.clientY - this.touchStartY, 2)
                );
                if (moveDistance > 10) { 
                    this.touchStartTime = 0;
                    this.touchStartTarget = null;
                }
            }
        };
        this.handleLongPress = (e) => {
            if (
                e.target.closest('.protyle-gutters') ||
                e.target.closest('.keyboard__action[data-type="block"]')
            ) {
                this.handleBlockEvent(e);
            }
            if (e.target.closest('.b3-list-item')) {
                this.handleFileEvent(e);
            }
        };
        this.handleTouchClick = (e) => {
            if (
                e.target.closest('.protyle-gutters') ||
                e.target.closest('.keyboard__action[data-type="block"]')
            ) {
                this.handleBlockEvent(e);
            }
            if (e.target.closest('.b3-list-item')) {
                this.handleFileEvent(e);
            }
        };
        window.addEventListener('mouseup', this.handleMouseEvent);
        window.addEventListener('keyup', this.handleKeyEvent);
        window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        window.addEventListener('touchend', this.handleTouchEnd, { passive: false });
        window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
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
        this.retryCount = 0;
        this.maxRetries = 10;
        this.retryDelay = 50;
        const tryInsert = async () => {
            const selectinfo = this.getBlockSelected();
            if (selectinfo) {
                try {
                    await this.menu.insertQYLattr(selectinfo.id, selectinfo.type, selectinfo.sbLayout);
                    this.api.queryCSSAttribute(selectinfo.id);
                    return { success: true, reason: 'inserted' }; 
                } catch (error) {
                    return { success: false, reason: 'error' }; 
                }
            }
            return { success: false, reason: 'no-selection' }; 
        };
        const attemptInsert = async () => {
            const result = await tryInsert();
            if (result.success) {
                return; 
            }
            if (result.reason === 'error' && this.retryCount < this.maxRetries) {
                this.retryCount++;
                this.insertTimeout = setTimeout(attemptInsert, this.retryDelay);
            }
        };
        attemptInsert();
    }
    initQYLattrforfile() {
        clearTimeout(this.fileInitTimeout);
        clearTimeout(this.fileInsertTimeout);
        this.fileRetryCount = 0;
        this.fileMaxRetries = 10;
        this.fileRetryDelay = 50;
        const tryInsertFile = async () => {
            const selectinfo = this.getFileBlockSelected();
            if (selectinfo) {
                try {
                    await this.menu.insertQYLattrforfile(selectinfo.id, selectinfo.type);
                    this.api.queryCSSAttribute(selectinfo.id);
                    return { success: true, reason: 'inserted' }; 
                } catch (error) {
                    return { success: false, reason: 'error' }; 
                }
            }
            return { success: false, reason: 'no-selection' }; 
        };
        const attemptFileInsert = async () => {
            const result = await tryInsertFile();
            if (result.success) {
                return; 
            }
            if (result.reason === 'error' && this.fileRetryCount < this.fileMaxRetries) {
                this.fileRetryCount++;
                this.fileInsertTimeout = setTimeout(attemptFileInsert, this.fileRetryDelay);
            }
        };
        attemptFileInsert();
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
            window.removeEventListener('touchstart', this.handleTouchStart);
            window.removeEventListener('touchend', this.handleTouchEnd);
            window.removeEventListener('touchmove', this.handleTouchMove);
            this.isClickMonitorActive = false;
            this.handleBlockEvent = null;
            this.handleFileEvent = null;
            this.handleMouseEvent = null;
            this.handleKeyEvent = null;
            this.handleTouchStart = null;
            this.handleTouchEnd = null;
            this.handleTouchMove = null;
            this.handleLongPress = null;
            this.handleTouchClick = null;
        }
        this.touchStartTime = 0;
        this.touchStartTarget = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.retryCount = 0;
        this.fileRetryCount = 0;
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
