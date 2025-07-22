export function initXuanqing() {
    if (document.getElementById('QYL-Xuanqing')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Xuanqing';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Xuanqing.css';
    document.head.appendChild(link);
}
export function removeXuanqing() {
    const xuanqingLink = document.getElementById('QYL-Xuanqing');
    if (xuanqingLink) {
        xuanqingLink.remove();
    }
} 