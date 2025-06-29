
export class MenuData {
    constructor() {
        
        this.colors = [
            { value: "红色", label: "red", icon: "#iconQuote" },
            { value: "橙色", label: "orange", icon: "#iconQuote" },
            { value: "黄色", label: "yellow", icon: "#iconQuote" },
            { value: "绿色", label: "green", icon: "#iconQuote" },
            { value: "青色", label: "cyan", icon: "#iconQuote" },
            { value: "蓝色", label: "blue", icon: "#iconQuote" },
            { value: "紫色", label: "purple", icon: "#iconQuote" },
            { value: "粉色", label: "pink", icon: "#iconQuote" },
            { value: "黑色", label: "black", icon: "#iconQuote" },
            { value: "灰色", label: "gray", icon: "#iconQuote" }
        ];
        
        this.colsBGapOptions = [
            { value: "水平连续排列", label: "colsblianxu", icon: "#iconSuper" },
            { value: "水平紧凑排列", label: "colsbjincou", icon: "#iconSuper" },
            { value: "水平较紧凑排列", label: "colsbjiaojincou", icon: "#iconSuper" },
            { value: "水平较宽松排列", label: "colsbjiaokuansong", icon: "#iconSuper" },
            { value: "水平宽松排列", label: "colsbkuansong", icon: "#iconSuper" }
        ];
        
        this.rowsBGapOptions = [
            { value: "垂直连续排列", label: "rowsblianxu", icon: "#iconSuper" },
            { value: "垂直宽松排列", label: "rowsbkuansong", icon: "#iconSuper" },
            { value: "垂直软换行排列", label: "rowsbruanhuanhang", icon: "#iconSuper" }
        ];
        
        this.listViewOptions = [
            { value: "脑图", label: "listviewmindmap", icon: "#iconGlobalGraph" },
            { value: "看板", label: "listviewkanban", icon: "#iconMenu" },
            { value: "表格", label: "listviewtable", icon: "#iconTable" },
            { value: "", label: "listviewdefault", icon: "#iconList" }
        ];
        
        this.lineHeightOptions = [
            { value: "单倍行距", label: "lineheight1", icon: "#iconContract" },
            { value: "1.5倍行距", label: "lineheight15", icon: "#iconContract" },
            { value: "1.8倍行距", label: "lineheight18", icon: "#iconContract" },
            { value: "双倍行距", label: "lineheight2", icon: "#iconContract" }
        ];
        
        this.tableStyleOptions = [
            { value: "三线表", label: "threeline", icon: "#iconTable", attrName: "table-style" },
            { value: "强化表头", label: "theadhl", icon: "#iconTable", attrName: "table-style-thead" },
            { value: "全宽表格", label: "tablewidth100", icon: "#iconTable", attrName: "table-width" }
        ];
        
        this.headingStyleOptions = [
            { value: "多彩", label: "headingstylecolorful", icon: "#iconHeadings", attrName: "h-style" },
            { value: "故障", label: "headingstyleglitch", icon: "#iconHeadings", attrName: "h-style" },
            { value: "金箔", label: "headingstylegold", icon: "#iconHeadings", attrName: "h-style" },
            { value: "下划线", label: "headingstyleunderline", icon: "#iconHeadings", attrName: "h-style-u" },
            { value: "左边框", label: "headingstyleleftborder", icon: "#iconHeadings", attrName: "h-style-u" },
            { value: "层级", label: "headingstylelevel", icon: "#iconHeadings", attrName: "h-style-l" }
        ];
        
        this.imgStyleOptions = [
            { value: "圆角", label: "imgstyleroundedcorners", icon: "#iconImage", attrName: "img-border" },
            { value: "圆形", label: "imgstylecircle", icon: "#iconImage", attrName: "img-border" },
            { value: "立体", label: "imgstyleshadow", icon: "#iconImage", attrName: "img-shadow" },
            { value: "反色", label: "imgstyleinvert", icon: "#iconImage", attrName: "img-invert" },
            { value: "九宫格排列", label: "imgstyle33grid", icon: "#iconImage", attrName: "img-display" }
        ];
        
        this.heightOptions = [
            { value: "50", label: "maxheight50", icon: "#iconContract" },
            { value: "100", label: "maxheight100", icon: "#iconContract" },
            { value: "150", label: "maxheight150", icon: "#iconContract" },
            { value: "200", label: "maxheight200", icon: "#iconContract" },
            { value: "300", label: "maxheight300", icon: "#iconContract" },
            { value: "400", label: "maxheight400", icon: "#iconContract" },
            { value: "500", label: "maxheight500", icon: "#iconContract" }
        ];
        
        this.fileStyleOptions = [
            { value: "洒金纸", label: "fileblockstylesajinzhi", icon: "#iconTheme" },
            { value: "网格", label: "fileblockstylegrid", icon: "#iconTheme" },
            { value: "格点", label: "fileblockstyledot", icon: "#iconTheme" }
        ];
        
        this.blockStyleOptions = [
            { value: "警告", label: "blockstylewarning", icon: "#iconTheme" },
            { value: "灵感", label: "blockstyletip", icon: "#iconTheme" },
            { value: "信息", label: "blockstyleinfo", icon: "#iconTheme" },
            { value: "重要", label: "blockstyleimportant", icon: "#iconTheme" },
            { value: "批注", label: "blockstylecomment", icon: "#iconTheme" },
            { value: "引用", label: "blockstylequote", icon: "#iconTheme" },
            { value: "待办", label: "blockstyletodo", icon: "#iconTheme" },
            { value: "完成", label: "blockstyledone", icon: "#iconTheme" },
            { value: "洒金纸", label: "blockstylesajinzhi", icon: "#iconTheme" },
            { value: "网格", label: "blockstylegrid", icon: "#iconTheme" },
            { value: "格点", label: "blockstyledot", icon: "#iconTheme" }
        ];
        
        this.fontOptions = [
            { value: "宋体", label: "宋体", fontFamily: "SimSun" },
            { value: "幼圆", label: "幼圆", fontFamily: "YouYuan" },
            { value: "黑体", label: "黑体", fontFamily: "SimHei" },
            { value: "微软雅黑", label: "微软雅黑", fontFamily: "Microsoft YaHei" },
            { value: "新宋体", label: "新宋体", fontFamily: "NSimSun" },
            { value: "楷体", label: "楷体", fontFamily: "KaiTi" },
            { value: "隶书", label: "隶书", fontFamily: "LiSu" },
            { value: "仿宋", label: "仿宋", fontFamily: "FangSong" },
            { value: "华文宋体", label: "华文宋体", fontFamily: "STSong" },
            { value: "华文中宋", label: "华文中宋", fontFamily: "STZhongsong" },
            { value: "华文仿宋", label: "华文仿宋", fontFamily: "STFangsong" },
            { value: "华文彩云", label: "华文彩云", fontFamily: "STCaiyun" },
            { value: "华文新魏", label: "华文新魏", fontFamily: "STXinwei" },
            { value: "华文楷体", label: "华文楷体", fontFamily: "STKaiti" },
            { value: "华文琥珀", label: "华文琥珀", fontFamily: "STHupo" },
            { value: "华文细黑", label: "华文细黑", fontFamily: "STXihei" },
            { value: "华文行楷", label: "华文行楷", fontFamily: "STXingkai" },
            { value: "华文隶书", label: "华文隶书", fontFamily: "STLiti" },
            { value: "方正姚体", label: "方正姚体", fontFamily: "FZYaoti" },
            { value: "方正舒体", label: "方正舒体", fontFamily: "FZShuTi" },
            { value: "Times New Roman", label: "Times New Roman", fontFamily: "Times New Roman" }
        ];
        
        this.noteColorOptions = [
            { value: "红色便签", label: "red", icon: "#iconTheme" },
            { value: "橙色便签", label: "orange", icon: "#iconTheme" },
            { value: "黄色便签", label: "yellow", icon: "#iconTheme" },
            { value: "绿色便签", label: "green", icon: "#iconTheme" },
            { value: "青色便签", label: "cyan", icon: "#iconTheme" },
            { value: "蓝色便签", label: "blue", icon: "#iconTheme" },
            { value: "紫色便签", label: "purple", icon: "#iconTheme" },
            { value: "粉色便签", label: "pink", icon: "#iconTheme" },
            { value: "黑色便签", label: "black", icon: "#iconTheme" },
            { value: "灰色便签", label: "gray", icon: "#iconTheme" }
        ];
        
        this.leftBorderColorOptions = [
            { value: "红左边框", label: "red", icon: "#iconTheme" },
            { value: "橙左边框", label: "orange", icon: "#iconTheme" },
            { value: "黄左边框", label: "yellow", icon: "#iconTheme" },
            { value: "绿左边框", label: "green", icon: "#iconTheme" },
            { value: "青左边框", label: "cyan", icon: "#iconTheme" },
            { value: "蓝左边框", label: "blue", icon: "#iconTheme" },
            { value: "紫左边框", label: "purple", icon: "#iconTheme" },
            { value: "粉左边框", label: "pink", icon: "#iconTheme" },
            { value: "黑左边框", label: "black", icon: "#iconTheme" },
            { value: "灰左边框", label: "gray", icon: "#iconTheme" }
        ];
    }
}
