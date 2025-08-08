import { initWndTopLeft, cleanupWndTopLeft, setVerticalTabResizeCallback } from '../basic/WndTopLeft.js';
let isEnabled = false;
let styleElement = null;
function createResizeElement() {
    const resizeElement = document.createElement('div');
    resizeElement.className = 'layout__resize--lr layout__resize';
    let isDragging = false;
    let startX = 0;
    let startWidth = 0;
    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.clientX;
        startWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--QYL-vertical-width')) || 125;
        document.body.style.cursor = 'col-resize';
        e.preventDefault();
    };
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(85, Math.min(800, startWidth + deltaX));
        if (!resizeElement._rafId) {
            resizeElement._rafId = requestAnimationFrame(() => {
                document.documentElement.style.setProperty('--QYL-vertical-width', newWidth + 'px');
                resizeElement._rafId = null;
            });
        }
    };
    const handleMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = '';
            if (resizeElement._rafId) {
                cancelAnimationFrame(resizeElement._rafId);
                resizeElement._rafId = null;
            }
        }
    };
    const handleDblClick = (e) => {
        document.documentElement.style.setProperty('--QYL-vertical-width', '125px');
        e.preventDefault();
    };
    resizeElement.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    resizeElement.addEventListener('dblclick', handleDblClick);
    resizeElement._eventHandlers = {
        mousedown: handleMouseDown,
        mousemove: handleMouseMove,
        mouseup: handleMouseUp,
        dblclick: handleDblClick
    };
    return resizeElement;
}
function cleanupResizeElement(resizeElement) {
    if (!resizeElement || !resizeElement._eventHandlers) return;
    if (resizeElement._rafId) {
        cancelAnimationFrame(resizeElement._rafId);
        resizeElement._rafId = null;
    }
    resizeElement.removeEventListener('mousedown', resizeElement._eventHandlers.mousedown);
    document.removeEventListener('mousemove', resizeElement._eventHandlers.mousemove);
    document.removeEventListener('mouseup', resizeElement._eventHandlers.mouseup);
    resizeElement.removeEventListener('dblclick', resizeElement._eventHandlers.dblclick);
    delete resizeElement._eventHandlers;
    delete resizeElement._rafId;
    if (resizeElement.parentNode) {
        resizeElement.parentNode.removeChild(resizeElement);
    }
}
function addResizeToAllWndTopLeft() {
    const wndTopLeftElements = document.querySelectorAll('.QYLWndTopLeft');
    wndTopLeftElements.forEach(element => {
        const firstFlex = element.querySelector('.fn__flex:first-child');
        if (firstFlex && !firstFlex.nextElementSibling?.classList.contains('layout__resize--lr')) {
            const resizeElement = createResizeElement();
            firstFlex.after(resizeElement);
        }
    });
}
export function addResizeToWndTopLeft(element) {
    if (!isEnabled) return;
    const firstFlex = element.querySelector('.fn__flex:first-child');
    if (firstFlex && !firstFlex.nextElementSibling?.classList.contains('layout__resize--lr')) {
        const resizeElement = createResizeElement();
        firstFlex.after(resizeElement);
    }
}
export function initVerticalTab() {
    if (isEnabled) return;
    if (document.body.classList.contains('QYLmobile')) return;
    styleElement = document.createElement('style');
    styleElement.id = 'QYL-VerticalTab';
    styleElement.textContent = `
        :root {
            --QYL-vertical-width: 125px;
        }
        .layout__center:not(#layouts) .QYLWndTopLeft {
            --QYL-wnd-border-none: none;
            --QYL-wnd-container-border-flat: 1px solid var(--b3-theme-surface-lighter);
            --QYL-wnd-container-border-ink: 1.5px solid var(--b3-theme-primary);
            flex-direction: row;
            height: 100%;
            & > .fn__flex:first-child {
                flex: 0 0 auto;
                min-width: var(--QYL-vertical-width);
                max-width: var(--QYL-vertical-width);
                flex-direction: column;
                border-radius: var(--b3-border-radius);
                overflow: hidden;
                border: var(--QYL-wnd-layout-tab-border-flat, var(--QYL-wnd-layout-tab-border-ink));
                & > .layout-tab-bar:not(.layout-tab-bar--readonly) {
                    flex: 1;
                    flex-direction: column;
                    & .item {
                        align-self: center;
                        width: calc(100% - 12px);
                        max-width: var(--QYL-vertical-width);
                        margin: 3px 0;
                        &:first-child {
                            margin-top: 6px;
                        }
                        & .item__close {
                            opacity: 0;
                            margin-right: -25px;
                            transition: var(--b3-transition);
                        }
                        & .item__text {
                            max-width: fit-content;
                        }
                        &:hover .item__close {
                            opacity: 1;
                            margin-right: 0px;
                            transition: var(--b3-transition);
                        }
                    }
                }
                & > .layout-tab-bar--readonly {
                    flex: none;
                    & > .item--readonly {
                        padding: 0 8px;
                    }
                }
            }
            & > .layout-tab-container {
                border-radius: var(--b3-border-radius);
            }
            & .layout-tab-bar li[data-type="tab-header"].item:not(.item--pin, .item--full) :is(.item__icon,.item__graphic, .item__text) {
                transform: translateX(0px)  !important;
                transition: var(--b3-transition);
            }
            & .layout-tab-bar li[data-type="tab-header"].item:not(.item--pin, .item--full):hover :is(.item__icon,.item__graphic, .item__text) {
                transform: translateX(0px);
                transition: var(--b3-transition);
            }
            & .layout-tab-bar .item__close {
                margin-left: auto;
            }
            & .layout-tab-bar .item--pin .item__text  {
                display: unset !important;
            }
            & .layout-tab-bar .item--pin .item__graphic, .layout-tab-bar .item--pin .item__icon {
                padding: 4px 0px 4px 8px !important;
            }
            & .layout-tab-bar .item--pin+.item:not(.item--pin,.item--readonly) {
                margin-top: 15px !important ;
                margin-left : 0 !important;
                overflow: visible;
                &::before {
                    content: "" !important;
                    display: unset !important;
                    position: absolute !important;
                    background-color: var(--QYL-tab-item-focus) !important;
                    border-radius: 99px !important;
                    width: calc(var(--QYL-vertical-width) - 24px) !important;
                    height: 2px !important;
                    top: -10px !important;
                    left: calc(calc((var(--QYL-vertical-width) - 100%) * 0.5)) !important;
                    transform: none !important;
                }
            }
        }
        .QYLWndTopLeft > .fn__flex.fn__none:first-child + .layout__resize.layout__resize--lr {
            display: none;
        }
    `;
    document.head.appendChild(styleElement);
    initWndTopLeft();
    setVerticalTabResizeCallback(addResizeToWndTopLeft);
    addResizeToAllWndTopLeft();
    isEnabled = true;
}
export function removeVerticalTab() {
    if (!isEnabled) return;
    const resizeElements = document.querySelectorAll('.layout__resize--lr.layout__resize');
    resizeElements.forEach(cleanupResizeElement);
    if (styleElement) {
        styleElement.remove();
        styleElement = null;
    }
    setVerticalTabResizeCallback(null);
    cleanupWndTopLeft();
    const elements = document.querySelectorAll('.QYLWndTopLeft');
    elements.forEach(element => {
        element.classList.remove('QYLWndTopLeft');
    });
    isEnabled = false;
    if (window.gc) {
        window.gc();
    }
}
export function isVerticalTabEnabled() {
    return isEnabled;
}
