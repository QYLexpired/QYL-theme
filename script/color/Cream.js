export function initCream() {
    if (document.getElementById('QYL-Cream')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Cream';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL-theme/style/Color/Cream.css';
    document.head.appendChild(link);
}
export function removeCream() {
    const creamLink = document.getElementById('QYL-Cream');
    if (creamLink) {
        creamLink.remove();
    }
}
