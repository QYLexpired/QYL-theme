import { initFusionTop, removeFusionTop } from '../basic/FusionTop.js';
let isEnabled = false;
let styleElement = null;
let dockObserver = null;
let fusionTopClassObserver = null; 
let debounceTimer = null;
let cachedDragElement = null; 
let fusionTopCheckTimer = null; 
let isInitializing = false;
export function initFusionOn() {
    if (document.body.classList.contains('QYLmobile')) return;
    if (isEnabled || isInitializing) return;
    isInitializing = true;
    try {
        if (styleElement) {
            styleElement.remove();
            styleElement = null;
        }
        if (dockObserver) {
            dockObserver.disconnect();
            dockObserver = null;
        }
        if (fusionTopClassObserver) {
            fusionTopClassObserver.disconnect();
            fusionTopClassObserver = null;
        }
        if (debounceTimer) {
            clearTimeout(debounceTimer);
            debounceTimer = null;
        }
        if (fusionTopCheckTimer) {
            clearTimeout(fusionTopCheckTimer);
            fusionTopCheckTimer = null;
        }
        initFusionTop();
        styleElement = document.createElement('style');
        styleElement.id = 'QYL-FusionOn';
        styleElement.textContent = `
            :root {
                --QYL-wnd-border-none: none; 
                --QYL-wnd-container-border-flat: 1px solid var(--b3-theme-surface-lighter); 
                --QYL-wnd-container-border-ink: 1.5px solid var(--b3-theme-primary);
            }
            #toolbar {
                background-color: transparent;
                border-bottom-color: transparent;
                margin-bottom: -38px;
                pointer-events: none;
                z-index: 5;
                -webkit-app-region: drag;
                app-region: drag;
            }
            #toolbar .toolbar__item {
                pointer-events: auto;
                -webkit-app-region: no-drag;
                app-region: no-drag;
            }
            #drag {
                opacity: 0;
            }
            :root {
                --QYL-FusionOn-Top-Transform: translateY(-1.5px);
                --QYL-FusionOn-Not-Top-Transform: translateY(-2.5px);
            }
            .layout__center :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] > .fn__flex:first-child {
                transform: var(--QYL-FusionOn-Top-Transform);
            }
            .layout__center :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"]:not(.QYLFusionTop) > .fn__flex:first-child {
                transform: var(--QYL-FusionOn-Not-Top-Transform);
            }
            .layout__center {
                padding-top: 3.75px;
                box-sizing: border-box;
                &#layouts {
                    padding-top: 3.75px;
                }
            }
            .layout__center [data-type="wnd"] > .fn__flex:first-child > .layout-tab-bar {
                background-color: transparent;
            }
            .layout__center [data-type="wnd"] > .fn__flex:first-child > .layout-tab-bar [data-type="tab-header"] {
                -webkit-app-region: no-drag;
                app-region: no-drag;
            }
            .layout__center [data-type="wnd"] > .fn__flex:first-child > .layout-tab-bar.layout-tab-bar--readonly {
                max-width: 80px;
                -webkit-app-region: drag;
                app-region: drag;
            }
            .layout__center [data-type="wnd"] > .fn__flex:first-child > .layout-tab-bar.layout-tab-bar--readonly :is([data-type="new"], [data-type="more"]) {
                -webkit-app-region: no-drag;
                app-region: no-drag;
            }
            .layout__center [data-type="wnd"] > .fn__flex:first-child + .layout-tab-container {
                border-radius: var(--b3-border-radius);
            }
            #layouts.layout__center [data-type="wnd"] > :is(.fn__flex-column, .fn__flex-1, .fn__flex):first-child {
                -webkit-app-region: drag;
                app-region: drag;
                & > .layout-tab-bar.layout-tab-bar--readonly {
                    max-width: 80px;
                }
            }
            .toolbar__window {
                -webkit-app-region: no-drag;
                app-region: no-drag;
            }
            .layout__center [data-type="wnd"] > .fn__flex:first-child.fn__none + .layout-tab-container {
                height: calc(100% - 34px);
                margin-top: 34px;
            }
            #dockLeft {
                padding-top: 38px;
            }
            #dockRight {
                padding-top: 38px;
            }
            :is(.layout__dockl, .layout__dockr):not(.layout--float)  {
                padding-top: 38px;
                min-height: 50%;
            }
            #layouts .layout__resize.layout__resize--lr {
                clip-path: inset(38px 0 0 0 round var(--b3-border-radius));
            }
            #layouts .layout--float.layout__dockb .layout__resize.layout__resize--lr {
                clip-path: none;
            }
            .QYLFusionTop > .fn__flex:first-child {
                transition: 0.45s cubic-bezier(0.33, 1.42, 0.69, 0.99);
            }
        `;
        document.head.appendChild(styleElement);
        const debounceDelay = 500;
        function getDragElement() {
            if (!cachedDragElement) {
                cachedDragElement = document.querySelector('#drag');
            }
            return cachedDragElement;
        }
        function adjustFusionTopMargin() {
            const fusionTopElements = document.querySelectorAll('.QYLFusionTop');
            const dragElement = getDragElement();
            if (!dragElement) {
                return;
            }
            fusionTopElements.forEach((fusionTop) => {
                const flexElement = fusionTop.querySelector('.fn__flex');
                if (!flexElement) {
                    return;
                }
                const fusionTopRect = fusionTop.getBoundingClientRect();
                const dragRect = dragElement.getBoundingClientRect();
                if (fusionTopRect.left < dragRect.left) {
                    const marginLeft = dragRect.left - fusionTopRect.left;
                    const currentMarginLeft = flexElement.style.marginLeft;
                    const newMarginLeft = `${marginLeft}px`;
                    if (currentMarginLeft !== newMarginLeft) {
                        flexElement.style.marginLeft = newMarginLeft;
                    }
                } else if (flexElement.style.marginLeft) {
                    flexElement.style.marginLeft = '';
                }
                if (fusionTopRect.right > dragRect.right) {
                    const marginRight = fusionTopRect.right - dragRect.right;
                    const currentMarginRight = flexElement.style.marginRight;
                    const newMarginRight = `${marginRight}px`;
                    if (currentMarginRight !== newMarginRight) {
                        flexElement.style.marginRight = newMarginRight;
                    }
                } else if (flexElement.style.marginRight) {
                    flexElement.style.marginRight = '';
                }
            });
        }
        function checkFusionTopReady() {
            const fusionTopElements = document.querySelectorAll('.QYLFusionTop');
            const layoutCenter = document.querySelector('.layout__center');
            const windows = layoutCenter ? layoutCenter.querySelectorAll('[data-type="wnd"]') : [];
            if (windows.length > 0 && fusionTopElements.length === 0) {
                initFusionTop(); 
                fusionTopCheckTimer = setTimeout(checkFusionTopReady, 100); 
                return;
            }
            adjustFusionTopMargin();
            observeDockElements();
            isEnabled = true;
            isInitializing = false;
        }
        function observeDockElements() {
            const dockLeft = document.querySelector('.layout__dockl');
            const dockRight = document.querySelector('.layout__dockr');
            if (!dockLeft && !dockRight) {
                setTimeout(() => observeDockElements(), 1000); 
                return;
            }
            dockObserver = new MutationObserver((mutations) => {
                const hasStyleChange = mutations.some(mutation => 
                    mutation.type === 'attributes' && mutation.attributeName === 'style'
                );
                if (hasStyleChange) {
                    debouncedAdjust(); 
                }
            });
            if (dockLeft) {
                dockObserver.observe(dockLeft, {
                    attributes: true,
                    attributeFilter: ['style']
                });
            }
            if (dockRight) {
                dockObserver.observe(dockRight, {
                    attributes: true,
                    attributeFilter: ['style']
                });
            }
            observeFusionTopParents();
        }
        function observeFusionTopParents() {
            fusionTopClassObserver = new MutationObserver((mutations) => {
                let shouldAdjust = false;
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const target = mutation.target;
                        const hadClass = mutation.oldValue && mutation.oldValue.includes('QYLFusionTop');
                        const hasClass = target.classList.contains('QYLFusionTop');
                        if (hadClass !== hasClass) {
                            shouldAdjust = true;
                        }
                    } else if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const target = mutation.target;
                        if (target.querySelector && target.querySelector('.QYLFusionTop')) {
                            shouldAdjust = true;
                        }
                    } else if (mutation.type === 'childList') {
                        if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
                            shouldAdjust = true;
                        }
                    }
                });
                if (shouldAdjust) {
                    debouncedAdjust(); 
                }
            });
            const layoutCenter = document.querySelector('.layout__center');
            if (layoutCenter) {
                fusionTopClassObserver.observe(layoutCenter, {
                    attributes: true,
                    childList: true,  
                    subtree: true,
                    attributeFilter: ['class', 'style'],
                    attributeOldValue: true 
                });
            } else {
                setTimeout(() => observeFusionTopParents(), 1000); 
            }
        }
        function debouncedAdjust() {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
            debounceTimer = setTimeout(() => {
                adjustFusionTopMargin();
            }, debounceDelay);
        }
        setTimeout(checkFusionTopReady, 100);
    } catch (error) {
        isInitializing = false;
    }
}
export async function removeFusionOn() {
    if (!isEnabled && !isInitializing) return;
    isEnabled = false;
    isInitializing = false;
    if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
    }
    if (fusionTopCheckTimer) {
        clearTimeout(fusionTopCheckTimer);
        fusionTopCheckTimer = null;
    }
    if (dockObserver) {
        dockObserver.disconnect();
        dockObserver = null;
    }
    if (fusionTopClassObserver) {
        fusionTopClassObserver.disconnect();
        fusionTopClassObserver = null;
    }
    if (styleElement) {
        styleElement.remove();
        styleElement = null;
    }
    const layoutCenter = document.querySelector('.layout__center');
    if (layoutCenter) {
        const windows = layoutCenter.querySelectorAll('[data-type="wnd"]');
        windows.forEach((window) => {
            const flexElement = window.querySelector('.fn__flex');
            if (flexElement) {
                flexElement.style.marginLeft = '';
                flexElement.style.marginRight = '';
            }
        });
    }
    const fusionTopElements = document.querySelectorAll('.QYLFusionTop');
    fusionTopElements.forEach((element) => {
        element.classList.remove('QYLFusionTop');
    });
    try {
        removeFusionTop();
    } catch (error) {
    }
    cachedDragElement = null;
}
export function isFusionOnEnabled() {
    return isEnabled;
}
