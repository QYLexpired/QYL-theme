export function initWumu() {
    if (document.getElementById('QYL-Wumu')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Wumu';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Wumu.css';
    document.head.appendChild(link);
}
export function removeWumu() {
    const wumuLink = document.getElementById('QYL-Wumu');
    if (wumuLink) {
        wumuLink.remove();
    }
} 