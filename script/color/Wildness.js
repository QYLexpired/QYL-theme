export function initWildness() {
    if (document.getElementById('QYL-Wildness')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Wildness';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Wilderness.css';
    document.head.appendChild(link);
}
export function removeWildness() {
    const wildnessLink = document.getElementById('QYL-Wildness');
    if (wildnessLink) {
        wildnessLink.remove();
    }
} 