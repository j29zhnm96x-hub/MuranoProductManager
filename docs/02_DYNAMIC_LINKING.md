# Instructed Documentation – Murano Product Manager v1.0
## Part 2: Dynamic Linking & Warning System

---

## 1. Dynamic Linking System

**Purpose:** Automatically deduct component quantities when finished products are produced.

**Use Case:** Track material inventory (beads, pins, rings) that depletes as products are manufactured.

---

### 1.1 Concept Overview

**Two Product Types:**
1. **Sellable Products** (in normal folders)
   - Have price and target quantity
   - Contribute to stats
   - When quantity increases → deducts from linked components

2. **Component Products** (in independent folders)
   - No price or target (hidden in UI)
   - Track raw materials/supplies
   - Can be marked as "Dynamic" to auto-deduct

**Link Direction:**
- Components link TO products/folders they're used in
- When linked product quantity increases → component quantity decreases

---

### 1.2 Enable Dynamic Component

**Location:** Product Edit Modal (for products in independent folders only)

**Steps:**
1. Edit a product in an independent folder
2. Check "Dynamic Component" checkbox (master switch)
3. UI reveals:
   - Warning Threshold input
   - "Add Link" button
   - Link list area
   - Units information

**Data Changed:**
```js
product.isDynamic = true; // Enables the system
product.dynamicLinks = []; // Will store links
product.warnThreshold = 0; // Optional low-stock alert
```

---

### 1.3 Add Link

**Trigger:** Click "Add Link" button in edit modal

**Link Selector Modal Opens:**

**Step 1: Choose Link Type**
- Radio toggle: "Link to Product" OR "Link to Folder"

**Step 2: Search & Select**
- Real-time search input
- Filters as you type
- Results list (scrollable)
- Highlights matching text (yellow background)
- Click item to select
- Selected item shows bold with gray background

**Products List:**
- Only shows sellable products (not in independent folders)
- Sorted alphabetically

**Folders List:**
- Only shows non-independent folders (exclude "root")
- Sorted alphabetically

**Step 3: Specify Units**
- Input: "Units used" (number, min: 1, default: 1)
- Means: "How many of this component per 1 finished product"
- Example: If 1 necklace uses 50 beads → units = 50

**Step 4: Confirm**
- Click "Add" button
- Validates: No duplicate links
- If duplicate → toast: "This link already exists"
- If valid → adds to `product.dynamicLinks[]`
- Closes modal, updates UI, saves state

```js
// Link structure
{
  type: 'product' | 'folder',
  targetId: 'productId' | 'folderId',
  units: number // How many units per 1 production
}
```

**Example Scenarios:**

Scenario A - Link to Single Product:
- Component: "Glass Beads"
- Link to: Product "Blue Necklace"
- Units: 50
- Result: Making 1 Blue Necklace removes 50 Glass Beads

Scenario B - Link to Folder:
- Component: "Lobster Clasps"
- Link to: Folder "Bracelets"
- Units: 1
- Result: Making ANY product in Bracelets folder removes 1 Lobster Clasp

---

### 1.4 Link List Display

**In Edit Modal:**
- Shows all links as compact rows
- Each row displays:
  - Icon/label: "Product:" or "Folder:"
  - Name of linked target
  - Units in parentheses: "(5 units)"
  - Remove button: × (red)

**Remove Link:**
- Click × button
- Confirmation modal: "Unlink will break quantity sync. OK?"
- On confirm:
  - Removes from `dynamicLinks[]` array
  - Updates display
  - Saves state

---

### 1.5 Deduction Logic (Core Algorithm)

**Trigger:** When a sellable product's quantity INCREASES

**Function:** `processDynamicLinkDeductions(productId, delta)`

**Process:**
1. Check: Is delta > 0? (Only process additions, not removals)
2. Find parent folder of changed product
3. Iterate ALL products in database
4. For each product:
   - Is it in an independent folder? (Yes → continue)
   - Is isDynamic true? (Yes → continue)
   - Does it have dynamicLinks? (Yes → continue)
   - For each link in dynamicLinks:
     - **If link.type === 'product':**
       - Does link.targetId === changedProductId? → DEDUCT
     - **If link.type === 'folder':**
       - Is changedProduct in that folder tree? → DEDUCT
