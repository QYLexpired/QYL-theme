export function initFrostedGlass() {
    const style = document.createElement('style');
    style.id = 'QYL-FrostedGlass';
    style.textContent = `
        :root {
            --QYL-Aero-filter: blur(40px) saturate(2.8);
            --QYL-Aero-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12) inset,0 2px 1px -1px rgba(255, 255, 255, 0.2) inset;
            &.QYLFlatStyle {
                --QYL-Aero-shadow: none;
            }
        }
        /* 菜单 */
        .b3-menu, .b3-menu__submenu {
            background-color: var(--QYL-Aero-background);
            & .b3-menu__items, .b3-menu__item {
                &:not(.b3-menu__item--current:not(.b3-menu__item--readonly), .b3-menu__item--show):not(:hover) {
                    background-color: rgba(255, 0, 0, 0); 
                }
                &.b3-menu__item--readonly:hover {
                    background-color: rgba(255, 0, 0, 0);
                }
            }
            &::before {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                border-radius: inherit;
                box-shadow: var(--QYL-Aero-shadow);
                backdrop-filter: var(--QYL-Aero-filter);
                z-index: -1;
            }
        }
        /* 窗口 */
        .b3-dialog__scrim {
            background-color: rgba(255, 0, 0, 0);
            backdrop-filter: blur(1px) brightness(0.85);
        }
        [data-theme-mode="dark"] .b3-dialog__scrim {
            background-color: rgba(255, 0, 0, 0);
            backdrop-filter: blur(1px) brightness(0.75);
        }
        .b3-dialog__container {
            background-color: var(--QYL-Aero-background);
            & .config__tab-wrap {
                background-color: var(--QYL-Aero-background-wrap);
            }
            & .b3-label:not(.b3-label--inner) {
                box-shadow: none;
            }
            &::before {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                border-radius: inherit;
                box-shadow: var(--QYL-Aero-shadow);
                backdrop-filter: var(--QYL-Aero-filter);
                z-index: -1;
            }
        }
        /* 集市 */
        .config-bazaar__readme--show {
            background-color: var(--QYL-Aero-background);
            backdrop-filter: var(--QYL-Aero-filter);
        }
        /* 闪卡 */
        #cardPreview {
            background-color: rgba(255, 0, 0, 0);
            & .protyle-breadcrumb {
                background-color: rgba(255, 0, 0, 0);
            }
        }
        .card__main {
            background-color: rgba(255, 0, 0, 0);
            & .protyle {
                background-color: rgba(255, 0, 0, 0);
                & .protyle-breadcrumb {
                    background-color: rgba(255, 0, 0, 0);
                }
            }
        }
        [data-key="dialog-opencard"] {
            & .b3-dialog__scrim {
                background-color: rgba(255, 0, 0, 0) !important;
                backdrop-filter: blur(40px) saturate(0.9);
            }
        }
        /* 侧栏钉住 */
        .layout--float {
            background-color: rgba(255, 0, 0, 0);
            & > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] > .layout-tab-container {
                background-color: var(--QYL-Aero-background);
                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    border-radius: inherit;
                    box-shadow: var(--QYL-Aero-shadow);
                    backdrop-filter: var(--QYL-Aero-filter);
                    z-index: -1;
                }
            }
        }
        /* 编辑器工具栏 */
        .protyle-toolbar, .protyle-util, .protyle-hint, .protyle-util .block__icons {
            background-color: var(--QYL-Aero-background);
            backdrop-filter: blur(40px) saturate(3) brightness(1.1);
        }
        /* 状态栏 */
        @media (min-width: 768px) {
            #status {
                background-color: var(--QYL-Aero-background);
                backdrop-filter: blur(40px) saturate(3) brightness(1.1);
            }
        }
        /* 斜杠菜单 */
        .protyle-hint.hint--menu {
            background-color: var(--QYL-Aero-background);
            backdrop-filter: blur(40px) saturate(3) brightness(1.1);
        }
        /* 提示气泡 */
        .tooltip {
            background-color: var(--QYL-Aero-background);
            color: var(--b3-theme-on-background);
            backdrop-filter: var(--QYL-Aero-filter);
        }
        #message .b3-snackbar__content {
            background-color: var(--QYL-Aero-background);
            color: var(--b3-theme-on-background);
            &::before {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                border-radius: inherit;
                box-shadow: var(--QYL-Aero-shadow);
                backdrop-filter: var(--QYL-Aero-filter);
                z-index: -1;
            }
        } 
        /* 块引用预览 */
        .protyle-wysiwyg [data-node-id].list {/* 修复毛玻璃失效 */
            z-index: 1; 
        }
        .block__popover.block__popover--open {
            background-color: var(--QYL-Aero-background);
            &::before {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                border-radius: inherit;
                box-shadow: var(--QYL-Aero-shadow);
                backdrop-filter: var(--QYL-Aero-filter);
                z-index: -1;
            }
            & .protyle {
                background-color: rgba(255, 0, 0, 0);
                & .protyle-breadcrumb {
                    background-color: rgba(255, 0, 0, 0);
                }
            }
        }
        /* 修复嵌入块按钮无法点击 */
        .protyle-icons { 
            z-index:2 
        }
        /* PDF界面 */
        #dialogContainer>.dialog--open {
            background-color: var(--QYL-Aero-background);
            &::before {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                border-radius: inherit;
                box-shadow: var(--QYL-Aero-shadow);
                backdrop-filter: var(--QYL-Aero-filter);
                z-index: -1;
            }
        }
        /* 搜索 */
        :is(div[data-key="dialog-globalsearch"], div[data-key="dialog-search"], [data-key="dialog-replace"]) {
            & .search__header {
                background-color: var(--QYL-Aero-background-wrap);
            }
            & .search__list {
                background-color: var(--QYL-Aero-background-wrap);
            }
            & .search__preview {
                background-color: var(--QYL-Aero-background-wrap);
                & .protyle-breadcrumb {
                    background-color: rgba(255, 0, 0, 0);
                }
            }
        }
        /* 命令面板 */
        div[data-key="dialog-commandpanel"] {
            & .search__header {
                & .b3-text-field {
                    background-color: var(--QYL-Aero-background-wrap);
                }
            }
            & .search__list {
                background-color: var(--QYL-Aero-background-wrap);
            }
        }
        /* 全屏修复 */
        .fullscreen {
            background-color: var(--b3-theme-background) !important;
            backdrop-filter: none !important;
        }
    `;
    document.head.appendChild(style);
}
export function removeFrostedGlass() {
    const style = document.getElementById('QYL-FrostedGlass');
    if (style) {
        style.remove();
    }
}
