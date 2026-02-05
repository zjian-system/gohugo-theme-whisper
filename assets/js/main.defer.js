import { toggleTheme } from './modules/theme.js';
import { defineCustomElements } from './components/index.js';
import { init as initRefresh } from './modules/refresh.js';


(function () {
  toggleTheme();
  defineCustomElements();

  // 初始化刷新
  initRefresh();

})();

