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

// 自定义属性css
function applyCustomCSS() {
    const elements = document.querySelectorAll('div[custom-css]');
    const cssRules = [];
    elements.forEach(element => {
      const cssValue = element.getAttribute('custom-css');
      const nodeId = element.getAttribute('data-node-id');
      
      if (nodeId && cssValue) {
        cssRules.push(`div[data-node-id="${nodeId}"] { ${cssValue} }`);
      }
    });
    const existingStyle = document.getElementById('dynamic-custom-css');
    if (existingStyle) existingStyle.remove();
    
    const style = document.createElement('style');
    style.id = 'dynamic-custom-css';
    style.textContent = cssRules.join('\n');
    document.head.appendChild(style);
  }
  const debouncedApplyCSS = debounce(applyCustomCSS, 100);
  const observerConfig = {
    attributes: true,
    attributeFilter: ['custom-css', 'data-node-id'],
    subtree: true
  };
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (
        mutation.type === 'attributes' && 
        (mutation.attributeName === 'custom-css' || mutation.attributeName === 'data-node-id')
      ) {
        debouncedApplyCSS();
      }
    });
  });
  observer.observe(document.body, observerConfig);
  applyCustomCSS();
  function debounce(fn, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }


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
        QYLToolBar.style.userSelect = 'none';
        const handleToolbarClick = () => {
            const settingsWindow = document.getElementById('settings-window');
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

function createSettingsWindow() {
    // 检查是否已经存在设置窗口
    if (document.getElementById('settings-window')) return;

    // 创建设置窗口
    const settingsWindow = document.createElement('div');
    settingsWindow.id = 'settings-window';
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

    const checkbox20 = document.createElement('input');
    checkbox20.type = 'checkbox';
    checkbox20.id = 'QYLlverticaltab-checkbox';
    checkbox20.checked = isChecked20;

    const label20 = document.createElement('label');
    label20.htmlFor = 'QYLlverticaltab-checkbox';
    label20.textContent = ' 垂直页签';
    label20.style.fontSize = '14px';
    label20.style.userSelect= 'none';


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
    settingsWindow.appendChild(QYLfunctionpair1);
    settingsWindow.appendChild(QYLfunctionpair2);
    settingsWindow.appendChild(QYLfunctionpair3);
    settingsWindow.appendChild(QYLfunctionpair20);
    settingsWindow.appendChild(QYLfunctionpairdivider1);
    settingsWindow.appendChild(QYLfunctionpair4);
    settingsWindow.appendChild(QYLfunctionpair5);
    settingsWindow.appendChild(QYLfunctionpair8);
    settingsWindow.appendChild(QYLfunctionpairdivider2);
    settingsWindow.appendChild(QYLfunctionpair6);
    settingsWindow.appendChild(QYLfunctionpair7);
    settingsWindow.appendChild(QYLfunctionpair9);
    settingsWindow.appendChild(QYLfunctionpairdivider3);
    settingsWindow.appendChild(QYLfunctionpair10);
    settingsWindow.appendChild(QYLfunctionpair11);
    settingsWindow.appendChild(QYLfunctionpair18);
    settingsWindow.appendChild(QYLfunctionpairdivider4);
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
        isChecked19: checkbox19.checked,
        isChecked20: checkbox20.checked
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

// 垂直页签开关
checkbox20.addEventListener('change', async function() {
    const state = this.checked;
    state ? enableQYLverticaltab() : disableQYLverticaltab();
    state ? isChecked20 = true : isChecked20 = false;
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
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 38px, var(--filetree-line-1) 38px 39px, rgba(0, 0, 0, 0) 39px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 38px, var(--filetree-line-2) 38px 39px, rgba(0, 0, 0, 0) 39px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 38px, var(--filetree-line-3) 38px 39px, rgba(0, 0, 0, 0) 39px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 38px, var(--filetree-line-4) 38px 39px, rgba(0, 0, 0, 0) 39px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 38px, var(--filetree-line-5) 38px 39px, rgba(0, 0, 0, 0) 39px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 38px, var(--filetree-line-6) 38px 39px, rgba(0, 0, 0, 0) 39px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 38px, var(--filetree-line-7) 38px 39px, rgba(0, 0, 0, 0) 39px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 38px, var(--filetree-line-8) 38px 39px, rgba(0, 0, 0, 0) 39px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 56px, var(--filetree-line-1) 56px 57px, rgba(0, 0, 0, 0) 57px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 56px, var(--filetree-line-2) 56px 57px, rgba(0, 0, 0, 0) 57px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 56px, var(--filetree-line-3) 56px 57px, rgba(0, 0, 0, 0) 57px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 56px, var(--filetree-line-4) 56px 57px, rgba(0, 0, 0, 0) 57px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 56px, var(--filetree-line-5) 56px 57px, rgba(0, 0, 0, 0) 57px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 56px, var(--filetree-line-6) 56px 57px, rgba(0, 0, 0, 0) 57px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 56px, var(--filetree-line-7) 56px 57px, rgba(0, 0, 0, 0) 57px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 56px, var(--filetree-line-8) 56px 57px, rgba(0, 0, 0, 0) 57px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 74px, var(--filetree-line-1) 74px 75px, rgba(0, 0, 0, 0) 75px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 74px, var(--filetree-line-2) 74px 75px, rgba(0, 0, 0, 0) 75px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 74px, var(--filetree-line-3) 74px 75px, rgba(0, 0, 0, 0) 75px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 74px, var(--filetree-line-4) 74px 75px, rgba(0, 0, 0, 0) 75px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 74px, var(--filetree-line-5) 74px 75px, rgba(0, 0, 0, 0) 75px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 74px, var(--filetree-line-6) 74px 75px, rgba(0, 0, 0, 0) 75px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 74px, var(--filetree-line-7) 74px 75px, rgba(0, 0, 0, 0) 75px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 74px, var(--filetree-line-8) 74px 75px, rgba(0, 0, 0, 0) 75px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 92px, var(--filetree-line-1) 92px 93px, rgba(0, 0, 0, 0) 93px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 92px, var(--filetree-line-2) 92px 93px, rgba(0, 0, 0, 0) 93px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 92px, var(--filetree-line-3) 92px 93px, rgba(0, 0, 0, 0) 93px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 92px, var(--filetree-line-4) 92px 93px, rgba(0, 0, 0, 0) 93px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 92px, var(--filetree-line-5) 92px 93px, rgba(0, 0, 0, 0) 93px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 92px, var(--filetree-line-6) 92px 93px, rgba(0, 0, 0, 0) 93px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 92px, var(--filetree-line-7) 92px 93px, rgba(0, 0, 0, 0) 93px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 92px, var(--filetree-line-8) 92px 93px, rgba(0, 0, 0, 0) 93px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 110px, var(--filetree-line-1) 110px 111px, rgba(0, 0, 0, 0) 111px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 110px, var(--filetree-line-2) 110px 111px, rgba(0, 0, 0, 0) 111px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 110px, var(--filetree-line-3) 110px 111px, rgba(0, 0, 0, 0) 111px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 110px, var(--filetree-line-4) 110px 111px, rgba(0, 0, 0, 0) 111px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 110px, var(--filetree-line-5) 110px 111px, rgba(0, 0, 0, 0) 111px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 110px, var(--filetree-line-6) 110px 111px, rgba(0, 0, 0, 0) 111px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 110px, var(--filetree-line-7) 110px 111px, rgba(0, 0, 0, 0) 111px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 110px, var(--filetree-line-8) 110px 111px, rgba(0, 0, 0, 0) 111px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 130px, var(--filetree-line-1) 130px 131px, rgba(0, 0, 0, 0) 131px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 130px, var(--filetree-line-2) 130px 131px, rgba(0, 0, 0, 0) 131px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 130px, var(--filetree-line-3) 130px 131px, rgba(0, 0, 0, 0) 131px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 130px, var(--filetree-line-4) 130px 131px, rgba(0, 0, 0, 0) 131px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 130px, var(--filetree-line-5) 130px 131px, rgba(0, 0, 0, 0) 131px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 130px, var(--filetree-line-6) 130px 131px, rgba(0, 0, 0, 0) 131px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 130px, var(--filetree-line-7) 130px 131px, rgba(0, 0, 0, 0) 131px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 130px, var(--filetree-line-8) 130px 131px, rgba(0, 0, 0, 0) 131px 100%) }
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

// 关闭聚焦块高亮
function enablecanclefocusblockremind() {
    let styleSheet = document.getElementById("canclefocusblockremind-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "canclefocusblockremind-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        [data-node-id].highlight, [data-node-id].highlight:hover { box-shadow: none !important; transition: none !important; }
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

// 开启主题动画
function enableQYLanimation() {
    let styleSheet = document.getElementById("QYLanimation-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLanimation-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
                /* 动画效果 */
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
        /* 页签动画 */
        .layout-tab-bar .item {
            animation: QYLbounceRight 0.5s;
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
        /* 闪卡内文档树动画 */
        [data-key="dialog-movepathto"] #foldTree li.b3-list-item {
            animation: QYLbounceRight2 0.15s;
        }
        /* 代码片段面板动画 */
        [data-key="dialog-snippets"] :is([data-type="js"], [data-type="css"]) .fn__flex input[type="text"] {
            animation: QYLbounceRight2 0.1s;
        }
        [data-key="dialog-snippets"] :is([data-type="js"], [data-type="css"]) .fn__block.b3-text-field {
            animation: QYLbounceRight2 0.1s;
        }
        /* 闪卡内文档树动画 */
        [data-key="dialog-movepathto"] #foldTree li.b3-list-item {
            animation: QYLbounceRight2 0.15s;
        }
        /* 代码片段面板动画 */
        [data-key="dialog-snippets"] :is([data-type="js"], [data-type="css"]) .fn__flex input[type="text"] {
            animation: QYLbounceRight2 0.1s;
        }
        [data-key="dialog-snippets"] :is([data-type="js"], [data-type="css"]) .fn__block.b3-text-field {
            animation: QYLbounceRight2 0.1s;
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
            color: var(--QYL-white);
            background-color: var(--b3-theme-primary);
            transition: var(--b3-transition);
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n))::before {
            content: '';
            display: inline-block;
            width: 0.4em;
            height: 0.4em;
            top: -0.08em;
            border-radius: 50%;
            background-color: var(--QYL-white);
            margin-right: 0.4em;
            position: relative;
            vertical-align: middle;
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
            --b3-theme-primary-lightest: rgba(240, 140, 58, 0.22); /* 主色0.1透明度 */
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
            --QYL-filter-wrap-background-theme: rgba(255, 249, 241, 0.6);
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
            --b3-theme-primary-lightest: rgba(85, 183, 95, 0.22); /* 主色0.1透明度 */
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
            --QYL-filter-wrap-background-theme: rgba(238, 246, 234, 0.6);
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
            --b3-theme-primary-lightest: rgba(115, 171, 224, 0.22); /* 主色0.1透明度 */
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
            --QYL-filter-wrap-background-theme: rgba(238, 247, 255, 0.6);
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
            --b3-theme-primary-lightest: rgba(244, 139, 181, 0.22); /* 主色0.1透明度 */
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
            --QYL-filter-wrap-background-theme: rgba(255, 246, 249, 0.6);
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
            --b3-theme-primary-lightest: rgba(211, 148, 236, 0.22); /* 主色0.1透明度 */
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
            --QYL-filter-wrap-background-theme: rgba(250, 246, 255, 0.6);
            --QYL-filter-fix-background-theme: rgba(239, 228, 255, 0.8);
        }
        :root {
            --QYL-account-background1: linear-gradient(to top, #f5d1f8, #f6d2f9, #f6d3f9, #f7d4fa, #f7d5fa, #f7d7fb, #f7d9fb, #f7dbfc, #f7defd, #f8e2fe, #f8e5fe, #f9e8ff);
            --QYL-account-background2: linear-gradient(to top, #f5d1f8, #f6d2f9, #f6d3f9, #f7d4fa, #f7d5fa, #f7d7fb, #f7d9fb, #f7dbfc, #f7defd, #f8e2fe, #f8e5fe, #f9e8ff);
        }
    `;
}

// 关闭薰衣草配色
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
            --b3-theme-primary-lightest: rgba(107, 107, 107, 0.22); /* 主色0.1透明度 */
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
            --QYL-filter-wrap-background-theme: rgba(246, 246, 246, 0.6);
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
            --b3-border-radius: 6px;
            --b3-border-radius-b: 10px;
            --b3-border-radius-q: 12px;
        }
        /* 主界面 */
        #layouts .layout-tab-container {
            border: 2px solid var(--b3-theme-primary);
        }
        .layout__dockb .layout-tab-container {
            border: none !important;
        }
        /* 页签 */
        [data-type="wnd"] .fn__flex:not(.av__views) .fn__flex.layout-tab-bar {
            border: 2px solid var(--b3-theme-primary);
            border-bottom: none;
            border-right: none;
        }
        [data-type="wnd"] .fn__flex:not(.av__views) .layout-tab-bar--readonly {
            border: 2px solid var(--b3-theme-primary);
            border-bottom: none;
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
        .protyle-breadcrumb__item--active :is(svg, .protyle-breadcrumb__text) {
            color: var(--b3-theme-on-background) !important;
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
        .b3-typography code:not(.hljs), .protyle-wysiwyg span[data-type~=code], .fn__code {
            background-color: rgba(255, 0, 0, 0);
            border: 1.5px solid;
            padding: 1px 3.5px;
            white-space: nowrap;
        }
        /* 适配垂直页签 */
        #QYLverticalthe1[data-type="wnd"] .fn__flex:not(.av__views) .fn__flex.layout-tab-bar {
            border: 2px solid var(--b3-theme-primary);
            border-bottom: none;
        }
        #QYLverticalthe1[data-type="wnd"] .fn__flex:not(.av__views) .layout-tab-bar--readonly {
            border: 2px solid var(--b3-theme-primary);
            border-top: none;
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
            --b3-theme-primary-lighter: rgba(90, 187, 171, 0.3) !important; /* 主色0.3透明度 */
            --b3-theme-primary-lightest: rgba(90, 187, 171, 0.22); /* 主色0.1透明度 */
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
            --QYL-filter-wrap-background-theme:rgba(247, 249, 237, 0.6);
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

// 开启垂直页签
function enableQYLverticaltab() {
    //寻找第一个wnd,添加#QYLverticalthe1并监听
    function QYLFindFirstWndElement(selector) {
        const directFind = document.querySelector(`${selector} [data-type="wnd"]`);
        if (directFind) return directFind;
        let el = document.querySelector(selector);
        let depth = 0;
        const MAX_DEPTH = 20;
        while (el && el.dataset.type !== 'wnd' && depth < MAX_DEPTH) {
          el = el.firstElementChild;
          depth++;
        }
        return el?.dataset.type === 'wnd' ? el : null;
      }  
      function QYLManageIdAssignment() {
        let observer = null;
        let reassignTimer = null;
        let globalObserver = null;
        const TARGET_ID = 'QYLverticalthe1';
        const cleanup = () => {
          globalObserver?.disconnect();
          observer?.disconnect();
          clearTimeout(reassignTimer);
          const targetEl = document.getElementById(TARGET_ID);
          if (targetEl) targetEl.removeAttribute('id');
          window.removeEventListener('beforeunload', beforeUnloadHandler);
        };
        const beforeUnloadHandler = () => cleanup();
        window.addEventListener('beforeunload', beforeUnloadHandler);
      
        const QYLAssignId = (() => {
          let debounceTimer;
          return () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              const targetSelector = '#layouts .layout__center';
              const el = QYLFindFirstWndElement(targetSelector);
              if (observer) {
                observer.disconnect();
                observer = null;
              }     
              if (el) {
                if (el.id !== TARGET_ID) {
                  const oldEl = document.getElementById(TARGET_ID);
                  if (oldEl && oldEl !== el) oldEl.removeAttribute('id');
                  el.id = TARGET_ID;
                }
                const parent = el.parentElement;
                if (parent) {
                  observer = new MutationObserver((mutations) => {
                    for (const mutation of mutations) {
                      for (const node of mutation.removedNodes) {
                        if (node === el) {
                          clearTimeout(reassignTimer);
                          reassignTimer = setTimeout(QYLAssignId, 50);
                          return;
                        }
                      }
                    }
                  });
                  observer.observe(parent, { childList: true });
                }
              }
            }, 30);
          };
        })();     
        const initObserver = () => {
          let container = document.querySelector('#layouts .layout__center')?.parentElement;
          if (!container) container = document.querySelector('#layouts') || document.body;
      
          globalObserver = new MutationObserver(() => {
            if (!document.getElementById(TARGET_ID)) QYLAssignId();
          });
          globalObserver.observe(container, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
          });
        };     
        QYLAssignId();
        initObserver();
        window.QYL_CLEANUP = cleanup;
      }
      QYLManageIdAssignment();

    let styleSheet = document.getElementById("QYLverticaltab-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLverticaltab-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        /* 垂直页签 */
        #layouts .layout__center #QYLverticalthe1 {
            display: flex;
            flex-direction: row;
            height: 100%;
        }
        #layouts .layout__center #QYLverticalthe1 > .fn__flex {
            flex: 0 0 auto;
            min-width: 125px;
            max-width: 125px;
            margin-right: 6px;
            flex-direction: column;
        }
        #QYLverticalthe1 > .fn__flex .layout-tab-bar:not(.layout-tab-bar--readonly) {
            flex: 1;
            flex-direction: column;
            border-radius: var(--b3-border-radius) var(--b3-border-radius) 0 0;
        }
        #layouts .layout__center #QYLverticalthe1 > .fn__flex .layout-tab-bar:not(.layout-tab-bar--readonly) .item {
            width: 90%;
        }
        #layouts .layout__center #QYLverticalthe1 > .fn__flex > .layout-tab-bar--readonly {
            flex: none;
            border-radius: 0 0 var(--b3-border-radius) var(--b3-border-radius) !important;
        }
        #layouts .layout__center #QYLverticalthe1 > .layout-tab-container {
            border-radius: var(--b3-border-radius) !important;
        }
        #layouts #QYLverticalthe1 .layout-tab-bar li[data-type="tab-header"].item:not(.item--pin, .item--full) :is(.item__icon,.item__graphic, .item__text) {
            transform: translateX(0px)  !important;
            transition: var(--b3-transition);
        }
        #layouts #QYLverticalthe1 .layout-tab-bar li[data-type="tab-header"].item:not(.item--pin, .item--full):hover :is(.item__icon,.item__graphic, .item__text) {
            transform: translateX(0px);
            transition: var(--b3-transition);
        }
        #layouts .layout__center #QYLverticalthe1 .layout-tab-bar .item__close {
            margin-left: auto;
        }
        #layouts .layout__center #QYLverticalthe1 > .fn__flex .layout-tab-bar:not(.layout-tab-bar--readonly) .item__close {
        margin-left: auto;
        display: none;
        }
        #layouts .layout__center #QYLverticalthe1 > .fn__flex .layout-tab-bar:not(.layout-tab-bar--readonly) .item:hover .item__close {
        display: flex;
        }
        /* 垂直页签钉住 */
        #layouts .layout__center #QYLverticalthe1 .layout-tab-bar .item--pin .item__text  {
            display: unset !important;
        }
        #layouts .layout__center #QYLverticalthe1 .layout-tab-bar .item--pin .item__graphic, .layout-tab-bar .item--pin .item__icon {
            padding: 4px 0px 4px 8px !important;
        }
        #layouts .layout__center #QYLverticalthe1    .layout-tab-bar .item--pin+.item:not(.item--pin,.item--readonly) {
            margin-top: 20px;
            margin-left : 0 !important;
        }
    `;
}

// 关闭垂直页签
function disableQYLverticaltab() {
    //停止监听
    window.QYL_CLEANUP?.();
    window.QYL_CLEANUP = null;

    const styleSheet = document.getElementById("QYLverticaltab-style");
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
        QYL_debounceWrapper(func, delay = 500, maxWait = 1000) {
            let QYL_timeout, QYL_lastCall = 0;
            return (...args) => {
                const now = Date.now();
                clearTimeout(QYL_timeout);
                
                if (now - QYL_lastCall >= maxWait) {
                    QYL_lastCall = now;
                    func.apply(this, args);
                } else {
                    QYL_timeout = setTimeout(() => {
                        QYL_lastCall = now;
                        func.apply(this, args);
                    }, delay);
                }
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
                this.QYL_debouncedUpdate = this.QYL_debounceWrapper(this.QYL_calculatePosition.bind(this));
                window.addEventListener('resize', this.QYL_handleResize, { passive: true });
                window.addEventListener('scroll', this.QYL_debouncedUpdate, { passive: true });
                document.addEventListener('visibilitychange', this.QYL_handleVisibility);           
                this.QYL_observer = new ResizeObserver(entries => {
                    if (entries.some(entry => entry.target.isConnected)) {
                        this.QYL_debouncedUpdate();
                    }
                });
                this.QYL_observer.observe(this.QYL_layout);
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
            window.removeEventListener('scroll', this.QYL_debouncedUpdate);
            document.removeEventListener('visibilitychange', this.QYL_handleVisibility);
            
            this.QYL_observer?.disconnect();
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
const QYLInitialize = () => {
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
QYLInitialize();
window.addEventListener('beforeunload', () => {
    QYLStatusPositionManager.QYL_destroy();
});