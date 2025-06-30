import { initFocusEditing, removeFocusEditing } from '../basic/FocusEditing.js';
let isEnabled = false;
let styleElement = null;
export function initFocusEditingOn() {
    if (isEnabled) return;
    styleElement = document.createElement('style');
    styleElement.id = 'QYL-FocusEditingOn';
    styleElement.textContent = `
        :is(.layout__center, .QYLmobile #editor) .protyle-wysiwyg > [data-node-id]:not(:has(.QYLFocusBlock)):not(.av) {
            opacity: 0.3;
            filter: blur(0.5px);
            transition: 0.3s;
        }
        :is(.layout__center, .QYLmobile #editor) .protyle-wysiwyg [data-node-id].QYLFocusBlock {
            opacity: 1 !important;
            filter: blur(0px) !important;
            transition: 0.3s;
            & [data-node-id] {
                opacity: 1 !important;
                filter: blur(0px) !important;
            }
        }
        .card__main .protyle-wysiwyg > [data-node-id]:not(:has(.QYLFocusBlock)):not(.av) {
            opacity: 1 !important;
            filter: blur(0px) !important;
            transition: 0.3s;
        }
        [data-node-id].QYLFocusBlock {
            box-shadow: none !important;
            transition: 0.3s;
        }
        [data-node-id].QYLFocusBlock:hover {
            box-shadow: none !important;
            transition: 0.3s;
        }
        [data-node-id].QYLFocusBlock::before {
            content: "";
            position: absolute;
            border-radius: 99px;
            top: 9px;
            height: calc(100% - 18px);
            width: 3px;
            left: -7px;
            background-color: var(--b3-theme-primary);
            animation: QYLFocusEditing 0.5s cubic-bezier(0.8, 0, 0.9, 1);
            transition: 0.3s;
        }
        @keyframes QYLFocusEditing {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(styleElement);
    initFocusEditing();
    isEnabled = true;
}
export function removeFocusEditingOn() {
    if (!isEnabled) return;
    removeFocusEditing();
    if (styleElement) {
        styleElement.remove();
        styleElement = null;
    }
    const elements = document.querySelectorAll('[data-node-id].QYLFocusBlock');
    elements.forEach(element => {
        element.classList.remove('QYLFocusBlock');
    });
    if (window.QYLFocusEditingTimer) {
        clearTimeout(window.QYLFocusEditingTimer);
        delete window.QYLFocusEditingTimer;
    }
    isEnabled = false;
    if (window.gc) {
        window.gc();
    }
}
export function isFocusEditingOnEnabled() {
    return isEnabled;
}
