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
async function showNotification(message) {
    try {
        await fetch('/api/notification/pushMsg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                msg: message,
                timeout: 3000
            })
        });
    } catch (error) {
    }
}
export async function initEditorWidth() {
    if (document.body.classList.contains('QYLmobile')) return;
    let config = {
        editorWidth: null,
        editorWidthUnit: 'px',
        editorPadding: 16,
        editorPaddingUnit: 'px',
        independentWindow: false,
        independentEditorWidth: null,
        independentEditorWidthUnit: 'px',
        independentEditorPadding: 16,
        independentPaddingUnit: 'px',
        popupWindow: false,
        popupEditorWidth: null,
        popupEditorWidthUnit: 'px',
        popupEditorPadding: 16,
        popupEditorPaddingUnit: 'px'
    };
    try {
        const configContent = await getFile('/data/snippets/QYL-EditorWidth.json');
        if (configContent) {
            const parsedConfig = JSON.parse(configContent);
            config = { ...config, ...parsedConfig };
            if (!config.editorWidthUnit) config.editorWidthUnit = 'px';
            if (!config.editorPaddingUnit) config.editorPaddingUnit = 'px';
            if (!config.independentEditorWidthUnit) config.independentEditorWidthUnit = 'px';
            if (!config.independentPaddingUnit) config.independentPaddingUnit = 'px';
            if (!config.popupEditorWidthUnit) config.popupEditorWidthUnit = 'px';
            if (!config.popupEditorPaddingUnit) config.popupEditorPaddingUnit = 'px';
        }
    } catch (error) {
    }
    const style = document.createElement('style');
    style.id = 'QYL-EditorWidth';
            style.textContent = `
            :root {
                --QYL-editor-padding: ${config.editorPadding}${config.editorPaddingUnit === '%' ? 'cqw' : 'px'};
                ${config.editorWidth ? `--QYL-editor-width: ${config.editorWidth}${config.editorWidthUnit === '%' ? 'cqw' : 'px'};` : ''}
                --QYL-editor-padding-value: max(16px, var(--QYL-editor-padding));
                ${config.editorWidth ? `--QYL-editor-width-value: calc(var(--QYL-editor-width) + var(--QYL-editor-padding-value) * 2);` : ''}
            }
            .protyle {
                container-type: inline-size;
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
                margin-left: calc(var(--QYL-editor-padding-value) + var(--QYL-protyle-margin, 0px)) !important;
            }
            .protyle-title {
                margin-left: calc(var(--QYL-editor-padding-value) + var(--QYL-protyle-margin, 0px)) !important;
                margin-right: calc(var(--QYL-editor-padding-value) + var(--QYL-protyle-margin, 0px)) !important;
            }
            .QYL-inline-memo-box {
                --QYL-protyle-padding-left: var(--QYL-editor-padding-value) !important;
                --QYL-protyle-padding-right: var(--QYL-editor-padding-value) !important;
            }
            .sy__backlink .protyle-wysiwyg {
                padding: 0 8px !important;
                margin: 0 !important;
                max-width: unset !important;
            }
            #searchPreview .protyle-wysiwyg {
                padding: 0 20px !important;
                margin: 0 !important;
                max-width: unset !important;
            }
        ${config.independentWindow ? `
            #layouts.layout__center {
                ${config.independentWindow ? `--QYL-IDwindow-padding: ${config.independentEditorPadding}${config.independentPaddingUnit === '%' ? 'cqw' : 'px'};` : ''}
                ${config.independentWindow && config.independentEditorWidth ? `--QYL-IDwindow-width: ${config.independentEditorWidth}${config.independentEditorWidthUnit === '%' ? 'cqw' : 'px'};` : ''}
                --QYL-editor-padding-value: max(16px, var(--QYL-IDwindow-padding));
                ${config.independentWindow && config.independentEditorWidth ? `--QYL-editor-width-value: calc(var(--QYL-IDwindow-width) + var(--QYL-editor-padding-value) * 2);` : ''}
            }
        ` : ''}
        ${config.popupWindow ? `
            .block__popover {
                ${config.popupWindow ? `--QYL-popup-padding: ${config.popupEditorPadding}${config.popupEditorPaddingUnit === '%' ? 'cqw' : 'px'};` : ''}
                ${config.popupWindow && config.popupEditorWidth ? `--QYL-popup-width: ${config.popupEditorWidth}${config.popupEditorWidthUnit === '%' ? 'cqw' : 'px'};` : ''}
                --QYL-editor-padding-value: max(16px, var(--QYL-popup-padding));
                ${config.popupWindow && config.popupEditorWidth ? `--QYL-editor-width-value: calc(var(--QYL-popup-width) + var(--QYL-editor-padding-value) * 2);` : ''}
            }
        ` : ''}
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
            editorWidthUnit: 'px',
            editorPadding: 16,
            editorPaddingUnit: 'px',
            independentWindow: false,
            independentEditorWidth: null,
            independentEditorWidthUnit: 'px',
            independentEditorPadding: 16,
            independentPaddingUnit: 'px',
            popupWindow: false,
            popupEditorWidth: null,
            popupEditorWidthUnit: 'px',
            popupEditorPadding: 16,
            popupEditorPaddingUnit: 'px'
        };
    }
    if (!currentConfig.editorWidthUnit) currentConfig.editorWidthUnit = 'px';
    if (!currentConfig.editorPaddingUnit) currentConfig.editorPaddingUnit = 'px';
    if (!currentConfig.independentEditorWidthUnit) currentConfig.independentEditorWidthUnit = 'px';
    if (!currentConfig.independentPaddingUnit) currentConfig.independentPaddingUnit = 'px';
    if (!currentConfig.popupEditorWidthUnit) currentConfig.popupEditorWidthUnit = 'px';
    if (!currentConfig.popupEditorPaddingUnit) currentConfig.popupEditorPaddingUnit = 'px';
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
    container.style.maxWidth = '85vw';
    container.style.maxHeight = '75vh';
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
    widthLabel.style.paddingRight = '20px';
    widthLabel.style.maxWidth = '400px';
    widthLabel.innerHTML = (i18n.EditorWidthValue || '编辑器宽度') + '<br><span style="font-size: 12px; color: var(--b3-theme-on-surface);">' + (i18n.EditorWidthDesc || '固定编辑器的最大宽度，留空则不限制宽度，单位：px') + '</span>';
    widthContainer.appendChild(widthLabel);
    const widthInputContainer = document.createElement('div');
    widthInputContainer.className = 'fn__flex config__item';
    widthInputContainer.style.alignItems = 'center';
    widthInputContainer.style.minWidth = 'fit-content';
    const widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.min = '0';
    widthInput.step = '1';
    widthInput.value = 'editorWidth' in currentConfig ? currentConfig.editorWidth : '';
    widthInput.className = 'b3-text-field fn__flex-1';
    widthInput.style.width = '120px';
    widthInput.style.minWidth = '120px';
    widthInput.style.maxWidth = '120px';
    widthInput.style.height = '30px';
    widthInputContainer.appendChild(widthInput);
    const unitContainer = document.createElement('div');
    unitContainer.className = 'fn__flex';
    unitContainer.style.marginLeft = '10px';
    unitContainer.style.minWidth = 'fit-content';
    unitContainer.style.alignItems = 'center';
    const pixelRadio = document.createElement('input');
    pixelRadio.type = 'radio';
    pixelRadio.name = 'widthUnit';
    pixelRadio.id = 'widthUnitPixel';
    pixelRadio.value = 'px';
    pixelRadio.checked = (currentConfig.editorWidthUnit || 'px') === 'px'; 
    const pixelLabel = document.createElement('label');
    pixelLabel.htmlFor = 'widthUnitPixel';
    pixelLabel.textContent = i18n.Pixel || '像素';
    pixelLabel.style.marginLeft = '4px';
    pixelLabel.style.marginRight = '12px';
    pixelLabel.style.fontSize = '14px';
    const percentRadio = document.createElement('input');
    percentRadio.type = 'radio';
    percentRadio.name = 'widthUnit';
    percentRadio.id = 'widthUnitPercent';
    percentRadio.value = '%';
    percentRadio.checked = (currentConfig.editorWidthUnit || 'px') === '%'; 
    const percentLabel = document.createElement('label');
    percentLabel.htmlFor = 'widthUnitPercent';
    percentLabel.textContent = i18n.Percentage || '百分比';
    percentLabel.style.marginLeft = '4px';
    percentLabel.style.fontSize = '14px';
    unitContainer.appendChild(pixelRadio);
    unitContainer.appendChild(pixelLabel);
    unitContainer.appendChild(percentRadio);
    unitContainer.appendChild(percentLabel);
    widthInputContainer.appendChild(unitContainer);
    widthContainer.appendChild(widthInputContainer);
    const paddingContainer = document.createElement('div');
    paddingContainer.className = 'b3-label fn__flex config__group';
    const paddingLabel = document.createElement('div');
    paddingLabel.className = 'fn__block';
    paddingLabel.style.paddingRight = '20px';
    paddingLabel.style.maxWidth = '400px';
    paddingLabel.innerHTML = (i18n.EditorPadding || '编辑器内边距') + '<br><span style="font-size: 12px; color: var(--b3-theme-on-surface);">' + (i18n.EditorPaddingDesc || '固定编辑器的最小内边距，单位：px（不能低于16px，不能留空）') + '</span>';
    paddingContainer.appendChild(paddingLabel);
    const paddingInputContainer = document.createElement('div');
    paddingInputContainer.className = 'fn__flex config__item';
    paddingInputContainer.style.alignItems = 'center';
    paddingInputContainer.style.minWidth = 'fit-content';
    const paddingInput = document.createElement('input');
    paddingInput.type = 'number';
    paddingInput.min = '0';
    paddingInput.step = '1';
    paddingInput.value = 'editorPadding' in currentConfig ? currentConfig.editorPadding : 16;
    paddingInput.className = 'b3-text-field fn__flex-1';
    paddingInput.style.width = '120px';
    paddingInput.style.minWidth = '120px';
    paddingInput.style.maxWidth = '120px';
    paddingInput.style.height = '30px';
    paddingInputContainer.appendChild(paddingInput);
    const paddingUnitContainer = document.createElement('div');
    paddingUnitContainer.className = 'fn__flex';
    paddingUnitContainer.style.marginLeft = '10px';
    paddingUnitContainer.style.minWidth = 'fit-content';
    paddingUnitContainer.style.alignItems = 'center';
    const paddingPixelRadio = document.createElement('input');
    paddingPixelRadio.type = 'radio';
    paddingPixelRadio.name = 'paddingUnit';
    paddingPixelRadio.id = 'paddingUnitPixel';
    paddingPixelRadio.value = 'px';
    paddingPixelRadio.checked = (currentConfig.editorPaddingUnit || 'px') === 'px'; 
    const paddingPixelLabel = document.createElement('label');
    paddingPixelLabel.htmlFor = 'paddingUnitPixel';
    paddingPixelLabel.textContent = i18n.Pixel || '像素';
    paddingPixelLabel.style.marginLeft = '4px';
    paddingPixelLabel.style.marginRight = '12px';
    paddingPixelLabel.style.fontSize = '14px';
    const paddingPercentRadio = document.createElement('input');
    paddingPercentRadio.type = 'radio';
    paddingPercentRadio.name = 'paddingUnit';
    paddingPercentRadio.id = 'paddingUnitPercent';
    paddingPercentRadio.value = '%';
    paddingPercentRadio.checked = (currentConfig.editorPaddingUnit || 'px') === '%'; 
    const paddingPercentLabel = document.createElement('label');
    paddingPercentLabel.htmlFor = 'paddingUnitPercent';
    paddingPercentLabel.textContent = i18n.Percentage || '百分比';
    paddingPercentLabel.style.marginLeft = '4px';
    paddingPercentLabel.style.fontSize = '14px';
    paddingUnitContainer.appendChild(paddingPixelRadio);
    paddingUnitContainer.appendChild(paddingPixelLabel);
    paddingUnitContainer.appendChild(paddingPercentRadio);
    paddingUnitContainer.appendChild(paddingPercentLabel);
    paddingInputContainer.appendChild(paddingUnitContainer);
    paddingContainer.appendChild(paddingInputContainer);
    content.appendChild(widthContainer);
    content.appendChild(paddingContainer);
    const independentWindowContainer = document.createElement('div');
    independentWindowContainer.className = 'b3-label fn__flex config__group';
    independentWindowContainer.style.borderBottom = 'none';
    const independentWindowLabel = document.createElement('div');
    independentWindowLabel.className = 'fn__block';
    independentWindowLabel.style.paddingRight = '20px';
    independentWindowLabel.textContent = i18n.IndependentWindow || '单独设置独立窗口';
    const independentWindowSwitchContainer = document.createElement('div');
    independentWindowSwitchContainer.className = 'fn__flex config__item';
    independentWindowSwitchContainer.style.alignItems = 'center';
    const independentWindowSwitch = document.createElement('input');
    independentWindowSwitch.type = 'checkbox';
    independentWindowSwitch.className = 'b3-switch fn__flex-center';
    independentWindowSwitch.checked = currentConfig.independentWindow || false;
    independentWindowSwitchContainer.appendChild(independentWindowSwitch);
    independentWindowContainer.appendChild(independentWindowLabel);
    independentWindowContainer.appendChild(independentWindowSwitchContainer);
    content.appendChild(independentWindowContainer);
    const independentWidthContainer = document.createElement('div');
    independentWidthContainer.className = 'b3-label fn__flex config__group';
    independentWidthContainer.style.display = currentConfig.independentWindow ? 'flex' : 'none';
    independentWidthContainer.style.borderBottom = 'none';
    const independentWidthLabel = document.createElement('div');
    independentWidthLabel.className = 'fn__block';
    independentWidthLabel.style.paddingRight = '20px';
    independentWidthLabel.style.maxWidth = '400px';
    independentWidthLabel.textContent = i18n.IndependentEditorWidth || '独立窗口编辑器宽度';
    independentWidthContainer.appendChild(independentWidthLabel);
    const independentWidthInputContainer = document.createElement('div');
    independentWidthInputContainer.className = 'fn__flex config__item';
    independentWidthInputContainer.style.alignItems = 'center';
    independentWidthInputContainer.style.minWidth = 'fit-content';
    const independentWidthInput = document.createElement('input');
    independentWidthInput.type = 'number';
    independentWidthInput.min = '0';
    independentWidthInput.step = '1';
    independentWidthInput.value = 'independentEditorWidth' in currentConfig ? currentConfig.independentEditorWidth : '';
    independentWidthInput.className = 'b3-text-field fn__flex-1';
    independentWidthInput.style.width = '120px';
    independentWidthInput.style.minWidth = '120px';
    independentWidthInput.style.maxWidth = '120px';
    independentWidthInput.style.height = '30px';
    independentWidthInputContainer.appendChild(independentWidthInput);
    const independentWidthUnitContainer = document.createElement('div');
    independentWidthUnitContainer.className = 'fn__flex';
    independentWidthUnitContainer.style.marginLeft = '10px';
    independentWidthUnitContainer.style.minWidth = 'fit-content';
    independentWidthUnitContainer.style.alignItems = 'center';
    const independentWidthPixelRadio = document.createElement('input');
    independentWidthPixelRadio.type = 'radio';
    independentWidthPixelRadio.name = 'independentWidthUnit';
    independentWidthPixelRadio.id = 'independentWidthUnitPixel';
    independentWidthPixelRadio.value = 'px';
    independentWidthPixelRadio.checked = (currentConfig.independentEditorWidthUnit || 'px') === 'px';
    const independentWidthPixelLabel = document.createElement('label');
    independentWidthPixelLabel.htmlFor = 'independentWidthUnitPixel';
    independentWidthPixelLabel.textContent = i18n.Pixel || '像素';
    independentWidthPixelLabel.style.marginLeft = '4px';
    independentWidthPixelLabel.style.marginRight = '12px';
    independentWidthPixelLabel.style.fontSize = '14px';
    const independentWidthPercentRadio = document.createElement('input');
    independentWidthPercentRadio.type = 'radio';
    independentWidthPercentRadio.name = 'independentWidthUnit';
    independentWidthPercentRadio.id = 'independentWidthUnitPercent';
    independentWidthPercentRadio.value = '%';
    independentWidthPercentRadio.checked = (currentConfig.independentEditorWidthUnit || 'px') === '%';
    const independentWidthPercentLabel = document.createElement('label');
    independentWidthPercentLabel.htmlFor = 'independentWidthUnitPercent';
    independentWidthPercentLabel.textContent = i18n.Percentage || '百分比';
    independentWidthPercentLabel.style.marginLeft = '4px';
    independentWidthPercentLabel.style.fontSize = '14px';
    independentWidthUnitContainer.appendChild(independentWidthPixelRadio);
    independentWidthUnitContainer.appendChild(independentWidthPixelLabel);
    independentWidthUnitContainer.appendChild(independentWidthPercentRadio);
    independentWidthUnitContainer.appendChild(independentWidthPercentLabel);
    independentWidthInputContainer.appendChild(independentWidthUnitContainer);
    independentWidthContainer.appendChild(independentWidthInputContainer);
    const independentPaddingContainer = document.createElement('div');
    independentPaddingContainer.className = 'b3-label fn__flex config__group';
    independentPaddingContainer.style.display = currentConfig.independentWindow ? 'flex' : 'none';
    const independentPaddingLabel = document.createElement('div');
    independentPaddingLabel.className = 'fn__block';
    independentPaddingLabel.style.paddingRight = '20px';
    independentPaddingLabel.style.maxWidth = '400px';
    independentPaddingLabel.textContent = i18n.IndependentEditorPadding || '独立窗口编辑器内边距';
    independentPaddingContainer.appendChild(independentPaddingLabel);
    const independentPaddingInputContainer = document.createElement('div');
    independentPaddingInputContainer.className = 'fn__flex config__item';
    independentPaddingInputContainer.style.alignItems = 'center';
    independentPaddingInputContainer.style.minWidth = 'fit-content';
    const independentPaddingInput = document.createElement('input');
    independentPaddingInput.type = 'number';
    independentPaddingInput.min = '0';
    independentPaddingInput.step = '1';
    independentPaddingInput.value = 'independentEditorPadding' in currentConfig ? currentConfig.independentEditorPadding : 16;
    independentPaddingInput.className = 'b3-text-field fn__flex-1';
    independentPaddingInput.style.width = '120px';
    independentPaddingInput.style.minWidth = '120px';
    independentPaddingInput.style.maxWidth = '120px';
    independentPaddingInput.style.height = '30px';
    independentPaddingInputContainer.appendChild(independentPaddingInput);
    const independentPaddingUnitContainer = document.createElement('div');
    independentPaddingUnitContainer.className = 'fn__flex';
    independentPaddingUnitContainer.style.marginLeft = '10px';
    independentPaddingUnitContainer.style.minWidth = 'fit-content';
    independentPaddingUnitContainer.style.alignItems = 'center';
    const independentPaddingPixelRadio = document.createElement('input');
    independentPaddingPixelRadio.type = 'radio';
    independentPaddingPixelRadio.name = 'independentPaddingUnit';
    independentPaddingPixelRadio.id = 'independentPaddingUnitPixel';
    independentPaddingPixelRadio.value = 'px';
    independentPaddingPixelRadio.checked = (currentConfig.independentPaddingUnit || 'px') === 'px';
    const independentPaddingPixelLabel = document.createElement('label');
    independentPaddingPixelLabel.htmlFor = 'independentPaddingUnitPixel';
    independentPaddingPixelLabel.textContent = i18n.Pixel || '像素';
    independentPaddingPixelLabel.style.marginLeft = '4px';
    independentPaddingPixelLabel.style.marginRight = '12px';
    independentPaddingPixelLabel.style.fontSize = '14px';
    const independentPaddingPercentRadio = document.createElement('input');
    independentPaddingPercentRadio.type = 'radio';
    independentPaddingPercentRadio.name = 'independentPaddingUnit';
    independentPaddingPercentRadio.id = 'independentPaddingUnitPercent';
    independentPaddingPercentRadio.value = '%';
    independentPaddingPercentRadio.checked = (currentConfig.independentPaddingUnit || 'px') === '%';
    const independentPaddingPercentLabel = document.createElement('label');
    independentPaddingPercentLabel.htmlFor = 'independentPaddingUnitPercent';
    independentPaddingPercentLabel.textContent = i18n.Percentage || '百分比';
    independentPaddingPercentLabel.style.marginLeft = '4px';
    independentPaddingPercentLabel.style.fontSize = '14px';
    independentPaddingUnitContainer.appendChild(independentPaddingPixelRadio);
    independentPaddingUnitContainer.appendChild(independentPaddingPixelLabel);
    independentPaddingUnitContainer.appendChild(independentPaddingPercentRadio);
    independentPaddingUnitContainer.appendChild(independentPaddingPercentLabel);
    independentPaddingInputContainer.appendChild(independentPaddingUnitContainer);
    independentPaddingContainer.appendChild(independentPaddingInputContainer);
    content.appendChild(independentWidthContainer);
    content.appendChild(independentPaddingContainer);
    const popupWindowContainer = document.createElement('div');
    popupWindowContainer.className = 'b3-label fn__flex config__group';
    popupWindowContainer.style.borderBottom = 'none';
    const popupWindowLabel = document.createElement('div');
    popupWindowLabel.className = 'fn__block';
    popupWindowLabel.style.paddingRight = '20px';
    popupWindowLabel.textContent = i18n.PopupWindow || '单独设置弹出窗口';
    const popupWindowSwitchContainer = document.createElement('div');
    popupWindowSwitchContainer.className = 'fn__flex config__item';
    popupWindowSwitchContainer.style.alignItems = 'center';
    const popupWindowSwitch = document.createElement('input');
    popupWindowSwitch.type = 'checkbox';
    popupWindowSwitch.className = 'b3-switch fn__flex-center';
    popupWindowSwitch.checked = currentConfig.popupWindow || false;
    popupWindowSwitchContainer.appendChild(popupWindowSwitch);
    popupWindowContainer.appendChild(popupWindowLabel);
    popupWindowContainer.appendChild(popupWindowSwitchContainer);
    content.appendChild(popupWindowContainer);
    const popupWidthContainer = document.createElement('div');
    popupWidthContainer.className = 'b3-label fn__flex config__group';
    popupWidthContainer.style.display = currentConfig.popupWindow ? 'flex' : 'none';
    popupWidthContainer.style.borderBottom = 'none';
    const popupWidthLabel = document.createElement('div');
    popupWidthLabel.className = 'fn__block';
    popupWidthLabel.style.paddingRight = '20px';
    popupWidthLabel.style.maxWidth = '400px';
    popupWidthLabel.textContent = i18n.PopupEditorWidth || '弹出窗口编辑器宽度';
    popupWidthContainer.appendChild(popupWidthLabel);
    const popupWidthInputContainer = document.createElement('div');
    popupWidthInputContainer.className = 'fn__flex config__item';
    popupWidthInputContainer.style.alignItems = 'center';
    popupWidthInputContainer.style.minWidth = 'fit-content';
    const popupWidthInput = document.createElement('input');
    popupWidthInput.type = 'number';
    popupWidthInput.min = '0';
    popupWidthInput.step = '1';
    popupWidthInput.value = 'popupEditorWidth' in currentConfig ? currentConfig.popupEditorWidth : '';
    popupWidthInput.className = 'b3-text-field fn__flex-1';
    popupWidthInput.style.width = '120px';
    popupWidthInput.style.minWidth = '120px';
    popupWidthInput.style.maxWidth = '120px';
    popupWidthInput.style.height = '30px';
    popupWidthInputContainer.appendChild(popupWidthInput);
    const popupWidthUnitContainer = document.createElement('div');
    popupWidthUnitContainer.className = 'fn__flex';
    popupWidthUnitContainer.style.marginLeft = '10px';
    popupWidthUnitContainer.style.minWidth = 'fit-content';
    popupWidthUnitContainer.style.alignItems = 'center';
    const popupWidthPixelRadio = document.createElement('input');
    popupWidthPixelRadio.type = 'radio';
    popupWidthPixelRadio.name = 'popupWidthUnit';
    popupWidthPixelRadio.id = 'popupWidthUnitPixel';
    popupWidthPixelRadio.value = 'px';
    popupWidthPixelRadio.checked = (currentConfig.popupEditorWidthUnit || 'px') === 'px';
    const popupWidthPixelLabel = document.createElement('label');
    popupWidthPixelLabel.htmlFor = 'popupWidthUnitPixel';
    popupWidthPixelLabel.textContent = i18n.Pixel || '像素';
    popupWidthPixelLabel.style.marginLeft = '4px';
    popupWidthPixelLabel.style.marginRight = '12px';
    popupWidthPixelLabel.style.fontSize = '14px';
    const popupWidthPercentRadio = document.createElement('input');
    popupWidthPercentRadio.type = 'radio';
    popupWidthPercentRadio.name = 'popupWidthUnit';
    popupWidthPercentRadio.id = 'popupWidthUnitPercent';
    popupWidthPercentRadio.value = '%';
    popupWidthPercentRadio.checked = (currentConfig.popupEditorWidthUnit || 'px') === '%';
    const popupWidthPercentLabel = document.createElement('label');
    popupWidthPercentLabel.htmlFor = 'popupWidthUnitPercent';
    popupWidthPercentLabel.textContent = i18n.Percentage || '百分比';
    popupWidthPercentLabel.style.marginLeft = '4px';
    popupWidthPercentLabel.style.fontSize = '14px';
    popupWidthUnitContainer.appendChild(popupWidthPixelRadio);
    popupWidthUnitContainer.appendChild(popupWidthPixelLabel);
    popupWidthUnitContainer.appendChild(popupWidthPercentRadio);
    popupWidthUnitContainer.appendChild(popupWidthPercentLabel);
    popupWidthInputContainer.appendChild(popupWidthUnitContainer);
    popupWidthContainer.appendChild(popupWidthInputContainer);
    const popupPaddingContainer = document.createElement('div');
    popupPaddingContainer.className = 'b3-label fn__flex config__group';
    popupPaddingContainer.style.display = currentConfig.popupWindow ? 'flex' : 'none';
    const popupPaddingLabel = document.createElement('div');
    popupPaddingLabel.className = 'fn__block';
    popupPaddingLabel.style.paddingRight = '20px';
    popupPaddingLabel.style.maxWidth = '400px';
    popupPaddingLabel.textContent = i18n.PopupEditorPadding || '弹出窗口编辑器内边距';
    popupPaddingContainer.appendChild(popupPaddingLabel);
    const popupPaddingInputContainer = document.createElement('div');
    popupPaddingInputContainer.className = 'fn__flex config__item';
    popupPaddingInputContainer.style.alignItems = 'center';
    popupPaddingInputContainer.style.minWidth = 'fit-content';
    const popupPaddingInput = document.createElement('input');
    popupPaddingInput.type = 'number';
    popupPaddingInput.min = '0';
    popupPaddingInput.step = '1';
    popupPaddingInput.value = 'popupEditorPadding' in currentConfig ? currentConfig.popupEditorPadding : 16;
    popupPaddingInput.className = 'b3-text-field fn__flex-1';
    popupPaddingInput.style.width = '120px';
    popupPaddingInput.style.minWidth = '120px';
    popupPaddingInput.style.maxWidth = '120px';
    popupPaddingInput.style.height = '30px';
    popupPaddingInputContainer.appendChild(popupPaddingInput);
    const popupPaddingUnitContainer = document.createElement('div');
    popupPaddingUnitContainer.className = 'fn__flex';
    popupPaddingUnitContainer.style.marginLeft = '10px';
    popupPaddingUnitContainer.style.minWidth = 'fit-content';
    popupPaddingUnitContainer.style.alignItems = 'center';
    const popupPaddingPixelRadio = document.createElement('input');
    popupPaddingPixelRadio.type = 'radio';
    popupPaddingPixelRadio.name = 'popupPaddingUnit';
    popupPaddingPixelRadio.id = 'popupPaddingUnitPixel';
    popupPaddingPixelRadio.value = 'px';
    popupPaddingPixelRadio.checked = (currentConfig.popupEditorPaddingUnit || 'px') === 'px';
    const popupPaddingPixelLabel = document.createElement('label');
    popupPaddingPixelLabel.htmlFor = 'popupPaddingUnitPixel';
    popupPaddingPixelLabel.textContent = i18n.Pixel || '像素';
    popupPaddingPixelLabel.style.marginLeft = '4px';
    popupPaddingPixelLabel.style.marginRight = '12px';
    popupPaddingPixelLabel.style.fontSize = '14px';
    const popupPaddingPercentRadio = document.createElement('input');
    popupPaddingPercentRadio.type = 'radio';
    popupPaddingPercentRadio.name = 'popupPaddingUnit';
    popupPaddingPercentRadio.id = 'popupPaddingUnitPercent';
    popupPaddingPercentRadio.value = '%';
    popupPaddingPercentRadio.checked = (currentConfig.popupEditorPaddingUnit || 'px') === '%';
    const popupPaddingPercentLabel = document.createElement('label');
    popupPaddingPercentLabel.htmlFor = 'popupPaddingUnitPercent';
    popupPaddingPercentLabel.textContent = i18n.Percentage || '百分比';
    popupPaddingPercentLabel.style.marginLeft = '4px';
    popupPaddingPercentLabel.style.fontSize = '14px';
    popupPaddingUnitContainer.appendChild(popupPaddingPixelRadio);
    popupPaddingUnitContainer.appendChild(popupPaddingPixelLabel);
    popupPaddingUnitContainer.appendChild(popupPaddingPercentRadio);
    popupPaddingUnitContainer.appendChild(popupPaddingPercentLabel);
    popupPaddingInputContainer.appendChild(popupPaddingUnitContainer);
    popupPaddingContainer.appendChild(popupPaddingInputContainer);
    content.appendChild(popupWidthContainer);
    content.appendChild(popupPaddingContainer);
    independentWindowSwitch.addEventListener('change', () => {
        const isChecked = independentWindowSwitch.checked;
        independentWidthContainer.style.display = isChecked ? 'flex' : 'none';
        independentPaddingContainer.style.display = isChecked ? 'flex' : 'none';
    });
    popupWindowSwitch.addEventListener('change', () => {
        const isChecked = popupWindowSwitch.checked;
        popupWidthContainer.style.display = isChecked ? 'flex' : 'none';
        popupPaddingContainer.style.display = isChecked ? 'flex' : 'none';
    });
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
        const independentWidthValue = independentWidthInput.value.trim();
        const independentPaddingValue = independentPaddingInput.value.trim();
        if (!paddingValue || isNaN(paddingValue) || parseInt(paddingValue) < 0) {
            await showNotification(i18n.editorPaddingRequired || '必须设置编辑器内边距');
            return;
        }
        if (independentWindowSwitch.checked) {
            if (!independentPaddingValue || isNaN(independentPaddingValue) || parseInt(independentPaddingValue) < 0) {
                await showNotification(i18n.independentPaddingRequired || '必须设置独立窗口内边距');
                return;
            }
        }
        if (popupWindowSwitch.checked) {
            if (!popupPaddingInput.value.trim() || isNaN(popupPaddingInput.value.trim()) || parseInt(popupPaddingInput.value.trim()) < 0) {
                await showNotification(i18n.popupPaddingRequired || '必须设置弹出窗口内边距');
                return;
            }
        }
        const newConfig = {
            editorWidth: widthValue ? parseInt(widthValue) : null,
            editorPadding: parseInt(paddingValue),
            editorWidthUnit: document.querySelector('input[name="widthUnit"]:checked')?.value || 'px',
            editorPaddingUnit: document.querySelector('input[name="paddingUnit"]:checked')?.value || 'px',
            popupWindow: popupWindowSwitch.checked,
            popupEditorWidth: popupWindowSwitch.checked ? parseInt(popupWidthInput.value.trim()) : null,
            popupEditorWidthUnit: document.querySelector('input[name="popupWidthUnit"]:checked')?.value || 'px',
            popupEditorPadding: popupWindowSwitch.checked ? parseInt(popupPaddingInput.value.trim()) : 16,
            popupEditorPaddingUnit: document.querySelector('input[name="popupPaddingUnit"]:checked')?.value || 'px',
            independentWindow: independentWindowSwitch.checked,
            independentEditorWidth: independentWidthValue ? parseInt(independentWidthValue) : null,
            independentEditorWidthUnit: document.querySelector('input[name="independentWidthUnit"]:checked')?.value || 'px',
            independentEditorPadding: independentPaddingValue ? parseInt(independentPaddingValue) : 16,
            independentPaddingUnit: document.querySelector('input[name="independentPaddingUnit"]:checked')?.value || 'px'
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
