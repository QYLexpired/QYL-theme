import { isMobile } from './Device.js';
class ProtylePadding {
    constructor() {
        this.targetElement = null;
        this.observer = null;
        this.mutationObserver = null;
        this.retryCount = 0;
        this.maxRetries = 15;
        this.retryInterval = 100;
        this.isInitialized = false;
        this.debounceTimers = new Map(); 
        this.debounceDelay = 0; 
        this.targetDebounceTimer = null; 
        this.targetDebounceDelay = 1000; 
        this.targetSelector = isMobile ? '#editor' : '.layout__center';
        this.pendingProtyleToProcess = new Set();
        this.pendingProtyleToCleanup = new Set();
        this.init();
    }
    async init() {
        if (this.isInitialized) return;
        await this.findTargetElement();
        if (this.targetElement) {
            this.setupObservers();
            this.processExistingElements();
            this.isInitialized = true;
        }
    }
    async findTargetElement() {
        return new Promise((resolve) => {
            const findElement = () => {
                this.targetElement = document.querySelector(this.targetSelector);
                if (this.targetElement) {
                    resolve();
                    return;
                }
                this.retryCount++;
                        if (this.retryCount >= this.maxRetries) {
            resolve();
            return;
        }
                setTimeout(findElement, this.retryInterval);
            };
            findElement();
        });
    }
    setupObservers() {
        if (!this.targetElement) return;
        this.mutationObserver = new MutationObserver((mutations) => {
            this.debouncedProcessMutations(mutations);
        });
        this.mutationObserver.observe(this.targetElement, {
            childList: true,
            subtree: true
        });
    }
    debouncedProcessMutations(mutations) {
        if (!mutations || mutations.length === 0) return;
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes && Array.from(mutation.addedNodes).forEach(node => {
                    const immediateList = this.getProtyleElementsFromNode(node);
                    immediateList.forEach(element => {
                        if (!element._protylePaddingProcessed) {
                            this.processProtyleElement(element);
                            element._protylePaddingProcessed = true;
                        }
                    });
                });
                mutation.removedNodes && Array.from(mutation.removedNodes).forEach(node => {
                    this.collectProtyleFromNode(node, this.pendingProtyleToCleanup);
                    this.scheduleElementCleanupCheck(node);
                });
            }
        });
        if (this.pendingProtyleToProcess.size === 0 && this.pendingProtyleToCleanup.size === 0) return;
        if (this.targetDebounceTimer) {
            clearTimeout(this.targetDebounceTimer);
        }
        this.targetDebounceTimer = setTimeout(() => {
            this.flushPendingProtyleChanges();
        }, this.targetDebounceDelay);
    }
    getProtyleElementsFromNode(node) {
        const result = [];
        if (!node || node.nodeType !== 1) return result;
        const element = node;
        if (element.matches && element.matches('.protyle-wysiwyg')) {
            result.push(element);
            return result;
        }
        if (element.querySelectorAll) {
            const list = element.querySelectorAll('.protyle-wysiwyg');
            list.forEach(el => result.push(el));
        }
        return result;
    }
    collectProtyleFromNode(node, bucket) {
        if (!node || node.nodeType !== 1) return;
        const element = node;
        if (element.matches && element.matches('.protyle-wysiwyg')) {
            bucket.add(element);
            return;
        }
        if (element.querySelectorAll) {
            const list = element.querySelectorAll('.protyle-wysiwyg');
            list.forEach(el => bucket.add(el));
        }
    }
    scheduleElementCleanupCheck(node) {
        if (!node || node.nodeType !== 1) return;
        const elementsToCheck = [];
        if (node.matches && node.matches('.protyle-wysiwyg')) {
            elementsToCheck.push(node);
        }
        if (node.querySelectorAll) {
            const list = node.querySelectorAll('.protyle-wysiwyg');
            elementsToCheck.push(...list);
        }
        elementsToCheck.forEach(element => {
            setTimeout(() => {
                this.checkElementStillExists(element);
            }, 500);
        });
    }
    checkElementStillExists(element) {
        if (document.contains(element)) {
            this.pendingProtyleToCleanup.delete(element);
        } else {
        }
    }
    flushPendingProtyleChanges() {
        if (this.pendingProtyleToCleanup.size > 0) {
            const elementsToCleanup = Array.from(this.pendingProtyleToCleanup);
            elementsToCleanup.forEach(element => {
                if (!document.contains(element)) {
                    this.cleanupSingleProtyle(element);
                } else {
                    this.pendingProtyleToCleanup.delete(element);
                }
            });
            this.pendingProtyleToCleanup.clear();
        }
        if (this.pendingProtyleToProcess.size > 0) {
            this.pendingProtyleToProcess.forEach(element => {
                if (!element._protylePaddingProcessed) {
                    this.processProtyleElement(element);
                    element._protylePaddingProcessed = true;
                }
            });
            this.pendingProtyleToProcess.clear();
        }
    }
    processExistingElements() {
        if (!this.targetElement) return;
        const protyleElements = this.targetElement.querySelectorAll('.protyle-wysiwyg');
        protyleElements.forEach(element => {
            this.processProtyleElement(element);
            element._protylePaddingProcessed = true;
        });
    }
    processProtyleElement(element) {
        if (!element || !element.style) return;
        const parentElement = element.parentElement;
        if (!parentElement) return;
        this.updatePaddingVariables(element, parentElement);
        this.observeStyleChanges(element, parentElement);
        element._protylePaddingProcessed = true;
    }
    updatePaddingVariables(element, parentElement) {
        const paddingLeft = element.style.paddingLeft || '';
        const paddingRight = element.style.paddingRight || '';
        const currentLeft = parentElement.style.getPropertyValue('--QYL-protyle-padding-left');
        const currentRight = parentElement.style.getPropertyValue('--QYL-protyle-padding-right');
        if (currentLeft === paddingLeft && currentRight === paddingRight) {
            return;
        }
        if (currentLeft !== paddingLeft) {
            parentElement.style.setProperty('--QYL-protyle-padding-left', paddingLeft);
        }
        if (currentRight !== paddingRight) {
            parentElement.style.setProperty('--QYL-protyle-padding-right', paddingRight);
        }
    }
    observeStyleChanges(element, parentElement) {
        const styleObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const oldValue = mutation.oldValue || '';
                    const newValue = element.getAttribute('style') || '';
                    if (this.isOnlyCSSVariableChange(oldValue, newValue)) {
                        return;
                    }
                    this.debouncedUpdatePadding(element, parentElement);
                }
            });
        });
        styleObserver.observe(element, {
            attributes: true,
            attributeFilter: ['style'],
            attributeOldValue: true 
        });
        if (!element._protylePaddingObservers) {
            element._protylePaddingObservers = [];
        }
        element._protylePaddingObservers.push(styleObserver);
    }
    isOnlyCSSVariableChange(oldValue, newValue) {
        const oldNonCSSVars = this.extractNonCSSVariables(oldValue);
        const newNonCSSVars = this.extractNonCSSVariables(newValue);
        return oldNonCSSVars === newNonCSSVars;
    }
    extractNonCSSVariables(styleString) {
        if (!styleString) return '';
        return styleString
            .split(';')
            .filter(declaration => {
                const trimmed = declaration.trim();
                return trimmed && !trimmed.startsWith('--');
            })
            .join(';');
    }
    debouncedUpdatePadding(element, parentElement) {
        if (this.debounceTimers.has(element)) {
            clearTimeout(this.debounceTimers.get(element));
        }
        const timer = setTimeout(() => {
            this.updatePaddingVariables(element, parentElement);
            this.debounceTimers.delete(element);
        }, this.debounceDelay);
        this.debounceTimers.set(element, timer);
    }
    cleanupSingleProtyle(element) {
        if (!element) return;
        if (element._protylePaddingObservers) {
            element._protylePaddingObservers.forEach(observer => observer.disconnect());
            element._protylePaddingObservers = [];
        }
        const parentElement = element.parentElement;
        if (parentElement) {
            parentElement.style.removeProperty('--QYL-protyle-padding-left');
            parentElement.style.removeProperty('--QYL-protyle-padding-right');
        }
        delete element._protylePaddingProcessed;
    }
}
let protylePaddingInstance = null;
function initProtylePadding() {
    if (!protylePaddingInstance) {
        protylePaddingInstance = new ProtylePadding();
    }
    return protylePaddingInstance;
}
initProtylePadding();
export default ProtylePadding;
