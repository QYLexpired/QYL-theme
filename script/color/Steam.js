export function initSteam() {
    if (document.getElementById('QYL-Steam')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Steam';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Steam.css';
    document.head.appendChild(link);
}
export function removeSteam() {
    const steamLink = document.getElementById('QYL-Steam');
    if (steamLink) {
        steamLink.remove();
    }
} 