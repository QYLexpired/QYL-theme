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
    },
    en_US: {
        QYLztsz: ' QYL-Theme Settings',
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
        QYLToolBar.innerHTML = `<svg t="1740797651161" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4700" width="24" height="24"><path d="M896 0a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128H128a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h768zM505.856 179.712c-97.664 0-174.72 31.36-230.272 95.872-53.76 60.928-79.744 139.776-79.744 237.44 0 96.768 25.984 175.616 79.744 236.544 55.552 62.72 132.608 94.976 230.272 94.976 66.304 0 122.752-14.336 170.24-43.008 23.296 31.36 46.592 64.512 70.784 99.456l62.72-55.552c-23.296-34.048-47.488-66.304-70.784-97.664 51.968-60.928 77.952-138.88 77.952-234.752 0-98.56-26.88-178.304-80.64-238.336-56.448-63.616-133.504-94.976-230.272-94.976z m0 86.016c68.096 0 120.96 21.504 157.696 66.304 35.84 43.904 54.656 103.936 54.656 180.992 0 65.408-13.44 118.272-40.32 159.488A2949.44 2949.44 0 0 0 581.12 564.096l-56.448 55.552c31.36 33.152 63.616 69.888 95.872 110.208-31.36 18.816-69.888 28.672-114.688 28.672-68.096 0-120.96-23.296-158.592-68.096-35.84-43.904-53.76-103.04-53.76-177.408 0-75.264 17.92-134.4 53.76-178.304 37.632-46.592 90.496-68.992 158.592-68.992z" fill="var(--b3-toolbar-color)" opacity=".9" p-id="4701"></path></svg>`;
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
let isChecked19;
let isChecked20;
let isChecked21;
let isChecked22;
let isChecked23;
let isChecked24;
let isChecked30;
let isChecked31;
let isChecked32;

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
    settingsWindow.style.border = 'none';
    settingsWindow.style.boxShadow = 'var(--b3-point-shadow)';
    settingsWindow.style.zIndex = '1000';
    settingsWindow.style.borderRadius = 'var(--b3-border-radius)';

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
    checkbox12.id = 'QYLsunset-checkbox';
    checkbox12.checked = isChecked12;

    const label12 = document.createElement('label');
    label12.htmlFor = 'QYLsunset-checkbox';
    label12.textContent = i18n.QYLxyps;
    label12.style.fontSize = '14px';
    label12.style.userSelect= 'none';

    const checkbox13 = document.createElement('input');
    checkbox13.type = 'checkbox';
    checkbox13.id = 'QYLforest-checkbox';
    checkbox13.checked = isChecked13;

    const label13 = document.createElement('label');
    label13.htmlFor = 'QYLforest-checkbox';
    label13.textContent = i18n.QYLslps;
    label13.style.fontSize = '14px';
    label13.style.userSelect= 'none';

    const checkbox14 = document.createElement('input');
    checkbox14.type = 'checkbox';
    checkbox14.id = 'QYLocean-checkbox';
    checkbox14.checked = isChecked14;

    const label14 = document.createElement('label');
    label14.htmlFor = 'QYLocean-checkbox';
    label14.textContent = i18n.QYLhyps;
    label14.style.fontSize = '14px';
    label14.style.userSelect= 'none';

    const checkbox15 = document.createElement('input');
    checkbox15.type = 'checkbox';
    checkbox15.id = 'QYLsugar-checkbox';
    checkbox15.checked = isChecked15;

    const label15 = document.createElement('label');
    label15.htmlFor = 'QYLsugar-checkbox';
    label15.textContent = i18n.QYLtgps;
    label15.style.fontSize = '14px';
    label15.style.userSelect= 'none';

    const checkbox16 = document.createElement('input');
    checkbox16.type = 'checkbox';
    checkbox16.id = 'QYLlavender-checkbox';
    checkbox16.checked = isChecked16;

    const label16 = document.createElement('label');
    label16.htmlFor = 'QYLlavender-checkbox';
    label16.textContent = i18n.QYLxycps;
    label16.style.fontSize = '14px';
    label16.style.userSelect= 'none';

    const checkbox17 = document.createElement('input');
    checkbox17.type = 'checkbox';
    checkbox17.id = 'QYLlfog-checkbox';
    checkbox17.checked = isChecked17;

    const label17 = document.createElement('label');
    label17.htmlFor = 'QYLlfog-checkbox';
    label17.textContent = i18n.QYLywps;
    label17.style.fontSize = '14px';
    label17.style.userSelect= 'none';

    const checkbox18 = document.createElement('input');
    checkbox18.type = 'checkbox';
    checkbox18.id = 'QYLlinkmode-checkbox';
    checkbox18.checked = isChecked18;

    const label18 = document.createElement('label');
    label18.htmlFor = 'QYLlinkmode-checkbox';
    label18.textContent = i18n.QYLmsp;
    label18.style.fontSize = '14px';
    label18.style.userSelect= 'none';

    const checkbox19 = document.createElement('input');
    checkbox19.type = 'checkbox';
    checkbox19.id = 'QYLlshuanghe-checkbox';
    checkbox19.checked = isChecked19;

    const label19 = document.createElement('label');
    label19.htmlFor = 'QYLlshuanghe-checkbox';
    label19.textContent = i18n.QYLshps;
    label19.style.fontSize = '14px';
    label19.style.userSelect= 'none';

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

    const checkbox30 = document.createElement('input');
    checkbox30.type = 'checkbox';
    checkbox30.id = 'QYLlmemory-checkbox';
    checkbox30.checked = isChecked30;

    const label30 = document.createElement('label');
    label30.htmlFor = 'QYLlmemory-checkbox';
    label30.textContent = i18n.QYLhyhyps;
    label30.style.fontSize = '14px';
    label30.style.userSelect= 'none';

    const checkbox31 = document.createElement('input');
    checkbox31.type = 'checkbox';
    checkbox31.id = 'QYLllakeside-checkbox';
    checkbox31.checked = isChecked31;

    const label31 = document.createElement('label');
    label31.htmlFor = 'QYLllakeside-checkbox';
    label31.textContent = i18n.QYLhpps;
    label31.style.fontSize = '14px';
    label31.style.userSelect= 'none';

    const checkbox32 = document.createElement('input');
    checkbox32.type = 'checkbox';
    checkbox32.id = 'QYLlfreesia-checkbox';
    checkbox32.checked = isChecked32;

    const label32 = document.createElement('label');
    label32.htmlFor = 'QYLlfreesia-checkbox';
    label32.textContent = i18n.QYLxxlps;
    label32.style.fontSize = '14px';
    label32.style.userSelect= 'none';


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

    const QYLfunctionpair19 = document.createElement('div');
    QYLfunctionpair19.className = 'checkbox-label-pair';
    QYLfunctionpair19.appendChild(checkbox19);
    QYLfunctionpair19.appendChild(label19);
    QYLfunctionpair19.style.animation = 'QYLbounceRight2 0.1s';

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

    const QYLfunctionpair32 = document.createElement('div');
    QYLfunctionpair32.className = 'checkbox-label-pair';
    QYLfunctionpair32.appendChild(checkbox32);
    QYLfunctionpair32.appendChild(label32);
    QYLfunctionpair32.style.animation = 'QYLbounceRight2 0.1s';

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



    // 将复选框和标签添加到设置窗口

    settingsWindow.appendChild(QYLfunctionpair10); //毛玻璃
    settingsWindow.appendChild(QYLfunctionpair18); //墨水屏
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
    settingsWindow.appendChild(QYLfunctionpair12);
    settingsWindow.appendChild(QYLfunctionpair13);
    settingsWindow.appendChild(QYLfunctionpair14);
    settingsWindow.appendChild(QYLfunctionpair15);
    settingsWindow.appendChild(QYLfunctionpair16);
    settingsWindow.appendChild(QYLfunctionpair17);
    settingsWindow.appendChild(QYLfunctionpair19);
    settingsWindow.appendChild(QYLfunctionpair30);
    settingsWindow.appendChild(QYLfunctionpair31);
    settingsWindow.appendChild(QYLfunctionpair32);


// 将设置窗口添加到body
document.body.appendChild(settingsWindow);

// 保存配置到QYLconfig.json
async function saveConfig() {
    const formData = new FormData();
    formData.append('path', '/data/snippets/QYLconfig.json');
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
        isChecked30: checkbox30.checked,
        isChecked31: checkbox31.checked,
        isChecked32: checkbox32.checked
    })], { type: 'application/json' }), 'QYLconfig.json');

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
    if (isChecked10 === true) { checkbox10.click(); }
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

