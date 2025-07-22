export function initLatte() {
    if (document.getElementById('QYL-Latte')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Latte';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Latte.css';
    document.head.appendChild(link);
}
export function removeLatte() {
    const latteLink = document.getElementById('QYL-Latte');
    if (latteLink) {
        latteLink.remove();
    }
} 