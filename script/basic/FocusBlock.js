let cursorObserver = null;
let isEnabled = false;
let currentFocusBlock = null;
let lastCursorElement = null;
function getCursorElement() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    if (container.nodeType === Node.TEXT_NODE) {
        return container.parentElement;
    }
    return container.nodeType === Node.ELEMENT_NODE ? container : null;
}
function findNearestNodeIdElement(element) {
    if (!element) return null;
    let current = element;
    while (current && current !== document.body) {
        if (current.hasAttribute && current.hasAttribute('data-node-id')) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}
function updateFocusBlockHighlight(cursorElement) {
    if (currentFocusBlock) {
        currentFocusBlock.classList.remove('QYLFocusBlock');
        currentFocusBlock = null;
    }
    const nodeIdElement = findNearestNodeIdElement(cursorElement);
    if (nodeIdElement) {
        nodeIdElement.classList.add('QYLFocusBlock');
        currentFocusBlock = nodeIdElement;
    }
}
function observeCursorPosition() {
    const checkCursorPosition = () => {
        if (!isEnabled) return;
        const currentCursorElement = getCursorElement();
        if (currentCursorElement !== lastCursorElement) {
            lastCursorElement = currentCursorElement;
            if (currentCursorElement) {
                updateFocusBlockHighlight(currentCursorElement);
            } else {
                updateFocusBlockHighlight(null);
            }
        }
    };
    document.addEventListener('selectionchange', checkCursorPosition);
    document.addEventListener('keydown', checkCursorPosition);
    document.addEventListener('keyup', checkCursorPosition);
    document.addEventListener('click', checkCursorPosition);
    const intervalId = setInterval(checkCursorPosition, 100);
    return {
        destroy: () => {
            document.removeEventListener('selectionchange', checkCursorPosition);
            document.removeEventListener('keydown', checkCursorPosition);
            document.removeEventListener('keyup', checkCursorPosition);
            document.removeEventListener('click', checkCursorPosition);
            clearInterval(intervalId);
        }
    };
}
class FocusBlock {
    constructor() {
        this.init();
        this.boundBeforeUnload = this.destroy.bind(this);
        window.addEventListener('beforeunload', this.boundBeforeUnload);
    }
    init() {
        if (cursorObserver) {
            this.destroy();
        }
        isEnabled = true;
        cursorObserver = observeCursorPosition();
    }
    destroy() {
        isEnabled = false;
        document.querySelectorAll('.QYLFocusBlock').forEach(element => {
            element.classList.remove('QYLFocusBlock');
        });
        currentFocusBlock = null;
        lastCursorElement = null;
        if (cursorObserver) {
            cursorObserver.destroy();
            cursorObserver = null;
        }
        if (this.boundBeforeUnload) {
            window.removeEventListener('beforeunload', this.boundBeforeUnload);
            this.boundBeforeUnload = null;
        }
        if (window.gc) {
            window.gc();
        }
    }
}
FocusBlock.cleanup = function() {
    isEnabled = false;
    document.querySelectorAll('.QYLFocusBlock').forEach(element => {
        element.classList.remove('QYLFocusBlock');
    });
    currentFocusBlock = null;
    lastCursorElement = null;
    if (cursorObserver) {
        cursorObserver.destroy();
        cursorObserver = null;
    }
    if (window.gc) {
        window.gc();
    }
};
export default FocusBlock;