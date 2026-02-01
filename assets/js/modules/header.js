/**
 * 头部模块
 */
import { dom } from '../utils/dom.js';

export const init = () => {

  // 初始化导航菜单
  initNavigation();

  // 初始化移动端菜单
  initMobileMenu();
};

/**
 * 初始化导航菜单
 */
const initNavigation = () => {
  const navLinks = dom.$$('.nav-link');

  // 为导航链接添加点击事件
  navLinks.forEach(link => {
    dom.on(link, 'click', (e) => {
      // 可以添加导航相关的逻辑
    });
  });
};

/**
 * 初始化移动端菜单
 */
const initMobileMenu = () => {
  const menuToggle = dom.$('.menu-toggle');
  const mobileMenu = dom.$('.mobile-menu');

  if (menuToggle && mobileMenu) {
    dom.on(menuToggle, 'click', () => {
      dom.toggleClass(mobileMenu, 'active');
      dom.toggleClass(menuToggle, 'active');
    });

    // 点击菜单外部关闭菜单
    dom.on(document, 'click', (e) => {
      if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        dom.removeClass(mobileMenu, 'active');
        dom.removeClass(menuToggle, 'active');
      }
    });
  }
};

export default {
  init
};