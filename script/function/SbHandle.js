import i18n from '../../i18n/i18n.js';
let centerElement = null;
let retryCount = 0;
let maxRetries = 15;
let retryInterval = 100;
let observer = null;
let isGlobalDragging = false;
let clickCount = 0;
let clickTimer = null; 
function roundToEven(num) {
    if (Math.abs(num - 33.3) < 0.1) {
        return 33.3;
    }
    return Math.round(num * 2) / 2;
}
async function init() {
    if (document.body.classList.contains('QYLmobile')) return;
    await findCenterElement();
}
async function findCenterElement() {
    centerElement = document.querySelector('.layout__center');
    if (centerElement) {
        await setupDragHandles();
        setupObserver();
    } else {
        retryFindCenter();
    }
}
function retryFindCenter() {
    if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(() => {
            findCenterElement();
        }, retryInterval);
    }
}
async function setupDragHandles() {
    const colLayouts = centerElement.querySelectorAll('[data-sb-layout="col"]');
    for (const colLayout of colLayouts) {
        await createDragHandlesForLayout(colLayout);
    }
}
async function createDragHandlesForLayout(colLayout) {
    await cleanupDragHandles(colLayout);
    await createNewDragHandles(colLayout);
}
async function cleanupDragHandles(colLayout) {
    const nodeElements = getNodeElements(colLayout);
    nodeElements.forEach(element => {
        const directHandles = Array.from(element.children).filter(child => 
            child.classList.contains('QYLSbWidthDrag') ||
            child.classList.contains('QYLSbInsertBlockFirstBox') ||
            child.classList.contains('QYLSbInsertBlockLastBox')
        );
        directHandles.forEach(handle => {
            const handleParent = handle.parentElement; 
            const handleGrandParent = handleParent.parentElement; 
            if (handleGrandParent === colLayout) {
                removeHandleEventListeners(handle);
                handle.remove();
            }
        });
    });
}
async function createNewDragHandles(colLayout) {
    const nodeElements = getNodeElements(colLayout);
    for (let i = 0; i < nodeElements.length - 1; i++) {
        const dragHandle = createDragHandle();
        nodeElements[i].appendChild(dragHandle);
    }
    if (nodeElements.length > 0) {
        const firstInsertBox = createFirstInsertBox();
        nodeElements[0].appendChild(firstInsertBox);
        const lastInsertBox = createLastInsertBox();
        nodeElements[nodeElements.length - 1].appendChild(lastInsertBox);
    }
}
function removeHandleEventListeners(handle) {
    handle.removeEventListener('mousedown', handleMouseDown);
    handle.removeEventListener('click', handleTripleClick);
    handle.removeEventListener('mouseenter', handleMouseEnter);
    handle.removeEventListener('mouseleave', handleMouseLeave);
    const insertBlock = handle.querySelector('.QYLSbInsertBlock');
    if (insertBlock) {
        insertBlock.removeEventListener('click', handleInsertBlockClick);
    }
    const insertBlockFirst = handle.querySelector('.QYLSbInsertBlockFirst');
    if (insertBlockFirst) {
        insertBlockFirst.removeEventListener('click', handleInsertBlockFirstClick);
    }
    const insertBlockLast = handle.querySelector('.QYLSbInsertBlockLast');
    if (insertBlockLast) {
        insertBlockLast.removeEventListener('click', handleInsertBlockLastClick);
    }
}
function getNodeElements(colLayout) {
    return Array.from(colLayout.children).filter(child => 
        child.hasAttribute('data-node-id')
    );
}
function createDragHandle() {
    const handle = document.createElement('div');
    handle.className = 'QYLSbWidthDrag protyle-custom';
    const insertBlock = document.createElement('div');
    insertBlock.className = 'QYLSbInsertBlock b3-tooltips b3-tooltips__nw';
    insertBlock.setAttribute('aria-label', i18n.InsertChildBlock);
    insertBlock.innerHTML = '<svg t="1755094314177" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11563" width="23" height="23"><path d="M760.832 256a385.536 385.536 0 1 0 112.64 272.384A382.464 382.464 0 0 0 760.832 256z m-79.872 299.008h-165.376v165.888a27.648 27.648 0 1 1-55.296 0v-165.888H295.424a27.648 27.648 0 0 1 0-55.296H460.8V333.824a27.648 27.648 0 1 1 55.296 0v165.888h164.864a27.648 27.648 0 0 1 0 55.296z" fill="" p-id="11564"></path></svg>';
    insertBlock.addEventListener('click', handleInsertBlockClick);
    handle.appendChild(insertBlock);
    handle.addEventListener('mousedown', handleMouseDown);
    handle.addEventListener('click', handleTripleClick);
    handle.addEventListener('mouseenter', handleMouseEnter);
    handle.addEventListener('mouseleave', handleMouseLeave);
    return handle;
}
function createFirstInsertBox() {
    const insertBox = document.createElement('div');
    insertBox.className = 'QYLSbInsertBlockFirstBox protyle-custom';
    const insertBlock = document.createElement('div');
    insertBlock.className = 'QYLSbInsertBlockFirst b3-tooltips b3-tooltips__nw';
    insertBlock.setAttribute('aria-label', i18n.InsertChildBlock);
    insertBlock.innerHTML = '<svg t="1755094314177" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11563" width="23" height="23"><path d="M760.832 256a385.536 385.536 0 1 0 112.64 272.384A382.464 382.464 0 0 0 760.832 256z m-79.872 299.008h-165.376v165.888a27.648 27.648 0 1 1-55.296 0v-165.888H295.424a27.648 27.648 0 0 1 0-55.296H460.8V333.824a27.648 27.648 0 1 1 55.296 0v165.888h164.864a27.648 27.648 0 0 1 0 55.296z" fill="" p-id="11564"></path></svg>';
    insertBlock.addEventListener('click', handleInsertBlockFirstClick);
    insertBox.appendChild(insertBlock);
    return insertBox;
}
function createLastInsertBox() {
    const insertBox = document.createElement('div');
    insertBox.className = 'QYLSbInsertBlockLastBox protyle-custom';
    const insertBlock = document.createElement('div');
    insertBlock.className = 'QYLSbInsertBlockLast b3-tooltips b3-tooltips__nw';
    insertBlock.setAttribute('aria-label', i18n.InsertChildBlock);
    insertBlock.innerHTML = '<svg t="1755094314177" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11563" width="23" height="23"><path d="M760.832 256a385.536 385.536 0 1 0 112.64 272.384A382.464 382.464 0 0 0 760.832 256z m-79.872 299.008h-165.376v165.888a27.648 27.648 0 1 1-55.296 0v-165.888H295.424a27.648 27.648 0 0 1 0-55.296H460.8V333.824a27.648 27.648 0 1 1 55.296 0v165.888h164.864a27.648 27.648 0 0 1 0 55.296z" fill="" p-id="11564"></path></svg>';
    insertBlock.addEventListener('click', handleInsertBlockLastClick);
    insertBox.appendChild(insertBlock);
    return insertBox;
}
function clearRatioDisplay(colLayout = null) {
    if (colLayout) {
        const nodeElements = getNodeElements(colLayout);
        nodeElements.forEach(element => {
            const ratioElements = element.querySelectorAll('.QYLSbRatioItem');
            ratioElements.forEach(ratioElement => {
                ratioElement.remove();
            });
        });
    } else {
        document.querySelectorAll('.QYLSbRatioItem').forEach(element => {
            element.remove();
        });
    }
}
function updateRatioDisplay(colLayout) {
    clearRatioDisplay(colLayout);
    const nodeElements = getNodeElements(colLayout);
    let totalWidth = 0;
    nodeElements.forEach(element => {
        totalWidth += getElementWidthPercentage(element);
    });
    nodeElements.forEach((element, index) => {
        const elementWidth = getElementWidthPercentage(element);
        const ratioInTotal = totalWidth > 0 ? (elementWidth / totalWidth) * 100 : 0;
        const ratio = roundToEven(ratioInTotal);
        const ratioElement = document.createElement('div');
        ratioElement.className = `QYLSbRatioItem QYLSbRatioItem${index} protyle-custom`;
        ratioElement.textContent = `${ratio.toFixed(1)}%`;
        element.appendChild(ratioElement);
    });
}
const hideRatioDisplay = (colLayout = null) => clearRatioDisplay(colLayout);
function handleMouseEnter(event) {
    if (isGlobalDragging) return;
    const handle = event.currentTarget;
    const leftElement = handle.parentElement; 
    const colLayout = leftElement.parentElement;
    const nodeElements = getNodeElements(colLayout);
    const leftIndex = nodeElements.indexOf(leftElement);
    if (leftIndex >= 0 && leftIndex < nodeElements.length - 1) {
        const rightElement = nodeElements[leftIndex + 1];
        leftElement.classList.add('QYLdragtip');
        rightElement.classList.add('QYLdragtip');
        updateRatioDisplay(colLayout);
    }
}
function handleMouseLeave(event) {
    if (isGlobalDragging) return;
    const handle = event.currentTarget;
    const leftElement = handle.parentElement; 
    const colLayout = leftElement.parentElement;
    const nodeElements = getNodeElements(colLayout);
    const leftIndex = nodeElements.indexOf(leftElement);
    if (leftIndex >= 0 && leftIndex < nodeElements.length - 1) {
        const rightElement = nodeElements[leftIndex + 1];
        leftElement.classList.remove('QYLdragtip');
        rightElement.classList.remove('QYLdragtip');
        hideRatioDisplay(colLayout);
    }
}
function handleMouseDown(event) {
    event.preventDefault();
    const handle = event.currentTarget;
    const leftElement = handle.parentElement; 
    const colLayout = leftElement.parentElement;
    const nodeElements = getNodeElements(colLayout);
    const leftIndex = nodeElements.indexOf(leftElement);
    if (leftIndex >= 0 && leftIndex < nodeElements.length - 1) {
        const rightElement = nodeElements[leftIndex + 1];
        startDragResize(handle, leftElement, rightElement, event);
    }
}
function startDragResize(handle, leftElement, rightElement, event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const colLayout = leftElement.parentElement; 
    const startX = event.clientX;
    const colRect = colLayout.getBoundingClientRect();
    const colWidth = colRect.width;
    let leftWidth, rightWidth;
    let isDragging = false;
    let hasSetInitialStyle = false;
    const preventGlobalEvents = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    };
    const handleMouseMove = (moveEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();
        moveEvent.stopImmediatePropagation();
        if (!isDragging) {
            isDragging = true;
            isGlobalDragging = true; 
            leftElement.classList.add('QYLdragtip');
            rightElement.classList.add('QYLdragtip');
            document.addEventListener('mousedown', preventGlobalEvents, true);
            document.addEventListener('click', preventGlobalEvents, true);
            document.addEventListener('dblclick', preventGlobalEvents, true);
            document.addEventListener('contextmenu', preventGlobalEvents, true);
            document.addEventListener('selectstart', preventGlobalEvents, true);
            document.addEventListener('dragstart', preventGlobalEvents, true);
            document.addEventListener('drop', preventGlobalEvents, true);
            document.addEventListener('dragenter', preventGlobalEvents, true);
            document.addEventListener('dragover', preventGlobalEvents, true);
            document.addEventListener('dragleave', preventGlobalEvents, true);
            document.body.style.userSelect = 'none';
            document.body.style.webkitUserSelect = 'none';
            document.body.style.mozUserSelect = 'none';
            document.body.style.msUserSelect = 'none';
            document.body.classList.add('QYL-dragging');
            if (!hasSetInitialStyle) {
                leftWidth = getElementWidthPercentage(leftElement);
                rightWidth = getElementWidthPercentage(rightElement);
                setElementWidth(leftElement, leftWidth);
                setElementWidth(rightElement, rightWidth);
                hasSetInitialStyle = true;
            }
        }
        const deltaX = moveEvent.clientX - startX;
        const deltaPercent = (deltaX / colWidth) * 100;
        const totalWidth = leftWidth + rightWidth;
        const newLeftWidth = Math.max(5, Math.min(totalWidth - 5, leftWidth + deltaPercent));
        const newRightWidth = totalWidth - newLeftWidth;
        setElementWidth(leftElement, newLeftWidth);
        setElementWidth(rightElement, newRightWidth);
        updateRatioDisplay(colLayout);
    };
    const handleMouseUp = async (upEvent) => {
        if (upEvent) {
            upEvent.preventDefault();
            upEvent.stopPropagation();
            upEvent.stopImmediatePropagation();
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousedown', preventGlobalEvents, true);
        document.removeEventListener('click', preventGlobalEvents, true);
        document.removeEventListener('dblclick', preventGlobalEvents, true);
        document.removeEventListener('contextmenu', preventGlobalEvents, true);
        document.removeEventListener('selectstart', preventGlobalEvents, true);
        document.removeEventListener('dragstart', preventGlobalEvents, true);
        document.removeEventListener('drop', preventGlobalEvents, true);
        document.removeEventListener('dragenter', preventGlobalEvents, true);
        document.removeEventListener('dragover', preventGlobalEvents, true);
        document.removeEventListener('dragleave', preventGlobalEvents, true);
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
        document.body.style.mozUserSelect = '';
        document.body.style.msUserSelect = '';
        document.body.classList.remove('QYL-dragging');
        leftElement.classList.remove('QYLdragtip');
        rightElement.classList.remove('QYLdragtip');
        isGlobalDragging = false; 
        hideRatioDisplay(colLayout);
        if (isDragging) {
            const currentLeftWidth = getElementWidthPercentage(leftElement);
            const currentRightWidth = getElementWidthPercentage(rightElement);
            const totalWidth = currentLeftWidth + currentRightWidth;
            setElementWidth(leftElement, currentLeftWidth);
            setElementWidth(rightElement, currentRightWidth);
            await saveElementStyle(leftElement);
            await saveElementStyle(rightElement);
        }
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}
function handleTripleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const handle = event.currentTarget; 
    clickCount++;
    if (clickTimer) {
        clearTimeout(clickTimer);
    }
    clickTimer = setTimeout(async () => {
        if (clickCount >= 3) {
            if (handle && handle.parentElement) {
                const leftElement = handle.parentElement; 
                const colLayout = leftElement.parentElement;
                colLayout.classList.add('QYLSbHandleCliking');
                try {
                    const nodeElements = getNodeElements(colLayout);
                    for (const element of nodeElements) {
                        resetElementStyle(element);
                    }
                    await Promise.all(nodeElements.map(element => saveElementStyle(element)));
                } catch (error) {
                } finally {
                    colLayout.classList.remove('QYLSbHandleCliking');
                }
            }
        } else if (clickCount === 2) {
            await handleDoubleClickAction(handle);
        }
        clickCount = 0;
    }, 500); 
}
async function handleDoubleClickAction(handle) {
    const leftElement = handle.parentElement; 
    const colLayout = leftElement.parentElement;
    colLayout.classList.add('QYLSbHandleCliking');
    try {
        const nodeElements = getNodeElements(colLayout);
        const leftIndex = nodeElements.indexOf(leftElement);
        if (leftIndex >= 0 && leftIndex < nodeElements.length - 1) {
            const rightElement = nodeElements[leftIndex + 1];
            const leftWidth = getElementWidthPercentage(leftElement);
            const rightWidth = getElementWidthPercentage(rightElement);
            const leftHasWidth = leftElement.style.width && leftElement.style.width.includes('%');
            const rightHasWidth = rightElement.style.width && rightElement.style.width.includes('%');
            if (leftHasWidth && rightHasWidth) {
                const totalWidth = leftWidth + rightWidth;
                const averageWidth = totalWidth / 2;
                setElementWidth(leftElement, averageWidth);
                setElementWidth(rightElement, averageWidth);
                await Promise.all([
                    saveElementStyle(leftElement),
                    saveElementStyle(rightElement)
                ]);
            } else if (leftHasWidth || rightHasWidth) {
                resetElementStyle(leftElement);
                resetElementStyle(rightElement);
                await Promise.all([
                    saveElementStyle(leftElement),
                    saveElementStyle(rightElement)
                ]);
            }
        }
    } catch (error) {
    } finally {
        colLayout.classList.remove('QYLSbHandleCliking');
    }
}
async function handleInsertBlockClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const insertBlock = event.currentTarget;
    const handle = insertBlock.parentElement;
    const leftElement = handle.parentElement; 
    const colLayout = leftElement.parentElement;
    const nodeElements = getNodeElements(colLayout);
    const leftIndex = nodeElements.indexOf(leftElement);
    if (leftIndex >= 0 && leftIndex < nodeElements.length - 1) {
        const nextElement = nodeElements[leftIndex + 1];
        const nextID = nextElement.getAttribute('data-node-id');
        await insertNewBlock(nextID, colLayout);
    }
}
async function handleInsertBlockFirstClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const insertBlock = event.currentTarget;
    const insertBox = insertBlock.parentElement;
    const firstElement = insertBox.parentElement; 
    const colLayout = firstElement.parentElement;
    const nodeElements = getNodeElements(colLayout);
    if (nodeElements.length > 0) {
        const firstID = nodeElements[0].getAttribute('data-node-id');
        await insertNewBlockFirst(firstID, colLayout);
    }
}
async function handleInsertBlockLastClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const insertBlock = event.currentTarget;
    const insertBox = insertBlock.parentElement;
    const lastElement = insertBox.parentElement; 
    const colLayout = lastElement.parentElement;
    const nodeElements = getNodeElements(colLayout);
    if (nodeElements.length > 0) {
        const lastID = nodeElements[nodeElements.length - 1].getAttribute('data-node-id');
        await insertNewBlockLast(lastID, colLayout);
    }
}
async function insertNewBlock(nextID, colLayout) {
    try {
        const response = await fetch('/api/block/insertBlock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'markdown',
                data: '',
                nextID: nextID
            })
        });
    } catch (error) {
    }
}
async function insertNewBlockFirst(firstID, colLayout) {
    try {
        const response = await fetch('/api/block/insertBlock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'markdown',
                data: '',
                nextID: firstID
            })
        });
    } catch (error) {
    }
}
async function insertNewBlockLast(lastID, colLayout) {
    try {
        const response = await fetch('/api/block/insertBlock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'markdown',
                data: '',
                previousID: lastID
            })
        });
    } catch (error) {
    }
}
function getElementWidthPercentage(element) {
    const width = element.style.width;
    if (width && width.includes('%') && !width.includes('calc(')) {
        return parseFloat(width);
    }
    const parentElement = element.parentElement;
    if (parentElement) {
        const parentRect = parentElement.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const percentage = (elementRect.width / parentRect.width) * 100;
        return percentage;
    }
    return 50;
}
function setElementWidth(element, percentage) {
    element.style.flex = '0 0 auto';
    element.style.width = `${percentage}%`;
}
async function saveElementStyle(element) {
    const nodeId = element.getAttribute('data-node-id');
    if (!nodeId) return;
    const currentStyle = element.getAttribute('style') || '';
    try {
        const response = await fetch('/api/attr/setBlockAttrs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: nodeId,
                attrs: {
                    style: currentStyle
                }
            })
        });
        if (!response.ok) {
        }
    } catch (error) {
    }
}
function resetElementStyle(element) {
    const currentStyle = element.getAttribute('style') || '';
    const styleArray = currentStyle.split(';').filter(rule => {
        const trimmed = rule.trim();
        return !trimmed.startsWith('flex') && 
               !trimmed.startsWith('width') && 
               !trimmed.includes('calc(');
    });
    const newStyle = styleArray.join(';').trim();
    if (newStyle) {
        element.setAttribute('style', newStyle);
    } else {
        element.removeAttribute('style');
    }
}
async function resetAllElementStyles(elements) {
    for (const element of elements) {
        resetElementStyle(element);
    }
    for (const element of elements) {
        await saveElementStyle(element);
    }
}
function setupObserver() {
    if (!centerElement) return;
    observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const addedNodes = Array.from(mutation.addedNodes);
                const removedNodes = Array.from(mutation.removedNodes);
                const hasLayoutChange = addedNodes.some(node => 
                    node.nodeType === Node.ELEMENT_NODE && 
                    (node.hasAttribute('data-sb-layout') || 
                     node.querySelector('[data-sb-layout="col"]'))
                ) || removedNodes.some(node => 
                    node.nodeType === Node.ELEMENT_NODE && 
                    (node.hasAttribute('data-sb-layout') || 
                     node.querySelector('[data-sb-layout="col"]'))
                );
                const hasNodeIdChange = addedNodes.some(node => 
                    node.nodeType === Node.ELEMENT_NODE && 
                    node.hasAttribute('data-node-id')
                ) || removedNodes.some(node => 
                    node.nodeType === Node.ELEMENT_NODE && 
                    node.hasAttribute('data-node-id')
                );
                const mutationTarget = mutation.target;
                const isInColLayout = mutationTarget && 
                    mutationTarget.hasAttribute('data-sb-layout') && 
                    mutationTarget.getAttribute('data-sb-layout') === 'col';
                if (hasLayoutChange || (hasNodeIdChange && isInColLayout)) {
                    shouldUpdate = true;
                }
            } else if (mutation.type === 'attributes' && mutation.attributeName === 'data-sb-layout') {
                const target = mutation.target;
                const newValue = target.getAttribute('data-sb-layout');
                const oldValue = mutation.oldValue;
                if (newValue !== oldValue) {
                    shouldUpdate = true;
                }
            }
        });
        if (shouldUpdate) {
            setupDragHandles().catch(error => {
            });
            const affectedCols = new Set(); 
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const mutationTarget = mutation.target;
                    if (mutationTarget && 
                        mutationTarget.hasAttribute('data-sb-layout') && 
                        mutationTarget.getAttribute('data-sb-layout') === 'col') {
                        affectedCols.add(mutationTarget);
                    } else {
                        const addedNodes = Array.from(mutation.addedNodes);
                        const removedNodes = Array.from(mutation.removedNodes);
                        addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE && 
                                node.hasAttribute('data-node-id')) {
                                const parent = node.parentElement;
                                if (parent && 
                                    parent.hasAttribute('data-sb-layout') && 
                                    parent.getAttribute('data-sb-layout') === 'col') {
                                    affectedCols.add(parent);
                                }
                            }
                        });
                        removedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE && 
                                node.hasAttribute('data-node-id')) {
                                const parent = node.parentElement;
                                if (parent && 
                                    parent.hasAttribute('data-sb-layout') && 
                                    parent.getAttribute('data-sb-layout') === 'col') {
                                    affectedCols.add(parent);
                                }
                            }
                        });
                    }
                } else if (mutation.type === 'attributes' && mutation.attributeName === 'data-sb-layout') {
                    const target = mutation.target;
                    const newValue = target.getAttribute('data-sb-layout');
                    if (newValue === 'col') {
                        affectedCols.add(target);
                    }
                }
            });
            affectedCols.forEach((colLayout) => {
                const allNodeElements = getNodeElements(colLayout);
                resetAllElementStyles(allNodeElements).catch(error => {
                });
            });
        }
    });
    observer.observe(centerElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-sb-layout'],
        attributeOldValue: true
    });
}
function destroy() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    document.querySelectorAll('.QYLSbWidthDrag').forEach(handle => {
        removeHandleEventListeners(handle);
        handle.remove();
    });
    document.querySelectorAll('.QYLSbInsertBlock').forEach(insertBlock => {
        insertBlock.remove();
    });
    document.querySelectorAll('.QYLSbInsertBlockFirstBox').forEach(insertBox => {
        insertBox.remove();
    });
    document.querySelectorAll('.QYLSbInsertBlockLastBox').forEach(insertBox => {
        insertBox.remove();
    });
    document.querySelectorAll('.QYLSbRatioItem').forEach(element => {
        element.remove();
    });
    document.querySelectorAll('.QYLdragtip').forEach(element => {
        element.classList.remove('QYLdragtip');
    });
    document.querySelectorAll('.QYLSbHandleCliking').forEach(element => {
        element.classList.remove('QYLSbHandleCliking');
    });
    if (document.body.classList.contains('QYL-dragging')) {
        document.body.classList.remove('QYL-dragging');
    }
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
    document.body.style.mozUserSelect = '';
    document.body.style.msUserSelect = '';
    isGlobalDragging = false;
    centerElement = null;
    retryCount = 0;
    clickCount = 0;
    if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
    }
}
export { init, destroy };
