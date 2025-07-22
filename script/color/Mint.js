export function initMint() {
    if (document.getElementById('QYL-Mint')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Mint';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Mint.css';
    document.head.appendChild(link);
}
export function removeMint() {
    const mintLink = document.getElementById('QYL-Mint');
    if (mintLink) {
        mintLink.remove();
    }
} 