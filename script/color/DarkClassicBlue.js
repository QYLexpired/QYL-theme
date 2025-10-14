export function initDarkClassicBlue() {
    if (document.getElementById('QYL-DarkClassicBlue')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-DarkClassicBlue';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL-theme/style/Color/DarkClassicBlue.css';
    document.head.appendChild(link);
}
export function removeDarkClassicBlue() {
    const darkClassicLink = document.getElementById('QYL-DarkClassicBlue');
    if (darkClassicLink) {
        darkClassicLink.remove();
    }
} 