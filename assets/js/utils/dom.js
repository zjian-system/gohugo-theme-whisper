/**
 * 获取单个元素
 * @param {string} selector - 选择器
 * @param {HTMLElement} context - 上下文元素
 * @returns {HTMLElement|null}
 */
const $ = (selector, context = document) => {
  return context.querySelector(selector);
}

/**
 * 获取多个元素
 * @param {string} selector - 选择器
 * @param {HTMLElement} context - 上下文元素
 * @returns {NodeList}
 */
const $$ = (selector, context = document) => {
  return context.querySelectorAll(selector);
}

/**
 * 添加事件监听器
 * @param {HTMLElement} element - 元素
 * @param {string} event - 事件类型
 * @param {Function} handler - 事件处理函数
 * @param {Object} options - 选项
 */
const on = (element, event, handler, options = {}) => {
  element.addEventListener(event, handler, options);
}

/**
 * 移除事件监听器
 * @param {HTMLElement} element - 元素
 * @param {string} event - 事件类型
 * @param {Function} handler - 事件处理函数
 * @param {Object} options - 选项
 */
const off = (element, event, handler, options = {}) => {
  element.removeEventListener(event, handler, options);
}

/**
 * 触发事件
 * @param {HTMLElement} element - 元素
 * @param {string} event - 事件类型
 * @param {Object} detail - 事件详情
 */
const trigger = (element, event, detail = {}) => {
  const customEvent = new CustomEvent(event, {
    bubbles: true,
    cancelable: true,
    detail
  });
  element.dispatchEvent(customEvent);
}

/**
 * 添加类
 * @param {HTMLElement} element - 元素
 * @param {string|string[]} className - 类名
 */
const addClass = (element, className) => {
  if (Array.isArray(className)) {
    className.forEach(cls => element.classList.add(cls));
  } else {
    element.classList.add(className);
  }
}

/**
 * 移除类
 * @param {HTMLElement} element - 元素
 * @param {string|string[]} className - 类名
 */
const removeClass = (element, className) => {
  if (Array.isArray(className)) {
    className.forEach(cls => element.classList.remove(cls));
  } else {
    element.classList.remove(className);
  }
}

/**
 * 切换类
 * @param {HTMLElement} element - 元素
 * @param {string} className - 类名
 * @param {boolean} force - 强制状态
 * @returns {boolean}
 */
const toggleClass = (element, className, force) => {
  return element.classList.toggle(className, force);
}

/**
 * 检查是否包含类
 * @param {HTMLElement} element - 元素
 * @param {string} className - 类名
 * @returns {boolean}
 */
const hasClass = (element, className) => {
  return element.classList.contains(className);
}

/**
 * 设置样式
 * @param {HTMLElement} element - 元素
 * @param {Object} styles - 样式对象
 */
const setStyle = (element, styles) => {
  Object.assign(element.style, styles);
}

/**
 * 获取样式
 * @param {HTMLElement} element - 元素
 * @param {string} property - 属性名
 * @returns {string}
 */
const getStyle = (element, property) => {
  return getComputedStyle(element).getPropertyValue(property);
}

/**
 * 平滑滚动到元素
 * @param {HTMLElement} element - 目标元素
 * @param {Object} options - 选项
 */
const scrollTo = (element, options = {}) => {
  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };
  element.scrollIntoView({ ...defaultOptions, ...options });
}

export {
  $,
  $$,
  on,
  off,
  trigger,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  setStyle,
  getStyle,
  scrollTo
};
