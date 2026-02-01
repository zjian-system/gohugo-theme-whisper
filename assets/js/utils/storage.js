/**
 * 本地存储工具函数
 */
export const storage = {
  /**
   * 设置本地存储
   * @param {string} key - 键
   * @param {any} value - 值
   */
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  },

  /**
   * 获取本地存储
   * @param {string} key - 键
   * @param {any} defaultValue - 默认值
   * @returns {any}
   */
  get: (key, defaultValue = null) => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return defaultValue;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error('Error getting localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * 移除本地存储
   * @param {string} key - 键
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage:', error);
    }
  },

  /**
   * 清空本地存储
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  /**
   * 检查本地存储是否可用
   * @returns {boolean}
   */
  isAvailable: () => {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * 获取本地存储使用情况
   * @returns {Object}
   */
  getUsage: () => {
    try {
      let totalSize = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length;
        }
      }
      return {
        used: totalSize,
        usedKB: (totalSize / 1024).toFixed(2),
        // 估算的最大容量（通常为5MB）
        max: 5 * 1024 * 1024,
        maxKB: 5 * 1024,
        usagePercent: ((totalSize / (5 * 1024 * 1024)) * 100).toFixed(2)
      };
    } catch (error) {
      console.error('Error getting localStorage usage:', error);
      return null;
    }
  }
};

export default storage;