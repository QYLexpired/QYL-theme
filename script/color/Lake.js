export function initLake() {
    if (document.getElementById('QYL-Lake')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Lake';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Lake.css';
    document.head.appendChild(link);
}
export function removeLake() {
    const lakeLink = document.getElementById('QYL-Lake');
    if (lakeLink) {
        lakeLink.remove();
    }
} 