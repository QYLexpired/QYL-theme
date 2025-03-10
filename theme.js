window.theme = {};
window.theme.themeMode = (() => {
    switch (window.siyuan.config.appearance.mode) {
        case 0: return 'light';
        case 1: return 'dark';
        default: return 'light';
    }
})();
window.theme.ID = {
    CSS: 'QYL-theme-style',
    JS: 'QYL-theme-script'
};

window.theme.loadThemeAssets = () => {
    const isLight = window.theme.themeMode === 'light';
    const basePath = "/appearance/themes/QYL-theme/";
    const filePrefix = isLight ? "QYL-theme" : "QYL-dark";

    const cssLink = document.getElementById(window.theme.ID.CSS);
    const cssPath = `${basePath}${filePrefix}.css`;
    if (cssLink) {
        cssLink.href = cssPath;
    } else {
        const newCss = document.createElement('link');
        newCss.id = window.theme.ID.CSS;
        newCss.rel = 'stylesheet';
        newCss.href = cssPath;
        document.head.appendChild(newCss);
    }

    const jsScript = document.getElementById(window.theme.ID.JS);
    const jsPath = `${basePath}${filePrefix}.js`;
    if (jsScript) {
        jsScript.parentElement.removeChild(jsScript);
    }
    const newJs = document.createElement('script');
    newJs.id = window.theme.ID.JS;
    newJs.src = jsPath;
    document.head.appendChild(newJs);
};

window.theme.loadThemeAssets();