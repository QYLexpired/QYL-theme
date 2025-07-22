export function initLime() {
    if (document.getElementById('QYL-Lime')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Lime';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Lime.css';
    document.head.appendChild(link);
}
export function removeLime() {
    const limeLink = document.getElementById('QYL-Lime');
    if (limeLink) {
        limeLink.remove();
    }
} 