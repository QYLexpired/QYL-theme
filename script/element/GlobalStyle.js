import i18n from '../../i18n/i18n.js';
import { putFile, getFile } from '../basic/API.js';
function reloadUI(mode) {
    if(window.siyuan.ws.app.plugins?.length === 0) {
        if (mode) window.location.pathname = `stage/build/${mode}/`;
        else fetch('/api/ui/reloadUI', { method: 'POST' });
        return;
    }
    const plugin = window.siyuan.ws.app.plugins[0];
    if(!plugin?.saveLayout) {
        if (mode) window.location.pathname = `stage/build/${mode}/`;
        else fetch('/api/ui/reloadUI', { method: 'POST' });
        return;
    }
    plugin.saveLayout(() => {
        if (mode) window.location.pathname = `stage/build/${mode}/`;
        else window.location.reload();
    });
}
export async function initGlobalStyle(config = null) {
    try {
        let globalStyleConfig = {};
        try {
            const configContent = await getFile('/data/snippets/QYL-GlobalStyle.json');
            if (configContent) {
                globalStyleConfig = JSON.parse(configContent);
            }
        } catch (error) {
        }
        const attributeMapping = {
            'QYLHeadingColor': {
                attribute: 'qyl-heading-color',
                values: ['colorful', 'colorful-dynamic']
            },
            'QYLHeadingEnhance': {
                attribute: 'qyl-heading-enhance',
                values: ['underline', 'leftborder']
            },
            'QYLHeadingLevel': {
                attribute: 'qyl-heading-level',
                values: ['number']
            },
            'QYLImageShape': {
                attribute: 'qyl-image-shape',
                values: ['rounded', 'circle']
            },
            'QYLLinkStyle': {
                attribute: 'qyl-link-style',
                values: ['icon']
            },
            'QYLSuperBlockGeneral': {
                attribute: 'qyl-superblock-general',
                values: ['border']
            },
            'QYLSuperBlockHorizontal': {
                attribute: 'qyl-superblock-horizontal',
                values: ['divider']
            },
            'QYLTagColor': {
                attribute: 'qyl-tag-color',
                values: ['colorful']
            },
            'QYLTagStyle': {
                attribute: 'qyl-tag-style',
                values: ['solid']
            },
            'QYLInlineCodeColor': {
                attribute: 'qyl-inline-code-color',
                values: ['colorful']
            },
            'QYLQuoteStyle': {
                attribute: 'qyl-quote-style',
                values: ['leftborder']
            },
            'QYLUnorderedList': {
                attribute: 'qyl-unordered-list',
                values: ['multilevel']
            },
            'QYLOrderedList': {
                attribute: 'qyl-ordered-list',
                values: ['multilevel']
            },
            'QYLCodeBlockStyle': {
                attribute: 'qyl-codeblock-style',
                values: ['mac']
            },
            'QYLTableShape': {
                attribute: 'qyl-table-shape',
                values: ['rounded']
            },
            'QYLTableStyle': {
                attribute: 'qyl-table-style',
                values: ['hierarchical']
            },
            'QYLHeaderImageStyle': {
                attribute: 'qyl-header-image-style',
                values: ['mask']
            },
            'QYLHeaderImageEffect': {
                attribute: 'qyl-header-image-effect',
                values: ['parallax']
            },
        };
        Object.entries(attributeMapping).forEach(([configKey, mapping]) => {
            const configValue = globalStyleConfig[configKey];
            if (configValue && mapping.values.includes(configValue)) {
                document.documentElement.setAttribute(mapping.attribute, configValue);
            } else {
                document.documentElement.removeAttribute(mapping.attribute);
            }
        });
    } catch (error) {
        document.documentElement.removeAttribute('qyl-headingcolor');
    }
}
export function removeGlobalStyle() {
    const attributes = ['qyl-heading-color', 'qyl-heading-enhance', 'qyl-heading-level', 'qyl-image-shape', 'qyl-link-style', 'qyl-superblock-general', 'qyl-superblock-horizontal', 'qyl-tag-color', 'qyl-tag-style', 'qyl-inline-code-color', 'qyl-quote-style', 'qyl-unordered-list', 'qyl-ordered-list', 'qyl-codeblock-style', 'qyl-table-shape', 'qyl-table-style', 'qyl-header-image-style', 'qyl-header-image-effect'];
    attributes.forEach(attr => {
        document.documentElement.removeAttribute(attr);
    });
    const existingDialog = document.querySelector('[data-key="QYLGlobalStyle"]');
    if (existingDialog) {
        existingDialog.remove();
    }
}
export async function createGlobalStyleDialog() {
    const existingDialog = document.querySelector('[data-key="QYLGlobalStyle"]');
    if (existingDialog) {
        existingDialog.remove();
    }
    let currentConfig = {};
    try {
        const configContent = await getFile('/data/snippets/QYL-GlobalStyle.json');
        if (configContent) {
            currentConfig = JSON.parse(configContent);
        }
    } catch (error) {
    }
    const dialogContainer = document.createElement('div');
    dialogContainer.setAttribute('data-key', 'QYLGlobalStyle');
    dialogContainer.className = 'b3-dialog--open';
    const dialog = document.createElement('div');
    dialog.className = 'b3-dialog';
    dialog.style.zIndex = '30';
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
    header.textContent = i18n.GlobalStyle;
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
    const searchContainer = document.createElement('div');
    searchContainer.style.marginBottom = '16px';
    const searchInput = document.createElement('input');
    searchInput.placeholder = i18n.Search || '搜索';
    searchInput.className = 'b3-text-field fn__block';
    searchContainer.appendChild(searchInput);
    content.appendChild(searchContainer);
    const configContainer = document.createElement('div');
    configContainer.id = 'global-style-config-container';
    content.appendChild(configContainer);
    const configGroups = [
        {
            title: i18n.HeadingStyle,
            items: [
                {
                    id: 'QYLHeadingColor',
                    label: i18n.HeadingColor,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'colorful', label: i18n.Colorful },
                        { value: 'colorful-dynamic', label: i18n.ColorfulDynamic }
                    ]
                },
                {
                    id: 'QYLHeadingEnhance',
                    label: i18n.HeadingEnhance,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'underline', label: i18n.Underline },
                        { value: 'leftborder', label: i18n.LeftBorder }
                    ]
                },
                {
                    id: 'QYLHeadingLevel',
                    label: i18n.HeadingLevel,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'number', label: i18n.Number }
                    ]
                }
            ]
        },
        {
            title: i18n.ImageStyle,
            items: [
                {
                    id: 'QYLImageShape',
                    label: i18n.ImageShape,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'rounded', label: i18n.Rounded },
                        { value: 'circle', label: i18n.Circle }
                    ]
                }
            ]
        },
        {
            title: i18n.LinkStyle,
            items: [
                {
                    id: 'QYLLinkStyle',
                    label: i18n.LinkStyle,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'icon', label: i18n.Icon }
                    ]
                }
            ]
        },
        {
            title: i18n.SuperBlockStyle,
            items: [
                {
                    id: 'QYLSuperBlockGeneral',
                    label: i18n.SuperBlockGeneral,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'border', label: i18n.Border }
                    ]
                },
                {
                    id: 'QYLSuperBlockHorizontal',
                    label: i18n.SuperBlockHorizontal,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'divider', label: i18n.Divider }
                    ]
                }
            ]
        },
        {
            title: i18n.TagStyle,
            items: [
                {
                    id: 'QYLTagColor',
                    label: i18n.TagColor,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'colorful', label: i18n.Colorful }
                    ]
                },
                {
                    id: 'QYLTagStyle',
                    label: i18n.TagStyle,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'solid', label: i18n.Solid }
                    ]
                }
            ]
        },
        {
            title: i18n.InlineCodeStyle,
            items: [
                {
                    id: 'QYLInlineCodeColor',
                    label: i18n.InlineCodeColor,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'colorful', label: i18n.Colorful }
                    ]
                }
            ]
        },
        {
            title: i18n.QuoteStyle,
            items: [
                {
                    id: 'QYLQuoteStyle',
                    label: i18n.QuoteStyle,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'leftborder', label: i18n.LeftBorder }
                    ]
                }
            ]
        },
        {
            title: i18n.ListStyle,
            items: [
                {
                    id: 'QYLUnorderedList',
                    label: i18n.UnorderedList,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'multilevel', label: i18n.Multilevel }
                    ]
                },
                {
                    id: 'QYLOrderedList',
                    label: i18n.OrderedList,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'multilevel', label: i18n.Multilevel }
                    ]
                }
            ]
        },
        {
            title: i18n.CodeBlockStyle,
            items: [
                {
                    id: 'QYLCodeBlockStyle',
                    label: i18n.CodeBlockStyle,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'mac', label: i18n.Mac }
                    ]
                }
            ]
        },
        {
            title: i18n.TableStyle,
            items: [
                {
                    id: 'QYLTableShape',
                    label: i18n.TableShape,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'rounded', label: i18n.Rounded }
                    ]
                },
                {
                    id: 'QYLTableStyle',
                    label: i18n.TableStyleHierarchical,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'hierarchical', label: i18n.Hierarchical }
                    ]
                },
            ]
        },
        {
            title: i18n.HeaderImageStyle,
            items: [
                {
                    id: 'QYLHeaderImageStyle',
                    label: i18n.HeaderImageStyleType,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'mask', label: i18n.Mask }
                    ]
                },
                {
                    id: 'QYLHeaderImageEffect',
                    label: i18n.HeaderImageEffect,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'parallax', label: i18n.ParallaxScroll }
                    ]
                }
            ]
        }
    ];
    const groupsHTML = configGroups.map(group => {
        const itemsHTML = group.items.map((item, index) => {
            const optionsHTML = item.options.map(option => 
                `<option value="${option.value}">${option.label}</option>`
            ).join('');
            const separator = index > 0 ? '<div class="fn__hr"></div>' : '';
            const optionsText = item.options.map(option => option.label).join(' ');
            const searchText = `${group.title} ${item.label} ${optionsText}`;
            return `
                ${separator}
                <div class="fn__flex config__item" data-search-text="${searchText}">
                    <div class="fn__flex-center fn__flex-1 ft__on-surface">${item.label}</div>
                    <span class="fn__space"></span>
                    <select id="${item.id}" class="b3-select fn__size200">
                        ${optionsHTML}
                    </select>
                </div>
            `;
        }).join('');
        const groupOptionsText = group.items.map(item => 
            item.options.map(option => option.label).join(' ')
        ).join(' ');
        const groupSearchText = `${group.title} ${groupOptionsText}`;
        return `
            <div class="b3-label fn__flex config__group" data-search-text="${groupSearchText}">
                <div class="fn__block">
                    <div>${group.title}</div>
                    <div class="fn__hr"></div>
                    ${itemsHTML}
                </div>
            </div>
        `;
    }).join('');
    configContainer.innerHTML = groupsHTML;
    const performSearch = (searchTerm) => {
        if (!configContainer) return;
        const groups = configContainer.querySelectorAll('.config__group');
        const items = configContainer.querySelectorAll('.config__item');
        if (groups.length === 0) return;
        if (!searchTerm || searchTerm.trim() === '') {
            groups.forEach(group => {
                if (group && group.style) {
                    group.style.display = 'block';
                }
            });
            items.forEach(item => {
                if (item && item.style) {
                    item.style.display = 'flex';
                }
            });
            return;
        }
        const hasChinese = /[\u4e00-\u9fff]/.test(searchTerm);
        let searchUnits;
        if (hasChinese) {
            const chineseChars = searchTerm.match(/[\u4e00-\u9fff]/g) || [];
            const englishWords = searchTerm.toLowerCase().match(/[a-zA-Z]+/g) || [];
            searchUnits = {
                chinese: chineseChars,
                english: englishWords
            };
        } else {
            searchUnits = {
                chinese: [],
                english: searchTerm.toLowerCase().trim().split(/\s+/).filter(word => word.length > 0)
            };
        }
        groups.forEach(group => {
            if (!group) return;
            const groupSearchText = group.getAttribute('data-search-text') || '';
            const groupItems = group.querySelectorAll('.config__item');
            let hasVisibleItems = false;
            groupItems.forEach(item => {
                if (!item) return;
                const itemSearchText = item.getAttribute('data-search-text') || '';
                const itemTextLower = itemSearchText.toLowerCase();
                let isMatch;
                if (hasChinese) {
                    const chineseMatch = searchUnits.chinese.some(char => itemTextLower.includes(char));
                    const englishMatch = searchUnits.english.some(word => itemTextLower.includes(word));
                    isMatch = chineseMatch || englishMatch;
                } else {
                    isMatch = searchUnits.english.some(word => itemTextLower.includes(word));
                }
                if (isMatch) {
                    item.style.display = 'flex';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });
            if (hasVisibleItems) {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
            }
        });
    };
    let searchTimeout = null;
    let isComposing = false;
    searchInput.addEventListener('input', (e) => {
        if (isComposing) return;
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 200);
    });
    searchInput.addEventListener('compositionstart', () => {
        isComposing = true;
    });
    searchInput.addEventListener('compositionend', (e) => {
        isComposing = false;
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        performSearch(e.target.value);
    });
    configGroups.forEach(group => {
        group.items.forEach(item => {
            const select = configContainer.querySelector(`#${item.id}`);
            if (select) {
                const currentValue = currentConfig[item.id] || 'default';
                select.value = currentValue;
            }
        });
    });
    const action = document.createElement('div');
    action.className = 'b3-dialog__action';
    const cancelButton = document.createElement('button');
    cancelButton.className = 'b3-button b3-button--cancel';
    cancelButton.textContent = i18n.Cancel;
    const space = document.createElement('div');
    space.className = 'fn__space';
    const confirmButton = document.createElement('button');
    confirmButton.className = 'b3-button b3-button--text';
    confirmButton.textContent = i18n.saveandrefresh;
    action.appendChild(cancelButton);
    action.appendChild(space);
    action.appendChild(confirmButton);
    body.appendChild(content);
    body.appendChild(action);
    container.appendChild(header);
    container.appendChild(body);
    dialog.appendChild(scrim);
    dialog.appendChild(container);
    dialogContainer.appendChild(dialog);
    scrim.addEventListener('click', (e) => {
        if (e.target === scrim) {
            removeGlobalStyleDialog();
        }
    });
    cancelButton.addEventListener('click', () => {
        removeGlobalStyleDialog();
    });
    confirmButton.addEventListener('click', async () => {
        const newConfig = {};
        configGroups.forEach(group => {
            group.items.forEach(item => {
                const select = configContainer.querySelector(`#${item.id}`);
                if (select) {
                    const newValue = select.value;
                    if (newValue !== 'default') {
                        newConfig[item.id] = newValue;
                    }
                }
            });
        });
        const saveSuccess = await saveGlobalStyleConfig(newConfig);
        if (saveSuccess) {
            reloadUI();
        }
        removeGlobalStyleDialog();
    });
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            removeGlobalStyleDialog();
            document.removeEventListener('keydown', handleKeyDown);
        }
    };
    document.addEventListener('keydown', handleKeyDown);
    dialog._keydownHandler = handleKeyDown;
    dialog._searchTimeout = searchTimeout;
    return dialogContainer;
}
async function saveGlobalStyleConfig(config) {
    try {
        const jsonContent = JSON.stringify(config, null, 2);
        const result = await putFile('/data/snippets/QYL-GlobalStyle.json', jsonContent);
        if (result && result.code === 0) {
            return true;
        } else {
            throw new Error(result?.msg || i18n.saveError);
        }
    } catch (error) {
        return false;
    }
}
export async function showGlobalStyleDialog() {
    const dialog = await createGlobalStyleDialog();
    document.body.appendChild(dialog);
    return dialog;
}
export function removeGlobalStyleDialog() {
    const existingDialog = document.querySelector('[data-key="QYLGlobalStyle"]');
    if (existingDialog) {
        const dialog = existingDialog.querySelector('.b3-dialog');
        if (dialog) {
            const mousemoveHandler = dialog._mousemoveHandler;
            const mouseupHandler = dialog._mouseupHandler;
            const keydownHandler = dialog._keydownHandler;
            const searchTimeout = dialog._searchTimeout;
            if (mousemoveHandler) {
                document.removeEventListener('mousemove', mousemoveHandler);
            }
            if (mouseupHandler) {
                document.removeEventListener('mouseup', mouseupHandler);
            }
            if (keydownHandler) {
                document.removeEventListener('keydown', keydownHandler);
            }
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        }
        existingDialog.remove();
    }
}
