import ThemeMode from '../basic/ThemeMode.js';
import i18n from '../../i18n/i18n.js';
import { smartToggleButtonState, getButtonState, setButtonState, flushBatchUpdate } from '../basic/Storage.js';
import { getStorageItem, getStorageConfig } from '../basic/GetStorage.js';
import excluSetting from './ExcluSetting.js';
import bindSetting from './BindSettings.js';
let verticalTabModule = null;
let fusionOnModule = null;
let hideTopBarModule = null;
let colorBlockModule = null;
let fullHeightLayoutModule = null;
let hideTabModule = null;
async function loadVerticalTabModule() {
    if (!verticalTabModule) {
        try {
            verticalTabModule = await import('../layout/VerticalTab.js');
        } catch (error) {
        }
    }
    return verticalTabModule;
}
async function loadFusionOnModule() {
    if (!fusionOnModule) {
        try {
            fusionOnModule = await import('../layout/FusionOn.js');
        } catch (error) {
        }
    }
    return fusionOnModule;
}
async function loadHideTopBarModule() {
    if (!hideTopBarModule) {
        try {
            hideTopBarModule = await import('../layout/HideTopBar.js');
        } catch (error) {
        }
    }
    return hideTopBarModule;
}
async function loadColorBlockModule() {
    if (!colorBlockModule) {
        try {
            colorBlockModule = await import('../layout/ColorBlock.js');
        } catch (error) {
        }
    }
    return colorBlockModule;
}
async function loadFullHeightLayoutModule() {
    if (!fullHeightLayoutModule) {
        try {
            fullHeightLayoutModule = await import('../layout/FullHeightLayout.js');
        } catch (error) {
        }
    }
    return fullHeightLayoutModule;
}
async function loadHideTabModule() {
    if (!hideTabModule) {
        try {
            hideTabModule = await import('../layout/HideTab.js');
        } catch (error) {
        }
    }
    return hideTabModule;
}
async function enableVerticalTab() {
    const module = await loadVerticalTabModule();
    if (module && module.initVerticalTab) {
        module.initVerticalTab();
    }
}
async function disableVerticalTab() {
    const module = await loadVerticalTabModule();
    if (module && module.removeVerticalTab) {
        module.removeVerticalTab();
    }
}
async function enableFusionOn() {
    const module = await loadFusionOnModule();
    if (module && module.initFusionOn) {
        module.initFusionOn();
    }
}
async function disableFusionOn() {
    const module = await loadFusionOnModule();
    if (module && module.removeFusionOn) {
        await module.removeFusionOn();
    }
}
async function enableHideTopBar() {
    const module = await loadHideTopBarModule();
    if (module && module.initHideTopBar) {
        module.initHideTopBar();
    }
}
async function disableHideTopBar() {
    const module = await loadHideTopBarModule();
    if (module && module.removeHideTopBar) {
        module.removeHideTopBar();
    }
}
async function enableColorBlock() {
    const module = await loadColorBlockModule();
    if (module && module.initColorBlock) {
        module.initColorBlock();
    }
}
async function disableColorBlock() {
    const module = await loadColorBlockModule();
    if (module && module.removeColorBlock) {
        module.removeColorBlock();
    }
}
async function enableFullHeightLayout() {
    const module = await loadFullHeightLayoutModule();
    if (module && module.initFullHeightLayout) {
        module.initFullHeightLayout();
    }
}
async function disableFullHeightLayout() {
    const module = await loadFullHeightLayoutModule();
    if (module && module.removeFullHeightLayout) {
        module.removeFullHeightLayout();
    }
}
async function enableHideTab() {
    const module = await loadHideTabModule();
    if (module && module.initHideTab) {
        module.initHideTab();
    }
}
async function disableHideTab() {
    const module = await loadHideTabModule();
    if (module && module.removeHideTab) {
        module.removeHideTab();
    }
}
function getLayoutOptions() {
    const currentMode = ThemeMode.getThemeMode();
    const lightModeOptions = [
        {
            id: 'VerticalTab',
            label: i18n.VerticalTab || '垂直页签'
        },
        {
            id: 'FusionOn',
            label: i18n.FusionOn || '顶栏融合'
        },
        {
            id: 'HideTopBar',
            label: i18n.HideTopBar || '隐藏顶栏'
        },
        {
            id: 'ColorBlock',
            label: i18n.ColorBlock || '撞色式布局'
        },
        {
            id: 'FullHeightLayout',
            label: i18n.FullHeightLayout || '全高界面'
        },
        {
            id: 'HideTab',
            label: i18n.HideTab || '隐藏页签和面包屑'
        }
    ];
    const darkModeOptions = [
        {
            id: 'VerticalTab',
            label: i18n.VerticalTab || '垂直页签'
        },
        {
            id: 'FusionOn',
            label: i18n.FusionOn || '顶栏融合'
        },
        {
            id: 'HideTopBar',
            label: i18n.HideTopBar || '隐藏顶栏'
        },
        {
            id: 'ColorBlock',
            label: i18n.ColorBlock || '撞色式布局'
        },
        {
            id: 'FullHeightLayout',
            label: i18n.FullHeightLayout || '全高界面'
        },
        {
            id: 'HideTab',
            label: i18n.HideTab || '隐藏页签和面包屑'
        }
    ];
    return currentMode === 'dark' ? darkModeOptions : lightModeOptions;
}
async function createLayoutContent(config = null) {
    const container = document.createElement('div');
    container.className = 'QYL-layout-container';
    const options = getLayoutOptions();
    if (!config) {
        config = await getStorageConfig();
    }
    for (const option of options) {
        const optionElement = document.createElement('div');
        optionElement.className = 'QYL-layout-option';
        const currentState = config[option.id] || false;
        const selectKey = `QYLSettingsSelect_${option.id}`;
        const selectState = config[selectKey] !== undefined ? config[selectKey] : true; 
        if (!selectState) {
            optionElement.classList.add('hidden');
        }
        optionElement.innerHTML = `
            <button type="button" id="${option.id}" class="QYL-layout-button ${currentState ? 'active' : ''}">
                ${option.label}
            </button>
        `;
        const button = optionElement.querySelector(`#${option.id}`);
        button.addEventListener('click', async () => {
            const newState = await smartToggleButtonState(option.id);
            button.classList.toggle('active', newState);
            if (newState) {
                if (['VerticalTab', 'FusionOn'].includes(option.id)) {
                    await excluSetting.handleExclusionBatch('verticalFusionGroup', option.id, null, async (disabledId) => {
                        if (disabledId === 'VerticalTab') {
                            await disableVerticalTab();
                        } else if (disabledId === 'FusionOn') {
                            await disableFusionOn();
                        }
                    });
                }
                if (['FusionOn', 'HideTopBar'].includes(option.id)) {
                    await excluSetting.handleExclusionBatch('fusionHideGroup', option.id, null, async (disabledId) => {
                        if (disabledId === 'FusionOn') {
                            await disableFusionOn();
                        } else if (disabledId === 'HideTopBar') {
                            await disableHideTopBar();
                        }
                    });
                }
                if (['ColorBlock', 'VerticalTab'].includes(option.id)) {
                    await excluSetting.handleExclusionBatch('colorBlockVerticalGroup', option.id, null, async (disabledId) => {
                        if (disabledId === 'ColorBlock') {
                            await disableColorBlock();
                        } else if (disabledId === 'VerticalTab') {
                            await disableVerticalTab();
                        }
                    });
                }
                if (['ColorBlock', 'HideTopBar'].includes(option.id)) {
                    await excluSetting.handleExclusionBatch('colorBlockHideTopBarGroup', option.id, null, async (disabledId) => {
                        if (disabledId === 'ColorBlock') {
                            await disableColorBlock();
                        } else if (disabledId === 'HideTopBar') {
                            await disableHideTopBar();
                        }
                    });
                }
                if (['FullHeightLayout', 'VerticalTab'].includes(option.id)) {
                    await excluSetting.handleExclusionBatch('fullHeightVerticalGroup', option.id, null, async (disabledId) => {
                        if (disabledId === 'FullHeightLayout') {
                            await disableFullHeightLayout();
                        } else if (disabledId === 'VerticalTab') {
                            await disableVerticalTab();
                        }
                    });
                }
                if (['HideTab', 'VerticalTab'].includes(option.id)) {
                    await excluSetting.handleExclusionBatch('hideTabVerticalGroup', option.id, null, async (disabledId) => {
                        if (disabledId === 'HideTab') {
                            await disableHideTab();
                        } else if (disabledId === 'VerticalTab') {
                            await disableVerticalTab();
                        }
                    });
                }
                if (['HideTab', 'FullHeightLayout'].includes(option.id)) {
                    await excluSetting.handleExclusionBatch('hideTabFullHeightGroup', option.id, null, async (disabledId) => {
                        if (disabledId === 'HideTab') {
                            await disableHideTab();
                        } else if (disabledId === 'FullHeightLayout') {
                            await disableFullHeightLayout();
                        }
                    });
                }
                if (option.id === 'ColorBlock') {
                    await bindSetting.handleBindingBatch('colorBlockFusionGroup', 'ColorBlock', async (buttonId) => {
                        if (buttonId === 'FusionOn') {
                            await enableFusionOn();
                        }
                    });
                }
                if (option.id === 'HideTab') {
                    await enableHideTab();
                } else if (option.id === 'HideTopBar') {
                    await enableHideTopBar();
                } else if (option.id === 'VerticalTab') {
                    await enableVerticalTab();
                } else if (option.id === 'FullHeightLayout') {
                    await enableFullHeightLayout();
                } else if (option.id === 'ColorBlock') {
                    await enableColorBlock();
                } else if (option.id === 'FusionOn') {
                    await enableFusionOn();
                }
            } else {
                if (option.id === 'FusionOn') {
                    await bindSetting.handleUnbindingBatch('colorBlockFusionGroup', 'FusionOn', async (buttonId) => {
                        if (buttonId === 'ColorBlock') {
                            await disableColorBlock();
                        }
                    });
                }
                if (option.id === 'HideTab') {
                    await disableHideTab();
                } else if (option.id === 'HideTopBar') {
                    await disableHideTopBar();
                } else if (option.id === 'VerticalTab') {
                    await disableVerticalTab();
                } else if (option.id === 'FullHeightLayout') {
                    await disableFullHeightLayout();
                } else if (option.id === 'ColorBlock') {
                    await disableColorBlock();
                } else if (option.id === 'FusionOn') {
                    await disableFusionOn();
                }
            }
            await flushBatchUpdate();
        });
        container.appendChild(optionElement);
    }
    return container;
}
async function initializeLayoutStates(config = null) {
    const options = getLayoutOptions();
    if (!config) {
        config = await getStorageConfig();
    }
    let verticalTabState = config['VerticalTab'] || false;
    let fusionOnState = config['FusionOn'] || false;
    let hideTopBarState = config['HideTopBar'] || false;
    let colorBlockState = config['ColorBlock'] || false;
    let fullHeightLayoutState = config['FullHeightLayout'] || false;
    let hideTabState = config['HideTab'] || false;
    let needSave = false;
    if (verticalTabState && fusionOnState) {
        fusionOnState = false;
        config['FusionOn'] = false;
        needSave = true;
    }
    if (fusionOnState && hideTopBarState) {
        hideTopBarState = false;
        config['HideTopBar'] = false;
        needSave = true;
    }
    if (colorBlockState && !fusionOnState) {
        fusionOnState = true;
        config['FusionOn'] = true;
        needSave = true;
    }
    if (!fusionOnState && colorBlockState) {
        colorBlockState = false;
        config['ColorBlock'] = false;
        needSave = true;
    }
    if (fullHeightLayoutState && verticalTabState) {
        verticalTabState = false;
        config['VerticalTab'] = false;
        needSave = true;
    }
    if (hideTabState && verticalTabState) {
        verticalTabState = false;
        config['VerticalTab'] = false;
        needSave = true;
    }
    if (hideTabState && fullHeightLayoutState) {
        fullHeightLayoutState = false;
        config['FullHeightLayout'] = false;
        needSave = true;
    }
    if (needSave) {
        const { saveConfig } = await import('../basic/Storage.js');
        await saveConfig(config);
    }
    for (const option of options) {
        let currentState = false;
        if (option.id === 'VerticalTab') {
            currentState = verticalTabState;
        } else if (option.id === 'FusionOn') {
            currentState = fusionOnState;
        } else if (option.id === 'HideTopBar') {
            currentState = hideTopBarState;
        } else if (option.id === 'ColorBlock') {
            currentState = colorBlockState;
        } else if (option.id === 'FullHeightLayout') {
            currentState = fullHeightLayoutState;
        } else if (option.id === 'HideTab') {
            currentState = hideTabState;
        }
        if (option.id === 'VerticalTab') {
            if (currentState) {
                await enableVerticalTab();
            } else {
                await disableVerticalTab();
            }
        } else if (option.id === 'FusionOn') {
            if (currentState) {
                await enableFusionOn();
            } else {
                await disableFusionOn();
            }
        } else if (option.id === 'HideTopBar') {
            if (currentState) {
                await enableHideTopBar();
            } else {
                await disableHideTopBar();
            }
        } else if (option.id === 'ColorBlock') {
            if (currentState) {
                await enableColorBlock();
            } else {
                await disableColorBlock();
            }
        } else if (option.id === 'FullHeightLayout') {
            if (currentState) {
                await enableFullHeightLayout();
            } else {
                await disableFullHeightLayout();
            }
        } else if (option.id === 'HideTab') {
            if (currentState) {
                await enableHideTab();
            } else {
                await disableHideTab();
            }
        }
    }
}
excluSetting.registerGroup('verticalFusionGroup', ['VerticalTab', 'FusionOn']);
excluSetting.registerGroup('fusionHideGroup', ['FusionOn', 'HideTopBar']);
excluSetting.registerGroup('colorBlockVerticalGroup', ['ColorBlock', 'VerticalTab']);
excluSetting.registerGroup('colorBlockHideTopBarGroup', ['ColorBlock', 'HideTopBar']);
excluSetting.registerGroup('fullHeightVerticalGroup', ['FullHeightLayout', 'VerticalTab']);
excluSetting.registerGroup('hideTabVerticalGroup', ['HideTab', 'VerticalTab']);
excluSetting.registerGroup('hideTabFullHeightGroup', ['HideTab', 'FullHeightLayout']);
bindSetting.registerGroup('colorBlockFusionGroup', 'ColorBlock', ['FusionOn']);
export { getLayoutOptions, createLayoutContent, initializeLayoutStates };
