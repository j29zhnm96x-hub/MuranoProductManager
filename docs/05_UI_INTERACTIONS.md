# Instructed Documentation – Murano Product Manager v1.0
## Part 5: UI Interactions & Complete User Flows

---

## 1. Complete User Workflows

### 1.1 First-Time Setup Flow

**Step 1: Initial Access**
1. User navigates to app URL
2. Service worker installs (caches assets)
3. Auth overlay appears
4. User enters password: 9277
5. Clicks Submit → Authenticated

**Step 2: Empty State**
1. App loads sample data OR empty state
2. Shows "Home" folder (root)
3. Empty folder list
4. Stats show 0 quantity, 0 value

**Step 3: Configure Settings**
1. Click settings button (⚙️)
2. Enter "Planned total": 30000
3. Select "End date": 2025-12-31
4. Click Save
5. Stats bar updates with daily goal

**Step 4: Create First Folder**
1. Click + button
2. Select "New Folder"
3. Enter name: "Necklaces"
4. (Optional) Upload folder image
5. Click Save
6. Folder appears in list

**Step 5: Create First Product**
1. Click into "Necklaces" folder (breadcrumb shows: Home > Necklaces)
2. Click + button
3. Select "New Product"
4. Enter name: "Blue Necklace"
5. (Optional) Upload product image
6. Click Create
7. Product appears with 0 quantity

**Step 6: Edit Product Details**
1. Click ⋯ on "Blue Necklace"
2. Select "Edit"
3. Set Price: 15.50
4. Set Target Quantity: 100
5. Check "Priority product"
6. Click Save
7. Priority graph appears showing 0% progress

**Step 7: Add Inventory**
1. Click product name → Product page opens
2. Enter quantity: 10
3. Click "Add"
4. Confirm modal: "Change quantity from 0 to 10?"
5. Click Confirm
6. Quantity updates to 10
7. Total value: 155.00 €
8. Priority graph updates to 10%

**Step 8: Verify Sync**
1. Observe sync status icon → Green checkmark
2. Changes automatically saved to cloud
3. Close tab, reopen → Data persists

---

### 1.2 Production Workflow (Standard Products)

**Scenario:** Manufacturing finished products

**Daily Routine:**
1. Open app → Auto-authenticated (session)
2. Stats bar shows:
   - Daily goal: 450 €
   - To do: 450 €
   - Total: 15,678 €
3. Priority graph shows products needing work

**Add Production:**
1. Click product from priority graph OR navigate to folder
2. Product page opens
3. Today's production: Made 5 necklaces
4. Enter 5 in quantity input
5. Click "Add"
6. Confirm: "Change quantity from 10 to 15?"
7. Click Confirm
8. Quantity updates
9. Stats bar updates:
   - To do: 372.50 € (reduced by 77.50)
   - Total: 15,755.50 €
10. Priority graph updates: 10% → 15%
11. Click Back → Return to main view

**End of Day:**
1. Stats bar shows:
   - Produced today: 485 € (goal: 450 €)
   - Extra: 35 € (green)
2. Tomorrow: Resets to new daily goal

---

### 1.3 Component Management Workflow

**Scenario:** Track bead inventory that depletes as necklaces are made

**Setup Phase:**

**Step 1: Create Independent Folder**
1. Click + → New Folder
2. Name: "Materials"
3. Edit → Check "Make independent (exclude from stats)"
4. Save
5. Folder displays with gray background

**Step 2: Add Component Product**
1. Navigate into "Materials"
2. Click + → New Product
3. Name: "Red Beads"
4. Upload image of beads
5. Create
6. Notice: No price/target fields shown

**Step 3: Set Initial Stock**
1. Click "Red Beads" → Product page
2. Enter quantity: 1000
3. Click Add → Confirm
4. Quantity: 1000
5. No value shown (independent folder)

**Step 4: Enable Dynamic Linking**
1. Click ⋯ → Edit
2. Check "Dynamic Component"
3. Set Warning Threshold: 200
4. Click "Add Link"

