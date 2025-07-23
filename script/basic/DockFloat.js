(function () {
  const MAX_RETRY = 15;
  const RETRY_INTERVAL = 100;
  let retryCount = 0;
  let dockBottom = null;
  let dockLeft = null;
  let dockRight = null;
  function updateDockFloatVar() {
    if (document.body.classList.contains('QYLmobile')) return;
    if (!dockBottom) return;
    const hasNone = dockBottom.classList.contains('fn__none');
    document.documentElement.style.setProperty('--QYL-dock-float-b', hasNone ? '6px' : '42px');
    document.documentElement.style.setProperty('--QYL-dock-float-b-0', hasNone ? '0px' : '42px');
    if (dockLeft) {
      const hasNoneL = dockLeft.classList.contains('fn__none');
      document.documentElement.style.setProperty('--QYL-dock-float-l', hasNoneL ? '6px' : '42px');
      document.documentElement.style.setProperty('--QYL-dock-float-l-0', hasNoneL ? '0px' : '42px');
    }
    if (dockRight) {
      const hasNoneR = dockRight.classList.contains('fn__none');
      document.documentElement.style.setProperty('--QYL-dock-float-r', hasNoneR ? '6px' : '42px');
      document.documentElement.style.setProperty('--QYL-dock-float-r-0', hasNoneR ? '0px' : '42px');
    }
  }
  function observeClassChange(target) {
    if (!target) return;
    const observer = new MutationObserver(updateDockFloatVar);
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
    if (hasFloat && !hasTransform) {
      barWorkspace.classList.add('QYLbarWorkspaceFloatHidden');
    } else {
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
      const styleObserver = new MutationObserver(handleDockLFloatChange);
      styleObserver.observe(dockL, { attributes: true, attributeFilter: ['style'] });
    } else if (retryDockLCount < MAX_DOCKL_RETRY) {
      retryDockLCount++;
      setTimeout(tryFindDockLAndBarWorkspace, RETRY_DOCKL_INTERVAL);
    }
  }
  tryFindDockLAndBarWorkspace();
})();
