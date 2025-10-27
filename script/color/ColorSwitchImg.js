import '../basic/FastAverageColor.js';
import '../basic/ColorJs.js';
import ThemeMode from '../basic/ThemeMode.js';
class ColorSwitchImg {
    constructor() {
        this.startTime = Date.now();
        this.waitForFastAverageColor();
        this.lastNonBlackColor = null;
        this.observer = null;
        this.isActive = false;
        this.debounceTimer = null;
        this.currentContainer = null; 
        this.containerColorCache = new Map();
        this.colorParseCache = new Map(); 
        // 渐变相关状态
        this.transitionDuration = 900; // ms，颜色过渡时长
        this.transitionEasing = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
        this._rafId = null;
        this._currentHex = null; // 最近一次应用到 :root 的颜色
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
            const oklchColor = color.to('oklch');
            if (!oklchColor || !Array.isArray(oklchColor.coords) || oklchColor.coords.some(val => isNaN(val) || !isFinite(val))) {
                return null;
            }
            const l = Math.round(oklchColor.coords[0] * 1000) / 1000;
            const c = Math.round(oklchColor.coords[1] * 1000) / 1000;
            const h = Math.round(oklchColor.coords[2]);
            if (isNaN(l) || isNaN(c) || isNaN(h)) {
                return null;
            }
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
                    this.checkAndUpdateContainers();
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
    checkAndUpdateContainers() {
        const currentActiveContainer = this.getCurrentActiveContainer();
        if (this.hasContainerChanged(currentActiveContainer)) {
            this.currentContainer = currentActiveContainer;
            this.findAndAnalyzeContainers();
        }
    }
    getCurrentActiveContainer() {
        const containers = document.querySelectorAll('.layout__center .layout__wnd--active > .layout-tab-container > .fn__flex-1:not(.fn__none) .protyle-background__img');
        return containers.length > 0 ? containers[0] : null;
    }
    hasContainerChanged(newContainer) {
        if (!this.currentContainer && newContainer) {
            return true;
        }
        if (this.currentContainer && !newContainer) {
            return true;
        }
        if (this.currentContainer && newContainer) {
            return this.currentContainer !== newContainer;
        }
        return false;
    }
    findAndAnalyzeContainers() {
        const container = this.getCurrentActiveContainer();
        if (container) {
            this.processBackgroundContainer(container);
        }
    }
    processBackgroundContainer(container) {
        const containerId = this.generateContainerId(container);
        if (this.containerColorCache.has(containerId)) {
            const cachedColor = this.containerColorCache.get(containerId);
            this.applyCachedColorToContainer(container, cachedColor);
            return;
        }
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
                        this.applyColorToContainer(container, styleColor, containerId);
                    } else {
                        this.analyzeImageColor(img, container, containerId);
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
                const containerId = this.generateContainerId(container);
                this.applyColorToContainer(container, result, containerId);
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
        const backgroundColor = style.backgroundColor;
        if (backgroundColor && backgroundColor !== 'transparent' && backgroundColor !== 'none' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
            return backgroundColor;
        }
        const background = style.background;
        if (background && background !== 'transparent' && background !== 'none' && background !== 'rgba(0, 0, 0, 0)') {
            const gradientMatch = background.match(/linear-gradient\([^)]+\)/);
            if (gradientMatch) {
                return this.extractMainColorFromGradient(background);
            }
            return background;
        }
        const backgroundImage = style.backgroundImage;
        if (backgroundImage && backgroundImage !== 'none') {
            const imageMatch = backgroundImage.match(/url\([^)]+\)/);
            if (imageMatch) {
                return null; 
            }
            const gradientMatch = backgroundImage.match(/linear-gradient\([^)]+\)/);
            if (gradientMatch) {
                return this.extractMainColorFromGradient(backgroundImage);
            }
        }
        return null;
    }
    extractMainColorFromGradient(gradientString) {
        try {
            const colorRegex = /(#[0-9a-fA-F]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\))/g;
            const colors = [];
            let colorMatch;
            while ((colorMatch = colorRegex.exec(gradientString)) !== null) {
                colors.push(colorMatch[1]);
            }
            if (colors.length === 0) {
                return null;
            }
            let mostVibrantColor = colors[0];
            let maxSaturation = 0;
            colors.forEach(color => {
                const rgb = this.parseColorToRGB(color);
                if (rgb) {
                    const saturation = this.calculateSaturation(rgb.r, rgb.g, rgb.b);
                    if (saturation > maxSaturation) {
                        maxSaturation = saturation;
                        mostVibrantColor = color;
                    }
                }
            });
            return mostVibrantColor;
        } catch (error) {
            const firstColorMatch = gradientString.match(/(#[0-9a-fA-F]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\))/);
            return firstColorMatch ? firstColorMatch[1] : null;
        }
    }
    parseColorToRGB(colorString) {
        const result = this.parseSimpleColor(colorString);
        return result ? { r: result.value[0], g: result.value[1], b: result.value[2] } : null;
    }
    calculateSaturation(r, g, b) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        return max === 0 ? 0 : delta / max;
    }
    generateContainerId(container) {
        const images = container.querySelectorAll('img');
        const videos = container.querySelectorAll('video');
        let contentHash = '';
        images.forEach((img, index) => {
            const src = img.src || img.getAttribute('data-src') || '';
            const style = img.style.cssText || '';
            contentHash += `img_${index}_${src}_${style}`;
        });
        videos.forEach((video, index) => {
            const src = video.src || video.getAttribute('data-src') || '';
            const style = video.style.cssText || '';
            contentHash += `video_${index}_${src}_${style}`;
        });
        const containerStyle = container.style.cssText || '';
        contentHash += `container_${containerStyle}`;
        let hash = 0;
        for (let i = 0; i < contentHash.length; i++) {
            const char = contentHash.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; 
        }
        return hash.toString();
    }
    parseSimpleColor(colorValue) {
        if (this.colorParseCache.has(colorValue)) {
            const cached = this.colorParseCache.get(colorValue);
            if (cached && cached.hex) {
                return cached;
            }
        }
        try {
            if (typeof Color === 'undefined') {
                return null;
            }
            const color = new Color(colorValue);
            const rgb = color.coords;
            const alpha = color.alpha;
            if (!Array.isArray(rgb) || rgb.some(val => isNaN(val) || !isFinite(val))) {
                return null;
            }
            if (alpha === 0) {
                return null;
            }
            const r = Math.round(rgb[0] * 255);
            const g = Math.round(rgb[1] * 255);
            const b = Math.round(rgb[2] * 255);
            const a = alpha;
            const hex = color.toString({ format: 'hex' });
            const rgbString = `rgb(${r},${g},${b})`;
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            const isDark = brightness < 128;
            const result = {
                hex: hex,
                rgb: rgbString,
                rgba: `rgba(${r},${g},${b},${a})`,
                isDark: isDark,
                isLight: !isDark,
                value: [r, g, b, Math.round(a * 255)],
                error: null
            };
            this.colorParseCache.set(colorValue, result);
            return result;
        } catch (error) {
            return null;
        }
    }
    async analyzeImageColor(img, container, containerId) {
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
                this.applyColorToContainer(container, result, containerId);
            }
        } catch (error) {
        }
    }
    applyColorToContainer(container, colorResult, containerId) {
        let finalColor = colorResult;
        if (colorResult.hex === '#000000') {
            if (this.lastNonBlackColor) {
                finalColor = this.lastNonBlackColor;
            } else {
                finalColor = {
                    hex: '#4c77d2',
                    rgb: 'rgb(76,119,210)',
                    rgba: 'rgba(76,119,210,1)',
                    isDark: false,
                    isLight: true,
                    value: [76, 119, 210, 255],
                    error: null
                };
            }
        } else {
            this.lastNonBlackColor = colorResult;
        }
        if (containerId) {
            this.containerColorCache.set(containerId, finalColor);
        }
        this.applyColorToDOM(container, finalColor);
    }
    applyCachedColorToContainer(container, cachedColor) {
        this.applyColorToDOM(container, cachedColor);
    }
    updateColorReverse(color) {
        try {
            if (typeof Color === 'undefined') {
                return;
            }
            const colorObj = new Color(color.hex);
            const oklchColor = colorObj.to('oklch');
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
        } catch (error) {
            document.documentElement.style.removeProperty('--QYL-color-reverse');
        }
    }
    applyColorToDOM(container, color) {
        // 读取当前已应用的颜色（作为过渡起点）
        const root = document.documentElement;
        const computed = getComputedStyle(root).getPropertyValue('--QYL-custom-primary-pick').trim();
        const startHex = this._normalizeColorHex(computed) || this._currentHex || color.hex;
        const endHex = color.hex;

        // 若目标与当前一致，直接确保变量设置并返回
        if (this._colorsEqual(startHex, endHex)) {
            root.style.setProperty('--QYL-custom-primary-pick', endHex);
            this.updateColorReverse(color);
            const event = new CustomEvent('videoThemeColorUpdated', {
                detail: {
                    container: container,
                    color: color,
                    hex: endHex,
                    rgb: color.rgb,
                    isDark: color.isDark
                }
            });
            container.dispatchEvent(event);
            return;
        }

        // 取消进行中的过渡
        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }

        // 过渡动画：在 OKLCH 空间插值，获得更自然的颜色变化
        const startColor = new Color(startHex);
        const endColor = new Color(endHex);
        const start = performance.now();

        const tick = (now) => {
            let t = (now - start) / this.transitionDuration;
            if (t < 0) t = 0;
            if (t > 1) t = 1;
            const e = this.transitionEasing(t);
            const mixed = Color.mix(startColor, endColor, e, { space: 'oklch' });
            const mixedHex = mixed.toString({ format: 'hex' });
            root.style.setProperty('--QYL-custom-primary-pick', mixedHex);
            // 根据当前中间色动态更新反色阈值
            try {
                this.updateColorReverse({ hex: mixedHex });
            } catch (err) {}
            this._currentHex = mixedHex;
            if (t < 1) {
                this._rafId = requestAnimationFrame(tick);
            } else {
                this._rafId = null;
                // 结束时确保精确设置为目标色
                root.style.setProperty('--QYL-custom-primary-pick', endHex);
                this._currentHex = endHex;
                this.updateColorReverse(color);
                const event = new CustomEvent('videoThemeColorUpdated', {
                    detail: {
                        container: container,
                        color: color,
                        hex: endHex,
                        rgb: color.rgb,
                        isDark: color.isDark
                    }
                });
                container.dispatchEvent(event);
            }
        };
        this._rafId = requestAnimationFrame(tick);
    }

    _normalizeColorHex(val) {
        if (!val) return null;
        const v = val.trim();
        // 可能是 rgb()/oklch()/等，尽量转换为 hex
        try {
            const c = new Color(v);
            return c.toString({ format: 'hex' });
        } catch (e) {
            // 简单匹配 #rrggbb
            const m = v.match(/#([0-9a-fA-F]{6})/);
            return m ? `#${m[1]}` : null;
        }
    }

    _colorsEqual(a, b) {
        if (!a || !b) return false;
        return a.toLowerCase() === b.toLowerCase();
    }
    destroy() {
        this.isActive = false;
        this.startTime = null;
        this.currentContainer = null; 
        this.containerColorCache.clear();
        this.colorParseCache.clear(); 
        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
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
        document.documentElement.style.removeProperty('--QYL-custom-primary-pick');
        this._currentHex = null;
        this.lastNonBlackColor = null;
        document.documentElement.classList.remove('QYLColorSwitchImg');
    }
}
let colorSwitchImgInstance = null;
export function startColorSwitchImg() {
    if (colorSwitchImgInstance) {
        colorSwitchImgInstance.destroy();
        colorSwitchImgInstance = null;
    }
    colorSwitchImgInstance = new ColorSwitchImg();
    colorSwitchImgInstance.init();
}
export function stopColorSwitchImg() {
    if (colorSwitchImgInstance) {
        colorSwitchImgInstance.destroy();
        colorSwitchImgInstance = null;
    }
}
