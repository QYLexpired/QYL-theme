import ThemeMode from '../basic/ThemeMode.js';
import i18n from '../../i18n/i18n.js';
import { smartToggleButtonState, getButtonState, setButtonState, flushBatchUpdate } from '../basic/Storage.js';
import { getStorageItem, getStorageConfig } from '../basic/GetStorage.js';
import excluSetting from './ExcluSetting.js';
import bindSetting from './BindSettings.js';
let customFontStyleModule = null;
let globalStyleModule = null;
async function loadCustomFontStyleModule() {
    if (!customFontStyleModule) {
        try {
            if (!window.Pickr) {
                await import('../basic/Pickr.min.js');
            }
            customFontStyleModule = await import('../element/CustomFontStyle.js');
        } catch (error) {
        }
    }
    return customFontStyleModule;
}
async function loadGlobalStyleModule() {
    if (!globalStyleModule) {
        try {
            globalStyleModule = await import('../element/GlobalStyle.js');
        } catch (error) {
        }
    }
    return globalStyleModule;
}
async function enableCustomFontStyle() {
    const module = await loadCustomFontStyleModule();
    if (module && module.initCustomFontStyle) {
        await module.initCustomFontStyle();
    }
}
async function disableCustomFontStyle() {
    const module = await loadCustomFontStyleModule();
    if (module && module.removeCustomFontStyle) {
        module.removeCustomFontStyle();
    }
}
async function enableGlobalStyle() {
    const module = await loadGlobalStyleModule();
    if (module && module.initGlobalStyle) {
        module.initGlobalStyle();
    }
}
async function disableGlobalStyle() {
    const module = await loadGlobalStyleModule();
    if (module && module.removeGlobalStyle) {
        module.removeGlobalStyle();
    }
}
function getElementOptions() {
    const currentMode = ThemeMode.getThemeMode();
    const lightModeOptions = [
        {
            id: 'CustomFontStyle',
            label: i18n.CustomFontStyle || '自定义文字样式'
        },
        {
            id: 'GlobalStyle',
            label: i18n.GlobalStyle || '全局样式设置'
        }
    ];
    const darkModeOptions = [
        {
            id: 'CustomFontStyle',
            label: i18n.CustomFontStyle || '自定义文字样式'
        },
        {
            id: 'GlobalStyle',
            label: i18n.GlobalStyle || '全局样式设置'
        }
    ];
    return currentMode === 'dark' ? darkModeOptions : lightModeOptions;
}
async function createElementContent(config = null) {
    const container = document.createElement('div');
    container.className = 'QYL-element-container';
    const options = getElementOptions();
    if (!config) {
        config = await getStorageConfig();
    }
    for (const option of options) {
        const optionElement = document.createElement('div');
        optionElement.className = 'QYL-element-option';
        const currentState = config[option.id] || false;
        const selectKey = `QYLSettingsSelect_${option.id}`;
        const selectState = config[selectKey] !== undefined ? config[selectKey] : true; 
        if (!selectState) {
            optionElement.classList.add('hidden');
        }
        const hasRightClick = ['CustomFontStyle', 'GlobalStyle'].includes(option.id);
        const rightClickClass = hasRightClick ? 'QYLButtonRightClick' : '';
        optionElement.innerHTML = `
            <button type="button" id="${option.id}" class="QYL-element-button ${currentState ? 'active' : ''} ${rightClickClass}">
                ${option.label}
            </button>
        `;
        const button = optionElement.querySelector(`#${option.id}`);
        button.addEventListener('click', async () => {
            const newState = await smartToggleButtonState(option.id);
            button.classList.toggle('active', newState);
            if (newState) {
            }
            if (option.id === 'CustomFontStyle') {
                if (newState) {
                    await enableCustomFontStyle();
                } else {
                    await disableCustomFontStyle();
                }
            } else if (option.id === 'GlobalStyle') {
                if (newState) {
                    await enableGlobalStyle();
                } else {
                    await disableGlobalStyle();
                }
            }
            await flushBatchUpdate();
        });
        if (option.id === 'CustomFontStyle') {
            const handleRightClick = async (event) => {
                if (event.button === 2) { 
                    event.preventDefault();
                    event.stopPropagation();
                    const currentConfig = await getStorageConfig();
                    const currentState = currentConfig[option.id] || false;
                    if (!currentState) {
                        return; 
                    }
                    try {
                        const { showCustomFontStyleDialog } = await import('../element/CustomFontStyle.js');
                        showCustomFontStyleDialog();
                    } catch (error) {
                    }
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
                        const currentConfig = await getStorageConfig();
                        const currentState = currentConfig[option.id] || false;
                        if (!currentState) {
                            return; 
                        }
                        try {
                            const { showCustomFontStyleDialog } = await import('../element/CustomFontStyle.js');
                            showCustomFontStyleDialog();
                        } catch (error) {
                        }
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
            button.addEventListener('contextmenu', handleRightClick);
            button.addEventListener('touchstart', handleTouchStart, { passive: false });
            button.addEventListener('touchend', handleTouchEnd);
            button.addEventListener('touchmove', handleTouchMove);
            button.addEventListener('touchcancel', handleTouchEnd);
        } else if (option.id === 'GlobalStyle') {
            const handleRightClick = async (event) => {
                if (event.button === 2) { 
                    event.preventDefault();
                    event.stopPropagation();
                    const currentConfig = await getStorageConfig();
                    const currentState = currentConfig[option.id] || false;
                    if (!currentState) {
                        return; 
                    }
                    try {
                        const { showGlobalStyleDialog } = await import('../element/GlobalStyle.js');
                        showGlobalStyleDialog();
                    } catch (error) {
                    }
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
                        const currentConfig = await getStorageConfig();
                        const currentState = currentConfig[option.id] || false;
                        if (!currentState) {
                            return; 
                        }
                        try {
                            const { showGlobalStyleDialog } = await import('../element/GlobalStyle.js');
                            showGlobalStyleDialog();
                        } catch (error) {
                        }
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
            button.addEventListener('contextmenu', handleRightClick);
            button.addEventListener('touchstart', handleTouchStart, { passive: false });
            button.addEventListener('touchend', handleTouchEnd);
            button.addEventListener('touchmove', handleTouchMove);
            button.addEventListener('touchcancel', handleTouchEnd);
        }
        container.appendChild(optionElement);
    }
    return container;
}
async function initializeElementStates(config = null) {
    const options = getElementOptions();
    if (!config) {
        config = await getStorageConfig();
    }
    for (const option of options) {
        const currentState = config[option.id] || false;
        if (option.id === 'CustomFontStyle') {
            if (currentState) {
                await enableCustomFontStyle();
            }
        } else if (option.id === 'GlobalStyle') {
            if (currentState) {
                await enableGlobalStyle();
            }
        }
    }
}
export { 
    getElementOptions, 
    createElementContent, 
    initializeElementStates,
    enableCustomFontStyle,
    disableCustomFontStyle,
    enableGlobalStyle,
    disableGlobalStyle
};
