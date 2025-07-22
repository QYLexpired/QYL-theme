export function initYunyan() {
    if (document.getElementById('QYL-Yunyan')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Yunyan';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Yunyan.css';
    document.head.appendChild(link);
}
export function removeYunyan() {
    const yunyanLink = document.getElementById('QYL-Yunyan');
    if (yunyanLink) {
        yunyanLink.remove();
    }
} 