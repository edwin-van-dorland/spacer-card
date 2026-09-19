# Spacer Card

An invisible card for Home Assistant **sections view** dashboards. It fills
space without any background, border or shadow, and needs no `card_mod`.

The default size is 6 columns × 2 rows. Override it with `grid_options`.

## Installation (HACS)

1. HACS → ⋮ → **Custom repositories**
2. Repository: `https://github.com/edwin-van-dorland/spacer-card`, type: **Dashboard**
3. Install **Spacer Card** and reload your browser.

HACS adds the resource automatically for dashboards in storage mode. If you
use YAML mode, add it manually:

```yaml
resources:
  - url: /hacsfiles/spacer-card/spacer-card.js
    type: module
```

## Usage

Default size (6 × 2):

```yaml
type: custom:spacer-card
```

Custom size:

```yaml
type: custom:spacer-card
grid_options:
  columns: 12
  rows: 1
```

`grid_options` only works in the **sections view**.

## License

MIT
