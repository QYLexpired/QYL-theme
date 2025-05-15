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
        QYLbgdps: ' 配色：勃艮第',
        QYLxqps: ' 配色：玄青',
        QYLmcps: ' 配色：墨翠',
        QYLhmps: ' 配色：灰幕',
        QYLcxps: ' 配色：赤霞',
        QYLtxps: ' 配色：苔雪',
        QYLmaps: ' 配色：暮霭',
        QYLwmps: ' 配色：乌木',
        QYLwyps: ' 配色：午夜',
        QYLbphfg: ' 扁平化风格',
        QYLcjsdl: ' 沉浸式顶栏',
    },
    en_US: {
        QYLztsz: ' QYL-Theme Settings',
        QYLbjwk: ' Hide Marked Text',
        QYLsjx: ' File Tree With Indentation Guides',
        QYLycdl: ' Hide The Topbar',
        QYLdlrh: ' Tab-Integrated Topbar',
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
        QYLbgdps: ' Burgundy Theme',
        QYLxqps: ' Xuanqing Theme',
        QYLmcps: ' Blackjadeite Theme',
        QYLhmps: ' Grayscreen Theme',
        QYLcxps: ' Cabernet Sauvignon Theme',
        QYLtxps: ' Mossnow Theme',
        QYLmaps: ' Dusk Mist Theme',
        QYLwmps: ' Bogwood Theme',
        QYLwyps: ' Midnight Theme',
        QYLbphfg: ' Flat Style',
        QYLcjsdl: ' Immersive Topbar',
    },
    zh_CHT: {
        QYLztsz: ' QYL主題設定',
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
        QYLbgdps: ' 配色：勃艮第',
        QYLxqps: ' 配色：玄青',
        QYLmcps: ' 配色：墨翠',
        QYLhmps: ' 配色：灰幕',
        QYLcxps: ' 配色：赤霞',
        QYLtxps: ' 配色：苔雪',
        QYLmaps: ' 配色：暮靄',
        QYLwmps: ' 配色：烏木',
        QYLwyps: ' 配色：午夜',
        QYLbphfg: ' 扁平化風格',
        QYLcjsdl: ' 沉浸式頂欄',
    },
};
const i18n = I18N[window.siyuan.config.lang] || I18N.en_US;

