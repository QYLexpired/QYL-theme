export function initWinter() {
    if (document.getElementById('QYL-Winter')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Winter';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Winter.css';
    document.head.appendChild(link);
}
export function removeWinter() {
    const winterLink = document.getElementById('QYL-Winter');
    if (winterLink) {
        winterLink.remove();
    }
} 