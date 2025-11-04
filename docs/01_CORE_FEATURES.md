# Instructed Documentation – Murano Product Manager v1.0
## Part 1: Core Features

---

## Overview

**AI Integration:** Not Present
**Localization:** Not Present  
**External APIs:** Supabase Storage (cloud backup)
**Authentication:** Password-based (numeric PIN, default: 9277)

---

## 1. Folder Management

### 1.1 Create Folder
- **Trigger:** Click "+" button → Select "New Folder"
- **Action:** Creates folder with name "New Folder" in current location
- **Result:** Opens edit modal, folder appears in list
- **Data:** `appState.folders[id] = { id, name, parentId, imageUrl, subfolders[], products[], order[] }`

### 1.2 Edit Folder
- **Trigger:** Click "⋯" on folder → Select "Edit"
- **Inputs:**
  - Name (text, required)
  - Image (file upload, optional, image/*)
  - "Make independent" checkbox
- **Image Processing:**
  - Crops to centered square
  - Resizes to 300×300px
  - Converts to JPEG dataURL (quality: 0.9)
  - Stores in `folder.imageUrl`
- **Independent Folders:**
  - Sets `folder.isIndependent = true`
  - Excluded from all stats (quantity, value)
  - Gray background (#cbd5e1), purple name text
  - Use case: Materials/components inventory
- **Result:** Updates folder, saves to IndexedDB, re-renders

```js
// Key function
async function resizeImageToDataURL(file, maxW = 300, maxH = 300) {
  // Reads file, crops to square, resizes, returns dataURL
}
```

### 1.3 Delete Folder
- **Trigger:** Click "⋯" → "Delete" → Confirm
- **Action:** 
  - Recursively deletes all subfolders
  - Deletes all products in folder
  - Removes from parent's subfolders array
  - Logs removal as negative production value
- **Confirmation:** Modal with folder name
- **Result:** Folder + contents removed, state saved

### 1.4 Move Folder
- **Trigger:** Click "⋯" → "Move to..."
- **UI:** Radio list of all folders (excludes self and descendants)
- **Validation:** Cannot move to descendant (prevents circular references)
- **Result:** Updates `folder.parentId`, moves to target's `subfolders[]`

---

## 2. Product Management

### 2.1 Create Product
- **Trigger:** Click "+" → Select "New Product"
- **Inputs:**
  - Name (text, required)
  - Image (file upload, optional, image/*)
- **Image:** Same processing as folders (300×300px square)
- **Data:** `appState.products[id] = { id, name, price: 0, quantity: 0, targetQuantity: 0, priority: false, imageUrl, note: '', warnThreshold: 0, isDynamic: false, dynamicLinks: [] }`
- **Result:** Product created with quantity=0, added to folder's `products[]`

### 2.2 Edit Product
- **Trigger:** Click "⋯" on product → "Edit" OR click "Edit" button in product page
- **Standard Products (not in independent folders):**
  - Name
  - Price (number, €)
  - Target Quantity (number, pc)
  - Quantity (number, pc)
  - Priority product (checkbox)
  - Max Quantity guideline (number)
  - Custom fields (key-value pairs)
- **Component Products (in independent folders):**
  - Name only
  - Price/Target/Quantity hidden
  - Dynamic Component checkbox (master switch)
  - When Dynamic enabled:
    - Warning Threshold input
    - "Add Link" button
    - Link list (product/folder targets with units)
    - Each link shows: Type, Name, Units
    - Remove button (×) with confirmation
- **Result:** Updates product properties, saves state

```js
// Edit modal structure
function openProductEditModal(productId) {
  const inIndependentFolder = isProductInIndependentFolder(productId);
  if (inIndependentFolder) {
    // Show: Name, Dynamic checkbox, Links UI, Warning Threshold
  } else {
    // Show: Name, Price, Target, Quantity, Priority, Max Qty
  }
}
```

### 2.3 Delete Product
- **Trigger:** Click "⋯" → "Delete" → Confirm
- **Action:**
  - Removes from parent folder's `products[]`
  - Deletes from `appState.products{}`
  - Logs removal as negative production
- **Result:** Product removed, state saved

### 2.4 Move Product
- **Trigger:** Click "⋯" → "Move to..."
- **UI:** Radio list of all folders
- **Result:** Removes from current folder, adds to target folder

---

## 3. Product Detail Page (Overlay)

### 3.1 Open Product Page
- **Trigger:** Click product name or icon in list
- **Layout:** Full-screen overlay with header, cards, floating back button
- **Header:**
  - "← Back" button (closes page)
  - "Edit" button (opens edit modal)
  - Product name (centered, bold)

### 3.2 Product Information Card
**For Standard Products:**
- Name
- Quantity (number)
- Price (formatted currency)
- Total Value (quantity × price)
- Target Quantity (red text)
- Warning Threshold (if set, displays below quantity)

**For Component Products (independent folders):**
- Name
- Quantity
- Warning Threshold (if set)
- Price/Total/Target rows hidden

### 3.3 Adjust Quantity Card
- **Input:** Number field (numeric keyboard)
- **Buttons:** "Add" (blue), "Remove" (red)
- **Process:**
  1. User enters quantity delta (e.g., 5)
  2. Clicks Add or Remove
  3. Confirmation modal: "Change quantity from X to Y?"
  4. On confirm:
     - Updates `product.quantity`
     - Logs to `productionLog[]` with timestamp, delta, value
     - If Add + sellable product: triggers dynamic link deductions
     - Saves state
     - Updates display
- **Enter Key:** Pressing Enter in input = click Add

```js
function adjustProductQuantity(direction) { // +1 or -1
  const delta = Number(inputEl.value);
  const newQty = direction > 0 ? qty + delta : max(0, qty - delta);
  // Confirm modal
  // On confirm:
  p.quantity = newQty;
  productionLog.push({ ts, productId, delta: signed, price, value });
  if (direction > 0 && !inIndependent) {
    processDynamicLinkDeductions(productId, delta);
  }
  saveStateDebounced();
}
```

### 3.4 Image Card
- **Display:** Shows product.imageUrl (72×72px rounded) or placeholder
- **Upload:** "Upload Image" button → file picker → resize to 300×300 → save dataURL

### 3.5 Note Card
- **Input:** Textarea (auto-resizing, min 1 line)
- **Auto-save:** Saves on page close (no explicit save button)
- **Storage:** `product.note` string

### 3.6 Used In Card (Components Only)
- **Visibility:** Only shown for products in independent folders
- **Content:** Lists all products/folders that link to this component
- **Display:** Compact tags with name, units, remove button (×)
- **Actions:**
  - Click name → opens that product/folder
  - Click × → confirms removal → updates dynamicLinks array

---

## 4. Navigation & Hierarchy

### 4.1 Breadcrumbs
- **Location:** Below top bar
- **Display:** Home > Folder1 > Folder2 > ...
- **Interaction:** Click any crumb → navigate to that folder
- **Updates:** On folder navigation, shows full path from root

### 4.2 Current Folder View
- **Display:** Mixed list of subfolders and products (unified order)
- **Order:** User-defined via drag & drop (stored in `folder.order[]`)
- **Folder Items Show:**
  - Icon (image or 📁 emoji)
  - Name (bold)
  - Total quantity (all products + subfolders)
  - Total value (sum of all product values)
  - "⋯" menu button
- **Product Items Show:**
  - Icon (image or 📦 emoji)
  - Name (bold)
  - Quantity
  - Value (hidden for components)
  - 🔗 icon (if dynamic component)
  - ✏️ icon (if has note)
  - "⋯" menu button

### 4.3 Drag & Drop Reordering
- **Trigger:** Long-press (200ms) on item → drag to new position
- **Visual:** Dragging item fades to 60% opacity, drop target shows blue line
- **Storage:** Updates `folder.order[]` array with mixed keys like "f:id123" or "p:id456"
- **Result:** Visual order persists across sessions

```js
// Order array structure
folder.order = ["f:folderId1", "p:productId1", "f:folderId2", "p:productId2"];
```

---

## 5. Statistics & Progress

### 5.1 Stats Bar (Top of Main View)
- **Location:** Below breadcrumbs, above folder list
- **Cards (horizontal scroll):**
  1. **Daily Progress** (if plan set):
     - "Daily goal" or "Produced today" (if goal reached)
     - "To do" (remaining for today, red)
     - "Extra" (if exceeded goal, green)
  2. **Days Left:** Time until endDate
  3. **Total Qty:** All products sum (pc)
  4. **Total Value:** All products sum (€)

### 5.2 Daily Progress Logic
- **Initialization:** On app start, checks if date changed
- **If New Day:**
  - Sets `dailyProgress.date = today`
  - Captures `dailyProgress.startValue = currentTotalValue`
  - Calculates fixed goal: `(plannedValue - currentTotal) / daysLeft`
  - Stores `dailyProgress.fixedGoal`
- **If Same Day:**
  - Uses stored startValue and fixedGoal (doesn't recalculate)
  - Calculates: `addedToday = currentValue - startValue`
  - Shows progress toward fixed goal
- **Reset Protection:** If currentValue < startValue (data deleted), resets startValue

```js
function ensureDailyProgress() {
  if (date !== todayStr()) {
    dailyProgress.date = todayStr();
    dailyProgress.startValue = currentTotalValue;
    dailyProgress.fixedGoal = (plannedValue - currentTotal) / daysLeft;
  }
}
```

### 5.3 Priority Products Graph
- **Visibility:** Shows when priority products exist with targetQuantity > 0
- **Filtering:**
  - Root level: All priority products
  - Inside folder: Only priority products in that folder tree
  - Hidden in independent folders
- **Display:** Sorted by % complete (lowest first)
- **Each Row Shows:**
  - Product name (clickable → opens product page)
  - Progress bar (0-100%, capped)
  - Percentage (can exceed 100%)
  - Quantity progress: "X / Y pc (Z%)"
  - Color: Red (0%) → Green (100%), smooth gradient

```js
// Color interpolation
const pctColor = (p) => {
  const t = p / 100; // 0.0 to 1.0
  const r = 220 + (16 - 220) * t;   // #dc2626 to #10b981
  const g = 38 + (185 - 38) * t;
  const b = 38 + (129 - 38) * t;
  return `rgb(${r}, ${g}, ${b})`;
};
```

---

## 6. Statistics Calculation

### 6.1 computeStats(folderId)
- **Purpose:** Recursively calculates total quantity and value for a folder
- **Logic:**
  1. If folder.isIndependent → return {totalQty: 0, totalValue: 0}
  2. Sum all products in folder: qty, value = qty × price
  3. Recursively sum all subfolders (skip if subfolder.isIndependent)
  4. Return {totalQty, totalValue}
- **Usage:** Stats bar, folder metadata, daily progress

```js
function computeStats(folderId) {
  const folder = appState.folders[folderId];
  if (folder.isIndependent) return { totalQty: 0, totalValue: 0 };
  
  let totalQty = 0, totalValue = 0;
  // Products in this folder
  for (const pid of folder.products) {
    const p = products[pid];
    totalQty += p.quantity;
    totalValue += p.quantity * p.price;
  }
  // Subfolders (skip independent)
  for (const fid of folder.subfolders) {
    if (folders[fid].isIndependent) continue;
    const stats = computeStats(fid);
    totalQty += stats.totalQty;
    totalValue += stats.totalValue;
  }
  return { totalQty, totalValue };
}
```

---

## 7. Search

### 7.1 Search Bar
- **Location:** Center of top bar
- **Mobile Portrait:** Hidden by default, toggle button shows
- **Input:** Real-time search as you type
- **Scope:** Searches product names only (not folders)
- **Results:** Dropdown below input, max 50 results
- **Each Result Shows:**
  - Product name
  - Quantity
  - Total value (qty × price)
- **Interaction:** Click result → opens product page, clears search

### 7.2 Mobile Search Toggle
- **Portrait Mode Only:** Search bar collapsed, magnifying glass button visible
- **Click Button:** Expands search bar as overlay
- **Click Outside or Escape:** Collapses search
- **Orientation Change:** Resets to default state

```js
function attachSearch() {
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    const results = Object.values(products)
      .filter(p => p.name.toLowerCase().includes(q))
      .slice(0, 50);
    // Display in dropdown
  });
}
```

---

## 8. Top Bar Actions

### 8.1 Add Button (+)
- **Click:** Opens modal with options:
  - "New Folder"
  - "New Product"
- **Creates:** In current folder location

### 8.2 Save Button
- **Action:** Manual save trigger
- **Process:**
  1. Creates snapshot in IndexedDB 'snapshots' store
  2. Uploads backup to Supabase Storage (timestamped filename)
  3. Shows toast: "Saved"
  4. Updates sync status icon
- **No Download:** Save button doesn't download file (use Export for that)

### 8.3 Actions Button
- **Opens Modal With:**
  - "Save (snapshot + cloud)" → Same as Save button
  - "Import JSON" → File picker for .json files
  - "Export JSON" → Downloads current state as save.json

### 8.4 Settings Button (⚙️)
- **Opens Settings Modal** (see Part 3)

### 8.5 Search Toggle (🔍)
- **Mobile Only:** Toggles search bar visibility in portrait mode

### 8.6 Sync Status Indicator
- **States:**
  - Gray "Offline" → Not connected
  - Yellow blinking → Syncing
  - Green checkmark → Synced
  - Red blinking → Error
- **Updates:** Automatically based on connection and sync operations

---

## 9. Context Menus

### 9.1 Folder Menu (⋯)
- **Edit** → Opens edit modal
- **Delete** → Confirmation → Deletes folder recursively
- **Move to...** → Folder picker → Moves folder

### 9.2 Product Menu (⋯)
- **Edit** → Opens edit modal
- **Delete** → Confirmation → Deletes product
- **Move to...** → Folder picker → Moves product

---

## 10. Modals

### 10.1 Modal Structure
- **Overlay:** Semi-transparent black background
- **Content:** White rounded card, max-width 560px
- **Header:** Title + Close button (×)
- **Body:** Dynamic content
- **Actions:** Buttons (right-aligned)

### 10.2 Common Modals
- **Confirmation:** Title, message, Confirm/Cancel buttons
- **Edit Forms:** Inputs with Save/Cancel buttons
- **Folder Picker:** Radio list of folders
- **Add Menu:** Button options for creating items

```js
function openModal({ title, body, actions }) {
  // title: string
  // body: string or HTMLElement
  // actions: [{ label, onClick, keepOpen }]
  // If keepOpen not set, modal closes after onClick
}
```

---

## 11. Toast Notifications

### 11.1 Toast System
- **Location:** Bottom-right corner
- **Appearance:** Dark background, white text, rounded
- **Duration:** 3 seconds (default) or custom
- **Auto-dismiss:** Fades out after duration
- **Usage:** Success messages, errors, info

```js
function showToast(message, duration = 3000) {
  // Creates toast element
  // Appends to #toast-container
  // Auto-removes after duration
}
```

---

## 12. Data Structure

### 12.1 appState Object
```js
{
  version: 1,
  lastModified: timestamp,
  folders: {
    root: { id, name, parentId, imageUrl, subfolders[], products[], order[], isIndependent },
    // ... other folders
  },
  products: {
    id1: { id, name, price, quantity, targetQuantity, priority, imageUrl, note, warnThreshold, isDynamic, dynamicLinks[], maxQuantity },
    // ... other products
  },
  productionLog: [
    { ts, productId, delta, price, value },
    // ... log entries
  ],
  settings: {
    plannedValue: number,
    endDate: "YYYY-MM-DD"
  },
  dailyProgress: {
    date: "YYYY-MM-DD",
    startValue: number,
    fixedGoal: number
  }
}
```

### 12.2 Key Properties
- **folder.order[]:** Mixed array like `["f:id1", "p:id2"]` for display order
- **folder.isIndependent:** Boolean, excludes from stats
- **product.isDynamic:** Boolean, enables component linking
- **product.dynamicLinks[]:** `[{ type: 'product'|'folder', targetId, units }]`
- **product.warnThreshold:** Number, triggers low quantity alert
- **productionLog[]:** Chronological record of all quantity changes

---
