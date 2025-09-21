export function initGleam() {
    if (document.getElementById('QYL-Gleam')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Gleam';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL-theme/style/Color/Gleam.css';
    document.head.appendChild(link);
}
export function removeGleam() {
    const gleamLink = document.getElementById('QYL-Gleam');
    if (gleamLink) {
        gleamLink.remove();
    }
}
