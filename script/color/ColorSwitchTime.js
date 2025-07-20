import { updatePWAThemeColor } from '../basic/PWA.js';
let animationFrameId = null;
let lastUpdate = null;
let retryCount = 0;
const maxRetry = 10;
function getCurrentHue() {
    const style = getComputedStyle(document.documentElement);
    let value = style.getPropertyValue('--QYL-custom-primary-main').trim();
    if (value.endsWith('deg')) value = value.slice(0, -3);
    let hue = parseInt(value, 10);
    if (isNaN(hue)) hue = 0;
    return hue;
}
function setCurrentHue(hue) {
    document.documentElement.style.setProperty('--QYL-custom-primary-main', `${hue}deg`);
}
function step() {
    const now = Date.now();
    if (!lastUpdate || now - lastUpdate >= 1000) {
        let hue = getCurrentHue();
        hue = (hue + 2) % 360;
        setCurrentHue(hue);
        lastUpdate = now;
        updatePWAThemeColor();
    }
    animationFrameId = requestAnimationFrame(step);
}
function hasCustomPrimaryVar() {
    const style = getComputedStyle(document.documentElement);
    let value = style.getPropertyValue('--QYL-custom-primary-main').trim();
    return value !== '';
}
function waitForCustomPrimaryVarAndStart() {
    if (hasCustomPrimaryVar()) {
        retryCount = 0;
        animationFrameId = requestAnimationFrame(step);
    } else if (retryCount < maxRetry) {
        retryCount++;
        setTimeout(waitForCustomPrimaryVarAndStart, 100);
    } else {
        retryCount = 0;
    }
}
export function startColorSwitch() {
    if (animationFrameId) return; 
    lastUpdate = null;
    retryCount = 0;
    waitForCustomPrimaryVarAndStart();
}
export function stopColorSwitch() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}
