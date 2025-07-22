export function initXingqiong() {
    if (document.getElementById('QYL-Xingqiong')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Xingqiong';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Xingqiong.css';
    document.head.appendChild(link);
}
export function removeXingqiong() {
    const xingqiongLink = document.getElementById('QYL-Xingqiong');
    if (xingqiongLink) {
        xingqiongLink.remove();
    }
} 