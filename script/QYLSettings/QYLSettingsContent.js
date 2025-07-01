import i18n from '../../i18n/i18n.js';
import { createFunctionContent } from './Function.js';
import { createStyleContent } from './Style.js';
import { createLayoutContent } from './Layout.js';
import { createElementContent } from './Element.js';
import { createColorContent } from './Color.js';
import { configManager } from './InitQYLSettings.js';
export async function createQYLSettingsContent() {
    const settingsContent = document.createElement('div');
    settingsContent.id = 'QYLSettingsContent';
    settingsContent.className = 'b3-menu__items';
    const tabContainer = document.createElement('div');
    const tabs = [
        { id: 'layout', name: i18n.Layout, active: true },
        { id: 'style', name: i18n.Style, active: false },
        { id: 'function', name: i18n.Function, active: false },
        { id: 'element', name: i18n.Element, active: false },
        { id: 'color', name: i18n.Color, active: false }
    ];
    tabs.forEach(tab => {
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
    const config = await configManager.getConfig();
    for (const tab of tabs) {
        const contentElement = document.createElement('div');
        contentElement.id = `QYL-content-${tab.id}`;
        contentElement.style.display = tab.active ? 'block' : 'none';
        if (tab.active) {
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
        } else {
            contentElement.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--b3-theme-on-surface-light);">加载中...</div>';
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
            if (panel.querySelector('div[style*="text-align: center"]')) {
                panel.innerHTML = ''; 
                configManager.clearCache();
                const config = await configManager.getConfig();
                if (activeTabId === 'layout') {
                    const layoutContent = await createLayoutContent(config);
                    panel.appendChild(layoutContent);
                } else if (activeTabId === 'function') {
                    const functionContent = await createFunctionContent(config);
                    panel.appendChild(functionContent);
                } else if (activeTabId === 'style') {
                    const styleContent = await createStyleContent(config);
                    panel.appendChild(styleContent);
                } else if (activeTabId === 'element') {
                    const elementContent = await createElementContent(config);
                    panel.appendChild(elementContent);
                } else if (activeTabId === 'color') {
                    const colorContent = await createColorContent(config);
                    panel.appendChild(colorContent);
                }
            }
        } else {
            panel.style.display = 'none';
        }
    }
}
