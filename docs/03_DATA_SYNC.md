# Instructed Documentation – Murano Product Manager v1.0
## Part 3: Data Persistence & Cloud Sync

---

## 1. Data Persistence Overview

**Storage Layers:**
1. **IndexedDB** (local browser storage)
   - Primary data store
   - Two object stores: 'data' (current state), 'snapshots' (backups)
2. **Supabase Storage** (cloud backup)
   - Timestamped backup files
   - Automatic sync on changes
   - Multi-device synchronization

**No External Database:** All data stored as JSON in IndexedDB and Supabase Storage.

---

## 2. IndexedDB Schema

### 2.1 Database Configuration
```js
const DB_NAME = 'productSaveDB';
const DB_VERSION = 2;
const STORE_NAME = 'data';
const STORE_KEY = 'appState';
```

### 2.2 Object Stores

**Store 1: 'data'**
- Simple key-value store
- Key: 'appState' (constant)
- Value: Complete appState object (JSON)
- Purpose: Current working state

**Store 2: 'snapshots'**
- Auto-increment primary key: 'id'
- Index on 'ts' field (timestamp)
- Records: `{ id, ts, state: {...} }`
- Purpose: Manual save points, version history
- Retention: Latest snapshots only (via pruning)

### 2.3 Core Functions

**openDB()**
```js
// Opens IndexedDB connection
// Creates stores if first run
// Handles version upgrades
const req = indexedDB.open(DB_NAME, DB_VERSION);
req.onupgradeneeded = () => {
  if (!db.objectStoreNames.contains('data')) {
    db.createObjectStore('data');
  }
  if (!db.objectStoreNames.contains('snapshots')) {
    const s = db.createObjectStore('snapshots', { keyPath: 'id', autoIncrement: true });
    s.createIndex('ts', 'ts'); // For sorting by timestamp
  }
};
```

**readState()**
```js
// Reads current state from 'data' store
// Returns appState object or null
const tx = db.transaction('data', 'readonly');
const result = tx.objectStore('data').get('appState');
```

**writeState(state)**
```js
// Writes appState to 'data' store
// Overwrites existing data
const tx = db.transaction('data', 'readwrite');
tx.objectStore('data').put(state, 'appState');
```

---

## 3. Auto-Save System

### 3.1 Debounced Save
- **Trigger:** Any data change (edit, create, delete, move, quantity adjust)
- **Function:** `saveStateDebounced()`
- **Delay:** 500ms debounce (collapses rapid changes)
- **Actions:**
  1. Sets `appState.lastModified = Date.now()`
  2. Writes to IndexedDB via `writeState()`
  3. Schedules autosave to cloud

```js
let saveDebounceTimer = null;
function saveStateDebounced() {
  modified = true; // Flag for sync system
  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(async () => {
    appState.lastModified = Date.now();
    await writeState(appState);
    scheduleAutosave(); // Cloud sync
  }, 500);
}
```

### 3.2 Modified Flag
- **Global:** `let modified = false`
- **Set to true:** On any user change
- **Set to false:** After successful cloud sync OR after loading from cloud
- **Purpose:** Tracks unsaved changes for sync system

---

## 4. Manual Save (Snapshots)

### 4.1 Save Button Action
**Trigger:** Click "Save" button in top bar OR in Actions menu

**Process:**
1. Creates snapshot in 'snapshots' store
2. Uploads backup to cloud
3. Shows toast: "Saved"
4. Updates sync status to green checkmark

**No Download:** Save button doesn't download file locally

### 4.2 Snapshot Creation

**Function:** `saveSnapshot(downloadAlso = false)`

**Data Structure:**
```js
{
  id: auto-increment,
  ts: Date.now(),
  state: structuredClone(appState) // Deep copy
}
```

**Process:**
```js
async function saveSnapshot(downloadAlso = false) {
  const ts = Date.now();
  const record = { ts, state: structuredClone(appState) };
  
  // Store in IndexedDB
  const tx = db.transaction('snapshots', 'readwrite');
  tx.objectStore('snapshots').put(record);
  
  // Optional: Download as file
  if (downloadAlso) {
    const blob = new Blob([JSON.stringify(record.state, null, 2)], 
                          { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `save_${formatTs(ts)}.json`;
    a.click();
  }
  
  showToast('Snapshot saved');
}
```

### 4.3 Load Latest Snapshot
**When:** On app initialization
**Process:**
```js
const latest = await getLatestSnapshot();
if (latest && latest.state) {
  appState = latest.state;
  await writeState(appState);
  renderAll();
}
```

