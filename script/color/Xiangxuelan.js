export function initXiangxuelan() {
    if (document.getElementById('QYL-Xiangxuelan')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'QYL-Xiangxuelan';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/appearance/themes/QYL/style/Color/Xiangxuelan.css';
    document.head.appendChild(link);
}
export function removeXiangxuelan() {
    const xiangxuelanLink = document.getElementById('QYL-Xiangxuelan');
    if (xiangxuelanLink) {
        xiangxuelanLink.remove();
    }
} 