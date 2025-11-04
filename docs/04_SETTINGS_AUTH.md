# Instructed Documentation – Murano Product Manager v1.0
## Part 4: Settings, Authentication & UI Features

---

## 1. Authentication System

### 1.1 Overview
- **Type:** Password-based (numeric PIN)
- **Method:** Session storage check
- **Biometrics:** Not implemented
- **Default Password:** 9277

### 1.2 Password Encoding
- **Storage:** Base64-encoded string in code
- **Purpose:** Light obfuscation (not security)
- **Encoded:** `ENCODED_PASS = 'OTI3Nw=='` (decodes to '9277')

**Change Password:**
```js
// 1. Open browser console
// 2. Run: btoa('YOUR_NEW_PASSWORD')
// 3. Replace ENCODED_PASS value in app.js line 202
```

**Decode Function:**
```js
function decodePassword(encoded) {
  try {
    return atob(encoded); // Base64 decode
  } catch {
    return '9277'; // Fallback
  }
}

const APP_PASSCODE = decodePassword(ENCODED_PASS);
```

### 1.3 Auth Flow

**On App Load:**
1. Checks `sessionStorage.getItem('murano_auth_ok')`
2. If `=== '1'` → Authenticated, proceed
3. If not → Shows auth overlay

**Auth Overlay:**
- Full-screen modal (z-index: 9999)
- Dark background (rgba(0,0,0,0.65))
- Cannot be closed or bypassed

**Components:**
- Title: "Enter Password"
- Error message area (red text)
- Numeric input (4-character max, password type)
- Numeric keypad (1-9, 0, Clear buttons)
- Submit button

**Input Behavior:**
- Accepts only digits (0-9)
- Max length: 4 characters
- Letter-spacing: 4px (for visual spacing)
- Auto-focus on load

**Keypad:**
- 3×3 grid for 1-9
- Bottom row: 0, Clear
- Click button → appends digit to input
- Clear button → empties input

**Submit:**
- Enter key OR Submit button
- Compares `input.value === APP_PASSCODE`
- If match:
  - Sets `sessionStorage.setItem('murano_auth_ok', '1')`
  - Hides overlay
  - App continues loading
- If mismatch:
  - Shows error: "Incorrect password. Try again."
  - Clears input
  - Refocuses input
  - User can retry unlimited times

```js
async function ensureAuthenticated() {
  if (sessionStorage.getItem('murano_auth_ok') === '1') return;
  
  // Show auth overlay
  ensureAuthOverlayElements();
  document.getElementById('auth-overlay').classList.remove('hidden');
  
  // Wait for authentication
  await new Promise((resolve) => {
    const watcher = setInterval(() => {
      if (sessionStorage.getItem('murano_auth_ok') === '1') {
        clearInterval(watcher);
        resolve();
      }
    }, 200);
  });
}
```

**Session Persistence:**
- Stored in sessionStorage (tab-specific)
- Cleared when tab closes
- Re-authentication required on new tab or browser restart

---

## 2. Settings Modal

### 2.1 Open Settings
- **Trigger:** Click settings button (⚙️) in top bar
- **Opens:** Modal with settings form

### 2.2 Settings Fields

**Planned Total**
- **Type:** Number input (min: 0, step: 1)
- **Unit:** Euro (€)
- **Purpose:** Target total value for production
- **Storage:** `appState.settings.plannedValue`
- **Usage:** Calculates daily goals and progress

**End Date**
- **Type:** Date input (YYYY-MM-DD)
- **Purpose:** Target completion date
- **Storage:** `appState.settings.endDate`
- **Usage:** Calculates days remaining and daily goals

**Daily Goal Calculation:**
```js
// When both plannedValue and endDate are set:
const remainingValue = plannedValue - currentTotalValue;
const daysLeft = Math.ceil((endDate - today) / (1000*60*60*24));
const dailyGoal = remainingValue / daysLeft;

// Stored once per day:
appState.dailyProgress.fixedGoal = dailyGoal;
```

