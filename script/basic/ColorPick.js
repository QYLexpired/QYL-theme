import { getConfig, saveConfig } from './Storage.js';
import ThemeMode from './ThemeMode.js';
export class ColorPick {
    constructor() {
        this.container = null;
        this.colorSpectrum = null;
        this.indicator = null;
        this.saturationSlider = null;
        this.saturationInput = null;
        this.brightnessSlider = null;
        this.brightnessInput = null;
        this.isDragging = false;
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
        this.colorSpectrum = document.createElement('div');
        this.colorSpectrum.className = 'QYLColorPickSpectrum';
        this.indicator = document.createElement('div');
        this.indicator.className = 'QYLColorPickIndicator';
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
        this.brightnessInput.min = '-3';
        this.brightnessInput.max = '1.5';
        this.brightnessInput.step = '0.01';
        this.brightnessInput.value = initialBrightness.toString();
        this.brightnessInput.className = 'QYLBrightnessInput';
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
        const updateColorDisplay = async (hue, shouldSaveHue = true) => {
            const currentSaturation = this.getColor()?.saturation ?? 0.5;
            const currentBrightness = this.getColor()?.brightness ?? 0;
            this.indicator.style.left = `${(hue / 360) * (this.colorSpectrum.offsetWidth - this.indicator.offsetWidth)}px`;
            if (shouldSaveHue) {
                try {
                    const config = await this.getCachedConfig();
                    const currentMode = ThemeMode.getThemeMode();
                    const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
                    config[`CustomMainColor${modeSuffix}`] = hue;
                    await this.saveConfigDebounced();
                } catch (error) {
                }
            }
            if (callback) {
                const currentSaturation = this.getColor()?.saturation ?? 0.5;
                const currentBrightness = this.getColor()?.brightness ?? 0;
                callback({ hue, saturation: currentSaturation, brightness: currentBrightness, type: 'hue' });
            }
        };
        this.colorSpectrum.addEventListener('mousedown', async (e) => {
            this.isDragging = true;
            const rect = this.colorSpectrum.getBoundingClientRect();
            const relativeX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const hue = Math.round((relativeX / rect.width) * 360);
            await updateColorDisplay(hue, true);
        });
        document.addEventListener('mousemove', async (e) => {
            if (this.isDragging) {
                const rect = this.colorSpectrum.getBoundingClientRect();
                const relativeX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const hue = Math.round((relativeX / rect.width) * 360);
                await updateColorDisplay(hue, true);
            }
        });
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
        });
        this.colorSpectrum.addEventListener('click', async (e) => {
            if (!this.isDragging) {
                const rect = this.colorSpectrum.getBoundingClientRect();
                const relativeX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const hue = Math.round((relativeX / rect.width) * 360);
                await updateColorDisplay(hue, true);
            }
        });
        this.colorSpectrum.appendChild(this.indicator);
        this.saturationSlider.appendChild(this.saturationInput);
        this.brightnessSlider.appendChild(this.brightnessInput);
        this.container.appendChild(this.colorSpectrum);
        this.container.appendChild(this.saturationSlider);
        this.container.appendChild(this.brightnessSlider);
        setTimeout(() => {
            updateColorDisplay(initialHue, false).catch(error => {
            });
        }, 0);
        return this.container;
    }
    getColor() {
        if (this.indicator && this.colorSpectrum) {
            const maxLeft = this.colorSpectrum.offsetWidth - this.indicator.offsetWidth;
            const hue = maxLeft > 0 ? Math.round((parseFloat(this.indicator.style.left) / maxLeft) * 360) : 0;
            const saturation = this.saturationInput ? parseFloat(this.saturationInput.value) : 0.5;
            const brightness = this.brightnessInput ? parseFloat(this.brightnessInput.value) : 0;
            return { hue, saturation, brightness };
        }
        return null;
    }
    destroy() {
        if (this.pendingSave) {
            clearTimeout(this.pendingSave);
            this.pendingSave = null;
        }
        if (this.container) {
            this.container.remove();
            this.container = null;
            this.colorSpectrum = null;
            this.indicator = null;
            this.saturationSlider = null;
            this.saturationInput = null;
            this.brightnessSlider = null;
            this.brightnessInput = null;
        }
        this.configCache = null;
        this.isDragging = false;
    }
}
export default ColorPick;
