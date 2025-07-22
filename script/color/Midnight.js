export function initMidnight() {
    if (document.getElementById('QYL-Midnight')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Midnight';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Midnight.css';
    document.head.appendChild(link);
}
export function removeMidnight() {
    const midnightLink = document.getElementById('QYL-Midnight');
    if (midnightLink) {
        midnightLink.remove();
    }
} 