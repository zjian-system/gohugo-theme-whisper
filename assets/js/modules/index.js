// modules 模块入口
// import * as copyright from './copyright.js';
import * as header from './header.js';
import * as footer from './footer.js';
import * as sidebar from './sidebar.js';
import * as search from './search.js';
import * as lazyload from './lazyload.js';
import * as backToTop from './backToTop.js';

// 默认初始化模块
export const init = () => {
  // 初始化版权信息
  // copyright.init();

  // 初始化图片懒加载模块
  // lazyload.init();

};

// 导出各个模块
export {
  header,
  footer,
  sidebar,
  search,
  lazyload,
  backToTop
};