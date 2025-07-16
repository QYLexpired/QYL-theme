class ListBullet {
    constructor() {
        this.allListItemNode = [];
        this.prevListItemNode = [];
        this.eventHandlers = {};
        this.init();
    }
    init() {
        this.eventHandlers.selectionChange = () => {
            this.updateListBullet();
        };
        document.addEventListener('selectionchange', this.eventHandlers.selectionChange);
    }
    updateListBullet() {
        const selection = window.getSelection();
        if (!selection.rangeCount) {
            return;
        }
        const range = selection?.getRangeAt(0);
        const startNode = range?.startContainer;
        let currentNode = startNode;
        let foundCustomListView = false;
        this.allListItemNode.forEach((node) => {
        });
        this.allListItemNode = [];
        while (currentNode) {
            if (currentNode.nodeType === 1) {
                if (currentNode.hasAttribute && currentNode.hasAttribute('custom-list-view')) {
                    foundCustomListView = true;
                    break;
                }
                if (currentNode.dataset && currentNode.dataset.type === 'NodeListItem') {
                    this.allListItemNode.push(currentNode);
                }
                if (currentNode.classList && currentNode.classList.contains('protyle-wysiwyg')) {
                    break;
                }
            }
            currentNode = currentNode.parentElement;
        }
        if (foundCustomListView) {
            this.allListItemNode = [];
        }
        const prevSet = new Set(this.prevListItemNode);
        const currSet = new Set(this.allListItemNode);
        this.prevListItemNode.forEach(node => {
            if (!currSet.has(node)) {
                node.classList.remove('en_item_bullet_actived');
                node.classList.remove('en_item_bullet_line');
                node.style.removeProperty('--en-bullet-line-height');
            }
        });
        for (let i = 0; i < this.allListItemNode.length - 1; i++) {
            const currentNode = this.allListItemNode[i];
            const currentRect = currentNode.getBoundingClientRect();
            const nextNode = this.allListItemNode[i + 1];
            const nextRect = nextNode.getBoundingClientRect();
            const height = currentRect.top - nextRect.top;
            currentNode.style.setProperty('--en-bullet-line-height', `${height}px`);
            currentNode.classList.add('en_item_bullet_line');
        }
        this.allListItemNode.forEach((node) => {
            node.classList.add('en_item_bullet_actived');
        });
        this.prevListItemNode = [...this.allListItemNode];
    }
    destroy() {
        if (this.eventHandlers.selectionChange) {
            document.removeEventListener('selectionchange', this.eventHandlers.selectionChange);
        }
        this.allListItemNode.forEach((node) => {
            if (node && node.classList) {
                node.classList.remove('en_item_bullet_actived');
                node.classList.remove('en_item_bullet_line');
                node.style.removeProperty('--en-bullet-line-height');
            }
        });
        this.prevListItemNode = [];
        const activeElements = document.querySelectorAll('.en_item_bullet_actived');
        activeElements.forEach(element => {
            element.classList.remove('en_item_bullet_actived');
        });
        const lineElements = document.querySelectorAll('.en_item_bullet_line');
        lineElements.forEach(element => {
            element.classList.remove('en_item_bullet_line');
            element.style.removeProperty('--en-bullet-line-height');
        });
        this.allListItemNode = [];
        this.eventHandlers = {};
    }
}
export default ListBullet;
