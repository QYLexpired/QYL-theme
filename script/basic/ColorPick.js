import { getConfig, saveConfig } from './Storage.js';
import ThemeMode from './ThemeMode.js';
export class ColorPick {
    constructor() {
        this.colorInput = null;
        this.onColorChange = null;
        this.container = null;
        this.colorSpectrum = null;
        this.indicator = null;
        this.saturationSlider = null;
        this.saturationInput = null;
        this.isDragging = false;
    }
    createColorPicker(callback, initialColor = '#000000') {
        this.colorInput = document.createElement('input');
        this.colorInput.type = 'color';
        this.colorInput.value = initialColor;
        this.colorInput.style.width = '50px';
        this.colorInput.style.height = '30px';
        this.colorInput.style.border = 'none';
        this.colorInput.style.borderRadius = '4px';
        this.onColorChange = callback;
        this.colorInput.addEventListener('input', (e) => {
            this.handleColorChange(e.target.value);
        });
        this.colorInput.addEventListener('change', (e) => {
            this.handleColorChange(e.target.value);
        });
        return this.colorInput;
    }
    createCustomColorPicker(callback, initialHue = 0, initialSaturation = 0.5) {
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
        this.saturationInput.addEventListener('input', async (e) => {
            const value = parseFloat(e.target.value);
            try {
                const config = await getConfig();
                const currentMode = ThemeMode.getThemeMode();
                const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
                const saturationKey = `CustomMainColorSaturate${modeSuffix}`;
                config[saturationKey] = value;
                await saveConfig(config);
            } catch (error) {
            }
            document.documentElement.style.setProperty('--QYL-custom-primary-saturate', value.toString());
            const currentHue = this.getColor()?.hue || 0;
            if (callback) {
                callback({
                    hue: currentHue,
                    saturation: value,
                    type: 'saturation'
                });
            }
        });
        const updateColorDisplay = async (hue, shouldSaveHue = true) => {
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
            this.indicator.style.background = indicatorColor;
            const percentage = hue / 360;
            const maxLeft = this.colorSpectrum.offsetWidth - this.indicator.offsetWidth;
            this.indicator.style.left = `${percentage * maxLeft}px`;
            if (shouldSaveHue) {
                try {
                    const config = await getConfig();
                    const currentMode = ThemeMode.getThemeMode();
                    const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
                    const hueKey = `CustomMainColor${modeSuffix}`;
                    config[hueKey] = hue;
                    await saveConfig(config);
                } catch (error) {
                }
            }
            if (callback) {
                callback({
                    hue: hue,
                    okhclHue: okhclHue,
                    chroma: chroma,
                    oklch: indicatorColor,
                    type: 'hue'
                });
            }
        };
        const getHueFromPosition = (x) => {
            const rect = this.colorSpectrum.getBoundingClientRect();
            const relativeX = Math.max(0, Math.min(x - rect.left, rect.width));
            const percentage = relativeX / rect.width;
            return Math.round(percentage * 360);
        };
        this.colorSpectrum.addEventListener('mousedown', async (e) => {
            this.isDragging = true;
            const hue = getHueFromPosition(e.clientX);
            await updateColorDisplay(hue, true);
        });
        document.addEventListener('mousemove', async (e) => {
            if (this.isDragging) {
                const hue = getHueFromPosition(e.clientX);
                await updateColorDisplay(hue, true);
            }
        });
        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
            }
        });
        this.colorSpectrum.addEventListener('click', async (e) => {
            if (!this.isDragging) {
                const hue = getHueFromPosition(e.clientX);
                await updateColorDisplay(hue, true);
            }
        });
        this.colorSpectrum.appendChild(this.indicator);
        this.saturationSlider.appendChild(this.saturationInput);
        this.container.appendChild(this.colorSpectrum);
        this.container.appendChild(this.saturationSlider);
        setTimeout(() => {
            updateColorDisplay(initialHue, false).catch(error => {
            });
        }, 0);
        return this.container;
    }
    handleColorChange(hexColor) {
        const rgb = this.hexToRgb(hexColor);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const okhclHue = hsl.h;
        if (this.onColorChange) {
            this.onColorChange({
                hex: hexColor,
                rgb: rgb,
                hsl: hsl,
                hue: hsl.h,
                okhclHue: okhclHue
            });
        }
    }
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }
    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }
    calculateOKHCLHue(hslHue) {
        return hslHue;
    }
    setColor(color) {
        if (this.colorInput) {
            this.colorInput.value = color;
            this.handleColorChange(color);
        }
    }
    getColor() {
        if (this.colorInput) {
            return this.colorInput.value;
        } else if (this.indicator && this.colorSpectrum) {
            let hue = 0;
            if (this.indicator.style.left) {
                const maxLeft = this.colorSpectrum.offsetWidth - this.indicator.offsetWidth;
                if (maxLeft > 0) {
                    const percentage = parseFloat(this.indicator.style.left) / maxLeft;
                    hue = Math.round(percentage * 360);
                }
            }
            const saturation = this.saturationInput ? parseFloat(this.saturationInput.value) : 0.5;
            return {
                hue: hue,
                saturation: saturation
            };
        }
        return null;
    }
    destroy() {
        if (this.colorInput) {
            this.colorInput.remove();
            this.colorInput = null;
        }
        if (this.container) {
            this.container.remove();
            this.container = null;
            this.colorSpectrum = null;
            this.indicator = null;
            this.saturationSlider = null;
            this.saturationInput = null;
        }
        this.onColorChange = null;
        this.isDragging = false;
    }
}
export default ColorPick;
