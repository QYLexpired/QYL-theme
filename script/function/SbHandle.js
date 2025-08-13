let centerElement = null;
let retryCount = 0;
let maxRetries = 15;
let retryInterval = 100;
let observer = null;
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
    const existingHandles = colLayout.querySelectorAll('.QYLSbWidthDrag');
    existingHandles.forEach(handle => {
        handle.removeEventListener('mousedown', handleMouseDown);
        handle.removeEventListener('dblclick', handleDoubleClick);
        const insertBlock = handle.querySelector('.QYLSbInsertBlock');
        if (insertBlock) {
            insertBlock.removeEventListener('click', handleInsertBlockClick);
        }
        handle.remove();
    });
    colLayout.removeEventListener('mouseenter', handleMouseEnter);
    const nodeElements = Array.from(colLayout.children).filter(child => 
        child.hasAttribute('data-node-id')
    );
    await calculateAndSetInitialWidths(colLayout, nodeElements);
    for (let i = 0; i < nodeElements.length - 1; i++) {
        const dragHandle = createDragHandle();
        colLayout.appendChild(dragHandle);
    }
    colLayout.addEventListener('mouseenter', handleMouseEnter);
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
    handle.addEventListener('dblclick', handleDoubleClick);
    return handle;
}
function handleMouseEnter(event) {
    positionHandlesForLayout(event.currentTarget);
}
function handleMouseDown(event) {
    event.preventDefault();
    const handle = event.currentTarget;
    const colLayout = handle.parentElement;
    const handles = Array.from(colLayout.querySelectorAll('.QYLSbWidthDrag'));
    const handleIndex = handles.indexOf(handle);
    const nodeElements = Array.from(colLayout.children).filter(child => 
        child.hasAttribute('data-node-id')
    );
    if (handleIndex >= 0 && handleIndex < nodeElements.length - 1) {
        const leftElement = nodeElements[handleIndex];
        const rightElement = nodeElements[handleIndex + 1];
        const startX = event.clientX;
        const colRect = colLayout.getBoundingClientRect();
        const colWidth = colRect.width;
        const leftWidth = getElementWidthPercentage(leftElement);
        const rightWidth = getElementWidthPercentage(rightElement);
        const handleMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaPercent = (deltaX / colWidth) * 100;
            const totalWidth = leftWidth + rightWidth;
            const newLeftWidth = Math.max(5, Math.min(totalWidth - 5, leftWidth + deltaPercent));
            const newRightWidth = totalWidth - newLeftWidth;
            setElementWidth(leftElement, newLeftWidth);
            setElementWidth(rightElement, newRightWidth);
            positionDragHandle(handle, leftElement, rightElement);
        };
        const handleMouseUp = async () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            await saveElementStyle(leftElement);
            await saveElementStyle(rightElement);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
}
async function handleDoubleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const handle = event.currentTarget;
    const colLayout = handle.parentElement;
    const nodeElements = Array.from(colLayout.children).filter(child => 
        child.hasAttribute('data-node-id')
    );
    for (const element of nodeElements) {
        resetElementStyle(element);
    }
    for (const element of nodeElements) {
        await saveElementStyle(element);
    }
    requestAnimationFrame(async () => {
        await createDragHandlesForLayout(colLayout);
        positionHandlesForLayout(colLayout);
    });
}
async function handleInsertBlockClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const insertBlock = event.currentTarget;
    const handle = insertBlock.parentElement;
    const colLayout = handle.parentElement;
    const nodeElements = Array.from(colLayout.children).filter(child => 
        child.hasAttribute('data-node-id')
    );
    const handles = Array.from(colLayout.querySelectorAll('.QYLSbWidthDrag'));
    const handleIndex = handles.indexOf(handle);
    if (handleIndex >= 0 && handleIndex < nodeElements.length - 1) {
        const nextElement = nodeElements[handleIndex + 1];
        const nextID = nextElement.getAttribute('data-node-id');
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
            if (!response.ok) {
            } else {
                setTimeout(() => {
                    handleDoubleClick({ 
                        preventDefault: () => {}, 
                        stopPropagation: () => {},
                        currentTarget: handle 
                    });
                }, 100);
            }
        } catch (error) {
        }
    }
}
function positionDragHandle(handle, element1, element2) {
    requestAnimationFrame(() => {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        const parentRect = handle.parentElement.getBoundingClientRect();
        const centerX = (rect1.right + rect2.left) / 2;
        const relativeX = centerX - parentRect.left;
        handle.style.left = `${relativeX - 2}px`; 
    });
}
function positionHandlesForLayout(colLayout) {
    const handles = colLayout.querySelectorAll('.QYLSbWidthDrag');
    const nodeElements = Array.from(colLayout.children).filter(child => 
        child.hasAttribute('data-node-id')
    );
    handles.forEach((handle, index) => {
        if (index < nodeElements.length - 1) {
            positionDragHandle(handle, nodeElements[index], nodeElements[index + 1]);
        }
    });
}
function getElementWidthPercentage(element) {
    const width = element.style.width;
    if (width && width.includes('%')) {
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
        return !trimmed.startsWith('flex') && !trimmed.startsWith('width');
    });
    const newStyle = styleArray.join(';').trim();
    if (newStyle) {
        element.setAttribute('style', newStyle);
    } else {
        element.removeAttribute('style');
    }
}
async function calculateAndSetInitialWidths(colLayout, nodeElements) {
    if (nodeElements.length === 0) return;
    const colRect = colLayout.getBoundingClientRect();
    const colWidth = colRect.width;
    const elementWidths = nodeElements.map(element => {
        const rect = element.getBoundingClientRect();
        const actualWidth = rect.width;
        const percentage = (actualWidth / colWidth) * 100;
        return { element, percentage };
    });
    elementWidths.forEach(({ element, percentage }) => {
        setElementWidth(element, percentage);
    });
    for (const { element } of elementWidths) {
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
                const hasRelevantChange = addedNodes.some(node => 
                    node.nodeType === Node.ELEMENT_NODE && 
                    (node.hasAttribute('data-sb-layout') || 
                     node.querySelector('[data-sb-layout="col"]'))
                ) || removedNodes.some(node => 
                    node.nodeType === Node.ELEMENT_NODE && 
                    (node.hasAttribute('data-sb-layout') || 
                     node.querySelector('[data-sb-layout="col"]'))
                );
                if (hasRelevantChange) {
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
            colLayout.removeEventListener('mouseenter', handleMouseEnter);
            const handles = colLayout.querySelectorAll('.QYLSbWidthDrag');
            handles.forEach(handle => {
                handle.removeEventListener('mousedown', handleMouseDown);
                handle.removeEventListener('dblclick', handleDoubleClick);
                const insertBlock = handle.querySelector('.QYLSbInsertBlock');
                if (insertBlock) {
                    insertBlock.removeEventListener('click', handleInsertBlockClick);
                }
                handle.remove();
            });
        });
    }
    centerElement = null;
    retryCount = 0;
    document.querySelectorAll('.QYLSbWidthDrag').forEach(handle => {
        handle.remove();
    });
    document.querySelectorAll('.QYLSbInsertBlock').forEach(insertBlock => {
        insertBlock.remove();
    });
}
export { init, destroy };
