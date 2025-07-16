import ToolDirection from '../basic/ToolDirection.js';
let isEnabled = false;
let styleElement = null;
let toolDirectionInstance = null;
export function initFixedTool() {
    if (document.body.classList.contains('QYLmobile')) return;
    if (isEnabled) return;
    styleElement = document.createElement('style');
    styleElement.id = 'QYL-FixedTool';
    styleElement.textContent = `
        @keyframes QYLFixedToolToolbarL {
            0% {
                transform: translateY(-50%) scale(0.8);
            }
            100% {
                transform: translateY(-50%) scale(1);
            }
        }
        @keyframes QYLFixedToolToolbarR {
            0% {
                transform: translateY(-50%) scale(0.8);
            }
            100% {
                transform: translateY(-50%) scale(1);
            }
        }
        @keyframes QYLFixedToolToolbarB {
            0% {
                transform: translateX(-50%) scale(0.8);
            }
            100% {
                transform: translateX(-50%) scale(1);
            }
        }
        @keyframes QYLFixedToolToolbarT {
            0% {
                transform: translateX(-50%) scale(0.8);
            }
            100% {
                transform: translateX(-50%) scale(1);
            }
        }
        :is(#layouts .layout__center, #layouts.layout__center) .layout-tab-container > .protyle:has(.protyle-content .protyle-title__input[contenteditable="true"]) > .protyle-toolbar.toolbarl {
          display: flex !important;
          flex-direction: column;
          position: absolute !important;
          top: 50% !important;
          left: 10px !important;
          transform: translateY(-50%);
          border-radius: 8px;
          padding: 1px 0;
          animation: QYLFixedToolToolbarL 0.3s cubic-bezier(0.33, 1.42, 0.69, 0.99) !important;
          & .protyle-toolbar__item {
              border-radius: 8px;
              margin: 0 1px;
              &::after {
                  transform: none !important;
                  top: 0 !important;
                  bottom: auto !important;
                  left: 100% !important;
                  right: auto !important;
                  margin-left: 0 !important;
              }
          }
          & .protyle-toolbar__divider {
              margin: 0px 2px;
              border-left: none;
              border-bottom: 1px solid var(--b3-theme-surface-lighter);
          }
        }
        :is(#layouts .layout__center, #layouts.layout__center) .layout-tab-container > .protyle:has(.protyle-content .protyle-title__input[contenteditable="true"]) > .protyle-toolbar.toolbarr {
          display: flex !important;
          flex-direction: column;
          position: absolute !important;
          top: 50% !important;
          right: 35px !important;
          left: auto !important;
          transform: translateY(-50%);
          border-radius: 8px;
          padding: 1px 0;
          animation: QYLFixedToolToolbarR 0.3s cubic-bezier(0.33, 1.42, 0.69, 0.99) !important;
          & .protyle-toolbar__item {
              border-radius: 8px;
              margin: 0 1px;
              &::after {
                  transform: none !important;
                  top: 0 !important;
                  bottom: auto !important;
                  right: 100% !important;
                  left: auto !important;
                  margin-left: 0 !important;
              }
          }
          & .protyle-toolbar__divider {
              margin: 0px 2px;
              border-left: none;
              border-bottom: 1px solid var(--b3-theme-surface-lighter);
          }
        }
        :is(#layouts .layout__center, #layouts.layout__center) .layout-tab-container > .protyle:has(.protyle-content .protyle-title__input[contenteditable="true"]) > .protyle-toolbar {
          display: flex !important;
          position: absolute !important;
          top: var(--QYL-fixedtoolbar-fix, 36px) !important;
          left: 50% !important;
          transform: translateX(-50%);
          border-radius: 8px;
          padding: 0 1px;
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
          width: auto !important;
          box-shadow: var(--b3-point-shadow),0 0 0 1px rgba(255, 255, 255, 0.12) inset,0 2px 1px -1px rgba(255, 255, 255, 0.2) inset !important;
          transition: none !important;
          animation: QYLFixedToolToolbarT 0.3s cubic-bezier(0.33, 1.42, 0.69, 0.99) !important;
          & .protyle-toolbar__item {
              border-radius: 8px;
              margin: 1px 1px;
              &::after {
                transform: none !important;
                top: 30px !important;
                bottom: auto !important;
                left: 0 !important;
                right: auto !important;
                margin-left: 0 !important;
            }
          }
        }
        :is(#layouts .layout__center, #layouts.layout__center) .layout-tab-container > .protyle:has(.protyle-content .protyle-title__input[contenteditable="true"]) > .protyle-toolbar.toolbarb {
          display: flex !important;
          position: absolute !important;
          left: 50% !important;
          top: calc(100% - 50px) !important;
          transform: translateX(-50%);
          border-radius: 8px;
          padding: 0 1px;
          animation: QYLFixedToolToolbarB 0.3s cubic-bezier(0.33, 1.42, 0.69, 0.99) !important; 
          & .protyle-toolbar__item {
              border-radius: 8px;
              margin: 1px 1px;
              &::after {
                transform: none !important;
                top: -32px !important;
                bottom: auto !important;
                left: 0 !important;
                right: auto !important;
                margin-left: 0 !important;
            }
          }
        }
        :is(#layouts .layout__center, #layouts.layout__center) .protyle-content:has(.protyle-title__input[contenteditable="true"]) {
          margin-top: unset !important;
        }
    `;
    document.head.appendChild(styleElement);
    toolDirectionInstance = new ToolDirection();
    isEnabled = true;
}
export function removeFixedTool() {
    if (!isEnabled) return;
    if (toolDirectionInstance) {
        toolDirectionInstance.destroy();
        toolDirectionInstance = null;
    }
    if (styleElement) {
        styleElement.remove();
        styleElement = null;
    }
    const directionClasses = ['toolbarl', 'toolbarb', 'toolbarr', 'toolbart'];
    const toolbarElements = document.querySelectorAll('.protyle-toolbar');
    toolbarElements.forEach(element => {
        directionClasses.forEach(className => {
            element.classList.remove(className);
        });
    });
    isEnabled = false;
    if (window.gc) {
        window.gc();
    }
}
export function isFixedToolEnabled() {
    return isEnabled;
}
