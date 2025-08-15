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
    addLayoutEventListeners(colLayout);
}
async function recreateDragHandlesOnly(colLayout) {
    await cleanupDragHandles(colLayout);
    await createNewDragHandles(colLayout);
    addLayoutEventListeners(colLayout);
}
async function cleanupDragHandles(colLayout) {
    const existingHandles = Array.from(colLayout.children).filter(child => 
        child.classList.contains('QYLSbWidthDrag')
    );
    existingHandles.forEach(handle => {
        removeHandleEventListeners(handle);
        handle.remove();
    });
    colLayout.removeEventListener('mouseenter', handleLayoutMouseEnter);
}
async function createNewDragHandles(colLayout) {
    const nodeElements = getNodeElements(colLayout);
    for (let i = 0; i < nodeElements.length - 1; i++) {
        const dragHandle = createDragHandle();
        colLayout.appendChild(dragHandle);
    }
}
function addLayoutEventListeners(colLayout) {
    colLayout.addEventListener('mouseenter', handleLayoutMouseEnter);
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
    insertBlock.className = 'QYLSbInsertBlock';
    insertBlock.innerHTML = '<svg t="1755094314177" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11563" width="23" height="23"><path d="M760.832 256a385.536 385.536 0 1 0 112.64 272.384A382.464 382.464 0 0 0 760.832 256z m-79.872 299.008h-165.376v165.888a27.648 27.648 0 1 1-55.296 0v-165.888H295.424a27.648 27.648 0 0 1 0-55.296H460.8V333.824a27.648 27.648 0 1 1 55.296 0v165.888h164.864a27.648 27.648 0 0 1 0 55.296z" fill="" p-id="11564"></path></svg>';
    insertBlock.addEventListener('click', handleInsertBlockClick);
    handle.appendChild(insertBlock);
    handle.addEventListener('mousedown', handleMouseDown);
    handle.addEventListener('click', handleTripleClick);
    handle.addEventListener('mouseenter', handleMouseEnter);
    handle.addEventListener('mouseleave', handleMouseLeave);
    return handle;
}
function clearRatioDisplay() {
    document.querySelectorAll('.QYLSbRatioItem').forEach(element => {
        element.remove();
    });
}
function updateRatioDisplay(colLayout) {
    clearRatioDisplay();
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
function hideRatioDisplay() {
    clearRatioDisplay();
}
function positionDragHandle(handle, element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    const parentRect = handle.parentElement.getBoundingClientRect();
    const centerX = (rect1.right + rect2.left) / 2;
    const relativeX = centerX - parentRect.left;
    handle.style.left = `${relativeX - 2}px`; 
}
function positionHandlesForLayout(colLayout) {
    const handles = Array.from(colLayout.children).filter(child => 
        child.classList.contains('QYLSbWidthDrag')
    );
    const nodeElements = getNodeElements(colLayout);
    handles.forEach((handle, index) => {
        if (index < nodeElements.length - 1) {
            positionDragHandle(handle, nodeElements[index], nodeElements[index + 1]);
        }
    });
}
function handleLayoutMouseEnter(event) {
    positionHandlesForLayout(event.currentTarget);
}
function handleMouseEnter(event) {
    if (isGlobalDragging) return;
    const handle = event.currentTarget;
    const colLayout = handle.parentElement;
    const handles = Array.from(colLayout.children).filter(child => 
        child.classList.contains('QYLSbWidthDrag')
    );
    const handleIndex = handles.indexOf(handle);
    const nodeElements = getNodeElements(colLayout);
    if (handleIndex >= 0 && handleIndex < nodeElements.length - 1) {
        const leftElement = nodeElements[handleIndex];
        const rightElement = nodeElements[handleIndex + 1];
        leftElement.classList.add('QYLdragtip');
        rightElement.classList.add('QYLdragtip');
        updateRatioDisplay(colLayout);
    }
}
function handleMouseLeave(event) {
    if (isGlobalDragging) return;
    const handle = event.currentTarget;
    const colLayout = handle.parentElement;
    const handles = Array.from(colLayout.children).filter(child => 
        child.classList.contains('QYLSbWidthDrag')
    );
    const handleIndex = handles.indexOf(handle);
    const nodeElements = getNodeElements(colLayout);
    if (handleIndex >= 0 && handleIndex < nodeElements.length - 1) {
        const leftElement = nodeElements[handleIndex];
        const rightElement = nodeElements[handleIndex + 1];
        leftElement.classList.remove('QYLdragtip');
        rightElement.classList.remove('QYLdragtip');
        hideRatioDisplay();
    }
}
function handleMouseDown(event) {
    event.preventDefault();
    const handle = event.currentTarget;
    const colLayout = handle.parentElement;
    const handles = Array.from(colLayout.children).filter(child => 
        child.classList.contains('QYLSbWidthDrag')
    );
    const handleIndex = handles.indexOf(handle);
    const nodeElements = getNodeElements(colLayout);
    if (handleIndex >= 0 && handleIndex < nodeElements.length - 1) {
        const leftElement = nodeElements[handleIndex];
        const rightElement = nodeElements[handleIndex + 1];
        startDragResize(handle, leftElement, rightElement, event);
    }
}
function startDragResize(handle, leftElement, rightElement, event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const colLayout = handle.parentElement;
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
        positionDragHandle(handle, leftElement, rightElement);
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
        hideRatioDisplay();
        if (isDragging) {
            const currentLeftWidth = getElementWidthPercentage(leftElement);
            const currentRightWidth = getElementWidthPercentage(rightElement);
            const totalWidth = currentLeftWidth + currentRightWidth;
            setElementWidth(leftElement, currentLeftWidth);
            setElementWidth(rightElement, currentRightWidth);
            positionDragHandle(handle, leftElement, rightElement);
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
    clickTimer = setTimeout(() => {
        if (clickCount >= 3) {
            if (handle && handle.parentElement) {
                const colLayout = handle.parentElement;
                const nodeElements = getNodeElements(colLayout);
                const originalTransitions = [];
                nodeElements.forEach(element => {
                    const computedStyle = window.getComputedStyle(element);
                    originalTransitions.push(computedStyle.transition);
                    element.style.transition = 'none';
                });
                for (const element of nodeElements) {
                    resetElementStyle(element);
                }
                positionHandlesForLayout(colLayout);
                setTimeout(() => {
                    nodeElements.forEach((element, index) => {
                        element.style.transition = originalTransitions[index];
                    });
                    positionHandlesForLayout(colLayout);
                }, 50);
                Promise.all(nodeElements.map(element => saveElementStyle(element)));
            }
        } else if (clickCount === 2) {
            handleDoubleClickAction(handle);
        }
        clickCount = 0;
    }, 500); 
}
async function handleDoubleClickAction(handle) {
    const colLayout = handle.parentElement;
    const handles = Array.from(colLayout.children).filter(child => 
        child.classList.contains('QYLSbWidthDrag')
    );
    const handleIndex = handles.indexOf(handle);
    const nodeElements = getNodeElements(colLayout);
    if (handleIndex >= 0 && handleIndex < nodeElements.length - 1) {
        const leftElement = nodeElements[handleIndex];
        const rightElement = nodeElements[handleIndex + 1];
        const leftWidth = getElementWidthPercentage(leftElement);
        const rightWidth = getElementWidthPercentage(rightElement);
        const leftHasWidth = leftElement.style.width && leftElement.style.width.includes('%');
        const rightHasWidth = rightElement.style.width && rightElement.style.width.includes('%');
        if (leftHasWidth && rightHasWidth) {
            const totalWidth = leftWidth + rightWidth;
            const averageWidth = totalWidth / 2;
            const leftTransition = window.getComputedStyle(leftElement).transition;
            const rightTransition = window.getComputedStyle(rightElement).transition;
            leftElement.style.transition = 'none';
            rightElement.style.transition = 'none';
            setElementWidth(leftElement, averageWidth);
            setElementWidth(rightElement, averageWidth);
            positionHandlesForLayout(colLayout);
            setTimeout(() => {
                leftElement.style.transition = leftTransition;
                rightElement.style.transition = rightTransition;
                positionHandlesForLayout(colLayout);
            }, 50);
            Promise.all([
                saveElementStyle(leftElement),
                saveElementStyle(rightElement)
            ]);
        } else if (leftHasWidth || rightHasWidth) {
            const leftTransition = window.getComputedStyle(leftElement).transition;
            const rightTransition = window.getComputedStyle(rightElement).transition;
            leftElement.style.transition = 'none';
            rightElement.style.transition = 'none';
            resetElementStyle(leftElement);
            resetElementStyle(rightElement);
            positionHandlesForLayout(colLayout);
            setTimeout(() => {
                leftElement.style.transition = leftTransition;
                rightElement.style.transition = rightTransition;
                positionHandlesForLayout(colLayout);
            }, 50);
            Promise.all([
                saveElementStyle(leftElement),
                saveElementStyle(rightElement)
            ]);
        }
    }
}
async function handleInsertBlockClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const insertBlock = event.currentTarget;
    const handle = insertBlock.parentElement;
    const colLayout = handle.parentElement;
    const nodeElements = getNodeElements(colLayout);
    const handles = Array.from(colLayout.children).filter(child => 
        child.classList.contains('QYLSbWidthDrag')
    );
    const handleIndex = handles.indexOf(handle);
    if (handleIndex >= 0 && handleIndex < nodeElements.length - 1) {
        const nextElement = nodeElements[handleIndex + 1];
        const nextID = nextElement.getAttribute('data-node-id');
        await insertNewBlock(nextID, colLayout);
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
        if (response.ok) {
            const allNodeElements = getNodeElements(colLayout);
            await resetAllElementStyles(allNodeElements);
        }
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
async function updateDragHandlesAndPosition(colLayout) {
    await recreateDragHandlesOnly(colLayout);
    positionHandlesForLayout(colLayout);
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
            }
        });
        if (shouldUpdate) {
            setupDragHandles().catch(error => {
            });
        }
    });
    observer.observe(centerElement, {
        childList: true,
        subtree: true
    });
}
function destroy() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    if (centerElement) {
        const colLayouts = centerElement.querySelectorAll('[data-sb-layout="col"]');
        colLayouts.forEach(colLayout => {
            colLayout.removeEventListener('mouseenter', handleLayoutMouseEnter);
            const handles = Array.from(colLayout.children).filter(child => 
                child.classList.contains('QYLSbWidthDrag')
            );
            handles.forEach(handle => {
                removeHandleEventListeners(handle);
                handle.remove();
            });
        });
    }
    if (document.body.classList.contains('QYL-dragging')) {
        document.body.classList.remove('QYL-dragging');
    }
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
    document.body.style.mozUserSelect = '';
    document.body.style.msUserSelect = '';
    document.querySelectorAll('.QYLSbWidthDrag').forEach(handle => {
        removeHandleEventListeners(handle);
        handle.remove();
    });
    document.querySelectorAll('.QYLSbInsertBlock').forEach(insertBlock => {
        insertBlock.remove();
    });
    document.querySelectorAll('.QYLdragtip').forEach(element => {
        element.classList.remove('QYLdragtip');
    });
    hideRatioDisplay();
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
