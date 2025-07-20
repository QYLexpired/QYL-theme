import { isMobile } from './Device.js';
class PWAThemeColor {
    constructor() {
        this.isActive = true;
        this.initTimeout = null;
        this.init();
    }
    init() {
        this.updateThemeColor();
        this.initTimeout = setTimeout(() => {
            if (this.isActive) {
                this.updateThemeColor();
            }
        }, 1500);
    }
    getThemeSurfaceColor() {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        return computedStyle.getPropertyValue('--b3-theme-surface').trim();
    }
    updateThemeColor() {
        if (!this.isActive) return;
        const metaThemeColor = document.querySelector('head meta[name="theme-color"]');
        const metaAppleStatusBar = document.querySelector('head meta[name="apple-mobile-web-app-status-bar-style"]');
        if (!metaThemeColor && !metaAppleStatusBar) {
            this.waitForMetaTag();
            return;
        }
        const surfaceColor = this.getThemeSurfaceColor();
        if (surfaceColor) {
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', surfaceColor);
            }
            if (metaAppleStatusBar) {
                metaAppleStatusBar.setAttribute('content', surfaceColor);
            }
        }
    }
    waitForMetaTag() {
        const maxWaitTime = 1500; 
        const checkInterval = 100; 
        let elapsedTime = 0;
        let foundTag = false;
        const checkForMetaTag = () => {
            if (!this.isActive) return;
            const metaThemeColor = document.querySelector('head meta[name="theme-color"]');
            const metaAppleStatusBar = document.querySelector('head meta[name="apple-mobile-web-app-status-bar-style"]');
            if ((metaThemeColor || metaAppleStatusBar) && !foundTag) {
                foundTag = true;
            }
            elapsedTime += checkInterval;
            if (elapsedTime >= maxWaitTime) {
                if (foundTag) {
                    this.updateThemeColor();
                } else {
                    if (isMobile) {
                        const ua = navigator.userAgent;
                        const head = document.head;
                        const surfaceColor = this.getThemeSurfaceColor() || '#ffffff';
                        if (/Android/i.test(ua)) {
                            if (!metaThemeColor) {
                                const meta = document.createElement('meta');
                                meta.name = 'theme-color';
                                meta.content = surfaceColor;
                                head.appendChild(meta);
                            }
                        } else if (/iPhone|iPad|iPod|ios|Apple/i.test(ua)) {
                            if (!metaAppleStatusBar) {
                                const meta = document.createElement('meta');
                                meta.name = 'apple-mobile-web-app-status-bar-style';
                                meta.content = surfaceColor;
                                head.appendChild(meta);
                            }
                        }
                        this.updateThemeColor();
                    } else {
                        this.stop();
                    }
                }
                return;
            }
            setTimeout(checkForMetaTag, checkInterval);
        };
        checkForMetaTag();
    }
    stop() {
        this.isActive = false;
        if (this.initTimeout) {
            clearTimeout(this.initTimeout);
            this.initTimeout = null;
        }
    }
}
const pwaThemeColor = new PWAThemeColor();
export const updatePWAThemeColor = () => {
    if (pwaThemeColor.isActive) {
        pwaThemeColor.updateThemeColor();
    }
};
export default pwaThemeColor;
