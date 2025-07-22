export function initMocui() {
    if (document.getElementById('QYL-Mocui')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Mocui';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Mocui.css';
    document.head.appendChild(link);
}
export function removeMocui() {
    const mocuiLink = document.getElementById('QYL-Mocui');
    if (mocuiLink) {
        mocuiLink.remove();
    }
} 