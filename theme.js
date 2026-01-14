import('./index.js');
(() => {
  if (typeof window !== 'undefined' && window.process && window.require) {
    try {
      const { BrowserWindow, process } = require('@electron/remote');
      if (process.platform === 'darwin') {
        BrowserWindow.getFocusedWindow()?.setWindowButtonPosition({ x: 10, y: 12 });
      }
    } catch (e) {
    }
  }
})();
(() => {
  function updateDestroyTheme() {
    const html = document.documentElement;
    if (
      html.getAttribute('data-light-theme') === 'QYL-theme' &&
      html.getAttribute('data-dark-theme') === 'QYL-theme'
    ) {
      window.destroyTheme = () => {
        document.getElementById('QYLSettingsWindow')?.remove();
        document.querySelector('.QYLColorPickContainer')?.remove();
        html.style.removeProperty('--QYL-custom-primary-main');
        html.style.removeProperty('--QYL-custom-primary-saturate');
        html.style.removeProperty('--QYL-custom-primary-brightness');
        html.style.removeProperty('--QYL-custom-primary-pick');
        html.classList.remove('QYLCustomColor');
        html.classList.remove('QYLCustomColorPick');
        html.classList.remove('QYLDarkRevert');
        document.getElementById('QYLButton')?.classList.remove('QYLbuttonActive');
        import('./script/QYLSettings/QYLSettingsWindow.js').then(module => {
          if (typeof module.cleanupCommonMenuListener === 'function') {
            module.cleanupCommonMenuListener();
          }
        });
        import('./script/color/ColorSwitchTime.js').then(module => {
          if (typeof module.stopColorSwitch === 'function') {
            module.stopColorSwitch();
          }
        });
        import('./script/color/ColorSwitchImg.js').then(module => {
          if (typeof module.stopColorSwitchImg === 'function') {
            module.stopColorSwitchImg();
          }
        });
      };
    } else {
      delete window.destroyTheme;
    }
  }
  updateDestroyTheme();
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === 'attributes' &&
        (
          mutation.attributeName === 'data-light-theme' ||
          mutation.attributeName === 'data-dark-theme'
        )
      ) {
        updateDestroyTheme();
        break;
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true });
  document.addEventListener('click', function (e) {
    if (e.button !== 0) return;
    const menuItem = e.target.closest('.b3-menu__item');
    if (!menuItem) return;
    let parent = menuItem.parentElement;
    while (parent) {
      if (parent.matches && parent.matches('[data-name="barmode"]')) {
        if (document.startViewTransition) {
          document.startViewTransition(() => {
          });
        }
        break;
      }
      parent = parent.parentElement;
    }
  }, true);
})();
import('./script/QYLSettings/Color.js').then(module => {
  const { initializeColorStates } = module;
  import('./script/basic/GetStorage.js').then(storageModule => {
    const { clearConfigCache } = storageModule;
    function refreshColorVarsOnThemeChange() {
      const observer = new MutationObserver(async () => {
        clearConfigCache();
        import('./script/color/ColorSwitchTime.js').then(timeModule => {
          if (typeof timeModule.stopColorSwitch === 'function') {
            timeModule.stopColorSwitch();
          }
        });
        import('./script/color/ColorSwitchImg.js').then(imgModule => {
          if (typeof imgModule.stopColorSwitchImg === 'function') {
            imgModule.stopColorSwitchImg();
          }
        });
        await initializeColorStates();
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme-mode']
      });
    }
    refreshColorVarsOnThemeChange();
  });
});
window.addEventListener('beforeunload', () => {
  import('./script/QYLSettings/QYLSettingsWindow.js').then(module => {
    if (typeof module.cleanupCommonMenuListener === 'function') {
      module.cleanupCommonMenuListener();
    }
  });
});
