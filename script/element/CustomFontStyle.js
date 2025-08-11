import { putFile, getFile } from '../basic/API.js';
import ThemeMode from '../basic/ThemeMode.js';
import i18n from '../../i18n/i18n.js';
let isInitialized = false;
export async function initCustomFontStyle() {
    if (isInitialized) {
        return;
    }
    isInitialized = true;
    try {
        const configContent = await getFile('/data/snippets/QYL-CustomFontStyle.json');
        if (!configContent) {
            return;
        }
        const config = JSON.parse(configContent);
        await updateCustomFontStyleCSS(config);
    } catch (error) {
    }
}
export function removeCustomFontStyle() {
    if (!isInitialized) {
        return;
    }
    isInitialized = false;
    const existingStyle = document.getElementById('snippet-QYL-CustomFontStyle');
    if (existingStyle) {
        existingStyle.remove();
    }
    const existingDialog = document.querySelector('[data-key="QYLCustomFontStyle"]');
    if (existingDialog) {
        existingDialog.remove();
    }
    const inputBox = document.querySelector('.custom-font-style-input-box');
    if (inputBox) {
        inputBox.remove();
    }
    const colorButtons = document.querySelectorAll('.color__square');
    colorButtons.forEach(button => {
        if (button._pickr && typeof button._pickr.destroy === 'function') {
            button._pickr.destroy();
        }
    });
    const pickrElements = document.querySelectorAll('[data-theme="nano"]');
    pickrElements.forEach(element => {
        element.remove();
    });
}
export async function createCustomFontStyleDialog() {
    const existingDialog = document.querySelector('[data-key="QYLCustomFontStyle"]');
    if (existingDialog) {
        existingDialog.remove();
    }
    const dialogContainer = document.createElement('div');
    dialogContainer.setAttribute('data-key', 'QYLCustomFontStyle');
    dialogContainer.className = 'b3-dialog--open';
    const dialog = document.createElement('div');
    dialog.className = 'b3-dialog';
    dialog.style.zIndex = '50';
    const scrim = document.createElement('div');
    scrim.className = 'b3-dialog__scrim';
    const container = document.createElement('div');
    container.className = 'b3-dialog__container';
    container.style.width = '520px';
    container.style.height = 'auto';
    container.style.left = 'auto';
    container.style.top = 'auto';
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    let hasMoved = false;
    const header = document.createElement('div');
    header.className = 'b3-dialog__header';
    header.textContent = i18n.CustomFontStyle || '自定义文字样式';
    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = container.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        e.preventDefault();
    });
    const mousemoveHandler = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) return;
        if (!hasMoved) {
            container.style.position = 'fixed';
            hasMoved = true;
        }
        const newLeft = startLeft + deltaX;
        const newTop = startTop + deltaY;
        const containerRect = container.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        let finalLeft = newLeft;
        let finalTop = newTop;
        if (finalLeft < 0) {
            finalLeft = 0;
        }
        if (finalLeft + containerRect.width > windowWidth) {
            finalLeft = windowWidth - containerRect.width;
        }
        if (finalTop < 0) {
            finalTop = 0;
        }
        if (finalTop + containerRect.height > windowHeight) {
            finalTop = windowHeight - containerRect.height;
        }
        container.style.left = finalLeft + 'px';
        container.style.top = finalTop + 'px';
    };
    const mouseupHandler = () => {
        isDragging = false;
    };
    dialog._mousemoveHandler = mousemoveHandler;
    dialog._mouseupHandler = mouseupHandler;
    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
    const body = document.createElement('div');
    body.className = 'b3-dialog__body';
    const content = document.createElement('div');
    content.className = 'b3-dialog__content';
    content.innerHTML = `
        <div class="QYL-settings-hidden-tip">
            • ${i18n.LeftClickToSetColor || '左键点击按钮设置颜色'}
            <br>
            • ${i18n.RightClickToSetCSS || '右击点击按钮设置CSS样式'}
        </div>
        <div class="QYL-settings-test-text">
            ${i18n.TestText || '测试文本'}
        </div>
        <div class="fn__hr"></div>
        <div>${i18n.FontColor || '字体颜色'}</div>
        <div class="fn__hr--small"></div>
        <div class="fn__flex">
            <button class="color__square" style="color:var(--b3-font-color1)" data-color-type="font" data-color-index="1">A</button>
            <button class="color__square" style="color:var(--b3-font-color2)" data-color-type="font" data-color-index="2">A</button>
            <button class="color__square" style="color:var(--b3-font-color3)" data-color-type="font" data-color-index="3">A</button>
            <button class="color__square" style="color:var(--b3-font-color4)" data-color-type="font" data-color-index="4">A</button>
            <button class="color__square" style="color:var(--b3-font-color5)" data-color-type="font" data-color-index="5">A</button>
            <button class="color__square" style="color:var(--b3-font-color6)" data-color-type="font" data-color-index="6">A</button>
            <button class="color__square" style="color:var(--b3-font-color7)" data-color-type="font" data-color-index="7">A</button>
            <button class="color__square" style="color:var(--b3-font-color8)" data-color-type="font" data-color-index="8">A</button>
            <button class="color__square" style="color:var(--b3-font-color9)" data-color-type="font" data-color-index="9">A</button>
            <button class="color__square" style="color:var(--b3-font-color10)" data-color-type="font" data-color-index="10">A</button>
            <button class="color__square" style="color:var(--b3-font-color11)" data-color-type="font" data-color-index="11">A</button>
            <button class="color__square" style="color:var(--b3-font-color12)" data-color-type="font" data-color-index="12">A</button>
            <button class="color__square" style="color:var(--b3-font-color13)" data-color-type="font" data-color-index="13">A</button>
        </div>
        <div class="fn__hr"></div>
        <div>${i18n.BackgroundColor || '背景颜色'}</div>
        <div class="fn__hr--small"></div>
        <div class="fn__flex">
            <button class="color__square" style="background-color:var(--b3-font-background1)" data-color-type="background" data-color-index="1">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background2)" data-color-type="background" data-color-index="2">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background3)" data-color-type="background" data-color-index="3">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background4)" data-color-type="background" data-color-index="4">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background5)" data-color-type="background" data-color-index="5">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background6)" data-color-type="background" data-color-index="6">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background7)" data-color-type="background" data-color-index="7">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background8)" data-color-type="background" data-color-index="8">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background9)" data-color-type="background" data-color-index="9">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background10)" data-color-type="background" data-color-index="10">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background11)" data-color-type="background" data-color-index="11">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background12)" data-color-type="background" data-color-index="12">A</button>
            <button class="color__square" style="background-color:var(--b3-font-background13)" data-color-type="background" data-color-index="13">A</button>
        </div>
    `;
    const fontColorButtons = content.querySelectorAll('[data-color-type="font"]');
    const backgroundColorButtons = content.querySelectorAll('[data-color-type="background"]');
    function extractColorFromButton(button, isBackground = false) {
        const property = isBackground ? 'background-color' : 'color';
        const defaultColor = isBackground ? '#ffffff' : '#000000';
        const hasInlineStyle = button.hasAttribute('style') && button.getAttribute('style').includes(property);
        if (hasInlineStyle) {
            const styleAttr = button.getAttribute('style');
            const colorMatch = styleAttr.match(new RegExp(`${property}:\\s*var\\(--([^)]+)\\)`));
            if (colorMatch) {
                const cssVarName = colorMatch[1];
                const cssVarValue = getComputedStyle(document.documentElement).getPropertyValue(`--${cssVarName}`).trim();
                if (cssVarValue) {
                    return cssVarValue;
                }
            } else {
                const computedStyle = window.getComputedStyle(button);
                const computedColor = isBackground ? computedStyle.backgroundColor : computedStyle.color;
                if (computedColor && computedColor !== 'rgba(0, 0, 0, 0)' && computedColor !== 'transparent') {
                    return computedColor;
                }
            }
        }
        return defaultColor;
    }
    function createPickrForButton(button, isBackground = false) {
        const currentColor = extractColorFromButton(button, isBackground);
        button.style.position = 'relative';
        const pickr = window.Pickr.create({
            el: button,
            theme: 'nano',
            default: currentColor,
            useAsButton: true,
            components: {
                preview: true,
                opacity: true,
                hue: true,
                interaction: {
                    hex: false,
                    rgba: false,
                    hsla: false,
                    hsva: false,
                    cmyk: false,
                    input: true,
                    clear: false,
                    save: false
                }
            }
        });
        button._pickr = pickr;
        pickr.on('change', (color) => {
            const styleProperty = isBackground ? 'backgroundColor' : 'color';
            button.style[styleProperty] = color.toRGBA().toString();
            const testElement = document.querySelector('.QYL-settings-test-text');
            if (testElement) {
                testElement.removeAttribute('style');
                testElement.setAttribute('style', button.getAttribute('style') || '');
            }
        });
        button.addEventListener('click', () => {
            const testElement = document.querySelector('.QYL-settings-test-text');
            if (testElement) {
                testElement.removeAttribute('style');
                testElement.setAttribute('style', button.getAttribute('style') || '');
            }
        });
        pickr.on('save', (color) => {
            const styleProperty = isBackground ? 'backgroundColor' : 'color';
            button.style[styleProperty] = color.toRGBA().toString();
            const testElement = document.querySelector('.QYL-settings-test-text');
            if (testElement) {
                testElement.removeAttribute('style');
                testElement.setAttribute('style', button.getAttribute('style') || '');
            }
            pickr.hide();
        });
        return pickr;
    }
    let savedSettings = {};
    try {
        const configContent = await getFile('/data/snippets/QYL-CustomFontStyle.json');
        if (configContent) {
            const config = JSON.parse(configContent);
            const currentThemeMode = ThemeMode.getThemeMode();
            const themeSuffix = currentThemeMode === 'light' ? '-light' : '-dark';
            Object.keys(config).forEach(key => {
                if (key.endsWith(themeSuffix)) {
                    const baseKey = key.replace(themeSuffix, '');
                    savedSettings[baseKey] = config[key];
                }
            });
        }
    } catch (error) {
    }
    fontColorButtons.forEach((button) => {
        const colorIndex = button.getAttribute('data-color-index');
        const savedColor = savedSettings[`fontcolor${colorIndex}`];
        const savedCssStyle = savedSettings[`cssfontcolor${colorIndex}`];
        if (savedColor) {
            button.style.color = savedColor;
        }
        if (savedCssStyle) {
            button.setAttribute('data-temp-css-style', savedCssStyle);
            try {
                const styleParts = savedCssStyle.split(';');
                styleParts.forEach(part => {
                    const [property, value] = part.split(':').map(s => s.trim());
                    if (property && value) {
                        const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                        button.style[camelProperty] = value;
                    }
                });
            } catch (error) {
            }
        }
        createPickrForButton(button, false);
        button.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showInputBox(button, false, colorIndex);
        });
    });
    backgroundColorButtons.forEach((button) => {
        const colorIndex = button.getAttribute('data-color-index');
        const savedColor = savedSettings[`fontbackground${colorIndex}`];
        const savedCssStyle = savedSettings[`cssfontbackground${colorIndex}`];
        if (savedColor) {
            button.style.backgroundColor = savedColor;
        }
        if (savedCssStyle) {
            button.setAttribute('data-temp-css-style', savedCssStyle);
            try {
                const styleParts = savedCssStyle.split(';');
                styleParts.forEach(part => {
                    const [property, value] = part.split(':').map(s => s.trim());
                    if (property && value) {
                        const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                        button.style[camelProperty] = value;
                    }
                });
            } catch (error) {
            }
        }
        createPickrForButton(button, true);
        button.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showInputBox(button, true, colorIndex);
        });
    });
    function showInputBox(button, isBackground, colorIndex) {
        const existingInputBox = document.querySelector('.custom-font-style-input-box');
        if (existingInputBox) {
            existingInputBox.remove();
        }
        const inputContainer = document.createElement('div');
        inputContainer.className = 'custom-font-style-input-box b3-menu';
        inputContainer.style.cssText = `
            position: absolute;
            z-index: 1000;
            min-width: 200px;
            padding: 8px;
        `;
        const textarea = document.createElement('textarea');
        textarea.className = 'b3-text-field';
        textarea.spellcheck = false;
        textarea.placeholder = isBackground ? (i18n.InputBackgroundColorStyle || '输入背景颜色样式') : (i18n.InputFontColorStyle || '输入文字颜色样式');
        textarea.style.cssText = `
            width: 100%;
            min-height: 60px;
            resize: both;
        `;
        const savedCssStyle = button.getAttribute('data-temp-css-style');
        if (savedCssStyle) {
            const filteredStyle = savedCssStyle
                .split(';')
                .filter(part => {
                    const trimmed = part.trim();
                    return !trimmed.startsWith('--b3-font-color') && 
                           !trimmed.startsWith('--b3-font-background');
                })
                .join(';')
                .trim();
            textarea.value = filteredStyle;
        } else {
            textarea.value = '';
        }
        textarea.addEventListener('blur', () => {
            const inputValue = textarea.value.trim();
            if (inputValue) {
                button.setAttribute('data-temp-css-style', inputValue);
                try {
                    const testElement = document.querySelector('.QYL-settings-test-text');
                    if (testElement) {
                        testElement.removeAttribute('style');
                    }
                    const styleParts = inputValue.split(';');
                    styleParts.forEach(part => {
                        const [property, value] = part.split(':').map(s => s.trim());
                        if (property && value) {
                            const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                            button.style[camelProperty] = value;
                        }
                    });
                    if (testElement) {
                        testElement.setAttribute('style', button.getAttribute('style') || '');
                    }
                } catch (error) {
                }
            }
            setTimeout(() => {
                if (inputContainer.parentNode) {
                    inputContainer.remove();
                }
            }, 100);
        });
        inputContainer.appendChild(textarea);
        const buttonRect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        let left = buttonRect.left - containerRect.left + buttonRect.width + 10;
        let top = buttonRect.top - containerRect.top;
        if (left + 220 > containerRect.width) {
            left = buttonRect.left - containerRect.left - 220;
        }
        if (top + 120 > containerRect.height) {
            top = containerRect.height - 120;
        }
        if (left < 0) left = 10;
        if (top < 0) top = 10;
        inputContainer.style.left = left + 'px';
        inputContainer.style.top = top + 'px';
        container.appendChild(inputContainer);
        textarea.focus();
        const closeOnOutsideClick = (e) => {
            if (!inputContainer.contains(e.target) && !button.contains(e.target)) {
                inputContainer.remove();
                document.removeEventListener('click', closeOnOutsideClick);
            }
        };
        setTimeout(() => {
            document.addEventListener('click', closeOnOutsideClick);
        }, 100);
    }
    const action = document.createElement('div');
    action.className = 'b3-dialog__action';
    const cancelButton = document.createElement('button');
    cancelButton.className = 'b3-button b3-button--cancel';
    cancelButton.textContent = i18n.Cancel || '取消';
    const space = document.createElement('div');
    space.className = 'fn__space';
    const exportButton = document.createElement('button');
    exportButton.className = 'b3-button b3-button--text';
    exportButton.textContent = i18n.SaveAndExport || '保存并导出';
    exportButton.addEventListener('click', async () => {
        const currentThemeMode = ThemeMode.getThemeMode();
        const themeSuffix = currentThemeMode === 'light' ? '-light' : '-dark';
        let existingConfig = {};
        try {
            const configContent = await getFile('/data/snippets/QYL-CustomFontStyle.json');
            if (configContent) {
                existingConfig = JSON.parse(configContent);
            }
        } catch (error) {
        }
        const currentSettings = {};
        fontColorButtons.forEach((button) => {
            const colorIndex = button.getAttribute('data-color-index');
            const currentColor = button.style.color;
            if (currentColor) {
                currentSettings[`fontcolor${colorIndex}${themeSuffix}`] = currentColor;
            }
            const tempCssStyle = button.getAttribute('data-temp-css-style');
            if (tempCssStyle) {
                currentSettings[`cssfontcolor${colorIndex}${themeSuffix}`] = tempCssStyle;
            }
        });
        backgroundColorButtons.forEach((button) => {
            const colorIndex = button.getAttribute('data-color-index');
            const currentColor = button.style.backgroundColor;
            if (currentColor) {
                currentSettings[`fontbackground${colorIndex}${themeSuffix}`] = currentColor;
            }
            const tempCssStyle = button.getAttribute('data-temp-css-style');
            if (tempCssStyle) {
                currentSettings[`cssfontbackground${colorIndex}${themeSuffix}`] = tempCssStyle;
            }
        });
        const mergedConfig = { ...existingConfig, ...currentSettings };
        try {
            await putFile('/data/snippets/QYL-CustomFontStyle.json', JSON.stringify(mergedConfig, null, 2));
            await updateCustomFontStyleCSS(mergedConfig);
            const cssText = generateCSSText(mergedConfig);
            await navigator.clipboard.writeText(cssText);
            try {
                await fetch('/api/notification/pushMsg', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        msg: i18n.CSSExportedToClipboard || '当前CSS方案已保存到剪贴板',
                        timeout: 3000
                    })
                });
            } catch (error) {
            }
        } catch (error) {
        }
    });
    const space2 = document.createElement('div');
    space2.className = 'fn__space';
    const confirmButton = document.createElement('button');
    confirmButton.className = 'b3-button b3-button--text';
    confirmButton.textContent = i18n.SaveAndClose || '保存并关闭';
    confirmButton.addEventListener('click', async () => {
        const currentThemeMode = ThemeMode.getThemeMode();
        const themeSuffix = currentThemeMode === 'light' ? '-light' : '-dark';
        let existingConfig = {};
        try {
            const configContent = await getFile('/data/snippets/QYL-CustomFontStyle.json');
            if (configContent) {
                existingConfig = JSON.parse(configContent);
            }
        } catch (error) {
        }
        const currentSettings = {};
        fontColorButtons.forEach((button) => {
            const colorIndex = button.getAttribute('data-color-index');
            const currentColor = button.style.color;
            if (currentColor) {
                currentSettings[`fontcolor${colorIndex}${themeSuffix}`] = currentColor;
            }
            const tempCssStyle = button.getAttribute('data-temp-css-style');
            if (tempCssStyle) {
                currentSettings[`cssfontcolor${colorIndex}${themeSuffix}`] = tempCssStyle;
            }
        });
        backgroundColorButtons.forEach((button) => {
            const colorIndex = button.getAttribute('data-color-index');
            const currentColor = button.style.backgroundColor;
            if (currentColor) {
                currentSettings[`fontbackground${colorIndex}${themeSuffix}`] = currentColor;
            }
            const tempCssStyle = button.getAttribute('data-temp-css-style');
            if (tempCssStyle) {
                currentSettings[`cssfontbackground${colorIndex}${themeSuffix}`] = tempCssStyle;
            }
        });
        const mergedConfig = { ...existingConfig, ...currentSettings };
        try {
            await putFile('/data/snippets/QYL-CustomFontStyle.json', JSON.stringify(mergedConfig, null, 2));
            await updateCustomFontStyleCSS(mergedConfig);
        } catch (error) {
        }
        closeDialog();
    });
    action.appendChild(cancelButton);
    action.appendChild(space);
    action.appendChild(exportButton);
    action.appendChild(space2);
    action.appendChild(confirmButton);
    body.appendChild(content);
    body.appendChild(action);
    container.appendChild(header);
    container.appendChild(body);
    dialog.appendChild(scrim);
    dialog.appendChild(container);
    dialogContainer.appendChild(dialog);
    const closeDialog = () => {
        const colorButtons = document.querySelectorAll('.color__square');
        colorButtons.forEach(button => {
            if (button._pickr && typeof button._pickr.destroy === 'function') {
                button._pickr.destroy();
            }
        });
        const pickrElements = document.querySelectorAll('[data-theme="nano"]');
        pickrElements.forEach(element => {
            element.remove();
        });
        const inputBox = document.querySelector('.custom-font-style-input-box');
        if (inputBox) {
            inputBox.remove();
        }
        const dialogContainer = document.querySelector('[data-key="QYLCustomFontStyle"]');
        if (dialogContainer) {
            dialogContainer.remove();
        }
        if (dialog._mousemoveHandler) {
            document.removeEventListener('mousemove', dialog._mousemoveHandler);
        }
        if (dialog._mouseupHandler) {
            document.removeEventListener('mouseup', dialog._mouseupHandler);
        }
        if (dialog._keydownHandler) {
            document.removeEventListener('keydown', dialog._keydownHandler);
        }
    };
    scrim.addEventListener('click', closeDialog);
    cancelButton.addEventListener('click', closeDialog);
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeDialog();
        }
    };
    document.addEventListener('keydown', handleKeyDown);
    dialog._keydownHandler = handleKeyDown;
    return dialogContainer;
}
export async function showCustomFontStyleDialog() {
    const dialog = await createCustomFontStyleDialog();
    document.body.appendChild(dialog);
    return dialog;
}
async function updateCustomFontStyleCSS(config) {
    try {
        let cssVariables = '';
        for (let i = 1; i <= 13; i++) {
            const fontColor = config[`fontcolor${i}-light`];
            if (fontColor && !fontColor.startsWith('var(')) {
                cssVariables += `[data-theme-mode="light"] [style*="color"][style*="var(--b3-font-color${i})"] { --b3-font-color${i}: ${fontColor}; }`;
            }
            const cssFontColor = config[`cssfontcolor${i}-light`];
            if (cssFontColor) {
                cssVariables += `[data-theme-mode="light"] [style*="color"][style*="var(--b3-font-color${i})"] { ${cssFontColor}; }`;
            }
        }
        for (let i = 1; i <= 13; i++) {
            const backgroundColor = config[`fontbackground${i}-light`];
            if (backgroundColor && !backgroundColor.startsWith('var(')) {
                cssVariables += `[data-theme-mode="light"] [style*="background-color"][style*="var(--b3-font-background${i})"] { --b3-font-background${i}: ${backgroundColor}; }`;
            }
            const cssFontBackground = config[`cssfontbackground${i}-light`];
            if (cssFontBackground) {
                cssVariables += `[data-theme-mode="light"] [style*="background-color"][style*="var(--b3-font-background${i})"] { ${cssFontBackground}; }`;
            }
        }
        for (let i = 1; i <= 13; i++) {
            const fontColor = config[`fontcolor${i}-dark`];
            if (fontColor && !fontColor.startsWith('var(')) {
                cssVariables += `[data-theme-mode="dark"] [style*="color"][style*="var(--b3-font-color${i})"] { --b3-font-color${i}: ${fontColor}; }`;
            }
            const cssFontColor = config[`cssfontcolor${i}-dark`];
            if (cssFontColor) {
                cssVariables += `[data-theme-mode="dark"] [style*="color"][style*="var(--b3-font-color${i})"] { ${cssFontColor}; }`;
            }
        }
        for (let i = 1; i <= 13; i++) {
            const backgroundColor = config[`fontbackground${i}-dark`];
            if (backgroundColor && !backgroundColor.startsWith('var(')) {
                cssVariables += `[data-theme-mode="dark"] [style*="background-color"][style*="var(--b3-font-background${i})"] { --b3-font-background${i}: ${backgroundColor}; }`;
            }
            const cssFontBackground = config[`cssfontbackground${i}-dark`];
            if (cssFontBackground) {
                cssVariables += `[data-theme-mode="dark"] [style*="background-color"][style*="var(--b3-font-background${i})"] { ${cssFontBackground}; }`;
            }
        }
        const existingStyle = document.getElementById('snippet-QYL-CustomFontStyle');
        if (existingStyle) {
            existingStyle.remove();
        }
        const styleElement = document.createElement('style');
        styleElement.id = 'snippet-QYL-CustomFontStyle';
        styleElement.textContent = cssVariables;
        document.head.appendChild(styleElement);
    } catch (error) {
    }
}
function generateCSSText(config) {
    let cssText = '';
    cssText += '\n';
    for (let i = 1; i <= 13; i++) {
        const fontColor = config[`fontcolor${i}-light`];
        if (fontColor && !fontColor.startsWith('var(')) {
            cssText += `[data-theme-mode="light"] [style*="color"][style*="var(--b3-font-color${i})"] {\n`;
            cssText += `  --b3-font-color${i}: ${fontColor};\n`;
            cssText += `}\n`;
        }
        const cssFontColor = config[`cssfontcolor${i}-light`];
        if (cssFontColor) {
            cssText += `[data-theme-mode="light"] [style*="color"][style*="var(--b3-font-color${i})"] {\n`;
            cssText += `  ${cssFontColor};\n`;
            cssText += `}\n`;
        }
    }
    for (let i = 1; i <= 13; i++) {
        const backgroundColor = config[`fontbackground${i}-light`];
        if (backgroundColor && !backgroundColor.startsWith('var(')) {
            cssText += `[data-theme-mode="light"] [style*="background-color"][style*="var(--b3-font-background${i})"] {\n`;
            cssText += `  --b3-font-background${i}: ${backgroundColor};\n`;
            cssText += `}\n`;
        }
        const cssFontBackground = config[`cssfontbackground${i}-light`];
        if (cssFontBackground) {
            cssText += `[data-theme-mode="light"] [style*="background-color"][style*="var(--b3-font-background${i})"] {\n`;
            cssText += `  ${cssFontBackground};\n`;
            cssText += `}\n`;
        }
    }
    cssText += '\n\n';
    for (let i = 1; i <= 13; i++) {
        const fontColor = config[`fontcolor${i}-dark`];
        if (fontColor && !fontColor.startsWith('var(')) {
            cssText += `[data-theme-mode="dark"] [style*="color"][style*="var(--b3-font-color${i})"] {\n`;
            cssText += `  --b3-font-color${i}: ${fontColor};\n`;
            cssText += `}\n`;
        }
        const cssFontColor = config[`cssfontcolor${i}-dark`];
        if (cssFontColor) {
            cssText += `[data-theme-mode="dark"] [style*="color"][style*="var(--b3-font-color${i})"] {\n`;
            cssText += `  ${cssFontColor};\n`;
            cssText += `}\n`;
        }
    }
    for (let i = 1; i <= 13; i++) {
        const backgroundColor = config[`fontbackground${i}-dark`];
        if (backgroundColor && !backgroundColor.startsWith('var(')) {
            cssText += `[data-theme-mode="dark"] [style*="background-color"][style*="var(--b3-font-background${i})"] {\n`;
            cssText += `  --b3-font-background${i}: ${backgroundColor};\n`;
            cssText += `}\n`;
        }
        const cssFontBackground = config[`cssfontbackground${i}-dark`];
        if (cssFontBackground) {
            cssText += `[data-theme-mode="dark"] [style*="background-color"][style*="var(--b3-font-background${i})"] {\n`;
            cssText += `  ${cssFontBackground};\n`;
            cssText += `}\n`;
        }
    }
    return cssText;
}
