let statusHiddenRetryCount = 0;
let statusHiddenRetryTimer = null;
let observerBound = false;
export function initStatusHidden() {
    function setStatusHidden() {
        const statusElement = document.getElementById('status');
        const container = document.querySelector('.layout__center');
        if (!statusElement || !container) {
            if (statusHiddenRetryCount < 10) {
                statusHiddenRetryCount++;
                if (statusHiddenRetryTimer) clearTimeout(statusHiddenRetryTimer);
                statusHiddenRetryTimer = setTimeout(setStatusHidden, 200);
            }
            return;
        }
        statusHiddenRetryCount = 0;
        if (statusHiddenRetryTimer) {
            clearTimeout(statusHiddenRetryTimer);
            statusHiddenRetryTimer = null;
        }
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
        const debouncedCheck = debounce(checkElement, 100);
        if (!observerBound) {
            const observer = new MutationObserver(debouncedCheck);
            observer.observe(container, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });
            observerBound = true;
        }
        checkElement();
    }
    setStatusHidden();
}
initStatusHidden();
