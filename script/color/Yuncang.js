export function initYuncang() {
    if (document.getElementById('QYL-Yuncang')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Yuncang';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Yuncang.css';
    document.head.appendChild(link);
}
export function removeYuncang() {
    const yuncangLink = document.getElementById('QYL-Yuncang');
    if (yuncangLink) {
        yuncangLink.remove();
    }
} 