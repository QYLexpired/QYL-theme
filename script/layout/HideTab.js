export function initHideTab() {
    if (document.body.classList.contains('QYLmobile')) return;
    const style = document.createElement('style');
    style.id = 'QYL-HideTab';
    style.textContent = `
        .layout__center :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] > .fn__flex:first-child {
            opacity: 0;
            background-color: transparent;
            z-index: 4;
            border: none;
            margin-bottom: -36.5px !important;
            & > .layout-tab-bar {
                border: none;
                background-color: transparent;
                &.layout-tab-bar.layout-tab-bar--readonly {
                    max-width: 80px;
                }
                & [data-type="tab-header"], [data-type="new"], [data-type="more"] {
                    backdrop-filter: blur(10px);
                }
            }
            &:hover {
                opacity: 1;
            }
            & + .layout-tab-container {
                border-radius: var(--b3-border-radius);
                & > .fn__flex-1.protyle:not(.fullscreen) .protyle-breadcrumb {/* 只隐藏protyle的面包屑 */
                    opacity: 0;
                    padding-top: 46.5px;
                    margin-bottom: -76.5px;
                    background-color: transparent;
                    z-index: 3;
                    transform: translateY(-3px);
                    transition: var(--b3-transition);
                    &:hover {
                        opacity: 1;
                    }
                    & .protyle-breadcrumb__bar {
                        background-color: rgb(from var(--b3-theme-background) r g b / 50%);
                        border-radius: var(--b3-border-radius);
                        backdrop-filter: blur(10px);
                        transform: translateX(-5px);
                    }
                    & .block__icon {
                        background-color: rgb(from var(--b3-theme-background) r g b / 50%);
                        backdrop-filter: blur(10px);
                        &[data-type="more"] {
                            margin-right: 5px;
                        }
                    }
                    &:has(button[data-type="exit-focus"]:not(.fn__none)) {
                        opacity: 1;
                    }
                    & + .protyle-content {
                        padding-top: 76.5px;
                            .protyle-top {
                                margin-top: -76.5px;
                            }
                            & .protyle-background__img.fn__none+.protyle-background__ia {
                                padding-top: 80px;
                            }
                    }
                }
            }
        }
        .layout__center :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] .layout-tab-container {
            background-color: var(--b3-theme-background);
            & > :not(.protyle) {
                margin-top: 43.5px;
            }
        }
        .protyle-background__img .protyle-icons {
            top: 80px
        }
        /* 吸顶调整 */
        html[data-en_enabled_module~=EnableLifelogTag] [data-type=NodeParagraph][custom-lifelog-type] {
            position: sticky;
            top: -12px;
            z-index: 2;
        }
        /* 数据库 */
        .av__row--header[style*="transform"] { 
            top: 80px;
            &::before {
                content: "";
                position: absolute;
                top: -80px;
                left: 0;
                height: 80px;
                width: 100%;
                background-color: var(--b3-theme-background);
            }
        }
        /* 固定工具栏修复 */
        .protyle-toolbar {
            --QYL-fixedtoolbar-fix: 75px;
        }
        /* 预览模式 */
        .protyle-preview {
            margin-top: 63.5px
        }
        .fullscreen .protyle-preview {
            margin-top: 0;
        }
        /* 适配伪文档面包屑插件 */
        .og-fake-doc-breadcrumb-container.protyle-breadcrumb {
            transform: translateY(30px);
        }
    `;
    document.head.appendChild(style);
}
export function removeHideTab() {
    const style = document.getElementById('QYL-HideTab');
    if (style) {
        style.remove();
    }
}
