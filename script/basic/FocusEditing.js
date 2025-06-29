import FocusBlock from './FocusBlock.js';
let focusBlockInstance = null;
let cachedProtyleContent = null;
let scrollDebounceTimer = null;
function initFocusEditing() {
    if (!focusBlockInstance) {
        focusBlockInstance = new FocusBlock();
    }
    cachedProtyleContent = findProtyleContent(document.body);
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('QYLFocusBlock')) {
                    debounceScrollToCenter(target);
                }
            }
        });
    });
    const wysiwygContainer = document.querySelector('.protyle-wysiwyg');
    if (wysiwygContainer) {
        observer.observe(wysiwygContainer, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    } else {
        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }
    window.focusEditingObserver = observer;
    const removeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.removedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const focusBlocks = node.querySelectorAll('.QYLFocusBlock');
                    focusBlocks.forEach(block => {
                        handleFocusBlockRemoved(block);
                    });
                }
            });
        });
    });
    if (wysiwygContainer) {
        removeObserver.observe(wysiwygContainer, {
            childList: true,
            subtree: true
        });
    } else {
        removeObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    window.focusEditingRemoveObserver = removeObserver;
}
function debounceScrollToCenter(focusBlock) {
    if (scrollDebounceTimer) {
        clearTimeout(scrollDebounceTimer);
    }
    scrollDebounceTimer = setTimeout(() => {
        adjustScrollToCenter(focusBlock);
    }, 50);
}
function adjustScrollToCenter(focusBlock) {
    let protyleContent = cachedProtyleContent;
    if (!protyleContent || !document.contains(protyleContent)) {
        protyleContent = findProtyleContent(focusBlock);
        cachedProtyleContent = protyleContent;
    }
    if (!protyleContent) {
        return;
    }
    const focusBlockRect = focusBlock.getBoundingClientRect();
    const containerRect = protyleContent.getBoundingClientRect();
    const focusBlockTop = focusBlockRect.top - containerRect.top;
    const focusBlockHeight = focusBlockRect.height;
    const containerHeight = containerRect.height;
    const idealScrollTop = protyleContent.scrollTop + focusBlockTop - (containerHeight / 2) + (focusBlockHeight / 2);
    smoothScrollTo(protyleContent, idealScrollTop);
}
function findProtyleContent(element) {
    let current = element;
    while (current && current !== document.body) {
        if (current.classList.contains('protyle-content')) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}
function smoothScrollTo(element, targetScrollTop) {
    const startScrollTop = element.scrollTop;
    const distance = targetScrollTop - startScrollTop;
    if (Math.abs(distance) < 10) {
        element.scrollTop = targetScrollTop;
        return;
    }
    const duration = 300;
    const startTime = performance.now();
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentScrollTop = startScrollTop + (distance * easeOutCubic);
        element.scrollTop = currentScrollTop;
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}
function handleFocusBlockRemoved(focusBlock) {
}
function removeFocusEditing() {
    if (window.focusEditingObserver) {
        window.focusEditingObserver.disconnect();
        delete window.focusEditingObserver;
    }
    if (window.focusEditingRemoveObserver) {
        window.focusEditingRemoveObserver.disconnect();
        delete window.focusEditingRemoveObserver;
    }
    if (scrollDebounceTimer) {
        clearTimeout(scrollDebounceTimer);
        scrollDebounceTimer = null;
    }
    cachedProtyleContent = null;
    if (focusBlockInstance) {
        focusBlockInstance.destroy();
        focusBlockInstance = null;
    }
}
export { initFocusEditing, removeFocusEditing }; 