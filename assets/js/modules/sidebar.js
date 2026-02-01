/**
 * 侧边栏模块
 */
import { dom, helpers } from '../utils/index.js';

export const init = () => {

  // 初始化侧边栏切换
  initSidebarToggle();

  // 初始化侧边栏滚动
  initSidebarScroll();
};

/**
 * 初始化侧边栏切换
 */
const initSidebarToggle = () => {
  const sidebarToggle = dom.$('.sidebar-toggle');
  const sidebar = dom.$('.sidebar');

  if (sidebarToggle && sidebar) {
    dom.on(sidebarToggle, 'click', () => {
      dom.toggleClass(sidebar, 'active');
      dom.toggleClass(sidebarToggle, 'active');
    });
  }
};

/**
 * 初始化侧边栏滚动
 */
const initSidebarScroll = () => {
  const sidebar = dom.$('.sidebar');

  if (sidebar) {
    // 可以添加侧边栏滚动相关的逻辑
    // 例如：固定侧边栏、滚动监听等
  }
};

export default {
  init
};