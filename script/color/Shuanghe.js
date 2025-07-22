export function initShuanghe() {
    if (document.getElementById('QYL-Shuanghe')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Shuanghe';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Shuanghe.css';
    document.head.appendChild(link);
}
export function removeShuanghe() {
    const shuangheLink = document.getElementById('QYL-Shuanghe');
    if (shuangheLink) {
        shuangheLink.remove();
    }
} 