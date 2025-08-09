export function initBorderFileTree() {
    const style = document.createElement('style');
    style.id = 'QYL-BorderFileTree';
    style.textContent = `
        [data-theme-mode="light"] {
            --QYL-border-filetree: var(--b3-theme-surface-lighter);
            --QYL-border-filetree: oklch(calc(0.77 + var(--b3-theme-primary-brightness) * 0.015) calc(0.08 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main));
        }
        [data-theme-mode="dark"] {
            --QYL-border-filetree: var(--b3-theme-surface-darker);
            --QYL-border-filetree: oklch(calc(0.5 + var(--b3-theme-primary-brightness) * 0.015) calc(0.08 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main));
        }
        .file-tree.sy__file .fn__flex-1 [data-type="navigation-root"] {
            margin: 0;
        }
        .file-tree.sy__file .fn__flex-1 > ul:has(>ul) > [data-type="navigation-root"] {
            margin-bottom: 1px;
            border-radius: var(--b3-border-radius) var(--b3-border-radius) 0 0;
        }
        .file-tree.sy__file .fn__flex-1 [data-type="navigation-file"] {
            margin-left: 0;
            margin-right: 0;
        }
        .file-tree.sy__file .fn__flex-1 > ul {
            border: 1px solid var(--QYL-border-filetree);
            border-radius: var(--b3-border-radius);
            margin: 0 5px 5px 5px;
        }
        .file-tree.sy__file .fn__flex-1 > ul:has(>ul) {
            padding-bottom: 1px;
        }
        /* 缩进线修复 */
        .file-tree.sy__file {
            --QYL-indent-1-1: 12px !important;
            --QYL-indent-1-2: 13px !important;
            --QYL-indent-2-1: 30px !important;
            --QYL-indent-2-2: 31px !important;
            --QYL-indent-3-1: 48px !important;
            --QYL-indent-3-2: 49px !important;
            --QYL-indent-4-1: 66px !important;
            --QYL-indent-4-2: 67px !important;
            --QYL-indent-5-1: 84px !important;
            --QYL-indent-5-2: 85px !important;
            --QYL-indent-6-1: 102px !important;
            --QYL-indent-6-2: 103px !important;
            --QYL-indent-7-1: 120px !important;
            --QYL-indent-7-2: 121px !important;
            --QYL-indent-8-1: 138px !important;
            --QYL-indent-8-2: 139px !important;
            --QYL-indent-9-1: 156px !important;
            --QYL-indent-9-2: 157px !important;
            --QYL-indent-10-1: 174px !important;
            --QYL-indent-10-2: 175px !important;
            --QYL-indent-11-1: 192px !important;
            --QYL-indent-11-2: 193px !important;
            --QYL-indent-12-1: 210px !important;
            --QYL-indent-12-2: 211px !important;
            --QYL-indent-13-1: 228px !important;
            --QYL-indent-13-2: 229px !important;
            --QYL-indent-14-1: 246px !important;
            --QYL-indent-14-2: 247px !important;
            --QYL-indent-15-1: 264px !important;
            --QYL-indent-15-2: 265px !important;
        }
        .b3-list:nth-of-type(8n+1)>[data-type="navigation-root"]::before {
            display: none;
        }
        .fn__flex-1.fn__flex-column.file-tree.sy__file ul.b3-list.b3-list--background {
            margin-left: 5px !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+1) {
            border: 1px solid var(--colorful-file-1, var(--QYL-border-filetree)) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+2) {
            border: 1px solid var(--colorful-file-2, var(--QYL-border-filetree)) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+3) {
            border: 1px solid var(--colorful-file-3, var(--QYL-border-filetree)) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+4) {
            border: 1px solid var(--colorful-file-4, var(--QYL-border-filetree)) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+5) {
            border: 1px solid var(--colorful-file-5, var(--QYL-border-filetree)) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+6) {
            border: 1px solid var(--colorful-file-6, var(--QYL-border-filetree)) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+7) {
            border: 1px solid var(--colorful-file-7, var(--QYL-border-filetree)) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+8) {
            border: 1px solid var(--colorful-file-8, var(--QYL-border-filetree)) !important;
        }
        /* 手机端边框化 */
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 [data-type="navigation-root"] {
            margin: 0;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:has(ul) > [data-type="navigation-root"] {
            margin-bottom: 1px;
            border-radius: var(--b3-border-radius) var(--b3-border-radius) 0 0;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 [data-type="navigation-file"] {
            margin-left: 0;
            margin-right: 0;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul {
            border: 1px solid var(--b3-theme-primary);
            border-radius: var(--b3-border-radius);
            margin: 0 5px 5px 5px;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:has(ul) {
            padding-bottom: 1px;
        }
        /* 手机端缩进线修复 */
        .QYLmobile #sidebar [data-type="sidebar-file"] {
            --QYL-indent-1-1: 12px !important;
            --QYL-indent-1-2: 13px !important;
            --QYL-indent-2-1: 30px !important;
            --QYL-indent-2-2: 31px !important;
            --QYL-indent-3-1: 48px !important;
            --QYL-indent-3-2: 49px !important;
            --QYL-indent-4-1: 66px !important;
            --QYL-indent-4-2: 67px !important;
            --QYL-indent-5-1: 84px !important;
            --QYL-indent-5-2: 85px !important;
            --QYL-indent-6-1: 102px !important;
            --QYL-indent-6-2: 103px !important;
            --QYL-indent-7-1: 120px !important;
            --QYL-indent-7-2: 121px !important;
            --QYL-indent-8-1: 138px !important;
            --QYL-indent-8-2: 139px !important;
            --QYL-indent-9-1: 156px !important;
            --QYL-indent-9-2: 157px !important;
            --QYL-indent-10-1: 174px !important;
            --QYL-indent-10-2: 175px !important;
            --QYL-indent-11-1: 192px !important;
            --QYL-indent-11-2: 193px !important;
            --QYL-indent-12-1: 210px !important;
            --QYL-indent-12-2: 211px !important;
            --QYL-indent-13-1: 228px !important;
            --QYL-indent-13-2: 229px !important;
            --QYL-indent-14-1: 246px !important;
            --QYL-indent-14-2: 247px !important;
            --QYL-indent-15-1: 264px !important;
            --QYL-indent-15-2: 265px !important;
        }
        /* 手机端多彩文档树兼容 */
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul > li[data-type="navigation-root"]::before {
            display: none;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul {
            margin-left: 5px !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+1) {
            border: 1px solid var(--colorful-file-1, var(--QYL-border-filetree)) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+2) {
            border: 1px solid var(--colorful-file-2, var(--QYL-border-filetree)) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+3) {
            border: 1px solid var(--colorful-file-3, var(--QYL-border-filetree)) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+4) {
            border: 1px solid var(--colorful-file-4, var(--QYL-border-filetree)) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+5) {
            border: 1px solid var(--colorful-file-5, var(--QYL-border-filetree)) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+6) {
            border: 1px solid var(--colorful-file-6, var(--QYL-border-filetree)) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+7) {
            border: 1px solid var(--colorful-file-7, var(--QYL-border-filetree)) !important;
        }
        .QYLmobile #sidebar [data-type="sidebar-file"] .fn__flex-1 > ul:nth-of-type(8n+8) {
            border: 1px solid var(--colorful-file-8, var(--QYL-border-filetree)) !important;
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
