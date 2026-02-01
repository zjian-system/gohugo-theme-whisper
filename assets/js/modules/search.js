/**
 * 搜索模块
 */
import { dom, helpers, storage } from '../utils/index.js';

export const init = () => {

  // 初始化搜索框
  initSearchBox();

  // 初始化搜索结果
  initSearchResults();
};

/**
 * 初始化搜索框
 */
const initSearchBox = () => {
  const searchInput = dom.$('.search-input');
  const searchButton = dom.$('.search-button');

  if (searchInput) {
    // 防抖搜索
    const debouncedSearch = helpers.debounce((query) => {
      if (query.trim()) {
        performSearch(query);
      } else {
        clearSearchResults();
      }
    }, 300);

    // 输入事件
    dom.on(searchInput, 'input', (e) => {
      debouncedSearch(e.target.value);
    });

    // 点击搜索按钮
    if (searchButton) {
      dom.on(searchButton, 'click', () => {
        performSearch(searchInput.value);
      });
    }

    // 回车搜索
    dom.on(searchInput, 'keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch(searchInput.value);
      }
    });
  }
};

/**
 * 执行搜索
 * @param {string} query - 搜索关键词
 */
const performSearch = (query) => {

  // 这里可以添加实际的搜索逻辑
  // 例如：调用搜索 API、过滤本地数据等

  // 示例：显示搜索结果
  showSearchResults([]);

  // 缓存搜索历史
  cacheSearchHistory(query);
};

/**
 * 显示搜索结果
 * @param {Array} results - 搜索结果
 */
const showSearchResults = (results) => {
  const searchResults = dom.$('.search-results');
  if (searchResults) {
    // 清空现有结果
    searchResults.innerHTML = '';

    if (results.length > 0) {
      // 添加搜索结果
      results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
          <h3><a href="${result.url}">${result.title}</a></h3>
          <p>${result.excerpt}</p>
        `;
        searchResults.appendChild(resultItem);
      });
    } else {
      // 无结果提示
      searchResults.innerHTML = '<div class="search-no-results">暂无搜索结果</div>';
    }

    dom.addClass(searchResults, 'active');
  }
};

/**
 * 清空搜索结果
 */
const clearSearchResults = () => {
  const searchResults = dom.$('.search-results');
  if (searchResults) {
    searchResults.innerHTML = '';
    dom.removeClass(searchResults, 'active');
  }
};

/**
 * 缓存搜索历史
 * @param {string} query - 搜索关键词
 */
const cacheSearchHistory = (query) => {
  if (!query.trim()) return;

  const history = storage.get('searchHistory', []);

  // 移除重复项
  const filteredHistory = history.filter(item => item !== query);

  // 添加到开头
  filteredHistory.unshift(query);

  // 限制历史记录数量
  const limitedHistory = filteredHistory.slice(0, 10);

  // 保存到本地存储
  storage.set('searchHistory', limitedHistory);
};

/**
 * 初始化搜索结果
 */
const initSearchResults = () => {
  // 点击搜索结果外部关闭
  dom.on(document, 'click', (e) => {
    const searchContainer = dom.$('.search-container');
    const searchResults = dom.$('.search-results');

    if (searchContainer && searchResults && !searchContainer.contains(e.target)) {
      clearSearchResults();
    }
  });
};

export default {
  init
};