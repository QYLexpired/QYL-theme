export function initCardLayout() {
    if (document.body.classList.contains('QYLmobile')) return;
    document.documentElement.classList.add('QYLCardLayout');
    const style = document.createElement('style');
    style.id = 'QYL-CardLayout';
    style.textContent = `
        :root {
            --QYL-card-layout-main: 3px;
        }
        .QYLCardLayout .layout__resize {
            margin: var(--QYL-card-layout-main) 0;
        }
        .QYLCardLayout .layout__resize.layout__resize--lr {
            margin: 0 var(--QYL-card-layout-main);
        }
        .QYLCardLayout #layouts:not(.layout__center) {
            padding: 6px 0 calc(var(--QYL-card-layout-main) + 6px) 0;
        }
        .QYLCardLayout :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] {
            border: 1px solid var(--b3-theme-surface-lighter);
            box-sizing: border-box;
        }
        .QYLCardLayout .layout__center:not(#layouts) :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] {
            border: 1px solid var(--b3-theme-surface-lighter);
            box-sizing: border-box;
        }
        .QYLCardLayout.QYLInkMode :is(.layout__dockl, .layout__dockr, .layout__dockb) > :is(.fn__flex-1, .fn__flex, .fn__flex-column) > [data-type="wnd"] {
            border: 1.5px solid var(--b3-theme-primary);
            box-sizing: border-box;
        }
        .QYLCardLayout.QYLInkMode .layout__center:not(#layouts) :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] {
            border: 1.5px solid var(--b3-theme-primary);
            box-sizing: border-box;
        }
        .QYLCardLayout.QYLVerticalTab .layout__center:not(#layouts) :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"].QYLWndTopLeft {
            border: none;
            & > .fn__flex:first-child {
                border: 1px solid var(--b3-theme-surface-lighter);
                box-sizing: border-box;
            }
            & > .layout-tab-container {
                border: 1px solid var(--b3-theme-surface-lighter);
                box-sizing: border-box;
            }
        }
        .QYLCardLayout.QYLVerticalTab.QYLInkMode .layout__center:not(#layouts) :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"].QYLWndTopLeft {
            border: none;
            & > .fn__flex:first-child {
                border: 1.5px solid var(--b3-theme-primary);
                box-sizing: border-box;
            }
            & > .layout-tab-container {
                border: 1.5px solid var(--b3-theme-primary);
                box-sizing: border-box;
            }
        }
        .QYLCardLayout.QYLFusionOn .layout__center:not(#layouts) :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] {
            border: none;
            & > .layout-tab-container {
                border: 1px solid var(--b3-theme-surface-lighter);
                box-sizing: border-box;
            }
        }
        .QYLCardLayout.QYLFusionOn.QYLInkMode .layout__center:not(#layouts) :is(.fn__flex-1, .fn__flex, .fn__flex-column) [data-type="wnd"] {
            border: none;
            & > .layout-tab-container {
                border: 1.5px solid var(--b3-theme-primary);
                box-sizing: border-box;
            }
        }
        @media (min-width: 630px) {
            .QYLCardLayout #dockBottom:not(.fn__none) + #status {
                bottom: calc(var(--QYL-card-layout-main) + 48px) !important;
            }
            .QYLCardLayout #toolbar ~ #status {
                bottom: calc(var(--QYL-card-layout-main) + 12px);
            }
        }
    `;
    document.head.appendChild(style);
}
export function removeCardLayout() {
    document.documentElement.classList.remove('QYLCardLayout');
    const style = document.getElementById('QYL-CardLayout');
    if (style) {
        style.remove();
    }
}
