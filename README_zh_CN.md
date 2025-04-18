# 追求简约、实用、兼容性
###### 如果喜欢这个主题，欢迎在Github点个⭐小星星

## 主要更新

##### v2.9.7 & v2.9.6

* light：增加配色`象牙`（白色极简、现代化风格，借鉴Rem Craft主题和Asri主题），由于改动较大此配色不支持墨水屏模式和毛玻璃效果
* light：增加配色`乌木`（黑色极简、现代化风格，借鉴Rem Craft主题和Asri主题），由于改动较大此配色不支持墨水屏模式和毛玻璃效果
* 对`h-style`自定义属性和标题折叠样式进行优化，使得其效果能随标题颜色而变化
* 重做`荧光`样式，使荧光感十足（笑）

## 主题特性

* light-dark二合一，共21种主题配色

* light配色：经典、夕阳、森林、海洋、糖果、薰衣草、云雾、霜禾、回忆、湖畔、香雪兰、象牙

* dark配色：经典、勃艮第、玄青、墨翠、灰幕、赤霞、苔雪、暮霭、乌木

* 墨水屏模式、毛玻璃质感

* 灵动、活泼的动画表现

* 隐藏顶栏、顶栏融合、垂直页签、快速隐藏/呼出侧栏

* 高亮提示当前编辑块、鼠标悬浮块、超级块范围

* 标记挖空、编辑器全宽显示、列表辅助线

* 彩色标题和彩色大纲、多彩标签

* 文档树缩进线和大纲缩进线、多彩文档树、边框化文档树

* 大量元素样式优化和细节优化

* 自由度极高的自定义属性样式

## 说明

* 快捷键：快速隐藏/呼出顶栏（QQQ）、快速隐藏/呼出侧栏（Alt+Z）

* 为节省空间，垂直页签仅对第一个文档栏生效，分屏的文档栏标签保持水平排列

* 墨水屏模式与毛玻璃效果不能同时开启，顶栏融合与垂直页签或隐藏顶栏不能同时开启（其中一项开启后将自动关闭另一项）

