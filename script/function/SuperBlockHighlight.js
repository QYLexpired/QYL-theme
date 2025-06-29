function initSuperBlockHighlight() {
    const style = document.createElement('style');
    style.id = 'QYL-SuperBlockHighlight';
    style.textContent = `
        .protyle-wysiwyg [data-node-id].sb:hover {
            box-shadow: var(--b3-point-shadow);
            transition: 0.3s;
        }
    `;
    document.head.appendChild(style);
}
function removeSuperBlockHighlight() {
    const style = document.getElementById('QYL-SuperBlockHighlight');
    if (style) {
        style.remove();
    }
}
export { initSuperBlockHighlight, removeSuperBlockHighlight };
