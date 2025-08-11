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
export const createQYLSettingsHiddenWindow = async () => {
    const existingWindow = document.querySelector('[data-key="QYLSettingsHidden"]');
    if (existingWindow) {
        existingWindow.remove();
    }
    const dialogContainer = document.createElement('div');
    dialogContainer.setAttribute('data-key', 'QYLSettingsHidden');
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
    const header = document.createElement('div');
    header.className = 'b3-dialog__header';
    header.textContent = i18n.QYLSettingsHiddenWindow;
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    let hasMoved = false;
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
    dialogContainer._mousemoveHandler = mousemoveHandler;
    dialogContainer._mouseupHandler = mouseupHandler;
    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
    const body = document.createElement('div');
    body.className = 'b3-dialog__body';
    const content = document.createElement('div');
    content.className = 'b3-dialog__content';
    const tipElement = document.createElement('div');
    tipElement.className = 'QYL-settings-hidden-tip';
    tipElement.innerHTML = i18n.QYLSettingsHiddenTip.replace(/\n/g, '<br>');
    content.appendChild(tipElement);
    const createOptionSection = async (title, options) => {
        const section = document.createElement('div');
        section.className = 'QYL-option-section';
        const sectionTitle = document.createElement('h4');
        sectionTitle.textContent = title;
        section.appendChild(sectionTitle);
        const optionsGrid = document.createElement('div');
        for (const option of options) {
            const optionButton = document.createElement('button');
            optionButton.className = 'QYL-option-button';
            optionButton.textContent = option.label;
            let isSelected = true; 
            try {
                const configContent = await getFile('/conf/QYL-Config.json');
                if (configContent) {
                    const config = JSON.parse(configContent);
                    const configKey = `QYLSettingsSelect_${option.id}`;
                    isSelected = config[configKey] !== undefined ? config[configKey] : true;
                }
            } catch (error) {
                isSelected = true;
            }
            if (isSelected) {
                optionButton.classList.add('selected');
            }
            optionButton.addEventListener('click', () => {
                optionButton.classList.toggle('selected');
            });
            optionsGrid.appendChild(optionButton);
        }
        section.appendChild(optionsGrid);
        return section;
    };
    const layoutOptions = [
        { id: 'VerticalTab', label: i18n.VerticalTab },
        { id: 'FusionOn', label: i18n.FusionOn },
        { id: 'HideTopBar', label: i18n.HideTopBar },
        { id: 'ColorBlock', label: i18n.ColorBlock },
        { id: 'FullHeightLayout', label: i18n.FullHeightLayout },
        { id: 'HideTab', label: i18n.HideTab }
    ];
    const functionOptions = [
        { id: 'MarktoBlank', label: i18n.MarktoBlank },
        { id: 'EditorFullWidth', label: i18n.EditorFullWidth },
        { id: 'FocusBlockHighlight', label: i18n.FocusBlockHighlight },
        { id: 'HoverBlockHighlight', label: i18n.HoverBlockHighlight },
        { id: 'SuperBlockHighlight', label: i18n.SuperBlockHighlight },
        { id: 'ListBullet', label: i18n.ListBullet },
        { id: 'FixedTool', label: i18n.FixedTool },
        { id: 'FocusEditing', label: i18n.FocusEditing },
        { id: 'SideMemo', label: i18n.SideMemo },
        { id: 'ImgMask', label: i18n.ImgMask }
    ];
    const elementOptions = [
        { id: 'ColorfulHeading', label: i18n.ColorfulHeading },
        { id: 'QYLAttrOn', label: i18n.QYLAttrOn },
        { id: 'NineGridSquares', label: i18n.NineGridSquares },
        { id: 'MultilevelList', label: i18n.MultilevelList },
        { id: 'ColorfulTags', label: i18n.ColorfulTags },
        { id: 'LinkStyle', label: i18n.LinkStyle },
        { id: 'CustomFontStyle', label: i18n.CustomFontStyle }
    ];
    const styleOptions = [
        { id: 'FileTreeIndent', label: i18n.FileTreeIndent },
        { id: 'FrostedGlass', label: i18n.FrostedGlass },
        { id: 'Animation', label: i18n.Animation },
        { id: 'ColorfulFileTree', label: i18n.ColorfulFileTree },
        { id: 'BorderFileTree', label: i18n.BorderFileTree },
        { id: 'GridSearchList', label: i18n.GridSearchList },
        { id: 'FlatStyle', label: i18n.FlatStyle },
        { id: 'InkMode', label: i18n.InkMode },
        { id: 'ColorfulTabs', label: i18n.ColorfulTabs }
    ];
    const layoutSection = await createOptionSection(i18n.Layout, layoutOptions);
    const styleSection = await createOptionSection(i18n.Style, styleOptions);
    const functionSection = await createOptionSection(i18n.Function, functionOptions);
    const elementSection = await createOptionSection(i18n.Element, elementOptions);
    content.appendChild(layoutSection);
    content.appendChild(styleSection);
    content.appendChild(functionSection);
    content.appendChild(elementSection);
    const action = document.createElement('div');
    action.className = 'b3-dialog__action';
    const cancelButton = document.createElement('button');
    cancelButton.className = 'b3-button b3-button--cancel';
    cancelButton.textContent = i18n.cancel;
    const space = document.createElement('div');
    space.className = 'fn__space';
    const confirmButton = document.createElement('button');
    confirmButton.className = 'b3-button b3-button--text';
    confirmButton.textContent = i18n.saveandrefresh; 
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
            removeQYLSettingsHiddenWindow();
        }
    });
    cancelButton.addEventListener('click', () => {
        removeQYLSettingsHiddenWindow();
    });
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            removeQYLSettingsHiddenWindow();
            document.removeEventListener('keydown', handleKeyDown);
        }
    };
    document.addEventListener('keydown', handleKeyDown);
    dialogContainer._keydownHandler = handleKeyDown;
    confirmButton.addEventListener('click', async () => {
        const config = {};
        const existingConfigContent = await getFile('/conf/QYL-Config.json');
        let existingConfig = {};
        if (existingConfigContent) {
            try {
                existingConfig = JSON.parse(existingConfigContent);
            } catch (error) {
            }
        }
        const optionButtons = dialogContainer.querySelectorAll('.QYL-option-button');
        for (const button of optionButtons) {
            const buttonText = button.textContent;
            let optionId = null;
            const allOptions = [...layoutOptions, ...styleOptions, ...functionOptions, ...elementOptions];
            const option = allOptions.find(opt => opt.label === buttonText);
            if (option) {
                optionId = option.id;
                const isSelected = button.classList.contains('selected');
                config[`QYLSettingsSelect_${optionId}`] = isSelected;
                const previousSelectState = existingConfig[`QYLSettingsSelect_${optionId}`] !== undefined ? 
                    existingConfig[`QYLSettingsSelect_${optionId}`] : true;
                if (isSelected !== previousSelectState) {
                    if (!isSelected) {
                        config[optionId] = false;
                    }
                }
            }
        }
        const mergedConfig = { ...existingConfig, ...config };
        try {
            await putFile('/conf/QYL-Config.json', JSON.stringify(mergedConfig, null, 2));
            reloadUI();
        } catch (error) {
        }
    });
    return dialogContainer;
};
export const removeQYLSettingsHiddenWindow = () => {
    const existingWindow = document.querySelector('[data-key="QYLSettingsHidden"]');
    if (existingWindow) {
        const mousemoveHandler = existingWindow._mousemoveHandler;
        const mouseupHandler = existingWindow._mouseupHandler;
        const keydownHandler = existingWindow._keydownHandler;
        if (mousemoveHandler) {
            document.removeEventListener('mousemove', mousemoveHandler);
        }
        if (mouseupHandler) {
            document.removeEventListener('mouseup', mouseupHandler);
        }
        if (keydownHandler) {
            document.removeEventListener('keydown', keydownHandler);
        }
        existingWindow.remove();
    }
};
export const addRightClickListener = (element) => {
    if (!element) return;
    const handleRightClick = async (event) => {
        if (event.button === 2) { 
            event.preventDefault();
            event.stopPropagation();
            const window = await createQYLSettingsHiddenWindow();
            document.body.appendChild(window);
        }
    };
    let longPressTimer = null;
    const longPressDelay = 500; 
    let hasMoved = false;
    const handleTouchStart = (event) => {
        hasMoved = false;
        longPressTimer = setTimeout(async () => {
            if (!hasMoved) {
                event.preventDefault();
                event.stopPropagation();
                const window = await createQYLSettingsHiddenWindow();
                document.body.appendChild(window);
            }
        }, longPressDelay);
    };
    const handleTouchEnd = (event) => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
        hasMoved = false;
    };
    const handleTouchMove = (event) => {
        hasMoved = true;
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
    };
    element.addEventListener('contextmenu', handleRightClick);
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchcancel', handleTouchEnd);
};
