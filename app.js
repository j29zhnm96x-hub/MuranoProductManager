/*
  Murano Product Manager
  - IndexedDB for persistence
  - Offline-first with Service Worker
  - Optional Supabase storage sync
*/

// ---------------------------- Config ----------------------------
const ENABLE_CLOUD = true; // Toggle to true to enable Supabase sync
const SUPABASE_URL = 'https://drfyrustkimutpfmxzag.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnlydXN0a2ltdXRwZm14emFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDEyMjgsImV4cCI6MjA3NjE3NzIyOH0.y-gbZmtpuvGocS8i2w9U9vMo9kOwN59NGEM4m3JwsmA';
const BUCKET = 'saves';
const FILE_PATH = 'save.json';
const BACKUP_PREFIX = 'backups/';

// ---------------------------- State ----------------------------
const DB_NAME = 'productSaveDB';
const DB_VERSION = 2; // bump to add 'snapshots' store
const STORE_NAME = 'data';
const STORE_KEY = 'appState';

let db = null;
let appState = null;
let currentFolderId = 'root';
let saveDebounceTimer = null;
let productPageProductId = null;

// ---------------------------- Utilities ----------------------------
function uuid() {
  if (crypto && crypto.randomUUID) return crypto.randomUUID();
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
}

function storageHeaders(extra = {}) {
  return {
    Authorization: `Bearer ${SUPABASE_KEY}`,
    apikey: SUPABASE_KEY,
    ...extra,
  };
}

async function listCloudBackups() {
  if (!ENABLE_CLOUD) return [];
  const url = `${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: storageHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ prefix: BACKUP_PREFIX, limit: 100, offset: 0, sortBy: { column: 'updated_at', order: 'desc' } })
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function downloadBackupObject(name) {
  const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${BACKUP_PREFIX}${encodeURIComponent(name)}`;
  const res = await fetch(url, { headers: storageHeaders() });
  if (!res.ok) throw new Error('Backup download failed');
  return await res.json();
}

async function loadLatestCloudBackup() {
  if (!ENABLE_CLOUD || !navigator.onLine) return false;
  try {
    setSyncStatus('Checking cloud…');
    const list = await listCloudBackups();
    if (!list.length) { setSyncStatus('No backups'); return false; }
    list.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
    const latest = list.find(x => (x.name || '').toLowerCase().endsWith('.json')) || list[0];
    if (!latest) { setSyncStatus('No backups'); return false; }
    const remote = await downloadBackupObject(latest.name);
    if (remote && typeof remote === 'object') {
      appState = remote;
      await writeState(appState);
      setSyncStatus('Backup loaded');
      return true;
    }
    return false;
  } catch (e) {
    setSyncStatus('Cloud error');
    return false;
  }
}

async function uploadBackupToCloud() {
  if (!ENABLE_CLOUD || !navigator.onLine) { return; }
  try {
    setSyncStatus('Uploading…');
    const ts = formatTs(Date.now());
    const path = `${BACKUP_PREFIX}save_${ts}.json`;
    const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: storageHeaders({ 'Content-Type': 'application/json', 'x-upsert': 'true' }),
      body: JSON.stringify(appState)
    });
    if (!res.ok) {
      const msg = await res.text().catch(() => '');
      throw new Error(`Upload failed (${res.status}) ${msg}`);
    }
    setSyncStatus('Backup saved');
  } catch (e) {
    console.warn(e);
    setSyncStatus('Upload error');
  }
}

// ---------------------------- Confirmations & Edit Modals ----------------------------
function confirmDeleteProduct(productId) {
  const p = appState.products[productId];
  openModal({
    title: 'Delete Product',
    body: `Are you sure you want to delete "${p?.name || 'Product'}"?`,
    actions: [
      { label: 'Delete', onClick: () => { deleteProduct(productId); } },
      { label: 'Cancel' }
    ]
  });
}