**Step 5: Link to Products**
1. Link Selector opens
2. Select "Link to Product"
3. Search: "Blue Necklace"
4. Click "Blue Necklace"
5. Enter Units: 50 (each necklace uses 50 beads)
6. Click Add
7. Link appears: "Product: Blue Necklace (50 units)"
8. Repeat for other necklaces
9. Click Save

**Usage Phase:**

**Manufacturing:**
1. Navigate to "Necklaces" folder
2. Click "Blue Necklace" → Product page
3. Enter quantity: 3
4. Click Add → Confirm
5. Behind the scenes:
   - Blue Necklace: +3 (now 13)
   - Red Beads: -150 (3 × 50 = 150 deducted, now 850)
6. Return to main view

**Check Component Stock:**
1. Navigate to "Materials"
2. See "Red Beads: Qty: 850"
3. 🔗 icon indicates dynamic component
4. Click "Red Beads" → Product page
5. "Used In" section shows:
   - "Blue Necklace (50)" tag
   - Click name → navigates to Blue Necklace
   - Click × → removes link (with confirmation)

**Low Stock Alert:**
1. Continue manufacturing until beads < 200
2. Red exclamation (!) appears in top bar
3. Click ! → Modal shows:
   - "⚠️ Low Quantity Alert"
   - "Red Beads: 185 pc"
4. Click item → Opens Red Beads page
5. Restock: Add 1000 → Confirm
6. Warning icon disappears

---

### 1.4 Multi-Device Sync Workflow

**Scenario:** Work on desktop, switch to tablet

**Device A (Desktop):**
1. Make changes: Add products, adjust quantities
2. Sync status: Green checkmark (auto-synced)
3. Close browser

**Device B (Tablet):**
1. Open app
2. Enter password: 9277
3. App loads latest cloud backup
4. All changes from Device A visible
5. Make more changes
6. Auto-syncs to cloud

**Back to Device A:**
1. Reopen app
2. Remote watcher detects newer backup (1s poll)
3. Overlay appears: "New version found, refreshing…"
4. Downloads and applies tablet changes
5. Overlay disappears
6. UI shows combined state

**Conflict Scenario:**
1. Both devices offline, make different changes
2. Device A comes online first → Uploads backup A
3. Device B comes online → Uploads backup B
4. Backup B has newer timestamp → Overwrites
5. Device A detects backup B → Refreshes
6. Device A's local changes lost (last-write-wins)

---

### 1.5 Offline Usage Workflow

**Go Offline:**
1. User working normally, sync status green
2. Internet disconnected
3. Sync status changes to gray "Offline"
4. All features work normally (IndexedDB local)

**Make Changes:**
1. Create products
2. Adjust quantities
3. Edit folders
4. All save to IndexedDB immediately
5. Modified flag = true
6. Cloud sync queued but not executed

**Return Online:**
1. Internet reconnected
2. Connection checker detects (within 5 seconds)
3. Notices modified flag = true
4. Sync status → Yellow "syncing"
5. Creates snapshot
6. Uploads all changes to cloud
7. Sync status → Green "synced"
8. Toast: "Changes synced"

**Data Safety:**
- No data loss during offline period
- Changes accumulated and synced when online
- IndexedDB persists across browser restarts

---

## 2. Interaction Patterns

### 2.1 Click Interactions

**Single Click Actions:**
- Folder/Product name → Navigate/Open detail page
- Button → Execute action
- Breadcrumb → Navigate to folder
- Search result → Open product page
- Priority graph product → Open product page
- Warning icon → Open low stock modal
- Warning modal item → Open product page

**Long-Press Actions:**
- Folder/Product item (200ms) → Enable drag mode
- Drag to new position → Reorder
- Release → Drop at new position

**Right-Click / Context Menu:**
- Not implemented (use ⋯ button instead)

### 2.2 Modal Patterns

**Standard Modal:**
1. User triggers action
2. Modal overlay appears (dims background)
3. Focus trapped in modal
4. Escape key closes (most modals)
5. Click outside closes (some modals)
6. Click action button → Executes + closes
7. Click cancel → Closes without action

**Confirmation Modals:**
- Show current → new state
- Require explicit Confirm click
- Cancel button always available
- Used for: Delete, Quantity adjust, Link remove

