import FocusBlock from './FocusBlock.js';
let observerMap = new WeakMap();
let protyleContentObserver = null;
let focusBlockInstance = null;
function setupProtyleContent(container) {
    let currentFocusBlock = null;
    const innerObserver = new MutationObserver(mutations => {
        let focusChanged = false;
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const wasFocus = mutation.oldValue?.includes('QYLFocusBlock') || false;
                const isFocus = mutation.target.classList.contains('QYLFocusBlock');
                if (wasFocus !== isFocus) focusChanged = true;
            }
        });
        if (focusChanged) {
            const newFocus = focusBlockInstance?.currentFocusElement;
            if (newFocus && container.contains(newFocus)) {
                if (newFocus !== currentFocusBlock) {
                    currentFocusBlock = newFocus;
                    scrollFocusBlockToCenter(container, currentFocusBlock);
                }
            } else {
                currentFocusBlock = null;
            }
        }
    });
    observerMap.set(container, {
        innerObserver
    });
    innerObserver.observe(container, {
        attributes: true,
        attributeOldValue: true,
        subtree: true,
        attributeFilter: ['class']
    });
    const initialFocus = focusBlockInstance?.currentFocusElement;
    if (initialFocus && container.contains(initialFocus)) {
        currentFocusBlock = initialFocus;
        scrollFocusBlockToCenter(container, currentFocusBlock);
    }
}
function cleanupProtyleContent(container) {
    const data = observerMap.get(container);
    if (data) {
        data.innerObserver.disconnect();
        observerMap.delete(container);
    }
}
function scrollFocusBlockToCenter(container, element) {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const relativeTop = elementRect.top - containerRect.top;
    const visiblePosition = relativeTop + container.scrollTop;
    const targetScroll = visiblePosition - container.clientHeight / 2 + elementRect.height / 2;
    const startScroll = container.scrollTop;
    const distance = targetScroll - startScroll;
    if (Math.abs(distance) < 0.5) return; 
    const duration = 600; 
    const startTime = performance.now();
    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        container.scrollTop = startScroll + distance * eased;
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}
function initFocusEditing() {
    if (!focusBlockInstance) {
        focusBlockInstance = new FocusBlock();
    }
    if (!protyleContentObserver) {
        protyleContentObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.matches && node.matches('.protyle-content')) {
                            setupProtyleContent(node);
                        }
                        if (node.querySelectorAll) {
                            node.querySelectorAll('.protyle-content').forEach(setupProtyleContent);
                        }
                    }
                });
                mutation.removedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.matches && node.matches('.protyle-content')) {
                            cleanupProtyleContent(node);
                        }
                        if (node.querySelectorAll) {
                            node.querySelectorAll('.protyle-content').forEach(cleanupProtyleContent);
                        }
                    }
                });
            });
        });
        const targetNode = document.querySelector('.layout__center') || document.querySelector('#editor') || document.body;
        if (targetNode) {
            protyleContentObserver.observe(targetNode, {
                childList: true,
                subtree: true
            });
            targetNode.querySelectorAll('.protyle-content').forEach(setupProtyleContent);
        }
    }
}
function removeFocusEditing() {
    if (protyleContentObserver) {
        document.querySelectorAll('.protyle-content').forEach(cleanupProtyleContent);
        observerMap = new WeakMap();
        protyleContentObserver.disconnect();
        protyleContentObserver = null;
    }
    if (focusBlockInstance) {
        focusBlockInstance.destroy();
        focusBlockInstance = null;
    }
}
export { initFocusEditing, removeFocusEditing };
