export function initMemory() {
    if (document.getElementById('QYL-Memory')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Memory';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Memory.css';
    document.head.appendChild(link);
}
export function removeMemory() {
    const memoryLink = document.getElementById('QYL-Memory');
    if (memoryLink) {
        memoryLink.remove();
    }
} 