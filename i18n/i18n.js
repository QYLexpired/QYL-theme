import zh_CN from './zh_CN.js';
import en_US from './en_US.js';
import zh_CHT from './zh_CHT.js';
const I18N = {
    zh_CN,
    en_US,
    zh_CHT
};
const i18n = I18N[window.siyuan.config.lang] || I18N.en_US;
export default i18n; 