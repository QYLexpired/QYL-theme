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
    label9.textContent = ' 开启主题动画';
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
    checkbox12.id = 'QYLburgundy-checkbox';
    checkbox12.checked = isChecked12;

    const label12 = document.createElement('label');
    label12.htmlFor = 'QYLburgundy-checkbox';
    label12.textContent = ' 配色：勃艮第';
    label12.style.fontSize = '14px';
    label12.style.userSelect= 'none';

    const checkbox13 = document.createElement('input');
    checkbox13.type = 'checkbox';
    checkbox13.id = 'QYLxuanqing-checkbox';
    checkbox13.checked = isChecked13;

    const label13 = document.createElement('label');
    label13.htmlFor = 'QYLxuanqing-checkbox';
    label13.textContent = ' 配色：玄青';
    label13.style.fontSize = '14px';
    label13.style.userSelect= 'none';

    const checkbox14 = document.createElement('input');
    checkbox14.type = 'checkbox';
    checkbox14.id = 'QYLmocui-checkbox';
    checkbox14.checked = isChecked14;

    const label14 = document.createElement('label');
    label14.htmlFor = 'QYLmocui-checkbox';
    label14.textContent = ' 配色：墨翠';
    label14.style.fontSize = '14px';
    label14.style.userSelect= 'none';

    const checkbox15 = document.createElement('input');
    checkbox15.type = 'checkbox';
    checkbox15.id = 'QYLhuimu-checkbox';
    checkbox15.checked = isChecked15;

    const label15 = document.createElement('label');
    label15.htmlFor = 'QYLhuimu-checkbox';
    label15.textContent = ' 配色：灰幕';
    label15.style.fontSize = '14px';
    label15.style.userSelect= 'none';

    const checkbox16 = document.createElement('input');
    checkbox16.type = 'checkbox';
    checkbox16.id = 'QYLinkmode-checkbox';
    checkbox16.checked = isChecked16;

    const label16 = document.createElement('label');
    label16.htmlFor = 'QYLinkmode-checkbox';
    label16.textContent = ' 墨水屏模式';
    label16.style.fontSize = '14px';
    label16.style.userSelect= 'none';

    const checkbox17 = document.createElement('input');
    checkbox17.type = 'checkbox';
    checkbox17.id = 'QYLlchixia-checkbox';
    checkbox17.checked = isChecked17;

    const label17 = document.createElement('label');
    label17.htmlFor = 'QYLlchixia-checkbox';
    label17.textContent = ' 配色：赤霞';
    label17.style.fontSize = '14px';
    label17.style.userSelect= 'none';

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
    settingsWindow.appendChild(QYLfunctionpair16);
    settingsWindow.appendChild(QYLfunctionpair12);
    settingsWindow.appendChild(QYLfunctionpair13);
    settingsWindow.appendChild(QYLfunctionpair14);
    settingsWindow.appendChild(QYLfunctionpair15);
    settingsWindow.appendChild(QYLfunctionpair17);

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
        isChecked17: checkbox17.checked
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

