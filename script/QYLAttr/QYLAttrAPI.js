export class QYLAttrAPI {
    constructor() {
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
}
