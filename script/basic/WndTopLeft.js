let debounceTimer = null;
const debounceDelay = 500;
let cachedLayoutCenter = null;
let cachedWindows = null;
let observer = null;
let isInitialized = false;
let addResizeToWndTopLeft = null;
let observerBound = false;
function getLayoutCenter() {
    if (!cachedLayoutCenter) {
        cachedLayoutCenter = document.querySelector('.layout__center');
    }
    return cachedLayoutCenter;
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
    cachedWindows = null;
}
function updateTopLeftWindow() {
    const layoutCenter = getLayoutCenter();
    if (!layoutCenter) {
        return;
    }
    const windows = getWindows();
    if (windows.length === 0) {
        return;
    }
    const currentTopLeft = layoutCenter.querySelector('.QYLWndTopLeft');
    if (currentTopLeft) {
        currentTopLeft.classList.remove('QYLWndTopLeft');
    }
    let topLeftWindow = null;
    let minTop = Infinity;
    let minLeft = Infinity;
    const layoutRect = layoutCenter.getBoundingClientRect();
    for (let i = 0; i < windows.length; i++) {
        const window = windows[i];
        const rect = window.getBoundingClientRect();
        const relativeTop = rect.top - layoutRect.top;
        const relativeLeft = rect.left - layoutRect.left;
        if (relativeTop < minTop || (relativeTop === minTop && relativeLeft < minLeft)) {
            minTop = relativeTop;
            minLeft = relativeLeft;
            topLeftWindow = window;
        }
    }
    if (topLeftWindow) {
        topLeftWindow.classList.add('QYLWndTopLeft');
        if (addResizeToWndTopLeft) {
            addResizeToWndTopLeft(topLeftWindow);
        }
    }
}
function debounceUpdate() {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
        updateTopLeftWindow();
    }, debounceDelay);
}
function observeLayoutCenter() {
    const layoutCenter = getLayoutCenter();
    if (!layoutCenter) {
        setTimeout(observeLayoutCenter, 200);
        return;
    }
    if (observerBound) return;
    observer = new MutationObserver((mutations) => {
        clearCache();
        debounceUpdate();
    });
    observer.observe(layoutCenter, {
        childList: true, 
        subtree: true,   
        attributes: false 
    });
    observerBound = true;
}
export function initWndTopLeft() {
    if (isInitialized) return;
    updateTopLeftWindow();
    observeLayoutCenter();
    isInitialized = true;
}
export function cleanupWndTopLeft() {
    if (!isInitialized) return;
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
    }
    clearCache();
    const elements = document.querySelectorAll('.QYLWndTopLeft');
    elements.forEach(element => {
        element.classList.remove('QYLWndTopLeft');
    });
    isInitialized = false;
}
export function setVerticalTabResizeCallback(callback) {
    addResizeToWndTopLeft = callback;
}
