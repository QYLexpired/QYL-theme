export function initAnimation() {
    const style = document.createElement('style');
    style.id = 'QYL-Animation';
    style.textContent = `
        /* 页签 */
        .layout__center [data-type="wnd"] > .fn__flex:first-child > .layout-tab-bar:not(.layout-tab-bar--readonly) > .item {
            animation: QYLLayoutTab 0.5s;
            &:active {
                scale: 0.9;
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
        :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] > .layout-tab-container .block__logo {
            animation: QYLDockLogo 0.6s cubic-bezier(0.8, 0, 0.9, 1);
        }
        :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] > .layout-tab-container .block__icons .block__icon {
            display: none;
        }
        :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] > .layout-tab-container .block__icons:hover .block__icon:not([disabled]) {
            display: unset;
            animation: QYLDockLogo 0.6s cubic-bezier(0.8, 0, 0.9, 1);
        }
        @keyframes QYLDockLogo {
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
            animation: QYLBazaarCard 0.6s cubic-bezier(0.8, 0, 0.9, 1);
        }
        .config__tab-wrap > div {
            animation: QYLBazaarTab 0.2s;
        }
        @keyframes QYLBazaarTab {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
        }
        @keyframes QYLBazaarCard {
            0% {
              transform: scale(0.8);
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
        /* 搜索面板 */
        :is(#searchList, #searchAssetList, #searchUnRefList) .b3-list-item {
            animation: QYLSearchList 0.6s cubic-bezier(0.8, 0, 0.9, 1);
        }
        @keyframes QYLSearchList {
            0% {
              transform: scale(0.8);
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
            animation: QYLFileTitle 0.3s cubic-bezier(0.8, 0, 0.9, 1);
        }
        @keyframes QYLFileTitle {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
        }
        /* 资源图片预览 */
        #preview > * {
            animation: QYLPreview 0.2s cubic-bezier(0.8, 0, 0.9, 1);
        }
        #preview > * {
            border-radius: var(--b3-border-radius);
        }
        @keyframes QYLPreview {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
        }
        /* 菜单 */
        .b3-menu .b3-menu__item {
            animation: QYLMenu 0.3s;
        }
        #commonMenu .b3-list-item {
            animation: QYLMenu 0.3s;
        }
        @keyframes QYLMenu {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
        }
        /* list-item */
        .b3-list-item {
            animation: QYLListItem 0.3s;
        }
        @keyframes QYLListItem {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
        }
        /* 页签悬浮闪光 */
        .layout-tab-bar .item:not(.layout-tab-bar .item--readonly) {
            --translate-offset: 220%;
            &:before {
                content: "";
                background-color: rgba(255,255,255,0.8);
                height: 100%;
                width: 30%;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                transform: skewX(-45deg) translateX(calc(-1 * var(--translate-offset)));
            }
            &:hover {
              &::before {
                  transition: 0.4s cubic-bezier(0.8, 0, 0.9, 1);
                  transform: skewX(-45deg) translateX(calc(var(--translate-offset) + 270%));
              }
            }
        }
        :is(.b3-button,.b3-chip--pink)::before {
            display: block !important;
        }
        #barWorkspace::before {
            display: block !important;
        }
        /* 超链接动效 */
        .protyle-wysiwyg [data-node-id] span[data-type~=a] {
            background-image: linear-gradient(to right, var(--b3-protyle-inline-link-color) 50%, transparent 50%);
            background-size: 200% 100%;
            background-position: 110% 0;
            background-repeat: no-repeat;
            transition: 0.3s cubic-bezier(0.8, 0, 0.9, 1);
            &:hover {
                transition: 0.3s cubic-bezier(0.8, 0, 0.9, 1);
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
            transition: 0.3s cubic-bezier(0.8, 0, 0.9, 1);
            &:hover {
                transition: 0.3s cubic-bezier(0.8, 0, 0.9, 1);
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
            transition: 0.3s cubic-bezier(0.8, 0, 0.9, 1);
            &:hover {
                transition: 0.3s cubic-bezier(0.8, 0, 0.9, 1);
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
            transition: 0.3s cubic-bezier(0.8, 0, 0.9, 1);
            &:hover {
                transition: 0.3s cubic-bezier(0.8, 0, 0.9, 1);
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
            transition: 0.3s cubic-bezier(0.8, 0, 0.9, 1);
            &:hover {
                transition: 0.3s cubic-bezier(0.8, 0, 0.9, 1);
                color: var(--b3-theme-on-primary);
                background-position: 0 0;
            }
            &.QYLinlinememoActive {
                transition: 0.3s cubic-bezier(0.8, 0, 0.9, 1) !important;
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
        /* 任务列表 */
        .protyle-wysiwyg [data-node-id][data-subtype="t"].li.protyle-task--done {
            background-image: linear-gradient(105deg,transparent 25%,var(--b3-theme-primary-lighter) 40%,var(--b3-theme-primary-lighter) 60%,transparent 75%);
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
                background-position: 150% 0;
              }
        }
        @keyframes QYLtaskenter1 {
            0% {
                transform: scale(0);
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
              transform: scale(0);
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
            animation: QYLHr 0.3s cubic-bezier(0.9, 0, 0.5, 1);
        }
        @keyframes QYLHr {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0%);
            }
        }
        /* 块标 */
        .protyle-gutters button {
            animation: QYLGutters 0.3s cubic-bezier(0.8, 0, 0.9, 1);
        }
        .protyle-gutters button[data-type="fold"] svg {
            transition: transform 0.3s cubic-bezier(0.28, -1.0, 0.6, 1.6);
        }
        .b3-list-item__arrow {
            transition: transform 0.3s cubic-bezier(0.28, -1.2, 0.6, 1.8) !important; 
        }
        @keyframes QYLGutters {
            0% {
              transform: scale(0.3);
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
        /* 编辑器工具栏 */
        .protyle-toolbar {
            animation: QYLToolBar 0.3s cubic-bezier(0.8, 0, 0.9, 1);
        }
        .protyle-hint, .protyle-util {
            animation: QYLToolBar 0.2s cubic-bezier(0.8, 0, 0.9, 1);
        }
        @keyframes QYLToolBar {
            0% {
              transform: scale(0.95);
              opacity: 0;
            }
            100% {
              transform: scale(1);
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
                animation: QYLBreadcrumb 0.4s cubic-bezier(0.8, 0, 0.9, 1);
            }
            & .protyle-breadcrumb__arrow {
                animation: QYLBreadcrumb 0.4s cubic-bezier(0.8, 0, 0.9, 1);
            }
        }
        @keyframes QYLBreadcrumb {
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
        /* 表情 */
        [data-key="dialog-emojis"] .b3-dialog__container {
            animation: QYLEmoji 0.8s cubic-bezier(0.8, 0, 0.9, 1);
        }
        .emojis__item {
            animation: QYLEmoji 0.8s cubic-bezier(0.8, 0, 0.9, 1);
        }
        @keyframes QYLEmoji {
            0% {
              transform: scale(0.8);
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
        #QYLSettingsContent {
            animation: QYLSettingsContent 0.5s cubic-bezier(0.8, 0, 0.9, 1);
        }
        @keyframes QYLSettingsContent {
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
        .protyle-breadcrumb .block__icon[aria-label="取消临时解锁"] svg {
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
        .protyle-breadcrumb .block__icon[aria-label="临时解锁"] svg {
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
            animation: QYLSettingsHidden 0.4s cubic-bezier(0.8, 0, 0.9, 1);
        }
        [data-key="QYLSelfConfigAttrEdit"] .b3-dialog__container {
            animation: QYLSettingsHidden 0.4s cubic-bezier(0.8, 0, 0.9, 1);
        }
        [data-key="QYLCustomFontStyle"] .b3-dialog__container {
            animation: QYLCustomFontStyle 0.4s cubic-bezier(0.8, 0, 0.9, 1);
        }
        @keyframes QYLCustomFontStyle {
            0% {
                transform: scale(0.9);
                opacity: 0;
            }
        }
        @keyframes QYLSettingsHidden {
            0% {
                transform: scale(0.9);
                opacity: 0;
              }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        @keyframes QYLSettingsHidden {
            0% {
                transform: scale(0.9);
                opacity: 0;
              }
            100% {
                transform: scale(1);
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
