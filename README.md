<p style="opacity: 0.7; font-weight: bold; font-size: 16px">If you like this theme, feel free to give it a ⭐ star on <a href="https://github.com/QYLexpired/QYL-theme">Github</a></p>
<p style="opacity: 0.7; font-weight: bold; font-size: 16px; color: var(--b3-theme-primary)">Update Content</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 15px">V4.2.5</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 14px; padding-left: 1em">• Optimized <span data-type="code" style="padding: 0 0.4em">Enable Image Mask</span>: Click the "Mark" button to toggle edit mode, in non-edit mode click the "Lightning" button to hide/restore all masks<br>• Optimized the performance of QYL Custom Attribute<br>• Fixed style errors in fullscreen mode<br>• Optimized custom theme color: different adjustment thresholds for light and dark mode</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 15px">V4.2.0</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 14px; padding-left: 1em">• Added feature option <span data-type="code" style="padding: 0 0.4em">Enable Image Mask</span>: When enabled, mask editing buttons appear at the top left of images. Click to enter edit mode, where you can create image masks for flashcard review. Long press masks to delete them. Click the button again to exit edit mode. Click masks to make them transparent<br>• Optimized QYL Custom Attribute menu interaction: activated attributes are highlighted, clicking again directly cancels the attribute<br>• Fine-tuned tab position when top bar is fused<br>• Optimized some mobile details<br>• Fixed issue where side memos couldn't be located when inline memos were collapsed</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 16px; color: var(--b3-theme-primary)">Theme Description</p>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">Rich Color Options</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">The theme provides a custom theme color feature, allowing you to mix and match your favorite effects by selecting hue, saturation, and brightness.<br>The theme also comes with over 30 preset day and night color schemes.<br>Note: Custom theme colors will not work on some mobile devices due to lack of OKLCH color space support.<br>Since there are many preset color schemes, not all can be guaranteed to be perfect. If you find any issues, feedback is welcome.</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">Performance Notes</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">When a feature is not enabled, the corresponding code will not load, so there is <span style="font-weight: bold; color: var(--b3-theme-primary)">no impact on performance</span></p>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">If you experience lag, it is recommended to disable features in the following order based on their performance impact: Theme Color Changes Over Time, Nine Grid Layout, Fixed Toolbar, Show Inline Memo, Image Mask, Focus Editing Mode, QYL Custom Attribute Styles, Theme Animation, Frosted Glass Effect, Top Bar Fusion.</p>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">If your device has poor performance or the document is complex, it is recommended not to enable too many features, especially avoid enabling Nine Grid Layout and Fixed Toolbar simultaneously.</p>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">In extreme cases, if the system freezes due to enabling too many features, you can force close by deleting the workspace <span data-type="code">\conf\QYL-Config.json</span> file.</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">Image Mask</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">When enabled, a "Mark" button and a "Lightning" button appear at the top left of the image<br>Mark button: Toggle mask editing mode on/off<br>Lightning button: Hide/restore all masks<br>Edit mode: Drag to create masks, long press to delete masks<br>Non-edit mode: Click masks to hide/restore them<br>Mobile devices temporarily don't support creating masks<br>This feature has some performance impact, please disable when not necessary.</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">Show Inline Memo</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">When enabled, inline memos will be displayed on the side or bottom of the block.<br>How to toggle: Right-click the Show Inline Memo button.<br>Supports HTML parsing, allowing any type of inline memo, such as formulas, images, videos, or any HTML.<br>When the memo is far from the main text, clicking the main text or memo will automatically jump to it.<br>Clicking the title part of the memo will directly open the editing window.<br>This feature has some performance impact, please disable when not necessary.</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">Hide Top Bar</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">When enabled, the top bar is hidden. Hover your mouse over either side of the top of the page to reveal it again.<br>If you cannot bring up the top bar in windowed mode, you can restore it by pressing <span data-type="kbd">Ctrl + Q three times</span>.<br>Hiding the top bar will not take effect on tablets (to prevent the top bar from being unrecoverable).</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">Vertical Tab</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">When enabled, the document tabs in the upper left corner will be arranged vertically, allowing more tabs to be displayed.<br>You can customize the width of the vertical tab bar with a CSS snippet: <span data-type="code">:root { --QYL-vertical-width: 125px !important;/* Change this value, default is 125px */ }</span></p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">QYL Custom Attribute Styles</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">After enabling QYL custom attribute styles in the QYL settings window, corresponding options will appear in the block/document menu.<br>Different types of blocks have different attribute options.</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">Focus Editing</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">Keeps the currently edited block vertically centered in the editor and blurs unedited blocks to highlight the current one.</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">Fixed Toolbar</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">The text toolbar will be fixed to the top, left, bottom, or right of the editor.<br>Right-click the toolbar to switch its position.</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">Mark to Blank</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">Marked text will appear hollowed out, and the text will be restored on mouse hover.</p>
</details>
<details style="padding-left: 1em">
<summary style="opacity: 0.7; font-weight: bold; font-size: 14px">Other Supported Features</summary>
<p style="opacity: 0.7; font-size: 13px; padding-left: 1em">Top bar fusion, color block layout, full height layout, hide tab and breadcrumb, animation effects, frosted glass effect, colorful file tree, grid search list, editor full width, focus block highlight, list bullet line, etc.</p>
</details>
<p style="opacity: 0.7; font-weight: bold; font-size: 16px; color: var(--b3-theme-primary)">Acknowledgements</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 15px">A lot of marketplace themes and other content creators were referenced when making the QYL theme. Thanks to all, including but not limited to (in no particular order):</p>
<p style="opacity: 0.7; font-weight: bold; font-size: 14px; padding-left: 1em">
• <a href="https://github.com/royc01/notion-theme">Savor Theme</a>: List bullet line, top bar fusion, style, multi-column slash menu, method to connect to SiYuan API<br>
• <a href="https://github.com/mustakshif/Asri">Asri Theme</a>: File tree indent line, style, multi-line search list, status bar avoidance, color block layout, full height layout<br>
• <a href="https://github.com/chenshinshi/OneNote">Onenote Theme</a>: Colorful file tree<br>
• <a href="https://github.com/StarDustSheep/pink-room">pink-room Theme</a>: Style<br>
• <a href="https://github.com/TCOTC/Whisper">Whisper Theme</a>, <a href="https://ld246.com/member/JeffreyChen">JeffreyChen</a>: Mobile detection method, image nine-grid layout<br>
• <a href="https://ld246.com/member/wilsons">wilsons</a>: Floating status bar<br>
• <a href="https://github.com/svchord/Rem-Craft">Rem-Craft Theme</a>: Flat style<br>
</p>