### 2.3 Actions in Settings

**Report Button**
- Opens report modal with full app summary
- Includes: folders, products, quantities, values
- Actions: Copy, Share, Download

**Production PDF Button**
- Opens date range selector
- Start date, End date inputs
- Generates PDF report of production log
- Downloads as `production_YYYY-MM-DD_to_YYYY-MM-DD.pdf`

**Reset Stats Button**
- Opens confirmation modal
- 10-second countdown before enabling Confirm button
- Warning: "ARE YOU SURE YOU WISH TO DELETE ALL PRODUCT STATISTICS, THIS IS IRREVERSABLE"
- Action: Sets all `product.quantity = 0`
- Does NOT delete folders, products, or settings
- Logs are NOT cleared

```js
function showResetStatsConfirm() {
  let seconds = 10;
  const tick = () => {
    countdownEl.textContent = `You can confirm in ${seconds}s`;
    confirmBtn.disabled = seconds > 0;
    if (seconds > 0) {
      seconds -= 1;
      setTimeout(tick, 1000);
    } else {
      countdownEl.textContent = 'You may proceed.';
    }
  };
  
  openModal({
    title: 'Confirm Reset Stats',
    body: warningElements,
    actions: [
      { label: 'Confirm', onClick: resetAllProductQuantities },
      { label: 'Cancel' }
    ]
  });
  
  tick(); // Start countdown
}

function resetAllProductQuantities() {
  for (const p of Object.values(appState.products)) {
    p.quantity = 0;
  }
  saveStateDebounced();
  ensureDailyProgress(); // Recalculate daily goals
  renderAll();
  showToast('All product quantities reset to 0');
}
```

### 2.4 Save Settings
- **Trigger:** Click "Save" button in settings modal
- **Action:**
  - Updates `appState.settings.plannedValue`
  - Updates `appState.settings.endDate`
  - Calls `recomputeDailyGoalNow()` to recalculate daily goal
  - Saves state to IndexedDB
  - Closes modal
  - Re-renders stats bar

---

## 3. Report System

### 3.1 Generate Report

**Function:** `generateAppReportText()`

**Content:**
```
Murano Product Manager — Report
===============================
Planned total: 30,000 €
End date: 2025-12-31  (Days left: 57)
Daily goal: 450 €
Total quantity: 1,234 pc
Total value: 15,678 €

Folder: Home  — Qty: 1234, Value: 15,678 €
  • Product A — Qty: 50, Value: 500 €
  • Product B — Qty: 100, Value: 1,200 €
  Folder: Subfolder1  — Qty: 234, Value: 3,456 €
    • Product C — Qty: 34, Value: 456 €
    ...
```

**Structure:**
- Header with settings and totals
- Recursive folder tree
- Indentation: 2 spaces per level
- Folders show: Name, total qty, total value
- Products show: Name, qty, value (indented)

### 3.2 Report Modal

**Opens via:** Settings → "Report" button

**Display:**
- Read-only textarea (min-height: 320px)
- Pre-filled with report text
- Scrollable

**Actions:**

**Copy Button** (keepOpen: true)
- Attempts `navigator.clipboard.writeText()`
- Fallback: `document.execCommand('copy')`
- Shows toast: "Report copied"

**Share Button** (keepOpen: true)
- Uses Web Share API if available: `navigator.share({ title, text })`
- Fallback: Copies to clipboard
- Shows toast: "Share opened" or "Copied to clipboard"

**Download Button**
- Creates text/plain Blob
- Downloads as `murano_report_YYYY-MM-DD.txt`

**Close Button**
- Closes modal

---

## 4. Production Log & PDF Export

### 4.1 Production Log Structure

**Storage:** `appState.productionLog[]`

