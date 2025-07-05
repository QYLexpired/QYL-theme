import { putFile, getFile } from './API.js';
import { clearConfigCache, getStorageConfig } from './GetStorage.js';
const CONFIG_PATH = '/conf/QYL-Config.json';
async function getConfig() {
    return await getStorageConfig();
}
async function saveConfig(config) {
    try {
        await putFile(CONFIG_PATH, JSON.stringify(config, null, 2));
        clearConfigCache();
        if (window.QYLConfigManager) {
            window.QYLConfigManager.clearCache();
        }
    } catch (error) {
    }
}
async function toggleButtonState(buttonId) {
    const config = await getConfig();
    const currentState = config[buttonId] || false;
    const newState = !currentState;
    config[buttonId] = newState;
    await saveConfig(config);
    return newState;
}
async function getButtonState(buttonId) {
    const config = await getConfig();
    return config[buttonId] || false;
}
async function setButtonState(buttonId, state) {
    const config = await getConfig();
    config[buttonId] = state;
    await saveConfig(config);
}
export async function batchUpdateConfig(updates) {
    try {
        const config = await getConfig();
        for (const [key, value] of Object.entries(updates)) {
            config[key] = value;
        }
        await saveConfig(config);
        if (window.QYLConfigManager) {
            window.QYLConfigManager.updateConfig(config);
        }
        return config;
    } catch (error) {
        throw error;
    }
}
export async function batchSetButtonStates(states) {
    try {
        const updates = {};
        for (const [buttonId, state] of Object.entries(states)) {
            updates[buttonId] = state;
        }
        await batchUpdateConfig(updates);
        for (const [buttonId, state] of Object.entries(states)) {
            const btn = document.getElementById(buttonId);
            if (btn) {
                btn.classList.toggle('active', state);
            }
        }
        if (window.QYLConfigManager) {
            window.QYLConfigManager.clearCache();
        }
        return true;
    } catch (error) {
        return false;
    }
}
let batchUpdateQueue = new Map();
let batchUpdateTimer = null;
export async function smartBatchUpdate(buttonId, state) {
    batchUpdateQueue.set(buttonId, state);
    if (batchUpdateTimer) {
        clearTimeout(batchUpdateTimer);
    }
    batchUpdateTimer = setTimeout(async () => {
        if (batchUpdateQueue.size > 0) {
            const states = Object.fromEntries(batchUpdateQueue);
            batchUpdateQueue.clear();
            await batchSetButtonStates(states);
        }
    }, 1); 
}
export async function flushBatchUpdate() {
    if (batchUpdateQueue.size > 0) {
        const states = Object.fromEntries(batchUpdateQueue);
        batchUpdateQueue.clear();
        if (batchUpdateTimer) {
            clearTimeout(batchUpdateTimer);
            batchUpdateTimer = null;
        }
        await batchSetButtonStates(states);
    }
}
export async function smartToggleButtonState(buttonId) {
    try {
        const currentState = await getButtonState(buttonId);
        const newState = !currentState;
        await smartBatchUpdate(buttonId, newState);
        if (window.QYLConfigManager) {
            window.QYLConfigManager.clearCache();
        }
        return newState;
    } catch (error) {
        return false;
    }
}
export { toggleButtonState, getButtonState, setButtonState, getConfig, saveConfig };
