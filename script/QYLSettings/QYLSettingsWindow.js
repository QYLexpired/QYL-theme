import { createQYLSettingsContent } from './QYLSettingsContent.js';
export async function createQYLSettingsWindow() {
    removeQYLSettingsWindow();
    if (window.QYLConfigManager) {
        window.QYLConfigManager.clearCache();
    }
    const settingsWindow = document.createElement('div');
    settingsWindow.id = 'QYLSettingsWindow';
    settingsWindow.className = 'b3-menu';
    settingsWindow.style.position = 'fixed';
    settingsWindow.style.zIndex = '12';
    const button = document.getElementById('QYLButton');
    if (button) {
        button.classList.add('QYLbuttonActive');
        const buttonRect = button.getBoundingClientRect();
        settingsWindow.style.left = `${buttonRect.right}px`;
        settingsWindow.style.top = `${buttonRect.bottom + 5}px`;
        settingsWindow.style.transform = 'translateX(-100%)';
    }
    const settingsContent = await createQYLSettingsContent();
    settingsWindow.appendChild(settingsContent);
    document.body.appendChild(settingsWindow);
    const handleClickOutside = (event) => {
        if (event.target.closest('#QYLButton')) {
            return;
        }
        if (event.target.closest('#QYLSettingsWindow')) {
            return;
        }
        if (event.target.closest('.QYLColorPickContainer') || 
            event.target.closest('.QYLHueSlider') || 
            event.target.closest('.QYLHueInput') || 
            event.target.closest('.QYLSaturationSlider') || 
            event.target.closest('.QYLSaturationInput') ||
            event.target.closest('.QYLBrightnessSlider') || 
            event.target.closest('.QYLBrightnessInput')) {
            return;
        }
        removeQYLSettingsWindow();
    };
    const handleEscKey = (event) => {
        if (event.key === 'Escape') {
            removeQYLSettingsWindow();
        }
    };
    settingsWindow._clickOutsideHandler = handleClickOutside;
    settingsWindow._escKeyHandler = handleEscKey;
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return settingsWindow;
}
export function removeQYLSettingsWindow() {
    const settingsWindow = document.getElementById('QYLSettingsWindow');
    const button = document.getElementById('QYLButton');
    if (button) {
        button.classList.remove('QYLbuttonActive');
    }
    if (settingsWindow) {
        if (settingsWindow._clickOutsideHandler) {
            document.removeEventListener('click', settingsWindow._clickOutsideHandler);
        }
        if (settingsWindow._escKeyHandler) {
            document.removeEventListener('keydown', settingsWindow._escKeyHandler);
        }
        settingsWindow.remove();
    }
}
