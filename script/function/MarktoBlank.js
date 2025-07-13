export function initMarktoBlank() {
    const style = document.createElement('style');
    style.id = 'snippet-QYL-MarktoBlank';
    style.textContent = `
        .protyle-wysiwyg span[data-type~=mark] {
            color: transparent !important;
            border-bottom: 2px solid var(--b3-theme-primary);
            background: transparent !important;
            background-color: var(--QYL-tab-item-focus) !important;
            transition: var(--b3-transition);
        }
        .protyle-wysiwyg span[data-type~=mark]:hover {
            color: unset !important;
            background: unset !important;
            background-color: unset!important;
        }
        .card__block .protyle-wysiwyg span[data-type~=mark] {
            transition: none !important;
        }
        .card__block.card__block--hidemark .protyle-wysiwyg span[data-type~=mark]::before {
            border-bottom: none !important;
        }
        .card__block.card__block--hidemark .protyle-wysiwyg span[data-type~=mark]::before {
            content: "qqqqq";
            color: transparent;
            border-bottom: 2px solid var(--b3-theme-primary);
            background-color: var(--QYL-tab-item-focus);
        }
    `;
    document.head.appendChild(style);
}
export function removeMarktoBlank() {
    const style = document.getElementById('snippet-QYL-MarktoBlank');
    if (style) {
        style.remove();
    }
}
