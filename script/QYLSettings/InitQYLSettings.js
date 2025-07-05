import { initializeFunctionStates } from './Function.js';
import { initializeLayoutStates } from './Layout.js';
import { initializeStyleStates } from './Style.js';
import { initializeElementStates } from './Element.js';
import { initializeColorStates } from './Color.js';
import { getStorageConfig } from '../basic/GetStorage.js';
class ConfigManager {
    constructor() {
        this.config = null;
        this.initializing = false;
        this.initPromise = null;
    }
    async getConfig() {
        if (this.config) {
            return this.config;
        }
        if (this.initializing) {
            return this.initPromise;
        }
        this.initializing = true;
        this.initPromise = getStorageConfig();
        try {
            this.config = await this.initPromise;
            return this.config;
        } finally {
            this.initializing = false;
        }
    }
    clearCache() {
        this.config = null;
        this.initPromise = null;
    }
    updateConfig(newConfig) {
        this.config = newConfig;
    }
}
const configManager = new ConfigManager();
window.QYLConfigManager = configManager;
async function initQYLSettings() {
    try {
        const config = await configManager.getConfig();
        await Promise.all([
            initializeFunctionStates(config),
            initializeLayoutStates(config),
            initializeStyleStates(config),
            initializeElementStates(config),
            initializeColorStates(config)
        ]);
    } catch (error) {
    }
}
function initQYLSettingsWhenReady() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQYLSettings);
    } else {
        initQYLSettings();
    }
}
initQYLSettingsWhenReady();
export { initQYLSettings, initQYLSettingsWhenReady, configManager };
