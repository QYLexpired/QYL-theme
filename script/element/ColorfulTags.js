export function initColorfulTags() {
    const style = document.createElement('style');
    style.id = 'snippet-QYL-ColorfulTags';
    style.textContent = `
        /* 标签 */
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+1) {
            background-color: rgba(from var(--QYL-custom-red) r g b/0.7);
            background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+2) {
            background-color: rgba(from var(--QYL-custom-orange) r g b/0.7);
            background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+3) {
            background-color: rgba(from var(--QYL-custom-green) r g b/0.7);
            background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+4) {
            background-color: rgba(from var(--QYL-custom-blue) r g b/0.7);
            background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+5) {
            background-color: rgba(from var(--QYL-custom-purple) r g b/0.7);
            background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+6) {
            background-color: rgba(from var(--QYL-custom-pink) r g b/0.7);
            background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        [data-theme-mode="dark"] .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+1) {
            background-color: var(--QYL-custom-red);
            background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        [data-theme-mode="dark"] .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+2) {
            background-color: var(--QYL-custom-orange);
            background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        [data-theme-mode="dark"] .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+3) {
            background-color: var(--QYL-custom-green);
            background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        [data-theme-mode="dark"] .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+4) {
            background-color: var(--QYL-custom-blue);
            background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        [data-theme-mode="dark"] .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+5) {
            background-color: var(--QYL-custom-purple);
            background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        [data-theme-mode="dark"] .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+6) {
            background-color: var(--QYL-custom-pink);
            background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg));
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        /* 文档标签 */
        .protyle-background .b3-chips__doctag .b3-chip {
            border: none !important;
            outline: none !important;
            color: var(--b3-theme-on-primary);
            &:nth-of-type(6n+1) {
                background-color: rgba(from var(--QYL-custom-red) r g b/0.7);
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg));
            }
            &:nth-of-type(6n+2) {
                background-color: rgba(from var(--QYL-custom-orange) r g b/0.7);
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
            }
            &:nth-of-type(6n+3) {
                background-color: rgba(from var(--QYL-custom-green) r g b/0.7);
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg));
            }
            &:nth-of-type(6n+4) {
                background-color: rgba(from var(--QYL-custom-blue) r g b/0.7);
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg));
            }
            &:nth-of-type(6n+5) {
                background-color: rgba(from var(--QYL-custom-purple) r g b/0.7);
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg));
            }
            &:nth-of-type(6n+6) {   
                background-color: rgba(from var(--QYL-custom-pink) r g b/0.7);
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg));
            }
        }
        [data-theme-mode="dark"] .protyle-background .b3-chips__doctag .b3-chip {
            color: var(--b3-theme-on-primary);
            &:nth-of-type(6n+1) {
                background-color: var(--QYL-custom-red);
                background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg));
            }
            &:nth-of-type(6n+2) {
                background-color: var(--QYL-custom-orange);
                background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
            }
            &:nth-of-type(6n+3) {
                background-color: var(--QYL-custom-green);
                background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg));
            }
            &:nth-of-type(6n+4) {
                background-color: var(--QYL-custom-blue);
                background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg));
            }
            &:nth-of-type(6n+5) {
                background-color: var(--QYL-custom-purple);
                background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg));
            }
            &:nth-of-type(6n+6) {
                background-color: var(--QYL-custom-pink);
                background-color: oklch(calc(0.4 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg));
            }
        }
        /* 行级代码 */
        .fn__code, .b3-typography code:not(.hljs), .b3-typography span[data-type~=code], .protyle-wysiwyg code:not(.hljs), .protyle-wysiwyg span[data-type~=code] {
            &:nth-of-type(6n+1) {
                color: var(--QYL-custom-red);
                color: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.55 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg));
            }
            &:nth-of-type(6n+2) {
                color: var(--QYL-custom-orange);
                color: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.55 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
            }
            &:nth-of-type(6n+3) {
                color: var(--QYL-custom-green);
                color: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.55 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg));
            }
            &:nth-of-type(6n+4) {
                color: var(--QYL-custom-blue);
                color: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.55 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg));
            }
            &:nth-of-type(6n+5) {
                color: var(--QYL-custom-purple);
                color: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.55 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg));
            }
            &:nth-of-type(6n+6) {
                color: var(--QYL-custom-pink);
                color: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.55 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg));
            }
        }
        [data-theme-mode="dark"] .fn__code, .b3-typography code:not(.hljs), .b3-typography span[data-type~=code], .protyle-wysiwyg code:not(.hljs), .protyle-wysiwyg span[data-type~=code] {
            &:nth-of-type(6n+1) {
                color: var(--QYL-custom-red);
                color: oklch(calc(0.72 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg));
            }
            &:nth-of-type(6n+2) {
                color: var(--QYL-custom-orange);
                color: oklch(calc(0.72 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
            }
            &:nth-of-type(6n+3) {
                color: var(--QYL-custom-green);
                color: oklch(calc(0.72 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg));
            }
            &:nth-of-type(6n+4) {
                color: var(--QYL-custom-blue);
                color: oklch(calc(0.72 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg));
            }
            &:nth-of-type(6n+5) {
                color: var(--QYL-custom-purple);
                color: oklch(calc(0.72 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg));
            }
            &:nth-of-type(6n+6) {
                color: var(--QYL-custom-pink);
                color: oklch(calc(0.72 + var(--b3-theme-primary-brightness) * 0.015) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg));
            }
        }
    `;
    document.head.appendChild(style);
}
export function removeColorfulTags() {
    const style = document.getElementById('snippet-QYL-ColorfulTags');
    if (style) {
        style.remove();
    }
}