5. Deduction calculation:
   - `deductAmount = delta × link.units`
   - `newQty = max(0, component.quantity - deductAmount)`
6. Update component.quantity (capped at 0, never negative)
7. Save state (silent, no confirmations)

```js
function processDynamicLinkDeductions(changedProductId, delta) {
  if (delta <= 0) return;
  
  const changedProduct = products[changedProductId];
  const changedFolder = getProductParentFolder(changedProductId);
  
  for (const componentId in products) {
    const component = products[componentId];
    
    // Must be dynamic component in independent folder
    if (!isProductInIndependentFolder(componentId)) continue;
    if (!component.isDynamic) continue;
    if (!component.dynamicLinks?.length) continue;
    
    for (const link of component.dynamicLinks) {
      let shouldDeduct = false;
      
      // Direct product link
      if (link.type === 'product' && link.targetId === changedProductId) {
        shouldDeduct = true;
      }
      // Folder link (checks if product is in folder tree)
      else if (link.type === 'folder' && isProductInFolder(changedProductId, link.targetId)) {
        shouldDeduct = true;
      }
      
      if (shouldDeduct) {
        const deduction = delta * link.units;
        component.quantity = Math.max(0, component.quantity - deduction);
      }
    }
  }
}
```

**Example Execution:**

Initial State:
- Lobster Clasps: 100 quantity, links to "Bracelets" folder with 1 unit
- Blue Bracelet (in Bracelets): 10 quantity

Action: Add 5 Blue Bracelets
1. Blue Bracelet.quantity = 15 (+5)
2. Deduction triggered: productId="blueBracelet", delta=5
3. Finds Lobster Clasps component
4. Checks link: type=folder, targetId="Bracelets"
5. Confirms Blue Bracelet is in Bracelets folder
6. Calculates: deduction = 5 × 1 = 5
7. Updates: Lobster Clasps.quantity = 100 - 5 = 95

Result:
- Blue Bracelet: 15 quantity
- Lobster Clasps: 95 quantity

---

### 1.6 Helper Functions

**isProductInIndependentFolder(productId)**
- Finds product's parent folder
- Returns folder.isIndependent boolean

**getProductParentFolder(productId)**
- Iterates all folders
- Checks if productId in folder.products[]
- Returns folder object or null

**isProductInFolder(productId, folderId)**
- Recursively checks if product is in folder or subfolders
- Used for folder-type links

**getAllSellableProducts()**
- Returns all products NOT in independent folders
- Sorted alphabetically
- Used in link selector

**getAllNonIndependentFolders()**
- Returns all folders except root and independent ones
- Sorted alphabetically
- Used in link selector

```js
function isProductInFolder(productId, folderId) {
  const checkFolder = (fid) => {
    const f = folders[fid];
    if (!f) return false;
    if (f.products.includes(productId)) return true;
    for (const subfid of f.subfolders) {
      if (checkFolder(subfid)) return true;
    }
    return false;
  };
  return checkFolder(folderId);
}
```

---

### 1.7 UI Indicators

**In Folder List:**
- Component products show 🔗 icon next to quantity
- Only visible if `product.isDynamic === true`
- Placement: After quantity text in metadata row

**In Product Page:**
- "Used In" section (only for components in independent folders)
- Shows all products/folders that link to this component
- Each link displayed as:
  - Blue rounded tag
  - Name + units: "Blue Necklace (50)"
  - × button to remove
  - Click name → navigates to that product/folder
  - Click × → confirmation → removes link

**In Edit Modal:**
- Dynamic Component checkbox at top (master switch)
- Link management UI below (only when checked)
- Warning Threshold input (for low stock alerts)

---

### 1.8 Integration Points

**Quantity Adjustment:**
```js
// In adjustProductQuantity()
if (direction > 0 && !isProductInIndependentFolder(productId)) {
  processDynamicLinkDeductions(productId, delta);
}
```

