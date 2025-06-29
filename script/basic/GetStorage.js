import { getFile } from './API.js';
const CONFIG_PATH = '/conf/QYL-Config.json';
async function getStorageConfig() {
    try {
        const content = await getFile(CONFIG_PATH);
        if (!content) {
            return {};
        }
        const parsed = JSON.parse(content);
        if (parsed && typeof parsed === 'object') {
            const cleanConfig = {};
            for (const [key, value] of Object.entries(parsed)) {
                if (value && typeof value === 'object' && (value.code === 404 || value.msg || value.data !== null)) {
                    continue;
                }
                if (key === 'code' || key === 'msg' || key === 'data') {
                    continue;
                }
                cleanConfig[key] = value;
            }
            return cleanConfig;
        }
        return {};
    } catch (error) {
        return {};
    }
}
async function getStorageItem(key, defaultValue = null) {
    const config = await getStorageConfig();
    return config[key] !== undefined ? config[key] : defaultValue;
}
async function getStorageKeys() {
    try {
        const config = await getStorageConfig();
        const keys = Object.keys(config);
        return keys;
    } catch (error) {
        return [];
    }
}
async function hasStorageItem(key) {
    try {
        const config = await getStorageConfig();
        const exists = key in config;
        return exists;
    } catch (error) {
        return false;
    }
}
export { 
    getStorageConfig, 
    getStorageItem, 
    getStorageKeys, 
    hasStorageItem 
}; 