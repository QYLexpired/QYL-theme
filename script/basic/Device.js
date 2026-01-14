export const isMobile = !!window.siyuan?.mobile;
if (isMobile) {
  document.body.classList.add('QYLmobile');
}
const isMac = navigator.userAgent.includes('Mac') && navigator.userAgent.includes('Electron');
if (isMac) {
  document.body.classList.add('QYLmac');
}