export function initBorderFileTree() {
    const style = document.createElement('style');
    style.id = 'QYL-BorderFileTree';
    style.textContent = `
        :root {
            --QYL-border-filetree: color-mix(in srgb, var(--b3-theme-on-surface-light) 30%, transparent);
        }
        .sy__file {
            & .fn__flex-1 > ul {
                border: 1px solid var(--QYL-border-filetree);
                border-radius: var(--b3-border-radius);
                margin: 0 5px 5px 5px;
                &:has( > ul) {
                    padding-bottom: 1px;
                    & > [data-type="navigation-root"] {
                        margin-bottom: 1px;
                        border-radius: var(--b3-border-radius) var(--b3-border-radius) 0 0;
                    }
                }
            }
            & [data-type="navigation-root"] {
                margin: 0;
                &::before {
                    display: none;
                }
            }
            & [data-type="navigation-file"] {
                margin-left: 0;
                margin-right: 0;
                border-radius: 0;
            }
        }
        /* 缩进线修复 */
        .file-tree.sy__file > .fn__flex-1 > ul > ul,
        .QYLmobile #sidebar [data-type="sidebar-file"] > .fn__flex-1 > ul > ul {
            --QYL-indent-1: 12px !important;
            & > ul {
                --QYL-indent-1: 30px !important;
                & > ul {
                    --QYL-indent-1: 48px !important;
                    & > ul {
                        --QYL-indent-1: 66px !important;
                        & > ul {
                            --QYL-indent-1: 84px !important;
                            & > ul {
                                --QYL-indent-1: 102px !important;
                                & > ul {
                                    --QYL-indent-1: 120px !important;
                                    & > ul {
                                        --QYL-indent-1: 138px !important;
                                        & > ul {
                                            --QYL-indent-1: 156px !important;
                                            & > ul {
                                                --QYL-indent-1: 174px !important;
                                                & > ul {
                                                    --QYL-indent-1: 192px !important;
                                                    & > ul {
                                                        --QYL-indent-1: 210px !important;
                                                        & > ul {
                                                            --QYL-indent-1: 228px !important;
                                                            & > ul {
                                                                --QYL-indent-1: 246px !important;
                                                            }
                                                            & > ul {
                                                                --QYL-indent-1: 264px !important;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        /* 多彩文档树兼容 */
        .QYLColorfulFileTree {
            & .sy__file ul.b3-list.b3-list--background {
                margin-left: 5px;
                border: 1px solid var(--QYL-colorful-file);
                background-color: color-mix(in srgb, var(--QYL-colorful-file-background) 30%, transparent);
                --b3-list-hover: var(--QYL-colorful-file-background);
                --b3-list-icon-hover: var(--QYL-colorful-file-background);
            }
            & .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul.b3-list.b3-list--background {
                margin-left: 5px;
                border: 1px solid var(--QYL-colorful-file);
                background-color: color-mix(in srgb, var(--QYL-colorful-file-background) 30%, transparent);
                --b3-list-hover: var(--QYL-colorful-file-background);
                --b3-list-icon-hover: var(--QYL-colorful-file-background);
            }
            &[data-theme-mode="dark"] {
                & .sy__file ul.b3-list.b3-list--background {
                    background-color: color-mix(in srgb, var(--QYL-colorful-file-background) 65%, transparent);
                }
                & .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul.b3-list.b3-list--background {
                    background-color: color-mix(in srgb, var(--QYL-colorful-file-background) 65%, transparent);
                }
            }
        }
        /* 手机端边框化 */
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 {
            & > ul.b3-list.b3-list--background {
                border: 1px solid var(--b3-theme-primary);
                border-radius: var(--b3-border-radius);
                margin: 0 5px 5px 5px;
                &:has(ul) {
                    padding-bottom: 1px;
                    & > [data-type="navigation-root"] {
                        margin-bottom: 1px;
                        border-radius: var(--b3-border-radius) var(--b3-border-radius) 0 0;
                    }
                }
            }
            & [data-type="navigation-root"] {
                margin: 0;
                &::before {
                    display: none;
                }
            }
            & [data-type="navigation-file"] {
                margin-left: 0;
                margin-right: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
export function removeBorderFileTree() {
    const style = document.getElementById('QYL-BorderFileTree');
    if (style) {
        style.remove();
    }
}
