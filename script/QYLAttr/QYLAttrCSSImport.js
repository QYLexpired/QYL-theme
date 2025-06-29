const cssFiles = [
    "style/CustomAttr/font-family.css",
    "style/CustomAttr/h-style.css",
    "style/CustomAttr/height.css",
    "style/CustomAttr/style.css",
    "style/CustomAttr/table-style.css",
    "style/CustomAttr/blankblock-remind.css",
    "style/CustomAttr/list-view.css",
    "style/CustomAttr/img.css",
    "style/CustomAttr/sb-style.css",
    "style/CustomAttr/line-height.css",
    "style/CustomAttr/callout.css"
];
function getThemePath() {
    return '/appearance/themes/QYL-theme';
}
async function loadQYLcustomattrCSS() {
    try {
        const themePath = getThemePath();
        cleanupQYLcustomattrCSS();
        const loadPromises = cssFiles.map(async (filePath, index) => {
            const fullPath = `${themePath}/${filePath}`;
            let retries = 3;
            while (retries > 0) {
                try {
                    const response = await fetch(fullPath);
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    const cssContent = await response.text();
                    const style = document.createElement('style');
                    style.id = `snippet-QYLcustomattrCSS-${index}`;
                    style.textContent = cssContent;
                    document.head.appendChild(style);
                    return true;
                } catch (error) {
                    retries--;
                    if (retries === 0) {
                        throw error;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000)); 
                }
            }
        });
        await Promise.all(loadPromises);
        return true;
    } catch (error) {
        return false;
    }
}
export function cleanupQYLcustomattrCSS() {
    for (let i = 0; i < cssFiles.length; i++) {
        const style = document.getElementById(`snippet-QYLcustomattrCSS-${i}`);
        if (style) {
            style.remove();
        }
    }
    const oldStyle = document.getElementById('snippet-QYLcustomattrCSS');
    if (oldStyle) {
        oldStyle.remove();
    }
}
export function initQYLcustomattrCSS() {
    loadQYLcustomattrCSS().then(success => {
        if (success) {
        } else {
        }
    });
}
export { loadQYLcustomattrCSS };