// ---------------------------- Snapshots (New Save System) ----------------------------
function formatTs(ts) {
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, '0');
  const YYYY = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const DD = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${YYYY}-${MM}-${DD}_${hh}-${mm}-${ss}`;
}

function putSnapshot(record) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('snapshots', 'readwrite');
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.objectStore('snapshots').put(record);
  });
}

function getLatestSnapshot() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('snapshots', 'readonly');
    const idx = tx.objectStore('snapshots').index('ts');
    const req = idx.openCursor(null, 'prev');
    req.onsuccess = () => {
      resolve(req.result ? req.result.value : null);
    };
    req.onerror = () => reject(req.error);
  });
}

async function saveSnapshot(downloadAlso = false) {
  try {
    const ts = Date.now();
    const record = { ts, state: structuredClone(appState) };
    await putSnapshot(record);
    showToast('Snapshot saved');
    if (downloadAlso) {
      const blob = new Blob([JSON.stringify(record.state, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `save_${formatTs(ts)}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    }
  } catch (e) {
    console.warn(e);
    showToast('Snapshot save failed');
  }
}

function confirmDeleteFolder(folderId) {
  const f = appState.folders[folderId];
  openModal({
    title: 'Delete Folder',
    body: `Delete folder "${f?.name || 'Folder'}" and everything inside?`,
    actions: [
      { label: 'Delete', onClick: () => { deleteFolder(folderId); } },
      { label: 'Cancel' }
    ]
  });
}

function openProductEditModal(productId) {
  const p = appState.products[productId];
  if (!p) return;
  const wrap = document.createElement('div');
  const nameRow = document.createElement('div');
  const nameLabel = document.createElement('div'); nameLabel.textContent = 'Name'; nameLabel.style.marginBottom = '4px';
  const nameInput = document.createElement('input'); nameInput.type = 'text'; nameInput.value = p.name || ''; nameInput.style.width = '100%'; nameInput.style.padding = '8px'; nameInput.style.border = '1px solid #d1d5db'; nameInput.style.borderRadius = '8px';
  nameRow.appendChild(nameLabel); nameRow.appendChild(nameInput);

  const priceRow = document.createElement('div'); priceRow.style.marginTop = '10px';
  const priceLabel = document.createElement('div'); priceLabel.textContent = 'Price'; priceLabel.style.marginBottom = '4px';
  const priceInput = document.createElement('input'); priceInput.type = 'number'; priceInput.step = '0.01'; priceInput.min = '0'; priceInput.value = p.price || 0; priceInput.style.width = '100%'; priceInput.style.padding = '8px'; priceInput.style.border = '1px solid #d1d5db'; priceInput.style.borderRadius = '8px';
  priceRow.appendChild(priceLabel); priceRow.appendChild(priceInput);

  wrap.appendChild(nameRow);
  wrap.appendChild(priceRow);

  openModal({
    title: 'Edit Product',
    body: wrap,
    actions: [
      { label: 'Save', onClick: () => {
          const newName = nameInput.value.trim();
          const newPrice = Number(priceInput.value || 0);
          openModal({
            title: 'Confirm Save',
            body: 'Apply these changes to the product?',
            actions: [
              { label: 'Confirm', onClick: () => {
                  p.name = newName || p.name;
                  p.price = newPrice;
                  saveStateDebounced();
                  // update product page fields
                  document.getElementById('pp-title').textContent = p.name;
                  document.getElementById('pp-name').textContent = p.name;
                  document.getElementById('pp-price').textContent = formatCurrency(p.price);
                  document.getElementById('pp-total').textContent = formatCurrency(p.price * (p.quantity||0));
                  renderFolderList();
                } },
              { label: 'Cancel' }
            ]
          });
        } },
      { label: 'Cancel' }
    ]
  });
}

function onSaveProductNote() {
  if (!productPageProductId) return;
  const p = appState.products[productPageProductId];
  if (!p) return;
  const val = document.getElementById('pp-note').value;
  p.note = val;
  saveStateDebounced();
  showToast('Note saved');
}

function showToast(message, timeout = 3000) {
  const c = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  c.appendChild(el);
  setTimeout(() => el.remove(), timeout);
}

function openModal({ title = 'Confirm', body = '', actions = [] } = {}) {
  const modal = document.getElementById('modal');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  const actionsEl = document.getElementById('modal-actions');
  titleEl.textContent = title;
  if (typeof body === 'string') bodyEl.textContent = body; else { bodyEl.innerHTML = ''; bodyEl.appendChild(body); }
  actionsEl.innerHTML = '';
  actions.forEach(a => {
    const b = document.createElement('button');
    b.textContent = a.label;
    b.addEventListener('click', () => { closeModal(); a.onClick?.(); });
    actionsEl.appendChild(b);
  });
  modal.classList.remove('hidden');
}
function closeModal() { document.getElementById('modal').classList.add('hidden'); }

