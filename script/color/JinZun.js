export function initJinZun() {
    if (document.getElementById('QYL-JinZun')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-JinZun';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL-theme/style/Color/JinZun.css';
    document.head.appendChild(link);
}
export function removeJinZun() {
    const jinZunLink = document.getElementById('QYL-JinZun');
    if (jinZunLink) {
        jinZunLink.remove();
    }
}
