export function initMarsh() {
    if (document.getElementById('QYL-Marsh')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Marsh';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Marsh.css';
    document.head.appendChild(link);
}
export function removeMarsh() {
    const marshLink = document.getElementById('QYL-Marsh');
    if (marshLink) {
        marshLink.remove();
    }
} 