export function initCoral() {
    if (document.getElementById('QYL-Coral')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Coral';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Coral.css';
    document.head.appendChild(link);
}
export function removeCoral() {
    const coralLink = document.getElementById('QYL-Coral');
    if (coralLink) {
        coralLink.remove();
    }
} 