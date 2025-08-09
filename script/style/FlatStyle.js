export function initFlatStyle() {
    if (document.body.classList.contains('QYLmobile')) return;
    document.documentElement.classList.add('QYLFlatStyle');
    const style = document.createElement('style');
    style.id = 'QYL-FlatStyle';
    style.textContent = `
        :root {
            --QYL-wnd-layout-tab-border-flat: 1px solid var(--b3-theme-surface-lighter);/* 适配垂直页签 */
        }
        #barWorkspace {
            background-color:rgba(255, 0, 0, 0);
            & .toolbar__text {
                color: var(--b3-toolbar-color);
            }
            &:hover {
                background-color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
                & span.toolbar__text {
                    color: var(--b3-theme-on-primary);
                }
            }
        }
        /* 悬停 */
        .dock__item:hover:not(.dock__item--activefocus), .dock__item--active {
            background-color:rgba(255, 0, 0, 0);
            color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
        }
        .toolbar__item:not(.toolbar__item--disabled):not(.toolbar__item--close):hover, .toolbar__item--active {
            background-color: rgba(255, 0, 0, 0);
            color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
        }
        .block__icon:hover:not([disabled]):not(.ft__primary):not(.block__icon--warning), .block__icon--active {
            background-color: rgba(255, 0, 0, 0);
            color: var(--b3-theme-primary-fix, var(--b3-theme-primary)) !important;
        }
        .b3-list-item__action:hover {
            background-color: rgba(255, 0, 0, 0);
            color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
        }
        .file-tree .b3-list-item .b3-list-item__toggle:hover .b3-list-item__arrow {
            color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
        }
        [data-theme-mode="light"] {
            & .dock__item:hover:not(.dock__item--activefocus), .dock__item--active {
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            }
            & .toolbar__item:not(.toolbar__item--disabled):not(.toolbar__item--close):hover, .toolbar__item--active {
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            }
            & .block__icon:hover:not([disabled]):not(.ft__primary):not(.block__icon--warning), .block__icon--active {
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary)) !important;
            }
            & .b3-list-item__action:hover {
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            }
            & .file-tree .b3-list-item .b3-list-item__toggle:hover .b3-list-item__arrow {
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            }
        }
        .b3-list--background .b3-list-item:hover:not(.b3-list-item--focus):not(.dragover):not(.dragover__current):not(.dragover__top):not(.dragover__bottom), .b3-list--background .b3-list-item--focus {
            background-color: rgba(255, 0, 0, 0);
            color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            & .b3-list-item__text {
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            }
            & > :is(.b3-switch:checked) {
                filter: brightness(0.9);
                outline: 0.5px solid var(--b3-theme-on-primary);
            }
            & .b3-list-item__meta {
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            }
        }
        .b3-menu__item--show {
            background-color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            & > :is(.b3-menu__icon, .b3-menu__label, .b3-menu__accelerator, .b3-menu__action, .b3-menu__checked) {
                color: var(--b3-theme-on-primary);
            }
            & > :is(.b3-switch:checked) {
                filter: brightness(0.9);
                outline: 0.5px solid var(--b3-theme-on-primary);
            }
            &.b3-menu__item--warning {
                background-color: var(--b3-theme-error);
            }
        }
        .b3-menu__item--current:not(.b3-menu__item--readonly) {
            background-color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            & > :is(.b3-menu__icon, .b3-menu__label, .b3-menu__accelerator, .b3-menu__action, .b3-menu__checked) {
                color: var(--b3-theme-on-primary);
            }
            & > :is(.b3-switch:checked) {
                filter: brightness(0.9);
                outline: 0.5px solid var(--b3-theme-on-primary);
            }
            &.b3-menu__item--warning {
                background-color: var(--b3-theme-error);
            }
        }
        .file-tree .b3-list--background .b3-list-item--focus {
            background-color: rgba(255, 0, 0, 0);
            color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
        }
        .secondaryToolbarButton:hover {
            background-color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            & > :is(.b3-menu__icon, .b3-menu__label, .b3-menu__accelerator, .b3-menu__action, .b3-menu__checked) {
                color: var(--b3-theme-on-primary);
            }
        }
        .pdf__util .b3-menu__item:hover {
            background-color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            & .b3-menu__icon, .b3-menu__label, .b3-menu__accelerator {
                color: var(--b3-theme-on-primary);
            }
            & > :is(.b3-switch:checked) {
                filter: brightness(0.9);
                outline: 0.5px solid var(--b3-theme-on-primary);
            }
            &[data-type="remove"] {
                background-color: var(--b3-theme-error);
            }
        }
        .av__panel .b3-menu__item:not([data-type=nobg]):hover, .av__panel .b3-menu__item--current:not([data-type=nobg]) {
            background-color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            & > :is(.b3-menu__icon, .b3-menu__label, .b3-menu__accelerator, .b3-menu__action, .b3-menu__checked, .fn__flex-center) {
                color: var(--b3-theme-on-primary);
            }
            & > :is(.b3-switch:checked) {
                filter: brightness(0.9);
                outline: 0.5px solid var(--b3-theme-on-primary);
            }
            &[data-type="removeCol"] {
                background-color: var(--b3-theme-error);
            }
        }
        [data-theme-mode="dark"] :is(#minWindow, #restoreWindow, #maxWindow):hover {
            color: var(--b3-theme-on-primary);
        }
        #status .toolbar__item:hover {
            background-color: transparent !important;
        }
        /* 主界面 */
        :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] {
            border: 1px solid var(--b3-theme-surface-lighter);
            box-sizing: border-box;
        }
        .layout__center:not(#layouts) :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] {
            border: var(--QYL-wnd-border-none, 1px solid var(--b3-theme-surface-lighter));
            box-sizing: border-box;
            & > .layout-tab-container {
                border: var(--QYL-wnd-container-border-flat);
            }
        }
        :is(.layout__dockl, .layout__dockr, .layout__dockb).layout--float {
            > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] {
                border: none;
            }
        }
        /* 阴影 */
        .b3-menu, .b3-dialog__container, .b3-menu__submenu, .secondaryToolbar {
            box-shadow: none;
        }
        #status {
            box-shadow: none;
        }
        .tooltip {
            box-shadow: none;
            color: var(--b3-theme-on-surface);
        }
        #message .b3-snackbar__content {
            box-shadow: none;
        }
        .b3-tooltips::after {
            box-shadow: none;
        }
        /* 集市 */
        .config-bazaar__panel .b3-card {
            box-shadow: none;
            outline: 1px solid var(--b3-theme-surface-lighter);
        }
        div[data-key="dialog-setting"] .b3-dialog__container .config__tab-wrap .config-bazaar__panel .fn__flex.config-bazaar__title button:is([data-type="myPlugin"], [data-type="myTheme"], [data-type="myIcon"], [data-type="myTemplate"], [data-type="myWidget"]) {
            background-color: rgba(255, 0, 0, 0) !important;
            color: var(--b3-theme-on-surface);
            border: none;
            box-shadow: none !important;
            font-weight: bold;
            &:focus {
                background-color: rgba(255, 0, 0, 0) !important;
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary)) !important;
                border: none;
                box-shadow: none !important;
                border: none;
                box-shadow: none !important;
            }
            &:not(.b3-button--outline) {
                background-color: rgba(255, 0, 0, 0) !important;
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary)) !important;
                border: none;
                box-shadow: none !important;
                border: none;
                box-shadow: none !important;
            }
            &:hover {
                background-color: rgba(255, 0, 0, 0) !important;
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
                border: none;
                box-shadow: none !important;
                border: none;
                box-shadow: none !important;
            }
        }
        /* 编辑器工具栏 */
        .protyle-toolbar {
            box-shadow: none;
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        .protyle-hint, .protyle-util {
            box-shadow: none;
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        /* 斜杠菜单 */
        .protyle-hint.hint--menu {
            box-shadow: none;
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        /* 块标 */  
        .block__popover {
            box-shadow: none;
            border: 1px solid var(--b3-theme-surface-lighter);
            background-color: var(--b3-theme-surface);
            & .block__icons.block__icons--menu {
                background-color: var(--b3-theme-surface);
            }
        }
        /* 设置 */
        div[data-key="dialog-setting"] .config__tab-wrap {
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        /* 命令面板 */
        div[data-key="dialog-commandpanel"] .b3-dialog__body .fn__flex-column .b3-list.b3-list--background.search__list {
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        /* 搜索 */
        :is(div[data-key="dialog-globalsearch"], div[data-key="dialog-search"]) .b3-form__icon.search__header {
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        :is(div[data-key="dialog-globalsearch"], div[data-key="dialog-search"]) .search__header[id="criteria"] {
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        :is(div[data-key="dialog-globalsearch"], div[data-key="dialog-search"]) .search__preview {
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        :is(div[data-key="dialog-globalsearch"], div[data-key="dialog-search"]) #searchList {
            border: 1px solid var(--b3-theme-surface-lighter);
            & :is([data-type="search-item"]:hover, [data-type="search-item"].b3-list-item--focus) .b3-list-item__meta {
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            }
        }
        /* 侧栏 */
        .graph__panel {
            box-shadow: none;
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        /* PDF */
        #dialogContainer>.dialog--open {
            box-shadow: none !important;
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        .textLayer .highlight.selected {
            background-color: rgb(from var(--b3-theme-primary-fix, var(--b3-theme-primary)) r g b / 35%);
        }
        #findbar .b3-button--small.b3-button--outline {
            border: none;
            box-shadow: none !important;
            color: var(--b3-theme-on-background);
            &:hover {
                border: none;
                box-shadow: none !important;
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
                background-color: rgba(255, 0, 0, 0);
            }
            &::before {
                display: none !important;
            }
        }
        #findbar .b3-button--small:not(.b3-button--outline) {
            border: none;
            box-shadow: none !important;
            color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            background-color: rgba(255, 0, 0, 0);
            &:hover {
                border: none;
                box-shadow: none !important;
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
                background-color: rgba(255, 0, 0, 0);
            }
            &::before {
                display: none !important;
            }
        }
        #findbar [data-status="notFound"] {
            color: var(--b3-theme-error) !important;
        }
        /* 状态栏 */
        .status .toolbar__item:hover {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        /* 分割线 */
        #layouts .layout__resize.layout__resize--lr::after {
            width: 0.5px;
            background-color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            transform: translateX(2.5px);
        }
        #layouts .layout__resize:not(.layout__resize--lr)::after {
            height: 0.5px;
            background-color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            transform: translateY(0);
        }
        .search__drag::after {
            height: 1px;
            background-color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            transform: translateY(2.5px);
        }
        .search__drag:hover::after {
            background-color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
        }
        .search__layout--row .search__drag::after {
            width: 1px;
            background-color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
            transform: translateX(2.5px);
        }
        /* 细节调整 */
        [data-theme-mode="dark"] :is(.b3-menu, .b3-menu__submenu,.b3-dialog__container, #message .b3-snackbar__content, .protyle-toolbar, .protyle-hint.hint--menu, .protyle-util, .protyle-hint) {
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        @media (min-width: 630px) {
            [data-theme-mode="dark"] #status {
                border: 1px solid var(--b3-theme-surface-lighter);
            }
        }
        [data-theme-mode="dark"] .tooltip {
            border: 1px solid var(--b3-theme-surface-lighter);
        }
        #QYLattr .QYLAttrActiveMenu.b3-menu__item--show {
            & > :is(.b3-menu__icon, .b3-menu__label, .b3-menu__accelerator) {
                color: var(--b3-theme-on-primary);
            }
        }
        #QYLattr.b3-menu__item--show > .b3-menu__icon:first-child {
            color: var(--b3-theme-on-primary);
        }
        .layout-tab-bar .item {
            &:not(.item--readonly, .item.item--focus) {
                background-color: transparent;
                outline: 1px solid var(--b3-theme-surface-lighter);
                &:hover {
                    background-color: transparent;
                }
            }
            &.item--focus {
                background-color: transparent;
                outline: 1px solid var(--b3-theme-surface-lighter);
                & .item__text {
                    color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
                }
            }
        }
        /* 数据库页签 */
        .av__header .layout-tab-bar {
            background-color: transparent;
            & .item.item--focus {
                background-color: transparent;
                & .item__graphic {
                    color: var(--b3-theme-primary-fix, var(--b3-theme-primary));
                }
            }
            & .item:not(.item--focus) {
                background-color: rgba(255, 0, 0, 0);
                outline: none;
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
        /* 面包屑 */
        .protyle-breadcrumb__item:hover {
            & svg {
                background: transparent !important;
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary)) !important;
            }
            & .protyle-breadcrumb__text {
                background: transparent !important;
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary)) !important;
            }
        }
        .protyle-breadcrumb__item--active {
            & svg {
                background: transparent !important;
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary)) !important;
            }
            & .protyle-breadcrumb__text {
                background: transparent !important;
                color: var(--b3-theme-primary-fix, var(--b3-theme-primary)) !important;
            }
            &:first-child {
                & svg {
                    color: var(--b3-theme-on-surface) !important;
                }
                & .protyle-breadcrumb__text {
                    color: var(--b3-theme-on-surface) !important;
                }
                &:hover {
                    & svg {
                        background: transparent !important;
                        color: var(--b3-theme-primary-fix, var(--b3-theme-primary)) !important;
                    }
                    & .protyle-breadcrumb__text {
                        color: var(--b3-theme-primary-fix, var(--b3-theme-primary)) !important;
                    }
                }
            }
        }
        .protyle-breadcrumb__item--active :is(svg, .protyle-breadcrumb__text):hover {
            background: transparent !important;
            color: var(--b3-theme-primary-fix, var(--b3-theme-primary)) !important;
        }
`;
    document.head.appendChild(style);
}
export function removeFlatStyle() {
    document.documentElement.classList.remove('QYLFlatStyle');
    const style = document.getElementById('QYL-FlatStyle');
    if (style) {
        style.remove();
    }
}