// 勃艮第配色开关
checkbox12.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLburgundy() : disableQYLburgundy();
    state ? isChecked12 = true : isChecked12 = false;
    if (isChecked13 === true) { checkbox13.click(); }
    if (isChecked14 === true) { checkbox14.click(); }
    if (isChecked15 === true) { checkbox15.click(); }
    if (isChecked17 === true) { checkbox17.click(); }
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
            background: transparent !important; }
        .b3-typography mark, .b3-typography span[data-type~=mark], 
        .protyle-wysiwyg mark, .protyle-wysiwyg span[data-type~=mark] {
            color: transparent !important; 
            border-bottom: 1.5px solid rgba(60, 172, 78, 0.8);
            background-color: transparent !important;
            margin-left: 3px;
            margin-right: 3px;
            padding-bottom: 3px;
        }
        .b3-typography mark:hover, .b3-typography span[data-type~=mark]:hover, 
        .protyle-wysiwyg mark:hover, .protyle-wysiwyg span[data-type~=mark]:hover {
            color: inherit !important;
            border-bottom: 1.5px solid rgba(60, 172, 78, 0.8);
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
    --filetree-line-1: rgba(84, 115, 207, 0.5);
    --filetree-line-2: rgba(190, 139, 57, 0.5);
    --filetree-line-3: rgba(194, 75, 75, 0.5);
    --filetree-line-4: rgba(64, 185, 76, 0.5);
    --filetree-line-5: rgba(156, 76, 187, 0.5);
    --filetree-line-6: rgba(49, 147, 131, 0.5);
    --filetree-line-7: rgba(171, 64, 166, 0.5);
    --filetree-line-8: rgba(169, 96, 65, 0.5);
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
            background-color: #3573f0 !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+1) {
            border-left: 3px solid #3573f0;
        }
        .b3-list:nth-of-type(8n+1)>[data-type="navigation-root"] {
            background-color:rgba(53, 115, 240, 0.5) !important;
        }
        .b3-list:nth-of-type(8n+2)>[data-type="navigation-root"]::before {
            background-color:rgb(220, 172, 14) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+2) {
            border-left: 3px solid rgb(220, 172, 14);
        }
        .b3-list:nth-of-type(8n+2)>[data-type="navigation-root"] {
            background-color: rgba(220, 172, 14, 0.5) !important;
        }
        .b3-list:nth-of-type(8n+3)>[data-type="navigation-root"]::before {
            background-color:rgb(211, 70, 54) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+3) {
            border-left: 3px solid rgb(211, 70, 54);
        }
        .b3-list:nth-of-type(8n+3)>[data-type="navigation-root"] {
            background-color: rgba(211, 70, 54, 0.5) !important;
        }
        .b3-list:nth-of-type(8n+4)>[data-type="navigation-root"]::before {
            background-color:rgb(80, 159, 60) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+4) {
            border-left: 3px solid rgb(80, 159, 60);
        }
        .b3-list:nth-of-type(8n+4)>[data-type="navigation-root"] {
            background-color: rgba(80, 159, 60, 0.5) !important;
        }
        .b3-list:nth-of-type(8n+5)>[data-type="navigation-root"]::before {
            background-color:rgb(154, 75, 183) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+5) {
            border-left: 3px solid rgb(154, 75, 183);
        }
        .b3-list:nth-of-type(8n+5)>[data-type="navigation-root"] {
            background-color: rgba(157, 103, 177, 0.5)!important;
        }
        .b3-list:nth-of-type(8n+6)>[data-type="navigation-root"]::before {
            background-color:rgb(33, 152, 145) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+6) {
            border-left: 3px solid rgb(33, 152, 145);
        }
        .b3-list:nth-of-type(8n+6)>[data-type="navigation-root"] {
            background-color: rgba(33, 152, 144, 0.5) !important;
        }
        .b3-list:nth-of-type(8n+7)>[data-type="navigation-root"]::before {
            background-color:rgb(180, 42, 115) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+7) {
            border-left: 3px solid rgb(180, 42, 115);
        }
        .b3-list:nth-of-type(8n+7)>[data-type="navigation-root"] {
            background-color: rgba(180, 42, 116, 0.5) !important;
        }
        .b3-list:nth-of-type(8n)>[data-type="navigation-root"]::before {
            background-color:rgb(176, 95, 28) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n) {
            border-left: 3px solid rgb(176, 95, 28);
        }
        .b3-list:nth-of-type(8n)>[data-type="navigation-root"] {
            background-color:rgba(176, 95, 28, 0.5) !important;
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

// 开启主题动画
function enableQYLanimation() {
    let styleSheet = document.getElementById("QYLanimation-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLanimation-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        /* 弹出动画 */
        @keyframes QYLpopout {
            0%,10% {
                opacity: 0;
                transform: none
            }

            10% {
                transform: scale(0.9)
            }

            90%,100% {
                opacity: 1
            }

            100% {
                transform: none
            }
        }
        @keyframes QYLpopout2 {
            0%,10% {
                opacity: 1;
                transform: none
            }

            10% {
                transform: scale(0.9)
            }

            90%,100% {
                opacity: 1
            }

            100% {
                transform: none
            }
        }
        @keyframes QYLpopout3 {
            0%,10% {
                opacity: 1;
                transform: none
            }

            10% {
                transform: scale(0.85)
            }

            90%,100% {
                opacity: 1
            }

            100% {
                transform: none
            }
        }
        /* 右弹动画 */
        @keyframes QYLbounceRight {
            00% {
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
        @keyframes QYLbounceRight2 {
            0% {
                transform: translateX(-50%);
            }
            100% {
                transform: translateX(0);
            }
        }
        /* 斜杠菜单动画 */
        .protyle-hint.hint--menu .b3-list-item {
            animation: QYLbounceRight2 0.15s;
        }
        /* 编辑器工具栏动画 */
        .protyle-toolbar button, .protyle-hint .b3-list-item{
            animation: QYLbounceRight2 0.15s;
        }
        /* 任务列表动画 */
        .protyle-wysiwyg .li.protyle-task--done > .protyle-action--task::before, .av__cell-check::before {
            animation: QYLpopout 0.2s forwards;
        }
        /* 侧栏图标动画 */
        .block__logo {
            animation: QYLbounceRight 0.5s;
        }
        /* 集市卡片动画 */
        .config-bazaar__panel .b3-card {
            animation: QYLbounceRight2 0.2s;
        }
        .config-bazaar__panel .b3-card:hover {
            transform: scale(1.02);
        }
        .config__tab-wrap > div {
            animation: QYLbounceRight2 0.2s;
        }
        /* 自定义属性面板动画 */
        .b3-dialog__body .custom-attr {
            animation: QYLbounceRight2 0.2s;
        }
        /* 搜索面板动画 */
        :is(#searchList, #searchAssetList, #searchUnRefList) .b3-list-item {
            animation: QYLbounceRight2 0.2s;
        }
        /* 弹出文档动画 */
        body > div.block__popover.block__popover--open {
            animation: QYLpopout 0.2s;
        }
        /* 退出聚焦按钮动画 */
        .protyle-breadcrumb button[data-type="exit-focus"] {
            animation: QYLbounceRight 0.5s;
        }
        /* 文档标题动画 */
        .protyle-title__input {
            animation: QYLbounceRight2 0.2s;
            color: var(--b3-theme-primary);
        }
        /* 资源图片预览动画 */
        #preview > * {
            animation: QYLpopout2 0.2s;
        }
        #preview > * {
            border-radius: var(--b3-border-radius);
        }
        /* 菜单内动画 */
        .b3-menu .b3-menu__item {
            animation: QYLbounceRight2 0.1s;
        }
        #commonMenu .b3-list-item {
            animation: QYLbounceRight2 0.1s;
        }
        /* 闪卡动画 */
        [data-key="dialog-viewcards"] .fn__flex-1.b3-list div[data-type="card-item"] {
            animation: QYLbounceRight2 0.15s;
        }
        /* 同步面板动画 */
        [data-key="dialog-syncchoosedirection"] .b3-dialog__content .fn__flex.b3-label {
            animation: QYLbounceRight2 0.15s;
        }
        /* 命令面板动画 */
        [data-key="dialog-commandpanel"] .search__list .b3-list-item {
            animation: QYLbounceRight2 0.15s;
        }
        /* 数据历史动画 */
        [data-key="dialog-history"] :is(.history__side, [data-type="notebook"], [data-type="repo"] ) .b3-list-item {
            animation: QYLbounceRight2 0.15s;
        }
        /* 最近的文档动画 */
        [data-key="dialog-recentdocs"] .b3-list.b3-list--background .b3-list-item {
            animation: QYLbounceRight2 0.15s;
        }
    `;
}

// 关闭主题动画
function disableQYLanimation() {
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
            background-color: var(--QYL-filter-background);
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
            color: var(--QYL-white);
            background-color: var(--b3-theme-primary);
            transition: var(--b3-transition);
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n))::before {
            content: "#";
            color: var(--QYL-white);
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

// 开启勃艮第配色
function enableQYLburgundy() {
    let styleSheet = document.getElementById("QYLburgundy-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLburgundy-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            /* 主色 */
            --b3-theme-background: #201d1d;
            --b3-theme-background-light:rgb(62, 58, 58); /* 编辑器较多变浅（不透明） */
            --b3-theme-surface: #2c2525;
            --b3-theme-surface-light: rgba(41, 42, 45, 0.86);
            --b3-theme-surface-lighter: rgba(110, 91, 91, 0.5); /* 线条色 */

            /* 文字颜色 */
            --b3-theme-on-primary: #fff;
            --b3-theme-on-secondary: #fff;
            --b3-theme-on-background: #b5b5b5;
            --b3-theme-on-surface: #9aa0a6;
            --b3-theme-on-surface-light: #bababa;
            --b3-theme-on-error: #fff;

            /* 容器阴影 */
            --b3-point-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-dialog-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-button-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-light-shadow: var(--b3-theme-primary-lightest) 0px 1px 2px 0px, var(--b3-theme-primary-lightest) 0px 1px 3px 1px;
            --QYL-shadow-highlight: var(--b3-theme-primary-lighter) 0px 0px 8px;
        }
        :root {
            --QYL-hover: rgba(138, 63, 63, 0.6); /* 主要悬停色 */
            --QYL-hover-hover: rgba(138, 63, 63, 0.7);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(138, 63, 63, 0.1);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: #a34c4c; 
            --b3-theme-primary-light: rgba(163, 76, 76, 0.5); /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(163, 76, 76, 0.35); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(163, 76, 76, 0.12); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgba(81, 150, 92, 0.8);/* 标记色 */
            --b3-protyle-inline-mark-color: #dadada; /* 标记文字色 */
            --b3-border-color: var(--b3-theme-surface-lighter); /* 线条色 */
            --b3-scroll-color: rgb(57, 41, 41); /* 滚动条颜色 */
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
            --b3-toolbar-blur-background: #302b2b; /* 失焦颜色 */
            --QYL-filter-background-forQsettings: var(--b3-theme-background);

            /* 圆角矩形 */
            --b3-border-radius: 10px;
            --b3-border-radius-b: 10px;
            --b3-border-radius-q: 16px;
            
            /* 动画效果 */
            --b3-transition: 0.2s ease-in-out;
            --b3-transition-slow: 0.4s ease-in-out;
            --b3-width-transition: width 0.2s ease-in-out;
            --b3-color-transition: color 0.2s ease-in-out;
            --b3-background-transition: background 0.2s ease-in-out;

            /* PDF */
            --b3-pdf-selection: #94ff71;
            --sidebar-width: 200px;
            --b3-pdf-offset: 0;
            --b3-pdf-background1: #ffc3c3;
            --b3-pdf-background2: #ffcba5;
            --b3-pdf-background3: #ffda83;
            --b3-pdf-background4: #b1eda2;
            --b3-pdf-background5: #85efe6;
            --b3-pdf-background6: #a3d3ff;
            --b3-pdf-background7: #f3c5ff;
            --b3-pdf-dark: #292a2b;
        }
        :root {
            --QYL-blockquote: rgb(168, 145, 145);
            --QYL-blockquote-background: rgb(58, 47, 47);
            --QYL-blockquote-svg: rgb(114, 95, 95);
        }
        :root {
            --QYL-switch-close: var(--QYL-gray);
            --QYL-switch-close-background: rgb(93, 82, 82);
            --QYL-input-border: rgb(108, 79, 79);
            --QYL-input-border-hover: var(--b3-theme-primary);
            --b3-switch-checked-background: var(--b3-theme-primary);
            --b3-switch-checked: var(--QYL-gray);
        }
        :root {
            --QYL-filter-background-theme: rgba(22, 15, 15, 0.5);
            --QYL-filter-wrap-background-theme: rgba(43, 36, 36, 0.6);
            --QYL-filter-fix-background-theme: rgba(22, 15, 15, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to top, #300909, #2d070c, #2a060e, #270410, #240211, #240414, #240517, #240719, #280b1e, #2c0e23, #311028, #35132e);
            --QYL-account-background2: linear-gradient(to top, #300909, #2d070c, #2a060e, #270410, #240211, #240414, #240517, #240719, #280b1e, #2c0e23, #311028, #35132e);
        }
    `;
}

// 关闭勃艮第配色
function disableQYLburgundy() {
    const styleSheet = document.getElementById("QYLburgundy-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启玄青配色
function enableQYLxuanqing() {
    let styleSheet = document.getElementById("QYLxuanqing-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLxuanqing-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            /* 主色 */
            --b3-theme-background: rgb(29, 28, 37);
            --b3-theme-background-light:rgb(54, 53, 66); /* 编辑器较多变浅（不透明） */
            --b3-theme-surface: rgb(42, 41, 54);
            --b3-theme-surface-light: rgba(42, 41, 54, 0.86); 
            --b3-theme-surface-lighter: rgba(132, 129, 165, 0.5); /* 线条色 */

            /* 文字颜色 */
            --b3-theme-on-primary: #fff;
            --b3-theme-on-secondary: #fff;
            --b3-theme-on-background: #b5b5b5;
            --b3-theme-on-surface: #9aa0a6;
            --b3-theme-on-surface-light: #bababa;
            --b3-theme-on-error: #fff;

            /* 容器阴影 */
            --b3-point-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-dialog-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-button-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-light-shadow: var(--b3-theme-primary-lightest) 0px 1px 2px 0px, var(--b3-theme-primary-lightest) 0px 1px 3px 1px;
            --QYL-shadow-highlight: var(--b3-theme-primary-lighter) 0px 0px 8px;
        }
        :root {
            --QYL-hover: rgba(62, 67, 117, 0.65); /* 主要悬停色 */
            --QYL-hover-hover: rgba(62, 67, 117, 0.75);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(62, 67, 117, 0.15);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary:rgb(101, 96, 210); 
            --b3-theme-primary-light: rgba(87, 83, 173, 0.5); /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(87, 83, 173, 0.35); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(87, 83, 173, 0.12); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgba(81, 150, 92, 0.8);/* 标记色 */
            --b3-protyle-inline-mark-color: #dadada; /* 标记文字色 */
            --b3-border-color: var(--b3-theme-surface-lighter); /* 线条色 */
            --b3-scroll-color: rgb(50, 48, 65); /* 滚动条颜色 */
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
            --b3-toolbar-blur-background: rgb(37, 36, 42); /* 失焦颜色 */
            --QYL-filter-background-forQsettings: var(--b3-theme-background);

            /* 圆角矩形 */
            --b3-border-radius: 10px;
            --b3-border-radius-b: 10px;
            --b3-border-radius-q: 16px;
            
            /* 动画效果 */
            --b3-transition: 0.2s ease-in-out;
            --b3-transition-slow: 0.4s ease-in-out;
            --b3-width-transition: width 0.2s ease-in-out;
            --b3-color-transition: color 0.2s ease-in-out;
            --b3-background-transition: background 0.2s ease-in-out;

            /* PDF */
            --b3-pdf-selection: #94ff71;
            --sidebar-width: 200px;
            --b3-pdf-offset: 0;
            --b3-pdf-background1: #ffc3c3;
            --b3-pdf-background2: #ffcba5;
            --b3-pdf-background3: #ffda83;
            --b3-pdf-background4: #b1eda2;
            --b3-pdf-background5: #85efe6;
            --b3-pdf-background6: #a3d3ff;
            --b3-pdf-background7: #f3c5ff;
            --b3-pdf-dark: #292a2b;
        }
        :root {
            --QYL-blockquote: rgb(131, 127, 148);
            --QYL-blockquote-background: rgb(49, 47, 58);
            --QYL-blockquote-svg: rgb(84, 81, 100);
        }
        :root {
            --QYL-switch-close: var(--QYL-gray);
            --QYL-switch-close-background: rgb(66, 67, 95);
            --QYL-input-border: rgb(60, 57, 98);
            --QYL-input-border-hover: var(--b3-theme-primary);
            --b3-switch-checked-background: var(--b3-theme-primary);
            --b3-switch-checked: var(--QYL-gray);
        }
        :root {
            --QYL-filter-background-theme: rgba(34, 35, 44, 0.5);
            --QYL-filter-wrap-background-theme: rgba(45, 47, 53, 0.6);
            --QYL-filter-fix-background-theme: rgba(34, 35, 44, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to top, #151d32, #122033, #102233, #0f2433, #0f2632, #122833, #152934, #182b35, #1c2d37, #212e3a, #25303c, #29323e);
            --QYL-account-background2: linear-gradient(to top, #151d32, #122033, #102233, #0f2433, #0f2632, #122833, #152934, #182b35, #1c2d37, #212e3a, #25303c, #29323e);
        }
    `;
}

// 关闭玄青配色
function disableQYLxuanqing() {
    const styleSheet = document.getElementById("QYLxuanqing-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启墨翠配色
function enableQYLmocui() {
    let styleSheet = document.getElementById("QYLmocui-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLmocui-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            /* 主色 */
            --b3-theme-background: #282b27;
            --b3-theme-background-light:#393d38; /* 编辑器较多变浅（不透明） */
            --b3-theme-surface: #30342e;
            --b3-theme-surface-light: rgba(48, 52, 46, 0.86);
            --b3-theme-surface-lighter: rgba(64, 69, 61, 0.5);; /* 线条色 */

            /* 文字颜色 */
            --b3-theme-on-primary: #fff;
            --b3-theme-on-secondary: #fff;
            --b3-theme-on-background: #b5b5b5;
            --b3-theme-on-surface: #9aa0a6;
            --b3-theme-on-surface-light: #bababa;
            --b3-theme-on-error: #fff;

            /* 容器阴影 */
            --b3-point-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-dialog-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-button-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-light-shadow: var(--b3-theme-primary-lightest) 0px 1px 2px 0px, var(--b3-theme-primary-lightest) 0px 1px 3px 1px;
            --QYL-shadow-highlight: var(--b3-theme-primary-lighter) 0px 0px 8px;
        }
        :root {
            --QYL-hover: rgba(61, 99, 52, 0.6); /* 主要悬停色 */
            --QYL-hover-hover: rgba(61, 99, 52, 0.7);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(61, 99, 52, 0.1);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: #528450; 
            --b3-theme-primary-light: rgba(82, 132, 80, 0.514);; /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(82, 132, 80, 0.3); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(82, 132, 80, 0.12); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgba(81, 150, 92, 0.8);/* 标记色 */
            --b3-protyle-inline-mark-color: #dadada; /* 标记文字色 */
            --b3-border-color: var(--b3-theme-surface-lighter); /* 线条色 */
            --b3-scroll-color: rgb(57, 66, 57); /* 滚动条颜色 */
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
            --b3-toolbar-blur-background: #41463f; /* 失焦颜色 */
            --QYL-filter-background-forQsettings: var(--b3-theme-background);

            /* 圆角矩形 */
            --b3-border-radius: 10px;
            --b3-border-radius-b: 10px;
            --b3-border-radius-q: 16px;
            
            /* 动画效果 */
            --b3-transition: 0.2s ease-in-out;
            --b3-transition-slow: 0.4s ease-in-out;
            --b3-width-transition: width 0.2s ease-in-out;
            --b3-color-transition: color 0.2s ease-in-out;
            --b3-background-transition: background 0.2s ease-in-out;

            /* PDF */
            --b3-pdf-selection: #94ff71;
            --sidebar-width: 200px;
            --b3-pdf-offset: 0;
            --b3-pdf-background1: #ffc3c3;
            --b3-pdf-background2: #ffcba5;
            --b3-pdf-background3: #ffda83;
            --b3-pdf-background4: #b1eda2;
            --b3-pdf-background5: #85efe6;
            --b3-pdf-background6: #a3d3ff;
            --b3-pdf-background7: #f3c5ff;
            --b3-pdf-dark: #292a2b;
        }
        :root {
            --QYL-blockquote: rgb(118, 122, 118);
            --QYL-blockquote-background: rgb(49, 58, 49);
            --QYL-blockquote-svg: rgb(88, 94, 88);
        }
        :root {
            --QYL-switch-close: var(--QYL-gray);
            --QYL-switch-close-background: rgb(67, 75, 68);
            --QYL-input-border: rgb(79, 108, 83);
            --QYL-input-border-hover: var(--b3-theme-primary);
            --b3-switch-checked-background: var(--b3-theme-primary);
            --b3-switch-checked: var(--QYL-gray);
        }
        :root {
            --QYL-filter-background-theme: rgba(31, 38, 31, 0.5);
            --QYL-filter-wrap-background-theme: rgba(43, 49, 43, 0.6);
            --QYL-filter-fix-background-theme: rgba(31, 38, 31, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to top, #152013, #182415, #1b2817, #1e2d19, #22311b, #24331d, #26351f, #283721, #293723, #293726, #2a3628, #2b362a);
            --QYL-account-background2: linear-gradient(to top, #152013, #182415, #1b2817, #1e2d19, #22311b, #24331d, #26351f, #283721, #293723, #293726, #2a3628, #2b362a);
        }
    `;
}

// 关闭墨翠配色
function disableQYLmocui() {
    const styleSheet = document.getElementById("QYLmocui-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启灰幕配色
function enableQYLhuimu() {
    let styleSheet = document.getElementById("QYLhuimu-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLhuimu-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            /* 主色 */
            --b3-theme-background: #2f2f2f;
            --b3-theme-background-light:#444444; /* 编辑器较多变浅（不透明） */
            --b3-theme-surface: #383838;
            --b3-theme-surface-light: rgba(56, 56, 56, 0.86);
            --b3-theme-surface-lighter: rgba(92, 92, 92, 0.5); /* 线条色 */

            /* 文字颜色 */
            --b3-theme-on-primary: #fff;
            --b3-theme-on-secondary: #fff;
            --b3-theme-on-background: #b5b5b5;
            --b3-theme-on-surface: #9aa0a6;
            --b3-theme-on-surface-light: #bababa;
            --b3-theme-on-error: #fff;

            /* 容器阴影 */
            --b3-point-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-dialog-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-button-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-light-shadow: var(--b3-theme-primary-lightest) 0px 1px 2px 0px, var(--b3-theme-primary-lightest) 0px 1px 3px 1px;
            --QYL-shadow-highlight: var(--b3-theme-primary-lighter) 0px 0px 8px;
        }
        :root {
            --QYL-hover: rgba(121, 116, 86, 0.6); /* 主要悬停色 */
            --QYL-hover-hover: rgba(121, 116, 86, 0.8);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(121, 116, 86, 0.1);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: #877b5d; 
            --b3-theme-primary-light: rgba(135, 123, 93, 0.5); /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(135, 123, 93, 0.35); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(135, 123, 93, 0.1); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgba(81, 150, 92, 0.8);/* 标记色 */
            --b3-protyle-inline-mark-color: #dadada; /* 标记文字色 */
            --b3-border-color: var(--b3-theme-surface-lighter); /* 线条色 */
            --b3-scroll-color: rgb(90, 85, 79); /* 滚动条颜色 */
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
            --b3-toolbar-blur-background: #4e4e4e; /* 失焦颜色 */
            --QYL-filter-background-forQsettings: var(--b3-theme-background);

            /* 圆角矩形 */
            --b3-border-radius: 10px;
            --b3-border-radius-b: 10px;
            --b3-border-radius-q: 16px;
            
            /* 动画效果 */
            --b3-transition: 0.2s ease-in-out;
            --b3-transition-slow: 0.4s ease-in-out;
            --b3-width-transition: width 0.2s ease-in-out;
            --b3-color-transition: color 0.2s ease-in-out;
            --b3-background-transition: background 0.2s ease-in-out;

            /* PDF */
            --b3-pdf-selection: #94ff71;
            --sidebar-width: 200px;
            --b3-pdf-offset: 0;
            --b3-pdf-background1: #ffc3c3;
            --b3-pdf-background2: #ffcba5;
            --b3-pdf-background3: #ffda83;
            --b3-pdf-background4: #b1eda2;
            --b3-pdf-background5: #85efe6;
            --b3-pdf-background6: #a3d3ff;
            --b3-pdf-background7: #f3c5ff;
            --b3-pdf-dark: #292a2b;
        }
        :root {
            --QYL-blockquote: rgb(149, 141, 132);
            --QYL-blockquote-background: rgb(63, 62, 59);
            --QYL-blockquote-svg: rgb(88, 86, 82);
        }
        :root {
            --QYL-switch-close: var(--QYL-gray);
            --QYL-switch-close-background: rgb(75, 73, 67);
            --QYL-input-border: rgb(108, 103, 79);
            --QYL-input-border-hover: var(--b3-theme-primary);
            --b3-switch-checked-background: var(--b3-theme-primary);
            --b3-switch-checked: var(--QYL-gray);
        }
        :root {
            --QYL-filter-background-theme: rgba(59, 59, 59, 0.5);
            --QYL-filter-wrap-background-theme: rgba(60, 60, 60, 0.6);
            --QYL-filter-fix-background-theme: rgba(59, 59, 59, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to top, #272721, #292923, #2c2b24, #2e2e26, #313028, #36322b, #3b352f, #3f3733, #433b3b, #454042, #474547, #4a4a4a);
            --QYL-account-background2: linear-gradient(to top, #272721, #292923, #2c2b24, #2e2e26, #313028, #36322b, #3b352f, #3f3733, #433b3b, #454042, #474547, #4a4a4a);
        }
    `;
}

// 关闭灰幕配色
function disableQYLhuimu() {
    const styleSheet = document.getElementById("QYLhuimu-style");
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
        --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
        --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
        --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
        --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
        --b3-scroll-color: var(--b3-theme-primary); /* 滚动条颜色 */
        --QYL-filter-background-forQsettings: var(--b3-theme-background);

        /* 圆角矩形 */
        --b3-border-radius: 8px;
        --b3-border-radius-b: 8px;
        --b3-border-radius-q: 8px;
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
        border: 1.5px solid var(--b3-theme-primary-lighter);
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
        .b3-switch {
        border: 1.5px solid var(--b3-theme-primary);
        background-color: rgba(255, 0, 0, 0);
        }
        .b3-switch::after {
        background-color: var(--b3-theme-primary);
        }
        /* 按钮 */
        .b3-button--outline {
        border: 1.5px solid var(--b3-theme-primary) !important;
        }
        /* 提示气泡 */
        #tooltip {
        background-color: var(--b3-theme-background);
        border: 1.5px solid var(--b3-theme-primary);
        color: var(--b3-theme-primary);
        padding: 2px 3px;
        }
        .b3-tooltips::before {
        display: none !important;
        }
        .b3-tooltips::after {
        background-color: var(--b3-theme-background);
        border: 1.5px solid var(--b3-theme-primary);
        color: var(--b3-theme-primary);
        padding: 2px 3px;
        }
        .protyle-toolbar .b3-tooltips::after {
        background-color: var(--b3-theme-background);
        padding: 2px 3px;
        }
        /* 右上角消息框 */
        .b3-snackbar__content {
        margin-top: 10px;
        background-color: var(--b3-theme-background);
        border: 1.5px solid var(--b3-theme-primary);
        color: var(--b3-theme-primary)
        }
        .b3-snackbar--error .b3-snackbar__content::after {
        margin-top: 10px;
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
        padding-right: 2px;
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

// 开启灰幕配色
function enableQYLchixia() {
    let styleSheet = document.getElementById("QYLchixia-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLchixia-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            /* 主色 */
            --b3-theme-background: #41344f;
            --b3-theme-background-light:#675679; /* 编辑器较多变浅（不透明） */
            --b3-theme-surface: #534362;
            --b3-theme-surface-light: rgba(83, 67, 98, 0.86);
            --b3-theme-surface-lighter: rgba(91, 82, 100, 0.6); /* 线条色 */

            /* 文字颜色 */
            --b3-theme-on-primary: #fff;
            --b3-theme-on-secondary: #fff;
            --b3-theme-on-background: #d1d1d1;
            --b3-theme-on-surface: #d1d1d1;
            --b3-theme-on-surface-light: #d1d1d1;
            --b3-theme-on-error: #fff;

            /* 容器阴影 */
            --b3-point-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-dialog-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-button-shadow: var(--b3-theme-primary-lightest) 0px 3px 6px, var(--b3-theme-primary-lightest) 0px 3px 6px;
            --b3-light-shadow: var(--b3-theme-primary-lightest) 0px 1px 2px 0px, var(--b3-theme-primary-lightest) 0px 1px 3px 1px;
            --QYL-shadow-highlight: var(--b3-theme-primary-lighter) 0px 0px 8px;
        }
        :root {
            --QYL-hover: rgba(119, 100, 132, 0.7); /* 主要悬停色 */
            --QYL-hover-hover: rgba(119, 100, 132, 0.8);/* 主要悬停色加深 */
            --QYL-hover-light: rgba(119, 100, 132, 0.2);/* 主要悬停色变浅 */
            --QYL-filetree: var(--b3-theme-background); /* 文档树、反链等背景色 */
            --b3-list-hover: var(--QYL-hover); /* 大部分悬停背景色 */
            --b3-toolbar-hover: var(--QYL-hover); /*顶部工具栏悬停背景色 */
            --b3-list-icon-hover: var(--QYL-hover-hover); /* 文档树按钮悬停色、面包屑栏按钮悬停色 */
            --b3-theme-primary: #7c6c92; 
            --b3-theme-primary-light: rgba(128, 99, 168, 0.56); /* 主色0.5透明度 */
            --b3-theme-primary-lighter: rgba(128, 99, 168, 0.35); /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(128, 99, 168, 0.1); /* 主色0.1透明度 */
            --b3-protyle-inline-mark-background: rgba(81, 150, 92, 0.8);/* 标记色 */
            --b3-protyle-inline-mark-color: #dadada; /* 标记文字色 */
            --b3-border-color: var(--b3-theme-surface-lighter); /* 线条色 */
            --b3-scroll-color: rgb(100, 80, 106); /* 滚动条颜色 */
            --QYL-white: #fff; /* 通用白 */
            --QYL-black: #171717; /* 通用黑 */
            --QYL-gray: #bfbfbf; /* 通用灰 */
            --b3-toolbar-blur-background: #5f536b; /* 失焦颜色 */
            --QYL-filter-background-forQsettings: var(--b3-theme-background);

            /* 圆角矩形 */
            --b3-border-radius: 10px;
            --b3-border-radius-b: 10px;
            --b3-border-radius-q: 16px;
            
            /* 动画效果 */
            --b3-transition: 0.2s ease-in-out;
            --b3-transition-slow: 0.4s ease-in-out;
            --b3-width-transition: width 0.2s ease-in-out;
            --b3-color-transition: color 0.2s ease-in-out;
            --b3-background-transition: background 0.2s ease-in-out;

            /* PDF */
            --b3-pdf-selection: #94ff71;
            --sidebar-width: 200px;
            --b3-pdf-offset: 0;
            --b3-pdf-background1: #ffc3c3;
            --b3-pdf-background2: #ffcba5;
            --b3-pdf-background3: #ffda83;
            --b3-pdf-background4: #b1eda2;
            --b3-pdf-background5: #85efe6;
            --b3-pdf-background6: #a3d3ff;
            --b3-pdf-background7: #f3c5ff;
            --b3-pdf-dark: #292a2b;
        }
        :root {
            --QYL-blockquote: #8e8994;
            --QYL-blockquote-background: #50475a;
            --QYL-blockquote-svg: #72697d;
        }
        :root {
            --QYL-switch-close: var(--QYL-gray);
            --QYL-switch-close-background: rgb(106, 97, 114);
            --QYL-input-border: rgb(106, 97, 114);
            --QYL-input-border-hover: var(--b3-theme-primary);
            --b3-switch-checked-background: var(--b3-theme-primary);
            --b3-switch-checked: var(--QYL-gray);
        }
        :root {
            --QYL-filter-background-theme: rgba(69, 54, 83, 0.5);
            --QYL-filter-wrap-background-theme: rgba(68, 58, 77, 0.6);
            --QYL-filter-fix-background-theme: rgba(69, 54, 83, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to right top, #4c3a5a, #4f3e5d, #534260, #564664, #5a4a67, #5d4e6a, #61526c, #64566f, #675a72, #6b5e74, #6e6377, #72677a);
            --QYL-account-background2: linear-gradient(to right top, #4c3a5a, #4f3e5d, #534260, #564664, #5a4a67, #5d4e6a, #61526c, #64566f, #675a72, #6b5e74, #6e6377, #72677a);
        }
    `;
}

// 关闭赤霞配色
function disableQYLchixia() {
    const styleSheet = document.getElementById("QYLchixia-style");
    if (styleSheet) {
        styleSheet.innerText = '';
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
            enablecancleQYLcolorfultag();
            isChecked11 = true;
        } else if (config?.isChecked11 === false) {
            disablecancleQYLcolorfultag();
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
        // 等待配置加载完成
        await loadAndCheckConfig();       
        // 执行目标操作
        disabletoolbarhidden();
        isChecked3 = false;
    }
}
init().catch(error => {
    console.error('初始化过程中发生错误:', error);
});