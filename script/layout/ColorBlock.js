export function initColorBlock() {
    if (document.body.classList.contains('QYLmobile')) return;
    document.documentElement.classList.add('QYLColorBlock');
    const style = document.createElement('style');
    style.id = 'QYL-ColorBlock';
    style.textContent = `
        /* 主界面 */
        #layouts {
            background-color: var(--b3-theme-background);
            padding: 0;
            &.layout__center {
                padding-top: 0 !important;
            }
        }
        :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] {
            border-radius: 0;
            border: none !important;
        }
        :is(.layout__dockl, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] > .layout-tab-container {
            background-color: var(--b3-theme-surface);
        }
        .layout__dockl:not([style*="width: 0px"])  {
            box-shadow: 0 40px 0 0 var(--b3-theme-surface) inset;
        }
        .dock#dockLeft:not(:has(.dock__item--active)) {
            background-color: var(--b3-theme-background);
            border-right: 0.5px solid var(--b3-theme-surface-lighter);
            clip-path: inset(45px 0 0 0);
        }
        .dock#dockRight {
            border-left: 0.5px solid var(--b3-theme-surface-lighter);
            clip-path: inset(45px 0 0 0);
            background-color: var(--b3-theme-background);
        }
        .dock#dockBottom {
            border-top: 0.5px solid var(--b3-theme-surface-lighter);
            background-color: var(--b3-theme-background);
            margin-top: 0 !important;
        }
        #layouts .layout__center :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] {
            border-radius: 0 !important;
            & > .layout-tab-container {
            border-radius: 0 !important;
            }
        }
        #toolbar.QYLtoolbarlefthidden::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 42px;
            height: 32px;
            background-color: var(--b3-theme-surface);
            z-index: 1;
        }
        #toolbar.QYLtoolbarrighthidden::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 42px;
            height: 32px;
            background-color: var(--b3-theme-background);
            z-index: 1;
        }
        .dock#dockLeft.QYLDockLeftFloat:not(.QYLDockLeftHidden) {
            background-color: var(--b3-theme-background);
            border-right: 0.5px solid var(--b3-theme-surface-lighter);
            clip-path: inset(45px 0 0 0);   
        }
        .layout__empty {
            border-radius: 0 !important;
            box-shadow: 0 -40px 0 0 var(--b3-theme-background);
        }
        #dockLeft.fn__none + #layouts {
            padding-left: 0;
            padding-right: 0;
        }
        /* 主界面分割线 */
        .layout__resize {
            margin: -3px 0 !important;
            &:hover {
                &::after {
                    background-color: var(--b3-theme-primary) !important;
                }
            }
            &::after {
                transform: none !important;
                visibility: visible !important;
                height: 0.5px;
                border-radius: 0 !important;
                background-color: var(--b3-theme-surface-lighter) !important;
            }
        }
        .layout__resize.layout__resize--lr {
            margin: 0 -6px 0 0 !important;
            &:hover {
                &::after {
                    background-color: var(--b3-theme-primary) !important;
                }
            }
            &::after {
                visibility: visible !important;
                width: 0.5px;
                border-radius: 0 !important;
                background-color: var(--b3-theme-surface-lighter) !important;
            }
        }
        .layout__dockl + .layout__resize {
            &::after {
            background-color: transparent !important;
            }
        }
        #layouts .layout__resize.layout__resize--lr:has( + .layout__dockr) {
            clip-path: inset(40px 0 0 0) !important;
        }
        .layout--float.layout__dockl {
            top: 38px;
            bottom: var(--QYL-dock-float-b-0);
            border-radius: 0;
            &:not([style*="translateX"]) {
                top: 0;
                left: var(--QYL-dock-float-l-0) !important;
                & > .fn__flex-1.fn__flex:first-child {
                    padding-top: 30px;
                }
            }
        }
        .layout--float.layout__dockr {
            top: 0px;
            padding-top: 30px;
            bottom: var(--QYL-dock-float-b-0);
            border-radius: 0;
            box-shadow: 0 40px 0 0 var(--b3-theme-background) inset;
            &:not([style*="translateX"]) {
                right: var(--QYL-dock-float-r-0) !important;
            }
        }
        .layout--float.layout__dockb {
            border-radius: 0;
        }
        /* 页签需向下偏移 */
        .layout__center :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] > .fn__flex:first-child {
            --QYL-FusionOn-Top-Transform: translateY(5.5px);
            margin-bottom: 4.5px;
        }
        .layout__center :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"]:not(.QYLFusionTop) > .fn__flex:first-child {
            --QYL-FusionOn-Not-Top-Transform: translateY(2.5px);
            margin-bottom: 4.5px;
        }
        /* 取消扁平化风格的边框 */
        :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] > .layout-tab-container {
            border: none !important;
        }
        #layouts .layout__center :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] > .layout-tab-container {
            border: none !important;
        }
        /* 取消顶栏融合的分割线切割 */
        #layouts .layout__resize.layout__resize--lr {
            clip-path: none !important;
            &::after {
                transform: none !important;
            }
        }
        /* 状态栏下移 */
        @media (min-width: 630px) {
            #status {
                bottom: 6px;
            }
        }
        /* 更改顶栏融合侧栏偏移 */
        :is(.layout__dockl, .layout__dockr):not(.layout--float) {
            padding-top: 37.5px !important;
        }
        /* 反链面板兼容 */
        :is(.layout__dockl, .layout__dockb) .sy__backlink .protyle,.sy__backlink .protyle-content {
            background-color: rgba(0,0,0,0)
        }
        :is(.layout__dockl, .layout__dockb) .sy__backlink .b3-list--background .b3-list-item {
            box-shadow: 0 6px 0 var(--b3-theme-surface), 0 -6px 0 var(--b3-theme-surface);
            background-color: var(--b3-theme-background) !important;
        }
        /* 状态栏回退 */
        @media (max-width: 630px) {
            #status {
                border-top: 0.5px solid var(--b3-theme-surface-lighter);
                background-color: var(--b3-theme-background);
            }
        }
        /* 顶栏 */
        #barWorkspace {
            background-color:rgba(255, 0, 0, 0);
            height: 22px;
            min-width: 30px;
            & span.toolbar__text {
                color: var(--b3-toolbar-color);
                line-height: 12px;
            }
            &:hover {
                background-color: var(--b3-theme-primary) !important;
                & span.toolbar__text {
                    color: var(--b3-theme-background);
                }
            }
        }
        /* 设置界面 */
        [data-key="dialog-setting"] {
            & .config__tab-wrap .b3-label :where(.fn__flex-1,.fn__block,.fn__flex-center):not(.ft__on-surface,.b3-button,.b3-form__icon,.fn__size200,ul,input):first-child,& :where(.b3-label,.config__ite)::first-line{
                font-weight: bold;
                color: var(--b3-theme-on-background);
            }
            & .config__tab-wrap .config-query .fn__flex-1, & .b3-label__text, & .b3-label :where(a,code,.ft__on-surface):not(.b3-button--outline) {
                font-weight: normal !important;
                color: var(--b3-theme-on-surface) !important;
            }
        }
    `;
    document.head.appendChild(style);
}
export function removeColorBlock() {
    document.documentElement.classList.remove('QYLColorBlock');
    const style = document.getElementById('QYL-ColorBlock');
    if (style) {
        style.remove();
    }
}
