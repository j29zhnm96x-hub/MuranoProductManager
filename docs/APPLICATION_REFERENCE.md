# Murano Product Manager — Complete Application Reference

## Quick Navigation

| File | Lines | Purpose |
|------|-------|---------|
| `app.js` | ~9700 | Main runtime — all logic, state, rendering, sync |
| `index.html` | 326 | App shell with overlay pages |
| `styles.css` | 672 | All styling |
| `service-worker.js` | 54 | Network-first cache (v30) |

---

## app.js — Function Catalog by Section

### Boot & Cache (1-10)
- IIFE: Unregisters all SW + clears all caches

### Translation (12-397)
- `LANG` — HR/EN dictionary
- `__(key)` — translate
- `setLang(lang)` / `translateStaticUI()`

### Auth (654-1053)
- `sha256(text)`, `getAuthHash()`, `setAuthHash()`
- `getAuthAttempts()`, `getAuthLockRemaining()`
- `ensureAuthenticated()` — password gate with lockout

### Daily Progress (1055-1156)
- `todayStr()`, `ensureStateFields()`, `ensureDailyProgress()`, `recomputeDailyGoalNow()`

### Reorder System (1158-1434)
- `createReorderHandle()` — drag handles
- Drag-start/move/end with pointer events

### Autosave Pipeline (1436-1621)
- `processSaveQueue()` — never-give-up save with exponential backoff
- `saveStateDebounced()` — 500ms debounce → IndexedDB + cloud
- `startConnectionChecker()` — 3s offline→online detection

### Cloud Sync — Supabase (1684-1867)
- `listCloudBackups()`, `uploadBackupToCloud()`, `loadLatestCloudBackup()`
- `startRemoteBackupWatcher()` — 30s poll
- `pruneBackups(3)` — keep only 3 latest
- `applyRemoteBackupByName()` — silent overwrite

### Snapshot System (1869-1926)
- `saveSnapshot()` — structuredClone to IndexedDB `snapshots` store

### Dynamic Links (1932-2087)
- `extractPriceFromName()` — parse number from string
- `getProductParentFolder()` / `isProductInIndependentFolder()`
- `processDynamicLinkDeductions()` — auto-deduct components

### History System (3264-4330)
- `recordInventoryEvent()` — central audit log
- `renderHistoryPage()` — full history UI
- `deleteHistoryEntry()` — delete entry + linked deductions

### Shop & Transfer (5818-6922)
- `calculateShopInventory()` — from transferLog + onSiteProduction - returnLog
- `renderShopInventory()` — shop UI with totals + spacers
- `transferFromWarehouse()` — full transfer flow
- `masterConfirm()` / `executeConfirm()` — confirm transfers
- `openTransferHistory()` — unified transfer/onsite/return history

### On-Site Production (6924-7498)
- `addOnSiteItem()` / `executeOnSiteConfirm()` — produce goods on-site
- `ensureWarehouseCategory()` — auto-create warehouse folders

### Returns (7528-7631)
- `returnFromShop()` — return goods to warehouse

### Documents (7633-9068)
- `showDocumentPreview()` — A4 document with history timeline
- Legal docs: blagajnički maksimum/minimum, interni akt, evidencija prigovora, popis robe

### iOS Viewport (5793-5816)
- `enableViewportTracking(el)` — visualViewport.height fix
- `disableViewportTracking(el)` — cleanup

### Startup (9075-9365)
1. Clear cookies, open IndexedDB
2. `loadLatestCloudBackup()` — remote-first (blocks if offline)
3. `ensureAuthenticated()`
4. Wire all events, start checkers
5. `renderAll()`
