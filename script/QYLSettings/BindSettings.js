import { setButtonState, batchSetButtonStates, smartBatchUpdate } from '../basic/Storage.js';
class BindSetting {
    constructor() {
        this.groups = {};
    }
    registerGroup(groupId, triggerId, dependentIds) {
        this.groups[groupId] = { trigger: triggerId, dependents: dependentIds };
    }
    async handleBinding(groupId, triggerId, onEnable) {
        const group = this.groups[groupId];
        if (!group || (group.trigger !== triggerId && !group.dependents.includes(triggerId))) return;
        const all = [group.trigger, ...group.dependents];
        for (const id of all) {
            await setButtonState(id, true);
            const btn = document.getElementById(id);
            if (btn) btn.classList.add('active');
            if (onEnable) onEnable(id);
        }
    }
    async handleUnbinding(groupId, triggerId, onDisable) {
        const group = this.groups[groupId];
        if (!group || (group.trigger !== triggerId && !group.dependents.includes(triggerId))) return;
        const all = [group.trigger, ...group.dependents];
        for (const id of all) {
            await setButtonState(id, false);
            const btn = document.getElementById(id);
            if (btn) btn.classList.remove('active');
            if (onDisable) onDisable(id);
        }
    }
    async handleBindingBatch(groupId, triggerId, onEnable) {
        const group = this.groups[groupId];
        if (!group || (group.trigger !== triggerId && !group.dependents.includes(triggerId))) return;
        const all = [group.trigger, ...group.dependents];
        for (const id of all) {
            await smartBatchUpdate(id, true);
        }
        for (const id of all) {
            if (onEnable) onEnable(id);
        }
    }
    async handleUnbindingBatch(groupId, triggerId, onDisable) {
        const group = this.groups[groupId];
        if (!group || (group.trigger !== triggerId && !group.dependents.includes(triggerId))) return;
        const all = [group.trigger, ...group.dependents];
        for (const id of all) {
            await smartBatchUpdate(id, false);
        }
        for (const id of all) {
            if (onDisable) onDisable(id);
        }
    }
}
const bindSetting = new BindSetting();
export default bindSetting;
