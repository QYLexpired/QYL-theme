//思源API
async function putFile(path, content = '', isDir = false) {
    const formData = new FormData();
    formData.append("path", path);
    formData.append("isDir", isDir)
    formData.append("file", new Blob([content]));
    const result = await fetch("/api/file/putFile", { // 写入js到本地
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



// 块提示
document.addEventListener('selectionchange', function() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const node = range.startContainer;
        let element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;

        while (element && !element.classList.contains('protyle-wysiwyg')) {
            element = element.parentElement;
        }

        if (element && element.classList.contains('protyle-wysiwyg')) {
            const highlightedElements = element.querySelectorAll('.highlight');
            highlightedElements.forEach(el => el.classList.remove('highlight'));

            let targetElement = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
            while (targetElement && (!element.contains(targetElement) || !targetElement.classList.contains('p'))) {
                targetElement = targetElement.parentElement;
            }

            if (targetElement && targetElement.classList.contains('p')) {
                targetElement.classList.add('highlight');
            }
        }
    }
});

// 状态栏拖动
moveableStatus();
function moveableStatus(status) {
    let isDragging = false;
    let isDragged = false;
    let offsetX, offsetY;
    let left='0px', top='0px';
    let width = 0, height = 0;
    const originStyle = {};

    if(!status) status = document.querySelector('#status');

    // 初始时计算宽高和位置
    const calcStatusStyle = () => {
        let style = getComputedStyle(status, null);
        if(!isDragged) {
            // 如果静态元素设置为固定元素
            if(style.position === 'static') {
                status.style.position = 'fixed';
                status.style.setProperty('right', '42px', 'important');
                status.style.bottom = '-8px';
                style = getComputedStyle(status, null);
            }
            // 计算状态栏宽高
            const marginWidth = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            const marginHeight = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            width = parseFloat(style.width) + marginWidth;
            height = parseFloat(style.height) + marginHeight;

            // 记录状态栏初始样式
            originStyle.position = style.position;
            originStyle.right = style.right;
            originStyle.bottom = style.bottom;

            // 计算状态栏位置
            left = window.innerWidth - (parseFloat(style.right) + width) + 'px';
            top = window.innerHeight - (parseFloat(style.bottom) + height) + 'px';
        }
    };
    
    // 改变窗口大小事件
    window.addEventListener("resize", (event)=>{
        if (isDragged) {
            if(parseFloat(status.style.left) > window.innerWidth) {
                status.style.left = (window.innerWidth - width) + 'px';
            }
            if(parseFloat(status.style.top) > window.innerHeight) {
                status.style.top = (window.innerHeight - height) + 'px';
            }
        }
    });

    // 双击恢复状态栏
    status.addEventListener("dblclick", (event)=>{
        isDragged = false;
        status.style.position = originStyle.position;
        status.style.setProperty('right', originStyle.right, 'important');
        status.style.bottom = originStyle.bottom;
        status.style.left = 'auto';
        status.style.top = 'auto';
    });

    // 拖动事件
    const dragHandler = (e) => {
        if (e.type === 'mousedown') {
            // 开始拖动
            calcStatusStyle();
            if(!isDragged) {
                isDragged = true;
                status.style.position = 'absolute';
                status.style.setProperty('right', 'auto', 'important');
                status.style.bottom = 'auto';
                status.style.left = left;
                status.style.top = top;
            }
            isDragging = true;
            document.removeEventListener('mousemove', dragHandler);
            document.removeEventListener('mouseup', dragHandler);
            document.addEventListener('mousemove', dragHandler);
            document.addEventListener('mouseup', dragHandler);
            offsetX = e.clientX - status.offsetLeft;
            offsetY = e.clientY - status.offsetTop;
        } else if (e.type === 'mousemove' && isDragging) {
            // 拖动中
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;
            //限制不超过窗口大小
            if(x < 0) x = 0;
            if(y < 0) y = 0;
            if(x > window.innerWidth - width) x = window.innerWidth - width;
            if(y > window.innerHeight - height) y = window.innerHeight - height;
            // 设置状态栏坐标
            status.style.left = x + 'px';
            status.style.top = y + 'px';
        } else if (e.type === 'mouseup') {
            //结束拖动
            isDragging = false;
            document.removeEventListener('mousemove', dragHandler);
            document.removeEventListener('mouseup', dragHandler);
        }
        e.preventDefault();
    };
    status.removeEventListener('mousedown', dragHandler);
    status.addEventListener('mousedown', dragHandler);
}

// 添加Q按钮
(function() {
    addThemeToolBar();
})();

// Q按钮定义/Q按钮关闭设置窗口
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
        QYLToolBar.ariaLabel = "QYL主题设置";
        QYLToolBar.style.userSelect= 'none';
        var parentElement = toolbarVIP ? toolbarVIP.parentElement : (windowControls ? windowControls.parentElement : document.body);
        if (!parentElement) {
            document.body.classList.add("QYLmobile");
            return;
        }
        parentElement.insertBefore(QYLToolBar, toolbarVIP || windowControls);
        QYLToolBar.addEventListener("click", function() {
            var settingsWindow = document.getElementById('settings-window');
            if (settingsWindow) {
                closeSettingsWindow();
            } else {
                createSettingsWindow();
            }
        });
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

function createSettingsWindow() {
    // 检查是否已经存在设置窗口
    if (document.getElementById('settings-window')) return;

    // 创建设置窗口
    const settingsWindow = document.createElement('div');
    settingsWindow.id = 'settings-window';
    settingsWindow.style.position = 'fixed';
    settingsWindow.style.top = '32px'; 
    settingsWindow.style.right = '195px'; 
    settingsWindow.style.backgroundColor = 'var(--QYL-filter-background-forQsettings)';
    settingsWindow.style.backdropFilter = 'var(--QYL-Aero-filter)';
    settingsWindow.style.padding = '12px';
    settingsWindow.style.border = 'none';
    settingsWindow.style.boxShadow = 'var(--b3-point-shadow)';
    settingsWindow.style.zIndex = '1000';
    settingsWindow.style.borderRadius = '16px'; 

    // 创建复选框和标签
    const checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.id = 'mark-empty-checkbox';
    checkbox1.checked = isChecked1;

    const label1 = document.createElement('label');
    label1.htmlFor = 'mark-empty-checkbox';
    label1.textContent = ' 标记挖空';
    label1.style.fontSize = '14px';
    label1.style.userSelect= 'none';

    const checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'filetree-indent-checkbox';
    checkbox2.checked = isChecked2;

    const label2 = document.createElement('label');
    label2.htmlFor = 'filetree-indent-checkbox';
    label2.textContent = ' 文档树和大纲缩进线';
    label2.style.fontSize = '14px';
    label2.style.userSelect= 'none';

    const checkbox3 = document.createElement('input');
    checkbox3.type = 'checkbox';
    checkbox3.id = 'toolbar-hidden-checkbox';
    checkbox3.checked = isChecked3;

    const label3 = document.createElement('label');
    label3.htmlFor = 'toolbar-hidden-checkbox';
    label3.textContent = ' 隐藏顶栏';
    label3.style.fontSize = '14px';
    label3.style.userSelect= 'none';

    const checkbox4 = document.createElement('input');
    checkbox4.type = 'checkbox';
    checkbox4.id = 'hoverblock-remind-checkbox';
    checkbox4.checked = isChecked4;

    const label4 = document.createElement('label');
    label4.htmlFor = 'hoverblock-remind-checkbox';
    label4.textContent = ' 鼠标所在块高亮提示';
    label4.style.fontSize = '14px';
    label4.style.userSelect= 'none';

    const checkbox5 = document.createElement('input');
    checkbox5.type = 'checkbox';
    checkbox5.id = 'sbblock-remind-checkbox';
    checkbox5.checked = isChecked5;

    const label5 = document.createElement('label');
    label5.htmlFor = 'sbblock-remind-checkbox';
    label5.textContent = ' 鼠标所在超级块范围提示';
    label5.style.fontSize = '14px';
    label5.style.userSelect= 'none';

    const checkbox6 = document.createElement('input');
    checkbox6.type = 'checkbox';
    checkbox6.id = 'fullwidthpage-checkbox';
    checkbox6.checked = isChecked6;

    const label6 = document.createElement('label');
    label6.htmlFor = 'fullwidthpage-checkbox';
    label6.textContent = ' 编辑器全宽显示';
    label6.style.fontSize = '14px';
    label6.style.userSelect= 'none';

    const checkbox7 = document.createElement('input');
    checkbox7.type = 'checkbox';
    checkbox7.id = 'colorfulfiletree-checkbox';
    checkbox7.checked = isChecked7;

    const label7 = document.createElement('label');
    label7.htmlFor = 'colorfulfiletree-checkbox';
    label7.textContent = ' 多彩文档树';
    label7.style.fontSize = '14px';
    label7.style.userSelect= 'none';

    const checkbox8 = document.createElement('input');
    checkbox8.type = 'checkbox';
    checkbox8.id = 'focusblockremind-checkbox';
    checkbox8.checked = isChecked8;

    const label8 = document.createElement('label');
    label8.htmlFor = 'focusblockremind-checkbox';
    label8.textContent = ' 关闭聚焦块高亮提示';
    label8.style.fontSize = '14px';
    label8.style.userSelect= 'none';

    const checkbox9 = document.createElement('input');
    checkbox9.type = 'checkbox';
    checkbox9.id = 'QYLanimation-checkbox';
    checkbox9.checked = isChecked9;

    const label9 = document.createElement('label');
    label9.htmlFor = 'QYLanimation-checkbox';
    label9.textContent = ' 关闭主题动画';
    label9.style.fontSize = '14px';
    label9.style.userSelect= 'none';

    const checkbox10 = document.createElement('input');
    checkbox10.type = 'checkbox';
    checkbox10.id = 'QYLAero-checkbox';
    checkbox10.checked = isChecked10;

    const label10 = document.createElement('label');
    label10.htmlFor = 'QYLAero-checkbox';
    label10.textContent = ' 毛玻璃效果';
    label10.style.fontSize = '14px';
    label10.style.userSelect= 'none';

    const checkbox11 = document.createElement('input');
    checkbox11.type = 'checkbox';
    checkbox11.id = 'QYLbancolofultag-checkbox';
    checkbox11.checked = isChecked11;

    const label11 = document.createElement('label');
    label11.htmlFor = 'QYLbancolofultag-checkbox';
    label11.textContent = ' 关闭多彩标签和多彩行级代码';
    label11.style.fontSize = '14px';
    label11.style.userSelect= 'none';

    const checkbox12 = document.createElement('input');
    checkbox12.type = 'checkbox';
    checkbox12.id = 'QYLsunset-checkbox';
    checkbox12.checked = isChecked12;

    const label12 = document.createElement('label');
    label12.htmlFor = 'QYLsunset-checkbox';
    label12.textContent = ' 配色：夕阳';
    label12.style.fontSize = '14px';
    label12.style.userSelect= 'none';

    const checkbox13 = document.createElement('input');
    checkbox13.type = 'checkbox';
    checkbox13.id = 'QYLforest-checkbox';
    checkbox13.checked = isChecked13;

    const label13 = document.createElement('label');
    label13.htmlFor = 'QYLforest-checkbox';
    label13.textContent = ' 配色：森林';
    label13.style.fontSize = '14px';
    label13.style.userSelect= 'none';

    const checkbox14 = document.createElement('input');
    checkbox14.type = 'checkbox';
    checkbox14.id = 'QYLocean-checkbox';
    checkbox14.checked = isChecked14;

    const label14 = document.createElement('label');
    label14.htmlFor = 'QYLocean-checkbox';
    label14.textContent = ' 配色：海洋';
    label14.style.fontSize = '14px';
    label14.style.userSelect= 'none';

    const checkbox15 = document.createElement('input');
    checkbox15.type = 'checkbox';
    checkbox15.id = 'QYLsugar-checkbox';
    checkbox15.checked = isChecked15;

    const label15 = document.createElement('label');
    label15.htmlFor = 'QYLsugar-checkbox';
    label15.textContent = ' 配色：糖果';
    label15.style.fontSize = '14px';
    label15.style.userSelect= 'none';

    const checkbox16 = document.createElement('input');
    checkbox16.type = 'checkbox';
    checkbox16.id = 'QYLlavender-checkbox';
    checkbox16.checked = isChecked16;

    const label16 = document.createElement('label');
    label16.htmlFor = 'QYLlavender-checkbox';
    label16.textContent = ' 配色：薰衣草';
    label16.style.fontSize = '14px';
    label16.style.userSelect= 'none';

    const checkbox17 = document.createElement('input');
    checkbox17.type = 'checkbox';
    checkbox17.id = 'QYLlfog-checkbox';
    checkbox17.checked = isChecked17;

    const label17 = document.createElement('label');
    label17.htmlFor = 'QYLlfog-checkbox';
    label17.textContent = ' 配色：云雾';
    label17.style.fontSize = '14px';
    label17.style.userSelect= 'none';

    const checkbox18 = document.createElement('input');
    checkbox18.type = 'checkbox';
    checkbox18.id = 'QYLlinkmode-checkbox';
    checkbox18.checked = isChecked18;

    const label18 = document.createElement('label');
    label18.htmlFor = 'QYLlinkmode-checkbox';
    label18.textContent = ' 墨水屏模式';
    label18.style.fontSize = '14px';
    label18.style.userSelect= 'none';

    const checkbox19 = document.createElement('input');
    checkbox19.type = 'checkbox';
    checkbox19.id = 'QYLlshuanghe-checkbox';
    checkbox19.checked = isChecked19;

    const label19 = document.createElement('label');
    label19.htmlFor = 'QYLlshuanghe-checkbox';
    label19.textContent = ' 配色：霜禾';
    label19.style.fontSize = '14px';
    label19.style.userSelect= 'none';


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


    // 将复选框和标签添加到设置窗口
    settingsWindow.appendChild(QYLfunctionpair1);
    settingsWindow.appendChild(QYLfunctionpair2);
    settingsWindow.appendChild(QYLfunctionpair3);
    settingsWindow.appendChild(QYLfunctionpair4);
    settingsWindow.appendChild(QYLfunctionpair5);
    settingsWindow.appendChild(QYLfunctionpair8);
    settingsWindow.appendChild(QYLfunctionpair6);
    settingsWindow.appendChild(QYLfunctionpair7);
    settingsWindow.appendChild(QYLfunctionpair9);
    settingsWindow.appendChild(QYLfunctionpair10);
    settingsWindow.appendChild(QYLfunctionpair11);
    settingsWindow.appendChild(QYLfunctionpair18);
    settingsWindow.appendChild(QYLfunctionpair12);
    settingsWindow.appendChild(QYLfunctionpair13);
    settingsWindow.appendChild(QYLfunctionpair14);
    settingsWindow.appendChild(QYLfunctionpair15);
    settingsWindow.appendChild(QYLfunctionpair16);
    settingsWindow.appendChild(QYLfunctionpair17);
    settingsWindow.appendChild(QYLfunctionpair19);


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
        isChecked19: checkbox19.checked
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

// 关闭聚焦块高亮开关
checkbox8.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablecanclefocusblockremind() : disablecanclefocusblockremind();
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

// 关闭主题动画开关
checkbox9.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablecancleQYLanimation() : disablecancleQYLanimation();
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


// 关闭多彩标签和多彩行级代码开关
checkbox11.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablecancleQYLcolorfultag() : disablecancleQYLcolorfultag();
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
    const settingsWindow = document.getElementById('settings-window');
    if (settingsWindow) {
        document.body.removeChild(settingsWindow);
    }
}

// 开启标记挖空功能
function enableMarkStyles() {
    let styleSheet = document.getElementById("mark-styles");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "mark-styles";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        span[data-type~=mark] {
            background: transparent !important;
        }
        .b3-typography mark, .b3-typography span[data-type~=mark], 
        .protyle-wysiwyg mark, .protyle-wysiwyg span[data-type~=mark] {
            color: transparent !important; 
            border-bottom: 1.5px solid rgb(90, 186, 73);
            background-color: transparent !important;
            margin-left: 3px;
            margin-right: 3px;
            padding-bottom: 3px;
        }
        .b3-typography mark:hover, .b3-typography span[data-type~=mark]:hover, 
        .protyle-wysiwyg mark:hover, .protyle-wysiwyg span[data-type~=mark]:hover {
            color: inherit !important;
            border-bottom: 1.5px solid rgb(90, 186, 73);
            background-color: transparent !important;
            margin-left: 3px;
            margin-right: 3px;
            padding-bottom: 3px;
        }
        .card__block--hidemark span[data-type~=mark]::before {
            content: "________";
            visibility: hidden;
            white-space: nowrap;
        }
    `;
}
// 关闭标记挖空功能
function disableMarkStyles() {
    const styleSheet = document.getElementById("mark-styles");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启文档树缩进线功能
function enableIndentStyle() {
    let styleSheet = document.getElementById("indent-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "indent-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
:root {
    --filetree-line-1: var(--b3-theme-primary-lighter);
    --filetree-line-2: var(--b3-theme-primary-lighter);
    --filetree-line-3: var(--b3-theme-primary-lighter);
    --filetree-line-4: var(--b3-theme-primary-lighter);
    --filetree-line-5: var(--b3-theme-primary-lighter);
    --filetree-line-6: var(--b3-theme-primary-lighter);
    --filetree-line-7: var(--b3-theme-primary-lighter);
    --filetree-line-8: var(--b3-theme-primary-lighter);
}

/* 大纲缩进线与主题色一致 */
.file-tree.sy__outline>.fn__flex-1>ul>ul { 
    --filetree-line-1: var(--b3-theme-primary-lighter) !important ;
}

.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-1) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-2) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-3) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-4) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-5) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-6) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-7) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-8) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-1) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-2) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-3) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-4) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-5) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-6) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-7) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-8) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-1) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-2) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-3) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-4) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-5) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-6) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-7) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-8) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-1) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-2) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-3) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-4) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-5) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-6) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-7) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-8) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-1) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-2) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-3) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-4) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-5) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-6) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-7) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-8) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-1) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-2) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-3) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-4) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-5) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-6) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-7) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-8) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-1) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-2) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-3) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-4) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-5) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-6) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-7) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-8) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
    `;
}

// 关闭文档树缩进功能
function disableIndentStyle() {
    const styleSheet = document.getElementById("indent-style");
    if (styleSheet) {
        styleSheet.innerText = '';
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
        styleSheet.innerText = '';
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
        .p:hover {
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

// 关闭聚焦块高亮
function enablecanclefocusblockremind() {
    let styleSheet = document.getElementById("canclefocusblockremind-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "canclefocusblockremind-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .p.highlight, .p.highlight:hover { box-shadow: none !important; transition: none !important; }
    `;
}

// 取消关闭聚焦块高亮
function disablecanclefocusblockremind() {
    const styleSheet = document.getElementById("canclefocusblockremind-style");
    if (styleSheet) {
        styleSheet.innerText = '';
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
    let styleSheet = document.getElementById("colorfulfiletree-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "colorfulfiletree-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
:root {
    --filetree-line-1: rgb(106, 156, 218);
    --filetree-line-2: rgb(239, 205, 151);
    --filetree-line-3: rgb(240, 198, 198);
    --filetree-line-4: rgb(154, 235, 162);
    --filetree-line-5: rgb(208, 139, 235);
    --filetree-line-6: rgb(139, 235, 219);
    --filetree-line-7: rgb(235, 139, 230);
    --filetree-line-8: rgb(180, 131, 110);
}
        .fn__flex-1.fn__flex-column.file-tree.sy__file ul.b3-list.b3-list--background { margin-left: 20px; }
        [data-type="navigation-root"]::before {
            content: "";
            width: 12px;
            height: 28px;
            position: absolute;
            left: -20px;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }
        .b3-list:nth-of-type(8n+1)>[data-type="navigation-root"]::before {
            background-color: #3575f0 !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+1) {
            border-left: 3px solid #3575f0;
        }
        .b3-list:nth-of-type(8n+1)>[data-type="navigation-root"] {
            background-color:rgb(184, 209, 255) !important;
        }
        .b3-list:nth-of-type(8n+2)>[data-type="navigation-root"]::before {
            background-color:var(--b3-theme-secondary) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+2) {
            border-left: 3px solid var(--b3-theme-secondary);
        }
        .b3-list:nth-of-type(8n+2)>[data-type="navigation-root"] {
            background-color: rgb(255, 224, 174) !important;
        }
        .b3-list:nth-of-type(8n+3)>[data-type="navigation-root"]::before {
            background-color:var(--b3-theme-error) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+3) {
            border-left: 3px solid var(--b3-theme-error);
        }
        .b3-list:nth-of-type(8n+3)>[data-type="navigation-root"] {
            background-color: rgb(255, 187, 180) !important;
        }
        .b3-list:nth-of-type(8n+4)>[data-type="navigation-root"]::before {
            background-color:var(--b3-theme-success) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+4) {
            border-left: 3px solid var(--b3-theme-success);
        }
        .b3-list:nth-of-type(8n+4)>[data-type="navigation-root"] {
            background-color: rgb(192, 234, 181) !important;
        }
        .b3-list:nth-of-type(8n+5)>[data-type="navigation-root"]::before {
            background-color:#9c4db8 !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+5) {
            border-left: 3px solid #9c4db8;
        }
        .b3-list:nth-of-type(8n+5)>[data-type="navigation-root"] {
            background-color: rgb(239, 195, 255) !important;
        }
        .b3-list:nth-of-type(8n+6)>[data-type="navigation-root"]::before {
            background-color:#00dacf !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+6) {
            border-left: 3px solid #00dacf;
        }
        .b3-list:nth-of-type(8n+6)>[data-type="navigation-root"] {
            background-color: rgb(170, 235, 232) !important;
        }
        .b3-list:nth-of-type(8n+7)>[data-type="navigation-root"]::before {
            background-color:rgb(230, 0, 123) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+7) {
            border-left: 3px solid rgb(230, 0, 123);
        }
        .b3-list:nth-of-type(8n+7)>[data-type="navigation-root"] {
            background-color: rgb(255, 186, 223) !important;
        }
        .b3-list:nth-of-type(8n)>[data-type="navigation-root"]::before {
            background-color:rgb(177, 80, 0) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n) {
            border-left: 3px solid rgb(177, 80, 0);
        }
        .b3-list:nth-of-type(8n)>[data-type="navigation-root"] {
            background-color:rgb(230, 184, 147) !important;
        }
    `;
}

// 关闭多彩文档树功能
function disablecolorfulfiletree() {
    const styleSheet = document.getElementById("colorfulfiletree-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 关闭主题动画
function enablecancleQYLanimation() {
    let styleSheet = document.getElementById("QYLanimation-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLanimation-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        /* 动画效果 */
        :root {
            --b3-transition: all .2s cubic-bezier(0, 0, .2, 1) 0ms;
            --b3-width-transition: width .2s cubic-bezier(0, 0, .2, 1) 0ms;
            --b3-color-transition: color .2s cubic-bezier(0, 0, .2, 1) 0ms;
            --b3-background-transition: background 20ms ease-in 0s;
        }
        @keyframes QYLpopout {}
        @keyframes QYLpopout2 {}
        @keyframes QYLpopout3 {}
        @keyframes QYLbounceRight {}
        @keyframes QYLbounceRight2 {}
    `;
}

// 取消关闭主题动画
function disablecancleQYLanimation() {
    const styleSheet = document.getElementById("QYLanimation-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启毛玻璃效果
function enableQYLAero() {
    let styleSheet = document.getElementById("QYLAero-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLAero-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            --QYL-Aero-filter: blur(20px);
            --QYL-filter-background: var(--QYL-filter-background-theme);
            --QYL-filter-wrap-background: var(--QYL-filter-wrap-background-theme);
            --QYL-filter-fix-background: var(--QYL-filter-fix-background-theme);
            --QYL-filter-background-forQsettings: var(--QYL-filter-background);
        }
        /* 菜单毛玻璃 */
        .b3-menu, .b3-menu__item--show>.b3-menu__submenu {
            animation: none;
        }
        .b3-menu, .b3-menu__submenu {
            background-color: var(--QYL-filter-background);
            border: none;
        }
        .b3-menu__item, .b3-menu__items, .b3-menu__items *:not(.b3-switch, .b3-list-item--focus) {
            background-color: rgba(255, 0, 0, 0);
        }
        .b3-menu::before, .b3-menu__submenu::before {
            border-radius: var(--b3-border-radius);
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            backdrop-filter: var(--QYL-Aero-filter);
            z-index: -5;
        }
        /* b3窗口毛玻璃 */
        .b3-dialog__container {
            background-color: var(--QYL-filter-background);
            border: none;
        }
        .b3-dialog__container .config__tab-wrap {
            background-color: var(--QYL-filter-wrap-background);
        }
        .b3-dialog__container::before {
            border-radius: var(--b3-border-radius);
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            backdrop-filter: var(--QYL-Aero-filter);
            z-index: -5;
        }
        .config__tab-container .b3-label:not(.b3-label--inner) {
            box-shadow: none;
        }
        .b3-text-field:not(#searchInput, .b3-form__icon-input), .pcr-app .pcr-interaction .pcr-result, .b3-select {
            background-color: var(--QYL-filter-background) !important;
            backdrop-filter: var(--QYL-Aero-filter);
        }
        /* 命令面板毛玻璃 */
        div[data-key="dialog-commandpanel"] .b3-list.b3-list--background.search__list {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-commandpanel"] .b3-dialog__body .fn__flex-column .b3-form__icon.search__header {
            background-color: var(--QYL-filter-wrap-background);
        }
        div[data-key="dialog-commandpanel"] .b3-dialog__body .fn__flex-column .b3-form__icon.search__header .b3-text-field.b3-text-field--text {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        /* 搜索面板毛玻璃 */
        div[data-key="dialog-globalsearch"] .b3-dialog__body .b3-form__icon.search__header {
            background-color: var(--QYL-filter-wrap-background);
        }
        div[data-key="dialog-globalsearch"] .b3-form__icon.search__header .b3-text-field.b3-text-field--text {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        div[data-key="dialog-globalsearch"] .search__header[id="criteria"] {
            background-color: var(--QYL-filter-wrap-background);
        }
        div[data-key="dialog-globalsearch"] .search__list {
            background-color: var(--QYL-filter-wrap-background);
        }
        div[data-key="dialog-globalsearch"] .search__preview {
            background-color: var(--QYL-filter-wrap-background);
        }
        div[data-key="dialog-globalsearch"] .search__preview .protyle-breadcrumb {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-globalsearch"] .block__icons[style="overflow: auto"] {
            background-color: rgba(255, 0, 0, 0);
        }
        #searchPreview.search__preview.protyle.fullscreen {
            backdrop-filter: var(--QYL-Aero-filter);
        }
        /* 集市毛玻璃 */
        .config-bazaar__readme--show {
            background-color: var(--QYL-filter-background);
            backdrop-filter: var(--QYL-Aero-filter);
        }
        /* 闪卡毛玻璃 */
        div[data-key="dialog-opencard"] .b3-dialog__scrim {
            background-color: var(--QYL-filter-background) !important;
            backdrop-filter: var(--QYL-Aero-filter);
        }
        div[data-key="dialog-opencard"] .card__main {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-opencard"] .card__main .protyle, div[data-key="dialog-opencard"] .card__main .protyle .protyle-breadcrumb {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-viewcards"] #cardPreview, div[data-key="dialog-viewcards"] #cardPreview .protyle-breadcrumb {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-viewcards"] .block__icons .counter {
            background-color: var(--QYL-filter-background);
        }
        div[data-key="dialog-viewcards"] .fn__flex-1.card__empty {
            background-color: rgba(255, 0, 0, 0);
        }
        .card__block.fn__flex-1.protyle.card__block--hidesb.card__block--hidemark.fullscreen {
            backdrop-filter: var(--QYL-Aero-filter);
        }
        #cardPreview.fullscreen :is(.protyle-content, .protyle-breadcrumb) {
            backdrop-filter: var(--QYL-Aero-filter);
        }
        /* 文档树等取消钉住毛玻璃 */
        .layout--float .layout-tab-container {
            background-color: var(--QYL-filter-background) !important;
            backdrop-filter: var(--QYL-Aero-filter);
            box-shadow: var(--b3-dialog-shadow);
        }
        .layout--float .fn__flex-1 {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .layout--float .block__icons {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        /* 编辑器工具栏毛玻璃 */
        .protyle-toolbar, .protyle-util, .protyle-hint, .protyle-util .block__icons {
            background-color: var(--QYL-filter-background) !important;
            backdrop-filter: var(--QYL-Aero-filter);
            border: none;
        }
        /* 底部状态栏毛玻璃 */
        @media (min-width: 768px) {
            #status {
                background-color: var(--QYL-filter-background);
                backdrop-filter: var(--QYL-Aero-filter);
                border: none;
            }
        }
        /* 斜杠菜单毛玻璃 */
        .protyle-hint.hint--menu {
            background-color: var(--QYL-filter-background);
            backdrop-filter: var(--QYL-Aero-filter);
            border: none;
        }
        /* 行内备注输入框毛玻璃 */
        .block__icons.block__icons--menu.fn__flex {
            background-color: var(--QYL-filter-background);
            backdrop-filter: var(--QYL-Aero-filter);
        }
        /* 修复自定义属性面板毛玻璃 */
        div[data-key="dialog-attr"] .layout-tab-bar {
            background-color: rgba(255, 0, 0, 0);
        }
        /* 修复集市毛玻璃 */
        div[data-key="dialog-setting"] [data-name="bazaar"] .layout-tab-bar {
            background-color: rgba(255, 0, 0, 0);
        }
        /* 修复AI毛玻璃 */
        div[data-key="dialog-setting"] [data-name="AI"] .layout-tab-bar {
            background-color: rgba(255, 0, 0, 0);
        }
        /* 修复代码片段毛玻璃 */
        [data-key="dialog-snippets"] .layout-tab-bar {
            background-color: rgba(255, 0, 0, 0);
        }
        /* 修复资源毛玻璃 */
        div[data-key="dialog-setting"] [data-name="image"] .layout-tab-bar {
            background-color: rgba(255, 0, 0, 0);
        }
        /* 提示气泡毛玻璃 */
        #tooltip {
            background-color: var(--QYL-filter-background);
            backdrop-filter: var(--QYL-Aero-filter);
            color: var(--b3-theme-on-background);
            box-shadow: var(--b3-light-shadow);
        }
        .b3-tooltips::before {
            display: none !important;
        }
        .b3-tooltips::after {
            background-color: var(--QYL-filter-background);
            backdrop-filter: var(--QYL-Aero-filter);
            color: var(--b3-theme-on-background);
            box-shadow: var(--b3-light-shadow);
        }
        .protyle-toolbar .b3-tooltips::after {
            background-color: var(--QYL-filter-fix-background) !important;
        }
        /* 右上角消息框毛玻璃 */
        .b3-snackbar__content {
            background-color: var(--QYL-filter-background);
            backdrop-filter: var(--QYL-Aero-filter);
            color: var(--b3-theme-on-background)
        }
        /* 块引用预览毛玻璃 */
        .block__popover.block__popover--open {
            background-color: var(--QYL-filter-background);
            backdrop-filter: var(--QYL-Aero-filter);
        }
        .block__popover.block__popover--open .block__icons {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .block__popover.block__popover--open .block__edit.fn__flex-1.protyle, .block__popover.block__popover--open .block__edit.fn__flex-1.protyle .protyle-breadcrumb {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        /* 修复PDF菜单毛玻璃 */
        #secondaryToolbar button:hover {
            background-color: var(--QYL-hover);
        }
    `;
}

// 关闭毛玻璃效果
function disableQYLAreo() {
    const styleSheet = document.getElementById("QYLAero-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 关闭多彩标签和多彩行级代码
function enablecancleQYLcolorfultag() {
    let styleSheet = document.getElementById("QYLcolorfultag-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLcolorfultag-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n)) {
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: var(--b3-theme-primary);
            background-color: var(--b3-theme-primary-lightest);
            transition: var(--b3-transition);
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n))::before {
            content: "#";
            color: var(--b3-theme-primary);
            margin-right: 5px;
            position: relative;
            top: 0.5px;
            transition: var(--b3-transition);
        }
        :is(.fn__code, .b3-typography code, .b3-typography span[data-type~=code], .protyle-wysiwyg code, .protyle-wysiwyg span[data-type~=code]):is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n)) {
            color: var(--b3-theme-primary);
        }
    `;
}

// 关闭多彩标签和多彩行级代码
function disablecancleQYLcolorfultag() {
    const styleSheet = document.getElementById("QYLcolorfultag-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启夕阳配色
function enableQYLsunset() {
    let styleSheet = document.getElementById("QYLsunset-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLsunset-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            --QYL-hover: rgba(255, 166, 111, 0.4); /* 主要悬停色 */
            --QYL-hover-hover: rgba(255, 166, 111, 0.5);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(255, 166, 111, 0.1);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: rgb(240, 140, 58) !important; 
            --b3-theme-primary-light: rgba(240, 140, 58, 0.5); /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(240, 140, 58, 0.3); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(240, 140, 58, 0.1); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgb(139, 235, 144);/* 标记色 */
            --b3-theme-surface: rgb(255, 239, 215);
            --b3-theme-surface-light: rgba(255, 197, 142, 0.8); /* 面板色0.8透明度 */
            --b3-theme-surface-lighter: rgb(255, 219, 186);
            --b3-theme-background: #fff5e8;
            --b3-theme-background-light:rgb(255, 224, 184); /* 编辑器较多加深（不透明） */
            --b3-toolbar-blur-background: #fff2e8; /* 失焦颜色 */
            --b3-scroll-color: rgb(243, 210, 182); /* 滚动条颜色 */
            --b3-menu-background: var(--b3-theme-background);
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
        }
        :root {
            --QYL-tab-nonactive: var(--QYL-hover-light); /* 非当前页签背景色 */
            --QYL-tab-nonactive-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-active: var(--QYL-hover); /* 当前页签背景色 */
            --QYL-tab-active-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-close-background: rgba(255, 0, 0, 0); /* 页签关闭按钮背景色 */
            --QYL-tab-close-color: rgba(255, 0, 0, 0); /* 页签关闭按钮颜色 */
            --QYL-tab-close-background-hover: rgba(255, 0, 0, 0); /* 页签关闭按钮悬停背景色(悬停在页签上） */
            --QYL-tab-close-color-hover: var(--b3-theme-on-background); /* 页签关闭按钮悬停颜色(悬停在页签上） */
            --QYL-tab-close-background-hover-close: var(--b3-theme-primary); /* 页签关闭按钮悬停背景色(悬停在关闭按钮上） */
            --QYL-tab-close-color-hover-close: var(--QYL-white); /* 页签关闭按钮悬停颜色(悬停在关闭按钮上） */
        }
        :root {
            --QYL-blockquote: rgb(179, 111, 75);
            --QYL-blockquote-background: rgb(255, 234, 210);
            --QYL-blockquote-svg: rgb(239, 212, 182);
            --QYL-task-block: var(--b3-theme-primary);
            --QYL-task-done: rgb(167, 167, 167);
            --QYL-coloful-block-red: rgb(210, 11, 11);
            --QYL-coloful-block-red-background: rgb(255, 219, 219);
            --QYL-coloful-block-orange: rgb(225, 155, 24);
            --QYL-coloful-block-orange-background: rgb(255, 239, 210);
            --QYL-coloful-block-green: rgb(10, 162, 23);
            --QYL-coloful-block-green-background: rgb(208, 242, 209);
            --QYL-coloful-block-blue: rgb(14, 106, 180);
            --QYL-coloful-block-blue-background: rgb(212, 236, 255);
            --QYL-coloful-block-purple: rgb(114, 14, 180);
            --QYL-coloful-block-purple-background: rgb(238, 212, 255);
            --QYL-coloful-block-pink: rgb(212, 80, 153);
            --QYL-coloful-block-pink-background: rgb(255, 226, 242);
        }
        :root {
            --QYL-switch-close: var(--QYL-white);
            --QYL-switch-close-background: rgb(255, 216, 186);
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(237, 111, 0);
        }
        :root {
            --QYL-filter-background-theme: rgba(255, 242, 224, 0.5);
            --QYL-filter-wrap-background-theme: rgba(255, 242, 224, 0.6);
            --QYL-filter-fix-background-theme: rgba(255, 242, 224, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to top, #ffe5ab, #ffe8ad, #ffebb0, #ffedb2, #fff0b5, #fff1b9, #fff1be, #fff2c2, #fff1ca, #fff0d2, #fff0da, #fff0e2);
            --QYL-account-background2: linear-gradient(to top, #ffe5ab, #ffe8ad, #ffebb0, #ffedb2, #fff0b5, #fff1b9, #fff1be, #fff2c2, #fff1ca, #fff0d2, #fff0da, #fff0e2);
        }
    `;
}

// 关闭夕阳配色
function disableQYLsunset() {
    const styleSheet = document.getElementById("QYLsunset-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启森林配色
function enableQYLforest() {
    let styleSheet = document.getElementById("QYLforest-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLforest-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            --QYL-hover: rgba(120, 219, 111, 0.4); /* 主要悬停色 */
            --QYL-hover-hover: rgba(120, 219, 111, 0.5);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(120, 219, 111, 0.1);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: rgb(85, 183, 95)  !important; 
            --b3-theme-primary-light: rgba(85, 183, 95, 0.5); /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(85, 183, 95, 0.3); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(85, 183, 95, 0.1); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgb(139, 235, 144);/* 标记色 */
            --b3-theme-surface: rgb(207, 233, 196);
            --b3-theme-surface-light: rgba(207, 233, 196, 0.8); /* 面板色0.8透明度 */
            --b3-theme-surface-lighter: rgb(193, 228, 149);
            --b3-theme-background: #e8f5e3;
            --b3-theme-background-light:rgb(204, 241, 190); /* 编辑器较多加深（不透明） */
            --b3-toolbar-blur-background: rgb(222, 236, 216); /* 失焦颜色 */
            --b3-scroll-color: rgb(168, 209, 158); /* 滚动条颜色 */
            --b3-menu-background: var(--b3-theme-background);
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
        }
        :root {
            --QYL-tab-nonactive: var(--QYL-hover-light); /* 非当前页签背景色 */
            --QYL-tab-nonactive-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-active: var(--QYL-hover); /* 当前页签背景色 */
            --QYL-tab-active-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-close-background: rgba(255, 0, 0, 0); /* 页签关闭按钮背景色 */
            --QYL-tab-close-color: rgba(255, 0, 0, 0); /* 页签关闭按钮颜色 */
            --QYL-tab-close-background-hover: rgba(255, 0, 0, 0); /* 页签关闭按钮悬停背景色(悬停在页签上） */
            --QYL-tab-close-color-hover: var(--b3-theme-on-background); /* 页签关闭按钮悬停颜色(悬停在页签上） */
            --QYL-tab-close-background-hover-close: var(--b3-theme-primary); /* 页签关闭按钮悬停背景色(悬停在关闭按钮上） */
            --QYL-tab-close-color-hover-close: var(--QYL-white); /* 页签关闭按钮悬停颜色(悬停在关闭按钮上） */
        }
        :root {
            --QYL-blockquote: rgb(113, 178, 104);
            --QYL-blockquote-background: rgb(203, 240, 200);
            --QYL-blockquote-svg: rgb(175, 228, 172);
            --QYL-task-block: var(--b3-theme-primary);
            --QYL-task-done: rgb(167, 167, 167);
            --QYL-coloful-block-red: rgb(210, 11, 11);
            --QYL-coloful-block-red-background: rgb(255, 219, 219);
            --QYL-coloful-block-orange: rgb(225, 155, 24);
            --QYL-coloful-block-orange-background: rgb(255, 239, 210);
            --QYL-coloful-block-green: rgb(10, 162, 23);
            --QYL-coloful-block-green-background: rgb(208, 242, 209);
            --QYL-coloful-block-blue: rgb(14, 106, 180);
            --QYL-coloful-block-blue-background: rgb(212, 236, 255);
            --QYL-coloful-block-purple: rgb(114, 14, 180);
            --QYL-coloful-block-purple-background: rgb(238, 212, 255);
            --QYL-coloful-block-pink: rgb(212, 80, 153);
            --QYL-coloful-block-pink-background: rgb(255, 226, 242);
        }
        :root {
            --QYL-switch-close: var(--QYL-white);
            --QYL-switch-close-background: rgb(180, 218, 171);
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(69, 179, 57);
        }
        :root {
            --QYL-filter-background-theme: rgba(216, 235, 208, 0.5);
            --QYL-filter-wrap-background-theme: rgba(216, 235, 208, 0.6);
            --QYL-filter-fix-background-theme: rgba(216, 235, 208, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to top, #bae3b9, #bbe3bc, #bce3bf, #bde2c2, #bfe2c5, #c2e3c9, #c5e5cc, #c8e6d0, #cdead5, #d2eedb, #d7f1e0, #dcf5e5);
            --QYL-account-background2: linear-gradient(to top, #bae3b9, #bbe3bc, #bce3bf, #bde2c2, #bfe2c5, #c2e3c9, #c5e5cc, #c8e6d0, #cdead5, #d2eedb, #d7f1e0, #dcf5e5);
        }
    `;
}

// 关闭森林配色
function disableQYLforest() {
    const styleSheet = document.getElementById("QYLforest-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启海洋配色
function enableQYLocean() {
    let styleSheet = document.getElementById("QYLocean-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLocean-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            --QYL-hover: rgba(147, 195, 244, 0.5); /* 主要悬停色 */
            --QYL-hover-hover: rgba(147, 195, 244, 0.4);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(147, 195, 244, 0.1);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: rgb(115, 171, 224)  !important; 
            --b3-theme-primary-light: rgba(115, 171, 224, 0.6); /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(115, 171, 224, 0.4); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(115, 171, 224, 0.2); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgb(139, 235, 144);/* 标记色 */
            --b3-theme-surface: rgb(204, 224, 243);
            --b3-theme-surface-light: rgba(204, 224, 243, 0.8); /* 面板色0.8透明度 */
            --b3-theme-surface-lighter: rgb(195, 221, 230);
            --b3-theme-background: #e2f0ff;
            --b3-theme-background-light:rgb(198, 223, 249); /* 编辑器较多加深（不透明） */
            --b3-toolbar-blur-background: #edf6ff; /* 失焦颜色 */
            --b3-scroll-color: rgb(195, 214, 245); /* 滚动条颜色 */
            --b3-menu-background: var(--b3-theme-background);
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
        }
        :root {
            --QYL-tab-nonactive: var(--QYL-hover-light); /* 非当前页签背景色 */
            --QYL-tab-nonactive-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-active: var(--QYL-hover); /* 当前页签背景色 */
            --QYL-tab-active-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-close-background: rgba(255, 0, 0, 0); /* 页签关闭按钮背景色 */
            --QYL-tab-close-color: rgba(255, 0, 0, 0); /* 页签关闭按钮颜色 */
            --QYL-tab-close-background-hover: rgba(255, 0, 0, 0); /* 页签关闭按钮悬停背景色(悬停在页签上） */
            --QYL-tab-close-color-hover: var(--b3-theme-on-background); /* 页签关闭按钮悬停颜色(悬停在页签上） */
            --QYL-tab-close-background-hover-close: var(--b3-theme-primary); /* 页签关闭按钮悬停背景色(悬停在关闭按钮上） */
            --QYL-tab-close-color-hover-close: var(--QYL-white); /* 页签关闭按钮悬停颜色(悬停在关闭按钮上） */
        }
        :root {
            --QYL-blockquote: rgb(92, 146, 207);
            --QYL-blockquote-background: rgb(207, 233, 255);
            --QYL-blockquote-svg: rgb(174, 213, 247);
            --QYL-task-block: var(--b3-theme-primary);
            --QYL-task-done: rgb(167, 167, 167);
            --QYL-coloful-block-red: rgb(210, 11, 11);
            --QYL-coloful-block-red-background: rgb(255, 219, 219);
            --QYL-coloful-block-orange: rgb(225, 155, 24);
            --QYL-coloful-block-orange-background: rgb(255, 239, 210);
            --QYL-coloful-block-green: rgb(10, 162, 23);
            --QYL-coloful-block-green-background: rgb(208, 242, 209);
            --QYL-coloful-block-blue: rgb(14, 106, 180);
            --QYL-coloful-block-blue-background: rgb(212, 236, 255);
            --QYL-coloful-block-purple: rgb(114, 14, 180);
            --QYL-coloful-block-purple-background: rgb(238, 212, 255);
            --QYL-coloful-block-pink: rgb(212, 80, 153);
            --QYL-coloful-block-pink-background: rgb(255, 226, 242);
        }
        :root {
            --QYL-switch-close: var(--QYL-white);
            --QYL-switch-close-background: rgb(177, 198, 220);
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(58, 114, 160);
        }
        :root {
            --QYL-filter-background-theme: rgba(211, 231, 247, 0.5);
            --QYL-filter-wrap-background-theme: rgba(226, 243, 255, 0.6);
            --QYL-filter-fix-background-theme: rgba(206, 225, 241, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to top, #a4d5ee, #a9d6ee, #aed7ee, #b3d8ed, #b8d9ed, #bcdcee, #c1def0, #c5e1f1, #cbe6f4, #d0ebf8, #d6effb, #dcf4ff);
            --QYL-account-background2: linear-gradient(to top, #a4d5ee, #a9d6ee, #aed7ee, #b3d8ed, #b8d9ed, #bcdcee, #c1def0, #c5e1f1, #cbe6f4, #d0ebf8, #d6effb, #dcf4ff);
        }
    `;
}

// 关闭海洋配色
function disableQYLocean() {
    const styleSheet = document.getElementById("QYLocean-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启糖果配色
function enableQYLsugar() {
    let styleSheet = document.getElementById("QYLsugar-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLsugar-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            --QYL-hover: rgba(255, 182, 211, 0.5); /* 主要悬停色 */
            --QYL-hover-hover: rgba(255, 182, 211, 0.6);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(255, 182, 211, 0.2);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: rgb(244, 139, 181)  !important; 
            --b3-theme-primary-light: rgba(244, 139, 181, 0.6); /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(244, 139, 181, 0.4); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(244, 139, 181, 0.15); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgb(139, 235, 144);/* 标记色 */
            --b3-theme-surface: rgb(250, 227, 235);
            --b3-theme-surface-light: rgba(250, 227, 235, 0.8); /* 面板色0.8透明度 */
            --b3-theme-surface-lighter: rgb(250, 220, 230);
            --b3-theme-background: #fff3f9;
            --b3-theme-background-light:rgb(248, 210, 229); /* 编辑器较多加深（不透明） */
            --b3-toolbar-blur-background: rgb(255, 244, 250); /* 失焦颜色 */
            --b3-scroll-color: rgb(244, 210, 223); /* 滚动条颜色 */
            --b3-menu-background: var(--b3-theme-background);
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
        }
        :root {
            --QYL-tab-nonactive: var(--QYL-hover-light); /* 非当前页签背景色 */
            --QYL-tab-nonactive-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-active: var(--QYL-hover); /* 当前页签背景色 */
            --QYL-tab-active-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-close-background: rgba(255, 0, 0, 0); /* 页签关闭按钮背景色 */
            --QYL-tab-close-color: rgba(255, 0, 0, 0); /* 页签关闭按钮颜色 */
            --QYL-tab-close-background-hover: rgba(255, 0, 0, 0); /* 页签关闭按钮悬停背景色(悬停在页签上） */
            --QYL-tab-close-color-hover: var(--b3-theme-on-background); /* 页签关闭按钮悬停颜色(悬停在页签上） */
            --QYL-tab-close-background-hover-close: var(--b3-theme-primary); /* 页签关闭按钮悬停背景色(悬停在关闭按钮上） */
            --QYL-tab-close-color-hover-close: var(--QYL-white); /* 页签关闭按钮悬停颜色(悬停在关闭按钮上） */
        }
        :root {
            --QYL-blockquote: rgb(228, 154, 184);
            --QYL-blockquote-background: rgb(255, 230, 242);
            --QYL-blockquote-svg: rgb(248, 197, 221);
            --QYL-task-block: var(--b3-theme-primary);
            --QYL-task-done: rgb(167, 167, 167);
            --QYL-coloful-block-red: rgb(210, 11, 11);
            --QYL-coloful-block-red-background: rgb(255, 219, 219);
            --QYL-coloful-block-orange: rgb(225, 155, 24);
            --QYL-coloful-block-orange-background: rgb(255, 239, 210);
            --QYL-coloful-block-green: rgb(10, 162, 23);
            --QYL-coloful-block-green-background: rgb(208, 242, 209);
            --QYL-coloful-block-blue: rgb(14, 106, 180);
            --QYL-coloful-block-blue-background: rgb(212, 236, 255);
            --QYL-coloful-block-purple: rgb(114, 14, 180);
            --QYL-coloful-block-purple-background: rgb(238, 212, 255);
            --QYL-coloful-block-pink: rgb(212, 80, 153);
            --QYL-coloful-block-pink-background: rgb(255, 226, 242);
        }
        :root {
            --QYL-switch-close: var(--QYL-white);
            --QYL-switch-close-background: rgb(241, 205, 215);
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(214, 103, 145);
        }
        :root {
            --QYL-filter-background-theme: rgba(250, 227, 235, 0.5);
            --QYL-filter-wrap-background-theme: rgba(250, 227, 235, 0.6);
            --QYL-filter-fix-background-theme: rgba(250, 227, 235, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to top, #f6c0cf, #f7c4d3, #f8c9d6, #f8cdda, #f9d1dd, #fad4df, #fbd7e2, #fcdae4, #fddde6, #fee1e8, #fee4ea, #ffe8ec);
            --QYL-account-background2: linear-gradient(to top, #f6c0cf, #f7c4d3, #f8c9d6, #f8cdda, #f9d1dd, #fad4df, #fbd7e2, #fcdae4, #fddde6, #fee1e8, #fee4ea, #ffe8ec);
        }
    `;
}

// 关闭糖果配色
function disableQYLsugar() {
    const styleSheet = document.getElementById("QYLsugar-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启薰衣草配色
function enableQYLlavender() {
    let styleSheet = document.getElementById("QYLlavender-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLlavender-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            --QYL-hover: rgba(224, 186, 255, 0.5); /* 主要悬停色 */
            --QYL-hover-hover: rgba(224, 186, 255, 0.6);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(224, 186, 255, 0.2);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: rgb(211, 148, 236)  !important; 
            --b3-theme-primary-light: rgba(211, 148, 236, 0.56); /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(211, 148, 236, 0.3); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(211, 148, 236, 0.12); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgb(139, 235, 144);/* 标记色 */
            --b3-theme-surface: rgb(239, 228, 255);
            --b3-theme-surface-light: rgba(239, 228, 255, 0.8); /* 面板色0.8透明度 */
            --b3-theme-surface-lighter: rgba(201, 177, 241, 0.5);
            --b3-theme-background: #faf3ff;
            --b3-theme-background-light:rgb(229, 207, 245); /* 编辑器较多加深（不透明） */
            --b3-toolbar-blur-background: rgb(245, 239, 255); /* 失焦颜色 */
            --b3-scroll-color: rgb(230, 210, 244); /* 滚动条颜色 */
            --b3-menu-background: var(--b3-theme-background);
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
        }
        :root {
            --QYL-tab-nonactive: var(--QYL-hover-light); /* 非当前页签背景色 */
            --QYL-tab-nonactive-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-active: var(--QYL-hover); /* 当前页签背景色 */
            --QYL-tab-active-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-close-background: rgba(255, 0, 0, 0); /* 页签关闭按钮背景色 */
            --QYL-tab-close-color: rgba(255, 0, 0, 0); /* 页签关闭按钮颜色 */
            --QYL-tab-close-background-hover: rgba(255, 0, 0, 0); /* 页签关闭按钮悬停背景色(悬停在页签上） */
            --QYL-tab-close-color-hover: var(--b3-theme-on-background); /* 页签关闭按钮悬停颜色(悬停在页签上） */
            --QYL-tab-close-background-hover-close: var(--b3-theme-primary); /* 页签关闭按钮悬停背景色(悬停在关闭按钮上） */
            --QYL-tab-close-color-hover-close: var(--QYL-white); /* 页签关闭按钮悬停颜色(悬停在关闭按钮上） */
        }
        :root {
            --QYL-blockquote: rgb(193, 149, 221);
            --QYL-blockquote-background: rgb(245, 230, 255);
            --QYL-blockquote-svg: rgb(218, 191, 237);
            --QYL-task-block: var(--b3-theme-primary);
            --QYL-task-done: rgb(167, 167, 167);
            --QYL-coloful-block-red: rgb(210, 11, 11);
            --QYL-coloful-block-red-background: rgb(255, 219, 219);
            --QYL-coloful-block-orange: rgb(225, 155, 24);
            --QYL-coloful-block-orange-background: rgb(255, 239, 210);
            --QYL-coloful-block-green: rgb(10, 162, 23);
            --QYL-coloful-block-green-background: rgb(208, 242, 209);
            --QYL-coloful-block-blue: rgb(14, 106, 180);
            --QYL-coloful-block-blue-background: rgb(212, 236, 255);
            --QYL-coloful-block-purple: rgb(114, 14, 180);
            --QYL-coloful-block-purple-background: rgb(238, 212, 255);
            --QYL-coloful-block-pink: rgb(212, 80, 153);
            --QYL-coloful-block-pink-background: rgb(255, 226, 242);
        }
        :root {
            --QYL-switch-close: var(--QYL-white);
            --QYL-switch-close-background: rgb(222, 201, 237);
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(139, 75, 192);
        }
        :root {
            --QYL-filter-background-theme: rgba(239, 228, 255, 0.5);
            --QYL-filter-wrap-background-theme: rgba(239, 228, 255, 0.6);
            --QYL-filter-fix-background-theme: rgba(239, 228, 255, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to top, #f5d1f8, #f6d2f9, #f6d3f9, #f7d4fa, #f7d5fa, #f7d7fb, #f7d9fb, #f7dbfc, #f7defd, #f8e2fe, #f8e5fe, #f9e8ff);
            --QYL-account-background2: linear-gradient(to top, #f5d1f8, #f6d2f9, #f6d3f9, #f7d4fa, #f7d5fa, #f7d7fb, #f7d9fb, #f7dbfc, #f7defd, #f8e2fe, #f8e5fe, #f9e8ff);
        }
    `;
}

// 关闭糖果配色
function disableQYLlavender() {
    const styleSheet = document.getElementById("QYLlavender-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启云雾配色
function enableQYLfog() {
    let styleSheet = document.getElementById("QYLfog-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLfog-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            --QYL-hover: rgba(197, 197, 197, 0.6); /* 主要悬停色 */
            --QYL-hover-hover: rgba(197, 197, 197, 0.7);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(197, 197, 197, 0.2);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: rgb(66, 66, 66)  !important; 
            --b3-theme-primary-light: rgba(107, 107, 107, 0.5); /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(107, 107, 107, 0.3); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(107, 107, 107, 0.1); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgb(139, 235, 144);/* 标记色 */
            --b3-theme-surface: rgb(221, 221, 221);
            --b3-theme-surface-light: rgba(221, 221, 221, 0.8); /* 面板色0.8透明度 */
            --b3-theme-surface-lighter: rgba(200, 200, 200, 0.5);
            --b3-theme-background: #ebebeb;
            --b3-theme-background-light:rgb(212, 212, 212); /* 编辑器较多加深（不透明） */
            --b3-toolbar-blur-background: rgb(237, 237, 237); /* 失焦颜色 */
            --b3-scroll-color: rgb(223, 223, 223); /* 滚动条颜色 */
            --b3-menu-background: var(--b3-theme-background);
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
        }
        :root {
            --QYL-tab-nonactive: var(--QYL-hover-light); /* 非当前页签背景色 */
            --QYL-tab-nonactive-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-active: var(--QYL-hover); /* 当前页签背景色 */
            --QYL-tab-active-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-close-background: rgba(255, 0, 0, 0); /* 页签关闭按钮背景色 */
            --QYL-tab-close-color: rgba(255, 0, 0, 0); /* 页签关闭按钮颜色 */
            --QYL-tab-close-background-hover: rgba(255, 0, 0, 0); /* 页签关闭按钮悬停背景色(悬停在页签上） */
            --QYL-tab-close-color-hover: var(--b3-theme-on-background); /* 页签关闭按钮悬停颜色(悬停在页签上） */
            --QYL-tab-close-background-hover-close: var(--b3-theme-primary); /* 页签关闭按钮悬停背景色(悬停在关闭按钮上） */
            --QYL-tab-close-color-hover-close: var(--QYL-white); /* 页签关闭按钮悬停颜色(悬停在关闭按钮上） */
        }
        :root {
            --QYL-blockquote: rgb(124, 124, 124);
            --QYL-blockquote-background: rgb(219, 219, 219);
            --QYL-blockquote-svg: rgb(183, 183, 183);
            --QYL-task-block: var(--b3-theme-primary);
            --QYL-task-done: rgb(167, 167, 167);
            --QYL-coloful-block-red: rgb(210, 11, 11);
            --QYL-coloful-block-red-background: rgb(255, 219, 219);
            --QYL-coloful-block-orange: rgb(225, 155, 24);
            --QYL-coloful-block-orange-background: rgb(255, 239, 210);
            --QYL-coloful-block-green: rgb(10, 162, 23);
            --QYL-coloful-block-green-background: rgb(208, 242, 209);
            --QYL-coloful-block-blue: rgb(14, 106, 180);
            --QYL-coloful-block-blue-background: rgb(212, 236, 255);
            --QYL-coloful-block-purple: rgb(114, 14, 180);
            --QYL-coloful-block-purple-background: rgb(238, 212, 255);
            --QYL-coloful-block-pink: rgb(212, 80, 153);
            --QYL-coloful-block-pink-background: rgb(255, 226, 242);
        }
        :root {
            --QYL-switch-close: var(--QYL-white);
            --QYL-switch-close-background: rgb(208, 208, 208);
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(66, 66, 66);
        }
        :root {
            --QYL-filter-background-theme: rgba(232, 232, 232, 0.5);
            --QYL-filter-wrap-background-theme: rgba(221, 221, 221, 0.6);
            --QYL-filter-fix-background-theme: rgba(221, 221, 221, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to top, #c7c7c7, #cacaca, #cccccc, #cfcfcf, #d2d2d2, #d5d5d5, #d7d7d7, #dadada, #dddddd, #e0e0e0, #e3e3e3, #e6e6e6);
            --QYL-account-background2: linear-gradient(to top, #c7c7c7, #cacaca, #cccccc, #cfcfcf, #d2d2d2, #d5d5d5, #d7d7d7, #dadada, #dddddd, #e0e0e0, #e3e3e3, #e6e6e6);
        }
    `;
}

// 关闭云雾配色
function disableQYLfog() {
    const styleSheet = document.getElementById("QYLfog-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

//开启墨水屏模式
function enableQYLinkmode() {
    let styleSheet = document.getElementById("QYLinkmode-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLinkmode-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            --QYL-hover: rgba(183, 196, 255, 0.6); /* 主要悬停色 */
            --QYL-hover-hover: rgba(183, 196, 255, 0.8);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(183, 196, 255, 0.2);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: #000000;
            --b3-theme-primary-light: rgba(0, 0, 0, 0.54);
            --b3-theme-primary-lighter: rgba(0, 0, 0, 0.38);
            --b3-theme-primary-lightest: rgba(0, 0, 0, 0.12);
            --b3-protyle-inline-mark-background: rgb(139, 235, 144);/* 标记色 */
            --b3-border-color: var(--b3-theme-surface-lighter); /* 线条色 */
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
            --b3-scroll-color: var(--b3-theme-primary); /* 滚动条颜色 */
            --QYL-filter-background-forQsettings: var(--b3-theme-background);

            --b3-theme-background: rgb(255, 255, 255) !important;
            --b3-theme-background-light:rgb(255, 255, 255) !important; /* 编辑器较多变浅（不透明） */
            --b3-theme-surface: rgb(255, 255, 255) !important;
            --b3-theme-surface-light: rgb(255, 255, 255) !important;
            --b3-theme-surface-lighter: var(--b3-theme-primary) !important; /* 线条色 */

            /* 文字颜色 */
            --b3-theme-on-primary: #ffffff;
            --b3-theme-on-secondary: #ffffff;
            --b3-theme-on-background: #000000;
            --b3-theme-on-surface: #000000;
            --b3-theme-on-surface-light: #000000;
            --b3-theme-on-error: #ffffff;

            /* 圆角矩形 */
            --b3-border-radius: 8px;
            --b3-border-radius-b: 8px;
            --b3-border-radius-q: 8px;
            
            /* 动画效果 */
            --b3-transition: none;
            --b3-transition-slow: none;
            --b3-width-transition: width 0.2s ease-in-out;
            --b3-color-transition: none;
            --b3-background-transition: none;
        }
        /* 主界面 */
        [data-type="wnd"] .layout-tab-container.fn__flex-1 {
            border: 1.5px solid var(--b3-theme-primary);
        }
        /* 页签 */
        [data-type="wnd"] .fn__flex:not(.av__views) .fn__flex.layout-tab-bar {
            border: 1.5px solid var(--b3-theme-primary);
            border-right: none;
        }
        [data-type="wnd"] .fn__flex:not(.av__views) .layout-tab-bar--readonly {
            border: 1.5px solid var(--b3-theme-primary);
            border-left: none;
        }
        .layout-tab-bar .item--focus:not(.item--readonly) {
            height: 25px;
            background-color: var(--b3-theme-background) !important;
            border: 2px solid var(--b3-theme-primary);
        }
        .layout-tab-bar .item:not(.item--readonly, .item--focus) {
            height: 25px;
            background-color: var(--b3-theme-background) !important;
            border: 1.5px solid var(--QYL-gray);
        }
        /* 菜单 */
        .b3-menu, .b3-menu__submenu {
            border: 1.5px solid var(--b3-theme-primary);
        }
        /* 设置页 */
        div[data-key="dialog-setting"] .b3-dialog__container {
            border: 1.5px solid var(--b3-theme-primary);
        }
        div[data-key="dialog-setting"] .config__tab-wrap {
            border: 1.5px solid var(--b3-theme-primary);
        }
        .config__panel>.b3-tab-bar .config__tab-hr {
            background: var(--b3-theme-background);
        }
        .b3-text-field, .pcr-app .pcr-interaction .pcr-result, .b3-select {
            box-shadow:  none !important;
            border: 1.5px solid var(--b3-theme-primary);
        }
        [data-key="dialog-setting"] .b3-tab-bar li[data-name] {
            height: 30px;
            margin-bottom: 10px;
        }
        .config-bazaar__panel .b3-card {
            margin-top: 20px;
            background-color: var(--b3-theme-background);
            border: 1.5px solid var(--b3-theme-primary);
        }
        .config-bazaar__panel .b3-card:hover {
            background-color: rgba(255, 0, 0, 0);
        }
        .config-bazaar__readme .item__side {
            padding-top: 2px;
        }
        /* 按钮 */
        .b3-button--outline {
            border: 1.5px solid var(--b3-theme-primary) !important;
        }
        /* 提示气泡 */
        #tooltip {
            background-color: var(--b3-theme-background);
            border: 1.5px solid var(--b3-theme-primary);
            color: var(--b3-theme-primary)
        }
        .b3-tooltips::before {
            display: none !important;
        }
        .b3-tooltips::after {
            background-color: var(--b3-theme-background);
            border: 1.5px solid var(--b3-theme-primary);
            color: var(--b3-theme-primary)
        }
        .protyle-toolbar .b3-tooltips::after {
            background-color: var(--b3-theme-background);
        }
        /* 右上角消息框 */
        .b3-snackbar__content {
            margin-top: 10px;
            background-color: var(--b3-theme-background);
            border: 1.5px solid var(--b3-theme-primary);
            color: var(--b3-theme-primary)
        }
        /* 命令面板 */
        [data-key="dialog-commandpanel"] .b3-dialog__container {
            border: 1.5px solid var(--b3-theme-primary);
        }
        div[data-key="dialog-commandpanel"] .b3-dialog__body .fn__flex-column .b3-form__icon.search__header {
            border: 1.5px solid var(--b3-theme-primary) !important;
        }
        /* 搜索面板 */
        [data-key="dialog-globalsearch"] .b3-dialog__container {
            border: 1.5px solid var(--b3-theme-primary);
        }
        div[data-key="dialog-globalsearch"] .b3-form__icon.search__header .b3-text-field.b3-text-field--text {
            border: 1.5px solid var(--b3-theme-primary);
        }
        /* 闪卡 */
        [data-key="dialog-opencard"] .b3-dialog__container {
            border: 1.5px solid var(--b3-theme-primary);
        }
        [data-key="dialog-viewcards"] .b3-dialog__container {
            border: 1.5px solid var(--b3-theme-primary);
        }
        /* 数据历史 */
        [data-key="dialog-history"] .b3-dialog__container {
            border: 1.5px solid var(--b3-theme-primary);
        }
        /* 斜杠菜单 */
        .protyle-hint.hint--menu {
            border: 1.5px solid var(--b3-theme-primary);
        }
        /* 编辑器工具栏 */
        .protyle-toolbar {
            border: 1.5px solid var(--b3-theme-primary);
        }
        .protyle-toolbar__item:hover {
            outline: 1.5px solid var(--b3-theme-primary);
            background-color: rgba(255, 0, 0, 0);
        }
        /* 悬停 */
        .b3-list--background .b3-list-item:not(.b3-list-item--focus):not(.dragover):not(.dragover__current):not(.dragover__top):not(.dragover__bottom), .b3-list--background .b3-list-item--focus {
            border: 1.5px solid rgba(255, 0, 0, 0);
        }
        .b3-list--background .b3-list-item:hover:not(.b3-list-item--focus):not(.dragover):not(.dragover__current):not(.dragover__top):not(.dragover__bottom), .b3-list--background .b3-list-item--focus {
            border: 1.5px solid var(--b3-theme-primary);
            background-color: rgba(255, 0, 0, 0);
        }
        .b3-menu__item {
            border: 1.5px solid rgba(255, 0, 0, 0);
        }
        .b3-menu__item--current:not(.b3-menu__item--readonly) {
            border: 1.5px solid var(--b3-theme-primary);
        }
        .toolbar__item:not(.toolbar__item--win, .toolbar__item--close):hover {
            outline: 1.5px solid var(--b3-theme-primary);
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .block__icon:hover:not([disabled]):not(.ft__primary):not(.block__icon--warning), .block__icon--active {
            background-color: rgba(255, 0, 0, 0);
            outline: 1.5px solid var(--b3-theme-primary);
        }
        .b3-list-item__toggle--hl:hover, .b3-list-item__action:hover, .b3-list-item__icon:hover, .b3-menu__avemoji:hover {
            background-color: rgba(255, 0, 0, 0);
            outline: 1.5px solid var(--b3-theme-primary);
        }
        .protyle-breadcrumb__item {
            margin-left: 3px;
            margin-right: 3px;
        }
        .protyle-breadcrumb__item:hover, .protyle-breadcrumb__item--active {
            background-color: var(--b3-theme-background);
            outline: 1.5px solid var(--b3-theme-primary);
        }
        .b3-menu__item--selected {
            border: 1.5px solid var(--b3-theme-primary);
        }
        .secondaryToolbarButton {
            border: 1.5px solid rgba(255, 0, 0, 0);
        }
        .secondaryToolbarButton:hover {
            border: 1.5px solid var(--b3-theme-primary);
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .pdf__util .b3-menu__item {
            border: 1.5px solid rgba(255, 0, 0, 0);
        }
        .pdf__util .b3-menu__item:hover {
            border: 1.5px solid var(--b3-theme-primary);
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .b3-menu__item--current:not(.b3-menu__item--readonly) {
            border: 1.5px solid var(--b3-theme-primary);
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .layout--float .sy__backlink .block__icons+.fn__flex-1 li:not(.b3-list--empty), .layout__center .sy__backlink .block__icons+.fn__flex-1 li:not(.b3-list--empty), .layout__dockr .sy__backlink .block__icons+.fn__flex-1 li:not(.b3-list--empty) {
            border: 1.5px solid var(--b3-theme-primary) !important;
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .counter:hover {
            background-color: rgba(255, 0, 0, 0) !important;
            outline: 1.5px solid var(--b3-theme-primary);
        }
        .b3-list-item__toggle:hover {
            color: var(--b3-theme-primary);
            background-color: rgba(255, 0, 0, 0) !important;
            outline: none !important;
        }
        /* 底部状态栏 */
        #status {
            background-color: var(--b3-theme-background);
            border: 1.5px solid var(--b3-theme-primary);
        }
        /* QYL设置框 */
        #settings-window {
            border: 1.5px solid var(--b3-theme-primary) !important;
        }
        /* 杂项 */
        .protyle-attr--refcount:hover {
            color: var(--b3-theme-background);
        }
        /* 多彩文档树修复 */
        [data-type="navigation-root"]::before {
            height: 32px !important;
            left: -22px !important;
        }
        /* 排版元素 */
        .b3-typography kbd, .b3-typography span[data-type~=kbd], .protyle-wysiwyg kbd, .protyle-wysiwyg span[data-type~=kbd] {
            border: 1.5px solid var(--b3-theme-surface-lighter);
            box-shadow: inset 0 -2px 0 var(--b3-theme-surface-lighter);
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag] {
            border: 1.5px solid  !important;
            background-color: rgba(255, 0, 0, 0) !important;
        }
        :is(.fn__code, .b3-typography code, .b3-typography span[data-type~=code], .protyle-wysiwyg code, .protyle-wysiwyg span[data-type~=code]):is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n)) {
            background-color: rgba(255, 0, 0, 0);
            border: 1.5px solid  !important;
        }
        .protyle-wysiwyg blockquote::before, .protyle-wysiwyg .bq::before {
            background-color: var(--b3-theme-primary);
        }
        .protyle-wysiwyg blockquote, .protyle-wysiwyg .bq {
            background-color: rgba(255, 0, 0, 0);
            border: 1.5px solid;
            color: var(--b3-theme-primary);
        }
        .b3-typography .code-block, .protyle-wysiwyg .code-block {
            background-color: rgba(255, 0, 0, 0);
            border: 1.5px solid var(--b3-theme-primary);
        }
        .protyle-linenumber__rows>span::before {
            font-style: italic;
            color: var(--b3-theme-primary);
        }
    `;
}

// 关闭墨水屏模式
function disableQYLinkmode() {
    const styleSheet = document.getElementById("QYLinkmode-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启霜禾配色
function enableQYLshuanghe() {
    let styleSheet = document.getElementById("QYLshuanghe-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLshuanghe-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            --QYL-hover: rgba(127, 198, 186, 0.4); /* 主要悬停色 */
            --QYL-hover-hover: rgba(127, 198, 186, 0.5);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(127, 198, 186, 0.15);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: rgb(97, 190, 175) !important; 
            --b3-theme-primary-light: rgba(90, 187, 171, 0.5); /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(90, 187, 171, 0.3); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(90, 187, 171, 0.1); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgb(139, 235, 144);/* 标记色 */
            --b3-theme-surface: #DBEADD;
            --b3-theme-surface-light: rgba(219, 234, 221, 0.8); /* 面板色0.8透明度 */
            --b3-theme-surface-lighter: #e4ece5;
            --b3-theme-background: #F7F9ED;
            --b3-theme-background-light:#dadec7; /* 编辑器较多加深（不透明） */
            --b3-toolbar-blur-background: #eff8f0; /* 失焦颜色 */
            --b3-scroll-color: #e5e9d5; /* 滚动条颜色 */
            --b3-menu-background: var(--b3-theme-background);
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
        }
        :root {
            --QYL-tab-nonactive: var(--QYL-hover-light); /* 非当前页签背景色 */
            --QYL-tab-nonactive-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-active: var(--QYL-hover); /* 当前页签背景色 */
            --QYL-tab-active-hover: var(--QYL-hover); /* 当前页签悬停背景色 */
            --QYL-tab-close-background: rgba(255, 0, 0, 0); /* 页签关闭按钮背景色 */
            --QYL-tab-close-color: rgba(255, 0, 0, 0); /* 页签关闭按钮颜色 */
            --QYL-tab-close-background-hover: rgba(255, 0, 0, 0); /* 页签关闭按钮悬停背景色(悬停在页签上） */
            --QYL-tab-close-color-hover: var(--b3-theme-on-background); /* 页签关闭按钮悬停颜色(悬停在页签上） */
            --QYL-tab-close-background-hover-close: var(--b3-theme-primary); /* 页签关闭按钮悬停背景色(悬停在关闭按钮上） */
            --QYL-tab-close-color-hover-close: var(--QYL-white); /* 页签关闭按钮悬停颜色(悬停在关闭按钮上） */
        }
        :root {
            --QYL-blockquote: #939684;
            --QYL-blockquote-background: #eceee4;
            --QYL-blockquote-svg: #d5d8ca;
            --QYL-task-block: var(--b3-theme-primary);
            --QYL-task-done: rgb(167, 167, 167);
            --QYL-coloful-block-red: rgb(210, 11, 11);
            --QYL-coloful-block-red-background: rgb(255, 219, 219);
            --QYL-coloful-block-orange: rgb(225, 155, 24);
            --QYL-coloful-block-orange-background: rgb(255, 239, 210);
            --QYL-coloful-block-green: rgb(10, 162, 23);
            --QYL-coloful-block-green-background: rgb(208, 242, 209);
            --QYL-coloful-block-blue: rgb(14, 106, 180);
            --QYL-coloful-block-blue-background: rgb(212, 236, 255);
            --QYL-coloful-block-purple: rgb(114, 14, 180);
            --QYL-coloful-block-purple-background: rgb(238, 212, 255);
            --QYL-coloful-block-pink: rgb(212, 80, 153);
            --QYL-coloful-block-pink-background: rgb(255, 226, 242);
        }
        :root {
            --QYL-switch-close: var(--QYL-white);
            --QYL-switch-close-background: #b4cbb9;
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(41, 126, 112);
        }
        :root {
            --QYL-filter-background-theme: rgba(219, 234, 221, 0.5);
            --QYL-filter-wrap-background-theme: rgba(219, 234, 221, 0.6);
            --QYL-filter-fix-background-theme: rgba(219, 234, 221, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to bottom, #e7efe8, #e5eee6, #e3ede4, #e0ece2, #deebe0, #daeadd, #d7ead9, #d3e9d6, #cde8d0, #c6e7cb, #c0e6c5, #b9e5bf);
            --QYL-account-background2: linear-gradient(to bottom, #e7efe8, #e5eee6, #e3ede4, #e0ece2, #deebe0, #daeadd, #d7ead9, #d3e9d6, #cde8d0, #c6e7cb, #c0e6c5, #b9e5bf);
        }
    `;
}

// 关闭霜禾配色
function disableQYLshuanghe() {
    const styleSheet = document.getElementById("QYLshuanghe-style");
    if (styleSheet) {
        styleSheet.innerText = '';
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
            enablecanclefocusblockremind();
            isChecked8 = true;
        } else if (config?.isChecked8 === false) {
            disablecanclefocusblockremind();
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
            setTimeout(enablecancleQYLanimation, 3000);
            isChecked9 = true;
        } else if (config?.isChecked9 === false) {
            disablecancleQYLanimation();
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
            enablecancleQYLcolorfultag();
            isChecked11 = true;
        } else if (config?.isChecked11 === false) {
            disablecancleQYLcolorfultag();
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

    } catch (e) {
        console.error("加载配置失败:", e);
    }
}
loadAndCheckConfig();

