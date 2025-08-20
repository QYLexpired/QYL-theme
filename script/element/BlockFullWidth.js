import { isMobile } from '../basic/Device.js';
class BlockFullWidth {
    constructor() {
        this.targetElement = null;
        this.observer = null;
        this.mutationObserver = null;
        this.retryCount = 0;
        this.maxRetries = 15;
        this.retryInterval = 100;
        this.isInitialized = false;
        this.debounceTimers = new Map(); 
        this.debounceDelay = 500; 
        this.targetDebounceTimer = null; 
        this.targetDebounceDelay = 1000; 
        this.targetSelector = isMobile ? '#editor' : '.layout__center';
        this.init();
    }
    async init() {
        if (this.isInitialized) return;
        await this.findTargetElement();
        if (this.targetElement) {
            this.setupObservers();
            this.processExistingElements();
            this.isInitialized = true;
            document.documentElement.classList.add('QYLBlockFullWidth');
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
                    console.warn(`BlockFullWidth: 无法找到 ${this.targetSelector} 元素，已达到最大重试次数`);
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
        if (this.targetDebounceTimer) {
            clearTimeout(this.targetDebounceTimer);
        }
        this.targetDebounceTimer = setTimeout(() => {
            this.processAllProtyleElements();
        }, this.targetDebounceDelay);
    }
    processAllProtyleElements() {
        if (!this.targetElement) return;
        const protyleElements = this.targetElement.querySelectorAll('.protyle-wysiwyg');
        protyleElements.forEach(element => {
            if (!element._blockFullWidthProcessed) {
                this.processProtyleElement(element);
                element._blockFullWidthProcessed = true;
            }
        });
    }
    processExistingElements() {
        if (!this.targetElement) return;
        const protyleElements = this.targetElement.querySelectorAll('.protyle-wysiwyg');
        protyleElements.forEach(element => {
            this.processProtyleElement(element);
            element._blockFullWidthProcessed = true;
        });
    }
    processProtyleElement(element) {
        if (!element || !element.style) return;
        this.updatePaddingVariables(element);
        this.observeStyleChanges(element);
        element._blockFullWidthProcessed = true;
    }
    updatePaddingVariables(element) {
        const computedStyle = window.getComputedStyle(element);
        const paddingLeft = computedStyle.paddingLeft;
        const paddingRight = computedStyle.paddingRight;
        const currentLeft = element.style.getPropertyValue('--QYL-protyle-padding-left');
        const currentRight = element.style.getPropertyValue('--QYL-protyle-padding-right');
        if (currentLeft !== paddingLeft) {
            element.style.setProperty('--QYL-protyle-padding-left', paddingLeft);
        }
        if (currentRight !== paddingRight) {
            element.style.setProperty('--QYL-protyle-padding-right', paddingRight);
        }
    }
    observeStyleChanges(element) {
        const styleObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const oldValue = mutation.oldValue || '';
                    const newValue = element.getAttribute('style') || '';
                    if (this.isOnlyCSSVariableChange(oldValue, newValue)) {
                        return;
                    }
                    this.debouncedUpdatePadding(element);
                }
            });
        });
        styleObserver.observe(element, {
            attributes: true,
            attributeFilter: ['style'],
            attributeOldValue: true 
        });
        if (!element._blockFullWidthObservers) {
            element._blockFullWidthObservers = [];
        }
        element._blockFullWidthObservers.push(styleObserver);
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
    debouncedUpdatePadding(element) {
        if (this.debounceTimers.has(element)) {
            clearTimeout(this.debounceTimers.get(element));
        }
        const timer = setTimeout(() => {
            this.updatePaddingVariables(element);
            this.debounceTimers.delete(element);
        }, this.debounceDelay);
        this.debounceTimers.set(element, timer);
    }
    cleanup() {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }
        if (this.targetElement) {
            const protyleElements = this.targetElement.querySelectorAll('.protyle-wysiwyg');
            protyleElements.forEach(element => {
                if (element._blockFullWidthObservers) {
                    element._blockFullWidthObservers.forEach(observer => {
                        observer.disconnect();
                    });
                    element._blockFullWidthObservers = [];
                }
                element.style.removeProperty('--QYL-protyle-padding-left');
                element.style.removeProperty('--QYL-protyle-padding-right');
                delete element._blockFullWidthProcessed;
            });
        }
        this.debounceTimers.forEach(timer => {
            clearTimeout(timer);
        });
        this.debounceTimers.clear();
        if (this.targetDebounceTimer) {
            clearTimeout(this.targetDebounceTimer);
            this.targetDebounceTimer = null;
        }
        document.documentElement.classList.remove('QYLBlockFullWidth');
        this.isInitialized = false;
    }
    async reinit() {
        this.cleanup();
        this.retryCount = 0;
        await this.init();
    }
}
let blockFullWidthInstance = null;
export function initBlockFullWidth() {
    if (!blockFullWidthInstance) {
        blockFullWidthInstance = new BlockFullWidth();
    }
    return blockFullWidthInstance;
}
export function getBlockFullWidth() {
    return blockFullWidthInstance;
}
export function cleanupBlockFullWidth() {
    if (blockFullWidthInstance) {
        blockFullWidthInstance.cleanup();
        blockFullWidthInstance = null;
    }
}
export default BlockFullWidth;