---

## 5. Cloud Sync (Supabase Storage)

### 5.1 Configuration
```js
const ENABLE_CLOUD = true; // Toggle flag
const SUPABASE_URL = 'https://drfyrustkimutpfmxzag.supabase.co';
const SUPABASE_KEY = 'eyJhbGc...'; // Anon key
const BUCKET = 'saves';
const BACKUP_PREFIX = 'backups/';
```

### 5.2 Client ID
**Purpose:** Identify which device created a backup

**Generation:**
```js
const CLIENT_ID = (() => {
  const k = 'murano_client_id';
  let v = localStorage.getItem(k);
  if (!v) {
    v = uuid(); // Generate unique ID
    localStorage.setItem(k, v);
  }
  return v;
})();
```

**Usage:** Embedded in backup filename to prevent self-reload loops

---

## 6. Cloud Backup System

### 6.1 Backup Filename Format
```
save_YYYY-MM-DD_hh-mm-ss_CLIENT-ID.json
```

**Example:** `save_2025-11-04_08-30-15_id-abc123xyz.json`

**Components:**
- Date: YYYY-MM-DD
- Time: hh-mm-ss (24-hour)
- Client ID: Unique device identifier

### 6.2 Upload Backup

**Function:** `uploadBackupToCloud(forceUpload = false)`

**Process:**
1. Check: Online? Cloud enabled?
2. Generate timestamped filename
3. PUT request to Supabase Storage
4. Path: `backups/save_YYYY-MM-DD_hh-mm-ss_CLIENT-ID.json`
5. Headers: Authorization Bearer token, Content-Type, x-upsert: true
6. Body: JSON.stringify(appState)
7. On success:
   - Update sync status → green
   - Clear modified flag
   - Store backup name in localStorage
   - Prune old backups (keep latest 3)

