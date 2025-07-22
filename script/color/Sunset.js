export function initSunset() {
    if (document.getElementById('QYL-Sunset')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Sunset';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Sunset.css';
    document.head.appendChild(link);
}
export function removeSunset() {
    const sunsetLink = document.getElementById('QYL-Sunset');
    if (sunsetLink) {
        sunsetLink.remove();
    }
}
