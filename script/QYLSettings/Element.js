import ThemeMode from '../basic/ThemeMode.js';
import i18n from '../../i18n/i18n.js';
import { smartToggleButtonState, getButtonState, setButtonState, flushBatchUpdate } from '../basic/Storage.js';
import { getStorageItem, getStorageConfig } from '../basic/GetStorage.js';
import excluSetting from './ExcluSetting.js';
import bindSetting from './BindSettings.js';
let QYLAttrModule = null;
let customFontStyleModule = null;
let blockFullWidthModule = null;
let globalStyleModule = null;
async function loadQYLAttrModule() {
    if (!QYLAttrModule) {
        try {
            QYLAttrModule = await import('../QYLAttr/QYLAttrMain.js');
        } catch (error) {
        }
    }
    return QYLAttrModule;
}
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
async function loadBlockFullWidthModule() {
    if (!blockFullWidthModule) {
        try {
            blockFullWidthModule = await import('../element/BlockFullWidth.js');
        } catch (error) {
        }
    }
    return blockFullWidthModule;
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
async function enableQYLAttr() {
    const module = await loadQYLAttrModule();
    if (module && module.default) {
        const QYLAttrClass = module.default;
        const QYLAttrInstance = new QYLAttrClass();
        QYLAttrInstance.init();
        window.QYLAttrInstance = QYLAttrInstance;
    }
}
async function disableQYLAttr() {
    if (window.QYLAttrInstance) {
        window.QYLAttrInstance.cleanup();
        window.QYLAttrInstance = null;
    }
    try {
        const { cleanupCustomCSS } = await import('../QYLAttr/CustomCSS.js');
        cleanupCustomCSS();
    } catch (error) {
    }
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
async function enableBlockFullWidth() {
    const module = await loadBlockFullWidthModule();
    if (module && module.initBlockFullWidth) {
        module.initBlockFullWidth();
    }
}
async function disableBlockFullWidth() {
    const module = await loadBlockFullWidthModule();
    if (module && module.cleanupBlockFullWidth) {
        module.cleanupBlockFullWidth();
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
            id: 'QYLAttrOn',
            label: i18n.QYLAttrOn || '启用QYL自定义属性样式'
        },
        {
            id: 'CustomFontStyle',
            label: i18n.CustomFontStyle || '自定义文字样式'
        },
        {
            id: 'BlockFullWidth',
            label: i18n.BlockFullWidth || '启用块全宽显示'
        },
        {
            id: 'GlobalStyle',
            label: i18n.GlobalStyle || '全局样式设置'
        }
    ];
    const darkModeOptions = [
        {
            id: 'QYLAttrOn',
            label: i18n.QYLAttrOn || '启用QYL自定义属性样式'
        },
        {
            id: 'CustomFontStyle',
            label: i18n.CustomFontStyle || '自定义文字样式'
        },
        {
            id: 'BlockFullWidth',
            label: i18n.BlockFullWidth || '启用块全宽显示'
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
            if (option.id === 'QYLAttrOn') {
                if (newState) {
                    await enableQYLAttr();
                } else {
                    await disableQYLAttr();
                }
            } else if (option.id === 'CustomFontStyle') {
                if (newState) {
                    await enableCustomFontStyle();
                } else {
                    await disableCustomFontStyle();
                }
            } else if (option.id === 'BlockFullWidth') {
                if (newState) {
                    await enableBlockFullWidth();
                } else {
                    await disableBlockFullWidth();
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
                    const currentState = config[option.id] || false;
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
                        const currentState = config[option.id] || false;
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
                    const currentState = config[option.id] || false;
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
                        const currentState = config[option.id] || false;
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
        if (option.id === 'QYLAttrOn') {
            if (currentState) {
                await enableQYLAttr();
            }
        } else if (option.id === 'CustomFontStyle') {
            if (currentState) {
                await enableCustomFontStyle();
            }
        } else if (option.id === 'BlockFullWidth') {
            if (currentState) {
                await enableBlockFullWidth();
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
    enableBlockFullWidth,
    disableBlockFullWidth,
    enableGlobalStyle,
    disableGlobalStyle
};
