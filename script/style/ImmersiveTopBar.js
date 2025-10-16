export function initImmersiveTopBar() {
    if (document.body.classList.contains('QYLmobile')) return;
    const style = document.createElement('style');
    style.id = 'QYL-ImmersiveTopBar';
    style.textContent = `
        :root {
            --QYL-Immersive-TopBar: var(--b3-theme-primary);
            &.QYLCustomColor {
                --QYL-Immersive-TopBar: oklch(calc(0.55 + var(--b3-theme-primary-brightness) * 0.01) calc(0.25 * max(0.15, var(--b3-theme-primary-saturate))) var(--b3-theme-primary-main));
            }
            &[data-theme-mode="dark"] {
                --QYL-Immersive-TopBar: var(--b3-theme-primary);
                &.QYLCustomColor {
                    --QYL-Immersive-TopBar: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.01) calc(0.15 * max(0.15, var(--b3-theme-primary-saturate))) var(--b3-theme-primary-main));
                }
            }
        }
        html:not(.QYLFusionOn):not(.QYLColorBlock) #toolbar {
            background-color: var(--QYL-Immersive-TopBar);
            --b3-toolbar-color: var(--b3-theme-on-primary);
            & > * {
                transform: translateY(0px);
                &:hover {
                    --b3-theme-primary: var(--b3-toolbar-color);
                    --b3-theme-primary-fix: var(--b3-toolbar-color);
                }
            }
            & #barWorkspace {
                background-color: transparent;
                & .toolbar__text {
                    color: var(--b3-toolbar-color);
                }
                &:hover {
                    background-color: var(--b3-toolbar-color);
                    & .toolbar__text {
                        color: var(--QYL-Immersive-TopBar);
                    }
                }
            }
            & #minWindow, #restoreWindow {
                &:hover {
                    color: var(--QYL-Immersive-TopBar);
                    background-color: var(--b3-theme-on-primary);
                }
            }
        }
        .QYLFusionOn:not(.QYLColorBlock):not(.QYLFullHeight):not(.QYLHideTab) #layouts:not(.layout__center) {
            box-shadow: 0 38px 0 0 var(--QYL-Immersive-TopBar) inset;
        }
        .QYLFusionOn:not(.QYLColorBlock):not(.QYLFullHeight):not(.QYLHideTab) .dock--vertical {
            box-shadow: 0 38px 0 0 var(--QYL-Immersive-TopBar) inset;
        }
        .QYLFusionOn:not(.QYLColorBlock):not(.QYLFullHeight):not(.QYLHideTab) #toolbar {
            --b3-toolbar-color: var(--b3-theme-on-primary);
            & > * {
                transform: translateY(0px);
                &:hover {
                    --b3-theme-primary: var(--b3-toolbar-color);
                    --b3-theme-primary-fix: var(--b3-toolbar-color);
                }
            }
            & #barWorkspace {
                background-color: transparent;
                & .toolbar__text {
                    color: var(--b3-toolbar-color);
                }
                &:hover {
                    background-color: var(--b3-toolbar-color);
                    & .toolbar__text {
                        color: var(--QYL-Immersive-TopBar);
                    }
                }
            }
            & #minWindow, #restoreWindow {
                &:hover {
                    color: var(--QYL-Immersive-TopBar);
                    background-color: var(--b3-theme-on-primary);
                }
            }
        }
        .QYLFusionOn:not(.QYLColorBlock):not(.QYLFullHeight):not(.QYLHideTab) .layout__center :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"].QYLFusionTop > .fn__flex:first-child {
            --b3-toolbar-color: var(--b3-theme-on-primary);
            --QYL-FusionOn-Top-Transform: translateY(-4px);
            --QYL-tab-item: var(--QYL-Immersive-TopBar);
            --QYL-tab-item-focus: var(--b3-toolbar-color);
            --b3-theme-on-surface: var(--b3-toolbar-color);
            & [data-type="tab-header"] {
                height: 24px !important;
            }
            & .item:not(.item--readonly) {
                outline: none !important;
                box-shadow: none !important;
                background-color: transparent !important;
                & .item__text {
                    color: var(--b3-toolbar-color) !important;
                }
                &:hover {   
                    background-color: var(--b3-toolbar-color) !important;
                    & .item__text {
                        color: var(--QYL-Immersive-TopBar) !important;
                    }
                }
            }
            & .item.item--focus {
                background-color: var(--b3-toolbar-color) !important;
                & .item__text {
                    color: var(--QYL-Immersive-TopBar) !important;
                }
            }
            & .item__close {
                --b3-theme-on-surface: var(--QYL-Immersive-TopBar);
            }
        }
        html:not(.QYLColorBlock):not(.QYLFullHeight):not(.QYLHideTab) .layout-tab-bar .item--pin+.item:not(.item--pin,.item--readonly) {
            &::before {
                height: 16px !important;
            }
        }
        html:not(.QYLColorBlock):not(.QYLFullHeight):not(.QYLHideTab) #QYLButton:not(:hover) {
            --b3-theme-primary: var(--b3-toolbar-color);
        }
    `;
    document.head.appendChild(style);
}
export function removeImmersiveTopBar() {
    const style = document.getElementById('QYL-ImmersiveTopBar');
    if (style) {
        style.remove();
    }
}
