export function initYunjin() {
    if (document.getElementById('QYL-Yunjin')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Yunjin';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Yunjin.css';
    document.head.appendChild(link);
}
export function removeYunjin() {
    const yunjinLink = document.getElementById('QYL-Yunjin');
    if (yunjinLink) {
        yunjinLink.remove();
    }
} 