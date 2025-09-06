function initFileTreeIndent() {
    const style = document.createElement('style');
    style.id = 'QYL-FileTreeIndent';
    style.textContent = `
      :root {
          --QYL-indent-color: color-mix(in srgb, var(--b3-theme-on-surface-light) 50%, transparent);
          --QYL-indent-1: 20px;
          --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
      }
      .file-tree > .fn__flex-1 > ul > ul,
      .QYLmobile #sidebar :is([data-type="sidebar-file"], [data-type="sidebar-outline"], [data-type="sidebar-bookmark"], [data-type="sidebar-tag"]) .fn__flex-1 ul > ul {
          --QYL-indent-1: 20px;
          --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
          background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
          & > ul {
              --QYL-indent-1: 38px;
              --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
              background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
              & > ul {
                  --QYL-indent-1: 56px;
                  --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                  & > ul {
                      --QYL-indent-1: 74px;
                      --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                      background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                      & > ul {
                          --QYL-indent-1: 92px;
                          --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                          background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                          & > ul {
                              --QYL-indent-1: 110px;
                              --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                              background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                              & > ul {
                                  --QYL-indent-1: 128px;
                                  --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                                  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                                  & > ul {
                                      --QYL-indent-1: 146px;
                                      --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                                      background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                                      & > ul {
                                          --QYL-indent-1: 164px;
                                          --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                                          background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                                          & > ul {
                                              --QYL-indent-1: 182px;
                                              --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                                              background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                                              & > ul {
                                                  --QYL-indent-1: 200px;
                                                  --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                                                  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                                                  & > ul {
                                                      --QYL-indent-1: 218px;
                                                      --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                                                      background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                                                      & > ul {
                                                          --QYL-indent-1: 236px;
                                                          --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                                                          background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                                                          & > ul {
                                                              --QYL-indent-1: 254px;
                                                              --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                                                              background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                                                              & > ul {
                                                                  --QYL-indent-1: 272px;
                                                                  --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                                                                  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                                                                  & > ul {
                                                                      --QYL-indent-1: 290px;
                                                                      --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                                                                      background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                                                                      & > ul {
                                                                          --QYL-indent-1: 308px;
                                                                          --QYL-indent-2: calc(var(--QYL-indent-1) + 1px);
                                                                          background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1), var(--QYL-indent-color) var(--QYL-indent-1) var(--QYL-indent-2), rgba(0, 0, 0, 0) var(--QYL-indent-2) 100%);
                                                                      }
                                                                  }
                                                              }
                                                          }
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
    `;
    document.head.appendChild(style);
}
function removeFileTreeIndent() {
    const style = document.getElementById('QYL-FileTreeIndent');
    if (style) {
        style.remove();
    }
}
export { initFileTreeIndent, removeFileTreeIndent };
