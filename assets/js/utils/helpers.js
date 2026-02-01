/**
 * 通用辅助函数
 */
export const helpers = {
  /**
   * 日志工具
   * @param {any} message - 日志消息
   * @param {string} level - 日志级别
   */
  log: (message, level = 'info') => {
    if (process.env.NODE_ENV === 'development' || level === 'error') {
      const prefix = `[Whisper ${level.toUpperCase()}]`;
      switch (level) {
        case 'error':
          console.error(prefix, message);
          break;
        case 'warn':
          console.warn(prefix, message);
          break;
        case 'info':
        default:
          console.log(prefix, message);
          break;
      }
    }
  },

  /**
   * 防抖函数
   * @param {Function} func - 要执行的函数
   * @param {number} wait - 等待时间
   * @param {boolean} immediate - 是否立即执行
   * @returns {Function}
   */
  debounce: (func, wait, immediate = false) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  },

  /**
   * 节流函数
   * @param {Function} func - 要执行的函数
   * @param {number} limit - 时间限制
   * @returns {Function}
   */
  throttle: (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * 检查是否为移动设备
   * @returns {boolean}
   */
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * 获取设备类型
   * @returns {string}
   */
  getDeviceType: () => {
    const userAgent = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      if (/iPad|iPhone|iPod/.test(userAgent)) {
        return 'ios';
      }
      return 'android';
    }
    return 'desktop';
  },

  /**
   * 深拷贝对象
   * @param {Object} obj - 要拷贝的对象
   * @returns {Object}
   */
  deepClone: (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => helpers.deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = helpers.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  },

  /**
   * 随机数生成
   * @param {number} min - 最小值
   * @param {number} max - 最大值
   * @returns {number}
   */
  random: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * 格式化时间
   * @param {Date} date - 日期对象
   * @param {string} format - 格式
   * @returns {string}
   */
  formatDate: (date, format = 'YYYY-MM-DD') => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  },

  /**
   * 检查元素是否在视口中
   * @param {HTMLElement} element - 元素
   * @param {Object} options - 选项
   * @returns {boolean}
   */
  isInViewport: (element, options = {}) => {
    const defaultOptions = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    const config = { ...defaultOptions, ...options };
    const rect = element.getBoundingClientRect();

    return (
      rect.top >= config.top &&
      rect.left >= config.left &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - config.bottom &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) - config.right
    );
  },

  /**
   * 延迟函数
   * @param {number} ms - 延迟毫秒数
   * @returns {Promise}
   */
  delay: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

export default helpers;