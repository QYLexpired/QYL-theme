import FocusBlock from '../basic/FocusBlock.js';
import { getStorageConfig } from '../basic/GetStorage.js';
let isEnabled = false;
let styleElement = null;
let focusBlockInstance = null;
const style1CSS = `
    .protyle-wysiwyg [data-node-id].QYLFocusBlock {
        box-shadow: var(--b3-point-shadow);
        transition: 0.3s;
    }
`;
const style2CSS = `
    .protyle-wysiwyg [data-node-id].QYLFocusBlock::before {
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
const style3CSS = `
    .protyle-wysiwyg [data-node-id].QYLFocusBlock {
        box-shadow: 0 0 0 1px var(--b3-theme-surface-lighter);
        transition: 0.3s;
    }
`;
export async function initFocusBlockHighlight() {
    if (isEnabled) return;
    try {
        const config = await getStorageConfig();
        const styleType = config.FocusBlockHighlightStyle || 1;
        let selectedStyle;
        switch (styleType) {
            case 2:
                selectedStyle = style2CSS;
                break;
            case 3:
                selectedStyle = style3CSS;
                break;
            default:
                selectedStyle = style1CSS;
                break;
        }
        styleElement = document.createElement('style');
        styleElement.id = 'QYL-FocusBlockHighlight';
        styleElement.textContent = selectedStyle;
        document.head.appendChild(styleElement);
        focusBlockInstance = new FocusBlock();
        isEnabled = true;
    } catch (error) {
        styleElement = document.createElement('style');
        styleElement.id = 'QYL-FocusBlockHighlight';
        styleElement.textContent = style1CSS;
        document.head.appendChild(styleElement);
        focusBlockInstance = new FocusBlock();
        isEnabled = true;
    }
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
export async function toggleFocusBlockHighlightMode() {
    if (!isEnabled) return false;
    try {
        const config = await getStorageConfig();
        const currentStyleType = config.FocusBlockHighlightStyle || 1;
        const nextStyleType = currentStyleType >= 3 ? 1 : currentStyleType + 1;
        let selectedStyle;
        switch (nextStyleType) {
            case 2:
                selectedStyle = style2CSS;
                break;
            case 3:
                selectedStyle = style3CSS;
                break;
            default:
                selectedStyle = style1CSS;
                break;
        }
        if (styleElement) {
            styleElement.textContent = selectedStyle;
            return nextStyleType;
        }
        return currentStyleType;
    } catch (error) {
        return false;
    }
}
export function isFocusBlockHighlightEnabled() {
    return isEnabled;
}
