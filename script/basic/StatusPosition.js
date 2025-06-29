function setStatusTransformX() {
    const center = document.querySelector('.layout__center');
    const status = document.getElementById('status');
    if (!center || !status) return;
    const rect = center.getBoundingClientRect();
    const distance = window.innerWidth - rect.right;
    status.style.setProperty('--QYL-status-transformX', `${distance}px`);
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
    observeDockrWidth();
    window.addEventListener('resize', setStatusTransformX);
}
initStatusPosition();
