export function initIvory() {
    if (document.getElementById('QYL-Ivory')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Ivory';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Ivory.css';
    document.head.appendChild(link);
}
export function removeIvory() {
    const ivoryLink = document.getElementById('QYL-Ivory');
    if (ivoryLink) {
        ivoryLink.remove();
    }
} 