import ThemeMode from '../basic/ThemeMode.js';
import i18n from '../../i18n/i18n.js';
import { smartToggleButtonState, getButtonState, setButtonState, flushBatchUpdate } from '../basic/Storage.js';
import { getStorageItem, getStorageConfig } from '../basic/GetStorage.js';
import excluSetting from './ExcluSetting.js';
import bindSetting from './BindSettings.js';



let colorfulHeadingModule = null;
let QYLAttrModule = null;
let nineGridSquaresModule = null;
let multilevelListModule = null;
let colorfulTagsModule = null;
let linkStyleModule = null;


async function loadColorfulHeadingModule() {
    if (!colorfulHeadingModule) {
        try {
            colorfulHeadingModule = await import('../element/ColorfulHeading.js');
        } catch (error) {
            
        }
    }
    return colorfulHeadingModule;
}


async function loadQYLAttrModule() {
    if (!QYLAttrModule) {
        try {
            QYLAttrModule = await import('../QYLAttr/QYLAttrMain.js');
        } catch (error) {
            
        }
    }
    return QYLAttrModule;
}


async function loadNineGridSquaresModule() {
    if (!nineGridSquaresModule) {
        try {
            nineGridSquaresModule = await import('../element/NineGridSquares.js');
        } catch (error) {
            
        }
    }
    return nineGridSquaresModule;
}


async function loadMultilevelListModule() {
    if (!multilevelListModule) {
        try {
            multilevelListModule = await import('../element/MultilevelList.js');
        } catch (error) {
            
        }
    }
    return multilevelListModule;
}


async function loadColorfulTagsModule() {
    if (!colorfulTagsModule) {
        try {
            colorfulTagsModule = await import('../element/ColorfulTags.js');
        } catch (error) {
            
        }
    }
    return colorfulTagsModule;
}

async function loadLinkStyleModule() {
    if (!linkStyleModule) {
        try {
            linkStyleModule = await import('../element/LinkStyle.js');
        } catch (error) {
            
        }
    }
    return linkStyleModule;
}


async function enableColorfulHeading() {
    const module = await loadColorfulHeadingModule();
    if (module && module.initColorfulHeading) {
        module.initColorfulHeading();
    }
}


async function disableColorfulHeading() {
    const module = await loadColorfulHeadingModule();
    if (module && module.removeColorfulHeading) {
        module.removeColorfulHeading();
    }
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


async function enableNineGridSquares() {
    const module = await loadNineGridSquaresModule();
    if (module && module.initNineGridSquares) {
        module.initNineGridSquares();
    }
}


async function disableNineGridSquares() {
    const module = await loadNineGridSquaresModule();
    if (module && module.removeNineGridSquares) {
        module.removeNineGridSquares();
    }
}


async function enableMultilevelList() {
    const module = await loadMultilevelListModule();
    if (module && module.initMultilevelList) {
        module.initMultilevelList();
    }
}


async function disableMultilevelList() {
    const module = await loadMultilevelListModule();
    if (module && module.removeMultilevelList) {
        module.removeMultilevelList();
    }
}


async function enableColorfulTags() {
    const module = await loadColorfulTagsModule();
    if (module && module.initColorfulTags) {
        module.initColorfulTags();
    }
}


async function disableColorfulTags() {
    const module = await loadColorfulTagsModule();
    if (module && module.removeColorfulTags) {
        module.removeColorfulTags();
    }
}

async function enableLinkStyle() {
    const module = await loadLinkStyleModule();
    if (module && module.initLinkStyle) {
        module.initLinkStyle();
    }
}

async function disableLinkStyle() {
    const module = await loadLinkStyleModule();
    if (module && module.removeLinkStyle) {
        module.removeLinkStyle();
    }
}


function getElementOptions() {
    const currentMode = ThemeMode.getThemeMode();
    
    
    const lightModeOptions = [
        {
            id: 'ColorfulHeading',
            label: i18n.ColorfulHeading || '多彩标题&多彩大纲'
        },
        {
            id: 'QYLAttrOn',
            label: i18n.QYLAttrOn || '启用QYL自定义属性样式'
        },
        {
            id: 'NineGridSquares',
            label: i18n.NineGridSquares || '启用图片九宫格排列'
        },
        {
            id: 'MultilevelList',
            label: i18n.MultilevelList || '列表多级序号'
        },
        {
            id: 'ColorfulTags',
            label: i18n.ColorfulTags || '多彩标签和多彩行级代码'
        },
        {
            id: 'LinkStyle',
            label: i18n.LinkStyle || '超链接图标'
        }
    ];
    
    
    const darkModeOptions = [
        {
            id: 'ColorfulHeading',
            label: i18n.ColorfulHeading || '多彩标题&多彩大纲'
        },
        {
            id: 'QYLAttrOn',
            label: i18n.QYLAttrOn || '启用QYL自定义属性样式'
        },
        {
            id: 'NineGridSquares',
            label: i18n.NineGridSquares || '启用图片九宫格排列'
        },
        {
            id: 'MultilevelList',
            label: i18n.MultilevelList || '列表多级序号'
        },
        {
            id: 'ColorfulTags',
            label: i18n.ColorfulTags || '多彩标签和多彩行级代码'
        },
        {
            id: 'LinkStyle',
            label: i18n.LinkStyle || '超链接图标'
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
        
        optionElement.innerHTML = `
            <button type="button" id="${option.id}" class="QYL-element-button ${currentState ? 'active' : ''}">
                ${option.label}
            </button>
        `;
        
        const button = optionElement.querySelector(`#${option.id}`);
        button.addEventListener('click', async () => {
            const newState = await smartToggleButtonState(option.id);
            
            button.classList.toggle('active', newState);
            
            if (newState) {
                
            }
            
            if (option.id === 'ColorfulHeading') {
                if (newState) {
                    await enableColorfulHeading();
                } else {
                    await disableColorfulHeading();
                }
            } else if (option.id === 'QYLAttrOn') {
                if (newState) {
                    await enableQYLAttr();
                } else {
                    await disableQYLAttr();
                }
            } else if (option.id === 'NineGridSquares') {
                if (newState) {
                    await enableNineGridSquares();
                } else {
                    await disableNineGridSquares();
                }
            } else if (option.id === 'MultilevelList') {
                if (newState) {
                    await enableMultilevelList();
                } else {
                    await disableMultilevelList();
                }
            } else if (option.id === 'ColorfulTags') {
                if (newState) {
                    await enableColorfulTags();
                } else {
                    await disableColorfulTags();
                }
            } else if (option.id === 'LinkStyle') {
                if (newState) {
                    await enableLinkStyle();
                } else {
                    await disableLinkStyle();
                }
            }
            
            
            await flushBatchUpdate();
        });
        
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
        if (option.id === 'ColorfulHeading') {
            if (currentState) {
                await enableColorfulHeading();
            }
        } else if (option.id === 'QYLAttrOn') {
            if (currentState) {
                await enableQYLAttr();
            }
        } else if (option.id === 'NineGridSquares') {
            if (currentState) {
                await enableNineGridSquares();
            }
        } else if (option.id === 'MultilevelList') {
            if (currentState) {
                await enableMultilevelList();
            }
        } else if (option.id === 'ColorfulTags') {
            if (currentState) {
                await enableColorfulTags();
            }
        } else if (option.id === 'LinkStyle') {
            if (currentState) {
                await enableLinkStyle();
            }
        }
    }
}









export { 
    getElementOptions, 
    createElementContent, 
    initializeElementStates,
    enableLinkStyle,
    disableLinkStyle 
};