* 自定义属性`css`的值中各样式需用英文分号`;`隔开，首尾不要用`{ }`包裹，可参考[CSS教程](https://www.runoob.com/css/css-tutorial.html)

* 以下列表为本主题的自定义属性，块标/文档处点击右键-属性-添加自定义属性，即可设置该块/该文档的效果

|自定义属性|适用类型|属性值|功能|
| ------------| -------------------| -----------------------------------------------------------------------------------------------| -------------------------------------|
|​`css`​|任意块/文档|​`css代码`​|自定义该块/文档的css样式（文档样式不支持导出）（**强烈推荐搭配`快速添加块属性`插件使用**）|
|​`style`​|任意块|​`红色便签`​ `橙色便签`​ `黄色便签`​ `绿色便签`​ `青色便签`​ `蓝色便签`​ `紫色便签`​ `粉色便签`​ `黑色便签 `​ `灰色便签`​ `警告`​ `重要`​ `待办`​ `完成`​ `引用`​ `信息`​ `灵感`​ `批注`​ `红左边框`​ `橙左边框`​ `黄左边框`​ `绿左边框`​ `青左边框`​ `蓝左边框`​ `紫左边框`​​ `粉左边框`​ `黑左边框`​ `灰左边框` `洒金纸` `网格`​<br />|设置该块的整体样式|
|​`h-style`​|标题块/文档|​`默认`​ `多彩`​ `金箔`​ `下划线` `左边框`​ `层级`​|设置标题块/该文档所有标题块的文字效果|
|​`font-family`​|任意块/文档|​`默认`​ `宋体`​ `幼圆`​ `黑体`​ `微软雅黑`​ `新宋体`​ `楷体`​ `隶书`​ `仿宋`​ `华文宋体`​ `华文中宋`​ `华文仿宋`​ `华文彩云`​ `华文新魏`​ `华文楷体`​ `华文琥珀`​ `华文细黑`​ `华文行楷`​ `华文隶书`​ `方正姚体`​ `方正舒体`​ `思源宋体`​ `思源黑体`​ `苹方`​ `Times New Roman`​|设置该块/文档的字体（本机存在的字体才生效）|
|​`height`​|任意块|​`默认`​ `50`​ `100`​ `150`​ `200`​|设置该块的最大显示高度（超出部分通过滚动条查看）|
|​`table-style`​|表格块/文档|​`三线表`​|设置该表格块/文档表格的样式|
|​`blankblock-remind`​|任意块/文档|​`默认`​ `开启`​|显示该块/该文档空块的“空空如也”提示|

* 小彩蛋：当超链接、块引链接、pdf标注链接被设置成13号背景色（最后一个背景色）后，将变为按钮样式
* 小彩蛋：给文档/块设置自定义属性`link-style`的值为`按钮`，这个文档/该块内的所有超链接、块引链接、pdf标注链接变为按钮样式
* 小彩蛋：给文档/块设置自定义属性`background-style`的值为`半高`，这个文档/该块内的所有文字背景色变成半高

## 致谢
在制作QYL主题时，参考了很多优秀主题、内容创作者的灵感、代码、审美（有点像缝合怪），包括但不限于
* [Savor主题](https://github.com/royc01/notion-theme): 列表子弹线的实现方案、顶栏融合的css方案、样式审美、斜杠菜单多列展示思路
* [Asri主题](https://github.com/mustakshif/Asri)：文档树缩进线的实现方案、顶栏融合的css方案、样式审美、搜索列表多行展示方案
* [OneNote主题](https://github.com/chenshinshi/OneNote)：多彩文档树样式
* [pink-room主题](https://github.com/StarDustSheep/pink-room)：配色审美
* [VSCode Lite Edit主题](https://github.com/emptylight370/siyuan-vscodelite-edit)：移动端判断方法
* [wilsons](https://ld246.com/member/wilsons)：状态栏浮动方案、链式操作js
* [Rem Craft主题](https://github.com/svchord/Rem-Craft)：象牙配色

## 更新历史

##### v2.9.7 & v2.9.6

* light：增加配色`象牙`（白色极简、现代化风格，借鉴Rem Craft主题和Asri主题），由于改动较大此配色不支持墨水屏模式和毛玻璃效果
* light：增加配色`乌木`（黑色极简、现代化风格，借鉴Rem Craft主题和Asri主题），由于改动较大此配色不支持墨水屏模式和毛玻璃效果
* 对`h-style`自定义属性和标题折叠样式进行优化，使得其效果能随标题颜色而变化
* 重做`荧光`样式，使荧光感十足（笑）

##### v2.9.5

* 将文字外观面板的`镂空`效果改成`金箔`
* 将文字外观面板的`投影`效果改成`荧光`
* 修复`快速隐藏/呼出侧栏`快捷键`Alt+Z`在没有文档打开时不生效的问题
* 增加小彩蛋：给文档/块设置自定义属性`background-style`的值为`半高`，这个文档/该块内的所有文字背景色变成半高

##### v2.9.4

* 增加功能：`快速隐藏/呼出侧栏`，可通过快捷键`Alt+Z`或者面包屑最右侧添加的按钮来使用，功能：立刻隐藏当前激活的侧栏/呼出上次被隐藏的侧栏，此功能基于[wilsons](https://ld246.com/member/wilsons)大佬的[链式操作](https://gitee.com/wish163/mysoft/blob/main/%E6%80%9D%E6%BA%90/%E6%A8%A1%E6%8B%9F%E8%BF%9E%E7%BB%AD%E7%82%B9%E5%87%BBopenAny.js)js实现

##### v2.9.3

* 增加小彩蛋：当超链接、块引链接、pdf标注链接被设置成13号背景色（最后一个背景色）后，将变为按钮样式
* 增加小彩蛋：给文档/块设置自定义属性`link-style`的值为`按钮`，这个文档的块/该块内的所有超链接、块引链接、pdf标注链接变为按钮样式
* 修复部分复杂嵌套列表中子弹线细节错误
* 优化搜索列表展示
* 优化任务列表折叠样式，现在任务列表被折叠后，复选框会变为黑色(light)或白色(dark)

##### v2.9.2

* dark：增加配色`暮霭`
* 修复开启毛玻璃效果后，嵌入块等的刷新按钮无法正常点击的问题
* 修复部分页面以页签形式打开时的样式错误
* 略微提高多彩标签的透明度，防止视觉上过于突兀

##### v2.9.1

* 修复编辑器字号不是默认值时，`列表辅助线`出现错位的问题

##### v2.9.0

* 重做`列表辅助线`，采用Savor主题的方案（感谢[Roy佬](https://github.com/royc01)和[Wetoria佬](https://github.com/Wetoria)）

##### v2.8.9

* 增加功能：`列表辅助线`，可通过顶栏Q按钮开启（参考了Rem-Craft主题）

##### v2.8.8

* light：增加两种配色`湖畔` `香雪兰`

##### v2.8.7

* `style`自定义属性增加`洒金纸`，设置后，文档/块的背景变为洒金纸
* `style`自定义属性增加`网格`，设置后，文档/块的背景变为网格
* 任务列表复选框改为圆角矩形
* 修复表情面板的背景色错误

##### v2.8.6 & v2.8.5

* 优化字体外观菜单
* `h-style`自定义属性增加`左边框`，并优化其他`h-style`自定义属性样式的效果
* 修复`blankblock-remind`自定义属性的错误
* 优化提示气泡样式
* 优化行内备注样式
* 优化kbd样式
* 适配`日历面板`插件
* 适配`插入时间`插件
* 其他细节优化

##### v2.8.4

* 增加功能：`边框化文档树`，可通过顶栏Q按钮开启
* 搜索界面细节优化
* 多彩文档树细节优化

##### v2.8.3

* 适配`文档层级导航`插件
* 优化`回忆`配色

##### v2.8.2

* 为QYL主题文本增加i18n（增加英文、繁体中文）

##### v2.8.1

* 修复底栏样式错误
* 状态栏适配底栏
* 墨水屏模式适配底栏

##### v2.8.0

* light：增加配色`回忆`
* dark：增加配色`苔雪`
* 为7层后的子文档增加文档树缩进线（最多支持到15层）
* 优化文档定位的提示效果

##### v2.7.9

* 修复垂直页签某些场景可能失效的问题
* 优化分屏状态下顶栏融合的效果
* 手机端细节优化

##### v2.7.8

* 手机端细节优化

##### v2.7.7

* 优化手机端编辑器工具栏
* 手机端增加彩色大纲
* 手机端增加文档树和大纲缩进线
* 手机端增加多彩文档树

##### v2.7.6

* 全面重做手机端样式

##### v2.7.5

* 适配部分手机端样式
* 修复侧栏悬浮时的样式错误
* 优化经典配色的阴影颜色
* 优化列表缩进线颜色
* 优化标签伪元素颜色

##### v2.7.4 & v2.7.3

* 优化顶栏融合的性能
* 提高`css`自定义属性的泛用性
* 修复行级代码中文本光标消失的问题
* 适配番茄工具箱插件的闪卡复习界面
* 优化底栏位置更新

##### v2.7.2

* 优化顶栏融合，防止窄屏时（尤其是平板端和浏览器端）页签与右侧工具按钮发生重叠
* light：优化顶栏和侧栏按钮颜色

##### v2.7.1

* 顶栏融合适配墨水屏模式
* 优化顶栏融合的性能

##### v2.7.0

* 优化顶栏融合

##### v2.6.9

* 增加功能：`顶栏融合`，可通过顶栏Q按钮开启（不能与垂直页签或隐藏顶栏同时开启）（部分参考了Asri主题）
* 优化状态栏位置更新

##### v2.6.8

* 使`css`自定义属性可以应用于文档
* 由于已存在更通用的`css`自定义属性，删除主题之前的容易实现的自定义属性
* 修复部分场景下，闪卡界面和搜索界面毛玻璃效果消失的问题
* 修复开启毛玻璃效果后，块引预览界面块标错位的问题
* 修复开启主题动画后，闪卡复习界面按钮异常的问题

##### v2.6.7

* 修复导出为PDF时背景色异常的问题
* 统一QYL主题设置的开启逻辑：将`关闭多彩标签和多彩行级代码`功能更改为`多彩标签和多彩行级代码`；将`关闭聚焦块高亮提示`功能更改为`聚焦块高亮提示`
* 增加功能`多彩标题和多彩大纲`（即主题不再默认改变标题颜色）

##### v2.6.6

* light：重做`云雾`配色，调整为现代化的UI配色
* 修复墨水屏模式下的部分错误
* 修复部分圆角错误

##### v2.6.5

* 重构主题文件结构
* 提高自定义属性`css`定义的样式的优先级，尽量避免被其他样式覆盖（如仍被覆盖，可使用!important）
* 使自定义属性`css`定义的样式在导出时也能生效
* 修复主题的排版元素样式导出时不生效的问题
* 使页签和按钮悬停闪光效果仅在开启主题动画后出现
* 优化侧栏被隐藏时，#layouts区域的左右边距
* 移除自定义属性`table-color`

##### v2.6.4

* 增加自定义属性`css`，填入css样式代码即可为具有此自定义属性的块应用填入的css样式
* 垂直页签适配墨水屏模式
* 优化块高亮的性能
* 修复`关闭聚焦块高亮提示`功能未生效的问题

##### v2.6.3

* 增加功能：垂直页签，可通过顶栏Q按钮开启，开启后文档页签将在编辑器左端垂直排列（当分屏浏览时，为了防止多个垂直页签栏占用过多空间，只有左上角的文档栏才使用垂直页签，其他文档栏恢复为水平页签）
* 优化底部状态栏：根据编辑栏位置自动移动到合适位置，不再需要拖动
* 优化隐藏顶栏功能：快速连按三次Q键可快速开启或关闭隐藏顶栏（仅PC端）
* 优化关闭隐藏顶栏时顶栏瞬间出现的的突兀感

##### v2.6.2

* 修复大纲列表错位和文档树缩进线不等距的问题
* 修复手机端Q按钮位置异常的问题
* 使得QYL主题设置窗口始终出现在Q按钮左下方
* 修复反链面板超链接颜色异常的问题
* dark：改善赤霞配色下文字选中背景色与编辑器背景色对比度过低的问题
* 多处细节优化

##### v2.6.1

* 重新上传

##### v2.6.0

* 使块高亮效果可以应用于所有类型的块（而不仅仅是段落块）
* 重构主界面布局实现方式，优化一系列细节问题
* 修复开启墨水屏模式后底部出现异常线条的问题
* 略微增大行内备注tip的字体大小

##### v2.5.9

* 细节优化

##### v2.5.8

* 将QYL-dark主题并入本主题
* 优化隐藏顶栏功能：当移动端开启隐藏顶栏后，下次启动思源会强制关闭隐藏顶栏，防止无法呼出顶栏（PC端不受影响）
* 调整标签元素样式
* dark：修改行级代码的背景色

##### v2.5.7

* 将`关闭主题动画`功能改为`开启主题动画`，防止可能出现的页签混乱问题和其他错位问题
* 优化开启毛玻璃效果后的整体效果
* 优化开启墨水屏模式后部分元素的样式
* 优化页签显示：图标和文字居中（参考了Asri主题）
* 修改闪卡复习界面按钮和时间提示的颜色（Anki软件风格）
* 优化引述块：当多个引述块嵌套时，内层引述块会出现阴影以提示层级

##### v2.5.6

* 重要更新：现在Q按钮的设置将自动保存，无需再使用代码片段（若之前有使用，请删除）
* 增加配色：霜禾
* 回调斜杠菜单
* 优化PDF预览页面
* 修复开启墨水屏模式后多彩文档树样式出现异常的问题
* 优化开启墨水屏模式后部分排版元素的样式

##### v2.5.5

* 增加功能：墨水屏模式，开启后界面将变为高对比度、边框化的墨水屏主题样式（不能与毛玻璃效果同时开启）
* 增加部分动效
* 微调斜杠菜单

##### v2.5.4

* 优化阴影效果，减少突兀感，并与主题色保持一致
* 优化文档树和大纲缩进线，与主题色保持一致
* 重新优化数据库chip颜色
* 修复使用自定义属性`h-style="层级"`后，编辑光标无法正常移动的问题，并重新设计层级样式
* 增加大量动效

##### v2.5.3

* 优化隐藏顶栏功能：现在开启隐藏顶栏后，当思源变为非最大化状态时，自动恢复顶栏，若重新回到最大化（或全屏）则再次隐藏顶栏（仅当上一次开启了隐藏顶栏时触发）（另外：不建议在移动端开启隐藏顶栏，因为隐藏顶栏后的呼出逻辑是鼠标悬停在屏幕上方，而移动端难以实现此操作）
* 修复闪卡复习界面按钮的样式错误
* 修复开启毛玻璃效果后某些场景下关闭按钮不可见的问题
* 修复开启毛玻璃效果后，部分预览场景切换到全屏时背景异常的问题

##### v2.5.2

* 增加功能：关闭聚焦块高亮提示，开启后将关闭主题默认开启的聚焦块提示功能
* 修复开启隐藏顶栏功能后当思源非全屏状态时，无法通过鼠标悬停呼出顶栏的问题，现在当思源不处于全屏状态时，只需变化窗口大小就会强制关闭隐藏顶栏功能
* 修正`默认关闭主题动画`代码片段的错误（**如果有使用该代码片段，请重新复制**）
* 补全部分按钮的闪光效果
* 为块引用预览窗口添加毛玻璃效果
* 修复搜索页面输入框样式错误
* 修复开启标记挖空后，在搜索界面无法正确高亮关键词的问题，并重做搜索高亮效果
* 修复PDF界面部分按钮样式异常
* 修复开启毛玻璃效果后，部分场景输入框失去遮罩的问题
* 对顶栏的窗口控制按钮进行微调
* 修复点击任务列表图标意外触发文字输入的问题
* 修复手机端Q按钮图标异常的问题

##### v2.5.1

* 修复部分错误

##### v2.5.0

* 全面重构CSS，优化大量细节
* 优化新增多个配色：夕阳、森林、海洋、糖果、薰衣草、云雾
* 重构毛玻璃样式

##### v2.0.8

* 新增配色：夕阳，可在顶栏Q按钮设置中开启（待优化）
* 新增配色：森林，可在顶栏Q按钮设置中开启（待优化）
* 增加自定义属性`table-style`，用以改变表格样式，可设置为`三线表`
* 增加自定义属性`table-color`，用以改变表格颜色，可设置为`红色` `橙色` `绿色` `蓝色` `紫色` `粉色`
* 增加功能：关闭多彩标签和多彩行级代码，点击顶栏Q按钮设置
* 优化开启毛玻璃效果后下拉框背景色
* 修复思源笔记不是焦点时顶栏颜色异常的问题
* 修复设置页面当鼠标悬停在输入框、下拉菜单上无提示的问题
* 修改Q按钮图标样式

##### v2.0.7

* 为悬浮状态的文档树（大纲）、关系图、反链面板添加毛玻璃效果
* 重构文档树缩进线，当开启多彩文档树后，缩进线将对应多彩文档树的颜色
* 修复某些可能与其他插件样式冲突的潜在问题
* 修复编辑器工具栏提示气泡显示异常的问题

##### v2.0.6

* 为闪卡界面添加毛玻璃效果
* 补全部分闪光动效
* 修改部分颜色
* 修复将搜索页面在页签打开时，图标栏背景异常的问题

##### v2.0.5

* 全面重构开启毛玻璃效果后的样式
* 修复开启毛玻璃效果后，PDF搜索栏无法正确显示的错误
* 修复开启毛玻璃效果后，PDF标注不能选择颜色的错误
* 修复开启毛玻璃效果后，PDF二级菜单无法正确显示的错误
* 给按钮和页签增加闪光动效

##### v2.0.4

* 增加功能：毛玻璃效果，可通过顶栏Q按钮开启，开启后将应用毛玻璃样式(出于性能考虑，开启毛玻璃后有极少部分动画会关闭)
* 优化部分毛玻璃效果
* 添加大量元素的毛玻璃效果
* 资源预览界面添加动画

##### v2.0.3

* 优化开启全宽显示后，文档图标未移动的问题，并优化图标和标签的移动效果
* 优化任务列表样式
* 重做护眼色样式（待优化）

##### v2.0.2

* 修复搜索预览界面块标错位的问题
* 优化部分动画效果

##### v2.0.1

* 重构搜索结果多行展示的实现方案
* 增加大量动效
* 修复反链面板无法显示块标的问题

##### v2.0.0

* 优化、增加大量动画效果
* 增加功能：关闭主题动画，可通过顶栏Q按钮开启，开启后将取消QYL主题新增的动画效果
* 为部分编辑器工具面板添加毛玻璃效果
* 反链面板优化：减小反链面板字体大小、不同反链增加背景色对比、缩小面包屑以减少视觉干扰、排版更紧凑
* 搜索面板优化：搜索结果可展示多行、减少搜索预览界面文档内容的左右间距
* 重做任务列表复选框样式
* 修复设置块自定义属性`height`后，无法正确显示块的书签、命名、别名的问题
* 优化金箔质感标题的效果
* 优化列表元素折叠项的提示效果
* 优化表情面板
* 大量细节优化

##### v1.4.1

* 主题介绍提供新的主题设置保存方案

##### v1.4.0

* 优化PDF标注颜色
* 优化数据库chip颜色
* 修复文档自定义属性`h-style="下划线"`未生效的问题
* `h-style`自定义属性增加`层级`样式，可使标题前出现图标以提示该标题的层级

##### v1.3.9

* 重做引述块样式
* 行级代码添加多彩
* 优化聚焦块提示的效果

##### v1.3.8

* 调整当前项背景色
* 重构多彩文档树实现方式
* 修复开启多彩文档树后文档树缩进线错位的问题
* 修复开启多彩文档树后无法正常定位到当前文档的问题

##### v1.3.7

* 重做标记样式

##### v1.3.6

* 重做页签样式
* 提升动画流畅性
* 优化编辑器工具栏
* 优化部分阴影效果
* 重做数据库chip样式
* `style`自定义属性增加​`黑色便签` ​`灰色便签` ​`红左边框`​ `橙左边框`​ `黄左边框`​ `绿左边框`​ `青左边框`​ `蓝左边框`​ `紫左边框`​ `紫红左边框`​ `粉左边框` `黑左边框` `灰左边框`样式
* `h-style`自定义属性增加`下划线`样式

##### v1.3.5

* 增加功能：给任意块添加自定义属性`height`，可以设置该块的最大高度（超出最大高度的通过滚动条查看）
* `h-style`自定义属性增加`金箔`样式
* 重新设计了标签样式

##### v1.3.4

* 使得“空空如也”的提示默认关闭，可通过`blankblock-remind`​自定义属性来开启
* `style`自定义属性增加`警告`​ `重要`​ `待办`​ `完成`​ `引用`​ `信息`​ `灵感`​ `批注`样式

##### v1.3.3

* 新年快乐！！！
* 增加功能：给任意块添加自定义属性`style`，可以设置该块的样式
* 增加功能：给任意块添加自定义属性`img-border`和`img-border-radius`，可以分别设置该块内的图片元素的轮廓和圆角矩形弧度
* 使部分自定义属性可对文档使用
* 修复开启标记挖空时出现短暂卡顿的问题

##### v1.3.2

* 优化多彩文档树的显示效果并增加两个文档树颜色
* 增加功能：给任意块添加自定义属性`background`，可以设置该块的背景色

##### v1.3.1

* 重新上传

##### v1.3.0

* 使得右下角状态栏可拖动，以免发生影响操作的遮挡（双击后恢复为默认位置）
* 优化反链面板和关系图面板
* `visibility`自定义属性增加`闪烁` `悬浮显示`样式
* 增加功能：给任意块添加自定义属性`border`，可以显示该块的轮廓（如果想要调整轮廓圆角矩形的弧度，可以再加上自定义属性`border-radius`来设置）
* 增加功能：给标题块添加自定义属性`h-style`，设置为`多彩`，可使标题具有多彩的动态渐变样式（仅对标题块纯文字生效）

##### v1.2.9

* 主界面和数据库细节优化

##### v1.2.8

* 修复了一些问题

##### v1.2.7

* 主界面整体优化

##### v1.2.6

* 优化了标题折叠样式
* 增加自定义属性`blankblock-remind`，可以设置为`隐藏`来屏蔽"空空如也"的提示，设置为`默认`或者删除此自定义属性，恢复提示
* 数据库样式细节优化

##### v1.2.5

* 修复了文档引用下划线和锚文本颜色不一致的问题
* 数据库样式优化

##### v1.2.4

* 增加功能：给任意块添加自定义属性`font-family`，可以自定义该块的字体（如需支持其他字体，或者其他中文西文字体组合，可以反馈给我）
* 如果一个块没有输入任何内容，将显示“空空如也”以作提示

##### v1.2.3

* 增加功能：给任意块添加自定义属性`visibility`，可设置为`模糊` `悬浮显示` `默认`
* 优化反链面板

##### v1.2.2

* 开启护眼色后，PDF界面也使用护眼色

##### v1.2.1

* 增加功能：护眼色，可通过顶栏`Q`​按钮开启，开启后界面背景色变为较柔和的颜色
* 链接和引用的下划线改为虚线
* 简化分割线样式

##### v1.2.0

* 大纲优化为彩色，对应于各级标题的颜色
* 重新设计了表格样式
* 重新设计了键盘样式
* 给链接和引用添加下划线
* 优化标题折叠样式

##### v1.1.9

* 不再改变字体
* 修复了底部状态栏无法在手机上正确显示的问题
* 其他细节优化

##### v1.1.8

* 增加功能：多彩文档树，可通过顶栏`Q`按钮开启（参考了OneNote主题）

##### v1.1.7

* 增加功能：编辑器全宽显示，可通过顶栏`Q`按钮开启（配合思源自带的Alt+Y即可开启沉浸式编辑）
* 同一个块内的不同标签可以显示不同颜色

##### v1.1.6

* 更改页签钉住样式的实现方式，保证钉住前后的一致性

##### v1.1.5

* 文档树缩进线开启后鼠标悬浮显示改为常驻显示
* 页签钉住时也能显示文档标题，并增加钉住的图标提示

##### v1.1.4

* 编辑器背景色使用护眼色
* 鼠标当前所在块高亮提示和超级块范围提示功能现在可以选择关闭或开启（默认关闭）（不影响编辑块提示）
* 修改无序列表和有序列表中折叠项的标识颜色，以提示有内容被折叠
* 修改引述块样式
* 表格颜色优化
* 修复了选中已关闭笔记本时文字跳动的问题

##### v1.1.3

* H3和H4的标题颜色对调
* 优化了主题设置窗口的关闭方式，现在可以通过点击空白处、再次点击`Q`按钮、按Esc三种方式来关闭窗口

##### v1.1.2

* 增加隐藏顶部工具栏的功能，可通过顶部工具栏的`Q`按钮开启或关闭
* 修复了`Q`按钮工具栏复选框错误显示成未勾选的问题
* 重新设计了所有容器阴影效果，使其更具立体感
* 修改备注界面为便签样式

##### v1.1.1

* 增加鼠标悬浮显示文档树缩进线功能，可通过顶部工具栏的`Q`按钮开启或关闭（参考了Asri主题）
* 增加超链接的鼠标悬浮效果
* 修改标记颜色，与挖空颜色统一
* 修改嵌入块样式
* 修改行级备注样式

##### v1.1.0

* 增加标记挖空功能，可通过顶部工具栏的`Q`按钮开启或关闭

##### v1.0.9

* 优化主界面，减少不必要的线条，提升界面一体性

##### v1.0.8

* 统一圆角矩形弧度
* 统一样式配色，使整体更为统一
* 优化键盘元素样式

##### v1.0.7

* 优化标签样式
* 统一风格，不再使用彩虹渐变

##### v1.0.6

* 修复数据库页签栏文字不居中的问题
* 修改“退出聚焦”按钮的颜色，使其更醒目
* 修复页签栏关闭文档时，页签出现卡顿的问题

##### v1.0.5

* 页签栏显示效果优化

##### v1.0.4

* 页签栏样式优化
* 行级代码改成红色
* 修复彩色多级标题只在编辑器界面生效的问题

##### v1.0.3

* 修复主菜单按钮文字不居中的问题

##### v1.0.2

* 修改西文字符字体为新罗马，中文字体仍为思源宋体

##### v1.0.1

* 将主题字体改为思源宋体

##### v1.0.0

* 上传主题