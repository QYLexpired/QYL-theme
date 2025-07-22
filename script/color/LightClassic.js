export function initLightClassic() {
    if (document.getElementById('QYL-LightClassic')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-LightClassic';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/LightClassic.css';
    document.head.appendChild(link);
}
export function removeLightClassic() {
    const lightClassicLink = document.getElementById('QYL-LightClassic');
    if (lightClassicLink) {
        lightClassicLink.remove();
    }
} 