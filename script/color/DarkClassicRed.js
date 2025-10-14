export function initDarkClassicRed() {
    if (document.getElementById('QYL-DarkClassicRed')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-DarkClassicRed';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL-theme/style/Color/DarkClassicRed.css';
    document.head.appendChild(link);
}
export function removeDarkClassicRed() {
    const darkClassicRedLink = document.getElementById('QYL-DarkClassicRed');
    if (darkClassicRedLink) {
        darkClassicRedLink.remove();
    }
}
