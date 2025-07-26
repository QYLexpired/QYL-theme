import i18n from '../../i18n/i18n.js';
async function loadImgMaskData(blockId) {
    const resp = await fetch('/api/attr/getBlockAttrs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Token ' },
        body: JSON.stringify({ id: blockId, attrs: ['custom-imgmaskdata'] })
    });
    if (!resp.ok) return [];
    const result = await resp.json();
    if (result.code === 0 && result.data && result.data['custom-imgmaskdata']) {
        try {
            return JSON.parse(result.data['custom-imgmaskdata']);
        } catch {
            return [];
        }
    }
    return [];
}
async function saveImgMaskData(blockId, maskDataList) {
    const attrValue = JSON.stringify(maskDataList || []);
    await fetch('/api/attr/setBlockAttrs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Token ' },
        body: JSON.stringify({ id: blockId, attrs: { 'custom-imgmaskdata': attrValue } })
    });
}
function getMasksForSrc(maskDataList, src) {
    let entry = maskDataList.find(item => item.src === src);
    return entry ? entry.masks : [];
}
function setMasksForSrc(maskDataList, src, masks) {
    let entry = maskDataList.find(item => item.src === src);
    if (entry) {
        entry.masks = masks;
    } else {
        maskDataList.push({ src, masks });
    }
}
function renderMasksForImg(img, ancestor, maskDataList, getDragMode, onDataChange) {
    img.parentNode.querySelectorAll('.QYLImgMaskRect').forEach(el => el.remove());
    getMasksForSrc(maskDataList, img.dataset.src).forEach((data, idx) => {
        let leftPx = data.left * img.offsetWidth;
        let topPx = data.top * img.offsetHeight;
        let widthPx = data.width * img.offsetWidth;
        let heightPx = data.height * img.offsetHeight;
        const mask = document.createElement('div');
        mask.className = 'QYLImgMaskRect protyle-custom';
        mask.style.position = 'absolute';
        mask.style.left = leftPx + 'px';
        mask.style.top = topPx + 'px';
        mask.style.width = widthPx + 'px';
        mask.style.height = heightPx + 'px';
        mask.dataset.maskPercent = JSON.stringify(data);
        mask.addEventListener('click', e => handleMaskClick(e, mask, getDragMode));
        mask.addEventListener('mousedown', e => handleMaskMouseDown(e, mask, getDragMode, img, ancestor, maskDataList, () => renderMasksForImg(img, ancestor, maskDataList, getDragMode, onDataChange), onDataChange));
        mask.addEventListener('touchstart', e => handleMaskTouchStart(e, mask, getDragMode, img, ancestor, maskDataList, () => renderMasksForImg(img, ancestor, maskDataList, getDragMode, onDataChange), onDataChange), { passive: false });
        if (getDragMode()) mask.classList.add('QYLImgMaskRectEdit');
        img.parentNode.appendChild(mask);
    });
}
function handleMaskClick(e, mask, getDragMode) {
    if (e.button !== 0) return;
    if (!getDragMode()) {
        e.stopPropagation(); 
        mask.classList.toggle('QYLImgMaskRectShow');
    }
}
function handleMaskMouseDown(e, mask, getDragMode, img, ancestor, maskDataList, refreshMasks, onDataChange) {
    if (e.button !== 0) return;
    if (!getDragMode()) return;
    let progress = document.createElement('div');
    progress.className = 'QYLImgMaskDeleteProgress protyle-custom';
    mask.appendChild(progress);
    progress.offsetWidth;
    progress.style.transition = 'width 1s linear';
    progress.style.width = '100%';
    let timer = setTimeout(async () => {
        const idx = Array.from(img.parentNode.querySelectorAll('.QYLImgMaskRect')).indexOf(mask);
        const masks = getMasksForSrc(maskDataList, img.dataset.src);
        masks.splice(idx, 1);
        setMasksForSrc(maskDataList, img.dataset.src, masks);
        await saveImgMaskData(ancestor.getAttribute('data-node-id'), maskDataList);
        refreshMasks();
        if (onDataChange) onDataChange();
    }, 1000);
    function clear() {
        clearTimeout(timer);
        progress.remove();
        document.removeEventListener('mouseup', clear);
        document.removeEventListener('mouseleave', clear);
    }
    document.addEventListener('mouseup', clear);
    document.addEventListener('mouseleave', clear);
}
function handleMaskTouchStart(e, mask, getDragMode, img, ancestor, maskDataList, refreshMasks, onDataChange) {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    if (!getDragMode()) {
        mask.classList.toggle('QYLImgMaskRectShow');
        return;
    }
    let progress = document.createElement('div');
    progress.className = 'QYLImgMaskDeleteProgress protyle-custom';
    mask.appendChild(progress);
    progress.offsetWidth;
    progress.style.transition = 'width 1s linear';
    progress.style.width = '100%';
    let timer = setTimeout(async () => {
        const idx = Array.from(img.parentNode.querySelectorAll('.QYLImgMaskRect')).indexOf(mask);
        const masks = getMasksForSrc(maskDataList, img.dataset.src);
        masks.splice(idx, 1);
        setMasksForSrc(maskDataList, img.dataset.src, masks);
        await saveImgMaskData(ancestor.getAttribute('data-node-id'), maskDataList);
        refreshMasks();
        if (onDataChange) onDataChange();
    }, 1000);
    function clear() {
        clearTimeout(timer);
        progress.remove();
        document.removeEventListener('touchend', clear, { passive: false });
        document.removeEventListener('touchcancel', clear, { passive: false });
    }
    document.addEventListener('touchend', clear, { passive: false });
    document.addEventListener('touchcancel', clear, { passive: false });
}
function setupCreateMaskHandler(img, ancestor, maskDataList, getDragMode, onDataChange) {
    if (!img.parentNode._QYLImgMaskBind) {
        img.parentNode.addEventListener('mousedown', function(e) {
            if (getDragMode()) {
                const imgRect = img.getBoundingClientRect();
                if (
                    e.clientX >= imgRect.left && e.clientX <= imgRect.right &&
                    e.clientY >= imgRect.top && e.clientY <= imgRect.bottom
                ) {
                    handleCreateMaskDrag(e, img, ancestor, maskDataList, getDragMode, onDataChange);
                }
            } else {
                handleLongPressToggleMasks(e, img, ancestor, maskDataList, getDragMode, onDataChange);
            }
        });
        img.parentNode.addEventListener('touchstart', function(e) {
            if (e.touches.length !== 1) return;
            const touch = e.touches[0];
            const imgRect = img.getBoundingClientRect();
            if (
                touch.clientX >= imgRect.left && touch.clientX <= imgRect.right &&
                touch.clientY >= imgRect.top && touch.clientY <= imgRect.bottom
            ) {
                if (getDragMode()) {
                    handleCreateMaskDragTouch(e, img, ancestor, maskDataList, getDragMode, onDataChange);
                } else {
                    let el = e.target;
                    while (el) {
                        if (el.classList && el.classList.contains('protyle-icons')) return;
                        el = el.parentElement;
                    }
                    handleLongPressToggleMasksTouch(e, img, ancestor, maskDataList, getDragMode, onDataChange);
                }
            }
        }, { passive: false });
        img.parentNode._QYLImgMaskBind = true;
    }
}
function handleCreateMaskDragTouch(e, img, ancestor, maskDataList, getDragMode, onDataChange) {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const imgRect = img.getBoundingClientRect();
    const minPx = 0;
    const maxX = imgRect.width - minPx;
    const maxY = imgRect.height - minPx;
    let startX = (touch.clientX - imgRect.left);
    let startY = (touch.clientY - imgRect.top);
    startX = Math.max(minPx, Math.min(maxX, startX));
    startY = Math.max(minPx, Math.min(maxY, startY));
    let dragging = false;
    let mask = null;
    let startXPct = startX / imgRect.width;
    let startYPct = startY / imgRect.height;
    let endXPct = startXPct, endYPct = startYPct;
    let moved = false;
    let startTarget = e.target;
    let longPressTimer = null;
    let longPressTriggered = false;
    let isProtyleIcons = false;
    let lastTouch = { x: startX, y: startY };
    let el = startTarget;
    while (el) {
        if (el.classList && el.classList.contains('protyle-icons')) {
            isProtyleIcons = true;
            break;
        }
        el = el.parentElement;
    }
    function startDrag() {
        dragging = true;
        longPressTriggered = true;
        mask = document.createElement('div');
        mask.className = 'QYLImgMaskRect protyle-custom';
        mask.style.position = 'absolute';
        mask.style.left = startX + 'px';
        mask.style.top = startY + 'px';
        mask.style.width = '0px';
        mask.style.height = '0px';
        img.parentNode.appendChild(mask);
    }
    function onTouchMove(ev) {
        if (ev.touches.length !== 1) return;
        const moveTouch = ev.touches[0];
        const imgRectNow = img.getBoundingClientRect();
        let curX = (moveTouch.clientX - imgRectNow.left);
        let curY = (moveTouch.clientY - imgRectNow.top);
        curX = Math.max(minPx, Math.min(imgRectNow.width - minPx, curX));
        curY = Math.max(minPx, Math.min(imgRectNow.height - minPx, curY));
        endXPct = curX / imgRectNow.width;
        endYPct = curY / imgRectNow.height;
        lastTouch = { x: curX, y: curY };
        if (isProtyleIcons) {
            if (!longPressTriggered) return;
            ev.preventDefault();
        } else {
            if (!moved && (Math.abs(curX - startX) > 5 || Math.abs(curY - startY) > 5)) {
                moved = true;
                ev.preventDefault();
                startDrag();
            }
            if (dragging && mask) {
                let sX = startXPct * img.offsetWidth;
                let sY = startYPct * img.offsetHeight;
                let curXPx = endXPct * img.offsetWidth;
                let curYPx = endYPct * img.offsetHeight;
                let leftPx = Math.min(sX, curXPx);
                let topPx = Math.min(sY, curYPx);
                let widthPx = Math.abs(curXPx - sX);
                let heightPx = Math.abs(curYPx - sY);
                if (leftPx + widthPx > img.offsetWidth - minPx) widthPx = img.offsetWidth - minPx - leftPx;
                if (topPx + heightPx > img.offsetHeight - minPx) heightPx = img.offsetHeight - minPx - topPx;
                mask.style.left = leftPx + 'px';
                mask.style.top = topPx + 'px';
                mask.style.width = widthPx + 'px';
                mask.style.height = heightPx + 'px';
            }
        }
        if (dragging && mask && isProtyleIcons) {
            let sX = startXPct * img.offsetWidth;
            let sY = startYPct * img.offsetHeight;
            let curXPx = endXPct * img.offsetWidth;
            let curYPx = endYPct * img.offsetHeight;
            let leftPx = Math.min(sX, curXPx);
            let topPx = Math.min(sY, curYPx);
            let widthPx = Math.abs(curXPx - sX);
            let heightPx = Math.abs(curYPx - sY);
            if (leftPx + widthPx > img.offsetWidth - minPx) widthPx = img.offsetWidth - minPx - leftPx;
            if (topPx + heightPx > img.offsetHeight - minPx) heightPx = img.offsetHeight - minPx - topPx;
            mask.style.left = leftPx + 'px';
            mask.style.top = topPx + 'px';
            mask.style.width = widthPx + 'px';
            mask.style.height = heightPx + 'px';
        }
    }
    function onTouchEnd(ev) {
        document.removeEventListener('touchmove', onTouchMove, { passive: false });
        document.removeEventListener('touchend', onTouchEnd, { passive: false });
        if (longPressTimer) clearTimeout(longPressTimer);
        if (isProtyleIcons && !longPressTriggered) {
            return;
        }
        if ((!dragging && !moved) || !mask) {
            if (mask) mask.remove();
            return;
        }
        let sX = startXPct * img.offsetWidth;
        let sY = startYPct * img.offsetHeight;
        let eX = endXPct * img.offsetWidth;
        let eY = endYPct * img.offsetHeight;
        sX = Math.max(minPx, Math.min(img.offsetWidth - minPx, sX));
        sY = Math.max(minPx, Math.min(img.offsetHeight - minPx, sY));
        eX = Math.max(minPx, Math.min(img.offsetWidth - minPx, eX));
        eY = Math.max(minPx, Math.min(img.offsetHeight - minPx, eY));
        let leftPx = Math.min(sX, eX);
        let topPx = Math.min(sY, eY);
        let widthPx = Math.abs(eX - sX);
        let heightPx = Math.abs(eY - sY);
        if (leftPx + widthPx > img.offsetWidth - minPx) widthPx = img.offsetWidth - minPx - leftPx;
        if (topPx + heightPx > img.offsetHeight - minPx) heightPx = img.offsetHeight - minPx - topPx;
        if (widthPx < 15 || heightPx < 15) {
            mask.remove();
            fetch('/api/notification/pushMsg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ msg: i18n.QYLImgMaskTooSmall || '遮罩长宽不能低于15px', timeout: 3000 })
            });
            return;
        }
        let left = leftPx / img.offsetWidth;
        let top = topPx / img.offsetHeight;
        let width = widthPx / img.offsetWidth;
        let height = heightPx / img.offsetHeight;
        const src = img.dataset.src;
        const masks = getMasksForSrc(maskDataList, src);
        masks.push({ left, top, width, height });
        setMasksForSrc(maskDataList, src, masks);
        saveImgMaskData(ancestor.getAttribute('data-node-id'), maskDataList);
        renderMasksForImg(img, ancestor, maskDataList, getDragMode, onDataChange);
        if (onDataChange) onDataChange();
    }
    if (isProtyleIcons) {
        longPressTimer = setTimeout(() => {
            startDrag();
        }, 100);
    }
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: false });
}
function handleLongPressToggleMasks(e, img, ancestor, maskDataList, getDragMode, onDataChange) {
    if (e.button !== 0) return;
    const imgRect = img.getBoundingClientRect();
    if (
        e.clientX < imgRect.left || e.clientX > imgRect.right ||
        e.clientY < imgRect.top || e.clientY > imgRect.bottom
    ) {
        return; 
    }
    const masks = img.parentNode.querySelectorAll('.QYLImgMaskRect');
    for (const mask of masks) {
        const maskRect = mask.getBoundingClientRect();
        if (
            e.clientX >= maskRect.left && e.clientX <= maskRect.right &&
            e.clientY >= maskRect.top && e.clientY <= maskRect.bottom
        ) {
            return; 
        }
    }
    let longPressTimer = null;
    let hasTriggered = false;
    function startLongPress() {
        longPressTimer = setTimeout(() => {
            if (!hasTriggered) {
                hasTriggered = true;
                toggleAllMasks(img);
            }
        }, 500); 
    }
    function cancelLongPress() {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
        hasTriggered = false;
    }
    function toggleAllMasks(img) {
        const masks = img.parentNode.querySelectorAll('.QYLImgMaskRect');
        if (masks.length === 0) return;
        const allShown = Array.from(masks).every(mask => mask.classList.contains('QYLImgMaskRectShow'));
        masks.forEach(mask => {
            if (allShown) {
                mask.classList.remove('QYLImgMaskRectShow');
            } else {
                mask.classList.add('QYLImgMaskRectShow');
            }
        });
    }
    startLongPress();
    function onMouseMove(e) {
        const imgRectNow = img.getBoundingClientRect();
        if (
            e.clientX < imgRectNow.left || e.clientX > imgRectNow.right ||
            e.clientY < imgRectNow.top || e.clientY > imgRectNow.bottom
        ) {
            cancelLongPress();
            document.removeEventListener('mousemove', onMouseMove);
        }
    }
    function onMouseUp() {
        cancelLongPress();
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mouseleave', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
}
function handleLongPressToggleMasksTouch(e, img, ancestor, maskDataList, getDragMode, onDataChange) {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    const imgRect = img.getBoundingClientRect();
    if (
        touch.clientX < imgRect.left || touch.clientX > imgRect.right ||
        touch.clientY < imgRect.top || touch.clientY > imgRect.bottom
    ) {
        return; 
    }
    const masks = img.parentNode.querySelectorAll('.QYLImgMaskRect');
    for (const mask of masks) {
        const maskRect = mask.getBoundingClientRect();
        if (
            touch.clientX >= maskRect.left && touch.clientX <= maskRect.right &&
            touch.clientY >= maskRect.top && touch.clientY <= maskRect.bottom
        ) {
            return; 
        }
    }
    let longPressTimer = null;
    let hasTriggered = false;
    function startLongPress() {
        longPressTimer = setTimeout(() => {
            if (!hasTriggered) {
                hasTriggered = true;
                toggleAllMasks(img);
            }
        }, 500); 
    }
    function cancelLongPress() {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
        hasTriggered = false;
    }
    function toggleAllMasks(img) {
        const masks = img.parentNode.querySelectorAll('.QYLImgMaskRect');
        if (masks.length === 0) return;
        const allShown = Array.from(masks).every(mask => mask.classList.contains('QYLImgMaskRectShow'));
        masks.forEach(mask => {
            if (allShown) {
                mask.classList.remove('QYLImgMaskRectShow');
            } else {
                mask.classList.add('QYLImgMaskRectShow');
            }
        });
    }
    startLongPress();
    function onTouchMove(e) {
        if (e.touches.length !== 1) return;
        const moveTouch = e.touches[0];
        const imgRectNow = img.getBoundingClientRect();
        if (
            moveTouch.clientX < imgRectNow.left || moveTouch.clientX > imgRectNow.right ||
            moveTouch.clientY < imgRectNow.top || moveTouch.clientY > imgRectNow.bottom
        ) {
            cancelLongPress();
            document.removeEventListener('touchmove', onTouchMove, { passive: false });
        }
    }
    function onTouchEnd() {
        cancelLongPress();
        document.removeEventListener('touchend', onTouchEnd, { passive: false });
        document.removeEventListener('touchcancel', onTouchEnd, { passive: false });
        document.removeEventListener('touchmove', onTouchMove, { passive: false });
    }
    document.addEventListener('touchend', onTouchEnd, { passive: false });
    document.addEventListener('touchcancel', onTouchEnd, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
}
function handleCreateMaskDrag(e, img, ancestor, maskDataList, getDragMode, onDataChange) {
    if (e.button !== 0) return;
    e.preventDefault();
    const imgRect = img.getBoundingClientRect();
    const minPx = 0;
    const maxX = imgRect.width - minPx;
    const maxY = imgRect.height - minPx;
    let startX = (e.clientX - imgRect.left);
    let startY = (e.clientY - imgRect.top);
    startX = Math.max(minPx, Math.min(maxX, startX));
    startY = Math.max(minPx, Math.min(maxY, startY));
    let dragging = false;
    let mask = null;
    let startXPct = startX / imgRect.width;
    let startYPct = startY / imgRect.height;
    let endXPct = startXPct, endYPct = startYPct;
    function onMouseMove(ev) {
        const imgRectNow = img.getBoundingClientRect();
        let curX = (ev.clientX - imgRectNow.left);
        let curY = (ev.clientY - imgRectNow.top);
        curX = Math.max(minPx, Math.min(imgRectNow.width - minPx, curX));
        curY = Math.max(minPx, Math.min(imgRectNow.height - minPx, curY));
        endXPct = curX / imgRectNow.width;
        endYPct = curY / imgRectNow.height;
        if (!dragging && (Math.abs(curX - startX) > 5 || Math.abs(curY - startY) > 5)) {
            dragging = true;
            mask = document.createElement('div');
            mask.className = 'QYLImgMaskRect protyle-custom';
            mask.style.position = 'absolute';
            mask.style.left = startX + 'px';
            mask.style.top = startY + 'px';
            mask.style.width = '0px';
            mask.style.height = '0px';
            img.parentNode.appendChild(mask);
        }
        if (dragging && mask) {
            let sX = startXPct * img.offsetWidth;
            let sY = startYPct * img.offsetHeight;
            let curXPx = endXPct * img.offsetWidth;
            let curYPx = endYPct * img.offsetHeight;
            let leftPx = Math.min(sX, curXPx);
            let topPx = Math.min(sY, curYPx);
            let widthPx = Math.abs(curXPx - sX);
            let heightPx = Math.abs(curYPx - sY);
            if (leftPx + widthPx > img.offsetWidth - minPx) widthPx = img.offsetWidth - minPx - leftPx;
            if (topPx + heightPx > img.offsetHeight - minPx) heightPx = img.offsetHeight - minPx - topPx;
            mask.style.left = leftPx + 'px';
            mask.style.top = topPx + 'px';
            mask.style.width = widthPx + 'px';
            mask.style.height = heightPx + 'px';
        }
    }
    function onMouseUp(ev) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (!dragging || !mask) {
            if (mask) mask.remove();
            return;
        }
        let sX = startXPct * img.offsetWidth;
        let sY = startYPct * img.offsetHeight;
        let eX = endXPct * img.offsetWidth;
        let eY = endYPct * img.offsetHeight;
        sX = Math.max(minPx, Math.min(img.offsetWidth - minPx, sX));
        sY = Math.max(minPx, Math.min(img.offsetHeight - minPx, sY));
        eX = Math.max(minPx, Math.min(img.offsetWidth - minPx, eX));
        eY = Math.max(minPx, Math.min(img.offsetHeight - minPx, eY));
        let leftPx = Math.min(sX, eX);
        let topPx = Math.min(sY, eY);
        let widthPx = Math.abs(eX - sX);
        let heightPx = Math.abs(eY - sY);
        if (leftPx + widthPx > img.offsetWidth - minPx) widthPx = img.offsetWidth - minPx - leftPx;
        if (topPx + heightPx > img.offsetHeight - minPx) heightPx = img.offsetHeight - minPx - topPx;
        if (widthPx < 15 || heightPx < 15) {
            mask.remove();
            fetch('/api/notification/pushMsg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ msg: i18n.QYLImgMaskTooSmall || '遮罩长宽不能低于15px', timeout: 3000 })
            });
            return;
        }
        let left = leftPx / img.offsetWidth;
        let top = topPx / img.offsetHeight;
        let width = widthPx / img.offsetWidth;
        let height = heightPx / img.offsetHeight;
        const src = img.dataset.src;
        const masks = getMasksForSrc(maskDataList, src);
        masks.push({ left, top, width, height });
        setMasksForSrc(maskDataList, src, masks);
        saveImgMaskData(ancestor.getAttribute('data-node-id'), maskDataList);
        renderMasksForImg(img, ancestor, maskDataList, getDragMode, onDataChange);
        if (onDataChange) onDataChange();
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}
export async function initImgMask() {
    if (typeof window !== 'undefined') {
        window._QYLImgMaskResizeObservers = window._QYLImgMaskResizeObservers || [];
    }
    document.querySelectorAll('.protyle-wysiwyg').forEach(async wysiwyg => {
        const blockImgsMap = {};
        wysiwyg.querySelectorAll('img').forEach(img => {
            let ancestor = img.parentElement;
            while (ancestor && !ancestor.hasAttribute('data-node-id')) {
                ancestor = ancestor.parentElement;
            }
            if (!ancestor) return;
            const blockId = ancestor.getAttribute('data-node-id');
            if (!blockImgsMap[blockId]) blockImgsMap[blockId] = [];
            blockImgsMap[blockId].push(img);
        });
        for (const blockId in blockImgsMap) {
            let maskDataList = await loadImgMaskData(blockId);
            blockImgsMap[blockId].forEach(img => {
                let ancestor = img.parentElement;
                while (ancestor && !ancestor.hasAttribute('data-node-id')) {
                    ancestor = ancestor.parentElement;
                }
                if (!ancestor) return;
                const span = document.createElement('span');
                span.className = 'protyle-action protyle-icons protyle-custom QYLImgMaskButton';
                span.innerHTML = '<span class="protyle-icon protyle-icon--only"><svg class="svg"><use xlink:href="#iconRiffCard"></use></svg></span>';
                let dragMode = { value: false };
                setupCreateMaskHandler(img, ancestor, maskDataList, () => dragMode.value, () => {});
                renderMasksForImg(img, ancestor, maskDataList, () => dragMode.value, () => {});
                span.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dragMode.value = !dragMode.value;
                    if (dragMode.value) {
                        span.classList.add('QYLImgMaskButtonActive');
                        img.style.userSelect = 'none';
                        img.style.pointerEvents = '';
                        img.draggable = false;
                    } else {
                        span.classList.remove('QYLImgMaskButtonActive');
                        img.style.userSelect = '';
                        img.style.pointerEvents = '';
                        img.draggable = true;
                    }
                    renderMasksForImg(img, ancestor, maskDataList, () => dragMode.value, () => {});
                });
                if (!img.parentNode.querySelector('.QYLImgMaskButton')) {
                    const parent = img.parentNode;
                    if (parent.firstChild) {
                        parent.insertBefore(span, parent.firstChild);
                    } else {
                        parent.appendChild(span);
                    }
                }
                const resizeObserver = new ResizeObserver(() => {
                    renderMasksForImg(img, ancestor, maskDataList, () => dragMode.value, () => {});
                });
                resizeObserver.observe(img);
                if (typeof window !== 'undefined') {
                    window._QYLImgMaskResizeObservers = window._QYLImgMaskResizeObservers || [];
                    window._QYLImgMaskResizeObservers.push(resizeObserver);
                }
            });
        }
    });
}
export function removeImgMask() {
    document.querySelectorAll('.QYLImgMaskRect').forEach(el => el.remove());
    document.querySelectorAll('.QYLImgMaskButton').forEach(el => el.remove());
    document.querySelectorAll('img').forEach(img => {
        img.style.userSelect = '';
        img.style.pointerEvents = '';
        img.draggable = true;
        if (img.parentNode && img.parentNode._QYLImgMaskBind) {
            img.parentNode.replaceWith(img.parentNode.cloneNode(true));
            delete img.parentNode._QYLImgMaskBind;
        }
    });
    if (window._QYLImgMaskMutationObserver) {
        window._QYLImgMaskMutationObserver.disconnect();
        delete window._QYLImgMaskMutationObserver;
    }
    if (window._QYLImgMaskResizeObservers) {
        window._QYLImgMaskResizeObservers.forEach(obs => obs.disconnect());
        window._QYLImgMaskResizeObservers = [];
    }
}
function observeImgChanges() {
    let debounceTimer = null;
    const observer = new MutationObserver(mutations => {
        let imgChanged = false;
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && (node.matches('img') || node.querySelectorAll && node.querySelectorAll('img').length > 0)) {
                        imgChanged = true;
                    }
                });
                mutation.removedNodes.forEach(node => {
                    if (node.nodeType === 1 && (node.matches('img') || node.querySelectorAll && node.querySelectorAll('img').length > 0)) {
                        imgChanged = true;
                    }
                });
            }
        }
        if (imgChanged) {
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                initImgMask();
            }, 100);
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window._QYLImgMaskMutationObserver = observer;
}
setTimeout(() => {
    initImgMask();
    observeImgChanges();
}, 1500);