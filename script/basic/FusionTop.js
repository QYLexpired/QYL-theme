let isEnabled = false;
let layoutObserver = null;
let debounceTimer = null;
let initCheckTimer = null;
const debounceDelay = 1000;
let cachedLayoutCenter = null;
let cachedToolbar = null;
let cachedWindows = null;
let isInitializing = false;
function getLayoutCenter() {
    if (!cachedLayoutCenter) {
        cachedLayoutCenter = document.querySelector('.layout__center');
    }
    return cachedLayoutCenter;
}
function getToolbar() {
    if (!cachedToolbar) {
        cachedToolbar = document.querySelector('.toolbar');
    }
    return cachedToolbar;
}
function getWindows() {
    const layoutCenter = getLayoutCenter();
    if (!layoutCenter) {
        return [];
    }
    if (!cachedWindows) {
        cachedWindows = layoutCenter.querySelectorAll('[data-type="wnd"]');
    }
    return cachedWindows;
}
function clearCache() {
    cachedLayoutCenter = null;
    cachedToolbar = null;
    cachedWindows = null;
}
export function initFusionTop() {
    if (isEnabled || isInitializing) return;
    isInitializing = true;
    if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
    }
    if (initCheckTimer) {
        clearTimeout(initCheckTimer);
        initCheckTimer = null;
    }
    if (layoutObserver) {
        layoutObserver.disconnect();
        layoutObserver = null;
    }
    clearCache();
    const overlapThreshold = 15;
    function checkOverlap() {
        const layoutCenter = getLayoutCenter();
        const toolbar = getToolbar();
        if (!layoutCenter || !toolbar) {
            return;
        }
        const windows = getWindows();
        if (windows.length === 0) {
            return;
        }
        const toolbarRect = toolbar.getBoundingClientRect();
        let fusionTopCount = 0;
        windows.forEach((window, index) => {
            const windowRect = window.getBoundingClientRect();
            const isOverlapping = calculateOverlap(windowRect, toolbarRect);
            if (isOverlapping) {
                window.classList.add('QYLFusionTop');
                fusionTopCount++;
            } else {
                window.classList.remove('QYLFusionTop');
            }
        });
    }
    function calculateOverlap(rect1, rect2) {
        const overlapTop = Math.max(rect1.top, rect2.top);
        const overlapBottom = Math.min(rect1.bottom, rect2.bottom);
        if (overlapTop >= overlapBottom) {
            return false;
        }
        const overlapHeight = overlapBottom - overlapTop;
        return overlapHeight > overlapThreshold;
    }
    function debouncedCheck() {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            checkOverlap();
        }, debounceDelay);
    }
    function observeLayoutCenter() {
        const layoutCenter = getLayoutCenter();
        if (!layoutCenter) {
            return;
        }
        layoutObserver = new MutationObserver((mutations) => {
            let shouldCheck = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
                        shouldCheck = true;
                    }
                }
            });
            if (shouldCheck) {
                clearCache();
                debouncedCheck();
            }
        });
        layoutObserver.observe(layoutCenter, {
            childList: true,
            subtree: true,
            attributes: false
        });
    }
    function checkDOMReady() {
        const layoutCenter = getLayoutCenter();
        const toolbar = getToolbar();
        const windows = getWindows();
        if (!layoutCenter || !toolbar) {
            initCheckTimer = setTimeout(checkDOMReady, 100);
            return;
        }
        if (windows.length === 0) {
            initCheckTimer = setTimeout(checkDOMReady, 100);
            return;
        }
        checkOverlap();
        observeLayoutCenter();
        isEnabled = true;
        isInitializing = false;
    }
    setTimeout(checkDOMReady, 500);
}
export function removeFusionTop() {
    if (!isEnabled && !isInitializing) return;
    isEnabled = false;
    isInitializing = false;
    if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
    }
    if (initCheckTimer) {
        clearTimeout(initCheckTimer);
        initCheckTimer = null;
    }
    if (layoutObserver) {
        layoutObserver.disconnect();
        layoutObserver = null;
    }
    clearCache();
    const fusionTopElements = document.querySelectorAll('.QYLFusionTop');
    fusionTopElements.forEach((element) => {
        element.classList.remove('QYLFusionTop');
    });
}
export function isFusionTopEnabled() {
    return isEnabled;
}
