export function initAnimation() {
    const style = document.createElement('style');
    style.id = 'QYL-Animation';
    style.textContent = `
        /* 页签 */
        .layout__center [data-type="wnd"] > .fn__flex:first-child > .layout-tab-bar:not(.layout-tab-bar--readonly) > .item {
            animation: QYLLayoutTab 0.5s;
            &:active {
                scale: 0.95;
            }
        }
        @keyframes QYLLayoutTab {
            0% {
                transform: translateX(-100%);
            }
            30% {
                transform: translateX(10%);
            }
            70% {
                transform: translateX(-5%);
            }
            100% {
                transform: translateX(0);
            }
        }
        /* DOCK */
        .layout__dockl > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] > .layout-tab-container .block__logo {
            animation: QYLDockLogoL 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .layout__dockr > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] > .layout-tab-container .block__logo {
            animation: QYLDockLogoR 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .layout__dockb > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] > .layout-tab-container .block__logo {
            animation: QYLDockLogoB 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] > .layout-tab-container .block__icons .block__icon {
            display: none;
        }
        :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] > .layout-tab-container .block__icons:hover .block__icon:not([disabled]) {
            display: unset;
            animation: QYLDockIcon 0.6s cubic-bezier(0.8, 0, 0.9, 1);
        }
        @keyframes QYLDockLogoL {
            0% {
              transform: translateX(-30%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
        }
        @keyframes QYLDockLogoR {
            0% {
              transform: translateX(50%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
        }
        @keyframes QYLDockLogoB {
            0% {
              transform: translateY(70%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        @keyframes QYLDockIcon {
            0% {
              transform: scale(0.7);
              opacity: 0;
            }
            50% {
              transform: scale(1.03);
              opacity: 1;
            }
            70% {
              transform: scale(0.98);
            }
            85% {
              transform: scale(1.01);
            }
            100% {
              transform: scale(1);
            }
        }
        /* 集市 */
        .config-bazaar__panel .b3-card {
            animation: QYLBazaarCard 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .config__tab-wrap > div {
            animation: QYLBazaarTab 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes QYLBazaarTab {
            0% {
              transform: translateY(-10%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        @keyframes QYLBazaarCard {
            0% {
              transform: translateY(-10%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        /* 搜索面板 */
        :is(#searchList, #searchAssetList, #searchUnRefList) .b3-list-item {
            animation: QYLSearchList 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes QYLSearchList {
            0% {
              transform: translateY(-40%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        /* 弹出窗口 */
        .block__popover.block__popover--open {
            animation: QYLBlockPopover 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes QYLBlockPopover {
            0% {
              transform: translateY(-15%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        /* 退出聚焦 */
        .protyle-breadcrumb button[data-type="exit-focus"] {
            animation: QYLExitFocus 0.5s ease-out;
        }
        @keyframes QYLExitFocus {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
        }
        /* 文档标题 */
        .protyle-title__input {
            animation: QYLFileTitle 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes QYLFileTitle {
            0% {
              transform: translateY(-40%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        /* 资源图片预览 */
        #preview > * {
            animation: QYLPreview 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        #preview > * {
            border-radius: var(--b3-border-radius);
        }
        @keyframes QYLPreview {
            0% {
              transform: translateY(-20%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        /* 菜单 */
        .b3-menu .b3-menu__item {
            animation: QYLMenu 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        #commonMenu .b3-list-item {
            animation: QYLMenu 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes QYLMenu {
            0% {
              transform: translateY(-40%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        /* list-item */
        .b3-list-item {
            animation: QYLListItem 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes QYLListItem {
            0% {
              transform: translateY(-40%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        /* 页签悬浮闪光 */
        .layout__center [data-type="wnd"] > .fn__flex:first-child > .layout-tab-bar:not(.layout-tab-bar--readonly) > .item:not(.item--pin+.item) {
            &:before {
              --shine-width: max(50%, 80px);
              content: "";
              background: var(--QYL-shine-color);
              height: 100%;
              width: var(--shine-width);
              transform: skewX(-45deg);
              display: block;
              position: absolute;
              top: 0;
              left: calc(-1.5 * var(--shine-width));
            }
            &:hover {
              transition: 0.5s cubic-bezier(0.1, 0.0, 0.8, 0.1);
              &::before {
                  left: calc(100% + 0.5 * var(--shine-width));
                  transition: 0.5s cubic-bezier(0.1, 0.0, 0.8, 0.1);
              }
            }
        }
        /* 按钮闪光 */
        :is(.b3-button, #barWorkspace):not(.b3-tooltips) {
            --QYL-button-transition: 0.5s cubic-bezier(0.1, 0.0, 0.8, 0.1);
        }
        .b3-button:not(.b3-tooltips) {
            &::before {
                --shine-width: max(50%, 80px);
                content: "";
                background: var(--QYL-shine-color);
                height: 100%;
                width: var(--shine-width);
                transform: skewX(-45deg);
                display: block;
                position: absolute;
                top: 0;
                left: calc(-1.5 * var(--shine-width));
            }
            &:hover, &:focus  {
                transition: var(--QYL-button-transition, var(--b3-transition));
                &::before {
                    left: calc(100% + 0.5 * var(--shine-width));
                    transition: 0.5s cubic-bezier(0.1, 0.0, 0.8, 0.1);
                }
            }
        }
        #barWorkspace {
            &::before {
                --shine-width: max(50%, 80px);
                content: "";
                background: var(--QYL-shine-color);
                height: 100%;
                width: var(--shine-width);
                transform: skewX(-45deg);
                display: block;
                position: absolute;
                top: 0;
                left: calc(-1.5 * var(--shine-width));
            }
            &:hover, &:focus  {
                transition: var(--QYL-button-transition, var(--b3-transition));
                &::before {
                    left: calc(100% + 0.5 * var(--shine-width));
                    transition: 0.5s cubic-bezier(0.1, 0.0, 0.8, 0.1);
                }
                & .toolbar__text {
                    transition: var(--QYL-button-transition, var(--b3-transition));
                }
            }
        }
        /* 超链接动效 */
        .protyle-wysiwyg [data-node-id] span[data-type~=a] {
            background-image: linear-gradient(to right, var(--b3-protyle-inline-link-color) 50%, transparent 50%);
            background-size: 200% 100%;
            background-position: 110% 0;
            background-repeat: no-repeat;
            transition: 0.6s cubic-bezier(0.8, 0, 0.9, 1);
            &:hover {
                transition: 0.6s cubic-bezier(0.8, 0, 0.9, 1);
                color: var(--b3-theme-on-primary);
                background-position: 0 0;
                border-bottom: 0.5px solid;
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=block-ref]:not(.av__celltext) {
            background-image: linear-gradient(to right, var(--b3-protyle-inline-blockref-color) 50%, transparent 50%);
            background-size: 200% 100%;
            background-position: 110% 0;
            background-repeat: no-repeat;
            transition: 0.6s cubic-bezier(0.8, 0, 0.9, 1);
            &:hover {
                transition: 0.6s cubic-bezier(0.8, 0, 0.9, 1);
                color: var(--b3-theme-on-primary);
                background-position: 0 0;
                border-bottom: 0.5px solid;
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=file-annotation-ref] {
            background-image: linear-gradient(to right, var(--b3-protyle-inline-fileref-color) 50%, transparent 50%);
            background-size: 200% 100%;
            background-position: 110% 0;
            background-repeat: no-repeat;
            transition: 0.6s cubic-bezier(0.8, 0, 0.9, 1);
            &:hover {
                transition: 0.6s cubic-bezier(0.8, 0, 0.9, 1);
                color: var(--b3-theme-on-primary);
                background-position: 0 0;
                border-bottom: 0.5px solid;
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type=virtual-block-ref] {
            background-image: linear-gradient(to right, var(--b3-theme-primary) 50%, transparent 50%);
            background-size: 200% 100%;
            background-position: 110% 0;
            background-repeat: no-repeat;
            transition: 0.6s cubic-bezier(0.8, 0, 0.9, 1);
            &:hover {
                transition: 0.6s cubic-bezier(0.8, 0, 0.9, 1);
                color: var(--b3-theme-on-primary);
                background-position: 0 0;
                border-bottom: 0.5px solid;
            }
        }
        .b3-typography span[data-type~=inline-memo], .protyle-wysiwyg span[data-type~=inline-memo] {
            background-image: linear-gradient(to right, var(--b3-theme-primary) 50%, var(--QYL-tab-item-focus) 50%);
            background-size: 200% 100%;
            background-position: 100% 0;
            background-repeat: no-repeat;
            transition: 0.6s cubic-bezier(0.8, 0, 0.9, 1);
            &:hover {
                transition: 0.6s cubic-bezier(0.8, 0, 0.9, 1);
                color: var(--b3-theme-on-primary);
                background-position: 0 0;
            }
            &.QYLinlinememoActive {
                transition: 0.6s cubic-bezier(0.8, 0, 0.9, 1) !important;
                color: var(--b3-theme-on-primary);
                background-position: 0 0;
            }
        }
        /* 列表子弹线 */
        .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
            animation: QYLListBullet 0.4s cubic-bezier(0.8, 0, 0.9, 1);
            transform-origin: left top;
        }
        @keyframes QYLListBullet {
            0% {
                max-width: 2px;
                transform: scaleY(0);
            }
            60% {
                max-width: 2px;
                transform: scaleY(1);
            }
            100% {
                max-width: 100%;
            }
        }
        /* 复选框 */
        .av__row--select:not(.av__row--header) .av__colsticky .av__firstcol::before {
            animation: QYLCheckbox1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .av__row:not(.av__row--select,.av__row--header) .av__colsticky .av__firstcol::before {
            animation: QYLCheckbox2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes QYLCheckbox1 {
            0%,100% {
                transform: none;
            }
            3% {
                transform: scale(1.2);
            }
        }
        @keyframes QYLCheckbox2 {
            0%,100% {
                transform: none;
            }
            3% {
                transform: scale(1.2);
            }
        }
        .protyle-wysiwyg [data-node-id][data-subtype="t"].li.protyle-task--done {
            background-image: linear-gradient(105deg,transparent 25%,var(--b3-theme-primary) 40%,oklch(calc(0.68 + var(--b3-theme-primary-brightness) * 0.02) calc(0.30 * max(0.35, var(--b3-theme-primary-saturate))) calc(var(--b3-theme-primary-main) + 60deg)) 60%,transparent 75%);
            background-size: 200% 100%;
            background-position: 0 0;
            background-repeat: no-repeat;
            animation: QYLglow 1s cubic-bezier(0.9, 0, 0.5, 1) forwards;
            & > .protyle-action--task {
                animation: QYLtaskenter1 1.5s cubic-bezier(0.4, 0.3, 0.8, 0.6) forwards;
            }
        }
        .protyle-wysiwyg [data-node-id][data-subtype="t"].li:not(.protyle-task--done) {
            & > .protyle-action--task {
                animation: QYLtaskenter2 0.6s cubic-bezier(0.8, 0, 0.9, 1);
            }
        }
        @keyframes QYLglow {
            from {
                background-position: -100% 0;
              }
              to {
                background-position: 200% 0;
              }
        }
        @keyframes QYLtaskenter1 {
            0% {
                transform: scale(0.2);
                opacity: 0;
            }
            50% {
                transform: scale(1.35);
                opacity: 1;
            }
            58% {
                transform: scale(0.85);
            }
            66% {
                transform: scale(1.12);
            }
            74% {
                transform: scale(0.97);
            }
            100% {
                transform: scale(1);
            }
        }
        @keyframes QYLtaskenter2 {
            0% {
              transform: scale(0.2);
              opacity: 0;
            }
            50% {
              transform: scale(1.2);
              opacity: 1;
            }
            70% {
              transform: scale(0.9);
            }
            85% {
              transform: scale(1);
            }
            100% {
              transform: scale(1);
            }
        }
        /* 分割线 */
        .protyle-wysiwyg [data-node-id].hr {
            animation: QYLHr 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes QYLHr {
            from {
              transform: translateX(-50%);
            }
            to {
              transform: translateX(0%);
            }
        }
        /* 块标 */
        .protyle-gutters {
            transition: none;
        }
        .protyle-gutters button {
            animation: QYLGutters 0.5s cubic-bezier(0.25, -0.5, 0.25, 1.5);
        }
        .protyle-gutters button[data-type="fold"] svg {
            transition: transform 0.3s cubic-bezier(0.28, -1.0, 0.6, 1.6);
        }
        .b3-list-item__arrow {
            transition: transform 0.3s cubic-bezier(0.28, -1.2, 0.6, 1.8) !important; 
        }
        @keyframes QYLGutters {
            0% {
              transform: scale(0.65) translateX(3px);
              opacity: 0;
            }
            40% {
              transform: scale(1.03) translateX(0px);
              opacity: 1;
            }
            70% {
              transform: scale(0.98);
            }
            100% {
              transform: scale(1);
            }
        }
        /* 编辑器工具栏 */
        .protyle-toolbar {
            animation: QYLToolBar 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .protyle-hint, .protyle-util {
            animation: QYLUtil 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes QYLToolBar {
            0% {
              transform: translateY(-20%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        @keyframes QYLUtil {
            0% {
              transform: translateY(-10%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        /* 提示 */
        .tooltip {
            animation: QYLTooltip 0.6s cubic-bezier(0.8, 0, 0.9, 1);
        }
        @keyframes QYLTooltip {
            0% {
              transform: scale(0.7);
              opacity: 0;
            }
            50% {
              transform: scale(1.01);
              opacity: 1;
            }
            70% {
              transform: scale(0.99);
            }
            85% {
              transform: scale(1);
            }
            100% {
              transform: scale(1);
            }
        }
        /* 面包屑 */
        .protyle-breadcrumb__bar {
            & .protyle-breadcrumb__item {
                animation: QYLBreadcrumb 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            & .protyle-breadcrumb__arrow {
                animation: QYLBreadcrumb 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
        }
        @keyframes QYLBreadcrumb {
            0% {
              transform: translateY(-20%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        #QYLSettingsContent {
            animation: QYLSettingsContent 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes QYLSettingsContent {
            0% {
              transform: translateY(-10%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        .QYLColorPickContainer {
            animation: QYLColorPickContainer 0.5s cubic-bezier(0.8, 0, 0.9, 1);
        }
        @keyframes QYLColorPickContainer {
            0% {
                transform: scale(0.9);
                opacity: 0;
              }
              50% {
                transform: scale(1.01);
                opacity: 1;
              }
              70% {
                transform: scale(0.99);
              }
              85% {
                transform: scale(1);
              }
              100% {
                transform: scale(1);
              } 
        }
        .protyle-wysiwyg div[fold="1"][data-type="NodeHeading"]:is(.h1, .h2, .h3, .h4, .h5, .h6) {
            animation: QYLHeadingFold 0.3s cubic-bezier(0.33, 1.42, 0.69, 0.99);
            transform-origin: left;
        }
        @keyframes QYLHeadingFold {
            0% {
              transform: scaleX(2.5);
            }
            100% {
              transform: scaleX(1);
            }
        }
        .protyle-wysiwyg [data-node-id].li[fold="1"] {
            animation: QYLListFold1 0.3s cubic-bezier(0.33, 1.42, 0.69, 0.99);
            transform-origin: left;
        }
        .protyle-wysiwyg [data-node-id].li:not([fold="1"]) {
            animation: QYLListFold2 0.3s cubic-bezier(0.33, 1.42, 0.69, 0.99);
            transform-origin: left;
        }
        @keyframes QYLListFold1 {
            0% {
              transform: scaleX(2.5);
            }
            100% {
              transform: scaleX(1);
            }
        }
        @keyframes QYLListFold2 {
          0% {
            transform: scaleX(0.5);
          }
          100% {
            transform: scaleX(1);
          }
        }
        .protyle-wysiwyg [data-node-id][fold="1"]:not(.li):not([data-type=NodeHeading]) {
            animation: QYLAnyFold 0.3s cubic-bezier(0.33, 1.42, 0.69, 0.99);
            transform-origin: top;
        }
        @keyframes QYLAnyFold {
            0% {
              transform: scaleY(2.5);
            }
            100% {
              transform: scaleY(1);
            }
        }
        .protyle-breadcrumb .block__icon[data-subtype="lock"] svg {
            animation: QYLLock 0.45s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: 50% 70%;
        }
        @keyframes QYLLock {
            0% {
                transform: rotate(0deg);
            }
            40% {
                transform: rotate(-18deg);
            }
            65% {
                transform: rotate(6deg);
            }
            80% {
                transform: rotate(-3deg);
            }
            100% {
                transform: rotate(0deg);
            }
        }
        .protyle-breadcrumb .block__icon[data-subtype="unlock"] svg {
            animation: QYLLockReverse 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: 50% 70%;
        }
        @keyframes QYLLockReverse {
            0% {
                transform: rotate(0deg);
            }
            40% {
                transform: rotate(-18deg);
            }
            65% {
                transform: rotate(6deg);
            }
            80% {
                transform: rotate(-3deg);
            }
            100% {
                transform: rotate(0deg);
            }
        }
        #QYLButton svg {
            transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
        }
        #QYLButton.QYLbuttonActive svg {
            transform: rotateY(180deg);
            color: var(--b3-theme-primary);
        }
        #QYLattr > .b3-menu__icon:first-child {
            transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
        }
        #QYLattr.b3-menu__item--show > .b3-menu__icon:first-child {
            transform: rotateY(180deg);
            color: var(--b3-theme-primary);
        }
        [data-key="QYLSettingsHidden"] .b3-dialog__container {
            animation: QYLSettingsHidden 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        [data-key="QYLSelfConfigAttrEdit"] .b3-dialog__container {
            animation: QYLSettingsHidden 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        [data-key="QYLCustomFontStyle"] .b3-dialog__container {
            animation: QYLCustomFontStyle 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        [data-key="QYLGlobalStyle"] .b3-dialog__container {
            animation: QYLGlobalStyle 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        [data-key="QYLEditorWidthSettings"] .b3-dialog__container {
            animation: QYLEditorWidthSettings 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes QYLCustomFontStyle {
            0% {
              transform: translateY(-10%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        @keyframes QYLSettingsHidden {
            0% {
              transform: translateY(-10%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        @keyframes QYLSettingsHidden {
            0% {
              transform: translateY(-10%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        @keyframes QYLGlobalStyle {
            0% {
              transform: translateY(-10%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
        @keyframes QYLEditorWidthSettings {
            0% {
              transform: translateY(-10%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}
export function removeAnimation() {
    const style = document.getElementById('QYL-Animation');
    if (style) {
        style.remove();
    }
}
