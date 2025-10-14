export function initLightClassicRed() {
    if (document.getElementById('QYL-LightClassicRed')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-LightClassicRed';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL-theme/style/Color/LightClassicRed.css';
    document.head.appendChild(link);
}
export function removeLightClassicRed() {
    const lightClassicRedLink = document.getElementById('QYL-LightClassicRed');
    if (lightClassicRedLink) {
        lightClassicRedLink.remove();
    }
}
