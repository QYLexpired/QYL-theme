export function initGridSearchList() {
    if (document.body.classList.contains('QYLmobile')) return;
    const style = document.createElement('style');
    style.id = 'QYL-GridSearchList';
    style.textContent = `
        #searchList {
            .search__empty {
                display: block !important;
            }
            & > .b3-list-item:not([data-type="search-item"]) + div {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 6px;
                padding: 0 8px 12px 8px;
                & > [data-type="search-item"] {
                    margin: 0;
                    outline: 1px solid var(--b3-theme-surface-lighter);
                    min-height: auto;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    padding-left: 8px !important;
                    & .b3-list-item__text {
                        margin-top: -1px;
                        margin-left: -20px;
                        text-indent: 20px;
                        -webkit-line-clamp: 5;
                    }
                    & .b3-list-item__meta:not(.b3-list-item__meta--ellipsis) {
                        margin-top: auto;
                    }
                    & .b3-list-item__meta--ellipsis:not(.ariaLabel) {
                        margin-top: auto;
                    }
                }
            }
        }
        #searchList:has(> .b3-list-item[data-type="search-item"]) {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 6px;
            padding: 6px;
            & > .b3-list-item {
                margin: 0;
                outline: 1px solid var(--b3-theme-surface-lighter);
                min-height: auto;
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
                & .b3-list-item__meta--ellipsis.ariaLabel {
                    position: absolute;
                    top: 1px;
                    left: 18px;
                    max-width: calc(100% - 38px);
                    background-color: transparent;
                    font-weight: bold;
                    color: var(--b3-theme-on-background);
                    &::before {
                        display: none;
                    }
                }
                & .b3-list-item__meta:not(.b3-list-item__meta--ellipsis) {
                    margin-top: auto;
                }
                & .b3-list-item__meta--ellipsis:not(.ariaLabel) {
                    margin-top: auto;
                }
                & .b3-list-item__text {
                    margin-top: 25px;
                    margin-left: -20px;
                    -webkit-line-clamp: 5;
                }
                & .b3-list-item__graphic:not(.popover__block) ~ .b3-list-item__meta--ellipsis.ariaLabel {
                    left: 38px;
                    max-width: calc(100% - 58px);
                }
            }
        }
        #searchAssetList {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 6px;
            padding: 6px;
            & > .b3-list-item {
                margin: 0;
                outline: 1px solid var(--b3-theme-surface-lighter);
                min-height: auto;
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
                & .b3-list-item__meta--ellipsis.ariaLabel {
                    position: absolute;
                    top: 5px;
                    left: 30px;
                    max-width: calc(100% - 115px);
                    background-color: transparent;
                    font-weight: bold;
                    color: var(--b3-theme-on-background);
                }
                & .b3-list-item__meta:not(.b3-list-item__meta--ellipsis) {
                    margin-top: auto;
                }
                & .b3-list-item__meta--ellipsis:not(.ariaLabel) {
                    margin-top: auto;
                }
                & .b3-list-item__text {
                    margin-top: 25px;
                    margin-left: -25px;
                    -webkit-line-clamp: 5;
                    & + .b3-list-item__meta {
                        position: absolute;
                        top: 10px;
                        right: 6px;
                        max-width: 150px;
                    }
                }
            }
        }
    `;
    document.head.appendChild(style);
}
export function removeGridSearchList() {
    const style = document.getElementById('QYL-GridSearchList');
    if (style) {
        style.remove();
    }
}