function setSyncStatus(text) {
  const el = document.getElementById('sync-status');
  el.textContent = text;
}

function formatCurrency(value) {
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'EUR' }).format(value || 0); }
  catch { return (value || 0).toFixed(2); }
}

// Image resize to max WxH (returns dataURL)
function resizeImageToDataURL(file, maxW = 300, maxH = 300) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const ratio = Math.min(maxW / width, maxH / height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ---------------------------- IndexedDB ----------------------------
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
      if (!db.objectStoreNames.contains('snapshots')) {
        const s = db.createObjectStore('snapshots', { keyPath: 'id', autoIncrement: true });
        s.createIndex('ts', 'ts');
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function readState() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(STORE_KEY);
    getReq.onsuccess = () => resolve(getReq.result || null);
    getReq.onerror = () => reject(getReq.error);
  });
}

function writeState(state) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putReq = store.put(state, STORE_KEY);
    putReq.onsuccess = () => resolve();
    putReq.onerror = () => reject(putReq.error);
  });
}

function saveStateDebounced() {
  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(async () => {
    try {
      appState.lastModified = Date.now();
      await writeState(appState);
      queueCloudSync();
    } catch (e) {
      console.error(e);
      showToast('Failed to save');
    }
  }, 500);
}

// ---------------------------- Initial Data ----------------------------
function initEmptyState() {
  return {
    version: 1,
    lastModified: Date.now(),
    folders: {
      root: { id: 'root', name: 'Home', parentId: null, imageUrl: null, subfolders: [], products: [] }
    },
    products: {}
  };
}

