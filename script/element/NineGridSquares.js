export function initNineGridSquares() {
    const style = document.createElement('style');
    style.id = 'snippet-QYL-NineGridSquares';
    style.textContent = `
        .protyle-wysiwyg [custom-img-border="圆角"][custom-img-display="九宫格排列"] > div[contenteditable]:has(> span.img:nth-of-type(n+10)) > span.img:nth-of-type(9) > span:has( > img)::after {
            border-radius: 12px;
        }
        .protyle-wysiwyg [custom-img-border="圆形"][custom-img-display="九宫格排列"] > div[contenteditable]:has(> span.img:nth-of-type(n+10)) > span.img:nth-of-type(9) > span:has( > img)::after {
            border-radius: 50%;
        }
        [custom-img-display="九宫格排列"] > div[contenteditable] {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5px 0px
        }
        [custom-img-display="九宫格排列"] > div[contenteditable] > span.img {
            flex: 0 0 calc((100% - 6px) / 3);
            position: relative;
            aspect-ratio: 1 / 1;
            overflow: hidden;
            margin: 0;
            container-type: inline-size;
            &:hover .protyle-action__drag {
                display: none;
            }
        }
        [custom-img-display="九宫格排列"] > div[contenteditable] > span.img:nth-of-type(n+10) {
            display: none;
        }
        @keyframes QYL9enter {
            0% {
              transform: scale(0.7);
              opacity: 0;
            }
            50% {
              transform: scale(1.03);
              opacity: 1;
            }
            70% {
              transform: scale(0.98);
            }
            85% {
              transform: scale(1.01);
            }
            100% {
              transform: scale(1);
            }
        }
        @keyframes QYL9in {
            0% {
              transform: scale(1.05);
              opacity: 0;
            }
            100% {
              transform: scale(1);
            }
        }
        [custom-img-display="九宫格排列"] > div[contenteditable]:has(> span.img:nth-of-type(n+10)) {
            & > span.img:nth-of-type(9) > span:has( > img)::after {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                color: #fff;
                font-size: 40cqw;
                display: flex;
                justify-content: center;
                align-items: center;
                aspect-ratio: 1 / 1;
                z-index: 1;
                animation: QYL9in 0.3s cubic-bezier(0.8, 0, 0.9, 1);
            }
            &:hover {
                & > span.img:nth-of-type(n+10) {
                    display: block;
                    animation: QYL9enter 0.6s cubic-bezier(0.8, 0, 0.9, 1);
                }
                & > span.img:nth-of-type(9) > span:has( > img)::after {
                    display: none;
                }
            }
        }
        [custom-img-display="九宫格排列"] > div[contenteditable]:has(> span.img:nth-of-type(n+10)) > span.img:nth-of-type(9) > span:has( > img)::after { content: "+1" }
        [custom-img-display="九宫格排列"] > div[contenteditable]:has(> span.img:nth-of-type(n+11)) > span.img:nth-of-type(9) > span:has( > img)::after { content: "+2" }
        [custom-img-display="九宫格排列"] > div[contenteditable]:has(> span.img:nth-of-type(n+12)) > span.img:nth-of-type(9) > span:has( > img)::after { content: "+3" }
        [custom-img-display="九宫格排列"] > div[contenteditable]:has(> span.img:nth-of-type(n+13)) > span.img:nth-of-type(9) > span:has( > img)::after { content: "+4" }
        [custom-img-display="九宫格排列"] > div[contenteditable]:has(> span.img:nth-of-type(n+14)) > span.img:nth-of-type(9) > span:has( > img)::after { content: "+5" }
        [custom-img-display="九宫格排列"] > div[contenteditable]:has(> span.img:nth-of-type(n+15)) > span.img:nth-of-type(9) > span:has( > img)::after { content: "+N" }
        [custom-img-display="九宫格排列"] > div[contenteditable] > span.img > span:has( > img) {
            aspect-ratio: 1 / 1;
            width: 100% !important;
        }
        [custom-img-display="九宫格排列"] > div[contenteditable] > span.img > span > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            min-width: 100%;
            min-height: 100%;
            &:not([title]) ~ .protyle-action__title {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}
export function removeNineGridSquares() {
    const style = document.getElementById('snippet-QYL-NineGridSquares');
    if (style) {
        style.remove();
    }
}
