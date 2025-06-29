import ThemeMode from '../basic/ThemeMode.js';
import i18n from '../../i18n/i18n.js';
import { toggleButtonState, getButtonState, setButtonState } from '../basic/Storage.js';
import { getStorageItem } from '../basic/GetStorage.js';
let fileTreeIndentModule = null;
let frostedGlassModule = null;
let animationModule = null;
let colorfulFileTreeModule = null;
let borderFileTreeModule = null;
let gridSearchListModule = null;
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
function getStyleOptions() {
    return [
        { id: 'FileTreeIndent', label: i18n.FileTreeIndent || '文档树缩进线' },
        { id: 'FrostedGlass', label: i18n.FrostedGlass || '毛玻璃效果' },
        { id: 'Animation', label: i18n.Animation || '主题动画' },
        { id: 'ColorfulFileTree', label: i18n.ColorfulFileTree || '多彩文档树' },
        { id: 'BorderFileTree', label: i18n.BorderFileTree || '边框化文档树' },
        { id: 'GridSearchList', label: i18n.GridSearchList || '网格化搜索列表' },
    ];
}
async function createStyleContent() {
    const container = document.createElement('div');
    container.className = 'QYL-style-container';
    const options = getStyleOptions();
    for (const option of options) {
        const optionElement = document.createElement('div');
        optionElement.className = 'QYL-style-option';
        const currentState = await getStorageItem(option.id, false);
        optionElement.innerHTML = `
            <button type="button" id="${option.id}" class="QYL-style-button ${currentState ? 'active' : ''}">
                ${option.label}
            </button>
        `;
        const button = optionElement.querySelector(`#${option.id}`);
        button.addEventListener('click', async () => {
            const newState = await toggleButtonState(option.id);
            button.classList.toggle('active', newState);
            if (option.id === 'FileTreeIndent') {
                if (newState) {
                    await enableFileTreeIndent();
                } else {
                    await disableFileTreeIndent();
                }
            } else if (option.id === 'FrostedGlass') {
                if (newState) {
                    await enableFrostedGlass();
                } else {
                    await disableFrostedGlass();
                }
            } else if (option.id === 'Animation') {
                if (newState) {
                    await enableAnimation();
                } else {
                    await disableAnimation();
                }
            } else if (option.id === 'ColorfulFileTree') {
                if (newState) {
                    await enableColorfulFileTree();
                } else {
                    await disableColorfulFileTree();
                }
            } else if (option.id === 'BorderFileTree') {
                if (newState) {
                    await enableBorderFileTree();
                } else {
                    await disableBorderFileTree();
                }
            } else if (option.id === 'GridSearchList') {
                if (newState) {
                    await enableGridSearchList();
                } else {
                    await disableGridSearchList();
                }
            }
        });
        container.appendChild(optionElement);
    }
    return container;
}
async function initializeStyleStates() {
    const options = getStyleOptions();
    for (const option of options) {
        const currentState = await getStorageItem(option.id, false);
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
        }
    }
}
export {
    getStyleOptions,
    createStyleContent,
    initializeStyleStates
};
