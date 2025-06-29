function initHoverBlockHighlight() {
    const style = document.createElement('style');
    style.id = 'QYL-HoverBlockHighlight';
    style.textContent = `
        .protyle-wysiwyg [data-node-id]:hover {
            box-shadow: var(--b3-point-shadow);
            transition: 0.3s;
        }
    `;
    const existingStyle = document.getElementById('QYL-HoverBlockHighlight');
    if (existingStyle) {
        existingStyle.remove();
    }
    document.head.appendChild(style);
}
function removeHoverBlockHighlight() {
    const style = document.getElementById('QYL-HoverBlockHighlight');
    if (style) {
        style.remove();
    }
}
export { initHoverBlockHighlight, removeHoverBlockHighlight };