**Edit Modal Initialization:**
```js
// In openProductEditModal()
if (!p.dynamicLinks) p.dynamicLinks = [];
if (p.isDynamic === undefined) p.isDynamic = false;
```

**Save Logic:**
```js
// In edit modal save action
p.isDynamic = checkbox.checked;
if (!p.isDynamic) {
  p.dynamicLinks = []; // Clear links when disabled
}
```

---

## 2. Warning System (Low Quantity Alerts)

**Purpose:** Alert user when component quantities fall below specified thresholds.

---

### 2.1 Warning Threshold

**Set in Edit Modal:**
- Input: "Warning Threshold" (number, min: 0)
- Available for all products (components and sellable)
- Stored in `product.warnThreshold`
- When quantity < threshold → triggers warning

**Example:**
- Product: "Silver Wire"
- Quantity: 25
- Warning Threshold: 50
- Result: Warning triggered (25 < 50)

---

### 2.2 Warning Icon

**Location:** Top bar, before settings button

**Appearance:**
- Red exclamation mark (!)
- Large, bold font (28px, weight 900)
- Blinks with animation (opacity 1 ↔ 0.1)
- Height matches control height

**Visibility:**
- Hidden when no warnings
- Visible when ≥1 product below threshold

**Trigger Check:**
- Runs on every render via `checkLowQuantityComponents()`
- Scans all products
- Counts products where `quantity < warnThreshold`

```js
function checkLowQuantityComponents() {
  const lowQuantityProducts = [];
  
  for (const [productId, product] of Object.entries(products)) {
    if (product.warnThreshold && product.warnThreshold > 0) {
      if (product.quantity < product.warnThreshold) {
        lowQuantityProducts.push({
          id: productId,
          name: product.name,
          quantity: product.quantity,
          threshold: product.warnThreshold
        });
      }
    }
  }
  
  updateWarningIcon(lowQuantityProducts.length > 0);
  window.lowQuantityProducts = lowQuantityProducts; // Store for modal
}
```

---

### 2.3 Warning Modal

**Trigger:** Click warning icon (!)