// 添加Q按钮
(function() {
    addThemeToolBar();
})();
function addThemeToolBar() {
    var QYLToolBar = document.getElementById("QToolbar");
    if (!QYLToolBar) {
        var toolbarVIP = document.getElementById("toolbarVIP");
        var windowControls = document.getElementById("windowControls");
        QYLToolBar = document.createElement("div");
        QYLToolBar.id = "QToolbar";
        QYLToolBar.className = "toolbar__item ariaLabel";
        QYLToolBar.style.width = "23.5px";
        QYLToolBar.style.height = "23.5px";
        QYLToolBar.innerHTML = `<svg t="1740797651161" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4700" width="24" height="24"><path d="M896 0a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128H128a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h768zM505.856 179.712c-97.664 0-174.72 31.36-230.272 95.872-53.76 60.928-79.744 139.776-79.744 237.44 0 96.768 25.984 175.616 79.744 236.544 55.552 62.72 132.608 94.976 230.272 94.976 66.304 0 122.752-14.336 170.24-43.008 23.296 31.36 46.592 64.512 70.784 99.456l62.72-55.552c-23.296-34.048-47.488-66.304-70.784-97.664 51.968-60.928 77.952-138.88 77.952-234.752 0-98.56-26.88-178.304-80.64-238.336-56.448-63.616-133.504-94.976-230.272-94.976z m0 86.016c68.096 0 120.96 21.504 157.696 66.304 35.84 43.904 54.656 103.936 54.656 180.992 0 65.408-13.44 118.272-40.32 159.488A2949.44 2949.44 0 0 0 581.12 564.096l-56.448 55.552c31.36 33.152 63.616 69.888 95.872 110.208-31.36 18.816-69.888 28.672-114.688 28.672-68.096 0-120.96-23.296-158.592-68.096-35.84-43.904-53.76-103.04-53.76-177.408 0-75.264 17.92-134.4 53.76-178.304 37.632-46.592 90.496-68.992 158.592-68.992z" opacity=".9" p-id="4701"></path></svg>`;
        QYLToolBar.ariaLabel = i18n.QYLztsz;
        QYLToolBar.style.userSelect = 'none';
        const handleToolbarClick = () => {
            const settingsWindow = document.getElementById('QYLsettings-window');
            settingsWindow ? closeSettingsWindow() : createSettingsWindow();
        };

        var parentElement = toolbarVIP ? toolbarVIP.parentElement : (windowControls ? windowControls.parentElement : null);
        if (!parentElement) {
            document.body.classList.add("QYLmobile");
            QYLToolBar.className = "block__icon fn__flex-center ariaLabel";
            QYLToolBar.style.height = "14px";
            QYLToolBar.style.width = "14px";
            var breadcrumbButtons = document.getElementsByClassName("block__icon fn__flex-center ariaLabel");
            try {
                var firstButton = breadcrumbButtons[0];
                const container = firstButton.parentElement;
                container.insertBefore(QYLToolBar, firstButton);
                QYLToolBar.addEventListener("click", handleToolbarClick);
            } catch (error) {
                setTimeout(function() {
                    var firstButton = document.getElementsByClassName("block__icon fn__flex-center ariaLabel")[0];
                    if (firstButton) {
                        const container = firstButton.parentElement;
                        container.insertBefore(QYLToolBar, firstButton);
                        QYLToolBar.addEventListener("click", handleToolbarClick);
                    }
                }, 1000);
            }
            return;
        }
        parentElement.insertBefore(QYLToolBar, toolbarVIP || windowControls);
        QYLToolBar.addEventListener("click", handleToolbarClick);
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
let isChecked20;
let isChecked21;
let isChecked22;
let isChecked23;
let isChecked24;
let isChecked25;
let isChecked30;
let isChecked31;
let isChecked34;
let isChecked35;

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

    // 创建复选框和标签
    const checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.id = 'mark-empty-checkbox';
    checkbox1.checked = isChecked1;

    const label1 = document.createElement('label');
    label1.htmlFor = 'mark-empty-checkbox';
    label1.textContent = i18n.QYLbjwk;
    label1.style.fontSize = '14px';
    label1.style.userSelect= 'none';

    const checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'filetree-indent-checkbox';
    checkbox2.checked = isChecked2;

    const label2 = document.createElement('label');
    label2.htmlFor = 'filetree-indent-checkbox';
    label2.textContent = i18n.QYLsjx;
    label2.style.fontSize = '14px';
    label2.style.userSelect= 'none';

    const checkbox3 = document.createElement('input');
    checkbox3.type = 'checkbox';
    checkbox3.id = 'toolbar-hidden-checkbox';
    checkbox3.checked = isChecked3;

    const label3 = document.createElement('label');
    label3.htmlFor = 'toolbar-hidden-checkbox';
    label3.textContent = i18n.QYLycdl;
    label3.style.fontSize = '14px';
    label3.style.userSelect= 'none';

    const checkbox4 = document.createElement('input');
    checkbox4.type = 'checkbox';
    checkbox4.id = 'hoverblock-remind-checkbox';
    checkbox4.checked = isChecked4;

    const label4 = document.createElement('label');
    label4.htmlFor = 'hoverblock-remind-checkbox';
    label4.textContent = i18n.QYLhoverhighlight;
    label4.style.fontSize = '14px';
    label4.style.userSelect= 'none';

    const checkbox5 = document.createElement('input');
    checkbox5.type = 'checkbox';
    checkbox5.id = 'sbblock-remind-checkbox';
    checkbox5.checked = isChecked5;

    const label5 = document.createElement('label');
    label5.htmlFor = 'sbblock-remind-checkbox';
    label5.textContent = i18n.QYLsbhoverhighlight;
    label5.style.fontSize = '14px';
    label5.style.userSelect= 'none';

    const checkbox6 = document.createElement('input');
    checkbox6.type = 'checkbox';
    checkbox6.id = 'fullwidthpage-checkbox';
    checkbox6.checked = isChecked6;

    const label6 = document.createElement('label');
    label6.htmlFor = 'fullwidthpage-checkbox';
    label6.textContent = i18n.QYLqkxs;
    label6.style.fontSize = '14px';
    label6.style.userSelect= 'none';

    const checkbox7 = document.createElement('input');
    checkbox7.type = 'checkbox';
    checkbox7.id = 'colorfulfiletree-checkbox';
    checkbox7.checked = isChecked7;

    const label7 = document.createElement('label');
    label7.htmlFor = 'colorfulfiletree-checkbox';
    label7.textContent = i18n.QYLdcwds;
    label7.style.fontSize = '14px';
    label7.style.userSelect= 'none';

    const checkbox8 = document.createElement('input');
    checkbox8.type = 'checkbox';
    checkbox8.id = 'focusblockremind-checkbox';
    checkbox8.checked = isChecked8;

    const label8 = document.createElement('label');
    label8.htmlFor = 'focusblockremind-checkbox';
    label8.textContent = i18n.QYLfocushighlight;
    label8.style.fontSize = '14px';
    label8.style.userSelect= 'none';

    const checkbox9 = document.createElement('input');
    checkbox9.type = 'checkbox';
    checkbox9.id = 'QYLanimation-checkbox';
    checkbox9.checked = isChecked9;

    const label9 = document.createElement('label');
    label9.htmlFor = 'QYLanimation-checkbox';
    label9.textContent = i18n.QYLztdh;
    label9.style.fontSize = '14px';
    label9.style.userSelect= 'none';

    const checkbox10 = document.createElement('input');
    checkbox10.type = 'checkbox';
    checkbox10.id = 'QYLAero-checkbox';
    checkbox10.checked = isChecked10;

    const label10 = document.createElement('label');
    label10.htmlFor = 'QYLAero-checkbox';
    label10.textContent = i18n.QYLmbl;
    label10.style.fontSize = '14px';
    label10.style.userSelect= 'none';

    const checkbox11 = document.createElement('input');
    checkbox11.type = 'checkbox';
    checkbox11.id = 'QYLbancolofultag-checkbox';
    checkbox11.checked = isChecked11;

    const label11 = document.createElement('label');
    label11.htmlFor = 'QYLbancolofultag-checkbox';
    label11.textContent = i18n.QYLdcbq;
    label11.style.fontSize = '14px';
    label11.style.userSelect= 'none';

    const checkbox12 = document.createElement('input');
    checkbox12.type = 'checkbox';
    checkbox12.id = 'QYLburgundy-checkbox';
    checkbox12.checked = isChecked12;

    const label12 = document.createElement('label');
    label12.htmlFor = 'QYLburgundy-checkbox';
    label12.textContent = i18n.QYLbgdps;
    label12.style.fontSize = '14px';
    label12.style.userSelect= 'none';

    const checkbox13 = document.createElement('input');
    checkbox13.type = 'checkbox';
    checkbox13.id = 'QYLxuanqing-checkbox';
    checkbox13.checked = isChecked13;

    const label13 = document.createElement('label');
    label13.htmlFor = 'QYLxuanqing-checkbox';
    label13.textContent = i18n.QYLxqps;
    label13.style.fontSize = '14px';
    label13.style.userSelect= 'none';

    const checkbox14 = document.createElement('input');
    checkbox14.type = 'checkbox';
    checkbox14.id = 'QYLmocui-checkbox';
    checkbox14.checked = isChecked14;

    const label14 = document.createElement('label');
    label14.htmlFor = 'QYLmocui-checkbox';
    label14.textContent = i18n.QYLmcps;
    label14.style.fontSize = '14px';
    label14.style.userSelect= 'none';

    const checkbox15 = document.createElement('input');
    checkbox15.type = 'checkbox';
    checkbox15.id = 'QYLhuimu-checkbox';
    checkbox15.checked = isChecked15;

    const label15 = document.createElement('label');
    label15.htmlFor = 'QYLhuimu-checkbox';
    label15.textContent = i18n.QYLhmps;
    label15.style.fontSize = '14px';
    label15.style.userSelect= 'none';

    const checkbox16 = document.createElement('input');
    checkbox16.type = 'checkbox';
    checkbox16.id = 'QYLinkmode-checkbox';
    checkbox16.checked = isChecked16;

    const label16 = document.createElement('label');
    label16.htmlFor = 'QYLinkmode-checkbox';
    label16.textContent = i18n.QYLmsp;
    label16.style.fontSize = '14px';
    label16.style.userSelect= 'none';

    const checkbox17 = document.createElement('input');
    checkbox17.type = 'checkbox';
    checkbox17.id = 'QYLlchixia-checkbox';
    checkbox17.checked = isChecked17;

    const label17 = document.createElement('label');
    label17.htmlFor = 'QYLlchixia-checkbox';
    label17.textContent = i18n.QYLcxps;
    label17.style.fontSize = '14px';
    label17.style.userSelect= 'none';

    const checkbox18 = document.createElement('input');
    checkbox18.type = 'checkbox';
    checkbox18.id = 'QYLltaixue-checkbox';
    checkbox18.checked = isChecked18;

    const label18 = document.createElement('label');
    label18.htmlFor = 'QYLltaixue-checkbox';
    label18.textContent = i18n.QYLtxps;
    label18.style.fontSize = '14px';
    label18.style.userSelect= 'none';

    const checkbox20 = document.createElement('input');
    checkbox20.type = 'checkbox';
    checkbox20.id = 'QYLlverticaltab-checkbox';
    checkbox20.checked = isChecked20;

    const label20 = document.createElement('label');
    label20.htmlFor = 'QYLlverticaltab-checkbox';
    label20.textContent = i18n.QYLczyq;
    label20.style.fontSize = '14px';
    label20.style.userSelect= 'none';

    const checkbox21 = document.createElement('input');
    checkbox21.type = 'checkbox';
    checkbox21.id = 'QYLlcolorfulh-checkbox';
    checkbox21.checked = isChecked21;

    const label21 = document.createElement('label');
    label21.htmlFor = 'QYLlcolorfulh-checkbox';
    label21.textContent = i18n.QYLdcbt;
    label21.style.fontSize = '14px';
    label21.style.userSelect= 'none';

    const checkbox22 = document.createElement('input');
    checkbox22.type = 'checkbox';
    checkbox22.id = 'QYLlfusion-checkbox';
    checkbox22.checked = isChecked22;

    const label22 = document.createElement('label');
    label22.htmlFor = 'QYLlfusion-checkbox';
    label22.textContent = i18n.QYLdlrh;
    label22.style.fontSize = '14px';
    label22.style.userSelect= 'none';

    const checkbox23 = document.createElement('input');
    checkbox23.type = 'checkbox';
    checkbox23.id = 'QYLlborderfile-checkbox';
    checkbox23.checked = isChecked23;

    const label23 = document.createElement('label');
    label23.htmlFor = 'QYLlborderfile-checkbox';
    label23.textContent = i18n.QYLbkhwds;
    label23.style.fontSize = '14px';
    label23.style.userSelect= 'none';

    const checkbox24 = document.createElement('input');
    checkbox24.type = 'checkbox';
    checkbox24.id = 'QYLlihelp-checkbox';
    checkbox24.checked = isChecked24;

    const label24 = document.createElement('label');
    label24.htmlFor = 'QYLlihelp-checkbox';
    label24.textContent = i18n.QYLlbfzx;
    label24.style.fontSize = '14px';
    label24.style.userSelect= 'none';

    const checkbox25 = document.createElement('input');
    checkbox25.type = 'checkbox';
    checkbox25.id = 'QYLmidnight-checkbox';
    checkbox25.checked = isChecked25;

    const label25 = document.createElement('label');
    label25.htmlFor = 'QYLmidnight-checkbox';
    label25.textContent = i18n.QYLwyps;
    label25.style.fontSize = '14px';
    label25.style.userSelect= 'none';

    const checkbox30 = document.createElement('input');
    checkbox30.type = 'checkbox';
    checkbox30.id = 'QYLduskmist-checkbox';
    checkbox30.checked = isChecked30;

    const label30 = document.createElement('label');
    label30.htmlFor = 'QYLduskmist-checkbox';
    label30.textContent = i18n.QYLmaps;
    label30.style.fontSize = '14px';
    label30.style.userSelect= 'none';

    const checkbox31 = document.createElement('input');
    checkbox31.type = 'checkbox';
    checkbox31.id = 'QYLbogwood-checkbox';
    checkbox31.checked = isChecked31;

    const label31 = document.createElement('label');
    label31.htmlFor = 'QYLbogwood-checkbox';
    label31.textContent = i18n.QYLwmps;
    label31.style.fontSize = '14px';
    label31.style.userSelect= 'none';

    const checkbox34 = document.createElement('input');
    checkbox34.type = 'checkbox';
    checkbox34.id = 'QYLflatstyle-checkbox';
    checkbox34.checked = isChecked34;

    const label34 = document.createElement('label');
    label34.htmlFor = 'QYLflatstyle-checkbox';
    label34.textContent = i18n.QYLbphfg;
    label34.style.fontSize = '14px';
    label34.style.userSelect= 'none';

    const checkbox35 = document.createElement('input');
    checkbox35.type = 'checkbox';
    checkbox35.id = 'QYLimmersivetopbar-checkbox';
    checkbox35.checked = isChecked35;

    const label35 = document.createElement('label');
    label35.htmlFor = 'QYLimmersivetopbar-checkbox';
    label35.textContent = i18n.QYLcjsdl;
    label35.style.fontSize = '14px';
    label35.style.userSelect= 'none';

    // 将复选框和标签组合
    const QYLfunctionpair1 = document.createElement('div');
    QYLfunctionpair1.className = 'checkbox-label-pair';
    QYLfunctionpair1.appendChild(checkbox1);
    QYLfunctionpair1.appendChild(label1);
    QYLfunctionpair1.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair2 = document.createElement('div');
    QYLfunctionpair2.className = 'checkbox-label-pair';
    QYLfunctionpair2.appendChild(checkbox2);
    QYLfunctionpair2.appendChild(label2);
    QYLfunctionpair2.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair3 = document.createElement('div');
    QYLfunctionpair3.className = 'checkbox-label-pair';
    QYLfunctionpair3.appendChild(checkbox3);
    QYLfunctionpair3.appendChild(label3);
    QYLfunctionpair3.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair4 = document.createElement('div');
    QYLfunctionpair4.className = 'checkbox-label-pair';
    QYLfunctionpair4.appendChild(checkbox4);
    QYLfunctionpair4.appendChild(label4);
    QYLfunctionpair4.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair5 = document.createElement('div');
    QYLfunctionpair5.className = 'checkbox-label-pair';
    QYLfunctionpair5.appendChild(checkbox5);
    QYLfunctionpair5.appendChild(label5);
    QYLfunctionpair5.style.animation = 'QYLbounceRight2 0.1s';
    
    const QYLfunctionpair6 = document.createElement('div');
    QYLfunctionpair6.className = 'checkbox-label-pair';
    QYLfunctionpair6.appendChild(checkbox6);
    QYLfunctionpair6.appendChild(label6);
    QYLfunctionpair6.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair7 = document.createElement('div');
    QYLfunctionpair7.className = 'checkbox-label-pair';
    QYLfunctionpair7.appendChild(checkbox7);
    QYLfunctionpair7.appendChild(label7);
    QYLfunctionpair7.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair8 = document.createElement('div');
    QYLfunctionpair8.className = 'checkbox-label-pair';
    QYLfunctionpair8.appendChild(checkbox8);
    QYLfunctionpair8.appendChild(label8);
    QYLfunctionpair8.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair9 = document.createElement('div');
    QYLfunctionpair9.className = 'checkbox-label-pair';
    QYLfunctionpair9.appendChild(checkbox9);
    QYLfunctionpair9.appendChild(label9);
    QYLfunctionpair9.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair10 = document.createElement('div');
    QYLfunctionpair10.className = 'checkbox-label-pair';
    QYLfunctionpair10.appendChild(checkbox10);
    QYLfunctionpair10.appendChild(label10);
    QYLfunctionpair10.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair11 = document.createElement('div');
    QYLfunctionpair11.className = 'checkbox-label-pair';
    QYLfunctionpair11.appendChild(checkbox11);
    QYLfunctionpair11.appendChild(label11);
    QYLfunctionpair11.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair12 = document.createElement('div');
    QYLfunctionpair12.className = 'checkbox-label-pair';
    QYLfunctionpair12.appendChild(checkbox12);
    QYLfunctionpair12.appendChild(label12);
    QYLfunctionpair12.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair13 = document.createElement('div');
    QYLfunctionpair13.className = 'checkbox-label-pair';
    QYLfunctionpair13.appendChild(checkbox13);
    QYLfunctionpair13.appendChild(label13);
    QYLfunctionpair13.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair14 = document.createElement('div');
    QYLfunctionpair14.className = 'checkbox-label-pair';
    QYLfunctionpair14.appendChild(checkbox14);
    QYLfunctionpair14.appendChild(label14);
    QYLfunctionpair14.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair15 = document.createElement('div');
    QYLfunctionpair15.className = 'checkbox-label-pair';
    QYLfunctionpair15.appendChild(checkbox15);
    QYLfunctionpair15.appendChild(label15);
    QYLfunctionpair15.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair16 = document.createElement('div');
    QYLfunctionpair16.className = 'checkbox-label-pair';
    QYLfunctionpair16.appendChild(checkbox16);
    QYLfunctionpair16.appendChild(label16);
    QYLfunctionpair16.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair17 = document.createElement('div');
    QYLfunctionpair17.className = 'checkbox-label-pair';
    QYLfunctionpair17.appendChild(checkbox17);
    QYLfunctionpair17.appendChild(label17);
    QYLfunctionpair17.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair18 = document.createElement('div');
    QYLfunctionpair18.className = 'checkbox-label-pair';
    QYLfunctionpair18.appendChild(checkbox18);
    QYLfunctionpair18.appendChild(label18);
    QYLfunctionpair18.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair20 = document.createElement('div');
    QYLfunctionpair20.className = 'checkbox-label-pair';
    QYLfunctionpair20.appendChild(checkbox20);
    QYLfunctionpair20.appendChild(label20);
    QYLfunctionpair20.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair21 = document.createElement('div');
    QYLfunctionpair21.className = 'checkbox-label-pair';
    QYLfunctionpair21.appendChild(checkbox21);
    QYLfunctionpair21.appendChild(label21);
    QYLfunctionpair21.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair22 = document.createElement('div');
    QYLfunctionpair22.className = 'checkbox-label-pair';
    QYLfunctionpair22.appendChild(checkbox22);
    QYLfunctionpair22.appendChild(label22);
    QYLfunctionpair22.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair23 = document.createElement('div');
    QYLfunctionpair23.className = 'checkbox-label-pair';
    QYLfunctionpair23.appendChild(checkbox23);
    QYLfunctionpair23.appendChild(label23);
    QYLfunctionpair23.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair24 = document.createElement('div');
    QYLfunctionpair24.className = 'checkbox-label-pair';
    QYLfunctionpair24.appendChild(checkbox24);
    QYLfunctionpair24.appendChild(label24);
    QYLfunctionpair24.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair25 = document.createElement('div');
    QYLfunctionpair25.className = 'checkbox-label-pair';
    QYLfunctionpair25.appendChild(checkbox25);
    QYLfunctionpair25.appendChild(label25);
    QYLfunctionpair25.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair30 = document.createElement('div');
    QYLfunctionpair30.className = 'checkbox-label-pair';
    QYLfunctionpair30.appendChild(checkbox30);
    QYLfunctionpair30.appendChild(label30);
    QYLfunctionpair30.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair31 = document.createElement('div');
    QYLfunctionpair31.className = 'checkbox-label-pair';
    QYLfunctionpair31.appendChild(checkbox31);
    QYLfunctionpair31.appendChild(label31);
    QYLfunctionpair31.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair34 = document.createElement('div');
    QYLfunctionpair34.className = 'checkbox-label-pair';
    QYLfunctionpair34.appendChild(checkbox34);
    QYLfunctionpair34.appendChild(label34);
    QYLfunctionpair34.style.animation = 'QYLbounceRight2 0.1s';

    const QYLfunctionpair35 = document.createElement('div');
    QYLfunctionpair35.className = 'checkbox-label-pair';
    QYLfunctionpair35.appendChild(checkbox35);
    QYLfunctionpair35.appendChild(label35);
    QYLfunctionpair35.style.animation = 'QYLbounceRight2 0.1s';

    //分割线
    const QYLfunctionpairdivider1 = document.createElement('hr');
    QYLfunctionpairdivider1.style.cssText = `
        height: 1px;
        margin: 5px 0;
        background-image: linear-gradient( to right, transparent 0%, var(--b3-theme-primary) 30%, var(--b3-theme-primary) 70%, transparent 100% );
        border: none;
        width: 100%;
    `;
    const QYLfunctionpairdivider2 = document.createElement('hr');
    QYLfunctionpairdivider2.style.cssText = `
        height: 1px;
        margin: 5px 0;
        background-image: linear-gradient( to right, transparent 0%, var(--b3-theme-primary) 30%, var(--b3-theme-primary) 70%, transparent 100% );
        border: none;
        width: 100%;
    `;
    const QYLfunctionpairdivider3 = document.createElement('hr');
    QYLfunctionpairdivider3.style.cssText = `
        height: 1px;
        margin: 5px 0;
        background-image: linear-gradient( to right, transparent 0%, var(--b3-theme-primary) 30%, var(--b3-theme-primary) 70%, transparent 100% );
        border: none;
        width: 100%;
    `;
    const QYLfunctionpairdivider4 = document.createElement('hr');
    QYLfunctionpairdivider4.style.cssText = `
        height: 1px;
        margin: 5px 0;
        background-image: linear-gradient( to right, transparent 0%, var(--b3-theme-primary) 30%, var(--b3-theme-primary) 70%, transparent 100% );
        border: none;
        width: 100%;
    `;
    const QYLfunctionpairdivider5 = document.createElement('hr');
    QYLfunctionpairdivider5.style.cssText = `
        height: 1px;
        margin: 5px 0;
        background-image: linear-gradient( to right, transparent 0%, var(--b3-theme-primary) 30%, var(--b3-theme-primary) 70%, transparent 100% );
        border: none;
        width: 100%;
    `;

    // 将复选框和标签添加到设置窗口
    settingsWindow.appendChild(QYLfunctionpair10); //毛玻璃
    settingsWindow.appendChild(QYLfunctionpair16); //墨水屏
    settingsWindow.appendChild(QYLfunctionpair9); //动画
    settingsWindow.appendChild(QYLfunctionpairdivider1);  
    settingsWindow.appendChild(QYLfunctionpair3); //隐藏顶栏
    settingsWindow.appendChild(QYLfunctionpair22); //顶栏融合
    settingsWindow.appendChild(QYLfunctionpair20);  //垂直页签
    settingsWindow.appendChild(QYLfunctionpair6); //全宽显示
    settingsWindow.appendChild(QYLfunctionpairdivider3); 
    settingsWindow.appendChild(QYLfunctionpair1); //标记挖空
    settingsWindow.appendChild(QYLfunctionpair24); //列表辅助线
    settingsWindow.appendChild(QYLfunctionpair4); //鼠标悬停高亮
    settingsWindow.appendChild(QYLfunctionpair5); //超级块高亮
    settingsWindow.appendChild(QYLfunctionpair8); //聚焦块高亮 
    settingsWindow.appendChild(QYLfunctionpairdivider2); 
    settingsWindow.appendChild(QYLfunctionpair2); //缩进线
    settingsWindow.appendChild(QYLfunctionpair11); //多彩标签
    settingsWindow.appendChild(QYLfunctionpair21); //多彩标题
    settingsWindow.appendChild(QYLfunctionpair7); //多彩文档树
    settingsWindow.appendChild(QYLfunctionpair23); //边框化文档树
    settingsWindow.appendChild(QYLfunctionpairdivider4);
    settingsWindow.appendChild(QYLfunctionpair34);
    settingsWindow.appendChild(QYLfunctionpair35);
    settingsWindow.appendChild(QYLfunctionpairdivider5);
    settingsWindow.appendChild(QYLfunctionpair12);
    settingsWindow.appendChild(QYLfunctionpair13);
    settingsWindow.appendChild(QYLfunctionpair14);
    settingsWindow.appendChild(QYLfunctionpair15);
    settingsWindow.appendChild(QYLfunctionpair17);
    settingsWindow.appendChild(QYLfunctionpair18);
    settingsWindow.appendChild(QYLfunctionpair30);
    settingsWindow.appendChild(QYLfunctionpair31);
    settingsWindow.appendChild(QYLfunctionpair25);

    // 将设置窗口添加到body
    document.body.appendChild(settingsWindow);


// 保存配置到QYLdarkconfig.json
async function saveConfig() {
    const formData = new FormData();
    formData.append('path', '/data/snippets/QYLdarkconfig.json');
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
        isChecked20: checkbox20.checked,
        isChecked21: checkbox21.checked,
        isChecked22: checkbox22.checked,
        isChecked23: checkbox23.checked,
        isChecked24: checkbox24.checked,
        isChecked25: checkbox25.checked,
        isChecked30: checkbox30.checked,
        isChecked31: checkbox31.checked,
        isChecked34: checkbox34.checked,
        isChecked35: checkbox35.checked,
    })], { type: 'application/json' }), 'QYLdarkconfig.json');

    return fetch('/api/file/putFile', { method: 'POST', body: formData });
}

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
    if (isChecked16 === true) { checkbox16.click(); }
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

