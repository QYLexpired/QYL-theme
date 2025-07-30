<p style="opacity: 0.7; font-weight: bold; font-size: 16px">如果喜欢这个主题，欢迎在<a href="https://github.com/QYLexpired/QYL-theme">Github</a>点个⭐小星星</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 16px; color: var(--b3-theme-primary)">更新内容</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 15px">V4.2.6</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 14px; padding-left: 1em">• 重要更新：QYL自定义属性增加<span data-type="code" style="padding: 0 0.4em">自配置属性</span>，可自定义属性值，具体方法参看主题说明<br>• 优化<span data-type="code" style="padding: 0 0.4em">显示行内备注</span>：块被折叠时，隐藏所有底部/侧边备注；数据库卡片视图下不再显示底部/侧边备注<br>• 优化图片遮罩样式<br>• 重做<span data-type="code" style="padding: 0 0.4em">专注编辑模式</span>：大幅提升性能、支持右键点击按钮取消块模糊<br>• 增加两种聚焦块高亮样式，可通过右键点击该功能按钮切换</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 16px; color: var(--b3-theme-primary)">主题说明</p>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">丰富的配色选择</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">主题提供自定义主题色功能，通过选取色相、饱和度、亮度来搭配出你喜欢的效果<br>主题还额外内置了超过30种预设日夜配色<br>注意：由于部分移动设备不支持OKLCH色彩空间，因此自定义主题色不会生效<br>由于预设配色较多，无法保证全部完善，有任何问题欢迎反馈</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">性能说明</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">功能未启用时，相应代码不会加载，因此对性能<span style="font-weight: bold; color: var(--b3-theme-primary)">没有任何影响</span></p>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">若发现卡顿，按照功能对性能的消耗程度，推荐按顺序优先关闭：主题色随时间变化、九宫格排列、固定工具栏、显示行内备注、图片遮罩、专注编辑模式、QYL自定义属性样式、主题动画、毛玻璃效果、顶栏融合</p>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">若设备性能不佳，或者文档比较复杂，建议不要开启过多功能，尤其建议不要同时开启九宫格排列和固定工具栏</p>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">若极端情况下，由于开启过多功能导致卡死，可删除工作空间<span data-type="code">\conf\QYL-Config.json</span>文件强制关闭</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">图片遮罩</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">开启后在图片左上角出现标记按钮和闪电按钮<br>标记按钮：开启/关闭遮罩编辑模式<br>闪电按钮：隐藏/恢复所有遮罩<br>编辑模式：拖拽创建遮罩，长按删除遮罩<br>非编辑模式：点击遮罩使其隐藏/恢复<br>移动端暂时不支持创建遮罩<br>此功能对性能有一定消耗，请在非必要时关闭</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">显示行内备注</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">开启后行内备注将显示在块的侧边或底部<br>切换方法：右键点击显示行内备注按钮<br>支持解析HTML，借此可实现任意类型的行内备注，如公式、图片、视频、任意HTML<br>当备注与正文距离较远时，点击正文/备注，可自动跳转<br>点击备注的标题部分可直接打开编辑窗口<br>此功能对性能有一定消耗，请在非必要时关闭</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">隐藏顶栏</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">开启后顶栏被隐藏，通过鼠标悬停在页面最上方的两侧来重新呼出<br>若发现在窗口状态无法呼出顶栏，可通过快捷键<span data-type="kbd">Ctrl+连按三次Q</span>来恢复顶栏<br>平板端隐藏顶栏不会生效（防止无法呼出顶栏）</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">垂直页签</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">开启后位于左上角的文档栏页签将垂直排列，可展示更多页签<br>可通过CSS代码片段来自定义垂直页签栏的宽度<span data-type="code">:root { --QYL-vertical-width: 125px !important;/* 更改此数值，默认为125px */ }</span></p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">QYL自定义属性样式</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">在QYL设置窗口开启QYL自定义属性样式后，块/文档菜单出现相应选项<br>不同类型的块具有不同的属性选项</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">自配置属性</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">需开启QYL自定义属性<br>在CSS代码片段添加名为<span data-type="code">QYLselfconfigattr</span>的代码片段并启用，格式为：<span data-type="code">属性1:属性值1/属性值2/属性值3...;属性2:属性值1/属性值2属性值3...</span>，即用<span data-type="code">/</span>分隔同一属性的不同值，用<span data-type="code">;</span>分隔不同属性，必须使用半角符号<br>比如<span data-type="code">color:red/blue;task:todo/done</span><br>可在属性名后加上<span data-type="code">-block/-file</span>后缀来限制只出现在块菜单/文档菜单，如<span data-type="code">color-block:red/blue</span><br>可在属性名/属性值后加上<span data-type="code">=任意字符</span>后缀来设置属性名和属性值的备注，如<span data-type="code">color=颜色:red=红色/blue=蓝色</span><br>注意属性名的命名规范：必须以英文字母开头、仅允许存在阿拉伯数字/英文字母/连字符<span data-type="code">-</span><br><span style="font-weight: bold; color: var(--b3-theme-primary)">代码片段设定完毕后必须重载思源</span></p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">专注编辑模式</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">使当前编辑的块自动保持在编辑器的垂直中心，且模糊未编辑的块来突出当前编辑的块<br>右键点击专注编辑模式可取消模糊效果</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">固定工具栏</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">将文字工具栏将固定在编辑器的上、左、下、右四个方向<br>通过鼠标右键单击工具栏来切换位置</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">标记挖空</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">使被标记的文字变为挖空样式，鼠标悬停时恢复文字</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">主题还支持以下功能</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">顶栏融合、撞色布局、全高界面、隐藏页签和面包屑、动画效果、毛玻璃效果、多彩文档树、网格化搜索列表、编辑器全宽显示、聚焦块高亮、列表子弹线等</p>
</details>
<p style="opacity: 0.7; font-weight: bold; font-size: 16px; color: var(--b3-theme-primary)">致谢</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 15px">制作QYL主题时参考了大量集市主题和其他内容创作者，在此表示感谢，包括但不限于（排名不分先后）</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 14px; padding-left: 1em">
• <a href="https://github.com/royc01/notion-theme">Savor主题</a>：列表子弹线、顶栏融合、风格、斜杠菜单多列展示、连接思源API的方法<br>
• <a href="https://github.com/mustakshif/Asri">Asri主题</a>：文档树缩进线、风格、搜索列表多行展示、状态栏避让、撞色布局、全高界面<br>
• <a href="https://github.com/chenshinshi/OneNote">Onenote主题</a>：多彩文档树<br>
• <a href="https://github.com/StarDustSheep/pink-room">pink-room主题</a>：风格<br>
• <a href="https://github.com/TCOTC/Whisper">浅吟主题</a>、<a href="https://ld246.com/member/JeffreyChen">JeffreyChen</a>：移动端判断方法、图片九宫格排列<br>
• <a href="https://ld246.com/member/wilsons">wilsons</a>：状态栏浮动<br>
• <a href="https://github.com/svchord/Rem-Craft">Rem-Craft主题</a>：扁平化风格<br>
</p>