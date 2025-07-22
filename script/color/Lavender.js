export function initLavender() {
    if (document.getElementById('QYL-Lavender')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Lavender';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Lavender.css';
    document.head.appendChild(link);
}
export function removeLavender() {
    const lavenderLink = document.getElementById('QYL-Lavender');
    if (lavenderLink) {
        lavenderLink.remove();
    }
} 