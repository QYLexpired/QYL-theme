import { QYLAttrHighlightManager } from './MenuItemFactory.js';
export class QYLTimeAttr {
    constructor(i18n, api, selfConfigAttr) {
        this.i18n = i18n;
        this.api = api;
        this.selfConfigAttr = selfConfigAttr;
    }
    createTimeItem(selectid, menuData) {
        const items = [];
        for (const option of menuData.timeOptions) {
            const menuItem = this.createTimeMenuItem(option, selectid);
            items.push(menuItem);
        }
        const separator = document.createElement("button");
        separator.className = "b3-menu__separator";
        items.push(separator);
        const manualMenuItem = this.createManualTimeMenuItem(selectid);
        items.push(manualMenuItem);
        const updateMenuItem = this.createUpdateTimeMenuItem(selectid);
        items.push(updateMenuItem);
        return items;
    }
    createTimeMenuItem(option, selectid) {
        const menuItem = document.createElement("button");
        menuItem.className = "b3-menu__item";
        menuItem.setAttribute("data-QYL-attr-id", selectid);
        menuItem.setAttribute("custom-attr-name", option.attrName);
        menuItem.setAttribute("custom-attr-value", option.value);
        menuItem.innerHTML = `
            <svg class="b3-menu__icon" style=""><use xlink:href="${option.icon}"></use></svg>
            <span class="b3-menu__label">${this.i18n[option.label]}</span>
        `;
        const timeUpdateActiveClass = (currentValue) => {
            if (currentValue && currentValue !== "" && currentValue !== "dynamic") {
                menuItem.classList.add('QYLAttrActive');
                const labelElement = menuItem.querySelector('.b3-menu__label');
                if (labelElement) {
                    labelElement.textContent = this.i18n.timeSetSuccess.replace('{time}', currentValue);
                }
            } else {
                menuItem.classList.remove('QYLAttrActive');
                const labelElement = menuItem.querySelector('.b3-menu__label');
                if (labelElement) {
                    labelElement.textContent = this.i18n[option.label];
                }
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
            updateParentHighlights(menuItem);
        };
        menuItem._QYLAttrUpdateActiveClass = timeUpdateActiveClass;
        menuItem._QYLAttrAPI = this.api;
        QYLAttrHighlightManager.register(menuItem, selectid, 'custom-' + option.attrName, timeUpdateActiveClass);
        menuItem.onclick = async (e) => {
            await this.handleTimeMenuItemClick(menuItem, option);
        };
        const selfRemoveObserver = new MutationObserver(() => {
            if (!menuItem.isConnected) {
                QYLAttrHighlightManager.unregister(menuItem);
                selfRemoveObserver.disconnect();
            }
        });
        selfRemoveObserver.observe(document.body, { subtree: true, childList: true });
        menuItem._QYLAttrSelfRemoveObserver = selfRemoveObserver;
        return menuItem;
    }
    async handleTimeMenuItemClick(menuItem, option) {
        const isActive = menuItem.classList.contains('QYLAttrActive');
        if (isActive) {
            await this.cancelTimeSetting(menuItem);
        } else {
            await this.setCurrentTime(menuItem, option);
        }
    }
    async cancelTimeSetting(menuItem) {
        const id = menuItem.getAttribute("data-QYL-attr-id");
        const attrNameFull = 'custom-' + menuItem.getAttribute("custom-attr-name");
        let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`);
        if (blocks) {
            blocks.forEach(block => block.setAttribute(attrNameFull, ''));
        }
        await this.api.setCustomAttribute(id, attrNameFull, '');
        try {
            await this.selfConfigAttr.showNotification(this.i18n.attrCanceled);
        } catch (error) {
        }
        await QYLAttrHighlightManager.refreshBySelectIdImmediate(id);
        setTimeout(() => {
            const labelElement = menuItem.querySelector('.b3-menu__label');
            if (labelElement) {
                const option = this.getOptionByAttrName(menuItem.getAttribute("custom-attr-name"));
                labelElement.textContent = this.i18n[option.label];
            }
        }, 50);
    }
    async setCurrentTime(menuItem, option) {
        try {
            const currentTime = this.api.getCurrentTime();
            if (currentTime) {
                let timeValue = '';
                if (option.attrName === 'QYL-date') {
                    timeValue = this.api.formatTime(currentTime, 'date');
                } else if (option.attrName === 'QYL-time') {
                    timeValue = this.api.formatTime(currentTime, 'time');
                } else if (option.attrName === 'QYL-date-time') {
                    timeValue = this.api.formatTime(currentTime, 'date-time');
                }
                menuItem.setAttribute("custom-attr-value", timeValue);
                const id = menuItem.getAttribute("data-QYL-attr-id");
                const attrNameFull = 'custom-' + menuItem.getAttribute("custom-attr-name");
                let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`);
                if (blocks) {
                    blocks.forEach(block => block.setAttribute(attrNameFull, timeValue));
                }
                await this.api.setCustomAttribute(id, attrNameFull, timeValue);
                try {
                    const message = this.i18n.timeSetSuccess.replace('{time}', timeValue);
                    await this.selfConfigAttr.showNotification(message);
                } catch (error) {
                }
                await QYLAttrHighlightManager.refreshBySelectIdImmediate(id);
                setTimeout(() => {
                    const labelElement = menuItem.querySelector('.b3-menu__label');
                    if (labelElement) {
                        labelElement.textContent = this.i18n.timeSetSuccess.replace('{time}', timeValue);
                    }
                }, 50);
            }
        } catch (error) {
            try {
                await this.selfConfigAttr.showNotification(this.i18n.getTimeFailed);
            } catch (error) {
            }
        }
    }
    createManualTimeMenuItem(selectid) {
        const manualMenuItem = document.createElement("button");
        manualMenuItem.className = "b3-menu__item";
        manualMenuItem.setAttribute("data-QYL-attr-id", selectid);
        manualMenuItem.innerHTML = `
            <svg class="b3-menu__icon" style=""><use xlink:href="#iconEdit"></use></svg>
            <span class="b3-menu__label">${this.i18n.manualSetTime}</span>
        `;
        manualMenuItem.onclick = async (e) => {
            this.showManualTimeSetDialog(selectid);
        };
        return manualMenuItem;
    }
    createUpdateTimeMenuItem(selectid) {
        const updateMenuItem = document.createElement("button");
        updateMenuItem.className = "b3-menu__item";
        updateMenuItem.setAttribute("data-QYL-attr-id", selectid);
        updateMenuItem.innerHTML = `
            <svg class="b3-menu__icon" style=""><use xlink:href="#iconRefresh"></use></svg>
            <span class="b3-menu__label">${this.i18n.updateToCurrentTime}</span>
        `;
        updateMenuItem.onclick = async (e) => {
            await this.updateToCurrentTime(selectid);
        };
        return updateMenuItem;
    }
    async updateToCurrentTime(selectid) {
        try {
            const currentTime = this.api.getCurrentTime();
            if (currentTime) {
                const id = selectid;
                const timeAttrs = await this.api.getBlockAttributes(id, ['custom-QYL-date', 'custom-QYL-time', 'custom-QYL-date-time']);
                let updatedTimes = [];
                let attrsToUpdate = {};
                if (timeAttrs && timeAttrs['custom-QYL-date'] && timeAttrs['custom-QYL-date'] !== '') {
                    const dateValue = this.api.formatTime(currentTime, 'date');
                    attrsToUpdate['custom-QYL-date'] = dateValue;
                    updatedTimes.push(dateValue);
                }
                if (timeAttrs && timeAttrs['custom-QYL-time'] && timeAttrs['custom-QYL-time'] !== '') {
                    const timeValue = this.api.formatTime(currentTime, 'time');
                    attrsToUpdate['custom-QYL-time'] = timeValue;
                    updatedTimes.push(timeValue);
                }
                if (timeAttrs && timeAttrs['custom-QYL-date-time'] && timeAttrs['custom-QYL-date-time'] !== '') {
                    const dateTimeValue = this.api.formatTime(currentTime, 'date-time');
                    attrsToUpdate['custom-QYL-date-time'] = dateTimeValue;
                    updatedTimes.push(dateTimeValue);
                }
                if (Object.keys(attrsToUpdate).length > 0) {
                    let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`);
                    if (blocks) {
                        blocks.forEach(block => {
                            Object.entries(attrsToUpdate).forEach(([attrName, attrValue]) => {
                                block.setAttribute(attrName, attrValue);
                            });
                        });
                    }
                    await this.api.setBlockAttributes(id, attrsToUpdate);
                }
                try {
                    if (updatedTimes.length > 0) {
                        const timesText = updatedTimes.join('、');
                        const message = this.i18n.timeUpdateSuccess.replace('{times}', timesText);
                        await this.selfConfigAttr.showNotification(message);
                    } else {
                        await this.selfConfigAttr.showNotification(this.i18n.noTimeToUpdate);
                    }
                } catch (error) {
                }
                await QYLAttrHighlightManager.refreshBySelectIdImmediate(id);
            }
        } catch (error) {
            try {
                await this.selfConfigAttr.showNotification(this.i18n.getTimeFailed);
            } catch (error) {
            }
        }
    }
    showManualTimeSetDialog(selectid) {
        const existingDialog = document.querySelector('[data-key="QYLtimemanualset"]');
        if (existingDialog) {
            existingDialog.remove();
        }
        const dialog = document.createElement('div');
        dialog.className = 'b3-dialog--open';
        dialog.setAttribute('data-key', 'QYLtimemanualset');
        const dialogContainer = document.createElement('div');
        dialogContainer.className = 'b3-dialog';
        const scrim = document.createElement('div');
        scrim.className = 'b3-dialog__scrim';
        const container = document.createElement('div');
        container.className = 'b3-dialog__container';
        container.style.width = '520px';
        container.style.height = 'auto';
        container.style.left = 'auto';
        container.style.top = 'auto';
        const header = document.createElement('div');
        header.className = 'b3-dialog__header';
        header.textContent = this.i18n.manualSetTime;
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
        const body = document.createElement('div');
        body.className = 'b3-dialog__body';
        const action = document.createElement('div');
        action.className = 'b3-dialog__action';
        action.style.flexWrap = 'nowrap';
        const cancelButton = document.createElement('button');
        cancelButton.className = 'b3-button b3-button--cancel';
        cancelButton.textContent = this.i18n.close;
        const space1 = document.createElement('div');
        space1.className = 'fn__space';
        const setDateButton = document.createElement('button');
        setDateButton.className = 'b3-button b3-button--text';
        setDateButton.textContent = this.i18n.setDateAttr;
        const space2 = document.createElement('div');
        space2.className = 'fn__space';
        const setTimeButton = document.createElement('button');
        setTimeButton.className = 'b3-button b3-button--text';
        setTimeButton.textContent = this.i18n.setTimeAttr;
        const space3 = document.createElement('div');
        space3.className = 'fn__space';
        const setDateTimeButton = document.createElement('button');
        setDateTimeButton.className = 'b3-button b3-button--text';
        setDateTimeButton.textContent = this.i18n.setDateTimeAttr;
        action.appendChild(cancelButton);
        action.appendChild(space1);
        action.appendChild(setDateButton);
        action.appendChild(space2);
        action.appendChild(setTimeButton);
        action.appendChild(space3);
        action.appendChild(setDateTimeButton);
        const content = document.createElement('div');
        content.className = 'b3-dialog__content';
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const datetimeInput = document.createElement('input');
        datetimeInput.type = 'datetime-local';
        datetimeInput.className = 'b3-text-field';
        datetimeInput.style.minWidth = '200px';
        datetimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        content.appendChild(datetimeInput);
        body.appendChild(content);
        body.appendChild(action);
        container.appendChild(header);
        container.appendChild(body);
        dialogContainer.appendChild(scrim);
        dialogContainer.appendChild(container);
        dialog.appendChild(dialogContainer);
        document.body.appendChild(dialog);
        const closeDialog = () => {
            if (dialog._mousemoveHandler) {
                document.removeEventListener('mousemove', dialog._mousemoveHandler);
            }
            if (dialog._mouseupHandler) {
                document.removeEventListener('mouseup', dialog._mouseupHandler);
            }
            if (dialog._keydownHandler) {
                document.removeEventListener('keydown', dialog._keydownHandler);
            }
            if (dialog && dialog.parentNode) {
                dialog.parentNode.removeChild(dialog);
            }
        };
        cancelButton.addEventListener('click', closeDialog);
        setDateButton.addEventListener('click', async () => {
            await this.setManualDate(selectid, datetimeInput.value);
        });
        setTimeButton.addEventListener('click', async () => {
            await this.setManualTime(selectid, datetimeInput.value);
        });
        setDateTimeButton.addEventListener('click', async () => {
            await this.setManualDateTime(selectid, datetimeInput.value);
        });
        scrim.addEventListener('click', closeDialog);
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeDialog();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        dialog._keydownHandler = handleKeyDown;
    }
    async setManualDate(selectid, datetimeValue) {
        if (!datetimeValue) {
            return;
        }
        try {
            const selectedDate = new Date(datetimeValue);
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${selectid}"]`);
            if (blocks) {
                blocks.forEach(block => block.setAttribute('custom-QYL-date', dateStr));
            }
            await this.api.setCustomAttribute(selectid, 'custom-QYL-date', dateStr);
            await QYLAttrHighlightManager.refreshBySelectIdImmediate(selectid);
            await this.selfConfigAttr.showNotification(this.i18n.timeSetSuccess.replace('{time}', dateStr));
        } catch (error) {
        }
    }
    async setManualTime(selectid, datetimeValue) {
        if (!datetimeValue) {
            return;
        }
        try {
            const selectedDate = new Date(datetimeValue);
            const hours = String(selectedDate.getHours()).padStart(2, '0');
            const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
            const seconds = String(selectedDate.getSeconds()).padStart(2, '0');
            const timeStr = `${hours}:${minutes}:${seconds}`;
            let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${selectid}"]`);
            if (blocks) {
                blocks.forEach(block => block.setAttribute('custom-QYL-time', timeStr));
            }
            await this.api.setCustomAttribute(selectid, 'custom-QYL-time', timeStr);
            await QYLAttrHighlightManager.refreshBySelectIdImmediate(selectid);
            await this.selfConfigAttr.showNotification(this.i18n.timeSetSuccess.replace('{time}', timeStr));
        } catch (error) {
        }
    }
    async setManualDateTime(selectid, datetimeValue) {
        if (!datetimeValue) {
            return;
        }
        try {
            const selectedDate = new Date(datetimeValue);
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const hours = String(selectedDate.getHours()).padStart(2, '0');
            const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
            const seconds = String(selectedDate.getSeconds()).padStart(2, '0');
            const dateTimeStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${selectid}"]`);
            if (blocks) {
                blocks.forEach(block => block.setAttribute('custom-QYL-date-time', dateTimeStr));
            }
            await this.api.setCustomAttribute(selectid, 'custom-QYL-date-time', dateTimeStr);
            await QYLAttrHighlightManager.refreshBySelectIdImmediate(selectid);
            await this.selfConfigAttr.showNotification(this.i18n.timeSetSuccess.replace('{time}', dateTimeStr));
        } catch (error) {
        }
    }
    setMenuData(menuData) {
        this.menuData = menuData;
    }
    getOptionByAttrName(attrName) {
        if (this.menuData && this.menuData.timeOptions) {
            return this.menuData.timeOptions.find(option => option.attrName === attrName) || {
                label: 'time',
                icon: '#iconClock'
            };
        }
        return {
            label: 'time',
            icon: '#iconClock'
        };
    }
}
