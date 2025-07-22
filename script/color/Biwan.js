export function initBiwan() {
    if (document.getElementById('QYL-Biwan')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Biwan';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Biwan.css';
    document.head.appendChild(link);
}
export function removeBiwan() {
    const biwanLink = document.getElementById('QYL-Biwan');
    if (biwanLink) {
        biwanLink.remove();
    }
} 