// 关闭鼠标所在块高亮功能
function disablehoverblockremind() {
    const styleSheet = document.getElementById("hoverblock-style");
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
        @keyframes QYLbounceLeftspecial {
            0% {
                transform: translateX(100%);
            }
            30% {
                transform: translateX(-10%);
            }
            70% {
                transform: translateX(5%);
            }
            100% {
                transform: translateX(0);
            }
        }
        .protyle-background__icon, .protyle-background__icon img, .protyle-background__icon svg, .b3-chips__doctag .b3-chip {
            position: relative;
            left: -76px;
            animation: QYLbounceLeftspecial 0.3s forwards;
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
        linkElement.href = "/appearance/themes/QYL-theme/style-light/多彩文档树-light.css";
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
    const linkElement = document.getElementById("QYLAero-style");
    if (linkElement) {
        linkElement.remove();
    }
}


// 多彩标签和多彩行级代码
function enableQYLcolorfultag() {
    let linkElement = document.getElementById("QYLcolorfultag-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLcolorfultag-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-public/多彩标签和多彩代码.css";
        document.head.appendChild(linkElement);
    }
}

// 多彩标签和多彩行级代码
function disableQYLcolorfultag() {
    const linkElement = document.getElementById("QYLcolorfultag-style");
    if (linkElement) {
        linkElement.remove();
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

// 开启多彩标题和多彩大纲
function enableQYLcolorfulh() {
    let linkElement = document.getElementById("QYLcolorfulh-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "QYLcolorfulh-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/QYL-theme/style-light/多彩标题-light.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭多彩标题和多彩大纲
function disableQYLcolorfulh() {
    const linkElement = document.getElementById("QYLcolorfulh-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启顶栏融合
function enableQYLfusion() {
    setTimeout(QYLwnd.start, 300);
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
    QYLwnd.stop();
    fusion.stop();
    windowObserver.stop();

    const linkElement = document.getElementById("QYLfusion-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启垂直页签
function enableQYLverticaltab() {
    setTimeout(QYLwnd.start, 300);

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
    QYLwnd.stop();

    const linkElement = document.getElementById("QYLverticaltab-style");
    if (linkElement) {
        linkElement.remove();
    }
}


// 读取QYLconfig.json
async function loadAndCheckConfig() {
    try {
        const content = await getFile("/data/snippets/QYLconfig.json");
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
    function updateThemeColorMeta() {
        const root = document.documentElement;
        const currentColor = getComputedStyle(root).getPropertyValue('--b3-theme-surface').trim();

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

// 寻找第一个wnd
const QYLwnd = (function() {
    let observer = null;
    let currentTarget = null;
    function check() {
        let current = document.querySelector('.layout__center');
        let target = null;
        while (current) {
            const firstChild = current.firstElementChild;
            if (!firstChild) break;

            if (firstChild.getAttribute('data-type') === 'wnd') {
                target = firstChild;
                break;
            } else {
                current = firstChild;
            }
        }
        if (currentTarget) {
            currentTarget.classList.remove('QYLwndthe1');
            currentTarget = null;
        }
        if (target) {
            target.classList.add('QYLwndthe1');
            currentTarget = target;
        }
    }
    function start() {
        if (observer) return;
        check();
        const container = document.querySelector('.layout__center');
        if (!container) {
            console.error('未找到.layout__center元素');
            return;
        }
        observer = new MutationObserver(mutations => {
            let needsCheck = false;
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-type') {
                    needsCheck = true;
                } else if (mutation.type === 'childList') {
                    needsCheck = true;
                }
            }
            if (needsCheck) check();
        });
        observer.observe(container, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-type']
        });
    }
    function stop() {
        if (!observer) return;
        observer.disconnect();
        observer = null;
        if (currentTarget) {
            currentTarget.classList.remove('QYLwndthe1');
            currentTarget = null;
        }
    }
    return { start, stop };
})();


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
                        reject(new Error('QYL Elements not found'));
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
                this.QYL_status.style.transform = `translateX(-${offset}px)`;
            } catch (error) {
                console.error('QYL Calculation Error:', error);
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
                console.error('QYL Init Failed:', error);
                this.QYL_scheduleRecovery();
            }
        }
        QYL_validateElements() {
            const isValid = [this.QYL_layout, this.QYL_status].every(
                el => el?.isConnected
            );
            !isValid && console.warn('QYL Elements Missing');
            return isValid;
        }

        QYL_scheduleRecovery() {
            if (!this.QYL_isActive) return;
            
            console.log('QYL Attempting Recovery...');
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
        } else {
            console.warn('QYL Required Elements Missing');
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
        
        document.documentElement.style.setProperty('--QYL-fusion-center-left', `${centerLeft}px`);
        document.documentElement.style.setProperty('--QYL-fusion-drag-left', `${dragLeft}px`);
        document.documentElement.style.setProperty('--QYL-fusion-drag-right', `${dragRight}px`);
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
        }, 1200);
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
        }, 1200);
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
function QYLcssApplyCustomCSS() {
    QYLcssObserver.disconnect();
    const elements = document.querySelectorAll('div[custom-css]');
    const cssRules = [];
    const containerSelector = ':is(#layouts, #preview, [data-key="dialog-exportimage"])';
    elements.forEach(element => {
        const cssValue = element.getAttribute('custom-css');
        const nodeId = element.getAttribute('data-node-id');       
        if (cssValue) {
            if (nodeId) {
                cssRules.push(
                    `${containerSelector} div[data-node-id="${nodeId}"] { ${cssValue} }`
                );
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
                cssRules.push(
                    `${containerSelector} div[data-css-uid="${uid}"] { ${cssValue} }`
                );
            }
        }
    });
    const existingStyle = document.getElementById('snippet-QYLcss-dynamic-css');
    if (existingStyle) existingStyle.remove();    
    const style = document.createElement('style');
    style.id = 'snippet-QYLcss-dynamic-css';
    style.textContent = cssRules.join('\n');
    document.head.appendChild(style);
    QYLcssObserver.observe(document.body, QYLcssObserverConfig);
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
const QYLcssDebouncedApplyCSS = QYLcssDebounce(QYLcssApplyCustomCSS, 100);
QYLcssObserver.observe(document.body, QYLcssObserverConfig);
QYLcssApplyCustomCSS();

//列表辅助线
const QYLlihelp = (() => {
    let focusedBlock = null;
    let eventHandlers = new WeakMap();
    const eventConfig = { capture: true, passive: true };
    
    const debounce = (func, wait = 100) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const handleEvent = (e) => {
        const getTarget = () => {
            if (e.type === 'mouseup') return e.target.closest('[data-node-id]:not(.NodeAttributeView *)');
            if (e.type === 'keyup') {
                const editor = document.activeElement.closest('.protyle-wysiwyg:not(.NodeAttributeView)');
                return editor && window.getSelection()?.focusNode?.parentElement?.closest('[data-node-id]');
            }
        };

        const target = getTarget();
        if (!target || target === focusedBlock) return;

        focusedBlock?.classList.remove('block-focus');
        focusedBlock = target;
        target.classList.add('block-focus');
    };

    return {
        start() {
            this.stop();
            const boundHandler = handleEvent.bind(this);
            const debouncedKeyHandler = debounce(boundHandler);
            
            const handlers = new Map([
                ['mouseup', boundHandler],
                ['keyup', debouncedKeyHandler]
            ]);
            
            handlers.forEach((handler, type) => 
                document.addEventListener(type, handler, eventConfig)
            );
            eventHandlers.set(this, handlers);
        },

        stop() {
            const handlers = eventHandlers.get(this);
            if (handlers) {
                handlers.forEach((handler, type) => 
                    document.removeEventListener(type, handler, eventConfig)
                );
                eventHandlers.delete(this);
            }
            if (focusedBlock) {
                focusedBlock.classList.remove('block-focus');
                focusedBlock = null;
            }
        }
    };
})();
