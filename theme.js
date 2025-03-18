window.theme = {};
window.theme.themeMode = (() => {
    switch (window.siyuan.config.appearance.mode) {
        case 0: return 'light';
        case 1: return 'dark';
        default: return 'light';
    }
})();

(function loadThemeResources() {
    const themePath = '/appearance/themes/QYL-theme/';
    const themeStyleID = 'themeStyle';

    const existingScripts = document.querySelectorAll(`script[src^="${themePath}QYL-"]`);
    existingScripts.forEach(script => script.remove());

    if (window.theme.themeMode === 'dark') {
        const oldStyle = document.getElementById(themeStyleID);
        if (oldStyle) oldStyle.remove();

        const darkJS = document.createElement('script');
        darkJS.src = `${themePath}QYL-dark.js`;
        document.head.appendChild(darkJS);

        const darkCSS = document.createElement('link');
        darkCSS.id = themeStyleID;
        darkCSS.rel = 'stylesheet';
        darkCSS.href = `${themePath}QYL-dark.css`;
        document.head.appendChild(darkCSS);
    } else {

        const lightJS = document.createElement('script');
        lightJS.src = `${themePath}QYL-light.js`;
        document.head.appendChild(lightJS);
    }
})();