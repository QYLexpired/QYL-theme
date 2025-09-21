export function initAfterglow() {
    if (document.getElementById('QYL-Afterglow')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Afterglow';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL-theme/style/Color/Afterglow.css';
    document.head.appendChild(link);
}
export function removeAfterglow() {
    const afterglowLink = document.getElementById('QYL-Afterglow');
    if (afterglowLink) {
        afterglowLink.remove();
    }
}
