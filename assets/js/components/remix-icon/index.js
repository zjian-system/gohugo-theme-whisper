export class RemixIcon extends HTMLElement {
  static observedAttributes = ['name', 'size', 'color', 'spin'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name') || '';
    const size = this.getAttribute('size') || '16';
    const color = this.getAttribute('color') || 'currentColor';
    const spin = this.hasAttribute('spin');

    this.shadowRoot.innerHTML = `
      <style>
        @import url('/css/remix.css');
        .icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: ${Number(size) / 16}rem;
          color: ${color};
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      </style>
      <i class="icon ri-${name} ${spin ? 'spin' : ''}"></i>
    `;
  }
}

