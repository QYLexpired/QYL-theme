export function initHuimu() {
    if (document.getElementById('QYL-Huimu')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Huimu';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Huimu.css';
    document.head.appendChild(link);
}
export function removeHuimu() {
    const huimuLink = document.getElementById('QYL-Huimu');
    if (huimuLink) {
        huimuLink.remove();
    }
} 