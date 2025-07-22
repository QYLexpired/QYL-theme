export function initBurgundy() {
    if (document.getElementById('QYL-Burgundy')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Burgundy';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Burgundy.css';
    document.head.appendChild(link);
}
export function removeBurgundy() {
    const burgundyLink = document.getElementById('QYL-Burgundy');
    if (burgundyLink) {
        burgundyLink.remove();
    }
} 