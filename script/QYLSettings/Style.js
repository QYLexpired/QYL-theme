import ThemeMode from '../basic/ThemeMode.js';
import i18n from '../../i18n/i18n.js';
import { smartToggleButtonState, getButtonState, setButtonState, flushBatchUpdate } from '../basic/Storage.js';
import { getStorageItem, getStorageConfig } from '../basic/GetStorage.js';
import excluSetting from './ExcluSetting.js';
let fileTreeIndentModule = null;
let frostedGlassModule = null;
let animationModule = null;
let colorfulFileTreeModule = null;
let borderFileTreeModule = null;
let gridSearchListModule = null;
let flatStyleModule = null;
let inkModeModule = null;
let colorfulTabsModule = null;
async function loadFileTreeIndentModule() {
    if (!fileTreeIndentModule) {
        try {
            fileTreeIndentModule = await import('../style/FileTreeIndent.js');
        } catch (error) {
        }
    }
    return fileTreeIndentModule;
}
async function loadFrostedGlassModule() {
    if (!frostedGlassModule) {
        try {
            frostedGlassModule = await import('../style/FrostedGlass.js');
        } catch (error) {
        }
    }
    return frostedGlassModule;
}
async function loadAnimationModule() {
    if (!animationModule) {
        try {
            animationModule = await import('../style/Animation.js');
        } catch (error) {
        }
    }
    return animationModule;
}
async function loadColorfulFileTreeModule() {
    if (!colorfulFileTreeModule) {
        try {
            colorfulFileTreeModule = await import('../style/ColorfulFileTree.js');
        } catch (error) {
        }
    }
    return colorfulFileTreeModule;
}
async function loadBorderFileTreeModule() {
    if (!borderFileTreeModule) {
        try {
            borderFileTreeModule = await import('../style/BorderFileTree.js');
        } catch (error) {
        }
    }
    return borderFileTreeModule;
}
async function loadGridSearchListModule() {
    if (!gridSearchListModule) {
        try {
            gridSearchListModule = await import('../style/GridSearchList.js');
        } catch (error) {
        }
    }
    return gridSearchListModule;
}
async function loadFlatStyleModule() {
    if (!flatStyleModule) {
        try {
            flatStyleModule = await import('../style/FlatStyle.js');
        } catch (error) {
        }
    }
    return flatStyleModule;
}
async function loadInkModeModule() {
    if (!inkModeModule) {
        try {
            inkModeModule = await import('../style/InkMode.js');
        } catch (error) {
        }
    }
    return inkModeModule;
}
async function loadColorfulTabsModule() {
    if (!colorfulTabsModule) {
        try {
            colorfulTabsModule = await import('../style/ColorfulTabs.js');
        } catch (error) {
        }
    }
    return colorfulTabsModule;
}
async function enableFileTreeIndent() {
    const module = await loadFileTreeIndentModule();
    if (module && module.initFileTreeIndent) {
        module.initFileTreeIndent();
    }
}
async function disableFileTreeIndent() {
    const module = await loadFileTreeIndentModule();
    if (module && module.removeFileTreeIndent) {
        module.removeFileTreeIndent();
    }
}
async function enableFrostedGlass() {
    const module = await loadFrostedGlassModule();
    if (module && module.initFrostedGlass) {
        module.initFrostedGlass();
    }
}
async function disableFrostedGlass() {
    const module = await loadFrostedGlassModule();
    if (module && module.removeFrostedGlass) {
        module.removeFrostedGlass();
    }
}
async function enableAnimation() {
    const module = await loadAnimationModule();
    if (module && module.initAnimation) {
        module.initAnimation();
    }
}
async function disableAnimation() {
    const module = await loadAnimationModule();
    if (module && module.removeAnimation) {
        module.removeAnimation();
    }
}
async function enableColorfulFileTree() {
    const module = await loadColorfulFileTreeModule();
    if (module && module.initColorfulFileTree) {
        module.initColorfulFileTree();
    }
}
async function disableColorfulFileTree() {
    const module = await loadColorfulFileTreeModule();
    if (module && module.removeColorfulFileTree) {
        module.removeColorfulFileTree();
    }
}
async function enableBorderFileTree() {
    const module = await loadBorderFileTreeModule();
    if (module && module.initBorderFileTree) {
        module.initBorderFileTree();
    }
}
async function disableBorderFileTree() {
    const module = await loadBorderFileTreeModule();
    if (module && module.removeBorderFileTree) {
        module.removeBorderFileTree();
    }
}
async function enableGridSearchList() {
    const module = await loadGridSearchListModule();
    if (module && module.initGridSearchList) {
        module.initGridSearchList();
    }
}
async function disableGridSearchList() {
    const module = await loadGridSearchListModule();
    if (module && module.removeGridSearchList) {
        module.removeGridSearchList();
    }
}
async function enableFlatStyle() {
    const module = await loadFlatStyleModule();
    if (module && module.initFlatStyle) {
        module.initFlatStyle();
    }
}
async function disableFlatStyle() {
    const module = await loadFlatStyleModule();
    if (module && module.removeFlatStyle) {
        module.removeFlatStyle();
    }
}
async function enableInkMode() {
    const module = await loadInkModeModule();
    if (module && module.initInkMode) {
        module.initInkMode();
    }
}
async function disableInkMode() {
    const module = await loadInkModeModule();
    if (module && module.removeInkMode) {
        module.removeInkMode();
    }
}
async function enableColorfulTabs() {
    const module = await loadColorfulTabsModule();
    if (module && module.initColorfultabs) {
        module.initColorfultabs();
    }
}
async function disableColorfulTabs() {
    const module = await loadColorfulTabsModule();
    if (module && module.removeColorfultabs) {
        module.removeColorfultabs();
    }
}
function getStyleOptions() {
    return [
        { id: 'FileTreeIndent', label: i18n.FileTreeIndent || '文档树缩进线' },
        { id: 'FrostedGlass', label: i18n.FrostedGlass || '毛玻璃效果' },
        { id: 'Animation', label: i18n.Animation || '主题动画' },
        { id: 'ColorfulFileTree', label: i18n.ColorfulFileTree || '多彩文档树' },
        { id: 'BorderFileTree', label: i18n.BorderFileTree || '边框化文档树' },
        { id: 'GridSearchList', label: i18n.GridSearchList || '网格化搜索列表' },
        { id: 'FlatStyle', label: i18n.FlatStyle || '扁平化风格' },
        { id: 'InkMode', label: i18n.InkMode || '墨水屏模式' },
        { id: 'ColorfulTabs', label: i18n.ColorfulTabs || '多彩页签' },
    ];
}
async function createStyleContent(config = null) {
    const container = document.createElement('div');
    container.className = 'QYL-style-container';
    const options = getStyleOptions();
    if (!config) {
        config = await getStorageConfig();
    }
    for (const option of options) {
        const optionElement = document.createElement('div');
        optionElement.className = 'QYL-style-option';
        const currentState = config[option.id] || false;
        const selectKey = `QYLSettingsSelect_${option.id}`;
        const selectState = config[selectKey] !== undefined ? config[selectKey] : true; 
        if (!selectState) {
            optionElement.classList.add('hidden');
        }
        optionElement.innerHTML = `
            <button type="button" id="${option.id}" class="QYL-style-button ${currentState ? 'active' : ''}">
                ${option.label}
            </button>
        `;
        const button = optionElement.querySelector(`#${option.id}`);
        button.addEventListener('click', async () => {
            const newState = await smartToggleButtonState(option.id);
            button.classList.toggle('active', newState);
            if (newState) {
                if (['FlatStyle', 'InkMode'].includes(option.id)) {
                    await excluSetting.handleExclusionBatch('styleExclusion', option.id, null, async (disabledId) => {
                        if (disabledId === 'FlatStyle') {
                            await disableFlatStyle();
                        } else if (disabledId === 'InkMode') {
                            await disableInkMode();
                        }
                    });
                }
                if (option.id === 'FileTreeIndent') {
                    await enableFileTreeIndent();
                } else if (option.id === 'FlatStyle') {
                    await enableFlatStyle();
                } else if (option.id === 'FrostedGlass') {
                    await enableFrostedGlass();
                } else if (option.id === 'InkMode') {
                    await enableInkMode();
                } else if (option.id === 'Animation') {
                    await enableAnimation();
                } else if (option.id === 'ColorfulFileTree') {
                    await enableColorfulFileTree();
                } else if (option.id === 'BorderFileTree') {
                    await enableBorderFileTree();
                } else if (option.id === 'GridSearchList') {
                    await enableGridSearchList();
                } else if (option.id === 'ColorfulTabs') {
                    await enableColorfulTabs();
                }
            } else {
                if (option.id === 'FileTreeIndent') {
                    await disableFileTreeIndent();
                } else if (option.id === 'FlatStyle') {
                    await disableFlatStyle();
                } else if (option.id === 'FrostedGlass') {
                    await disableFrostedGlass();
                } else if (option.id === 'InkMode') {
                    await disableInkMode();
                } else if (option.id === 'Animation') {
                    await disableAnimation();
                } else if (option.id === 'ColorfulFileTree') {
                    await disableColorfulFileTree();
                } else if (option.id === 'BorderFileTree') {
                    await disableBorderFileTree();
                } else if (option.id === 'GridSearchList') {
                    await disableGridSearchList();
                } else if (option.id === 'ColorfulTabs') {
                    await disableColorfulTabs();
                }
            }
            await flushBatchUpdate();
        });
        container.appendChild(optionElement);
    }
    return container;
}
async function initializeStyleStates(config = null) {
    const options = getStyleOptions();
    if (!config) {
        config = await getStorageConfig();
    }
    for (const option of options) {
        const currentState = config[option.id] || false;
        if (option.id === 'FileTreeIndent' && currentState) {
            await enableFileTreeIndent();
        } else if (option.id === 'FrostedGlass' && currentState) {
            await enableFrostedGlass();
        } else if (option.id === 'Animation' && currentState) {
            await enableAnimation();
        } else if (option.id === 'ColorfulFileTree' && currentState) {
            await enableColorfulFileTree();
        } else if (option.id === 'BorderFileTree' && currentState) {
            await enableBorderFileTree();
        } else if (option.id === 'GridSearchList' && currentState) {
            await enableGridSearchList();
        } else if (option.id === 'FlatStyle' && currentState) {
            await enableFlatStyle();
        } else if (option.id === 'InkMode' && currentState) {
            await enableInkMode();
        } else if (option.id === 'ColorfulTabs' && currentState) {
            await enableColorfulTabs();
        }
    }
}
export {
    getStyleOptions,
    createStyleContent,
    initializeStyleStates
};
excluSetting.registerGroup('styleExclusion', ['FlatStyle', 'InkMode']);
