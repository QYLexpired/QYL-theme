import '../basic/FastAverageColor.js';
class ColorSwitchImg {
    constructor() {
        this.startTime = Date.now();
        this.waitForFastAverageColor();
        this.lastNonBlackColor = null;
        this.observer = null;
        this.isActive = false;
        this.debounceTimer = null;
    }
    async waitForFastAverageColor() {
        let attempts = 0;
        const maxAttempts = 50; 
        while ((typeof FastAverageColor === 'undefined' || typeof Color === 'undefined') && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        if (typeof FastAverageColor === 'undefined') {
            return;
        }
        if (typeof Color === 'undefined') {
            return;
        }
        this.fastAverageColor = new FastAverageColor();
    }
    rgbToOklch(rgbString) {
        try {
            if (typeof Color === 'undefined') {
                return null;
            }
            const color = new Color(rgbString);
            const oklchColor = color.oklch;
            const l = Math.round(oklchColor[0] * 1000) / 1000;
            const c = Math.round(oklchColor[1] * 1000) / 1000;
            const h = Math.round(oklchColor[2]);
            return `oklch(${l} ${c} ${h})`;
        } catch (error) {
            return null;
        }
    }
    init() {
        if (this.isActive) return;
        if (document.body.classList.contains('QYLmobile')) return;
        this.isActive = true;
        document.documentElement.classList.add('QYLColorSwitchImg');
        this.findAndObserveLayoutCenter();
    }
    findAndObserveLayoutCenter() {
        let attempts = 0;
        const maxAttempts = 15;
        const findLayoutCenter = () => {
            const layoutCenter = document.querySelector('.layout__center');
            if (layoutCenter) {
                this.observeLayoutCenter(layoutCenter);
                return;
            }
            attempts++;
            if (attempts < maxAttempts) {
                setTimeout(findLayoutCenter, 100);
            }
        };
        findLayoutCenter();
    }
    observeLayoutCenter(layoutCenter) {
        this.observer = new MutationObserver((mutations) => {
            let hasRelevantChange = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    hasRelevantChange = true;
                } else if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    hasRelevantChange = true;
                }
            });
            if (hasRelevantChange) {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => {
                    this.findAndAnalyzeContainers();
                }, 200);
            }
        });
        this.observer.observe(layoutCenter, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
        this.findAndAnalyzeContainers();
    }
    findAndAnalyzeContainers() {
        let containers = document.querySelectorAll('.layout__center .layout__wnd--active > .layout-tab-container > .fn__flex-1:not(.fn__none) .protyle-background__img');
        if (containers.length === 0 && this.startTime && (Date.now() - this.startTime) <= 2000) {
            const fallbackContainer = document.querySelector('.layout__center [data-type="wnd"] > .layout-tab-container > .fn__flex-1:not(.fn__none) .protyle-background__img');
            if (fallbackContainer) {
                containers = [fallbackContainer];
            }
        }
        containers.forEach(container => {
            this.processBackgroundContainer(container);
        });
    }
    processBackgroundContainer(container) {
        const videos = container.querySelectorAll('video');
        if (videos.length > 0) {
            videos.forEach(video => {
                this.analyzeVideoColor(video, container);
            });
        } else {
            const images = container.querySelectorAll('img');
            if (images.length > 0) {
                images.forEach(img => {
                    const styleColor = this.extractColorFromStyle(img);
                    if (styleColor) {
                        this.applyColorToContainer(container, styleColor);
                    } else {
                        this.analyzeImageColor(img, container);
                    }
                });
            }
        }
    }
    async analyzeVideoColor(video, container) {
        try {
            if (video.readyState < 2) {
                await new Promise((resolve) => {
                    video.addEventListener('loadeddata', resolve, { once: true });
                });
            }
            const result = await this.fastAverageColor.getColorAsync(video, {
                algorithm: 'dominant',
                step: 1
            });
            if (result && !result.error) {
                this.applyColorToContainer(container, result);
            }
        } catch (error) {
        }
    }
    extractColorFromStyle(img) {
        const style = img.style;
        if (!style) return null;
        const colorValue = this.getFirstValidColor(style);
        if (colorValue) {
            return this.parseSimpleColor(colorValue);
        }
        return null;
    }
    getFirstValidColor(style) {
        const colorProps = ['backgroundColor', 'background', 'color'];
        for (const prop of colorProps) {
            const value = style[prop];
            if (value && value !== 'transparent' && value !== 'none' && value !== 'rgba(0, 0, 0, 0)') {
                return value;
            }
        }
        const styleString = style.cssText || '';
        const colorMatch = styleString.match(/(?:background(?:-color)?|color)\s*:\s*([^;]+)/);
        if (colorMatch) {
            const value = colorMatch[1].trim();
            if (value && value !== 'transparent' && value !== 'none') {
                return value;
            }
        }
        return null;
    }
    parseSimpleColor(colorValue) {
        try {
            const tempDiv = document.createElement('div');
            tempDiv.style.color = colorValue;
            document.body.appendChild(tempDiv);
            const computedColor = getComputedStyle(tempDiv).color;
            document.body.removeChild(tempDiv);
            if (computedColor === 'rgba(0, 0, 0, 0)' || computedColor === 'transparent') {
                return null;
            }
            const rgbMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (rgbMatch) {
                const r = parseInt(rgbMatch[1]);
                const g = parseInt(rgbMatch[2]);
                const b = parseInt(rgbMatch[3]);
                const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1;
                const hex = this.rgbToHex(r, g, b);
                const rgb = `rgb(${r},${g},${b})`;
                const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                const isDark = brightness < 128;
                return {
                    hex: hex,
                    rgb: rgb,
                    rgba: `rgba(${r},${g},${b},${a})`,
                    isDark: isDark,
                    isLight: !isDark,
                    value: [r, g, b, Math.round(a * 255)],
                    error: null
                };
            }
            return null;
        } catch (error) {
            return null;
        }
    }
    rgbToHex(r, g, b) {
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return '#' + toHex(r) + toHex(g) + toHex(b);
    }
    async analyzeImageColor(img, container) {
        try {
            if (!img.complete) {
                await new Promise((resolve) => {
                    img.addEventListener('load', resolve, { once: true });
                });
            }
            const result = await this.fastAverageColor.getColorAsync(img, {
                algorithm: 'dominant',
                step: 1
            });
            if (result && !result.error) {
                this.applyColorToContainer(container, result);
            }
        } catch (error) {
        }
    }
    applyColorToContainer(container, colorResult) {
        let finalColor = colorResult;
        if (colorResult.hex === '#000000') {
            if (this.lastNonBlackColor) {
                finalColor = this.lastNonBlackColor;
            } else {
                finalColor = this.createColorObject(76, 119, 210); 
            }
        } else {
            this.lastNonBlackColor = colorResult;
        }
        const oklchColor = this.rgbToOklch(finalColor.rgb);
        if (oklchColor) {
            const oklchMatch = oklchColor.match(/oklch\(([^)]+)\)/);
            if (oklchMatch) {
                const values = oklchMatch[1].trim().split(/\s+/);
                if (values.length >= 3) {
                    const l = values[0];
                    const c = values[1];
                    const h = values[2];
                    document.documentElement.style.setProperty('--QYL-Img-L', l);
                    document.documentElement.style.setProperty('--QYL-Img-C', c);
                    document.documentElement.style.setProperty('--QYL-Img-H', h + 'deg');
                }
            }
        }
        const event = new CustomEvent('videoThemeColorUpdated', {
            detail: {
                container: container,
                color: finalColor,
                hex: finalColor.hex,
                rgb: finalColor.rgb,
                oklch: oklchColor,
                isDark: finalColor.isDark
            }
        });
        container.dispatchEvent(event);
    }
    createColorObject(r, g, b) {
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        const isDark = brightness < 128;
        return {
            hex: this.rgbToHex(r, g, b),
            rgb: `rgb(${r},${g},${b})`,
            rgba: `rgba(${r},${g},${b},1)`,
            isDark: isDark,
            isLight: !isDark,
            value: [r, g, b, 255],
            error: null
        };
    }
    destroy() {
        this.isActive = false;
        this.startTime = null;
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = null;
        }
        if (this.fastAverageColor) {
            this.fastAverageColor.destroy();
            this.fastAverageColor = null;
        }
        document.documentElement.style.removeProperty('--QYL-Img-L');
        document.documentElement.style.removeProperty('--QYL-Img-C');
        document.documentElement.style.removeProperty('--QYL-Img-H');
        this.lastNonBlackColor = null;
        document.documentElement.classList.remove('QYLColorSwitchImg');
        const containers = document.querySelectorAll('.protyle-background__img');
        containers.forEach(container => {
            container.removeEventListener('videoThemeColorUpdated', this.handleColorUpdate);
        });
    }
}
let colorSwitchImgInstance = null;
export function startColorSwitchImg() {
    if (!colorSwitchImgInstance) {
        colorSwitchImgInstance = new ColorSwitchImg();
    }
    colorSwitchImgInstance.init();
}
export function stopColorSwitchImg() {
    if (colorSwitchImgInstance) {
        colorSwitchImgInstance.destroy();
        colorSwitchImgInstance = null;
    } else {
        document.documentElement.style.removeProperty('--QYL-Img-L');
        document.documentElement.style.removeProperty('--QYL-Img-C');
        document.documentElement.style.removeProperty('--QYL-Img-H');
        document.documentElement.classList.remove('QYLColorSwitchImg');
    }
}
