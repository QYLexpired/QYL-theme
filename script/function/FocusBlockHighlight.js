import FocusBlock from '../basic/FocusBlock.js';
let isEnabled = false;
let styleElement = null;
let focusBlockInstance = null;
export function initFocusBlockHighlight() {
    if (isEnabled) return;
    styleElement = document.createElement('style');
    styleElement.id = 'QYL-FocusBlockHighlight';
    styleElement.textContent = `
        .protyle-wysiwyg [data-node-id].QYLFocusBlock {
            box-shadow: var(--b3-point-shadow);
            transition: 0.3s;
        }
    `;
    document.head.appendChild(styleElement);
    focusBlockInstance = new FocusBlock();
    isEnabled = true;
}
export function removeFocusBlockHighlight() {
    if (!isEnabled) return;
    if (focusBlockInstance) {
        focusBlockInstance.destroy();
        focusBlockInstance = null;
    }
    if (styleElement) {
        styleElement.remove();
        styleElement = null;
    }
    const elements = document.querySelectorAll('[data-node-id].QYLFocusBlock');
    elements.forEach(element => {
        element.classList.remove('QYLFocusBlock');
    });
    if (window.QYLFocusBlockTimer) {
        clearTimeout(window.QYLFocusBlockTimer);
        delete window.QYLFocusBlockTimer;
    }
    isEnabled = false;
    if (window.gc) {
        window.gc();
    }
}
export function isFocusBlockHighlightEnabled() {
    return isEnabled;
}
