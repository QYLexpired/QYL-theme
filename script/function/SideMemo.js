let rootObserver = null;
const wysiwygObserverMap = new WeakMap();
let enabled = false;
let observeTimeout = null;
function renderSideMemo(wysiwyg) {
    wysiwyg.querySelectorAll('.QYLmemoBlock').forEach(block => {
        block.classList.remove('QYLmemoBlock');
    });
    const observer = wysiwygObserverMap.get(wysiwyg);
    if (observer) observer.disconnect();
    wysiwyg.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => div.remove());
    const memoElements = wysiwyg.querySelectorAll('[data-inline-memo-content]');
    const blockMemoMap = new Map();
    memoElements.forEach(memoEl => {
        let block = memoEl.closest('[data-node-id]');
        if (!block || !wysiwyg.contains(block)) return;
        block.classList.add('QYLmemoBlock');
        const memoContent = memoEl.getAttribute('data-inline-memo-content');
        if (!memoContent) return;
        if (!blockMemoMap.has(block)) {
            blockMemoMap.set(block, []);
        }
        blockMemoMap.get(block).push(memoContent);
        memoEl.addEventListener('mouseenter', function () {
            block.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => {
                if (div.textContent === memoContent) {
                    div.classList.add('QYLmemoActive');
                }
            });
        });
        memoEl.addEventListener('mouseleave', function () {
            block.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => {
                if (div.textContent === memoContent) {
                    div.classList.remove('QYLmemoActive');
                }
            });
        });
    });
    blockMemoMap.forEach((memoList, block) => {
        block.querySelectorAll('div.QYL-inline-memo-box.protyle-custom').forEach(box => box.remove());
        const box = document.createElement('div');
        box.className = 'QYL-inline-memo-box protyle-custom';
        box.setAttribute('contenteditable', 'false');
        memoList.forEach(memoContent => {
            const div = document.createElement('div');
            div.className = 'QYL-inline-memo protyle-custom';
            div.textContent = memoContent;
            div.setAttribute('contenteditable', 'false');
            div.addEventListener('mouseenter', function () {
                block.querySelectorAll('[data-inline-memo-content]')?.forEach(memoEl => {
                    if (memoEl.getAttribute('data-inline-memo-content') === memoContent) {
                        memoEl.classList.add('QYLinlinememoActive');
                    }
                });
            });
            div.addEventListener('mouseleave', function () {
                block.querySelectorAll('[data-inline-memo-content]')?.forEach(memoEl => {
                    if (memoEl.getAttribute('data-inline-memo-content') === memoContent) {
                        memoEl.classList.remove('QYLinlinememoActive');
                    }
                });
            });
            div.addEventListener('click', function (e) {
                if (e.button === 0) { 
                    e.preventDefault();
                    e.stopPropagation();
                    block.querySelectorAll('[data-inline-memo-content]')?.forEach(memoEl => {
                        if (memoEl.getAttribute('data-inline-memo-content') === memoContent) {
                            const evt = new MouseEvent('contextmenu', {
                                bubbles: true,
                                cancelable: true,
                                view: window,
                                button: 2, 
                                buttons: 2,
                                clientX: e.clientX,
                                clientY: e.clientY
                            });
                            memoEl.dispatchEvent(evt);
                        }
                    });
                }
            });
            box.appendChild(div);
        });
        block.appendChild(box);
    });
    if (observer) observer.observe(wysiwyg, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-inline-memo-content']
    });
}
function bindWysiwygMemoObserver(wysiwyg) {
    unbindWysiwygMemoObserver(wysiwyg);
    const observer = new MutationObserver(mutations => {
        let needUpdate = false;
        for (const m of mutations) {
            if (m.target && m.target.classList && m.target.classList.contains('QYL-inline-memo')) continue;
            if (m.addedNodes) {
                for (const n of m.addedNodes) {
                    if (n.nodeType === 1 && n.classList && n.classList.contains('QYL-inline-memo')) {
                        needUpdate = false;
                        break;
                    }
                }
            }
            if (
                m.type === 'childList' ||
                (m.type === 'attributes' && m.attributeName === 'data-inline-memo-content')
            ) {
                needUpdate = true;
            }
        }
        if (needUpdate) {
            renderSideMemo(wysiwyg);
        }
    });
    observer.observe(wysiwyg, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-inline-memo-content']
    });
    wysiwygObserverMap.set(wysiwyg, observer);
    renderSideMemo(wysiwyg);
}
function unbindWysiwygMemoObserver(wysiwyg) {
    const observer = wysiwygObserverMap.get(wysiwyg);
    if (observer) {
        observer.disconnect();
        wysiwygObserverMap.delete(wysiwyg);
    }
}
export function initSideMemo() {
    enabled = true;
    observeTimeout = setTimeout(observeWysiwygs, 500);
}
export function removeSideMemo() {
    enabled = false;
    if (observeTimeout) {
        clearTimeout(observeTimeout);
        observeTimeout = null;
    }
    document.querySelectorAll('.protyle-wysiwyg').forEach(wysiwyg => {
        unbindWysiwygMemoObserver(wysiwyg);
        wysiwyg.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => div.remove());
    });
    if (rootObserver) {
        rootObserver.disconnect();
        rootObserver = null;
    }
}
function observeWysiwygs() {
    if (!enabled) return;
    const root = document.querySelector('.layout__center') || document.querySelector('#editor');
    if (!root) {
        observeTimeout = setTimeout(observeWysiwygs, 200);
        return;
    }
    const wysiwygList = root.querySelectorAll('.protyle-wysiwyg');
    wysiwygList.forEach(bindWysiwygMemoObserver);
    rootObserver = new MutationObserver(mutations => {
        if (!enabled) return;
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.classList.contains('protyle-wysiwyg')) {
                    bindWysiwygMemoObserver(node);
                } else if (node.nodeType === 1 && node.querySelectorAll) {
                    node.querySelectorAll('.protyle-wysiwyg').forEach(bindWysiwygMemoObserver);
                }
            });
            mutation.removedNodes.forEach(node => {
                if (node.nodeType === 1 && node.classList.contains('protyle-wysiwyg')) {
                    unbindWysiwygMemoObserver(node);
                } else if (node.nodeType === 1 && node.querySelectorAll) {
                    node.querySelectorAll('.protyle-wysiwyg').forEach(unbindWysiwygMemoObserver);
                }
            });
        });
    });
    rootObserver.observe(root, {
        childList: true,
        subtree: true
    });
}
export default null;
