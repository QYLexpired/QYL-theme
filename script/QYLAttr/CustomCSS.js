let QYLcssObserver = null;
let QYLcssContainer = null;
let QYLcssDebouncedApplyCSS = null;
let observerBound = false;
function QYLcssApplyCustomCSS() {
    if (QYLcssObserver) {
        QYLcssObserver.disconnect();
    }
    const elements = document.querySelectorAll('div[custom-css]');
    const cssRules = [];
    const containerSelector = ':is(#layouts, #preview, [data-key="dialog-exportimage"], #editor)';
    elements.forEach(element => {
        const cssValue = element.getAttribute('custom-css');
        const nodeId = element.getAttribute('data-node-id');
        if (cssValue) {
            if (nodeId) {
                cssRules.push(`${containerSelector} div[data-node-id="${nodeId}"] { ${cssValue} }`);
            } else {
                let uid = element.getAttribute('data-css-uid');
                if (!uid) {
                    uid = `cssuid-${crypto.randomUUID().replace(/-/g, '')}`;
                    element.setAttribute('data-css-uid', uid);
                }
                const prevSibling = element.previousElementSibling;
                if (prevSibling && prevSibling.classList.contains('protyle-top')) {
                    prevSibling.setAttribute('data-css-uid', uid);
                }
                cssRules.push(`${containerSelector} div[data-css-uid="${uid}"] { ${cssValue} }`);
            }
        }
    });
    const existingStyle = document.getElementById('snippet-QYLcss-dynamic-css');
    if (existingStyle) existingStyle.remove();
    if (cssRules.length > 0) {
        const style = document.createElement('style');
        style.id = 'snippet-QYLcss-dynamic-css';
        style.textContent = cssRules.join('\n');
        document.head.appendChild(style);
    }
    if (QYLcssContainer && QYLcssObserver) {
        QYLcssObserver.observe(QYLcssContainer, QYLcssObserverConfig);
    }
}
function QYLcssDebounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}
const QYLcssObserverConfig = {
    attributes: true,
    attributeFilter: ['custom-css', 'data-node-id', 'data-css-uid'],
    subtree: true
};
function initCustomCSS() {
    QYLcssDebouncedApplyCSS = QYLcssDebounce(QYLcssApplyCustomCSS, 250);
    if (!observerBound) {
        const isMobile = document.body.classList.contains('QYLmobile');
        QYLcssContainer = isMobile ? document.querySelector('#editor') : document.querySelector('.layout__center');
        if (QYLcssContainer) {
            QYLcssObserver = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'attributes' && 
                        (mutation.attributeName === 'custom-css' || 
                         mutation.attributeName === 'data-node-id' ||
                         mutation.attributeName === 'data-css-uid')) {
                        QYLcssDebouncedApplyCSS();
                    }
                });
            });
            QYLcssObserver.observe(QYLcssContainer, QYLcssObserverConfig);
            QYLcssApplyCustomCSS();
            observerBound = true;
        } else {
            setTimeout(initCustomCSS, 200);
        }
    }
}
function cleanupCustomCSS() {
    if (QYLcssObserver) {
        QYLcssObserver.disconnect();
        QYLcssObserver = null;
    }
    const existingStyle = document.getElementById('snippet-QYLcss-dynamic-css');
    if (existingStyle) {
        existingStyle.remove();
    }
    QYLcssContainer = null;
    QYLcssDebouncedApplyCSS = null;
}
export { initCustomCSS, cleanupCustomCSS };
