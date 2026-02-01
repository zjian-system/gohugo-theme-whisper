/**
 * 懒加载模块
 */
import { helpers, dom } from '../utils/index.js';

export const init = () => {

  // 初始化图片懒加载
  initImageLazyload();
};

/**
 * 初始化图片懒加载
 */
const initImageLazyload = () => {
  const lazyImages = dom.$$('img[data-src]');

  if ('IntersectionObserver' in window) {
    // 使用 Intersection Observer API
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          loadImage(image);
          observer.unobserve(image);
        }
      });
    }, {
      rootMargin: '50px 0px', // 提前 50px 开始加载
      threshold: 0.1
    });

    lazyImages.forEach(image => {
      imageObserver.observe(image);
    });
  } else {
    // 降级方案：使用滚动事件
    const lazyLoad = helpers.throttle(() => {
      lazyImages.forEach(image => {
        if (helpers.isInViewport(image)) {
          loadImage(image);
        }
      });
    }, 200);

    dom.on(window, 'scroll', lazyLoad);
    dom.on(window, 'resize', lazyLoad);
    dom.on(window, 'orientationchange', lazyLoad);

    // 初始检查
    lazyLoad();
  }
};

/**
 * 加载图片
 * @param {HTMLImageElement} image - 图片元素
 */
const loadImage = (image) => {
  const src = image.getAttribute('data-src');
  if (src) {
    image.src = src;
    image.removeAttribute('data-src');

    // 添加加载完成的类
    dom.addClass(image, 'lazyloaded');

    // 图片加载失败处理
    dom.on(image, 'error', () => {
      dom.addClass(image, 'lazyload-error');
    });

    // 图片加载成功处理
    dom.on(image, 'load', () => {
      dom.addClass(image, 'lazyload-success');
    });
  }
};

export default {
  init
};