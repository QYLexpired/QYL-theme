import ThemeMode from '../basic/ThemeMode.js';
import i18n from '../../i18n/i18n.js';
import { toggleButtonState, getButtonState, setButtonState } from '../basic/Storage.js';
import { getStorageItem } from '../basic/GetStorage.js';
import excluSetting from './ExcluSetting.js';
import bindSetting from './BindSettings.js';
// 注册light模式下的颜色互斥组
const lightColorGroup = [
    'CustomColorPick',
    'QYLSunset',
    'QYLForest',
    'QYLOcean',
    'QYLSugar',
    'QYLLavender',
    'QYLYunwu',
    'QYLYunyan',
    'QYLYuncang',
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
    'QYLBiwan'
];
// 注册dark模式下的颜色互斥组
const darkColorGroup = [
    'CustomColorPick',
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
    'QYLXingqiong'
];
// 注册互斥组
excluSetting.registerGroup('lightColors', lightColorGroup);
excluSetting.registerGroup('darkColors', darkColorGroup);
let colorModule1 = null;
let sunsetModule = null;
let forestModule = null;
let oceanModule = null;
let sugarModule = null;
let lavenderModule = null;
let yunwuModule = null;
let yunyanModule = null;
let yuncangModule = null;
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
    if (module && module.default) {
        await module.default.init();
    }
}
async function disableColor1() {
    const module = await loadColorModule1();
    if (module && module.default) {
        module.default.destroy();
    }
}
async function showColorPanel1() {
    const module = await loadColorModule1();
    if (module && module.default) {
        if (module.default.isFeatureEnabled()) {
            await module.default.togglePanel();
        } else {
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
            await module.customColor.createColorPicker(
                async (colorData) => {
                    if (colorData.type === 'saturation') {
                        const currentHue = module.customColor.getColor()?.hue || colorConfig.hue;
                        document.documentElement.style.setProperty('--QYL-custom-primary-saturate', colorData.saturation.toString());
                        await module.customColor.saveToConfig(currentHue, colorData.saturation);
                    } else {
                        const currentSaturation = module.customColor.getColor()?.saturation || colorConfig.saturation;
                        if (colorData && colorData.hue !== undefined) {
                            document.documentElement.style.setProperty('--QYL-custom-primary-main', colorData.hue.toString() + 'deg');
                            document.documentElement.style.setProperty('--QYL-custom-primary-saturate', currentSaturation.toString());
                            await module.customColor.saveToConfig(colorData.hue, currentSaturation);
                        }
                    }
                },
                colorConfig.hue,
                colorConfig.saturation
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
// 通用的颜色按钮处理函数
async function handleColorButtonClick(buttonId, enableFunction, disableFunction) {
    const currentMode = ThemeMode.getThemeMode();
    const groupId = currentMode === 'light' ? 'lightColors' : 'darkColors';
    const newState = await toggleButtonState(buttonId);
    const button = document.getElementById(buttonId);
    button.classList.toggle('active', newState);
    if (newState) {
        // 启用当前颜色，禁用其他颜色
        await excluSetting.handleExclusion(groupId, buttonId, 
            async (id, state) => {
                await setButtonState(id, state);
                const btn = document.getElementById(id);
                if (btn) btn.classList.toggle('active', state);
            },
            async (id) => {
                // 根据ID调用对应的禁用函数
                if (id === 'CustomColorPick') {
                    await destroyColorPicker();
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
                }
            }
        );
        // 启用当前颜色
        if (enableFunction) {
            await enableFunction();
        }
    } else {
        // 禁用当前颜色
        if (disableFunction) {
            await disableFunction();
        }
    }
}
function getColorOptions() {
    const currentMode = ThemeMode.getThemeMode();
    const lightModeOptions = [
        {
            id: 'CustomColorPick',
            label: i18n.CustomColorPick
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
            id: 'QYLBiwan',
            label: i18n.QYLBiwan
        }
    ];
    const darkModeOptions = [
        {
            id: 'CustomColorPick',
            label: i18n.CustomColorPick
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
        }
    ];
    return currentMode === 'dark' ? darkModeOptions : lightModeOptions;
}
async function createColorContent() {
    const container = document.createElement('div');
    container.className = 'QYL-color-container';
    const options = getColorOptions();
    for (const option of options) {
        const optionElement = document.createElement('div');
        optionElement.className = 'QYL-color-option';
        const currentState = await getStorageItem(option.id, false);
        optionElement.innerHTML = `
            <button type="button" id="${option.id}" class="QYL-color-button ${currentState ? 'active' : ''}">
                ${option.label}
            </button>
        `;
        const button = optionElement.querySelector(`#${option.id}`);
        // 为CustomColorPick添加右键菜单事件
        if (option.id === 'CustomColorPick') {
            button.addEventListener('contextmenu', async (e) => {
                e.preventDefault(); 
                const currentState = await getStorageItem(option.id, false);
                if (currentState) {
                    await showColorPanel1();
                }
            });
        }
        // 为所有按钮添加点击事件，使用通用处理函数
        button.addEventListener('click', async () => {
            // 根据按钮ID确定对应的启用和禁用函数
            let enableFunction = null;
            let disableFunction = null;
            switch (option.id) {
                case 'CustomColorPick':
                    enableFunction = createColorPicker;
                    disableFunction = destroyColorPicker;
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
            }
            // 使用通用处理函数处理点击事件
            await handleColorButtonClick(option.id, enableFunction, disableFunction);
        });
        container.appendChild(optionElement);
    }
    return container;
}
async function initializeColorStates() {
    const currentMode = ThemeMode.getThemeMode();
    const groupId = currentMode === 'light' ? 'lightColors' : 'darkColors';
    const group = currentMode === 'light' ? lightColorGroup : darkColorGroup;
    // 找到当前模式下第一个激活的颜色选项
    let firstActiveColor = null;
    for (const colorId of group) {
        const currentState = await getStorageItem(colorId, false);
        if (currentState) {
            firstActiveColor = colorId;
            break;
        }
    }
    // 如果找到了激活的颜色，启用它并禁用其他颜色
    if (firstActiveColor) {
        await excluSetting.handleExclusion(groupId, firstActiveColor, 
            async (id, state) => {
                await setButtonState(id, state);
            },
            async (id) => {
                // 根据ID调用对应的禁用函数
                if (id === 'CustomColorPick') {
                    await destroyColorPicker();
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
                }
            }
        );
        // 启用第一个激活的颜色
        if (firstActiveColor === 'CustomColorPick') {
            await loadColorFromConfig();
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
        }
    }
    // 添加主题模式变化监听器
    ThemeMode.addModeChangeListener(async (newMode) => {
        const newGroupId = newMode === 'light' ? 'lightColors' : 'darkColors';
        const newGroup = newMode === 'light' ? lightColorGroup : darkColorGroup;
        // 找到新模式下第一个激活的颜色选项
        let newFirstActiveColor = null;
        for (const colorId of newGroup) {
            const currentState = await getStorageItem(colorId, false);
            if (currentState) {
                newFirstActiveColor = colorId;
                break;
            }
        }
        // 如果找到了激活的颜色，启用它并禁用其他颜色
        if (newFirstActiveColor) {
            await excluSetting.handleExclusion(newGroupId, newFirstActiveColor, 
                async (id, state) => {
                    await setButtonState(id, state);
                },
                async (id) => {
                    // 根据ID调用对应的禁用函数
                    if (id === 'CustomColorPick') {
                        await destroyColorPicker();
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
                    }
                }
            );
            // 启用第一个激活的颜色
            if (newFirstActiveColor === 'CustomColorPick') {
                await loadColorFromConfig();
            } else if (newFirstActiveColor === 'QYLSunset') {
                await enableSunset();
            } else if (newFirstActiveColor === 'QYLForest') {
                await enableForest();
            } else if (newFirstActiveColor === 'QYLOcean') {
                await enableOcean();
            } else if (newFirstActiveColor === 'QYLSugar') {
                await enableSugar();
            } else if (newFirstActiveColor === 'QYLLavender') {
                await enableLavender();
            } else if (newFirstActiveColor === 'QYLYunwu') {
                await enableYunwu();
            } else if (newFirstActiveColor === 'QYLYunyan') {
                await enableYunyan();
            } else if (newFirstActiveColor === 'QYLYuncang') {
                await enableYuncang();
            } else if (newFirstActiveColor === 'QYLShuanghe') {
                await enableShuanghe();
            } else if (newFirstActiveColor === 'QYLLime') {
                await enableLime();
            } else if (newFirstActiveColor === 'QYLHuique') {
                await enableHuique();
            } else if (newFirstActiveColor === 'QYLAutumn') {
                await enableAutumn();
            } else if (newFirstActiveColor === 'QYLMemory') {
                await enableMemory();
            } else if (newFirstActiveColor === 'QYLLake') {
                await enableLake();
            } else if (newFirstActiveColor === 'QYLXiangxuelan') {
                await enableXiangxuelan();
            } else if (newFirstActiveColor === 'QYLIvory') {
                await enableIvory();
            } else if (newFirstActiveColor === 'QYLCoral') {
                await enableCoral();
            } else if (newFirstActiveColor === 'QYLMint') {
                await enableMint();
            } else if (newFirstActiveColor === 'QYLAmber') {
                await enableAmber();
            } else if (newFirstActiveColor === 'QYLBiwan') {
                await enableBiwan();
            } else if (newFirstActiveColor === 'QYLBurgundy') {
                await enableBurgundy();
            } else if (newFirstActiveColor === 'QYLXuanqing') {
                await enableXuanqing();
            } else if (newFirstActiveColor === 'QYLMocui') {
                await enableMocui();
            } else if (newFirstActiveColor === 'QYLHuimu') {
                await enableHuimu();
            } else if (newFirstActiveColor === 'QYLWumu') {
                await enableWumu();
            } else if (newFirstActiveColor === 'QYLMidnight') {
                await enableMidnight();
            } else if (newFirstActiveColor === 'QYLCangming') {
                await enableCangming();
            } else if (newFirstActiveColor === 'QYLSteam') {
                await enableSteam();
            } else if (newFirstActiveColor === 'QYLLatte') {
                await enableLatte();
            } else if (newFirstActiveColor === 'QYLWinter') {
                await enableWinter();
            } else if (newFirstActiveColor === 'QYLXingqiong') {
                await enableXingqiong();
            }
        }
    });
}
async function loadColorFromConfig() {
    const module = await loadColorModule1();
    if (module && module.customColor) {
        try {
            const colorConfig = await module.customColor.loadFromConfig();
            document.documentElement.style.setProperty('--QYL-custom-primary-main', colorConfig.hue.toString() + 'deg');
            document.documentElement.style.setProperty('--QYL-custom-primary-saturate', colorConfig.saturation.toString());
        } catch (error) {
        }
    }
}
export { getColorOptions, createColorContent, initializeColorStates };
