export function initMultilevelList() {
    const style = document.createElement('style');
    style.id = 'snippet-QYL-MultilevelList';
    style.textContent = `
        /* 有序列表 */
        .list[data-subtype="o"] {
            counter-reset: o-counter-1 0 o-counter-2 0 o-counter-3 0 o-counter-4 0 o-counter-5 0 o-counter-6 0 o-counter-7 0 o-counter-8 0 o-counter-9 0;
        }
        .protyle-wysiwyg [data-node-id].li[data-subtype="o"] {
            counter-increment: o-counter-1;
            & > .protyle-action {
                color: transparent !important;
                &::after {
                    content: counter(o-counter-1) ".";
                    color: var(--b3-theme-on-surface);
                    display: flex;
                    align-items: center;
                    margin: -0.5em 0 0 -0.4em;
                    text-indent: 0.1em;
                }
            }
            &:is(.en_item_bullet_actived, [fold="1"]) {
                & > .protyle-action {
                    &::after {
                        color: var(--b3-theme-primary);
                        color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main));
                    }
                }
            }
            & .li[data-subtype="o"] {
                counter-increment: o-counter-2;
                & > .protyle-action {
                    &::after {
                        content: counter(o-counter-2, lower-alpha) ".";
                    }
                }
                & .li[data-subtype="o"] {
                    counter-increment: o-counter-3;
                    & > .protyle-action {
                        &::after {
                            content: counter(o-counter-3, lower-roman) ".";
                        }
                    }
                    & .li[data-subtype="o"] {
                        counter-increment: o-counter-4;
                        & > .protyle-action {
                            &::after {
                                content: counter(o-counter-4) ".";
                            }
                        }
                        & .li[data-subtype="o"] {
                            counter-increment: o-counter-5;
                            & > .protyle-action {
                                &::after {
                                    content: counter(o-counter-5, lower-alpha) ".";
                                }
                            }
                            & .li[data-subtype="o"] {
                                counter-increment: o-counter-6;
                                & > .protyle-action {
                                    &::after {
                                        content: counter(o-counter-6, lower-roman) ".";
                                    }
                                }
                                & .li[data-subtype="o"] {
                                    counter-increment: o-counter-7;
                                    & > .protyle-action {
                                        &::after {
                                            content: counter(o-counter-7) ".";
                                        }
                                    }
                                    & .li[data-subtype="o"] {
                                        counter-increment: o-counter-8;
                                        & > .protyle-action {
                                            &::after {
                                                content: counter(o-counter-8, lower-alpha) ".";
                                            }
                                        }
                                        & .li[data-subtype="o"] {
                                            counter-increment: o-counter-9;
                                            & > .protyle-action {
                                                &::after {
                                                    content: counter(o-counter-9, lower-roman) ".";
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
        /* 无序列表 */
        .protyle-wysiwyg [data-node-id].li[data-subtype="u"] > .protyle-action svg {
            color:transparent;
        }
        .protyle-wysiwyg [data-node-id].li[data-subtype="u"] {
            & > .protyle-action::before {
                content: "";
                display: inline-block;
                width: 0.455em;
                height: 0.455em;
                background: var(--b3-theme-on-surface);
                vertical-align: middle;
                position: absolute;
                border-radius: 50%;
                transform: rotate(0deg);
            }
            &:is(.en_item_bullet_actived, [fold="1"]) {
                & > .protyle-action::before {
                    background: var(--b3-theme-primary);
                    background: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main));
                }
            }
            & .li[data-subtype="u"] {
                & > .protyle-action::before {
                    width: 0.4em;
                    height: 0.4em;
                    border-radius: 0;
                    transform: rotate(0deg);
                }
                & .li[data-subtype="u"] {
                    & > .protyle-action::before {
                        width: 0.4em;
                        height: 0.4em;
                        border-radius: 0;
                        transform: rotate(45deg);
                    }
                    & .li[data-subtype="u"] {
                        & > .protyle-action::before {
                            width: 0.455em;
                            height: 0.455em;
                            border-radius: 50%;
                            transform: rotate(0deg);
                        }
                        & .li[data-subtype="u"] {
                            & > .protyle-action::before {
                                width: 0.4em;
                                height: 0.4em;
                                border-radius: 0;
                                transform: rotate(0deg);
                            }
                            & .li[data-subtype="u"] {
                                & > .protyle-action::before {
                                    width: 0.4em;
                                    height: 0.4em;
                                    border-radius: 0;
                                    transform: rotate(45deg);
                                }
                                & .li[data-subtype="u"] {
                                    & > .protyle-action::before {
                                        width: 0.455em;
                                        height: 0.455em;
                                        border-radius: 50%;
                                        transform: rotate(0deg);
                                    }
                                    & .li[data-subtype="u"] {
                                        & > .protyle-action::before {
                                            width: 0.4em;
                                            height: 0.4em;
                                            border-radius: 0;
                                            transform: rotate(0deg);
                                        }
                                        & .li[data-subtype="u"] {
                                            & > .protyle-action::before {
                                                width: 0.4em;
                                                height: 0.4em;
                                                border-radius: 0;
                                                transform: rotate(45deg);
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
        .protyle-wysiwyg [data-node-id].li[fold="1"]>.protyle-action::after {
            animation: QYLlienterfix 0.6s cubic-bezier(0.8, 0, 0.9, 1) forwards !important;
            box-shadow: 0 0 0 0.2em var(--QYL-tab-item-focus);
            transform-origin: center;
        }
        @keyframes QYLlienterfix {
            0% {
                transform: scale(0.5);
                opacity: 0;
            }
            50% {
                transform: scale(1.2);
                opacity: 1;
            }
            65% {
                transform: scale(0.95);
            }
            85% {
                transform: scale(1.12);
            }
            100% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}
export function removeMultilevelList() {
    const style = document.getElementById('snippet-QYL-MultilevelList');
    if (style) {
        style.remove();
    }
}