**Form Modals:**
- Pre-filled with current values
- Inputs auto-focus
- Enter key submits (most cases)
- Save/Cancel buttons
- Validation: Empty name prevented

**Persistent Modals (keepOpen):**
- Actions don't auto-close modal
- Used for: Report copy/share, Settings actions
- Explicit Close button required

### 2.3 Navigation Patterns

**Hierarchical:**
- Click folder → Navigate into folder
- Breadcrumbs show path: Home > Folder1 > Folder2
- Click breadcrumb → Jump to that level
- No browser history (single-page app)

**Direct Access:**
- Search → Opens product page directly
- Priority graph → Opens product page directly
- Warning modal → Opens product page directly
- Used In tags → Opens linked product/folder

**Back Navigation:**
- Product page: "← Back" button
- Edit modal: "← Back" button (closes modal)
- Browser back button: Not handled (no history push)

### 2.4 Input Patterns

**Text Inputs:**
- Click input → Cursor appears
- Existing text auto-selected on focus
- Type to replace OR click to position cursor
- Mobile: Shows appropriate keyboard

**Numeric Inputs:**
- Mobile: Numeric keyboard appears
- Desktop: Number spinner (up/down arrows)
- Can type directly or use arrows
- Min/Max/Step constraints enforced

**Date Inputs:**
- Opens native date picker
- Format: YYYY-MM-DD
- Calendar UI (browser-dependent)

**File Inputs:**
- Click button → Opens file picker
- Select image → Processes immediately
- Preview appears
- No explicit save (auto-saved)

**Checkboxes:**
- Click anywhere on label → Toggles
- Visual feedback (checked/unchecked)
- State saved immediately

### 2.5 Drag & Drop Pattern

**Initiation:**
- Long-press item (200ms hold)
- Item becomes draggable
- Visual: Opacity 60%, cursor changes

**During Drag:**
- Move mouse/finger
- Drag preview follows
- Hover over valid drop targets
- Blue line indicates drop position

**Drop:**
- Release mouse/finger
- Item reorders to drop position
- Updates `folder.order[]` array
- Auto-saves
- Re-renders list

**Cancel:**
- Drag outside valid area → No change
- Escape key → Cancel drag (if implemented)

### 2.6 Scroll Behaviors

**Main Folder List:**
- Vertical scroll
- Max height: calc(100vh - 160px)
- Scroll bar appears when content exceeds

**Product Page:**
- Full-page scroll
- Header fixed at top
- Content scrolls underneath
- Floating back button always accessible

**Search Results Dropdown:**
- Max height: 320px
- Vertical scroll if > 50 results
- Scrollbar auto-appears

**Modal Content:**
- Body scrolls if content tall
- Header/Footer fixed
- Max height: 80vh

**Stats Bar:**
- Horizontal scroll on mobile
- No vertical scroll
- Swipe left/right to see all cards

---

## 3. Keyboard Shortcuts

**Note:** Limited keyboard shortcuts implemented

### 3.1 Global Shortcuts
- **Escape:** Close search dropdown (portrait mode)
- **Escape:** (Potential) Cancel drag operation

### 3.2 Input Shortcuts
- **Enter (Search):** No action (live search)
- **Enter (Quantity):** Same as Add button
- **Enter (Auth):** Same as Submit button
- **Enter (Modal Forms):** Submit form

### 3.3 Focus Management
- Tab order: Follows DOM order
- Auto-focus: Name inputs in modals
- Auto-select: Text highlighted on focus

---

## 4. Visual Feedback

### 4.1 Hover Effects

**Buttons:**
- Background color change (lighter/darker)
- Transition: 0.2s
- Cursor: pointer

**Folder/Product Items:**
- Border color change
- Box shadow increase
- Transition: smooth

**Links/Tags:**
- Background color change
- Underline (text links)

### 4.2 Active/Pressed States

**Buttons:**
- Slight scale down (transform: translateY(1px))
- Darker background

**Items:**
- No special pressed state (uses hover)

### 4.3 Focus States

**Inputs:**
- Border color change (blue)
- Outline ring (browser default)

