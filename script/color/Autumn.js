export function initAutumn() {
    if (document.getElementById('QYL-Autumn')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Autumn';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Autumn.css';
    document.head.appendChild(link);
}
export function removeAutumn() {
    const autumnLink = document.getElementById('QYL-Autumn');
    if (autumnLink) {
        autumnLink.remove();
    }
} 