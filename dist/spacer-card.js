/*
 * Spacer Card - an invisible card for Home Assistant sections views.
 * https://github.com/edwin-van-dorland/spacer-card
 */
const VERSION = "1.1.0";

class SpacerCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this._render();
  }

  _render() {
    const gridOptions = this._config?.grid_options || {};
    const columns = gridOptions.columns ?? 6;
    const rows = gridOptions.rows ?? 2;

    this.shadowRoot.innerHTML = `
      <style>
        .form {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        label {
          display: grid;
          gap: 8px;
          color: var(--primary-text-color);
          font-size: 14px;
        }
        input {
          box-sizing: border-box;
          width: 100%;
          padding: 8px;
          color: var(--primary-text-color);
          background: var(--card-background-color, white);
          border: 1px solid var(--divider-color);
          border-radius: 4px;
          font: inherit;
        }
      </style>
      <div class="form">
        <label>
          Columns
          <input data-field="columns" type="number" min="1" step="1" value="${columns}">
        </label>
        <label>
          Rows
          <input data-field="rows" type="number" min="1" step="1" value="${rows}">
        </label>
      </div>
    `;

    this.shadowRoot.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", (event) => {
        const field = event.target.dataset.field;
        const value = Math.max(1, Number.parseInt(event.target.value, 10) || 1);
        const nextConfig = {
          ...this._config,
          grid_options: {
            ...this._config?.grid_options,
            [field]: value,
          },
        };
        this._config = nextConfig;
        this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: nextConfig },
            bubbles: true,
            composed: true,
          })
        );
      });
    });
  }
}

if (!customElements.get("spacer-card-editor")) {
  customElements.define("spacer-card-editor", SpacerCardEditor);
}

class SpacerCard extends HTMLElement {
  setConfig(config) {
    this._config = config;
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "<style>:host { display: block; }</style>";
  }

  getCardSize() {
    return 1;
  }

  // Default size; overridden by grid_options in the card YAML
  getGridOptions() {
    return {
      columns: 6,
      rows: 2,
      min_columns: 1,
      min_rows: 1,
    };
  }

  static getStubConfig() {
    return {};
  }

  static getConfigElement() {
    return document.createElement("spacer-card-editor");
  }
}

if (!customElements.get("spacer-card")) {
  customElements.define("spacer-card", SpacerCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "spacer-card",
  name: "Spacer Card",
  description: "Invisible card to fill space in a sections view",
});

console.info(
  `%c SPACER-CARD %c v${VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);
