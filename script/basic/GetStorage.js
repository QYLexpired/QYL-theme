import { getFile } from './API.js';
const CONFIG_PATH = '/conf/QYL-Config.json';
let configCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5000; 
let pendingRequest = null; 
let requestCount = 0; 
async function getStorageConfig() {
    const now = Date.now();
    if (configCache && (now - cacheTimestamp) < CACHE_DURATION) {
        return configCache;
    }
    if (pendingRequest) {
        return pendingRequest;
    }
    requestCount++;
    pendingRequest = (async () => {
        try {
            const content = await getFile(CONFIG_PATH);
            if (!content) {
                configCache = {};
                cacheTimestamp = now;
                return configCache;
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
                configCache = cleanConfig;
                cacheTimestamp = now;
                return cleanConfig;
            }
            configCache = {};
            cacheTimestamp = now;
            return {};
        } catch (error) {
            configCache = {};
            cacheTimestamp = now;
            return {};
        } finally {
            pendingRequest = null; 
        }
    })();
    return pendingRequest;
}
function clearConfigCache() {
    configCache = null;
    cacheTimestamp = 0;
    pendingRequest = null; 
}
async function refreshConfigCache() {
    clearConfigCache();
    return await getStorageConfig();
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
    hasStorageItem,
    clearConfigCache,
    refreshConfigCache
};
