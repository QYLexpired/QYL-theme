let statusTransformXRetryCount = 0;
let statusTransformXRetryTimer = null;
let observerBound = false;
let dockLeftObserver = null;
let dockRightObserver = null;
function setStatusTransformX() {
    const center = document.querySelector('.layout__center');
    const status = document.getElementById('status');
    const dockLeft = document.getElementById('dockLeft');
    const dockRight = document.getElementById('dockRight');
    if (!center || !status || !dockLeft || !dockRight) {
        if (statusTransformXRetryCount < 15) {
            statusTransformXRetryCount++;
            if (statusTransformXRetryTimer) clearTimeout(statusTransformXRetryTimer);
            statusTransformXRetryTimer = setTimeout(setStatusTransformX, 100);
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
        observeDockLeftClass();
        observeDockRightClass();
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
function observeDockLeftClass() {
    const dockLeft = document.getElementById('dockLeft');
    if (!dockLeft) {
        setTimeout(observeDockLeftClass, 100);
        return;
    }
    dockLeftObserver = new MutationObserver(() => {
        setStatusTransformX();
    });
    dockLeftObserver.observe(dockLeft, { attributes: true, attributeFilter: ['class'] });
}
function observeDockRightClass() {
    const dockRight = document.getElementById('dockRight');
    if (!dockRight) {
        setTimeout(observeDockRightClass, 100);
        return;
    }
    dockRightObserver = new MutationObserver(() => {
        setStatusTransformX();
    });
    dockRightObserver.observe(dockRight, { attributes: true, attributeFilter: ['class'] });
}
export function initStatusPosition() {
    setStatusTransformX();
}
initStatusPosition();
