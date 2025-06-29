export function initStatusHidden() {
    const statusElement = document.getElementById('status');
    if (!statusElement) return;
    const container = document.querySelector('.layout__center');
    if (!container) return;
    const targetSelector = '.layout__wnd--active > .layout-tab-container > .fn__flex-1:not(.fn__none):not(.protyle)';
    function checkElement() {
        const targetExists = document.querySelector(targetSelector) !== null;
        statusElement.classList.toggle('QYLStatusHidden', targetExists);
    }
    function debounce(func, delay) {
        let timeoutId;
        return function() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(), delay);
        };
    }
    const debouncedCheck = debounce(checkElement, 500);
    const observer = new MutationObserver(debouncedCheck);
    observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });
}
initStatusHidden();