**Entry Format:**
```js
{
  ts: 1699099200000, // Timestamp (ms)
  productId: "prod-123", // or null if folder deleted
  delta: 5, // +5 added or -5 removed
  price: 10.50, // Product price at time of change
  value: 52.50 // delta * price
}
```

**Created When:**
- User adjusts product quantity (Add or Remove)
- User deletes product (negative entry)
- User deletes folder (negative entry for total value)

### 4.2 Production PDF Export

**Trigger:** Settings → "Production PDF" button

**Date Range Selector:**
- Start Date input (date type)
- End Date input (date type)
- "Generate PDF" button

**Process:**
```js
function computeProductionInRange(startDate, endDate) {
  const logs = appState.productionLog || [];
  const start = new Date(startDate).setHours(0,0,0,0);
  const end = new Date(endDate).setHours(23,59,59,999);
  
  return logs.filter(log => {
    const ts = log.ts || 0;
    return ts >= start && ts <= end;
  });
}
```

**PDF Generation:**
- Filters logs by date range
- Groups by product
- Calculates totals per product
- Formats as table
- Downloads PDF file

**Note:** Implementation uses browser print or PDF library (details in code)

---

## 5. UI Sound Effects

### 5.1 Click Sound System

**Purpose:** Tactile feedback on interactive elements

**Audio File:** `./assets/Click.mp3`

**Fallback Sources:**
```js
const CLICK_ALT_SRCS = [
  './assets/Click.mp3',
  './assets/click.mp3',
  './assets/click-dot.mp3',
  './assets/click_dot.mp3',
  './assets/click dot.mp3'
];
```

**Implementation:**

**Audio Context Approach (Primary):**
- Uses Web Audio API
- Pre-loads sound into buffer
- Low latency playback
- Volume: 0.25 (quieter)

**HTML Audio Pool (Fallback):**
- Pool of 4 Audio elements
- Round-robin playback
- Handles autoplay policy restrictions

**iOS-Specific:**
- Vibration feedback: `navigator.vibrate(5)` (5ms pulse)
- Plays in addition to sound

**Throttling:**
- Min 120ms between plays
- Prevents audio spam during rapid clicks

**Unlock Mechanism:**
- Requires user gesture to enable (autoplay policy)
- First tap/click unlocks audio context
- Silently plays muted audio to satisfy browser requirements

**Triggered On:**
- Button clicks
- Interactive element clicks (folders, products, modals)
- Enter/Space key on focused interactive elements

**Interactive Element Detection:**
```js
function isInteractive(el) {
  if (el.tagName === 'BUTTON' || el.tagName === 'A') return true;
  if (el.hasAttribute('onclick')) return true;
  if (el.getAttribute('role') === 'button') return true;
  if (el.style.cursor === 'pointer') return true;
  if (el.classList.contains('name') || el.classList.contains('crumb')) return true;
  return false;
}
```

**Beep Fallback:**
- If audio fails to load → generates beep using oscillator
- Square wave, 1200 Hz, 120ms duration
- Volume envelope: 0.0001 → 0.35 → 0.0001

```js
function tryBeep() {
  const ctx = clickCtx;
  const o = ctx.createOscillator();
  o.type = 'square';
  o.frequency.value = 1200;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + 0.13);
}
```

---

## 6. Service Worker (Offline Support)

### 6.1 Configuration
**File:** `service-worker.js`

**Cache Name:** `app-cache-v21` (increment on updates)

**Cached Assets:**
```js
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/public/sample_save.json'
];
```

### 6.2 Caching Strategy

**App Shell (HTML, JS, CSS):**
- **Strategy:** Network-first
- Try network → cache response → return
- On network fail → serve from cache
- Ensures latest code when online

**Other Assets (images, etc.):**
- **Strategy:** Cache-first
- Check cache → if hit, return
- On miss → fetch → cache → return
- Faster load for static assets

**Install Event:**
```js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});
```

**Activate Event:**
```js
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME)
           .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});
```

