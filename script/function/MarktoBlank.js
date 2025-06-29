export function initMarktoBlank() {
    const style = document.createElement('style');
    style.id = 'snippet-QYL-MarktoBlank';
    style.textContent = `
        .protyle-wysiwyg span[data-type~=mark] {
            color: transparent !important;
            border-bottom: 2px solid var(--b3-theme-primary);
            background: transparent !important;
            background-color: var(--QYL-hover) !important;
            margin-left: 3px;
            margin-right: 3px;
            transition: var(--b3-transition);
        }
        .protyle-wysiwyg span[data-type~=mark]:hover {
            color: unset !important;
            background: unset !important;
            background-color: unset!important;
        }
        .card__block.card__block--hidemark .protyle-wysiwyg span[data-type~=mark] {
            display: inline-block;
            font-size: unset !important;
            transition: none !important;
            width: 40px !important;
            height: 1em !important;
        }
        .card__block.card__block--hidemark .protyle-wysiwyg span[data-type~=mark]:hover {
            color: transparent !important;
            background: transparent !important;
            background-color: var(--QYL-hover) !important;
        }
        .card__block.card__block--hidemark .protyle-wysiwyg span[data-type~=mark]::before {
            display: none;
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
