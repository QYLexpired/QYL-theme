(function () {
  const MAX_RETRY = 15;
  const RETRY_INTERVAL = 100;
  let retryCount = 0;
  let dockBottom = null;
  let dockLeft = null;
  let dockRight = null;
  let updateTimeout;
  function debouncedUpdateDockFloatVar() {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(updateDockFloatVar, 16); 
  }
  function updateDockFloatVar() {
    if (document.body.classList.contains('QYLmobile')) return;
    if (!dockBottom) return;
    const vars = {};
    const hasNone = dockBottom.classList.contains('fn__none');
    vars['--QYL-dock-float-b'] = hasNone ? '6px' : '42px';
    vars['--QYL-dock-float-b-0'] = hasNone ? '0px' : '42px';
    if (dockLeft) {
      const hasNoneL = dockLeft.classList.contains('fn__none');
      vars['--QYL-dock-float-l'] = hasNoneL ? '6px' : '42px';
      vars['--QYL-dock-float-l-0'] = hasNoneL ? '0px' : '42px';
    }
    if (dockRight) {
      const hasNoneR = dockRight.classList.contains('fn__none');
      vars['--QYL-dock-float-r'] = hasNoneR ? '6px' : '42px';
      vars['--QYL-dock-float-r-0'] = hasNoneR ? '0px' : '42px';
    }
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
  function observeClassChange(target) {
    if (!target) return;
    const observer = new MutationObserver(debouncedUpdateDockFloatVar);
    observer.observe(target, { attributes: true, attributeFilter: ['class'] });
  }
  function tryFindDockBottom() {
    dockBottom = document.getElementById('dockBottom');
    dockLeft = document.getElementById('dockLeft');
    dockRight = document.getElementById('dockRight');
    if (dockBottom && dockLeft && dockRight) {
      updateDockFloatVar();
      observeClassChange(dockBottom);
      observeClassChange(dockLeft);
      observeClassChange(dockRight);
    } else if (retryCount < MAX_RETRY) {
      retryCount++;
      setTimeout(tryFindDockBottom, RETRY_INTERVAL);
    }
  }
  tryFindDockBottom();
  let dockL = null;
  let toolbar = null;
  let retryDockLCount = 0;
  const MAX_DOCKL_RETRY = 15;
  const RETRY_DOCKL_INTERVAL = 100;
  function handleDockLFloatChange() {
    if (!dockL || !toolbar || !dockLeft) return;
    const hasFloat = dockL.classList.contains('layout--float');
    const hasTransform = dockL.style.transform && dockL.style.transform !== '';
    const shouldHide = hasFloat && !hasTransform;
    if (shouldHide && !toolbar.classList.contains('QYLtoolbarlefthidden')) {
      toolbar.classList.add('QYLtoolbarlefthidden');
    } else if (!shouldHide && toolbar.classList.contains('QYLtoolbarlefthidden')) {
      toolbar.classList.remove('QYLtoolbarlefthidden');
    }
    if (shouldHide && !dockLeft.classList.contains('QYLDockLeftHidden')) {
      dockLeft.classList.add('QYLDockLeftHidden');
    } else if (!shouldHide && dockLeft.classList.contains('QYLDockLeftHidden')) {
      dockLeft.classList.remove('QYLDockLeftHidden');
    }
    if (hasFloat && !dockLeft.classList.contains('QYLDockLeftFloat')) {
      dockLeft.classList.add('QYLDockLeftFloat');
    } else if (!hasFloat && dockLeft.classList.contains('QYLDockLeftFloat')) {
      dockLeft.classList.remove('QYLDockLeftFloat');
    }
  }
  function observeDockLClassChange(target) {
    if (!target) return;
    const observer = new MutationObserver(handleDockLFloatChange);
    observer.observe(target, { attributes: true, attributeFilter: ['class', 'style'] });
  }
  function tryFindDockLAndToolbar() {
    dockL = document.querySelector('.layout__dockl');
    toolbar = document.getElementById('toolbar');
    if (dockL && toolbar) {
      handleDockLFloatChange();
      observeDockLClassChange(dockL);
    } else if (retryDockLCount < MAX_DOCKL_RETRY) {
      retryDockLCount++;
      setTimeout(tryFindDockLAndToolbar, RETRY_DOCKL_INTERVAL);
    }
  }
  tryFindDockLAndToolbar();
  let dockR = null;
  let retryDockRCount = 0;
  const MAX_DOCKR_RETRY = 15;
  const RETRY_DOCKR_INTERVAL = 100;
  function handleDockRFloatChange() {
    if (!dockR || !toolbar || !dockRight) return;
    const hasFloat = dockR.classList.contains('layout--float');
    const hasTransform = dockR.style.transform && dockR.style.transform !== '';
    const shouldHide = hasFloat && !hasTransform;
    if (shouldHide && !toolbar.classList.contains('QYLtoolbarrighthidden')) {
      toolbar.classList.add('QYLtoolbarrighthidden');
    } else if (!shouldHide && toolbar.classList.contains('QYLtoolbarrighthidden')) {
      toolbar.classList.remove('QYLtoolbarrighthidden');
    }
    if (shouldHide && !dockRight.classList.contains('QYLDockRightHidden')) {
      dockRight.classList.add('QYLDockRightHidden');
    } else if (!shouldHide && dockRight.classList.contains('QYLDockRightHidden')) {
      dockRight.classList.remove('QYLDockRightHidden');
    }
  }
  function observeDockRClassChange(target) {
    if (!target) return;
    const observer = new MutationObserver(handleDockRFloatChange);
    observer.observe(target, { attributes: true, attributeFilter: ['class', 'style'] });
  }
  function tryFindDockRAndToolbar() {
    dockR = document.querySelector('.layout__dockr');
    if (dockR && toolbar) {
      handleDockRFloatChange();
      observeDockRClassChange(dockR);
    } else if (retryDockRCount < MAX_DOCKR_RETRY) {
      retryDockRCount++;
      setTimeout(tryFindDockRAndToolbar, RETRY_DOCKR_INTERVAL);
    }
  }
  tryFindDockRAndToolbar();
})();
