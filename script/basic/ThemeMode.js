const ThemeMode = {
    getThemeMode: () => {
        switch (window?.siyuan?.config?.appearance?.mode) {
            case 0: return 'light';
            case 1: return 'dark';
            default: return 'light';
        }
    },
    isDarkMode: function() { return this.getThemeMode() === 'dark'; },
    isLightMode: function() { return this.getThemeMode() === 'light'; },
    listeners: [],
    addModeChangeListener: function(callback) {
        this.listeners.push(callback);
    },
    removeModeChangeListener: function(callback) {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    },
    notifyModeChange: function(newMode) {
        this.listeners.forEach(callback => {
            try {
                callback(newMode);
            } catch (error) {
            }
        });
    },
    initModeListener: function() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme-mode') {
                    const newMode = document.documentElement.getAttribute('data-theme-mode') === 'dark' ? 'dark' : 'light';
                    this.notifyModeChange(newMode);
                }
            });
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme-mode']
        });
    }
};
export default ThemeMode;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ThemeMode.initModeListener();
    });
} else {
    ThemeMode.initModeListener();
}
