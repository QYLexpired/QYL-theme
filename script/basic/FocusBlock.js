class FocusBlock {
    constructor() {
        this.currentFocusElement = null;
        this.debounceTimer = null;
        this.eventHandlers = {};
        this.init();
    }
    init() {
        this.eventHandlers.selectionChange = () => {
            this.debounceUpdateFocusBlock();
        };
        this.eventHandlers.keyup = () => {
            this.debounceUpdateFocusBlock();
        };
        this.eventHandlers.click = () => {
            this.debounceUpdateFocusBlock();
        };
        document.addEventListener('selectionchange', this.eventHandlers.selectionChange);
        document.addEventListener('keyup', this.eventHandlers.keyup);
        document.addEventListener('click', this.eventHandlers.click);
    }
    debounceUpdateFocusBlock() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => {
            this.updateFocusBlock();
        }, 300);
    }
    updateFocusBlock() {
        this.clearPreviousFocus();
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return;
        }
        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        if (!this.isInProtyleWysiwyg(container)) {
            return;
        }
        const focusElement = this.findNodeIdParent(container);
        if (focusElement) {
            this.currentFocusElement = focusElement;
            focusElement.classList.add('QYLFocusBlock');
        }
    }
    isInProtyleWysiwyg(element) {
        let current = element.nodeType === Node.ELEMENT_NODE ? element : element.parentElement;
        while (current) {
            if (current.classList && current.classList.contains('protyle-wysiwyg')) {
                return true;
            }
            current = current.parentElement;
        }
        return false;
    }
    findNodeIdParent(element) {
        let current = element.nodeType === Node.ELEMENT_NODE ? element : element.parentElement;
        while (current) {
            if (current.hasAttribute && current.hasAttribute('data-node-id')) {
                return current;
            }
            current = current.parentElement;
        }
        return null;
    }
    clearPreviousFocus() {
        if (this.currentFocusElement) {
            this.currentFocusElement.classList.remove('QYLFocusBlock');
            this.currentFocusElement = null;
        }
    }
    destroy() {
        if (this.eventHandlers.selectionChange) {
            document.removeEventListener('selectionchange', this.eventHandlers.selectionChange);
        }
        if (this.eventHandlers.keyup) {
            document.removeEventListener('keyup', this.eventHandlers.keyup);
        }
        if (this.eventHandlers.click) {
            document.removeEventListener('click', this.eventHandlers.click);
        }
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = null;
        }
        this.clearPreviousFocus();
        const elements = document.querySelectorAll('[data-node-id].QYLFocusBlock');
        elements.forEach(element => {
            element.classList.remove('QYLFocusBlock');
        });
        this.eventHandlers = {};
        this.currentFocusElement = null;
    }
}
export default FocusBlock; 