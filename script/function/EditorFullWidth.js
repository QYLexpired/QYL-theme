export function initEditorFullWidth() {
    const style = document.createElement('style');
    style.id = 'QYL-EditorFullWidth';
    style.textContent = `
        .protyle-wysiwyg {
            padding-left: 20px !important;
            padding-right: 20px !important;
        }
        .protyle-title.protyle-wysiwyg--attr {
            margin-left: 20px !important;
            margin-right:20px !important;
        }
        .protyle-title {
            margin-left: 20px !important;
        }
        .protyle-background__ia {
            margin-left: 20px !important;
        }
        .protyle-scroll {
            right: 6px;
        }
    `;
    document.head.appendChild(style);
}
export function removeEditorFullWidth() {
    const style = document.getElementById('QYL-EditorFullWidth');
    if (style) {
        style.remove();
    }
}
export function isEditorFullWidthEnabled() {
    return document.getElementById('QYL-EditorFullWidth') !== null;
}
