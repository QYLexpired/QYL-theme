export function initColorfulHeading() {
    const style = document.createElement('style');
    style.id = 'snippet-QYL-ColorfulHeading';
    style.textContent = `
        .protyle-title__input {
            color: var(--b3-theme-primary);
        }
        .b3-typography h1, .b3-typography .h1, .protyle-wysiwyg h1, .protyle-wysiwyg .h1 {
            color: #dd5656;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 60deg));
        }
        .b3-typography h2, .b3-typography .h2, .protyle-wysiwyg h2, .protyle-wysiwyg .h2 {
            color: #ec963f;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 120deg));
        }
        .b3-typography h3, .b3-typography .h3, .protyle-wysiwyg h3, .protyle-wysiwyg .h3 {
            color: #32ae4f;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 180deg));
        }
        .b3-typography h4, .b3-typography .h4, .protyle-wysiwyg h4, .protyle-wysiwyg .h4 {
            color: #4573bc;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 240deg));
        }
        .b3-typography h5, .b3-typography .h5, .protyle-wysiwyg h5, .protyle-wysiwyg .h5 {
            color: #8859ac;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 300deg));
        }
        .b3-typography h6, .b3-typography .h6, .protyle-wysiwyg h6, .protyle-wysiwyg .h6 {
            color: #dc6897;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 360deg));
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h1"] {
            color: #dd5656;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 60deg));
            & .b3-list-item__text {
                color: #dd5656;
                color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 60deg));
            }
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h2"] {
            color: #ec963f;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 120deg));
            & .b3-list-item__text {
                color: #ec963f;
                color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 120deg));
            }
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h3"] {
            color: #32ae4f;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 180deg));
            & .b3-list-item__text {
                color: #32ae4f;
                color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 180deg));
            }
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h4"] {
            color: #4573bc;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 240deg));
            & .b3-list-item__text {
                color: #4573bc;
                color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 240deg));
            }
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h5"] {
            color: #8859ac;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 300deg));
            & .b3-list-item__text {
                color: #8859ac;
                color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 300deg));
            }
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h6"] {
            color: #dc6897;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 360deg));
            & .b3-list-item__text {
                color: #dc6897;
                color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.18 calc(var(--b3-theme-primary-main) + 360deg));
            }
        }
        [data-theme-mode="dark"] .b3-typography h1, [data-theme-mode="dark"] .b3-typography .h1, [data-theme-mode="dark"] .protyle-wysiwyg h1, [data-theme-mode="dark"] .protyle-wysiwyg .h1 {
            color: #d24e4e;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 60deg));
        }
        [data-theme-mode="dark"] .b3-typography h2, [data-theme-mode="dark"] .b3-typography .h2, [data-theme-mode="dark"] .protyle-wysiwyg h2, [data-theme-mode="dark"] .protyle-wysiwyg .h2 {
            color: #eaa263;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 120deg));
        }
        [data-theme-mode="dark"] .b3-typography h3, [data-theme-mode="dark"] .b3-typography .h3, [data-theme-mode="dark"] .protyle-wysiwyg h3, [data-theme-mode="dark"] .protyle-wysiwyg .h3 {
            color: #5fc070;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 180deg));
        }
        [data-theme-mode="dark"] .b3-typography h4, [data-theme-mode="dark"] .b3-typography .h4, [data-theme-mode="dark"] .protyle-wysiwyg h4, [data-theme-mode="dark"] .protyle-wysiwyg .h4 {
            color: #589ecd;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 240deg));
        }
        [data-theme-mode="dark"] .b3-typography h5, [data-theme-mode="dark"] .b3-typography .h5, [data-theme-mode="dark"] .protyle-wysiwyg h5, [data-theme-mode="dark"] .protyle-wysiwyg .h5 {
            color: #8c5fbc;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 300deg));
        }
        [data-theme-mode="dark"] .b3-typography h6, [data-theme-mode="dark"] .b3-typography .h6, [data-theme-mode="dark"] .protyle-wysiwyg h6, [data-theme-mode="dark"] .protyle-wysiwyg .h6 {
            color: #b367b8;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 360deg));
        }
        [data-theme-mode="dark"] .sy__outline .b3-list--background .b3-list-item[data-subtype="h1"] {
            color: #d24e4e;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 60deg));
            & .b3-list-item__text {
                color: #d24e4e;
                color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 60deg));
            }
        }
        [data-theme-mode="dark"] .sy__outline .b3-list--background .b3-list-item[data-subtype="h2"] {
            color: #eaa263;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 120deg));
            & .b3-list-item__text {
                color: #eaa263;
                color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 120deg));
            }
        }
        [data-theme-mode="dark"] .sy__outline .b3-list--background .b3-list-item[data-subtype="h3"] {
            color: #5fc070;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 180deg));
            & .b3-list-item__text {
                color: #5fc070;
                color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 180deg));
            }
        }
        [data-theme-mode="dark"] .sy__outline .b3-list--background .b3-list-item[data-subtype="h4"] {
            color: #589ecd;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 240deg));
            & .b3-list-item__text {
                color: #589ecd;
                color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 240deg));
            }
        }
        [data-theme-mode="dark"] .sy__outline .b3-list--background .b3-list-item[data-subtype="h5"] {
            color: #8c5fbc;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 300deg));
            & .b3-list-item__text {
                color: #8c5fbc;
                color: oklch(0.7 0.15 calc(var(--b3-theme-primary-main) + 300deg));
            }
        }
        [data-theme-mode="dark"] .sy__outline .b3-list--background .b3-list-item[data-subtype="h6"] {
            color: #b367b8;
            color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 360deg));
            & .b3-list-item__text {
                color: #b367b8;
                color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) 0.15 calc(var(--b3-theme-primary-main) + 360deg));
            }
        }
    `;
    document.head.appendChild(style);
}
export function removeColorfulHeading() {
    const style = document.getElementById('snippet-QYL-ColorfulHeading');
    if (style) {
        style.remove();
    }
}