async function maybeLoadSample() {
  // On first run only: if store empty and sample exists
  if (appState) return;
  try {
    const res = await fetch('./public/sample_save.json', { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    appState = data;
    await writeState(appState);
  } catch {}
}

// ---------------------------- Rendering ----------------------------
function computeStats(folderId) {
  const folder = appState.folders[folderId];
  let totalQty = 0;
  let totalValue = 0;

  // products in this folder
  for (const pid of folder.products) {
    const p = appState.products[pid];
    if (!p) continue;
    const qty = Number(p.quantity || 0);
    const price = Number(p.price || 0);
    totalQty += qty;
    totalValue += qty * price;
  }
  // subfolders
  for (const fid of folder.subfolders) {
    const sub = computeStats(fid);
    totalQty += sub.totalQty;
    totalValue += sub.totalValue;
  }
  return { totalQty, totalValue };
}

function renderBreadcrumbs() {
  const el = document.getElementById('breadcrumbs');
  el.innerHTML = '';

  const path = [];
  let cur = currentFolderId;
  while (cur) {
    path.unshift(cur);
    const f = appState.folders[cur];
    cur = f?.parentId;
  }
  // Ensure root visible
  if (!path.length || path[0] !== 'root') path.unshift('root');

  path.forEach((fid, idx) => {
    const f = appState.folders[fid];
    const span = document.createElement('span');
    span.className = 'crumb';
    span.textContent = f?.name || 'Unknown';
    span.addEventListener('click', () => {
      currentFolderId = fid;
      renderAll();
    });
    el.appendChild(span);
    if (idx < path.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'sep';
      sep.textContent = '>';
      el.appendChild(sep);
    }
  });
}

function renderFolderList(folderId = currentFolderId) {
  const container = document.getElementById('folder-list');
  container.innerHTML = '';

  const rootUl = document.createElement('ul');
  rootUl.className = 'tree';

  const curFolder = appState.folders[folderId];
  if (!curFolder) return;

  // If on root, show stats card at top
  if (folderId === 'root') {
    const stats = computeStats('root');
    const card = document.createElement('div');
    card.className = 'stats-card';
    const title = document.createElement('div'); title.className = 'title'; title.textContent = 'SVI PROIZVODI';
    const vals = document.createElement('div'); vals.className = 'values';
    const q = document.createElement('div'); q.textContent = `Total Qty: ${stats.totalQty}`;
    const v = document.createElement('div'); v.textContent = `Total Value: ${formatCurrency(stats.totalValue)}`;
    vals.appendChild(q); vals.appendChild(v);
    card.appendChild(title); card.appendChild(vals);
    document.getElementById('folder-list').appendChild(card);
  }

  // Subfolders (no recursion)
  for (const fid of curFolder.subfolders) {
    const f = appState.folders[fid];
    if (!f) continue;
    const stats = computeStats(fid);

    const li = document.createElement('li');

    const left = document.createElement('div');
    left.className = 'item-left';
    const icon = document.createElement('div');
    icon.className = 'icon-box';
    if (f.imageUrl) {
      const img = document.createElement('img');
      img.src = f.imageUrl;
      img.alt = 'folder';
      icon.appendChild(img);
    } else {
      icon.textContent = '📁';
    }
    const textCol = document.createElement('div');
    textCol.className = 'text-col';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = f.name;
    name.addEventListener('click', () => { currentFolderId = fid; renderAll(); });
    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = `Qty: ${stats.totalQty}   ${formatCurrency(stats.totalValue)}`;
    textCol.appendChild(name);
    textCol.appendChild(meta);
    left.appendChild(icon);
    left.appendChild(textCol);

    const actions = document.createElement('div');
    actions.className = 'actions';
    const addBtn = document.createElement('button');
    addBtn.textContent = '+';
    addBtn.title = 'Add to this folder';
    addBtn.addEventListener('click', (e) => { e.stopPropagation(); openAddMenu(fid); });
    const moreBtn = document.createElement('button');
    moreBtn.textContent = '⋯';
    moreBtn.title = 'More';
    moreBtn.addEventListener('click', (e) => { e.stopPropagation(); openFolderMenu(fid); });
    actions.appendChild(addBtn);
    actions.appendChild(moreBtn);

    li.appendChild(left);
    li.appendChild(actions);
    rootUl.appendChild(li);
  }

  // Products in current folder
  for (const pid of curFolder.products) {
    const p = appState.products[pid];
    if (!p) continue;

    const pli = document.createElement('li');

    const leftp = document.createElement('div');
    leftp.className = 'item-left';
    const picon = document.createElement('div');
    picon.className = 'icon-box';
    if (p.imageUrl) {
      const im = document.createElement('img');
      im.src = p.imageUrl;
      im.alt = 'product';
      picon.appendChild(im);
    } else {
      picon.textContent = '📦';
    }
    const ptext = document.createElement('div');
    ptext.className = 'text-col';
    const pname = document.createElement('span');
    pname.className = 'name';
    pname.textContent = p.name;
    pname.addEventListener('click', () => openProductPage(p.id));
    const pmeta = document.createElement('span');
    pmeta.className = 'meta';
    const qty = Number(p.quantity || 0);
    const price = Number(p.price || 0);
    pmeta.textContent = `Qty: ${qty}   ${formatCurrency(qty * price)}`;
    ptext.appendChild(pname);
    ptext.appendChild(pmeta);
    leftp.appendChild(picon);
    leftp.appendChild(ptext);

    const actionsP = document.createElement('div');
    actionsP.className = 'actions';
    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑';
    delBtn.title = 'Delete product';
    delBtn.addEventListener('click', (e) => { e.stopPropagation(); confirmDeleteProduct(p.id); });

    actionsP.appendChild(delBtn);

    pli.appendChild(leftp);
    pli.appendChild(actionsP);
    rootUl.appendChild(pli);
  }

  container.appendChild(rootUl);
}

function renderAll() {
  renderBreadcrumbs();
  renderFolderList();
}

// ---------------------------- Editor ----------------------------
function openEditor(type, id) {
  const panel = document.getElementById('editor-panel');
  const title = document.getElementById('editor-title');
  document.getElementById('editor-entity-type').value = type;
  document.getElementById('editor-entity-id').value = id || '';

  // Reset
  document.getElementById('product-fields').classList.add('hidden');
  document.getElementById('folder-fields').classList.add('hidden');
  document.getElementById('custom-fields-container').innerHTML = '';
  document.getElementById('folder-image-preview').classList.add('hidden');
  document.getElementById('editor-image').value = '';

  if (type === 'folder') {
    title.textContent = 'Edit Folder';
    const f = appState.folders[id];
    document.getElementById('editor-name').value = f?.name || '';
    document.getElementById('folder-fields').classList.remove('hidden');
    if (f?.imageUrl) {
      const prev = document.getElementById('folder-image-preview');
      prev.innerHTML = `<img src="${f.imageUrl}" alt="folder" />`;
      prev.classList.remove('hidden');
    }
  } else {
    title.textContent = id ? 'Edit Product' : 'New Product';
    const p = id ? appState.products[id] : { name: '', price: 0, quantity: 0, note: '' };
    document.getElementById('editor-name').value = p.name || '';
    document.getElementById('editor-price').value = p.price ?? 0;
    document.getElementById('editor-quantity').value = p.quantity ?? 0;
    document.getElementById('product-fields').classList.remove('hidden');
    // Note is edited on product page; no custom fields UI
  }

  panel.classList.remove('hidden');
  document.getElementById('main').classList.add('with-editor');
}

function closeEditor() {
  document.getElementById('editor-panel').classList.add('hidden');
  document.getElementById('main').classList.remove('with-editor');
}

function addCustomFieldRow(k = '', v = '') {
  const row = document.createElement('div');
  row.className = 'custom-field-row';
  const keyEl = document.createElement('input'); keyEl.placeholder = 'Key'; keyEl.value = k;
  const valEl = document.createElement('input'); valEl.placeholder = 'Value'; valEl.value = v;
  const del = document.createElement('button'); del.type = 'button'; del.textContent = 'Remove'; del.addEventListener('click', () => row.remove());
  row.appendChild(keyEl); row.appendChild(valEl); row.appendChild(del);
  document.getElementById('custom-fields-container').appendChild(row);
}

// ---------------------------- CRUD ----------------------------
function createFolder(parentId) {
  const id = uuid();
  appState.folders[id] = { id, name: 'New Folder', parentId, imageUrl: null, subfolders: [], products: [] };
  appState.folders[parentId].subfolders.push(id);
  saveStateDebounced();
  renderAll();
  openEditor('folder', id);
}

function createProduct(folderId) {
  const id = uuid();
  appState.products[id] = { id, name: 'New Product', price: 0, quantity: 0, note: '', imageUrl: null };
  appState.folders[folderId].products.push(id);
  saveStateDebounced();
  renderAll();
  openProductPage(id);
}

function deleteFolder(folderId) {
  if (folderId === 'root') return showToast('Cannot delete root');
  const f = appState.folders[folderId];
  if (!f) return;
  // recursively delete subfolders
  for (const sf of [...f.subfolders]) deleteFolder(sf);
  // delete products
  for (const pid of [...f.products]) delete appState.products[pid];
  // remove from parent
  const parent = appState.folders[f.parentId];
  if (parent) parent.subfolders = parent.subfolders.filter(x => x !== folderId);
  delete appState.folders[folderId];
  saveStateDebounced();
  renderAll();
}

function deleteProduct(productId) {
  const p = appState.products[productId];
  if (!p) return;
  // find parent folder
  for (const f of Object.values(appState.folders)) {
    const idx = f.products.indexOf(productId);
    if (idx >= 0) { f.products.splice(idx, 1); break; }
  }
  delete appState.products[productId];
  saveStateDebounced();
  renderAll();
}

function saveEditorForm(e) {
  e.preventDefault();
  const type = document.getElementById('editor-entity-type').value;
  const id = document.getElementById('editor-entity-id').value;
  const name = document.getElementById('editor-name').value.trim();

  if (type === 'folder') {
    const f = appState.folders[id];
    if (!f) return;
    f.name = name || f.name;
  } else {
    const p = appState.products[id];
    if (!p) return;
    p.name = name || p.name;
    p.price = Number(document.getElementById('editor-price').value || 0);
    p.quantity = Number(document.getElementById('editor-quantity').value || 0);
    // Note handled separately on product page
  }
  saveStateDebounced();
  renderAll();
  closeEditor();
}

function onFolderImageSelected(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const id = document.getElementById('editor-entity-id').value;
    const f = appState.folders[id];
    if (!f) return;
    f.imageUrl = reader.result;
    const prev = document.getElementById('folder-image-preview');
    prev.innerHTML = `<img alt="folder" src="${f.imageUrl}" />`;
    prev.classList.remove('hidden');
    saveStateDebounced();
  };
  reader.readAsDataURL(file);
}

// ---------------------------- Menus ----------------------------
function openAddMenu(targetFolderId) {
  openModal({
    title: 'Add to folder',
    body: 'Choose item to create',
    actions: [
      { label: 'New Folder', onClick: () => createFolder(targetFolderId) },
      { label: 'New Product', onClick: () => createProduct(targetFolderId) },
      { label: 'Cancel' }
    ]
  });
}

function openFolderMenu(folderId) {
  openModal({
    title: 'Folder actions',
    body: 'Select an action',
    actions: [
      { label: 'Edit', onClick: () => openEditor('folder', folderId) },
      { label: 'Delete', onClick: () => confirmDeleteFolder(folderId) },
      { label: 'New Subfolder', onClick: () => createFolder(folderId) },
      { label: 'New Product', onClick: () => createProduct(folderId) },
      { label: 'Cancel' }
    ]
  });
}

// ---------------------------- Search ----------------------------
function attachSearch() {
  const input = document.getElementById('search-input');
  const dropdown = document.getElementById('search-results');
  function clear() { dropdown.innerHTML = ''; dropdown.classList.add('hidden'); }
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { clear(); return; }
    const results = [];
    for (const p of Object.values(appState.products)) {
      if (p.name.toLowerCase().includes(q)) results.push(p);
    }
    dropdown.innerHTML = '';
    results.slice(0, 50).forEach(p => {
      const item = document.createElement('div');
      item.className = 'result';
      item.textContent = `${p.name} • Qty: ${p.quantity} • ${formatCurrency((p.price||0) * (p.quantity||0))}`;
      item.addEventListener('click', () => { openProductPage(p.id); clear(); });
      dropdown.appendChild(item);
    });
    dropdown.classList.toggle('hidden', results.length === 0);
  });
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== input) clear();
  });
}

