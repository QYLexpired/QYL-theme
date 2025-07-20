let rootObserver = null;
let wysiwygObserverMap = new WeakMap();
let enabled = false;
let observeTimeout = null;
let memoContentChangeTimeout = null; 
import { isMobile } from '../basic/Device.js';
function hasMemo(wysiwyg) {
    return wysiwyg.querySelectorAll('[data-inline-memo-content]').length > 0;
}
function updateMemoNoneClass(wysiwyg) {
    if (hasMemo(wysiwyg)) {
        wysiwyg.classList.remove('QYLmemoNone');
    } else {
        wysiwyg.classList.add('QYLmemoNone');
    }
}
const BottomMemoModule = {
    renderBlockMemo(block) {
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
            this.bindMemoEvents(memoEl, memoContent, block);
        });
        if (memoList.length === 0) return;
        const box = this.createMemoBox(memoList, block);
        block.appendChild(box);
    },
    bindMemoEvents(memoEl, memoContent, block) {
        memoEl.removeEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
        memoEl.removeEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
        memoEl.removeEventListener('click', memoEl._QYL_memo_click);
        memoEl._QYL_memo_mouseenter = () => {
            block.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => {
                if (div.getAttribute('data-memo-content') === memoContent) {
                    div.classList.add('QYLmemoActive');
                }
            });
        };
        memoEl._QYL_memo_mouseleave = () => {
            block.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => {
                if (div.getAttribute('data-memo-content') === memoContent) {
                    div.classList.remove('QYLmemoActive');
                }
            });
        };
        memoEl._QYL_memo_click = (e) => {
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
        memoEl.addEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
        memoEl.addEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
        memoEl.addEventListener('click', memoEl._QYL_memo_click);
    },
    createMemoBox(memoList, block) {
    const box = document.createElement('div');
    box.className = 'QYL-inline-memo-box protyle-custom';
    if (memoList.length <= 4) {
        box.classList.add('QYLmemoFullwidth');
    } else {
        box.classList.add('QYLmemoGrid');
    }
    box.setAttribute('contenteditable', 'false');
    memoList.forEach(({memoContent, memoText}) => {
            const div = this.createMemoDiv(memoContent, memoText, block);
            box.appendChild(div);
        });
        return box;
    },
    createMemoDiv(memoContent, memoText, block) {
        const div = document.createElement('div');
        div.className = 'QYL-inline-memo protyle-custom';
        div.innerHTML = `<div>${memoText}</div><div>${memoContent}</div>`;
        div.setAttribute('contenteditable', 'false');
        div.setAttribute('data-memo-content', memoContent);
        div.addEventListener('mouseenter', () => {
            block.querySelectorAll('[data-inline-memo-content]')?.forEach(memoEl => {
                if (memoEl.getAttribute('data-inline-memo-content') === memoContent) {
                    memoEl.classList.add('QYLinlinememoActive');
                }
            });
        });
        div.addEventListener('mouseleave', () => {
            block.querySelectorAll('[data-inline-memo-content]')?.forEach(memoEl => {
                if (memoEl.getAttribute('data-inline-memo-content') === memoContent) {
                    memoEl.classList.remove('QYLinlinememoActive');
                }
            });
        });
        div.addEventListener('click', (e) => {
            const firstDiv = div.querySelector('div:first-child');
            if (e.target === firstDiv && e.button === 0) {
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
            const escapedMemoContent = CSS.escape(memoContent);
            const targetMemoEl = block.querySelector('[data-inline-memo-content="' + escapedMemoContent + '"]');
            if (targetMemoEl) {
                const targetRect = targetMemoEl.getBoundingClientRect();
                const sourceRect = div.getBoundingClientRect();
                const threshold = isMobile ? 150 : 500;
                if (Math.abs(targetRect.top - sourceRect.top) > threshold) {
                    targetMemoEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        return div;
    },
    renderWysiwyg(wysiwyg) {
    wysiwyg.querySelectorAll('.QYLmemoBlock').forEach(block => {
            this.renderBlockMemo(block);
    });
    const memoElements = wysiwyg.querySelectorAll('[data-inline-memo-content]');
    const blocks = new Set();
    memoElements.forEach(memoEl => {
        const block = getWysiwygDirectBlock(memoEl);
        if (block) blocks.add(block);
    });
        blocks.forEach(block => this.renderBlockMemo(block));
    },
    handleObserverChanges(mutations, wysiwyg) {
        if (memoContentChangeTimeout) {
            clearTimeout(memoContentChangeTimeout);
        }
        memoContentChangeTimeout = setTimeout(() => {
            this.renderWysiwyg(wysiwyg);
            updateMemoNoneClass(wysiwyg);
        }, 1000);
    },
    cleanup(wysiwyg) {
        wysiwyg.querySelectorAll('div.QYL-inline-memo-box.protyle-custom').forEach(box => box.remove());
        wysiwyg.querySelectorAll('.QYLmemoBlock').forEach(block => {
            block.classList.remove('QYLmemoBlock');
        });
        wysiwyg.querySelectorAll('[data-inline-memo-content]').forEach(memoEl => {
            if (memoEl._QYL_memo_mouseenter) {
                memoEl.removeEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
                delete memoEl._QYL_memo_mouseenter;
            }
            if (memoEl._QYL_memo_mouseleave) {
                memoEl.removeEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
                delete memoEl._QYL_memo_mouseleave;
            }
            if (memoEl._QYL_memo_click) {
                memoEl.removeEventListener('click', memoEl._QYL_memo_click);
                delete memoEl._QYL_memo_click;
            }
        });
        wysiwyg.querySelectorAll('.QYLinlinememoActive').forEach(el => {
            el.classList.remove('QYLinlinememoActive');
        });
        wysiwyg.querySelectorAll('.QYLmemoActive').forEach(el => {
            el.classList.remove('QYLmemoActive');
        });
    }
};
const RightMemoModule = {
    renderTitleMemo(wysiwyg) {
        let protyleContent = wysiwyg.parentElement;
        while (protyleContent && !protyleContent.classList.contains('protyle-content')) {
            protyleContent = protyleContent.parentElement;
        }
        if (!protyleContent) return;
        const protyleTop = protyleContent.querySelector('.protyle-top');
        if (!protyleTop) return;
        const titleElement = protyleTop.querySelector('.protyle-title');
        if (!titleElement) return;
        if (wysiwyg.contains(titleElement)) {
            return;
        }
        titleElement.querySelectorAll('div.QYL-inline-memo-box.protyle-custom').forEach(box => box.remove());
        const memoElements = wysiwyg.querySelectorAll('[data-inline-memo-content]');
        if (memoElements.length === 0) return;
        const memoList = [];
        memoElements.forEach(memoEl => {
            const memoContent = memoEl.getAttribute('data-inline-memo-content');
            if (!memoContent) return;
            const memoText = memoEl.innerText || memoEl.textContent || '';
            memoList.push({memoContent, memoText, memoEl});
            this.bindMemoEvents(memoEl, memoContent, titleElement);
        });
        if (memoList.length === 0) return;
        const box = this.createMemoBox(memoList, wysiwyg);
        titleElement.appendChild(box);
    },
    bindMemoEvents(memoEl, memoContent, titleElement) {
        memoEl.removeEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
        memoEl.removeEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
        memoEl.removeEventListener('click', memoEl._QYL_memo_click);
        memoEl._QYL_memo_mouseenter = () => {
            titleElement.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => {
                if (div.getAttribute('data-memo-content') === memoContent) {
                    div.classList.add('QYLmemoActive');
                }
            });
        };
        memoEl._QYL_memo_mouseleave = () => {
            titleElement.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => {
                if (div.getAttribute('data-memo-content') === memoContent) {
                    div.classList.remove('QYLmemoActive');
                }
            });
        };
        memoEl._QYL_memo_click = (e) => {
            const escapedMemoContent = CSS.escape(memoContent);
            const targetDiv = titleElement.querySelector('div.QYL-inline-memo.protyle-custom[data-memo-content="' + escapedMemoContent + '"]');
            if (targetDiv) {
                const targetRect = targetDiv.getBoundingClientRect();
                const sourceRect = memoEl.getBoundingClientRect();
                const threshold = isMobile ? 150 : 500;
                if (Math.abs(targetRect.top - sourceRect.top) > threshold) {
                    targetDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        };
        memoEl.addEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
        memoEl.addEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
        memoEl.addEventListener('click', memoEl._QYL_memo_click);
    },
    createMemoBox(memoList, wysiwyg) {
        const box = document.createElement('div');
        box.className = 'QYL-inline-memo-box protyle-custom';
        if (memoList.length <= 4) {
            box.classList.add('QYLmemoFullwidth');
        } else {
            box.classList.add('QYLmemoGrid');
        }
        box.setAttribute('contenteditable', 'false');
        const wysiwygRect = wysiwyg.getBoundingClientRect();
        const memoElements = [];
        const minSpacing = 10; 
        memoList.forEach(({memoContent, memoText}) => {
            const div = this.createMemoDiv(memoContent, memoText, wysiwyg);
            memoElements.push(div);
        });
        memoElements.forEach(div => {
            box.appendChild(div);
        });
        requestAnimationFrame(() => {
            const sortedElements = Array.from(memoElements).sort((a, b) => {
                const topA = parseFloat(a.style.top) || 0;
                const topB = parseFloat(b.style.top) || 0;
                return topA - topB;
            });
            let hasOverlap = false;
            for (let i = 1; i < sortedElements.length; i++) {
                const prevElement = sortedElements[i-1];
                const currentElement = sortedElements[i];
                const prevTop = parseFloat(prevElement.style.top) || 0;
                const prevHeight = prevElement.offsetHeight || 40;
                const currentTop = parseFloat(currentElement.style.top) || 0;
                const currentHeight = currentElement.offsetHeight || 40;
                const currentBottom = currentTop + currentHeight;
                const prevBottom = prevTop + prevHeight;
                if (currentTop < prevBottom + minSpacing) {
                    const newTop = prevBottom + minSpacing;
                    currentElement.style.top = `${newTop}px`;
                    hasOverlap = true;
                }
            }
        });
        return box;
    },
    createMemoDiv(memoContent, memoText, wysiwyg) {
        const div = document.createElement('div');
        div.className = 'QYL-inline-memo protyle-custom';
        div.innerHTML = `<div>${memoText}</div><div>${memoContent}</div>`;
        div.setAttribute('contenteditable', 'false');
        div.setAttribute('data-memo-content', memoContent);
        const escapedMemoContent = CSS.escape(memoContent);
        const targetMemoEl = wysiwyg.querySelector('[data-inline-memo-content="' + escapedMemoContent + '"]');
        if (targetMemoEl) {
            const targetRect = targetMemoEl.getBoundingClientRect();
            const wysiwygRect = wysiwyg.getBoundingClientRect();
            const relativeTop = targetRect.top - wysiwygRect.top;
            const offset = 8; 
            div.style.top = `${relativeTop - offset}px`;
        }
        div.addEventListener('mouseenter', () => {
            wysiwyg.querySelectorAll('[data-inline-memo-content]')?.forEach(memoEl => {
                if (memoEl.getAttribute('data-inline-memo-content') === memoContent) {
                    memoEl.classList.add('QYLinlinememoActive');
                }
            });
        });
        div.addEventListener('mouseleave', () => {
            wysiwyg.querySelectorAll('[data-inline-memo-content]')?.forEach(memoEl => {
                if (memoEl.getAttribute('data-inline-memo-content') === memoContent) {
                    memoEl.classList.remove('QYLinlinememoActive');
                }
            });
        });
        div.addEventListener('click', (e) => {
            const firstDiv = div.querySelector('div:first-child');
            if (e.target === firstDiv && e.button === 0) {
                e.preventDefault();
                e.stopPropagation();
                wysiwyg.querySelectorAll('[data-inline-memo-content]')?.forEach(memoEl => {
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
            const escapedMemoContent = CSS.escape(memoContent);
            const targetMemoEl = wysiwyg.querySelector('[data-inline-memo-content="' + escapedMemoContent + '"]');
            if (targetMemoEl) {
                const targetRect = targetMemoEl.getBoundingClientRect();
                const sourceRect = div.getBoundingClientRect();
                const threshold = isMobile ? 150 : 500;
                if (Math.abs(targetRect.top - sourceRect.top) > threshold) {
                    targetMemoEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        return div;
    },
    renderWysiwyg(wysiwyg) {
        this.renderTitleMemo(wysiwyg);
    },
    handleObserverChanges(mutations, wysiwyg) {
        if (memoContentChangeTimeout) {
            clearTimeout(memoContentChangeTimeout);
        }
        memoContentChangeTimeout = setTimeout(() => {
            this.renderWysiwyg(wysiwyg);
            updateMemoNoneClass(wysiwyg);
        }, 1000);
    },
    updateMemoPositions(wysiwyg) {
        let protyleContent = wysiwyg.parentElement;
        while (protyleContent && !protyleContent.classList.contains('protyle-content')) {
            protyleContent = protyleContent.parentElement;
        }
        if (!protyleContent) return;
        const protyleTop = protyleContent.querySelector('.protyle-top');
        if (!protyleTop) return;
        const titleElement = protyleTop.querySelector('.protyle-title');
        if (!titleElement || wysiwyg.contains(titleElement)) return;
        const memoBox = titleElement.querySelector('div.QYL-inline-memo-box.protyle-custom');
        if (!memoBox) return;
        const memoDivs = memoBox.querySelectorAll('.QYL-inline-memo');
        const wysiwygRect = wysiwyg.getBoundingClientRect();
        const minSpacing = 10;
        const memoElements = Array.from(memoDivs);
        const offset = 8; 
        memoElements.forEach(div => {
            const memoContent = div.getAttribute('data-memo-content');
            const escapedMemoContent = CSS.escape(memoContent);
            const targetMemoEl = wysiwyg.querySelector('[data-inline-memo-content="' + escapedMemoContent + '"]');
            if (targetMemoEl) {
                const targetRect = targetMemoEl.getBoundingClientRect();
                const relativeTop = targetRect.top - wysiwygRect.top;
                div.style.top = `${relativeTop - offset}px`;
            }
        });
        const sortedElements = Array.from(memoElements).sort((a, b) => {
            const topA = parseFloat(a.style.top) || 0;
            const topB = parseFloat(b.style.top) || 0;
            return topA - topB;
        });
        for (let i = 1; i < sortedElements.length; i++) {
            const prevElement = sortedElements[i-1];
            const currentElement = sortedElements[i];
            const prevTop = parseFloat(prevElement.style.top) || 0;
            const prevHeight = prevElement.offsetHeight || 40;
            const currentTop = parseFloat(currentElement.style.top) || 0;
            const currentHeight = currentElement.offsetHeight || 40;
            const currentBottom = currentTop + currentHeight;
            const prevBottom = prevTop + prevHeight;
            if (currentTop < prevBottom + minSpacing) {
                const newTop = prevBottom + minSpacing;
                currentElement.style.top = `${newTop}px`;
            }
        }
    },
    cleanup(wysiwyg) {
        let protyleContent = wysiwyg.parentElement;
        while (protyleContent && !protyleContent.classList.contains('protyle-content')) {
            protyleContent = protyleContent.parentElement;
        }
        if (!protyleContent) return;
        const protyleTop = protyleContent.querySelector('.protyle-top');
        if (!protyleTop) return;
        const titleElement = protyleTop.querySelector('.protyle-title');
        if (titleElement && !wysiwyg.contains(titleElement)) {
            titleElement.querySelectorAll('div.QYL-inline-memo-box.protyle-custom').forEach(box => box.remove());
        }
        wysiwyg.querySelectorAll('[data-inline-memo-content]').forEach(memoEl => {
            if (memoEl._QYL_memo_mouseenter) {
                memoEl.removeEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
                delete memoEl._QYL_memo_mouseenter;
            }
            if (memoEl._QYL_memo_mouseleave) {
                memoEl.removeEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
                delete memoEl._QYL_memo_mouseleave;
            }
            if (memoEl._QYL_memo_click) {
                memoEl.removeEventListener('click', memoEl._QYL_memo_click);
                delete memoEl._QYL_memo_click;
            }
        });
        wysiwyg.querySelectorAll('.QYLinlinememoActive').forEach(el => {
            el.classList.remove('QYLinlinememoActive');
        });
        wysiwyg.querySelectorAll('.QYLmemoActive').forEach(el => {
            el.classList.remove('QYLmemoActive');
        });
    }
};
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
function cleanupAllDirections(wysiwyg) {
    BottomMemoModule.cleanup(wysiwyg);
    RightMemoModule.cleanup(wysiwyg);
    wysiwyg.classList.remove('QYLmemoNone');
}
function renderSideMemo(wysiwyg) {
    cleanupAllDirections(wysiwyg);
    const isRMode = document.body.classList.contains('QYLmemoR');
    const isLMode = document.body.classList.contains('QYLmemoL');
    if (isRMode || isLMode) {
        RightMemoModule.renderWysiwyg(wysiwyg);
    } else {
        BottomMemoModule.renderWysiwyg(wysiwyg);
    }
    updateMemoNoneClass(wysiwyg);
}
function bindWysiwygMemoObserver(wysiwyg) {
    unbindWysiwygMemoObserver(wysiwyg);
    const observer = new MutationObserver(mutations => {
        const isRMode = document.body.classList.contains('QYLmemoR');
        const isLMode = document.body.classList.contains('QYLmemoL');
        if (isRMode || isLMode) {
            RightMemoModule.handleObserverChanges(mutations, wysiwyg);
        } else {
            BottomMemoModule.handleObserverChanges(mutations, wysiwyg);
        }
    });
    observer.observe(wysiwyg, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-inline-memo-content']
    });
    wysiwygObserverMap.set(wysiwyg, observer);
    setTimeout(() => {
        renderSideMemo(wysiwyg);
    }, 200);
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
export function forceReRenderAllWysiwygs() {
    if (!enabled) return;
    if (memoContentChangeTimeout) {
        clearTimeout(memoContentChangeTimeout);
        memoContentChangeTimeout = null;
    }
    document.querySelectorAll('.protyle-wysiwyg').forEach(wysiwyg => {
        cleanupAllDirections(wysiwyg);
    });
    document.querySelectorAll('.protyle-wysiwyg').forEach(wysiwyg => {
        renderSideMemo(wysiwyg);
    });
}
export function removeSideMemo() {
    enabled = false;
    if (observeTimeout) {
        clearTimeout(observeTimeout);
        observeTimeout = null;
    }
    if (memoContentChangeTimeout) {
        clearTimeout(memoContentChangeTimeout);
        memoContentChangeTimeout = null;
    }
    if (rootObserver) {
        rootObserver.disconnect();
        rootObserver = null;
    }
    document.querySelectorAll('.protyle-wysiwyg').forEach(wysiwyg => {
        unbindWysiwygMemoObserver(wysiwyg);
        cleanupAllDirections(wysiwyg);
    });
    document.querySelectorAll('[data-inline-memo-content]').forEach(memoEl => {
        if (memoEl._QYL_memo_mouseenter) {
            memoEl.removeEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
            delete memoEl._QYL_memo_mouseenter;
        }
        if (memoEl._QYL_memo_mouseleave) {
            memoEl.removeEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
            delete memoEl._QYL_memo_mouseleave;
        }
        if (memoEl._QYL_memo_click) {
            memoEl.removeEventListener('click', memoEl._QYL_memo_click);
            delete memoEl._QYL_memo_click;
        }
        if (memoEl._QYL_memo_mouseenter) {
            memoEl.removeEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
            delete memoEl._QYL_memo_mouseenter;
        }
        if (memoEl._QYL_memo_mouseleave) {
            memoEl.removeEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
            delete memoEl._QYL_memo_mouseleave;
        }
        if (memoEl._QYL_memo_click) {
            memoEl.removeEventListener('click', memoEl._QYL_memo_click);
            delete memoEl._QYL_memo_click;
        }
    });
    document.querySelectorAll('div.QYL-inline-memo-box.protyle-custom').forEach(box => box.remove());
    document.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => div.remove());
    document.querySelectorAll('.QYLmemoBlock').forEach(block => {
        block.classList.remove('QYLmemoBlock');
    });
    document.querySelectorAll('.QYLinlinememoActive').forEach(el => {
        el.classList.remove('QYLinlinememoActive');
    });
    document.querySelectorAll('.QYLmemoActive').forEach(el => {
        el.classList.remove('QYLmemoActive');
    });
    document.querySelectorAll('.QYLmemoNone').forEach(el => {
        el.classList.remove('QYLmemoNone');
    });
    if (window._QYL_memo_resize_handler) {
        window.removeEventListener('resize', window._QYL_memo_resize_handler);
        delete window._QYL_memo_resize_handler;
    }
    if (window._QYL_memo_scroll_handler) {
        document.removeEventListener('scroll', window._QYL_memo_scroll_handler, true);
        delete window._QYL_memo_scroll_handler;
    }
    document.body.classList.remove('QYLmemoB', 'QYLmemoR', 'QYLmemoL');
    wysiwygObserverMap = new WeakMap();
}
function observeWysiwygs() {
    if (!enabled) return;
    const root = document.querySelector('.layout__center') || document.querySelector('#editor');
    if (!root) {
        observeTimeout = setTimeout(observeWysiwygs, 200);
        return;
    }
    const wysiwygList = root.querySelectorAll('.protyle-wysiwyg');
    wysiwygList.forEach(wysiwyg => {
        bindWysiwygMemoObserver(wysiwyg);
    });
    rootObserver = new MutationObserver(mutations => {
        if (!enabled) return;
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                                if (node.nodeType === 1 && node.classList.contains('protyle-wysiwyg')) {
                    setTimeout(() => {
                        bindWysiwygMemoObserver(node);
                    }, 400);
                } else if (node.nodeType === 1 && node.querySelectorAll) {
                    node.querySelectorAll('.protyle-wysiwyg').forEach(wysiwyg => {
                        setTimeout(() => {
                            bindWysiwygMemoObserver(wysiwyg);
                        }, 400);
                    });
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
    let resizeTimeout = null;
    let scrollTimeout = null;
    const handleResize = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (enabled && (document.body.classList.contains('QYLmemoR') || document.body.classList.contains('QYLmemoL'))) {
                document.querySelectorAll('.protyle-wysiwyg').forEach(wysiwyg => {
                    RightMemoModule.updateMemoPositions(wysiwyg);
                });
            }
        }, 100);
    };
    const handleScroll = () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (enabled && (document.body.classList.contains('QYLmemoR') || document.body.classList.contains('QYLmemoL'))) {
                document.querySelectorAll('.protyle-wysiwyg').forEach(wysiwyg => {
                    RightMemoModule.updateMemoPositions(wysiwyg);
                });
            }
        }, 50);
    };
    window.addEventListener('resize', handleResize);
    document.addEventListener('scroll', handleScroll, true);
    window._QYL_memo_resize_handler = handleResize;
    window._QYL_memo_scroll_handler = handleScroll;
}
export default null;
