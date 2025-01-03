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

// 添加Q按钮
(function() {
    addThemeToolBar();
})();

// Q按钮定义
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
let isChecked = false;
function createSettingsWindow() {
    // 检查是否已经存在设置窗口
    if (document.getElementById('settings-window')) return;

    // 创建设置窗口
    const settingsWindow = document.createElement('div');
    settingsWindow.id = 'settings-window';
    settingsWindow.style.position = 'fixed';
    settingsWindow.style.top = '32px'; 
    settingsWindow.style.right = '195px'; 
    settingsWindow.style.backgroundColor = 'rgb(246, 246, 246)';
    settingsWindow.style.padding = '12px';
    settingsWindow.style.border = '1px solid #e0e0e0';
    settingsWindow.style.boxShadow = '0 8px 24px rgba(0, 0, 0, .2)';
    settingsWindow.style.zIndex = '1000';
    settingsWindow.style.borderRadius = '16px'; 

    // 创建复选框和标签
    const checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.id = 'mark-empty-checkbox';
    checkbox1.checked = isChecked;

    const label1 = document.createElement('label');
    label1.htmlFor = 'mark-empty-checkbox';
    label1.textContent = '标记挖空';
    label1.style.fontSize = '14px';

    const checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'filetree-indent-checkbox';
    checkbox2.checked = isChecked;

    const label2 = document.createElement('label');
    label2.htmlFor = 'filetree-indent-checkbox';
    label2.textContent = '文档树缩进线';
    label2.style.fontSize = '14px';

    // 将复选框和标签组合
    const QYLfunctionpair1 = document.createElement('div');
    QYLfunctionpair1.className = 'checkbox-label-pair';
    QYLfunctionpair1.appendChild(checkbox1);
    QYLfunctionpair1.appendChild(label1);

    const QYLfunctionpair2 = document.createElement('div');
    QYLfunctionpair2.className = 'checkbox-label-pair';
    QYLfunctionpair2.appendChild(checkbox2);
    QYLfunctionpair2.appendChild(label2);

    // 将复选框和标签添加到设置窗口
    settingsWindow.appendChild(QYLfunctionpair1);
    settingsWindow.appendChild(QYLfunctionpair2);

    // 将设置窗口添加到body
    document.body.appendChild(settingsWindow);

    // 标记挖空开关
    checkbox1.addEventListener('change', function() {
        isChecked = this.checked;
        if (this.checked) {
            enableMarkStyles();
        } else {
            disableMarkStyles();
        }
    });

    // 文档树缩进线开关
    checkbox2.addEventListener('change', function() {
        isChecked = this.checked;
        if (this.checked) {
            enableIndentStyle();
        } else {
            disableIndentStyle();
        }
    });

    // ESC键关闭
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeSettingsWindow();
        }
    });
}

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
        .b3-typography mark, .b3-typography span[data-type~=mark], 
        .protyle-wysiwyg mark, .protyle-wysiwyg span[data-type~=mark] {
            color: transparent !important; 
            border-bottom: 3px solid #3DBD7F;
            background-color: transparent !important;
            margin-left: 5px;
            margin-right: 5px;
            transition: 0.15s;
        }
        .b3-typography mark:hover, .b3-typography span[data-type~=mark]:hover, 
        .protyle-wysiwyg mark:hover, .protyle-wysiwyg span[data-type~=mark]:hover {
            color: inherit !important;
            border-bottom: 3px solid #3DBD7F;
            background-color: transparent !important;
            margin-left: 5px;
            margin-right: 5px;
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
        --indent-color: #0000 }
        .file-tree>.fn__flex-1>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 18px, var(--indent-color) 18px 19.5px, rgba(0, 0, 0, 0) 19.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 36px, var(--indent-color) 36px 37.5px, rgba(0, 0, 0, 0) 37.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 54px, var(--indent-color) 54px 55.5px, rgba(0, 0, 0, 0) 55.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 72px, var(--indent-color) 72px 73.5px, rgba(0, 0, 0, 0) 73.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 90px, var(--indent-color) 90px 91.5px, rgba(0, 0, 0, 0) 91.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 108px, var(--indent-color) 108px 109.5px, rgba(0, 0, 0, 0) 109.5px 100%) }
        .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 126px, var(--indent-color) 126px 127.5px, rgba(0, 0, 0, 0) 127.5px 100%) }
        .file-tree>.fn__flex-1>ul ul { transition-duration: .2s; transition-property: --indent-color,height }
        .file-tree>.fn__flex-1:hover>ul ul,.file-tree>.fn__flex-1 li.b3-list-item--focus+ul,.file-tree>.fn__flex-1 ul.has-focus { --indent-color: var(--b3-theme-background-light) }
        .file-tree>.fn__flex-1:hover li.b3-list-item--focus+ul,.file-tree>.fn__flex-1:hover ul.has-focus { --indent-color: var(--b3-theme-primary) }
    `;
}

// 关闭文档树缩进功能
function disableIndentStyle() {
    const styleSheet = document.getElementById("indent-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}