**Fetch Event:**
```js
self.addEventListener('fetch', (event) => {
  const isAppShell = req.destination === 'document' || 
                     url.endsWith('.html') || 
                     url.endsWith('.js') || 
                     url.endsWith('.css');
  
  if (isAppShell) {
    // Network-first
    event.respondWith(
      fetch(req).then(resp => {
        caches.open(CACHE_NAME).then(cache => cache.put(req, resp.clone()));
        return resp;
      }).catch(() => caches.match(req))
    );
  } else {
    // Cache-first
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(resp => {
          caches.open(CACHE_NAME).then(cache => cache.put(req, resp.clone()));
          return resp;
        });
      })
    );
  }
});
```

### 6.3 Update Detection
**Trigger:** New version deployed (CACHE_NAME changes)

**Process:**
1. Browser detects new service worker
2. Installs new version
3. Waits for tabs to close (or skipWaiting)
4. Activates new version
5. Clears old caches

**User Experience:**
- App continues working with old version until reload
- No forced interruption
- Silent update on next page load

---

## 7. Responsive Design & Mobile Features

### 7.1 Viewport Configuration
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
```

**Purpose:** Prevents zoom, optimizes for mobile

### 7.2 Touch Optimizations

**Disable Double-Tap Zoom:**
```js
let lastTap = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTap < 300) e.preventDefault();
  lastTap = now;
}, { passive: false });
```

**Disable Pinch Zoom:**
```js
document.addEventListener('touchstart', (e) => {
  if (e.touches.length > 1) e.preventDefault();
}, { passive: false });
```

**Touch Action:**
```css
html { touch-action: manipulation; }
```

### 7.3 Mobile Search Toggle

**Visible:** Portrait mode only (height > width)

**States:**
- Collapsed: Search bar hidden, magnifying glass button visible
- Expanded: Search bar overlays top bar

**Toggle Logic:**
```js
searchToggle.addEventListener('click', () => {
  if (!isExpanded) {
    searchBar.classList.add('search-expanded');
    searchBar.classList.remove('search-collapsed');
    input.focus();
  } else {
    searchBar.classList.remove('search-expanded');
    searchBar.classList.add('search-collapsed');
  }
});
```

**Auto-Collapse:**
- Click outside search → collapses
- Escape key → collapses
- Orientation change to landscape → resets

### 7.4 Floating Back Button (Product Page)

**Purpose:** Always accessible back button when keyboard covers header

**Element:** `<button class="pp-fab-back">Back</button>`

**Position:** Fixed, bottom-right corner

**Visibility:** Always visible on product page

**Interaction:** Click → closes product page

---

## 8. Keyboard & Input Handling

### 8.1 Numeric Inputs
- **inputMode:** "numeric" → Shows numeric keyboard on mobile
- **pattern:** "[0-9]*" → iOS numeric pad
- **Auto-focus:** Opens keyboard automatically
- **Auto-select:** Highlights existing text on focus

### 8.2 Enter Key Behaviors

**Search Input:**
- No action (live search, no submit)

**Quantity Adjust Input:**
- Enter → Same as clicking "Add" button

**Auth Input:**
- Enter → Same as clicking "Submit" button

**Modal Forms:**
- Enter → Submits form (default behavior)

### 8.3 Input Focus Helpers

**Product Quantity Input:**
```js
adj.addEventListener('focus', () => {
  adj.select(); // Auto-select text
  document.getElementById('product-page').scrollTo({ top: 0, behavior: 'smooth' });
});
```

**Name Inputs (Edit Modals):**
```js
setTimeout(() => {
  nameInput.focus();
  nameInput.select();
}, 0);
```

---

## 9. Format Helpers

### 9.1 Currency Formatting

**Function:** `formatCurrency(value)`

**Format:** "X,XXX €" (with non-breaking space)

**Examples:**
- 1500 → "1,500 €"
- 25000 → "25,000 €"
- 0 → "0 €"

**Implementation:**
```js
function formatCurrency(value) {
  try {
    return new Intl.NumberFormat('en-US', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(Number(value || 0)) + '\u00A0€';
  } catch {
    const n = Math.round(Number(value || 0));
    return `${n}\u00A0€`;
  }
}
```

### 9.2 Timestamp Formatting

**Function:** `formatTs(ts)`

**Format:** "YYYY-MM-DD_hh-mm-ss"

**Usage:** Backup filenames

**Implementation:**
```js
function formatTs(ts) {
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}
```

### 9.3 Today String

**Function:** `todayStr()`

**Format:** "YYYY-MM-DD"

**Usage:** Daily progress tracking

**Implementation:**
```js
function todayStr() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}
```

---

## 10. UUID Generation

**Function:** `uuid()`

**Purpose:** Generate unique IDs for folders, products, client

**Primary Method:** `crypto.randomUUID()`

**Fallback:** `'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9)`

