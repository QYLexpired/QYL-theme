//思源API
async function putFile(path, content = '', isDir = false) {
    const formData = new FormData();
    formData.append("path", path);
    formData.append("isDir", isDir)
    formData.append("file", new Blob([content]));
    const result = await fetch("/api/file/putFile", {
        method: "POST",
        body: formData,
    });
    const json = await result.json();
    return json;
}
async function getFile(path) {
    return fetch("/api/file/getFile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            path,
        }),
    }).then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Failed to get file content");
        }
    }).catch((error) => {
        console.error(error);
    });
}

//i18n
const I18N = {
    zh_CN: {
        QYLztsz: ' QYL主题设置',
        QYLshowall: ' 列出所有选项',
        QYLsubbj: ' 布局',
        QYLsubfg: ' 风格',
        QYLsubgn: ' 功能',
        QYLsubys: ' 元素',
        QYLsubps: ' 配色',
        QYLbjwk: ' 标记挖空',
        QYLsjx: ' 文档树和大纲缩进线',
        QYLycdl: ' 隐藏顶栏',
        QYLdlrh: ' 顶栏融合',
        QYLhoverhighlight: ' 鼠标所在块高亮提示',
        QYLsbhoverhighlight: ' 鼠标所在超级块范围提示',
        QYLfocushighlight: ' 聚焦块高亮提示',
        QYLqkxs: ' 编辑器全宽显示',
        QYLdcwds: ' 多彩文档树',
        QYLztdh: ' 主题动画',
        QYLmbl: ' 毛玻璃效果',
        QYLdcbq: ' 多彩标签和多彩行级代码',
        QYLdcbt: ' 多彩标题和多彩大纲',
        QYLczyq: ' 垂直页签',
        QYLmsp: ' 墨水屏模式',
        QYLbkhwds: ' 边框化文档树',
        QYLlbfzx: ' 列表辅助线',
        QYLxyps: ' 配色：夕阳',
        QYLslps: ' 配色：森林',
        QYLhyps: ' 配色：海洋',
        QYLtgps: ' 配色：糖果',
        QYLxycps: ' 配色：薰衣草',
        QYLywps: ' 配色：云雾',
        QYLshps: ' 配色：霜禾',
        QYLhyhyps: ' 配色：回忆',
        QYLhpps: ' 配色：湖畔',
        QYLxxlps: ' 配色：香雪兰',
        QYLxyyps: ' 配色：象牙',
        QYLshhps: ' 配色：珊瑚',
        QYLbhps: ' 配色：薄荷',
        QYLqnps: ' 配色：青柠',
        QYLhqqps: ' 配色：灰雀',
        QYLjqps: ' 配色：金秋',
        QYLbphfg: ' 扁平化风格',
        QYLcjsdl: ' 沉浸式顶栏',
        QYLzzbj: ' 专注编辑模式',
        QYLtpjgg: ' 启用图片九宫格排列',
        QYLzsbj: ' 撞色布局',
        QYLycyqmbx: ' 隐藏页签和面包屑<sup style="font-style: italic; vertical-align: 1px; font-size: 10px">🧪实验性</sup>',
        QYLqgjm: ' 全高界面<sup style="font-style: italic; vertical-align: 1px; font-size: 10px">🧪实验性</sup>',
        QYLwghsslb: ' 网格化搜索列表',
    },
    en_US: {
        QYLztsz: ' QYL-Theme Settings',
        QYLshowall: ' Show All Options',
        QYLsubbj: ' Layout',
        QYLsubfg: ' Style',
        QYLsubgn: ' Function',
        QYLsubys: ' Element',
        QYLsubps: ' Theme',
        QYLbjwk: ' Hide Marked Text',
        QYLsjx: ' File Tree With Indentation Guides',
        QYLycdl: ' Hide The Topbar',
        QYLdlrh: ' Tab-Integrated Top Bar',
        QYLhoverhighlight: ' Block Highlight On Mouse Hover',
        QYLsbhoverhighlight: ' Super Block Highlight On Mouse Hover',
        QYLfocushighlight: ' Highlight Block On Focus',
        QYLqkxs: ' Editor Layout With Reduced Side Padding',
        QYLdcwds: ' Colorful File Tree',
        QYLztdh: ' QYL-Theme-Based Animation Effects',
        QYLmbl: ' Frosted Glass Effect',
        QYLdcbq: ' Colorful Tags & Colorful Inline Code',
        QYLdcbt: ' Colorful Headings & Colorful Outlines',
        QYLczyq: ' Vertical Tabs',
        QYLmsp: ' E-Ink Mode',
        QYLbkhwds: ' Add Borders To The File Tree',
        QYLlbfzx: ' List Bullet Line',
        QYLxyps: ' Sunset Theme',
        QYLslps: ' Forest Theme',
        QYLhyps: ' Ocean Theme',
        QYLtgps: ' Sugar Theme',
        QYLxycps: ' Lavender Theme',
        QYLywps: ' Fog Theme',
        QYLshps: ' Frostsheaf Theme',
        QYLhyhyps: ' Memory Theme',
        QYLhpps: ' Lakeside Theme',
        QYLxxlps: ' Freesia Theme',
        QYLxyyps: ' Ivory Theme',
        QYLshhps: ' Coral Theme',
        QYLbhps: ' Mint Theme',
        QYLqnps: ' Lime Theme',
        QYLhqqps: ' Bullfinch Theme',
        QYLjqps: ' Golden Autumn Theme',
        QYLbphfg: ' Flat Style',
        QYLcjsdl: ' Immersive Topbar',
        QYLzzbj: ' Focus Editing Mode',
        QYLtpjgg: ' Enable 3×3 grid layout for images',
        QYLzsbj: ' ​​Color Blocking Layout',
        QYLycyqmbx: ' Hide Tabs and Breadcrumb Trail<sup style="font-style: italic; vertical-align: 1px; font-size: 10px">🧪Experimental</sup>',
        QYLqgjm: ' Full Height Layout<sup style="font-style: italic; vertical-align: 1px; font-size: 10px">🧪Experimental</sup>',
        QYLwghsslb: ' Grid Search List',
    },
    zh_CHT: {
        QYLztsz: ' QYL主題設定',
        QYLshowall: ' 列出所有选项',
        QYLsubbj: ' 佈局',
        QYLsubfg: ' 風格',
        QYLsubgn: ' 功能',
        QYLsubys: ' 元素',
        QYLsubps: ' 配色',
        QYLbjwk: ' 標記挖空',
        QYLsjx: ' 文件樹和大綱縮進線',
        QYLycdl: ' 隱藏頂欄',
        QYLdlrh: ' 頂欄融合',
        QYLhoverhighlight: ' 滑鼠所在區塊高亮提示',
        QYLsbhoverhighlight: ' 滑鼠所在超級區塊範圍提示',
        QYLfocushighlight: ' 聚焦區塊高亮提示',
        QYLqkxs: ' 編輯器全寬顯示',
        QYLdcwds: ' 多彩文件樹',
        QYLztdh: ' 主題動畫',
        QYLmbl: ' 毛玻璃效果',
        QYLdcbq: ' 多彩標籤和多彩行級代碼',
        QYLdcbt: ' 多彩標題和多彩大綱',
        QYLczyq: ' 垂直頁籤',
        QYLmsp: ' 墨水屏模式',
        QYLbkhwds: ' 邊框化文檔樹​',
        QYLlbfzx: ' 列表輔助線',
        QYLxyps: ' 配色：夕陽',
        QYLslps: ' 配色：森林',
        QYLhyps: ' 配色：海洋',
        QYLtgps: ' 配色：糖果',
        QYLxycps: ' 配色：薰衣草',
        QYLywps: ' 配色：雲霧',
        QYLshps: ' 配色：霜禾',
        QYLhyhyps: ' 配色：回憶',
        QYLhpps: ' 配色：湖畔',
        QYLxxlps: ' 配色：香雪蘭',
        QYLxyyps: ' 配色：象牙',
        QYLshhps: ' 配色：珊瑚',
        QYLbhps: ' 配色：薄荷',
        QYLqnps: ' 配色：青柠',
        QYLhqqps: ' 配色：灰雀',
        QYLjqps: ' 配色：金秋',
        QYLbphfg: ' 扁平化風格',
        QYLcjsdl: ' 沉浸式頂欄',
        QYLzzbj: ' 專注編輯模式',
        QYLtpjgg: '啟用圖片九宮格排列',
        QYLzsbj: ' 撞色佈局',
        QYLycyqmbx: ' ​​隱藏頁籤和麵包屑導覽<sup style="font-style: italic; vertical-align: 1px; font-size: 10px">🧪實驗性</sup>',
        QYLqgjm: ' 全高界面<sup style="font-style: italic; vertical-align: 1px; font-size: 10px">🧪實驗性</sup>',
        QYLwghsslb: ' 網格化搜尋列表',
    },
};
const i18n = I18N[window.siyuan.config.lang] || I18N.en_US;

// 添加Q按钮
(function() {
    addThemeToolBar();
})();
function addThemeToolBar() {
    const isMobile = !!window.siyuan?.mobile;
    const QYLToolBar = document.getElementById("QToolbar");
    if (!QYLToolBar) {
        const toolbarVIP = document.getElementById("toolbarVIP");
        const windowControls = document.getElementById("windowControls");
        const newToolbar = document.createElement("div");
        newToolbar.id = "QToolbar";
        newToolbar.className = "toolbar__item ariaLabel";
        newToolbar.style.width = "23.5px";
        newToolbar.style.height = "23.5px";
        newToolbar.innerHTML = `<svg t="1748926087349" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="55665"><path d="M204.8 426.666667c0 10.24 6.826667 17.066667 17.066667 17.066666s17.066667-6.826667 17.066666-17.066666c0-81.92 10.24-126.293333 37.546667-150.186667s68.266667-37.546667 150.186667-37.546667c10.24 0 17.066667-6.826667 17.066666-17.066666s-6.826667-17.066667-17.066666-17.066667c-81.92 0-126.293333-10.24-150.186667-37.546667S238.933333 98.986667 238.933333 17.066667c0-10.24-6.826667-17.066667-17.066666-17.066667S204.8 6.826667 204.8 17.066667c0 81.92-10.24 126.293333-37.546667 150.186666S98.986667 204.8 17.066667 204.8c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666c81.92 0 126.293333 10.24 150.186666 37.546667s37.546667 68.266667 37.546667 150.186667zM409.6 119.466667c30.72 0 47.786667 3.413333 54.613333 13.653333 10.24 6.826667 13.653333 23.893333 13.653334 54.613333 0 10.24 6.826667 17.066667 17.066666 17.066667s17.066667-6.826667 17.066667-17.066667c0-30.72 3.413333-47.786667 13.653333-54.613333 10.24-10.24 23.893333-13.653333 54.613334-13.653333 10.24 0 17.066667-6.826667 17.066666-17.066667s-6.826667-17.066667-17.066666-17.066667c-30.72 0-47.786667-3.413333-54.613334-13.653333-10.24-6.826667-13.653333-23.893333-13.653333-54.613333 0-10.24-6.826667-17.066667-17.066667-17.066667s-17.066667 6.826667-17.066666 17.066667c0 30.72-3.413333 47.786667-13.653334 54.613333-10.24 10.24-23.893333 13.653333-54.613333 13.653333-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066667zM433.493333 488.106667c-17.066667-17.066667-23.893333-44.373333-23.893333-95.573334 0-10.24-6.826667-17.066667-17.066667-17.066666s-17.066667 6.826667-17.066666 17.066666c0 54.613333-6.826667 81.92-23.893334 95.573334-13.653333 17.066667-40.96 23.893333-95.573333 23.893333-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666c54.613333 0 81.92 6.826667 95.573333 23.893334 17.066667 17.066667 23.893333 44.373333 23.893334 95.573333 0 10.24 6.826667 17.066667 17.066666 17.066667s17.066667-6.826667 17.066667-17.066667c0-54.613333 6.826667-81.92 23.893333-95.573333 17.066667-17.066667 44.373333-23.893333 95.573334-23.893334 10.24 0 17.066667-6.826667 17.066666-17.066666s-6.826667-17.066667-17.066666-17.066667c-54.613333 0-81.92-6.826667-95.573334-23.893333z" fill="" p-id="55666"></path><path d="M737.28 109.226667c-6.826667-3.413333-13.653333 0-20.48 3.413333-3.413333 3.413333-6.826667 13.653333-3.413333 20.48C737.28 187.733333 750.933333 245.76 750.933333 307.2c0 245.76-197.973333 443.733333-443.733333 443.733333-61.44 0-119.466667-13.653333-177.493333-37.546666-6.826667-3.413333-13.653333 0-20.48 3.413333s-6.826667 13.653333-3.413334 20.48C184.32 911.36 354.986667 1024 546.133333 1024c262.826667 0 477.866667-215.04 477.866667-477.866667 0-191.146667-112.64-361.813333-286.72-436.906666z" fill="" p-id="55667"></path></svg>`;
        newToolbar.ariaLabel = i18n.QYLztsz;
        newToolbar.style.userSelect = 'none';
        const handleToolbarClick = () => {
            const settingsWindow = document.getElementById('QYLsettings-window');
            settingsWindow ? closeSettingsWindow() : createSettingsWindow();
        };
        if (isMobile) {
            document.body.classList.add("QYLmobile");
            newToolbar.className = "block__icon fn__flex-center ariaLabel";
            newToolbar.style.height = "14px";
            newToolbar.style.width = "14px";
            const breadcrumbButtons = document.getElementsByClassName("block__icon fn__flex-center ariaLabel");
            try {
                const firstButton = breadcrumbButtons[0];
                const container = firstButton.parentElement;
                container.insertBefore(newToolbar, firstButton);
                newToolbar.addEventListener("click", handleToolbarClick);
            } catch (error) {
                setTimeout(() => {
                    const firstButton = document.querySelector(".block__icon.fn__flex-center.ariaLabel");
                    if (firstButton) {
                        const container = firstButton.parentElement;
                        container.insertBefore(newToolbar, firstButton);
                        newToolbar.addEventListener("click", handleToolbarClick);
                    }
                }, 1000);
            }
        } else {
            const parentElement = toolbarVIP?.parentElement || windowControls?.parentElement;
            if (parentElement) {
                parentElement.insertBefore(newToolbar, toolbarVIP || windowControls);
                newToolbar.addEventListener("click", handleToolbarClick);
            }
        }
    }
}



// 设置窗口

let isChecked1;
let isChecked2;
let isChecked3;
let isChecked4;
let isChecked5;
let isChecked6;
let isChecked7;
let isChecked8;
let isChecked9;
let isChecked10;
let isChecked11;
let isChecked12;
let isChecked13;
let isChecked14;
let isChecked15;
let isChecked16;
let isChecked17;
let isChecked18;
let isChecked19;
let isChecked20;
let isChecked21;
let isChecked22;
let isChecked23;
let isChecked24;
let isChecked25;
let isChecked26;
let isChecked27;
let isChecked30;
let isChecked31;
let isChecked32;
let isChecked33;
let isChecked34;
let isChecked35;
let isChecked36;
let isChecked37;
let isChecked38;
let isChecked39;
let isChecked40;
let isChecked41;
let isChecked42;
let isChecked43;
let isChecked44;

