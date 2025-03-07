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

let isChecked1 = false;
let isChecked2 = false;
let isChecked3 = false;
let isChecked4 = false;
let isChecked5 = false;
let isChecked6 = false;
let isChecked7 = false;
let isChecked8 = false;
let isChecked9 = false;
let isChecked10 = false;
let isChecked11 = false;
let isChecked12 = false;
let isChecked13 = false;
let isChecked14 = false;
let isChecked15 = false;

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
    settingsWindow.appendChild(QYLfunctionpair12);
    settingsWindow.appendChild(QYLfunctionpair13);
    settingsWindow.appendChild(QYLfunctionpair14);
    settingsWindow.appendChild(QYLfunctionpair15);

    // 将设置窗口添加到body
    document.body.appendChild(settingsWindow);

    // 标记挖空开关
    checkbox1.addEventListener('change', function() {
        isChecked1 = this.checked;
        if (this.checked) {
            enableMarkStyles();
        } else {
            disableMarkStyles();
        }
    });

    // 文档树缩进线开关
    checkbox2.addEventListener('change', function() {
        isChecked2 = this.checked;
        if (this.checked) {
            enableIndentStyle();
        } else {
            disableIndentStyle();
        }
    });

    // 隐藏顶栏开关
    checkbox3.addEventListener('change', function() {
        isChecked3 = this.checked;
        if (this.checked) {
            enabletoolbarhidden();
        } else {
            disabletoolbarhidden();
        }
    });

    // 鼠标所在块高亮开关
    checkbox4.addEventListener('change', function() {
        isChecked4 = this.checked;
        if (this.checked) {
            enablehoverblockremind();
        } else {
            disablehoverblockremind();
        }
    });

    // 超级块范围提示开关
    checkbox5.addEventListener('change', function() {
        isChecked5 = this.checked;
        if (this.checked) {
            enablesbremind();
        } else {
            disablesbremind();
        }
    });

    // 关闭聚焦块高亮开关
    checkbox8.addEventListener('change', function() {
        isChecked8 = this.checked;
        if (this.checked) {
            enablecanclefocusblockremind();
        } else {
            disablecanclefocusblockremind();
        }
    });

    // 全宽显示开关
    checkbox6.addEventListener('change', function() {
        isChecked6 = this.checked;
        if (this.checked) {
            enablefullwidth();
        } else {
            disablefullwidth();
        }
    });

    // 多彩文档树开关
    checkbox7.addEventListener('change', function() {
        isChecked7 = this.checked;
        if (this.checked) {
            enablecolorfulfiletree();
        } else {
            disablecolorfulfiletree();
        }
    });

    // 关闭主题动画开关
    checkbox9.addEventListener('change', function() {
        isChecked9 = this.checked;
        if (this.checked) {
            enablecancleQYLanimation();
        } else {
            disablecancleQYLanimation();
        }
    });

    // 毛玻璃效果开关
    checkbox10.addEventListener('change', function() {
        isChecked10 = this.checked;
        if (this.checked) {
            enableQYLAero();
        } else {
            disableQYLAreo();
        }
    });

    // 关闭多彩标签和多彩行级代码开关
    checkbox11.addEventListener('change', function() {
        isChecked11 = this.checked;
        if (this.checked) {
            enablecancleQYLcolorfultag();
        } else {
            disablecancleQYLcolorfultag();
        }
    });

    // 勃艮第配色开关
    checkbox12.addEventListener('change', function() {
        isChecked12 = this.checked;
        resetCheckburgundy();
        disableQYLxuanqing();
        disableQYLmocui();
        disableQYLhuimu();
        if (this.checked) {
            enableQYLburgundy();
        } else {
            disableQYLburgundy();
        }
    });

    //主题互斥-勃艮第
    function resetCheckburgundy() {
        isChecked13 = false;
        isChecked14 = false;
        isChecked15 = false;
    }

    // 玄青配色开关
    checkbox13.addEventListener('change', function() {
        isChecked13 = this.checked;
        resetCheckxuanqing();
        disableQYLburgundy();
        disableQYLmocui();
        disableQYLhuimu();
        if (this.checked) {
            enableQYLxuanqing();
        } else {
            disableQYLxuanqing();
        }
    });

    //主题互斥-玄青
    function resetCheckxuanqing() {
        isChecked12 = false;
        isChecked14 = false;
        isChecked15 = false;
    }

    // 墨翠配色开关
    checkbox14.addEventListener('change', function() {
        isChecked14 = this.checked;
        resetCheckmocui();
        disableQYLburgundy();
        disableQYLxuanqing();
        disableQYLhuimu();
        if (this.checked) {
            enableQYLmocui();
        } else {
            disableQYLmocui();
        }
    });

    //主题互斥-墨翠
    function resetCheckmocui() {
        isChecked12 = false;
        isChecked13 = false;
        isChecked15 = false;
    }

    // 灰幕配色开关
    checkbox15.addEventListener('change', function() {
        isChecked15 = this.checked;
        resetCheckhuimu();
        disableQYLburgundy();
        disableQYLxuanqing();
        disableQYLmocui();
        if (this.checked) {
            enableQYLhuimu();
        } else {
            disableQYLhuimu();
        }
    });

    //主题互斥-灰幕
    function resetCheckhuimu() {
        isChecked12 = false;
        isChecked13 = false;
        isChecked14 = false;
    }

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

// 关闭主题动画
function enablecancleQYLanimation() {
    let styleSheet = document.getElementById("QYLanimation-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLanimation-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
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
            --QYL-switch-close-background: rgb(48, 41, 41);
            --QYL-input-border: rgb(108, 79, 79);
            --QYL-input-border-hover: var(--b3-theme-primary);
            --b3-switch-checked-background: var(--b3-theme-primary);
            --b3-switch-checked: var(--QYL-gray);
        }
        :root {
            --QYL-filter-background-theme: rgba(22, 15, 15, 0.5);
            --QYL-filter-wrap-background-theme: rgba(22, 15, 15, 0.6);
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
            --QYL-filter-wrap-background-theme: rgba(34, 35, 44, 0.6);
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
            --QYL-filter-wrap-background-theme: rgba(31, 38, 31, 0.6);
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
            --QYL-filter-wrap-background-theme: rgba(59, 59, 59, 0.6);
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