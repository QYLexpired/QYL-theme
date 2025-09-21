export function initYinJi() {
    if (document.getElementById('QYL-YinJi')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-YinJi';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL-theme/style/Color/YinJi.css';
    document.head.appendChild(link);
}
export function removeYinJi() {
    const yinJiLink = document.getElementById('QYL-YinJi');
    if (yinJiLink) {
        yinJiLink.remove();
    }
}
