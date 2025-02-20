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
        QYLToolBar.textContent = "Q";
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
    settingsWindow.style.backdropFilter = 'var(--QYL-filter-forQsettings)';
    settingsWindow.style.padding = '12px';
    settingsWindow.style.border = 'none';
    settingsWindow.style.boxShadow = 'var(--b3-point-shadow)';
    settingsWindow.style.zIndex = '1000';
    settingsWindow.style.borderRadius = '16px'; 
    settingsWindow.style.animation = 'QYLpopout 0.2s forwards'; 

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
    label2.textContent = ' 文档树缩进线';
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
    checkbox8.id = 'eyescare-checkbox';
    checkbox8.checked = isChecked8;

    const label8 = document.createElement('label');
    label8.htmlFor = 'eyescare-checkbox';
    label8.textContent = ' 护眼色';
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

    // 将复选框和标签组合
    const QYLfunctionpair1 = document.createElement('div');
    QYLfunctionpair1.className = 'checkbox-label-pair';
    QYLfunctionpair1.appendChild(checkbox1);
    QYLfunctionpair1.appendChild(label1);

    const QYLfunctionpair2 = document.createElement('div');
    QYLfunctionpair2.className = 'checkbox-label-pair';
    QYLfunctionpair2.appendChild(checkbox2);
    QYLfunctionpair2.appendChild(label2);

    const QYLfunctionpair3 = document.createElement('div');
    QYLfunctionpair3.className = 'checkbox-label-pair';
    QYLfunctionpair3.appendChild(checkbox3);
    QYLfunctionpair3.appendChild(label3);

    const QYLfunctionpair4 = document.createElement('div');
    QYLfunctionpair4.className = 'checkbox-label-pair';
    QYLfunctionpair4.appendChild(checkbox4);
    QYLfunctionpair4.appendChild(label4);

    const QYLfunctionpair5 = document.createElement('div');
    QYLfunctionpair5.className = 'checkbox-label-pair';
    QYLfunctionpair5.appendChild(checkbox5);
    QYLfunctionpair5.appendChild(label5);
    
    const QYLfunctionpair6 = document.createElement('div');
    QYLfunctionpair6.className = 'checkbox-label-pair';
    QYLfunctionpair6.appendChild(checkbox6);
    QYLfunctionpair6.appendChild(label6);

    const QYLfunctionpair7 = document.createElement('div');
    QYLfunctionpair7.className = 'checkbox-label-pair';
    QYLfunctionpair7.appendChild(checkbox7);
    QYLfunctionpair7.appendChild(label7);

    const QYLfunctionpair8 = document.createElement('div');
    QYLfunctionpair8.className = 'checkbox-label-pair';
    QYLfunctionpair8.appendChild(checkbox8);
    QYLfunctionpair8.appendChild(label8);

    const QYLfunctionpair9 = document.createElement('div');
    QYLfunctionpair9.className = 'checkbox-label-pair';
    QYLfunctionpair9.appendChild(checkbox9);
    QYLfunctionpair9.appendChild(label9);

    const QYLfunctionpair10 = document.createElement('div');
    QYLfunctionpair10.className = 'checkbox-label-pair';
    QYLfunctionpair10.appendChild(checkbox10);
    QYLfunctionpair10.appendChild(label10);

    // 将复选框和标签添加到设置窗口
    settingsWindow.appendChild(QYLfunctionpair1);
    settingsWindow.appendChild(QYLfunctionpair2);
    settingsWindow.appendChild(QYLfunctionpair3);
    settingsWindow.appendChild(QYLfunctionpair4);
    settingsWindow.appendChild(QYLfunctionpair5);
    settingsWindow.appendChild(QYLfunctionpair6);
    settingsWindow.appendChild(QYLfunctionpair7);
    settingsWindow.appendChild(QYLfunctionpair8);
    settingsWindow.appendChild(QYLfunctionpair9);
    settingsWindow.appendChild(QYLfunctionpair10);

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

    // 护眼色开关
    checkbox8.addEventListener('change', function() {
        isChecked8 = this.checked;
        if (this.checked) {
            enableeyescare();
        } else {
            disableeyescare();
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
        span[data-type~=mark],mark {
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
        .file-tree>.fn__flex-1 {
            --indent-color-inactive: rgb(from var(--b3-theme-on-background) r g b / .15);
            --indent-color-active: rgb(from var(--b3-theme-on-background) r g b / .3);
            --indent-color: #0000
        }
        .file-tree>.fn__flex-1>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--indent-color) 20px 21.5px, rgba(0, 0, 0, 0) 21.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--indent-color) 34px 35.5px, rgba(0, 0, 0, 0) 35.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--indent-color) 52px 53.5px, rgba(0, 0, 0, 0) 53.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--indent-color) 70px 71.5px, rgba(0, 0, 0, 0) 71.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--indent-color) 88px 89.5px, rgba(0, 0, 0, 0) 89.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--indent-color) 106px 107.5px, rgba(0, 0, 0, 0) 107.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--indent-color) 124px 125.5px, rgba(0, 0, 0, 0) 125.5px 100%) }
        .file-tree>.fn__flex-1>ul ul { transition-duration: .2s; transition-property: --indent-color,height }
        .file-tree>.fn__flex-1>ul ul,.file-tree>.fn__flex-1 li.b3-list-item--focus+ul,.file-tree>.fn__flex-1 ul.has-focus { --indent-color: var(--b3-theme-background-light) }
        .file-tree>.fn__flex-1 li.b3-list-item--focus+ul,.file-tree>.fn__flex-1:hover ul.has-focus { --indent-color: rgb(183, 196, 255) }
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
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.15), -2px -2px 6px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.1) !important;
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
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.15), -2px -2px 6px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.1) !important;
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
            background-color: var(--b3-theme-primary) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+1) {
            border-left: 3px solid var(--b3-theme-primary);
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

// 开启护眼色
function enableeyescare() {
    let styleSheet = document.getElementById("eyescare-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "eyescare-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
        --b3-theme-background: #e6e6e6;/* 编辑器背景色 */
        --b3-theme-background-light: #e4e4e4;/* 悬浮背景色 */
        --b3-theme-surface: rgb(207, 212, 218);/* 文档树面板色 */
        --b3-theme-surface-light: rgba(243, 243, 243, .86);
        --b3-theme-surface-lighter: rgba(207, 212, 218, 0.8);
        --hovercurrent: rgba(170, 175, 199, 0.3);
        --b3-theme-filetree: rgba(235, 235, 235, 0.5);

        --b3-list-icon-hover: #c5c5c5;
        --b3-menu-background: #f1f1f1;
        }
        .layout-tab-bar .item:not(.layout-tab-bar .item--readonly):not(.item.item--focus) {
            background-color: rgb(220, 220, 220);
        }
        .layout-tab-bar .item:not(.layout-tab-bar .item--readonly):not(.item.item--focus):hover {
            background-color: rgb(198, 198, 198);
        }
        .protyle-breadcrumb__item {
            background-color: rgb(220, 220, 220);
        }
        .protyle-breadcrumb__item:hover {
            background-color: rgb(198, 198, 198);
        }
        .item.item--focus {
            background-color: rgb(191, 202, 220);
        }
        .item.item--focus:hover {
            background-color: rgb(167, 181, 202);
        }
        .b3-card {
            background-color: rgb(230, 230, 230); 
        }
        .b3-typography kbd, .b3-typography span[data-type~="kbd"], .protyle-wysiwyg kbd, .protyle-wysiwyg span[data-type~="kbd"] {
            background-color: rgb(242, 242, 242);
        }
        .b3-typography code:not(.hljs), .b3-typography span[data-type~=code], .protyle-wysiwyg code:not(.hljs), .protyle-wysiwyg span[data-type~=code] {
            background-color: rgb(242, 242, 242);
        }
        .file-tree>.fn__flex-1>ul ul,.file-tree>.fn__flex-1 li.b3-list-item--focus+ul,.file-tree>.fn__flex-1 ul.has-focus { --indent-color: rgb(205, 205, 205) }
        .file-tree>.fn__flex-1 li.b3-list-item--focus+ul,.file-tree>.fn__flex-1:hover ul.has-focus { --indent-color: rgb(125, 140, 240) }
        .toolbarButton[disabled] svg {
            color: rgb(236, 236, 236);
        }
    `;
}

// 关闭护眼色
function disableeyescare() {
    const styleSheet = document.getElementById("eyescare-style");
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
        .b3-menu, .b3-menu__item--show>.b3-menu__submenu {
            animation: none;
        }
        /* 毛玻璃效果 */
        :root {
            --QYL-filter1: blur(10px);
            --QYL-filter2: blur(16px);
            --QYL-filter-background1: rgba(255, 255, 255, 0.3);
            --QYL-filter-background2: rgba(255, 255, 255, 0.5);
            --QYL-filter-background-forQsettings: rgba(255, 255, 255, 0.5);
            --QYL-filter-forQsettings: blur(16px);
        }
        /* 斜杠菜单毛玻璃 */
        .protyle-hint.hint--menu {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
            border: none;
        }
        /* 编辑器工具栏毛玻璃 */
        .protyle-toolbar, .protyle-util, .protyle-hint {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
            border: none;
        }
        /* 底部状态栏毛玻璃 */
        @media (min-width: 768px) {
            #status {
                background-color: var(--QYL-filter-background1) !important;
                backdrop-filter: var(--QYL-filter1) !important;
                border: none;
            }
        }
        /* 提示气泡毛玻璃 */
        #tooltip {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
            color: var(--b3-theme-on-background);
            box-shadow: var(--b3-light-shadow);
        }
        .b3-tooltips::before {
            display: none !important;
        }
        .b3-tooltips::after {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
            color: var(--b3-theme-on-background);
            box-shadow: var(--b3-light-shadow);
        }
        /* 行内备注输入框毛玻璃 */
        .block__icons.block__icons--menu.fn__flex {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
        }
        .block__icons.block__icons--menu.fn__flex + .b3-text-field.b3-text-field--text.fn__block {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
        }
        /* 右上角消息框毛玻璃 */
        .b3-snackbar__content {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
            color: var(--b3-theme-on-background)
        }
        /* 题头图设置毛玻璃 */
        .protyle-background__img .protyle-icon {
            background-color: var(--QYL-filter-background2) !important;
            backdrop-filter: var(--QYL-filter2  ) !important;
            color: var(--b3-theme-on-background);
        }
        /* 菜单毛玻璃 */
        .b3-menu, .b3-menu__submenu {
            background-color: var(--QYL-filter-background2) !important;
            border: none !important;
        }
        .b3-menu::before {
            border-radius: var(--b3-border-radius);
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            backdrop-filter: var(--QYL-filter2) !important;
        }
        .b3-menu .b3-menu__items, .b3-menu .b3-menu__items * {
            background-color: rgba(255, 0, 0, 0);
        }
        .b3-menu__submenu::before {
            border-radius: var(--b3-border-radius);
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            backdrop-filter: var(--QYL-filter2  ) !important;
        }
        .b3-menu__item--current:not(.b3-menu__item--readonly):hover {
            background-color: var(--hovercurrent);
        }
        /* 弹出框侧栏毛玻璃 */
        .b3-dialog__container {
            background-color: var(--QYL-filter-background2) !important;
            border: none !important;
        }
        .b3-dialog__container::before {
            border-radius: var(--b3-border-radius);
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            backdrop-filter: var(--QYL-filter2) !important;
            z-index: -5;
        }
        /* 修复PDF搜索栏 */
        #outerContainer #mainContainer .findbar.b3-menu.doorHanger.wrapContainers * {
            z-index: 1 !important;
        }
        /* 修复PDF标注颜色栏不能显示 */
        #outerContainer > div.pdf__util.b3-menu .fn__flex button {
            z-index: 1 !important;
        }
        .pdf__outer.sidebarOpen .pdf__util.b3-menu > button {
            background-color: rgba(255, 0, 0, 0);
        }
        .pdf__outer.sidebarOpen .pdf__util.b3-menu > button:hover {
            background-color: var(--hovercurrent);
        }     
        /* 修复PDF菜单没有悬浮色 */   
        #secondaryToolbarButtonContainer button:hover {
            background-color: var(--hovercurrent);
        }
        /* 设置页毛玻璃 */
        :root {
            --QYLAero-label-background: rgba(211, 211, 211, 0.2);
            --QYLAero-label-background2: rgba(211, 211, 211, 0.4);
            --QYLAero-input-background: rgba(156, 156, 156, 0.2);
        }
        div[data-key="dialog-setting"] .config__tab-wrap {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-setting"] .fn__flex.b3-label, div[data-key="dialog-setting"] .b3-label {
            margin-bottom: 5px !important;
            padding: 5px 10px !important;
            border-radius: var(--b3-border-radius);
            background-color: var(--QYLAero-label-background);
            box-shadow: none !important;
        }
        div[data-key="dialog-setting"] .layout-tab-bar.fn__flex {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-setting"] .b3-text-field.fn__block.b3-form__icon-input {
            background-color: rgba(255, 0, 0, 0);
            box-shadow: none;
            background-color: var(--QYLAero-label-background2);
        }
        div[data-key="dialog-setting"] :is(.b3-select, .b3-text-field) {
            background-color: rgba(255, 0, 0, 0);
            box-shadow: none;
            background-color: var(--QYLAero-input-background);
        }
        div[data-key="dialog-setting"] span[style*="color:var(--b3-theme-background)"][style*="font-family: cursive"] {
            color: rgba(255, 0, 0, 0) !important;
        }
        .config__panel>.b3-tab-bar .config__tab-hr {
            margin: 8px 0px;
            background: transparent;
        }

        /* 命令面板毛玻璃 */
        div[data-key="dialog-commandpanel"] .b3-dialog__body {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-commandpanel"] .b3-list.b3-list--background.search__list {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-commandpanel"] .search__header .b3-text-field--text {
            background-color: rgba(27, 152, 27, 0);
        }
        div[data-key="dialog-commandpanel"] .search__header {
            margin-left: 10px;
            margin-right: 10px;
            border-radius: var(--b3-border-radius);
            background-color: var(--QYLAero-label-background2) !important;
            border: none !important;
        }

        /* 搜索面板毛玻璃 */
        .b3-dialog__body .b3-form__icon.search__header .b3-text-field.b3-text-field--text {
            background-color: rgba(27, 152, 27, 0);
        }
        .b3-dialog__body .b3-form__icon.search__header {
            background-color: rgba(27, 152, 27, 0);
        }
        .b3-dialog__body .search__header {
            margin-left: 10px;
            margin-right: 10px;
            margin-top: 5px;
            border-radius: var(--b3-border-radius);
            background-color: var(--QYLAero-label-background) !important;
            border: none;
            background-color: rgba(27, 152, 27, 0);
        }
        .b3-dialog__body .fn__flex-1.search__list.b3-list.b3-list--background {
            border: none;
            margin: 5px 10px;
            border-radius: var(--b3-border-radius);
            padding: 5px;
            background-color: var(--QYLAero-label-background);
        }
        .b3-dialog__body .search__preview.protyle .protyle-breadcrumb {
            background-color: rgba(27, 152, 27, 0);
        }
        .b3-dialog__body .search__preview.protyle {
            border: none;
            margin: 5px 10px;
            border-radius: var(--b3-border-radius);
            padding: 5px;
            background-color: var(--QYLAero-label-background);
        }
        .b3-dialog__body .fn__flex-1.search__preview.b3-typography {
            border: none;
            margin: 5px 10px;
            border-radius: var(--b3-border-radius);
            padding: 5px;
            background-color: var(--QYLAero-label-background);
        }
        .b3-dialog__body .search__tip {
            border: none;
        }
        .search__layout--row {
            border: none;
        }
        /* 集市毛玻璃 */
        .config-bazaar__readme--show {
            background-color: var(--QYL-filter-background2) !important;
            backdrop-filter: var(--QYL-filter2  ) !important;
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