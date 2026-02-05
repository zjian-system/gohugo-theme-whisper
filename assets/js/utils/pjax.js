
/**
 * 简单的 PJAX 实现
 */
export class Pjax {
  constructor(options = {}) {
    this.options = Object.assign({
      elements: '#pjax-container', // 需要更新的容器选择器 (可以是字符串或数组)
      selectors: 'a[href]',        // 需要拦截的链接选择器
      history: true,               // 是否修改历史记录
      cache: true,                 // 是否开启缓存
      timeout: 0,                  // 超时时间
      scroll: true,                // 切换后是否自动滚动到顶部
      debug: false                 // 调试模式
    }, options);

    // 标准化 elements 为数组
    if (!Array.isArray(this.options.elements)) {
      this.options.elements = [this.options.elements];
    }

    this.cache = {};
    this.request = null;

    // 初始化
    this.init();
  }

  log(msg) {
    if (this.options.debug) console.log(`[Pjax] ${msg}`);
  }

  init() {
    // 绑定链接点击事件
    document.addEventListener('click', (e) => this.handleLinkClick(e));

    // 绑定浏览器后退/前进事件
    window.addEventListener('popstate', (e) => this.handlePopState(e));

    this.log('Initialized.');
  }

  // 处理链接点击
  handleLinkClick(e) {
    let el = e.target;

    // 向上寻找最近的 A 标签
    while (el && el.tagName !== 'A') {
      el = el.parentNode;
    }

    // 基础校验：必须是A标签，且符合选择器
    if (!el || el.tagName !== 'A' || !el.matches(this.options.selectors)) return;

    // 忽略特殊链接
    if (
      el.target === '_blank' ||
      e.which > 1 ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      el.protocol !== window.location.protocol ||
      el.host !== window.location.host
    ) return;

    // 忽略锚点跳转
    if (el.pathname === window.location.pathname && el.hash && el.href.includes('#')) return;

    e.preventDefault();
    this.loadUrl(el.href, true);
  }

  // 处理浏览器历史记录切换
  handlePopState(e) {
    if (e.state && e.state.pjax) {
      this.loadUrl(e.state.url, false);
    } else {
      // 如果 state 为空，通常是回到了最初进入的页面，重新加载当前URL
      this.loadUrl(window.location.href, false);
    }
  }

  // 核心加载逻辑
  async loadUrl(url, pushHistory) {
    this.trigger('pjax:send', { url });

    // 检查缓存
    if (this.options.cache && this.cache[url]) {
      this.log(`Loading from cache: ${url}`);
      this.handleResponse(this.cache[url], url, pushHistory);
      return;
    }

    // 取消上一次未完成的请求 (Fetch API 使用 AbortController)
    if (this.controller) this.controller.abort();
    this.controller = new AbortController();

    try {
      const response = await fetch(url, {
        signal: this.controller.signal,
        headers: {
          'X-PJAX': 'true',
          'X-PJAX-Container': this.options.elements[0] // 告诉服务器这是 PJAX 请求
        }
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const html = await response.text();

      // 存入缓存
      if (this.options.cache) {
        this.cache[url] = html;
      }

      this.handleResponse(html, url, pushHistory);

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('[Pjax] Fetch error:', error);
        this.trigger('pjax:error', { url, error });
        // 降级处理：出错时直接跳转
        window.location.href = url;
      }
    }
  }

  // 处理 HTML 响应
  handleResponse(html, url, pushHistory) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 1. 更新标题
    if (doc.title) {
      document.title = doc.title;
    }

    // 2. 替换容器内容
    this.options.elements.forEach(selector => {
      const currentEl = document.querySelector(selector);
      const newEl = doc.querySelector(selector);

      if (currentEl && newEl) {
        currentEl.innerHTML = newEl.innerHTML;

        // 3. 重新执行脚本
        this.executeScripts(currentEl);
      } else {
        this.log(`Selector not found: ${selector}`);
      }
    });

    // 4. 更新 URL 和 历史记录
    if (pushHistory && this.options.history) {
      window.history.pushState({ pjax: true, url: url }, doc.title, url);
    }

    // 5. 滚动处理
    if (this.options.scroll) {
      window.scrollTo(0, 0);
    }

    this.trigger('pjax:complete', { url });
  }

  // 执行容器内的脚本
  executeScripts(container) {
    const scripts = container.querySelectorAll('script');

    scripts.forEach(oldScript => {
      // 如果声明了 data-pjax-ignore 则不执行
      if (oldScript.hasAttribute('data-pjax-ignore')) return;

      // 忽略 type="application/json" 等非执行脚本
      if (oldScript.type && oldScript.type !== 'text/javascript' && oldScript.type !== 'module') return;

      const newScript = document.createElement('script');

      // 复制属性
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });

      // 复制内容
      newScript.textContent = oldScript.textContent;

      // 移除旧脚本，插入新脚本以触发浏览器执行
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  // 触发自定义事件
  trigger(eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  }
}