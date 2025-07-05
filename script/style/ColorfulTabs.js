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
            }
            &:nth-of-type(12n+2) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg));
                }
            }
            &:nth-of-type(12n+3) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
                }
            }
            &:nth-of-type(12n+4) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg));
                }
            }
            &:nth-of-type(12n+5) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg));
                }
            }
            &:nth-of-type(12n+6) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg));
                }
            }
            &:nth-of-type(12n+7) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 30deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 30deg));
                }
            }
            &:nth-of-type(12n+8) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg));
                }
            }
            &:nth-of-type(12n+9) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 150deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 150deg));
                }
            }
            &:nth-of-type(12n+10) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 210deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 210deg));
                }
            }
            &:nth-of-type(12n+11) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg));
                }
            }
            &:nth-of-type(12n+12) {
                background-color: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.02) calc(0.18 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 330deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.35 + var(--b3-theme-primary-brightness) * 0.02) calc(0.35 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 330deg));
                }
            }
            &.item--focus {
                padding-left: 20px;
                box-sizing: border-box;
                &::after {
                    display: block !important;
                    left: 5px;
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    top: 50%;
                    transform: translateY(-50%);
                    background: linear-gradient(to right bottom, 
                    oklch(calc(0.68 + var(--b3-theme-primary-brightness) * 0.02) calc(0.30 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main)),
                    oklch(calc(0.68 + var(--b3-theme-primary-brightness) * 0.02) calc(0.30 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg)));
                }
            }
        }
        [data-theme-mode="dark"] .layout__center [data-type="wnd"] > .fn__flex:first-child > .layout-tab-bar:not(.layout-tab-bar--readonly) > .item {
            &:nth-of-type(12n+1) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 60deg));
                }
            }
            &:nth-of-type(12n+2) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg));
                }
            }
            &:nth-of-type(12n+3) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
                }
            }
            &:nth-of-type(12n+4) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 240deg));
                }
            }
            &:nth-of-type(12n+5) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 300deg));
                }
            }
            &:nth-of-type(12n+6) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 360deg));
                }
            }
            &:nth-of-type(12n+7) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 30deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 30deg));
                }
            }
            &:nth-of-type(12n+8) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg));
                }
            }
            &:nth-of-type(12n+9) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 150deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 150deg));
                }
            }
            &:nth-of-type(12n+10) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 210deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 210deg));
                }
            }
            &:nth-of-type(12n+11) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg));
                }
            }
            &:nth-of-type(12n+12) {
                background-color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.015) calc(0.14 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 330deg) / 0.35);
                &.item--focus .item__text {
                    color: oklch(calc(0.65 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 330deg));
                }
            }
            &.item--focus {
                padding-left: 20px;
                box-sizing: border-box;
                &::after {
                    display: block !important;
                    left: 5px;
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    top: 50%;
                    transform: translateY(-50%);
                    background: linear-gradient(to right bottom, 
                    oklch(calc(0.68 + var(--b3-theme-primary-brightness) * 0.02) calc(0.30 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main)),
                    oklch(calc(0.68 + var(--b3-theme-primary-brightness) * 0.02) calc(0.30 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 120deg)));
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
