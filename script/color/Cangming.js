export function initCangming() {
    if (document.getElementById('QYL-Cangming')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Cangming';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Cangming.css';
    document.head.appendChild(link);
}
export function removeCangming() {
    const cangmingLink = document.getElementById('QYL-Cangming');
    if (cangmingLink) {
        cangmingLink.remove();
    }
} 