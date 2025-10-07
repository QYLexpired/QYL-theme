import { isMobile } from '../basic/Device.js';
import i18n from '../../i18n/i18n.js';
let rootObserver = null;
let wysiwygObserverMap = new WeakMap();
let enabled = false;
let observeTimeout = null;
let memoContentChangeTimeout = null; 
let isRenderingMemo = false;
let resizeDragging = false;
let resizeStartX = 0;
let resizeStartWidth = 0;
let resizeDirection = '';
function detectContentType(content) {
    if (!content || typeof content !== 'string') {
        return 'text';
    }
    const trimmedContent = content.trim();
    const htmlPatterns = [
        /<[^>]+>/, 
        /&[a-zA-Z]+;/, 
        /&#\d+;/, 
        /&#[xX][0-9a-fA-F]+;/ 
    ];
    const markdownPatterns = [
        /^#{1,6}\s/m, 
        /^\s*[-*+]\s/m, 
        /^\s*\d+\.\s/m, 
        /^\s*>\s/m, 
        /^\s*```/m,
        /^\s*\|.*\|.*\|/m, 
        /^\s*[-*_]{3,}\s*$/m, 
        /\*\*[^*]+\*\*/, 
        /\*[^*]+\*/, 
        /`[^`]+`/,
        /\[[^\]]+\]\([^)]+\)/, 
        /!\[[^\]]+\]\([^)]+\)/, 
        /~~[^~]+~~/, 
        /^\s*\[[ xX]\]\s/m, 
        /^\s*[A-Z][^.!?]*\n\s*[=]{3,}\s*$/m, 
        /^\s*[A-Z][^.!?]*\n\s*[-]{3,}\s*$/m, 
    ];
    const hasHtmlFeatures = htmlPatterns.some(pattern => pattern.test(trimmedContent));
    const hasMarkdownFeatures = markdownPatterns.some(pattern => pattern.test(trimmedContent));
    if (hasHtmlFeatures) {
        return 'html';
    } else if (hasMarkdownFeatures) {
        return 'markdown';
    } else {
        return 'text';
    }
}
function parseContent(content, type) {
    if (!content || typeof content !== 'string') {
        return '';
    }
    if (!window._QYL_memo_temp_div) {
        window._QYL_memo_temp_div = document.createElement('div');
    }
    switch (type) {
        case 'html':
            return content;
        case 'markdown':
            try {
                if (typeof marked !== 'undefined' && marked.parse) {
                    let html = marked.parse(content);
                    const tempDiv = window._QYL_memo_temp_div;
                    tempDiv.innerHTML = html;
                    const blockElements = tempDiv.querySelectorAll('p, div, h1, h2, h3, h4, h5, h6, ul, ol, blockquote, pre, table, hr');
                    blockElements.forEach(element => {
                        if (element.previousSibling && element.previousSibling.nodeType === Node.TEXT_NODE) {
                            element.previousSibling.textContent = element.previousSibling.textContent.replace(/\n\s*\n?$/, '');
                        }
                        if (element.nextSibling && element.nextSibling.nodeType === Node.TEXT_NODE) {
                            element.nextSibling.textContent = element.nextSibling.textContent.replace(/^\n?\s*\n/, '');
                        }
                    });
                    html = tempDiv.innerHTML
                        .replace(/>\s*\n\s*</g, '><') 
                        .replace(/\n\s*\n/g, '\n') 
                        .replace(/^\s*\n\s*/, '') 
                        .replace(/\s*\n\s*$/, '') 
                        .replace(/\s+</g, '<') 
                        .replace(/>\s+/g, '>'); 
                    return html;
                } else {
                    return content;
                }
            } catch (error) {
                return content;
            }
        case 'text':
        default:
            return content
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/\n/g, '<br>');
    }
}
function isInFoldedBlock(element) {
    let node = element;
    while (node && node !== document) {
        if (node.hasAttribute && node.getAttribute('fold') === '1') {
            return true;
        }
        node = node.parentElement;
    }
    return false;
}
function hasMemo(wysiwyg) {
    const avGalleryContents = wysiwyg.querySelectorAll('.av__gallery-content');
    const inlineMemoElements = wysiwyg.querySelectorAll('[data-inline-memo-content]');
    for (const memoEl of inlineMemoElements) {
        if (!isInFoldedBlock(memoEl) && !isInGallery(memoEl, avGalleryContents)) {
            return true;
        }
    }
    const memoElements = wysiwyg.querySelectorAll('[data-node-id]');
    for (const memoEl of memoElements) {
        const memoContent = memoEl.getAttribute('memo');
        if (memoContent && memoContent.trim() && !isInFoldedBlock(memoEl) && !isInGallery(memoEl, avGalleryContents)) {
            return true;
        }
    }
    return false;
}
function isInGallery(element, avGalleryContents) {
    for (const galleryContent of avGalleryContents) {
        if (galleryContent.contains(element)) {
            return true;
        }
    }
    return false;
}
function updateMemoProtyleClass(wysiwyg) {
    if (hasMemo(wysiwyg)) {
        wysiwyg.classList.add('QYLmemoProtyle');
        addHideMemoButton(wysiwyg);
    } else {
        wysiwyg.classList.remove('QYLmemoProtyle');
        removeHideMemoButton(wysiwyg);
    }
}
function addHideMemoButton(wysiwyg) {
    let parentElement = wysiwyg.parentElement;
    let breadcrumb = null;
    while (parentElement && parentElement !== document) {
        const prevSibling = parentElement.previousElementSibling;
        if (prevSibling && prevSibling.classList.contains('protyle-breadcrumb')) {
            breadcrumb = prevSibling;
            break;
        }
        parentElement = parentElement.parentElement;
    }
    if (!breadcrumb) return;
    if (breadcrumb.querySelector('.QYL-hide-memo-btn')) return;
    const firstIcon = breadcrumb.querySelector('.block__icon.fn__flex-center.ariaLabel');
    if (!firstIcon) return;
    const hideMemoBtn = document.createElement('button');
    hideMemoBtn.className = 'block__icon fn__flex-center ariaLabel QYL-hide-memo-btn';
    hideMemoBtn.setAttribute('aria-label', i18n.HideMemo);
    hideMemoBtn.innerHTML = '<svg><use xlink:href="#iconEyeoff"></use></svg>';
    hideMemoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (wysiwyg.classList.contains('QYLmemoHide')) {
            wysiwyg.classList.remove('QYLmemoHide');
            if (wysiwyg.parentElement) {
                wysiwyg.parentElement.classList.remove('QYLmemoHide');
            }
            hideMemoBtn.innerHTML = '<svg><use xlink:href="#iconEyeoff"></use></svg>';
            hideMemoBtn.setAttribute('aria-label', i18n.HideMemo);
        } else {
            wysiwyg.classList.add('QYLmemoHide');
            if (wysiwyg.parentElement) {
                wysiwyg.parentElement.classList.add('QYLmemoHide');
            }
            hideMemoBtn.innerHTML = '<svg><use xlink:href="#iconEye"></svg>';
            hideMemoBtn.setAttribute('aria-label', i18n.ShowMemo);
        }
    });
    firstIcon.parentNode.insertBefore(hideMemoBtn, firstIcon);
}
function removeHideMemoButton(wysiwyg) {
    let parentElement = wysiwyg.parentElement;
    let breadcrumb = null;
    while (parentElement && parentElement !== document) {
        const prevSibling = parentElement.previousElementSibling;
        if (prevSibling && prevSibling.classList.contains('protyle-breadcrumb')) {
            breadcrumb = prevSibling;
            break;
        }
        parentElement = parentElement.parentElement;
    }
    if (!breadcrumb) return;
    const hideMemoBtn = breadcrumb.querySelector('.QYL-hide-memo-btn');
    if (hideMemoBtn) {
        hideMemoBtn.remove();
    }
}
function generateMemoUid(memoEl, idx) {
    let uid = memoEl.getAttribute('data-memo-uid');
    if (!uid) {
        uid = 'memo-' + idx + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
        memoEl.setAttribute('data-memo-uid', uid);
    }
    return uid;
}
function findMemoElementByUid(container, uid) {
    let targetMemoEl = container.querySelector('[data-inline-memo-content][data-memo-uid="' + uid + '"]');
    if (!targetMemoEl) {
        targetMemoEl = container.querySelector('[data-node-id][data-memo-uid="' + uid + '"]');
    }
    if (!targetMemoEl && container.hasAttribute('memo')) {
        const containerUid = generateMemoUid(container, 0);
        if (containerUid === uid) {
            targetMemoEl = container;
        }
    }
    return targetMemoEl;
}
function isValidMemoContent(memoContent) {
    return memoContent && memoContent.trim();
}
function cleanupMemoEvents(memoEl) {
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
}
const BottomMemoModule = {
    renderBlockMemo(block) {
    block.querySelectorAll('div.QYL-inline-memo-box.protyle-custom').forEach(box => box.remove());
    block.classList.remove('QYLmemoBlock');
    const memoList = [];
    const avGalleryContents = block.querySelectorAll('.av__gallery-content');
    const blockMemoContent = block.getAttribute('memo');
    if (isValidMemoContent(blockMemoContent) && !isInFoldedBlock(block) && !isInGallery(block, avGalleryContents)) {
        const memoText = block.innerText || block.textContent || '';
        const uid = generateMemoUid(block, 0);
        memoList.push({memoContent: blockMemoContent, memoText, memoEl: block, uid, type: MEMO_TYPES.BLOCK});
    }
    const memoElements = block.querySelectorAll('[data-node-id]');
    let blockMemoCount = blockMemoContent ? 1 : 0;
    memoElements.forEach((memoEl, idx) => {
        if (memoEl === block) return;
        const memoContent = memoEl.getAttribute('memo');
        if (!isValidMemoContent(memoContent) || isInFoldedBlock(memoEl) || isInGallery(memoEl, avGalleryContents)) {
            return;
        }
        const memoText = memoEl.innerText || memoEl.textContent || '';
        const uid = generateMemoUid(memoEl, blockMemoCount);
        memoList.push({memoContent, memoText, memoEl, uid, type: MEMO_TYPES.BLOCK});
        blockMemoCount++;
        this.bindMemoEvents(memoEl, uid, block);
    });
    const inlineMemoElements = block.querySelectorAll('[data-inline-memo-content]');
    inlineMemoElements.forEach((memoEl, idx) => {
        if (isInFoldedBlock(memoEl) || isInGallery(memoEl, avGalleryContents)) {
            return;
        }
        const memoContent = memoEl.getAttribute('data-inline-memo-content');
        if (!memoContent) return;
        const memoText = memoEl.innerText || memoEl.textContent || '';
        const uid = generateMemoUid(memoEl, blockMemoCount + idx);
        memoList.push({memoContent, memoText, memoEl, uid, type: MEMO_TYPES.INLINE});
        this.bindMemoEvents(memoEl, uid, block);
    });
    if (memoList.length === 0) {
        return;
    }
    block.classList.add('QYLmemoBlock');
    const wysiwyg = block.closest('.protyle-wysiwyg');
    const observer = wysiwygObserverMap.get(wysiwyg);
    if (observer) {
        observer.disconnect();
    }
    try {
        const box = this.createMemoBox(memoList, block);
        block.appendChild(box);
    } finally {
        if (observer) {
            observer.observe(wysiwyg, OBSERVER_CONFIG);
        }
    }
    },
    bindMemoEvents(memoEl, uid, block) {
        memoEl.removeEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
        memoEl.removeEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
        memoEl.removeEventListener('click', memoEl._QYL_memo_click);
        memoEl._QYL_memo_mouseenter = () => {
            const memoContent = memoEl.getAttribute('memo');
            if (memoContent && isValidMemoContent(memoContent)) {
                block.querySelectorAll('div.QYL-block-memo[data-memo-uid="' + uid + '"]').forEach(div => {
                    div.classList.add('QYLmemoActive');
                });
            } else {
                block.querySelectorAll('div.QYL-inline-memo.protyle-custom[data-memo-uid="' + uid + '"]').forEach(div => {
                    div.classList.add('QYLmemoActive');
                });
            }
        };
        memoEl._QYL_memo_mouseleave = () => {
            const memoContent = memoEl.getAttribute('memo');
            if (memoContent && isValidMemoContent(memoContent)) {
                block.querySelectorAll('div.QYL-block-memo[data-memo-uid="' + uid + '"]').forEach(div => {
                    div.classList.remove('QYLmemoActive');
                });
            } else {
                block.querySelectorAll('div.QYL-inline-memo.protyle-custom[data-memo-uid="' + uid + '"]').forEach(div => {
                    div.classList.remove('QYLmemoActive');
                });
            }
        };
        memoEl._QYL_memo_click = (e) => {
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
    memoList.forEach(({memoContent, memoText, uid, type}) => {
            const div = this.createMemoDiv(memoContent, memoText, uid, block, type);
            box.appendChild(div);
        });
        return box;
    },
    createMemoDiv(memoContent, memoText, uid, block, memoType = MEMO_TYPES.INLINE) {
        const div = document.createElement('div');
        div.className = 'QYL-inline-memo protyle-custom';
        if (memoType === MEMO_TYPES.BLOCK) {
            div.classList.add('QYL-block-memo');
        }
        const contentType = detectContentType(memoContent);
        const parsedContent = parseContent(memoContent, contentType);
        div.innerHTML = `<div>${memoText}</div><div data-original-content="${memoContent.replace(/"/g, '&quot;')}">${parsedContent}</div>`;
        div.setAttribute('contenteditable', 'false');
        div.setAttribute('data-memo-uid', uid);
        div.setAttribute('data-content-type', contentType);
        div.addEventListener('mouseenter', () => {
            if (memoType === MEMO_TYPES.BLOCK) {
                block.querySelectorAll('[data-node-id][data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                    memoEl.classList.add('QYLBlockmemoActive');
                });
            } else {
                block.querySelectorAll('[data-inline-memo-content][data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                    memoEl.classList.add('QYLinlinememoActive');
                });
            }
        });
        div.addEventListener('mouseleave', () => {
            if (memoType === MEMO_TYPES.BLOCK) {
                block.querySelectorAll('[data-node-id][data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                    memoEl.classList.remove('QYLBlockmemoActive');
                });
            } else {
                block.querySelectorAll('[data-inline-memo-content][data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                    memoEl.classList.remove('QYLinlinememoActive');
                });
            }
        });
        div.addEventListener('click', (e) => {
            const firstDiv = div.querySelector('div:first-child');
            if (e.target === firstDiv) {
                e.preventDefault();
                e.stopPropagation();
                block.querySelectorAll('[data-inline-memo-content][data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
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
                });
                if (memoType === MEMO_TYPES.BLOCK) {
                    const targetMemoEl = findMemoElementByUid(block, uid);
                    if (targetMemoEl) {
                        const memoAttr = targetMemoEl.querySelector('.protyle-attr--memo');
                        if (memoAttr) {
                            memoAttr.click();
                        } else {
                        }
                    } else {
                    }
                }
            }
        });
        return div;
    },
    renderWysiwyg(wysiwyg) {
        if (isRenderingMemo) return; 
        isRenderingMemo = true;
        try {
            wysiwyg.querySelectorAll('.QYLmemoBlock').forEach(block => {
                this.renderBlockMemo(block);
            });
            const blocks = new Set();
            const inlineMemoElements = wysiwyg.querySelectorAll('[data-inline-memo-content]');
            inlineMemoElements.forEach(memoEl => {
                const block = getWysiwygDirectBlock(memoEl);
                if (block) blocks.add(block);
            });
            const memoElements = wysiwyg.querySelectorAll('[data-node-id]');
            memoElements.forEach(memoEl => {
                const memoContent = memoEl.getAttribute('memo');
                if (isValidMemoContent(memoContent)) {
                    blocks.add(memoEl);
                }
            });
            blocks.forEach(block => this.renderBlockMemo(block));
        } finally {
            isRenderingMemo = false;
        }
    },
    cleanup(wysiwyg) {
        wysiwyg.querySelectorAll('div.QYL-inline-memo-box.protyle-custom').forEach(box => box.remove());
        wysiwyg.querySelectorAll('.QYLmemoBlock').forEach(block => {
            block.classList.remove('QYLmemoBlock');
        });
        wysiwyg.querySelectorAll('[data-inline-memo-content]').forEach(cleanupMemoEvents);
        wysiwyg.querySelectorAll('[data-node-id]').forEach(memoEl => {
            const memoContent = memoEl.getAttribute('memo');
            if (isValidMemoContent(memoContent)) {
                cleanupMemoEvents(memoEl);
            }
        });
        wysiwyg.querySelectorAll('.QYLinlinememoActive').forEach(el => {
            el.classList.remove('QYLinlinememoActive');
        });
        wysiwyg.querySelectorAll('.QYLBlockmemoActive').forEach(el => {
            el.classList.remove('QYLBlockmemoActive');
        });
        wysiwyg.querySelectorAll('.QYLmemoActive').forEach(el => {
            el.classList.remove('QYLmemoActive');
        });
        removeHideMemoButton(wysiwyg);
    },
    handleObserverChanges(mutations, wysiwyg) {
        if (isRenderingMemo) return; 
        const hasFoldChange = mutations.some(mutation => 
            mutation.type === 'attributes' && mutation.attributeName === 'fold'
        );
        if (memoContentChangeTimeout) {
            clearTimeout(memoContentChangeTimeout);
        }
        const delay = hasFoldChange ? 100 : 1000;
        memoContentChangeTimeout = setTimeout(() => {
            this.renderWysiwyg(wysiwyg);
            updateMemoProtyleClass(wysiwyg);
        }, delay);
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
        const memoList = [];
        const avGalleryContents = wysiwyg.querySelectorAll('.av__gallery-content');
        const memoElements = wysiwyg.querySelectorAll('[data-node-id]');
        let blockMemoCount = 0;
        memoElements.forEach((memoEl, idx) => {
            const memoContent = memoEl.getAttribute('memo');
            if (!isValidMemoContent(memoContent) || isInFoldedBlock(memoEl) || isInGallery(memoEl, avGalleryContents)) {
                return;
            }
            const memoText = memoEl.innerText || memoEl.textContent || '';
            const uid = generateMemoUid(memoEl, blockMemoCount);
            memoList.push({memoContent, memoText, memoEl, uid, type: MEMO_TYPES.BLOCK});
            blockMemoCount++;
            this.bindMemoEvents(memoEl, uid, titleElement);
        });
        const inlineMemoElements = wysiwyg.querySelectorAll('[data-inline-memo-content]');
        inlineMemoElements.forEach((memoEl, idx) => {
            if (isInFoldedBlock(memoEl) || isInGallery(memoEl, avGalleryContents)) {
                return;
            }
            const memoContent = memoEl.getAttribute('data-inline-memo-content');
            if (!memoContent) return;
            const memoText = memoEl.innerText || memoEl.textContent || '';
            const uid = generateMemoUid(memoEl, blockMemoCount + idx);
            memoList.push({memoContent, memoText, memoEl, uid, type: MEMO_TYPES.INLINE});
            this.bindMemoEvents(memoEl, uid, titleElement);
        });
        if (memoList.length === 0) return;
        const observer = wysiwygObserverMap.get(wysiwyg);
        if (observer) {
            observer.disconnect();
        }
        try {
            const box = this.createMemoBox(memoList, wysiwyg);
            titleElement.appendChild(box);
        } finally {
        if (observer) {
            observer.observe(wysiwyg, OBSERVER_CONFIG);
        }
        }
    },
    bindMemoEvents(memoEl, uid, titleElement) {
        memoEl.removeEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
        memoEl.removeEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
        memoEl.removeEventListener('click', memoEl._QYL_memo_click);
        memoEl._QYL_memo_mouseenter = () => {
            const memoContent = memoEl.getAttribute('memo');
            if (memoContent && isValidMemoContent(memoContent)) {
                titleElement.querySelectorAll('div.QYL-block-memo[data-memo-uid="' + uid + '"]').forEach(div => {
                    div.classList.add('QYLmemoActive');
                });
            } else {
                titleElement.querySelectorAll('div.QYL-inline-memo.protyle-custom[data-memo-uid="' + uid + '"]').forEach(div => {
                    div.classList.add('QYLmemoActive');
                });
            }
        };
        memoEl._QYL_memo_mouseleave = () => {
            const memoContent = memoEl.getAttribute('memo');
            if (memoContent && isValidMemoContent(memoContent)) {
                titleElement.querySelectorAll('div.QYL-block-memo[data-memo-uid="' + uid + '"]').forEach(div => {
                    div.classList.remove('QYLmemoActive');
                });
            } else {
                titleElement.querySelectorAll('div.QYL-inline-memo.protyle-custom[data-memo-uid="' + uid + '"]').forEach(div => {
                    div.classList.remove('QYLmemoActive');
                });
            }
        };
        memoEl._QYL_memo_click = (e) => {
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
        memoList.forEach(({memoContent, memoText, uid, type}) => {
            const div = this.createMemoDiv(memoContent, memoText, uid, wysiwyg, type);
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
    createMemoDiv(memoContent, memoText, uid, wysiwyg, memoType = MEMO_TYPES.INLINE) {
        const div = document.createElement('div');
        div.className = 'QYL-inline-memo protyle-custom';
        if (memoType === MEMO_TYPES.BLOCK) {
            div.classList.add('QYL-block-memo');
        }
        const contentType = detectContentType(memoContent);
        const parsedContent = parseContent(memoContent, contentType);
        div.innerHTML = `<div>${memoText}</div><div data-original-content="${memoContent.replace(/"/g, '&quot;')}">${parsedContent}</div><div class="QYLSideMemoResize"></div>`;
        div.setAttribute('contenteditable', 'false');
        div.setAttribute('data-memo-uid', uid);
        div.setAttribute('data-content-type', contentType);
        const resizeHandle = div.querySelector('.QYLSideMemoResize');
        if (resizeHandle) {
            let protyleContent = wysiwyg.parentElement;
            while (protyleContent && !protyleContent.classList.contains('protyle-content')) {
                protyleContent = protyleContent.parentElement;
            }
            this.bindResizeEvents(resizeHandle, document.body.classList.contains('QYLmemoR') ? 'R' : 'L', protyleContent);
        }
        const targetMemoEl = findMemoElementByUid(wysiwyg, uid);
        if (targetMemoEl) {
            const targetRect = targetMemoEl.getBoundingClientRect();
            const wysiwygRect = wysiwyg.getBoundingClientRect();
            const relativeTop = targetRect.top - wysiwygRect.top;
            div.style.top = `${relativeTop}px`;
        }
        div.addEventListener('mouseenter', () => {
            if (memoType === MEMO_TYPES.BLOCK) {
                wysiwyg.querySelectorAll('[data-node-id][data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                    memoEl.classList.add('QYLBlockmemoActive');
                });
            } else {
                wysiwyg.querySelectorAll('[data-inline-memo-content][data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                    memoEl.classList.add('QYLinlinememoActive');
                });
            }
        });
        div.addEventListener('mouseleave', () => {
            if (memoType === MEMO_TYPES.BLOCK) {
                wysiwyg.querySelectorAll('[data-node-id][data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                    memoEl.classList.remove('QYLBlockmemoActive');
                });
            } else {
                wysiwyg.querySelectorAll('[data-inline-memo-content][data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                    memoEl.classList.remove('QYLinlinememoActive');
                });
            }
        });
        div.addEventListener('click', (e) => {
            const firstDiv = div.querySelector('div:first-child');
            if (e.target === firstDiv && e.button === 0) {
                e.preventDefault();
                e.stopPropagation();
                if (memoType === MEMO_TYPES.BLOCK) {
                    const targetMemoEl = findMemoElementByUid(wysiwyg, uid);
                    if (targetMemoEl) {
                        const memoAttr = targetMemoEl.querySelector('.protyle-attr--memo');
                        if (memoAttr) {
                            memoAttr.click();
                        } else {
                        }
                    } else {
                    }
                } else {
                    wysiwyg.querySelectorAll('[data-inline-memo-content][data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
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
                    });
                }
            }
        });
        return div;
    },
    renderWysiwyg(wysiwyg) {
        this.renderTitleMemo(wysiwyg);
        this.updateMemoPositions(wysiwyg);
    },
    handleObserverChanges(mutations, wysiwyg) {
        if (isRenderingMemo) return; 
        const hasFoldChange = mutations.some(mutation => 
            mutation.type === 'attributes' && mutation.attributeName === 'fold'
        );
        if (memoContentChangeTimeout) {
            clearTimeout(memoContentChangeTimeout);
        }
        const delay = hasFoldChange ? 100 : 1000;
        memoContentChangeTimeout = setTimeout(() => {
            this.renderWysiwyg(wysiwyg);
            updateMemoProtyleClass(wysiwyg);
        }, delay);
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
        let topOffset = 0;
        if (titleElement) {
            topOffset += titleElement.offsetHeight;
            let node = titleElement.nextElementSibling;
            while (node && node !== wysiwyg) {
                if (node.offsetHeight) topOffset += node.offsetHeight;
                node = node.nextElementSibling;
            }
        }
        memoBox.style.top = topOffset + 'px';
        const memoDivs = memoBox.querySelectorAll('.QYL-inline-memo');
        const wysiwygRect = wysiwyg.getBoundingClientRect();
        const minSpacing = 10;
        const memoElements = Array.from(memoDivs); 
        memoElements.forEach(div => {
            const memoUid = div.getAttribute('data-memo-uid');
            const targetMemoEl = findMemoElementByUid(wysiwyg, memoUid);
            if (targetMemoEl) {
                const targetRect = targetMemoEl.getBoundingClientRect();
                const relativeTop = targetRect.top - wysiwygRect.top;
                div.style.top = `${relativeTop}px`;
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
        wysiwyg.querySelectorAll('[data-inline-memo-content]').forEach(cleanupMemoEvents);
        wysiwyg.querySelectorAll('[data-node-id]').forEach(memoEl => {
            const memoContent = memoEl.getAttribute('memo');
            if (isValidMemoContent(memoContent)) {
                cleanupMemoEvents(memoEl);
            }
        });
        wysiwyg.querySelectorAll('.QYLinlinememoActive').forEach(el => {
            el.classList.remove('QYLinlinememoActive');
        });
        wysiwyg.querySelectorAll('.QYLBlockmemoActive').forEach(el => {
            el.classList.remove('QYLBlockmemoActive');
        });
        wysiwyg.querySelectorAll('.QYLmemoActive').forEach(el => {
            el.classList.remove('QYLmemoActive');
        });
        wysiwyg.querySelectorAll('.QYLSideMemoResize').forEach(resizeHandle => {
            if (resizeHandle._QYL_resize_mousedown) {
                resizeHandle.removeEventListener('mousedown', resizeHandle._QYL_resize_mousedown);
                delete resizeHandle._QYL_resize_mousedown;
            }
            if (resizeHandle._QYL_resize_dblclick) {
                resizeHandle.removeEventListener('dblclick', resizeHandle._QYL_resize_dblclick);
                delete resizeHandle._QYL_resize_dblclick;
            }
        });
        removeHideMemoButton(wysiwyg);
    },
    bindResizeEvents(resizeHandle, direction, scopeEl) {
        const targetEl = scopeEl || document.documentElement;
        const handleMouseDown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            resizeDragging = true;
            resizeDirection = direction;
            resizeStartX = e.clientX;
            resizeStartWidth = parseInt(getComputedStyle(targetEl).getPropertyValue(`--QYLmemo${direction}-box-width`)) || 250;
            resizeHandle.classList.add('QYLSideMemoResizeDragging');
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            const handleMouseMove = (e) => {
                if (!resizeDragging) return;
                const deltaX = e.clientX - resizeStartX;
                let newWidth;
                if (direction === 'R') {
                    newWidth = Math.max(100, Math.min(800, resizeStartWidth - deltaX));
                } else {
                    newWidth = Math.max(100, Math.min(800, resizeStartWidth + deltaX));
                }
                if (handleMouseMove.lastWidth === newWidth) return;
                handleMouseMove.lastWidth = newWidth;
                if (!handleMouseMove.rafId) {
                    handleMouseMove.rafId = requestAnimationFrame(() => {
                        targetEl.style.setProperty(`--QYLmemo${direction}-box-width`, `${newWidth}px`);
                        handleMouseMove.rafId = null;
                    });
                }
            };
            const handleMouseUp = () => {
                resizeDragging = false;
                resizeHandle.classList.remove('QYLSideMemoResizeDragging');
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                if (handleMouseMove.rafId) {
                    cancelAnimationFrame(handleMouseMove.rafId);
                    handleMouseMove.rafId = null;
                }
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };
        resizeHandle._QYL_resize_mousedown = handleMouseDown;
        resizeHandle.addEventListener('mousedown', handleMouseDown);
        const handleDoubleClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            targetEl.style.setProperty(`--QYLmemo${direction}-box-width`, '250px');
        };
        resizeHandle._QYL_resize_dblclick = handleDoubleClick;
        resizeHandle.addEventListener('dblclick', handleDoubleClick);
    }
};
function getWysiwygDirectBlock(memoEl) {
    if (!memoEl) return null;
    let node = memoEl;
    let wysiwyg = null;
    let avGalleryContent = null;
    while (node && node !== document) {
        if (node.classList && node.classList.contains('protyle-wysiwyg')) {
            wysiwyg = node;
            break;
        }
        if (node.classList && node.classList.contains('av__gallery-content')) {
            avGalleryContent = node;
        }
        node = node.parentElement;
    }
    if (!wysiwyg) return null;
    if (avGalleryContent) {
        for (const child of avGalleryContent.children) {
            if (child.contains(memoEl)) {
                return child;
            }
        }
    }
    node = memoEl;
    while (node && node !== wysiwyg) {
        if (node.hasAttribute && node.hasAttribute('data-node-id')) {
            return node;
        }
        node = node.parentElement;
    }
    return null;
}
function cleanupAllDirections(wysiwyg) {
    BottomMemoModule.cleanup(wysiwyg);
    RightMemoModule.cleanup(wysiwyg);
    wysiwyg.classList.remove('QYLmemoProtyle', 'QYLmemoHide');
    if (wysiwyg.parentElement) {
        wysiwyg.parentElement.classList.remove('QYLmemoHide');
    }
    removeHideMemoButton(wysiwyg);
}
function renderSideMemo(wysiwyg) {
    cleanupAllDirections(wysiwyg);
    const isSideMode = document.body.classList.contains('QYLmemoR') || document.body.classList.contains('QYLmemoL');
    const module = isSideMode ? RightMemoModule : BottomMemoModule;
    module.renderWysiwyg(wysiwyg);
    updateMemoProtyleClass(wysiwyg);
}
const OBSERVER_CONFIG = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-inline-memo-content', 'memo', 'fold']
};
const MEMO_TYPES = {
    BLOCK: 'block',
    INLINE: 'inline'
};
const SCROLL_THRESHOLD = {
    MOBILE: 150,
    DESKTOP: 500
};
function bindWysiwygMemoObserver(wysiwyg) {
    unbindWysiwygMemoObserver(wysiwyg);
    const observer = new MutationObserver(mutations => {
        const isSideMode = document.body.classList.contains('QYLmemoR') || document.body.classList.contains('QYLmemoL');
        const module = isSideMode ? RightMemoModule : BottomMemoModule;
        module.handleObserverChanges(mutations, wysiwyg);
    });
    observer.observe(wysiwyg, OBSERVER_CONFIG);
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
    document.querySelectorAll('[data-inline-memo-content]').forEach(cleanupMemoEvents);
    document.querySelectorAll('[data-node-id]').forEach(memoEl => {
        const memoContent = memoEl.getAttribute('memo');
        if (isValidMemoContent(memoContent)) {
            cleanupMemoEvents(memoEl);
        }
    });
    document.querySelectorAll('div.QYL-inline-memo-box.protyle-custom').forEach(box => box.remove());
    document.querySelectorAll('div.QYL-inline-memo.protyle-custom').forEach(div => div.remove());
    document.querySelectorAll('.QYLSideMemoResize').forEach(resizeHandle => {
        if (resizeHandle._QYL_resize_mousedown) {
            resizeHandle.removeEventListener('mousedown', resizeHandle._QYL_resize_mousedown);
            delete resizeHandle._QYL_resize_mousedown;
        }
        if (resizeHandle._QYL_resize_dblclick) {
            resizeHandle.removeEventListener('dblclick', resizeHandle._QYL_resize_dblclick);
            delete resizeHandle._QYL_resize_dblclick;
        }
    });
    document.querySelectorAll('.QYLmemoBlock').forEach(block => {
        block.classList.remove('QYLmemoBlock');
    });
    document.querySelectorAll('.QYLinlinememoActive').forEach(el => {
        el.classList.remove('QYLinlinememoActive');
    });
    document.querySelectorAll('.QYLBlockmemoActive').forEach(el => {
        el.classList.remove('QYLBlockmemoActive');
    });
    document.querySelectorAll('.QYLmemoActive').forEach(el => {
        el.classList.remove('QYLmemoActive');
    });
    document.querySelectorAll('.QYLmemoProtyle').forEach(el => {
        el.classList.remove('QYLmemoProtyle');
    });
    document.querySelectorAll('.QYLmemoHide').forEach(el => {
        el.classList.remove('QYLmemoHide');
    });
    document.querySelectorAll('.QYL-hide-memo-btn').forEach(btn => btn.remove());
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
    if (window._QYL_memo_temp_div) {
        delete window._QYL_memo_temp_div;
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