// 勃艮第配色开关
checkbox12.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLburgundy() : disableQYLburgundy();
    state ? isChecked12 = true : isChecked12 = false;
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked18 === true) { checkbox18.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 玄青配色开关
checkbox13.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLxuanqing() : disableQYLxuanqing();
    state ? isChecked13 = true : isChecked13 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked18 === true) { checkbox18.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 墨翠配色开关
checkbox14.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLmocui() : disableQYLmocui();
    state ? isChecked14 = true : isChecked14 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked18 === true) { checkbox18.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 灰幕配色开关
checkbox15.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLhuimu() : disableQYLhuimu();
    state ? isChecked15 = true : isChecked15 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked18 === true) { checkbox18.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 赤霞配色开关
checkbox17.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLchixia() : disableQYLchixia();
    state ? isChecked17 = true : isChecked17 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked18 === true) { checkbox18.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 苔雪配色开关
checkbox18.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLtaixue() : disableQYLtaixue();
    state ? isChecked18 = true : isChecked18 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 暮霭配色开关
checkbox30.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLduskmist() : disableQYLduskmist();
    state ? isChecked30 = true : isChecked30 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked18 === true) { checkbox18.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 乌木配色开关
checkbox31.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLbogwood() : disableQYLbogwood();
    state ? isChecked31 = true : isChecked31 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked18 === true) { checkbox18.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked25 === true) { checkbox25.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 午夜配色开关
checkbox25.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLmidnight() : disableQYLmidnight();
    state ? isChecked25 = true : isChecked25 = false;
    if (isChecked12 === true) { checkbox12.click(); }
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
    if (isChecked18 === true) { checkbox18.click(); }
    if (isChecked30 === true) { checkbox30.click(); }
    if (isChecked31 === true) { checkbox31.click(); }
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
    if (isChecked16 === true) { checkbox16.click(); }//不能与墨水屏模式同时开启
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
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 墨水屏模式开关
checkbox16.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLinkmode() : disableQYLinkmode();
    state ? isChecked16 = true : isChecked16 = false;
    if (isChecked10 === true) { checkbox10.click(); }//不能与毛玻璃同时开启
    if (isChecked34 === true) { checkbox34.click(); }//不能与扁平化风格同时开启
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
        .toolbar {
            margin-bottom: -32px;
            opacity: 0;
            transition: all 200ms;
            transform: translateY(-30px);
            z-index: 8;
            border-bottom-right-radius: var(--b3-border-radius);
            border-bottom-left-radius: var(--b3-border-radius);
            box-shadow: var(--b3-point-shadow);
        }
        .toolbar:hover {
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

// 聚焦块高亮
function enablefocusblockremind() {
    // 块提示
    let cachedEditor = null;
    let lastHighlightedElement = null;
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments, context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    function handleSelection() {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;
        const range = selection.getRangeAt(0);
        const node = range.startContainer;
        const editor = getEditorContainer(node);
        if (!editor) return;
        if (lastHighlightedElement) {
            lastHighlightedElement.classList.remove('highlight');
            lastHighlightedElement = null;
        }
        const targetElement = (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement)
            .closest('[data-node-id]');

        if (targetElement && editor.contains(targetElement)) {
            targetElement.classList.add('highlight');
            lastHighlightedElement = targetElement;
        }
    }
    function getEditorContainer(node) {
        if (cachedEditor && cachedEditor.contains(node)) return cachedEditor;
        let element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
        while (element && !element.classList.contains('protyle-wysiwyg')) {
            element = element.parentElement;
        }
        cachedEditor = element || cachedEditor;
        return cachedEditor;
    }
    document.addEventListener('selectionchange', throttle(handleSelection, 100));

    let styleSheet = document.getElementById("focusblockremind-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "focusblockremind-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
    `;
}

// 取消聚焦块高亮
function disablefocusblockremind() {
    const styleSheet = document.getElementById("focusblockremind-style");
    if (styleSheet) {
        styleSheet.innerText = `
            [data-node-id].highlight, [data-node-id].highlight:hover { box-shadow: none !important; transition: none !important; }
        `;
    }
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
    `;
}

// 关闭全宽显示功能
function disablefullwidth() {
    const styleSheet = document.getElementById("fullwidth-style");
    if (styleSheet) {
        styleSheet.innerText = `
            @keyframes QYLbounceRightspecial {
                    0% {
                        transform: translateX(-100%);
                    }
                    30% {
                        transform: translateX(10%);
                    }
                    70% {
                        transform: translateX(-5%);
                    }
                    100% {
                        transform: translateX(0);
                    }
            }
            .protyle-background__icon, .protyle-background__icon img, .protyle-background__icon svg, .b3-chips__doctag .b3-chip {
                animation: QYLbounceRightspecial 0.3s forwards;
            }
    `;
    }
}

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
            opacity: 0.75;
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: var(--QYL-custom-red);
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
            opacity: 0.75;
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: var(--QYL-custom-orange);
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
            opacity: 0.75;
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: var(--QYL-custom-green);
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
            opacity: 0.75;
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: var(--QYL-custom-blue);
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
            opacity: 0.75;
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: var(--QYL-custom-purple);
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
            opacity: 0.75;
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--QYL-white);
            background-color: var(--QYL-custom-pink);
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

// 开启勃艮第配色
function enableQYLburgundy() {
    let linkElement = document.getElementById("QYLburgundy-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLburgundy-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-dark/勃艮第配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭勃艮第配色
function disableQYLburgundy() {
    const linkElement = document.getElementById("QYLburgundy-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启玄青配色
function enableQYLxuanqing() {
    let linkElement = document.getElementById("QYLxuanqing-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLxuanqing-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-dark/玄青配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭玄青配色
function disableQYLxuanqing() {
    const linkElement = document.getElementById("QYLxuanqing-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启墨翠配色
function enableQYLmocui() {
    let linkElement = document.getElementById("QYLmocui-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLmocui-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-dark/墨翠配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭墨翠配色
function disableQYLmocui() {
    const linkElement = document.getElementById("QYLmocui-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启灰幕配色
function enableQYLhuimu() {
    let linkElement = document.getElementById("QYLhuimu-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLhuimu-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-dark/灰幕配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭灰幕配色
function disableQYLhuimu() {
    const linkElement = document.getElementById("QYLhuimu-style");
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


// 开启赤霞配色
function enableQYLchixia() {
    let linkElement = document.getElementById("QYLchixia-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLchixia-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-dark/赤霞配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭赤霞配色
function disableQYLchixia() {
    const linkElement = document.getElementById("QYLchixia-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启苔雪配色
function enableQYLtaixue() {
    let linkElement = document.getElementById("QYLtaixue-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLtaixue-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-dark/苔雪配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭苔雪配色
function disableQYLtaixue() {
    const linkElement = document.getElementById("QYLtaixue-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启暮霭配色
function enableQYLduskmist() {
    let linkElement = document.getElementById("QYLduskmist-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLduskmist-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-dark/暮霭配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭暮霭配色
function disableQYLduskmist() {
    const linkElement = document.getElementById("QYLduskmist-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启乌木配色
function enableQYLbogwood() {
    let linkElement = document.getElementById("QYLbogwood-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLbogwood-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-dark/乌木配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭乌木配色
function disableQYLbogwood() {
    const linkElement = document.getElementById("QYLbogwood-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启午夜配色
function enableQYLmidnight() {
    let linkElement = document.getElementById("QYLmidnight-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLmidnight-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-dark/午夜配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭午夜配色
function disableQYLmidnight() {
    const linkElement = document.getElementById("QYLmidnight-style");
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

// 开启多彩标题和多彩大纲
function enableQYLcolorfulh() {
    let styleElement = document.getElementById("snippet-QYLcolorfulh-style");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "snippet-QYLcolorfulh-style";
        styleElement.innerHTML = `
        :root {
            --QYL-h1: #d24e4e;
            --QYL-h2: #eaa263;
            --QYL-h3: #5fc070;
            --QYL-h4: #589ecd;
            --QYL-h5: #8c5fbc;
            --QYL-h6: #b367b8;
            --QYL-h1-fold: rgba(210, 78, 78, 0.4);
            --QYL-h1-fold-background: rgba(210, 78, 78, 0.1);
            --QYL-h2-fold: rgba(234, 162, 99, 0.4);
            --QYL-h2-fold-background: rgba(234, 162, 99, 0.1);
            --QYL-h3-fold: rgba(95, 192, 113, 0.4);
            --QYL-h3-fold-background: rgba(95, 192, 113, 0.1);
            --QYL-h4-fold: rgba(88, 158, 205, 0.4);
            --QYL-h4-fold-background: rgba(88, 158, 205, 0.1);
            --QYL-h5-fold: rgba(140, 95, 188, 0.4);
            --QYL-h5-fold-background: rgba(140, 95, 188, 0.1);
            --QYL-h6-fold: rgba(179, 103, 184, 0.4);
            --QYL-h6-fold-background: rgba(179, 103, 184, 0.1);
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
    fusion.start();
    windowObserver.start();

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
    fusion.stop();
    windowObserver.stop();

    const linkElement = document.getElementById("QYLfusion-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启垂直页签
function enableQYLverticaltab() {

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


// 读取QYLdarkconfig.json
async function loadAndCheckConfig() {
    try {
        const content = await getFile("/data/snippets/QYLdarkconfig.json");
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
            enableQYLburgundy();
            isChecked12 = true;
        } else if (config?.isChecked12 === false) {
            disableQYLburgundy();
            isChecked12 = false;
        }

        if (config?.isChecked13 === true) {
            enableQYLxuanqing();
            isChecked13 = true;
        } else if (config?.isChecked13 === false) {
            disableQYLxuanqing();
            isChecked13 = false;
        }

        if (config?.isChecked14 === true) {
            enableQYLmocui();
            isChecked14 = true;
        } else if (config?.isChecked14 === false) {
            disableQYLmocui();
            isChecked14 = false;
        }

        if (config?.isChecked15 === true) {
            enableQYLhuimu();
            isChecked15 = true;
        } else if (config?.isChecked15 === false) {
            disableQYLhuimu();
            isChecked15 = false;
        }

        if (config?.isChecked16 === true) {
            enableQYLinkmode();
            isChecked16 = true;
        } else if (config?.isChecked16 === false) {
            disableQYLinkmode();
            isChecked16 = false;
        }

        if (config?.isChecked17 === true) {
            enableQYLchixia();
            isChecked17 = true;
        } else if (config?.isChecked17 === false) {
            disableQYLchixia();
            isChecked17 = false;
        }

        if (config?.isChecked18 === true) {
            enableQYLtaixue();
            isChecked18 = true;
        } else if (config?.isChecked18 === false) {
            disableQYLtaixue();
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
            enableQYLmidnight();
            isChecked25 = true;
        } else if (config?.isChecked25 === false) {
            disableQYLmidnight();
            isChecked25 = false;
        }

        if (config?.isChecked30 === true) {
            enableQYLduskmist();
            isChecked30 = true;
        } else if (config?.isChecked30 === false) {
            disableQYLduskmist();
            isChecked30 = false;
        }

        if (config?.isChecked31 === true) {
            enableQYLbogwood();
            isChecked31 = true;
        } else if (config?.isChecked31 === false) {
            disableQYLbogwood();
            isChecked31 = false;
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

// 连点三次开启或关闭隐藏顶栏
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
                const rect = this.QYL_layout.getBoundingClientRect();
                const offset = window.innerWidth - rect.right + 15;
                this.QYL_status.style.setProperty('--QYL-status-transformX', `-${offset}px`);
            } catch (error) {
                this.QYL_scheduleRecovery();
            }
        }
        QYL_animationFrameThrottle(func) {
            let QYL_pending = false;
            return (...args) => {
                if (!QYL_pending) {
                    QYL_pending = true;
                    requestAnimationFrame(() => {
                        func.apply(this, args);
                        QYL_pending = false;
                    });
                }
            };
        }
        QYL_handleResize = () => {
            this.QYL_windowWidth = window.innerWidth;
            this.QYL_rafUpdate();
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
                this.QYL_rafUpdate = this.QYL_animationFrameThrottle(
                    this.QYL_calculatePosition.bind(this)
                );
                window.addEventListener('resize', this.QYL_handleResize, { passive: true });
                window.addEventListener('scroll', this.QYL_rafUpdate, { passive: true });
                document.addEventListener('visibilitychange', this.QYL_handleVisibility);
                this.QYL_observer = new ResizeObserver(() => this.QYL_rafUpdate());
                this.QYL_observer.observe(this.QYL_layout);
                this.QYL_styleObserver = new MutationObserver(mutations => {
                    if (mutations.some(m => m.attributeName === 'style')) {
                        this.QYL_rafUpdate();
                    }
                });
                this.QYL_styleObserver.observe(this.QYL_status, {
                    attributes: true,
                    attributeFilter: ['style']
                });
                requestAnimationFrame(() => this.QYL_calculatePosition());
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
            window.removeEventListener('resize', this.QYL_handleResize);
            window.removeEventListener('scroll', this.QYL_rafUpdate);
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

//css自定义属性
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
    
        window.addEventListener('mouseup', handleEvent);
        window.addEventListener('keyup', handleEvent);
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
    function MenuSeparator(className = 'b3-menu__separator') {
        let node = document.createElement('button');
        node.className = className;
        return node;
    }
    
    function getBlockSelected() {//获取块属性
        const node_list = document.querySelectorAll('.protyle-wysiwyg--select');
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
        const node_list = document.querySelectorAll('.b3-list-item--focus[data-type="navigation-file"]');
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
    
        const readonly = commonMenu.querySelector('[data-id="updateAndCreatedAt"]');
        const attritem = commonMenu.querySelector('#QYLattr');
    
        if (readonly && !attritem) {
        commonMenu.insertBefore(QYLattritem(selectid, selecttype, selectsbLayout), readonly);
        commonMenu.insertBefore(MenuSeparator(), readonly);
        }
    }
    
    function InsertQYLattrforfile(selectid, selecttype) {//创建QYL自定义属性菜单项（文档）
        const commonMenu = getCommonMenu();
        if (!commonMenu) return;
    
        const readonly = commonMenu.querySelector('[data-id="separator_3"]:has(~ [data-id="fileHistory"])');
        const attritem = commonMenu.querySelector('#QYLattr');
    
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
      button.innerHTML = '<svg t="1740797651161" class="b3-menu__icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4700" width="24" height="24"><path d="M896 0a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128H128a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h768zM505.856 179.712c-97.664 0-174.72 31.36-230.272 95.872-53.76 60.928-79.744 139.776-79.744 237.44 0 96.768 25.984 175.616 79.744 236.544 55.552 62.72 132.608 94.976 230.272 94.976 66.304 0 122.752-14.336 170.24-43.008 23.296 31.36 46.592 64.512 70.784 99.456l62.72-55.552c-23.296-34.048-47.488-66.304-70.784-97.664 51.968-60.928 77.952-138.88 77.952-234.752 0-98.56-26.88-178.304-80.64-238.336-56.448-63.616-133.504-94.976-230.272-94.976z m0 86.016c68.096 0 120.96 21.504 157.696 66.304 35.84 43.904 54.656 103.936 54.656 180.992 0 65.408-13.44 118.272-40.32 159.488A2949.44 2949.44 0 0 0 581.12 564.096l-56.448 55.552c31.36 33.152 63.616 69.888 95.872 110.208-31.36 18.816-69.888 28.672-114.688 28.672-68.096 0-120.96-23.296-158.592-68.096-35.84-43.904-53.76-103.04-53.76-177.408 0-75.264 17.92-134.4 53.76-178.304 37.632-46.592 90.496-68.992 158.592-68.992z" p-id="4701"></path></svg><span class="b3-menu__label" style="">QYL自定义属性</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
      
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
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label" style="">水平排列超级块间距</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrcolsbgapsub(selectid))//准备创建水平排列超级块间距选项的二级菜单
    return button
}
function QYLattrcolsbgapsub(selectid) {//创建水平排列超级块间距选项的二级菜单
    let div = document.createElement('div');
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">水平连续排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrcolsbgapjincou(selectid) {//水平紧凑排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平紧凑排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">水平紧凑排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrcolsbgapjiaojincou(selectid) {//水平较紧凑排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平较紧凑排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">水平较紧凑排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrcolsbgapjiaokuansong(selectid) {//水平较宽松排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平较宽松排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">水平较宽松排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrcolsbgapkuansong(selectid) {//水平宽松排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平宽松排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">水平宽松排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrcolsbgapdelete(selectid) {//默认
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">恢复默认</span><span class="b3-menu__accelerator">组别1</span>`
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
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label" style="">垂直排列超级块间距</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrrowsbgapsub(selectid))//准备创建垂直排列超级块间距选项的二级菜单
    return button
}
function QYLattrrowsbgapsub(selectid) {//创建垂直排列超级块间距选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrrowsbgapsubitems(selectid))//准备创建垂直排列超级块间距选项的b3-menu__items
    return div

    function QYLattrrowsbgapsubitems(selectid) {//创建垂直排列超级块间距选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrrowsbgaplianxu(selectid))//垂直连续排列
        div.appendChild(QYLattrrowsbgapkuansong(selectid))//垂直宽松排列
        div.appendChild(QYLattrrowsbgapdelete(selectid))//恢复默认
        return div

        function QYLattrrowsbgaplianxu(selectid) {//垂直连续排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-rowgap")
            button.setAttribute("custom-attr-value", "垂直连续排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">垂直连续排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrrowsbgapkuansong(selectid) {//垂直宽松排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-rowgap")
            button.setAttribute("custom-attr-value", "垂直宽松排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">垂直宽松排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrrowsbgapdelete(selectid) {//默认
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-rowgap")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">恢复默认</span><span class="b3-menu__accelerator">组别1</span>`
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
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconList"></use></svg><span class="b3-menu__label" style="">列表视图</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrlistviewsub(selectid))//准备创建列表视图选项的二级菜单
    return button
}
function QYLattrlistviewsub(selectid) {//创建列表视图选项的二级菜单
    let div = document.createElement('div');
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
        return div

        function QYLattrlistviewnaotu(selectid) {//脑图
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "脑图")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label">脑图</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlistviewkanban(selectid) {//看板
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "看板")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconMenu"></use></svg><span class="b3-menu__label">看板</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlistviewbiaoge(selectid) {//表格
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "表格")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">表格</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlistviewlist(selectid) {//默认
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">默认</span><span class="b3-menu__accelerator">组别1</span>`
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
        div.appendChild(QYLattrfullwidthitem(selectid))//准备创建全宽显示选项
        div.appendChild(QYLattrblankblockreminditem(selectid))//准备创建空块提醒选项
        return div
    }
}

function QYLattrlineheightitem(selectid) {//创建文字行间距选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label" style="">文字行间距</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrlineheightsub(selectid))//准备创建文字行间距选项的二级菜单
    return button
}
function QYLattrlineheightsub(selectid) {//创建文字行间距选项的二级菜单
    let div = document.createElement('div');
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">单倍行距</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlineheight15(selectid) {//1.5倍行距
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "1.5倍行距")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">1.5倍行距</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlineheight18(selectid) {//1.8倍行距
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "1.8倍行距")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">1.8倍行距</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrlineheight2(selectid) {//双倍行距
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "双倍行距")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">双倍行距</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">恢复默认</span>`
            button.onclick = QYLcustomattrset
            return button
        }
    }
}

function QYLattrfullwidthitem(selectid) {//创建全宽显示选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconMax"></use></svg><span class="b3-menu__label" style="">全宽显示</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrfullwidthsub(selectid))//准备创建全宽显示选项的二级菜单
    return button
}
function QYLattrfullwidthsub(selectid) {//创建全宽显示选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrfullwidthsubitems(selectid))//准备创建全宽显示选项的b3-menu__items
    return div

    function QYLattrfullwidthsubitems(selectid) {//创建全宽显示选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLattrfullwidthon(selectid))//启用
        div.appendChild(QYLattrfullwidthoff(selectid))//禁用
        return div

        function QYLattrfullwidthon(selectid) {//启用全宽显示
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "fullwidth")
            button.setAttribute("custom-attr-value", "启用")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSelect"></use></svg><span class="b3-menu__label">启用</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLattrfullwidthoff(selectid) {//禁用全宽显示
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "fullwidth")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">禁用</span>`
            button.onclick = QYLcustomattrset
            return button
        }
    }
}

function QYLattrblankblockreminditem(selectid) {//创建空块提醒选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label" style="">空块提醒</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrblankblockremindsub(selectid))//准备创建空块提醒选项的二级菜单
    return button
}
function QYLattrblankblockremindsub(selectid) {//创建空块提醒选项的二级菜单
    let div = document.createElement('div');
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSelect"></use></svg><span class="b3-menu__label">启用</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">禁用</span>`
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
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label" style="">表格样式</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrtablestylesub(selectid))//准备创建表格样式选项的二级菜单
    return button
}
function QYLattrtablestylesub(selectid) {//创建表格样式选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrtablestylesubitems(selectid))//准备创建表格样式选项的b3-menu__items
    return div

    function QYLattrtablestylesubitems(selectid) {//创建表格样式选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLtablestylethreeline(selectid))//三线表
        div.appendChild(QYLtablestyledelete(selectid))//清除属性
        return div

        function QYLtablestylethreeline(selectid) {//三线表
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-style")
            button.setAttribute("custom-attr-value", "三线表")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">三线表</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLtablestyledelete(selectid) {//清除属性
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-style")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">清除属性</span>`
            button.onclick = QYLcustomattrset
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
        let button = document.createElement('button');
        button.className = "b3-menu__item"
        button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label" style="">标题样式</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
        button.appendChild(QYLattrhstylesub(selectid))//准备创建标题样式选项的二级菜单
        return button
    }
    function QYLattrhstylesub(selectid) {//创建标题样式选项的二级菜单
        let div = document.createElement('div');
        div.className = "b3-menu__submenu"
        div.appendChild(QYLattrhstylesubitems(selectid))//准备创建标题样式选项的b3-menu__items
        return div

        function QYLattrhstylesubitems(selectid) {//创建标题样式选项的b3-menu__items
            let div = document.createElement("div")
            div.className = "b3-menu__items"
            div.appendChild(QYLhstyleduocai(selectid))//多彩
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">多彩</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLhstylejinbo(selectid) {//金箔
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style")
            button.setAttribute("custom-attr-value", "金箔")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">金箔</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLhstylexiahuaxian(selectid) {//下划线
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style-u")
            button.setAttribute("custom-attr-value", "下划线")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">下划线</span><span class="b3-menu__accelerator">组别2</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLhstylezuobiankuang(selectid) {//左边框
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style-u")
            button.setAttribute("custom-attr-value", "左边框")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">左边框</span><span class="b3-menu__accelerator">组别2</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLhstylecengji(selectid) {//层级
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style-l")
            button.setAttribute("custom-attr-value", "层级")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">层级</span><span class="b3-menu__accelerator">组别3</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLhstyledelete(selectid) {//全部清除
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">全部清除</span>`
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
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconSettings"></use></svg><span class="b3-menu__label" style="">CSS</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrcsssub(selectid))//准备创建css属性选项的二级菜单
    return button
}
function QYLattrcsssub(selectid) {//创建css属性选项的二级菜单
    let div = document.createElement('div');
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
            textarea.placeholder = "在此输入CSS代码，注意首尾无需{ }包裹，支持&嵌套选择器\n例1：输入color:red;border:1px solid red使得块内文字变为红色且块具有红色边框\n例2：输入& span[data-type~=block-ref]:not(.av__celltext) { border-bottom: none }来取消块内所有块引用链接的下方虚线\n例3：输入&.protyle-top .protyle-background__icon {margin-bottom: 8px;& :is(img, svg) {max-width:100px;min-width:100px;width:100px;height:100px;}}来调整文档自定义表情的大小";
        
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
        
            textarea.addEventListener('blur', function(e) {
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
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label" style="">图片样式</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrimgsub(selectid))//准备创建图片样式选项的二级菜单
    return button
}
function QYLattrimgsub(selectid) {//创建图片样式选项的二级菜单
    let div = document.createElement('div');
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
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">圆角</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLimgcircle(selectid) {//圆形
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-border")
                button.setAttribute("custom-attr-value", "圆形")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">圆形</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLimgshadow(selectid) {//立体
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-shadow")
                button.setAttribute("custom-attr-value", "立体")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">立体</span><span class="b3-menu__accelerator">组别2</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLimginvert(selectid) {//反色
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-invert")
                button.setAttribute("custom-attr-value", "反色")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">反色</span><span class="b3-menu__accelerator">组别3</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLimggrid(selectid) {//九宫格排列
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-display")
                button.setAttribute("custom-attr-value", "九宫格排列")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">九宫格排列</span><span class="b3-menu__accelerator">组别4</span>`
                button.onclick = QYLcustomattrset
                return button
            }

            function QYLimgdelete(selectid) {//全部清除
                let button = document.createElement("button")
                button.className = "b3-menu__item b3-menu__item--warning"
                button.style.color = "var(--b3-theme-error)"
                button.setAttribute("data-node-id", selectid)
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">全部清除</span>`
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
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label" style="">最大高度</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrheightsub(selectid))//准备创建最大高度选项的二级菜单
    return button
}
function QYLattrheightsub(selectid) {//创建最大高度选项的二级菜单
    let div = document.createElement('div');
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
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">50px</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight100(selectid) {//100
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "100")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">100px</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight150(selectid) {//150
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "150")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">150px</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight200(selectid) {//200
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "200")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">200px</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight300(selectid) {//300
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "300")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">300px</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight400(selectid) {//400
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "400")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">400px</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLheight500(selectid) {//500
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "500")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">500px</span><span class="b3-menu__accelerator">组别1</span>`
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
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">清除属性</span>`
                button.onclick = QYLcustomattrset
                return button
            }
        }
}

/* -----------------------------------------文档style属性（通用）------------------------------------- */
function QYLattrfilestyleitem(selectid) {//创建文档样式选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">文档样式</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrfilestylesub(selectid))//准备创建文档样式选项的二级菜单
    return button
}
function QYLattrfilestylesub(selectid) {//创建文档样式选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(QYLattrfilestylesubitems(selectid))//准备创建文档样式选项的b3-menu__items
    return div

    function QYLattrfilestylesubitems(selectid) {//创建文档样式选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(QYLstylewangge(selectid))//网格
        div.appendChild(QYLstylesajinzhi(selectid))//洒金纸
        div.appendChild(QYLstyledelete(selectid))//清除属性
        return div
        function QYLstylesajinzhi(selectid) {//洒金纸
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "style")
            button.setAttribute("custom-attr-value", "洒金纸")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">洒金纸</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = QYLcustomattrset
            return button
        }
        function QYLstylewangge(selectid) {//网格
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "style")
            button.setAttribute("custom-attr-value", "网格")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">网格</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">清除属性</span>`
            button.onclick = QYLcustomattrset
            return button
        }
    }
}

/* -----------------------------------------style属性（通用）------------------------------------- */
    function QYLattrstyleitem(selectid) {//创建块样式选项
        let button = document.createElement('button');
        button.className = "b3-menu__item"
        button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">块样式</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
        button.appendChild(QYLattrstylesub(selectid))//准备创建块样式选项的二级菜单
        return button
    }
    function QYLattrstylesub(selectid) {//创建块样式选项的二级菜单
        let div = document.createElement('div');
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
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">警告（红）</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyletip(selectid) {//灵感
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "灵感")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">灵感（橙）</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyleinfo(selectid) {//信息
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "信息")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">信息（青）</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyleimportant(selectid) {//重要
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "重要")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">重要（紫）</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstylecomment(selectid) {//批注
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "批注")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">批注（黑）</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstylequote(selectid) {//引用
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "引用")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">引用（灰）</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyletodo(selectid) {//待办
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "待办")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">待办（蓝）</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstyledone(selectid) {//完成
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "完成")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">完成（绿）</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstylesajinzhi(selectid) {//洒金纸
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "洒金纸")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">洒金纸</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstylewangge(selectid) {//网格
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "网格")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">网格</span><span class="b3-menu__accelerator">组别1</span>`
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
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">清除属性</span>`
                button.onclick = QYLcustomattrset
                return button
            }
            function QYLstylenoteitem(selectid) {//创建便签选项
                let button = document.createElement('button');
                button.className = "b3-menu__item"
                button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">便签</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button><span class="b3-menu__accelerator">组别1</span>'
                button.appendChild(QYLstylenotesub(selectid))//准备便签选项的二级菜单
                return button
                }
                function QYLstylenotesub(selectid) {//创建便签选项的二级菜单
                    let div = document.createElement('div');
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
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">红色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstyleorangenote(selectid) {//橙色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "橙色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">橙色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstyleyellownote(selectid) {//黄色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "黄色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">黄色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylegreennote(selectid) {//绿色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "绿色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">绿色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylecyannote(selectid) {//青色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "青色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">青色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylebluenote(selectid) {//蓝色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "蓝色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">蓝色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylepurplenote(selectid) {//紫色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "紫色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">紫色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylepinknote(selectid) {//粉色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "粉色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">粉色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstyleblacknote(selectid) {//黑色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "黑色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">黑色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                        function QYLstylegraynote(selectid) {//灰色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "灰色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">灰色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = QYLcustomattrset
                            return button
                        }
                    }
                }
                function QYLstyleleftborderitem(selectid) {//创建左边框选项
                    let button = document.createElement('button');
                    button.className = "b3-menu__item"
                    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">左边框</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button><span class="b3-menu__accelerator">组别1</span>'
                    button.appendChild(QYLstyleleftbordersub(selectid))//准备左边框选项的二级菜单
                    return button
                    }
                    function QYLstyleleftbordersub(selectid) {//创建左边框选项的二级菜单
                        let div = document.createElement('div');
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
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">红左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstyleorangenote(selectid) {//橙左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "橙左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">橙左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstyleyellownote(selectid) {//黄左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "黄左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">黄左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylegreennote(selectid) {//绿左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "绿左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">绿左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylecyannote(selectid) {//青左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "青左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">青左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylebluenote(selectid) {//蓝左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "蓝左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">蓝左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylepurplenote(selectid) {//紫左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "紫左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">紫左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylepinknote(selectid) {//粉左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "粉左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">粉左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstyleblacknote(selectid) {//黑左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "黑左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">黑左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                            function QYLstylegraynote(selectid) {//灰左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "灰左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">灰左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = QYLcustomattrset
                                return button
                            }
                        }
                    }
        }
    }


/* -----------------------------------------font-family属性（通用）------------------------------------- */
function QYLattrfontfamilyitem(selectid) {//创建字体选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label" style="">字体</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(QYLattrfontfamilysub(selectid))//准备创建字体选项的二级菜单
    return button
}
function QYLattrfontfamilysub(selectid) {//创建字体选项的二级菜单
    let div = document.createElement('div');
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">宋体</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">幼圆</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">黑体</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">微软雅黑</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">新宋体</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">楷体</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">隶书</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">仿宋</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文宋体</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文中宋</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文仿宋</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文彩云</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文新魏</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文楷体</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文琥珀</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文细黑</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文行楷</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文隶书</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">方正姚体</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">方正舒体</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">Times New Roman</span><span class="b3-menu__accelerator">组别1</span>`
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
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">清除属性</span>`
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