import { getConfig, saveConfig } from './Storage.js';
import ThemeMode from './ThemeMode.js';
import { updatePWAThemeColor } from './PWA.js';
export class ColorPick {
    constructor() {
        this.container = null;
        this.hueSlider = null;
        this.hueInput = null;
        this.saturationSlider = null;
        this.saturationInput = null;
        this.brightnessSlider = null;
        this.brightnessInput = null;
        this.configCache = null;
        this.pendingSave = null;
    }
    async getCachedConfig() {
        if (!this.configCache) {
            this.configCache = await getConfig();
        }
        return this.configCache;
    }
    async saveConfigDebounced() {
        if (this.pendingSave) {
            clearTimeout(this.pendingSave);
        }
        this.pendingSave = setTimeout(async () => {
            try {
                await saveConfig(this.configCache);
                this.pendingSave = null;
            } catch (error) {
            }
        }, 500);
    }
    createCustomColorPicker(callback, initialHue = 0, initialSaturation = 0.5, initialBrightness = 0) {
        this.container = document.createElement('div');
        this.container.className = 'QYLColorPickContainer b3-menu';
        this.hueSlider = document.createElement('div');
        this.hueSlider.className = 'QYLHueSlider';
        this.hueInput = document.createElement('input');
        this.hueInput.type = 'range';
        this.hueInput.min = '0';
        this.hueInput.max = '360';
        this.hueInput.step = '1';
        this.hueInput.value = initialHue.toString();
        this.hueInput.className = 'QYLHueInput';
        this.saturationSlider = document.createElement('div');
        this.saturationSlider.className = 'QYLSaturationSlider';
        this.saturationInput = document.createElement('input');
        this.saturationInput.type = 'range';
        this.saturationInput.min = '0';
        this.saturationInput.max = '1.5';
        this.saturationInput.step = '0.01';
        this.saturationInput.value = initialSaturation.toString();
        this.saturationInput.className = 'QYLSaturationInput';
        this.brightnessSlider = document.createElement('div');
        this.brightnessSlider.className = 'QYLBrightnessSlider';
        this.brightnessInput = document.createElement('input');
        this.brightnessInput.type = 'range';
        this.brightnessInput.min = ThemeMode.isDarkMode() ? '-3' : '-5';
        this.brightnessInput.max = ThemeMode.isDarkMode() ? '3' : '1.5';
        this.brightnessInput.step = '0.01';
        this.brightnessInput.value = initialBrightness.toString();
        this.brightnessInput.className = 'QYLBrightnessInput';
        this.hueInput.addEventListener('input', async (e) => {
            const value = parseInt(e.target.value);
            try {
                const config = await this.getCachedConfig();
                const currentMode = ThemeMode.getThemeMode();
                const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
                config[`CustomMainColor${modeSuffix}`] = value;
                await this.saveConfigDebounced();
            } catch (error) {
            }
            document.documentElement.style.setProperty('--QYL-custom-primary-main', value.toString() + 'deg');
            const currentSaturation = this.getColor()?.saturation ?? 0.5;
            const currentBrightness = this.getColor()?.brightness ?? 0;
            if (callback) {
                callback({ hue: value, saturation: currentSaturation, brightness: currentBrightness, type: 'hue' });
            }
            updatePWAThemeColor();
        });
        this.saturationInput.addEventListener('input', async (e) => {
            const value = parseFloat(e.target.value);
            try {
                const config = await this.getCachedConfig();
                const currentMode = ThemeMode.getThemeMode();
                const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
                config[`CustomMainColorSaturate${modeSuffix}`] = value;
                await this.saveConfigDebounced();
            } catch (error) {
            }
            document.documentElement.style.setProperty('--QYL-custom-primary-saturate', value.toString());
            const currentHue = this.getColor()?.hue ?? 0;
            const currentBrightness = this.getColor()?.brightness ?? 0;
            if (callback) {
                callback({ hue: currentHue, saturation: value, brightness: currentBrightness, type: 'saturation' });
            }
            updatePWAThemeColor();
        });
        this.brightnessInput.addEventListener('input', async (e) => {
            const value = parseFloat(e.target.value);
            try {
                const config = await this.getCachedConfig();
                const currentMode = ThemeMode.getThemeMode();
                const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
                config[`CustomMainColorBrightness${modeSuffix}`] = value;
                await this.saveConfigDebounced();
            } catch (error) {
            }
            document.documentElement.style.setProperty('--QYL-custom-primary-brightness', value.toString());
            const currentHue = this.getColor()?.hue ?? 0;
            const currentSaturation = this.getColor()?.saturation ?? 0.5;
            if (callback) {
                callback({ hue: currentHue, saturation: currentSaturation, brightness: value, type: 'brightness' });
            }
            updatePWAThemeColor();
        });
        this.hueSlider.appendChild(this.hueInput);
        this.saturationSlider.appendChild(this.saturationInput);
        this.brightnessSlider.appendChild(this.brightnessInput);
        this.container.appendChild(this.hueSlider);
        this.container.appendChild(this.saturationSlider);
        this.container.appendChild(this.brightnessSlider);
        return this.container;
    }
    getColor() {
        const hue = this.hueInput ? parseInt(this.hueInput.value) : 0;
        const saturation = this.saturationInput ? parseFloat(this.saturationInput.value) : 0.5;
        const brightness = this.brightnessInput ? parseFloat(this.brightnessInput.value) : 0;
        return { hue, saturation, brightness };
    }
    destroy() {
        if (this.pendingSave) {
            clearTimeout(this.pendingSave);
            this.pendingSave = null;
        }
        if (this.container) {
            this.container.remove();
            this.container = null;
            this.hueSlider = null;
            this.hueInput = null;
            this.saturationSlider = null;
            this.saturationInput = null;
            this.brightnessSlider = null;
            this.brightnessInput = null;
        }
        this.configCache = null;
    }
}
export default ColorPick;
