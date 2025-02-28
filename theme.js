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
        QYLToolBar.innerHTML = `<svg t="1740459352935" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13599" width="256" height="256"><path d="M612.6 947.5c33 0 60-27 60-60s-27-60-60-60-60 27-60 60 27 60 60 60z" fill="#515151" p-id="13600"></path><path d="M597.9 891.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13601"></path><path d="M583 894.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13602"></path><path d="M568 896.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13603"></path><path d="M552.9 898.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13604"></path><path d="M537.8 899.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13605"></path><path d="M522.6 900.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13606"></path><path d="M507.4 900.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13607"></path><path d="M492.2 900.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13608"></path><path d="M477 899.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13609"></path><path d="M461.9 897.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13610"></path><path d="M446.9 895.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13611"></path><path d="M432 892.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13612"></path><path d="M417.2 888.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13613"></path><path d="M402.5 884.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13614"></path><path d="M388 880.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13615"></path><path d="M373.7 875.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13616"></path><path d="M359.6 869.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13617"></path><path d="M345.7 863.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13618"></path><path d="M332.1 856.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13619"></path><path d="M318.8 849.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13620"></path><path d="M305.7 841.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13621"></path><path d="M293 833.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13622"></path><path d="M280.6 824.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13623"></path><path d="M268.6 815m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13624"></path><path d="M256.9 805.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13625"></path><path d="M245.7 795.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13626"></path><path d="M234.8 784.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13627"></path><path d="M224.4 773.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13628"></path><path d="M214.4 761.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13629"></path><path d="M204.9 750.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13630"></path><path d="M195.7 737.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13631"></path><path d="M187.1 725.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13632"></path><path d="M179 712.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13633"></path><path d="M171.5 699.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13634"></path><path d="M164.4 685.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13635"></path><path d="M157.8 672.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13636"></path><path d="M151.8 658.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13637"></path><path d="M146.4 644m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13638"></path><path d="M141.6 629.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13639"></path><path d="M137.3 615m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13640"></path><path d="M133.5 600.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13641"></path><path d="M130.3 585.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13642"></path><path d="M127.8 570.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13643"></path><path d="M125.8 555.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13644"></path><path d="M124.5 540.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13645"></path><path d="M123.6 525.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13646"></path><path d="M123.4 509.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13647"></path><path d="M123.7 494.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13648"></path><path d="M124.8 479.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13649"></path><path d="M126.3 464.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13650"></path><path d="M128.5 449.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13651"></path><path d="M131.2 434.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13652"></path><path d="M134.4 419.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13653"></path><path d="M138.4 404.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13654"></path><path d="M142.9 390.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13655"></path><path d="M147.9 376m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13656"></path><path d="M153.5 361.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13657"></path><path d="M159.5 347.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13658"></path><path d="M166.3 334.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13659"></path><path d="M173.5 321m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13660"></path><path d="M181.3 307.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13661"></path><path d="M189.5 295.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13662"></path><path d="M198.2 282.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13663"></path><path d="M207.5 270.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13664"></path><path d="M217.2 258.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13665"></path><path d="M227.3 247.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13666"></path><path d="M237.8 236.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13667"></path><path d="M248.8 226.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13668"></path><path d="M260.2 216m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13669"></path><path d="M272 206.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13670"></path><path d="M284.1 197.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13671"></path><path d="M296.5 188.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13672"></path><path d="M309.4 180.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13673"></path><path d="M322.5 172.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13674"></path><path d="M335.9 165.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13675"></path><path d="M349.5 158.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13676"></path><path d="M363.5 152.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13677"></path><path d="M377.7 147.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13678"></path><path d="M392 142.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13679"></path><path d="M406.6 137.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13680"></path><path d="M421.3 134m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13681"></path><path d="M436.1 130.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13682"></path><path d="M451.1 128.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13683"></path><path d="M466.2 126.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13684"></path><path d="M481.3 124.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13685"></path><path d="M496.4 123.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13686"></path><path d="M511.6 123.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13687"></path><path d="M526.8 123.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13688"></path><path d="M542 124.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13689"></path><path d="M557.1 126m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13690"></path><path d="M572.2 128m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13691"></path><path d="M587.2 130.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13692"></path><path d="M602 133.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13693"></path><path d="M616.7 137.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13694"></path><path d="M631.3 142.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13695"></path><path d="M645.7 147m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13696"></path><path d="M659.9 152.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13697"></path><path d="M673.8 158.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13698"></path><path d="M687.5 165.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13699"></path><path d="M700.9 172.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13700"></path><path d="M714 239.9c33 0 60-27 60-60s-27-60-60-60-60 27-60 60c0 33.1 27 60 60 60z" fill="#515151" p-id="13701"></path><path d="M723.6 185.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13702"></path><path d="M732.8 192.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13703"></path><path d="M742 198.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13704"></path><path d="M750.9 205.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13705"></path><path d="M759.7 212.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13706"></path><path d="M768.2 219.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13707"></path><path d="M776.5 227.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13708"></path><path d="M784.6 235m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13709"></path><path d="M792.5 243m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13710"></path><path d="M800.2 251.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13711"></path><path d="M807.6 259.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13712"></path><path d="M814.8 268.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13713"></path><path d="M821.7 277.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13714"></path><path d="M828.3 286.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13715"></path><path d="M834.7 295.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13716"></path><path d="M840.8 304.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13717"></path><path d="M846.8 314.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13718"></path><path d="M852.3 324m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13719"></path><path d="M857.6 333.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13720"></path><path d="M862.6 344m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13721"></path><path d="M867.3 354.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13722"></path><path d="M871.7 364.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13723"></path><path d="M875.8 374.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13724"></path><path d="M879.6 385.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13725"></path><path d="M883.1 396.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13726"></path><path d="M886.2 406.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13727"></path><path d="M889.2 417.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13728"></path><path d="M891.6 428.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13729"></path><path d="M894 439.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13730"></path><path d="M895.8 450.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13731"></path><path d="M897.4 461.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13732"></path><path d="M898.8 472.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13733"></path><path d="M899.6 484.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13734"></path><path d="M900.4 495.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13735"></path><path d="M900.6 506.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13736"></path><path d="M900.6 517.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13737"></path><path d="M900.4 529m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13738"></path><path d="M899.6 540.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13739"></path><path d="M898.7 551.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13740"></path><path d="M897.4 562.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13741"></path><path d="M895.8 573.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13742"></path><path d="M893.9 584.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13743"></path><path d="M891.6 595.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13744"></path><path d="M889.1 606.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13745"></path><path d="M886.2 617.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13746"></path><path d="M883 628.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13747"></path><path d="M879.6 638.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13748"></path><path d="M875.7 649.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13749"></path><path d="M871.6 659.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13750"></path><path d="M867.2 670.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13751"></path><path d="M862.5 680.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13752"></path><path d="M857.5 690.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13753"></path><path d="M852.2 700.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13754"></path><path d="M846.7 710m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13755"></path><path d="M840.7 719.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13756"></path><path d="M834.6 728.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13757"></path><path d="M828.2 738.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13758"></path><path d="M821.5 747.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13759"></path><path d="M814.7 756m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13760"></path><path d="M807.4 764.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13761"></path><path d="M800.1 773m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13762"></path><path d="M792.3 781.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13763"></path><path d="M784.5 784.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13764"></path><path d="M776.6 776.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13765"></path><path d="M768.7 768.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13766"></path><path d="M760.7 760.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13767"></path><path d="M752.8 752.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13768"></path><path d="M744.9 744.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13769"></path><path d="M736.9 736.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13770"></path><path d="M729 729m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13771"></path><path d="M721.1 721.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13772"></path><path d="M713.1 713.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13773"></path><path d="M705.2 705.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13774"></path><path d="M697.3 697.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13775"></path><path d="M689.3 694.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13776"></path><path d="M690.9 702m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13777"></path><path d="M698.8 709.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13778"></path><path d="M706.8 717.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13779"></path><path d="M714.7 725.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13780"></path><path d="M722.6 733.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13781"></path><path d="M730.6 741.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13782"></path><path d="M738.5 749.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13783"></path><path d="M746.4 757.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13784"></path><path d="M754.4 765.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13785"></path><path d="M762.3 773.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13786"></path><path d="M770.2 781.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13787"></path><path d="M778.2 789.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13788"></path><path d="M786.1 797.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13789"></path><path d="M794 805.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13790"></path><path d="M802 813.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13791"></path><path d="M809.9 821m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13792"></path><path d="M817.8 828.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13793"></path><path d="M825.8 836.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13794"></path><path d="M833.7 844.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13795"></path><path d="M841.6 852.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13796"></path><path d="M849.6 860.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13797"></path><path d="M857.5 868.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13798"></path><path d="M865.4 876.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13799"></path><path d="M873.4 884.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13800"></path><path d="M881.3 892.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#515151" p-id="13801"></path><path d="M889.1 960.2c33 0 60-27 60-60s-27-60-60-60-60 27-60 60 26.9 60 60 60z" fill="#515151" p-id="13802"></path></svg>`;
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
let isChecked9 = false;
let isChecked10 = false;
let isChecked11 = false;
let isChecked12 = false;
let isChecked13 = false;
let isChecked14 = false;
let isChecked15 = false;
let isChecked16 = false;
let isChecked17 = false;

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

    const QYLfunctionpair9 = document.createElement('div');
    QYLfunctionpair9.className = 'checkbox-label-pair';
    QYLfunctionpair9.appendChild(checkbox9);
    QYLfunctionpair9.appendChild(label9);

    const QYLfunctionpair10 = document.createElement('div');
    QYLfunctionpair10.className = 'checkbox-label-pair';
    QYLfunctionpair10.appendChild(checkbox10);
    QYLfunctionpair10.appendChild(label10);

    const QYLfunctionpair11 = document.createElement('div');
    QYLfunctionpair11.className = 'checkbox-label-pair';
    QYLfunctionpair11.appendChild(checkbox11);
    QYLfunctionpair11.appendChild(label11);

    const QYLfunctionpair12 = document.createElement('div');
    QYLfunctionpair12.className = 'checkbox-label-pair';
    QYLfunctionpair12.appendChild(checkbox12);
    QYLfunctionpair12.appendChild(label12);

    const QYLfunctionpair13 = document.createElement('div');
    QYLfunctionpair13.className = 'checkbox-label-pair';
    QYLfunctionpair13.appendChild(checkbox13);
    QYLfunctionpair13.appendChild(label13);

    const QYLfunctionpair14 = document.createElement('div');
    QYLfunctionpair14.className = 'checkbox-label-pair';
    QYLfunctionpair14.appendChild(checkbox14);
    QYLfunctionpair14.appendChild(label14);

    const QYLfunctionpair15 = document.createElement('div');
    QYLfunctionpair15.className = 'checkbox-label-pair';
    QYLfunctionpair15.appendChild(checkbox15);
    QYLfunctionpair15.appendChild(label15);

    const QYLfunctionpair16 = document.createElement('div');
    QYLfunctionpair16.className = 'checkbox-label-pair';
    QYLfunctionpair16.appendChild(checkbox16);
    QYLfunctionpair16.appendChild(label16);

    const QYLfunctionpair17 = document.createElement('div');
    QYLfunctionpair17.className = 'checkbox-label-pair';
    QYLfunctionpair17.appendChild(checkbox17);
    QYLfunctionpair17.appendChild(label17);


    // 将复选框和标签添加到设置窗口
    settingsWindow.appendChild(QYLfunctionpair1);
    settingsWindow.appendChild(QYLfunctionpair2);
    settingsWindow.appendChild(QYLfunctionpair3);
    settingsWindow.appendChild(QYLfunctionpair4);
    settingsWindow.appendChild(QYLfunctionpair5);
    settingsWindow.appendChild(QYLfunctionpair6);
    settingsWindow.appendChild(QYLfunctionpair7);
    settingsWindow.appendChild(QYLfunctionpair9);
    settingsWindow.appendChild(QYLfunctionpair10);
    settingsWindow.appendChild(QYLfunctionpair11);
    settingsWindow.appendChild(QYLfunctionpair12);
    settingsWindow.appendChild(QYLfunctionpair13);
    settingsWindow.appendChild(QYLfunctionpair14);
    settingsWindow.appendChild(QYLfunctionpair15);
    settingsWindow.appendChild(QYLfunctionpair16);
    settingsWindow.appendChild(QYLfunctionpair17);

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

    // 夕阳配色开关
    checkbox12.addEventListener('change', function() {
        isChecked12 = this.checked;
        resetChecksunset();
        disableQYLforest();
        disableQYLocean();
        disableQYLsugar();
        disableQYLlavender();
        disableQYLfog();
        if (this.checked) {
            enableQYLsunset();
        } else {
            disableQYLsunset();
        }
    });

    //主题互斥-夕阳
    function resetChecksunset() {
        isChecked13 = false;
        isChecked14 = false;
        isChecked15 = false;
        isChecked16 = false;
        isChecked17 = false;
    }

    // 森林配色开关
    checkbox13.addEventListener('change', function() {
        isChecked13 = this.checked;
        resetCheckforest();
        disableQYLsunset();
        disableQYLocean();
        disableQYLsugar();
        disableQYLlavender();
        disableQYLfog();
        if (this.checked) {
            enableQYLforest();
        } else {
            disableQYLforest();
        }
    });

    //主题互斥-森林
    function resetCheckforest() {
        isChecked12 = false;
        isChecked14 = false;
        isChecked15 = false;
        isChecked16 = false;
        isChecked17 = false;
    }

    // 海洋配色开关
    checkbox14.addEventListener('change', function() {
        isChecked14 = this.checked;
        resetCheckocean();
        disableQYLsunset();
        disableQYLforest();
        disableQYLsugar();
        disableQYLlavender();
        disableQYLfog();
        if (this.checked) {
            enableQYLocean();
        } else {
            disableQYLocean();
        }
    });

    //主题互斥-海洋
    function resetCheckocean() {
        isChecked12 = false;
        isChecked13 = false;
        isChecked15 = false;
        isChecked16 = false;
        isChecked17 = false;
    }

    // 糖果配色开关
    checkbox15.addEventListener('change', function() {
        isChecked15 = this.checked;
        resetChecksugar();
        disableQYLsunset();
        disableQYLforest();
        disableQYLocean();
        disableQYLlavender();
        disableQYLfog();
        if (this.checked) {
            enableQYLsugar();
        } else {
            disableQYLsugar();
        }
    });

    //主题互斥-糖果
    function resetChecksugar() {
        isChecked12 = false;
        isChecked13 = false;
        isChecked14 = false;
        isChecked16 = false;
        isChecked17 = false;
    }

    // 薰衣草配色开关
    checkbox16.addEventListener('change', function() {
        isChecked16 = this.checked;
        resetChecklavender();
        disableQYLsunset();
        disableQYLforest();
        disableQYLocean();
        disableQYLsugar();
        disableQYLfog();
        if (this.checked) {
            enableQYLlavender();
        } else {
            disableQYLlavender();
        }
    });

    //主题互斥-薰衣草
    function resetChecklavender() {
        isChecked12 = false;
        isChecked13 = false;
        isChecked14 = false;
        isChecked15 = false;
        isChecked17 = false;
    }

    // 云雾配色开关
    checkbox17.addEventListener('change', function() {
        isChecked17 = this.checked;
        resetCheckfog();
        disableQYLsunset();
        disableQYLforest();
        disableQYLocean();
        disableQYLsugar();
        disableQYLlavender();
        if (this.checked) {
            enableQYLfog();
        } else {
            disableQYLfog();
        }
    });

    //主题互斥-云雾
    function resetCheckfog() {
        isChecked12 = false;
        isChecked13 = false;
        isChecked14 = false;
        isChecked15 = false;
        isChecked16 = false;
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
:root {
    --filetree-line-1: rgb(227, 227, 227);
    --filetree-line-2: rgb(227, 227, 227);
    --filetree-line-3: rgb(227, 227, 227);
    --filetree-line-4: rgb(227, 227, 227);
    --filetree-line-5: rgb(227, 227, 227);
    --filetree-line-6: rgb(227, 227, 227);
    --filetree-line-7: rgb(227, 227, 227);
    --filetree-line-8: rgb(227, 227, 227);
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
        .b3-menu__item, .b3-menu__items, .b3-menu__items * {
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
        .b3-text-field, .pcr-app .pcr-interaction .pcr-result, .b3-select {
            background-color: var(--QYL-filter-background) !important;
        }
        /* 命令面板毛玻璃 */
        div[data-key="dialog-commandpanel"] .b3-list.b3-list--background.search__list {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-commandpanel"] .b3-dialog__body .fn__flex-column .b3-form__icon.search__header {
            background-color: var(--QYL-filter-wrap-background);
        }
        /* 搜索面板毛玻璃 */
        div[data-key="dialog-globalsearch"] .b3-dialog__body .b3-form__icon.search__header {
            background-color: var(--QYL-filter-wrap-background);
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
            color: #e2041b;
            background-color: rgba(226, 4, 26, 0.1);
            transition: var(--b3-transition);
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n))::before {
            content: "#";
            color: #e2041b;
            margin-right: 5px;
            position: relative;
            top: 0.5px;
            transition: var(--b3-transition);
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n)):hover {
            background-color: rgba(226, 4, 26, 0.3);
            transition: var(--b3-background-transition);
        }
        :is(.fn__code, .b3-typography code, .b3-typography span[data-type~=code], .protyle-wysiwyg code, .protyle-wysiwyg span[data-type~=code]):is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n)) {
            color: rgb(210, 11, 11);
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
            --b3-theme-primary: rgb(240, 140, 58); 
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
            --QYL-task-block: rgb(53, 183, 53);
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
            --QYL-switch-close-background: rgb(255, 227, 205);
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(237, 111, 0);
        }
        :root {
            --QYL-filter-background-theme: rgba(255, 242, 224, 0.5);
            --QYL-filter-wrap-background-theme: rgba(255, 242, 224, 0.6);
            --QYL-filter-fix-background-theme: rgba(255, 242, 224, 0.8);
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
            --b3-theme-primary: rgb(85, 183, 95); 
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
            --QYL-task-block: rgb(53, 183, 53);
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
            --QYL-switch-close-background: rgb(208, 233, 202);
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(69, 179, 57);
        }
        :root {
            --QYL-filter-background-theme: rgba(216, 235, 208, 0.5);
            --QYL-filter-wrap-background-theme: rgba(216, 235, 208, 0.6);
            --QYL-filter-fix-background-theme: rgba(216, 235, 208, 0.8);
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
            --b3-theme-primary: rgb(115, 171, 224); 
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
            --QYL-task-block: rgb(53, 183, 53);
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
            --QYL-switch-close-background: rgb(202, 227, 255);
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(58, 114, 160);
        }
        :root {
            --QYL-filter-background-theme: rgba(211, 231, 247, 0.5);
            --QYL-filter-wrap-background-theme: rgba(226, 243, 255, 0.6);
            --QYL-filter-fix-background-theme: rgba(206, 225, 241, 0.8);
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
            --b3-theme-primary: rgb(244, 139, 181); 
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
            --QYL-task-block: rgb(53, 183, 53);
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
            --QYL-switch-close-background: rgb(255, 222, 232);
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(214, 103, 145);
        }
        :root {
            --QYL-filter-background-theme: rgba(250, 227, 235, 0.5);
            --QYL-filter-wrap-background-theme: rgba(250, 227, 235, 0.6);
            --QYL-filter-fix-background-theme: rgba(250, 227, 235, 0.8);
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
            --b3-theme-primary: rgb(211, 148, 236); 
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
            --QYL-task-block: rgb(53, 183, 53);
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
            --QYL-switch-close-background: rgb(242, 222, 255);
            --QYL-input-border: var(--b3-theme-primary);
            --QYL-input-border-hover: rgb(139, 75, 192);
        }
        :root {
            --QYL-filter-background-theme: rgba(239, 228, 255, 0.5);
            --QYL-filter-wrap-background-theme: rgba(239, 228, 255, 0.6);
            --QYL-filter-fix-background-theme: rgba(239, 228, 255, 0.8);
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
            --b3-theme-primary: rgb(66, 66, 66); 
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
            --QYL-task-block: rgb(53, 183, 53);
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
    `;
}

// 关闭云雾配色
function disableQYLfog() {
    const styleSheet = document.getElementById("QYLfog-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}