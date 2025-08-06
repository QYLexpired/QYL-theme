export function initColorfulFileTree() {
    document.documentElement.classList.add('QYLColorfulFileTree');
    const style = document.createElement('style');
    style.id = 'QYL-ColorfulFileTree';
    style.textContent = `
        [data-theme-mode="light"] {
            --colorful-file-1: #6589cc;
            --colorful-file-background-1: rgb(190, 212, 251);
            --colorful-file-2: rgb(143, 134, 190);
            --colorful-file-background-2: rgb(220, 205, 248);
            --colorful-file-3: rgb(198, 132, 203);
            --colorful-file-background-3: rgb(243, 199, 246);
            --colorful-file-4: rgb(207, 98, 98);
            --colorful-file-background-4: rgb(255, 197, 197);
            --colorful-file-5: #e78734;
            --colorful-file-background-5: #ffd2ab;
            --colorful-file-6: #ead55d;
            --colorful-file-background-6: #fae988;
            --colorful-file-7: rgb(129, 207, 117);
            --colorful-file-background-7: rgb(177, 245, 167);
            --colorful-file-8: rgb(112, 194, 178);
            --colorful-file-background-8:  rgb(164, 236, 222);
            --colorful-file-1: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main));
            --colorful-file-background-1: oklch(calc(0.9 + var(--b3-theme-primary-brightness) * 0.015) calc(0.1 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main));
            --colorful-file-2: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 45deg));
            --colorful-file-background-2: oklch(calc(0.9 + var(--b3-theme-primary-brightness) * 0.015) calc(0.1 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 45deg));
            --colorful-file-3: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg));
            --colorful-file-background-3: oklch(calc(0.9 + var(--b3-theme-primary-brightness) * 0.015) calc(0.1 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg));
            --colorful-file-4: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 135deg));
            --colorful-file-background-4: oklch(calc(0.9 + var(--b3-theme-primary-brightness) * 0.015) calc(0.1 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 135deg));
            --colorful-file-5: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
            --colorful-file-background-5: oklch(calc(0.9 + var(--b3-theme-primary-brightness) * 0.015) calc(0.1 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
            --colorful-file-6: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 225deg));
            --colorful-file-background-6: oklch(calc(0.9 + var(--b3-theme-primary-brightness) * 0.015) calc(0.1 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 225deg));
            --colorful-file-7: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg));
            --colorful-file-background-7: oklch(calc(0.9 + var(--b3-theme-primary-brightness) * 0.015) calc(0.1 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg));
            --colorful-file-8: oklch(calc(0.75 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 315deg));
            --colorful-file-background-8: oklch(calc(0.9 + var(--b3-theme-primary-brightness) * 0.015) calc(0.1 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 315deg));
        }
        [data-theme-mode="dark"] {
            --colorful-file-1: #274f99;
            --colorful-file-background-1: rgba(21, 66, 149, 0.5);
            --colorful-file-2: #614182;
            --colorful-file-background-2: rgba(89, 46, 132, 0.5);
            --colorful-file-3: rgb(138, 38, 123);
            --colorful-file-background-3: rgba(138, 38, 123, 0.5);
            --colorful-file-4: rgb(137, 31, 31);
            --colorful-file-background-4: rgba(159, 41, 41, 0.5);
            --colorful-file-5: rgb(141, 74, 23);
            --colorful-file-background-5: rgba(188, 90, 15, 0.5);
            --colorful-file-6: rgb(123, 114, 12);
            --colorful-file-background-6: rgba(123, 114, 12, 0.5);
            --colorful-file-7: rgb(45, 127, 30);
            --colorful-file-background-7: rgba(45, 127, 30, 0.5);
            --colorful-file-8: rgb(27, 136, 136);
            --colorful-file-background-8: rgba(0, 132, 132, 0.5);
            --colorful-file-1: oklch(calc(0.5 + var(--b3-theme-primary-brightness) * 0.015) calc(0.12 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main));
            --colorful-file-background-1: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.135 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.6);
            --colorful-file-2: oklch(calc(0.5 + var(--b3-theme-primary-brightness) * 0.015) calc(0.12 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 45deg));
            --colorful-file-background-2: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.135 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 45deg) / 0.6);
            --colorful-file-3: oklch(calc(0.5 + var(--b3-theme-primary-brightness) * 0.015) calc(0.12 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg));
            --colorful-file-background-3: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.135 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 90deg) / 0.6);
            --colorful-file-4: oklch(calc(0.5 + var(--b3-theme-primary-brightness) * 0.015) calc(0.12 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 135deg));
            --colorful-file-background-4: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.135 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 135deg) / 0.6);
            --colorful-file-5: oklch(calc(0.5 + var(--b3-theme-primary-brightness) * 0.015) calc(0.12 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg));
            --colorful-file-background-5: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.135 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 180deg) / 0.6);
            --colorful-file-6: oklch(calc(0.5 + var(--b3-theme-primary-brightness) * 0.015) calc(0.12 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 225deg));
            --colorful-file-background-6: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.135 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 225deg) / 0.6);
            --colorful-file-7: oklch(calc(0.5 + var(--b3-theme-primary-brightness) * 0.015) calc(0.12 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg));
            --colorful-file-background-7: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.135 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 270deg) / 0.6);
            --colorful-file-8: oklch(calc(0.5 + var(--b3-theme-primary-brightness) * 0.015) calc(0.12 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 315deg));
            --colorful-file-background-8: oklch(calc(0.45 + var(--b3-theme-primary-brightness) * 0.015) calc(0.135 * var(--b3-theme-primary-saturate)) calc(var(--b3-theme-primary-main) + 315deg) / 0.6);
        }
        .fn__flex-1.fn__flex-column.file-tree.sy__file ul.b3-list.b3-list--background { margin-left: 20px; }
        [data-type="navigation-root"]::before {
            content: "";
            width: 12px;
            height: 28px;
            position: absolute;
            left: -20px;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }
        .b3-list:nth-of-type(8n+1)>[data-type="navigation-root"]::before {
            background-color: var(--colorful-file-1) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+1) {
            border-left: 3px solid var(--colorful-file-1);
        }
        .b3-list:nth-of-type(8n+1)>[data-type="navigation-root"] {
            background-color:var(--colorful-file-background-1) !important;
            & :is(.b3-list-item__toggle .b3-list-item__arrow, [data-type="more-root"], [data-type="new"]) {
                color:var(--colorful-file-1) !important;
            }
        }
        .b3-list:nth-of-type(8n+2)>[data-type="navigation-root"]::before {
            background-color:var(--colorful-file-2) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+2) {
            border-left: 3px solid var(--colorful-file-2);
        }
        .b3-list:nth-of-type(8n+2)>[data-type="navigation-root"] {
            background-color: var(--colorful-file-background-2) !important;
            & :is(.b3-list-item__toggle .b3-list-item__arrow, [data-type="more-root"], [data-type="new"]) {
                color:var(--colorful-file-2) !important;
            }
        }
        .b3-list:nth-of-type(8n+3)>[data-type="navigation-root"]::before {
            background-color:var(--colorful-file-3) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+3) {
            border-left: 3px solid var(--colorful-file-3);
        }
        .b3-list:nth-of-type(8n+3)>[data-type="navigation-root"] {
            background-color: var(--colorful-file-background-3) !important;
            & :is(.b3-list-item__toggle .b3-list-item__arrow, [data-type="more-root"], [data-type="new"]) {
                color:var(--colorful-file-3) !important; 
            }
        }
        .b3-list:nth-of-type(8n+4)>[data-type="navigation-root"]::before {
            background-color:var(--colorful-file-4) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+4) {
            border-left: 3px solid var(--colorful-file-4);
        }
        .b3-list:nth-of-type(8n+4)>[data-type="navigation-root"] {
            background-color: var(--colorful-file-background-4) !important;
            & :is(.b3-list-item__toggle .b3-list-item__arrow, [data-type="more-root"], [data-type="new"]) {
                color:var(--colorful-file-4) !important;
            }
        }
        .b3-list:nth-of-type(8n+5)>[data-type="navigation-root"]::before {
            background-color:var(--colorful-file-5) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+5) {
            border-left: 3px solid var(--colorful-file-5);
        }
        .b3-list:nth-of-type(8n+5)>[data-type="navigation-root"] {
            background-color: var(--colorful-file-background-5) !important;
            & :is(.b3-list-item__toggle .b3-list-item__arrow, [data-type="more-root"], [data-type="new"]) {
                color:var(--colorful-file-5) !important;
            }
        }
        .b3-list:nth-of-type(8n+6)>[data-type="navigation-root"]::before {
            background-color:var(--colorful-file-6) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+6) {
            border-left: 3px solid var(--colorful-file-6);
        }
        .b3-list:nth-of-type(8n+6)>[data-type="navigation-root"] {
            background-color: var(--colorful-file-background-6) !important;
            & :is(.b3-list-item__toggle .b3-list-item__arrow, [data-type="more-root"], [data-type="new"]) {
                color:var(--colorful-file-6) !important;
            }
        }
        .b3-list:nth-of-type(8n+7)>[data-type="navigation-root"]::before {
            background-color:var(--colorful-file-7) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+7) {
            border-left: 3px solid var(--colorful-file-7);
        }
        .b3-list:nth-of-type(8n+7)>[data-type="navigation-root"] {
            background-color:var(--colorful-file-background-7) !important;
            & :is(.b3-list-item__toggle .b3-list-item__arrow, [data-type="more-root"], [data-type="new"]) {
                color:var(--colorful-file-7) !important;
            }
        }
        .b3-list:nth-of-type(8n)>[data-type="navigation-root"]::before {
            background-color:var(--colorful-file-8) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n) {
            border-left: 3px solid var(--colorful-file-8);
        }
        .b3-list:nth-of-type(8n)>[data-type="navigation-root"] {
            background-color:var(--colorful-file-background-8) !important;
            & :is(.b3-list-item__toggle .b3-list-item__arrow, [data-type="more-root"], [data-type="new"]) {
                color:var(--colorful-file-8) !important;
            }
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 .b3-list .b3-list-item { margin-top: 0; margin-bottom: 0;}
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 .b3-list.b3-list--background { margin-left: 20px; }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul > li[data-type="navigation-root"]::before {
            content: "";
            width: 14px;
            height: 40px;
            position: absolute;
            left: -22px;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+1) > li[data-type="navigation-root"]::before {
            background-color: var(--colorful-file-1) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+1) {
            border-left: 3px solid var(--colorful-file-1);
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+2) > li[data-type="navigation-root"]::before {
            background-color: var(--colorful-file-2) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+2) {
            border-left: 3px solid var(--colorful-file-2);
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+3) > li[data-type="navigation-root"]::before {
            background-color: var(--colorful-file-3) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+3) {
            border-left: 3px solid var(--colorful-file-3);
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+4) > li[data-type="navigation-root"]::before {
            background-color: var(--colorful-file-4) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+4) {
            border-left: 3px solid var(--colorful-file-4);
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+5) > li[data-type="navigation-root"]::before {
            background-color: var(--colorful-file-5) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+5) {
            border-left: 3px solid var(--colorful-file-5);
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+6) > li[data-type="navigation-root"]::before {
            background-color: var(--colorful-file-6) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+6) {
            border-left: 3px solid var(--colorful-file-6);
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+7) > li[data-type="navigation-root"]::before {
            background-color: var(--colorful-file-7) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+7) {
            border-left: 3px solid var(--colorful-file-7);
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n) > li[data-type="navigation-root"]::before {
            background-color: var(--colorful-file-8) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n) {
            border-left: 3px solid var(--colorful-file-8);
        }
    `;
    document.head.appendChild(style);
}
export function removeColorfulFileTree() {
    document.documentElement.classList.remove('QYLColorfulFileTree');
    const style = document.getElementById('QYL-ColorfulFileTree');
    if (style) {
        style.remove();
    }
}
