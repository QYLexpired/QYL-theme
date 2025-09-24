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
import { isMobile } from '../basic/Device.js';
import i18n from '../../i18n/i18n.js';
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
        /^#{1,6}\s/, 
        /^\s*[-*+]\s/, 
        /^\s*\d+\.\s/, 
        /^\s*>\s/, 
        /^\s*```/,
        /^\s*\|.*\|.*\|/, 
        /^\s*[-*_]{3,}\s*$/, 
        /\*\*[^*]+\*\*/, 
        /\*[^*]+\*/, 
        /`[^`]+`/,
        /\[[^\]]+\]\([^)]+\)/, 
        /!\[[^\]]+\]\([^)]+\)/, 
        /~~[^~]+~~/, 
        /^\s*\[[ xX]\]\s/, 
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
                if (typeof marked !== 'undefined') {
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
    if (avGalleryContents.length > 0) {
        const memoElements = wysiwyg.querySelectorAll('[data-inline-memo-content]');
        for (const memoEl of memoElements) {
            let isInGallery = false;
            for (const galleryContent of avGalleryContents) {
                if (galleryContent.contains(memoEl)) {
                    isInGallery = true;
                    break;
                }
            }
            if (!isInGallery && !isInFoldedBlock(memoEl)) {
                return true;
            }
        }
        return false;
    }
    const memoElements = wysiwyg.querySelectorAll('[data-inline-memo-content]');
    for (const memoEl of memoElements) {
        if (!isInFoldedBlock(memoEl)) {
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
const BottomMemoModule = {
    renderBlockMemo(block) {
    block.classList.remove('QYLmemoBlock');
    const memoElements = block.querySelectorAll('[data-inline-memo-content]');
    if (memoElements.length === 0) {
        block.querySelectorAll('div.QYL-inline-memo-box.protyle-custom').forEach(box => box.remove());
        return;
    }
    const avGalleryContents = block.querySelectorAll('.av__gallery-content');
    block.classList.add('QYLmemoBlock');
    const memoList = [];
    memoElements.forEach((memoEl, idx) => {
        if (isInFoldedBlock(memoEl)) {
            return;
        }
        let isInGallery = false;
        for (const galleryContent of avGalleryContents) {
            if (galleryContent.contains(memoEl)) {
                isInGallery = true;
                break;
            }
        }
        if (isInGallery) {
            return;
        }
        const memoContent = memoEl.getAttribute('data-inline-memo-content');
        if (!memoContent) return;
        const memoText = memoEl.innerText || memoEl.textContent || '';
        const uid = generateMemoUid(memoEl, idx);
        memoList.push({memoContent, memoText, memoEl, uid});
        this.bindMemoEvents(memoEl, uid, block);
    });
    if (memoList.length === 0) {
        block.querySelectorAll('div.QYL-inline-memo-box.protyle-custom').forEach(box => box.remove());
        return;
    }
    const oldBox = block.querySelector('div.QYL-inline-memo-box.protyle-custom');
    if (oldBox) {
        const oldMemos = Array.from(oldBox.querySelectorAll('div.QYL-inline-memo.protyle-custom')).map(div => div.getAttribute('data-memo-uid'));
        const newMemos = memoList.map(m => m.uid);
        let shouldSkip = oldMemos.length === newMemos.length && oldMemos.every((v, i) => v === newMemos[i]);
        if (shouldSkip) {
            const oldMemoDivs = oldBox.querySelectorAll('div.QYL-inline-memo.protyle-custom');
            shouldSkip = memoList.every((memo, index) => {
                const oldDiv = oldMemoDivs[index];
                if (!oldDiv) return false;
                const oldContent = oldDiv.querySelector('div:nth-child(2)').getAttribute('data-original-content') || 
                                 oldDiv.querySelector('div:nth-child(2)').textContent;
                return oldContent === memo.memoContent;
            });
        }
        if (shouldSkip) {
            return;
        }
        oldBox.remove();
    }
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
            observer.observe(wysiwyg, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['data-inline-memo-content', 'fold']
            });
        }
    }
    },
    bindMemoEvents(memoEl, uid, block) {
        memoEl.removeEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
        memoEl.removeEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
        memoEl.removeEventListener('click', memoEl._QYL_memo_click);
        memoEl._QYL_memo_mouseenter = () => {
            block.querySelectorAll('div.QYL-inline-memo.protyle-custom[data-memo-uid="' + uid + '"]').forEach(div => {
                div.classList.add('QYLmemoActive');
            });
        };
        memoEl._QYL_memo_mouseleave = () => {
            block.querySelectorAll('div.QYL-inline-memo.protyle-custom[data-memo-uid="' + uid + '"]').forEach(div => {
                div.classList.remove('QYLmemoActive');
            });
        };
        memoEl._QYL_memo_click = (e) => {
            const targetDiv = block.querySelector('div.QYL-inline-memo.protyle-custom[data-memo-uid="' + uid + '"]');
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
    memoList.forEach(({memoContent, memoText, uid}) => {
            const div = this.createMemoDiv(memoContent, memoText, uid, block);
            box.appendChild(div);
        });
        return box;
    },
    createMemoDiv(memoContent, memoText, uid, block) {
        const div = document.createElement('div');
        div.className = 'QYL-inline-memo protyle-custom';
        const contentType = detectContentType(memoContent);
        const parsedContent = parseContent(memoContent, contentType);
        div.innerHTML = `<div>${memoText}</div><div data-original-content="${memoContent.replace(/"/g, '&quot;')}">${parsedContent}</div>`;
        div.setAttribute('contenteditable', 'false');
        div.setAttribute('data-memo-uid', uid);
        div.setAttribute('data-content-type', contentType);
        div.addEventListener('mouseenter', () => {
            block.querySelectorAll('[data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                memoEl.classList.add('QYLinlinememoActive');
            });
        });
        div.addEventListener('mouseleave', () => {
            block.querySelectorAll('[data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                memoEl.classList.remove('QYLinlinememoActive');
            });
        });
        div.addEventListener('click', (e) => {
            const firstDiv = div.querySelector('div:first-child');
            if (e.target === firstDiv && e.button === 0) {
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
            }
            const targetMemoEl = block.querySelector('[data-inline-memo-content][data-memo-uid="' + uid + '"]');
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
        if (isRenderingMemo) return; 
        isRenderingMemo = true;
        try {
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
        } finally {
            isRenderingMemo = false;
        }
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
        const memoElements = wysiwyg.querySelectorAll('[data-inline-memo-content]');
        if (memoElements.length === 0) return;
        const avGalleryContents = wysiwyg.querySelectorAll('.av__gallery-content');
        const memoList = [];
        memoElements.forEach((memoEl, idx) => {
            if (isInFoldedBlock(memoEl)) {
                return;
            }
            let isInGallery = false;
            for (const galleryContent of avGalleryContents) {
                if (galleryContent.contains(memoEl)) {
                    isInGallery = true;
                    break;
                }
            }
            if (isInGallery) {
                return;
            }
            const memoContent = memoEl.getAttribute('data-inline-memo-content');
            if (!memoContent) return;
            const memoText = memoEl.innerText || memoEl.textContent || '';
            const uid = generateMemoUid(memoEl, idx);
            memoList.push({memoContent, memoText, memoEl, uid});
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
                observer.observe(wysiwyg, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['data-inline-memo-content', 'fold']
                });
            }
        }
    },
    bindMemoEvents(memoEl, uid, titleElement) {
        memoEl.removeEventListener('mouseenter', memoEl._QYL_memo_mouseenter);
        memoEl.removeEventListener('mouseleave', memoEl._QYL_memo_mouseleave);
        memoEl.removeEventListener('click', memoEl._QYL_memo_click);
        memoEl._QYL_memo_mouseenter = () => {
            titleElement.querySelectorAll('div.QYL-inline-memo.protyle-custom[data-memo-uid="' + uid + '"]').forEach(div => {
                div.classList.add('QYLmemoActive');
            });
        };
        memoEl._QYL_memo_mouseleave = () => {
            titleElement.querySelectorAll('div.QYL-inline-memo.protyle-custom[data-memo-uid="' + uid + '"]').forEach(div => {
                div.classList.remove('QYLmemoActive');
            });
        };
        memoEl._QYL_memo_click = (e) => {
            const targetDiv = titleElement.querySelector('div.QYL-inline-memo.protyle-custom[data-memo-uid="' + uid + '"]');
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
        memoList.forEach(({memoContent, memoText, uid}) => {
            const div = this.createMemoDiv(memoContent, memoText, uid, wysiwyg);
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
    createMemoDiv(memoContent, memoText, uid, wysiwyg) {
        const div = document.createElement('div');
        div.className = 'QYL-inline-memo protyle-custom';
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
        const targetMemoEl = wysiwyg.querySelector('[data-inline-memo-content][data-memo-uid="' + uid + '"]');
        if (targetMemoEl) {
            const targetRect = targetMemoEl.getBoundingClientRect();
            const wysiwygRect = wysiwyg.getBoundingClientRect();
            const relativeTop = targetRect.top - wysiwygRect.top;
            const offset = 8; 
            div.style.top = `${relativeTop - offset}px`;
        }
        div.addEventListener('mouseenter', () => {
            wysiwyg.querySelectorAll('[data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                memoEl.classList.add('QYLinlinememoActive');
            });
        });
        div.addEventListener('mouseleave', () => {
            wysiwyg.querySelectorAll('[data-memo-uid="' + uid + '"]')?.forEach(memoEl => {
                memoEl.classList.remove('QYLinlinememoActive');
            });
        });
        div.addEventListener('click', (e) => {
            const firstDiv = div.querySelector('div:first-child');
            if (e.target === firstDiv && e.button === 0) {
                e.preventDefault();
                e.stopPropagation();
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
            const targetMemoEl = wysiwyg.querySelector('[data-inline-memo-content][data-memo-uid="' + uid + '"]');
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
        const offset = 8; 
        memoElements.forEach(div => {
            const memoUid = div.getAttribute('data-memo-uid');
            const targetMemoEl = wysiwyg.querySelector('[data-inline-memo-content][data-memo-uid="' + memoUid + '"]');
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
    wysiwyg.classList.remove('QYLmemoProtyle');
    wysiwyg.classList.remove('QYLmemoHide');
    if (wysiwyg.parentElement) {
        wysiwyg.parentElement.classList.remove('QYLmemoHide');
    }
    removeHideMemoButton(wysiwyg);
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
    updateMemoProtyleClass(wysiwyg);
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
        attributeFilter: ['data-inline-memo-content', 'fold']
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
