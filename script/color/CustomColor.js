import { ColorPick } from '../basic/ColorPick.js';
import { getConfig, saveConfig } from '../basic/Storage.js';
import ThemeMode from '../basic/ThemeMode.js';
export class CustomColor {
    constructor() {
        this.colorPicker = null;
        this.colorPickInstance = null;
        this.container = null;
        this.isVisible = false;
    }
    async createColorPicker(callback, initialHue = 0, initialSaturation = 0.5) {
        this.colorPickInstance = new ColorPick();
        this.container = this.colorPickInstance.createCustomColorPicker(
            async (colorData) => {
                if (callback) {
                    callback(colorData);
                }
            },
            initialHue,
            initialSaturation
        );
        this.container.style.position = 'fixed';
        this.container.style.zIndex = '10000'; 
        this.updatePosition();
        document.body.appendChild(this.container);
        window.addEventListener('resize', () => {
            this.updatePosition();
        });
        this.handleClickOutside = (event) => {
            if (this.container && this.container.contains(event.target)) {
                return;
            }
            if (event.target.closest('#QYLButton')) {
                return;
            }
            this.destroy();
        };
        this.handleEscKey = (event) => {
            if (event.key === 'Escape') {
                this.destroy();
            }
        };
        setTimeout(() => {
            document.addEventListener('click', this.handleClickOutside);
            document.addEventListener('keydown', this.handleEscKey);
        }, 0);
        return this.container;
    }
    updatePosition() {
        const settingsWindow = document.getElementById('QYLSettingsWindow');
        if (settingsWindow && this.container) {
            const rect = settingsWindow.getBoundingClientRect();
            const colorPickerWidth = 250;
            let leftPosition = rect.left - colorPickerWidth;
            if (leftPosition < 10) {
                leftPosition = 10; 
            }
            this.container.style.left = `${leftPosition}px`;
            this.container.style.top = `${rect.top + 38}px`; 
            this.container.style.width = `${colorPickerWidth}px`;
            this.container.style.height = 'auto'; 
        }
    }
    show() {
        if (this.container) {
            this.container.style.display = 'block';
            this.isVisible = true;
            this.updatePosition();
        }
    }
    hide() {
        if (this.container) {
            this.container.style.display = 'none';
            this.isVisible = false;
        }
    }
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    setColor(hue, saturation) {
        if (this.colorPickInstance) {
            const saturationInput = this.container?.querySelector('.QYLSaturationInput');
            if (saturationInput) {
                saturationInput.value = saturation.toString();
            }
            if (this.colorPickInstance.indicator) {
                const percentage = hue / 360;
                const colorSpectrum = this.container?.querySelector('.QYLColorPickSpectrum');
                if (colorSpectrum) {
                    const maxLeft = colorSpectrum.offsetWidth - this.colorPickInstance.indicator.offsetWidth;
                    this.colorPickInstance.indicator.style.left = `${percentage * maxLeft}px`;
                    const okhclHue = hue;
                    let chroma = 0.4; 
                    if (hue >= 45 && hue <= 75) {
                        chroma = 0.6;
                    } else if (hue >= 30 && hue <= 90) {
                        chroma = 0.5;
                    } else if (hue >= 240 && hue <= 300) {
                        chroma = 0.5;
                    } else if (hue >= 150 && hue <= 210) {
                        chroma = 0.25;
                    }
                    const indicatorColor = `oklch(0.95 ${chroma} ${hue}deg)`;
                    this.colorPickInstance.indicator.style.background = indicatorColor;
                }
            }
        }
    }
    getColor() {
        if (this.colorPickInstance) {
            const colorData = this.colorPickInstance.getColor();
            if (colorData && typeof colorData === 'object' && colorData.hue !== undefined) {
                return colorData;
            }
            return null;
        }
        return null;
    }
    destroy() {
        if (this.handleClickOutside) {
            document.removeEventListener('click', this.handleClickOutside);
            this.handleClickOutside = null;
        }
        if (this.handleEscKey) {
            document.removeEventListener('keydown', this.handleEscKey);
            this.handleEscKey = null;
        }
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
        if (this.colorPickInstance) {
            this.colorPickInstance.destroy();
            this.colorPickInstance = null;
        }
        this.isVisible = false;
    }
    async loadFromConfig() {
        try {
            const config = await getConfig();
            const currentMode = ThemeMode.getThemeMode();
            const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
            const hueKey = `CustomMainColor${modeSuffix}`;
            const saturationKey = `CustomMainColorSaturate${modeSuffix}`;
            const hue = config[hueKey] || 0;
            const saturation = config[saturationKey] || 0.5;
            return { hue, saturation };
        } catch (error) {
            return { hue: 0, saturation: 0.5 };
        }
    }
    async saveToConfig(hue, saturation) {
        try {
            const config = await getConfig();
            const currentMode = ThemeMode.getThemeMode();
            const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
            const hueKey = `CustomMainColor${modeSuffix}`;
            const saturationKey = `CustomMainColorSaturate${modeSuffix}`;
            config[hueKey] = hue;
            config[saturationKey] = saturation;
            await saveConfig(config);
        } catch (error) {
        }
    }
}
export const customColor = new CustomColor();
