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
  let barWorkspace = null;
  let retryDockLCount = 0;
  const MAX_DOCKL_RETRY = 15;
  const RETRY_DOCKL_INTERVAL = 100;
  function handleDockLFloatChange() {
    if (!dockL || !barWorkspace) return;
    const hasFloat = dockL.classList.contains('layout--float');
    const hasTransform = dockL.style.transform && dockL.style.transform !== '';
    const shouldHide = hasFloat && !hasTransform;
    if (shouldHide && !barWorkspace.classList.contains('QYLbarWorkspaceFloatHidden')) {
      barWorkspace.classList.add('QYLbarWorkspaceFloatHidden');
    } else if (!shouldHide && barWorkspace.classList.contains('QYLbarWorkspaceFloatHidden')) {
      barWorkspace.classList.remove('QYLbarWorkspaceFloatHidden');
    }
  }
  function observeDockLClassChange(target) {
    if (!target) return;
    const observer = new MutationObserver(handleDockLFloatChange);
    observer.observe(target, { attributes: true, attributeFilter: ['class', 'style'] });
  }
  function tryFindDockLAndBarWorkspace() {
    dockL = document.querySelector('.layout__dockl');
    barWorkspace = document.getElementById('barWorkspace');
    if (dockL && barWorkspace) {
      handleDockLFloatChange();
      observeDockLClassChange(dockL);
    } else if (retryDockLCount < MAX_DOCKL_RETRY) {
      retryDockLCount++;
      setTimeout(tryFindDockLAndBarWorkspace, RETRY_DOCKL_INTERVAL);
    }
  }
  tryFindDockLAndBarWorkspace();
  let dockR = null;
  let closeWindow = null;
  let retryCloseWindowCount = 0;
  const MAX_CLOSEWINDOW_RETRY = 15;
  const RETRY_CLOSEWINDOW_INTERVAL = 100;
  function handleDockRFloatChange() {
    if (!dockR || !closeWindow) return;
    const hasFloat = dockR.classList.contains('layout--float');
    const hasTransform = dockR.style.transform && dockR.style.transform !== '';
    const shouldHide = hasFloat && !hasTransform;
    if (shouldHide && !closeWindow.classList.contains('QYLCloseWindowHidden')) {
      closeWindow.classList.add('QYLCloseWindowHidden');
    } else if (!shouldHide && closeWindow.classList.contains('QYLCloseWindowHidden')) {
      closeWindow.classList.remove('QYLCloseWindowHidden');
    }
  }
  function observeDockRClassChange(target) {
    if (!target) return;
    const observer = new MutationObserver(handleDockRFloatChange);
    observer.observe(target, { attributes: true, attributeFilter: ['class', 'style'] });
  }
  function tryFindDockRAndCloseWindow() {
    dockR = document.querySelector('.layout__dockr');
    closeWindow = document.getElementById('closeWindow');
    if (dockR && closeWindow) {
      handleDockRFloatChange();
      observeDockRClassChange(dockR);
    } else if (retryCloseWindowCount < MAX_CLOSEWINDOW_RETRY) {
      retryCloseWindowCount++;
      setTimeout(tryFindDockRAndCloseWindow, RETRY_CLOSEWINDOW_INTERVAL);
    }
  }
  tryFindDockRAndCloseWindow();
})();
