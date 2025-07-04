import { MenuItemFactory } from './MenuItemFactory.js';
import { MenuData } from './MenuData.js';
export class QYLAttrMenu {
    constructor(i18n, api) {
        this.i18n = i18n;
        this.api = api;
        this.factory = new MenuItemFactory(i18n, api);
        this.menuData = new MenuData();
    }
    insertQYLattr(selectid, selecttype, selectsbLayout) {
        const menu = this.getCommonMenu();
        if (!menu) return;
        const hasExport = menu.querySelector('[data-id="export"]');
        const hasUpdate = menu.querySelector('[data-id="updateAndCreatedAt"]');
        const attritem = menu.querySelector('#QYLattr');
        if (!hasExport && hasUpdate && !attritem) {
            const qylBtn = this.createQYLattrItem(selectid, selecttype, selectsbLayout);
            menu.insertBefore(qylBtn, hasUpdate);
            if (qylBtn.nextSibling) {
                menu.insertBefore(this.createMenuSeparator(), qylBtn.nextSibling);
            } else {
                menu.appendChild(this.createMenuSeparator());
            }
        }
    }
    insertQYLattrforfile(selectid, selecttype) {
        const menu = this.getCommonMenu();
        if (!menu) return;
        const hasExport = menu.querySelector('[data-id="export"]');
        const hasUpdate = menu.querySelector('[data-id="updateAndCreatedAt"]');
        const attritem = menu.querySelector('#QYLattr');
        if (hasExport && !hasUpdate && !attritem) {
            const qylBtn = this.createQYLattrItem(selectid, selecttype);
            menu.appendChild(qylBtn);
            menu.insertBefore(this.createMenuSeparator(), qylBtn);
        }
    }
    getCommonMenu() {
        const commonMenu = document.querySelector("#commonMenu .b3-menu__items");
        return commonMenu;
    }
    createMenuSeparator(className = `b3-menu__separator`) {
        let node = document.createElement(`button`);
        node.className = className;
        return node;
    }
    createQYLattrItem(selectid, selecttype, selectsbLayout) {
        let button = document.createElement("button");
        button.id = "QYLattr";
        button.className = "b3-menu__item";
        button.innerHTML = `<svg t="1748926087349" class="b3-menu__icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="55665"><path d="M204.8 426.666667c0 10.24 6.826667 17.066667 17.066667 17.066666s17.066667-6.826667 17.066666-17.066666c0-81.92 10.24-126.293333 37.546667-150.186667s68.266667-37.546667 150.186667-37.546667c10.24 0 17.066667-6.826667 17.066666-17.066666s-6.826667-17.066667-17.066666-17.066667c-81.92 0-126.293333-10.24-150.186667-37.546667S238.933333 98.986667 238.933333 17.066667c0-10.24-6.826667-17.066667-17.066666-17.066667S204.8 6.826667 204.8 17.066667c0 81.92-10.24 126.293333-37.546667 150.186666S98.986667 204.8 17.066667 204.8c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666c81.92 0 126.293333 10.24 150.186666 37.546667s37.546667 68.266667 37.546667 150.186667zM409.6 119.466667c30.72 0 47.786667 3.413333 54.613333 13.653333 10.24 6.826667 13.653333 23.893333 13.653334 54.613333 0 10.24 6.826667 17.066667 17.066666 17.066667s17.066667-6.826667 17.066667-17.066667c0-30.72 3.413333-47.786667 13.653333-54.613333 10.24-10.24 23.893333-13.653333 54.613334-13.653333 10.24 0 17.066667-6.826667 17.066666-17.066667s-6.826667-17.066667-17.066666-17.066667c-30.72 0-47.786667-3.413333-54.613334-13.653333-10.24-6.826667-13.653333-23.893333-13.653333-54.613333 0-10.24-6.826667-17.066667-17.066667-17.066667s-17.066667 6.826667-17.066666 17.066667c0 30.72-3.413333 47.786667-13.653334 54.613333-10.24 10.24-23.893333 13.653333-54.613333 13.653333-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066667zM433.493333 488.106667c-17.066667-17.066667-23.893333-44.373333-23.893333-95.573334 0-10.24-6.826667-17.066667-17.066667-17.066666s-17.066667 6.826667-17.066666 17.066666c0 54.613333-6.826667 81.92-23.893334 95.573334-13.653333 17.066667-40.96 23.893333-95.573333 23.893333-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666c54.613333 0 81.92 6.826667 95.573333 23.893334 17.066667 17.066667 23.893333 44.373333 23.893334 95.573333 0 10.24 6.826667 17.066667 17.066666 17.066667s17.066667-6.826667 17.066667-17.066667c0-54.613333 6.826667-81.92 23.893333-95.573333 17.066667-17.066667 44.373333-23.893333 95.573334-23.893334 10.24 0 17.066667-6.826667 17.066666-17.066666s-6.826667-17.066667-17.066666-17.066667c-54.613333 0-81.92-6.826667-95.573334-23.893333z" fill="" p-id="55666"></path><path d="M737.28 109.226667c-6.826667-3.413333-13.653333 0-20.48 3.413333-3.413333 3.413333-6.826667 13.653333-3.413333 20.48C737.28 187.733333 750.933333 245.76 750.933333 307.2c0 245.76-197.973333 443.733333-443.733333 443.733333-61.44 0-119.466667-13.653333-177.493333-37.546666-6.826667-3.413333-13.653333 0-20.48 3.413333s-6.826667 13.653333-3.413334 20.48C184.32 911.36 354.986667 1024 546.133333 1024c262.826667 0 477.866667-215.04 477.866667-477.866667 0-191.146667-112.64-361.813333-286.72-436.906666z" fill="" p-id="55667"></path></svg><span class="b3-menu__label" style="">${this.i18n.QYLcustomattr}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`;
        if (selecttype === "NodeHeading") {
            button.appendChild(this.createHeadingSubmenu(selectid));
        } else if (selecttype === "NodeTable") {
            button.appendChild(this.createTableSubmenu(selectid));
        } else if (selecttype === "navigation-file") {
            button.appendChild(this.createFileSubmenu(selectid));
        } else if (selecttype === "NodeList") {
            button.appendChild(this.createListSubmenu(selectid));
        } else if (selecttype === "NodeBlockquote") {
            button.appendChild(this.createBlockquoteSubmenu(selectid));
        } else if (selecttype === "NodeSuperBlock" && selectsbLayout === "col") {
            button.appendChild(this.createSuperBlockColSubmenu(selectid));
        } else if (selecttype === "NodeSuperBlock" && selectsbLayout === "row") {
            button.appendChild(this.createSuperBlockRowSubmenu(selectid));
        } else {
            button.appendChild(this.createAnyBlockSubmenu(selectid));
        }
        return button;
    }
    createHeadingSubmenu(selectid) {
        const items = [
            this.factory.createCSSItem(selectid),
            this.factory.createHeadingStyleItem(selectid),
            this.factory.createBlockStyleItem(selectid),
            this.factory.createImgStyleItem(selectid),
            this.factory.createFontFamilyItem(selectid),
            this.factory.createHeightItem(selectid)
        ];
        return this.factory.createSubmenu("QYLNodeHeadingsub", items);
    }
    createTableSubmenu(selectid) {
        const items = [
            this.factory.createCSSItem(selectid),
            this.factory.createTableStyleItem(selectid),
            this.factory.createBlockStyleItem(selectid),
            this.factory.createImgStyleItem(selectid),
            this.factory.createFontFamilyItem(selectid),
            this.factory.createHeightItem(selectid)
        ];
        return this.factory.createSubmenu("QYLNodeTablesub", items);
    }
    createFileSubmenu(selectid) {
        const items = [
            this.factory.createCSSItem(selectid),
            this.factory.createFileStyleItem(selectid),
            this.factory.createLineHeightItem(selectid),
            this.factory.createHeadingStyleItem(selectid),
            this.factory.createTableStyleItem(selectid),
            this.factory.createImgStyleItem(selectid),
            this.factory.createFontFamilyItem(selectid),
            this.factory.createBlankBlockRemindItem(selectid)
        ];
        return this.factory.createSubmenu("QYLfilesub", items);
    }
    createListSubmenu(selectid) {
        const items = [
            this.factory.createCSSItem(selectid),
            this.factory.createListViewItem(selectid),
            this.factory.createBlockStyleItem(selectid),
            this.factory.createImgStyleItem(selectid),
            this.factory.createFontFamilyItem(selectid),
            this.factory.createHeightItem(selectid)
        ];
        return this.factory.createSubmenu("QYLNodeListsub", items);
    }
    createBlockquoteSubmenu(selectid) {
        const items = [
            this.factory.createCSSItem(selectid),
            this.factory.createCalloutColorItem(selectid),
            this.factory.createBlockStyleItem(selectid),
            this.factory.createImgStyleItem(selectid),
            this.factory.createFontFamilyItem(selectid),
            this.factory.createHeightItem(selectid)
        ];
        return this.factory.createSubmenu("QYLNodeBlockquotesub", items);
    }
    createSuperBlockColSubmenu(selectid) {
        const items = [
            this.factory.createCSSItem(selectid),
            this.factory.createColsBGapItem(selectid),
            this.factory.createBlockStyleItem(selectid),
            this.factory.createImgStyleItem(selectid),
            this.factory.createFontFamilyItem(selectid),
            this.factory.createHeightItem(selectid)
        ];
        return this.factory.createSubmenu("QYLNodeSuperBlocksub", items);
    }
    createSuperBlockRowSubmenu(selectid) {
        const items = [
            this.factory.createCSSItem(selectid),
            this.factory.createRowsBGapItem(selectid),
            this.factory.createBlockStyleItem(selectid),
            this.factory.createImgStyleItem(selectid),
            this.factory.createFontFamilyItem(selectid),
            this.factory.createHeightItem(selectid)
        ];
        return this.factory.createSubmenu("QYLNodeSuperBlocksub", items);
    }
    createAnyBlockSubmenu(selectid) {
        const items = [
            this.factory.createCSSItem(selectid),
            this.factory.createBlockStyleItem(selectid),
            this.factory.createImgStyleItem(selectid),
            this.factory.createFontFamilyItem(selectid),
            this.factory.createHeightItem(selectid)
        ];
        return this.factory.createSubmenu("QYLanyblocksub", items);
    }
}
