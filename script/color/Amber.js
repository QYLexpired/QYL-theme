export function initAmber() {
    if (document.getElementById('QYL-Amber')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Amber';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Amber.css';
    document.head.appendChild(link);
}
export function removeAmber() {
    const amberLink = document.getElementById('QYL-Amber');
    if (amberLink) {
        amberLink.remove();
    }
} 