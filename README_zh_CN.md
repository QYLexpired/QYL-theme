# 基于原版的优化主题

* 不改变原版的基本配色，只修改部分样式和优化部分功能，最大程度确保兼容性
* 可隐藏顶部工具栏
* 表格、标签样式优化
* 高亮提示编辑块、悬浮块、超级块
* 可开启标记挖空
* 可开启编辑器全宽显示
* 彩色标题和彩色大纲
* 可开启文档树缩进线，参考了Asri主题
* 可开启多彩文档树，参考了OneNote主题
* 斜杠`/`菜单横铺，参考了<https://ld246.com/article/1724305128590>
* 底部状态栏浮动到右侧，部分内容参考了<https://ld246.com/article/1724305128590>
* 页签栏样式优化，部分内容参考了<https://ld246.com/article/1724305128590>
* 自定义块属性效果
* 其他样式改动

<details>
  <summary>如果想要保存Q按钮的配置，可按需启用以下JS代码片段（展开查看），顶栏会出现刷新按钮，每次打开软件点一下刷新按钮就会自动应用设置
  （参考了https://ld246.com/article/1728814976221）</summary>
  <pre><blockcode> 
  (function() {
    function addBtnRefresh() {
      let settingBtn = document.createElement("div");
      settingBtn.id = "refreshBtn";
      settingBtn.classList = "ariaLabel toolbar__item";
      settingBtn.ariaLabel = "刷新页面";
      settingBtn.innerHTML = `&ltsvg>&ltuse xlink:href="#iconRefresh">&lt/use>&lt/svg>`;
      settingBtn.addEventListener(
      "click",
      function (e) {
        location.reload();
      }
      );
    return settingBtn;
  }
  var vip = document.getElementById("toolbarVIP");
  vip.parentNode.insertBefore(addBtnRefresh(),vip);
  })();
  // 默认开启标记挖空
  isChecked1 = true;
  enableMarkStyles();
  // 默认开启文档树缩进线
  isChecked2 = true;
  enableIndentStyle();
  // 默认开启隐藏顶栏
  isChecked3 = true;
  enabletoolbarhidden();
  // 默认开启鼠标所在块高亮提示
  isChecked4 = true;
  enablehoverblockremind();
  //默认开启鼠标所在超级块高亮提示
  isChecked5 = true;
  enablesbremind();
  //默认开启编辑器全宽显示
  isChecked6 = true;
  enablefullwidth();
  //默认开启多彩文档树
  isChecked7 = true;
  enablecolorfulfiletree();
<details>
  <summary>举个例子，如果只想实现默认开启标记挖空，则启用以下代码（展开查看）</summary>
  <pre><blockcode> 
  (function() {
    function addBtnRefresh() {
      let settingBtn = document.createElement("div");
      settingBtn.id = "refreshBtn";
      settingBtn.classList = "ariaLabel toolbar__item";
      settingBtn.ariaLabel = "刷新页面";
      settingBtn.innerHTML = `&ltsvg>&ltuse xlink:href="#iconRefresh">&lt/use>&lt/svg>`;
      settingBtn.addEventListener(
      "click",
      function (e) {
        location.reload();
      }
      );
    return settingBtn;
  }
  var vip = document.getElementById("toolbarVIP");
  vip.parentNode.insertBefore(addBtnRefresh(),vip);
  })();
  // 默认开启标记挖空
  isChecked1 = true;
  enableMarkStyles();
  </blockcode></pre>
</details>
  </blockcode></pre>
</details>

<br>
<br>

##### 以下列表为本主题的自定义属性，块标/文档处点击右键-属性-添加自定义属性，即可设置该块/该文档的效果<br>
###### （如果需要其他样式，可反馈给我）
|自定义属性|适用类型|属性值|功能|
| ------------| -------------------| -----------------------------------------------------------------------------------------------| --------------------------------------------------|
|​`style`​|任意块|​`红色便签`​ `橙色便签`​ `黄色便签`​ `绿色便签`​ `青色便签`​ `蓝色便签`​ `紫色便签`​ `紫红便签`​ `粉色便签`​ `黑色便签 `​ `灰色便签`​ `警告`​ `重要`​ `待办`​ `完成`​ `引用`​ `信息`​ `灵感`​ `批注`​ `红左边框`​ `橙左边框`​ `黄左边框`​ `绿左边框`​ `青左边框`​ `蓝左边框`​ `紫左边框`​ `紫红左边框`​ `粉左边框`​ `黑左边框`​ `灰左边框`​<br />|设置该块的整体样式|
|​`border`​|任意块|​`默认`​ `立体`​ `黑色`​ `黑色虚线`​ `灰色`​ `灰色虚线`​ `红色`​ `红色虚线`​|设置该块的轮廓样式|
|​`border-radius`​|任意块|​`默认`​ `矩形`​ `圆润`​|设置该块轮廓的圆角矩形弧度|
|​`img-border`​|包含图片的块/文档|​`默认`​ `图片立体`​|设置该块/该文档内图片的轮廓样式|
|​`img-border-radius`​|包含图片的块/文档|​`默认`​ `图片圆角`​ `图片圆润`​|设置该块/该文档内图片轮廓的圆角矩形弧度|
|​`background`​|任意块|​`默认`​ `淡紫粉渐变`​ `蓝绿色渐变`​ `蓝色渐变`​ `红橙色渐变`​ `淡蓝粉渐变`​ `灰色渐变`​ `黑色渐变`​ `绿色渐变`​ `红色渐变`​|设置该块的背景|
|​`visibility`​|任意块|​`默认`​ `模糊`​ `悬浮显示`​ `闪烁`​|设置该块的显示效果|
|​`h-style`​|标题块/文档|​`默认`​ `多彩`​ `金箔`​ `下划线`​|设置标题块/该文档所有标题块的文字效果|
|​`font-family`​|任意块/文档|​`默认`​ `宋体`​ `幼圆`​ `黑体`​ `微软雅黑`​ `新宋体`​ `楷体`​ `隶书`​ `仿宋`​ `华文宋体`​ `华文中宋`​ `华文仿宋`​ `华文彩云`​ `华文新魏`​ `华文楷体`​ `华文琥珀`​ `华文细黑`​ `华文行楷`​ `华文隶书`​ `方正姚体`​ `方正舒体`​ `思源宋体`​ `思源黑体`​ `苹方`​ `Times New Roman`​|设置该块/文档的字体（本机存在的字体才生效）|
|​`height`​|任意块|​`默认`​ `50`​ `100`​ `150`​ `200`​|设置该块的最大显示高度（超出部分通过滚动条查看）|
|​`blankblock-remind`​|任意块/文档|​`默认`​ `开启`​|显示该块/该文档空块的“空空如也”提示|

## v1.0.1
* 重做标记样式

## v1.0.0
* 上传暗黑模式主题