**Buttons:**
- Outline ring (browser default)
- Some custom focus styles

### 4.4 Loading States

**Sync Status:**
- Yellow blink animation (syncing)
- Green solid (synced)
- Red blink (error)

**Refresh Overlay:**
- Full-screen dim
- Centered message box
- No spinner (brief duration)

### 4.5 Error States

**Sync Error:**
- Red blinking icon in top bar
- Persists until retry succeeds

**Low Quantity Warning:**
- Red blinking exclamation in top bar
- Persists until all products above threshold

**Form Validation:**
- HTML5 validation messages
- Browser-default UI

### 4.6 Success Feedback

**Toast Notifications:**
- Bottom-right corner
- Dark background, white text
- Auto-dismiss after 3 seconds
- Fade out animation

**Examples:**
- "Saved"
- "Snapshot saved"
- "Import complete"
- "Link added"
- "Changes synced"

---

## 5. Accessibility Features

### 5.1 Semantic HTML
- Proper heading hierarchy (h1, h2, etc. - not in code, but structure exists)
- Button elements for clickable actions
- Input labels associated with inputs
- Landmarks: main, navigation (via IDs)

### 5.2 ARIA Attributes
- `aria-label` on key containers:
  - `#product-page`: "Product detail"
  - `#folder-list`: "Folder and product tree"
  - `#priority-graph`: "Priority products progress"
  - `#stats-bar`: "Overall stats"
- `aria-live="polite"` on toast container
- `aria-live="assertive"` on refresh overlay
- `aria-modal="true"` on modals
- `role="dialog"` on modals
- `aria-hidden="true"` on decorative icons

### 5.3 Keyboard Navigation
- All interactive elements focusable (buttons, inputs, links)
- Tab order follows logical flow
- Enter/Space activate buttons
- Escape closes some modals/dropdowns