**Layout:**
- Title: "⚠️ Low Quantity Alert" (red, bold, centered)
- Scrollable list (max-height: 80vh - 200px)
- Each item shows:
  - Product name (bold, black)
  - Current quantity: "X pc" (red, bold)
  - Light red background (#fef2f2)
  - Red border (#fecaca)
  - Hover: Darker shade

**Interaction:**
- Click item → closes modal, opens that product's detail page
- Allows quick navigation to restock items

**Close:** Modal has standard close button

```js
function showLowQuantityModal() {
  const products = window.lowQuantityProducts;
  // Build modal with list
  products.forEach(product => {
    // Create clickable item
    item.addEventListener('click', () => {
      closeModal();
      openProductPage(product.id);
    });
  });
}
```

---

### 2.4 Warning Workflow Example

**Scenario:**
1. User sets "Lobster Clasps" threshold to 20
2. Current quantity: 35 (no warning)
3. User produces 3 bracelets (each uses 1 clasp)
4. Dynamic deduction: 35 - 3 = 32 (still no warning)
5. User produces 15 more bracelets
6. Dynamic deduction: 32 - 15 = 17
7. Check: 17 < 20 → Warning triggered
8. Red (!) icon appears in top bar
9. User clicks icon → sees "Lobster Clasps: 17 pc"
10. User clicks item → opens product page → restocks

---

## 3. Component-Specific UI Behavior

### 3.1 Products in Independent Folders

**Edit Modal:**
- Price input: Hidden
- Target Quantity input: Hidden
- Shows instead:
  - Dynamic Component checkbox
  - Warning Threshold input
  - Link management UI (if dynamic enabled)

**Product Page:**
- Price row: Hidden
- Total Value row: Hidden
- Target Quantity row: Hidden
- Shows instead:
  - Warning Threshold (if set)
  - "Used In" section (if has links)

**Folder List:**
- Value metadata: Hidden
- Shows only:
  - Quantity: "Qty: X"
  - 🔗 icon (if dynamic)
  - ✏️ icon (if has note)

```js
// UI logic
if (isProductInIndependentFolder(productId)) {
  // Hide: price, target, value
  // Show: warning threshold, used-in section, link icon
} else {
  // Show: price, target, value
  // Hide: dynamic component features
}
```

---

## 4. Data Persistence

### 4.1 Product Data Structure (Extended)
```js
{
  id: "prod-123",
  name: "Silver Wire",
  quantity: 25,
  
  // For sellable products:
  price: 15.50,
  targetQuantity: 100,
  priority: true,
  
  // For components:
  isDynamic: true,
  warnThreshold: 50,
  dynamicLinks: [
    { type: 'product', targetId: 'prod-456', units: 3 },
    { type: 'folder', targetId: 'fold-789', units: 1 }
  ],
  
  // Common:
  imageUrl: "data:image/jpeg;base64,...",
  note: "Reorder from supplier X"
}
```

### 4.2 Save Triggers
- Any link addition/removal → `saveStateDebounced()`
- Dynamic checkbox toggle → `saveStateDebounced()`
- Warning threshold change → `saveStateDebounced()`
- Quantity adjustment (with deductions) → `saveStateDebounced()`

---

## 5. Edge Cases & Validations

### 5.1 Duplicate Prevention
- Cannot add same link twice (same type + targetId)
- Checked before adding to `dynamicLinks[]`
- Shows toast if duplicate attempted

### 5.2 Negative Quantity Protection
- Deductions capped at 0: `Math.max(0, qty - deduction)`
- Never goes negative even if not enough stock
- Silent operation (no warnings to user)

### 5.3 Circular Reference Prevention
- Folder move validation prevents circular parent-child
- Link system allows any direction (no circular concern)

### 5.4 Deleted Link Targets
- If linked product/folder deleted → link becomes invalid
- Component still has link in array
- UI shows "???" for missing name
- No auto-cleanup (user must manually remove)

### 5.5 Component vs Sellable Switching
- Moving product between independent/normal folders doesn't auto-clear isDynamic
- User must manually toggle Dynamic Component checkbox
- Links persist but become inactive if moved to normal folder

---

## 6. Performance Considerations

### 6.1 Deduction Scan
- Runs on every sellable product quantity increase
- Iterates ALL products (O(n))
- For each: checks links (O(m))
- Total: O(n×m) but typically small datasets
- Silent/async operation

### 6.2 Link Selector Search
- Real-time filtering on keystrokes
- Filters in-memory arrays (fast)
- Results sliced to prevent excessive DOM rendering
- Highlights search term with regex

### 6.3 Warning Check
- Runs on every `renderAll()` call
- O(n) scan of all products
- Minimal computation (number comparison)
- Updates single DOM element (icon visibility)

---

## 7. User Experience Flow

### Complete Component Setup Example:

**Goal:** Track bead usage across all necklaces

**Step 1: Create Independent Folder**
1. Click + → New Folder
2. Name: "Materials"
3. Edit → Check "Make independent"
4. Save

**Step 2: Create Component**
1. Navigate into Materials folder
2. Click + → New Product
3. Name: "Red Beads"
4. Upload image (optional)
5. Create

**Step 3: Enable Dynamic Linking**
1. Click ⋯ on Red Beads → Edit
2. Check "Dynamic Component"
3. Set Warning Threshold: 100
4. Click "Add Link"

**Step 4: Add Links**
1. Select "Link to Folder"
2. Search: "Necklaces"
3. Select "Necklaces" folder
4. Units: 75 (each necklace uses 75 beads)
5. Click Add
6. Repeat for other products if needed
7. Save

**Step 5: Verify Setup**
1. Red Beads product page shows "Used In" section
2. Lists "Necklaces (75)"
3. Folder list shows 🔗 icon on Red Beads

**Step 6: Test Deduction**
1. Open any necklace product
2. Add 2 to quantity
3. Confirm
4. Navigate to Red Beads
5. Quantity decreased by 150 (2 × 75)

**Step 7: Monitor Warnings**
1. If Red Beads drops below 100
2. Red (!) appears in top bar
3. Click to see alert
4. Click Red Beads to restock

---
