export function initInkMode() {
    if (document.body.classList.contains('QYLmobile')) return;
    const style = document.createElement('style');
    style.id = 'QYL-InkMode';
    style.textContent = `
            :root {
                --QYL-wnd-layout-tab-border-ink: 1.5px solid var(--b3-theme-primary);/* 适配墨水屏 */
            }
            /* 主界面 */
            :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] {
                border: 1.5px solid var(--b3-theme-primary);
                box-sizing: border-box;
            }
            .layout__center:not(#layouts) :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] {
                border: var(--QYL-wnd-border-none, 1.5px solid var(--b3-theme-primary));
                box-sizing: border-box;
                & > .layout-tab-container {
                    border: var(--QYL-wnd-container-border-ink);
                    box-sizing: border-box;
                }
            }
            :is(.layout__dockl, .layout__dockr, .layout__dockb).layout--float {
                border: 1.5px solid var(--b3-theme-primary);
                > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] {
                    border: none;
                }
            }
            /* 分割线 */
            #layouts .layout__resize.layout__resize--lr::after {
                width: 2px;
                background-color: var(--b3-theme-primary);
                transform: translateX(2px);
            }
            #layouts .layout__resize:not(.layout__resize--lr)::after {
                height: 2px;
                background-color: var(--b3-theme-primary);
                transform: translateY(-0.5px);
            }
            .search__drag::after {
                height: 2px;
                background-color: var(--b3-theme-primary);
            }
            .search__drag:hover::after {
                background-color: var(--b3-theme-primary);
            }
            .search__layout--row .search__drag::after {
                width: 2px;
                background-color: var(--b3-theme-primary);
                transform: translateX(2.5px);
            }
            /* 页签 */
            .layout-tab-bar .item:not(.layout-tab-bar .item--readonly):not(.item.item--focus) {
                --QYL-tab-item: transparent;
                --QYL-tab-item-focus: transparent;
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary-lightest);
            }
            .layout-tab-bar .item:not(.layout-tab-bar .item--readonly):not(.item.item--focus):hover {
                --QYL-tab-item: transparent;
                --QYL-tab-item-focus: transparent;
            }
            .item.item--focus {
                --QYL-tab-item: transparent;
                --QYL-tab-item-focus: transparent;
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            .item.item--focus:hover {
                --QYL-tab-item: transparent;
                --QYL-tab-item-focus: transparent;
            }
            /* 数据库页签 */
            .av__header .layout-tab-bar {
                background-color: transparent;
                & .item.item--focus {
                    background-color: transparent;
                    box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
                    & .item__graphic {
                        color: var(--b3-theme-primary);
                    }
                }
                & .item:not(.item--focus) {
                    background-color: transparent;
                    outline: none;
                }
                & .item:not(:first-child) {
                    margin-left: 3px;
                }
            }
            [data-theme-mode="dark"] .av__header .layout-tab-bar  {
                & .item.item--focus {
                    background-color: transparent;
                }
            }
            .b3-list-item__toggle--hl:hover {
                background-color: transparent;
            }
            /* 菜单 */
            .b3-menu, .b3-menu__submenu {
                border: 1.5px solid var(--b3-theme-primary);
                box-sizing: border-box;
            }
            [data-theme-mode="dark"] :is(.b3-menu, .b3-menu__submenu) {
                border-color: var(--b3-theme-primary) !important;
                box-sizing: border-box;
            }
            /* 窗口 */
            .b3-dialog__container {
                border: 1.5px solid var(--b3-theme-primary);
                box-sizing: border-box;
            }
            /* 悬停 */
            .dock__item:hover:not(.dock__item--activefocus), .dock__item--active {
                background-color:rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            .toolbar__item:not(.toolbar__item--disabled):not(.toolbar__item--close):hover, .toolbar__item--active {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            .block__icon:hover:not([disabled]):not(.ft__primary):not(.block__icon--warning), .block__icon--active {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            .b3-list-item__action:hover {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            .file-tree .b3-list-item .b3-list-item__toggle:hover {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            .b3-list--background .b3-list-item:hover:not(.b3-list-item--focus):not(.dragover):not(.dragover__current):not(.dragover__top):not(.dragover__bottom), .b3-list--background .b3-list-item--focus {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
                & .b3-list-item__meta {
                    background-color: rgba(255, 0, 0, 0);
                    box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
                }
            }
            .b3-menu__item--show {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
                &.b3-menu__item--warning {
                    box-shadow: inset 0 0 0 1.5px var(--b3-theme-error);
                }
            }
            .b3-menu__item--current:not(.b3-menu__item--readonly) {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
                &.b3-menu__item--warning {
                    box-shadow: inset 0 0 0 1.5px var(--b3-theme-error);
                }
            }
            .file-tree .b3-list--background .b3-list-item--focus {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            .secondaryToolbarButton:hover {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            .pdf__util .b3-menu__item:hover {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
                &[data-type="remove"] {
                    background-color: rgba(255, 0, 0, 0);
                    box-shadow: inset 0 0 0 1.5px var(--b3-theme-error);
                }
            }
            .av__panel .b3-menu__item:not([data-type=nobg]):hover, .av__panel .b3-menu__item--current:not([data-type=nobg]) {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
                &[data-type="removeCol"] {
                    background-color: rgba(255, 0, 0, 0);
                    box-shadow: inset 0 0 0 1.5px var(--b3-theme-error);
                }
            }
            #status .toolbar__item:hover {
                background-color: transparent !important;
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            .b3-menu__item--selected {
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            #barWorkspace {
                background-color: transparent;
                border: none;
                box-shadow: none;
            }
            /* 状态栏 */
            @media (min-width: 630px) {
                #status {
                    border: 1.5px solid var(--b3-theme-primary);
                    box-sizing: border-box;
                }
            }
            /* 工具栏 */
            .protyle-toolbar {
                border: 1.5px solid var(--b3-theme-primary);
                box-sizing: border-box;
            }
            .protyle-hint, .protyle-util {
                border: 1.5px solid var(--b3-theme-primary);
                box-sizing: border-box;
            }
            /* 排版元素 */
            :is(.fn__code, .b3-typography code, .b3-typography span[data-type~=code], .protyle-wysiwyg code, .protyle-wysiwyg span[data-type~=code]) {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            .b3-typography kbd, .b3-typography span[data-type~=kbd], .protyle-wysiwyg kbd, .protyle-wysiwyg span[data-type~=kbd] {
                background-color: rgba(255, 0, 0, 0);
                border-color: var(--b3-theme-primary-lighter);
                box-shadow: inset 0 -2px 0 var(--b3-theme-primary);
            }
            .protyle-wysiwyg blockquote, .protyle-wysiwyg .bq {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
                &::before {
                    background-color: var(--b3-theme-primary);
                }
                & :is(blockquote, .bq) {
                    background-color: rgba(255, 0, 0, 0);
                    box-shadow: none;
                    border-color: var(--b3-theme-primary);
                }
            }
            .b3-typography .code-block, .protyle-wysiwyg .code-block {
                background-color: rgba(255, 0, 0, 0);
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            /* tips */
            .tooltip {
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            #message .b3-snackbar__content {
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            .b3-tooltips::after {
                box-shadow: inset 0 0 0 1.5px var(--b3-theme-primary);
            }
            /* 适配垂直页签 */
            :root { 
                --QYL-vertical-fix-1: 1.5px solid var(--b3-theme-primary);
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
