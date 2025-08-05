export function initWoodAsh() {
    if (document.getElementById('QYL-WoodAsh')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-WoodAsh';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/WoodAsh.css';
    document.head.appendChild(link);
}
export function removeWoodAsh() {
    const woodAshLink = document.getElementById('QYL-WoodAsh');
    if (woodAshLink) {
        woodAshLink.remove();
    }
} 