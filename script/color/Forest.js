export function initForest() {
    if (document.getElementById('QYL-Forest')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Forest';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Forest.css';
    document.head.appendChild(link);
}
export function removeForest() {
    const forestLink = document.getElementById('QYL-Forest');
    if (forestLink) {
        forestLink.remove();
    }
}
