import { putFile, getFile } from './API.js';
const CONFIG_PATH = '/conf/QYL-Config.json';
async function getConfig() {
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
async function saveConfig(config) {
    try {
        await putFile(CONFIG_PATH, JSON.stringify(config, null, 2));
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
export { toggleButtonState, getButtonState, setButtonState, getConfig, saveConfig };
