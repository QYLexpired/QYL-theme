export function initOcean() {
    if (document.getElementById('QYL-Ocean')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Ocean';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Ocean.css';
    document.head.appendChild(link);
}
export function removeOcean() {
    const oceanLink = document.getElementById('QYL-Ocean');
    if (oceanLink) {
        oceanLink.remove();
    }
} 