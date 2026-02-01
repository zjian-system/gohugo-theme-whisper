

// 创建炫酷的控制台输出
const consoleStyles = {
  // 渐变颜色风格
  gradient: [
    'background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0)',
    'color: transparent',
    '-webkit-background-clip: text',
    'font-size: 16px',
    'font-weight: bold',
    'padding: 5px 0'
  ].join(';'),

  // 霓虹灯风格
  neon: [
    'color: #0ff',
    'text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff',
    'font-size: 14px',
    'font-weight: bold'
  ].join(';'),

  // 金色边框风格
  goldBorder: [
    'background: #000',
    'color: #FFD700',
    'border: 2px solid #FFD700',
    'padding: 8px',
    'font-size: 14px',
    'border-radius: 4px'
  ].join(';'),

  // 科技蓝风格
  techBlue: [
    'background: #001f3f',
    'color: #7FDBFF',
    'padding: 6px',
    'font-family: monospace',
    'font-size: 13px',
    'border: 1px solid #7FDBFF'
  ].join(';'),

  // 简约风格
  simple: [
    'color: #666',
    'font-size: 12px',
    'font-style: italic'
  ].join(';')
};

// 版权信息内容
const copyrightInfo = {
  title: "🚀 项目名称: 炫酷Web应用",
  version: "📦 版本号: v2.1.0",
  author: "👨‍💻 开发者: WebDev Team \n 邮箱: your-email@example.com",
  website: "🌐 官方网站: https://example.com",
  github: "🐙 GitHub: https://github.com/username/repo",
  license: "📜 许可证: MIT License",
  year: "© 2024 版权所有",
  motto: "✨ 创造精彩，编码未来 ✨"
};

// 打印分隔线
function printSeparator(char = '═', length = 50, color = '#ff6b6b') {
  const separator = char.repeat(length);
  console.log(`%c${separator}`, `color: ${color}; font-weight: bold;`);
}


/**
 * 初始化版权信息
 */
function init() {
  // 清空控制台
  console.clear();

  console.log(`%c${copyrightInfo.title}`, consoleStyles.gradient);
  console.log(`%c${copyrightInfo.version}`, consoleStyles.neon);

  printSeparator('─', 40, '#40e0d0');

  console.log(`%c${copyrightInfo.author}`, consoleStyles.goldBorder);
  console.log(`%c${copyrightInfo.website}`, consoleStyles.techBlue);
  console.log(`%c${copyrightInfo.github}`, consoleStyles.techBlue);

  printSeparator('─', 40, '#ff8c00');

  console.log(`%c${copyrightInfo.license}`, 'color: #2ecc71; font-weight: bold;');
  console.log(`%c${copyrightInfo.year}`, 'color: #e74c3c; font-weight: bold;');


  console.log(`%c${copyrightInfo.motto}`, `
    background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #9d4edd);
    color: white;
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    border-radius: 8px;
    margin: 10px 0;
  `);


  // 额外提示信息
  console.log('%c🚨 警告：控制台仅供开发使用！\n 基本都是结算单 \n 挥手道别手动滑稽', `
    color: #fff;
    background: linear-gradient(90deg, #ff416c, #ff4b2b);
    padding: 8px;
    font-weight: bold;
  `);

  console.log('%c💡 提示：有任何问题请查看官方文档 \n 或者联系开发者邮箱', `
    color: #2c3e50;
    background: #ecf0f1;
    padding: 6px;
    font-size: 12px;
  `);
}



// 添加键盘快捷键（按 F12 后按 C）
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    // Ctrl+Shift+C 或 F12+C
    if ((e.ctrlKey && e.shiftKey && e.key === 'C') ||
      (e.key === 'F12' || e.key === 'c')) {
      initCopyright();
    }
  });
}


export {
  init
}