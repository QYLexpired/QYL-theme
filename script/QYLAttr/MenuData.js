export class MenuData {
    constructor() {
        this.tableColorOptions = [
            { value: "主题色", label: "themecolor", icon: "#iconTheme", group: "group4" },
            { value: "红色", label: "red", icon: "#iconTheme", group: "group4" },
            { value: "橙色", label: "orange", icon: "#iconTheme", group: "group4" },
            { value: "黄色", label: "yellow", icon: "#iconTheme", group: "group4" },
            { value: "绿色", label: "green", icon: "#iconTheme", group: "group4" },
            { value: "青色", label: "cyan", icon: "#iconTheme", group: "group4" },
            { value: "蓝色", label: "blue", icon: "#iconTheme", group: "group4" },
            { value: "紫色", label: "purple", icon: "#iconTheme", group: "group4" },
            { value: "粉色", label: "pink", icon: "#iconTheme", group: "group4" },
            { value: "黑色", label: "black", icon: "#iconTheme", group: "group4" },
            { value: "灰色", label: "gray", icon: "#iconTheme", group: "group4" }
        ];
        this.calloutColorOptions = [
            { value: "主题色", label: "themecolor", icon: "#iconQuote", group: "group1" },
            { value: "背景色", label: "bgcolor", icon: "#iconQuote", group: "group1" },
            { value: "红色", label: "red", icon: "#iconQuote", group: "group1" },
            { value: "橙色", label: "orange", icon: "#iconQuote", group: "group1" },
            { value: "黄色", label: "yellow", icon: "#iconQuote", group: "group1" },
            { value: "绿色", label: "green", icon: "#iconQuote", group: "group1" },
            { value: "青色", label: "cyan", icon: "#iconQuote", group: "group1" },
            { value: "蓝色", label: "blue", icon: "#iconQuote", group: "group1" },
            { value: "紫色", label: "purple", icon: "#iconQuote", group: "group1" },
            { value: "粉色", label: "pink", icon: "#iconQuote", group: "group1" },
            { value: "黑色", label: "black", icon: "#iconQuote", group: "group1" },
            { value: "灰色", label: "gray", icon: "#iconQuote", group: "group1" },
        ];
        this.colsBGapOptions = [
            { value: "水平连续排列", label: "colsblianxu", icon: "#iconSuper", group: "group1" },
            { value: "水平紧凑排列", label: "colsbjincou", icon: "#iconSuper", group: "group1" },
            { value: "水平较紧凑排列", label: "colsbjiaojincou", icon: "#iconSuper", group: "group1" },
            { value: "水平较宽松排列", label: "colsbjiaokuansong", icon: "#iconSuper", group: "group1" },
            { value: "水平宽松排列", label: "colsbkuansong", icon: "#iconSuper", group: "group1" }
        ];
        this.rowsBGapOptions = [
            { value: "垂直连续排列", label: "rowsblianxu", icon: "#iconSuper", group: "group1" },
            { value: "垂直宽松排列", label: "rowsbkuansong", icon: "#iconSuper", group: "group1" },
            { value: "垂直软换行排列", label: "rowsbruanhuanhang", icon: "#iconSuper", group: "group1" }
        ];
        this.listViewOptions = [
            { value: "脑图", label: "listviewmindmap", icon: "#iconGlobalGraph", group: "group1" },
            { value: "看板", label: "listviewkanban", icon: "#iconMenu", group: "group1" },
            { value: "表格", label: "listviewtable", icon: "#iconTable", group: "group1" },
            { value: "默认", label: "listviewdefault", icon: "#iconList", group: "group1" }
        ];
        this.lineHeightOptions = [
            { value: "单倍行距", label: "lineheight1", icon: "#iconContract", group: "group1" },
            { value: "1.5倍行距", label: "lineheight15", icon: "#iconContract", group: "group1" },
            { value: "1.8倍行距", label: "lineheight18", icon: "#iconContract", group: "group1" },
            { value: "双倍行距", label: "lineheight2", icon: "#iconContract", group: "group1" }
        ];
        this.tableStyleOptions = [
            { value: "三线表", label: "threeline", icon: "#iconTable", attrName: "table-style", group: "group1" },
            { value: "强化表头", label: "theadhl", icon: "#iconTable", attrName: "table-style-thead", group: "group2" },
            { value: "全宽表格", label: "tablewidth100", icon: "#iconTable", attrName: "table-width", group: "group3" }
        ];
        this.headingStyleOptions = [
            { value: "多彩", label: "headingstylecolorful", icon: "#iconHeadings", attrName: "h-style", group: "group1" },
            { value: "故障", label: "headingstyleglitch", icon: "#iconHeadings", attrName: "h-style", group: "group1" },
            { value: "金箔", label: "headingstylegold", icon: "#iconHeadings", attrName: "h-style", group: "group1" },
            { value: "下划线", label: "headingstyleunderline", icon: "#iconHeadings", attrName: "h-style-u", group: "group2" },
            { value: "左边框", label: "headingstyleleftborder", icon: "#iconHeadings", attrName: "h-style-u", group: "group2" },
            { value: "层级", label: "headingstylelevel", icon: "#iconHeadings", attrName: "h-style-l", group: "group3" }
        ];
        this.imgStyleOptions = [
            { value: "圆角", label: "imgstyleroundedcorners", icon: "#iconImage", attrName: "img-border", group: "group1" },
            { value: "圆形", label: "imgstylecircle", icon: "#iconImage", attrName: "img-border", group: "group1" },
            { value: "立体", label: "imgstyleshadow", icon: "#iconImage", attrName: "img-shadow", group: "group2" },
            { value: "反色", label: "imgstyleinvert", icon: "#iconImage", attrName: "img-invert", group: "group3" },
            { value: "九宫格排列", label: "imgstyle33grid", icon: "#iconImage", attrName: "img-display", group: "group4" }
        ];
        this.heightOptions = [
            { value: "50", label: "maxheight50", icon: "#iconContract", group: "group1" },
            { value: "100", label: "maxheight100", icon: "#iconContract", group: "group1" },
            { value: "150", label: "maxheight150", icon: "#iconContract", group: "group1" },
            { value: "200", label: "maxheight200", icon: "#iconContract", group: "group1" },
            { value: "300", label: "maxheight300", icon: "#iconContract", group: "group1" },
            { value: "400", label: "maxheight400", icon: "#iconContract", group: "group1" },
            { value: "500", label: "maxheight500", icon: "#iconContract", group: "group1" }
        ];
        this.fileStyleOptions = [
            { value: "洒金纸", label: "fileblockstylesajinzhi", icon: "#iconTheme", group: "group1" },
            { value: "网格", label: "fileblockstylegrid", icon: "#iconTheme", group: "group1" },
            { value: "格点", label: "fileblockstyledot", icon: "#iconTheme", group: "group1" }
        ];
        this.blockStyleOptions = [
            { value: "警告", label: "blockstylewarning", icon: "#iconTheme", group: "group1" },
            { value: "灵感", label: "blockstyletip", icon: "#iconTheme", group: "group1" },
            { value: "信息", label: "blockstyleinfo", icon: "#iconTheme", group: "group1" },
            { value: "重要", label: "blockstyleimportant", icon: "#iconTheme", group: "group1" },
            { value: "批注", label: "blockstylecomment", icon: "#iconTheme", group: "group1" },
            { value: "引用", label: "blockstylequote", icon: "#iconTheme", group: "group1" },
            { value: "待办", label: "blockstyletodo", icon: "#iconTheme", group: "group1" },
            { value: "完成", label: "blockstyledone", icon: "#iconTheme", group: "group1" },
            { value: "洒金纸", label: "blockstylesajinzhi", icon: "#iconTheme", group: "group1" },
            { value: "网格", label: "blockstylegrid", icon: "#iconTheme", group: "group1" },
            { value: "格点", label: "blockstyledot", icon: "#iconTheme", group: "group1" }
        ];
        this.flashcardStyleOptions = [
            { value: "闪卡", label: "blockstyleflashcard", icon: "#iconRiffCard", group: "group2" }
        ];
        this.fontOptions = [
            { value: "宋体", label: "宋体", fontFamily: "SimSun", group: "group1" },
            { value: "幼圆", label: "幼圆", fontFamily: "YouYuan", group: "group1" },
            { value: "黑体", label: "黑体", fontFamily: "SimHei", group: "group1" },
            { value: "微软雅黑", label: "微软雅黑", fontFamily: "Microsoft YaHei", group: "group1" },
            { value: "新宋体", label: "新宋体", fontFamily: "NSimSun", group: "group1" },
            { value: "楷体", label: "楷体", fontFamily: "KaiTi", group: "group1" },
            { value: "隶书", label: "隶书", fontFamily: "LiSu", group: "group1" },
            { value: "仿宋", label: "仿宋", fontFamily: "FangSong", group: "group1" },
            { value: "华文宋体", label: "华文宋体", fontFamily: "STSong", group: "group1" },
            { value: "华文中宋", label: "华文中宋", fontFamily: "STZhongsong", group: "group1" },
            { value: "华文仿宋", label: "华文仿宋", fontFamily: "STFangsong", group: "group1" },
            { value: "华文彩云", label: "华文彩云", fontFamily: "STCaiyun", group: "group1" },
            { value: "华文新魏", label: "华文新魏", fontFamily: "STXinwei", group: "group1" },
            { value: "华文楷体", label: "华文楷体", fontFamily: "STKaiti", group: "group1" },
            { value: "华文琥珀", label: "华文琥珀", fontFamily: "STHupo", group: "group1" },
            { value: "华文细黑", label: "华文细黑", fontFamily: "STXihei", group: "group1" },
            { value: "华文行楷", label: "华文行楷", fontFamily: "STXingkai", group: "group1" },
            { value: "华文隶书", label: "华文隶书", fontFamily: "STLiti", group: "group1" },
            { value: "方正姚体", label: "方正姚体", fontFamily: "FZYaoti", group: "group1" },
            { value: "方正舒体", label: "方正舒体", fontFamily: "FZShuTi", group: "group1" },
            { value: "Times New Roman", label: "Times New Roman", fontFamily: "Times New Roman", group: "group1" }
        ];
        this.noteColorOptions = [
            { value: "主题色便签", label: "themecolor", icon: "#iconTheme", group: "group1" },
            { value: "红色便签", label: "red", icon: "#iconTheme", group: "group1" },
            { value: "橙色便签", label: "orange", icon: "#iconTheme", group: "group1" },
            { value: "黄色便签", label: "yellow", icon: "#iconTheme", group: "group1" },
            { value: "绿色便签", label: "green", icon: "#iconTheme", group: "group1" },
            { value: "青色便签", label: "cyan", icon: "#iconTheme", group: "group1" },
            { value: "蓝色便签", label: "blue", icon: "#iconTheme", group: "group1" },
            { value: "紫色便签", label: "purple", icon: "#iconTheme", group: "group1" },
            { value: "粉色便签", label: "pink", icon: "#iconTheme", group: "group1" },
            { value: "黑色便签", label: "black", icon: "#iconTheme", group: "group1" },
            { value: "灰色便签", label: "gray", icon: "#iconTheme", group: "group1" }
        ];
        this.leftBorderColorOptions = [
            { value: "主题色左边框", label: "themecolor", icon: "#iconTheme", group: "group1" },
            { value: "红左边框", label: "red", icon: "#iconTheme", group: "group1" },
            { value: "橙左边框", label: "orange", icon: "#iconTheme", group: "group1" },
            { value: "黄左边框", label: "yellow", icon: "#iconTheme", group: "group1" },
            { value: "绿左边框", label: "green", icon: "#iconTheme", group: "group1" },
            { value: "青左边框", label: "cyan", icon: "#iconTheme", group: "group1" },
            { value: "蓝左边框", label: "blue", icon: "#iconTheme", group: "group1" },
            { value: "紫左边框", label: "purple", icon: "#iconTheme", group: "group1" },
            { value: "粉左边框", label: "pink", icon: "#iconTheme", group: "group1" },
            { value: "黑左边框", label: "black", icon: "#iconTheme", group: "group1" },
            { value: "灰左边框", label: "gray", icon: "#iconTheme", group: "group1" }
        ];
        this.listStyleSpecialOptions = [
            { value: "隐藏序标", label: "liststylehide", icon: "#iconList", attrName: "list-style", group: "group2" },
            { value: "恢复序标", label: "liststylerecover", icon: "#iconList", attrName: "list-style", group: "group2" }
        ];
        this.calloutSpecialOptions = [
            { value: "启用", label: "recovercallout", icon: "#iconQuote", attrName: "bq-callout", group: "group2" },
            { value: "启用2", label: "recovercallout2", icon: "#iconQuote", attrName: "bq-callout", group: "group2" },
            { value: "启用4", label: "recovercallout4", icon: "#iconQuote", attrName: "bq-callout", group: "group2" },
            { value: "启用3", label: "recovercallout3", icon: "#iconQuote", attrName: "bq-callout", group: "group2" },
            { value: "", label: "attrsdelete", icon: "#iconClose", attrName: "bq-callout", group: "group2", isWarning: true }
        ];
        this.submenuConfig = {
            noteSubmenu: { group: "group1" },
            leftBorderSubmenu: { group: "group1" }
        };
        this.attrNameConfig = {
            colsBGap: "sb-colgap",
            rowsBGap: "sb-rowgap",
            listView: "list-view",
            lineHeight: "line-height",
            blankBlockRemind: "blankblock-remind",
            tableColor: "table-color",
            tableStyle: "table-style",
            headingStyle: "h-style",
            imgBorder: "img-border",
            height: "height",
            style: "style",
            fontFamily: "font-family",
            calloutColor: "bq-callout-color",
            callout: "bq-callout",
            css: "css"
        };
        this.specialValueConfig = {
            blankBlockRemindOn: "开启",
            listStyleHide: "隐藏序标",
            calloutRecover: "启用",
            calloutRecover2: "启用2",
            calloutRecover3: "启用3"
        };
        this.clearButtonConfig = {
            colsBGap: { 
                group: "group1", 
                attrName: "sb-colgap",
                clearList: ["sb-colgap"]
            },
            rowsBGap: { 
                group: "group1", 
                attrName: "sb-rowgap",
                clearList: ["sb-rowgap"]
            },
            lineHeight: { 
                group: null, 
                attrName: "line-height",
                clearList: ["line-height"]
            },
            tableStyle: { 
                group: null, 
                attrName: "table-style",
                clearList: ["table-style", "table-style-thead", "table-width", "table-color"]
            },
            headingStyle: { 
                group: null, 
                attrName: "h-style",
                clearList: ["h-style", "h-style-u", "h-style-l"]
            },
            imgStyle: { 
                group: null, 
                attrName: "img-border",
                clearList: ["img-border", "img-shadow", "img-invert", "img-display"]
            },
            height: { 
                group: null, 
                attrName: "height",
                clearList: ["height"]
            },
            fileStyle: { 
                group: null, 
                attrName: "style",
                clearList: ["style"]
            },
            blockStyle: { 
                group: null, 
                attrName: "style",
                clearList: ["style", "style-flashcard"]
            },
            fontFamily: { 
                group: null, 
                attrName: "font-family",
                clearList: ["font-family"]
            },
            listView: {
                group: null,
                attrName: "list-view",
                clearList: ["list-view", "list-style"]
            },
            blankBlockRemind: {
                group: null,
                attrName: "blankblock-remind",
                clearList: ["blankblock-remind"]
            },
            callout: {
                group: null,
                attrName: "bq-callout",
                clearList: ["bq-callout", "bq-callout-color"]
            }
        };
        this.blankBlockRemindOptions = [
            { value: "开启", label: "blankblockremindon", icon: "#iconSelect", group: null },
            { value: "", label: "blankblockremindoff", icon: "#iconClose", group: null, isWarning: true }
        ];
        this.deleteButtonConfig = {
            label: "attrsdelete",  
            icon: "#iconClose",
            group: null,
            isWarning: true
        };
    }
}
