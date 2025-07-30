let cursorObserver = null;
let isEnabled = false;
let currentFocusBlock = null;
let isMousePressed = false;
let mousePressTimer = null;
let isLongPress = false; 
const LONG_PRESS_DURATION = 500; 
function getCursorElement() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    let element;
    if (container.nodeType === Node.TEXT_NODE) {
        element = container.parentElement;
    } else {
        element = container.nodeType === Node.ELEMENT_NODE ? container : null;
    }
    if (element) {
        let current = element;
        while (current && current !== document.body) {
            if (current.hasAttribute && current.hasAttribute('contenteditable')) {
                return element;
            }
            current = current.parentElement;
        }
    }
    return null;
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
function shouldScroll(element) {
    if (!element) return false;
    const elementRect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const elementCenterY = elementRect.top + elementRect.height / 2;
    const elementCenterX = elementRect.left + elementRect.width / 2;
    const windowCenterY = windowHeight / 2;
    const windowCenterX = windowWidth / 2;
    const scrollY = Math.abs(elementCenterY - windowCenterY);
    const scrollX = Math.abs(elementCenterX - windowCenterX);
    return scrollY > 5 || scrollX > 5;
}
function scrollToElementCenter(element) {
    if (!element) return;
    if (!shouldScroll(element)) {
        return;
    }
    element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
    });
}
function observeCursorPosition() {
    let lastCursorElement = null;
    const checkCursorPosition = () => {
        if (!isEnabled || isMousePressed || isLongPress) return; 
        const currentCursorElement = getCursorElement();
        if (currentCursorElement !== lastCursorElement) {
            lastCursorElement = currentCursorElement;
            if (currentCursorElement) {
                updateFocusBlockHighlight(currentCursorElement);
                setTimeout(() => {
                    scrollToElementCenter(currentCursorElement);
                }, 50);
            } else {
                updateFocusBlockHighlight(null);
            }
        }
    };
    const handleMouseDown = () => {
        isMousePressed = true;
        isLongPress = false; 
        if (currentFocusBlock) {
            currentFocusBlock.classList.remove('QYLFocusBlock');
            currentFocusBlock = null;
        }
        mousePressTimer = setTimeout(() => {
            isLongPress = true; 
        }, LONG_PRESS_DURATION);
    };
    const handleMouseUp = () => {
        isMousePressed = false;
        if (mousePressTimer) {
            clearTimeout(mousePressTimer);
            mousePressTimer = null;
        }
        if (isLongPress) {
            setTimeout(() => {
                isLongPress = false;
            }, 200); 
        } else {
            setTimeout(checkCursorPosition, 10);
        }
    };
    const handleMouseLeave = () => {
        isMousePressed = false;
        isLongPress = false; 
        if (mousePressTimer) {
            clearTimeout(mousePressTimer);
            mousePressTimer = null;
        }
    };
    document.addEventListener('selectionchange', checkCursorPosition);
    document.addEventListener('keydown', checkCursorPosition);
    document.addEventListener('keyup', checkCursorPosition);
    document.addEventListener('click', checkCursorPosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    return {
        destroy: () => {
            document.removeEventListener('selectionchange', checkCursorPosition);
            document.removeEventListener('keydown', checkCursorPosition);
            document.removeEventListener('keyup', checkCursorPosition);
            document.removeEventListener('click', checkCursorPosition);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (mousePressTimer) {
                clearTimeout(mousePressTimer);
                mousePressTimer = null;
            }
        }
    };
}
function initFocusEditing() {
    if (cursorObserver) {
        removeFocusEditing();
    }
    isEnabled = true;
    cursorObserver = observeCursorPosition();
}
function removeFocusEditing() {
    isEnabled = false;
    document.querySelectorAll('.QYLFocusBlock').forEach(element => {
        element.classList.remove('QYLFocusBlock');
    });
    currentFocusBlock = null;
    if (cursorObserver) {
        cursorObserver.destroy();
        cursorObserver = null;
    }
}
export { initFocusEditing, removeFocusEditing };
