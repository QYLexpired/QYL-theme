import { initializeFunctionStates } from './Function.js';
import { initializeLayoutStates } from './Layout.js';
import { initializeStyleStates } from './Style.js';
import { initializeElementStates } from './Element.js';
import { initializeColorStates } from './Color.js';
async function initQYLSettings() {
    try {
        await initializeFunctionStates();
        await initializeLayoutStates();
        await initializeStyleStates();
        await initializeElementStates();
        await initializeColorStates();
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
export { initQYLSettings, initQYLSettingsWhenReady };
