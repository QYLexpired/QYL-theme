export class QYLAttrAPI {
    constructor() {
        this.commonMenuCache = { elem: null, timestamp: 0 };
    }
    getCommonMenu() {
        const now = Date.now();
        if (!this.commonMenuCache.elem || now - this.commonMenuCache.timestamp > 1000) {
            this.commonMenuCache.elem = document.querySelector("#commonMenu .b3-menu__items");
            this.commonMenuCache.timestamp = now;
        }
        return this.commonMenuCache.elem;
    }
    async queryCSSAttribute(selectid) {
        if (!selectid) return null;
        try {
            const 属性对象 = await this.getBlockAttributes(selectid, ["custom-css"]);
            const customcssvalue = 属性对象?.['custom-css']?.trim(); 
            return customcssvalue || null;
        } catch (err) {
            return null;
        }
    }
    async setBlockAttributes(内容块id, 属性对象) {
        return this.parseResponse(this.requestData('/api/attr/setBlockAttrs', {
            id: 内容块id,
            attrs: 属性对象,
        }));
    }
    async getBlockAttributes(内容块id, 属性数组) {
        return this.parseResponse(this.requestData('/api/attr/getBlockAttrs', {
            id: 内容块id,
            attrs: 属性数组,
        }));
    }
    async requestData(url, data) {
        try {
            const response = await fetch(url, {
                body: JSON.stringify(data),
                method: 'POST',
                headers: { Authorization: 'Token ' } 
            });
            return response.ok ? await response.json() : null;
        } catch (error) {
            return null;
        }
    }
    async parseResponse(response) {
        try {
            const result = await response;
            if (!result) return null;
            return result.code === 0 ? result.data : null;
        } catch (error) {
            return null;
        }
    }
    async setCustomAttribute(id, attrName, attrValue) {
        let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`);
        if (blocks) {
            blocks.forEach(block => block.setAttribute(attrName, attrValue));
        }
        let attrs = {};
        attrs[attrName] = attrValue;
        return this.setBlockAttributes(id, attrs);
    }
    static async saveImgMaskData(blockId, maskDataList) {
        const attrValue = JSON.stringify(maskDataList || []);
        const api = new QYLAttrAPI();
        return api.setCustomAttribute(blockId, 'QYLImgMaskData', attrValue);
    }
    static async loadImgMaskData(blockId) {
        const api = new QYLAttrAPI();
        const attrs = await api.getBlockAttributes(blockId, ['QYLImgMaskData']);
        if (attrs && attrs.QYLImgMaskData) {
            try {
                return JSON.parse(attrs.QYLImgMaskData);
            } catch {
                return [];
            }
        }
        return [];
    }
    getCurrentTime() {
        return new Date();
    }
    formatTime(date, format) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        switch (format) {
            case 'date':
                return `${year}-${month}-${day}`;
            case 'time':
                return `${hours}:${minutes}:${seconds}`;
            case 'date-time':
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            default:
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    }
}
