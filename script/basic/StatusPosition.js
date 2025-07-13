let statusTransformXRetryCount = 0;
let statusTransformXRetryTimer = null;
let observerBound = false;
function setStatusTransformX() {
    const center = document.querySelector('.layout__center');
    const status = document.getElementById('status');
    if (!center || !status) {
        if (statusTransformXRetryCount < 10) {
            statusTransformXRetryCount++;
            if (statusTransformXRetryTimer) clearTimeout(statusTransformXRetryTimer);
            statusTransformXRetryTimer = setTimeout(setStatusTransformX, 200);
        }
        return;
    }
    statusTransformXRetryCount = 0;
    if (statusTransformXRetryTimer) {
        clearTimeout(statusTransformXRetryTimer);
        statusTransformXRetryTimer = null;
    }
    if (!observerBound) {
        observeDockrWidth();
        window.addEventListener('resize', setStatusTransformX);
        observerBound = true;
    }
    setTimeout(() => {
        const rect = center.getBoundingClientRect();
        const distance = window.innerWidth - rect.right;
        status.style.setProperty('--QYL-status-transformX', `${distance}px`);
    }, 200);
}
function observeDockrWidth() {
    const dockr = document.querySelector('.layout__dockr');
    if (!dockr) return;
    let timeout = null;
    const observer = new MutationObserver(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            setStatusTransformX();
        }, 500);
    });
    observer.observe(dockr, { attributes: true, attributeFilter: ['style'] });
}
export function initStatusPosition() {
    setStatusTransformX();
}
initStatusPosition();
