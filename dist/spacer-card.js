/*
 * Spacer Card - an invisible card for Home Assistant sections views.
 * https://github.com/edwin-van-dorland/spacer-card
 */
const VERSION = "1.0.0";

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
