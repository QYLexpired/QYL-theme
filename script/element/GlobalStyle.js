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
        const styleMapping = {
            'QYLTextColor': {
                styleId: 'snippetCSS-text-color',
                values: ['official', 'sevencolor']
            },
            'QYLCalloutStyle': {
                styleId: 'snippetCSS-callout-style',
                values: ['background', 'border', 'noborder', 'tcolorbox']
            },
            'QYLDatabaseColor': {
                styleId: 'snippetCSS-database-option-color',
                values: ['official', 'sevencolor']
            },
            'QYLHeadingColor': {
                styleId: 'snippetCSS-heading-color',
                values: ['colorful', 'colorful-dynamic']
            },
            'QYLHeadingEnhance': {
                styleId: 'snippetCSS-heading-enhance',
                values: ['underline', 'leftborder']
            },
            'QYLHeadingLevel': {
                styleId: 'snippetCSS-heading-level',
                values: ['number', 'dice']
            },
            'QYLImageShape': {
                styleId: 'snippetCSS-image-shape',
                values: ['rounded', 'circle']
            },
            'QYLLinkStyle': {
                styleId: 'snippetCSS-link-style',
                values: ['icon']
            },
            'QYLSuperBlockGeneral': {
                styleId: 'snippetCSS-superblock-general',
                values: ['border']
            },
            'QYLSuperBlockHorizontal': {
                styleId: 'snippetCSS-superblock-horizontal',
                values: ['divider']
            },
            'QYLTagColor': {
                styleId: 'snippetCSS-tag-color',
                values: ['colorful']
            },
            'QYLTagStyle': {
                styleId: 'snippetCSS-tag-style',
                values: ['solid']
            },
            'QYLInlineCodeColor': {
                styleId: 'snippetCSS-inline-code-color',
                values: ['colorful']
            },
            'QYLQuoteStyle': {
                styleId: 'snippetCSS-quote-style',
                values: ['leftborder', 'transparent-border']
            },
            'QYLUnorderedList': {
                styleId: 'snippetCSS-unordered-list',
                values: ['multilevel']
            },
            'QYLOrderedList': {
                styleId: 'snippetCSS-ordered-list',
                values: ['multilevel']
            },
            'QYLCodeBlockStyle': {
                styleId: 'snippetCSS-codeblock-style',
                values: ['mac']
            },
            'QYLTableShape': {
                styleId: 'snippetCSS-table-shape',
                values: ['rounded']
            },
            'QYLTableStyle': {
                styleId: 'snippetCSS-table-style',
                values: ['hierarchical']
            },
            'QYLHeaderImageStyle': {
                styleId: 'snippetCSS-header-image-style',
                values: ['mask']
            },
            'QYLHeaderImageEffect': {
                styleId: 'snippetCSS-header-image-effect',
                values: ['parallax']
            },
            'QYLSidebarColor': {
                styleId: 'snippetCSS-sidebar-color',
                values: ['dock-consistent']
            },
            'QYLMenuHoverColor': {
                styleId: 'snippetCSS-menu-hover-color',
                values: ['theme']
            },
            'QYLOutlineStyle': {
                styleId: 'snippetCSS-outline-style',
                values: ['hidden','number']
            },
            'QYLTableWidth': {
                styleId: 'snippetCSS-table-width',
                values: ['full', 'equal']
            },
        };
        Object.entries(styleMapping).forEach(([configKey, mapping]) => {
            const configValue = globalStyleConfig[configKey];
            if (configValue && mapping.values.includes(configValue)) {
                const styleId = `${mapping.styleId}-${configValue}`;
                let styleElement = document.getElementById(styleId);
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.id = styleId;
                    styleElement.textContent = `@import url("/appearance/themes/QYL-theme/style/GlobalStyle/${mapping.styleId.replace('snippetCSS-', '')}-${configValue}.css");`;
                    document.head.appendChild(styleElement);
                }
            } else {
                mapping.values.forEach(value => {
                    const styleId = `${mapping.styleId}-${value}`;
                    const styleElement = document.getElementById(styleId);
                    if (styleElement) {
                        styleElement.remove();
                    }
                });
            }
        });
    } catch (error) {
        removeGlobalStyle();
    }
}
export function removeGlobalStyle() {
    const styleIds = [
        'snippetCSS-text-color-official', 'snippetCSS-text-color-sevencolor',
        'snippetCSS-database-option-color-official', 'snippetCSS-database-option-color-sevencolor',
        'snippetCSS-heading-color-colorful', 'snippetCSS-heading-color-colorful-dynamic',
        'snippetCSS-heading-enhance-underline', 'snippetCSS-heading-enhance-leftborder',
        'snippetCSS-heading-level-number', 'snippetCSS-heading-level-dice',
        'snippetCSS-image-shape-rounded', 'snippetCSS-image-shape-circle',
        'snippetCSS-link-style-icon',
        'snippetCSS-superblock-general-border',
        'snippetCSS-superblock-horizontal-divider',
        'snippetCSS-tag-color-colorful',
        'snippetCSS-tag-style-solid',
        'snippetCSS-inline-code-color-colorful',
        'snippetCSS-quote-style-leftborder', 'snippetCSS-quote-style-transparent-border',
        'snippetCSS-unordered-list-multilevel',
        'snippetCSS-ordered-list-multilevel',
        'snippetCSS-codeblock-style-mac',
        'snippetCSS-table-shape-rounded',
        'snippetCSS-table-style-hierarchical',
        'snippetCSS-header-image-style-mask',
        'snippetCSS-header-image-effect-parallax',
        'snippetCSS-sidebar-color-dock-consistent',
        'snippetCSS-menu-hover-color-theme'
        , 'snippetCSS-outline-style-hidden'
        , 'snippetCSS-outline-style-number'
        , 'snippetCSS-table-width-full'
        , 'snippetCSS-table-width-equal'
        , 'snippetCSS-callout-style-background'
        , 'snippetCSS-callout-style-border'
        , 'snippetCSS-callout-style-noborder'
        , 'snippetCSS-callout-style-tcolorbox'
    ];
    styleIds.forEach(styleId => {
        const styleElement = document.getElementById(styleId);
        if (styleElement) {
            styleElement.remove();
        }
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
            title: i18n.Text,
            items: [
                {
                    id: 'QYLTextColor',
                    label: i18n.TextColor,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'official', label: i18n.OfficialScheme },
                        { value: 'sevencolor', label: i18n.SevenColorScheme }
                    ]
                }
            ]
        },
        {
            title: i18n.Database,
            items: [
                {
                    id: 'QYLDatabaseColor',
                    label: i18n.DatabaseColor,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'official', label: i18n.OfficialScheme },
                        { value: 'sevencolor', label: i18n.SevenColorScheme }
                    ]
                }
            ]
        },
        {
            title: i18n.Heading,
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
                        { value: 'number', label: i18n.Number },
                        { value: 'dice', label: i18n.Dice }
                    ]
                }
            ]
        },
        {
            title: i18n.Image,
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
            title: i18n.Link,
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
            title: i18n.SuperBlock,
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
            title: i18n.Tag,
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
            title: i18n.InlineCode,
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
            title: i18n.Quote,
            items: [
                {
                    id: 'QYLQuoteStyle',
                    label: i18n.QuoteStyle,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'leftborder', label: i18n.LeftBorder },
                        { value: 'transparent-border', label: i18n.TransparentBorder }
                    ]
                }
            ]
        },
        {
            title: i18n.Callout,
            items: [
                {
                    id: 'QYLCalloutStyle',
                    label: i18n.CalloutStyle,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'background', label: i18n.BackgroundColor },
                        { value: 'border', label: i18n.Border },
                        { value: 'noborder', label: i18n.NoBorder },
                        { value: 'tcolorbox', label: i18n.Tcolorbox }
                    ]
                }
            ]
        },
        {
            title: i18n.List,
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
            title: i18n.CodeBlock,
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
            title: i18n.Table,
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
                    label: i18n.TableStyle,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'hierarchical', label: i18n.Hierarchical }
                    ]
                },
                {
                    id: 'QYLTableWidth',
                    label: i18n.TableWidth,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'full', label: i18n.FullWidth },
                        { value: 'equal', label: i18n.FullWidthEqual }
                    ]
                },
            ]
        },
        {
            title: i18n.HeaderImage,
            items: [
                {
                    id: 'QYLHeaderImageStyle',
                    label: i18n.HeaderImageStyle,
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
        },
        {
            title: i18n.Sidebar,
            items: [
                {
                    id: 'QYLSidebarColor',
                    label: i18n.SidebarColor,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'dock-consistent', label: i18n.DockConsistent }
                    ]
                }
            ]
        },
        {
            title: i18n.Menu,
            items: [
                {
                    id: 'QYLMenuHoverColor',
                    label: i18n.MenuHoverColor,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'theme', label: i18n.ThemeColor }
                    ]
                }
            ]
        },
        {
            title: i18n.Outline,
            items: [
                {
                    id: 'QYLOutlineStyle',
                    label: i18n.HeadingLevel,
                    options: [
                        { value: 'default', label: i18n.Default },
                        { value: 'hidden', label: i18n.Hidden },
                        { value: 'number', label: i18n.Number }
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
