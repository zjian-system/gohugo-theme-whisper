/**
 * 返回顶部模块
 */
import { dom, helpers } from '../utils/index.js';

export const init = () => {

  // 创建返回顶部按钮
  createBackToTopButton();

  // 初始化返回顶部功能
  initBackToTop();
};

/**
 * 创建返回顶部按钮
 */
const createBackToTopButton = () => {
  // 检查是否已存在返回顶部按钮
  if (!dom.$('.back-to-top')) {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', '返回顶部');
    backToTopButton.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #333;
      color: #fff;
      border: none;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    document.body.appendChild(backToTopButton);
  }
};

/**
 * 初始化返回顶部功能
 */
const initBackToTop = () => {
  const backToTopButton = dom.$('.back-to-top');

  if (backToTopButton) {
    // 滚动事件监听
    const handleScroll = helpers.throttle(() => {
      if (window.scrollY > 300) {
        // 显示按钮
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
      } else {
        // 隐藏按钮
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
      }
    }, 100);

    dom.on(window, 'scroll', handleScroll);

    // 初始检查
    handleScroll();

    // 点击事件
    dom.on(backToTopButton, 'click', () => {
      // 平滑滚动到顶部
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });
  }
};

export default {
  init
};