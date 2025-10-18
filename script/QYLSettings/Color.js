import ThemeMode from '../basic/ThemeMode.js';
import i18n from '../../i18n/i18n.js';
import { smartToggleButtonState, getButtonState, setButtonState, flushBatchUpdate } from '../basic/Storage.js';
import { getStorageItem, getStorageConfig } from '../basic/GetStorage.js';
import excluSetting from './ExcluSetting.js';
import bindSetting from './BindSettings.js';
import '../basic/ColorJs.js';
const lightColorMainGroup = [
    'QYLLightClassicBlue',
    'QYLLightClassicRed',
    'QYLSunset',
    'QYLForest',
    'QYLOcean',
    'QYLSugar',
    'QYLLavender',
    'QYLYunwu',
    'QYLYunyan',
    'QYLYuncang',
    'QYLYunjin',
    'QYLShuanghe',
    'QYLLime',
    'QYLHuique',
    'QYLAutumn',
    'QYLMemory',
    'QYLLake',
    'QYLXiangxuelan',
    'QYLIvory',
    'QYLCoral',
    'QYLMint',
    'QYLAmber',
    'QYLCream',
    'QYLBiwan',
    'QYLWarm',
    'QYLWoodAsh',
    'QYLAfterglow'
];
const darkColorMainGroup = [
    'QYLDarkClassicBlue',
    'QYLDarkClassicRed',
    'QYLBurgundy',
    'QYLXuanqing',
    'QYLMocui',
    'QYLHuimu',
    'QYLWumu',
    'QYLMidnight',
    'QYLCangming',
    'QYLSteam',
    'QYLLatte',
    'QYLWinter',
    'QYLXingqiong',
    'QYLWildness',
    'QYLMarsh',
    'QYLGleam',
    'QYLYinJi',
    'QYLJinZun',
    'QYLBoAi'
];
excluSetting.registerGroup('lightColorMain', lightColorMainGroup);
excluSetting.registerGroup('darkColorMain', darkColorMainGroup);
excluSetting.registerGroup('lightCustomColor', ['CustomColorPickLight', ...lightColorMainGroup]);
excluSetting.registerGroup('darkCustomColor', ['CustomColorPickDark', ...darkColorMainGroup]);
excluSetting.registerGroup('lightSwitchTime', ['ColorSwitchTimeLight', ...lightColorMainGroup]);
excluSetting.registerGroup('darkSwitchTime', ['ColorSwitchTimeDark', ...darkColorMainGroup]);
excluSetting.registerGroup('lightSwitchImg', ['ColorSwitchImgLight', ...lightColorMainGroup]);
excluSetting.registerGroup('darkSwitchImg', ['ColorSwitchImgDark', ...darkColorMainGroup]);
let colorModule1 = null;
let sunsetModule = null;
let forestModule = null;
let oceanModule = null;
let sugarModule = null;
let lavenderModule = null;
let yunwuModule = null;
let yunyanModule = null;
let yuncangModule = null;
let yunjinModule = null;
let shuangheModule = null;
let limeModule = null;
let huiqueModule = null;
let autumnModule = null;
let memoryModule = null;
let lakeModule = null;
let xiangxuelanModule = null;
let ivoryModule = null;
let coralModule = null;
let mintModule = null;
let amberModule = null;
let creamModule = null;
let biwanModule = null;
let burgundyModule = null;
let xuanqingModule = null;
let mocuiModule = null;
let huimuModule = null;
let wumuModule = null;
let midnightModule = null;
let cangmingModule = null;
let steamModule = null;
let latteModule = null;
let winterModule = null;
let xingqiongModule = null;
let lightClassicBlueModule = null;
let lightClassicRedModule = null;
let darkClassicBlueModule = null;
let darkClassicRedModule = null;
let colorSwitchTimeModule = null;
let colorSwitchImgModule = null;
let darkRevertModule = null;
let wildnessModule = null;
let marshModule = null;
let gleamModule = null;
let yinJiModule = null;
let jinZunModule = null;
let boAiModule = null;
let warmModule = null;
let woodAshModule = null;
let afterglowModule = null;
async function loadColorModule1() {
    if (!colorModule1) {
        try {
            colorModule1 = await import('../color/CustomColor.js');
        } catch (error) {
        }
    }
    return colorModule1;
}
async function enableColor1() {
    const module = await loadColorModule1();
    if (module && module.customColor) {
        await createColorPicker();
    }
}
async function disableColor1() {
    const module = await loadColorModule1();
    if (module && module.customColor) {
        module.customColor.destroy();
    }
}
async function showColorPanel1() {
    const module = await loadColorModule1();
    if (module && module.customColor) {
        if (module.customColor.container) {
            module.customColor.toggle();
        } else {
            await createColorPicker();
        }
    }
}
async function createColorPicker() {
    const module = await loadColorModule1();
    if (module && module.customColor) {
        try {
            const colorConfig = await module.customColor.loadFromConfig();
            document.documentElement.style.setProperty('--QYL-custom-primary-main', colorConfig.hue.toString() + 'deg');
            document.documentElement.style.setProperty('--QYL-custom-primary-saturate', colorConfig.saturation.toString());
            document.documentElement.style.setProperty('--QYL-custom-primary-brightness', colorConfig.brightness.toString());
            document.documentElement.classList.add('QYLCustomColor');
            await module.customColor.createColorPicker(
                async (colorData) => {
                    if (colorData.type === 'saturation') {
                        const currentHue = module.customColor.getColor()?.hue ?? colorConfig.hue;
                        const currentBrightness = module.customColor.getColor()?.brightness ?? colorConfig.brightness;
                        document.documentElement.style.setProperty('--QYL-custom-primary-saturate', colorData.saturation.toString());
                        await module.customColor.saveToConfig(currentHue, colorData.saturation, currentBrightness);
                    } else if (colorData.type === 'brightness') {
                        const currentHue = module.customColor.getColor()?.hue ?? colorConfig.hue;
                        const currentSaturation = module.customColor.getColor()?.saturation ?? colorConfig.saturation;
                        document.documentElement.style.setProperty('--QYL-custom-primary-brightness', colorData.brightness.toString());
                        await module.customColor.saveToConfig(currentHue, currentSaturation, colorData.brightness);
                    } else {
                        const currentSaturation = module.customColor.getColor()?.saturation ?? colorConfig.saturation;
                        const currentBrightness = module.customColor.getColor()?.brightness ?? colorConfig.brightness;
                        if (colorData && colorData.hue !== undefined) {
                            document.documentElement.style.setProperty('--QYL-custom-primary-main', colorData.hue.toString() + 'deg');
                            document.documentElement.style.setProperty('--QYL-custom-primary-saturate', currentSaturation.toString());
                            document.documentElement.style.setProperty('--QYL-custom-primary-brightness', currentBrightness.toString());
                            await module.customColor.saveToConfig(colorData.hue, currentSaturation, currentBrightness);
                        }
                    }
                },
                colorConfig.hue,
                colorConfig.saturation,
                colorConfig.brightness
            );
        } catch (error) {
        }
    }
}
async function destroyColorPicker() {
    const module = await loadColorModule1();
    if (module && module.customColor) {
        try {
            module.customColor.destroy();
            document.documentElement.style.removeProperty('--QYL-custom-primary-main');
            document.documentElement.style.removeProperty('--QYL-custom-primary-saturate');
            document.documentElement.style.removeProperty('--QYL-custom-primary-brightness');
            document.documentElement.style.removeProperty('--QYL-custom-primary-pick');
            document.documentElement.classList.remove('QYLCustomColor');
            document.documentElement.classList.remove('QYLCustomColorPick');
        } catch (error) {
        }
    }
}
async function loadSunsetModule() {
    if (!sunsetModule) {
        try {
            sunsetModule = await import('../color/Sunset.js');
        } catch (error) {
        }
    }
    return sunsetModule;
}
async function loadForestModule() {
    if (!forestModule) {
        try {
            forestModule = await import('../color/Forest.js');
        } catch (error) {
        }
    }
    return forestModule;
}
async function loadOceanModule() {
    if (!oceanModule) {
        try {
            oceanModule = await import('../color/Ocean.js');
        } catch (error) {
        }
    }
    return oceanModule;
}
async function loadSugarModule() {
    if (!sugarModule) {
        try {
            sugarModule = await import('../color/Sugar.js');
        } catch (error) {
        }
    }
    return sugarModule;
}
async function loadLavenderModule() {
    if (!lavenderModule) {
        try {
            lavenderModule = await import('../color/Lavender.js');
        } catch (error) {
        }
    }
    return lavenderModule;
}
async function loadYunwuModule() {
    if (!yunwuModule) {
        try {
            yunwuModule = await import('../color/Yunwu.js');
        } catch (error) {
        }
    }
    return yunwuModule;
}
async function loadYunyanModule() {
    if (!yunyanModule) {
        try {
            yunyanModule = await import('../color/Yunyan.js');
        } catch (error) {
        }
    }
    return yunyanModule;
}
async function loadYuncangModule() {
    if (!yuncangModule) {
        try {
            yuncangModule = await import('../color/Yuncang.js');
        } catch (error) {
        }
    }
    return yuncangModule;
}
async function loadYunjinModule() {
    if (!yunjinModule) {
        try {
            yunjinModule = await import('../color/Yunjin.js');
        } catch (error) {
        }
    }
    return yunjinModule;
}
async function loadShuangheModule() {
    if (!shuangheModule) {
        try {
            shuangheModule = await import('../color/Shuanghe.js');
        } catch (error) {
        }
    }
    return shuangheModule;
}
async function loadLimeModule() {
    if (!limeModule) {
        try {
            limeModule = await import('../color/Lime.js');
        } catch (error) {
        }
    }
    return limeModule;
}
async function loadHuiqueModule() {
    if (!huiqueModule) {
        try {
            huiqueModule = await import('../color/Huique.js');
        } catch (error) {
        }
    }
    return huiqueModule;
}
async function loadAutumnModule() {
    if (!autumnModule) {
        try {
            autumnModule = await import('../color/Autumn.js');
        } catch (error) {
        }
    }
    return autumnModule;
}
async function loadMemoryModule() {
    if (!memoryModule) {
        try {
            memoryModule = await import('../color/Memory.js');
        } catch (error) {
        }
    }
    return memoryModule;
}
async function loadLakeModule() {
    if (!lakeModule) {
        try {
            lakeModule = await import('../color/Lake.js');
        } catch (error) {
        }
    }
    return lakeModule;
}
async function loadXiangxuelanModule() {
    if (!xiangxuelanModule) {
        try {
            xiangxuelanModule = await import('../color/Xiangxuelan.js');
        } catch (error) {
        }
    }
    return xiangxuelanModule;
}
async function loadIvoryModule() {
    if (!ivoryModule) {
        try {
            ivoryModule = await import('../color/Ivory.js');
        } catch (error) {
        }
    }
    return ivoryModule;
}
async function loadCoralModule() {
    if (!coralModule) {
        try {
            coralModule = await import('../color/Coral.js');
        } catch (error) {
        }
    }
    return coralModule;
}
async function loadMintModule() {
    if (!mintModule) {
        try {
            mintModule = await import('../color/Mint.js');
        } catch (error) {
        }
    }
    return mintModule;
}
async function loadAmberModule() {
    if (!amberModule) {
        try {
            amberModule = await import('../color/Amber.js');
        } catch (error) {
        }
    }
    return amberModule;
}
async function loadCreamModule() {
    if (!creamModule) {
        try {
            creamModule = await import('../color/Cream.js');
        } catch (error) {
        }
    }
    return creamModule;
}
async function loadBiwanModule() {
    if (!biwanModule) {
        try {
            biwanModule = await import('../color/Biwan.js');
        } catch (error) {
        }
    }
    return biwanModule;
}
async function loadBurgundyModule() {
    if (!burgundyModule) {
        try {
            burgundyModule = await import('../color/Burgundy.js');
        } catch (error) {
        }
    }
    return burgundyModule;
}
async function loadXuanqingModule() {
    if (!xuanqingModule) {
        try {
            xuanqingModule = await import('../color/Xuanqing.js');
        } catch (error) {
        }
    }
    return xuanqingModule;
}
async function loadMocuiModule() {
    if (!mocuiModule) {
        try {
            mocuiModule = await import('../color/Mocui.js');
        } catch (error) {
        }
    }
    return mocuiModule;
}
async function loadHuimuModule() {
    if (!huimuModule) {
        try {
            huimuModule = await import('../color/Huimu.js');
        } catch (error) {
        }
    }
    return huimuModule;
}
async function loadWumuModule() {
    if (!wumuModule) {
        try {
            wumuModule = await import('../color/Wumu.js');
        } catch (error) {
        }
    }
    return wumuModule;
}
async function loadMidnightModule() {
    if (!midnightModule) {
        try {
            midnightModule = await import('../color/Midnight.js');
        } catch (error) {
        }
    }
    return midnightModule;
}
async function loadCangmingModule() {
    if (!cangmingModule) {
        try {
            cangmingModule = await import('../color/Cangming.js');
        } catch (error) {
        }
    }
    return cangmingModule;
}
async function loadSteamModule() {
    if (!steamModule) {
        try {
            steamModule = await import('../color/Steam.js');
        } catch (error) {
        }
    }
    return steamModule;
}
async function loadLatteModule() {
    if (!latteModule) {
        try {
            latteModule = await import('../color/Latte.js');
        } catch (error) {
        }
    }
    return latteModule;
}
async function loadWinterModule() {
    if (!winterModule) {
        try {
            winterModule = await import('../color/Winter.js');
        } catch (error) {
        }
    }
    return winterModule;
}
async function loadXingqiongModule() {
    if (!xingqiongModule) {
        try {
            xingqiongModule = await import('../color/Xingqiong.js');
        } catch (error) {
        }
    }
    return xingqiongModule;
}
async function loadLightClassicBlueModule() {
    if (!lightClassicBlueModule) {
        try {
            lightClassicBlueModule = await import('../color/LightClassicBlue.js');
        } catch (error) {
        }
    }
    return lightClassicBlueModule;
}
async function loadLightClassicRedModule() {
    if (!lightClassicRedModule) {
        try {
            lightClassicRedModule = await import('../color/LightClassicRed.js');
        } catch (error) {
        }
    }
    return lightClassicRedModule;
}
async function loadDarkClassicBlueModule() {
    if (!darkClassicBlueModule) {
        try {
            darkClassicBlueModule = await import('../color/DarkClassicBlue.js');
        } catch (error) {
        }
    }
    return darkClassicBlueModule;
}
async function loadDarkClassicRedModule() {
    if (!darkClassicRedModule) {
        try {
            darkClassicRedModule = await import('../color/DarkClassicRed.js');
        } catch (error) {
        }
    }
    return darkClassicRedModule;
}
async function loadColorSwitchTimeModule() {
    if (!colorSwitchTimeModule) {
        try {
            colorSwitchTimeModule = await import('../color/ColorSwitchTime.js');
        } catch (error) {}
    }
    return colorSwitchTimeModule;
}
async function enableColorSwitchTime() {
    const module = await loadColorSwitchTimeModule();
    if (module && module.startColorSwitch) {
        module.startColorSwitch();
    }
}
async function disableColorSwitchTime() {
    const module = await loadColorSwitchTimeModule();
    if (module && module.stopColorSwitch) {
        module.stopColorSwitch();
    }
}
async function loadColorSwitchImgModule() {
    if (!colorSwitchImgModule) {
        try {
            colorSwitchImgModule = await import('../color/ColorSwitchImg.js');
        } catch (error) {}
    }
    return colorSwitchImgModule;
}
async function enableColorSwitchImg() {
    const module = await loadColorSwitchImgModule();
    if (module && module.startColorSwitchImg) {
        module.startColorSwitchImg();
    }
}
async function disableColorSwitchImg() {
    const module = await loadColorSwitchImgModule();
    if (module && module.stopColorSwitchImg) {
        module.stopColorSwitchImg();
    }
}
async function enableLightClassicBlue() {
    const module = await loadLightClassicBlueModule();
    if (module && module.initLightClassicBlue) {
        module.initLightClassicBlue();
    }
}
async function disableLightClassicBlue() {
    const module = await loadLightClassicBlueModule();
    if (module && module.removeLightClassicBlue) {
        module.removeLightClassicBlue();
    }
}
async function enableLightClassicRed() {
    const module = await loadLightClassicRedModule();
    if (module && module.initLightClassicRed) {
        module.initLightClassicRed();
    }
}
async function disableLightClassicRed() {
    const module = await loadLightClassicRedModule();
    if (module && module.removeLightClassicRed) {
        module.removeLightClassicRed();
    }
}
async function enableSunset() {
    const module = await loadSunsetModule();
    if (module && module.initSunset) {
        module.initSunset();
    }
}
async function disableSunset() {
    const module = await loadSunsetModule();
    if (module && module.removeSunset) {
        module.removeSunset();
    }
}
async function enableForest() {
    const module = await loadForestModule();
    if (module && module.initForest) {
        module.initForest();
    }
}
async function disableForest() {
    const module = await loadForestModule();
    if (module && module.removeForest) {
        module.removeForest();
    }
}
async function enableOcean() {
    const module = await loadOceanModule();
    if (module && module.initOcean) {
        module.initOcean();
    }
}
async function disableOcean() {
    const module = await loadOceanModule();
    if (module && module.removeOcean) {
        module.removeOcean();
    }
}
async function enableSugar() {
    const module = await loadSugarModule();
    if (module && module.initSugar) {
        module.initSugar();
    }
}
async function disableSugar() {
    const module = await loadSugarModule();
    if (module && module.removeSugar) {
        module.removeSugar();
    }
}
async function enableLavender() {
    const module = await loadLavenderModule();
    if (module && module.initLavender) {
        module.initLavender();
    }
}
async function disableLavender() {
    const module = await loadLavenderModule();
    if (module && module.removeLavender) {
        module.removeLavender();
    }
}
async function enableYunwu() {
    const module = await loadYunwuModule();
    if (module && module.initYunwu) {
        module.initYunwu();
    }
}
async function disableYunwu() {
    const module = await loadYunwuModule();
    if (module && module.removeYunwu) {
        module.removeYunwu();
    }
}
async function enableYunyan() {
    const module = await loadYunyanModule();
    if (module && module.initYunyan) {
        module.initYunyan();
    }
}
async function disableYunyan() {
    const module = await loadYunyanModule();
    if (module && module.removeYunyan) {
        module.removeYunyan();
    }
}
async function enableYuncang() {
    const module = await loadYuncangModule();
    if (module && module.initYuncang) {
        module.initYuncang();
    }
}
async function disableYuncang() {
    const module = await loadYuncangModule();
    if (module && module.removeYuncang) {
        module.removeYuncang();
    }
}
async function enableYunjin() {
    const module = await loadYunjinModule();
    if (module && module.initYunjin) {
        module.initYunjin();
    }
}
async function disableYunjin() {
    const module = await loadYunjinModule();
    if (module && module.removeYunjin) {
        module.removeYunjin();
    }
}
async function enableShuanghe() {
    const module = await loadShuangheModule();
    if (module && module.initShuanghe) {
        module.initShuanghe();
    }
}
async function disableShuanghe() {
    const module = await loadShuangheModule();
    if (module && module.removeShuanghe) {
        module.removeShuanghe();
    }
}
async function enableLime() {
    const module = await loadLimeModule();
    if (module && module.initLime) {
        module.initLime();
    }
}
async function disableLime() {
    const module = await loadLimeModule();
    if (module && module.removeLime) {
        module.removeLime();
    }
}
async function enableHuique() {
    const module = await loadHuiqueModule();
    if (module && module.initHuique) {
        module.initHuique();
    }
}
async function disableHuique() {
    const module = await loadHuiqueModule();
    if (module && module.removeHuique) {
        module.removeHuique();
    }
}
async function enableAutumn() {
    const module = await loadAutumnModule();
    if (module && module.initAutumn) {
        module.initAutumn();
    }
}
async function disableAutumn() {
    const module = await loadAutumnModule();
    if (module && module.removeAutumn) {
        module.removeAutumn();
    }
}
async function enableMemory() {
    const module = await loadMemoryModule();
    if (module && module.initMemory) {
        module.initMemory();
    }
}
async function disableMemory() {
    const module = await loadMemoryModule();
    if (module && module.removeMemory) {
        module.removeMemory();
    }
}
async function enableLake() {
    const module = await loadLakeModule();
    if (module && module.initLake) {
        module.initLake();
    }
}
async function disableLake() {
    const module = await loadLakeModule();
    if (module && module.removeLake) {
        module.removeLake();
    }
}
async function enableXiangxuelan() {
    const module = await loadXiangxuelanModule();
    if (module && module.initXiangxuelan) {
        module.initXiangxuelan();
    }
}
async function disableXiangxuelan() {
    const module = await loadXiangxuelanModule();
    if (module && module.removeXiangxuelan) {
        module.removeXiangxuelan();
    }
}
async function enableIvory() {
    const module = await loadIvoryModule();
    if (module && module.initIvory) {
        module.initIvory();
    }
}
async function disableIvory() {
    const module = await loadIvoryModule();
    if (module && module.removeIvory) {
        module.removeIvory();
    }
}
async function enableCoral() {
    const module = await loadCoralModule();
    if (module && module.initCoral) {
        module.initCoral();
    }
}
async function disableCoral() {
    const module = await loadCoralModule();
    if (module && module.removeCoral) {
        module.removeCoral();
    }
}
async function enableMint() {
    const module = await loadMintModule();
    if (module && module.initMint) {
        module.initMint();
    }
}
async function disableMint() {
    const module = await loadMintModule();
    if (module && module.removeMint) {
        module.removeMint();
    }
}
async function enableAmber() {
    const module = await loadAmberModule();
    if (module && module.initAmber) {
        module.initAmber();
    }
}
async function disableAmber() {
    const module = await loadAmberModule();
    if (module && module.removeAmber) {
        module.removeAmber();
    }
}
async function enableCream() {
    const module = await loadCreamModule();
    if (module && module.initCream) {
        module.initCream();
    }
}
async function disableCream() {
    const module = await loadCreamModule();
    if (module && module.removeCream) {
        module.removeCream();
    }
}
async function enableBiwan() {
    const module = await loadBiwanModule();
    if (module && module.initBiwan) {
        module.initBiwan();
    }
}
async function disableBiwan() {
    const module = await loadBiwanModule();
    if (module && module.removeBiwan) {
        module.removeBiwan();
    }
}
async function enableBurgundy() {
    const module = await loadBurgundyModule();
    if (module && module.initBurgundy) {
        module.initBurgundy();
    }
}
async function disableBurgundy() {
    const module = await loadBurgundyModule();
    if (module && module.removeBurgundy) {
        module.removeBurgundy();
    }
}
async function enableXuanqing() {
    const module = await loadXuanqingModule();
    if (module && module.initXuanqing) {
        module.initXuanqing();
    }
}
async function disableXuanqing() {
    const module = await loadXuanqingModule();
    if (module && module.removeXuanqing) {
        module.removeXuanqing();
    }
}
async function enableMocui() {
    const module = await loadMocuiModule();
    if (module && module.initMocui) {
        module.initMocui();
    }
}
async function disableMocui() {
    const module = await loadMocuiModule();
    if (module && module.removeMocui) {
        module.removeMocui();
    }
}
async function enableHuimu() {
    const module = await loadHuimuModule();
    if (module && module.initHuimu) {
        module.initHuimu();
    }
}
async function disableHuimu() {
    const module = await loadHuimuModule();
    if (module && module.removeHuimu) {
        module.removeHuimu();
    }
}
async function enableWumu() {
    const module = await loadWumuModule();
    if (module && module.initWumu) {
        module.initWumu();
    }
}
async function disableWumu() {
    const module = await loadWumuModule();
    if (module && module.removeWumu) {
        module.removeWumu();
    }
}
async function enableMidnight() {
    const module = await loadMidnightModule();
    if (module && module.initMidnight) {
        module.initMidnight();
    }
}
async function disableMidnight() {
    const module = await loadMidnightModule();
    if (module && module.removeMidnight) {
        module.removeMidnight();
    }
}
async function enableCangming() {
    const module = await loadCangmingModule();
    if (module && module.initCangming) {
        module.initCangming();
    }
}
async function disableCangming() {
    const module = await loadCangmingModule();
    if (module && module.removeCangming) {
        module.removeCangming();
    }
}
async function enableSteam() {
    const module = await loadSteamModule();
    if (module && module.initSteam) {
        module.initSteam();
    }
}
async function disableSteam() {
    const module = await loadSteamModule();
    if (module && module.removeSteam) {
        module.removeSteam();
    }
}
async function enableLatte() {
    const module = await loadLatteModule();
    if (module && module.initLatte) {
        module.initLatte();
    }
}
async function disableLatte() {
    const module = await loadLatteModule();
    if (module && module.removeLatte) {
        module.removeLatte();
    }
}
async function enableWinter() {
    const module = await loadWinterModule();
    if (module && module.initWinter) {
        module.initWinter();
    }
}
async function disableWinter() {
    const module = await loadWinterModule();
    if (module && module.removeWinter) {
        module.removeWinter();
    }
}
async function enableXingqiong() {
    const module = await loadXingqiongModule();
    if (module && module.initXingqiong) {
        module.initXingqiong();
    }
}
async function disableXingqiong() {
    const module = await loadXingqiongModule();
    if (module && module.removeXingqiong) {
        module.removeXingqiong();
    }
}
async function enableDarkClassicBlue() {
    const module = await loadDarkClassicBlueModule();
    if (module && module.initDarkClassicBlue) {
        module.initDarkClassicBlue();
    }
}
async function disableDarkClassicBlue() {
    const module = await loadDarkClassicBlueModule();
    if (module && module.removeDarkClassicBlue) {
        module.removeDarkClassicBlue();
    }
}
async function enableDarkClassicRed() {
    const module = await loadDarkClassicRedModule();
    if (module && module.initDarkClassicRed) {
        module.initDarkClassicRed();
    }
}
async function disableDarkClassicRed() {
    const module = await loadDarkClassicRedModule();
    if (module && module.removeDarkClassicRed) {
        module.removeDarkClassicRed();
    }
}
async function enableDarkRevert() {
    const module = await loadDarkRevertModule();
    if (module && module.initDarkRevert) {
        module.initDarkRevert();
    }
}
async function disableDarkRevert() {
    const module = await loadDarkRevertModule();
    if (module && module.removeDarkRevert) {
        module.removeDarkRevert();
    }
}
async function enableWildness() {
    const module = await loadWildnessModule();
    if (module && module.initWildness) {
        module.initWildness();
    }
}
async function disableWildness() {
    const module = await loadWildnessModule();
    if (module && module.removeWildness) {
        module.removeWildness();
    }
}
async function enableMarsh() {
    const module = await loadMarshModule();
    if (module && module.initMarsh) {
        module.initMarsh();
    }
}
async function disableMarsh() {
    const module = await loadMarshModule();
    if (module && module.removeMarsh) {
        module.removeMarsh();
    }
}
async function enableGleam() {
    const module = await loadGleamModule();
    if (module && module.initGleam) {
        module.initGleam();
    }
}
async function disableGleam() {
    const module = await loadGleamModule();
    if (module && module.removeGleam) {
        module.removeGleam();
    }
}
async function enableYinJi() {
    const module = await loadYinJiModule();
    if (module && module.initYinJi) {
        module.initYinJi();
    }
}
async function disableYinJi() {
    const module = await loadYinJiModule();
    if (module && module.removeYinJi) {
        module.removeYinJi();
    }
}
async function enableJinZun() {
    const module = await loadJinZunModule();
    if (module && module.initJinZun) {
        module.initJinZun();
    }
}
async function disableJinZun() {
    const module = await loadJinZunModule();
    if (module && module.removeJinZun) {
        module.removeJinZun();
    }
}
async function enableBoAi() {
    const module = await loadBoAiModule();
    if (module && module.initBoAi) {
        module.initBoAi();
    }
}
async function disableBoAi() {
    const module = await loadBoAiModule();
    if (module && module.removeBoAi) {
        module.removeBoAi();
    }
}
async function enableWarm() {
    const module = await loadWarmModule();
    if (module && module.initWarm) {
        module.initWarm();
    }
}
async function disableWarm() {
    const module = await loadWarmModule();
    if (module && module.removeWarm) {
        module.removeWarm();
    }
}
async function enableWoodAsh() {
    const module = await loadWoodAshModule();
    if (module && module.initWoodAsh) {
        module.initWoodAsh();
    }
}
async function disableWoodAsh() {
    const module = await loadWoodAshModule();
    if (module && module.removeWoodAsh) {
        module.removeWoodAsh();
    }
}
async function enableAfterglow() {
    const module = await loadAfterglowModule();
    if (module && module.initAfterglow) {
        module.initAfterglow();
    }
}
async function disableAfterglow() {
    const module = await loadAfterglowModule();
    if (module && module.removeAfterglow) {
        module.removeAfterglow();
    }
}
async function handleColorButtonClick(buttonId, enableFunction, disableFunction) {
    const useViewTransition = !!(document.startViewTransition);
    const doSwitch = async () => {
        const currentMode = ThemeMode.getThemeMode();
        const mainGroupId = currentMode === 'light' ? 'lightColorMain' : 'darkColorMain';
        const customGroupId = currentMode === 'light' ? 'lightCustomColor' : 'darkCustomColor';
        const switchTimeGroupId = currentMode === 'light' ? 'lightSwitchTime' : 'darkSwitchTime';
        const switchImgGroupId = currentMode === 'light' ? 'lightSwitchImg' : 'darkSwitchImg';
        const customColorPickId = currentMode === 'light' ? 'CustomColorPickLight' : 'CustomColorPickDark';
        const colorSwitchTimeId = currentMode === 'light' ? 'ColorSwitchTimeLight' : 'ColorSwitchTimeDark';
        const colorSwitchImgId = currentMode === 'light' ? 'ColorSwitchImgLight' : 'ColorSwitchImgDark';
        if (buttonId === 'CustomColorPickLight' || buttonId === 'CustomColorPickDark') {
            const currentState = await getButtonState(buttonId);
            if (currentState) {
                await showColorPanel1();
                return;
            }
        }
        if (buttonId === 'ColorSwitchTimeLight' || buttonId === 'ColorSwitchTimeDark') {
            const customState = await getButtonState(customColorPickId);
            if (!customState) {
                await smartToggleButtonState(customColorPickId);
                const customBtn = document.getElementById(customColorPickId);
                if (customBtn) customBtn.classList.add('active');
                await createColorPicker();
            }
        }
        if (buttonId === 'ColorSwitchImgLight' || buttonId === 'ColorSwitchImgDark') {
            const customState = await getButtonState(customColorPickId);
            if (!customState) {
                await smartToggleButtonState(customColorPickId);
                const customBtn = document.getElementById(customColorPickId);
                if (customBtn) customBtn.classList.add('active');
                await createColorPicker();
            }
        }
        const newState = await smartToggleButtonState(buttonId);
        const button = document.getElementById(buttonId);
        button.classList.toggle('active', newState);
        if (newState) {
            if (enableFunction) {
                await enableFunction();
            }
            if (buttonId === 'CustomColorPickLight' || buttonId === 'CustomColorPickDark') {
                await excluSetting.handleExclusionBatch(customGroupId, buttonId, async (id, state) => {}, async (id) => {
                    if (id !== buttonId) {
                        await handleDisableById(id);
                    }
                });
            } else if (buttonId === 'ColorSwitchTimeLight' || buttonId === 'ColorSwitchTimeDark') {
                await setButtonState(colorSwitchImgId, false);
                const switchImgBtnLight = document.getElementById('ColorSwitchImgLight');
                if (switchImgBtnLight) switchImgBtnLight.classList.remove('active');
                const switchImgBtnDark = document.getElementById('ColorSwitchImgDark');
                if (switchImgBtnDark) switchImgBtnDark.classList.remove('active');
                await disableColorSwitchImg();
                await excluSetting.handleExclusionBatch(switchTimeGroupId, buttonId, async (id, state) => {}, async (id) => {
                    if (id !== buttonId) {
                        await handleDisableById(id);
                    }
                });
            } else if (buttonId === 'ColorSwitchImgLight' || buttonId === 'ColorSwitchImgDark') {
                await setButtonState(colorSwitchTimeId, false);
                const switchBtnLight = document.getElementById('ColorSwitchTimeLight');
                if (switchBtnLight) switchBtnLight.classList.remove('active');
                const switchBtnDark = document.getElementById('ColorSwitchTimeDark');
                if (switchBtnDark) switchBtnDark.classList.remove('active');
                await disableColorSwitchTime();
                await excluSetting.handleExclusionBatch(switchImgGroupId, buttonId, async (id, state) => {}, async (id) => {
                    if (id !== buttonId) {
                        await handleDisableById(id);
                    }
                });
            } else if (buttonId !== 'QYLDarkRevert') {
                await excluSetting.handleExclusionBatch(mainGroupId, buttonId, async (id, state) => {}, async (id) => {
                    await handleDisableById(id);
                });
                await setButtonState(customColorPickId, false);
                await setButtonState(colorSwitchTimeId, false);
                await setButtonState(colorSwitchImgId, false);
                const customBtnLight = document.getElementById('CustomColorPickLight');
                if (customBtnLight) customBtnLight.classList.remove('active');
                const customBtnDark = document.getElementById('CustomColorPickDark');
                if (customBtnDark) customBtnDark.classList.remove('active');
                const switchBtnLight = document.getElementById('ColorSwitchTimeLight');
                if (switchBtnLight) switchBtnLight.classList.remove('active');
                const switchBtnDark = document.getElementById('ColorSwitchTimeDark');
                if (switchBtnDark) switchBtnDark.classList.remove('active');
                const switchImgBtnLight = document.getElementById('ColorSwitchImgLight');
                if (switchImgBtnLight) switchImgBtnLight.classList.remove('active');
                const switchImgBtnDark = document.getElementById('ColorSwitchImgDark');
                if (switchImgBtnDark) switchImgBtnDark.classList.remove('active');
                await destroyColorPicker();
                await disableColorSwitchTime();
                await disableColorSwitchImg();
            }
        } else {
            if (disableFunction) {
                await disableFunction();
            }
        }
        await flushBatchUpdate();
        try {
            const config = await getStorageConfig();
            const mainGroup = currentMode === 'light' ? lightColorMainGroup : darkColorMainGroup;
            const checkCustomColorPickId = currentMode === 'light' ? 'CustomColorPickLight' : 'CustomColorPickDark';
            const checkColorSwitchTimeId = currentMode === 'light' ? 'ColorSwitchTimeLight' : 'ColorSwitchTimeDark';
            const checkColorSwitchImgId = currentMode === 'light' ? 'ColorSwitchImgLight' : 'ColorSwitchImgDark';
            let hasActiveColor = false;
            if (config[checkCustomColorPickId] || config[checkColorSwitchTimeId] || config[checkColorSwitchImgId]) {
                hasActiveColor = true;
            }
            if (!hasActiveColor) {
                for (const colorId of mainGroup) {
                    if (config[colorId]) {
                        hasActiveColor = true;
                        break;
                    }
                }
            }
            if (!hasActiveColor) {
                if (currentMode === 'light') {
                    await enableLightClassicBlue();
                    const lightClassicBtn = document.getElementById('QYLLightClassicBlue');
                    if (lightClassicBtn) {
                        lightClassicBtn.classList.add('active');
                    }
                    await setButtonState('QYLLightClassicBlue', true);
                } else {
                    await enableDarkClassicBlue();
                    const darkClassicBtn = document.getElementById('QYLDarkClassicBlue');
                    if (darkClassicBtn) {
                        darkClassicBtn.classList.add('active');
                    }
                    await setButtonState('QYLDarkClassicBlue', true);
                }
            }
        } catch (error) {
        }
        await updateDarkRevertClass();
    };
    if (useViewTransition) {
        document.startViewTransition(doSwitch);
    } else {
        await doSwitch();
    }
}
async function handleDisableById(id) {
    if (id === 'CustomColorPickLight' || id === 'CustomColorPickDark') {
        await destroyColorPicker();
    } else if (id === 'ColorSwitchTimeLight' || id === 'ColorSwitchTimeDark') {
        await disableColorSwitchTime();
    } else if (id === 'ColorSwitchImgLight' || id === 'ColorSwitchImgDark') {
        await disableColorSwitchImg();
    } else if (id === 'QYLLightClassicBlue') {
        await disableLightClassicBlue();
    } else if (id === 'QYLLightClassicRed') {
        await disableLightClassicRed();
    } else if (id === 'QYLSunset') {
        await disableSunset();
    } else if (id === 'QYLForest') {
        await disableForest();
    } else if (id === 'QYLOcean') {
        await disableOcean();
    } else if (id === 'QYLSugar') {
        await disableSugar();
    } else if (id === 'QYLLavender') {
        await disableLavender();
    } else if (id === 'QYLYunwu') {
        await disableYunwu();
    } else if (id === 'QYLYunyan') {
        await disableYunyan();
    } else if (id === 'QYLYuncang') {
        await disableYuncang();
    } else if (id === 'QYLYunjin') {
        await disableYunjin();
    } else if (id === 'QYLShuanghe') {
        await disableShuanghe();
    } else if (id === 'QYLLime') {
        await disableLime();
    } else if (id === 'QYLHuique') {
        await disableHuique();
    } else if (id === 'QYLAutumn') {
        await disableAutumn();
    } else if (id === 'QYLMemory') {
        await disableMemory();
    } else if (id === 'QYLLake') {
        await disableLake();
    } else if (id === 'QYLXiangxuelan') {
        await disableXiangxuelan();
    } else if (id === 'QYLIvory') {
        await disableIvory();
    } else if (id === 'QYLCoral') {
        await disableCoral();
    } else if (id === 'QYLMint') {
        await disableMint();
    } else if (id === 'QYLAmber') {
        await disableAmber();
    } else if (id === 'QYLCream') {
        await disableCream();
    } else if (id === 'QYLWoodAsh') {
        await disableWoodAsh();
    } else if (id === 'QYLAfterglow') {
        await disableAfterglow();
    } else if (id === 'QYLBiwan') {
        await disableBiwan();
    } else if (id === 'QYLBurgundy') {
        await disableBurgundy();
    } else if (id === 'QYLXuanqing') {
        await disableXuanqing();
    } else if (id === 'QYLMocui') {
        await disableMocui();
    } else if (id === 'QYLHuimu') {
        await disableHuimu();
    } else if (id === 'QYLWumu') {
        await disableWumu();
    } else if (id === 'QYLMidnight') {
        await disableMidnight();
    } else if (id === 'QYLCangming') {
        await disableCangming();
    } else if (id === 'QYLSteam') {
        await disableSteam();
    } else if (id === 'QYLLatte') {
        await disableLatte();
    } else if (id === 'QYLWinter') {
        await disableWinter();
    } else if (id === 'QYLXingqiong') {
        await disableXingqiong();
    } else if (id === 'QYLDarkClassicBlue') {
        await disableDarkClassicBlue();
    } else if (id === 'QYLDarkClassicRed') {
        await disableDarkClassicRed();
    } else if (id === 'QYLDarkRevert') {
        await disableDarkRevert();
    } else if (id === 'QYLWildness') {
        await disableWildness();
    } else if (id === 'QYLMarsh') {
        await disableMarsh();
    } else if (id === 'QYLGleam') {
        await disableGleam();
    } else if (id === 'QYLYinJi') {
        await disableYinJi();
    } else if (id === 'QYLJinZun') {
        await disableJinZun();
    } else if (id === 'QYLBoAi') {
        await disableBoAi();
    } else if (id === 'QYLWarm') {
        await disableWarm();
    }
}
function getColorOptions() {
    const currentMode = ThemeMode.getThemeMode();
    const lightModeOptions = [
        {
            id: 'CustomColorPickLight',
            label: i18n.CustomColorPick
        },
        {
            id: 'ColorSwitchTimeLight',
            label: i18n.ColorSwitchTime
        },
        {
            id: 'ColorSwitchImgLight',
            label: i18n.ColorSwitchImg
        },
        {
            id: 'QYLLightClassicBlue',
            label: i18n.QYLLightClassicBlue
        },
        {
            id: 'QYLLightClassicRed',
            label: i18n.QYLLightClassicRed
        },
        {
            id: 'QYLSunset',
            label: i18n.QYLSunset
        },
        {
            id: 'QYLForest',
            label: i18n.QYLForest
        },
        {
            id: 'QYLOcean',
            label: i18n.QYLOcean
        },
        {
            id: 'QYLSugar',
            label: i18n.QYLSugar
        },
        {
            id: 'QYLLavender',
            label: i18n.QYLLavender
        },
        {
            id: 'QYLYunwu',
            label: i18n.QYLYunwu
        },
        {
            id: 'QYLYunyan',
            label: i18n.QYLYunyan
        },
        {
            id: 'QYLYuncang',
            label: i18n.QYLYuncang
        },
        {
            id: 'QYLYunjin',
            label: i18n.QYLYunjin
        },
        {
            id: 'QYLShuanghe',
            label: i18n.QYLShuanghe
        },
        {
            id: 'QYLLime',
            label: i18n.QYLLime
        },
        {
            id: 'QYLHuique',
            label: i18n.QYLHuique
        },
        {
            id: 'QYLAutumn',
            label: i18n.QYLAutumn
        },
        {
            id: 'QYLMemory',
            label: i18n.QYLMemory
        },
        {
            id: 'QYLLake',
            label: i18n.QYLLake
        },
        {
            id: 'QYLXiangxuelan',
            label: i18n.QYLXiangxuelan
        },
        {
            id: 'QYLIvory',
            label: i18n.QYLIvory
        },
        {
            id: 'QYLCoral',
            label: i18n.QYLCoral
        },
        {
            id: 'QYLMint',
            label: i18n.QYLMint
        },
        {
            id: 'QYLAmber',
            label: i18n.QYLAmber
        },
        {
            id: 'QYLCream',
            label: i18n.QYLCream
        },
        {
            id: 'QYLBiwan',
            label: i18n.QYLBiwan
        },
        {
            id: 'QYLWarm',
            label: i18n.QYLWarm
        },
        {
            id: 'QYLWoodAsh',
            label: i18n.QYLWoodAsh
        },
        {
            id: 'QYLAfterglow',
            label: i18n.QYLAfterglow
        }
    ];
    const darkModeOptions = [
        {
            id: 'CustomColorPickDark',
            label: i18n.CustomColorPick
        },
        {
            id: 'QYLDarkRevert',
            label: i18n.QYLDarkRevert
        },
        {
            id: 'ColorSwitchTimeDark',
            label: i18n.ColorSwitchTime
        },
        {
            id: 'ColorSwitchImgDark',
            label: i18n.ColorSwitchImg
        },
        {
            id: 'QYLDarkClassicBlue',
            label: i18n.QYLDarkClassicBlue
        },
        {
            id: 'QYLDarkClassicRed',
            label: i18n.QYLDarkClassicRed
        },
        {
            id: 'QYLBurgundy',
            label: i18n.QYLBurgundy
        },
        {
            id: 'QYLXuanqing',
            label: i18n.QYLXuanqing
        },
        {
            id: 'QYLMocui',
            label: i18n.QYLMocui
        },
        {
            id: 'QYLHuimu',
            label: i18n.QYLHuimu
        },
        {
            id: 'QYLWumu',
            label: i18n.QYLWumu
        },
        {
            id: 'QYLMidnight',
            label: i18n.QYLMidnight
        },
        {
            id: 'QYLCangming',
            label: i18n.QYLCangming
        },
        {
            id: 'QYLSteam',
            label: i18n.QYLSteam
        },
        {
            id: 'QYLLatte',
            label: i18n.QYLLatte
        },
        {
            id: 'QYLWinter',
            label: i18n.QYLWinter
        },
        {
            id: 'QYLXingqiong',
            label: i18n.QYLXingqiong
        },
        {
            id: 'QYLWildness',
            label: i18n.QYLWildness
        },
        {
            id: 'QYLMarsh',
            label: i18n.QYLMarsh
        },
        {
            id: 'QYLGleam',
            label: i18n.QYLGleam
        },
        {
            id: 'QYLYinJi',
            label: i18n.QYLYinJi
        },
        {
            id: 'QYLJinZun',
            label: i18n.QYLJinZun
        },
        {
            id: 'QYLBoAi',
            label: i18n.QYLBoAi
        }
    ];
    return currentMode === 'dark' ? darkModeOptions : lightModeOptions;
}
async function createColorContent(config = null) {
    const container = document.createElement('div');
    container.className = 'QYL-color-container';
    const options = getColorOptions();
    if (!config) {
        config = await getStorageConfig();
    }
    for (const option of options) {
        const optionElement = document.createElement('div');
        optionElement.className = 'QYL-color-option';
        const currentState = config[option.id] || false;
        optionElement.innerHTML = `
            <button type="button" id="${option.id}" class="QYL-color-button ${currentState ? 'active' : ''}">
                ${option.label}
            </button>
        `;
        const button = optionElement.querySelector(`#${option.id}`);
        button.addEventListener('mousedown', function(e) {
        });
        if (option.id === 'CustomColorPickLight' || option.id === 'CustomColorPickDark') {
            button.addEventListener('contextmenu', async (e) => {
                e.preventDefault(); 
                const currentConfig = await getStorageConfig();
                const currentState = currentConfig[option.id] || false;
                if (currentState) {
                    await showColorPanel1();
                }
            });
        }
        button.addEventListener('click', async () => {
            let enableFunction = null;
            let disableFunction = null;
            if (option.id === 'CustomColorPickLight' || option.id === 'CustomColorPickDark') {
                enableFunction = createColorPicker;
                disableFunction = destroyColorPicker;
            } else if (option.id === 'ColorSwitchTimeLight' || option.id === 'ColorSwitchTimeDark') {
                enableFunction = enableColorSwitchTime;
                disableFunction = disableColorSwitchTime;
            } else if (option.id === 'ColorSwitchImgLight' || option.id === 'ColorSwitchImgDark') {
                enableFunction = enableColorSwitchImg;
                disableFunction = disableColorSwitchImg;
            } else {
                switch (option.id) {
                    case 'QYLLightClassicBlue':
                        enableFunction = enableLightClassicBlue;
                        disableFunction = disableLightClassicBlue;
                        break;
                    case 'QYLLightClassicRed':
                        enableFunction = enableLightClassicRed;
                        disableFunction = disableLightClassicRed;
                        break;
                    case 'QYLSunset':
                        enableFunction = enableSunset;
                        disableFunction = disableSunset;
                        break;
                    case 'QYLForest':
                        enableFunction = enableForest;
                        disableFunction = disableForest;
                        break;
                    case 'QYLOcean':
                        enableFunction = enableOcean;
                        disableFunction = disableOcean;
                        break;
                    case 'QYLSugar':
                        enableFunction = enableSugar;
                        disableFunction = disableSugar;
                        break;
                    case 'QYLLavender':
                        enableFunction = enableLavender;
                        disableFunction = disableLavender;
                        break;
                    case 'QYLYunwu':
                        enableFunction = enableYunwu;
                        disableFunction = disableYunwu;
                        break;
                    case 'QYLYunyan':
                        enableFunction = enableYunyan;
                        disableFunction = disableYunyan;
                        break;
                    case 'QYLYuncang':
                        enableFunction = enableYuncang;
                        disableFunction = disableYuncang;
                        break;
                    case 'QYLYunjin':
                        enableFunction = enableYunjin;
                        disableFunction = disableYunjin;
                        break;
                    case 'QYLShuanghe':
                        enableFunction = enableShuanghe;
                        disableFunction = disableShuanghe;
                        break;
                    case 'QYLLime':
                        enableFunction = enableLime;
                        disableFunction = disableLime;
                        break;
                    case 'QYLHuique':
                        enableFunction = enableHuique;
                        disableFunction = disableHuique;
                        break;
                    case 'QYLAutumn':
                        enableFunction = enableAutumn;
                        disableFunction = disableAutumn;
                        break;
                    case 'QYLMemory':
                        enableFunction = enableMemory;
                        disableFunction = disableMemory;
                        break;
                    case 'QYLLake':
                        enableFunction = enableLake;
                        disableFunction = disableLake;
                        break;
                    case 'QYLXiangxuelan':
                        enableFunction = enableXiangxuelan;
                        disableFunction = disableXiangxuelan;
                        break;
                    case 'QYLIvory':
                        enableFunction = enableIvory;
                        disableFunction = disableIvory;
                        break;
                    case 'QYLCoral':
                        enableFunction = enableCoral;
                        disableFunction = disableCoral;
                        break;
                    case 'QYLMint':
                        enableFunction = enableMint;
                        disableFunction = disableMint;
                        break;
                    case 'QYLAmber':
                        enableFunction = enableAmber;
                        disableFunction = disableAmber;
                        break;
                    case 'QYLCream':
                        enableFunction = enableCream;
                        disableFunction = disableCream;
                        break;
                    case 'QYLBiwan':
                        enableFunction = enableBiwan;
                        disableFunction = disableBiwan;
                        break;
                    case 'QYLBurgundy':
                        enableFunction = enableBurgundy;
                        disableFunction = disableBurgundy;
                        break;
                    case 'QYLXuanqing':
                        enableFunction = enableXuanqing;
                        disableFunction = disableXuanqing;
                        break;
                    case 'QYLMocui':
                        enableFunction = enableMocui;
                        disableFunction = disableMocui;
                        break;
                    case 'QYLHuimu':
                        enableFunction = enableHuimu;
                        disableFunction = disableHuimu;
                        break;
                    case 'QYLWumu':
                        enableFunction = enableWumu;
                        disableFunction = disableWumu;
                        break;
                    case 'QYLMidnight':
                        enableFunction = enableMidnight;
                        disableFunction = disableMidnight;
                        break;
                    case 'QYLCangming':
                        enableFunction = enableCangming;
                        disableFunction = disableCangming;
                        break;
                    case 'QYLSteam':
                        enableFunction = enableSteam;
                        disableFunction = disableSteam;
                        break;
                    case 'QYLLatte':
                        enableFunction = enableLatte;
                        disableFunction = disableLatte;
                        break;
                    case 'QYLWinter':
                        enableFunction = enableWinter;
                        disableFunction = disableWinter;
                        break;
                    case 'QYLXingqiong':
                        enableFunction = enableXingqiong;
                        disableFunction = disableXingqiong;
                        break;
                    case 'QYLDarkClassicBlue':
                        enableFunction = enableDarkClassicBlue;
                        disableFunction = disableDarkClassicBlue;
                        break;
                    case 'QYLDarkClassicRed':
                        enableFunction = enableDarkClassicRed;
                        disableFunction = disableDarkClassicRed;
                        break;
                    case 'QYLDarkRevert':
                        enableFunction = enableDarkRevert;
                        disableFunction = disableDarkRevert;
                        break;
                    case 'QYLWildness':
                        enableFunction = enableWildness;
                        disableFunction = disableWildness;
                        break;
                    case 'QYLMarsh':
                        enableFunction = enableMarsh;
                        disableFunction = disableMarsh;
                        break;
                    case 'QYLGleam':
                        enableFunction = enableGleam;
                        disableFunction = disableGleam;
                        break;
                    case 'QYLYinJi':
                        enableFunction = enableYinJi;
                        disableFunction = disableYinJi;
                        break;
                    case 'QYLJinZun':
                        enableFunction = enableJinZun;
                        disableFunction = disableJinZun;
                        break;
                    case 'QYLBoAi':
                        enableFunction = enableBoAi;
                        disableFunction = disableBoAi;
                        break;
                    case 'QYLWarm':
                        enableFunction = enableWarm;
                        disableFunction = disableWarm;
                        break;
                    case 'QYLWoodAsh':
                        enableFunction = enableWoodAsh;
                        disableFunction = disableWoodAsh;
                        break;
                    case 'QYLAfterglow':
                        enableFunction = enableAfterglow;
                        disableFunction = disableAfterglow;
                        break;
                }
            }
            if (document.startViewTransition) {
                document.startViewTransition(async () => {
                    await handleColorButtonClick(option.id, enableFunction, disableFunction);
                });
            } else {
                await handleColorButtonClick(option.id, enableFunction, disableFunction);
            }
        });
        container.appendChild(optionElement);
    }
    setTimeout(async () => {
        await updateDarkRevertClass();
    }, 0);
    return container;
}
async function initializeColorStates(config = null) {
    const currentMode = ThemeMode.getThemeMode();
    const mainGroup = currentMode === 'light' ? lightColorMainGroup : darkColorMainGroup;
    const customColorPickId = currentMode === 'light' ? 'CustomColorPickLight' : 'CustomColorPickDark';
    const colorSwitchTimeId = currentMode === 'light' ? 'ColorSwitchTimeLight' : 'ColorSwitchTimeDark';
    const colorSwitchImgId = currentMode === 'light' ? 'ColorSwitchImgLight' : 'ColorSwitchImgDark';
    if (!config) {
        config = await getStorageConfig();
    }
    const darkRevertState = config['QYLDarkRevert'] || false;
    if (currentMode === 'dark' && darkRevertState) {
        await enableDarkRevert();
        const button = document.getElementById('QYLDarkRevert');
        if (button) button.classList.toggle('active', darkRevertState);
    }
    await updateDarkRevertClass();
    if (config[colorSwitchTimeId]) {
        if (!config[customColorPickId]) {
            config[customColorPickId] = true;
        }
        await loadColorFromConfig();
        await enableColorSwitchTime();
        return;
    }
    if (config[colorSwitchImgId]) {
        if (!config[customColorPickId]) {
            config[customColorPickId] = true;
        }
        await loadColorFromConfig();
        await enableColorSwitchImg();
        return;
    }
    if (config[customColorPickId]) {
        await loadColorFromConfig();
        return;
    }
    let firstActiveColor = null;
    for (const colorId of mainGroup) {
        const currentState = config[colorId] || false;
        if (currentState) {
            firstActiveColor = colorId;
            break;
        }
    }
    if (firstActiveColor) {
        if (firstActiveColor === 'QYLLightClassicBlue') {
            await enableLightClassicBlue();
        } else if (firstActiveColor === 'QYLLightClassicRed') {
            await enableLightClassicRed();
        } else if (firstActiveColor === 'QYLSunset') {
            await enableSunset();
        } else if (firstActiveColor === 'QYLForest') {
            await enableForest();
        } else if (firstActiveColor === 'QYLOcean') {
            await enableOcean();
        } else if (firstActiveColor === 'QYLSugar') {
            await enableSugar();
        } else if (firstActiveColor === 'QYLLavender') {
            await enableLavender();
        } else if (firstActiveColor === 'QYLYunwu') {
            await enableYunwu();
        } else if (firstActiveColor === 'QYLYunyan') {
            await enableYunyan();
        } else if (firstActiveColor === 'QYLYuncang') {
            await enableYuncang();
        } else if (firstActiveColor === 'QYLYunjin') {
            await enableYunjin();
        } else if (firstActiveColor === 'QYLShuanghe') {
            await enableShuanghe();
        } else if (firstActiveColor === 'QYLLime') {
            await enableLime();
        } else if (firstActiveColor === 'QYLHuique') {
            await enableHuique();
        } else if (firstActiveColor === 'QYLAutumn') {
            await enableAutumn();
        } else if (firstActiveColor === 'QYLMemory') {
            await enableMemory();
        } else if (firstActiveColor === 'QYLLake') {
            await enableLake();
        } else if (firstActiveColor === 'QYLXiangxuelan') {
            await enableXiangxuelan();
        } else if (firstActiveColor === 'QYLIvory') {
            await enableIvory();
        } else if (firstActiveColor === 'QYLCoral') {
            await enableCoral();
        } else if (firstActiveColor === 'QYLMint') {
            await enableMint();
        } else if (firstActiveColor === 'QYLAmber') {
            await enableAmber();
        } else if (firstActiveColor === 'QYLCream') {
            await enableCream();
        } else if (firstActiveColor === 'QYLBiwan') {
            await enableBiwan();
        } else if (firstActiveColor === 'QYLBurgundy') {
            await enableBurgundy();
        } else if (firstActiveColor === 'QYLXuanqing') {
            await enableXuanqing();
        } else if (firstActiveColor === 'QYLMocui') {
            await enableMocui();
        } else if (firstActiveColor === 'QYLHuimu') {
            await enableHuimu();
        } else if (firstActiveColor === 'QYLWumu') {
            await enableWumu();
        } else if (firstActiveColor === 'QYLMidnight') {
            await enableMidnight();
        } else if (firstActiveColor === 'QYLCangming') {
            await enableCangming();
        } else if (firstActiveColor === 'QYLSteam') {
            await enableSteam();
        } else if (firstActiveColor === 'QYLLatte') {
            await enableLatte();
        } else if (firstActiveColor === 'QYLWinter') {
            await enableWinter();
        } else if (firstActiveColor === 'QYLXingqiong') {
            await enableXingqiong();
        } else if (firstActiveColor === 'QYLDarkClassicBlue') {
            await enableDarkClassicBlue();
        } else if (firstActiveColor === 'QYLDarkClassicRed') {
            await enableDarkClassicRed();
        } else if (firstActiveColor === 'QYLWildness') {
            await enableWildness();
        } else if (firstActiveColor === 'QYLMarsh') {
            await enableMarsh();
        } else if (firstActiveColor === 'QYLGleam') {
            await enableGleam();
        } else if (firstActiveColor === 'QYLYinJi') {
            await enableYinJi();
        } else if (firstActiveColor === 'QYLJinZun') {
            await enableJinZun();
        } else if (firstActiveColor === 'QYLBoAi') {
            await enableBoAi();
        } else if (firstActiveColor === 'QYLWarm') {
            await enableWarm();
        } else if (firstActiveColor === 'QYLWoodAsh') {
            await enableWoodAsh();
        } else if (firstActiveColor === 'QYLAfterglow') {
            await enableAfterglow();
        }
    } else {
        if (currentMode === 'light') {
            await enableLightClassicBlue();
            const lightClassicBtn = document.getElementById('QYLLightClassicBlue');
            if (lightClassicBtn) {
                lightClassicBtn.classList.add('active');
            }
            await setButtonState('QYLLightClassicBlue', true);
        } else {
            await enableDarkClassicBlue();
            const darkClassicBtn = document.getElementById('QYLDarkClassicBlue');
            if (darkClassicBtn) {
                darkClassicBtn.classList.add('active');
            }
            await setButtonState('QYLDarkClassicBlue', true);
        }
    }
}
function updateColorReverseFromHex(hexColor) {
    try {
        if (typeof Color === 'undefined') {
            return;
        }
        const colorObj = new Color(hexColor);
        const oklchColor = colorObj.to('oklch');
        const lightness = oklchColor.l || 0;
        const currentMode = ThemeMode.getThemeMode();
        let threshold, reverseValue;
        if (currentMode === 'dark') {
            threshold = 0.79;
            reverseValue = '0.2';
        } else {
            threshold = 0.74;
            reverseValue = '0.3';
        }
        if (lightness > threshold) {
            document.documentElement.style.setProperty('--QYL-color-reverse', reverseValue);
        } else {
            document.documentElement.style.removeProperty('--QYL-color-reverse');
        }
    } catch (error) {
        document.documentElement.style.removeProperty('--QYL-color-reverse');
    }
}
async function loadColorFromConfig() {
    const module = await loadColorModule1();
    if (module && module.customColor) {
        try {
            const colorConfig = await module.customColor.loadFromConfig();
            document.documentElement.style.setProperty('--QYL-custom-primary-main', colorConfig.hue.toString() + 'deg');
            document.documentElement.style.setProperty('--QYL-custom-primary-saturate', colorConfig.saturation.toString());
            document.documentElement.style.setProperty('--QYL-custom-primary-brightness', colorConfig.brightness.toString());
            document.documentElement.classList.add('QYLCustomColor');
        } catch (error) {
        }
    }
    try {
        const config = await getStorageConfig();
        const currentMode = ThemeMode.getThemeMode();
        const modeSuffix = currentMode === 'dark' ? 'Dark' : 'Light';
        const colorPickValue = config[`CustomMainColorPick${modeSuffix}`];
        if (colorPickValue) {
            document.documentElement.style.setProperty('--QYL-custom-primary-pick', colorPickValue);
            document.documentElement.classList.add('QYLCustomColorPick');
            updateColorReverseFromHex(colorPickValue);
        }
    } catch (error) {
    }
}
async function loadDarkRevertModule() {
    if (!darkRevertModule) {
        try {
            darkRevertModule = await import('../color/DarkRevert.js');
        } catch (error) {
        }
    }
    return darkRevertModule;
}
async function loadWildnessModule() {
    if (!wildnessModule) {
        try {
            wildnessModule = await import('../color/Wildness.js');
        } catch (error) {
        }
    }
    return wildnessModule;
}
async function loadMarshModule() {
    if (!marshModule) {
        try {
            marshModule = await import('../color/Marsh.js');
        } catch (error) {
        }
    }
    return marshModule;
}
async function loadGleamModule() {
    if (!gleamModule) {
        try {
            gleamModule = await import('../color/Gleam.js');
        } catch (error) {
        }
    }
    return gleamModule;
}
async function loadYinJiModule() {
    if (!yinJiModule) {
        try {
            yinJiModule = await import('../color/YinJi.js');
        } catch (error) {
        }
    }
    return yinJiModule;
}
async function loadJinZunModule() {
    if (!jinZunModule) {
        try {
            jinZunModule = await import('../color/JinZun.js');
        } catch (error) {
        }
    }
    return jinZunModule;
}
async function loadBoAiModule() {
    if (!boAiModule) {
        try {
            boAiModule = await import('../color/BoAi.js');
        } catch (error) {
        }
    }
    return boAiModule;
}
async function loadWarmModule() {
    if (!warmModule) {
        try {
            warmModule = await import('../color/Warm.js');
        } catch (error) {
        }
    }
    return warmModule;
}
async function loadWoodAshModule() {
    if (!woodAshModule) {
        try {
            woodAshModule = await import('../color/WoodAsh.js');
        } catch (error) {
        }
    }
    return woodAshModule;
}
async function loadAfterglowModule() {
    if (!afterglowModule) {
        try {
            afterglowModule = await import('../color/Afterglow.js');
        } catch (error) {
        }
    }
    return afterglowModule;
}
async function updateDarkRevertClass() {
    const currentMode = ThemeMode.getThemeMode();
    if (currentMode === 'dark') {
        const config = await getStorageConfig();
        const customColorPickDarkState = config['CustomColorPickDark'] || false;
        const darkRevertButton = document.getElementById('QYLDarkRevert');
        if (darkRevertButton) {
            if (customColorPickDarkState) {
                darkRevertButton.classList.remove('QYLDarkRevertNone');
            } else {
                darkRevertButton.classList.add('QYLDarkRevertNone');
            }
        }
    }
}
export { getColorOptions, createColorContent, initializeColorStates };
