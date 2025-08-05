export function initColorfultabs() {
    if (document.body.classList.contains('QYLmobile')) return;
    const style = document.createElement('style');
    style.id = 'QYL-Colorfultabs';
    style.textContent = `
        .layout__center [data-type="wnd"] > .fn__flex:first-child > .layout-tab-bar:not(.layout-tab-bar--readonly) > .item {
            &:nth-of-type(12n+1) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg) / 0.75);
                }
            }
            &:nth-of-type(12n+2) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg) / 0.75);
                }
            }
            &:nth-of-type(12n+3) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg) / 0.75);
                }
            }
            &:nth-of-type(12n+4) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg) / 0.75);
                }
            }
            &:nth-of-type(12n+5) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg) / 0.75);
                }
            }
            &:nth-of-type(12n+6) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg) / 0.75);
                }
            }
            &:nth-of-type(12n+7) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 30deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 30deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 30deg) / 0.75);
                }
            }
            &:nth-of-type(12n+8) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg) / 0.75);
                }
            }
            &:nth-of-type(12n+9) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 150deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 150deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 150deg) / 0.75);
                }
            }
            &:nth-of-type(12n+10) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 210deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 210deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 210deg) / 0.75);
                }
            }
            &:nth-of-type(12n+11) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg) / 0.75);
                }
            }
            &:nth-of-type(12n+12) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 330deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 330deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 330deg) / 0.75);
                }
            }
        }
        [data-theme-mode="dark"] .layout__center [data-type="wnd"] > .fn__flex:first-child > .layout-tab-bar:not(.layout-tab-bar--readonly) > .item {
            &:nth-of-type(12n+1) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg) / 0.75);
                }
            }
            &:nth-of-type(12n+2) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg) / 0.75);
                }
            }
            &:nth-of-type(12n+3) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg) / 0.75);
                }
            }
            &:nth-of-type(12n+4) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg) / 0.75);
                }
            }
            &:nth-of-type(12n+5) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg) / 0.75);
                }
            }
            &:nth-of-type(12n+6) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg) / 0.75);
                }
            }
            &:nth-of-type(12n+7) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 30deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 30deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 30deg) / 0.75);
                }
            }
            &:nth-of-type(12n+8) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg) / 0.75);
                }
            }
            &:nth-of-type(12n+9) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 150deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 150deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 150deg) / 0.75);
                }
            }
            &:nth-of-type(12n+10) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 210deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 210deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 210deg) / 0.75);
                }
            }
            &:nth-of-type(12n+11) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg) / 0.75);
                }
            }
            &:nth-of-type(12n+12) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 330deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.8 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 330deg));
                }
                &.item--focus {
                    box-shadow: inset 0 0 0 2px oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 330deg) / 0.75);
                }
            }
        }
    `;
    document.head.appendChild(style);
}
export function removeColorfultabs() {
    const style = document.getElementById('QYL-Colorfultabs');
    if (style) {
        style.remove();
    }
}