```js
async function uploadBackupToCloud(forceUpload = false) {
  if (!ENABLE_CLOUD || !navigator.onLine) return;
  
  setSyncStatus('syncing');
  const ts = formatTs(Date.now());
  const fileName = `save_${ts}_${CLIENT_ID}.json`;
  const path = `${BACKUP_PREFIX}${fileName}`;
  const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`;
  
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'x-upsert': 'true'
    },
    body: JSON.stringify(appState)
  });
  
  if (!res.ok) throw new Error('Upload failed');
  
  setSyncStatus('synced');
  modified = false;
  lastUploadedBackupName = fileName;
  localStorage.setItem('murano_last_backup_name', fileName);
  
  await pruneBackups(3); // Keep only 3 latest
}
```

### 6.3 List Cloud Backups

**Function:** `listCloudBackups()`

**API Endpoint:** `POST /storage/v1/object/list/{bucket}`

**Request Body:**
```json
{
  "prefix": "backups/",
  "limit": 100,
  "offset": 0,
  "sortBy": { "column": "updated_at", "order": "desc" }
}
```

**Response:** Array of objects
```js
[
  {
    name: "save_2025-11-04_08-30-15_id-abc.json",
    updated_at: "2025-11-04T08:30:15.123Z",
    created_at: "2025-11-04T08:30:15.123Z",
    id: "...",
    bucket_id: "saves"
  },
  // ... more backups
]
```

### 6.4 Download Backup

**Function:** `downloadBackupObject(name)`

**API Endpoint:** `GET /storage/v1/object/{bucket}/{path}`

**Process:**
```js
async function downloadBackupObject(name) {
  const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${BACKUP_PREFIX}${encodeURIComponent(name)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  if (!res.ok) throw new Error('Download failed');
  return await res.json(); // Returns appState object
}
```

### 6.5 Delete Backup

**Function:** `deleteBackupObject(name)`

**API Endpoint:** `DELETE /storage/v1/object/{bucket}/{path}`

**Usage:** Called by pruning system to remove old backups

### 6.6 Prune Old Backups

**Function:** `pruneBackups(maxKeep = 3)`

**Process:**
1. Lists all backups
2. Filters .json files only
3. Sorts by updated_at DESC (newest first)
4. Takes backups beyond index `maxKeep`
5. Deletes each excess backup

```js
async function pruneBackups(maxKeep = 3) {
  const list = await listCloudBackups();
  const jsonOnly = list.filter(x => x.name.endsWith('.json'));
  jsonOnly.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  const toDelete = jsonOnly.slice(maxKeep);
  for (const obj of toDelete) {
    await deleteBackupObject(obj.name);
  }
}
```

**Default:** Keeps 3 most recent backups, deletes rest

---

## 7. Autosave Pipeline

### 7.1 Schedule Autosave

**Function:** `scheduleAutosave()`

**Trigger:** After every debounced save to IndexedDB

**Process:**
- Calls `runAutosave(false, false)` immediately
- If offline or already in progress → queues for later

### 7.2 Run Autosave

**Function:** `runAutosave(downloadAlso = false, forceUpload = false)`

**States:**
- `autosaveInProgress`: Boolean flag
- `autosaveQueued`: Boolean flag

**Process:**
1. Check: Already running? → Set queued flag, return
2. Check: Online + cloud enabled? → Queue, return
3. Set `autosaveInProgress = true`
4. Set sync status → yellow "syncing"
5. Create snapshot in IndexedDB
6. Upload backup to cloud
7. On success:
   - Set sync status → green "synced"
   - Clear modified flag
   - Update `lastAutosaveTs`
8. On failure:
   - Set sync status → red "error"
   - Set queued flag
9. Set `autosaveInProgress = false`
10. If queued → retry after 500ms delay

```js
async function runAutosave(downloadAlso = false, forceUpload = false) {
  if (autosaveInProgress) {
    autosaveQueued = true;
    return;
  }
  if (!navigator.onLine || !ENABLE_CLOUD) {
    autosaveQueued = true;
    return;
  }
  
  try {
    autosaveInProgress = true;
    setSyncStatus('syncing');
    
    await saveSnapshot(downloadAlso);
    await uploadBackupToCloud(forceUpload);
    
    setSyncStatus('synced');
    modified = false;
    lastAutosaveTs = Date.now();
  } catch (e) {
    setSyncStatus('error');
    autosaveQueued = true;
  } finally {
    autosaveInProgress = false;
    if (autosaveQueued && navigator.onLine) {
      autosaveQueued = false;
      setTimeout(() => runAutosave(false, forceUpload), 500);
    }
  }
}
```

---

## 8. Connection Monitoring

### 8.1 Connection Checker

**Function:** `startConnectionChecker()`

**Frequency:** Runs every 5 seconds

**Purpose:** Detects offline → online transitions and forces sync

**Process:**
```js
let wasOffline = false;

setInterval(async () => {
  const isOnline = navigator.onLine;
  
  // Detect transition from offline to online
  if (wasOffline && isOnline) {
    console.log('Connection restored');
    
    if (modified) {
      console.log('Modified flag true, forcing sync');
      try {
        setSyncStatus('syncing');
        await saveSnapshot(false);
        await uploadBackupToCloud(true); // Force upload
        setSyncStatus('synced');
        modified = false;
        showToast('Changes synced');
      } catch (e) {
        setSyncStatus('error');
      }
    }
  }
  
  wasOffline = !isOnline;
}, 5000);
```

**Scenario:** User makes changes while offline → goes online → checker detects → auto-syncs pending changes

---

## 9. Remote Backup Watcher

### 9.1 Purpose
Detects when another device uploads a newer backup → auto-refreshes current device

### 9.2 Polling System

**Function:** `startRemoteBackupWatcher()`

**Frequency:** Checks every 1 second

**Tracked Variables:**
- `lastUploadedBackupName`: Name of backup we created
- `lastAppliedBackupName`: Name of backup we last loaded

**Process:**
```js
setInterval(async () => {
  if (!navigator.onLine) return;
  
  const latestName = await getLatestRemoteBackupName();
  if (!latestName) return;
  
  // Check if latest is NOT ours and NOT already applied
  if (latestName !== lastUploadedBackupName && 
      latestName !== lastAppliedBackupName) {
    
    // Skip if filename contains our CLIENT_ID (self-upload)
    if (latestName.includes(CLIENT_ID)) {
      lastAppliedBackupName = latestName;
      return;
    }
    
    // New backup from another device detected
    showToast('New version found, refreshing', 1000);
    setSyncStatus('syncing');
    
    // Show overlay
    document.getElementById('refresh-overlay').classList.add('show');
    
    // Download and apply
    await applyRemoteBackupByName(latestName);
    
    // Hide overlay
    document.getElementById('refresh-overlay').classList.remove('show');
  }
}, 1000);
```

### 9.3 Apply Remote Backup

**Function:** `applyRemoteBackupByName(name)`

**Process:**
1. Downloads backup JSON
2. Replaces `appState` with remote data
3. Writes to IndexedDB
4. Updates `lastAppliedBackupName`
5. Stores name in localStorage
6. Closes any open modals/editors
7. Re-renders entire UI
8. Clears modified flag
9. Sets sync status → green

```js
async function applyRemoteBackupByName(name) {
  const remote = await downloadBackupObject(name);
  if (remote && typeof remote === 'object') {
    appState = remote;
    await writeState(appState);
    lastAppliedBackupName = name;
    localStorage.setItem('murano_last_backup_name', name);
    
    closeModal();
    closeEditor();
    renderAll();
    
    modified = false;
    setSyncStatus('synced');
    return true;
  }
  return false;
}
```

---

## 10. Initial Load Strategy

### 10.1 App Initialization Sequence

**On DOMContentLoaded:**
```js
1. Authenticate user (password check)
2. Open IndexedDB connection
3. Read current state from 'data' store
4. If null → initialize empty state or load sample
5. Try load latest cloud backup
6. Render UI
7. Start connection checker (every 5s)
8. Start remote backup watcher (every 1s)
9. Try load latest snapshot (if exists)
```

### 10.2 Load Latest Cloud Backup

**Function:** `loadLatestCloudBackup()`

**When:** On app start, before first render

**Process:**
1. Check: Online + cloud enabled?
2. List all backups from cloud
3. Sort by updated_at DESC
4. Take first .json file
5. Download its content
6. Replace appState
7. Write to IndexedDB
8. Set `backupLoaded = true` flag
9. Clear modified flag
10. Set sync status → synced

**Result:** App starts with most recent cloud state

### 10.3 Sample Data Fallback

**Function:** `maybeLoadSample()`

**When:** Only on very first run (empty database)

**Process:**
```js
async function maybeLoadSample() {
  if (appState) return; // Already have data
  
  try {
    const res = await fetch('./public/sample_save.json', { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    appState = data;
    await writeState(appState);
  } catch {}
}
```

**Sample File:** `public/sample_save.json`
```json
{
  "version": 1,
  "lastModified": 0,
  "folders": {
    "root": { "id": "root", "name": "Home", "parentId": null, "imageUrl": null, "subfolders": [], "products": [] }
  },
  "products": {}
}
```

---

## 11. Sync Status Indicator

### 11.1 States & Visuals

**Element:** `<div id="sync-status">` in top bar

**States:**

1. **Offline** (default)
   - Background: Gray (#9ca3af)
   - Text: "Offline"
   - Meaning: No connection or cloud disabled

2. **Syncing**
   - Background: Orange (#f59e0b)
   - Animation: Blinking (opacity 0.6 ↔ 1.0)
   - Meaning: Upload/download in progress

3. **Synced**
   - Background: Green (#10b981)
   - Icon: Checkmark (✓)
   - Meaning: All changes saved to cloud

4. **Error**
   - Background: Red (#ef4444)
   - Animation: Blinking (opacity 0.1 ↔ 1.0)
   - Meaning: Sync failed, will retry

### 11.2 Update Function

```js
function setSyncStatus(status) {
  const el = document.getElementById('sync-status');
  el.className = ''; // Clear classes
  
  switch (status) {
    case 'syncing':
      el.classList.add('status-active');
      el.textContent = '↻';
      break;
    case 'synced':
      el.classList.add('status-ok');
      el.textContent = '✓';
      break;
    case 'error':
      el.classList.add('status-error');
      el.textContent = '✕';
      break;
    default:
      el.textContent = 'Offline';
  }
}
```

---

## 12. Import / Export

### 12.1 Export State

**Trigger:** Actions menu → "Export JSON"

**Process:**
1. Serializes appState to JSON (pretty-printed, 2-space indent)
2. Creates Blob with type 'application/json'
3. Creates temporary download link
4. Sets filename: `save.json`
5. Triggers download
6. Revokes object URL

```js
function exportState() {
  const blob = new Blob([JSON.stringify(appState, null, 2)], 
                        { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'save.json';
  a.click();
  URL.revokeObjectURL(a.href);
}
```

### 12.2 Import State

**Trigger:** Actions menu → "Import JSON" → File picker

**Process:**
1. User selects .json file
2. FileReader reads as text
3. JSON.parse() to object
4. Naive merge (doesn't delete local data):
   - For each folder in import: Add if new, else merge properties
   - For each product in import: Add if new, else merge properties
5. Ensures root folder exists
6. Updates lastModified timestamp
7. Writes to IndexedDB
8. Shows toast: "Import complete"
9. Re-renders UI

```js
function importState(file) {
  const reader = new FileReader();
  reader.onload = async () => {
    const data = JSON.parse(reader.result);
    
    // Merge folders
    for (const [id, f] of Object.entries(data.folders || {})) {
      if (!appState.folders[id]) {
        appState.folders[id] = f;
      } else {
        Object.assign(appState.folders[id], f);
      }
    }
    
    // Merge products
    for (const [id, p] of Object.entries(data.products || {})) {
      if (!appState.products[id]) {
        appState.products[id] = p;
      } else {
        Object.assign(appState.products[id], p);
      }
    }
    
    // Ensure root
    if (!appState.folders.root) {
      appState.folders.root = { id: 'root', name: 'Home', parentId: null, imageUrl: null, subfolders: [], products: [] };
    }
    
    appState.lastModified = Date.now();
    await writeState(appState);
    showToast('Import complete');
    renderAll();
  };
  reader.readAsText(file);
}
```

**Import Strategy:** Merge (additive), not replace (preserves local data)

---

## 13. Data Flow Summary

### 13.1 User Makes Change
1. Edit product/folder/quantity
2. `saveStateDebounced()` called
3. After 500ms: Writes to IndexedDB
4. Sets modified flag = true
5. Schedules autosave

### 13.2 Autosave Executes
1. Creates snapshot in IndexedDB
2. Uploads backup to Supabase
3. On success:
   - Clears modified flag
   - Updates sync status → green
4. Prunes old backups (keeps 3)

### 13.3 Other Device Uploads
1. Remote watcher detects new backup (every 1s poll)
2. Compares backup name to last known
3. If different + not self:
   - Shows "refreshing" overlay
   - Downloads remote backup
   - Replaces local state
   - Re-renders UI
   - Clears modified flag

### 13.4 Offline → Online
1. Connection checker detects (every 5s)
2. Checks modified flag
3. If true:
   - Forces snapshot creation
   - Forces cloud upload
   - Clears modified flag
   - Shows toast: "Changes synced"

---

## 14. Edge Cases & Error Handling

### 14.1 Concurrent Edits
**Scenario:** Two devices edit simultaneously

**Behavior:**
- Each device uploads own backup with unique CLIENT_ID
- Last upload wins (filename sorting by timestamp)
- Other device detects newer backup → auto-refreshes
- User loses local unsaved changes

**Mitigation:** 1-second polling keeps devices in sync quickly

### 14.2 Network Failure During Upload
**Behavior:**
- Upload throws error
- Sync status → red
- autosaveQueued = true
- Retries on next connection check (5s) or next save

### 14.3 Corrupted Backup
**Behavior:**
- Download fails or JSON.parse() throws
- Error logged to console
- Local state unchanged
- User sees error sync status

### 14.4 Storage Quota Exceeded
**IndexedDB:**
- writeState() fails
- User sees toast: "Failed to save"
- Data loss risk

**Supabase:**
- Upload returns 4xx/5xx error
- Sync status → error
- Retries on next trigger

### 14.5 Multiple Tabs Same Browser
**Behavior:**
- Each tab has own IndexedDB transaction
- Last write wins (race condition)
- Can cause data loss

**Recommendation:** Use single tab only

---

## 15. Performance Optimization

### 15.1 Debouncing
- Saves to IndexedDB: 500ms debounce
- Prevents excessive writes during rapid edits

### 15.2 Backup Pruning
- Limits cloud storage to 3 backups
- Deletes oldest after each upload
- Prevents storage bloat

### 15.3 Polling Intervals
- Remote watcher: 1 second (fast sync)
- Connection checker: 5 seconds (reasonable for connection detection)

### 15.4 Structured Clone
- Deep copies appState for snapshots
- Prevents mutation issues
- Standard browser API (fast)

---

## 16. Configuration Options

### 16.1 Enable/Disable Cloud
```js
const ENABLE_CLOUD = true; // Set to false for offline-only mode
```

**Effect:** Disables all Supabase API calls, runs purely on IndexedDB

### 16.2 Backup Retention
```js
await pruneBackups(3); // Keep 3 most recent backups
```

**Adjustable:** Change number to keep more/fewer backups

### 16.3 Autosave Timing
```js
saveDebounceTimer = setTimeout(..., 500); // 500ms delay
```

**Adjustable:** Increase for less frequent saves, decrease for more responsive saves

---
