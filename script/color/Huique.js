export function initHuique() {
    if (document.getElementById('QYL-Huique')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Huique';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Huique.css';
    document.head.appendChild(link);
}
export function removeHuique() {
    const huiqueLink = document.getElementById('QYL-Huique');
    if (huiqueLink) {
        huiqueLink.remove();
    }
} 