### 5.4 Color Contrast
- Text colors meet WCAG AA (likely, based on CSS)
- Error states use red (#ef4444)
- Success states use green (#10b981)
- Warning states use orange/yellow

### 5.5 Screen Reader Considerations
- Button text describes action
- Input placeholders provide hints
- Alt text on images (where implemented)
- Title attributes for icon buttons

### 5.6 Not Implemented
- Skip links
- Full keyboard shortcuts
- Reduced motion preferences
- High contrast mode
- Screen reader testing (unknown status)

---

## 6. Error Handling & Edge Cases

### 6.1 Network Errors

**Scenario:** Supabase API request fails

**Handling:**
1. Catch error in try-catch
2. Log to console: `console.warn(e)`
3. Set sync status → red
4. Show toast: "Cloud sync failed" OR "Save failed"
5. Queue for retry (autosave system)
6. User can continue working offline

**No User Blockage:** App never prevents usage due to network error

### 6.2 IndexedDB Errors

**Scenario:** Local storage write fails (quota exceeded, corruption)

**Handling:**
1. Catch error in writeState()
2. Log to console: `console.error(e)`
3. Show toast: "Failed to save"
4. No retry mechanism (data loss risk)
5. User may need to clear browser data

### 6.3 Invalid JSON Import

**Scenario:** User imports corrupted .json file

**Handling:**
1. JSON.parse() throws error
2. Catch in importState()
3. Log to console: `console.error(e)`
4. Show toast: "Import failed: invalid JSON"
5. Open modal: "Import failed - Invalid JSON format."
6. No state change (safe)

### 6.4 Missing Image Files

**Scenario:** Image upload fails or file unreadable

**Handling:**
1. FileReader onerror OR Image onerror
2. Catch in resizeImageToDataURL()
3. Reject promise
4. Upload attempt silently fails
5. No error message to user
6. Image remains empty/previous

### 6.5 Deleted Link Targets

**Scenario:** Product/Folder linked as component target gets deleted

**Handling:**
- Link remains in `dynamicLinks[]` array
- UI shows "???" for name
- Deduction logic checks `if (targetExists)` → Skips if null
- No auto-cleanup
- User must manually remove dead link

### 6.6 Concurrent Tab Edits

**Scenario:** Same user, two tabs, same browser

**Handling:**
- Each tab writes to IndexedDB independently
- Last write wins (race condition)
- Can cause data loss
- No conflict detection
- No multi-tab sync

**Recommendation:** Use single tab only

### 6.7 Browser Storage Full

**Scenario:** IndexedDB quota exceeded

**Handling:**
- writeState() fails
- Toast: "Failed to save"
- Data loss risk
- User must delete data or clear storage

### 6.8 Image Too Large

**Scenario:** User uploads 20MB image

**Handling:**
- FileReader reads entire file (may be slow)
- Processes to 300×300px JPEG
- Resulting dataURL ~30-50 KB
- Large source not a problem (gets compressed)

### 6.9 Invalid Dates

**Scenario:** User sets end date in past

**Handling:**
- No validation (accepts any date)
- Days left calculation: `Math.ceil(...)` → Can be negative
- `Math.max(0, daysLeft)` caps at 0 display
- Daily goal calculation: Division by negative/zero → Infinity/NaN
- UI may show incorrect values

**Edge Case:** Not fully handled

### 6.10 Missing Folder Parent

**Scenario:** Orphaned folder (parentId points to deleted folder)

**Handling:**
- Breadcrumb traversal stops at missing link
- Folder renders but may not be navigable via tree
- No auto-repair
- Edge case from corrupt data

---

## 7. Performance Optimizations

### 7.1 Debouncing

**Save Debounce (500ms):**
- Prevents excessive IndexedDB writes
- Collapses rapid edits into single save
- Improves responsiveness

**Search Debounce:**
- None (instant results)
- Filtering is fast enough (in-memory)

### 7.2 Lazy Loading

**Images:**
- Stored as dataURLs (already loaded)
- No lazy loading (small images)

**Components:**
- All code loaded upfront (no code splitting)

### 7.3 Caching

**Service Worker:**
- Caches app shell (HTML, CSS, JS)
- Network-first ensures fresh code
- Cache-first for assets (faster)

**Supabase:**
- No client-side caching of backups
- Always fetches latest from cloud

### 7.4 Rendering

**Differential Updates:**
- Mostly full re-renders (`renderAll()`)
- Some targeted updates (product page quantity display)

**No Virtual DOM:**
- Direct DOM manipulation
- Acceptable for small datasets

**Reflow Minimization:**
- CSS transitions for smooth animations
- Transform-based animations (GPU accelerated)

### 7.5 Data Structures

**Folder Order Array:**
- O(n) traversal for render
- Small n (typically <100 items per folder)

**Product Lookup:**
- Object map: O(1) lookup by ID
- Efficient for CRUD operations

**Production Log:**
- Array: O(n) scan for date filtering
- Not indexed (acceptable for small logs)

---

## 8. Browser-Specific Behaviors

### 8.1 iOS Safari

**Audio Unlock:**
- Requires user gesture to enable
- First tap unlocks audio context
- Fallback: Vibration feedback

**Input Zoom:**
- `user-scalable=no` prevents zoom on input focus
- `font-size: 16px+` in inputs prevents auto-zoom (alt method)

**Double-Tap Zoom:**
- Disabled via touchend event handler

**Scroll Behavior:**
- `overscroll-behavior-y: contain` prevents bounce
- `-webkit-overflow-scrolling: touch` for smooth scroll

### 8.2 Chrome/Edge

**PWA Install:**
- Detects installability
- "Add to Home Screen" prompt (browser-controlled)

**Permissions:**
- No permission requests (IndexedDB, Storage, Audio auto-granted)

### 8.3 Firefox

**Audio:**
- Web Audio API support
- Autoplay policy similar to Chrome

**IndexedDB:**
- Full support, no quirks

### 8.4 Desktop vs Mobile

**Search Bar:**
- Desktop: Always visible
- Mobile portrait: Toggle button
- Mobile landscape: Always visible

**Touch Events:**
- Mobile: touchstart, touchend
- Desktop: mousedown, mouseup
- Unified handling via pointer events (some areas)

---

## 9. Testing Scenarios

### 9.1 Manual Test Checklist

**Basic CRUD:**
- [ ] Create folder
- [ ] Rename folder
- [ ] Upload folder image
- [ ] Delete folder
- [ ] Create product
- [ ] Edit product (name, price, target)
- [ ] Upload product image
- [ ] Delete product
- [ ] Move folder to different parent
- [ ] Move product to different folder

**Quantity Management:**
- [ ] Add quantity to product
- [ ] Remove quantity (down to 0)
- [ ] Remove quantity (verify can't go negative)
- [ ] Adjust quantity on priority product (graph updates)

**Dynamic Linking:**
- [ ] Create independent folder
- [ ] Create component product
- [ ] Enable dynamic component
- [ ] Add link to product
- [ ] Add link to folder
- [ ] Produce linked product (verify deduction)
- [ ] Check component quantity decreased
- [ ] Set warning threshold
- [ ] Trigger low stock warning
- [ ] Remove link

**Navigation:**
- [ ] Click into folder (navigate down)
- [ ] Click breadcrumb (navigate up)
- [ ] Search product (opens detail page)
- [ ] Click priority graph product (opens detail)
- [ ] Click warning icon item (opens detail)

**Settings:**
- [ ] Set planned value
- [ ] Set end date
- [ ] Verify daily goal calculation
- [ ] Generate report (copy, download)
- [ ] Reset stats (verify countdown, confirm)

**Sync:**
- [ ] Make changes (verify green checkmark)
- [ ] Go offline (verify gray status)
- [ ] Make changes offline
- [ ] Go online (verify auto-sync)
- [ ] Open second device (verify changes synced)

**Import/Export:**
- [ ] Export JSON (download file)
- [ ] Import JSON (merge data)
- [ ] Import invalid JSON (verify error)

**UI:**
- [ ] Drag reorder folder/product
- [ ] Click sounds play
- [ ] Toast notifications appear/dismiss
- [ ] Modal open/close
- [ ] Mobile search toggle (portrait)
- [ ] Product page floating back button

### 9.2 Edge Case Testing

- [ ] Create 100+ products (performance)
- [ ] Upload very large image (>10MB)
- [ ] Set end date in past
- [ ] Set planned value to 0
- [ ] Delete folder with many subfolders
- [ ] Link component to deleted product (verify UI handles)
- [ ] Rapid quantity adjustments (debounce)
- [ ] Two tabs open (concurrent edits)
- [ ] Browser storage full
- [ ] Network disconnects mid-sync

### 9.3 Cross-Browser Testing

- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & iOS)
- [ ] Firefox (desktop & mobile)
- [ ] Edge (desktop)

### 9.4 Device Testing

- [ ] Desktop (1920×1080)
- [ ] Tablet (iPad portrait/landscape)
- [ ] Phone (iPhone portrait/landscape)
- [ ] Small phone (<375px width)

---

## 10. Troubleshooting Guide

### 10.1 App Won't Load
- Check browser console for errors
- Verify IndexedDB enabled in browser settings
- Clear browser cache and reload
- Try incognito/private mode

### 10.2 Changes Not Saving
- Check sync status icon (green = saved)
- Verify network connection
- Check browser console for IndexedDB errors
- Check storage quota (Settings → Storage)

### 10.3 Sync Not Working
- Verify `ENABLE_CLOUD = true` in app.js
- Check Supabase credentials correct
- Check network requests in DevTools (any 401/403?)
- Verify Supabase bucket exists and is accessible

### 10.4 Images Not Uploading
- Check file size (though compression handles this)
- Check file type (image/* accepted)
- Check browser console for errors
- Try different image format

### 10.5 Audio Not Playing
- Click anywhere to unlock (first gesture required)
- Check browser audio permissions
- Verify file at `./assets/Click.mp3`
- Check browser console for 404s

### 10.6 Data Lost
- Check IndexedDB in DevTools (Application tab)
- Check Supabase Storage for backups (restore latest)
- Check if multiple tabs were open (race condition)
- Import from exported JSON if available

### 10.7 Component Deductions Not Working
- Verify component in independent folder
- Verify `isDynamic` checkbox checked
- Verify links added with correct type/target
- Check console for deduction logs
- Verify producing sellable product (not component)

---
