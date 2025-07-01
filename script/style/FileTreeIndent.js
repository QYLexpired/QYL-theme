function initFileTreeIndent() {
    const style = document.createElement('style');
    style.id = 'QYL-FileTreeIndent';
    style.textContent = `
      :root {
          --QYL-indent-1-1: 20px;
          --QYL-indent-1-2: 21px;
          --QYL-indent-2-1: 38px;
          --QYL-indent-2-2: 39px;
          --QYL-indent-3-1: 56px;
          --QYL-indent-3-2: 57px;
          --QYL-indent-4-1: 74px;
          --QYL-indent-4-2: 75px;
          --QYL-indent-5-1: 92px;
          --QYL-indent-5-2: 93px;
          --QYL-indent-6-1: 110px;
          --QYL-indent-6-2: 111px;
          --QYL-indent-7-1: 128px;
          --QYL-indent-7-2: 129px;
          --QYL-indent-8-1: 146px;
          --QYL-indent-8-2: 147px;
          --QYL-indent-9-1: 164px;
          --QYL-indent-9-2: 165px;
          --QYL-indent-10-1: 182px;
          --QYL-indent-10-2: 183px;
          --QYL-indent-11-1: 200px;
          --QYL-indent-11-2: 201px;
          --QYL-indent-12-1: 218px;
          --QYL-indent-12-2: 219px;
          --QYL-indent-13-1: 236px;
          --QYL-indent-13-2: 237px;
          --QYL-indent-14-1: 254px;
          --QYL-indent-14-2: 255px;
          --QYL-indent-15-1: 272px;
          --QYL-indent-15-2: 273px;
      }
      .file-tree>.fn__flex-1>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1-1), var(--b3-theme-surface-lighter) var(--QYL-indent-1-1) var(--QYL-indent-1-2), rgba(0, 0, 0, 0) var(--QYL-indent-1-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-2-1), var(--b3-theme-surface-lighter) var(--QYL-indent-2-1) var(--QYL-indent-2-2), rgba(0, 0, 0, 0) var(--QYL-indent-2-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-3-1), var(--b3-theme-surface-lighter) var(--QYL-indent-3-1) var(--QYL-indent-3-2), rgba(0, 0, 0, 0) var(--QYL-indent-3-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-4-1), var(--b3-theme-surface-lighter) var(--QYL-indent-4-1) var(--QYL-indent-4-2), rgba(0, 0, 0, 0) var(--QYL-indent-4-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-5-1), var(--b3-theme-surface-lighter) var(--QYL-indent-5-1) var(--QYL-indent-5-2), rgba(0, 0, 0, 0) var(--QYL-indent-5-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-6-1), var(--b3-theme-surface-lighter) var(--QYL-indent-6-1) var(--QYL-indent-6-2), rgba(0, 0, 0, 0) var(--QYL-indent-6-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-7-1), var(--b3-theme-surface-lighter) var(--QYL-indent-7-1) var(--QYL-indent-7-2), rgba(0, 0, 0, 0) var(--QYL-indent-7-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-8-1), var(--b3-theme-surface-lighter) var(--QYL-indent-8-1) var(--QYL-indent-8-2), rgba(0, 0, 0, 0) var(--QYL-indent-8-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-9-1), var(--b3-theme-surface-lighter) var(--QYL-indent-9-1) var(--QYL-indent-9-2), rgba(0, 0, 0, 0) var(--QYL-indent-9-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-10-1), var(--b3-theme-surface-lighter) var(--QYL-indent-10-1) var(--QYL-indent-10-2), rgba(0, 0, 0, 0) var(--QYL-indent-10-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-11-1), var(--b3-theme-surface-lighter) var(--QYL-indent-11-1) var(--QYL-indent-11-2), rgba(0, 0, 0, 0) var(--QYL-indent-11-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-12-1), var(--b3-theme-surface-lighter) var(--QYL-indent-12-1) var(--QYL-indent-12-2), rgba(0, 0, 0, 0) var(--QYL-indent-12-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-13-1), var(--b3-theme-surface-lighter) var(--QYL-indent-13-1) var(--QYL-indent-13-2), rgba(0, 0, 0, 0) var(--QYL-indent-13-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-14-1), var(--b3-theme-surface-lighter) var(--QYL-indent-14-1) var(--QYL-indent-14-2), rgba(0, 0, 0, 0) var(--QYL-indent-14-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-15-1), var(--b3-theme-surface-lighter) var(--QYL-indent-15-1) var(--QYL-indent-15-2), rgba(0, 0, 0, 0) var(--QYL-indent-15-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-8-1), var(--b3-theme-surface-lighter) var(--QYL-indent-8-1) var(--QYL-indent-8-2), rgba(0, 0, 0, 0) var(--QYL-indent-8-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-9-1), var(--b3-theme-surface-lighter) var(--QYL-indent-9-1) var(--QYL-indent-9-2), rgba(0, 0, 0, 0) var(--QYL-indent-9-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-10-1), var(--b3-theme-surface-lighter) var(--QYL-indent-10-1) var(--QYL-indent-10-2), rgba(0, 0, 0, 0) var(--QYL-indent-10-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-11-1), var(--b3-theme-surface-lighter) var(--QYL-indent-11-1) var(--QYL-indent-11-2), rgba(0, 0, 0, 0) var(--QYL-indent-11-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-12-1), var(--b3-theme-surface-lighter) var(--QYL-indent-12-1) var(--QYL-indent-12-2), rgba(0, 0, 0, 0) var(--QYL-indent-12-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-13-1), var(--b3-theme-surface-lighter) var(--QYL-indent-13-1) var(--QYL-indent-13-2), rgba(0, 0, 0, 0) var(--QYL-indent-13-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-14-1), var(--b3-theme-surface-lighter) var(--QYL-indent-14-1) var(--QYL-indent-14-2), rgba(0, 0, 0, 0) var(--QYL-indent-14-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-15-1), var(--b3-theme-surface-lighter) var(--QYL-indent-15-1) var(--QYL-indent-15-2), rgba(0, 0, 0, 0) var(--QYL-indent-15-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-1-1) var(--QYL-indent-1-2), rgba(0, 0, 0, 0) var(--QYL-indent-1-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-2-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-2-1) var(--QYL-indent-2-2), rgba(0, 0, 0, 0) var(--QYL-indent-2-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-3-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-3-1) var(--QYL-indent-3-2), rgba(0, 0, 0, 0) var(--QYL-indent-3-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-4-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-4-1) var(--QYL-indent-4-2), rgba(0, 0, 0, 0) var(--QYL-indent-4-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-5-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-5-1) var(--QYL-indent-5-2), rgba(0, 0, 0, 0) var(--QYL-indent-5-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-6-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-6-1) var(--QYL-indent-6-2), rgba(0, 0, 0, 0) var(--QYL-indent-6-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-7-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-7-1) var(--QYL-indent-7-2), rgba(0, 0, 0, 0) var(--QYL-indent-7-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-8-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-8-1) var(--QYL-indent-8-2), rgba(0, 0, 0, 0) var(--QYL-indent-8-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-9-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-9-1) var(--QYL-indent-9-2), rgba(0, 0, 0, 0) var(--QYL-indent-9-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-10-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-10-1) var(--QYL-indent-10-2), rgba(0, 0, 0, 0) var(--QYL-indent-10-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-11-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-11-1) var(--QYL-indent-11-2), rgba(0, 0, 0, 0) var(--QYL-indent-11-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-12-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-12-1) var(--QYL-indent-12-2), rgba(0, 0, 0, 0) var(--QYL-indent-12-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-13-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-13-1) var(--QYL-indent-13-2), rgba(0, 0, 0, 0) var(--QYL-indent-13-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-14-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-14-1) var(--QYL-indent-14-2), rgba(0, 0, 0, 0) var(--QYL-indent-14-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-15-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-15-1) var(--QYL-indent-15-2), rgba(0, 0, 0, 0) var(--QYL-indent-15-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-8-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-8-1) var(--QYL-indent-8-2), rgba(0, 0, 0, 0) var(--QYL-indent-8-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-9-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-9-1) var(--QYL-indent-9-2), rgba(0, 0, 0, 0) var(--QYL-indent-9-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-10-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-10-1) var(--QYL-indent-10-2), rgba(0, 0, 0, 0) var(--QYL-indent-10-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-11-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-11-1) var(--QYL-indent-11-2), rgba(0, 0, 0, 0) var(--QYL-indent-11-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-12-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-12-1) var(--QYL-indent-12-2), rgba(0, 0, 0, 0) var(--QYL-indent-12-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-13-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-13-1) var(--QYL-indent-13-2), rgba(0, 0, 0, 0) var(--QYL-indent-13-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-14-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-14-1) var(--QYL-indent-14-2), rgba(0, 0, 0, 0) var(--QYL-indent-14-2) 100%) }
      .file-tree>.fn__flex-1>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-15-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-15-1) var(--QYL-indent-15-2), rgba(0, 0, 0, 0) var(--QYL-indent-15-2) 100%) }
      .QYLmobile #sidebar :is([data-type="sidebar-file"], [data-type="sidebar-outline"], [data-type="sidebar-bookmark"], [data-type="sidebar-tag"]) .fn__flex-1 ul {
          & > ul {
              background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-1-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64)  var(--QYL-indent-1-1)  var(--QYL-indent-1-2), rgba(0, 0, 0, 0)  var(--QYL-indent-1-2) 100%);
                & > ul {
                  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-2-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-2-1) var(--QYL-indent-2-2), rgba(0, 0, 0, 0) var(--QYL-indent-2-2) 100%);
                    & > ul {
                      background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-3-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-3-1) var(--QYL-indent-3-2), rgba(0, 0, 0, 0) var(--QYL-indent-3-2) 100%);
                        & > ul {
                          background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-4-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-4-1) var(--QYL-indent-4-2), rgba(0, 0, 0, 0) var(--QYL-indent-4-2) 100%);
                            & > ul {
                              background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-5-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-5-1) var(--QYL-indent-5-2), rgba(0, 0, 0, 0) var(--QYL-indent-5-2) 100%);
                                & > ul {
                                  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-6-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-6-1) var(--QYL-indent-6-2), rgba(0, 0, 0, 0) var(--QYL-indent-6-2) 100%);
                                    & > ul {
                                      background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-7-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-7-1) var(--QYL-indent-7-2), rgba(0, 0, 0, 0) var(--QYL-indent-7-2) 100%);
                                      & > ul {
                                        background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-8-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-8-1) var(--QYL-indent-8-2), rgba(0, 0, 0, 0) var(--QYL-indent-8-2) 100%);
                                        & > ul {
                                          background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-9-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-9-1) var(--QYL-indent-9-2), rgba(0, 0, 0, 0) var(--QYL-indent-9-2) 100%);
                                          & > ul {
                                            background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-10-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-10-1) var(--QYL-indent-10-2), rgba(0, 0, 0, 0) var(--QYL-indent-10-2) 100%);
                                            & > ul {
                                              background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-11-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-11-1) var(--QYL-indent-11-2), rgba(0, 0, 0, 0) var(--QYL-indent-11-2) 100%);
                                              & > ul {
                                                background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-12-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-12-1) var(--QYL-indent-12-2), rgba(0, 0, 0, 0) var(--QYL-indent-12-2) 100%);
                                                & > ul {
                                                  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-13-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-13-1) var(--QYL-indent-13-2), rgba(0, 0, 0, 0) var(--QYL-indent-13-2) 100%);
                                                  & > ul {
                                                    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-14-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-14-1) var(--QYL-indent-14-2), rgba(0, 0, 0, 0) var(--QYL-indent-14-2) 100%);
                                                    & > ul {
                                                      background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 var(--QYL-indent-15-1), oklch(calc(0.7 + var(--b3-theme-primary-brightness) * 0.015) calc(0.15 * var(--b3-theme-primary-saturate)) var(--b3-theme-primary-main) / 0.64) var(--QYL-indent-15-1) var(--QYL-indent-15-2), rgba(0, 0, 0, 0) var(--QYL-indent-15-2) 100%);
      }}}}}}}}}}}}}}}}
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
