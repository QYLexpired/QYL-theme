export function initInkMode() {
    if (document.body.classList.contains('QYLmobile')) return;
    const style = document.createElement('style');
    style.id = 'QYL-InkMode';
    style.textContent = `
        :root {
            --QYL-wnd-layout-tab-border-ink: 2px solid var(--b3-theme-primary);/* 适配墨水屏 */
        }
        /* 主界面 */
        :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] {
            border: 2px solid var(--b3-theme-primary);
            box-sizing: border-box;
        }
        .layout__center :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] {
            border: var(--QYL-wnd-border-none, 2px solid var(--b3-theme-primary));
            box-sizing: border-box;
            & > .layout-tab-container {
                border: var(--QYL-wnd-container-border-ink);
                box-sizing: border-box;
            }
        }
        /* 页签 */
        .layout-tab-bar .item:not(.layout-tab-bar .item--readonly):not(.item.item--focus) {
            --QYL-tab-nonactive: transparent;
            border: 2px solid var(--b3-theme-primary-lighter);
            box-sizing: border-box;
        }
        .layout-tab-bar .item:not(.layout-tab-bar .item--readonly):not(.item.item--focus):hover {
            --QYL-tab-nonactive-hover: transparent;
        }
        .item.item--focus {
            --QYL-tab-active: transparent;
            border: 2px solid var(--b3-theme-primary);
            box-sizing: border-box;
        }
        .item.item--focus:hover {
            --QYL-tab-active-hover: transparent;
        }
        /* 菜单 */
        .b3-menu, .b3-menu__submenu {
            border: 2px solid var(--b3-theme-primary);
            box-sizing: border-box;
        }
        [data-theme-mode="dark"] :is(.b3-menu, .b3-menu__submenu) {
            border-color: var(--b3-theme-primary) !important;
            box-sizing: border-box;
        }
        #QYLsettings-window {
            border: 2px solid var(--b3-theme-primary) !important;
            box-sizing: border-box;
        }
        /* 窗口 */
        .b3-dialog__container {
            border: 2px solid var(--b3-theme-primary);
            box-sizing: border-box;
        }
        /* 悬停 */
        .b3-list-item, .b3-menu__item {
            border: 2px solid transparent;
            box-sizing: border-box;
        }
        .b3-list--background .b3-list-item--focus {
            --b3-list-hover: transparent;
            border: 2px solid var(--b3-theme-primary-lighter);
            box-sizing: border-box;
        }
        .b3-list--background .b3-list-item:hover:not(.b3-list-item--focus):not(.dragover):not(.dragover__current):not(.dragover__top):not(.dragover__bottom), .b3-list--background .b3-list-item--focus {
            --b3-list-hover: transparent;
            border: 2px solid var(--b3-theme-primary-lighter);
            box-sizing: border-box;
        }
        .b3-menu__item--current:not(.b3-menu__item--readonly) {
            --b3-list-hover: transparent;
            border: 2px solid var(--b3-theme-primary-lighter);
            box-sizing: border-box;
        }
        .b3-menu__item--selected {
            --b3-list-hover: transparent;
            border: 2px solid var(--b3-theme-primary-lighter);
            box-sizing: border-box;
        }
        /* 状态栏 */
        @media (min-width: 630px) {
            #status {
                border: 2px solid var(--b3-theme-primary);
                box-sizing: border-box;
            }
        }
        /* 工具栏 */
        .protyle-toolbar {
            border: 2px solid var(--b3-theme-primary);
            box-sizing: border-box;
        }
        .protyle-hint, .protyle-util {
            border: 2px solid var(--b3-theme-primary);
            box-sizing: border-box;
        }
        /* 适配垂直页签 */
        :root { 
            --QYL-vertical-fix-1: 2px solid var(--b3-theme-primary);
        }
        /* 细节修复 */
        .av__views > [data-type="av-search-icon"] + div > input:is([style*="width: 0"], [style*="width:0"]) {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}
export function removeInkMode() {
    const style = document.getElementById('QYL-InkMode');
    if (style) {
        style.remove();
    }
}