function createSettingsWindow() {
    // 检查是否已经存在设置窗口
    if (document.getElementById('QYLsettings-window')) return;

    // 创建设置窗口
    const settingsWindow = document.createElement('div');
    settingsWindow.id = 'QYLsettings-window';
    settingsWindow.style.position = 'fixed';
    settingsWindow.style.top = '32px'; 
    settingsWindow.style.backgroundColor = 'var(--QYL-filter-background-forQsettings)';
    settingsWindow.style.backdropFilter = 'var(--QYL-Aero-filter)';
    settingsWindow.style.padding = '6px';
    settingsWindow.style.border = '1px solid var(--b3-theme-surface-lighter)';
    settingsWindow.style.boxShadow = 'var(--b3-point-shadow)';
    settingsWindow.style.zIndex = '1000';
    settingsWindow.style.borderRadius = 'var(--b3-border-radius)';
    settingsWindow.style.maxHeight = '70vh';
    settingsWindow.style.overflowY = 'auto';

    const toolbar = document.getElementById('QToolbar');
    if (toolbar && settingsWindow) {
    const rect = toolbar.getBoundingClientRect();
    const distanceFromRight = window.innerWidth - rect.right;
    settingsWindow.style.right = `${Math.max(distanceFromRight, 10)}px`;

    } else {
    console.error('错误');
    }

    // 创建设置选项
    function createCheckboxPair(id, i18nKey, checked, pairName, checkboxName) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.checked = checked;
        const label = document.createElement('label');
        label.htmlFor = id;
        label.innerHTML = i18nKey;
        label.style.fontSize = '14px';
        label.style.userSelect = 'none';
        const pairContainer = document.createElement('div');
        pairContainer.className = 'checkbox-label-pair';
        pairContainer.appendChild(checkbox);
        pairContainer.appendChild(label);
        pairContainer.style.animation = 'QYLbounceRight2 0.1s';
        window[pairName] = pairContainer;
        window[checkboxName] = checkbox;
        return { pairContainer, checkbox };
    }
    createCheckboxPair('mark-empty-checkbox', i18n.QYLbjwk, isChecked1, 'QYLfunctionpair1', 'checkbox1');
    createCheckboxPair('filetree-indent-checkbox', i18n.QYLsjx, isChecked2, 'QYLfunctionpair2', 'checkbox2');
    createCheckboxPair('toolbar-hidden-checkbox', i18n.QYLycdl, isChecked3, 'QYLfunctionpair3', 'checkbox3');
    createCheckboxPair('hoverblock-remind-checkbox', i18n.QYLhoverhighlight, isChecked4, 'QYLfunctionpair4', 'checkbox4');
    createCheckboxPair('sbblock-remind-checkbox', i18n.QYLsbhoverhighlight, isChecked5, 'QYLfunctionpair5', 'checkbox5');
    createCheckboxPair('fullwidthpage-checkbox', i18n.QYLqkxs, isChecked6, 'QYLfunctionpair6', 'checkbox6');
    createCheckboxPair('colorfulfiletree-checkbox', i18n.QYLdcwds, isChecked7, 'QYLfunctionpair7', 'checkbox7');
    createCheckboxPair('focusblockremind-checkbox', i18n.QYLfocushighlight, isChecked8, 'QYLfunctionpair8', 'checkbox8');
    createCheckboxPair('QYLanimation-checkbox', i18n.QYLztdh, isChecked9, 'QYLfunctionpair9', 'checkbox9');
    createCheckboxPair('QYLAero-checkbox', i18n.QYLmbl, isChecked10, 'QYLfunctionpair10', 'checkbox10');
    createCheckboxPair('QYLbancolofultag-checkbox', i18n.QYLdcbq, isChecked11, 'QYLfunctionpair11', 'checkbox11');
    createCheckboxPair('QYLsunset-checkbox', i18n.QYLxyps, isChecked12, 'QYLfunctionpair12', 'checkbox12');
    createCheckboxPair('QYLforest-checkbox', i18n.QYLslps, isChecked13, 'QYLfunctionpair13', 'checkbox13');
    createCheckboxPair('QYLocean-checkbox', i18n.QYLhyps, isChecked14, 'QYLfunctionpair14', 'checkbox14');
    createCheckboxPair('QYLsugar-checkbox', i18n.QYLtgps, isChecked15, 'QYLfunctionpair15', 'checkbox15');
    createCheckboxPair('QYLlavender-checkbox', i18n.QYLxycps, isChecked16, 'QYLfunctionpair16', 'checkbox16');
    createCheckboxPair('QYLlfog-checkbox', i18n.QYLywps, isChecked17, 'QYLfunctionpair17', 'checkbox17');
    createCheckboxPair('QYLlinkmode-checkbox', i18n.QYLmsp, isChecked18, 'QYLfunctionpair18', 'checkbox18');
    createCheckboxPair('QYLlshuanghe-checkbox', i18n.QYLshps, isChecked19, 'QYLfunctionpair19', 'checkbox19');
    createCheckboxPair('QYLlverticaltab-checkbox', i18n.QYLczyq, isChecked20, 'QYLfunctionpair20', 'checkbox20');
    createCheckboxPair('QYLlcolorfulh-checkbox', i18n.QYLdcbt, isChecked21, 'QYLfunctionpair21', 'checkbox21');
    createCheckboxPair('QYLlfusion-checkbox', i18n.QYLdlrh, isChecked22, 'QYLfunctionpair22', 'checkbox22');
    createCheckboxPair('QYLlborderfile-checkbox', i18n.QYLbkhwds, isChecked23, 'QYLfunctionpair23', 'checkbox23');
    createCheckboxPair('QYLlihelp-checkbox', i18n.QYLlbfzx, isChecked24, 'QYLfunctionpair24', 'checkbox24');
    createCheckboxPair('QYLLime-checkbox', i18n.QYLqnps, isChecked25, 'QYLfunctionpair25', 'checkbox25');
    createCheckboxPair('QYLbullfinch-checkbox', i18n.QYLhqqps, isChecked26, 'QYLfunctionpair26', 'checkbox26');
    createCheckboxPair('QYLgoldenautumn-checkbox', i18n.QYLjqps, isChecked27, 'QYLfunctionpair27', 'checkbox27');
    createCheckboxPair('QYLlmemory-checkbox', i18n.QYLhyhyps, isChecked30, 'QYLfunctionpair30', 'checkbox30');
    createCheckboxPair('QYLllakeside-checkbox', i18n.QYLhpps, isChecked31, 'QYLfunctionpair31', 'checkbox31');
    createCheckboxPair('QYLlfreesia-checkbox', i18n.QYLxxlps, isChecked32, 'QYLfunctionpair32', 'checkbox32');
    createCheckboxPair('QYLivory-checkbox', i18n.QYLxyyps, isChecked33, 'QYLfunctionpair33', 'checkbox33');
    createCheckboxPair('QYLflatstyle-checkbox', i18n.QYLbphfg, isChecked34, 'QYLfunctionpair34', 'checkbox34');
    createCheckboxPair('QYLimmersivetopbar-checkbox', i18n.QYLcjsdl, isChecked35, 'QYLfunctionpair35', 'checkbox35');
    createCheckboxPair('QYLcoral-checkbox', i18n.QYLshhps, isChecked36, 'QYLfunctionpair36', 'checkbox36');
    createCheckboxPair('QYLmint-checkbox', i18n.QYLbhps, isChecked37, 'QYLfunctionpair37', 'checkbox37');
    createCheckboxPair('QYLfocuseditingmode-checkbox', i18n.QYLzzbj, isChecked38, 'QYLfunctionpair38', 'checkbox38');
    createCheckboxPair('QYL33grid-checkbox', i18n.QYLtpjgg, isChecked39, 'QYLfunctionpair39', 'checkbox39');
    createCheckboxPair('QYLcolorblocking-checkbox', i18n.QYLzsbj, isChecked40, 'QYLfunctionpair40', 'checkbox40');
    createCheckboxPair('QYLhidetabsbt-checkbox', i18n.QYLycyqmbx, isChecked41, 'QYLfunctionpair41', 'checkbox41');
    createCheckboxPair('QYLshowalloptions-checkbox', i18n.QYLshowall, isChecked42, 'QYLfunctionpair42', 'checkbox42');
    createCheckboxPair('QYLfullheight-checkbox', i18n.QYLqgjm, isChecked43, 'QYLfunctionpair43', 'checkbox43');
    createCheckboxPair('QYLgridsearchlist-checkbox', i18n.QYLwghsslb, isChecked44, 'QYLfunctionpair44', 'checkbox44');

    // 创建分组
    const groupMenu = document.createElement('div');
    groupMenu.id = 'QYL-settings-group-menu';
    groupMenu.style.display = 'flex';
    groupMenu.style.justifyContent = 'space-around';
    groupMenu.style.borderBottom = '1px solid var(--b3-theme-primary)';
    groupMenu.style.paddingBottom = '5px';
    const groupNames = [
        i18n.QYLsubbj, 
        i18n.QYLsubfg, 
        i18n.QYLsubgn,
        i18n.QYLsubys,
        i18n.QYLsubps,
    ];
    const contentContainer = document.createElement('div');
    contentContainer.id = 'QYL-settings-content';
    contentContainer.style.maxHeight = 'calc(70vh - 40px)';
    contentContainer.style.overflowY = 'auto';
    contentContainer.style.padding = '4px';
    const groups = groupNames.map((name, index) => {
        const menuItem = document.createElement('div');
        menuItem.textContent = name;
        menuItem.style.cursor = 'pointer';
        menuItem.style.padding = '4px 8px';
        menuItem.style.borderRadius = 'var(--b3-border-radius)';
        menuItem.addEventListener('mouseenter', () => {
            groupMenu.querySelectorAll('div').forEach(item => {
                item.style.backgroundColor = '';
            });
            menuItem.style.backgroundColor = 'var(--QYL-hover)';
            menuItem.style.color = 'var(--b3-theme-primary)';
            menuItem.style.fontWeight = 'bold';
            menuItem.style.fontSize = '15px';
            document.querySelectorAll('.settings-group').forEach(group => {
                group.style.display = 'none';
            });
            document.getElementById(`QYLgroup${index + 1}`).style.display = 'block';
        });
        if (index === 0) menuItem.style.backgroundColor = 'var(--QYL-hover)';
        menuItem.style.color = 'var(--b3-theme-primary)';
        menuItem.style.fontWeight = 'bold';
        menuItem.style.fontSize = '15px';
        groupMenu.appendChild(menuItem);
        const groupContainer = document.createElement('div');
        groupContainer.id = `QYLgroup${index + 1}`;
        groupContainer.className = 'settings-group';
        groupContainer.style.display = index === 0 ? 'block' : 'none';
        
        return groupContainer;
    });
    
    // 布局
    groups[0].appendChild(QYLfunctionpair42); //列出所有选项
    groups[0].appendChild(QYLfunctionpair3); //隐藏顶栏
    groups[0].appendChild(QYLfunctionpair22); //顶栏融合
    groups[0].appendChild(QYLfunctionpair20); //垂直页签
    groups[0].appendChild(QYLfunctionpair40); //撞色
    groups[0].appendChild(QYLfunctionpair41); //隐藏页签和面包屑
    groups[0].appendChild(QYLfunctionpair43); //全高界面

    // 风格
    groups[1].appendChild(QYLfunctionpair10); //毛玻璃
    groups[1].appendChild(QYLfunctionpair18); //墨水屏
    groups[1].appendChild(QYLfunctionpair35); //沉浸式顶栏
    groups[1].appendChild(QYLfunctionpair34); //扁平风格
    groups[1].appendChild(QYLfunctionpair9); //动画
    groups[1].appendChild(QYLfunctionpair2); //缩进线
    groups[1].appendChild(QYLfunctionpair7); //多彩文档树
    groups[1].appendChild(QYLfunctionpair23); //边框化文档树
    groups[1].appendChild(QYLfunctionpair44); //网格化搜索列表

    // 功能
    groups[2].appendChild(QYLfunctionpair38); //专注编辑模式
    groups[2].appendChild(QYLfunctionpair6); //全宽显示
    groups[2].appendChild(QYLfunctionpair1); //标记挖空
    groups[2].appendChild(QYLfunctionpair24); //列表辅助线
    groups[2].appendChild(QYLfunctionpair4); //鼠标悬停高亮
    groups[2].appendChild(QYLfunctionpair5); //超级块高亮
    groups[2].appendChild(QYLfunctionpair8); //聚焦块高亮

    // 样式
    groups[3].appendChild(QYLfunctionpair39); //图片九宫格
    groups[3].appendChild(QYLfunctionpair11); //多彩标签
    groups[3].appendChild(QYLfunctionpair21); //多彩标题

    // 配色
    groups[4].appendChild(QYLfunctionpair12);
    groups[4].appendChild(QYLfunctionpair13);
    groups[4].appendChild(QYLfunctionpair14);
    groups[4].appendChild(QYLfunctionpair15);
    groups[4].appendChild(QYLfunctionpair16);
    groups[4].appendChild(QYLfunctionpair17);
    groups[4].appendChild(QYLfunctionpair19);
    groups[4].appendChild(QYLfunctionpair25);
    groups[4].appendChild(QYLfunctionpair26);
    groups[4].appendChild(QYLfunctionpair27);
    groups[4].appendChild(QYLfunctionpair30); 
    groups[4].appendChild(QYLfunctionpair31);
    groups[4].appendChild(QYLfunctionpair32);
    groups[4].appendChild(QYLfunctionpair33);
    groups[4].appendChild(QYLfunctionpair36);
    groups[4].appendChild(QYLfunctionpair37);

    groups.forEach(group => {
        contentContainer.appendChild(group);
    });
    settingsWindow.appendChild(groupMenu);
    settingsWindow.appendChild(contentContainer);
    document.body.appendChild(settingsWindow);


// 将设置窗口添加到body
document.body.appendChild(settingsWindow);

// 保存配置到QYLconfig.json
async function saveConfig() {
    const formData = new FormData();
    formData.append('path', '/conf/QYLconfig.json');
    formData.append('isDir', 'false');
    formData.append('modTime', Math.floor(Date.now() / 1000));
    formData.append('file', new Blob([JSON.stringify({
        isChecked1: checkbox1.checked,
        isChecked2: checkbox2.checked,
        isChecked3: checkbox3.checked,
        isChecked4: checkbox4.checked,
        isChecked5: checkbox5.checked,
        isChecked6: checkbox6.checked,
        isChecked7: checkbox7.checked,
        isChecked8: checkbox8.checked,
        isChecked9: checkbox9.checked,
        isChecked10: checkbox10.checked,
        isChecked11: checkbox11.checked,
        isChecked12: checkbox12.checked,
        isChecked13: checkbox13.checked,
        isChecked14: checkbox14.checked,
        isChecked15: checkbox15.checked,
        isChecked16: checkbox16.checked,
        isChecked17: checkbox17.checked,
        isChecked18: checkbox18.checked,
        isChecked19: checkbox19.checked,
        isChecked20: checkbox20.checked,
        isChecked21: checkbox21.checked,
        isChecked22: checkbox22.checked,
        isChecked23: checkbox23.checked,
        isChecked24: checkbox24.checked,
        isChecked25: checkbox25.checked,
        isChecked26: checkbox26.checked,
        isChecked27: checkbox27.checked,
        isChecked30: checkbox30.checked,
        isChecked31: checkbox31.checked,
        isChecked32: checkbox32.checked,
        isChecked33: checkbox33.checked,
        isChecked34: checkbox34.checked,
        isChecked35: checkbox35.checked,
        isChecked36: checkbox36.checked,
        isChecked37: checkbox37.checked,
        isChecked38: checkbox38.checked,
        isChecked39: checkbox39.checked,
        isChecked40: checkbox40.checked,
        isChecked41: checkbox41.checked,
        isChecked42: checkbox42.checked,
        isChecked43: checkbox43.checked,
        isChecked44: checkbox44.checked,
    })], { type: 'application/json' }), 'QYLconfig.json');

    return fetch('/api/file/putFile', { method: 'POST', body: formData });
}

// 列出所有选项开关
checkbox42.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLshowalloptions() : disableQYLshowalloptions();
    state ? isChecked42 = true : isChecked42 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 标记挖空开关
checkbox1.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableMarkStyles() : disableMarkStyles();
    state ? isChecked1 = true : isChecked1 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 文档树缩进线开关
checkbox2.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableIndentStyle() : disableIndentStyle();
    state ? isChecked2 = true : isChecked2 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 隐藏顶栏开关
