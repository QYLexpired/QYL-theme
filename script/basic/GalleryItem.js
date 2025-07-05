let currentItem = null;
let lastRAF = null;
let lastEvent = null;
let mouseEnterHandler = null;
let mouseLeaveHandler = null;
let isEnabled = false;
function handleMove(e) {
    lastEvent = e;
    if (!lastRAF) {
        lastRAF = requestAnimationFrame(() => {
            if (!currentItem || !lastEvent) return;
            const rect = currentItem.getBoundingClientRect();
            const x = lastEvent.clientX - rect.left;
            const y = lastEvent.clientY - rect.top;
            const threshold = 10;
            if (x < -threshold || y < -threshold || x > rect.width + threshold || y > rect.height + threshold) {
                document.removeEventListener('mousemove', handleMove);
                currentItem.style.transform = '';
                currentItem.style.transition = 'transform 0.3s cubic-bezier(.25,.46,.45,.94)';
                currentItem.style.boxShadow = '';
                currentItem = null;
                lastEvent = null;
                lastRAF = null;
                return;
            }
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            let offsetX = (x - centerX) / centerX;
            let offsetY = (y - centerY) / centerY;
            offsetX = Math.max(-1, Math.min(1, offsetX));
            offsetY = Math.max(-1, Math.min(1, offsetY));
            const maxRotate = 3;
            currentItem.style.transform = `perspective(400px) rotateX(${-offsetY * maxRotate}deg) rotateY(${offsetX * maxRotate}deg) scale(1.03)`;
            currentItem.style.transition = 'transform 0.1s cubic-bezier(.25,.46,.45,.94)';
            const shadowX = -offsetX * 16;
            const shadowY = -offsetY * 16 + 12;
            const shadowBlur = 32;
            const shadowColor = 'var(--b3-theme-primary-lighter)';
            currentItem.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`;
            lastRAF = null;
        });
    }
}
export function initGalleryItem() {
    if (isEnabled) return;
    mouseEnterHandler = function (e) {
        let target = e.target;
        if (target && target.classList?.contains('av__gallery-item')) {
            currentItem = target;
            document.addEventListener('mousemove', handleMove);
        }
    };
    mouseLeaveHandler = function (e) {
        let target = e.target;
        if (target && target.classList?.contains('av__gallery-item')) {
            document.removeEventListener('mousemove', handleMove);
            target.style.transform = '';
            target.style.transition = 'transform 0.3s cubic-bezier(.25,.46,.45,.94)';
            target.style.boxShadow = '';
            currentItem = null;
            lastEvent = null;
            lastRAF = null;
        }
    };
    document.addEventListener('mouseenter', mouseEnterHandler, true);
    document.addEventListener('mouseleave', mouseLeaveHandler, true);
    isEnabled = true;
}
export function removeGalleryItem() {
    if (!isEnabled) return;
    document.removeEventListener('mouseenter', mouseEnterHandler, true);
    document.removeEventListener('mouseleave', mouseLeaveHandler, true);
    document.removeEventListener('mousemove', handleMove);
    const galleryItems = document.querySelectorAll('.av__gallery-item');
    galleryItems.forEach(item => {
        item.style.transform = '';
        item.style.transition = 'transform 0.3s cubic-bezier(.25,.46,.45,.94)';
        item.style.boxShadow = '';
    });
    currentItem = null;
    lastEvent = null;
    lastRAF = null;
    mouseEnterHandler = null;
    mouseLeaveHandler = null;
    isEnabled = false;
}
