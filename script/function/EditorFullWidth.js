export function initEditorFullWidth() {
    if (document.body.classList.contains('QYLmobile')) return;
    const style = document.createElement('style');
    style.id = 'QYL-EditorFullWidth';
    style.textContent = `
        .protyle-wysiwyg {
            padding-left: 10px !important;
            padding-right: 10px !important;
        }
        .protyle-title.protyle-wysiwyg--attr {
            margin-left: 10px !important;
            margin-right:10px !important;
        }
        .protyle-title {
            margin-left: 10px !important;
        }
        .protyle-background__ia {
            margin-left: 10px !important;
        }
        .protyle-scroll {
            right: 16px;
        }
    `;
    document.head.appendChild(style);
    document.body.classList.add('QYLEditorFullWidth');
}
export function removeEditorFullWidth() {
    const style = document.getElementById('QYL-EditorFullWidth');
    if (style) {
        style.remove();
    }
    document.body.classList.remove('QYLEditorFullWidth');
}
export function isEditorFullWidthEnabled() {
    return document.getElementById('QYL-EditorFullWidth') !== null;
}
