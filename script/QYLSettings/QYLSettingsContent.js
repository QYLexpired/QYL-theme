import i18n from '../../i18n/i18n.js';
import { createFunctionContent } from './Function.js';
import { createStyleContent } from './Style.js';
import { createLayoutContent } from './Layout.js';
import { createElementContent } from './Element.js';
import { createColorContent } from './Color.js';
import { configManager } from './InitQYLSettings.js';
function shouldHideTab(tabId, config) {
    if (tabId === 'color') return false;
    const optionGroups = {
        layout: ['VerticalTab', 'FusionOn', 'HideTopBar', 'ColorBlock', 'FullHeightLayout', 'HideTab'],
        style: ['FileTreeIndent', 'FrostedGlass', 'Animation', 'ColorfulFileTree', 'BorderFileTree', 'GridSearchList', 'FlatStyle', 'InkMode', 'ColorfulTabs'],
        function: ['MarktoBlank', 'EditorFullWidth', 'FocusBlockHighlight', 'HoverBlockHighlight', 'SuperBlockHighlight', 'ListBullet', 'FixedTool', 'FocusEditing', 'SideMemo', 'ImgMask'],
        element: ['ColorfulHeading', 'QYLAttrOn', 'NineGridSquares', 'MultilevelList', 'ColorfulTags', 'LinkStyle', 'CustomFontStyle']
    };
    const options = optionGroups[tabId];
    if (!options) return false;
    return options.every(optionId => {
        const selectKey = `QYLSettingsSelect_${optionId}`;
        return config[selectKey] === false;
    });
}
export async function createQYLSettingsContent() {
    const settingsContent = document.createElement('div');
    settingsContent.id = 'QYLSettingsContent';
    settingsContent.className = 'b3-menu__items';
    const tabContainer = document.createElement('div');
    const tabs = [
        { id: 'layout', name: i18n.Layout, active: false },
        { id: 'style', name: i18n.Style, active: false },
        { id: 'function', name: i18n.Function, active: false },
        { id: 'element', name: i18n.Element, active: false },
        { id: 'color', name: i18n.Color, active: false }
    ];
    const config = await configManager.getConfig();
    if (!config) {
        throw new Error('Failed to load configuration');
    }
    const visibleTabs = tabs.filter(tab => !shouldHideTab(tab.id, config));
    visibleTabs[0].active = true;
    visibleTabs.forEach(tab => {
        const tabElement = document.createElement('div');
        tabElement.textContent = tab.name;
        tabElement.dataset.tab = tab.id;
        if (tab.active) {
            tabElement.classList.add('active');
        }
        tabElement.addEventListener('click', () => {
            switchTab(tab.id);
        });
        tabContainer.appendChild(tabElement);
    });
    const contentContainer = document.createElement('div');
    for (const tab of visibleTabs) {
        const contentElement = document.createElement('div');
        contentElement.id = `QYL-content-${tab.id}`;
        contentElement.style.display = tab.active ? 'block' : 'none';
        if (tab.id === 'layout') {
            const layoutContent = await createLayoutContent(config);
            contentElement.appendChild(layoutContent);
        } else if (tab.id === 'function') {
            const functionContent = await createFunctionContent(config);
            contentElement.appendChild(functionContent);
        } else if (tab.id === 'style') {
            const styleContent = await createStyleContent(config);
            contentElement.appendChild(styleContent);
        } else if (tab.id === 'element') {
            const elementContent = await createElementContent(config);
            contentElement.appendChild(elementContent);
        } else if (tab.id === 'color') {
            const colorContent = await createColorContent(config);
            contentElement.appendChild(colorContent);
        } else {
            contentElement.textContent = `${tab.name}${i18n.SettingsContent}`;
        }
        contentContainer.appendChild(contentElement);
    }
    settingsContent.appendChild(tabContainer);
    settingsContent.appendChild(contentContainer);
    return settingsContent;
}
async function switchTab(activeTabId) {
    const tabElements = document.querySelectorAll('[data-tab]');
    tabElements.forEach(tab => {
        if (tab.dataset.tab === activeTabId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    const contentPanels = document.querySelectorAll('[id^="QYL-content-"]');
    for (const panel of contentPanels) {
        if (panel.id === `QYL-content-${activeTabId}`) {
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }
    }
}