checkbox3.addEventListener('change', async function() {
    const state = this.checked;
    state ? enabletoolbarhidden() : disabletoolbarhidden();
    state ? isChecked3 = true : isChecked3 = false;
    if (isChecked22 === true) { checkbox22.click(); }
    if (isChecked40 === true) { checkbox40.click(); }//不能与撞色布局同时开启
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 鼠标所在块高亮开关
checkbox4.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablehoverblockremind() : disablehoverblockremind();
    state ? isChecked4 = true : isChecked4 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 超级块范围提示开关
checkbox5.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablesbremind() : disablesbremind();
    state ? isChecked5 = true : isChecked5 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 聚焦块高亮开关
checkbox8.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablefocusblockremind() : disablefocusblockremind();
    state ? isChecked8 = true : isChecked8 = false;
    if (isChecked38 === true) { checkbox38.click(); }//不能与专注编辑同时开启
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 全宽显示开关
checkbox6.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablefullwidth() : disablefullwidth();
    state ? isChecked6 = true : isChecked6 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 专注编辑开关
checkbox38.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLfocuseditingmode() : disableQYLfocuseditingmode();
    state ? isChecked38 = true : isChecked38 = false;
    if (isChecked8 === true) { checkbox8.click(); }//不能与聚焦块高亮同时开启
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 多彩文档树开关
checkbox7.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablecolorfulfiletree() : disablecolorfulfiletree();
    state ? isChecked7 = true : isChecked7 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 边框化文档树开关
checkbox23.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableborderfiletree() : disableborderfiletree();
    state ? isChecked23 = true : isChecked23 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 九宫格排列开关
checkbox39.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYL33grid() : disableQYL33grid();
    state ? isChecked39 = true : isChecked39 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 列表辅助线开关
checkbox24.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLlihelp() : disableQYLlihelp();
    state ? isChecked24 = true : isChecked24 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开启主题动画开关
checkbox9.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLanimation() : disableQYLanimation();
    state ? isChecked9 = true : isChecked9 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 毛玻璃效果开关
checkbox10.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLAero() : disableQYLAreo();
    state ? isChecked10 = true : isChecked10 = false;
    if (isChecked18 === true) { checkbox18.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// 多彩标签和多彩行级代码开关
checkbox11.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLcolorfultag() : disableQYLcolorfultag();
    state ? isChecked11 = true : isChecked11 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 夕阳配色开关
checkbox12.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLsunset() : disableQYLsunset();
    state ? isChecked12 = true : isChecked12 = false;
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 森林配色开关
checkbox13.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLforest() : disableQYLforest();
    state ? isChecked13 = true : isChecked13 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 海洋配色开关
checkbox14.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLocean() : disableQYLocean();
    state ? isChecked14 = true : isChecked14 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 糖果配色开关
checkbox15.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLsugar() : disableQYLsugar();
    state ? isChecked15 = true : isChecked15 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 薰衣草配色开关
checkbox16.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLlavender() : disableQYLlavender();
    state ? isChecked16 = true : isChecked16 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 云雾配色开关
checkbox17.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLfog() : disableQYLfog();
    state ? isChecked17 = true : isChecked17 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 霜禾配色开关
checkbox19.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLshuanghe() : disableQYLshuanghe();
    state ? isChecked19 = true : isChecked19 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 回忆配色开关
checkbox30.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLmemory() : disableQYLmemory();
    state ? isChecked30 = true : isChecked30 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 湖畔配色开关
checkbox31.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLlakeside() : disableQYLlakeside();
    state ? isChecked31 = true : isChecked31 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 香雪兰配色开关
checkbox32.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLfreesia() : disableQYLfreesia();
    state ? isChecked32 = true : isChecked32 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 象牙配色开关
checkbox33.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLivory() : disableQYLivory();
    state ? isChecked33 = true : isChecked33 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 珊瑚配色开关
checkbox36.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLcoral() : disableQYLcoral();
    state ? isChecked36 = true : isChecked36 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 薄荷配色开关
checkbox37.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLmint() : disableQYLmint();
    state ? isChecked37 = true : isChecked37 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 青柠配色开关
checkbox25.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLLime() : disableQYLLime();
    state ? isChecked25 = true : isChecked25 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 灰雀配色开关
checkbox26.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLbullfinch() : disableQYLbullfinch();
    state ? isChecked26 = true : isChecked26 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked27 === true) { checkbox27.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 金秋配色开关
checkbox27.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLgoldenautumn() : disableQYLgoldenautumn();
    state ? isChecked27 = true : isChecked27 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked16 === true) { checkbox16.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked32 === true) { checkbox32.click(); }
    if (isChecked33 === true) { checkbox33.click(); }
    if (isChecked36 === true) { checkbox36.click(); }
    if (isChecked37 === true) { checkbox37.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    if (isChecked26 === true) { checkbox26.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 扁平化风格开关
checkbox34.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLflatstyle() : disableQYLflatstyle();
    state ? isChecked34 = true : isChecked34 = false;
    if (isChecked18 === true) { checkbox18.click(); }//不能与墨水屏模式同时开启
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 隐藏页签和面包屑开关
checkbox41.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLhidetabsbt() : disableQYLhidetabsbt();
    state ? isChecked41 = true : isChecked41 = false;
    if (isChecked43 === true) { checkbox43.click(); }//不能与全高界面同时开启
    if (isChecked20 === true) { checkbox20.click(); }//不能与垂直页签同时开启
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// 沉浸式顶栏开关
checkbox35.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLimmersivetopbar() : disableQYLimmersivetopbar();
    state ? isChecked35 = true : isChecked35 = false;
    if (isChecked40 === true) { checkbox40.click(); }//不能与撞色布局同时开启
    if (isChecked43 === true) { checkbox43.click(); }//不能与全高界面同时开启
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 撞色布局开关
checkbox40.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLcolorblocking() : disableQYLcolorblocking();
    state ? isChecked40 = true : isChecked40 = false;
    if (isChecked35 === true) { checkbox35.click(); }//不能与沉浸式顶栏同时开启
    if (isChecked20 === true) { checkbox20.click(); }//不能与垂直页签同时开启
    if (isChecked3 === true) { checkbox3.click(); }//不能与隐藏顶栏同时开启
    if (isChecked18 === true) { checkbox18.click(); }//不能与墨水屏模式同时开启
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 全高界面开关
checkbox43.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLfullheight() : disableQYLfullheight();
    state ? isChecked43 = true : isChecked43 = false;
    if (isChecked35 === true) { checkbox35.click(); }//不能与沉浸式顶栏同时开启
    if (isChecked20 === true) { checkbox20.click(); }//不能与垂直页签同时开启
    if (isChecked18 === true) { checkbox18.click(); }//不能与墨水屏模式同时开启
    if (isChecked41 === true) { checkbox41.click(); }//不能与隐藏页签同时开启
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// 墨水屏模式开关
checkbox18.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLinkmode() : disableQYLinkmode();
    state ? isChecked18 = true : isChecked18 = false;
    if (isChecked10 === true) { checkbox10.click(); }//不能与毛玻璃同时开启
    if (isChecked34 === true) { checkbox34.click(); }//不能与扁平化风格同时开启
    if (isChecked40 === true) { checkbox40.click(); }//不能与撞色布局同时开启
    if (isChecked43 === true) { checkbox43.click(); }//不能与全高界面同时开启
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 垂直页签开关
checkbox20.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLverticaltab() : disableQYLverticaltab();
    state ? isChecked20 = true : isChecked20 = false;
    if (isChecked22 === true) { checkbox22.click(); }
    if (isChecked40 === true) { checkbox40.click(); }//不能与撞色布局同时开启
    if (isChecked43 === true) { checkbox43.click(); }//不能与全高界面同时开启
    if (isChecked41 === true) { checkbox41.click(); }//不能与隐藏页签同时开启
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 多彩标题和多彩大纲开关
checkbox21.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLcolorfulh() : disableQYLcolorfulh();
    state ? isChecked21 = true : isChecked21 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 顶栏融合开关
checkbox22.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLfusion() : disableQYLfusion();
    state ? isChecked22 = true : isChecked22 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked20 === true) { checkbox20.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 网格化搜索列表开关
checkbox44.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLgridsearchlist() : disableQYLgridsearchlist();
    state ? isChecked44 = true : isChecked44 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

    // ESC键关闭
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeSettingsWindow();
        }
    });
    // 阻止点击事件冒泡
    settingsWindow.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

 // 点击空白处关闭设置窗口
document.addEventListener('click', function(event) {
    var targetElement = event.target; // clicked element
    var settingsWindow = document.getElementById('settingsWindow');
    var qToolbar = document.getElementById('QToolbar');
    do {
        if (targetElement == settingsWindow || targetElement == qToolbar) {
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);
    closeSettingsWindow();
});

// 关闭设置窗口
function closeSettingsWindow() {
    const settingsWindow = document.getElementById('QYLsettings-window');
    if (settingsWindow) {
        document.body.removeChild(settingsWindow);
    }
}

// 开启标记挖空
function enableMarkStyles() {
    let linkElement = document.getElementById("mark-styles");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "mark-styles";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/标记挖空.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭标记挖空
function disableMarkStyles() {
    const linkElement = document.getElementById("mark-styles");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启文档树缩进线功能
function enableIndentStyle() {
    let linkElement = document.getElementById("indent-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "indent-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/文档树缩进线.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭文档树缩进功能
function disableIndentStyle() {
    const linkElement = document.getElementById("indent-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启隐藏顶栏功能
function enabletoolbarhidden() {
    let styleSheet = document.getElementById("toolbarhidden-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "toolbarhidden-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        #toolbar.toolbar {
            margin-bottom: -32px;
            opacity: 0;
            transition: all 200ms;
            transform: translateY(-30px);
            z-index: 8;
            border-bottom-right-radius: var(--b3-border-radius);
            border-bottom-left-radius: var(--b3-border-radius);
            box-shadow: var(--b3-point-shadow);
            & > * {
                transform: translateY(0.5px);
            }
        }
        #toolbar.toolbar:hover {
            opacity: 1;
            transform: translateY(0px);
            transition: all 200ms;
        }
    `;
}

// 防止窗口化时隐藏顶栏后无法呼出
function QYLcheckMaximize() {
    if (!isChecked3) {
        disabletoolbarhidden();
        return;
    }
    const threshold = 3;
    const isMaximized = 
        Math.abs(window.outerWidth - screen.availWidth) <= threshold &&
        Math.abs(window.outerHeight - screen.availHeight) <= threshold;
    const isF11Fullscreen = 
        (window.screenX === 0 && window.screenY === 0 && 
         window.outerWidth === screen.width && 
         window.outerHeight === screen.height) ||
        (window.innerHeight >= screen.availHeight - threshold);

    if (isMaximized || isF11Fullscreen) {
        enabletoolbarhidden();
    } else {
        disabletoolbarhidden();
    }
}
window.addEventListener('resize', QYLcheckMaximize);

// 关闭隐藏顶栏功能
function disabletoolbarhidden() {
    const styleSheet = document.getElementById("toolbarhidden-style");
    if (styleSheet) {
        styleSheet.innerText = `
        .toolbar {
            opacity: 1;
            transition: all 200ms;
            transform: translateY(0px);
        }
        .toolbar:hover {
            opacity: 1;
            transition: all 200ms;
            transform: translateY(0px);
        }
    `;
    }
}

// 开启鼠标所在块高亮功能
function enablehoverblockremind() {
    let styleSheet = document.getElementById("hoverblock-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "hoverblock-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .protyle-wysiwyg [data-node-id]:hover {
            box-shadow: var(--QYL-shadow-highlight) !important;
            transition: 0.3s !important;
        }
    `;
}

// 关闭鼠标所在块高亮功能
function disablehoverblockremind() {
    const styleSheet = document.getElementById("hoverblock-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启超级块范围提示功能
function enablesbremind() {
    let styleSheet = document.getElementById("sbremind-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "sbremind-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .sb:hover {
            box-shadow: var(--QYL-shadow-highlight) !important;
            transition: 0.3s !important;
        }
    `;
}

// 关闭超级块范围提示功能
function disablesbremind() {
    const styleSheet = document.getElementById("sbremind-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 关闭鼠标所在块高亮功能
function disablehoverblockremind() {
    const styleSheet = document.getElementById("hoverblock-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 聚焦块高亮
function QYLfocusblockhighlight() {
    let cachedEditor = null;
    let lastHighlightedElement = null;
    let throttledHandler = null;
    let isActive = false;
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    };
    const handleSelection = () => {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;
        const range = selection.getRangeAt(0);
        const node = range.startContainer;
        const editor = getEditorContainer(node);
        if (!editor) return;
        if (lastHighlightedElement) {
            lastHighlightedElement.classList.remove("QYLfocusblock");
            lastHighlightedElement = null;
        }
        const targetElement = (
            node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement
        ).closest("[data-node-id]");
        if (targetElement && editor.contains(targetElement)) {
            targetElement.classList.add("QYLfocusblock");
            lastHighlightedElement = targetElement;
        }
    };
    const getEditorContainer = (node) => {
        if (cachedEditor && cachedEditor.contains(node)) return cachedEditor;
        let element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
        while (element && !element.classList.contains("protyle-wysiwyg")) {
            element = element.parentElement;
        }
        cachedEditor = element || cachedEditor;
        return cachedEditor;
    };
    return {
        start() {
            if (!isActive) {
                throttledHandler = throttle(handleSelection, 100);
                document.addEventListener("selectionchange", throttledHandler);
                isActive = true;
            }
        },
        stop() {
            if (isActive) {
                document.removeEventListener("selectionchange", throttledHandler);
                if (lastHighlightedElement) {
                    lastHighlightedElement.classList.remove("QYLfocusblock");
                    lastHighlightedElement = null;
                }
                cachedEditor = null;
                isActive = false;
            }
        }
    };
}
const QYLfocusblock = QYLfocusblockhighlight();
const QYLfocusblockforfocuseditingmode = QYLfocusblockhighlight();

// 开启聚焦块高亮
function enablefocusblockremind() {
    QYLfocusblock.start();
}

// 关闭聚焦块高亮
function disablefocusblockremind() {
    QYLfocusblock.stop();
}

// 开启全宽显示功能
function enablefullwidth() {
    let styleSheet = document.getElementById("fullwidth-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "fullwidth-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .protyle-wysiwyg {
            padding-left: 20px !important;
            padding-right: 20px !important;
        }
        .protyle-title.protyle-wysiwyg--attr {
            margin-left: 20px !important;
            margin-right:20px !important;
        }
        .protyle-background__ia {
            margin-left: 20px !important;
        }
        .protyle-scroll {
            right: 6px;
        }
    `;
}

// 关闭全宽显示功能
function disablefullwidth() {
    const styleSheet = document.getElementById("fullwidth-style");
    if (styleSheet) {
        styleSheet.innerText = ` `;
    }
}

// 开启专注编辑
function enableQYLfocuseditingmode() {
    QYLfocusblockforfocuseditingmode.start();
    setTimeout(() => {
        typewriter.start();
    }, 500);

    let styleSheet = document.getElementById("QYLfocuseditingmode-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLfocuseditingmode-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :is(.layout__center, .QYLmobile #editor) .protyle-wysiwyg > [data-node-id]:not(:has(.QYLfocusblock)):not(.av) {
            opacity: 0.3;
            filter: blur(0.5px);
        }
        :is(.layout__center, .QYLmobile #editor) .protyle-wysiwyg [data-node-id].QYLfocusblock {
            opacity: 1 !important;
            filter: blur(0px) !important;
            & [data-node-id] {
                opacity: 1 !important;
                filter: blur(0px) !important;
            }
        }
        .card__main .protyle-wysiwyg > [data-node-id]:not(:has(.QYLfocusblock)):not(.av) {
            opacity: 1 !important;
            filter: blur(0px) !important;
        }
        [data-node-id].QYLfocusblock {
            box-shadow: none !important;
        }
        [data-node-id].QYLfocusblock:hover {
            box-shadow: none !important;
        }
        [data-node-id].QYLfocusblock::before {
            content: "";
            position: absolute;
            border-radius: 99px;
            top: 9px;
            height: calc(100% - 18px);
            width: 3px;
            left: -7px;
            background-color: var(--b3-theme-primary);
            animation: QYLfocusediting 0.5s cubic-bezier(0.8, 0, 0.9, 1);
        }
        @keyframes QYLfocusediting {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    `;
}

// 关闭专注编辑
function disableQYLfocuseditingmode() {
    QYLfocusblockforfocuseditingmode.stop();
    typewriter.stop();

    const styleSheet = document.getElementById("QYLfocuseditingmode-style");
    if (styleSheet) {
        styleSheet.innerText = ``;
    }
}

//专注编辑快捷键alt+w
const QYLfocuseditingmodeKeydown = (event) => {
    if (event.key.toLowerCase() === 'w' && event.altKey) {
        event.preventDefault();
        isChecked38 = !isChecked38;
        isChecked38 ? enableQYLfocuseditingmode() : disableQYLfocuseditingmode();
    }
};
document.addEventListener('keydown', QYLfocuseditingmodeKeydown);

// 开启多彩文档树功能
function enablecolorfulfiletree() {
    let linkElement = document.getElementById("colorfulfiletree-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "colorfulfiletree-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/多彩文档树.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭多彩文档树
function disablecolorfulfiletree() {
    const linkElement = document.getElementById("colorfulfiletree-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启边框化文档树
function enableborderfiletree() {
    let linkElement = document.getElementById("borderfiletree-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "borderfiletree-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/边框化文档树.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭边框化文档树
function disableborderfiletree() {
    const linkElement = document.getElementById("borderfiletree-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启九宫格排列
function enableQYL33grid() {
    let linkElement = document.getElementById("QYL33grid-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYL33grid-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/九宫格.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭九宫格排列
function disableQYL33grid() {
    const linkElement = document.getElementById("QYL33grid-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启列表辅助线
function enableQYLlihelp() {
    QYLlihelp.start();

    let linkElement = document.getElementById("QYLlihelp-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLlihelp-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/列表辅助线.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭列表辅助线
function disableQYLlihelp() {
    QYLlihelp.stop();

    const linkElement = document.getElementById("QYLlihelp-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启主题动画
function enableQYLanimation() {
    let linkElement = document.getElementById("QYLanimation-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLanimation-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/动画.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭主题动画
function disableQYLanimation() {
    const linkElement = document.getElementById("QYLanimation-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启毛玻璃效果
function enableQYLAero() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    let linkElement = document.getElementById("QYLAero-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLAero-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/毛玻璃.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭毛玻璃效果
function disableQYLAreo() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    const linkElement = document.getElementById("QYLAero-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启多彩标签和多彩行级代码
function enableQYLcolorfultag() {
    let styleElement = document.getElementById("snippet-QYLcolorfultag-style");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "snippet-QYLcolorfultag-style";
        styleElement.innerHTML = `
        /* 多彩行级代码 */
        .fn__code:nth-of-type(6n+1), .b3-typography code:not(.hljs):nth-of-type(6n+1),.b3-typography span[data-type~=code]:nth-of-type(6n+1),.protyle-wysiwyg code:not(.hljs):nth-of-type(6n+1),.protyle-wysiwyg span[data-type~=code]:nth-of-type(6n+1) {
            color: var(--QYL-coloful-block-red);
            --QYL-fluorescence-code-fix: var(--QYL-coloful-block-red);
        }
        .fn__code:nth-of-type(6n+2), .b3-typography code:not(.hljs):nth-of-type(6n+2),.b3-typography span[data-type~=code]:nth-of-type(6n+2),.protyle-wysiwyg code:not(.hljs):nth-of-type(6n+2),.protyle-wysiwyg span[data-type~=code]:nth-of-type(6n+2) {
            color: var(--QYL-coloful-block-orange);
            --QYL-fluorescence-code-fix: var(--QYL-coloful-block-orange);
        }
        .fn__code:nth-of-type(6n+3), .b3-typography code:not(.hljs):nth-of-type(6n+3),.b3-typography span[data-type~=code]:nth-of-type(6n+3),.protyle-wysiwyg code:not(.hljs):nth-of-type(6n+3),.protyle-wysiwyg span[data-type~=code]:nth-of-type(6n+3) {
            color: var(--QYL-coloful-block-green);
            --QYL-fluorescence-code-fix: var(--QYL-coloful-block-green);
        }
        .fn__code:nth-of-type(6n+4), .b3-typography code:not(.hljs):nth-of-type(6n+4),.b3-typography span[data-type~=code]:nth-of-type(6n+4),.protyle-wysiwyg code:not(.hljs):nth-of-type(6n+4),.protyle-wysiwyg span[data-type~=code]:nth-of-type(6n+4) {
            color: var(--QYL-coloful-block-blue);
            --QYL-fluorescence-code-fix: var(--QYL-coloful-block-blue);
        }
        .fn__code:nth-of-type(6n+5), .b3-typography code:not(.hljs):nth-of-type(6n+5),.b3-typography span[data-type~=code]:nth-of-type(6n+5),.protyle-wysiwyg code:not(.hljs):nth-of-type(6n+5),.protyle-wysiwyg span[data-type~=code]:nth-of-type(6n+5) {
            color: var(--QYL-coloful-block-purple);
            --QYL-fluorescence-code-fix: var(--QYL-coloful-block-purple);
        }
        .fn__code:nth-of-type(6n+6), .b3-typography code:not(.hljs):nth-of-type(6n+6),.b3-typography span[data-type~=code]:nth-of-type(6n+6),.protyle-wysiwyg code:not(.hljs):nth-of-type(6n+6),.protyle-wysiwyg span[data-type~=code]:nth-of-type(6n+6) {
            color: var(--QYL-coloful-block-pink);
            --QYL-fluorescence-code-fix: var(--QYL-coloful-block-pink);
        }
        /* 多彩标签 */
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+1) {
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: rgba(from var(--QYL-custom-red) r g b/0.7);
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+1)::before {
            content: '';
            display: inline-block;
            width: 0.4em;
            height: 0.4em;
            top: -0.08em;
            border-radius: 50%;
            background-color: currentColor;
            margin-right: 0.4em;
            position: relative;
            vertical-align: middle;
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+2) {
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: rgba(from var(--QYL-custom-orange) r g b/0.7);
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+2)::before {
            content: '';
            display: inline-block;
            width: 0.4em;
            height: 0.4em;
            top: -0.08em;
            border-radius: 50%;
            background-color: currentColor;
            margin-right: 0.4em;
            position: relative;
            vertical-align: middle;
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+3) {
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: rgba(from var(--QYL-custom-green) r g b/0.7);
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+3)::before {
            content: '';
            display: inline-block;
            width: 0.4em;
            height: 0.4em;
            top: -0.08em;
            border-radius: 50%;
            background-color: currentColor;
            margin-right: 0.4em;
            position: relative;
            vertical-align: middle;
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+4) {
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: rgba(from var(--QYL-custom-blue) r g b/0.7);
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+4)::before {
            content: '';
            display: inline-block;
            width: 0.4em;
            height: 0.4em;
            top: -0.08em;
            border-radius: 50%;
            background-color: currentColor;
            margin-right: 0.4em;
            position: relative;
            vertical-align: middle;
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+5) {
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: rgba(from var(--QYL-custom-purple) r g b/0.7);
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+5)::before {
            content: '';
            display: inline-block;
            width: 0.4em;
            height: 0.4em;
            top: -0.08em;
            border-radius: 50%;
            background-color: currentColor;
            margin-right: 0.4em;
            position: relative;
            vertical-align: middle;
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+6) {
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: rgba(from var(--QYL-custom-pink) r g b/0.7);
            &:hover {
                background-color: var(--b3-theme-primary);
            }
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:nth-of-type(6n+6)::before {
            content: '';
            display: inline-block;
            width: 0.4em;
            height: 0.4em;
            top: -0.08em;
            border-radius: 50%;
            background-color: currentColor;
            margin-right: 0.4em;
            position: relative;
            vertical-align: middle;
        }`;
        document.head.appendChild(styleElement);
    }
}

// 关闭开启多彩标签和多彩行级代码
function disableQYLcolorfultag() {
    const styleElement = document.getElementById("snippet-QYLcolorfultag-style");
    if (styleElement) {
        styleElement.remove();
    }
}

// 开启夕阳配色
function enableQYLsunset() {
    let linkElement = document.getElementById("QYLsunset-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLsunset-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/夕阳配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭夕阳配色
function disableQYLsunset() {
    const linkElement = document.getElementById("QYLsunset-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启森林配色
function enableQYLforest() {
    let linkElement = document.getElementById("QYLforest-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLforest-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/森林配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭森林配色
function disableQYLforest() {
    const linkElement = document.getElementById("QYLforest-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}
// 开启海洋配色
function enableQYLocean() {
    let linkElement = document.getElementById("QYLocean-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLocean-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/海洋配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭海洋配色
function disableQYLocean() {
    const linkElement = document.getElementById("QYLocean-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开启糖果配色
function enableQYLsugar() {
    let linkElement = document.getElementById("QYLsugar-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLsugar-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/糖果配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭糖果配色
function disableQYLsugar() {
    const linkElement = document.getElementById("QYLsugar-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
} 

// 开启薰衣草配色
function enableQYLlavender() {
    let linkElement = document.getElementById("QYLlavender-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLlavender-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/薰衣草配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭薰衣草配色
function disableQYLlavender() {
    const linkElement = document.getElementById("QYLlavender-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
} 

// 开启云雾配色
function enableQYLfog() {
    let linkElement = document.getElementById("QYLfog-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLfog-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/云雾配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭云雾配色
function disableQYLfog() {
    const linkElement = document.getElementById("QYLfog-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
} 

// 开启墨水屏模式
function enableQYLinkmode() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    let linkElement = document.getElementById("QYLinkmode-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLinkmode-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/墨水屏.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭墨水屏模式
function disableQYLinkmode() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    const linkElement = document.getElementById("QYLinkmode-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启霜禾配色
function enableQYLshuanghe() {
    let linkElement = document.getElementById("QYLshuanghe-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLshuanghe-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/霜禾配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭霜禾配色
function disableQYLshuanghe() {
    const linkElement = document.getElementById("QYLshuanghe-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启回忆配色
function enableQYLmemory() {
    let linkElement = document.getElementById("QYLmemory-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLmemory-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/回忆配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭回忆配色
function disableQYLmemory() {
    const linkElement = document.getElementById("QYLmemory-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启湖畔配色
function enableQYLlakeside() {
    let linkElement = document.getElementById("QYLlakeside-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLlakeside-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/湖畔配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭湖畔配色
function disableQYLlakeside() {
    const linkElement = document.getElementById("QYLlakeside-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启香雪兰配色
function enableQYLfreesia() {
    let linkElement = document.getElementById("QYLfreesia-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLfreesia-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/香雪兰配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭香雪兰配色
function disableQYLfreesia() {
    const linkElement = document.getElementById("QYLfreesia-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启象牙配色
function enableQYLivory() {
    let linkElement = document.getElementById("QYLivory-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLivory-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/象牙配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭象牙配色
function disableQYLivory() {
    const linkElement = document.getElementById("QYLivory-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启珊瑚配色
function enableQYLcoral() {
    let linkElement = document.getElementById("QYLcoral-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLcoral-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/珊瑚配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭珊瑚配色
function disableQYLcoral() {
    const linkElement = document.getElementById("QYLcoral-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启薄荷配色
function enableQYLmint() {
    let linkElement = document.getElementById("QYLmint-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLmint-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/薄荷配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭薄荷配色
function disableQYLmint() {
    const linkElement = document.getElementById("QYLmint-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启青柠配色
function enableQYLLime() {
    let linkElement = document.getElementById("QYLLime-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLLime-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/青柠配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭青柠配色
function disableQYLLime() {
    const linkElement = document.getElementById("QYLLime-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启灰雀配色
function enableQYLbullfinch() {
    let linkElement = document.getElementById("QYLbullfinch-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLbullfinch-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/灰雀配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭灰雀配色
function disableQYLbullfinch() {
    const linkElement = document.getElementById("QYLbullfinch-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启金秋配色
function enableQYLgoldenautumn() {
    let linkElement = document.getElementById("QYLgoldenautumn-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLgoldenautumn-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/金秋配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭金秋配色
function disableQYLgoldenautumn() {
    const linkElement = document.getElementById("QYLgoldenautumn-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启扁平化风格
function enableQYLflatstyle() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    let linkElement = document.getElementById("QYLflatstyle-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLflatstyle-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/扁平化风格.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭扁平化风格
function disableQYLflatstyle() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    const linkElement = document.getElementById("QYLflatstyle-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启沉浸式顶栏
function enableQYLimmersivetopbar() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    let linkElement = document.getElementById("QYLimmersivetopbar-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLimmersivetopbar-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/沉浸式顶栏.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭沉浸式顶栏
function disableQYLimmersivetopbar() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    const linkElement = document.getElementById("QYLimmersivetopbar-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启隐藏页签和面包屑
function enableQYLhidetabsbt() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    let linkElement = document.getElementById("QYLhidetabsbt-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLhidetabsbt-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/隐藏页签和面包屑.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭隐藏页签和面包屑
function disableQYLhidetabsbt() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    const linkElement = document.getElementById("QYLhidetabsbt-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启撞色布局
function enableQYLcolorblocking() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    try {
        if (typeof isChecked22 === 'boolean' && isChecked22 === false) {
            isChecked22 = true;
            enableQYLfusion();
        }
    } catch {
    }
    let linkElement = document.getElementById("QYLcolorblocking-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLcolorblocking-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/撞色布局.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭撞色布局
function disableQYLcolorblocking() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    const linkElement = document.getElementById("QYLcolorblocking-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启全高界面
function enableQYLfullheight() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    let linkElement = document.getElementById("QYLfullheight-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLfullheight-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/全高界面.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭全高界面
function disableQYLfullheight() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    const linkElement = document.getElementById("QYLfullheight-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启列出所有选项
function enableQYLshowalloptions() {
    let styleElement = document.getElementById("QYLshowalloptions-style");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "QYLshowalloptions-style";
        styleElement.innerHTML = `
        #QYLsettings-window {
            padding: 0 8px !important;
            & #QYL-settings-group-menu {
                display: none !important;
            }
            & #QYL-settings-content {
                overflow: visible !important;
                padding: 0 !important;
            }
            & #QYLgroup1, #QYLgroup2, #QYLgroup3, #QYLgroup4, #QYLgroup5 {
                display: block !important;
                padding-bottom: 4px;
                border-bottom: 1px solid var(--b3-theme-primary);
            }
            & #QYLgroup5 {
                padding-bottom: 2px;
                border-bottom: none;
            }
        }`;
        document.head.appendChild(styleElement);
    }
}

// 关闭列出所有选项
function disableQYLshowalloptions() {
    const styleElement = document.getElementById("QYLshowalloptions-style");
    if (styleElement) {
        styleElement.remove();
    }
}

// 开启多彩标题和多彩大纲
function enableQYLcolorfulh() {
    let styleElement = document.getElementById("snippet-QYLcolorfulh-style");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "snippet-QYLcolorfulh-style";
        styleElement.innerHTML = `
        :root {
            --QYL-h1: #dd5656;
            --QYL-h2: #ec963f;
            --QYL-h3: #32ae4f;
            --QYL-h4: #4573bc;
            --QYL-h5: #8859ac;
            --QYL-h6: #dc6897;
            --QYL-h1-fold: rgba(221, 86, 86, 0.4);
            --QYL-h1-fold-background: rgba(221, 86, 86, 0.1);
            --QYL-h2-fold: rgba(236, 149, 63, 0.4);
            --QYL-h2-fold-background: rgba(236, 149, 63, 0.1);
            --QYL-h3-fold: rgba(50, 174, 79, 0.4);
            --QYL-h3-fold-background: rgba(50, 174, 79, 0.1);
            --QYL-h4-fold: rgba(69, 115, 188, 0.4);
            --QYL-h4-fold-background: rgba(69, 115, 188, 0.1);
            --QYL-h5-fold: rgba(136, 89, 172, 0.4);
            --QYL-h5-fold-background: rgba(136, 89, 172, 0.1);
            --QYL-h6-fold: rgba(220, 104, 150, 0.4);
            --QYL-h6-fold-background: rgba(220, 104, 150, 0.1);
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h1"] {
            & .b3-list-item__graphic, .b3-list-item__text {
                color: var(--QYL-h1);
            }
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h2"] {
            & .b3-list-item__graphic, .b3-list-item__text {
                color: var(--QYL-h2);
            }
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h3"] {
            & .b3-list-item__graphic, .b3-list-item__text {
                color: var(--QYL-h3);
            }
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h4"] {
            & .b3-list-item__graphic, .b3-list-item__text {
                color: var(--QYL-h4);
            }
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h5"] {
            & .b3-list-item__graphic, .b3-list-item__text {
                color: var(--QYL-h5);
            }
        }
        .sy__outline .b3-list--background .b3-list-item[data-subtype="h6"] {
            & .b3-list-item__graphic, .b3-list-item__text {
                color: var(--QYL-h6);
            }
        }
        /* 手机端彩色大纲 */
        .QYLmobile [data-type="sidebar-outline"] [data-subtype="h1"] :is(.b3-list-item__graphic, .b3-list-item__text) {
            color: var(--QYL-h1);
        }
        .QYLmobile [data-type="sidebar-outline"] [data-subtype="h2"] :is(.b3-list-item__graphic, .b3-list-item__text) {
            color: var(--QYL-h2);
        }
        .QYLmobile [data-type="sidebar-outline"] [data-subtype="h3"] :is(.b3-list-item__graphic, .b3-list-item__text) {
            color: var(--QYL-h3);
        }
        .QYLmobile [data-type="sidebar-outline"] [data-subtype="h4"] :is(.b3-list-item__graphic, .b3-list-item__text) {
            color: var(--QYL-h4);
        }
        .QYLmobile [data-type="sidebar-outline"] [data-subtype="h5"] :is(.b3-list-item__graphic, .b3-list-item__text) {
            color: var(--QYL-h5);
        }
        .QYLmobile [data-type="sidebar-outline"] [data-subtype="h6"] :is(.b3-list-item__graphic, .b3-list-item__text) {
            color: var(--QYL-h6);
        }`;
        document.head.appendChild(styleElement);
    }
}

// 关闭多彩标题和多彩大纲
function disableQYLcolorfulh() {
    const styleElement = document.getElementById("snippet-QYLcolorfulh-style");
    if (styleElement) {
        styleElement.remove();
    }
}

// 开启顶栏融合
function enableQYLfusion() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }
    fusion.start();
    windowObserver.start();
    setTimeout(() => {
        QYLtrwndhandle.start();
    }, 2000);
    
    let linkElement = document.getElementById("QYLfusion-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLfusion-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/顶栏融合.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭顶栏融合
function disableQYLfusion() {
    try {
        if (typeof isChecked40 === 'boolean' && isChecked40 === true) {
            isChecked40 = false;
            disableQYLcolorblocking();
        }
    } catch {
    }
    fusion.stop();
    windowObserver.stop();
    QYLtrwndhandle.stop();

    const linkElement = document.getElementById("QYLfusion-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启垂直页签
function enableQYLverticaltab() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }

      let linkElement = document.getElementById("QYLverticaltab-style");
      if (!linkElement) {
          linkElement = document.createElement("link");
          linkElement.id = "QYLverticaltab-style";
          linkElement.rel = "stylesheet";
          linkElement.href = "/appearance/themes/QYL-theme/style-public/垂直页签.css";
          document.head.appendChild(linkElement);
      }
}

// 关闭垂直页签
function disableQYLverticaltab() {

    const linkElement = document.getElementById("QYLverticaltab-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启网格化搜索列表
function enableQYLgridsearchlist() {
    if (document.body.classList.contains('QYLmobile')) {
        return;
    }

    let linkElement = document.getElementById("QYLgridsearchlist-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLgridsearchlist-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/网格化搜索列表.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭网格化搜索列表
function disableQYLgridsearchlist() {

  const linkElement = document.getElementById("QYLgridsearchlist-style");
  if (linkElement) {
      linkElement.remove();
  }
}



// 读取QYLconfig.json
async function loadAndCheckConfig() {
    try {
        const content = await getFile("/conf/QYLconfig.json");
        if (!content) return;
        const config = JSON.parse(content);

        if (config?.isChecked1 === true) {
            enableMarkStyles();
            isChecked1 = true;
        } else if (config?.isChecked1 === false) {
            disableMarkStyles();
            isChecked1 = false;
        }

        if (config?.isChecked2 === true) {
            enableIndentStyle();
            isChecked2 = true;
        } else if (config?.isChecked2 === false) {
            disableIndentStyle();
            isChecked2 = false;
        }

        if (config?.isChecked3 === true) {
            enabletoolbarhidden();
            isChecked3 = true;
        } else if (config?.isChecked3 === false) {
            disabletoolbarhidden();
            isChecked3 = false;
        }

        if (config?.isChecked4 === true) {
            enablehoverblockremind();
            isChecked4 = true;
        } else if (config?.isChecked4 === false) {
            disablehoverblockremind();
            isChecked4 = false;
        }

        if (config?.isChecked5 === true) {
            enablesbremind();
            isChecked5 = true;
        } else if (config?.isChecked5 === false) {
            disablesbremind();
            isChecked5 = false;
        }

        if (config?.isChecked8 === true) {
            enablefocusblockremind();
            isChecked8 = true;
        } else if (config?.isChecked8 === false) {
            disablefocusblockremind();
            isChecked8 = false;
        }

        if (config?.isChecked6 === true) {
            enablefullwidth();
            isChecked6 = true;
        } else if (config?.isChecked6 === false) {
            disablefullwidth();
            isChecked6 = false;
        }

        if (config?.isChecked7 === true) {
            enablecolorfulfiletree();
            isChecked7 = true;
        } else if (config?.isChecked7 === false) {
            disablecolorfulfiletree();
            isChecked7 = false;
        }

        if (config?.isChecked9 === true) {
            enableQYLanimation();
            isChecked9 = true;
        } else if (config?.isChecked9 === false) {
            disableQYLanimation();
            isChecked9 = false;
        }

        if (config?.isChecked10 === true) {
            enableQYLAero();
            isChecked10 = true;
        } else if (config?.isChecked10 === false) {
            disableQYLAreo();
            isChecked10 = false;
        }

        if (config?.isChecked11 === true) {
            enableQYLcolorfultag();
            isChecked11 = true;
        } else if (config?.isChecked11 === false) {
            disableQYLcolorfultag();
            isChecked11 = false;
        }

        if (config?.isChecked12 === true) {
            enableQYLsunset();
            isChecked12 = true;
        } else if (config?.isChecked12 === false) {
            disableQYLsunset();
            isChecked12 = false;
        }

        if (config?.isChecked13 === true) {
            enableQYLforest();
            isChecked13 = true;
        } else if (config?.isChecked13 === false) {
            disableQYLforest();
            isChecked13 = false;
        }

        if (config?.isChecked14 === true) {
            enableQYLocean();
            isChecked14 = true;
        } else if (config?.isChecked14 === false) {
            disableQYLocean();
            isChecked14 = false;
        }

        if (config?.isChecked15 === true) {
            enableQYLsugar();
            isChecked15 = true;
        } else if (config?.isChecked15 === false) {
            disableQYLsugar();
            isChecked15 = false;
        }

        if (config?.isChecked16 === true) {
            enableQYLlavender();
            isChecked16 = true;
        } else if (config?.isChecked16 === false) {
            disableQYLlavender();
            isChecked16 = false;
        }

        if (config?.isChecked17 === true) {
            enableQYLfog();
            isChecked17 = true;
        } else if (config?.isChecked17 === false) {
            disableQYLfog();
            isChecked17 = false;
        }

        if (config?.isChecked19 === true) {
            enableQYLshuanghe();
            isChecked19 = true;
        } else if (config?.isChecked19 === false) {
            disableQYLshuanghe();
            isChecked19 = false;
        }

        if (config?.isChecked18 === true) {
            enableQYLinkmode();
            isChecked18 = true;
        } else if (config?.isChecked18 === false) {
            disableQYLinkmode();
            isChecked18 = false;
        }

        if (config?.isChecked20 === true) {
            enableQYLverticaltab();
            isChecked20 = true;
        } else if (config?.isChecked20 === false) {
            disableQYLverticaltab();
            isChecked20 = false;
        }

        if (config?.isChecked21 === true) {
            enableQYLcolorfulh();
            isChecked21 = true;
        } else if (config?.isChecked21 === false) {
            disableQYLcolorfulh();
            isChecked21 = false;
        }

        if (config?.isChecked22 === true) {
            enableQYLfusion();
            isChecked22 = true;
        } else if (config?.isChecked22 === false) {
            disableQYLfusion();
            isChecked22 = false;
        }

        if (config?.isChecked23 === true) {
            enableborderfiletree();
            isChecked23 = true;
        } else if (config?.isChecked23 === false) {
            disableborderfiletree();
            isChecked23 = false;
        }

        if (config?.isChecked24 === true) {
            enableQYLlihelp();
            isChecked24 = true;
        } else if (config?.isChecked24 === false) {
            disableQYLlihelp();
            isChecked24 = false;
        }

        if (config?.isChecked25 === true) {
            enableQYLLime();
            isChecked25 = true;
        } else if (config?.isChecked25 === false) {
            disableQYLLime();
            isChecked25 = false;
        }

        if (config?.isChecked26 === true) {
            enableQYLbullfinch();
            isChecked26 = true;
        } else if (config?.isChecked26 === false) {
            disableQYLbullfinch();
            isChecked26 = false;
        }
        
        if (config?.isChecked27 === true) {
            enableQYLgoldenautumn();
            isChecked27 = true;
        } else if (config?.isChecked27 === false) {
            disableQYLgoldenautumn();
            isChecked27 = false;
        }

        if (config?.isChecked30 === true) {
            enableQYLmemory();
            isChecked30 = true;
        } else if (config?.isChecked30 === false) {
            disableQYLmemory();
            isChecked30 = false;
        }

        if (config?.isChecked31 === true) {
            enableQYLlakeside();
            isChecked31 = true;
        } else if (config?.isChecked31 === false) {
            disableQYLlakeside();
            isChecked31 = false;
        }

        if (config?.isChecked32 === true) {
            enableQYLfreesia();
            isChecked32 = true;
        } else if (config?.isChecked32 === false) {
            disableQYLfreesia();
            isChecked32 = false;
        }

        if (config?.isChecked33 === true) {
            enableQYLivory();
            isChecked33 = true;
        } else if (config?.isChecked33 === false) {
            disableQYLivory();
            isChecked33 = false;
        }

        if (config?.isChecked34 === true) {
            enableQYLflatstyle();
            isChecked34 = true;
        } else if (config?.isChecked34 === false) {
            disableQYLflatstyle();
            isChecked34 = false;
        }

        if (config?.isChecked35 === true) {
            enableQYLimmersivetopbar();
            isChecked35 = true;
        } else if (config?.isChecked35 === false) {
            disableQYLimmersivetopbar();
            isChecked35 = false;
        }

        if (config?.isChecked36 === true) {
            enableQYLcoral();
            isChecked36 = true;
        } else if (config?.isChecked36 === false) {
            disableQYLcoral();
            isChecked36 = false;
        }

        if (config?.isChecked37 === true) {
            enableQYLmint();
            isChecked37 = true;
        } else if (config?.isChecked37 === false) {
            disableQYLmint();
            isChecked37 = false;
        }

        if (config?.isChecked38 === true) {
            enableQYLfocuseditingmode();
            isChecked38 = true;
        } else if (config?.isChecked38 === false) {
            disableQYLfocuseditingmode();
            isChecked38 = false;
        }

        if (config?.isChecked39 === true) {
            enableQYL33grid();
            isChecked39 = true;
        } else if (config?.isChecked39 === false) {
            disableQYL33grid();
            isChecked39 = false;
        }

        if (config?.isChecked40 === true) {
            enableQYLcolorblocking();
            isChecked40 = true;
        } else if (config?.isChecked40 === false) {
            disableQYLcolorblocking();
            isChecked40 = false;
        }

        if (config?.isChecked41 === true) {
            enableQYLhidetabsbt();
            isChecked41 = true;
        } else if (config?.isChecked41 === false) {
            disableQYLhidetabsbt();
            isChecked41 = false;
        }

        if (config?.isChecked42 === true) {
            enableQYLshowalloptions();
            isChecked42 = true;
        } else if (config?.isChecked42 === false) {
            disableQYLshowalloptions();
            isChecked42 = false;
        }

        if (config?.isChecked43 === true) {
            enableQYLfullheight();
            isChecked43 = true;
        } else if (config?.isChecked43 === false) {
            disableQYLfullheight();
            isChecked43 = false;
        }

        if (config?.isChecked44 === true) {
            enableQYLgridsearchlist();
            isChecked44 = true;
        } else if (config?.isChecked44 === false) {
            disableQYLgridsearchlist();
            isChecked44 = false;
        }

    } catch (e) {
        console.error("加载配置失败:", e);
    }
}
loadAndCheckConfig();

// 移动端启动强制关闭隐藏顶栏
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
async function init() {
    if (isMobileDevice()) {
        await loadAndCheckConfig();       
        disabletoolbarhidden();
        isChecked3 = false;
    }
}
init().catch(error => {
    console.error('初始化过程中发生错误:', error);
});

// PWA模式更改meta主色
(function() {
    let lastSurfaceColor = null;
    let isActive = true;  
    function getThemeColorVariable() {
        return typeof isChecked35 !== 'undefined' && isChecked35 
            ? '--QYL-immerse-toolbar' 
            : '--b3-theme-surface';
    }
    function updateThemeColorMeta() {
        const root = document.documentElement;
        const cssVar = getThemeColorVariable();
        const currentColor = getComputedStyle(root).getPropertyValue(cssVar).trim();

        if (currentColor === lastSurfaceColor) return;
        lastSurfaceColor = currentColor;
        
        let meta = document.querySelector('meta[name="theme-color"]');
        if (currentColor) {
            if (meta) {
                meta.content = currentColor;
            } else {
                meta = document.createElement('meta');
                meta.name = 'theme-color';
                meta.content = currentColor;
                document.head.prepend(meta);
            }
        } else if (meta) {
            meta.remove();
        }
    }
    function startSurfaceWatcher() {
        if (!isActive) return;
        updateThemeColorMeta();
        setTimeout(startSurfaceWatcher, 100);
    }
    document.addEventListener('visibilitychange', () => {
        isActive = !document.hidden;
        if (isActive) startSurfaceWatcher();
    });
    updateThemeColorMeta();
    startSurfaceWatcher();
})();


// 连点三次Q开启或关闭隐藏顶栏
// QYL PROPRIETARY CODE - DO NOT COPY, DISTRIBUTE OR MODIFY!!!
let qKeyPressTimes = [];
document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 'q') {
        const now = Date.now();
        qKeyPressTimes.push(now);
        if (qKeyPressTimes.length > 3) {
            qKeyPressTimes.shift();
        }
        if (qKeyPressTimes.length === 3) {
            const timeDiff = qKeyPressTimes[2] - qKeyPressTimes[0];
            
            if (timeDiff <= 500) {
                if (isChecked3) {
                    isChecked3 = false;
                    disabletoolbarhidden();
                } else {
                    isChecked3 = true;
                    enabletoolbarhidden();
                }
                qKeyPressTimes = [];
            } else {
                qKeyPressTimes.shift();
            }
        }
    }
});

// 底部状态栏位置更新
// QYL PROPRIETARY CODE - DO NOT COPY, DISTRIBUTE OR MODIFY!!!
const QYLStatusPositionManager = (() => {
    const QYL_MAX_RETRIES = 5;
    const QYL_BASE_DELAY = 300;
    let QYL_retryCount = 0; 
    class QYLCoreManager {
        constructor() {
            this.QYL_layout = null;
            this.QYL_status = null;
            this.QYL_windowWidth = window.innerWidth;
            this.QYL_observer = null;
            this.QYL_styleObserver = null;
            this.QYL_isActive = false;
            this.QYL_pendingDebounce = null;
            this.QYL_init();
        }
        QYL_elementDetector() {
            return new Promise((resolve, reject) => {
                const QYL_check = () => {
                    const layout = document.querySelector('#layouts .layout__center');
                    const status = document.getElementById('status');
                    return layout && status ? resolve({ layout, status }) : null;
                };
                const QYL_recursiveCheck = () => {
                    if (QYL_retryCount >= QYL_MAX_RETRIES) {
                        reject(new Error('Elements not found'));
                        return;
                    }
                    QYL_retryCount++;
                    QYL_check() || setTimeout(QYL_recursiveCheck, QYL_BASE_DELAY * Math.pow(2, QYL_retryCount));
                };
                QYL_check() || QYL_recursiveCheck();
            });
        }
        QYL_calculatePosition() {
            if (!this.QYL_validateElements()) return;
            try {
                if (this.QYL_pendingDebounce) {
                    clearTimeout(this.QYL_pendingDebounce);
                    this.QYL_pendingDebounce = null;
                }  
                const rect = this.QYL_layout.getBoundingClientRect();
                const offset = window.innerWidth - rect.right + 15;
                this.QYL_layout.style.setProperty('--QYL-fusion-center-right', `${offset}px`);
                this.QYL_status.style.setProperty('--QYL-status-transformX', `-${offset}px`);
            } catch (error) {
                this.QYL_scheduleRecovery();
            }
        }
        QYL_debounceFunction(func) {
            return () => {
                if (this.QYL_pendingDebounce) {
                    clearTimeout(this.QYL_pendingDebounce);
                }
                this.QYL_pendingDebounce = setTimeout(() => {
                    func.apply(this);
                }, 500);
            };
        }
        QYL_handleResize = () => {
            this.QYL_windowWidth = window.innerWidth;
            this.QYL_debouncedUpdate();
        }
        QYL_handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                this.QYL_scheduleRecovery();
            }
        }
        async QYL_init() {
            try {
                const { layout, status } = await this.QYL_elementDetector();
                this.QYL_layout = layout;
                this.QYL_status = status;
                this.QYL_debouncedUpdate = this.QYL_debounceFunction(
                    this.QYL_calculatePosition.bind(this)
                );
                window.addEventListener('resize', this.QYL_handleResize, { passive: true });
                window.addEventListener('scroll', this.QYL_debouncedUpdate, { passive: true });
                document.addEventListener('visibilitychange', this.QYL_handleVisibility);
                this.QYL_observer = new ResizeObserver(() => this.QYL_debouncedUpdate());
                this.QYL_observer.observe(this.QYL_layout);
                
                this.QYL_styleObserver = new MutationObserver(mutations => {
                    if (mutations.some(m => m.attributeName === 'style')) {
                        this.QYL_debouncedUpdate();
                    }
                });
                this.QYL_styleObserver.observe(this.QYL_status, {
                    attributes: true,
                    attributeFilter: ['style']
                });
                this.QYL_calculatePosition();
                this.QYL_isActive = true;
            } catch (error) {
                this.QYL_scheduleRecovery();
            }
        }
        QYL_validateElements() {
            return [this.QYL_layout, this.QYL_status].every(
                el => el?.isConnected
            );
        }  
        QYL_scheduleRecovery() {
            if (!this.QYL_isActive) return;
            QYL_retryCount = 0;
            setTimeout(() => {
                this.QYL_cleanup();
                this.QYL_init();
            }, 2000);
        }
        QYL_cleanup() {
            if (this.QYL_pendingDebounce) {
                clearTimeout(this.QYL_pendingDebounce);
                this.QYL_pendingDebounce = null;
            }
            window.removeEventListener('resize', this.QYL_handleResize);
            window.removeEventListener('scroll', this.QYL_debouncedUpdate);
            document.removeEventListener('visibilitychange', this.QYL_handleVisibility);
            this.QYL_observer?.disconnect();
            this.QYL_styleObserver?.disconnect();
            this.QYL_isActive = false;
        }
    }
    return {
        QYL_getInstance: () => {
            if (!this.QYL_instance) {
                this.QYL_instance = new QYLCoreManager();
            }
            return this.QYL_instance;
        },
        
        QYL_destroy: () => {
            this.QYL_instance?.QYL_cleanup();
            this.QYL_instance = null;
        }
    };
})();
const QYLStatusInitialize = () => {
    const init = () => {
        if (document.querySelector('#layouts') && document.getElementById('status')) {
            QYLStatusPositionManager.QYL_getInstance();
        }
    };
    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
};
QYLStatusInitialize();

// 顶栏融合
// QYL PROPRIETARY CODE - DO NOT COPY, DISTRIBUTE OR MODIFY!!!
function QYLfusion() {
    let isRunning = false;
    let retryTimeout;
    let updateTimeout;
    function getElements() {
        return {
            centerElem: document.querySelector('#layouts .layout__center'),
            dragElem: document.querySelector('#drag')
        };
    }
    function updateCSSVariables(centerElem, dragElem) {
        const centerLeft = centerElem.getBoundingClientRect().left;
        const dragLeft = dragElem.getBoundingClientRect().left;
        const dragRight = window.innerWidth - dragElem.getBoundingClientRect().right;
        
        centerElem.style.setProperty('--QYL-fusion-center-left', `${centerLeft}px`);
        centerElem.style.setProperty('--QYL-fusion-drag-left', `${dragLeft}px`);
        centerElem.style.setProperty('--QYL-fusion-drag-right', `${dragRight}px`);
    }
    function scheduleUpdate() {
        if (!isRunning) return;
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            const { centerElem, dragElem } = getElements();
            
            if (centerElem && dragElem) {
                updateCSSVariables(centerElem, dragElem);
                scheduleUpdate();
            } else {
                startRetrying();
            }
        }, 1000);
    }
    function startRetrying() {
        if (!isRunning) return;
        clearTimeout(retryTimeout);
        
        retryTimeout = setTimeout(() => {
            const { centerElem, dragElem } = getElements();
            if (centerElem && dragElem) {
                scheduleUpdate();
            } else {
                startRetrying();
            }
        }, 1000);
    }
    function stopAll() {
        clearTimeout(updateTimeout);
        clearTimeout(retryTimeout);
    }
    return {
        start() {
            if (isRunning) return;
            isRunning = true;
            scheduleUpdate();
        },       
        stop() {
            isRunning = false;
            stopAll();
        }
    };
}
const fusion = QYLfusion();
class QYLFusionWindowWidth {
    constructor(options = {}) {
      this.config = { debounceTime: 50, ...options };
      this.cssVarName = '--QYL-fusion-window-width';
      this.lastWidth = 0;
      this.isActive = false;
      this.rafId = null;
      this.debouncedHandler = null;
      this.handleResize = this.handleResize.bind(this);
    }
  
    #updateCSSVariable(width) {
      document.documentElement.style.setProperty(this.cssVarName, `${width}px`);
    }
  
    #debounce(func, wait) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }
  
    handleResize() {
      if (!this.isActive) return;
      this.rafId && cancelAnimationFrame(this.rafId);
      this.rafId = requestAnimationFrame(() => {
        const currentWidth = window.innerWidth;
        if (currentWidth !== this.lastWidth) {
          this.#updateCSSVariable(currentWidth);
          this.lastWidth = currentWidth;
        }
      });
    }
  
    start() {
      if (this.isActive) return;
      this.debouncedHandler = this.#debounce(this.handleResize, this.config.debounceTime);
      window.addEventListener('resize', this.debouncedHandler);
      this.isActive = true;
      this.handleResize();
    }
  
    stop() {
      if (!this.isActive) return;
      window.removeEventListener('resize', this.debouncedHandler);
      this.rafId && cancelAnimationFrame(this.rafId);
      this.isActive = false;
      this.debouncedHandler = null;
    }
  }
const windowObserver = new QYLFusionWindowWidth();

const QYLtrwndhandle = (() => {
    let observer = null;
    let mutationDebounce = null;
    function markWindow() {
        const center = document.querySelector('.layout__center');
        if (!center) return;
        const oldMarked = center.querySelectorAll('[data-type="wnd"].QYLtrwnd');
        oldMarked.forEach(el => el.classList.remove('QYLtrwnd'));
        let current = center;
        while (true) {
            const children = Array.from(current.children);
            if (children.length === 1) {
                const child = children[0];
                if (child.dataset.type === 'wnd') {
                    child.classList.add('QYLtrwnd');
                    return;
                }
                current = child;
                continue;
            }
            const resizeIndex = children.findIndex(el => 
                el.classList.contains('layout__resize') && 
                !el.classList.contains('layout__resize--lr')
            );
            if (resizeIndex !== -1) {
                current = resizeIndex > 0 
                    ? children[resizeIndex - 1] 
                    : children[children.length - 1];
            } else {
                current = children[children.length - 1];
            }
        }
    }
    function cleanUp() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        if (mutationDebounce) {
            clearTimeout(mutationDebounce);
            mutationDebounce = null;
        }
        const markedElements = document.querySelectorAll('.QYLtrwnd');
        markedElements.forEach(el => el.classList.remove('QYLtrwnd'));
    }
    return {
        start() {
            cleanUp();
            const center = document.querySelector('.layout__center');
            if (!center) return;
            markWindow();
            observer = new MutationObserver(() => {
                if (mutationDebounce) clearTimeout(mutationDebounce);
                mutationDebounce = setTimeout(markWindow, 1000);
            });
            observer.observe(center, {
                childList: true,
                subtree: true
            });
        },       
        stop() {
            cleanUp();
        }
    };
})();

//css自定义属性
// QYL PROPRIETARY CODE - DO NOT COPY, DISTRIBUTE OR MODIFY!!!
setTimeout(function(){
    (function(){
        function QYLcssApplyCustomCSS() {
            QYLcssObserver.disconnect();
            const elements = document.querySelectorAll('div[custom-css]');
            const cssRules = [];
            const containerSelector = ':is(#layouts, #preview, [data-key="dialog-exportimage"], #editor)';
            elements.forEach(element => {
                const cssValue = element.getAttribute('custom-css');
                const nodeId = element.getAttribute('data-node-id');
                if (cssValue) {
                    if (nodeId) {
                        cssRules.push(`${containerSelector} div[data-node-id="${nodeId}"] { ${cssValue} }`);
                    } else {
                        let uid = element.getAttribute('data-css-uid');
                        if (!uid) {
                            uid = `cssuid-${crypto.randomUUID().replace(/-/g, '')}`;
                            element.setAttribute('data-css-uid', uid);
                        }
                        const prevSibling = element.previousElementSibling;
                        if (prevSibling && prevSibling.classList.contains('protyle-top')) {
                            prevSibling.setAttribute('data-css-uid', uid);
                        }
                        cssRules.push(`${containerSelector} div[data-css-uid="${uid}"] { ${cssValue} }`);
                    }
                }
            });
            const existingStyle = document.getElementById('snippet-QYLcss-dynamic-css');
            if (existingStyle) existingStyle.remove();
            const style = document.createElement('style');
            style.id = 'snippet-QYLcss-dynamic-css';
            style.textContent = cssRules.join('\n');
            document.head.appendChild(style);
            if (QYLcssContainer) {
                QYLcssObserver.observe(QYLcssContainer, QYLcssObserverConfig);
            }
        }
        function QYLcssDebounce(fn, delay) {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => fn.apply(this, args), delay);
            };
        }
        const QYLcssObserverConfig = {
            attributes: true,
            attributeFilter: ['custom-css', 'data-node-id', 'data-css-uid'],
            subtree: true
        };
        const QYLcssObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'custom-css' || 
                     mutation.attributeName === 'data-node-id' ||
                     mutation.attributeName === 'data-css-uid')) {
                    QYLcssDebouncedApplyCSS();
                }
            });
        });
        const QYLcssDebouncedApplyCSS = QYLcssDebounce(QYLcssApplyCustomCSS, 250);
        const isMobile = document.body.classList.contains('QYLmobile');
        let QYLcssContainer = isMobile ? document.querySelector('#editor') : document.querySelector('.layout__center');

        if (QYLcssContainer) {
            QYLcssObserver.observe(QYLcssContainer, QYLcssObserverConfig);
            QYLcssApplyCustomCSS();
        }
    })();
}, 500);

//专注编辑
function QYLtypewriter() {
    let observerMap = new WeakMap();
    let protyleContentObserver = null;
    function setupProtyleContent(container) {
        let userScrolled = false;
        let currentFocusBlock = null;
        const innerObserver = new MutationObserver(mutations => {
            let focusChanged = false;
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const wasFocus = mutation.oldValue?.includes('QYLfocusblock') || false;
                    const isFocus = mutation.target.classList.contains('QYLfocusblock');
                    if (wasFocus !== isFocus) focusChanged = true;
                }
            });
            if (focusChanged) {
                const newFocus = container.querySelector('.QYLfocusblock');
                if (newFocus !== currentFocusBlock) {
                    currentFocusBlock = newFocus;
                    userScrolled = false;
                    if (currentFocusBlock) {
                        smartScroll(container, currentFocusBlock);
                    }
                }
            }
        });
        observerMap.set(container, {
            innerObserver,
            scrollHandler: () => userScrolled = true
        });
        innerObserver.observe(container, {
            attributes: true,
            attributeOldValue: true,
            subtree: true,
            attributeFilter: ['class']
        });
        container.addEventListener('scroll', observerMap.get(container).scrollHandler);
        currentFocusBlock = container.querySelector('.QYLfocusblock');
        if (currentFocusBlock) smartScroll(container, currentFocusBlock);
    }
    function cleanupProtyleContent(container) {
        const data = observerMap.get(container);
        if (data) {
            data.innerObserver.disconnect();
            container.removeEventListener('scroll', data.scrollHandler);
            observerMap.delete(container);
        }
    }
    function smartScroll(container, element) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const relativeTop = elementRect.top - containerRect.top;
        const visiblePosition = relativeTop + container.scrollTop;
        const targetScroll = visiblePosition - 
            container.clientHeight / 2 + 
            elementRect.height / 2;
        container.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }
    return {
        start() {
            if (!protyleContentObserver) {
                protyleContentObserver = new MutationObserver(mutations => {
                    mutations.forEach(mutation => {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                if (node.matches('.protyle-content')) {
                                    setupProtyleContent(node);
                                }
                                node.querySelectorAll('.protyle-content').forEach(setupProtyleContent);
                            }
                        });
                        mutation.removedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                if (node.matches('.protyle-content')) {
                                    cleanupProtyleContent(node);
                                }
                                node.querySelectorAll('.protyle-content').forEach(cleanupProtyleContent);
                            }
                        });
                    });
                });
                const targetNode = document.querySelector('.layout__center') || document.querySelector('#editor');
                if (targetNode) {
                    protyleContentObserver.observe(targetNode, {
                        childList: true,
                        subtree: true
                    });
                    targetNode.querySelectorAll('.protyle-content').forEach(setupProtyleContent);
                }
            }
        },
        stop() {
            if (protyleContentObserver) {
                document.querySelectorAll('.protyle-content').forEach(cleanupProtyleContent);
                observerMap = new WeakMap();
                protyleContentObserver.disconnect();
                protyleContentObserver = null;
            }
        }
    };
}
const typewriter = QYLtypewriter();

//列表辅助线
const QYLlihelp = (function() {
    let allListItemNode = [];
    let isActive = false;
    let selectionChangeHandler = null;
    function handleSelectionChange() {
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;
        const range = selection.getRangeAt(0);
        const startNode = range.startContainer;
        let currentNode = startNode;
        allListItemNode.forEach(node => {
            node.classList.remove('en_item_bullet_actived', 'en_item_bullet_line');
        });
        allListItemNode = [];
        while (currentNode) {
            if (currentNode.nodeType === Node.ELEMENT_NODE) {
                if (currentNode.hasAttribute('custom-list-view')) {
                    allListItemNode = [];
                    return;
                }
                if (currentNode.dataset?.type === 'NodeListItem') {
                    allListItemNode.push(currentNode);
                }
            }
            currentNode = currentNode.parentElement;
        }
        for (let i = 0; i < allListItemNode.length - 1; i++) {
            const currentNode = allListItemNode[i];
            const nextNode = allListItemNode[i + 1];
            const currentRect = currentNode.getBoundingClientRect();
            const nextRect = nextNode.getBoundingClientRect();
            
            currentNode.style.setProperty(
                '--en-bullet-line-height',
                `${currentRect.top - nextRect.top}px`
            );
            currentNode.classList.add('en_item_bullet_line');
        }
        allListItemNode.forEach(node => node.classList.add('en_item_bullet_actived'));
    }
    return {
        start() {
            if (!isActive) {
                selectionChangeHandler = handleSelectionChange.bind(this);
                document.addEventListener('selectionchange', selectionChangeHandler);
                isActive = true;
            }
        },
        stop() {
            if (isActive) {
                document.removeEventListener('selectionchange', selectionChangeHandler);
                allListItemNode.forEach(node => {
                    node.classList.remove('en_item_bullet_actived', 'en_item_bullet_line');
                });
                allListItemNode = [];
                isActive = false;
            }
        }
    };
})();

//i18nattr
const I18Nattr = {
    zh_CN: {
        QYLcustomattr: 'QYL自定义属性',
        group1: '组别1',
        group2: '组别2',
        group3: '组别3',
        group4: '组别4',

        calloutcolor: '引述块Callout',
        red: '红色',
        orange: '橙色',
        yellow: '黄色',
        green: '绿色',
        cyan: '青色',
        blue: '蓝色',
        purple: '紫色',
        pink: '粉色',
        black: '黑色',
        gray: '灰色',
        themecolor: '主题色',
        defaultcolor: '默认颜色',
        removecallout: '取消CallOut样式',
        recovercallout: '启用CallOut样式',

        colsbgap: '水平排列超级块间距',
        colsblianxu: '水平连续排列',
        colsbjincou: '水平紧凑排列',
        colsbjiaojincou: '水平较紧凑排列',
        colsbjiaokuansong: '水平较宽松排列',
        colsbkuansong: '水平宽松排列',
        colsbdefault: '恢复默认',

        rowsbgap: '垂直排列超级块间距',
        rowsblianxu: '垂直连续排列',
        rowsbkuansong: '垂直宽松排列',
        rowsbruanhuanhang: '垂直软换行排列',
        rowsbdefault: '恢复默认',

        listview: '列表视图',
        listviewmindmap: '脑图',
        listviewkanban: '看板',
        listviewtable: '表格',
        listviewdefault: '默认',
        liststylehide: '隐藏序标',
        liststylerecover: '恢复序标',

        lineheight: '文字行间距',
        lineheight1: '单倍行距',
        lineheight15: '1.5倍行距',
        lineheight18: '1.8倍行距',
        lineheight2: '双倍行距',
        lineheightdefault: '默认',

        blankblockremind: '空块提醒',
        blankblockremindon: '启用',
        blankblockremindoff: '禁用',

        tablestyle: '表格样式',
        threeline: '三线表',
        theadhl: '强化表头',
        tablewidth100: '全宽表格',
        tablestyledelete: '全部清除',

        headingstyle: '标题样式',
        headingstylecolorful: '多彩',
        headingstyleglitch: '故障',
        headingstylegold: '金箔',
        headingstyleunderline: '下划线',
        headingstyleleftborder: '左边框',
        headingstylelevel: '层级',
        headingstyledelete: '清除属性',

        CSSplaceholder: '在此输入CSS代码，注意首尾无需{ }包裹，支持&嵌套选择器\n例1：输入color:red;border:1px solid red使得块内文字变为红色且块具有红色边框\n例2：输入& span[data-type~=block-ref]:not(.av__celltext) { border-bottom: none }来取消块内所有块引用链接的下方虚线\n例3：输入&.protyle-top .protyle-background__icon {margin-bottom: 8px;& :is(img, svg) {max-width:100px;min-width:100px;width:100px;height:100px;}}来调整文档自定义表情的大小',

        imgstyle: '图片样式',
        imgstyleroundedcorners: '圆角',
        imgstylecircle: '圆形',
        imgstyleshadow: '立体',
        imgstyleinvert: '反色',
        imgstyle33grid: '九宫格排列',
        imgstyledelete: '全部清除',

        maxheight: '最大高度',
        maxheight50: '50px',
        maxheight100: '100px',
        maxheight150: '150px',
        maxheight200: '200px',
        maxheight300: '300px',
        maxheight400: '400px',
        maxheight500: '500px',
        maxheightdelete: '恢复',

        fileblockstyle: '文档样式',
        fileblockstylesajinzhi: '洒金纸',
        fileblockstylegrid: '网格',
        fileblockstyledot: '格点',
        fileblockstyledelete: '清除属性',

        blockstyle: '块样式',
        blockstylewarning: '警告（红）',
        blockstyletip: '灵感（橙）',
        blockstyleinfo: '信息（青）',
        blockstyleimportant: '重要（紫）',
        blockstylecomment: '批注（黑）',
        blockstylequote: '引用（灰）',
        blockstyletodo: '待办（蓝）',
        blockstyledone: '完成（绿）',
        blockstylesajinzhi: '洒金纸',
        blockstylegrid: '网格',
        blockstyledelete: '清除属性',
        blockstylenote: '便签',
        blockstyleleftborder: '左边框',
        blockstyledot: '格点',

        fontfamily: '字体',
        fontfamilydelete: '清除属性',
    },
    en_US: {
        QYLcustomattr: 'QYL-theme block settings',
        group1: 'Group 1',
        group2: 'Group 2',
        group3: 'Group 3',
        group4: 'Group 4',

        calloutcolor: 'Quote block callout',
        red: 'Red',
        orange: 'Orange',
        yellow: 'Yellow',
        green: 'Green',
        cyan: 'Cyan',
        blue: 'Blue',
        purple: 'Purple',
        pink: 'Pink',
        black: 'Black',
        gray: 'Gray',
        themecolor: 'Theme color',
        defaultcolor: 'Default color',
        removecallout: 'Remove callout',
        recovercallout: 'Enable callout',

        colsbgap: 'Column super block gap',
        colsblianxu: '0',
        colsbjincou: '0.5em',
        colsbjiaojincou: '1em',
        colsbjiaokuansong: '2em',
        colsbkuansong: '2.5em',
        colsbdefault: 'Default(1em)',

        rowsbgap: 'Row super block gap',
        rowsblianxu: '0',
        rowsbkuansong: '1em',
        rowsbruanhuanhang: 'Soft wrap​',
        rowsbdefault: 'Default(2px)',

        listview: 'List view',
        listviewmindmap: 'Mind map',
        listviewkanban: 'Kanban',
        listviewtable: 'Table',
        listviewdefault: 'Default(List)',
        liststylehide: 'Hide the order',
        liststylerecover: 'Display the order',

        lineheight: 'Line height',
        lineheight1: '1',
        lineheight15: '1.5',
        lineheight18: '1.8',
        lineheight2: '2',
        lineheightdefault: 'Default',

        blankblockremind: 'Empty block reminder',
        blankblockremindon: 'on',
        blankblockremindoff: 'off',

        tablestyle: 'Table style',
        threeline: 'Three line table',
        theadhl: 'Enhance Headers',
        tablewidth100: 'Full width table',
        tablestyledelete: 'Recover all',

        headingstyle: 'Heading style',
        headingstylecolorful: 'Colorful',
        headingstyleglitch: 'Glitch',
        headingstylegold: 'Gold',
        headingstyleunderline: 'Underline',
        headingstyleleftborder: 'Left border',
        headingstylelevel: 'Level',
        headingstyledelete: 'Recover all',

        CSSplaceholder: 'Input CSS code here, no need to wrap with { } at the beginning and end, supports & nested selectors\nExample 1: Input color: red; border: 1px solid red makes the text inside the block turn red and the block have a red border.\nExample 2: Inputting span[data-type~=block-ref]:not(.av__celltext) { border-bottom: none } to remove the dotted underline from all block reference links within blocks.\nExample 3: Input &.protyle-top .protyle-background__icon {margin-bottom: 8px;& :is(img, svg) {max-width:100px;min-width:100px;width:100px;height:100px;}} to adjust the size of custom emojis in your document.',

        imgstyle: 'Image style',
        imgstyleroundedcorners: 'Rounded corners',
        imgstylecircle: 'Circle',
        imgstyleshadow: 'Shadow',
        imgstyleinvert: 'Invert',
        imgstyle33grid: '3x3 grid',
        imgstyledelete: 'Recover all',

        maxheight: 'Max height',
        maxheight50: '50px',
        maxheight100: '100px',
        maxheight150: '150px',
        maxheight200: '200px',
        maxheight300: '300px',
        maxheight400: '400px',
        maxheight500: '500px',
        maxheightdelete: 'Recover all',

        fileblockstyle: 'File block style',
        fileblockstylesajinzhi: 'Sajin paper',
        fileblockstylegrid: 'Grid',
        fileblockstyledot: 'Dot',
        fileblockstyledelete: 'Recover all',

        blockstyle: 'Block style',
        blockstylewarning: 'Warning',
        blockstyletip: 'Tip',
        blockstyleinfo: 'Information',
        blockstyleimportant: 'Important',
        blockstylecomment: 'Comment',
        blockstylequote: 'Quote',
        blockstyletodo: 'Todo',
        blockstyledone: 'Done',
        blockstylesajinzhi: 'Sajin paper',
        blockstylegrid: 'Grid',
        blockstyledelete: 'Recover all',
        blockstylenote: 'Note',
        blockstyleleftborder: 'Left border',
        blockstyledot: 'Dot',

        fontfamily: 'Font',
        fontfamilydelete: 'Recover all',
    },
    zh_CHT: {
        QYLcustomattr: 'QYL自定義屬性',
        group1: '組別1',
        group2: '組別2',
        group3: '組別3',
        group4: '組別4',
    
        calloutcolor: '引述塊Callout',
        red: '紅色',
        orange: '橙色',
        yellow: '黃色',
        green: '綠色',
        cyan: '青色',
        blue: '藍色',
        purple: '紫色',
        pink: '粉色',
        black: '黑色',
        gray: '灰色',
        themecolor: '主题色',
        defaultcolor: '預設顏色',
        removecallout: '取消CallOut樣式',
        recovercallout: '啟用CallOut樣式',
    
        colsbgap: '水平排列超級塊間距',
        colsblianxu: '水平連續排列',
        colsbjincou: '水平緊湊排列',
        colsbjiaojincou: '水平較緊湊排列',
        colsbjiaokuansong: '水平較寬鬆排列',
        colsbkuansong: '水平寬鬆排列',
        colsbdefault: '恢復預設',
    
        rowsbgap: '垂直排列超級塊間距',
        rowsblianxu: '垂直連續排列',
        rowsbkuansong: '垂直寬鬆排列',
        rowsbruanhuanhang: '垂直軟換行排列',
        rowsbdefault: '恢復預設',
    
        listview: '列表視圖',
        listviewmindmap: '腦圖',
        listviewkanban: '看板',
        listviewtable: '表格',
        listviewdefault: '預設',
    
        lineheight: '文字行間距',
        lineheight1: '單倍行距',
        lineheight15: '1.5倍行距',
        lineheight18: '1.8倍行距',
        lineheight2: '雙倍行距',
        lineheightdefault: '預設',
    
        blankblockremind: '空塊提醒',
        blankblockremindon: '啟用',
        blankblockremindoff: '禁用',
    
        tablestyle: '表格樣式',
        threeline: '三線表',
        theadhl: '強化表頭',
        tablewidth100: '全宽表格',
        tablestyledelete: '清除屬性',
        liststylehide: '隐藏序标',
        liststylerecover: '恢复序标',
    
        headingstyle: '標題樣式',
        headingstylecolorful: '多彩',
        headingstyleglitch: '故障',
        headingstylegold: '金箔',
        headingstyleunderline: '下劃線',
        headingstyleleftborder: '左邊框',
        headingstylelevel: '層級',
        headingstyledelete: '清除屬性',
    
        CSSplaceholder: '在此輸入CSS代碼，注意首尾無需{ }包裹，支援&嵌套選擇器\n例1：輸入color:red;border:1px solid red使得塊內文字變為紅色且塊具有紅色邊框\n例2：輸入& span[data-type~=block-ref]:not(.av__celltext) { border-bottom: none }來取消塊內所有塊引用連結的下方虛線\n例3：輸入&.protyle-top .protyle-background__icon {margin-bottom: 8px;& :is(img, svg) {max-width:100px;min-width:100px;width:100px;height:100px;}}來調整文檔自定義表情的大小',
    
        imgstyle: '圖片樣式',
        imgstyleroundedcorners: '圓角',
        imgstylecircle: '圓形',
        imgstyleshadow: '立體',
        imgstyleinvert: '反色',
        imgstyle33grid: '九宮格排列',
        imgstyledelete: '全部清除',
    
        maxheight: '最大高度',
        maxheight50: '50px',
        maxheight100: '100px',
        maxheight150: '150px',
        maxheight200: '200px',
        maxheight300: '300px',
        maxheight400: '400px',
        maxheight500: '500px',
        maxheightdelete: '恢復',
    
        fileblockstyle: '文檔樣式',
        fileblockstylesajinzhi: '灑金紙',
        fileblockstylegrid: '網格',
        fileblockstyledot: '格点',
        fileblockstyledelete: '清除屬性',
    
        blockstyle: '塊樣式',
        blockstylewarning: '警告（紅）',
        blockstyletip: '靈感（橙）',
        blockstyleinfo: '資訊（青）',
        blockstyleimportant: '重要（紫）',
        blockstylecomment: '批註（黑）',
        blockstylequote: '引用（灰）',
        blockstyletodo: '待辦（藍）',
        blockstyledone: '完成（綠）',
        blockstylesajinzhi: '灑金紙',
        blockstylegrid: '網格',
        blockstyledelete: '清除屬性',
        blockstylenote: '便籤',
        blockstyleleftborder: '左邊框',
        blockstyledot: '格点',
    
        fontfamily: '字體',
        fontfamilydelete: '清除屬性',
    },
};
const i18nattr = I18Nattr[window.siyuan.config.lang] || I18Nattr.en_US;

// 右键菜单QYL自定义属性
{
    function debounce(func, delay) {
        let timeout;
        return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
    const commonMenuCache = { elem: null, timestamp: 0 };
    function getCommonMenu() {
        const now = Date.now();
        if (!commonMenuCache.elem || now - commonMenuCache.timestamp > 1000) {
        commonMenuCache.elem = document.querySelector("#commonMenu .b3-menu__items");
        commonMenuCache.timestamp = now;
        }
        return commonMenuCache.elem;
    }
    let isClickMonitorActive = false;
    function ClickMonitor() {
        if (isClickMonitorActive) return;
        isClickMonitorActive = true;
        const handleEvent = debounce((e) => {
        initQYLattr(e);
        initQYLattrforfile(e);
        }, 100);
    
        window.addEventListener(`mouseup`, handleEvent);
        window.addEventListener(`keyup`, handleEvent);
    }
    let initTimeout, insertTimeout, fileInitTimeout, fileInsertTimeout;
    
    function initQYLattr() {//准备创建QYL自定义属性菜单项(块)
        clearTimeout(initTimeout);
        clearTimeout(insertTimeout);
    
        initTimeout = setTimeout(() => {
        const selectinfo = getBlockSelected();
        if (selectinfo) {
            insertTimeout = setTimeout(() => {
            InsertQYLattr(selectinfo.id, selectinfo.type, selectinfo.sbLayout);
            查询css自定义块属性的内容(selectinfo.id);
            }, 300);
        }
        }, 0);
    }
    
    function initQYLattrforfile() {//准备创建QYL自定义属性菜单项(文档)
        clearTimeout(fileInitTimeout);
        clearTimeout(fileInsertTimeout);
    
        fileInitTimeout = setTimeout(() => {
        const selectinfo = getFileBlockSelected();
        if (selectinfo) {
            fileInsertTimeout = setTimeout(() => {
            InsertQYLattrforfile(selectinfo.id, selectinfo.type);
            查询css自定义块属性的内容(selectinfo.id);
            }, 300);
        }
        }, 0);
    }
    function MenuSeparator(className = `b3-menu__separator`) {
        let node = document.createElement(`button`);
        node.className = className;
        return node;
    }
    
    function getBlockSelected() {//获取块属性
        const node_list = document.querySelectorAll(`.protyle-wysiwyg--select`);
        if (node_list.length === 1 && node_list[0].dataset.nodeId != null) {
        return {
            id: node_list[0].dataset.nodeId,
            type: node_list[0].dataset.type,
            subtype: node_list[0].dataset.subtype,
            sbLayout: node_list[0].dataset.sbLayout, //超级块布局
        };
        }
        return null;
    }
    
    function getFileBlockSelected() {
        const node_list = document.querySelectorAll(`.b3-list-item--focus[data-type="navigation-file"]`);
        if (node_list.length === 1 && node_list[0].dataset.nodeId != null) {
        return {
            id: node_list[0].dataset.nodeId,
            type: node_list[0].dataset.type,
            subtype: node_list[0].dataset.subtype,
        };
        }
        return null;
    }
    
    function InsertQYLattr(selectid, selecttype, selectsbLayout) {//创建QYL自定义属性菜单项（块）
        const commonMenu = getCommonMenu();
        if (!commonMenu) return;
    
        const readonly = commonMenu.querySelector(`[data-id="updateAndCreatedAt"]`);
        const attritem = commonMenu.querySelector(`#QYLattr`);
    
        if (readonly && !attritem) {
        commonMenu.insertBefore(QYLattritem(selectid, selecttype, selectsbLayout), readonly);
        commonMenu.insertBefore(MenuSeparator(), readonly);
        }
    }
    
    function InsertQYLattrforfile(selectid, selecttype) {//创建QYL自定义属性菜单项（文档）
        const commonMenu = getCommonMenu();
        if (!commonMenu) return;
    
        const readonly = commonMenu.querySelector(`[data-id="separator_3"]:has(~ [data-id="fileHistory"])`);
        const attritem = commonMenu.querySelector(`#QYLattr`);
    
        if (readonly && !attritem) {
        commonMenu.insertBefore(MenuSeparator(), readonly);
        commonMenu.insertBefore(QYLattritem(selectid, selecttype), readonly);
        }
    }
    setTimeout(ClickMonitor, 1000);

    function QYLattritem(selectid, selecttype, selectsbLayout) {//定义QYL自定义属性菜单项
      let button = document.createElement("button")
      button.id = "QYLattr"
      button.className = "b3-menu__item"
      button.innerHTML = `<svg t="1748926087349" class="b3-menu__icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="55665"><path d="M204.8 426.666667c0 10.24 6.826667 17.066667 17.066667 17.066666s17.066667-6.826667 17.066666-17.066666c0-81.92 10.24-126.293333 37.546667-150.186667s68.266667-37.546667 150.186667-37.546667c10.24 0 17.066667-6.826667 17.066666-17.066666s-6.826667-17.066667-17.066666-17.066667c-81.92 0-126.293333-10.24-150.186667-37.546667S238.933333 98.986667 238.933333 17.066667c0-10.24-6.826667-17.066667-17.066666-17.066667S204.8 6.826667 204.8 17.066667c0 81.92-10.24 126.293333-37.546667 150.186666S98.986667 204.8 17.066667 204.8c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666c81.92 0 126.293333 10.24 150.186666 37.546667s37.546667 68.266667 37.546667 150.186667zM409.6 119.466667c30.72 0 47.786667 3.413333 54.613333 13.653333 10.24 6.826667 13.653333 23.893333 13.653334 54.613333 0 10.24 6.826667 17.066667 17.066666 17.066667s17.066667-6.826667 17.066667-17.066667c0-30.72 3.413333-47.786667 13.653333-54.613333 10.24-10.24 23.893333-13.653333 54.613334-13.653333 10.24 0 17.066667-6.826667 17.066666-17.066667s-6.826667-17.066667-17.066666-17.066667c-30.72 0-47.786667-3.413333-54.613334-13.653333-10.24-6.826667-13.653333-23.893333-13.653333-54.613333 0-10.24-6.826667-17.066667-17.066667-17.066667s-17.066667 6.826667-17.066666 17.066667c0 30.72-3.413333 47.786667-13.653334 54.613333-10.24 10.24-23.893333 13.653333-54.613333 13.653333-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066667zM433.493333 488.106667c-17.066667-17.066667-23.893333-44.373333-23.893333-95.573334 0-10.24-6.826667-17.066667-17.066667-17.066666s-17.066667 6.826667-17.066666 17.066666c0 54.613333-6.826667 81.92-23.893334 95.573334-13.653333 17.066667-40.96 23.893333-95.573333 23.893333-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666c54.613333 0 81.92 6.826667 95.573333 23.893334 17.066667 17.066667 23.893333 44.373333 23.893334 95.573333 0 10.24 6.826667 17.066667 17.066666 17.066667s17.066667-6.826667 17.066667-17.066667c0-54.613333 6.826667-81.92 23.893333-95.573333 17.066667-17.066667 44.373333-23.893333 95.573334-23.893334 10.24 0 17.066667-6.826667 17.066666-17.066666s-6.826667-17.066667-17.066666-17.066667c-54.613333 0-81.92-6.826667-95.573334-23.893333z" fill="" p-id="55666"></path><path d="M737.28 109.226667c-6.826667-3.413333-13.653333 0-20.48 3.413333-3.413333 3.413333-6.826667 13.653333-3.413333 20.48C737.28 187.733333 750.933333 245.76 750.933333 307.2c0 245.76-197.973333 443.733333-443.733333 443.733333-61.44 0-119.466667-13.653333-177.493333-37.546666-6.826667-3.413333-13.653333 0-20.48 3.413333s-6.826667 13.653333-3.413334 20.48C184.32 911.36 354.986667 1024 546.133333 1024c262.826667 0 477.866667-215.04 477.866667-477.866667 0-191.146667-112.64-361.813333-286.72-436.906666z" fill="" p-id="55667"></path></svg><span class="b3-menu__label" style="">${i18nattr.QYLcustomattr}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
      
      if (selecttype === "NodeHeading") {//准备创建标题块的二级菜单
        button.appendChild(QYLNodeHeadingsub(selectid))
      }

      else if (selecttype === "NodeTable") {//准备创建表格块的二级菜单
        button.appendChild(QYLNodeTablesub(selectid))
      }

      else if (selecttype === "navigation-file") {//准备创建文档块的二级菜单
        button.appendChild(QYLfilesub(selectid))
      }

      else if (selecttype === "NodeList") {//准备创建列表块的二级菜单
        button.appendChild(QYLNodeListsub(selectid))
      }

      else if (selecttype === "NodeBlockquote") {//准备创建引述块的二级菜单
        button.appendChild(QYLNodeBlockquotesub(selectid))
      }

      else if (selecttype === "NodeSuperBlock" && selectsbLayout === "col") {//准备创建水平排列超级块的二级菜单
        button.appendChild(QYLNodeSuperBlockcolsub(selectid))
      }

      else if (selecttype === "NodeSuperBlock" && selectsbLayout === "row") {//准备创建垂直排列超级块的二级菜单
        button.appendChild(QYLNodeSuperBlockrowsub(selectid))
      }

      else {//准备创建任意块的二级菜单（非标题、表格、列表、文档）
        button.appendChild(QYLanyblocksub(selectid))
      }

      return button
    }

/* -----------------------------------------水平排列超级块------------------------------------- */
function QYLNodeSuperBlockcolsub(selectid) {//创建水平排列超级块二级菜单
    let div = document.createElement("div")
    div.id = "QYLNodeSuperBlocksub"
    div.className = "b3-menu__submenu"
    div.appendChild(QYLNodeSuperBlockcolsubitems(selectid))//准备创建水平排列超级块二级菜单的b3-menu__items
    return div

    function QYLNodeSuperBlockcolsubitems(selectid) {//创建水平排列超级块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(QYLattrcolsbgapitem(selectid))//准备创建水平排列超级块间距选项
        div.appendChild(QYLattrstyleitem(selectid))//准备创建块样式选项
        div.appendChild(QYLattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(QYLattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(QYLattrheightitem(selectid))//准备创建最大高度选项
        return div
    }
}
function QYLattrcolsbgapitem(selectid) {//创建水平排列超级块间距选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label" style="">${i18nattr.colsbgap}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrcolsbgapsub(selectid))//准备创建水平排列超级块间距选项的二级菜单
    return button
}
function QYLattrcolsbgapsub(selectid) {//创建水平排列超级块间距选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrcolsbgapsubitems(selectid))//准备创建水平排列超级块间距选项的b3-menu__items
    return div

    function QYLattrcolsbgapsubitems(selectid) {//创建水平排列超级块间距选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrcolsbgaplianxu(selectid))//水平连续排列
        div.appendChild(QYLattrcolsbgapjincou(selectid))//水平紧凑排列
        div.appendChild(QYLattrcolsbgapjiaojincou(selectid))//水平较紧凑排列
        div.appendChild(QYLattrcolsbgapjiaokuansong(selectid))//水平较宽松排列
        div.appendChild(QYLattrcolsbgapkuansong(selectid))//水平宽松排列
        div.appendChild(QYLattrcolsbgapdelete(selectid))//恢复默认
        return div

        function QYLattrcolsbgaplianxu(selectid) {//水平连续排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平连续排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">${i18nattr.colsblianxu}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrcolsbgapjincou(selectid) {//水平紧凑排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平紧凑排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">${i18nattr.colsbjincou}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrcolsbgapjiaojincou(selectid) {//水平较紧凑排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平较紧凑排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">${i18nattr.colsbjiaojincou}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrcolsbgapjiaokuansong(selectid) {//水平较宽松排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平较宽松排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">${i18nattr.colsbjiaokuansong}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrcolsbgapkuansong(selectid) {//水平宽松排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平宽松排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">${i18nattr.colsbkuansong}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrcolsbgapdelete(selectid) {//默认
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.colsbdefault}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
    }
}

/* -----------------------------------------垂直排列超级块------------------------------------- */
function QYLNodeSuperBlockrowsub(selectid) {//创建垂直排列超级块二级菜单
    let div = document.createElement("div")
    div.id = "QYLNodeSuperBlocksub"
    div.className = "b3-menu__submenu"
    div.appendChild(QYLNodeSuperBlockrowsubitems(selectid))//准备创建垂直排列超级块二级菜单的b3-menu__items
    return div

    function QYLNodeSuperBlockrowsubitems(selectid) {//创建垂直排列超级块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(QYLattrrowsbgapitem(selectid))//准备创建垂直排列超级块间距选项
        div.appendChild(QYLattrstyleitem(selectid))//准备创建块样式选项
        div.appendChild(QYLattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(QYLattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(QYLattrheightitem(selectid))//准备创建最大高度选项
        return div
    }
}
function QYLattrrowsbgapitem(selectid) {//创建垂直排列超级块间距选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label" style="">${i18nattr.rowsbgap}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrrowsbgapsub(selectid))//准备创建垂直排列超级块间距选项的二级菜单
    return button
}
function QYLattrrowsbgapsub(selectid) {//创建垂直排列超级块间距选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrrowsbgapsubitems(selectid))//准备创建垂直排列超级块间距选项的b3-menu__items
    return div

    function QYLattrrowsbgapsubitems(selectid) {//创建垂直排列超级块间距选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrrowsbgaplianxu(selectid))//垂直连续排列
        div.appendChild(QYLattrrowsbgapkuansong(selectid))//垂直宽松排列
        div.appendChild(QYLattrrowsbgapruanhuanhang(selectid))//垂直软换行排列
        div.appendChild(QYLattrrowsbgapdelete(selectid))//恢复默认
        return div

        function QYLattrrowsbgaplianxu(selectid) {//垂直连续排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-rowgap")
            button.setAttribute("custom-attr-value", "垂直连续排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">${i18nattr.rowsblianxu}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrrowsbgapkuansong(selectid) {//垂直宽松排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-rowgap")
            button.setAttribute("custom-attr-value", "垂直宽松排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">${i18nattr.rowsbkuansong}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrrowsbgapruanhuanhang(selectid) {//垂直软换行排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-rowgap")
            button.setAttribute("custom-attr-value", "垂直软换行排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">${i18nattr.rowsbruanhuanhang}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrrowsbgapdelete(selectid) {//默认
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-rowgap")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.rowsbdefault}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
    }
}

/* -----------------------------------------列表块------------------------------------- */
function QYLNodeListsub(selectid) {//创建列表块二级菜单
    let div = document.createElement("div")
    div.id = "QYLNodeListsub"
    div.className = "b3-menu__submenu"
    div.appendChild(QYLNodeListsubitems(selectid))//准备创建列表块二级菜单的b3-menu__items
    return div

    function QYLNodeListsubitems(selectid) {//创建列表块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(QYLattrlistviewitem(selectid))//准备创建列表视图选项
        div.appendChild(QYLattrstyleitem(selectid))//准备创建块样式选项
        div.appendChild(QYLattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(QYLattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(QYLattrheightitem(selectid))//准备创建最大高度选项
        return div
    }
}
function QYLattrlistviewitem(selectid) {//创建列表视图选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconList"></use></svg><span class="b3-menu__label" style="">${i18nattr.listview}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrlistviewsub(selectid))//准备创建列表视图选项的二级菜单
    return button
}
function QYLattrlistviewsub(selectid) {//创建列表视图选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrlistviewsubitems(selectid))//准备创建列表视图选项的b3-menu__items
    return div

    function QYLattrlistviewsubitems(selectid) {//创建列表视图选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrlistviewnaotu(selectid))//脑图
        div.appendChild(QYLattrlistviewkanban(selectid))//看板
        div.appendChild(QYLattrlistviewbiaoge(selectid))//表格
        div.appendChild(QYLattrlistviewlist(selectid))//默认
        div.appendChild(QYLattrliststylehide(selectid))//隐藏序标
        div.appendChild(QYLattrliststylerecover(selectid))//恢复序标
        return div

        function QYLattrlistviewnaotu(selectid) {//脑图
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "脑图")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label">${i18nattr.listviewmindmap}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlistviewkanban(selectid) {//看板
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "看板")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconMenu"></use></svg><span class="b3-menu__label">${i18nattr.listviewkanban}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlistviewbiaoge(selectid) {//表格
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "表格")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.listviewtable}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlistviewlist(selectid) {//默认
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">${i18nattr.listviewdefault}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrliststylehide(selectid) {//隐藏序标
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-style")
            button.setAttribute("custom-attr-value", "隐藏序标")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">${i18nattr.liststylehide}</span><span class="b3-menu__accelerator">${i18nattr.group2}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrliststylerecover(selectid) {//恢复序标
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-style")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">${i18nattr.liststylerecover}</span><span class="b3-menu__accelerator">${i18nattr.group2}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
    }
}

/* -----------------------------------------引述块------------------------------------- */
function QYLNodeBlockquotesub(selectid) {//创建引述块二级菜单
    let div = document.createElement("div")
    div.id = "QYLNodeBlockquotesub"
    div.className = "b3-menu__submenu"
    div.appendChild(QYLNodeBlockquotesubitems(selectid))//准备创建引述块二级菜单的b3-menu__items
    return div

    function QYLNodeBlockquotesubitems(selectid) {//创建引述块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(QYLattrbqcalloutcoloritem(selectid))//准备创建CallOut颜色选项
        div.appendChild(QYLattrstyleitem(selectid))//准备创建块样式选项
        div.appendChild(QYLattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(QYLattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(QYLattrheightitem(selectid))//准备创建最大高度选项
        return div
    }
}
function QYLattrbqcalloutcoloritem(selectid) {//创建CallOut颜色选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label" style="">${i18nattr.calloutcolor}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrbqcalloutcolorsub(selectid))//准备创建CallOut颜色选项的二级菜单
    return button
}
function QYLattrbqcalloutcolorsub(selectid) {//创建CallOut颜色选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrbqcalloutcolorsubitems(selectid))//准备创建CallOut颜色选项的b3-menu__items
    return div

    function QYLattrbqcalloutcolorsubitems(selectid) {//创建CallOut颜色选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrbqcalloutred(selectid))//红色
        div.appendChild(QYLattrbqcalloutorange(selectid))//橙色
        div.appendChild(QYLattrbqcalloutyellow(selectid))//黄色
        div.appendChild(QYLattrbqcalloutgreen(selectid))//绿色
        div.appendChild(QYLattrbqcalloutcyan(selectid))//青色
        div.appendChild(QYLattrbqcalloutblue(selectid))//蓝色
        div.appendChild(QYLattrbqcalloutpurple(selectid))//紫色
        div.appendChild(QYLattrbqcalloutpink(selectid))//粉色
        div.appendChild(QYLattrbqcalloutblack(selectid))//黑色
        div.appendChild(QYLattrbqcalloutgray(selectid))//灰色
        div.appendChild(QYLattrbqcalloutdelete(selectid))//默认颜色
        div.appendChild(QYLattrbqcalloutcancel(selectid))//取消CallOut
        div.appendChild(QYLattrbqcalloutrecover(selectid))//启用CallOut
        return div

        function QYLattrbqcalloutred(selectid) {//红色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout-color")
            button.setAttribute("custom-attr-value", "红色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.red}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutorange(selectid) {//橙色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout-color")
            button.setAttribute("custom-attr-value", "橙色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.orange}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutyellow(selectid) {//黄色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout-color")
            button.setAttribute("custom-attr-value", "黄色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.yellow}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutgreen(selectid) {//绿色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout-color")
            button.setAttribute("custom-attr-value", "绿色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.green}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutcyan(selectid) {//青色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout-color")
            button.setAttribute("custom-attr-value", "青色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.cyan}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutblue(selectid) {//蓝色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout-color")
            button.setAttribute("custom-attr-value", "蓝色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.blue}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutpurple(selectid) {//紫色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout-color")
            button.setAttribute("custom-attr-value", "紫色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.purple}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutpink(selectid) {//粉色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout-color")
            button.setAttribute("custom-attr-value", "粉色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.pink}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutblack(selectid) {//黑色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout-color")
            button.setAttribute("custom-attr-value", "黑色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.black}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutgray(selectid) {//灰色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout-color")
            button.setAttribute("custom-attr-value", "灰色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.gray}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutdelete(selectid) {//默认颜色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout-color")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.defaultcolor}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutcancel(selectid) {//取消CallOut样式
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.removecallout}</span><span class="b3-menu__accelerator">${i18nattr.group2}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrbqcalloutrecover(selectid) {//启用CallOut样式
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "bq-callout")
            button.setAttribute("custom-attr-value", "启用")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconQuote"></use></svg><span class="b3-menu__label">${i18nattr.recovercallout}</span><span class="b3-menu__accelerator">${i18nattr.group2}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
    }
}

/* -----------------------------------------文档块------------------------------------- */
function QYLfilesub(selectid) {//创建文档块二级菜单
    let div = document.createElement("div")
    div.id = "QYLfilesub"
    div.className = "b3-menu__submenu"
    div.appendChild(QYLfilesubitems(selectid))//准备创建文档块二级菜单的b3-menu__items
    return div

    function QYLfilesubitems(selectid) {//创建文档块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(QYLattrfilestyleitem(selectid))//准备创建文档样式选项
        div.appendChild(QYLattrlineheightitem(selectid))//准备创建文字行间距选项
        div.appendChild(QYLattrhstyleitem(selectid))//准备创建标题样式选项
        div.appendChild(QYLattrtablestyleitem(selectid))//准备创建表格样式选项
        div.appendChild(QYLattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(QYLattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(QYLattrblankblockreminditem(selectid))//准备创建空块提醒选项
        return div
    }
}
function QYLattrlineheightitem(selectid) {//创建文字行间距选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label" style="">${i18nattr.lineheight}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrlineheightsub(selectid))//准备创建文字行间距选项的二级菜单
    return button
}
function QYLattrlineheightsub(selectid) {//创建文字行间距选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrlineheightsubitems(selectid))//准备创建文字行间距选项的b3-menu__items
    return div

    function QYLattrlineheightsubitems(selectid) {//创建文字行间距选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrlineheight1(selectid))//单倍行距
        div.appendChild(QYLattrlineheight15(selectid))//1.5倍行距
        div.appendChild(QYLattrlineheight18(selectid))//1.8倍行距
        div.appendChild(QYLattrlineheight2(selectid))//双倍行距
        div.appendChild(QYLattrlineheightdelete(selectid))//恢复默认
        return div

        function QYLattrlineheight1(selectid) {//单倍行距
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "单倍行距")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">${i18nattr.lineheight1}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlineheight15(selectid) {//1.5倍行距
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "1.5倍行距")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">${i18nattr.lineheight15}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlineheight18(selectid) {//1.8倍行距
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "1.8倍行距")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">${i18nattr.lineheight18}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlineheight2(selectid) {//双倍行距
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "双倍行距")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">${i18nattr.lineheight2}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlineheightdelete(selectid) {//恢复默认
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.lineheightdefault}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
    }
}

function QYLattrblankblockreminditem(selectid) {//创建空块提醒选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label" style="">${i18nattr.blankblockremind}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrblankblockremindsub(selectid))//准备创建空块提醒选项的二级菜单
    return button
}
function QYLattrblankblockremindsub(selectid) {//创建空块提醒选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrblankblockremindsubitems(selectid))//准备创建空块提醒选项的b3-menu__items
    return div

    function QYLattrblankblockremindsubitems(selectid) {//创建空块提醒选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrblankblockremindon(selectid))//启用
        div.appendChild(QYLattrblankblockremindoff(selectid))//禁用
        return div

        function QYLattrblankblockremindon(selectid) {//启用空块提醒
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "blankblock-remind")
            button.setAttribute("custom-attr-value", "开启")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSelect"></use></svg><span class="b3-menu__label">${i18nattr.blankblockremindon}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrblankblockremindoff(selectid) {//禁用空块提醒
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "blankblock-remind")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.blankblockremindoff}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
    }
}

/* -----------------------------------------任意块------------------------------------- */
function QYLanyblocksub(selectid) {//创建任意块二级菜单
    let div = document.createElement("div")
    div.id = "QYLanyblocksub"
    div.className = "b3-menu__submenu"
    div.appendChild(QYLanyblocksubitems(selectid))//准备创建任意块二级菜单的b3-menu__items
    return div

    function QYLanyblocksubitems(selectid) {//创建任意块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(QYLattrstyleitem(selectid))//准备创建块样式选项
        div.appendChild(QYLattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(QYLattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(QYLattrheightitem(selectid))//准备创建最大高度选项
        return div
    }
}

/* -----------------------------------------表格块------------------------------------- */
function QYLNodeTablesub(selectid) {//创建表格块二级菜单
    let div = document.createElement("div")
    div.id = "QYLNodeTablesub"
    div.className = "b3-menu__submenu"
    div.appendChild(QYLNodeTablesubitems(selectid))//准备创建表格块二级菜单的b3-menu__items
    return div

    function QYLNodeTablesubitems(selectid) {//创建表格块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(QYLattrtablestyleitem(selectid))//准备创建表格样式选项
        div.appendChild(QYLattrstyleitem(selectid))//准备创建块样式选项
        div.appendChild(QYLattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(QYLattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(QYLattrheightitem(selectid))//准备创建最大高度选项
        return div
    }
}
function QYLattrtablestyleitem(selectid) {//创建表格样式选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label" style="">${i18nattr.tablestyle}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrtablestylesub(selectid))//准备创建表格样式选项的二级菜单
    return button
}
function QYLattrtablestylesub(selectid) {//创建表格样式选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrtablestylesubitems(selectid))//准备创建表格样式选项的b3-menu__items
    return div

    function QYLattrtablestylesubitems(selectid) {//创建表格样式选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLtablestylethreeline(selectid))//三线表
        div.appendChild(QYLtablestyletheadhl(selectid))//强化表头
        div.appendChild(QYLtablecolortheme(selectid))//主题色
        div.appendChild(QYLtablecolorred(selectid))//红色
        div.appendChild(QYLtablecolororange(selectid))//橙色
        div.appendChild(QYLtablecoloryellow(selectid))//黄色
        div.appendChild(QYLtablecolorgreen(selectid))//绿色
        div.appendChild(QYLtablecolorcyan(selectid))//青色
        div.appendChild(QYLtablecolorblue(selectid))//蓝色
        div.appendChild(QYLtablecolorpurple(selectid))//紫色
        div.appendChild(QYLtablecolorpink(selectid))//粉色
        div.appendChild(QYLtablewidth100(selectid))//全宽表格
        div.appendChild(QYLtablestyledelete(selectid))//清除属性
        return div

        function QYLtablestylethreeline(selectid) {//三线表
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-style")
            button.setAttribute("custom-attr-value", "三线表")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.threeline}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablestyletheadhl(selectid) {//强化表头
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-style-thead")
            button.setAttribute("custom-attr-value", "强化表头")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.theadhl}</span><span class="b3-menu__accelerator">${i18nattr.group2}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablecolortheme(selectid) {//主题色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-color")
            button.setAttribute("custom-attr-value", "主题色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.themecolor}</span><span class="b3-menu__accelerator">${i18nattr.group3}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablecolorred(selectid) {//红色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-color")
            button.setAttribute("custom-attr-value", "红色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.red}</span><span class="b3-menu__accelerator">${i18nattr.group3}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablecolororange(selectid) {//橙色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-color")
            button.setAttribute("custom-attr-value", "橙色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.orange}</span><span class="b3-menu__accelerator">${i18nattr.group3}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablecoloryellow(selectid) {//黄色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-color")
            button.setAttribute("custom-attr-value", "黄色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.yellow}</span><span class="b3-menu__accelerator">${i18nattr.group3}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablecolorgreen(selectid) {//绿色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-color")
            button.setAttribute("custom-attr-value", "绿色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.green}</span><span class="b3-menu__accelerator">${i18nattr.group3}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablecolorcyan(selectid) {//青色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-color")
            button.setAttribute("custom-attr-value", "青色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.cyan}</span><span class="b3-menu__accelerator">${i18nattr.group3}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablecolorblue(selectid) {//蓝色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-color")
            button.setAttribute("custom-attr-value", "蓝色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.blue}</span><span class="b3-menu__accelerator">${i18nattr.group3}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablecolorpurple(selectid) {//紫色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-color")
            button.setAttribute("custom-attr-value", "紫色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.purple}</span><span class="b3-menu__accelerator">${i18nattr.group3}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablecolorpink(selectid) {//粉色
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-color")
            button.setAttribute("custom-attr-value", "粉色")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.pink}</span><span class="b3-menu__accelerator">${i18nattr.group3}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablewidth100(selectid) {//全宽表格
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-width")
            button.setAttribute("custom-attr-value", "全宽表格")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">${i18nattr.tablewidth100}</span><span class="b3-menu__accelerator">${i18nattr.group4}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablestyledelete(selectid) {//全部清除
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-style")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.tablestyledelete}</span>`
            button.onclick = function(e) {
                button.setAttribute("custom-attr-name", "table-style");
                button.setAttribute("custom-attr-value", "");
                QYLcustomattrset.call(button, e);
        
                button.setAttribute("custom-attr-name", "table-style-thead");
                button.setAttribute("custom-attr-value", "");
                QYLcustomattrset.call(button, e);

                button.setAttribute("custom-attr-name", "table-color");
                button.setAttribute("custom-attr-value", "");
                QYLcustomattrset.call(button, e);

                button.setAttribute("custom-attr-name", "table-width");
                button.setAttribute("custom-attr-value", "");
                QYLcustomattrset.call(button, e);
            };
            return button
        }
    }
}

/* -----------------------------------------标题块------------------------------------- */
    function QYLNodeHeadingsub(selectid) {//创建标题块二级菜单
        let div = document.createElement("div")
        div.id = "QYLNodeHeadingsub"
        div.className = "b3-menu__submenu"
        div.appendChild(QYLNodeHeadingsubitems(selectid))//准备创建标题块二级菜单的b3-menu__items
        return div

        function QYLNodeHeadingsubitems(selectid) {//创建标题块二级菜单的b3-menu__items
            let div = document.createElement("div")
            div.className = "b3-menu__items"
            div.appendChild(QYLattrcssitem(selectid))//准备创建css属性选项
            div.appendChild(QYLattrhstyleitem(selectid))//准备创建标题样式选项
            div.appendChild(QYLattrstyleitem(selectid))//准备创建块样式选项
            div.appendChild(QYLattrimgitem(selectid))//准备创建图片样式选项
            div.appendChild(QYLattrfontfamilyitem(selectid))//准备创建字体选项
            div.appendChild(QYLattrheightitem(selectid))//准备创建最大高度选项
            return div
        }
    }
    function QYLattrhstyleitem(selectid) {//创建标题样式选项
        let button = document.createElement(`button`);
        button.className = "b3-menu__item"
        button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label" style="">${i18nattr.headingstyle}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
        button.appendChild(QYLattrhstylesub(selectid))//准备创建标题样式选项的二级菜单
        return button
    }
    function QYLattrhstylesub(selectid) {//创建标题样式选项的二级菜单
        let div = document.createElement(`div`);
        div.className = "b3-menu__submenu"
        div.appendChild(QYLattrhstylesubitems(selectid))//准备创建标题样式选项的b3-menu__items
        return div

        function QYLattrhstylesubitems(selectid) {//创建标题样式选项的b3-menu__items
            let div = document.createElement("div")
            div.className = "b3-menu__items"
            div.appendChild(QYLhstyleduocai(selectid))//多彩
            div.appendChild(QYLhstyleguzhang(selectid))//故障
            div.appendChild(QYLhstylejinbo(selectid))//金箔
            div.appendChild(QYLhstylexiahuaxian(selectid))//下划线
            div.appendChild(QYLhstylezuobiankuang(selectid))//左边框
            div.appendChild(QYLhstylecengji(selectid))//层级
            div.appendChild(QYLhstyledelete(selectid))//全部清除
            return div
        }

        function QYLhstyleduocai(selectid) {//多彩
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style")
            button.setAttribute("custom-attr-value", "多彩")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">${i18nattr.headingstylecolorful}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLhstyleguzhang(selectid) {//故障
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style")
            button.setAttribute("custom-attr-value", "故障")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">${i18nattr.headingstyleglitch}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLhstylejinbo(selectid) {//金箔
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style")
            button.setAttribute("custom-attr-value", "金箔")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">${i18nattr.headingstylegold}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLhstylexiahuaxian(selectid) {//下划线
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style-u")
            button.setAttribute("custom-attr-value", "下划线")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">${i18nattr.headingstyleunderline}</span><span class="b3-menu__accelerator">${i18nattr.group2}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLhstylezuobiankuang(selectid) {//左边框
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style-u")
            button.setAttribute("custom-attr-value", "左边框")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">${i18nattr.headingstyleleftborder}</span><span class="b3-menu__accelerator">${i18nattr.group2}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLhstylecengji(selectid) {//层级
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style-l")
            button.setAttribute("custom-attr-value", "层级")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">${i18nattr.headingstylelevel}</span><span class="b3-menu__accelerator">${i18nattr.group2}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLhstyledelete(selectid) {//全部清除
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.headingstyledelete}</span>`
            button.onclick = function(e) {
                button.setAttribute("custom-attr-name", "h-style");
                button.setAttribute("custom-attr-value", "");
                QYLcustomattrset.call(button, e);
        
                button.setAttribute("custom-attr-name", "h-style-u");
                button.setAttribute("custom-attr-value", "");
                QYLcustomattrset.call(button, e);

                button.setAttribute("custom-attr-name", "h-style-l");
                button.setAttribute("custom-attr-value", "");
                QYLcustomattrset.call(button, e);
            };
            return button
        }
    }




/* -----------------------------------------css属性（通用）------------------------------------- */
function QYLattrcssitem(selectid) {//创建css属性选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconSettings"></use></svg><span class="b3-menu__label" style="">CSS</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrcsssub(selectid))//准备创建css属性选项的二级菜单
    return button
}
function QYLattrcsssub(selectid) {//创建css属性选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrcsssubitems(selectid))//准备创建css属性选项的b3-menu__items
    return div

    function QYLattrcsssubitems(selectid) {//创建css属性选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.style.padding = "4px 8px"
        div.appendChild(QYLattrcsstextarea(selectid))//输入区域
        return div

        function QYLattrcsstextarea(selectid) {
            let textarea = document.createElement("textarea");
            textarea.className = "b3-text-field QYLcssinput";
            textarea.style.height = "150px";
            textarea.style.width = "550px";
            textarea.style.color = "var(--b3-theme-on-surface)";
            textarea.setAttribute("spellcheck", "false");
            textarea.setAttribute("data-node-id", selectid);
            textarea.setAttribute("custom-attr-name", "css");
            textarea.value = "";
            textarea.placeholder = `${i18nattr.CSSplaceholder}`;
        
            查询css自定义块属性的内容(selectid)
                .then(customcssvalue => {
                    if (customcssvalue) {
                        textarea.value = customcssvalue;
                        textarea.setAttribute("custom-attr-value", customcssvalue);
                    } else {
                        textarea.setAttribute("custom-attr-value", "");
                    }
                })
                .catch(err => {
                    console.error("获取CSS值失败:", err);
                });
        
            textarea.addEventListener(`blur`, function(e) {
                const value = e.target.value;
                e.target.setAttribute("custom-attr-value", value);
                QYLcustomattrset(e);
            });
        
            return textarea;
        }
    }
}

/* -----------------------------------------img属性（通用）------------------------------------- */
function QYLattrimgitem(selectid) {//创建图片样式选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label" style="">${i18nattr.imgstyle}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrimgsub(selectid))//准备创建图片样式选项的二级菜单
    return button
}
function QYLattrimgsub(selectid) {//创建图片样式选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrimgsubitems(selectid))//准备创建图片样式选项的b3-menu__items
    return div

    function QYLattrimgsubitems(selectid) {//创建图片样式选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLimgborder(selectid))//圆角
        div.appendChild(QYLimgcircle(selectid))//圆形
        div.appendChild(QYLimgshadow(selectid))//立体
        div.appendChild(QYLimginvert(selectid))//反色
        div.appendChild(QYLimggrid(selectid))//九宫格排列
        div.appendChild(QYLimgdelete(selectid))//全部清除
        return div

            function QYLimgborder(selectid) {//圆角
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-border")
                button.setAttribute("custom-attr-value", "圆角")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">${i18nattr.imgstyleroundedcorners}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLimgcircle(selectid) {//圆形
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-border")
                button.setAttribute("custom-attr-value", "圆形")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">${i18nattr.imgstylecircle}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLimgshadow(selectid) {//立体
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-shadow")
                button.setAttribute("custom-attr-value", "立体")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">${i18nattr.imgstyleshadow}</span><span class="b3-menu__accelerator">${i18nattr.group2}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLimginvert(selectid) {//反色
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-invert")
                button.setAttribute("custom-attr-value", "反色")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">${i18nattr.imgstyleinvert}</span><span class="b3-menu__accelerator">${i18nattr.group2}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLimggrid(selectid) {//九宫格排列
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-display")
                button.setAttribute("custom-attr-value", "九宫格排列")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">${i18nattr.imgstyle33grid}</span><span class="b3-menu__accelerator">${i18nattr.group2}</span>`
                button.onclick = QYLcustomattrset
                return button
            }

            function QYLimgdelete(selectid) {//全部清除
                let button = document.createElement("button")
                button.className = "b3-menu__item b3-menu__item--warning"
                button.style.color = "var(--b3-theme-error)"
                button.setAttribute("data-node-id", selectid)
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.imgstyledelete}</span>`
                button.onclick = function(e) {
                    button.setAttribute("custom-attr-name", "img-border");
                    button.setAttribute("custom-attr-value", "");
                    QYLcustomattrset.call(button, e);
            
                    button.setAttribute("custom-attr-name", "img-shadow");
                    button.setAttribute("custom-attr-value", "");
                    QYLcustomattrset.call(button, e);

                    button.setAttribute("custom-attr-name", "img-invert");
                    button.setAttribute("custom-attr-value", "");
                    QYLcustomattrset.call(button, e);

                    button.setAttribute("custom-attr-name", "img-display");
                    button.setAttribute("custom-attr-value", "");
                    QYLcustomattrset.call(button, e);
                };
                return button
            }
        }
}

/* -----------------------------------------height属性（通用）------------------------------------- */
function QYLattrheightitem(selectid) {//创建最大高度选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label" style="">${i18nattr.maxheight}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrheightsub(selectid))//准备创建最大高度选项的二级菜单
    return button
}
function QYLattrheightsub(selectid) {//创建最大高度选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrheightsubitems(selectid))//准备创建最大高度选项的b3-menu__items
    return div

    function QYLattrheightsubitems(selectid) {//创建最大高度选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLheight50(selectid))//50
        div.appendChild(QYLheight100(selectid))//100
        div.appendChild(QYLheight150(selectid))//150
        div.appendChild(QYLheight200(selectid))//200
        div.appendChild(QYLheight300(selectid))//300
        div.appendChild(QYLheight400(selectid))//400
        div.appendChild(QYLheight500(selectid))//500
        div.appendChild(QYLheightdelete(selectid))//清除属性
        return div

            function QYLheight50(selectid) {//50
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "50")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">${i18nattr.maxheight50}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight100(selectid) {//100
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "100")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">${i18nattr.maxheight100}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight150(selectid) {//150
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "150")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">${i18nattr.maxheight150}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight200(selectid) {//200
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "200")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">${i18nattr.maxheight200}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight300(selectid) {//300
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "300")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">${i18nattr.maxheight300}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight400(selectid) {//400
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "400")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">${i18nattr.maxheight400}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight500(selectid) {//500
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "500")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">${i18nattr.maxheight500}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheightdelete(selectid) {//清除属性
                let button = document.createElement("button")
                button.className = "b3-menu__item b3-menu__item--warning"
                button.style.color = "var(--b3-theme-error)"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.maxheightdelete}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
        }
}

/* -----------------------------------------文档style属性（通用）------------------------------------- */
function QYLattrfilestyleitem(selectid) {//创建文档样式选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">${i18nattr.fileblockstyle}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrfilestylesub(selectid))//准备创建文档样式选项的二级菜单
    return button
}
function QYLattrfilestylesub(selectid) {//创建文档样式选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrfilestylesubitems(selectid))//准备创建文档样式选项的b3-menu__items
    return div

    function QYLattrfilestylesubitems(selectid) {//创建文档样式选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLstylewangge(selectid))//网格
        div.appendChild(QYLstylesajinzhi(selectid))//洒金纸
        div.appendChild(QYLstyledot(selectid))//格点
        div.appendChild(QYLstyledelete(selectid))//清除属性
        return div
        function QYLstylesajinzhi(selectid) {//洒金纸
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "style")
            button.setAttribute("custom-attr-value", "洒金纸")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.fileblockstylesajinzhi}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLstylewangge(selectid) {//网格
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "style")
            button.setAttribute("custom-attr-value", "网格")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.fileblockstylegrid}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLstyledot(selectid) {//格点
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "style")
            button.setAttribute("custom-attr-value", "格点")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.fileblockstyledot}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLstyledelete(selectid) {//清除属性
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "style")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.fileblockstyledelete}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
    }
}

/* -----------------------------------------style属性（通用）------------------------------------- */
    function QYLattrstyleitem(selectid) {//创建块样式选项
        let button = document.createElement(`button`);
        button.className = "b3-menu__item"
        button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">${i18nattr.blockstyle}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
        button.appendChild(QYLattrstylesub(selectid))//准备创建块样式选项的二级菜单
        return button
    }
    function QYLattrstylesub(selectid) {//创建块样式选项的二级菜单
        let div = document.createElement(`div`);
        div.className = "b3-menu__submenu"
        div.appendChild(QYLattrstylesubitems(selectid))//准备创建块样式选项的b3-menu__items
        return div

        function QYLattrstylesubitems(selectid) {//创建块样式选项的b3-menu__items
            let div = document.createElement("div")
            div.className = "b3-menu__items"
            div.appendChild(QYLstylewarning(selectid))//警告
            div.appendChild(QYLstyletip(selectid))//灵感
            div.appendChild(QYLstyleinfo(selectid))//信息
            div.appendChild(QYLstyleimportant(selectid))//重要
            div.appendChild(QYLstylecomment(selectid))//批注
            div.appendChild(QYLstylequote(selectid))//引用
            div.appendChild(QYLstyletodo(selectid))//待办
            div.appendChild(QYLstyledone(selectid))//完成
            div.appendChild(QYLstylesajinzhi(selectid))//洒金纸
            div.appendChild(QYLstylewangge(selectid))//网格
            div.appendChild(QYLstyledot(selectid))//格点
            div.appendChild(QYLstylenoteitem(selectid))//便签
            div.appendChild(QYLstyleleftborderitem(selectid))//左边框
            div.appendChild(QYLstyledelete(selectid))//清除属性
            return div

            function QYLstylewarning(selectid) {//警告
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "警告")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blockstylewarning}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyletip(selectid) {//灵感
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "灵感")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blockstyletip}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyleinfo(selectid) {//信息
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "信息")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blockstyleinfo}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyleimportant(selectid) {//重要
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "重要")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blockstyleimportant}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstylecomment(selectid) {//批注
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "批注")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blockstylecomment}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstylequote(selectid) {//引用
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "引用")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blockstylequote}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyletodo(selectid) {//待办
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "待办")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blockstyletodo}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyledone(selectid) {//完成
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "完成")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blockstyledone}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstylesajinzhi(selectid) {//洒金纸
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "洒金纸")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blockstylesajinzhi}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstylewangge(selectid) {//网格
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "网格")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blockstylegrid}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyledot(selectid) {//格点
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "格点")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blockstyledot}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyledelete(selectid) {//清除属性
                let button = document.createElement("button")
                button.className = "b3-menu__item b3-menu__item--warning"
                button.style.color = "var(--b3-theme-error)"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.blockstyledelete}</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstylenoteitem(selectid) {//创建便签选项
                let button = document.createElement(`button`);
                button.className = "b3-menu__item"
                button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">${i18nattr.blockstylenote}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                button.appendChild(QYLstylenotesub(selectid))//准备便签选项的二级菜单
                return button
                }
                function QYLstylenotesub(selectid) {//创建便签选项的二级菜单
                    let div = document.createElement(`div`);
                    div.className = "b3-menu__submenu"
                    div.appendChild(QYLstylenotesubitems(selectid))//准备便签选项的b3-menu__items
                    return div

                    function QYLstylenotesubitems(selectid) {//创建便签选项的b3-menu__items
                        let div = document.createElement("div")
                        div.className = "b3-menu__items"
                        div.appendChild(QYLstylerednote(selectid))//红色便签
                        div.appendChild(QYLstyleorangenote(selectid))//橙色便签
                        div.appendChild(QYLstyleyellownote(selectid))//黄色便签
                        div.appendChild(QYLstylegreennote(selectid))//绿色便签
                        div.appendChild(QYLstylecyannote(selectid))//青色便签
                        div.appendChild(QYLstylebluenote(selectid))//蓝色便签
                        div.appendChild(QYLstylepurplenote(selectid))//紫色便签
                        div.appendChild(QYLstylepinknote(selectid))//粉色便签
                        div.appendChild(QYLstyleblacknote(selectid))//黑色便签
                        div.appendChild(QYLstylegraynote(selectid))//灰色便签

                        return div

                        function QYLstylerednote(selectid) {//红色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "红色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.red}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstyleorangenote(selectid) {//橙色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "橙色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.orange}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstyleyellownote(selectid) {//黄色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "黄色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.yellow}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylegreennote(selectid) {//绿色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "绿色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.green}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylecyannote(selectid) {//青色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "青色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.cyan}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylebluenote(selectid) {//蓝色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "蓝色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blue}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylepurplenote(selectid) {//紫色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "紫色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.purple}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylepinknote(selectid) {//粉色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "粉色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.pink}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstyleblacknote(selectid) {//黑色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "黑色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.black}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylegraynote(selectid) {//灰色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "灰色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.gray}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                    }
                }
                function QYLstyleleftborderitem(selectid) {//创建左边框选项
                    let button = document.createElement(`button`);
                    button.className = "b3-menu__item"
                    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">${i18nattr.blockstyleleftborder}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                    button.appendChild(QYLstyleleftbordersub(selectid))//准备左边框选项的二级菜单
                    return button
                    }
                    function QYLstyleleftbordersub(selectid) {//创建左边框选项的二级菜单
                        let div = document.createElement(`div`);
                        div.className = "b3-menu__submenu"
                        div.appendChild(QYLstyleleftbordersubitems(selectid))//准备左边框选项的b3-menu__items
                        return div
    
                        function QYLstyleleftbordersubitems(selectid) {//创建左边框选项的b3-menu__items
                            let div = document.createElement("div")
                            div.className = "b3-menu__items"
                            div.appendChild(QYLstylerednote(selectid))//红左边框
                            div.appendChild(QYLstyleorangenote(selectid))//橙左边框
                            div.appendChild(QYLstyleyellownote(selectid))//黄左边框
                            div.appendChild(QYLstylegreennote(selectid))//绿左边框
                            div.appendChild(QYLstylecyannote(selectid))//青左边框
                            div.appendChild(QYLstylebluenote(selectid))//蓝左边框
                            div.appendChild(QYLstylepurplenote(selectid))//紫左边框
                            div.appendChild(QYLstylepinknote(selectid))//粉左边框
                            div.appendChild(QYLstyleblacknote(selectid))//黑左边框
                            div.appendChild(QYLstylegraynote(selectid))//灰左边框
    
                            return div
    
                            function QYLstylerednote(selectid) {//红左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "红左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.red}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstyleorangenote(selectid) {//橙左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "橙左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.orange}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstyleyellownote(selectid) {//黄左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "黄左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.yellow}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylegreennote(selectid) {//绿左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "绿左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.green}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylecyannote(selectid) {//青左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "青左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.cyan}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylebluenote(selectid) {//蓝左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "蓝左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.blue}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylepurplenote(selectid) {//紫左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "紫左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.purple}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylepinknote(selectid) {//粉左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "粉左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.pink}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstyleblacknote(selectid) {//黑左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "黑左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.black}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylegraynote(selectid) {//灰左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "灰左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">${i18nattr.gray}</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                        }
                    }
        }
    }


/* -----------------------------------------font-family属性（通用）------------------------------------- */
function QYLattrfontfamilyitem(selectid) {//创建字体选项
    let button = document.createElement(`button`);
    button.className = "b3-menu__item"
    button.innerHTML = `<svg class="b3-menu__icon" style="null"><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label" style="">${i18nattr.fontfamily}</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>`
    button.appendChild(QYLattrfontfamilysub(selectid))//准备创建字体选项的二级菜单
    return button
}
function QYLattrfontfamilysub(selectid) {//创建字体选项的二级菜单
    let div = document.createElement(`div`);
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrfontfamilysubitems(selectid))//准备创建字体选项的b3-menu__items
    return div
    
    function QYLattrfontfamilysubitems(selectid) {//创建字体选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLfontsongti(selectid))//宋体
        div.appendChild(QYLfontyouyuan(selectid))//幼圆
        div.appendChild(QYLfontheiti(selectid))//黑体
        div.appendChild(QYLfontwryahei(selectid))//微软雅黑
        div.appendChild(QYLfontxinsongti(selectid))//新宋体
        div.appendChild(QYLfontkaiti(selectid))//楷体
        div.appendChild(QYLfontlishu(selectid))//隶书
        div.appendChild(QYLfontfangsong(selectid))//仿宋
        div.appendChild(QYLfonthwsongti(selectid))//华文宋体
        div.appendChild(QYLfonthwzhongsong(selectid))//华文中宋
        div.appendChild(QYLfonthwfangsong(selectid))//华文仿宋
        div.appendChild(QYLfonthwcaiyun(selectid))//华文彩云
        div.appendChild(QYLfonthwxinwei(selectid))//华文新魏
        div.appendChild(QYLfonthwkaiti(selectid))//华文楷体
        div.appendChild(QYLfonthwhupo(selectid))//华文琥珀
        div.appendChild(QYLfonthwxihei(selectid))//华文细黑
        div.appendChild(QYLfonthwxingkai(selectid))//华文行楷
        div.appendChild(QYLfonthwlishu(selectid))//华文隶书
        div.appendChild(QYLfontfzyaoti(selectid))//方正姚体
        div.appendChild(QYLfontfzshuti(selectid))//方正舒体
        div.appendChild(QYLfonttnm(selectid))//Times New Roman
        div.appendChild(QYLfontdelete(selectid))//清除属性
        return div

        function QYLfontsongti(selectid) {//宋体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "SimSun"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "宋体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">宋体</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfontyouyuan(selectid) {//幼圆
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "YouYuan"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "幼圆")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">幼圆</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfontheiti(selectid) {//黑体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "SimHei"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "黑体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">黑体</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfontwryahei(selectid) {//微软雅黑
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "Microsoft YaHei"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "微软雅黑")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">微软雅黑</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfontxinsongti(selectid) {//新宋体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "NSimSun"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "新宋体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">新宋体</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfontkaiti(selectid) {//楷体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "KaiTi"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "楷体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">楷体</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfontlishu(selectid) {//隶书
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "LiSu"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "隶书")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">隶书</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfontfangsong(selectid) {//仿宋
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "FangSong"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "仿宋")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">仿宋</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfonthwsongti(selectid) {//华文宋体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STSong"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文宋体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文宋体</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfonthwzhongsong(selectid) {//华文中宋
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STZhongsong"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文中宋")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文中宋</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfonthwfangsong(selectid) {//华文仿宋
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STFangsong"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文仿宋")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文仿宋</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfonthwcaiyun(selectid) {//华文彩云
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STCaiyun"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文彩云")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文彩云</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfonthwxinwei(selectid) {//华文新魏
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STXinwei"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文新魏")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文新魏</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfonthwkaiti(selectid) {//华文楷体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STKaiti"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文楷体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文楷体</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfonthwhupo(selectid) {//华文琥珀
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STHupo"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文琥珀")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文琥珀</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfonthwxihei(selectid) {//华文细黑
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STXihei"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文细黑")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文细黑</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfonthwxingkai(selectid) {//华文行楷
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STXingkai"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文行楷")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文行楷</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfonthwlishu(selectid) {//华文隶书
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STLiti"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文隶书")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文隶书</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfontfzyaoti(selectid) {//方正姚体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "FZYaoti"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "方正姚体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">方正姚体</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfontfzshuti(selectid) {//方正舒体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "FZShuTi"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "方正舒体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">方正舒体</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfonttnm(selectid) {//Times New Roman
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "Times New Roman"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "Times New Roman")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">Times New Roman</span><span class="b3-menu__accelerator">${i18nattr.group1}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLfontdelete(selectid) {//清除属性
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">${i18nattr.fontfamilydelete}</span>`
            button.onclick = QYLcustomattrset
            return button
        }
    }
}

