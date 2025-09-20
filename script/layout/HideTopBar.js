let isTopBarHidden = false;
let qKeyPressCount = 0;
let qKeyPressTimer = null;
export function initHideTopBar() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    const style = document.createElement('style');
    style.id = 'QYL-HideTopBar';
    style.textContent = `
        #toolbar.toolbar {
            margin-bottom: -32px;
            opacity: 0;
            box-shadow: var(--b3-shadow-outside);
            border-bottom: 1px solid var(--b3-theme-surface-lighter);
            transition: var(--b3-transition);
            transform: translateY(-32px);
            z-index: 8;
            overflow: visible;
            &::before {
                content: "";
                position: absolute;
                width: 120px;
                height: 12px;
                opacity: 0;
                bottom: -12px;
                left: 0;
            }
            &::after {
                content: "";
                position: absolute;
                width: 120px;
                height: 12px;
                opacity: 0;
                bottom: -12px;
                right: 0;
            }
            & > * {
                transform: translateY(0px);
            }
            &:hover {
                opacity: 1;
                transform: translateY(0px);
            }
        }
        .dock#dockLeft, .dock#dockRight {
            & .dock__item--space {
                -webkit-app-region: drag;
                app-region: drag;
            }
        }
        .layout--float.layout__dockl {
            top: 6px;
        }
        .layout--float.layout__dockr {
            top: 6px;
        }
    `;
    document.head.appendChild(style);
    document.addEventListener('keydown', handleKeyPress);
    isTopBarHidden = true;
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
