import { getFile } from '../basic/API.js';
export class QYLSelfConfigAttr {
    constructor(i18n, api, highlightManager) {
        this.i18n = i18n;
        this.api = api;
        this.highlightManager = highlightManager;
        this.selfConfigAttrCache = null;
        this.selfConfigAttrCacheTime = 0;
        this.notificationTimer = null; 
    }
    async parseSelfConfigAttr() {
        const now = Date.now();
        if (this.selfConfigAttrCache && (now - this.selfConfigAttrCacheTime) < 300000) {
            return this.selfConfigAttrCache;
        }
        try {
            const configContent = await getFile('/data/snippets/QYL-SelfConfigAttr.json');
            if (!configContent) {
                this.selfConfigAttrCache = null;
                this.selfConfigAttrCacheTime = now;
                return null;
            }
            const attrs = JSON.parse(configContent);
            const validScopes = ['block', 'file', 'all', 'paragraph', 'heading', 'table', 'list', 'superblock', 'codeblock', 'blockquote', 'embed', 'htmlblock', 'mathblock', 'iframe'];
            for (const [attr, obj] of Object.entries(attrs)) {
                if (
                    typeof obj !== 'object' ||
                    !Array.isArray(obj.values) ||
                    typeof obj.note !== 'string'
                ) {
                    throw new Error(`属性 ${attr} 配置格式不正确`);
                }
                obj.scope = this.ensureScopeDefault(obj.scope);
                if (!this.isValidScope(obj.scope, validScopes)) {
                    throw new Error(`属性 ${attr} 配置格式不正确`);
                }
                for (const v of obj.values) {
                    if (
                        typeof v !== 'object' ||
                        typeof v.value !== 'string' ||
                        typeof v.note !== 'string'
                    ) {
                        throw new Error(`属性 ${attr} 的 value 配置格式不正确`);
                    }
                    v.scope = this.ensureScopeDefault(v.scope);
                    if (!this.isValidScope(v.scope, validScopes)) {
                        throw new Error(`属性 ${attr} 的 value 配置格式不正确`);
                    }
                }
            }
            this.selfConfigAttrCache = attrs;
            this.selfConfigAttrCacheTime = now;
            return attrs;
        } catch (error) {
            this.selfConfigAttrCache = null;
            this.selfConfigAttrCacheTime = now;
            return null;
        }
    }
    isValidScope(scope, validScopes) {
        if (typeof scope === 'string') {
            return validScopes.includes(scope);
        } else if (Array.isArray(scope)) {
            return scope.length > 0 && scope.every(s => validScopes.includes(s));
        }
        return false;
    }
    isScopeMatch(scope, menuType) {
        const result = (typeof scope === 'string') 
            ? (scope === 'all' || scope === menuType)
            : (Array.isArray(scope) ? (scope.includes('all') || scope.includes(menuType)) : false);
        return result;
    }
    ensureScopeDefault(scope) {
        if (!scope || (Array.isArray(scope) && scope.length === 0)) {
            return 'all';
        }
        return scope;
    }
    createSubmenu(id, items) {
        const div = document.createElement("div");
        div.id = id;
        div.className = "b3-menu__submenu";
        div.appendChild(this.createSubmenuItemsWithSeparators(items));
        return div;
    }
    createSubmenuItems(items) {
        const div = document.createElement("div");
        div.className = "b3-menu__items";
        items.forEach(item => div.appendChild(item));
        return div;
    }
    createSeparator() {
        const separator = document.createElement("button");
        separator.className = "b3-menu__separator";
        separator.disabled = true;
        return separator;
    }
    createSubmenuItemsWithSeparators(items) {
        const div = document.createElement("div");
        div.className = "b3-menu__items";
        const sortedItems = this.sortItemsByGroup(items);
        let currentGroup = null;
        sortedItems.forEach((item, index) => {
            const itemGroup = item.getAttribute('data-group');
            if (itemGroup && itemGroup !== currentGroup && currentGroup !== null) {
                div.appendChild(this.createSeparator());
            }
            div.appendChild(item);
            currentGroup = itemGroup;
        });
        return div;
    }
    sortItemsByGroup(items) {
        const groupOrder = [
            'group1', 'group2', 'group3', 'group4', 'group5', 'group6', 'group7', 'group8', 'group9', 'group10',
            'config-options', 'edit-config' 
        ];
        return items.sort((a, b) => {
            const groupA = a.getAttribute('data-group');
            const groupB = b.getAttribute('data-group');
            if (!groupA && !groupB) {
                return 0;
            }
            if (!groupA) return 1;
            if (!groupB) return -1;
            const indexA = groupOrder.indexOf(groupA);
            const indexB = groupOrder.indexOf(groupB);
            if (indexA === -1 && indexB === -1) {
                return groupA.localeCompare(groupB);
            }
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });
    }
    createMenuItemWithSubmenu(label, icon, submenu, group = null) {
        const button = document.createElement("button");
        button.className = "b3-menu__item";
        button.innerHTML = `
            <svg class="b3-menu__icon" style="null"><use xlink:href="${icon}"></use></svg>
            <span class="b3-menu__label" style="">${label}</span>
            <svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg>
        `;
        if (group) {
            button.innerHTML += `<span class="b3-menu__accelerator">${group}</span>`;
        }
        button.appendChild(submenu);
        return button;
    }
    createMenuItem(label, icon, attrName, attrValue, group = null, isWarning = false, selectid = "") {
        const button = document.createElement("button");
        button.className = "b3-menu__item";
        if (isWarning) {
            button.className += " b3-menu__item--warning";
            button.style.color = "var(--b3-theme-error)";
        }
        button.setAttribute("data-QYL-attr-id", selectid);
        button.setAttribute("custom-attr-name", attrName);
        button.setAttribute("custom-attr-value", attrValue);
        if (group) {
            button.setAttribute("data-group", group);
        }
        button.innerHTML = `
            <svg class="b3-menu__icon" style="${isWarning ? 'color: var(--b3-theme-error);' : ''}"><use xlink:href="${icon}"></use></svg>
            <span class="b3-menu__label">${label}</span>
        `;
        if (group) {
            button.innerHTML += `<span class="b3-menu__accelerator">${group}</span>`;
        }
        const attrFullName = 'custom-' + attrName;
        const updateActiveClass = (currentValue) => {
            if (
                attrValue !== "" &&
                currentValue === attrValue
            ) {
                button.classList.add('QYLAttrActive');
            } else {
                button.classList.remove('QYLAttrActive');
            }
            const updateParentHighlights = (element) => {
                let ancestor = element.parentElement;
                while (ancestor) {
                    if (ancestor.classList.contains('b3-menu__item') && ancestor.querySelector('.b3-menu__submenu')) {
                        const submenu = ancestor.querySelector('.b3-menu__submenu');
                        const hasActiveChild = submenu.querySelector('.QYLAttrActive') !== null || 
                                             (submenu.querySelector('textarea.QYLcssinput') && 
                                              submenu.querySelector('textarea.QYLcssinput').getAttribute('custom-attr-value') && 
                                              submenu.querySelector('textarea.QYLcssinput').getAttribute('custom-attr-value').trim() !== '');
                        if (hasActiveChild) {
                            ancestor.classList.add('QYLAttrActiveMenu');
                        } else {
                            ancestor.classList.remove('QYLAttrActiveMenu');
                        }
                    }
                    ancestor = ancestor.parentElement;
                }
            };
            updateParentHighlights(button);
        };
        button._QYLAttrUpdateActiveClass = updateActiveClass;
        button._QYLAttrAPI = this.api;
        if (this.highlightManager) {
            this.highlightManager.register(button, selectid, attrFullName, updateActiveClass);
        }
        const selfRemoveObserver = new MutationObserver(() => {
            if (!button.isConnected) {
                if (this.highlightManager) {
                    this.highlightManager.unregister(button);
                }
                selfRemoveObserver.disconnect();
            }
        });
        selfRemoveObserver.observe(document.body, { subtree: true, childList: true });
        button._QYLAttrSelfRemoveObserver = selfRemoveObserver;
        button.onclick = async (e) => {
            const isActive = button.classList.contains('QYLAttrActive');
            const id = button.getAttribute("data-QYL-attr-id");
            const attrNameFull = 'custom-' + button.getAttribute("custom-attr-name");
            try {
                if (isActive) {
                    await this.api.setCustomAttribute(id, attrNameFull, '');
                    try {
                        await this.showNotification(this.i18n.attrCanceled);
                    } catch (error) {
                    }
                } else {
                    await this.QYLcustomattrset(e);
                    try {
                        await this.showNotification(this.i18n.attrSetSuccess);
                    } catch (error) {
                    }
                }
                if (this.highlightManager) {
                    await this.highlightManager.refreshBySelectIdImmediate(id);
                }
            } catch (error) {
            }
        };
        return button;
    }
    async createSelfConfigAttrItem(selectid, menuType = 'all') {
        const selfConfig = await this.parseSelfConfigAttr();
        const items = [];
        const selfConfigAttrNames = [];
        if (selfConfig && Object.keys(selfConfig).length > 0) {
            for (const [attrName, config] of Object.entries(selfConfig)) {
                if (!this.isScopeMatch(config.scope, menuType)) {
                    continue;
                }
                const validValues = config.values.filter(v => this.isScopeMatch(v.scope, menuType));
                if (validValues.length === 0) continue;
                selfConfigAttrNames.push(attrName);
                const subItems = validValues.map(v => {
                    const hasValue = v.value && v.value.trim() !== '';
                    const hasNote = v.note && v.note.trim() !== '';
                    const isEmpty = !hasValue && !hasNote;
                    let valueDisplayLabel;
                    if (isEmpty) {
                        valueDisplayLabel = this.i18n.emptyValue || '空值';
                    } else if (hasValue && hasNote) {
                        valueDisplayLabel = `${v.value}(${v.note})`;
                    } else if (hasValue && !hasNote) {
                        valueDisplayLabel = v.value;
                    } else if (!hasValue && hasNote) {
                        valueDisplayLabel = `${this.i18n.emptyValue || '空值'}(${v.note})`;
                    } else {
                        valueDisplayLabel = this.i18n.emptyValue || '空值';
                    }
                    return this.createMenuItem(
                        valueDisplayLabel,
                        "#iconSettings",
                        attrName,
                        v.value || '',
                        null,
                        isEmpty, 
                        selectid
                    );
                });
                const submenu = this.createSubmenu(`QYLattrselfconfig${attrName}sub`, subItems);
                const hasAttrNote = config.note && config.note.trim() !== '';
                const displayLabel = hasAttrNote ? `${attrName}(${config.note})` : attrName;
                const menuItem = this.createMenuItemWithSubmenu(displayLabel, "#iconSettings", submenu);
                menuItem.setAttribute("data-group", "config-options");
                items.push(menuItem);
            }
        }
        const editConfigButton = document.createElement("button");
        editConfigButton.className = "b3-menu__item";
        editConfigButton.innerHTML = `
            <svg class="b3-menu__icon" style=""><use xlink:href="#iconEdit"></use></svg>
            <span class="b3-menu__label">${this.i18n.editconfig || '编辑配置'}</span>
        `;
        editConfigButton.onclick = () => {
            this.showEditDialog();
        };
        if (items.length > 0) {
            editConfigButton.setAttribute("data-group", "edit-config");
        }
        items.push(editConfigButton);
        const submenu = this.createSubmenu("QYLattrselfconfigsub", items);
        const selfConfigButton = this.createMenuItemWithSubmenu(this.i18n.selfconfigattr, "#iconSettings", submenu);
        if (selfConfigAttrNames.length > 0) {
            selfConfigButton._QYLSelfConfigActiveAttrs = new Set();
            const updateSelfConfigActiveClass = async () => {
                try {
                    const attrNames = selfConfigAttrNames.map(name => `custom-${name}`);
                    const attrValues = await this.api.getBlockAttributes(selectid, attrNames);
                    const hasActiveAttr = attrNames.some(attrName => {
                        const value = attrValues && attrValues[attrName];
                        return value && value.trim() !== '';
                    });
                    if (hasActiveAttr) {
                        selfConfigButton.classList.add('QYLAttrActiveMenu');
                    } else {
                        selfConfigButton.classList.remove('QYLAttrActiveMenu');
                    }
                } catch (error) {
                }
            };
            for (const attrName of selfConfigAttrNames) {
                const attrFullName = `custom-${attrName}`;
                const updateFn = (currentValue) => {
                    updateSelfConfigActiveClass();
                };
                if (this.highlightManager) {
                    this.highlightManager.register(selfConfigButton, selectid, attrFullName, updateFn);
                }
            }
            const selfRemoveObserver = new MutationObserver(() => {
                if (!selfConfigButton.isConnected) {
                    if (this.highlightManager) {
                        this.highlightManager.unregister(selfConfigButton);
                    }
                    selfRemoveObserver.disconnect();
                }
            });
            selfRemoveObserver.observe(document.body, { subtree: true, childList: true });
            selfConfigButton._QYLAttrSelfRemoveObserver = selfRemoveObserver;
            selfConfigButton._QYLSelfConfigAttrNames = selfConfigAttrNames;
        }
        return selfConfigButton;
    }
    async QYLcustomattrset(event) {
        let id = event.currentTarget.getAttribute("data-QYL-attr-id");
        let attrName = 'custom-' + event.currentTarget.getAttribute("custom-attr-name");
        let attrValue = event.currentTarget.getAttribute("custom-attr-value");
        let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`);
        if (blocks) {
            blocks.forEach(block => block.setAttribute(attrName, attrValue));
        }
        await this.api.setCustomAttribute(id, attrName, attrValue);
        if (this.highlightManager) {
            await this.highlightManager.refreshBySelectIdImmediate(id);
        }
    }
    createEditDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'b3-dialog--open';
        dialog.setAttribute('data-key', 'QYLSelfConfigAttrEdit');
        const dialogContainer = document.createElement('div');
        dialogContainer.className = 'b3-dialog';
        dialogContainer.style.zIndex = '30';
        const scrim = document.createElement('div');
        scrim.className = 'b3-dialog__scrim';
        const container = document.createElement('div');
        container.className = 'b3-dialog__container';
        container.style.width = 'auto';
        container.style.height = 'auto';
        container.style.left = 'auto';
        container.style.top = 'auto';
        container.style.maxWidth = '95vw';
        container.style.maxHeight = '90vh';
        const header = document.createElement('div');
        header.className = 'b3-dialog__header';
        header.textContent = 'QYL ' + this.i18n.selfconfigattr;
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        let hasMoved = false; 
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
        const attrNameSelect = document.createElement('select');
        attrNameSelect.className = 'b3-select';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = this.i18n.gotoattr;
        attrNameSelect.appendChild(defaultOption);
        attrNameSelect.addEventListener('change', (e) => {
            const selectedAttrName = e.target.value;
            if (selectedAttrName) {
                this.scrollToAttributeRow(selectedAttrName);
            }
        });
        const content = document.createElement('div');
        content.className = 'b3-dialog__content';
        content.style.maxWidth = '100vw';
        content.style.maxHeight = '80vh';
        content.style.overflow = 'auto';
        const attributesContainer = document.createElement('div');
        attributesContainer.id = 'QYL-attributes-container';
        content.appendChild(attributesContainer);
        const addAttrBtn = document.createElement('button');
        addAttrBtn.className = 'b3-button b3-button--text';
        addAttrBtn.textContent = this.i18n.addnewattr;
        addAttrBtn.onclick = () => this.addAttributeRow(attributesContainer);
        this.loadExistingConfig(attributesContainer);
        const body = document.createElement('div');
        body.className = 'b3-dialog__body';
        const action = document.createElement('div');
        action.className = 'b3-dialog__action';
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'b3-button b3-button--cancel';
        cancelBtn.textContent = this.i18n.cancel;
        cancelBtn.onclick = () => {
            const dialog = document.querySelector('.b3-dialog--open[data-key="QYLSelfConfigAttrEdit"]');
            if (dialog) {
                document.body.removeChild(dialog);
            }
        };
        const space = document.createElement('div');
        space.className = 'fn__space';
        const saveBtn = document.createElement('button');
        saveBtn.className = 'b3-button b3-button--text';
        saveBtn.textContent = this.i18n.saveandclose;
        saveBtn.onclick = () => this.saveConfigAndClose();
        const space2 = document.createElement('div');
        space2.className = 'fn__space';
        const openSnippetBtn = document.createElement('button');
        openSnippetBtn.className = 'b3-button b3-button--text';
        openSnippetBtn.textContent = this.i18n.openSnippet || '打开代码片段';
        openSnippetBtn.onclick = () => {
            const barWorkspace = document.querySelector('#barWorkspace');
            if (barWorkspace) {
                barWorkspace.click();
                const retryWithTimeout = (selector, action, maxRetries = 500, interval = 1) => {
                    let retryCount = 0;
                    const tryAction = () => {
                        const element = document.querySelector(selector);
                        if (element) {
                            action(element);
                            return true;
                        } else if (retryCount < maxRetries) {
                            retryCount++;
                            setTimeout(tryAction, interval);
                            return false;
                        }
                        return false;
                    };
                    setTimeout(tryAction, 5); 
                };
                retryWithTimeout('[data-id="config"]', (configBtn) => {
                    configBtn.click();
                    retryWithTimeout('[data-name="appearance"]', (appearanceBtn) => {
                        appearanceBtn.click();
                        retryWithTimeout('#codeSnippet', (codeSnippetBtn) => {
                            codeSnippetBtn.click();
                            retryWithTimeout('[data-key="dialog-snippets"]', (dialogSnippets) => {
                                dialogSnippets.style.zIndex = '50';
                                retryWithTimeout('#barWorkspace', (barWorkspace) => {
                                    barWorkspace.click();
                                    retryWithTimeout('[data-id="config"]', (configBtn) => {
                                        configBtn.click();
                                    });
                                });
                            });
                        });
                    });
                });
            }
        };
        action.appendChild(cancelBtn);
        action.appendChild(space);
        action.appendChild(openSnippetBtn);
        action.appendChild(space2);
        action.appendChild(saveBtn);
        body.appendChild(attrNameSelect);
        body.appendChild(content);
        body.appendChild(addAttrBtn);
        body.appendChild(action);
        container.appendChild(header);
        container.appendChild(body);
        dialogContainer.appendChild(scrim);
        dialogContainer.appendChild(container);
        dialog.appendChild(dialogContainer);
        return dialog;
    }
    createAttributeRow(attrName = '', attrNote = '', attrScope = '', values = []) {
        const attrRow = document.createElement('div');
        attrRow.className = 'QYL-attr-row';
        const attrSettingsRow = document.createElement('div');
        attrSettingsRow.className = 'QYL-attrname-container';
        const nameLabel = document.createElement('span');
        nameLabel.textContent = this.i18n.attrname;
        const nameInput = document.createElement('input');
        nameInput.className = 'b3-text-field';
        nameInput.spellcheck = false;
        nameInput.value = attrName;
        let hasValidationError = false;
        nameInput.addEventListener('input', (e) => {
            const value = e.target.value.trim();
            hasValidationError = false;
            if (value) {
                if (!/^[a-zA-Z]/.test(value)) {
                    this.showNotification(this.i18n.attrnameStartWithLetter || '属性名必须以英文字母开头');
                    hasValidationError = true;
                }
                if (!/^[a-zA-Z0-9-]+$/.test(value)) {
                    this.showNotification(this.i18n.attrnameInvalidChars || '属性名只能包含英文字母、数字和连字符');
                    hasValidationError = true;
                }
            }
            if (hasValidationError) {
                nameInput.style.borderColor = 'var(--b3-theme-error)';
                nameInput.style.color = 'var(--b3-theme-error)';
            } else {
                nameInput.style.borderColor = '';
                nameInput.style.color = '';
            }
        });
        nameInput.addEventListener('blur', (e) => {
            const value = e.target.value.trim();
            if (value && hasValidationError) {
                setTimeout(() => {
                    nameInput.focus();
                }, 0);
            } else {
                nameInput.style.borderColor = '';
                nameInput.style.color = '';
            }
        });
        const noteLabel = document.createElement('span');
        noteLabel.textContent = this.i18n.displayas;
        const noteInput = document.createElement('input');
        noteInput.className = 'b3-text-field';
        noteInput.spellcheck = false;
        noteInput.value = attrNote;
        const scopeLabel = document.createElement('span');
        scopeLabel.textContent = this.i18n.applyto;
        const scopeMultiSelect = this.createMultiSelect(attrScope);
        const deleteAttrBtn = document.createElement('button');
        deleteAttrBtn.className = 'b3-button b3-button--remove';
        deleteAttrBtn.textContent = this.i18n.deleteattr;
        deleteAttrBtn.onclick = () => attrRow.remove();
        attrSettingsRow.appendChild(nameLabel);
        attrSettingsRow.appendChild(nameInput);
        attrSettingsRow.appendChild(noteLabel);
        attrSettingsRow.appendChild(noteInput);
        attrSettingsRow.appendChild(scopeLabel);
        attrSettingsRow.appendChild(scopeMultiSelect);
        attrSettingsRow.appendChild(deleteAttrBtn);
        const valuesContainer = document.createElement('div');
        valuesContainer.className = 'QYL-values-container';
        const addValueBtn = document.createElement('button');
        addValueBtn.className = 'b3-button b3-button--cancel';
        addValueBtn.textContent = this.i18n.addattrvalue;
        addValueBtn.onclick = () => this.addValueRow(valuesContainer, '', '', '', true);
        if (values.length > 0) {
            values.forEach(value => {
                this.addValueRow(valuesContainer, value.value, value.note, value.scope, false);
            });
        } else {
            this.addValueRow(valuesContainer, '', '', '', false);
        }
        attrRow.appendChild(attrSettingsRow);
        attrRow.appendChild(valuesContainer);
        attrRow.appendChild(addValueBtn);
        return attrRow;
    }
    addValueRow(container, value = '', note = '', scope = '', shouldFocus = false) {
        const valueRow = document.createElement('div');
        const valueLabel = document.createElement('span');
        valueLabel.textContent = this.i18n.attrvalue;
        const valueInput = document.createElement('input');
        valueInput.className = 'b3-text-field';
        valueInput.spellcheck = false;
        valueInput.value = value;
        const noteLabel = document.createElement('span');
        noteLabel.textContent = this.i18n.displayas;
        const noteInput = document.createElement('input');
        noteInput.className = 'b3-text-field';
        noteInput.spellcheck = false;
        noteInput.value = note;
        const scopeLabel = document.createElement('span');
        scopeLabel.textContent = this.i18n.applyto;
        const scopeMultiSelect = this.createMultiSelect(scope);
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'b3-button b3-button--remove';
        deleteBtn.textContent = this.i18n.delete;
        deleteBtn.onclick = () => valueRow.remove();
        valueRow.appendChild(valueLabel);
        valueRow.appendChild(valueInput);
        valueRow.appendChild(noteLabel);
        valueRow.appendChild(noteInput);
        valueRow.appendChild(scopeLabel);
        valueRow.appendChild(scopeMultiSelect);
        valueRow.appendChild(deleteBtn);
        container.appendChild(valueRow);
        if (shouldFocus) {
            valueRow.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            if (valueInput) {
                valueInput.focus();
            }
        }
    }
    addAttributeRow(container) {
        const attrRow = this.createAttributeRow();
        container.appendChild(attrRow);
        const nameInput = attrRow.querySelector('.QYL-attrname-container .b3-text-field:first-of-type');
        const noteInput = attrRow.querySelector('.QYL-attrname-container .b3-text-field:nth-of-type(2)');
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                this.updateAttrNameSelect();
            });
            attrRow.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            nameInput.focus();
        }
        if (noteInput) {
            noteInput.addEventListener('input', () => {
                this.updateAttrNameSelect();
            });
        }
    }
    updateAttrNameSelect() {
        const attrNameSelect = document.querySelector('.b3-dialog__body .b3-select');
        if (!attrNameSelect) return;
        while (attrNameSelect.children.length > 1) {
            attrNameSelect.removeChild(attrNameSelect.lastChild);
        }
        const attrRows = document.querySelectorAll('.QYL-attr-row');
        const attrNameNoteMap = new Map();
        attrRows.forEach(attrRow => {
            const nameInput = attrRow.querySelector('.QYL-attrname-container .b3-text-field:first-of-type');
            const noteInput = attrRow.querySelector('.QYL-attrname-container .b3-text-field:nth-of-type(2)');
            if (nameInput && nameInput.value.trim()) {
                const attrName = nameInput.value.trim();
                const note = noteInput ? noteInput.value.trim() : '';
                attrNameNoteMap.set(attrName, note);
            }
        });
        const sortedAttrNames = Array.from(attrNameNoteMap.keys()).sort((a, b) => {
            return a.localeCompare(b, undefined, { sensitivity: 'base' });
        });
        sortedAttrNames.forEach(attrName => {
            const option = document.createElement('option');
            option.value = attrName;
            const note = attrNameNoteMap.get(attrName);
            option.textContent = note ? `${attrName}(${note})` : attrName;
            attrNameSelect.appendChild(option);
        });
    }
    async loadExistingConfig(container) {
        const config = await this.parseSelfConfigAttr();
        if (config && Object.keys(config).length > 0) {
            for (const [attrName, attrConfig] of Object.entries(config)) {
                const attrRow = this.createAttributeRow(
                    attrName,
                    attrConfig.note,
                    attrConfig.scope,
                    attrConfig.values
                );
                container.appendChild(attrRow);
                const nameInput = attrRow.querySelector('.QYL-attrname-container .b3-text-field:first-of-type');
                const noteInput = attrRow.querySelector('.QYL-attrname-container .b3-text-field:nth-of-type(2)');
                if (nameInput) {
                    let hasValidationError = false;
                    nameInput.addEventListener('input', (e) => {
                        const value = e.target.value.trim();
                        hasValidationError = false;
                        if (value) {
                            if (!/^[a-zA-Z]/.test(value)) {
                                this.showNotification(this.i18n.attrnameStartWithLetter || '属性名必须以英文字母开头');
                                hasValidationError = true;
                            }
                            if (!/^[a-zA-Z0-9-]+$/.test(value)) {
                                this.showNotification(this.i18n.attrnameInvalidChars || '属性名只能包含英文字母、数字和连字符');
                                hasValidationError = true;
                            }
                        }
                        if (hasValidationError) {
                            nameInput.style.borderColor = 'var(--b3-theme-error)';
                            nameInput.style.color = 'var(--b3-theme-error)';
                        } else {
                            nameInput.style.borderColor = '';
                            nameInput.style.color = '';
                        }
                        this.updateAttrNameSelect();
                    });
                    nameInput.addEventListener('blur', (e) => {
                        const value = e.target.value.trim();
                        if (value && hasValidationError) {
                            setTimeout(() => {
                                nameInput.focus();
                            }, 0);
                        } else {
                            nameInput.style.borderColor = '';
                            nameInput.style.color = '';
                        }
                    });
                }
                if (noteInput) {
                    noteInput.addEventListener('input', () => {
                        this.updateAttrNameSelect();
                    });
                }
            }
        }
        this.updateAttrNameSelect();
    }
    showEditDialog() {
        const dialog = this.createEditDialog();
        document.body.appendChild(dialog);
        const scrim = dialog.querySelector('.b3-dialog__scrim');
        const closeDialog = () => {
            this.cleanupDialog(dialog);
            this.cleanupAllQYLContent();
        };
        scrim.addEventListener('click', closeDialog);
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeDialog();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        dialog._keydownHandler = handleKeyDown;
        return dialog;
    }
    scrollToAttributeRow(attrName) {
        const attrRows = document.querySelectorAll('.QYL-attr-row');
        for (const attrRow of attrRows) {
            const nameInput = attrRow.querySelector('.QYL-attrname-container .b3-text-field:first-of-type');
            if (nameInput && nameInput.value.trim() === attrName) {
                attrRow.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                break;
            }
        }
    }
    createMultiSelect(selectedScopes = '') {
        const container = document.createElement('div');
        container.className = 'QYL-multi-select';
        const selectedArray = typeof selectedScopes === 'string' && selectedScopes !== 'all' && selectedScopes !== '' ? [selectedScopes] : 
                            Array.isArray(selectedScopes) && selectedScopes.length > 0 ? selectedScopes : 
                            ['all'];
        const options = [
            { value: 'all', label: this.i18n.all },
            { value: 'block', label: this.i18n.block },
            { value: 'file', label: this.i18n.file },
            { value: 'paragraph', label: this.i18n.paragraph },
            { value: 'heading', label: this.i18n.heading },
            { value: 'table', label: this.i18n.table },
            { value: 'list', label: this.i18n.list },
            { value: 'superblock', label: this.i18n.superblock },
            { value: 'codeblock', label: this.i18n.codeblock },
            { value: 'blockquote', label: this.i18n.blockquote },
            { value: 'embed', label: this.i18n.embed },
            { value: 'htmlblock', label: this.i18n.htmlblock },
            { value: 'mathblock', label: this.i18n.mathblock },
            { value: 'iframe', label: this.i18n.iframe }
        ];
        options.forEach(option => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'QYL-multi-select-option';
            button.textContent = option.label;
            button.dataset.value = option.value;
            if (selectedArray.includes(option.value)) {
                button.classList.add('selected');
            }
            button.addEventListener('click', () => {
                if (option.value === 'all') {
                    const allButton = container.querySelector('.QYL-multi-select-option[data-value="all"]');
                    const otherButtons = container.querySelectorAll('.QYL-multi-select-option:not([data-value="all"])');
                    allButton.classList.add('selected');
                    otherButtons.forEach(btn => btn.classList.remove('selected'));
                } else {
                    const allButton = container.querySelector('.QYL-multi-select-option[data-value="all"]');
                    const otherButtons = container.querySelectorAll('.QYL-multi-select-option:not([data-value="all"])');
                    if (!button.classList.contains('selected')) {
                        button.classList.add('selected');
                        allButton.classList.remove('selected');
                    } else {
                        button.classList.remove('selected');
                        const hasOtherSelected = Array.from(otherButtons).some(btn => btn.classList.contains('selected'));
                        if (!hasOtherSelected) {
                            allButton.classList.add('selected');
                        }
                    }
                }
            });
            container.appendChild(button);
        });
        container.getSelectedValues = () => {
            const selectedButtons = container.querySelectorAll('.QYL-multi-select-option.selected');
            const selectedValues = [];
            selectedButtons.forEach(button => {
                selectedValues.push(button.dataset.value);
            });
            return selectedValues;
        };
        return container;
    }
    async showNotification(message) {
        if (this.notificationTimer) {
            clearTimeout(this.notificationTimer);
        }
        this.notificationTimer = setTimeout(async () => {
            try {
                await fetch('/api/notification/pushMsg', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        msg: message,
                        timeout: 3000
                    })
                });
                setTimeout(() => {
                    if (this.notificationTimer) {
                        this.notificationTimer = null;
                    }
                }, 3500); 
            } catch (error) {
                this.notificationTimer = null;
            }
        }, 500); 
    }
    cleanupDialog(dialog) {
        if (!dialog) return;
        const mousemoveHandler = dialog._mousemoveHandler;
        const mouseupHandler = dialog._mouseupHandler;
        const keydownHandler = dialog._keydownHandler;
        if (mousemoveHandler) {
            document.removeEventListener('mousemove', mousemoveHandler);
        }
        if (mouseupHandler) {
            document.removeEventListener('mouseup', mouseupHandler);
        }
        if (keydownHandler) {
            document.removeEventListener('keydown', keydownHandler);
        }
        const allInputs = dialog.querySelectorAll('input, textarea, select');
        allInputs.forEach(input => {
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
        });
        const allButtons = dialog.querySelectorAll('button');
        allButtons.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        });
        const multiSelects = dialog.querySelectorAll('.QYL-multi-select');
        multiSelects.forEach(select => {
            const newSelect = select.cloneNode(true);
            select.parentNode.replaceChild(newSelect, select);
        });
        const selects = dialog.querySelectorAll('select');
        selects.forEach(select => {
            const newSelect = select.cloneNode(true);
            select.parentNode.replaceChild(newSelect, select);
        });
        const scrim = dialog.querySelector('.b3-dialog__scrim');
        if (scrim) {
            const newScrim = scrim.cloneNode(true);
            scrim.parentNode.replaceChild(newScrim, scrim);
        }
        const header = dialog.querySelector('.b3-dialog__header');
        if (header) {
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);
        }
        if (dialog.parentNode) {
            dialog.parentNode.removeChild(dialog);
        }
    }
    cleanupAllQYLContent() {
        const QYLMenuItems = document.querySelectorAll('[data-custom-attr-name]');
        QYLMenuItems.forEach(item => {
            const newItem = item.cloneNode(true);
            if (item.parentNode) {
                item.parentNode.replaceChild(newItem, item);
            }
        });
        const QYLMenus = document.querySelectorAll('[id*="QYLattrselfconfig"]');
        QYLMenus.forEach(menu => {
            if (menu.parentNode) {
                menu.parentNode.removeChild(menu);
            }
        });
        const QYLDialogs = document.querySelectorAll('[data-key*="QYL"]');
        QYLDialogs.forEach(dialog => {
            this.cleanupDialog(dialog);
        });
        const QYLElements = document.querySelectorAll('.QYL-attr-row, .QYL-multi-select, .QYLAttrActiveMenu');
        QYLElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
    }
    closeQYLSelfConfigAttr() {
        this.cleanupAllQYLContent();
        this.selfConfigAttrCache = null;
        this.selfConfigAttrCacheTime = 0;
    }
    async saveConfigAndClose() {
        try {
            const config = this.collectCurrentConfig();
            if (!this.validateConfig(config)) {
                return;
            }
            const { putFile } = await import('../basic/API.js');
            const jsonContent = JSON.stringify(config, null, 2);
            const result = await putFile('/data/snippets/QYL-SelfConfigAttr.json', jsonContent);
            if (result && result.code === 0) {
                this.selfConfigAttrCache = null;
                this.selfConfigAttrCacheTime = 0;
                const dialog = document.querySelector('.b3-dialog--open[data-key="QYLSelfConfigAttrEdit"]');
                this.cleanupDialog(dialog);
                this.cleanupAllQYLContent();
                await this.showNotification(this.i18n.saveSuccess || '配置保存成功');
            } else {
                throw new Error(result?.msg || '保存失败');
            }
        } catch (error) {
            await this.showNotification((this.i18n.saveError || '保存配置失败') + ': ' + error.message);
        }
    }
    collectCurrentConfig() {
        const config = {};
        const attrRows = document.querySelectorAll('.QYL-attr-row');
        let hasEmptyAttrName = false;
        attrRows.forEach(attrRow => {
            const nameInput = attrRow.querySelector('.QYL-attrname-container .b3-text-field:first-of-type');
            const attrName = nameInput ? nameInput.value.trim() : '';
            if (!attrName) {
                hasEmptyAttrName = true;
                return; 
            }
            const noteInput = attrRow.querySelector('.QYL-attrname-container .b3-text-field:nth-of-type(2)');
            const attrNote = noteInput ? noteInput.value.trim() : '';
            const attrScopeSelect = attrRow.querySelector('.QYL-attrname-container .QYL-multi-select');
            const attrScope = attrScopeSelect ? attrScopeSelect.getSelectedValues() : [];
            const values = [];
            const valueRows = attrRow.querySelectorAll('.QYL-values-container > div');
            valueRows.forEach(valueRow => {
                const valueInput = valueRow.querySelector('.b3-text-field:first-of-type');
                const value = valueInput ? valueInput.value.trim() : '';
                const valueNoteInput = valueRow.querySelector('.b3-text-field:nth-of-type(2)');
                const valueNote = valueNoteInput ? valueNoteInput.value.trim() : '';
                const valueScopeSelect = valueRow.querySelector('.QYL-multi-select');
                const valueScope = valueScopeSelect ? valueScopeSelect.getSelectedValues() : [];
                values.push({
                    value: value,
                    note: valueNote,
                    scope: valueScope.length === 1 ? valueScope[0] : valueScope
                });
            });
            config[attrName] = {
                note: attrNote,
                scope: attrScope.length === 1 ? attrScope[0] : attrScope,
                values: values
            };
        });
        if (hasEmptyAttrName) {
            config._hasEmptyAttrName = true;
        }
        return config;
    }
    validateConfig(config) {
        if (config._hasEmptyAttrName) {
            this.showNotification(this.i18n.attrNameEmpty || '属性名不能为空');
            return false;
        }
        if (Object.keys(config).length === 0) {
            return true;
        }
        for (const [attrName, attrConfig] of Object.entries(config)) {
            if (attrName === '_hasEmptyAttrName') continue;
            if (!/^[a-zA-Z][a-zA-Z0-9-]*$/.test(attrName)) {
                this.showNotification(`${this.i18n.attrname || '属性名'} "${attrName}" ${this.i18n.attrNameInvalid || '格式不正确，必须以英文字母开头，只能包含英文字母、数字和连字符'}`);
                return false;
            }
            if (!attrConfig.scope || (Array.isArray(attrConfig.scope) && attrConfig.scope.length === 0)) {
                this.showNotification(`${this.i18n.attribute || '属性'} "${attrName}" ${this.i18n.scopeEmpty || '至少选择一个适用范围'}`);
                return false;
            }
            if (!attrConfig.values) {
                attrConfig.values = [];
            }
            for (const value of attrConfig.values) {
                if (!value.scope || (Array.isArray(value.scope) && value.scope.length === 0)) {
                    this.showNotification(`${this.i18n.attribute || '属性'} "${attrName}" 的值 "${value.value || this.i18n.emptyValue || '空值'}" ${this.i18n.scopeEmpty || '至少选择一个适用范围'}`);
                    return false;
                }
            }
        }
        return true;
    }
}
