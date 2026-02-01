import { set, get } from '../utils/storage.js';
import { on, toggleClass, $$ } from '../utils/dom.js';

const toggleTheme = () => {
  const eventTarget = $$('.theme-toggle');
  for (const item of eventTarget) {
    on(item, 'click', () => {
      set('theme', document.documentElement.classList.contains('dark') ? 'light' : 'dark');
      toggleClass(document.documentElement, 'dark')
    });
  }
}

const init = () => {
  // 初始化主题
  const theme = get('theme');
  if (theme) {
    document.documentElement.classList.add(theme);
  }
}

export { toggleTheme, init };