// ---------------------------- Import/Export ----------------------------
function exportState() {
  const blob = new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'save.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function importState(file) {
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const data = JSON.parse(reader.result);
      // naive merge by IDs; do not delete local
      const snapshot = structuredClone(appState);
      // folders
      for (const [id, f] of Object.entries(data.folders || {})) {
        if (!appState.folders[id]) appState.folders[id] = f; else Object.assign(appState.folders[id], f);
      }
      // products
      for (const [id, p] of Object.entries(data.products || {})) {
        if (!appState.products[id]) appState.products[id] = p; else Object.assign(appState.products[id], p);
      }
      // ensure root exists
      if (!appState.folders.root) appState.folders.root = { id: 'root', name: 'Home', parentId: null, imageUrl: null, subfolders: [], products: [] };
      appState.lastModified = Date.now();
      await writeState(appState);
      showToast('Import complete');
      renderAll();
    } catch (e) {
      console.error(e);
      showToast('Import failed: invalid JSON');
      openModal({ title: 'Import failed', body: 'Invalid JSON format.' });
    }
  };
  reader.readAsText(file);
}

// ---------------------------- Cloud Sync (Supabase Storage) ----------------------------
let pendingUpload = false;
let syncQueued = false;

function queueCloudSync() {
  if (!ENABLE_CLOUD) return;
  if (!navigator.onLine) { setSyncStatus('Offline'); return; }
  if (syncQueued) return;
  syncQueued = true;
  setTimeout(async () => {
    syncQueued = false;
    await uploadToCloud().catch(err => { console.warn(err); showToast('Cloud sync failed'); setSyncStatus('Sync error'); });
  }, 800);
}