**Example Output:** "id-l8xyz1234-5a6b7c8d9"

```js
function uuid() {
  if (crypto && crypto.randomUUID) {
    return crypto.randomUUID(); // Native UUID
  }
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
}
```

---

## 11. Cookie Management

### 11.1 Clear All Cookies

**Function:** `clearAllCookies()`

**When:** On app load (DOMContentLoaded)

**Purpose:** Security/privacy - removes any cookies

**Process:**
```js
function clearAllCookies() {
  const parts = document.cookie.split(';');
  const domains = [undefined, location.hostname, '.' + location.hostname];
  const paths = ['/', ''];
  
  parts.forEach(p => {
    const name = p.split('=')[0].trim();
    domains.forEach(d => {
      paths.forEach(path => {
        let cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        if (path) cookie += `;path=${path}`;
        if (d) cookie += `;domain=${d}`;
        document.cookie = cookie;
      });
    });
  });
}
```

**Effect:** Deletes all cookies for current domain and subdomains

---

## 12. Refresh Overlay

### 12.1 Purpose
Shows when remote backup detected and being applied

### 12.2 Display
- **Overlay:** Full-screen, semi-transparent black
- **Message:** "New version found, refreshing…"
- **Duration:** Brief (during download and apply)
- **Non-blocking:** User cannot interact while shown

### 12.3 Usage
```js
const overlay = document.getElementById('refresh-overlay');
overlay.classList.add('show'); // Display
// ... download and apply backup ...
overlay.classList.remove('show'); // Hide
```

---

## 13. Priority Products

### 13.1 Enable Priority

**Location:** Edit Product modal

**Field:** "Priority product" checkbox

**Storage:** `product.priority = true/false`

**Requirement:** Must also set `targetQuantity > 0`

### 13.2 Priority Graph Display

**Visibility Rules:**
- Hidden if no priority products exist
- Hidden in independent folders
- Shows all priority products at root level
- Shows folder-scoped priority products when inside folder

**Sorting:** By completion percentage (ascending)

**Progress Calculation:**
```js
const percentage = Math.round((quantity / targetQuantity) * 100);
const progressBarWidth = Math.min(100, percentage); // Cap at 100% visual
```

**Color Gradient:** Red (0%) → Green (100%)

---

## 14. Custom Fields (Product Edit)

**Note:** Custom fields UI exists in code but not used in current implementation

**Structure:**
- Key-value pairs
- Add/remove rows dynamically
- Stored in product object

**Omitted from docs as feature appears dormant**

---

## 15. Image Upload & Processing

### 15.1 Accepted Formats
- **Accept:** `image/*` (all image types)
- **Common:** JPEG, PNG, GIF, WEBP, SVG

### 15.2 Processing Pipeline

**Steps:**
1. User selects file via file input
2. FileReader reads as dataURL
3. Create Image element, load dataURL
4. On load:
   - Calculate centered square crop
   - Create canvas 300×300px
   - Draw cropped image to canvas
   - Export as JPEG dataURL (quality: 0.9)
