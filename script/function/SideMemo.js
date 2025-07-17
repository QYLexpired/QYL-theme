let rootObserver = null;
const wysiwygObserverMap = new WeakMap();
let enabled = false;
let observeTimeout = null;
import { isMobile } from '../basic/Device.js';
function getWysiwygDirectBlock(memoEl) {
    let node = memoEl;
    let wysiwyg = null;
    while (node && node !== document) {
        if (node.classList && node.classList.contains('protyle-wysiwyg')) {
            wysiwyg = node;
            break;
        }
        node = node.parentElement;
    }
    if (!wysiwyg) return null;
    for (const child of wysiwyg.children) {
        if (child.hasAttribute && child.hasAttribute('data-node-id') && child.contains(memoEl)) {
            return child;
        }
    }
    return null;
}
function renderBlockMemo(block) {
    block.querySelectorAll('div.QYL-inline-memo-box.protyle-custom').forEach(box => box.remove());
    block.classList.remove('QYLmemoBlock');
    const memoElements = block.querySelectorAll('[data-inline-memo-content]');
    if (memoElements.length === 0) return;
    block.classList.add('QYLmemoBlock');
    const memoList = [];
    memoElements.forEach(memoEl => {
        const memoContent = memoEl.getAttribute('data-inline-memo-content');
        if (!memoContent) return;
        const memoText = memoEl.innerText || memoEl.textContent || '';
        memoList.push({memoContent, memoText, memoEl});
        memoEl.removeEventListener('mouseenter', memoEl._qyl_memo_mouseenter);
        memoEl.removeEventListener('mouseleave', memoEl._qyl_memo_mouseleave);
        memoEl.removeEventListener('click', memoEl._qyl_memo_click);
        memoEl._qyl_memo_mouseenter = function () {
            block.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => {
                if (div.getAttribute('data-memo-content') === memoContent) {
                    div.classList.add('QYLmemoActive');
                }
            });
        };
        memoEl._qyl_memo_mouseleave = function () {
            block.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => {
                if (div.getAttribute('data-memo-content') === memoContent) {
                    div.classList.remove('QYLmemoActive');
                }
            });
        };
        memoEl._qyl_memo_click = function (e) {
            const targetDiv = block.querySelector('div.QYL-inline-memo.protyle-custom[data-memo-content="' + memoContent + '"]');
            if (targetDiv) {
                const targetRect = targetDiv.getBoundingClientRect();
                const sourceRect = memoEl.getBoundingClientRect();
                const threshold = isMobile ? 150 : 500;
                if (Math.abs(targetRect.top - sourceRect.top) > threshold) {
                    targetDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        };
        memoEl.addEventListener('mouseenter', memoEl._qyl_memo_mouseenter);
        memoEl.addEventListener('mouseleave', memoEl._qyl_memo_mouseleave);
        memoEl.addEventListener('click', memoEl._qyl_memo_click);
    });
    if (memoList.length === 0) return;
    const box = document.createElement('div');
    box.className = 'QYL-inline-memo-box protyle-custom';
    if (memoList.length <= 4) {
        box.classList.add('QYLmemoFullwidth');
    } else {
        box.classList.add('QYLmemoGrid');
    }
    box.setAttribute('contenteditable', 'false');
    memoList.forEach(({memoContent, memoText}) => {
        const div = document.createElement('div');
        div.className = 'QYL-inline-memo protyle-custom';
        div.innerHTML = `<div>${memoText}</div><div>${memoContent}</div>`;
        div.setAttribute('contenteditable', 'false');
        div.setAttribute('data-memo-content', memoContent);
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
            const targetMemoEl = block.querySelector('[data-inline-memo-content="' + memoContent + '"]');
            if (targetMemoEl) {
                const targetRect = targetMemoEl.getBoundingClientRect();
                const sourceRect = div.getBoundingClientRect();
                const threshold = isMobile ? 150 : 500;
                if (Math.abs(targetRect.top - sourceRect.top) > threshold) {
                    targetMemoEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        box.appendChild(div);
    });
    block.appendChild(box);
}
function renderSideMemo(wysiwyg) {
    wysiwyg.querySelectorAll('.QYLmemoBlock').forEach(block => {
        renderBlockMemo(block);
    });
    const memoElements = wysiwyg.querySelectorAll('[data-inline-memo-content]');
    const blocks = new Set();
    memoElements.forEach(memoEl => {
        const block = getWysiwygDirectBlock(memoEl);
        if (block) blocks.add(block);
    });
    blocks.forEach(block => renderBlockMemo(block));
}
function bindWysiwygMemoObserver(wysiwyg) {
    unbindWysiwygMemoObserver(wysiwyg);
    const observer = new MutationObserver(mutations => {
        const blocksToUpdate = new Set();
        for (const m of mutations) {
            if (m.type === 'attributes' && m.target.hasAttribute && m.target.hasAttribute('data-inline-memo-content')) {
                const block = getWysiwygDirectBlock(m.target);
                if (block) blocksToUpdate.add(block);
            }
            if (m.type === 'childList') {
                m.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.hasAttribute && node.hasAttribute('data-inline-memo-content')) {
                            const block = getWysiwygDirectBlock(node);
                            if (block) blocksToUpdate.add(block);
                        } else if (node.querySelectorAll) {
                            node.querySelectorAll('[data-inline-memo-content]').forEach(memoEl => {
                                const block = getWysiwygDirectBlock(memoEl);
                                if (block) blocksToUpdate.add(block);
                            });
                        }
                    }
                });
                m.removedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.hasAttribute && node.hasAttribute('data-inline-memo-content')) {
                        const block = getWysiwygDirectBlock(node);
                        if (block) blocksToUpdate.add(block);
                    }
                });
            }
        }
        if (blocksToUpdate.size > 0) {
            blocksToUpdate.forEach(block => renderBlockMemo(block));
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
