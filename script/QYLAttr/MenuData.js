export class MenuData {
    constructor() {
        this.tableOptions = [
            { attrName: "table-style", value: "三线表", label: "threeline", icon: "#iconTable", group: "group1" },
            { attrName: "table-style", value: "圆角", label: "tableround", icon: "#iconTable", group: "group1" },
            { attrName: "table-even-color", value: "层次", label: "level", icon: "#iconTable", group: "group2" },
            { attrName: "table-style-thead", value: "强化表头", label: "theadhl", icon: "#iconTable", group: "group3" },
            { attrName: "table-width", value: "全宽表格", label: "tablewidth100", icon: "#iconTable", group: "group4" },
            { attrName: "table-color", value: "主题色", label: "themecolor", icon: "#iconTheme", group: "group5" },
            { attrName: "table-color", value: "红色", label: "red", icon: "#iconTheme", group: "group5" },
            { attrName: "table-color", value: "橙色", label: "orange", icon: "#iconTheme", group: "group5" },
            { attrName: "table-color", value: "黄色", label: "yellow", icon: "#iconTheme", group: "group5" },
            { attrName: "table-color", value: "绿色", label: "green", icon: "#iconTheme", group: "group5" },
            { attrName: "table-color", value: "青色", label: "cyan", icon: "#iconTheme", group: "group5" },
            { attrName: "table-color", value: "蓝色", label: "blue", icon: "#iconTheme", group: "group5" },
            { attrName: "table-color", value: "紫色", label: "purple", icon: "#iconTheme", group: "group5" },
            { attrName: "table-color", value: "粉色", label: "pink", icon: "#iconTheme", group: "group5" },
            { attrName: "table-color", value: "黑色", label: "black", icon: "#iconTheme", group: "group5" },
            { attrName: "table-color", value: "灰色", label: "gray", icon: "#iconTheme", group: "group5" }
        ];
        this.calloutOptions = [
            { attrName: "bq-callout", value: "启用", label: "recovercallout", icon: "#iconQuote", group: "group1" },
            { attrName: "bq-callout", value: "启用2", label: "recovercallout2", icon: "#iconQuote", group: "group1" },
            { attrName: "bq-callout", value: "启用4", label: "recovercallout4", icon: "#iconQuote", group: "group1" },
            { attrName: "bq-callout", value: "启用3", label: "recovercallout3", icon: "#iconQuote", group: "group1" },
            { attrName: "bq-callout-transparent", value: "transparent", label: "transparentbackground", icon: "#iconQuote", group: "group2" },
            { attrName: "bq-callout-color", value: "主题色", label: "themecolor", icon: "#iconQuote", group: "group3" },
            { attrName: "bq-callout-color", value: "红色", label: "red", icon: "#iconQuote", group: "group3" },
            { attrName: "bq-callout-color", value: "橙色", label: "orange", icon: "#iconQuote", group: "group3" },
            { attrName: "bq-callout-color", value: "黄色", label: "yellow", icon: "#iconQuote", group: "group3" },
            { attrName: "bq-callout-color", value: "绿色", label: "green", icon: "#iconQuote", group: "group3" },
            { attrName: "bq-callout-color", value: "青色", label: "cyan", icon: "#iconQuote", group: "group3" },
            { attrName: "bq-callout-color", value: "蓝色", label: "blue", icon: "#iconQuote", group: "group3" },
            { attrName: "bq-callout-color", value: "紫色", label: "purple", icon: "#iconQuote", group: "group3" },
            { attrName: "bq-callout-color", value: "粉色", label: "pink", icon: "#iconQuote", group: "group3" },
            { attrName: "bq-callout-color", value: "黑色", label: "black", icon: "#iconQuote", group: "group3" },
            { attrName: "bq-callout-color", value: "灰色", label: "gray", icon: "#iconQuote", group: "group3" }
        ];
        this.colsBGapOptions = [
            { attrName: "sb-colgap", value: "水平连续排列", label: "colsblianxu", icon: "#iconSuper", group: "group1" },
            { attrName: "sb-colgap", value: "水平紧凑排列", label: "colsbjincou", icon: "#iconSuper", group: "group1" },
            { attrName: "sb-colgap", value: "水平较紧凑排列", label: "colsbjiaojincou", icon: "#iconSuper", group: "group1" },
            { attrName: "sb-colgap", value: "水平较宽松排列", label: "colsbjiaokuansong", icon: "#iconSuper", group: "group1" },
            { attrName: "sb-colgap", value: "水平宽松排列", label: "colsbkuansong", icon: "#iconSuper", group: "group1" }
        ];
        this.rowsBGapOptions = [
            { attrName: "sb-rowgap", value: "垂直连续排列", label: "rowsblianxu", icon: "#iconSuper", group: "group1" },
            { attrName: "sb-rowgap", value: "垂直宽松排列", label: "rowsbkuansong", icon: "#iconSuper", group: "group1" },
            { attrName: "sb-rowgap", value: "垂直软换行排列", label: "rowsbruanhuanhang", icon: "#iconSuper", group: "group1" }
        ];
        this.listViewOptions = [
            { attrName: "list-view", value: "脑图", label: "listviewmindmap", icon: "#iconGlobalGraph", group: "group1" },
            { attrName: "list-view", value: "看板", label: "listviewkanban", icon: "#iconMenu", group: "group1" },
            { attrName: "list-view", value: "表格", label: "listviewtable", icon: "#iconTable", group: "group1" },
            { attrName: "list-style", value: "隐藏序标", label: "liststylehide", icon: "#iconList", group: "group2" }
        ];
        this.lineHeightOptions = [
            { attrName: "line-height", value: "单倍行距", label: "lineheight1", icon: "#iconContract", group: "group1" },
            { attrName: "line-height", value: "1.5倍行距", label: "lineheight15", icon: "#iconContract", group: "group1" },
            { attrName: "line-height", value: "1.8倍行距", label: "lineheight18", icon: "#iconContract", group: "group1" },
            { attrName: "line-height", value: "双倍行距", label: "lineheight2", icon: "#iconContract", group: "group1" }
        ];
        this.headingStyleOptions = [
            { attrName: "h-style", value: "多彩", label: "headingstylecolorful", icon: "#iconHeadings", group: "group1" },
            { attrName: "h-style", value: "故障", label: "headingstyleglitch", icon: "#iconHeadings", group: "group1" },
            { attrName: "h-style", value: "金箔", label: "headingstylegold", icon: "#iconHeadings", group: "group1" },
            { attrName: "h-style-u", value: "下划线", label: "headingstyleunderline", icon: "#iconHeadings", group: "group2" },
            { attrName: "h-style-u", value: "左边框", label: "headingstyleleftborder", icon: "#iconHeadings", group: "group2" },
            { attrName: "h-style-l", value: "层级", label: "headingstylelevel", icon: "#iconHeadings", group: "group3" }
        ];
        this.imgStyleOptions = [
            { attrName: "img-border", value: "圆角", label: "imgstyleroundedcorners", icon: "#iconImage", group: "group1" },
            { attrName: "img-border", value: "圆形", label: "imgstylecircle", icon: "#iconImage", group: "group1" },
            { attrName: "img-shadow", value: "立体", label: "imgstyleshadow", icon: "#iconImage", group: "group2" },
            { attrName: "img-invert", value: "反色", label: "imgstyleinvert", icon: "#iconImage", group: "group3" },
            { attrName: "img-invert", value: "反色-dark", label: "imgstyleinvert-dark", icon: "#iconImage", group: "group3" },
            { attrName: "img-invert", value: "反色-light", label: "imgstyleinvert-light", icon: "#iconImage", group: "group3" },
            { attrName: "img-display", value: "九宫格排列", label: "imgstyle33grid", icon: "#iconImage", group: "group4" }
        ];
        this.heightOptions = [
            { attrName: "height", value: "50", label: "maxheight50", icon: "#iconContract", group: "group1" },
            { attrName: "height", value: "100", label: "maxheight100", icon: "#iconContract", group: "group1" },
            { attrName: "height", value: "150", label: "maxheight150", icon: "#iconContract", group: "group1" },
            { attrName: "height", value: "200", label: "maxheight200", icon: "#iconContract", group: "group1" },
            { attrName: "height", value: "300", label: "maxheight300", icon: "#iconContract", group: "group1" },
            { attrName: "height", value: "400", label: "maxheight400", icon: "#iconContract", group: "group1" },
            { attrName: "height", value: "500", label: "maxheight500", icon: "#iconContract", group: "group1" }
        ];
        this.fileStyleOptions = [
            { attrName: "style", value: "洒金纸", label: "fileblockstylesajinzhi", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "网格", label: "fileblockstylegrid", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "格点", label: "fileblockstyledot", icon: "#iconTheme", group: "group1" }
        ];
        this.blockStyleOptions = [
            { attrName: "style", value: "洒金纸", label: "blockstylesajinzhi", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "网格", label: "blockstylegrid", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "格点", label: "blockstyledot", icon: "#iconTheme", group: "group1" }
        ];
        this.warningStyleOptions = [
            { attrName: "style", value: "警告", label: "recovercallout", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "警告2", label: "blockstyleleftborder", icon: "#iconTheme", group: "group1" },
            { attrName: "warning-color", value: "themecolor", label: "themecolor", icon: "#iconTheme", group: "group2" },
            { attrName: "warning-color", value: "red", label: "red", icon: "#iconTheme", group: "group2" },
            { attrName: "warning-color", value: "orange", label: "orange", icon: "#iconTheme", group: "group2" },
            { attrName: "warning-color", value: "yellow", label: "yellow", icon: "#iconTheme", group: "group2" },
            { attrName: "warning-color", value: "green", label: "green", icon: "#iconTheme", group: "group2" },
            { attrName: "warning-color", value: "cyan", label: "cyan", icon: "#iconTheme", group: "group2" },
            { attrName: "warning-color", value: "blue", label: "blue", icon: "#iconTheme", group: "group2" },
            { attrName: "warning-color", value: "purple", label: "purple", icon: "#iconTheme", group: "group2" },
            { attrName: "warning-color", value: "pink", label: "pink", icon: "#iconTheme", group: "group2" },
            { attrName: "warning-color", value: "black", label: "black", icon: "#iconTheme", group: "group2" },
            { attrName: "warning-color", value: "gray", label: "gray", icon: "#iconTheme", group: "group2" }
        ];
        this.tipStyleOptions = [
            { attrName: "style", value: "灵感", label: "recovercallout", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "灵感2", label: "blockstyleleftborder", icon: "#iconTheme", group: "group1" },
            { attrName: "tip-color", value: "themecolor", label: "themecolor", icon: "#iconTheme", group: "group2" },
            { attrName: "tip-color", value: "red", label: "red", icon: "#iconTheme", group: "group2" },
            { attrName: "tip-color", value: "orange", label: "orange", icon: "#iconTheme", group: "group2" },
            { attrName: "tip-color", value: "yellow", label: "yellow", icon: "#iconTheme", group: "group2" },
            { attrName: "tip-color", value: "green", label: "green", icon: "#iconTheme", group: "group2" },
            { attrName: "tip-color", value: "cyan", label: "cyan", icon: "#iconTheme", group: "group2" },
            { attrName: "tip-color", value: "blue", label: "blue", icon: "#iconTheme", group: "group2" },
            { attrName: "tip-color", value: "purple", label: "purple", icon: "#iconTheme", group: "group2" },
            { attrName: "tip-color", value: "pink", label: "pink", icon: "#iconTheme", group: "group2" },
            { attrName: "tip-color", value: "black", label: "black", icon: "#iconTheme", group: "group2" },
            { attrName: "tip-color", value: "gray", label: "gray", icon: "#iconTheme", group: "group2" }
        ];
        this.infoStyleOptions = [
            { attrName: "style", value: "信息", label: "recovercallout", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "信息2", label: "blockstyleleftborder", icon: "#iconTheme", group: "group1" },
            { attrName: "info-color", value: "themecolor", label: "themecolor", icon: "#iconTheme", group: "group2" },
            { attrName: "info-color", value: "red", label: "red", icon: "#iconTheme", group: "group2" },
            { attrName: "info-color", value: "orange", label: "orange", icon: "#iconTheme", group: "group2" },
            { attrName: "info-color", value: "yellow", label: "yellow", icon: "#iconTheme", group: "group2" },
            { attrName: "info-color", value: "green", label: "green", icon: "#iconTheme", group: "group2" },
            { attrName: "info-color", value: "cyan", label: "cyan", icon: "#iconTheme", group: "group2" },
            { attrName: "info-color", value: "blue", label: "blue", icon: "#iconTheme", group: "group2" },
            { attrName: "info-color", value: "purple", label: "purple", icon: "#iconTheme", group: "group2" },
            { attrName: "info-color", value: "pink", label: "pink", icon: "#iconTheme", group: "group2" },
            { attrName: "info-color", value: "black", label: "black", icon: "#iconTheme", group: "group2" },
            { attrName: "info-color", value: "gray", label: "gray", icon: "#iconTheme", group: "group2" }
        ];
        this.importantStyleOptions = [
            { attrName: "style", value: "重要", label: "recovercallout", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "重要2", label: "blockstyleleftborder", icon: "#iconTheme", group: "group1" },
            { attrName: "important-color", value: "themecolor", label: "themecolor", icon: "#iconTheme", group: "group2" },
            { attrName: "important-color", value: "red", label: "red", icon: "#iconTheme", group: "group2" },
            { attrName: "important-color", value: "orange", label: "orange", icon: "#iconTheme", group: "group2" },
            { attrName: "important-color", value: "yellow", label: "yellow", icon: "#iconTheme", group: "group2" },
            { attrName: "important-color", value: "green", label: "green", icon: "#iconTheme", group: "group2" },
            { attrName: "important-color", value: "cyan", label: "cyan", icon: "#iconTheme", group: "group2" },
            { attrName: "important-color", value: "blue", label: "blue", icon: "#iconTheme", group: "group2" },
            { attrName: "important-color", value: "purple", label: "purple", icon: "#iconTheme", group: "group2" },
            { attrName: "important-color", value: "pink", label: "pink", icon: "#iconTheme", group: "group2" },
            { attrName: "important-color", value: "black", label: "black", icon: "#iconTheme", group: "group2" },
            { attrName: "important-color", value: "gray", label: "gray", icon: "#iconTheme", group: "group2" }
        ];
        this.commentStyleOptions = [
            { attrName: "style", value: "批注", label: "recovercallout", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "批注2", label: "blockstyleleftborder", icon: "#iconTheme", group: "group1" },
            { attrName: "comment-color", value: "themecolor", label: "themecolor", icon: "#iconTheme", group: "group2" },
            { attrName: "comment-color", value: "red", label: "red", icon: "#iconTheme", group: "group2" },
            { attrName: "comment-color", value: "orange", label: "orange", icon: "#iconTheme", group: "group2" },
            { attrName: "comment-color", value: "yellow", label: "yellow", icon: "#iconTheme", group: "group2" },
            { attrName: "comment-color", value: "green", label: "green", icon: "#iconTheme", group: "group2" },
            { attrName: "comment-color", value: "cyan", label: "cyan", icon: "#iconTheme", group: "group2" },
            { attrName: "comment-color", value: "blue", label: "blue", icon: "#iconTheme", group: "group2" },
            { attrName: "comment-color", value: "purple", label: "purple", icon: "#iconTheme", group: "group2" },
            { attrName: "comment-color", value: "pink", label: "pink", icon: "#iconTheme", group: "group2" },
            { attrName: "comment-color", value: "black", label: "black", icon: "#iconTheme", group: "group2" },
            { attrName: "comment-color", value: "gray", label: "gray", icon: "#iconTheme", group: "group2" }
        ];
        this.quoteStyleOptions = [
            { attrName: "style", value: "引用", label: "recovercallout", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "引用2", label: "blockstyleleftborder", icon: "#iconTheme", group: "group1" },
            { attrName: "quote-color", value: "themecolor", label: "themecolor", icon: "#iconTheme", group: "group2" },
            { attrName: "quote-color", value: "red", label: "red", icon: "#iconTheme", group: "group2" },
            { attrName: "quote-color", value: "orange", label: "orange", icon: "#iconTheme", group: "group2" },
            { attrName: "quote-color", value: "yellow", label: "yellow", icon: "#iconTheme", group: "group2" },
            { attrName: "quote-color", value: "green", label: "green", icon: "#iconTheme", group: "group2" },
            { attrName: "quote-color", value: "cyan", label: "cyan", icon: "#iconTheme", group: "group2" },
            { attrName: "quote-color", value: "blue", label: "blue", icon: "#iconTheme", group: "group2" },
            { attrName: "quote-color", value: "purple", label: "purple", icon: "#iconTheme", group: "group2" },
            { attrName: "quote-color", value: "pink", label: "pink", icon: "#iconTheme", group: "group2" },
            { attrName: "quote-color", value: "black", label: "black", icon: "#iconTheme", group: "group2" },
            { attrName: "quote-color", value: "gray", label: "gray", icon: "#iconTheme", group: "group2" }
        ];
        this.todoStyleOptions = [
            { attrName: "style", value: "待办", label: "recovercallout", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "待办2", label: "blockstyleleftborder", icon: "#iconTheme", group: "group1" },
            { attrName: "todo-color", value: "themecolor", label: "themecolor", icon: "#iconTheme", group: "group2" },
            { attrName: "todo-color", value: "red", label: "red", icon: "#iconTheme", group: "group2" },
            { attrName: "todo-color", value: "orange", label: "orange", icon: "#iconTheme", group: "group2" },
            { attrName: "todo-color", value: "yellow", label: "yellow", icon: "#iconTheme", group: "group2" },
            { attrName: "todo-color", value: "green", label: "green", icon: "#iconTheme", group: "group2" },
            { attrName: "todo-color", value: "cyan", label: "cyan", icon: "#iconTheme", group: "group2" },
            { attrName: "todo-color", value: "blue", label: "blue", icon: "#iconTheme", group: "group2" },
            { attrName: "todo-color", value: "purple", label: "purple", icon: "#iconTheme", group: "group2" },
            { attrName: "todo-color", value: "pink", label: "pink", icon: "#iconTheme", group: "group2" },
            { attrName: "todo-color", value: "black", label: "black", icon: "#iconTheme", group: "group2" },
            { attrName: "todo-color", value: "gray", label: "gray", icon: "#iconTheme", group: "group2" }
        ];
        this.doneStyleOptions = [
            { attrName: "style", value: "完成", label: "recovercallout", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "完成2", label: "blockstyleleftborder", icon: "#iconTheme", group: "group1" },
            { attrName: "done-color", value: "themecolor", label: "themecolor", icon: "#iconTheme", group: "group2" },
            { attrName: "done-color", value: "red", label: "red", icon: "#iconTheme", group: "group2" },
            { attrName: "done-color", value: "orange", label: "orange", icon: "#iconTheme", group: "group2" },
            { attrName: "done-color", value: "yellow", label: "yellow", icon: "#iconTheme", group: "group2" },
            { attrName: "done-color", value: "green", label: "green", icon: "#iconTheme", group: "group2" },
            { attrName: "done-color", value: "cyan", label: "cyan", icon: "#iconTheme", group: "group2" },
            { attrName: "done-color", value: "blue", label: "blue", icon: "#iconTheme", group: "group2" },
            { attrName: "done-color", value: "purple", label: "purple", icon: "#iconTheme", group: "group2" },
            { attrName: "done-color", value: "pink", label: "pink", icon: "#iconTheme", group: "group2" },
            { attrName: "done-color", value: "black", label: "black", icon: "#iconTheme", group: "group2" },
            { attrName: "done-color", value: "gray", label: "gray", icon: "#iconTheme", group: "group2" }
        ];
        this.fontOptions = [
            { attrName: "font-family", value: "宋体", label: "simsun", icon: "#iconFont", group: "group1", fontFamily: "SimSun" },
            { attrName: "font-family", value: "幼圆", label: "youyuan", icon: "#iconFont", group: "group1", fontFamily: "YouYuan" },
            { attrName: "font-family", value: "黑体", label: "simhei", icon: "#iconFont", group: "group1", fontFamily: "SimHei" },
            { attrName: "font-family", value: "微软雅黑", label: "microsoft_yahei", icon: "#iconFont", group: "group1", fontFamily: "Microsoft YaHei" },
            { attrName: "font-family", value: "新宋体", label: "nsimsun", icon: "#iconFont", group: "group1", fontFamily: "NSimSun" },
            { attrName: "font-family", value: "楷体", label: "kaiti", icon: "#iconFont", group: "group1", fontFamily: "KaiTi" },
            { attrName: "font-family", value: "隶书", label: "lisu", icon: "#iconFont", group: "group1", fontFamily: "LiSu" },
            { attrName: "font-family", value: "仿宋", label: "fangsong", icon: "#iconFont", group: "group1", fontFamily: "FangSong" },
            { attrName: "font-family", value: "华文宋体", label: "stsong", icon: "#iconFont", group: "group1", fontFamily: "STSong" },
            { attrName: "font-family", value: "华文中宋", label: "stzhongsong", icon: "#iconFont", group: "group1", fontFamily: "STZhongsong" },
            { attrName: "font-family", value: "华文仿宋", label: "stfangsong", icon: "#iconFont", group: "group1", fontFamily: "STFangsong" },
            { attrName: "font-family", value: "华文彩云", label: "stcaiyun", icon: "#iconFont", group: "group1", fontFamily: "STCaiyun" },
            { attrName: "font-family", value: "华文新魏", label: "stxinwei", icon: "#iconFont", group: "group1", fontFamily: "STXinwei" },
            { attrName: "font-family", value: "华文楷体", label: "stkaiti", icon: "#iconFont", group: "group1", fontFamily: "STKaiti" },
            { attrName: "font-family", value: "华文琥珀", label: "sthupo", icon: "#iconFont", group: "group1", fontFamily: "STHupo" },
            { attrName: "font-family", value: "华文细黑", label: "stxihei", icon: "#iconFont", group: "group1", fontFamily: "STXihei" },
            { attrName: "font-family", value: "华文行楷", label: "stxingkai", icon: "#iconFont", group: "group1", fontFamily: "STXingkai" },
            { attrName: "font-family", value: "华文隶书", label: "stliti", icon: "#iconFont", group: "group1", fontFamily: "STLiti" },
            { attrName: "font-family", value: "方正姚体", label: "fzyaoti", icon: "#iconFont", group: "group1", fontFamily: "FZYaoti" },
            { attrName: "font-family", value: "方正舒体", label: "fzshuti", icon: "#iconFont", group: "group1", fontFamily: "FZShuTi" },
            { attrName: "font-family", value: "Times New Roman", label: "times_new_roman", icon: "#iconFont", group: "group1", fontFamily: "Times New Roman" }
        ];
        this.noteColorOptions = [
            { attrName: "style", value: "主题色便签", label: "themecolor", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "红色便签", label: "red", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "橙色便签", label: "orange", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "黄色便签", label: "yellow", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "绿色便签", label: "green", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "青色便签", label: "cyan", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "蓝色便签", label: "blue", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "紫色便签", label: "purple", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "粉色便签", label: "pink", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "黑色便签", label: "black", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "灰色便签", label: "gray", icon: "#iconTheme", group: "group1" }
        ];
        this.leftBorderColorOptions = [
            { attrName: "style", value: "主题色左边框", label: "themecolor", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "红左边框", label: "red", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "橙左边框", label: "orange", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "黄左边框", label: "yellow", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "绿左边框", label: "green", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "青左边框", label: "cyan", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "蓝左边框", label: "blue", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "紫左边框", label: "purple", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "粉左边框", label: "pink", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "黑左边框", label: "black", icon: "#iconTheme", group: "group1" },
            { attrName: "style", value: "灰左边框", label: "gray", icon: "#iconTheme", group: "group1" }
        ];
        this.submenuConfig = {
            noteSubmenu: { group: "group1" },
            leftBorderSubmenu: { group: "group1" },
            warningSubmenu: { group: "group1" },
            tipSubmenu: { group: "group1" },
            infoSubmenu: { group: "group1" },
            importantSubmenu: { group: "group1" },
            commentSubmenu: { group: "group1" },
            quoteSubmenu: { group: "group1" },
            todoSubmenu: { group: "group1" },
            doneSubmenu: { group: "group1" }
        };
        this.blankBlockRemindOptions = [
            { attrName: "blankblock-remind", value: "开启", label: "blankblockremindon", icon: "#iconSelect", group: null }
        ];
        this.flashCardOptions = [
            { attrName: "flashcard-blockmask", value: "blockmask", label: "blockmask", icon: "#iconRiffCard", group: "group1" },
            { attrName: "flashcard-marktoblank", value: "marktoblank", label: "MarktoBlank", icon: "#iconRiffCard", group: "group2" }
        ];
        this.timeOptions = [
            { attrName: "QYL-date", value: "dynamic", label: "insertDate", icon: "#iconClock", group: null },
            { attrName: "QYL-time", value: "dynamic", label: "insertTime", icon: "#iconClock", group: null },
            { attrName: "QYL-date-time", value: "dynamic", label: "insertDateTime", icon: "#iconClock", group: null }
        ];
        this.timeUpdateOptions = [
            { attrName: "QYL-manual", value: "manual", label: "manualSetTime", icon: "#iconEdit", group: null },
            { attrName: "QYL-update", value: "update", label: "updateToCurrentTime", icon: "#iconRefresh", group: null }
        ];
    }
}
