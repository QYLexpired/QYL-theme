export function initDarkClassic() {
    if (document.getElementById('QYL-DarkClassic')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-DarkClassic';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/DarkClassic.css';
    document.head.appendChild(link);
}
export function removeDarkClassic() {
    const darkClassicLink = document.getElementById('QYL-DarkClassic');
    if (darkClassicLink) {
        darkClassicLink.remove();
    }
} 