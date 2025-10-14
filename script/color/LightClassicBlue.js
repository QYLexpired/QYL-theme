export function initLightClassicBlue() {
    if (document.getElementById('QYL-LightClassicBlue')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-LightClassicBlue';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL-theme/style/Color/LightClassicBlue.css';
    document.head.appendChild(link);
}
export function removeLightClassicBlue() {
    const lightClassicLink = document.getElementById('QYL-LightClassicBlue');
    if (lightClassicLink) {
        lightClassicLink.remove();
    }
} 