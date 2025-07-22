export function initWarm() {
    if (document.getElementById('QYL-Warm')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Warm';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Warm.css';
    document.head.appendChild(link);
}
export function removeWarm() {
    const warmLink = document.getElementById('QYL-Warm');
    if (warmLink) {
        warmLink.remove();
    }
} 