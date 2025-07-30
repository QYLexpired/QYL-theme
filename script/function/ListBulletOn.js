import ListBullet from '../basic/ListBullet.js';
let isEnabled = false;
let styleElement = null;
let listBulletInstance = null;
export function initListBulletOn() {
    if (isEnabled) return;
    styleElement = document.createElement('style');
    styleElement.id = 'QYL-ListBulletOn';
    styleElement.textContent = `
        .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          content: '';
          display: block;
          box-sizing: border-box;
          border-left: 2px solid var(--b3-theme-primary);
          border-left: 2px solid oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main));
          border-bottom: 2px solid var(--b3-theme-primary);
          border-bottom: 2px solid oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main));
          border-bottom-left-radius: 8px;
          position: absolute;
          left: -18px;
        }
        :is([data-subtype="o"], [data-subtype="u"], [data-subtype="t"]) .en_item_bullet_actived > :is(.protyle-action, .protyle-action::before, .protyle-action::after) {
          color: var(--b3-theme-primary) !important;
          color: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main)) !important;
          --b3-theme-primary-fix: var(--b3-theme-primary) !important;
          --b3-theme-primary-fix-fix: oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.02) calc(0.25 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main)) !important;
        }
        [data-subtype="u"] [data-subtype="u"] .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 33px;
          height: calc(var(--en-bullet-line-height) - 1px);
          top: calc(var(--en-bullet-line-height) * -1 + 19px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="o"] [data-subtype="o"] .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 25px;
          height: calc(var(--en-bullet-line-height) - 9px);
          top: calc(var(--en-bullet-line-height) * -1 + 27px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="t"] [data-subtype="t"] .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 28px;
          height: calc(var(--en-bullet-line-height) - 6px);
          top: calc(var(--en-bullet-line-height) * -1 + 23px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="u"] [data-subtype="o"] .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 24px;
          height: calc(var(--en-bullet-line-height) - 1px);
          top: calc(var(--en-bullet-line-height) * -1 + 19px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="u"] [data-subtype="t"] .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 28px;
          height: calc(var(--en-bullet-line-height) - 1px);
          top: calc(var(--en-bullet-line-height) * -1 + 18px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="o"] [data-subtype="u"] .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 32px;
          height: calc(var(--en-bullet-line-height) - 9px);
          top: calc(var(--en-bullet-line-height) * -1 + 27px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="o"] [data-subtype="t"] .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 27px;
          height: calc(var(--en-bullet-line-height) - 9px);
          top: calc(var(--en-bullet-line-height) * -1 + 27px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="t"] [data-subtype="u"] .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 32px;
          height: calc(var(--en-bullet-line-height) - 6px);
          top: calc(var(--en-bullet-line-height) * -1 + 24px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="t"] [data-subtype="o"] .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 24px;
          height: calc(var(--en-bullet-line-height) - 7px);
          top: calc(var(--en-bullet-line-height) * -1 + 24px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="u"] > [data-subtype="u"] > .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 33px;
          height: calc(var(--en-bullet-line-height) - 1px);
          top: calc(var(--en-bullet-line-height) * -1 + 19px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="o"] > [data-subtype="o"] > .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 25px;
          height: calc(var(--en-bullet-line-height) - 9px);
          top: calc(var(--en-bullet-line-height) * -1 + 27px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="t"] > [data-subtype="t"] > .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 25px;
          height: calc(var(--en-bullet-line-height) - 7px);
          top: calc(var(--en-bullet-line-height) * -1 + 25px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="u"] > [data-subtype="o"] > .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 24px;
          height: calc(var(--en-bullet-line-height) - 1px);
          top: calc(var(--en-bullet-line-height) * -1 + 19px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="u"] > [data-subtype="t"] > .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 28px;
          height: calc(var(--en-bullet-line-height) - 1px);
          top: calc(var(--en-bullet-line-height) * -1 + 18px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="o"] > [data-subtype="u"] > .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 32px;
          height: calc(var(--en-bullet-line-height) - 9px);
          top: calc(var(--en-bullet-line-height) * -1 + 27px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="o"] > [data-subtype="t"] > .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 27px;
          height: calc(var(--en-bullet-line-height) - 9px);
          top: calc(var(--en-bullet-line-height) * -1 + 27px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="t"] > [data-subtype="u"] > .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 32px;
          height: calc(var(--en-bullet-line-height) - 7px);
          top: calc(var(--en-bullet-line-height) * -1 + 25px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="t"] > [data-subtype="o"] > .en_item_bullet_line:not(.protyle-wysiwyg--select)::after {
          width: 24px;
          height: calc(var(--en-bullet-line-height) - 7px);
          top: calc(var(--en-bullet-line-height) * -1 + 25px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="u"] > .protyle-action + :is([data-subtype="o"], [data-subtype="u"], [data-subtype="t"]) > .en_item_bullet_line:first-child:not(.protyle-wysiwyg--select)::after {
          top: calc(var(--en-bullet-line-height) * -1 + 16px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="o"] > .protyle-action + [data-subtype="o"] > .en_item_bullet_line:first-child:not(.protyle-wysiwyg--select)::after {
          left: -7px;
          width: 13px;
          top: calc(var(--en-bullet-line-height) * -1 + 16px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="o"] > .protyle-action + [data-subtype="u"] > .en_item_bullet_line:first-child:not(.protyle-wysiwyg--select)::after {
          left: -7px;
          width: 22px;
          top: calc(var(--en-bullet-line-height) * -1 + 16px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="o"] > .protyle-action + [data-subtype="t"] > .en_item_bullet_line:first-child:not(.protyle-wysiwyg--select)::after {
          left: -7px;
          width: 17px;
          top: calc(var(--en-bullet-line-height) * -1 + 16px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="t"] > .protyle-action + [data-subtype="t"] > .en_item_bullet_line:first-child:not(.protyle-wysiwyg--select)::after {
          left: -9px;
          width: 18px;
          top: calc(var(--en-bullet-line-height) * -1 + 16px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="t"] > .protyle-action + [data-subtype="o"] > .en_item_bullet_line:first-child:not(.protyle-wysiwyg--select)::after {
          left: -9px;
          width: 16px;
          top: calc(var(--en-bullet-line-height) * -1 + 16px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
        [data-subtype="t"] > .protyle-action + [data-subtype="u"] > .en_item_bullet_line:first-child:not(.protyle-wysiwyg--select)::after {
          left: -9px;
          width: 23px;
          top: calc(var(--en-bullet-line-height) * -1 + 16px + ((var(--b3-font-size-editor) - 16px) * 0.75));
        }
    `;
    document.head.appendChild(styleElement);
    listBulletInstance = new ListBullet();
    isEnabled = true;
}
export function removeListBulletOn() {
    if (!isEnabled) return;
    if (listBulletInstance) {
        listBulletInstance.destroy();
        listBulletInstance = null;
    }
    if (styleElement) {
        styleElement.remove();
        styleElement = null;
    }
    const activeElements = document.querySelectorAll('.en_item_bullet_actived');
    activeElements.forEach(element => {
        element.classList.remove('en_item_bullet_actived');
    });
    const lineElements = document.querySelectorAll('.en_item_bullet_line');
    lineElements.forEach(element => {
        element.classList.remove('en_item_bullet_line');
        element.style.removeProperty('--en-bullet-line-height');
    });
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        if (element.style.getPropertyValue('--en-bullet-line-height')) {
            element.style.removeProperty('--en-bullet-line-height');
        }
    });
    const QYLElements = document.querySelectorAll('[style*="--b3-theme-primary"]');
    QYLElements.forEach(element => {
        element.style.removeProperty('--b3-theme-primary');
        element.style.removeProperty('--b3-theme-primary-fix');
    });
    isEnabled = false;
    if (typeof window.gc === 'function') {
        try {
            window.gc();
        } catch (e) {
        }
    }
}
export function isListBulletOnEnabled() {
    return isEnabled;
}