/* -----------------------------------------块属性API------------------------------------- */
    function QYLcustomattrset(event) {//设置自定义块属性
      let id = event.currentTarget.getAttribute("data-node-id")
      let attrName = 'custom-' + event.currentTarget.getAttribute("custom-attr-name")
      let attrValue = event.currentTarget.getAttribute("custom-attr-value")
      let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`)
      if (blocks) {
        blocks.forEach(block => block.setAttribute(attrName, attrValue))
      }
      let attrs = {}
      attrs[attrName] = attrValue
      设置思源块属性(id, attrs)
    }
    async function 查询css自定义块属性的内容(selectid) {
        if (!selectid) return null;
        try {
            const 属性对象 = await 获取思源块属性(selectid, ["custom-css"]);
            const customcssvalue = 属性对象?.['custom-css']?.trim(); 
            return customcssvalue || null;
        } catch (err) {
            console.error("获取css自定义属性失败", err);
            return null;
        }
    }

    async function 向思源请求数据(url, data) {
        try {
            const response = await fetch(url, {
                body: JSON.stringify(data),
                method: 'POST',
                headers: { Authorization: 'Token ' } 
            });
            return response.ok ? await response.json() : null;
        } catch (error) {
            console.error('[QYL] API 请求失败:', error); 
            return null;
        }
    }
    async function 解析响应体(response) {
        try {
            const result = await response;
            if (!result) return null;
            return result.code === 0 ? result.data : null;
        } catch (error) {
            console.error('[QYL] 响应解析失败:', error);
            return null;
        }
    }
    async function 设置思源块属性(内容块id, 属性对象) {
        return 解析响应体(向思源请求数据('/api/attr/setBlockAttrs', {
            id: 内容块id,
            attrs: 属性对象,
        }));
    }
    async function 获取思源块属性(内容块id, 属性对象) {
        return 解析响应体(向思源请求数据('/api/attr/getBlockAttrs', {
            id: 内容块id,
            attrs: 属性对象,
        }));
    }
}

// 状态栏防遮挡
// QYL PROPRIETARY CODE - DO NOT COPY, DISTRIBUTE OR MODIFY!!!
setTimeout(() => {
    const statusElement = document.getElementById('status');
    if (!statusElement) return;
    const container = document.querySelector('.layout__center');
    if (!container) return;
    const targetSelector = '.layout__wnd--active > .layout-tab-container > .fn__flex-1:not(.fn__none):not(.protyle)';

    function checkElement() {
        const targetExists = document.querySelector(targetSelector) !== null;
        statusElement.classList.toggle('QYLstatushidden', targetExists);
    }
    function debounce(func, delay) {
        let timeoutId;
        return function() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(), delay);
        };
    }
    const debouncedCheck = debounce(checkElement, 500);
    const observer = new MutationObserver(debouncedCheck);
    observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });
    checkElement();
}, 1000);