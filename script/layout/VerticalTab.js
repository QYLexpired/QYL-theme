import { initWndTopLeft, cleanupWndTopLeft } from '../basic/WndTopLeft.js';
let isEnabled = false;
let styleElement = null;
export function initVerticalTab() {
    if (isEnabled) return;
    if (document.body.classList.contains('QYLmobile')) return;
    styleElement = document.createElement('style');
    styleElement.id = 'QYL-VerticalTab';
    styleElement.textContent = `
        :root {
            --QYL-wnd-border-none: none;/* 适配扁平化、墨水屏 */
            --QYL-wnd-container-border-flat: 1px solid var(--b3-theme-surface-lighter);/* 适配扁平化 */
            --QYL-wnd-container-border-ink: 2px solid var(--b3-theme-primary);/* 适配墨水屏 */
            --QYL-vertical-width: 125px;
        }
        .layout__center:not(#layouts) .QYLWndTopLeft {
            display: flex;
            flex-direction: row;
            height: 100%;
            & > .fn__flex:first-child {
                flex: 0 0 auto;
                min-width: var(--QYL-vertical-width);
                max-width: var(--QYL-vertical-width);
                margin-right: 6px;
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
                        &:hover .item__close {
                            opacity: 1;
                            margin-right: 0px;
                            transition: var(--b3-transition);
                        }
                    }
                }
                & > .layout-tab-bar--readonly {
                    flex: none;
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
    `;
    document.head.appendChild(styleElement);
    initWndTopLeft();
    isEnabled = true;
}
export function removeVerticalTab() {
    if (!isEnabled) return;
    if (styleElement) {
        styleElement.remove();
        styleElement = null;
    }
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
