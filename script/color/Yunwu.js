export function initYunwu() {
    if (document.getElementById('QYL-Yunwu')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Yunwu';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Yunwu.css';
    document.head.appendChild(link);
}
export function removeYunwu() {
    const yunwuLink = document.getElementById('QYL-Yunwu');
    if (yunwuLink) {
        yunwuLink.remove();
    }
} 