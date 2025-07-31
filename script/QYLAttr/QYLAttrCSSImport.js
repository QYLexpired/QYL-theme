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
    "style/CustomAttr/callout.css",
    "style/CustomAttr/flashcardattr.css"
];
let cssCache = new Map();
let isInitialized = false;
function getThemePath() {
    return '/appearance/themes/QYL';
}
async function loadQYLcustomattrCSS() {
    if (isInitialized) {
        return true;
    }
    try {
        const themePath = getThemePath();
        cleanupQYLcustomattrCSS();
        const loadPromises = cssFiles.map(async (filePath, index) => {
            const fullPath = `${themePath}/${filePath}`;
            if (cssCache.has(fullPath)) {
                const cachedContent = cssCache.get(fullPath);
                const style = document.createElement('style');
                style.id = `snippet-QYLcustomattrCSS-${index}`;
                style.textContent = cachedContent;
                document.head.appendChild(style);
                return true;
            }
            let retries = 3;
            while (retries > 0) {
                try {
                    const response = await fetch(fullPath);
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    const cssContent = await response.text();
                    cssCache.set(fullPath, cssContent);
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
        isInitialized = true;
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
    isInitialized = false;
}
export function initQYLcustomattrCSS() {
    loadQYLcustomattrCSS().then(success => {
    });
}
export { loadQYLcustomattrCSS };
