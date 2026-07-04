# Changes

## 2026-07-03 — Transfer History Now Shows All Shop Events

### Problem
`openTransferHistory()` (Pregled transfera) only displayed entries from `transferLog` (warehouse-to-shop transfers). On-site production entries and return-from-shop entries were invisible in the transfer overview, even though they affect shop inventory levels.

### Change
Rewrote `openTransferHistory()` in `app.js` to aggregate entries from all three sources:
- **`transferLog`** — labeled "Transfer iz skladišta" (blue badge)
- **`onSiteProduction`** — labeled "Proizvodnja na licu mjesta" (green badge)
- **`returnLog`** — labeled "Povrat iz prodaje" (amber badge)

All entries are normalized to a common format, sorted by date descending (newest first), and displayed with a colored type badge for quick visual identification.

### Safety
- `clearShopAll()` already clears all three collections — no change needed.
- Syntax verified with `new Function()` — no errors.
- Only `addedToShop: true` on-site productions are included.

## 2026-07-03 — Fixed Scroll Cut-Off on Overlay Pages

### Problem
On the shop page (`#shop-page`), on-site production page (`#onsite-page`), and history page (`#history-page`), the last items in the list were difficult to see when scrolling to the bottom — they appeared cut off or required pressing/holding to view. This happened on both desktop and Safari.

### Cause
The content containers had insufficient `padding-bottom`:
- `.shop-content`: `calc(24px + env(safe-area-inset-bottom))` 
- `.onsite-content`: `calc(24px + env(safe-area-inset-bottom))`
- `.history-content`: `calc(16px + env(safe-area-inset-bottom))`
- `.doc-preview-body`: no `padding-bottom` at all

### Change
Increased `padding-bottom` on all four containers in `styles.css`:
- `.shop-content`: 24px → **80px**
- `.onsite-content`: 24px → **80px**
- `.history-content`: 16px → **80px**
- `.doc-preview-body`: 0 → **40px**

The `env(safe-area-inset-bottom)` is preserved on all for iPhone notch/home indicator clearance.

## 2026-07-03 — Fixed iOS Safari Bottom Cut-Off (Take 2)

### Problem
After increasing `padding-bottom`, PC rendered correctly but iPhone still cut off the last row. This was a viewport height issue, not a padding issue.

### Root Cause
All overlay pages (`#shop-page`, `#onsite-page`, `#history-page`, `#product-page`, `#doc-preview`) had both `position: fixed; inset: 0;` AND `height: 100dvh; height: 100vh;`. On iOS Safari when the address bar is visible, `height: 100vh` is **larger** than the actual visible viewport. Since an explicit `height` **overrides** `bottom: 0` from `inset: 0`, the element extended below the visible area, hiding content at the bottom regardless of padding.

### Fix
Removed `height: 100dvh; height: 100vh;` from all five overlay rules. With `position: fixed; inset: 0;`, the element naturally fills exactly the visible viewport on all devices — no explicit height needed. `inset: 0` sets `top: 0; right: 0; bottom: 0; left: 0;`, which works correctly across Desktop and iOS Safari.

## 2026-07-03 — Simplified Document Preview Actions Menu

### Problem
When viewing a generated document (`showDocumentPreview`), the "Akcije" menu showed "Novi dokument" and "Ažuriraj zadnji" buttons that are irrelevant for document viewing. These caused clutter and potential confusion.

### Fix
Simplified the actions menu in `showDocumentPreview()` (app.js) to only show:
- **Ispiši / Podijeli** (Print/Share)
- **Zatvori** (Close)

This matches the pattern already used in other document generators (Blagajnički maksimum, Blagajnički minimum, etc.).

## 2026-07-03 — Added Spacer Rows Below Shop Total

### Problem
On iPhone Safari, the "Ukupno" (total) row at the bottom of the shop inventory was still partially hidden behind the Safari bottom toolbar, even after multiple CSS fixes (padding, viewport height). CSS-only solutions proved unreliable on mobile Safari.

### Fix
In `renderShopInventory()` (app.js), added two invisible spacer rows directly after the total row. These rows match the height of normal inventory rows, pushing the total row up by approximately two rows of empty space. This guarantees the total is fully visible above any browser toolbar.

The spacer rows use `visibility: hidden` so they occupy layout space without being visually rendered.
