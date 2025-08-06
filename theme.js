import('./index.js');
(() => {
  function updateDestroyTheme() {
    const html = document.documentElement;
    if (
      html.getAttribute('data-light-theme') === 'QYL' &&
      html.getAttribute('data-dark-theme') === 'QYL'
    ) {
      window.destroyTheme = () => {
        document.getElementById('QYLSettingsWindow')?.remove();
        document.querySelector('.QYLColorPickContainer')?.remove();
        html.style.removeProperty('--QYL-custom-primary-main');
        html.style.removeProperty('--QYL-custom-primary-saturate');
        html.style.removeProperty('--QYL-custom-primary-brightness');
        html.classList.remove('QYLCustomColor');
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
  function refreshColorVarsOnThemeChange() {
    const observer = new MutationObserver(() => {
      initializeColorStates();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme-mode']
    });
  }
  refreshColorVarsOnThemeChange();
});
window.addEventListener('beforeunload', () => {
  import('./script/QYLSettings/QYLSettingsWindow.js').then(module => {
    if (typeof module.cleanupCommonMenuListener === 'function') {
      module.cleanupCommonMenuListener();
    }
  });
});
