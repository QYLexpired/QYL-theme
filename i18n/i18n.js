import zhCN from './zh-CN.js';
import en from './en.js';
import zhTW from './zh-TW.js';
const I18N = {
    'zh-CN': zhCN,
    'en': en,
    'zh-TW': zhTW
};
const i18n = I18N[window.siyuan.config.lang] || I18N.en;
export default i18n; 