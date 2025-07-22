export function initSugar() {
    if (document.getElementById('QYL-Sugar')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Sugar';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Sugar.css';
    document.head.appendChild(link);
}
export function removeSugar() {
    const sugarLink = document.getElementById('QYL-Sugar');
    if (sugarLink) {
        sugarLink.remove();
    }
} 