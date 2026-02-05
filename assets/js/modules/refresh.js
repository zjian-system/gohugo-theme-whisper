import { Pjax } from '../utils/pjax.js';

const init = () => {
  new Pjax({
    selectors: ['main'],
    filter: '.no-pjax',
    cache: true,
    scroll: true,
    timeout: 5000,
  });

  pjax = new Pjax({
    elements: ['header nav', 'main'], // 指定刷新的区域
    selectors: 'a',                // 指定拦截所有的 a 标签
    filter: '.no-pjax',
    cache: true,
    debug: true
  });

  // 监听事件 (可选，例如集成 NProgress)
  document.addEventListener('pjax:send', () => {
    console.log('开始加载...');
    // NProgress.start();
  });

  document.addEventListener('pjax:complete', () => {
    console.log('加载完成!');
    // NProgress.done();
  });

  document.addEventListener('pjax:error', () => {
    console.log('加载失败');
  });
}

export { init }