import { getConfig, saveConfig } from './Storage.js';
import ThemeMode from './ThemeMode.js';
import './ColorJs.js';
export class ColorPick {
    constructor() {
        this.container = null;
        this.hueSlider = null;
        this.hueInput = null;
        this.saturationSlider = null;
        this.saturationInput = null;
        this.brightnessSlider = null;
        this.brightnessInput = null;
        this.colorInput = null;
        this.colorInputDisplay = null;
        this.configCache = null;
        this.pendingSave = null;
        this.isUpdatingFromColorInput = false; 
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
    oklchToHex(lightness, chroma, hue) {
        try {
            if (typeof Color === 'undefined') {
                return '#ff0000'; 
            }
            const oklchColor = new Color(`oklch(${lightness} ${chroma} ${hue}deg)`);
            const hexColor = oklchColor.to('srgb').toString({ format: 'hex' });
            return hexColor;
        } catch (error) {
            return '#ff0000'; 
        }
    }
    getDefaultColor() {
        const customPick = getComputedStyle(document.documentElement).getPropertyValue('--QYL-custom-primary-pick');
        if (customPick && customPick.trim() !== '') {
            return customPick.trim();
        }
        const isDark = ThemeMode.isDarkMode();
        let oklchExpression;
        if (isDark) {
            oklchExpression = 'oklch(calc(0.58 + var(--QYL-theme-primary-brightness) * 0.022) calc(0.23 * max(0.45, var(--QYL-custom-primary-saturate))) var(--QYL-theme-primary-main))';
        } else {
            oklchExpression = 'oklch(calc(0.7 + var(--QYL-theme-primary-brightness) * 0.025) calc(0.35 * max(0.32, var(--QYL-custom-primary-saturate))) var(--QYL-theme-primary-main))';
        }
        try {
            if (typeof Color === 'undefined') {
                return '#ff0000'; 
            }
            const oklchColor = new Color(oklchExpression);
            const hexColor = oklchColor.to('srgb').toString({ format: 'hex' });
            return hexColor;
        } catch (error) {
            return '#ff0000'; 
        }
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
            if (!this.isUpdatingFromColorInput) {
                try {
                    const config = await this.getCachedConfig();
                    const currentMode = ThemeMode.getThemeMode();
                    const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
                    config[`CustomMainColor${modeSuffix}`] = value;
                    delete config[`CustomMainColorPick${modeSuffix}`];
                    await this.saveConfigDebounced();
                } catch (error) {
                }
                document.documentElement.style.setProperty('--QYL-custom-primary-main', value.toString() + 'deg');
                document.documentElement.style.removeProperty('--QYL-custom-primary-pick');
                document.documentElement.classList.remove('QYLCustomColorPick');
            }
            const currentSaturation = this.getColor()?.saturation ?? 0.5;
            const currentBrightness = this.getColor()?.brightness ?? 0;
            const hexColor = this.oklchToHex(0.5, 0.5, value);
            this.colorInput.value = hexColor;
            if (callback) {
                callback({ hue: value, saturation: currentSaturation, brightness: currentBrightness, type: 'hue' });
            }
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
        });
        this.colorInput = document.createElement('input');
        this.colorInput.type = 'color';
        this.colorInput.className = 'QYLColorInput';
        this.colorInput.value = this.getDefaultColor();
        this.colorInputDisplay = document.createElement('div');
        this.colorInputDisplay.className = 'QYLColorInputDisplay';
        this.colorInputDisplay.addEventListener('click', () => {
            this.colorInput.click();
        });
        this.colorInput.addEventListener('input', async (e) => {
            const colorValue = e.target.value;
            try {
                const config = await this.getCachedConfig();
                const currentMode = ThemeMode.getThemeMode();
                const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
                config[`CustomMainColorPick${modeSuffix}`] = colorValue;
                await this.saveConfigDebounced();
            } catch (error) {
            }
            document.documentElement.style.setProperty('--QYL-custom-primary-pick', colorValue);
            document.documentElement.classList.add('QYLCustomColorPick');
            try {
                const color = new Color(colorValue);
                const oklchColor = color.to('oklch');
                const lightness = oklchColor.l || 0;
                const currentMode = ThemeMode.getThemeMode();
                let threshold, reverseValue;
                if (currentMode === 'dark') {
                    threshold = 0.79;
                    reverseValue = '0.2';
                } else {
                    threshold = 0.74;
                    reverseValue = '0.3';
                }
                if (lightness > threshold) {
                    document.documentElement.style.setProperty('--QYL-color-reverse', reverseValue);
                } else {
                    document.documentElement.style.removeProperty('--QYL-color-reverse');
                }
                const hue = oklchColor.h || 0; 
                this.isUpdatingFromColorInput = true;
                this.hueInput.value = Math.round(hue);
                this.updateHueSliderDisplay(hue);
                this.isUpdatingFromColorInput = false;
            } catch (error) {
                this.isUpdatingFromColorInput = false;
            }
            if (callback) {
                callback({ colorPick: colorValue, type: 'colorPick' });
            }
        });
        this.colorInput.addEventListener('contextmenu', async (e) => {
            e.preventDefault();
            try {
                const config = await this.getCachedConfig();
                const currentMode = ThemeMode.getThemeMode();
                const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
                delete config[`CustomMainColorPick${modeSuffix}`];
                await this.saveConfigDebounced();
                document.documentElement.style.removeProperty('--QYL-custom-primary-pick');
                document.documentElement.style.removeProperty('--QYL-color-reverse');
                document.documentElement.classList.remove('QYLCustomColorPick');
                if (callback) {
                    callback({ colorPick: null, type: 'colorPickRemoved' });
                }
            } catch (error) {
            }
        });
        this.hueSlider.appendChild(this.hueInput);
        this.saturationSlider.appendChild(this.saturationInput);
        this.brightnessSlider.appendChild(this.brightnessInput);
        this.container.insertBefore(this.colorInput, this.container.firstChild);
        this.container.insertBefore(this.colorInputDisplay, this.container.children[1]);
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
    updateHueSliderDisplay(hue) {
        if (!this.hueInput) return;
        const event = new Event('input', { bubbles: true });
        this.hueInput.dispatchEvent(event);
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
            this.colorInput = null;
            this.colorInputDisplay = null;
        }
        this.configCache = null;
    }
}
export default ColorPick;