async function downloadFromCloud() {
  if (!ENABLE_CLOUD) return null;
  try {
    setSyncStatus('Checking…');
    const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${FILE_PATH}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${SUPABASE_KEY}` } });
    if (!res.ok) { setSyncStatus('No remote'); return null; }
    const data = await res.json();
    setSyncStatus('Remote loaded');
    return data;
  } catch (e) {
    setSyncStatus('Sync error');
    throw e;
  }
}

async function uploadToCloud() {
  if (pendingUpload) return; // collapse bursts
  pendingUpload = true;
  try {
    setSyncStatus('Uploading…');
    const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${FILE_PATH}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appState)
    });
    if (!res.ok) throw new Error('Upload failed');
    setSyncStatus('Synced');
  } finally {
    pendingUpload = false;
  }
}

async function resolveRemoteConflict(remote) {
  // Simple conflict policy via modal
  return new Promise((resolve) => {
    const body = document.createElement('div');
    body.innerHTML = `
      <p>A newer remote save was found.</p>
      <p>Local modified: ${new Date(appState.lastModified).toLocaleString()}</p>
      <p>Remote modified: ${new Date(remote.lastModified || 0).toLocaleString()}</p>
    `;
    openModal({
      title: 'Sync Conflict',
      body,
      actions: [
        { label: 'Overwrite Remote', onClick: () => resolve('overwrite') },
        { label: 'Load Remote', onClick: () => resolve('load_remote') },
        { label: 'Auto-merge', onClick: () => resolve('merge') },
        { label: 'Cancel', onClick: () => resolve('cancel') },
      ]
    });
  });
}

function autoMerge(local, remote) {
  const merged = structuredClone(local);
  // folders
  for (const [id, f] of Object.entries(remote.folders || {})) {
    if (!merged.folders[id]) merged.folders[id] = f; else merged.folders[id] = { ...merged.folders[id], ...f };
  }
  // products
  for (const [id, p] of Object.entries(remote.products || {})) {
    if (!merged.products[id]) merged.products[id] = p; else merged.products[id] = { ...merged.products[id], ...p };
  }
  merged.lastModified = Math.max(local.lastModified || 0, remote.lastModified || 0, Date.now());
  return merged;
}

async function initialCloudSync() {
  if (!ENABLE_CLOUD || !navigator.onLine) return;
  try {
    const remote = await downloadFromCloud();
    if (!remote) return;
    if ((remote.lastModified || 0) > (appState.lastModified || 0)) {
      const choice = await resolveRemoteConflict(remote);
      if (choice === 'overwrite') {
        await uploadToCloud();
      } else if (choice === 'load_remote') {
        appState = remote; await writeState(appState); renderAll(); setSyncStatus('Loaded remote');
      } else if (choice === 'merge') {
        const snapshot = structuredClone(appState);
        const merged = autoMerge(appState, remote);
        appState = merged; await writeState(appState); renderAll(); setSyncStatus('Merged');
        // create downloadable snapshot of conflicts (simple)
        const blob = new Blob([JSON.stringify({ local: snapshot, remote }, null, 2)], { type: 'application/json' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'conflict.json'; a.click(); URL.revokeObjectURL(a.href);
      } else {
        setSyncStatus('Conflict unresolved');
      }
    }
  } catch (e) {
    console.warn(e);
  }
}

// ---------------------------- Event Wiring ----------------------------
document.addEventListener('DOMContentLoaded', async () => {
  // DB
  try { db = await openDB(); } catch (e) { console.error(e); showToast('IndexedDB error'); }
  appState = await readState();
  if (!appState) appState = initEmptyState();
  await maybeLoadSample();

  // UI wiring
  document.getElementById('add-btn').addEventListener('click', () => openAddMenu(currentFolderId));
  document.getElementById('save-btn').addEventListener('click', async () => {
    await saveSnapshot(true);
    await uploadBackupToCloud();
  });
  document.getElementById('export-btn').addEventListener('click', exportState);
  document.getElementById('import-btn').addEventListener('click', () => document.getElementById('import-file').click());
  document.getElementById('import-file').addEventListener('change', (e) => { const f = e.target.files?.[0]; if (f) importState(f); e.target.value = ''; });

  document.getElementById('editor-close').addEventListener('click', closeEditor);
  document.getElementById('editor-form').addEventListener('submit', saveEditorForm);
  document.getElementById('delete-entity').addEventListener('click', () => {
    const type = document.getElementById('editor-entity-type').value;
    const id = document.getElementById('editor-entity-id').value;
    if (type === 'folder') confirmDeleteFolder(id); else confirmDeleteProduct(id);
    closeEditor();
  });
  document.getElementById('add-custom-field').addEventListener('click', () => addCustomFieldRow());
  document.getElementById('editor-image').addEventListener('change', onFolderImageSelected);
  document.getElementById('modal-close').addEventListener('click', closeModal);

  attachSearch();

  // Try load latest backup from cloud before first render
  await loadLatestCloudBackup();
  renderAll();

  // network status
  const updateNet = () => setSyncStatus(navigator.onLine ? 'Online' : 'Offline');
  window.addEventListener('online', () => { updateNet(); queueCloudSync(); });
  window.addEventListener('offline', updateNet);
  updateNet();

  // initial cloud
  await initialCloudSync();

  // Load latest snapshot if present
  try {
    const latest = await getLatestSnapshot();
    if (latest && latest.state) {
      appState = latest.state;
      await writeState(appState);
      renderAll();
      showToast('Loaded latest snapshot');
    }
  } catch {}

  // Product page events
  document.getElementById('pp-back').addEventListener('click', () => { closeProductPage(); });
  document.getElementById('pp-add-btn').addEventListener('click', () => adjustProductQuantity(+1));
  document.getElementById('pp-remove-btn').addEventListener('click', () => adjustProductQuantity(-1));
  document.getElementById('pp-upload-btn').addEventListener('click', () => document.getElementById('pp-image-file').click());
  document.getElementById('pp-image-file').addEventListener('change', onProductImageSelected);
  document.getElementById('pp-edit').addEventListener('click', () => { if (productPageProductId) openProductEditModal(productPageProductId); });
  const noteBtn = document.getElementById('pp-note-save');
  if (noteBtn) noteBtn.addEventListener('click', onSaveProductNote);
});

// ---------------------------- Product Page ----------------------------
function openProductPage(productId) {
  productPageProductId = productId;
  const p = appState.products[productId];
  if (!p) return;
  // header
  document.getElementById('pp-title').textContent = p.name || 'Product';
  // info
  document.getElementById('pp-name').textContent = p.name || '';
  document.getElementById('pp-qty').textContent = Number(p.quantity || 0);
  document.getElementById('pp-price').textContent = formatCurrency(Number(p.price || 0));
  document.getElementById('pp-total').textContent = formatCurrency(Number(p.price || 0) * Number(p.quantity || 0));
  document.getElementById('pp-adjust-input').value = 1;
  // image
  const prev = document.getElementById('pp-image-preview');
  if (p.imageUrl) { prev.src = p.imageUrl; prev.classList.remove('hidden'); }
  else { prev.src = ''; prev.classList.add('hidden'); }
  // note
  const noteEl = document.getElementById('pp-note');
  if (noteEl) noteEl.value = p.note || '';
  // show overlay
  document.getElementById('product-page').classList.remove('hidden');
}

function closeProductPage() {
  document.getElementById('product-page').classList.add('hidden');
  productPageProductId = null;
  renderAll();
}

function adjustProductQuantity(direction) { // direction: +1 add, -1 remove
  if (!productPageProductId) return;
  const p = appState.products[productPageProductId];
  if (!p) return;
  const delta = Math.max(0, Number(document.getElementById('pp-adjust-input').value || 0));
  if (delta === 0) return;
  let qty = Number(p.quantity || 0);
  const newQty = direction > 0 ? qty + delta : Math.max(0, qty - delta);
  openModal({
    title: 'Confirm Quantity Change',
    body: `Change quantity from ${qty} to ${newQty}?`,
    actions: [
      { label: 'Confirm', onClick: () => {
          p.quantity = newQty;
          saveStateDebounced();
          document.getElementById('pp-qty').textContent = p.quantity;
          document.getElementById('pp-total').textContent = formatCurrency((Number(p.price || 0)) * p.quantity);
          renderFolderList();
        } },
      { label: 'Cancel' }
    ]
  });
}

async function onProductImageSelected(e) {
  const file = e.target.files?.[0];
  e.target.value = '';
  if (!file || !productPageProductId) return;
  try {
    const dataUrl = await resizeImageToDataURL(file, 300, 300);
    const p = appState.products[productPageProductId];
    if (!p) return;
    p.imageUrl = dataUrl;
    const prev = document.getElementById('pp-image-preview');
    prev.src = dataUrl; prev.classList.remove('hidden');
    openModal({
      title: 'Confirm Image Update',
      body: 'Replace the product image with the selected file?',
      actions: [
        { label: 'Confirm', onClick: () => { saveStateDebounced(); renderFolderList(); } },
        { label: 'Cancel', onClick: () => { /* no-op */ } }
      ]
    });
  } catch (err) {
    console.warn(err);
    showToast('Image upload failed');
  }
}
