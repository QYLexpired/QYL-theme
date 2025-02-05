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

function createSettingsWindow() {
    // 检查是否已经存在设置窗口
    if (document.getElementById('settings-window')) return;

    // 创建设置窗口
    const settingsWindow = document.createElement('div');
    settingsWindow.id = 'settings-window';
    settingsWindow.style.position = 'fixed';
    settingsWindow.style.top = '32px'; 
    settingsWindow.style.right = '195px'; 
    settingsWindow.style.backgroundColor = 'var(--b3-menu-background)';
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

    // 将复选框和标签添加到设置窗口
    settingsWindow.appendChild(QYLfunctionpair1);
    settingsWindow.appendChild(QYLfunctionpair2);
    settingsWindow.appendChild(QYLfunctionpair3);
    settingsWindow.appendChild(QYLfunctionpair4);
    settingsWindow.appendChild(QYLfunctionpair5);
    settingsWindow.appendChild(QYLfunctionpair6);
    settingsWindow.appendChild(QYLfunctionpair7);

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
        .file-tree>.fn__flex-1 {
            --indent-color-inactive: rgb(from var(--b3-theme-on-background) r g b / .15);
            --indent-color-active: rgb(from var(--b3-theme-on-background) r g b / .3);
            --indent-color: #0000
        }
        .file-tree>.fn__flex-1>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 18px, var(--indent-color) 18px 19.5px, rgba(0, 0, 0, 0) 19.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 36px, var(--indent-color) 36px 37.5px, rgba(0, 0, 0, 0) 37.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 54px, var(--indent-color) 54px 55.5px, rgba(0, 0, 0, 0) 55.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 72px, var(--indent-color) 72px 73.5px, rgba(0, 0, 0, 0) 73.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 90px, var(--indent-color) 90px 91.5px, rgba(0, 0, 0, 0) 91.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 108px, var(--indent-color) 108px 109.5px, rgba(0, 0, 0, 0) 109.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 126px, var(--indent-color) 126px 127.5px, rgba(0, 0, 0, 0) 127.5px 100%) }
        .file-tree>.fn__flex-1>ul ul { transition-duration: .2s; transition-property: --indent-color,height }
        .file-tree>.fn__flex-1>ul ul,.file-tree>.fn__flex-1 li.b3-list-item--focus+ul,.file-tree>.fn__flex-1 ul.has-focus { --indent-color: var(--b3-theme-background-light) }
        .file-tree>.fn__flex-1 li.b3-list-item--focus+ul,.file-tree>.fn__flex-1:hover ul.has-focus { --indent-color: var(--b3-theme-primary) }
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
            box-shadow: 2px 2px 6px rgba(255, 255, 255, 0.15), -2px -2px 6px rgba(255, 255, 255, 0.15), 0 0 12px rgba(255, 255, 255, 0.1) !important;
            transition: background-color 0.5s ease-out, box-shadow 0.5s ease-out !important;
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
            box-shadow: 2px 2px 6px rgba(255, 255, 255, 0.15), -2px -2px 6px rgba(255, 255, 255, 0.15), 0 0 12px rgba(255, 255, 255, 0.1) !important;
            transition: background-color 0.5s ease-out, box-shadow 0.5s ease-out !important;
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
        .protyle-background__icon img, .protyle-background__icon svg, .b3-chips__doctag .b3-chip {
            position: relative;
            left: -76px;
        }
    `;
}

// 关闭全宽显示功能
function disablefullwidth() {
    const styleSheet = document.getElementById("fullwidth-style");
    if (styleSheet) {
        styleSheet.innerText = '';
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
        [data-type="navigation-root"] {
    margin-left: 25px;
    margin-top: 8px !important;  
}
[data-type="navigation-file"] {
    margin-left: 25px;
}
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
    background-color: rgb(101, 149, 238) !important;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+1) {
    position: relative;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+1)::before {
    content: "";
    position: absolute;
    top: 0;
    left: 17px;
    height: 100%;
    width: 3px;
    background-color: rgb(101, 149, 238);
}
.b3-list:nth-of-type(8n+1)>[data-type="navigation-root"] {
    background-color:rgb(91, 113, 154) !important;
}
.b3-list:nth-of-type(8n+2)>[data-type="navigation-root"]::before {
    background-color:rgb(228, 184, 38) !important;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+2) {
    position: relative;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+2)::before {
    content: "";
    position: absolute;
    top: 0;
    left: 17px;
    height: 100%;
    width: 3px;
    background-color: rgb(228, 184, 38);
}
.b3-list:nth-of-type(8n+2)>[data-type="navigation-root"] {
    background-color: rgb(188, 162, 75) !important;
}
.b3-list:nth-of-type(8n+3)>[data-type="navigation-root"]::before {
    background-color:rgb(211, 70, 54) !important;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+3) {
    position: relative;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+3)::before {
    content: "";
    position: absolute;
    top: 0;
    left: 17px;
    height: 100%;
    width: 3px;
    background-color: rgb(211, 70, 54);
}
.b3-list:nth-of-type(8n+3)>[data-type="navigation-root"] {
    background-color: rgb(195, 114, 105) !important;
}
.b3-list:nth-of-type(8n+4)>[data-type="navigation-root"]::before {
    background-color:rgb(80, 159, 60) !important;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+4) {
    position: relative;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+4)::before {
    content: "";
    position: absolute;
    top: 0;
    left: 17px;
    height: 100%;
    width: 3px;
    background-color: rgb(80, 159, 60);
}
.b3-list:nth-of-type(8n+4)>[data-type="navigation-root"] {
    background-color: rgb(97, 145, 85) !important;
}
.b3-list:nth-of-type(8n+5)>[data-type="navigation-root"]::before {
    background-color:rgb(154, 75, 183) !important;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+5) {
    position: relative;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+5)::before {
    content: "";
    position: absolute;
    top: 0;
    left: 17px;
    height: 100%;
    width: 3px;
    background-color:rgb(154, 75, 183);
}
.b3-list:nth-of-type(8n+5)>[data-type="navigation-root"] {
    background-color: rgb(157, 103, 177) !important;
}
.b3-list:nth-of-type(8n+6)>[data-type="navigation-root"]::before {
    background-color:rgb(33, 152, 145) !important;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+6) {
    position: relative;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+6)::before {
    content: "";
    position: absolute;
    top: 0;
    left: 17px;
    height: 100%;
    width: 3px;
    background-color:rgb(33, 152, 145);
}
.b3-list:nth-of-type(8n+6)>[data-type="navigation-root"] {
    background-color: rgb(75, 137, 133) !important;
}
.b3-list:nth-of-type(8n+7)>[data-type="navigation-root"]::before {
    background-color:rgb(180, 42, 115) !important;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+7) {
    position: relative;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+7)::before {
    content: "";
    position: absolute;
    top: 0;
    left: 17px;
    height: 100%;
    width: 3px;
    background-color: rgb(180, 42, 115);
}
.b3-list:nth-of-type(8n+7)>[data-type="navigation-root"] {
    background-color: rgb(141, 86, 115) !important;
}
.b3-list:nth-of-type(8n)>[data-type="navigation-root"]::before {
    background-color:rgb(176, 95, 28) !important;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n) {
    position: relative;
}
div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n)::before {
    content: "";
    position: absolute;
    top: 0;
    left: 17px;
    height: 100%;
    width: 3px;
    background-color:rgb(176, 95, 28);
}
.b3-list:nth-of-type(8n)>[data-type="navigation-root"] {
    background-color:rgb(167, 117, 76) !important;
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