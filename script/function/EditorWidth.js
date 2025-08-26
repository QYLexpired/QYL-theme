import i18n from '../../i18n/i18n.js';
import { putFile, getFile } from '../basic/API.js';
function reloadUI(mode) {
    if(window.siyuan.ws.app.plugins?.length === 0) {
        if (mode) window.location.pathname = `stage/build/${mode}/`;
        else fetch('/api/ui/reloadUI', { method: 'POST' });
        return;
    }
    const plugin = window.siyuan.ws.app.plugins[0];
    if(!plugin?.saveLayout) {
        if (mode) window.location.pathname = `stage/build/${mode}/`;
        else fetch('/api/ui/reloadUI', { method: 'POST' });
        return;
    }
    plugin.saveLayout(() => {
        if (mode) window.location.pathname = `stage/build/${mode}/`;
        else window.location.reload();
    });
}
export async function initEditorWidth() {
    if (document.body.classList.contains('QYLmobile')) return;
    let config = {
        editorWidth: null,
        editorPadding: 16
    };
    try {
        const configContent = await getFile('/data/snippets/QYL-EditorWidth.json');
        if (configContent) {
            const parsedConfig = JSON.parse(configContent);
            config = { ...config, ...parsedConfig };
        }
    } catch (error) {
    }
    const style = document.createElement('style');
    style.id = 'QYL-EditorWidth';
            style.textContent = `
            :root {
                ${config.editorPadding ? `--QYL-editor-padding: ${config.editorPadding}px;` : ''}
                ${config.editorPadding ? `--QYL-editor-padding-value: max(16px, var(--QYL-editor-padding));` : ''}
                ${config.editorWidth ? `--QYL-editor-width: ${config.editorWidth}px;` : ''}
                ${config.editorWidth ? `--QYL-editor-width-value: calc(var(--QYL-editor-width) + var(--QYL-editor-padding-value) * 2);` : ''}
            }
        .protyle {
            container-type: size;
        }
        .protyle-content {
            --QYL-protyle-padding-left: var(--QYL-editor-padding-value) !important;
            --QYL-protyle-padding-right: var(--QYL-editor-padding-value) !important;
            ${config.editorWidth ? `--QYL-protyle-margin: max(calc((100cqw - var(--QYL-editor-width-value)) / 2), 0px) !important;` : ''}
        }
        .protyle-wysiwyg {
            --QYL-protyle-padding-left: var(--QYL-editor-padding-value) !important;
            --QYL-protyle-padding-right: var(--QYL-editor-padding-value) !important;
            padding-left: var(--QYL-protyle-padding-left) !important;
            padding-right: var(--QYL-protyle-padding-right) !important;
            ${config.editorWidth ? `max-width: var(--QYL-editor-width-value) !important;` : ''}
            ${config.editorWidth ? `margin: 0 auto !important;` : ''}
            overflow-x: visible !important;
        }
        .protyle-background__ia {
            margin-left: var(--QYL-editor-padding-value) !important;
        }
        .protyle-title {
            margin-left: var(--QYL-editor-padding-value) !important;
            margin-right: var(--QYL-editor-padding-value) !important;
        }
        .QYL-inline-memo-box {
            --QYL-protyle-padding-left: var(--QYL-editor-padding-value) !important;
            --QYL-protyle-padding-right: var(--QYL-editor-padding-value) !important;
        }
    `;
    document.head.appendChild(style);
    document.body.classList.add('QYLEditorWidth');
}
export function removeEditorWidth() {
    const style = document.getElementById('QYL-EditorWidth');
    if (style) {
        style.remove();
    }
    document.body.classList.remove('QYLEditorWidth');
}
export function isEditorWidthEnabled() {
    return document.getElementById('QYL-EditorWidth') !== null;
}
export async function createEditorWidthSettingsDialog() {
    const existingDialog = document.querySelector('[data-key="QYLEditorWidthSettings"]');
    if (existingDialog) {
        existingDialog.remove();
    }
    let currentConfig = {};
    try {
        const configContent = await getFile('/data/snippets/QYL-EditorWidth.json');
        if (configContent) {
            currentConfig = JSON.parse(configContent);
        }
    } catch (error) {
        currentConfig = {
            editorWidth: null,
            editorPadding: 16
        };
    }
    const dialogContainer = document.createElement('div');
    dialogContainer.setAttribute('data-key', 'QYLEditorWidthSettings');
    dialogContainer.className = 'b3-dialog--open';
    const dialog = document.createElement('div');
    dialog.className = 'b3-dialog';
    dialog.style.zIndex = '30';
    const scrim = document.createElement('div');
    scrim.className = 'b3-dialog__scrim';
    const container = document.createElement('div');
    container.className = 'b3-dialog__container';
    container.style.height = 'auto';
    container.style.left = 'auto';
    container.style.top = 'auto';
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    let hasMoved = false;
    const header = document.createElement('div');
    header.className = 'b3-dialog__header';
    header.textContent = i18n.EditorWidth || '编辑器宽度调整';
    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = container.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        e.preventDefault();
    });
    const mousemoveHandler = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) return;
        if (!hasMoved) {
            container.style.position = 'fixed';
            hasMoved = true;
        }
        const newLeft = startLeft + deltaX;
        const newTop = startTop + deltaY;
        const containerRect = container.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        let finalLeft = newLeft;
        let finalTop = newTop;
        if (finalLeft < 0) {
            finalLeft = 0;
        }
        if (finalLeft + containerRect.width > windowWidth) {
            finalLeft = windowWidth - containerRect.width;
        }
        if (finalTop < 0) {
            finalTop = 0;
        }
        if (finalTop + containerRect.height > windowHeight) {
            finalTop = windowHeight - containerRect.height;
        }
        container.style.left = finalLeft + 'px';
        container.style.top = finalTop + 'px';
    };
    const mouseupHandler = () => {
        isDragging = false;
    };
    dialog._mousemoveHandler = mousemoveHandler;
    dialog._mouseupHandler = mouseupHandler;
    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
    const body = document.createElement('div');
    body.className = 'b3-dialog__body';
    const content = document.createElement('div');
    content.className = 'b3-dialog__content';
    const widthContainer = document.createElement('div');
    widthContainer.className = 'b3-label fn__flex config__group';
    const widthLabel = document.createElement('div');
    widthLabel.className = 'fn__block';
    widthLabel.innerHTML = (i18n.EditorWidthValue || '编辑器宽度') + '<br><span style="font-size: 12px; color: var(--b3-theme-on-surface);">' + (i18n.EditorWidthDesc || '固定编辑器的最大宽度，留空则不限制宽度，单位：px') + '</span>';
    widthContainer.appendChild(widthLabel);
    const widthInputContainer = document.createElement('div');
    widthInputContainer.className = 'fn__flex config__item';
    const widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.min = '0';
    widthInput.step = '1';
    widthInput.value = currentConfig.editorWidth || '';
    widthInput.className = 'b3-text-field fn__flex-1';
    widthInput.style.width = '120px';
    widthInputContainer.appendChild(widthInput);
    widthContainer.appendChild(widthInputContainer);
    const paddingContainer = document.createElement('div');
    paddingContainer.className = 'b3-label fn__flex config__group';
    const paddingLabel = document.createElement('div');
    paddingLabel.className = 'fn__block';
    paddingLabel.innerHTML = (i18n.EditorPadding || '编辑器内边距') + '<br><span style="font-size: 12px; color: var(--b3-theme-on-surface);">' + (i18n.EditorPaddingDesc || '固定编辑器的最小内边距，单位：px') + '</span>';
    paddingContainer.appendChild(paddingLabel);
    const paddingInputContainer = document.createElement('div');
    paddingInputContainer.className = 'fn__flex config__item';
    const paddingInput = document.createElement('input');
    paddingInput.type = 'number';
    paddingInput.min = '0';
    paddingInput.step = '1';
    paddingInput.value = currentConfig.editorPadding || 16;
    paddingInput.className = 'b3-text-field fn__flex-1';
    paddingInput.style.width = '120px';
    paddingInputContainer.appendChild(paddingInput);
    paddingContainer.appendChild(paddingInputContainer);
    content.appendChild(widthContainer);
    content.appendChild(paddingContainer);
    const action = document.createElement('div');
    action.className = 'b3-dialog__action';
    const cancelButton = document.createElement('button');
    cancelButton.className = 'b3-button b3-button--cancel';
    cancelButton.textContent = i18n.Cancel || '取消';
    const space = document.createElement('div');
    space.className = 'fn__space';
    const confirmButton = document.createElement('button');
    confirmButton.className = 'b3-button b3-button--text';
    confirmButton.textContent = i18n.saveandrefresh || '保存并刷新';
    action.appendChild(cancelButton);
    action.appendChild(space);
    action.appendChild(confirmButton);
    body.appendChild(content);
    body.appendChild(action);
    container.appendChild(header);
    container.appendChild(body);
    dialog.appendChild(scrim);
    dialog.appendChild(container);
    dialogContainer.appendChild(dialog);
    scrim.addEventListener('click', (e) => {
        if (e.target === scrim) {
            removeEditorWidthSettingsDialog();
        }
    });
    cancelButton.addEventListener('click', () => {
        removeEditorWidthSettingsDialog();
    });
    confirmButton.addEventListener('click', async () => {
        const widthValue = widthInput.value.trim();
        const paddingValue = paddingInput.value.trim();
        if (widthValue && (isNaN(widthValue) || parseInt(widthValue) < 0)) {
            return;
        }
        if (paddingValue && (isNaN(paddingValue) || parseInt(paddingValue) < 0)) {
            return;
        }
        const newConfig = {
            editorWidth: widthValue ? parseInt(widthValue) : null,
            editorPadding: paddingValue ? parseInt(paddingValue) : null
        };
        const saveSuccess = await saveEditorWidthConfig(newConfig);
        if (saveSuccess) {
            reloadUI();
        }
        removeEditorWidthSettingsDialog();
    });
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            removeEditorWidthSettingsDialog();
            document.removeEventListener('keydown', handleKeyDown);
        }
    };
    document.addEventListener('keydown', handleKeyDown);
    dialog._keydownHandler = handleKeyDown;
    return dialogContainer;
}
async function saveEditorWidthConfig(config) {
    try {
        const jsonContent = JSON.stringify(config, null, 2);
        const result = await putFile('/data/snippets/QYL-EditorWidth.json', jsonContent);
        if (result && result.code === 0) {
            return true;
        } else {
            throw new Error(result?.msg || i18n.saveError || '保存失败');
        }
    } catch (error) {
        return false;
    }
}
export async function showEditorWidthSettingsDialog() {
    const dialog = await createEditorWidthSettingsDialog();
    document.body.appendChild(dialog);
    return dialog;
}
export function removeEditorWidthSettingsDialog() {
    const existingDialog = document.querySelector('[data-key="QYLEditorWidthSettings"]');
    if (existingDialog) {
        const dialog = existingDialog.querySelector('.b3-dialog');
        if (dialog) {
            const mousemoveHandler = dialog._mousemoveHandler;
            const mouseupHandler = dialog._mouseupHandler;
            const keydownHandler = dialog._keydownHandler;
            if (mousemoveHandler) {
                document.removeEventListener('mousemove', mousemoveHandler);
            }
            if (mouseupHandler) {
                document.removeEventListener('mouseup', mouseupHandler);
            }
            if (keydownHandler) {
                document.removeEventListener('keydown', keydownHandler);
            }
        }
        existingDialog.remove();
    }
}
