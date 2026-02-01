/**
 * 底部模块
 */
import { dom, helpers } from '../utils/index.js';

export const init = () => {
  helpers.log('初始化底部模块');

  // 初始化版权信息
  initCopyright();

  // 初始化社交媒体链接
  initSocialLinks();
};

/**
 * 初始化版权信息
 */
const initCopyright = () => {
  const copyrightYear = dom.$('.copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
};

/**
 * 初始化社交媒体链接
 */
const initSocialLinks = () => {
  const socialLinks = dom.$$('.social-link');

  socialLinks.forEach(link => {
    dom.on(link, 'click', (e) => {
      // 可以添加社交媒体链接点击的逻辑
    });
  });
};

export default {
  init
};