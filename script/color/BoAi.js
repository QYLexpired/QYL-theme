export function initBoAi() {
    if (document.getElementById('QYL-BoAi')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-BoAi';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL-theme/style/Color/BoAi.css';
    document.head.appendChild(link);
}
export function removeBoAi() {
    const boAiLink = document.getElementById('QYL-BoAi');
    if (boAiLink) {
        boAiLink.remove();
    }
}
