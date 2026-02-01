/**
 * 设置本地存储
 * @param {string} key - 键
 * @param {any} value - 值
 */
const set = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
}

/**
 * 获取本地存储
 * @param {string} key - 键
 * @param {any} defaultValue - 默认值
 * @returns {any}
 */
const get = (key, defaultValue = null) => {
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
}

/**
   * 移除本地存储
   * @param {string} key - 键
   */
const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing localStorage:', error);
  }
}

/**
 * 清空本地存储
 */
const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

/**
 * 检查本地存储是否可用
 * @returns {boolean}
 */
const isAvailable = () => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}



export { set, get, remove, clear, isAvailable };