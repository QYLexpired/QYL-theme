let isTopBarHidden = false;
let qKeyPressCount = 0;
let qKeyPressTimer = null;
export function initHideTopBar() {
    const style = document.createElement('style');
    style.id = 'QYL-HideTopBar';
    style.textContent = `
        #toolbar.toolbar {
            margin-bottom: -32px;
            opacity: 0;
            transition: var(--b3-transition);
            transform: translateY(-30px);
            z-index: 8;
            border-radius: 0 0 var(--b3-border-radius) var(--b3-border-radius);
            box-shadow: var(--b3-point-shadow);
            border-bottom: 1px solid var(--b3-theme-surface-lighter);
            & > * {
                transform: translateY(-0.5px);
            }
            &:hover {
                opacity: 1;
                transform: translateY(0px);
            }
        }
    `;
    document.head.appendChild(style);
    document.addEventListener('keydown', handleKeyPress);
}
function handleKeyPress(event) {
    if (event.key.toLowerCase() === 'q') {
        qKeyPressCount++;
        if (qKeyPressTimer) {
            clearTimeout(qKeyPressTimer);
        }
        qKeyPressTimer = setTimeout(() => {
            qKeyPressCount = 0;
        }, 1000);
        if (qKeyPressCount >= 3) {
            toggleTopBarVisibility();
            qKeyPressCount = 0; 
        }
    }
}
function toggleTopBarVisibility() {
    const style = document.getElementById('QYL-HideTopBar');
    if (isTopBarHidden) {
        if (style) {
            style.remove();
        }
        isTopBarHidden = false;
    } else {
        if (!style) {
            initHideTopBar();
        }
        isTopBarHidden = true;
    }
}
export function removeHideTopBar() {
    const style = document.getElementById('QYL-HideTopBar');
    if (style) {
        style.remove();
    }
    document.removeEventListener('keydown', handleKeyPress);
    isTopBarHidden = false;
    qKeyPressCount = 0;
    if (qKeyPressTimer) {
        clearTimeout(qKeyPressTimer);
        qKeyPressTimer = null;
    }
}