5. Store dataURL in product/folder.imageUrl
6. Save to IndexedDB

**Crop Logic:**
```js
const side = Math.min(img.width, img.height);
const sx = Math.floor((img.width - side) / 2);
const sy = Math.floor((img.height - side) / 2);
canvas.width = 300;
canvas.height = 300;
ctx.drawImage(img, sx, sy, side, side, 0, 0, 300, 300);
```

**Result:** Square 300×300px JPEG embedded in JSON

---

## 16. Storage Headers (Supabase)

**Function:** `storageHeaders(extra = {})`

**Returns:** Object with Authorization and apikey

**Usage:** All Supabase Storage API requests

```js
function storageHeaders(extra = {}) {
  return {
    Authorization: `Bearer ${SUPABASE_KEY}`,
    apikey: SUPABASE_KEY,
    ...extra
  };
}
```

**Example:**
```js
const res = await fetch(url, {
  method: 'PUT',
  headers: storageHeaders({ 'Content-Type': 'application/json' }),
  body: JSON.stringify(data)
});
```

---

## 17. Environment Variables

**None used.** All configuration hardcoded in `app.js`:

- Supabase URL
- Supabase anon key
- Bucket name
- File paths
- Default password

**To deploy with different config:** Edit constants in `app.js` lines 148-153

---

## 18. Dependencies

### 18.1 External Libraries
**None.** Pure vanilla JavaScript.

### 18.2 Browser APIs Used
- IndexedDB
- Fetch API
- Web Audio API
- Service Worker API
- FileReader API
- Canvas API
- Web Share API (optional)
- Clipboard API (optional)
- Vibration API (optional, mobile)

### 18.3 CDNs
**None.** All code bundled in `app.js`.

---

## 19. Build & Deploy

### 19.1 No Build Step
- No transpilation
- No bundling
- No minification
- Plain ES6+ JavaScript

### 19.2 Files Required
```
/index.html
/app.js
/styles.css
/warning-system.js
/service-worker.js
/assets/
  Click.mp3
  MPMLogo180.png
  magnifying-glass.png
  setting.png
/public/
  sample_save.json
```

### 19.3 Deploy Process
1. Upload all files to web server
2. Configure Supabase project:
   - Create Storage bucket named "saves"
   - Set bucket as public or use auth
   - Get project URL and anon key
   - Update app.js with credentials
3. Access via HTTPS (required for Service Worker)

### 19.4 Supabase Setup

**Create Bucket:**
```sql
-- In Supabase SQL editor
insert into storage.buckets (id, name, public)
values ('saves', 'saves', true);
```

**Set Policies:**
```sql
-- Allow public read/write (adjust as needed)
create policy "Public Access"
on storage.objects for all
using (bucket_id = 'saves');
```

---

## 20. Browser Compatibility

### 20.1 Required Features
- ES6+ JavaScript (const, let, arrow functions, async/await)
- IndexedDB
- Service Worker
- Fetch API
- Web Audio API (for sounds)
- Canvas API (for image processing)

### 20.2 Tested Browsers
- Chrome/Edge (latest)
- Safari (iOS 14+)
- Firefox (latest)

### 20.3 Not Supported
- Internet Explorer (any version)
- Very old mobile browsers (pre-2020)

---

## 21. Performance Metrics

### 21.1 Initial Load
- HTML: ~7 KB
- CSS: ~20 KB
- JS: ~138 KB
- Total: ~165 KB (uncompressed)

### 21.2 Runtime Performance
- Render cycle: <50ms (typical dataset)
- IndexedDB write: <10ms
- Cloud sync: 200-500ms (network dependent)
- Image resize: 100-300ms per image

### 21.3 Storage Usage
- IndexedDB: ~1-10 MB (typical dataset)
- Service Worker cache: ~200 KB
- Supabase: ~1-10 MB (3 backups × state size)

---
