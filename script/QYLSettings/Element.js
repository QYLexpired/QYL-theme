

import ThemeMode from '../basic/ThemeMode.js';
import i18n from '../../i18n/i18n.js';
import { toggleButtonState, getButtonState, setButtonState } from '../basic/Storage.js';
import { getStorageItem } from '../basic/GetStorage.js';
import excluSetting from './ExcluSetting.js';
import bindSetting from './BindSettings.js';



let colorfulHeadingModule = null;
let QYLAttrModule = null;
let nineGridSquaresModule = null;


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
        }
    ];
    
    
    return currentMode === 'dark' ? darkModeOptions : lightModeOptions;
}


async function createElementContent() {
    const container = document.createElement('div');
    container.className = 'QYL-element-container';
    
    const options = getElementOptions();
    
    for (const option of options) {
        const optionElement = document.createElement('div');
        optionElement.className = 'QYL-element-option';
        
        
        const currentState = await getStorageItem(option.id, false);
        
        optionElement.innerHTML = `
            <button type="button" id="${option.id}" class="QYL-element-button ${currentState ? 'active' : ''}">
                ${option.label}
            </button>
        `;
        
        
        const button = optionElement.querySelector(`#${option.id}`);
        button.addEventListener('click', async () => {
            const newState = await toggleButtonState(option.id);
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
            }
        });
        
        container.appendChild(optionElement);
    }
    
    return container;
}


async function initializeElementStates() {
    const options = getElementOptions();
    
    for (const option of options) {
        const currentState = await getStorageItem(option.id, false);
        
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
        }
    }
}









export { getElementOptions, createElementContent, initializeElementStates };
