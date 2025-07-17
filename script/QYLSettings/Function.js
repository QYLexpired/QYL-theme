import ThemeMode from '../basic/ThemeMode.js';
import i18n from '../../i18n/i18n.js';
import { smartToggleButtonState, getButtonState, setButtonState, flushBatchUpdate, batchUpdateConfig } from '../basic/Storage.js';
import { getStorageItem, getStorageConfig } from '../basic/GetStorage.js';
import excluSetting from './ExcluSetting.js';
import bindSetting from './BindSettings.js';
let marktoBlankModule = null;
let editorFullWidthModule = null;
let focusBlockHighlightModule = null;
let hoverBlockHighlightModule = null;
let superBlockHighlightModule = null;
let listBulletOnModule = null;
let fixedToolModule = null;
let focusEditingOnModule = null;
let sideMemoModule = null;
async function loadMarktoBlankModule() {
    if (!marktoBlankModule) {
        try {
            marktoBlankModule = await import('../function/MarktoBlank.js');
        } catch (error) {
        }
    }
    return marktoBlankModule;
}
async function loadEditorFullWidthModule() {
    if (!editorFullWidthModule) {
        try {
            editorFullWidthModule = await import('../function/EditorFullWidth.js');
        } catch (error) {
        }
    }
    return editorFullWidthModule;
}
async function loadFocusBlockHighlightModule() {
    if (!focusBlockHighlightModule) {
        try {
            focusBlockHighlightModule = await import('../function/FocusBlockHighlight.js');
        } catch (error) {
        }
    }
    return focusBlockHighlightModule;
}
async function loadHoverBlockHighlightModule() {
    if (!hoverBlockHighlightModule) {
        try {
            hoverBlockHighlightModule = await import('../function/HoverBlockHighlight.js');
        } catch (error) {
        }
    }
    return hoverBlockHighlightModule;
}
async function loadSuperBlockHighlightModule() {
    if (!superBlockHighlightModule) {
        try {
            superBlockHighlightModule = await import('../function/SuperBlockHighlight.js');
        } catch (error) {
        }
    }
    return superBlockHighlightModule;
}
async function loadListBulletOnModule() {
    if (!listBulletOnModule) {
        try {
            listBulletOnModule = await import('../function/ListBulletOn.js');
        } catch (error) {
        }
    }
    return listBulletOnModule;
}
async function loadFixedToolModule() {
    if (!fixedToolModule) {
        try {
            fixedToolModule = await import('../function/FixedTool.js');
        } catch (error) {
        }
    }
    return fixedToolModule;
}
async function loadFocusEditingOnModule() {
    if (!focusEditingOnModule) {
        try {
            focusEditingOnModule = await import('../function/FocusEditingOn.js');
        } catch (error) {
        }
    }
    return focusEditingOnModule;
}
async function loadSideMemoModule() {
    if (!sideMemoModule) {
        try {
            sideMemoModule = await import('../function/SideMemo.js');
        } catch (error) {
        }
    }
    return sideMemoModule;
}
async function enableMarktoBlank() {
    const module = await loadMarktoBlankModule();
    if (module && module.initMarktoBlank) {
        module.initMarktoBlank();
    }
}
async function disableMarktoBlank() {
    const module = await loadMarktoBlankModule();
    if (module && module.removeMarktoBlank) {
        module.removeMarktoBlank();
    }
}
async function enableEditorFullWidth() {
    const module = await loadEditorFullWidthModule();
    if (module && module.initEditorFullWidth) {
        module.initEditorFullWidth();
    }
}
async function disableEditorFullWidth() {
    const module = await loadEditorFullWidthModule();
    if (module && module.removeEditorFullWidth) {
        module.removeEditorFullWidth();
    }
}
async function enableFocusBlockHighlight() {
    const module = await loadFocusBlockHighlightModule();
    if (module && module.initFocusBlockHighlight) {
        module.initFocusBlockHighlight();
    }
}
async function disableFocusBlockHighlight() {
    const module = await loadFocusBlockHighlightModule();
    if (module && module.removeFocusBlockHighlight) {
        module.removeFocusBlockHighlight();
    }
}
async function enableHoverBlockHighlight() {
    const module = await loadHoverBlockHighlightModule();
    if (module && module.initHoverBlockHighlight) {
        module.initHoverBlockHighlight();
    }
}
async function disableHoverBlockHighlight() {
    const module = await loadHoverBlockHighlightModule();
    if (module && module.removeHoverBlockHighlight) {
        module.removeHoverBlockHighlight();
    }
}
async function enableSuperBlockHighlight() {
    const module = await loadSuperBlockHighlightModule();
    if (module && module.initSuperBlockHighlight) {
        module.initSuperBlockHighlight();
    }
}
async function disableSuperBlockHighlight() {
    const module = await loadSuperBlockHighlightModule();
    if (module && module.removeSuperBlockHighlight) {
        module.removeSuperBlockHighlight();
    }
}
async function enableListBulletOn() {
    const module = await loadListBulletOnModule();
    if (module && module.initListBulletOn) {
        module.initListBulletOn();
    }
}
async function disableListBulletOn() {
    const module = await loadListBulletOnModule();
    if (module && module.removeListBulletOn) {
        module.removeListBulletOn();
    }
    listBulletOnModule = null;
}
async function enableFixedTool() {
    const module = await loadFixedToolModule();
    if (module && module.initFixedTool) {
        module.initFixedTool();
    }
}
async function disableFixedTool() {
    const module = await loadFixedToolModule();
    if (module && module.removeFixedTool) {
        module.removeFixedTool();
    }
    fixedToolModule = null;
}
async function enableFocusEditingOn() {
    const module = await loadFocusEditingOnModule();
    if (module && module.initFocusEditingOn) {
        module.initFocusEditingOn();
    }
}
async function disableFocusEditingOn() {
    const module = await loadFocusEditingOnModule();
    if (module && module.removeFocusEditingOn) {
        module.removeFocusEditingOn();
    }
    focusEditingOnModule = null;
}
async function enableSideMemo() {
    const module = await loadSideMemoModule();
    if (module && module.initSideMemo) {
        module.initSideMemo();
    }
    const config = await getStorageConfig();
    const dir = config.QYLmemoDirection || 'B';
    const body = document.body;
    body.classList.remove('QYLmemoB', 'QYLmemoR', 'QYLmemoL');
    body.classList.add('QYLmemo' + dir);
}
async function disableSideMemo() {
    const module = await loadSideMemoModule();
    if (module && module.removeSideMemo) {
        module.removeSideMemo();
    }
    sideMemoModule = null;
    const body = document.body;
    body.classList.remove('QYLmemoB', 'QYLmemoR', 'QYLmemoL');
}
function getFunctionOptions() {
    const currentMode = ThemeMode.getThemeMode();
    const lightModeOptions = [
        {
            id: 'MarktoBlank',
            label: i18n.MarktoBlank || '标记挖空'
        },
        {
            id: 'EditorFullWidth',
            label: i18n.EditorFullWidth || '编辑器全宽显示'
        },
        {
            id: 'FocusBlockHighlight',
            label: i18n.FocusBlockHighlight || '聚焦块高亮'
        },
        {
            id: 'HoverBlockHighlight',
            label: i18n.HoverBlockHighlight || '悬停块高亮'
        },
        {
            id: 'SuperBlockHighlight',
            label: i18n.SuperBlockHighlight || '超级块高亮'
        },
        {
            id: 'ListBullet',
            label: i18n.ListBullet || '列表子弹线'
        },
        {
            id: 'FixedTool',
            label: i18n.FixedTool || '固定工具栏'
        },
        {
            id: 'FocusEditing',
            label: i18n.FocusEditing || '专注编辑'
        },
        {
            id: 'SideMemo',
            label: i18n.SideMemo || '显示行内备注'
        }
    ];
    const darkModeOptions = [
        {
            id: 'MarktoBlank',
            label: i18n.MarktoBlank || '标记挖空'
        },
        {
            id: 'EditorFullWidth',
            label: i18n.EditorFullWidth || '编辑器全宽显示'
        },
        {
            id: 'FocusBlockHighlight',
            label: i18n.FocusBlockHighlight || '聚焦块高亮'
        },
        {
            id: 'HoverBlockHighlight',
            label: i18n.HoverBlockHighlight || '悬停块高亮'
        },
        {
            id: 'SuperBlockHighlight',
            label: i18n.SuperBlockHighlight || '超级块高亮'
        },
        {
            id: 'ListBullet',
            label: i18n.ListBullet || '列表子弹线'
        },
        {
            id: 'FixedTool',
            label: i18n.FixedTool || '固定工具栏'
        },
        {
            id: 'FocusEditing',
            label: i18n.FocusEditing || '专注编辑'
        },
        {
            id: 'SideMemo',
            label: i18n.SideMemo || '显示行内备注'
        }
    ];
    return currentMode === 'dark' ? darkModeOptions : lightModeOptions;
}
async function createFunctionContent(config = null) {
    const container = document.createElement('div');
    container.className = 'QYL-function-container';
    const options = getFunctionOptions();
    if (!config) {
        config = await getStorageConfig();
    }
    for (const option of options) {
        const optionElement = document.createElement('div');
        optionElement.className = 'QYL-function-option';
        const currentState = config[option.id] || false;
        optionElement.innerHTML = `
            <button type="button" id="${option.id}" class="QYL-function-button ${currentState ? 'active' : ''}">
                ${option.label}
            </button>
        `;
        const button = optionElement.querySelector(`#${option.id}`);
        button.addEventListener('click', async () => {
            const newState = await smartToggleButtonState(option.id);
            button.classList.toggle('active', newState);
            if (newState) {
                if (['FocusBlockHighlight', 'FocusEditing'].includes(option.id)) {
                    await excluSetting.handleExclusionBatch('focusGroup', option.id, null, async (disabledId) => {
                        if (disabledId === 'FocusBlockHighlight') {
                            await disableFocusBlockHighlight();
                        } else if (disabledId === 'FocusEditing') {
                            await disableFocusEditingOn();
                        }
                    });
                }
            }
            if (option.id === 'MarktoBlank') {
                if (newState) {
                    await enableMarktoBlank();
                } else {
                    await disableMarktoBlank();
                }
            } else if (option.id === 'SideMemo') {
                if (newState) {
                    await enableSideMemo();
                } else {
                    await disableSideMemo();
                }
            } else if (option.id === 'EditorFullWidth') {
                if (newState) {
                    await enableEditorFullWidth();
                } else {
                    await disableEditorFullWidth();
                }
            } else if (option.id === 'FocusBlockHighlight') {
                if (newState) {
                    await enableFocusBlockHighlight();
                } else {
                    await disableFocusBlockHighlight();
                }
            } else if (option.id === 'HoverBlockHighlight') {
                if (newState) {
                    await enableHoverBlockHighlight();
                } else {
                    await disableHoverBlockHighlight();
                }
            } else if (option.id === 'SuperBlockHighlight') {
                if (newState) {
                    await enableSuperBlockHighlight();
                } else {
                    await disableSuperBlockHighlight();
                }
            } else if (option.id === 'ListBullet') {
                if (newState) {
                    await enableListBulletOn();
                } else {
                    await disableListBulletOn();
                }
            } else if (option.id === 'FixedTool') {
                if (newState) {
                    await enableFixedTool();
                } else {
                    await disableFixedTool();
                }
            } else if (option.id === 'FocusEditing') {
                if (newState) {
                    await enableFocusEditingOn();
                } else {
                    await disableFocusEditingOn();
                }
            }
            await flushBatchUpdate();
        });
        if (option.id === 'SideMemo') {
            button.addEventListener('contextmenu', async (e) => {
                e.preventDefault();
                const body = document.body;
                const classList = body.classList;
                const classes = ['QYLmemoB', 'QYLmemoR', 'QYLmemoL'];
                let found = false;
                let newDir = 'R';
                for (let i = 0; i < classes.length; i++) {
                    if (classList.contains(classes[i])) {
                        classList.remove(classes[i]);
                        const next = (i + 1) % classes.length;
                        classList.add(classes[next]);
                        newDir = classes[next].replace('QYLmemo', '');
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    classList.add('QYLmemoR');
                    newDir = 'R';
                }
                await batchUpdateConfig({ QYLmemoDirection: newDir });
            });
        }
        container.appendChild(optionElement);
    }
    return container;
}
async function initializeFunctionStates(config = null) {
    const options = getFunctionOptions();
    if (!config) {
        config = await getStorageConfig();
    }
    for (const option of options) {
        const currentState = config[option.id] || false;
        if (option.id === 'MarktoBlank') {
            if (currentState) {
                await enableMarktoBlank();
            }
        } else if (option.id === 'SideMemo') {
            if (currentState) {
                await enableSideMemo();
            }
        } else if (option.id === 'EditorFullWidth') {
            if (currentState) {
                await enableEditorFullWidth();
            }
        } else if (option.id === 'FocusBlockHighlight') {
            if (currentState) {
                await enableFocusBlockHighlight();
            }
        } else if (option.id === 'HoverBlockHighlight') {
            if (currentState) {
                await enableHoverBlockHighlight();
            }
        } else if (option.id === 'SuperBlockHighlight') {
            if (currentState) {
                await enableSuperBlockHighlight();
            }
        } else if (option.id === 'ListBullet') {
            if (currentState) {
                await enableListBulletOn();
            }
        } else if (option.id === 'FixedTool') {
            if (currentState) {
                await enableFixedTool();
            }
        } else if (option.id === 'FocusEditing') {
            if (currentState) {
                await enableFocusEditingOn();
            }
        }
    }
}
excluSetting.registerGroup('focusGroup', ['FocusBlockHighlight', 'FocusEditing']);
export { getFunctionOptions, createFunctionContent, initializeFunctionStates };
