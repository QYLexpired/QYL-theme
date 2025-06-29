import { setButtonState, getButtonState } from '../basic/Storage.js';
class ExcluSetting {
    constructor() {
        this.groups = {};
    }
    registerGroup(groupId, buttonIds) {
        this.groups[groupId] = buttonIds;
    }
    async handleExclusion(groupId, activeId, onStateChange, onDisable) {
        const group = this.groups[groupId];
        if (!group) return;
        for (const id of group) {
            if (id !== activeId) {
                await setButtonState(id, false);
                if (onStateChange) onStateChange(id, false);
                const btn = document.getElementById(id);
                if (btn) btn.classList.remove('active');
                if (onDisable) onDisable(id);
            }
        }
    }
}
const excluSetting = new ExcluSetting();
export default excluSetting;
