class ToolDirection {
    constructor() {
        this.directionClasses = ['toolbarl', 'toolbarb', 'toolbarr', 'toolbart'];
        this.eventHandlers = {};
        this.init();
    }
    init() {
        this.eventHandlers.contextMenu = (event) => {
            this.handleContextMenu(event);
        };
        document.addEventListener('contextmenu', this.eventHandlers.contextMenu);
    }
    handleContextMenu(event) {
        const target = event.target;
        if (target.classList && target.classList.contains('protyle-toolbar')) {
            event.preventDefault();
            this.cycleDirectionClass(target);
            return;
        }
        const parent = target.parentElement;
        if (parent && parent.classList && parent.classList.contains('protyle-toolbar')) {
            event.preventDefault();
            this.cycleDirectionClass(parent);
            return;
        }
        const grandParent = parent && parent.parentElement;
        if (grandParent && grandParent.classList && grandParent.classList.contains('protyle-toolbar')) {
            event.preventDefault();
            this.cycleDirectionClass(grandParent);
            return;
        }
        const toolbarElement = this.findToolbarElement(target);
        if (!toolbarElement) {
            return; 
        }
        event.preventDefault();
        this.cycleDirectionClass(toolbarElement);
    }
    findToolbarElement(element) {
        let current = element;
        while (current) {
            if (current.classList && current.classList.contains('protyle-toolbar')) {
                return current;
            }
            current = current.parentElement;
        }
        return null;
    }
    cycleDirectionClass(toolbarElement) {
        let currentDirectionIndex = -1;
        for (let i = 0; i < this.directionClasses.length; i++) {
            if (toolbarElement.classList.contains(this.directionClasses[i])) {
                currentDirectionIndex = i;
                break;
            }
        }
        this.directionClasses.forEach(className => {
            toolbarElement.classList.remove(className);
        });
        if (currentDirectionIndex === -1) {
            toolbarElement.classList.add(this.directionClasses[0]);
        } else {
            const nextIndex = (currentDirectionIndex + 1) % this.directionClasses.length;
            toolbarElement.classList.add(this.directionClasses[nextIndex]);
        }
    }
    destroy() {
        if (this.eventHandlers.contextMenu) {
            document.removeEventListener('contextmenu', this.eventHandlers.contextMenu);
        }
        const toolbarElements = document.querySelectorAll('.protyle-toolbar');
        toolbarElements.forEach(element => {
            this.directionClasses.forEach(className => {
                element.classList.remove(className);
            });
        });
        this.eventHandlers = {};
    }
}
export default ToolDirection;
