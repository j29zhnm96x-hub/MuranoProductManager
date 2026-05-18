// ── Translation System ──────────────────────────────────────────
const LANG = {
  hr: {
    'Home': 'Početna', 'Save': 'Spremi', 'Actions': 'Akcije',
    'Settings': 'Postavke', 'Search': 'Traži', 'Back': 'Natrag',
    'Top': 'Na vrh', 'Edit': 'Uredi', 'Delete': 'Izbriši',
    'Cancel': 'Odustani', 'Confirm': 'Potvrdi', 'Close': 'Zatvori',
    'Add': 'Dodaj', 'Remove': 'Ukloni',
    'Daily goal': 'Dnevni cilj', 'To do': 'Preostalo',
    'Extra': 'Višak',     'Days left': 'Preostalo',
    'Total Qty': 'Uk. količina', 'Total Value': 'Uk. vrijednost',
    'Produced today': 'Danas proizvedeno',
    'Priority Progress': 'Prioritetno',
    'Priority products progress': 'Prioritetno',
    'Folder and product tree': 'Mape i proizvodi',
    'Qty:': 'Kol.:', 'More': 'Više',
    'Dynamic Component': 'Dinamička komp.',
    'Has note': 'Bilješka',
    'Inventory History': 'Povijest proizvodnje',
    'Stock History': 'Povijest proizvodnje',
    'Search product, event or note...': 'Traži proizvod, događaj...',
    'Today': 'Danas', 'All dates': 'Svi datumi',
    'Day': 'Dan', 'Week': 'Tjedan', 'Month': 'Mjesec',
    'Events': 'Događaji', 'Showing': 'Prikazano',
    'Period': 'Razdoblje', 'Overall Qty': 'Uk. količina',
    'Overall Value': 'Uk. vrijednost',
    'Total Produced': 'Proizvedeno', 'Total Removed': 'Uklonjeno',
    'Net Change': 'Neto',
    'Added': 'Dodano', 'Removed': 'Uklonjeno',
    'Edited': 'Uređeno', 'Deducted': 'Oduzeto',
    'Deleted': 'Izbrisano', 'Folder deleted': 'Mapa izbrisana',
    'Reset': 'Resetirano', 'Duplicated': 'Duplicirano',
    'Import': 'Uvoz', 'Legacy': 'Naslijeđeno', 'Change': 'Promjena',
    'No history yet': 'Još nema povijesti',
    'No matching history events': 'Nema odgovarajućih događaja',
    'Products': 'Proizvodi', 'Folders': 'Mape',
    'Name': 'Naziv', 'Quantity': 'Količina', 'Price': 'Cijena',
    'Total Value': 'Uk. vrijednost', 'Target Quantity': 'Ciljana kol.',
    'Adjust Quantity': 'Prilagodi količinu',
    'Correct': 'Ispravak',     'Upload Image': 'Uvezi sliku',
    'Image': 'Slika', 'Note': 'Bilješka', 'Add a note...': 'Dodaj bilješku...',
    'Warning threshold': 'Prag upozorenja',
    'Used In': 'Koristi se u',
    'Not used in any products': 'Ne koristi se ni u jednom proizvodu',
    'Product Information': 'Info o proizvodu',
    'Editor': 'Uređivač', 'Save': 'Spremi',
    'New Product': 'Novi proizvod', 'New Folder': 'Nova mapa',
    'Edit Product': 'Uredi proizvod', 'Edit Folder': 'Uredi mapu',
    'Choose Image': 'Odaberi sliku',
    'Priority product': 'Prioritetni',
    'Max Quantity (guideline)': 'Maks. količina',
    'Custom fields': 'Dodatna polja', '+ Field': '+ Polje',
    'Key': 'Ključ', 'Value': 'Vrijednost',
    'Make independent (exclude from stats)': 'Neovisna mapa',
    'Move to...': 'Premjesti u...',
    'Actions menu': 'Akcije',
    'Select an action.': 'Odaberite akciju.',
    'Save (snapshot + cloud)': 'Spremi (snimka + oblak)',
    'Import JSON': 'Uvezi JSON', 'Export JSON': 'Izvezi JSON',
    'Settings saved': 'Postavke spremljene',
    'Changes saved successfully': 'Promjene spremljene',
    'No changes to save': 'Nema promjena',
    'Saving...': 'Spremanje...',
    'Quantity corrected (no history recorded)': 'Količina ispravljena',
    'Enter quantity': 'Unesi količinu',
    'Enter valid quantity': 'Unesi ispravnu količinu',
    'Order updated': 'Redoslijed ažuriran',
    'Note saved': 'Bilješka spremljena',
    'Cannot delete root': 'Ne može se izbrisati korijen',
    'Import complete': 'Uvoz završen',
    'Import failed: invalid JSON': 'Uvoz nije uspio',
    'Network Required': 'Potrebna mreža',
    'Reset All Quantities': 'Resetiraj sve količine',
    'Reset Stats': 'Resetiraj stat.',
    'Show Report': 'Prikaži izvještaj',
    'Planned total': 'Planirani iznos',
    'End date': 'Datum završetka',
    'e.g. 30000': 'npr. 30000',
    'Sync Conflict': 'Sukob sink.',
    'Overwrite Remote': 'Prepiši udaljeno',
    'Load Remote': 'Učitaj udaljeno',
    'Auto-merge': 'Spoji automatski',
    'Latest cloud save is required. Please connect to the internet to continue.': 'Potrebna je najnovija snimka. Spojite se na internet.',
    'Shop': 'Prodaja',
    'Shop Categories': 'Kategorije prodaje',
    'Transfer from Warehouse': 'Prijenos iz skladišta',
    'Return from Shop': 'Povrat iz prodaje',
    'In-Season Production': 'Proizvodnja na licu mjesta',
    'Master Confirm': 'Potvrdi sve',
    'Decline All': 'Odustani od svega',
    'Create new document': 'Novi dokument',
    'Update last document': 'Ažuriraj zadnji',
    'Print': 'Ispiš', 'Preview': 'Pregled', 'Share': 'Podijeli',
    'Company Name': 'Naziv tvrtke', 'Address': 'Adresa',
    'OIB': 'OIB', 'Phone': 'Telefon', 'Email': 'Email',
    'Season start': 'Početak sezone',
    'Set Season Start': 'Postavi početak',
    'End Season Report': 'Izvještaj sezone',
    'Sold': 'Prodano',
    'Remaining in warehouse': 'Ostalo u skladištu',
    'Delete test data': 'Izbriši testne podatke',
    'Inspector List': 'Popis za inspekciju',
    'On-site production doc': 'Popis izrađenih na mjestu',
    'Total:': 'Ukupno:', 'pc': 'kom',
    'Unknown': 'Nepoznato',
    'Incorrect password. Try again.': 'Netočna lozinka. Pokušajte ponovno.',
    'Enter Password': 'Lozinka',
    'Submit': 'Potvrdi', 'Clear': 'Izbriši',
    'Language': 'Jezik',
  },
  en: {
    'Home': 'Home', 'Save': 'Save', 'Actions': 'Actions',
    'Settings': 'Settings', 'Search': 'Search', 'Back': 'Back',
    'Top': 'Top', 'Edit': 'Edit', 'Delete': 'Delete',
    'Cancel': 'Cancel', 'Confirm': 'Confirm', 'Close': 'Close',
    'Add': 'Add', 'Remove': 'Remove',
    'Daily goal': 'Daily goal', 'To do': 'To do',
    'Extra': 'Extra', 'Days left': 'Days left',
    'Total Qty': 'Total Qty', 'Total Value': 'Total Value',
    'Produced today': 'Produced today',
    'Priority Progress': 'Priority Progress',
    'Priority products progress': 'Priority products progress',
    'Folder and product tree': 'Folder and product tree',
    'Qty:': 'Qty:', 'More': 'More',
    'Dynamic Component': 'Dynamic Component',
    'Has note': 'Has note',
    'Inventory History': 'Inventory History',
    'Stock History': 'Stock History',
    'Search product, event or note...': 'Search product, event or note...',
    'Today': 'Today', 'All dates': 'All dates',
    'Day': 'Day', 'Week': 'Week', 'Month': 'Month',
    'Events': 'Events', 'Showing': 'Showing',
    'Period': 'Period', 'Overall Qty': 'Overall Qty',
    'Overall Value': 'Overall Value',
    'Total Produced': 'Total Produced', 'Total Removed': 'Total Removed',
    'Net Change': 'Net Change',
    'Added': 'Added', 'Removed': 'Removed',
    'Edited': 'Edited', 'Deducted': 'Deducted',
    'Deleted': 'Deleted', 'Folder deleted': 'Folder deleted',
    'Reset': 'Reset', 'Duplicated': 'Duplicated',
    'Import': 'Import', 'Legacy': 'Legacy', 'Change': 'Change',
    'No history yet': 'No history yet',
    'No matching history events': 'No matching history events',
    'Products': 'Products', 'Folders': 'Folders',
    'Name': 'Name', 'Quantity': 'Quantity', 'Price': 'Price',
    'Total Value': 'Total Value',
    'Target Quantity': 'Target Quantity',
    'Adjust Quantity': 'Adjust Quantity',
    'Correct': 'Correct', 'Upload Image': 'Upload Image',
    'Image': 'Image', 'Note': 'Note',
    'Add a note...': 'Add a note...',
    'Warning threshold': 'Warning threshold',
    'Used In': 'Used In',
    'Not used in any products': 'Not used in any products',
    'Product Information': 'Product Information',
    'Editor': 'Editor', 'Save': 'Save',
    'New Product': 'New Product', 'New Folder': 'New Folder',
    'Edit Product': 'Edit Product', 'Edit Folder': 'Edit Folder',
    'Choose Image': 'Choose Image',
    'Priority product': 'Priority product',
    'Max Quantity (guideline)': 'Max Quantity (guideline)',
    'Custom fields': 'Custom fields', '+ Field': '+ Field',
    'Key': 'Key', 'Value': 'Value',
    'Make independent (exclude from stats)': 'Make independent (exclude from stats)',
    'Move to...': 'Move to...',
    'Actions menu': 'Actions menu',
    'Select an action.': 'Select an action.',
    'Save (snapshot + cloud)': 'Save (snapshot + cloud)',
    'Import JSON': 'Import JSON', 'Export JSON': 'Export JSON',
    'Settings saved': 'Settings saved',
    'Changes saved successfully': 'Changes saved successfully',
    'No changes to save': 'No changes to save',
    'Saving...': 'Saving...',
    'Quantity corrected (no history recorded)': 'Quantity corrected (no history recorded)',
    'Enter quantity': 'Enter quantity',
    'Enter valid quantity': 'Enter valid quantity',
    'Order updated': 'Order updated',
    'Note saved': 'Note saved',
    'Cannot delete root': 'Cannot delete root',
    'Import complete': 'Import complete',
    'Import failed: invalid JSON': 'Import failed: invalid JSON',
    'Network Required': 'Network Required',
    'Reset All Quantities': 'Reset All Quantities',
    'Reset Stats': 'Reset Stats',
    'Show Report': 'Show Report',
    'Planned total': 'Planned total',
    'End date': 'End date',
    'e.g. 30000': 'e.g. 30000',
    'Sync Conflict': 'Sync Conflict',
    'Overwrite Remote': 'Overwrite Remote',
    'Load Remote': 'Load Remote',
    'Auto-merge': 'Auto-merge',
    'Latest cloud save is required. Please connect to the internet to continue.': 'Latest cloud save is required. Please connect to the internet to continue.',
    'Shop': 'Shop',
    'Shop Categories': 'Shop Categories',
    'Transfer from Warehouse': 'Transfer from Warehouse',
    'Return from Shop': 'Return from Shop',
    'In-Season Production': 'In-Season Production',
    'Master Confirm': 'Master Confirm',
    'Decline All': 'Decline All',
    'Create new document': 'Create new document',
    'Update last document': 'Update last document',
    'Print': 'Print', 'Preview': 'Preview', 'Share': 'Share',
    'Company Name': 'Company Name', 'Address': 'Address',
    'OIB': 'OIB', 'Phone': 'Phone', 'Email': 'Email',
    'Season start': 'Season start',
    'Set Season Start': 'Set Season Start',
    'End Season Report': 'End Season Report',
    'Sold': 'Sold',
    'Remaining in warehouse': 'Remaining in warehouse',
    'Delete test data': 'Delete test data',
    'Inspector List': 'Inspector List',
    'On-site production doc': 'On-site production doc',
    'Total:': 'Total:', 'pc': 'pc',
    'Unknown': 'Unknown',
    'Incorrect password. Try again.': 'Incorrect password. Try again.',
    'Enter Password': 'Enter Password',
    'Submit': 'Submit', 'Clear': 'Clear',
    'Language': 'Language',
  }
};

let currentLang = localStorage.getItem('muranopm_lang') || 'hr';
function __(key) {
  const lang = LANG[currentLang];
  if (lang && lang[key] !== undefined) return lang[key];
  // Fallback: try English
  if (currentLang !== 'en' && LANG.en && LANG.en[key] !== undefined) return LANG.en[key];
  return key;
}
function setLang(lang) {
  if (LANG[lang]) {
    currentLang = lang;
    localStorage.setItem('muranopm_lang', lang);
    if (appState) {
      appState.settings = appState.settings || {};
      appState.settings.language = lang;
    }
    translateStaticUI();
  }
}
function translateStaticUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (el.getAttribute('data-i18n-type') === 'placeholder') {
        el.placeholder = __(key);
      } else {
        el.value = __(key);
      }
    } else {
      el.textContent = __(key);
    }
  });
}

function showResetStatsConfirm() {
  // Build warning body
  const body = document.createElement('div');
  body.style.display = 'grid'; body.style.gap = '10px'; body.style.maxWidth = '520px';
  const warn = document.createElement('div'); warn.textContent = 'ARE YOU SURE YOU WISH TO DELETE ALL PRODUCT STATISTICS, THIS IS IRREVERSABLE'; warn.style.color = '#ef4444'; warn.style.fontWeight = '700'; warn.style.textAlign = 'center'; warn.style.fontSize = '15px';
  const note = document.createElement('div'); note.textContent = 'This will set the Quantity of every product to 0. Folders, products and settings remain unchanged.'; note.style.textAlign = 'center'; note.style.color = '#6b7280'; note.style.fontSize = '14px';
  const countdownEl = document.createElement('div'); countdownEl.style.textAlign = 'center'; countdownEl.style.color = '#6b7280'; countdownEl.style.fontWeight = '700';
  body.appendChild(warn); body.appendChild(note); body.appendChild(countdownEl);

  let seconds = 10;
  let confirmBtnRef = null;

  const tick = () => {
    countdownEl.textContent = `You can confirm in ${seconds}s`;
    if (confirmBtnRef) confirmBtnRef.disabled = seconds > 0;
    if (seconds > 0) { seconds -= 1; setTimeout(tick, 1000); }
    else { countdownEl.textContent = '\u2713 You may proceed.'; countdownEl.style.color = '#16a34a'; }
  };

  openModal({
    title: __('Reset All Quantities'),
    headerIcon: { symbol: '\u26A0', color: 'red' },
    size: 'small',
    body,
    actions: [
      { label: __('Confirm'), onClick: () => { resetAllProductQuantities(); } },
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });

  // Find the last opened modal's actions and disable Confirm initially
  try {
    const actionsEl = document.getElementById('modal-actions');
    if (actionsEl) {
      const btns = actionsEl.querySelectorAll('button');
      confirmBtnRef = btns[0]; // first is Confirm
      if (confirmBtnRef) { confirmBtnRef.classList.add('danger'); confirmBtnRef.disabled = true; }
    }
  } catch {}
  tick();
}

function resetAllProductQuantities() {
  for (const p of Object.values(appState.products || {})) {
    const oldQty = Number(p.quantity || 0);
    p.quantity = 0;
    if (oldQty > 0) {
      recordInventoryEvent({
        eventType: 'reset_quantity',
        productId: p.id,
        productName: p.name || 'Product',
        delta: -oldQty,
        price: Number(p.price || 0),
        value: -oldQty * Number(p.price || 0),
        source: 'reset',
        note: 'Reset quantity to 0'
      });
    }
  }
  saveStateDebounced();
  ensureDailyProgress();
  renderAll();
  showToast('All product quantities reset to 0');
}
// ---------------------------- Priority Graph ----------------------------
// Helper: Recursively collect all product IDs in a folder and its subfolders
function getAllProductIdsInFolder(folderId) {
  const productIds = new Set();
  const folder = appState.folders[folderId];
  if (!folder) return productIds;
  
  // Add direct products in this folder
  if (folder.products && Array.isArray(folder.products)) {
    for (const pid of folder.products) {
      productIds.add(pid);
    }
  }
  
  // Recursively add products from subfolders
  if (folder.subfolders && Array.isArray(folder.subfolders)) {
    for (const subFolderId of folder.subfolders) {
      const subProducts = getAllProductIdsInFolder(subFolderId);
      subProducts.forEach(id => productIds.add(id));
    }
  }
  
  return productIds;
}

function renderPriorityGraph() {
  const box = document.getElementById('priority-graph');
  if (!box) return;
  
  // Check if we're in an independent folder - if so, hide priority graph
  const currentFolder = appState.folders[currentFolderId];
  if (currentFolder && currentFolder.isIndependent) {
    box.innerHTML = '';
    box.classList.add('hidden');
    return;
  }
  
  // Filter products based on current folder
  let list;
  if (currentFolderId === 'root') {
    // At top level: show all priority products
    list = Object.values(appState.products || {}).filter(p => !!p.priority && Number(p.targetQuantity || 0) > 0);
  } else {
    // Inside a folder: show priority products in this folder AND all subfolders
    const folderProductIds = getAllProductIdsInFolder(currentFolderId);
    list = Object.values(appState.products || {}).filter(p => 
      !!p.priority && 
      Number(p.targetQuantity || 0) > 0 && 
      folderProductIds.has(p.id)
    );
  }
  
  if (!list.length) { box.innerHTML = ''; box.classList.add('hidden'); return; }
  box.classList.remove('hidden');
  // Sort by progress ascending (least produced near top)
  list.sort((a,b) => (a.quantity/(a.targetQuantity||1)) - (b.quantity/(b.targetQuantity||1)));
  const wrap = document.createElement('div');
  wrap.innerHTML = `<div class="pg-title">${__('Priority Progress')}</div>`;
  const ul = document.createElement('div'); ul.className = 'pg-list';
  // Smoothly interpolate color from red (0%) to green (100%)
  const pctColor = (p) => {
    const r1=220,g1=38,b1=38; // red #dc2626
    const r2=16,g2=185,b2=129; // green #10b981
    const t = Math.max(0, Math.min(1, p/100));
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return `rgb(${r}, ${g}, ${b})`;
  };
  for (const p of list) {
    const row = document.createElement('div'); row.className = 'pg-row';
    const name = document.createElement('div'); name.className = 'pg-name'; name.textContent = p.name || 'Product';
    name.style.cursor = 'pointer';
    name.addEventListener('click', () => openProductPage(p.id));
    const bar = document.createElement('div'); bar.className = 'pg-bar';
    const fill = document.createElement('div'); fill.className = 'pg-fill';
    const qtyNum = Number(p.quantity || 0);
    const tgtNum = Number(p.targetQuantity || 1);
    const rawPct = Math.round((qtyNum / tgtNum) * 100); // can exceed 100
    const pctForBar = Math.max(0, Math.min(100, rawPct)); // cap bar width at 100%
    fill.style.width = `${pctForBar}%`; bar.appendChild(fill);
    const percent = document.createElement('div'); percent.className = 'pg-percent'; percent.textContent = `${rawPct}%`;
    const color = pctColor(Math.max(0, Math.min(100, rawPct))); // color scale based on 0..100
    percent.style.color = color;
    const meta = document.createElement('div'); meta.className = 'pg-meta';
    meta.innerHTML = `${qtyNum} / ${tgtNum} pc <span style="color:${color}">(${rawPct}%)</span>`;
    row.appendChild(name); row.appendChild(bar); row.appendChild(percent); row.appendChild(meta); ul.appendChild(row);
  }
  box.innerHTML = ''; box.appendChild(wrap); box.appendChild(ul);
}
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
let historyPeriodMode = 'day';
let backupLoaded = false; // indicates a successful cloud backup load in this session
// Persistent client ID for self-change detection
const CLIENT_ID = (() => {
  try {
    const k = 'murano_client_id';
    let v = localStorage.getItem(k);
    if (!v) { v = uuid(); localStorage.setItem(k, v); }
    return v;
  } catch { return uuid(); }
})();

function computeTodayAddedValue() {
  try {
    const logs = appState.productionLog || [];
    const today = todayStr();
    let sum = 0;
    for (const rec of logs) {
      const d = new Date(rec.ts || 0); d.setHours(0,0,0,0);
      const key = d.toISOString().slice(0,10);
      if (key === today) sum += Number(rec.value || 0);
    }
    return sum; // net value change today (can be negative)
  } catch { return 0; }
}
const LAST_BACKUP_NAME_KEY = 'murano_last_backup_name';
let lastKnownBackupName = null; // persisted across reloads for accurate detection
try { lastKnownBackupName = localStorage.getItem(LAST_BACKUP_NAME_KEY) || null; } catch {}

// ---------------------------- Auth (Secure) ----------------------------
// SHA-256 password hash - NO plaintext password is ever stored
// Brute-force protection: 5 attempts → 60s lockout
const AUTH_SESSION_KEY = 'murano_auth_ok';
const AUTH_HASH_KEY = 'murano_auth_hash';
const AUTH_ATTEMPT_KEY = 'murano_auth_attempts';
const AUTH_LOCK_KEY = 'murano_auth_locked';
const AUTH_MAX_ATTEMPTS = 5;
const AUTH_LOCK_MS = 60000;

// Password must be 8+ characters
const AUTH_MIN_LENGTH = 8;

async function sha256(text) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  const arr = Array.from(new Uint8Array(buf));
  return arr.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getAuthHash() {
  // Check cloud-synced state first, then local fallback
  if (appState?.settings?.passwordHash) return appState.settings.passwordHash;
  const local = localStorage.getItem(AUTH_HASH_KEY);
  if (local) {
    // Migrate local to state for future cloud sync
    if (appState) { appState.settings = appState.settings || {}; appState.settings.passwordHash = local; }
  }
  return local;
}
function setAuthHash(hash) {
  localStorage.setItem(AUTH_HASH_KEY, hash);
  if (appState) { appState.settings = appState.settings || {}; appState.settings.passwordHash = hash; }
  saveStateDebounced();
}

function getAuthAttempts() { return parseInt(localStorage.getItem(AUTH_ATTEMPT_KEY) || '0', 10); }
function setAuthAttempts(n) { localStorage.setItem(AUTH_ATTEMPT_KEY, String(n)); }

function getAuthLockRemaining() {
  const until = parseInt(localStorage.getItem(AUTH_LOCK_KEY) || '0', 10);
  if (!until) return 0;
  const rem = until - Date.now();
  if (rem > 0) return rem;
  localStorage.removeItem(AUTH_LOCK_KEY);
  localStorage.removeItem(AUTH_ATTEMPT_KEY);
  return 0;
}

function isSessionActive() { return sessionStorage.getItem(AUTH_SESSION_KEY) === '1'; }
function setSessionActive() { sessionStorage.setItem(AUTH_SESSION_KEY, '1'); }
 
// ---------------------------- UI Sounds ----------------------------
const CLICK_SOUND_URL = './assets/Click.mp3';
const CLICK_ALT_SRCS = [
  './assets/Click.mp3',
  './assets/click.mp3',
  './assets/click-dot.mp3',
  './assets/click_dot.mp3',
  './assets/click dot.mp3'
];
let clickPool = [];
let clickIdx = 0;
let clickUnlocked = false;
let lastClickPlay = 0;
let clickCtx = null;
let clickGain = null;
let clickBuffer = null;
let clickBufferLoading = false;
const IS_IOS = (() => {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
})();

function initClickPool() {
  try {
    if (!clickPool.length) {
      for (let i = 0; i < 4; i++) {
        const a = new Audio();
        // try multiple source candidates for robustness
        let idx = 0;
        const tryNext = () => {
          if (idx >= CLICK_ALT_SRCS.length) return;
          a.src = CLICK_ALT_SRCS[idx++] + '?v=' + Date.now();
          a.load();
        };
        a.onerror = () => { tryNext(); };
        tryNext();
        a.preload = 'auto';
        a.volume = 1.0;
        clickPool.push(a);
      }
    }
  } catch {}
}
function unlockClickAudio() {
  if (clickUnlocked) return;
  clickUnlocked = true;
  // try to satisfy autoplay policies with a muted play attempt, but don't rely on success
  initClickPool();
  try {
    const a = clickPool[0];
    if (a) {
      a.muted = true;
      const p = a.play();
      if (p && typeof p.then === 'function') {
        p.then(() => { a.pause(); a.currentTime = 0; a.muted = false; }).catch(() => {});
      } else {
        a.pause(); a.currentTime = 0; a.muted = false;
      }
    }
  } catch {}
  // Defer audio context setup to next tick to ensure it's after user gesture
  setTimeout(() => {
    try { ensureAudioCtx(); } catch {}
    try { loadClickBuffer(); } catch {}
  }, 0);
}
function playClick(force = false) {
  try {
    const now = Date.now();
    if (!force && now - lastClickPlay < 120) return; // throttle per interaction
    lastClickPlay = now;
    if (IS_IOS && navigator.vibrate) {
      try { navigator.vibrate(5); } catch {}
    }
    ensureAudioCtx();
    const ctx = clickCtx;
    if (ctx && clickBuffer) {
      const playBuffer = () => {
        try {
          const src = ctx.createBufferSource();
          src.buffer = clickBuffer;
          src.connect(clickGain || ctx.destination);
          src.start(0);
        } catch { tryBeep(); }
      };
      if (ctx.state === 'suspended') {
        ctx.resume().then(playBuffer).catch(() => tryBeep());
      } else {
        playBuffer();
      }
      return;
    }
    // fallback to HTMLAudio while buffer loads
    initClickPool();
    const a = clickPool[clickIdx++ % Math.max(1, clickPool.length)];
    let played = false;
    if (a) {
      a.currentTime = 0;
      a.play().then(() => { played = true; }).catch(() => {});
    }
    if (!played) { tryBeep(); }
    // kick off buffer load in background
    loadClickBuffer();
  } catch {}
}
function ensureAudioCtx() {
  try {
    if (!clickCtx) {
      try {
        clickCtx = new (window.AudioContext || window.webkitAudioContext)();
        clickGain = clickCtx.createGain();
        clickGain.gain.value = 0.25; // louder
        clickGain.connect(clickCtx.destination);
      } catch (e) {
        // AudioContext creation failed (likely before user gesture), will retry later
        clickCtx = null;
        return;
      }
    }
    if (clickCtx && clickCtx.state === 'suspended') {
      clickCtx.resume().catch(() => {});
    }
  } catch {}
}
async function loadClickBuffer() {
  if (clickBuffer || clickBufferLoading) return;
  clickBufferLoading = true;
  try {
    for (const src of CLICK_ALT_SRCS) {
      try {
        const res = await fetch(src + '?v=' + Date.now());
        if (!res.ok) continue;
        const arr = await res.arrayBuffer();
        // Only try to create audio context if we haven't already failed
        if (!clickCtx) {
          try {
            ensureAudioCtx();
          } catch (e) {
            // Audio context not available yet, will retry on next click
            continue;
          }
        }
        if (!clickCtx) continue; // skip if audio context still not available
        try {
          const buf = await clickCtx.decodeAudioData(arr.slice(0));
          if (buf) { clickBuffer = buf; break; }
        } catch (e) {
          // Decode failed, try next source
          continue;
        }
      } catch {}
    }
  } finally {
    clickBufferLoading = false;
  }
}
function tryBeep() {
  try {
    ensureAudioCtx();
    const ctx = clickCtx;
    if (!ctx) return;
    const startBeep = () => {
      try {
        const o = ctx.createOscillator();
        o.type = 'square';
        o.frequency.value = 1200; // brighter click
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        o.connect(g).connect(clickGain || ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.13);
      } catch {}
    };
    if (ctx.state === 'suspended') {
      ctx.resume().then(startBeep).catch(() => {});
    } else {
      startBeep();
    }
  } catch {}
}
function isInteractive(el) {
  if (!el || !(el instanceof Element)) return false;
  if (el.closest('input, textarea, select')) return false; // avoid keystroke spam
  if (el.tagName === 'BUTTON' || el.tagName === 'A') return true;
  const role = (el.getAttribute('role') || '').toLowerCase();
  if (role === 'button' || role === 'link' || role === 'menuitem') return true;
  if (el.hasAttribute('onclick')) return true;
  const ti = el.getAttribute('tabindex');
  if (ti !== null && Number(ti) >= 0) return true;
  // Check for clickable elements with cursor pointer
  if (el.style.cursor === 'pointer') return true;
  // Check for elements with click event listeners (common clickable classes)
  if (el.classList.contains('name') || el.classList.contains('crumb') || el.classList.contains('result')) return true;
  // Check if element has click event listeners by checking parent containers
  if (el.closest('.item-left, .pp-row, .pg-name')) return true;
  return false;
}
try {
  // Unlock audio on first gesture
  document.addEventListener('pointerdown', unlockClickAudio, { capture: true, passive: true });
  document.addEventListener('touchstart', unlockClickAudio, { capture: true, passive: true });
  document.addEventListener('mousedown', unlockClickAudio, { capture: true, passive: true });
  document.addEventListener('keydown', unlockClickAudio, { capture: true, passive: true });
  
  // Play click sound only on actual interactive elements
  const onInteractiveClick = (e) => {
    // Only play sound if the target or its closest interactive parent is actually interactive
    let target = e.target;
    while (target && target !== document) {
      if (isInteractive(target)) {
        playClick();
        break;
      }
      target = target.parentElement;
    }
  };
  
  // Use click event only (not mousedown/mouseup to avoid double sounds)
  document.addEventListener('click', onInteractiveClick, true);
  
  // Handle keyboard interactions
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && isInteractive(e.target)) {
      playClick();
    }
  }, true);
} catch {}


function ensureAuthOverlayElements() {
  if (document.getElementById('auth-overlay')) return;
  
  const ov = document.createElement('div'); ov.id = 'auth-overlay'; ov.className = 'auth-overlay';
  const box = document.createElement('div'); box.className = 'auth-box';
  const title = document.createElement('div'); title.className = 'auth-title';
  const message = document.createElement('div'); message.id = 'auth-message'; message.className = 'auth-message';
  
  // Use a proper form for iOS password autofill
  const form = document.createElement('form'); form.id = 'auth-form'; form.action = '/'; form.style.cssText = 'width:100%;display:contents;';
  
  const inp = document.createElement('input');
  inp.id = 'auth-code'; inp.type = 'password'; inp.name = 'password';
  inp.placeholder = '••••••••'; inp.className = 'auth-input';
  
  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button'; toggleBtn.className = 'auth-toggle';
  toggleBtn.textContent = '👁';
  toggleBtn.addEventListener('click', () => { inp.type = inp.type === 'password' ? 'text' : 'password'; });
  
  const submitBtn = document.createElement('button');
  submitBtn.id = 'auth-submit-btn'; submitBtn.type = 'button';
  submitBtn.textContent = __('Submit'); submitBtn.className = 'auth-submit';
  
  const lockMsg = document.createElement('div'); lockMsg.id = 'auth-lock'; lockMsg.className = 'auth-lock hidden';
  
  form.appendChild(inp); form.appendChild(submitBtn);
  box.appendChild(title); box.appendChild(message); box.appendChild(lockMsg);
  box.appendChild(form); box.appendChild(toggleBtn);
  ov.appendChild(box); document.body.appendChild(ov);
  
  form.addEventListener('submit', (e) => { e.preventDefault(); });
  inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submitBtn.click(); } });
  
  // Render function - handles both setup and login
  window.renderAuth = async function(mode) {
    const hash = getAuthHash();
    const needsSetup = mode === 'setup' || !hash;
    
    title.textContent = needsSetup ? 'Postavi lozinku' : __('Enter Password');
    inp.value = ''; inp.type = 'password'; message.textContent = ''; lockMsg.classList.add('hidden');
    inp.autocomplete = needsSetup ? 'new-password' : 'current-password';
    ov.classList.remove('hidden'); setTimeout(() => inp.focus(), 100);
    
    if (needsSetup) {
      inp.placeholder = 'min 8 znakova';
      submitBtn.onclick = async () => {
        const pwd = inp.value;
        if (pwd.length < AUTH_MIN_LENGTH) { message.textContent = 'Lozinka mora imati najmanje 8 znakova'; return; }
        const h = await sha256(pwd);
        setAuthHash(h); setAuthAttempts(0); setSessionActive(); ov.classList.add('hidden');
      };
    } else {
      inp.placeholder = '••••••••';
      
      // Lock countdown ticker
      if (window._authLockInterval) clearInterval(window._authLockInterval);
      window._authLockInterval = setInterval(() => {
        const r = getAuthLockRemaining();
        if (r > 0) { lockMsg.classList.remove('hidden'); lockMsg.textContent = `Pričekajte ${Math.ceil(r / 1000)} sekundi`; }
        else { lockMsg.classList.add('hidden'); if (window._authLockInterval) clearInterval(window._authLockInterval); }
      }, 1000);
      
      submitBtn.onclick = async () => {
        const rem = getAuthLockRemaining();
        if (rem > 0) {
          lockMsg.classList.remove('hidden');
          lockMsg.textContent = `Pričekajte ${Math.ceil(rem / 1000)} sekundi`;
          return;
        }
        const pwd = inp.value; inp.value = '';
        const h = await sha256(pwd);
        if (h === getAuthHash()) {
          setAuthAttempts(0); setSessionActive(); ov.classList.add('hidden'); message.textContent = '';
        } else {
          const attempts = getAuthAttempts() + 1;
          setAuthAttempts(attempts);
          const remaining = AUTH_MAX_ATTEMPTS - attempts;
          if (remaining <= 0) {
            const until = Date.now() + AUTH_LOCK_MS;
            localStorage.setItem(AUTH_LOCK_KEY, String(until));
            lockMsg.classList.remove('hidden');
            lockMsg.textContent = `Previše pogrešnih. Pričekajte ${Math.ceil(AUTH_LOCK_MS / 1000)} sekundi.`;
          } else {
            message.textContent = `Netočna lozinka. Preostalo pokušaja: ${remaining}`;
          }
          setTimeout(() => inp.focus(), 100);
        }
      };
    }
  };
}

async function ensureAuthenticated() {
  ensureAuthOverlayElements();
  if (isSessionActive()) return;
  const hash = getAuthHash();
  await window.renderAuth(hash ? 'login' : 'setup');
  
  // Wait for auth to complete
  return new Promise(resolve => {
    const check = setInterval(() => {
      if (isSessionActive()) { clearInterval(check); resolve(); }
    }, 100);
  });
}

// ---------------------------- Daily Progress ----------------------------
function todayStr() {
  const d = new Date(); d.setHours(0,0,0,0); return d.toISOString().slice(0,10);
}
function ensureStateFields() {
  if (!appState) return;
  // shopCategories: array of { id, name (group), items: [{ id, name, price }] }
  if (!appState.shopCategories) {
    appState.shopCategories = [];
  } else {
    // Ensure each category has items array
    for (const cat of appState.shopCategories) {
      if (!cat.items) cat.items = [];
      if (!cat.id) cat.id = uuid();
      for (const item of cat.items) {
        if (!item.id) item.id = uuid();
      }
    }
  }
  appState.companyInfo = appState.companyInfo || { name: '', address: '', oib: '', phone: '', email: '' };
  appState.settings.seasonEndDate = appState.settings.seasonEndDate || null;
  appState.pendingTransfers = appState.pendingTransfers || [];
  appState.transferLog = appState.transferLog || [];
  appState.onSiteProduction = appState.onSiteProduction || [];
  appState.documents = appState.documents || [];
  appState.returnLog = appState.returnLog || [];
  // Ensure each product has shopCategory field
  if (appState.products) {
    for (const p of Object.values(appState.products)) {
      if (p.shopCategory === undefined) p.shopCategory = '';
    }
  }
}

function ensureDailyProgress() {
  appState.dailyProgress = appState.dailyProgress || { date: null, startValue: 0, fixedGoal: 0 };
  const cur = todayStr();
  const stats = computeStats('root');
  if (appState.dailyProgress.date !== cur) {
    appState.dailyProgress.date = cur;
    appState.dailyProgress.startValue = stats.totalValue || 0;
    // Compute and pin today's goal using current settings at day start
    const settings = appState.settings || {};
    if (settings.plannedValue && settings.endDate) {
      const end = new Date(settings.endDate);
      const today = new Date(); today.setHours(0,0,0,0);
      const remainingOverall = Math.max(0, Number(settings.plannedValue || 0) - Number(stats.totalValue || 0));
      const rawDays = Math.ceil((end.getTime() - today.getTime())/(1000*60*60*24));
      const daysLeft = rawDays > 0 ? rawDays : 1;
      appState.dailyProgress.fixedGoal = remainingOverall / daysLeft;
    } else {
      appState.dailyProgress.fixedGoal = 0;
    }
    try { saveStateDebounced(); } catch {}
  } else {
    // Same day: recalc goal from current total (handles any change: adds, deletes, transfers)
    const settings = appState.settings || {};
    if (settings.plannedValue && settings.endDate) {
      const end = new Date(settings.endDate);
      const today = new Date(); today.setHours(0,0,0,0);
      const remainingOverall = Math.max(0, Number(settings.plannedValue || 0) - Number(stats.totalValue || 0));
      const rawDays = Math.ceil((end.getTime() - today.getTime())/(1000*60*60*24));
      const daysLeft = rawDays > 0 ? rawDays : 1;
      appState.dailyProgress.fixedGoal = remainingOverall / daysLeft;
    }
    // If total dropped below start, reset start so addedToday doesn't go negative
    if (stats.totalValue < appState.dailyProgress.startValue) {
      appState.dailyProgress.startValue = stats.totalValue || 0;
    }
    try { saveStateDebounced(); } catch {}
  }
}

// Recompute today's fixed goal immediately based on current settings and totals
function recomputeDailyGoalNow() {
  appState.dailyProgress = appState.dailyProgress || { date: todayStr(), startValue: 0, fixedGoal: 0 };
  const stats = computeStats('root');
  const settings = appState.settings || {};
  if (settings.plannedValue && settings.endDate) {
    const end = new Date(settings.endDate);
    const today = new Date(); today.setHours(0,0,0,0);
    const remainingOverall = Math.max(0, Number(settings.plannedValue || 0) - Number(stats.totalValue || 0));
    const rawDays = Math.ceil((end.getTime() - today.getTime())/(1000*60*60*24));
    const daysLeft = rawDays > 0 ? rawDays : 1;
    appState.dailyProgress.fixedGoal = remainingOverall / daysLeft;
  } else {
    appState.dailyProgress.fixedGoal = 0;
  }
}

// ---------------------------- Utilities ----------------------------
function uuid() {
  if (crypto && crypto.randomUUID) return crypto.randomUUID();
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
}

// ---------------------------- Reorder ----------------------------
function getFolderOrder(folder) {
  // Create/repair unified order list of keys like 'f:<id>' and 'p:<id>'
  folder.order = Array.isArray(folder.order) ? folder.order.slice() : [];
  const want = new Set([
    ...folder.subfolders.map(id => `f:${id}`),
    ...folder.products.map(id => `p:${id}`)
  ]);
  // Keep only existing
  folder.order = folder.order.filter(k => want.has(k));
  // Append any missing at the end in default grouping order
  for (const fid of folder.subfolders) {
    const key = `f:${fid}`;
    if (!folder.order.includes(key)) folder.order.push(key);
  }
  for (const pid of folder.products) {
    const key = `p:${pid}`;
    if (!folder.order.includes(key)) folder.order.push(key);
  }
  return folder.order;
}
function setFolderOrder(folder, order) {
  folder.order = order.slice();
}
function moveFolderOrderItem(folder, itemKey, nextIndex) {
  if (!folder) return false;
  const order = getFolderOrder(folder).slice();
  const currentIndex = order.indexOf(itemKey);
  if (currentIndex < 0) return false;
  const boundedIndex = Math.max(0, Math.min(order.length - 1, nextIndex));
  if (currentIndex === boundedIndex) return false;
  order.splice(currentIndex, 1);
  order.splice(boundedIndex, 0, itemKey);
  setFolderOrder(folder, order);
  saveStateDebounced();
  renderAll();
  return true;
}

function openReorderMenu(folder, itemKey, itemLabel) {
  const order = getFolderOrder(folder);
  const index = order.indexOf(itemKey);
  if (index < 0) return;

  const moveTo = (nextIndex) => {
    if (moveFolderOrderItem(folder, itemKey, nextIndex)) {
      showToast(__('Order updated'));
    }
  };

  const actions = [];
  if (index > 0) actions.push({ label: 'Move up', onClick: () => moveTo(index - 1) });
  if (index < order.length - 1) actions.push({ label: 'Move down', onClick: () => moveTo(index + 1) });
  if (index > 0) actions.push({ label: 'Move to top', onClick: () => moveTo(0) });
  if (index < order.length - 1) actions.push({ label: 'Move to bottom', onClick: () => moveTo(order.length - 1) });
  actions.push({ label: 'Close' });

  openModal({
    title: 'Reorder item',
    body: buildModalMenuHeader('↕', itemLabel, 'Drag the handle or use a quick move.'),
    bodyClassName: 'modal-body-compact',
    actionsLayout: 'stack',
    actions
  });
}

function createReorderHandle(li, folder, itemKey, itemLabel, disabled = false) {
  li.dataset.id = itemKey;
  li.classList.add('reorder-item');

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'reorder-handle';
  button.textContent = '↕';

  const title = disabled ? 'Nothing else to reorder here' : `Reorder ${itemLabel}`;
  button.title = title;
  button.setAttribute('aria-label', title);

  if (disabled) {
    button.disabled = true;
    return button;
  }

  button.addEventListener('pointerdown', (e) => {
    if (typeof e.button === 'number' && e.button !== 0) return;
    e.stopPropagation();
    startReorderPointerSession(e, li, folder, button);
  });

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    if (button.dataset.skipClick === '1') {
      delete button.dataset.skipClick;
      e.preventDefault();
      return;
    }
    openReorderMenu(folder, itemKey, itemLabel);
  });

  return button;
}

let activeReorderDrag = null;

function startReorderPointerSession(e, li, folder, handle) {
  if (!li || !folder || !li.parentElement) return;
  if (activeReorderDrag) finishReorderPointerSession(false);

  const rect = li.getBoundingClientRect();
  activeReorderDrag = {
    pointerId: e.pointerId,
    folder,
    handle,
    item: li,
    list: li.parentElement,
    placeholder: null,
    ghost: null,
    startX: e.clientX,
    startY: e.clientY,
    pointerOffsetY: e.clientY - rect.top,
    itemLeft: rect.left,
    didDrag: false,
    scrollContainer: document.getElementById('folder-list')
  };

  try { handle.setPointerCapture?.(e.pointerId); } catch {}
  document.addEventListener('pointermove', onReorderPointerMove);
  document.addEventListener('pointerup', onReorderPointerUp);
  document.addEventListener('pointercancel', onReorderPointerCancel);
}

function activateReorderPointerDrag(state, event) {
  if (state.didDrag) return;
  state.didDrag = true;

  const rect = state.item.getBoundingClientRect();
  const placeholder = document.createElement('li');
  placeholder.className = 'reorder-placeholder';
  placeholder.style.height = `${Math.ceil(rect.height)}px`;
  state.placeholder = placeholder;
  state.item.parentElement.insertBefore(placeholder, state.item.nextSibling);

  state.item.hidden = true;
  state.item.classList.add('reorder-source');

  const ghost = state.item.cloneNode(true);
  ghost.classList.add('reorder-ghost');
  ghost.style.width = `${Math.ceil(rect.width)}px`;
  state.ghost = ghost;
  document.body.appendChild(ghost);

  document.body.classList.add('reorder-drag-active');
  state.handle.classList.add('dragging');

  updateReorderGhostPosition(state, event.clientY);
  moveReorderPlaceholder(state, event.clientY);
}

function updateReorderGhostPosition(state, clientY) {
  if (!state.ghost) return;
  state.ghost.style.left = `${state.itemLeft}px`;
  state.ghost.style.top = `${clientY - state.pointerOffsetY}px`;
}

function autoScrollReorderList(state, clientY) {
  const container = state.scrollContainer;
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const edgeSize = 72;
  let delta = 0;

  if (clientY < rect.top + edgeSize) {
    delta = -Math.ceil((rect.top + edgeSize - clientY) / 14) * 10;
  } else if (clientY > rect.bottom - edgeSize) {
    delta = Math.ceil((clientY - (rect.bottom - edgeSize)) / 14) * 10;
  }

  if (delta !== 0) {
    container.scrollTop += delta;
  }
}

function moveReorderPlaceholder(state, clientY) {
  if (!state.placeholder || !state.list) return;
  autoScrollReorderList(state, clientY);

  const siblings = Array.from(state.list.children).filter((node) => node !== state.placeholder && node !== state.item);
  const target = siblings.find((node) => {
    const rect = node.getBoundingClientRect();
    return clientY < rect.top + (rect.height / 2);
  });

  if (target) state.list.insertBefore(state.placeholder, target);
  else state.list.appendChild(state.placeholder);
}

function onReorderPointerMove(e) {
  const state = activeReorderDrag;
  if (!state || e.pointerId !== state.pointerId) return;

  const dx = e.clientX - state.startX;
  const dy = e.clientY - state.startY;
  if (!state.didDrag) {
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
    activateReorderPointerDrag(state, e);
  }

  updateReorderGhostPosition(state, e.clientY);
  moveReorderPlaceholder(state, e.clientY);
}

function finishReorderPointerSession(commitOrder) {
  const state = activeReorderDrag;
  if (!state) return;

  document.removeEventListener('pointermove', onReorderPointerMove);
  document.removeEventListener('pointerup', onReorderPointerUp);
  document.removeEventListener('pointercancel', onReorderPointerCancel);
  try { state.handle.releasePointerCapture?.(state.pointerId); } catch {}

  if (state.item) {
    state.item.hidden = false;
    state.item.classList.remove('reorder-source');
  }
  if (state.placeholder && state.placeholder.parentElement) {
    state.placeholder.parentElement.insertBefore(state.item, state.placeholder);
    state.placeholder.remove();
  }
  if (state.ghost) state.ghost.remove();

  document.body.classList.remove('reorder-drag-active');
  state.handle?.classList.remove('dragging');

  const handleToSuppress = state.didDrag ? state.handle : null;
  const shouldCommit = Boolean(commitOrder && state.didDrag && state.list && state.folder);
  activeReorderDrag = null;

  if (shouldCommit) {
    const nextOrder = Array.from(state.list.children).map((node) => node.dataset.id).filter(Boolean);
    if (nextOrder.length) {
      const currentOrder = getFolderOrder(state.folder);
      const changed = nextOrder.length === currentOrder.length && nextOrder.some((key, index) => key !== currentOrder[index]);
      if (changed) {
        setFolderOrder(state.folder, nextOrder);
        saveStateDebounced();
        renderAll();
        showToast(__('Order updated'));
      }
    }
  }

  if (handleToSuppress) {
    handleToSuppress.dataset.skipClick = '1';
    setTimeout(() => {
      try { delete handleToSuppress.dataset.skipClick; } catch {}
    }, 0);
  }
}

function onReorderPointerUp(e) {
  const state = activeReorderDrag;
  if (!state || e.pointerId !== state.pointerId) return;
  finishReorderPointerSession(true);
}

function onReorderPointerCancel(e) {
  const state = activeReorderDrag;
  if (!state || e.pointerId !== state.pointerId) return;
  finishReorderPointerSession(false);
}

// ---------------------------- Autosave Pipeline ----------------------------
let autosaveInProgress = false;
let autosaveQueued = false;
let lastAutosaveTs = 0;
let lastUploadedBackupName = null; // name like save_YYYY-MM-DD_hh-mm-ss.json
let lastAppliedBackupName = null;  // last remote backup name that we loaded into app
let remotePollTimerId = null;
let modified = false; // tracks if user has made changes that need syncing
let connectionCheckerId = null; // interval ID for connection checker
let wasOffline = false; // tracks previous offline state

// ============ ROBUST SAVE QUEUE SYSTEM ============
let saveQueue = []; // Queue of pending changes
let saveRetryTimer = null;
let saveRetryCount = 0;
let firstFailureTime = null; // When the first save failure occurred
let saveModalShown = false; // Track if we're showing the critical save modal
let lastSuccessfulSaveTime = Date.now();
const MAX_RETRY_INTERVAL = 10000; // Max 10 seconds between retries
const SAVE_FAILURE_MODAL_THRESHOLD = 2000; // Show modal after 2 seconds of failures

// New robust save system - NEVER gives up
async function processSaveQueue() {
  if (!ENABLE_CLOUD) return;
  
  // Always show yellow/syncing when there are unsaved changes
  if (modified) {
    setSyncStatus('syncing');
  }
  
  if (autosaveInProgress) {
    // Already processing, will retry after current attempt
    return;
  }
  
  try {
    autosaveInProgress = true;
    
    // Attempt to save
    await saveSnapshot(false);
    await uploadBackupToCloud(true);
    
    // SUCCESS! Clear everything
    modified = false;
    saveRetryCount = 0;
    firstFailureTime = null;
    lastSuccessfulSaveTime = Date.now();
    
    // Hide the critical save modal if it was shown
    if (saveModalShown) {
      closeModal();
      saveModalShown = false;
      showToast(__('Changes saved successfully'), 2000);
    }
    
    // Only show green checkmark when truly saved
    setSyncStatus('synced');
    
  } catch (e) {
    console.warn('Save attempt failed, will retry:', e);
    
    // Track first failure
    if (!firstFailureTime) {
      firstFailureTime = Date.now();
    }
    
    const failureDuration = Date.now() - firstFailureTime;
    
    // Show critical modal if failing for more than 2 seconds
    if (failureDuration > SAVE_FAILURE_MODAL_THRESHOLD && !saveModalShown) {
      showCriticalSaveModal();
      saveModalShown = true;
    }
    
    // Keep status as syncing (yellow)
    setSyncStatus('syncing');
    
    // Calculate exponential backoff
    saveRetryCount++;
    const retryDelay = Math.min(1000 * Math.pow(1.5, saveRetryCount), MAX_RETRY_INTERVAL);
    
    // Schedule retry
    if (saveRetryTimer) clearTimeout(saveRetryTimer);
    saveRetryTimer = setTimeout(() => {
      processSaveQueue();
    }, retryDelay);
    
  } finally {
    autosaveInProgress = false;
  }
}

// Show critical modal warning user not to close app
function showCriticalSaveModal() {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalActions = document.getElementById('modal-actions');
  
  modalTitle.textContent = '⚠️ SAVE IN PROGRESS';
  modalTitle.style.color = '#dc2626';
  
  const body = document.createElement('div');
  body.style.textAlign = 'center';
  body.innerHTML = `
    <div style="background: #fee2e2; border: 2px solid #dc2626; padding: 20px; border-radius: 8px; margin: 10px 0;">
      <div style="font-size: 18px; font-weight: bold; color: #dc2626; margin-bottom: 10px;">
        ⚠️ SAVE FAILED - RETRYING...
      </div>
      <div style="color: #991b1b; margin-bottom: 15px;">
        DO NOT CLOSE THIS APP UNTIL CHANGES ARE SAVED
      </div>
      <div style="font-size: 14px; color: #7f1d1d;">
        Your changes are being saved. This may be due to network issues.
        <br/><br/>
        <strong>The app will keep trying until successful.</strong>
      </div>
      <div id="retry-status" style="margin-top: 15px; font-size: 13px; color: #991b1b;">
        Retrying...
      </div>
    </div>
  `;
  
  modalBody.innerHTML = '';
  modalBody.appendChild(body);
  
  // No actions - user cannot dismiss this modal
  modalActions.innerHTML = '';
  
  modal.classList.remove('hidden');
  
  // Update retry status periodically
  const updateRetryStatus = () => {
    if (!saveModalShown) return;
    const statusEl = document.getElementById('retry-status');
    if (statusEl) {
      const duration = Math.floor((Date.now() - firstFailureTime) / 1000);
      statusEl.textContent = `Retrying... (${duration}s since first failure, attempt ${saveRetryCount})`;
      setTimeout(updateRetryStatus, 1000);
    }
  };
  setTimeout(updateRetryStatus, 1000);
}

async function runAutosave(downloadAlso = false, forceUpload = false) {
  // This now just queues the save
  if (modified) {
    processSaveQueue();
  }
}

function scheduleAutosave() {
  // Mark as modified and trigger save queue
  if (modified) {
    processSaveQueue();
  }
}

// Connection checker: runs every 5 seconds to monitor connection and force sync when back online
function startConnectionChecker() {
  if (connectionCheckerId) clearInterval(connectionCheckerId);
  
  connectionCheckerId = setInterval(async () => {
    const isOnline = navigator.onLine;
    
    // Detect transition from offline to online
    if (wasOffline && isOnline) {
      console.log('Connection restored');
      
      // If we have pending changes, trigger save queue immediately
      if (modified) {
        console.log('Modified flag is true, triggering save queue');
        processSaveQueue();
      }
    }
    
    wasOffline = !isOnline;
    
    // Also check if we have unsaved changes and should retry
    if (isOnline && modified && !autosaveInProgress) {
      processSaveQueue();
    }
  }, 3000); // check every 3 seconds
}

// (moved: computeProductionInRange/exportProductionPDF defined later once)

function buildModalMenuHeader(iconText, title, subtitle = 'Select an action') {
  const wrap = document.createElement('div');
  wrap.className = 'modal-menu-header';

  const icon = document.createElement('div');
  icon.className = 'modal-menu-icon';
  icon.textContent = iconText;

  const copy = document.createElement('div');
  copy.className = 'modal-menu-copy';

  const titleEl = document.createElement('div');
  titleEl.className = 'modal-menu-title';
  titleEl.textContent = title;

  const subtitleEl = document.createElement('div');
  subtitleEl.className = 'modal-menu-subtitle';
  subtitleEl.textContent = subtitle;

  copy.appendChild(titleEl);
  copy.appendChild(subtitleEl);
  wrap.appendChild(icon);
  wrap.appendChild(copy);

  return wrap;
}

function openActionsMenu() {
  openModal({
    title: __('Actions'),
    bodyClassName: 'modal-body-compact',
    actionsLayout: 'stack',
    actions: [
      { label: '\uD83D\uDCCA  ' + __('Stock History'), onClick: () => openHistoryPage() },
      { label: '\u2B07  ' + __('Import JSON'), onClick: () => { document.getElementById('import-file').click(); } },
      { label: '\u2B06  ' + __('Export JSON'), onClick: () => { exportState(); } },
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

function clearAllCookies() {
  try {
    const parts = document.cookie.split(';');
    const host = location.hostname;
    const domains = [undefined, host, '.' + host];
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
  } catch {}
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
    setSyncStatus('syncing');
    const list = await listCloudBackups();
    if (!list.length) { return false; }
    list.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
    const latest = list.find(x => (x.name || '').toLowerCase().endsWith('.json')) || list[0];
    if (!latest) { return false; }
    const remote = await downloadBackupObject(latest.name);
    if (remote && typeof remote === 'object') {
      appState = remote;
      await writeState(appState);
      backupLoaded = true;
      modified = false; // clear modified flag when loading from cloud
      setSyncStatus('synced');
      return true;
    }
    return false;
  } catch (e) {
    setSyncStatus('error');
    return false;
  }
}

async function uploadBackupToCloud(forceUpload = false) {
  if (!ENABLE_CLOUD || !navigator.onLine) { return; }
  try {
    setSyncStatus('syncing');
    const ts = formatTs(Date.now());
    const fileName = `save_${ts}_${CLIENT_ID}.json`;
    const path = `${BACKUP_PREFIX}${fileName}`;
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
    setSyncStatus('synced');
    // Retention: keep only latest 3 backups
    await pruneBackups(3).catch(err => console.warn('Prune failed', err));
    lastUploadedBackupName = fileName;
    // Persist the latest name we created (so other tabs/devices can compare)
    try { localStorage.setItem(LAST_BACKUP_NAME_KEY, fileName); lastKnownBackupName = fileName; } catch {}
  } catch (e) {
    console.warn(e);
    setSyncStatus('error');
    throw e; // re-throw to let caller handle
  }
}

async function getLatestRemoteBackupName() {
  const list = await listCloudBackups();
  if (!Array.isArray(list) || !list.length) return null;
  const jsonOnly = list.filter(x => (x.name || '').toLowerCase().endsWith('.json'));
  if (!jsonOnly.length) return null;
  jsonOnly.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
  return jsonOnly[0].name || null;
}

async function applyRemoteBackupByName(name) {
  if (!name) return false;
  try {
    const remote = await downloadBackupObject(name);
    if (remote && typeof remote === 'object') {
      appState = remote;
      await writeState(appState);
      lastAppliedBackupName = name;
      try { localStorage.setItem(LAST_BACKUP_NAME_KEY, name); lastKnownBackupName = name; } catch {}
      // Close transient UI and re-render
      try { closeModal(); } catch {}
      try { closeEditor(); } catch {}
      renderAll();
      modified = false; // clear modified flag when loading from cloud
      setSyncStatus('synced');
      return true;
    }
  } catch (e) {
    console.warn('Apply remote backup failed', e);
    setSyncStatus('error');
  }
  return false;
}

async function startRemoteBackupWatcher() {
  if (!ENABLE_CLOUD) return;
  // Do not pre-mark lastApplied to latest; rely on what we actually loaded
  // Restore last known backup name from storage for better first-check accuracy
  if (!lastAppliedBackupName && lastKnownBackupName) lastAppliedBackupName = lastKnownBackupName;
  if (remotePollTimerId) clearInterval(remotePollTimerId);
  remotePollTimerId = setInterval(async () => {
    if (!navigator.onLine) return;
    try {
      const latestName = await getLatestRemoteBackupName();
      if (!latestName) return;
      // If the latest remote backup is not ours and not already applied, refresh
      if (latestName !== lastUploadedBackupName && latestName !== lastAppliedBackupName) {
        // Skip if the latest backup clearly belongs to this client (filename contains CLIENT_ID)
        if (latestName.includes(CLIENT_ID)) {
          lastAppliedBackupName = latestName; // acknowledge
          return;
        }
        showToast('New version found, refreshing', 1000);
        setSyncStatus('syncing');
        const overlay = document.getElementById('refresh-overlay');
        try { overlay?.classList.add('show'); } catch {}
        try {
          await applyRemoteBackupByName(latestName);
        } finally {
          try { overlay?.classList.remove('show'); } catch {}
        }
      }
    } catch (e) {
      // Silent poll failures
    }
  }, 1000);
}

async function deleteBackupObject(name) {
  const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${BACKUP_PREFIX}${encodeURIComponent(name)}`;
  const res = await fetch(url, { method: 'DELETE', headers: storageHeaders() });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`Delete failed (${res.status}) ${msg}`);
  }
}

async function pruneBackups(maxKeep = 3) {
  const list = await listCloudBackups();
  if (!Array.isArray(list) || list.length <= maxKeep) return;
  // Prefer updated_at; fallback to sorting by name descending (timestamped filenames)
  const jsonOnly = list.filter(x => (x.name || '').toLowerCase().endsWith('.json'));
  jsonOnly.sort((a, b) => {
    const au = new Date(a.updated_at || 0).getTime();
    const bu = new Date(b.updated_at || 0).getTime();
    if (au !== bu) return bu - au; // newest first
    return (b.name || '').localeCompare(a.name || ''); // fallback
  });
  const toDelete = jsonOnly.slice(maxKeep);
  for (const obj of toDelete) {
    try { await deleteBackupObject(obj.name); } catch (e) { console.warn('Delete failed for', obj.name, e); }
  }
}

// ---------------------------- Confirmations & Edit Modals ----------------------------
function confirmDeleteProduct(productId) {
  const p = appState.products[productId];
  openModal({
    title: 'Delete Product',
    headerIcon: { symbol: '\u2716', color: 'red' },
    size: 'small',
    body: `Are you sure you want to delete "${p?.name || 'Product'}"?`,
    actions: [
      { label: __('Delete'), tone: 'danger', onClick: () => { deleteProduct(productId); } },
      { label: __('Cancel'), tone: 'secondary' }
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
    headerIcon: { symbol: '\u2716', color: 'red' },
    size: 'small',
    body: `Delete folder "${f?.name || 'Folder'}" and everything inside?`,
    actions: [
      { label: __('Delete'), tone: 'danger', onClick: () => { deleteFolder(folderId); } },
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

// ---------------------------- Dynamic Link Helpers ----------------------------
function getProductParentFolder(productId) {
  for (const fid in appState.folders) {
    const f = appState.folders[fid];
    if (f.products && f.products.includes(productId)) return f;
  }
  return null;
}

function isProductInIndependentFolder(productId) {
  const parent = getProductParentFolder(productId);
  return parent?.isIndependent || false;
}

function getAllSellableProducts() {
  // Return products NOT in independent folders
  const sellable = [];
  for (const pid in appState.products) {
    if (!isProductInIndependentFolder(pid)) {
      sellable.push(appState.products[pid]);
    }
  }
  return sellable.sort((a, b) => a.name.localeCompare(b.name));
}

function getAllNonIndependentFolders() {
  const folders = [];
  for (const fid in appState.folders) {
    const f = appState.folders[fid];
    if (!f.isIndependent && fid !== 'root') {
      folders.push(f);
    }
  }
  return folders.sort((a, b) => a.name.localeCompare(b.name));
}

function isProductInFolder(productId, folderId) {
  // Check if product is in folder or any of its subfolders
  const checkFolder = (fid) => {
    const f = appState.folders[fid];
    if (!f) return false;
    if (f.products && f.products.includes(productId)) return true;
    for (const subfid of f.subfolders || []) {
      if (checkFolder(subfid)) return true;
    }
    return false;
  };
  return checkFolder(folderId);
}

function getProductsUsingComponent(componentId) {
  // Components have dynamicLinks that point TO the products/folders they're used in
  // So we check THIS component's dynamicLinks array
  const usedIn = [];
  const component = appState.products[componentId];
  
  if (!component || !component.dynamicLinks || component.dynamicLinks.length === 0) {
    return usedIn;
  }
  
  // Loop through each link this component has
  for (const link of component.dynamicLinks) {
    if (link.type === 'product') {
      const product = appState.products[link.targetId];
      if (product) {
        usedIn.push({
          type: 'product',
          id: link.targetId,
          name: product.name,
          units: link.units || 1
        });
      }
    } else if (link.type === 'folder') {
      const folder = appState.folders[link.targetId];
      if (folder) {
        usedIn.push({
          type: 'folder',
          id: link.targetId,
          name: folder.name,
          units: link.units || 1
        });
      }
    }
  }
  
  return usedIn;
}

function processDynamicLinkDeductions(changedProductId, delta) {
  // When a sellable product quantity increases, subtract from linked components
  if (delta <= 0) return; // Only process additions
  
  const changedProduct = appState.products[changedProductId];
  console.log(`[Dynamic Link] Processing deductions for product: ${changedProduct?.name} (ID: ${changedProductId}), delta: ${delta}`);
  
  const changedFolder = getProductParentFolder(changedProductId);
  let componentsUpdated = false;
  
  // Scan all products for dynamic links
  for (const pid in appState.products) {
    const component = appState.products[pid];
    
    // Skip if not a dynamic component in an independent folder
    if (!isProductInIndependentFolder(pid)) continue;
    if (!component.isDynamic) continue;
    if (!component.dynamicLinks || component.dynamicLinks.length === 0) continue;
    
    console.log(`[Dynamic Link] Checking component: ${component.name} (ID: ${pid}), links:`, component.dynamicLinks);
    
    // Check each link
    for (const link of component.dynamicLinks) {
      let shouldDeduct = false;
      
      if (link.type === 'product' && link.targetId === changedProductId) {
        shouldDeduct = true;
        console.log(`[Dynamic Link] ✓ Component ${component.name} links to this product directly`);
      } else if (link.type === 'folder' && changedFolder && isProductInFolder(changedProductId, link.targetId)) {
        shouldDeduct = true;
        console.log(`[Dynamic Link] ✓ Component ${component.name} links to folder containing this product`);
      }
      
      if (shouldDeduct) {
        const deduction = delta * (link.units || 1);
        const oldQty = Number(component.quantity || 0);
        const newQty = Math.max(0, oldQty - deduction);
        console.log(`[Dynamic Link] Deducting from ${component.name}: ${oldQty} - ${deduction} = ${newQty}`);
        component.quantity = newQty;
        recordInventoryEvent({
          eventType: 'dynamic_deduction',
          productId: component.id,
          productName: component.name || 'Component',
          relatedProductId: changedProductId,
          relatedProductName: changedProduct?.name || null,
          delta: -deduction,
          price: Number(component.price || 0),
          value: Number(component.price || 0) * -deduction,
          source: 'dynamic_link',
          note: changedProduct?.name ? `Auto-deducted because ${changedProduct.name} was increased.` : 'Auto-deducted by a dynamic link.'
        });
        componentsUpdated = true;
      }
    }
  }
  
  if (componentsUpdated) {
    console.log('[Dynamic Link] Components updated, saving state');
  } else {
    console.log('[Dynamic Link] No components were updated');
  }
}

function openProductEditModal(productId) {
  const p = appState.products[productId];
  if (!p) return;
  const inIndependentFolder = isProductInIndependentFolder(productId);
  
  // Initialize dynamic link data if not exists - track if we modified anything
  let needsInitSave = false;
  if (!p.dynamicLinks) { p.dynamicLinks = []; needsInitSave = true; }
  if (p.isDynamic === undefined) { p.isDynamic = false; needsInitSave = true; }
  if (p.warnThreshold === undefined) { p.warnThreshold = 0; needsInitSave = true; }
  
  // Only save if we actually initialized new properties
  if (needsInitSave) {
    saveStateDebounced();
  }
  
  const wrap = document.createElement('div');
  
  // Name input
  const nameGroup = document.createElement('div');
  nameGroup.className = 'modal-form-group';
  const nameLabel = document.createElement('label');
  nameLabel.className = 'modal-form-label';
  nameLabel.textContent = __('Name');
  const nameInput = document.createElement('input');
  nameInput.className = 'modal-input';
  nameInput.type = 'text';
  nameInput.value = p.name || '';
  nameInput.addEventListener('focus', () => { try { nameInput.select(); } catch {} });
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  wrap.appendChild(nameGroup);

  // Dynamic linking UI (only for products in independent folders)
  let dynamicCheckbox;
  if (inIndependentFolder) {
    const divider = document.createElement('div');
    divider.className = 'modal-divider';
    wrap.appendChild(divider);
    
    // Dynamic Component checkbox (switch style)
    const dynamicRow = document.createElement('label');
    dynamicRow.className = 'modal-check-row';
    dynamicCheckbox = document.createElement('input');
    dynamicCheckbox.type = 'checkbox';
    dynamicCheckbox.checked = p.isDynamic || false;
    const track = document.createElement('span');
    track.className = 'modal-check-track';
    const checkLabel = document.createElement('span');
    checkLabel.className = 'modal-check-label';
    checkLabel.textContent = __('Dynamic Component');
    dynamicRow.appendChild(dynamicCheckbox);
    dynamicRow.appendChild(track);
    dynamicRow.appendChild(checkLabel);
    wrap.appendChild(dynamicRow);

    // Hint text
    const hint = document.createElement('div');
    hint.className = 'modal-hint';
    hint.textContent = 'When enabled, this component will auto-deduct from stock when linked products are produced.';
    wrap.appendChild(hint);

    // Dynamic link UI container (hidden when dynamic is unchecked)
    const linkContainer = document.createElement('div');
    linkContainer.style.display = dynamicCheckbox.checked ? 'block' : 'none';

    // Warning threshold input
    const thresholdGroup = document.createElement('div');
    thresholdGroup.className = 'modal-form-group';
    const thresholdLabel = document.createElement('label');
    thresholdLabel.className = 'modal-form-label';
    thresholdLabel.textContent = __('Warning threshold');
    const thresholdInput = document.createElement('input');
    thresholdInput.id = 'edit-warn-threshold';
    thresholdInput.className = 'modal-input';
    thresholdInput.type = 'number';
    thresholdInput.step = '1';
    thresholdInput.min = '0';
    thresholdInput.value = p.warnThreshold || 0;
    thresholdInput.inputMode = 'numeric';
    thresholdInput.addEventListener('focus', () => { try { thresholdInput.select(); } catch {} });
    thresholdGroup.appendChild(thresholdLabel);
    thresholdGroup.appendChild(thresholdInput);
    linkContainer.appendChild(thresholdGroup);

    // Units info
    const unitsInfo = document.createElement('div');
    unitsInfo.className = 'modal-form-group';
    const unitsLabel = document.createElement('div');
    unitsLabel.className = 'modal-form-label';
    unitsLabel.textContent = 'Units per Item';
    const unitsHint = document.createElement('div');
    unitsHint.className = 'modal-hint';
    unitsHint.textContent = 'Set when adding a link below.';
    unitsInfo.appendChild(unitsLabel);
    unitsInfo.appendChild(unitsHint);

    // Add Link button
    const addLinkBtn = document.createElement('button');
    addLinkBtn.className = 'modal-file-btn';
    addLinkBtn.textContent = '+ Add Link';
    addLinkBtn.style.width = '100%';
    addLinkBtn.style.justifyContent = 'center';
    addLinkBtn.style.marginBottom = '8px';
    
    linkContainer.appendChild(addLinkBtn);
    linkContainer.appendChild(unitsInfo);

    // Link list display
    const linkList = document.createElement('div');
    linkList.className = 'modal-link-list';
    
    const renderLinkList = () => {
      linkList.innerHTML = '';
      if (!p.dynamicLinks || p.dynamicLinks.length === 0) {
        linkList.innerHTML = '<div class="modal-empty">No links added yet</div>';
        return;
      }
      p.dynamicLinks.forEach((link, idx) => {
        const item = document.createElement('div');
        item.className = 'modal-link-item';
        const targetName = link.type === 'product' ? (appState.products[link.targetId]?.name || '???') : (appState.folders[link.targetId]?.name || '???');
        const label = document.createElement('span');
        label.innerHTML = `<span class="modal-units-badge">${link.units}u</span> ${targetName} <span style="color:#94a3b8;font-size:12px">(${link.type})</span>`;
        const removeBtn = document.createElement('button');
        removeBtn.className = 'modal-link-remove';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => {
          openModal({
            title: 'Remove Link',
            body: 'Unlink will break quantity sync. OK?',
            headerIcon: { symbol: '!', color: 'red' },
            size: 'small',
            actions: [
              { label: __('Remove'), tone: 'danger', onClick: () => { p.dynamicLinks.splice(idx, 1); renderLinkList(); } },
              { label: __('Cancel') }
            ]
          });
        });
        item.appendChild(label);
        item.appendChild(removeBtn);
        linkList.appendChild(item);
      });
    };
    renderLinkList();
    linkContainer.appendChild(linkList);

    addLinkBtn.addEventListener('click', () => {
      openLinkSelectorModal((selectedType, selectedId, selectedUnits) => {
        // Check for duplicates
        const exists = p.dynamicLinks.some(l => l.type === selectedType && l.targetId === selectedId);
        if (exists) {
          showToast('This link already exists');
          return;
        }
        const units = Math.max(1, Number(selectedUnits || 1));
        p.dynamicLinks.push({ type: selectedType, targetId: selectedId, units });
        renderLinkList();
        showToast('Link added');
        saveStateDebounced();
        closeModal();
        if (productPageProductId === productId) {
          setTimeout(() => { openProductPage(productId); }, 100);
        }
      });
    });

    wrap.appendChild(linkContainer);

    // Toggle link UI visibility on checkbox change
    dynamicCheckbox.addEventListener('change', () => {
      linkContainer.style.display = dynamicCheckbox.checked ? 'block' : 'none';
    });
  }

  // Only show price and target for sellable products (not in independent folders)
  let priceInput, targetInput;
  if (!inIndependentFolder) {
    const divider = document.createElement('div');
    divider.className = 'modal-divider';
    wrap.appendChild(divider);
    
    const priceGroup = document.createElement('div');
    priceGroup.className = 'modal-form-group';
    const priceLabel = document.createElement('label');
    priceLabel.className = 'modal-form-label';
    priceLabel.textContent = __('Price') + ' ';
    const priceHint = document.createElement('span');
    priceHint.className = 'optional';
    priceHint.textContent = '(€)';
    priceLabel.appendChild(priceHint);
    priceInput = document.createElement('input');
    priceInput.className = 'modal-input';
    priceInput.type = 'number';
    priceInput.step = '0.01';
    priceInput.min = '0';
    priceInput.value = p.price || 0;
    priceInput.inputMode = 'decimal';
    priceInput.addEventListener('focus', () => { try { priceInput.select(); } catch {} });
    priceGroup.appendChild(priceLabel);
    priceGroup.appendChild(priceInput);
    wrap.appendChild(priceGroup);

    const targetGroup = document.createElement('div');
    targetGroup.className = 'modal-form-group';
    const targetLabel = document.createElement('label');
    targetLabel.className = 'modal-form-label';
    targetLabel.textContent = __('Target Quantity') + ' ';
    const targetHint = document.createElement('span');
    targetHint.className = 'optional';
    targetHint.textContent = '(pc)';
    targetLabel.appendChild(targetHint);
    targetInput = document.createElement('input');
    targetInput.className = 'modal-input';
    targetInput.type = 'number';
    targetInput.step = '1';
    targetInput.min = '0';
    targetInput.value = p.targetQuantity || 0;
    targetInput.inputMode = 'numeric';
    targetInput.addEventListener('focus', () => { try { targetInput.select(); } catch {} });
    targetGroup.appendChild(targetLabel);
    targetGroup.appendChild(targetInput);
    wrap.appendChild(targetGroup);
  }

  openModal({
    title: __('Edit Product'),
    headerIcon: { symbol: '\u270E', color: 'blue' },
    body: wrap,
    actions: [
      { label: __('Save'), onClick: () => {
          const dynamicCheckbox = wrap.querySelector('input[type="checkbox"]');
          const thresholdInput = wrap.querySelector('#edit-warn-threshold');
          const newWarnThreshold = thresholdInput ? Number(thresholdInput.value || 0) : 0;
          p.name = nameInput.value.trim() || p.name;
          p.isDynamic = dynamicCheckbox ? dynamicCheckbox.checked : false;
          if (!p.isDynamic) { p.dynamicLinks = []; }
          p.warnThreshold = newWarnThreshold;
          if (!inIndependentFolder) {
            p.price = priceInput ? Number(priceInput.value || 0) : (p.price || 0);
            p.targetQuantity = targetInput ? Number(targetInput.value || 0) : (p.targetQuantity || 0);
          }
          saveStateDebounced();
          closeModal();
          if (productPageProductId === productId) {
            setTimeout(() => { openProductPage(productId); }, 100);
          }
          renderFolderList();
        } },
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
  setTimeout(() => { try { nameInput.focus(); nameInput.select(); } catch {} }, 0);
}

function openLinkSelectorModal(onSelect) {
  const wrap = document.createElement('div');
  
  // Type selector (radio toggle)
  const typeGroup = document.createElement('div');
  typeGroup.className = 'modal-form-group';
  const typeLabel = document.createElement('div');
  typeLabel.className = 'modal-form-label';
  typeLabel.textContent = 'Link to';
  const typeToggle = document.createElement('div');
  typeToggle.className = 'modal-radio-group';
  
  const productLabel = document.createElement('label');
  productLabel.className = 'modal-radio-option';
  const productRadio = document.createElement('input');
  productRadio.type = 'radio'; productRadio.name = 'linkType'; productRadio.value = 'product'; productRadio.checked = true;
  const productText = document.createElement('span');
  productText.textContent = 'Product';
  productLabel.appendChild(productRadio);
  productLabel.appendChild(productText);
  
  const folderLabel = document.createElement('label');
  folderLabel.className = 'modal-radio-option';
  const folderRadio = document.createElement('input');
  folderRadio.type = 'radio'; folderRadio.name = 'linkType'; folderRadio.value = 'folder';
  const folderText = document.createElement('span');
  folderText.textContent = 'Folder';
  folderLabel.appendChild(folderRadio);
  folderLabel.appendChild(folderText);
  
  typeToggle.appendChild(productLabel);
  typeToggle.appendChild(folderLabel);
  typeGroup.appendChild(typeLabel);
  typeGroup.appendChild(typeToggle);
  wrap.appendChild(typeGroup);

  // Search input with results container
  const searchGroup = document.createElement('div');
  searchGroup.className = 'modal-form-group';
  const searchLabel = document.createElement('div');
  searchLabel.className = 'modal-form-label';
  searchLabel.textContent = 'Search & Select';
  
  const resultsWrap = document.createElement('div');
  resultsWrap.className = 'modal-search-results';
  
  const searchInput = document.createElement('input');
  searchInput.className = 'modal-input';
  searchInput.type = 'text';
  searchInput.placeholder = 'Type to search...';
  
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'modal-results-list';
  
  // Store the currently selected item
  let selectedItem = { id: '', name: '', type: '' };
  
  // Function to display results based on search
  const performSearch = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const type = productRadio.checked ? 'product' : 'folder';
    resultsContainer.innerHTML = '';
    
    if (type === 'product') {
      const products = getAllSellableProducts();
      const filteredProducts = searchTerm ? 
        products.filter(p => p.name.toLowerCase().includes(searchTerm)) : 
        products;
      
      if (filteredProducts.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'modal-empty';
        noResults.textContent = 'No products found';
        resultsContainer.appendChild(noResults);
      } else {
        filteredProducts.forEach(prod => {
          const resultItem = document.createElement('div');
          resultItem.className = 'modal-result-item';
          if (selectedItem.id === prod.id && selectedItem.type === 'product') {
            resultItem.classList.add('selected');
          }
          
          // Highlight matching text
          if (searchTerm) {
            const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            resultItem.innerHTML = prod.name.replace(regex, '<span class="modal-result-highlight">$1</span>');
          } else {
            resultItem.textContent = prod.name;
          }
          
          resultItem.addEventListener('click', () => {
            selectedItem = { id: prod.id, name: prod.name, type: 'product' };
            searchInput.value = prod.name;
            performSearch();
          });
          
          resultsContainer.appendChild(resultItem);
        });
      }
    } else {
      const folders = getAllNonIndependentFolders();
      const filteredFolders = searchTerm ? 
        folders.filter(f => f.name.toLowerCase().includes(searchTerm)) : 
        folders;
      
      if (filteredFolders.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'modal-empty';
        noResults.textContent = 'No folders found';
        resultsContainer.appendChild(noResults);
      } else {
        filteredFolders.forEach(folder => {
          const resultItem = document.createElement('div');
          resultItem.className = 'modal-result-item';
          if (selectedItem.id === folder.id && selectedItem.type === 'folder') {
            resultItem.classList.add('selected');
          }
          
          if (searchTerm) {
            const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            resultItem.innerHTML = folder.name.replace(regex, '<span class="modal-result-highlight">$1</span>');
          } else {
            resultItem.textContent = folder.name;
          }
          
          resultItem.addEventListener('click', () => {
            selectedItem = { id: folder.id, name: folder.name, type: 'folder' };
            searchInput.value = folder.name;
            performSearch();
          });
          
          resultsContainer.appendChild(resultItem);
        });
      }
    }
  };
  
  // Initial search results
  searchInput.addEventListener('input', performSearch);
  productRadio.addEventListener('change', () => {
    selectedItem = { id: '', name: '', type: '' };
    searchInput.value = '';
    performSearch();
  });
  folderRadio.addEventListener('change', () => {
    selectedItem = { id: '', name: '', type: '' };
    searchInput.value = '';
    performSearch();
  });
  
  resultsWrap.appendChild(searchInput);
  resultsWrap.appendChild(resultsContainer);
  searchGroup.appendChild(searchLabel);
  searchGroup.appendChild(resultsWrap);
  wrap.appendChild(searchGroup);
  
  // Perform initial search to populate results
  setTimeout(performSearch, 0);
  
  // Units input
  const unitsGroup = document.createElement('div');
  unitsGroup.className = 'modal-form-group';
  const unitsLabel = document.createElement('div');
  unitsLabel.className = 'modal-form-label';
  unitsLabel.textContent = 'Units used';
  const unitsHint = document.createElement('div');
  unitsHint.className = 'modal-hint';
  unitsHint.textContent = 'How many of this component per 1 finished product.';
  const unitsInput = document.createElement('input');
  unitsInput.className = 'modal-input';
  unitsInput.type = 'number';
  unitsInput.step = '1';
  unitsInput.min = '1';
  unitsInput.value = 1;
  unitsInput.inputMode = 'numeric';
  unitsInput.addEventListener('focus', () => { try { unitsInput.select(); } catch {} });
  unitsGroup.appendChild(unitsLabel);
  unitsGroup.appendChild(unitsHint);
  unitsGroup.appendChild(unitsInput);
  wrap.appendChild(unitsGroup);
  
  openModal({
    title: 'Add Link',
    headerIcon: { symbol: '\uD83D\uDD17', color: 'purple' },
    body: wrap,
    actions: [
      { label: __('Add'), onClick: () => {
          if (!selectedItem.id) { showToast('Please select an item'); return; }
          const units = Math.max(1, Number(unitsInput.value || 1));
          onSelect(selectedItem.type, selectedItem.id, units);
        } },
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

function openShopCategories() {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:grid;gap:12px;max-width:500px;';

  function renderCategories() {
    wrap.innerHTML = '';
    const cats = appState.shopCategories || [];

    // Add new group
    const addGroupRow = document.createElement('div');
    addGroupRow.style.cssText = 'display:flex;gap:6px;align-items:center;';
    const groupInput = document.createElement('input');
    groupInput.placeholder = __('New group name') || 'New group name';
    groupInput.style.cssText = 'flex:1;padding:6px 10px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;';
    const addGroupBtn = document.createElement('button');
    addGroupBtn.textContent = __('Add') || 'Add';
    addGroupBtn.style.cssText = 'padding:6px 14px;border-radius:8px;border:1px solid #0ea5e9;background:#0ea5e9;color:#fff;font-weight:700;cursor:pointer;';
    addGroupBtn.addEventListener('click', () => {
      const name = groupInput.value.trim();
      if (!name) return;
      appState.shopCategories.push({ id: uuid(), name, items: [] });
      groupInput.value = '';
      saveStateDebounced();
      renderCategories();
    });
    addGroupRow.appendChild(groupInput);
    addGroupRow.appendChild(addGroupBtn);
    wrap.appendChild(addGroupRow);

    if (!cats.length) {
      const empty = document.createElement('div');
      empty.textContent = __('No categories yet') || 'No categories yet';
      empty.style.cssText = 'color:#9ca3af;font-size:14px;text-align:center;padding:20px;';
      wrap.appendChild(empty);
      return;
    }

    for (const cat of cats) {
      const groupBox = document.createElement('div');
      groupBox.style.cssText = 'border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;';

      // Group header
      const header = document.createElement('div');
      header.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb;';
      const hTitle = document.createElement('span');
      hTitle.style.cssText = 'font-weight:700;font-size:14px;flex:1;';
      hTitle.textContent = cat.name;
      const delGroupBtn = document.createElement('button');
      delGroupBtn.textContent = '\u2715';
      delGroupBtn.style.cssText = 'border:none;background:transparent;color:#ef4444;cursor:pointer;font-size:16px;padding:2px 6px;border-radius:4px;';
      delGroupBtn.addEventListener('click', () => {
        appState.shopCategories = appState.shopCategories.filter(c => c.id !== cat.id);
        saveStateDebounced();
        renderCategories();
      });
      header.appendChild(hTitle);
      header.appendChild(delGroupBtn);
      groupBox.appendChild(header);

      // Items list
      const itemsDiv = document.createElement('div');
      itemsDiv.style.cssText = 'display:grid;gap:1px;background:#f3f4f6;';

      for (const item of (cat.items || [])) {
        const itemRow = document.createElement('div');
        itemRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 10px 6px 16px;background:#ffffff;';
        const iName = document.createElement('span');
        iName.style.cssText = 'flex:1;font-size:14px;';
        iName.textContent = item.name;
        const iPrice = document.createElement('span');
        iPrice.style.cssText = 'color:#6b7280;font-size:13px;font-weight:600;';
        iPrice.textContent = `${item.price}\u20AC`;
        const delItemBtn = document.createElement('button');
        delItemBtn.textContent = '\u2715';
        delItemBtn.style.cssText = 'border:none;background:transparent;color:#ef4444;cursor:pointer;font-size:12px;padding:2px 6px;border-radius:4px;';
        delItemBtn.addEventListener('click', () => {
          cat.items = cat.items.filter(i => i.id !== item.id);
          saveStateDebounced();
          renderCategories();
        });
        itemRow.appendChild(iName);
        itemRow.appendChild(iPrice);
        itemRow.appendChild(delItemBtn);
        itemsDiv.appendChild(itemRow);
      }

      // Add item row
      const addRow = document.createElement('div');
      addRow.style.cssText = 'display:flex;gap:6px;align-items:center;padding:6px 10px 6px 16px;background:#ffffff;';
      const itemInput = document.createElement('input');
      itemInput.placeholder = 'Ogrlica 06';
      itemInput.style.cssText = 'flex:1;padding:5px 8px;border-radius:6px;border:1px solid #d1d5db;font-size:13px;';
      const addItemBtn = document.createElement('button');
      addItemBtn.textContent = '+';
      addItemBtn.style.cssText = 'padding:4px 12px;border-radius:6px;border:1px solid #22c55e;background:#22c55e;color:#fff;font-weight:700;cursor:pointer;font-size:14px;';
      addItemBtn.addEventListener('click', () => {
        const name = itemInput.value.trim();
        if (!name) return;
        // Extract price from last number in name
        const nums = name.match(/\d+/g);
        const price = nums ? parseInt(nums[nums.length - 1], 10) : 0;
        cat.items.push({ id: uuid(), name, price });
        itemInput.value = '';
        saveStateDebounced();
        renderCategories();
      });
      addRow.appendChild(itemInput);
      addRow.appendChild(addItemBtn);
      itemsDiv.appendChild(addRow);

      groupBox.appendChild(itemsDiv);
      wrap.appendChild(groupBox);

      // Add item input keyboard support
      itemInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addItemBtn.click();
      });
    }
  }

  renderCategories();

  openModal({
    title: __('Shop Categories'),
    headerIcon: { symbol: '\uD83C\uDFEA', color: 'slate' },
    body: wrap,
    actions: [
      { label: __('Close'), tone: 'secondary' }
    ]
  });
}

function openEditInfoModal() {
  const set = appState.settings || {};
  const co = appState.companyInfo || {};
  
  const body = document.createElement('div'); body.className = 'settings-wrap';
  const makeFld = (label, html) => {
    const l = document.createElement('label'); l.className = 'set-col';
    l.innerHTML = `<div class="set-k">${label}</div>`; l.appendChild(html); return l;
  };
  
  const pInput = document.createElement('input'); pInput.type = 'number'; pInput.min = '0'; pInput.step = '1'; pInput.inputMode = 'numeric'; pInput.placeholder = '30000'; pInput.value = set.plannedValue ?? ''; pInput.style.cssText = 'width:100%;padding:6px 8px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;box-sizing:border-box;';
  const dInput = document.createElement('input'); dInput.type = 'date'; dInput.value = set.endDate ? new Date(set.endDate).toISOString().slice(0,10) : ''; dInput.style.cssText = 'width:100%;padding:6px 8px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;box-sizing:border-box;';
  const sdInput = document.createElement('input'); sdInput.type = 'date'; sdInput.value = set.seasonEndDate ? new Date(set.seasonEndDate).toISOString().slice(0,10) : ''; sdInput.style.cssText = 'width:100%;padding:6px 8px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;box-sizing:border-box;';
  
  const fields = [
    { key: 'name', label: 'Naziv tvrtke', val: co.name || '' },
    { key: 'address', label: 'Adresa', val: co.address || '' },
    { key: 'oib', label: 'OIB', val: co.oib || '' },
    { key: 'phone', label: 'Telefon', val: co.phone || '' },
    { key: 'email', label: 'Email', val: co.email || '' },
  ];
  const inputs = { planned: pInput, date: dInput, seasonEndDate: sdInput };
  
  body.appendChild(makeFld('Planirani iznos', pInput));
  body.appendChild(makeFld('Početak sezone', dInput));
  body.appendChild(makeFld('Kraj sezone', sdInput));
  for (const f of fields) {
    const inp = document.createElement('input'); inp.type = 'text'; inp.style.cssText = 'width:100%;padding:6px 8px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;box-sizing:border-box;';
    inp.value = f.val; inputs[f.key] = inp;
    body.appendChild(makeFld(f.label, inp));
  }
  
  openModal({
    title: 'Uredi podatke',
    headerIcon: { symbol: '\u270F', color: 'blue' },
    body, actionsLayout: 'stack',
    actions: [
      { label: 'Spremi', onClick: () => {
          appState.settings = appState.settings || {};
          appState.settings.plannedValue = Number(inputs.planned.value || 0);
          if (inputs.date.value) {
            appState.settings.endDate = new Date(`${inputs.date.value}T23:59:59`).toISOString();
          } else { appState.settings.endDate = null; }
          appState.settings.seasonEndDate = inputs.seasonEndDate?.value ? new Date(`${inputs.seasonEndDate.value}T23:59:59`).toISOString() : null;
          appState.companyInfo = appState.companyInfo || {};
          for (const f of fields) {
            appState.companyInfo[f.key] = (inputs[f.key]?.value || '').trim();
          }
          recomputeDailyGoalNow(); saveStateDebounced(); renderAll();
          showToast('Podaci spremljeni');
          closeModal(); closeModal(); // close edit + refresh settings
          openSettings();
      }},
      { label: 'Odustani', tone: 'secondary' }
    ]
  });
}

function openSettings() {
  const wrap = document.createElement('div');
  wrap.className = 'settings-wrap';
  
  const set = appState.settings || {};
  const co = appState.companyInfo || {};
  const plannedVal = set.plannedValue ? Number(set.plannedValue).toLocaleString('hr-HR') + ' \u20AC' : '\u2014';
  const endDateStr = set.endDate ? new Date(set.endDate).toLocaleDateString('hr-HR') : '\u2014';
  const seasonEndStr = set.seasonEndDate ? new Date(set.seasonEndDate).toLocaleDateString('hr-HR') : '\u2014';
  
  // ── Info display card ──────────────────────────────────────
  const infoCard = document.createElement('div');
  infoCard.style.cssText = 'background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:10px;';
  
  const infoHeader = document.createElement('div');
  infoHeader.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:8px;';
  infoHeader.innerHTML = `<span style="font-weight:700;font-size:14px;flex:1;">Podaci o poslovanju</span>`;
  const editBtn = document.createElement('button');
  editBtn.textContent = '\u270F Uredi podatke';
  editBtn.style.cssText = 'padding:4px 10px;border-radius:6px;border:1px solid #0ea5e9;background:#e0f2fe;color:#0369a1;font-weight:700;font-size:12px;cursor:pointer;';
  editBtn.addEventListener('click', () => { closeModal(); openEditInfoModal(); });
  infoHeader.appendChild(editBtn);
  infoCard.appendChild(infoHeader);
  
  const infoGrid = document.createElement('div');
  infoGrid.style.cssText = 'display:grid;grid-template-columns:auto 1fr;gap:3px 12px;font-size:13px;';
  const addRow = (label, value) => {
    infoGrid.innerHTML += `<span style="color:#6b7280;">${label}:</span><span style="font-weight:600;">${value}</span>`;
  };
  addRow('Planirani iznos', plannedVal);
  addRow('Početak sezone', endDateStr);
  addRow('Kraj sezone', seasonEndStr);
  infoGrid.innerHTML += `<span style="color:#6b7280;padding-top:4px;border-top:1px dashed #d1d5db;">Naziv tvrtke:</span><span style="font-weight:600;padding-top:4px;border-top:1px dashed #d1d5db;">${co.name || '\u2014'}</span>`;
  infoGrid.innerHTML += `<span style="color:#6b7280;">Adresa:</span><span style="font-weight:600;">${co.address || '\u2014'}`;
  infoGrid.innerHTML += `<span style="color:#6b7280;">OIB:</span><span style="font-weight:600;">${co.oib || '\u2014'}`;
  infoGrid.innerHTML += `<span style="color:#6b7280;">Telefon:</span><span style="font-weight:600;">${co.phone || '\u2014'}`;
  infoGrid.innerHTML += `<span style="color:#6b7280;">Email:</span><span style="font-weight:600;">${co.email || '\u2014'}`;
  infoCard.appendChild(infoGrid);
  wrap.appendChild(infoCard);
  
  // ── Season section ─────────────────────────────────────────
  const seasonGroup = document.createElement('div');
  seasonGroup.style.cssText = 'padding:8px 0;';
  seasonGroup.innerHTML = `<div style="font-weight:700;font-size:14px;margin-bottom:6px;">Sezona</div>`;
  const seasonBtns = document.createElement('div'); seasonBtns.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;';
  const makeBtn = (text, cls, cb) => { const b = document.createElement('button'); b.className = 'shop-action-btn' + (cls ? ' ' + cls : ''); b.textContent = text; b.addEventListener('click', cb); return b; };
  seasonBtns.appendChild(makeBtn('Izvještaj sezone', 'primary', openSeasonReports));
  seasonGroup.appendChild(seasonBtns);
  wrap.appendChild(seasonGroup);
  
  // ── Legal Documents ─────────────────────────────────────────
  const legalGroup = document.createElement('div');
  legalGroup.style.cssText = 'padding:4px 0;';
  legalGroup.appendChild(makeBtn('Zakonski dokumenti', '', openLegalDocuments));
  wrap.appendChild(legalGroup);
  
  // ── Shop Categories ────────────────────────────────────────
  const catGroup = document.createElement('div');
  catGroup.style.cssText = 'padding:4px 0;';
  catGroup.appendChild(makeBtn('Kategorije prodaje', '', () => { closeModal(); openShopCategories(); }));
  wrap.appendChild(catGroup);
  
  // ── Test data ──────────────────────────────────────────────
  const testGroup = document.createElement('div');
  testGroup.style.cssText = 'padding:4px 0;';
  testGroup.appendChild(makeBtn('Izbriši testne podatke', 'danger', deleteTestData));
  wrap.appendChild(testGroup);
  
  // ── Password change ─────────────────────────────────────────
  const pwdGroup = document.createElement('div');
  pwdGroup.style.cssText = 'padding:4px 0;';
  pwdGroup.appendChild(makeBtn('Promijeni lozinku', '', async () => {
    closeModal();
    const hash = getAuthHash();
    if (!hash) { showToast('Nema postavljene lozinke'); return; }
    
    const body = document.createElement('div'); body.className = 'settings-wrap';
    const oldInp = document.createElement('input'); oldInp.type = 'password'; oldInp.placeholder = 'Stara lozinka'; oldInp.style.cssText = 'width:100%;padding:8px 10px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;box-sizing:border-box;';
    const newInp = document.createElement('input'); newInp.type = 'password'; newInp.placeholder = 'Nova lozinka (min 8 znakova)'; newInp.style.cssText = 'width:100%;padding:8px 10px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;box-sizing:border-box;margin-top:8px;';
    const conInp = document.createElement('input'); conInp.type = 'password'; conInp.placeholder = 'Ponovi novu lozinku'; conInp.style.cssText = 'width:100%;padding:8px 10px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;box-sizing:border-box;margin-top:8px;';
    body.appendChild(oldInp); body.appendChild(newInp); body.appendChild(conInp);
    
    openModal({
      title: 'Promijeni lozinku', headerIcon: { symbol: '\uD83D\uDD11', color: 'slate' },
      body, actionsLayout: 'stack',
      actions: [
        { label: 'Spremi', onClick: async () => {
            const oldPwd = oldInp.value; const newPwd = newInp.value; const conPwd = conInp.value;
            if (!oldPwd || !newPwd || !conPwd) { showToast('Popunite sva polja'); return; }
            if (newPwd.length < AUTH_MIN_LENGTH) { showToast('Nova lozinka mora imati najmanje 8 znakova'); return; }
            if (newPwd !== conPwd) { showToast('Nove lozinke se ne podudaraju'); return; }
            if (await sha256(oldPwd) !== getAuthHash()) { showToast('Stara lozinka nije ispravna'); return; }
            setAuthHash(await sha256(newPwd));
            setAuthAttempts(0);
            closeModal(); showToast('Lozinka promijenjena');
        }},
        { label: __('Cancel'), tone: 'secondary' }
      ]
    });
  }));
  wrap.appendChild(pwdGroup);

  // ── Open modal ─────────────────────────────────────────────
  openModal({
    title: __('Settings'),
    headerIcon: { symbol: '\u2699', color: 'slate' },
    body: wrap,
    actions: [
      { label: __('Reset Stats'), tone: 'danger', onClick: () => showResetStatsConfirm() },
      { label: __('Show Report'), onClick: () => { setTimeout(() => openReportModal(), 0); } },
      { label: __('Save'), onClick: () => {
          const langSel = document.querySelector('.modal-header-lang');
          if (langSel) { setLang(langSel.value); }
          showToast(__('Settings saved'));
        } },
      { label: __('Close'), tone: 'secondary' }
    ]
  });
  
  // ── Inject language select into modal header ───────────────
  const headerEl = document.querySelector('.modal-header');
  // Remove any existing language select first
  const oldLangSel = headerEl?.querySelector('.modal-header-lang');
  if (oldLangSel) oldLangSel.remove();
  const closeBtn = document.getElementById('modal-close');
  if (headerEl && closeBtn) {
    const langSel = document.createElement('select');
    langSel.className = 'modal-header-lang';
    const oHr = document.createElement('option'); oHr.value = 'hr'; oHr.textContent = 'HR';
    const oEn = document.createElement('option'); oEn.value = 'en'; oEn.textContent = 'EN';
    langSel.appendChild(oHr); langSel.appendChild(oEn);
    langSel.value = currentLang;
    langSel.addEventListener('change', () => {
      setLang(langSel.value);
      showToast('Jezik promijenjen');
    });
    headerEl.insertBefore(langSel, closeBtn);
  }
}

function onSaveProductNote() {
  if (!productPageProductId) return;
  const p = appState.products[productPageProductId];
  if (!p) return;
  const val = document.getElementById('pp-note').value;
  
  // Only save if the note actually changed
  const oldNote = p.note || '';
  const newNote = val || '';
  
  if (oldNote !== newNote) {
    p.note = val;
    saveStateDebounced();
    // Re-render folder list to update pencil icon visibility
    renderFolderList();
    showToast(__('Note saved'));
  }
}

function formatDateHR(date) {
  const d = date || new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getYear() < 0 ? '' : d.getFullYear()}.`;
}

function dayLabel(n) {
  const num = Math.abs(n);
  if (currentLang === 'hr') {
    if (num % 10 === 1 && num % 100 !== 11) return `${num} dan`;
    return `${num} dana`;
  }
  return num === 1 ? `${num} day` : `${num} days`;
}

function showToast(message, timeout = 3000) {
  const c = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  c.appendChild(el);
  setTimeout(() => el.remove(), timeout);
}

function openModal({ title = 'Confirm', body = '', actions = [], actionsLayout = 'row', bodyClassName = '', headerIcon = null, size = '' } = {}) {
  modalStack++;
  document.body.style.overflow = 'hidden';
  // Clean up any leftover language select from Settings
  document.querySelector('.modal-header-lang')?.remove();
  const modal = document.getElementById('modal');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  const actionsEl = document.getElementById('modal-actions');
  const headerEl = document.querySelector('.modal-header');
  const contentEl = document.querySelector('.modal-content');
  const isStacked = actionsLayout === 'stack';
  
  // Remove existing header icon if any
  const oldIcon = headerEl?.querySelector('.modal-header-icon');
  if (oldIcon) oldIcon.remove();
  
  // Set header icon
  if (headerIcon) {
    const iconSpan = document.createElement('span');
    iconSpan.className = 'modal-header-icon';
    if (typeof headerIcon === 'object') {
      iconSpan.textContent = headerIcon.symbol || '';
      if (headerIcon.color) iconSpan.classList.add(headerIcon.color);
    } else {
      iconSpan.textContent = headerIcon;
    }
    headerEl?.insertBefore(iconSpan, titleEl);
  }
  
  // Set size class
  contentEl.className = 'modal-content';
  if (size) contentEl.classList.add(size);
  
  titleEl.textContent = title;
  bodyEl.className = bodyClassName || '';
  if (typeof body === 'string') {
    bodyEl.innerHTML = '';
    bodyEl.textContent = body;
  } else if (body) {
    bodyEl.innerHTML = '';
    bodyEl.appendChild(body);
  } else {
    bodyEl.innerHTML = '';
  }
  actionsEl.className = 'modal-actions';
  if (isStacked) actionsEl.classList.add('stacked');
  actionsEl.innerHTML = '';
  actions.forEach(a => {
    const b = document.createElement('button');
    b.textContent = a.label;
    const lbl = String(a.label || '').toLowerCase();
    const tone = a.tone || '';
    if (tone === 'secondary' || (!isStacked && (lbl.includes('cancel') || lbl.includes('close') || lbl.includes('back')))) {
      b.classList.add('secondary');
    }
    try {
      if (tone === 'danger' || lbl.includes('delete') || lbl.includes('remove') || lbl.includes('reset')) b.classList.add('danger');
    } catch {}
    b.addEventListener('click', async () => {
      try {
        if (a.keepOpen) {
          await a.onClick?.();
        } else {
          closeModal();
          await a.onClick?.();
        }
      } catch {}
    });
    actionsEl.appendChild(b);
  });
  modal.classList.remove('hidden');
}
let modalStack = 0;
function closeModal() {
  modalStack = Math.max(0, modalStack - 1);
  document.getElementById('modal').classList.add('hidden');
  if (modalStack === 0) document.body.style.overflow = '';
}

function setSyncStatus(status) {
  const el = document.getElementById('sync-status');
  if (!el) return;
  // reset
  el.classList.remove('status-active', 'status-ok', 'status-error', 'status-saved');
  el.textContent = '';
  
  const s = String(status || '').toLowerCase();
  
  // Only show visual status, no text labels
  if (s === 'syncing') {
    el.classList.add('status-active'); // yellow blinking
    el.setAttribute('aria-label', 'Syncing');
  } else if (s === 'synced') {
    el.classList.add('status-saved'); // green with checkmark
    el.textContent = '✓';
    el.setAttribute('aria-label', 'Synced');
  } else if (s === 'error') {
    el.classList.add('status-error'); // red
    el.setAttribute('aria-label', 'Sync error');
  } else {
    // neutral gray for idle/unknown states
    el.setAttribute('aria-label', 'Idle');
  }
}


function formatCurrency(value) {
  try {
    const n = Math.round(Number(value || 0));
    const formatted = new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
    return `${formatted}\u00A0€`;
  }
  catch {
    const n = Math.round(Number(value || 0));
    return `${n}\u00A0€`;
  }
}

function safeHistoryNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function getOverallBusinessStats() {
  const stats = computeStats('root');
  return {
    totalQty: safeHistoryNumber(stats?.totalQty),
    totalValue: safeHistoryNumber(stats?.totalValue)
  };
}

function computeFolderMovementStats(folderId) {
  const folder = appState.folders[folderId];
  if (!folder) return { totalQty: 0, totalValue: 0 };

  let totalQty = 0;
  let totalValue = 0;

  for (const pid of folder.products || []) {
    const product = appState.products[pid];
    if (!product) continue;
    const qty = safeHistoryNumber(product.quantity);
    const price = safeHistoryNumber(product.price);
    totalQty += qty;
    totalValue += qty * price;
  }

  for (const subfolderId of folder.subfolders || []) {
    const subStats = computeFolderMovementStats(subfolderId);
    totalQty += subStats.totalQty;
    totalValue += subStats.totalValue;
  }

  return { totalQty, totalValue };
}

function formatSignedQuantity(value) {
  const num = safeHistoryNumber(value);
  if (num > 0) return `+${num} pc`;
  return `${num} pc`;
}

function formatSignedCurrency(value) {
  const num = safeHistoryNumber(value);
  if (num > 0) return `+${formatCurrency(num)}`;
  if (num < 0) return `-${formatCurrency(Math.abs(num))}`;
  return formatCurrency(0);
}

function recordInventoryEvent(event = {}) {
  appState.productionLog = appState.productionLog || [];

  const stats = getOverallBusinessStats();
  const delta = safeHistoryNumber(event.delta);
  const price = safeHistoryNumber(event.price);
  const value = event.value !== undefined ? safeHistoryNumber(event.value) : delta * price;

  const entry = {
    id: event.id || uuid(),
    ts: event.ts || Date.now(),
    eventType: event.eventType || (delta > 0 ? 'manual_add' : delta < 0 ? 'manual_remove' : 'system'),
    productId: event.productId ?? null,
    productName: event.productName || (event.productId ? appState.products?.[event.productId]?.name || null : null),
    relatedProductId: event.relatedProductId ?? null,
    relatedProductName: event.relatedProductName || (event.relatedProductId ? appState.products?.[event.relatedProductId]?.name || null : null),
    folderId: event.folderId ?? null,
    folderName: event.folderName ?? null,
    delta,
    price,
    value,
    source: event.source || 'system',
    note: event.note || '',
    overallQty: event.overallQty !== undefined ? safeHistoryNumber(event.overallQty) : stats.totalQty,
    overallValue: event.overallValue !== undefined ? safeHistoryNumber(event.overallValue) : stats.totalValue,
  };

  appState.productionLog.push(entry);

  const historyPage = document.getElementById('history-page');
  if (historyPage && !historyPage.classList.contains('hidden')) {
    renderHistoryPage();
  }

  return entry;
}

function inferHistoryEventType(entry) {
  if (entry.eventType) return entry.eventType;
  if (entry.folderName || entry.folderId || entry.productId === null) return 'legacy_system_change';
  if (safeHistoryNumber(entry.delta) > 0) return 'manual_add';
  if (safeHistoryNumber(entry.delta) < 0) return 'manual_remove';
  return 'system';
}

function normalizeHistoryEntry(entry, index) {
  const delta = safeHistoryNumber(entry.delta);
  const price = safeHistoryNumber(entry.price);
  const value = entry.value !== undefined ? safeHistoryNumber(entry.value) : delta * price;

  return {
    id: entry.id || `legacy-${index}-${safeHistoryNumber(entry.ts)}`,
    ts: safeHistoryNumber(entry.ts),
    eventType: inferHistoryEventType(entry),
    productId: entry.productId ?? null,
    productName: entry.productName || (entry.productId ? appState.products?.[entry.productId]?.name || null : null),
    relatedProductId: entry.relatedProductId ?? null,
    relatedProductName: entry.relatedProductName || (entry.relatedProductId ? appState.products?.[entry.relatedProductId]?.name || null : null),
    folderId: entry.folderId ?? null,
    folderName: entry.folderName ?? null,
    delta,
    price,
    value,
    note: entry.note || '',
    source: entry.source || 'system',
    overallQty: entry.overallQty !== undefined ? safeHistoryNumber(entry.overallQty) : null,
    overallValue: entry.overallValue !== undefined ? safeHistoryNumber(entry.overallValue) : null,
    statusEstimated: false,
    _index: index,
  };
}

function getHistoryEntries() {
  const raw = Array.isArray(appState.productionLog) ? appState.productionLog : [];
  const asc = raw
    .map((entry, index) => normalizeHistoryEntry(entry, index))
    .sort((a, b) => (a.ts - b.ts) || (a._index - b._index));

  const currentStats = getOverallBusinessStats();
  let runningQty = currentStats.totalQty;
  let runningValue = currentStats.totalValue;

  for (let i = asc.length - 1; i >= 0; i -= 1) {
    const entry = asc[i];
    const hasStoredTotals = entry.overallQty !== null && entry.overallValue !== null;
    if (!hasStoredTotals) {
      entry.overallQty = runningQty;
      entry.overallValue = runningValue;
      entry.statusEstimated = true;
    }
    runningQty = safeHistoryNumber(entry.overallQty) - safeHistoryNumber(entry.delta);
    runningValue = safeHistoryNumber(entry.overallValue) - safeHistoryNumber(entry.value);
  }

  return asc.sort((a, b) => (b.ts - a.ts) || (b._index - a._index));
}

function formatHistoryTimestamp(ts) {
  const date = new Date(ts || 0);
  if (Number.isNaN(date.getTime())) return 'Unknown time';
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatHistoryTimeCompact(ts) {
  const date = new Date(ts || 0);
  if (Number.isNaN(date.getTime())) return '--:--';
  const pad = (n) => String(n).padStart(2, '0');
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const now = new Date();
  const isToday = date.getFullYear() === now.getFullYear() &&
                  date.getMonth() === now.getMonth() &&
                  date.getDate() === now.getDate();
  if (isToday) return `${hours}:${minutes}`;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[date.getMonth()]} ${date.getDate()} ${hours}:${minutes}`;
}

function formatHistoryDayLabel(ts) {
  const date = new Date(ts || 0);
  if (Number.isNaN(date.getTime())) return 'Unknown date';
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatHistoryDayKey(ts) {
  const date = new Date(ts || 0);
  if (Number.isNaN(date.getTime())) return 'unknown';
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatHistoryFilterDate(dateValue) {
  if (!dateValue) return 'All dates';
  const date = new Date(`${dateValue}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function createHistoryAnchorDate(dateValue) {
  if (!dateValue) return null;
  const date = new Date(`${dateValue}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getStartOfHistoryWeek(date) {
  const weekStart = new Date(date);
  const day = weekStart.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  weekStart.setDate(weekStart.getDate() + diff);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

function getHistoryRange(dateValue, periodMode = historyPeriodMode) {
  const anchorDate = createHistoryAnchorDate(dateValue);
  if (!anchorDate) return null;

  const start = new Date(anchorDate);
  const end = new Date(anchorDate);

  if (periodMode === 'week') {
    const weekStart = getStartOfHistoryWeek(anchorDate);
    start.setTime(weekStart.getTime());
    end.setTime(weekStart.getTime());
    end.setDate(end.getDate() + 7);
  } else if (periodMode === 'month') {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    end.setTime(start.getTime());
    end.setMonth(end.getMonth() + 1);
  } else {
    start.setHours(0, 0, 0, 0);
    end.setTime(start.getTime());
    end.setDate(end.getDate() + 1);
  }

  return { start, end };
}

function formatHistoryPeriodLabel(dateValue, periodMode = historyPeriodMode) {
  if (!dateValue) return 'All dates';
  const range = getHistoryRange(dateValue, periodMode);
  if (!range) return dateValue;

  if (periodMode === 'month') {
    return range.start.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long'
    });
  }

  if (periodMode === 'week') {
    const weekEnd = new Date(range.end);
    weekEnd.setDate(weekEnd.getDate() - 1);
    const sameMonth = range.start.getMonth() === weekEnd.getMonth() && range.start.getFullYear() === weekEnd.getFullYear();
    const startText = range.start.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: sameMonth ? undefined : 'numeric'
    });
    const endText = weekEnd.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return `${startText} - ${endText}`;
  }

  return formatHistoryFilterDate(dateValue);
}

function entryMatchesHistoryPeriod(entry, dateValue, periodMode = historyPeriodMode) {
  if (!dateValue) return true;
  const range = getHistoryRange(dateValue, periodMode);
  if (!range) return true;
  const entryTs = safeHistoryNumber(entry.ts);
  return entryTs >= range.start.getTime() && entryTs < range.end.getTime();
}

function getHistoryPeriodSummary(entries) {
  let doneValue = 0;
  let removedValue = 0;
  let netValue = 0;

  for (const entry of entries) {
    const value = safeHistoryNumber(entry.value);
    if (value > 0) doneValue += value;
    if (value < 0) removedValue += Math.abs(value);
    netValue += value;
  }

  return { doneValue, removedValue, netValue };
}

function updateHistoryPeriodControls() {
  const periodButtons = [
    { id: 'history-period-day', mode: 'day' },
    { id: 'history-period-week', mode: 'week' },
    { id: 'history-period-month', mode: 'month' },
  ];

  periodButtons.forEach(({ id, mode }) => {
    const button = document.getElementById(id);
    if (!button) return;
    button.classList.toggle('active', historyPeriodMode === mode);
  });

  const prevButton = document.getElementById('history-prev-period');
  const nextButton = document.getElementById('history-next-period');
  const suffix = historyPeriodMode === 'month' ? 'month' : historyPeriodMode;
  if (prevButton) prevButton.title = `Previous ${suffix}`;
  if (nextButton) nextButton.title = `Next ${suffix}`;
}

function setHistoryPeriodMode(periodMode) {
  historyPeriodMode = periodMode;
  updateHistoryPeriodControls();
  renderHistoryPage();
}

function shiftHistoryDateByPeriod(direction) {
  const dateInput = document.getElementById('history-date');
  if (!dateInput) return;

  const baseValue = dateInput.value || todayStr();
  const baseDate = new Date(`${baseValue}T12:00:00`);
  if (Number.isNaN(baseDate.getTime())) return;

  if (historyPeriodMode === 'month') {
    baseDate.setMonth(baseDate.getMonth() + direction);
  } else if (historyPeriodMode === 'week') {
    baseDate.setDate(baseDate.getDate() + (direction * 7));
  } else {
    baseDate.setDate(baseDate.getDate() + direction);
  }

  const pad = (n) => String(n).padStart(2, '0');
  dateInput.value = `${baseDate.getFullYear()}-${pad(baseDate.getMonth() + 1)}-${pad(baseDate.getDate())}`;
  renderHistoryPage();
}

function getHistoryBadgeLabel(entry) {
  switch (entry.eventType) {
    case 'manual_add': return __('Added');
    case 'manual_remove': return __('Removed');
    case 'editor_adjustment': return __('Edited');
    case 'dynamic_deduction': return __('Deducted');
    case 'product_deleted': return __('Deleted');
    case 'folder_deleted': return __('Folder deleted');
    case 'reset_quantity': return __('Reset');
    case 'product_duplicated': return __('Duplicated');
    case 'import_state': return __('Import');
    case 'legacy_system_change': return __('Legacy');
    default: return safeHistoryNumber(entry.delta) >= 0 ? __('Change') : __('Removed');
  }
}

function getHistoryBadgeTone(entry) {
  switch (entry.eventType) {
    case 'manual_add':
    case 'product_duplicated':
      return 'positive';
    case 'manual_remove':
    case 'product_deleted':
    case 'folder_deleted':
    case 'reset_quantity':
      return 'negative';
    case 'dynamic_deduction':
      return 'warning';
    case 'editor_adjustment':
      return safeHistoryNumber(entry.delta) >= 0 ? 'positive' : 'negative';
    default:
      return 'neutral';
  }
}

function getHistoryPrimaryText(entry) {
  if (entry.eventType === 'folder_deleted') return entry.folderName || 'Deleted folder';
  if (entry.eventType === 'import_state') return 'Imported JSON state';
  return entry.productName || entry.folderName || 'Inventory event';
}

function getHistoryDescription(entry) {
  const amount = Math.abs(safeHistoryNumber(entry.delta));
  switch (entry.eventType) {
    case 'manual_add':
      return `Added ${amount} pc from the product page.`;
    case 'manual_remove':
      return `Removed ${amount} pc from the product page.`;
    case 'editor_adjustment':
      return `Saved a direct quantity edit of ${formatSignedQuantity(entry.delta)}.`;
    case 'dynamic_deduction':
      return entry.relatedProductName
        ? `Automatic deduction of ${amount} pc because ${entry.relatedProductName} was increased.`
        : `Automatic deduction of ${amount} pc from a dynamic component.`;
    case 'product_deleted':
      return `Deleted the product and removed ${amount} pc that were still in stock.`;
    case 'folder_deleted':
      return `Deleted the folder and removed ${amount} pc from it and its subfolders.`;
    case 'reset_quantity':
      return `Reset quantity from ${amount} pc to 0.`;
    case 'product_duplicated':
      return entry.note || `Duplicated a product with starting quantity ${amount} pc.`;
    case 'import_state':
      return entry.note || 'Merged imported JSON data into the current state.';
    case 'legacy_system_change':
      return entry.note || 'Legacy system change from existing history data.';
    default:
      if (entry.note) return entry.note;
      if (safeHistoryNumber(entry.delta) > 0) return `Legacy addition of ${amount} pc.`;
      if (safeHistoryNumber(entry.delta) < 0) return `Legacy removal of ${amount} pc.`;
      return 'Legacy inventory event.';
  }
}

function matchesHistoryQuery(entry, query) {
  if (!query) return true;
  const haystack = [
    entry.productName,
    entry.folderName,
    entry.relatedProductName,
    entry.note,
    getHistoryBadgeLabel(entry),
    getHistoryDescription(entry)
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
}

function createHistoryChip(label, value) {
  const chip = document.createElement('div');
  chip.className = 'history-chip';
  const labelEl = document.createElement('span');
  labelEl.className = 'history-chip-label';
  labelEl.textContent = label;
  const valueEl = document.createElement('span');
  valueEl.className = 'history-chip-value';
  valueEl.textContent = value;
  chip.appendChild(labelEl);
  chip.appendChild(valueEl);
  return chip;
}

function appendHistoryMetric(container, label, value, tone = '') {
  const metric = document.createElement('div');
  metric.className = `history-metric${tone ? ` ${tone}` : ''}`;
  const labelEl = document.createElement('div');
  labelEl.className = 'history-metric-label';
  labelEl.textContent = label;
  const valueEl = document.createElement('div');
  valueEl.className = 'history-metric-value';
  valueEl.textContent = value;
  metric.appendChild(labelEl);
  metric.appendChild(valueEl);
  container.appendChild(metric);
}

function renderHistoryPage() {
  const summaryEl = document.getElementById('history-summary');
  const listEl = document.getElementById('history-list');
  const searchInput = document.getElementById('history-search');
  const dateInput = document.getElementById('history-date');
  if (!summaryEl || !listEl) return;

  const query = (searchInput?.value || '').trim().toLowerCase();
  const selectedDate = dateInput?.value || '';
  const allEntries = getHistoryEntries();
  const periodEntries = selectedDate ? allEntries.filter(entry => entryMatchesHistoryPeriod(entry, selectedDate, historyPeriodMode)) : allEntries;
  const entries = query ? periodEntries.filter(entry => matchesHistoryQuery(entry, query)) : periodEntries;
  const currentStats = getOverallBusinessStats();
  const periodSummary = getHistoryPeriodSummary(periodEntries);

  /* ── Summary grid (Excel-like) ─────────────────────────── */
  summaryEl.innerHTML = '';

  const netTone = periodSummary.netValue > 0 ? 'positive' : periodSummary.netValue < 0 ? 'negative' : '';
  const row1 = [
    { label: __('Events'), value: String(allEntries.length) },
    { label: __('Showing'), value: String(entries.length) },
    { label: __('Period'), value: formatHistoryPeriodLabel(selectedDate, historyPeriodMode) },
    { label: __('Total Produced'), value: formatCurrency(periodSummary.doneValue), tone: 'positive' },
    { label: __('Total Removed'), value: formatCurrency(periodSummary.removedValue), tone: 'negative' },
    { label: __('Net Change'), value: formatSignedCurrency(periodSummary.netValue), tone: netTone },
  ];
  row1.forEach(d => {
    const cell = document.createElement('div');
    cell.className = 'history-summary-cell';
    const lbl = document.createElement('div');
    lbl.className = 'history-summary-label';
    lbl.textContent = d.label;
    const val = document.createElement('div');
    val.className = `history-summary-value${d.tone ? ' ' + d.tone : ''}`;
    val.textContent = d.value;
    cell.appendChild(lbl);
    cell.appendChild(val);
    summaryEl.appendChild(cell);
  });

  const row2 = [
    { label: __('Overall Qty'), value: `${currentStats.totalQty} pc`, span: 3 },
    { label: __('Overall Value'), value: formatCurrency(currentStats.totalValue), span: 3 },
  ];
  row2.forEach(d => {
    const cell = document.createElement('div');
    cell.className = `history-summary-cell history-summary-span${d.span}`;
    const lbl = document.createElement('div');
    lbl.className = 'history-summary-label';
    lbl.textContent = d.label;
    const val = document.createElement('div');
    val.className = 'history-summary-value';
    val.textContent = d.value;
    cell.appendChild(lbl);
    cell.appendChild(val);
    summaryEl.appendChild(cell);
  });

  /* ── Entry list ────────────────────────────────────────── */
  listEl.innerHTML = '';

  if (!entries.length) {
    const empty = document.createElement('div');
    empty.className = 'history-empty';
    const title = document.createElement('strong');
    title.textContent = allEntries.length ? __('No matching history events') : __('No history yet');
    const message = document.createElement('div');
    if (!allEntries.length) {
      message.textContent = 'Quantity changes, removals, deductions, and other stock events will appear here.';
    } else if (selectedDate && query) {
      message.textContent = `No history events matched your search in ${formatHistoryPeriodLabel(selectedDate, historyPeriodMode)}.`;
    } else if (selectedDate) {
      message.textContent = `No history events were recorded in ${formatHistoryPeriodLabel(selectedDate, historyPeriodMode)}.`;
    } else {
      message.textContent = 'Try a different search term to find product movements.';
    }
    empty.appendChild(title);
    empty.appendChild(message);
    listEl.appendChild(empty);
    return;
  }

  let currentDayKey = null;
  for (const entry of entries) {
    const dayKey = formatHistoryDayKey(entry.ts);
    if (dayKey !== currentDayKey) {
      currentDayKey = dayKey;
      const dayHeader = document.createElement('div');
      dayHeader.className = 'history-day';
      dayHeader.textContent = formatHistoryDayLabel(entry.ts);
      listEl.appendChild(dayHeader);
    }

    const delta = safeHistoryNumber(entry.delta);
    const value = safeHistoryNumber(entry.value);
    const direction = delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'neutral';
    const card = document.createElement('article');
    card.className = 'history-entry';
    card.dataset.direction = direction;

    /* Product image (32x32) */
    const product = entry.productId ? appState.products?.[entry.productId] : null;
    if (product?.imageUrl) {
      const img = document.createElement('img');
      img.className = 'history-entry-img';
      img.src = product.imageUrl;
      img.alt = '';
      card.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'history-entry-placeholder';
      ph.textContent = product?.name ? product.name.charAt(0).toUpperCase() : '?';
      card.appendChild(ph);
    }

    /* Badge */
    const badge = document.createElement('span');
    badge.className = `history-badge ${getHistoryBadgeTone(entry)}`;
    badge.textContent = getHistoryBadgeLabel(entry);
    card.appendChild(badge);

    /* Body (title + expandable details) */
    const body = document.createElement('div');
    body.className = 'history-entry-body';

    const row = document.createElement('div');
    row.className = 'history-entry-row';

    const title = document.createElement('span');
    title.className = 'history-entry-title';
    title.textContent = getHistoryPrimaryText(entry);
    row.appendChild(title);

    /* Delta inline */
    const dSpan = document.createElement('span');
    dSpan.className = `history-entry-delta ${direction}`;
    dSpan.textContent = formatSignedQuantity(delta);
    row.appendChild(dSpan);

    /* Value change inline */
    const vSpan = document.createElement('span');
    vSpan.className = `history-entry-delta ${value >= 0 ? 'positive' : 'negative'}`;
    vSpan.textContent = value >= 0 ? `(+${formatCurrency(value)})` : `(-${formatCurrency(Math.abs(value))})`;
    row.appendChild(vSpan);

    /* Causal product for deductions */
    if (entry.relatedProductName && entry.eventType === 'dynamic_deduction') {
      const causal = document.createElement('span');
      causal.className = 'history-entry-causal';
      causal.textContent = `\u2190 ${entry.relatedProductName}`;
      row.appendChild(causal);
    }

    /* Expand/collapse toggle */
    const expandBtn = document.createElement('button');
    expandBtn.className = 'history-entry-expand';
    expandBtn.type = 'button';
    expandBtn.textContent = '\u25B8';
    expandBtn.addEventListener('click', () => {
      const dl = body.querySelector('.history-entry-details');
      if (!dl) return;
      const hidden = dl.style.display === 'none' || !dl.style.display;
      dl.style.display = hidden ? 'block' : 'none';
      expandBtn.textContent = hidden ? '\u25BE' : '\u25B8';
      expandBtn.classList.toggle('expanded', hidden);
    });
    row.appendChild(expandBtn);

    body.appendChild(row);

    /* Details line (hidden by default) */
    const details = document.createElement('div');
    details.className = 'history-entry-details';
    details.style.display = 'none';
    const parts = [];
    if (entry.overallQty !== null) parts.push(`Qty: ${entry.overallQty} pc`);
    if (entry.overallValue !== null) parts.push(`Value: ${formatCurrency(entry.overallValue)}`);
    if (entry.note) parts.push(entry.note);
    if (entry.relatedProductName && entry.eventType !== 'dynamic_deduction') {
      parts.push(`From: ${entry.relatedProductName}`);
    }
    if (entry.statusEstimated) {
      details.textContent = parts.join('  \u00B7  ');
      details.appendChild(document.createTextNode('  '));
      const hint = document.createElement('span');
      hint.className = 'history-entry-hint';
      hint.textContent = 'Estimated';
      details.appendChild(hint);
    } else {
      details.textContent = parts.join('  \u00B7  ');
    }
    body.appendChild(details);

    card.appendChild(body);

    /* Compact time */
    const time = document.createElement('span');
    time.className = 'history-entry-time';
    time.textContent = formatHistoryTimeCompact(entry.ts);
    card.appendChild(time);

    /* Nav arrow */
    if (entry.productId && appState.products?.[entry.productId]) {
      const navBtn = document.createElement('button');
      navBtn.className = 'history-entry-nav';
      navBtn.type = 'button';
      navBtn.textContent = '\u2192';
      navBtn.addEventListener('click', () => {
        closeHistoryPage();
        openProductPage(entry.productId);
      });
      card.appendChild(navBtn);
    }

    listEl.appendChild(card);
  }
}

function openHistoryPage() {
  const page = document.getElementById('history-page');
  const searchInput = document.getElementById('history-search');
  if (!page) return;
  if (searchInput) searchInput.value = '';
  updateHistoryPeriodControls();
  renderHistoryPage();
  page.classList.remove('hidden');
  page.scrollTop = 0;
}

function closeHistoryPage() {
  const page = document.getElementById('history-page');
  if (!page) return;
  page.classList.add('hidden');
}

// Build a comprehensive, shareable text report of all folders and products
function generateAppReportText() {
  const lines = [];
  const settings = appState?.settings || {};
  const statsAll = computeStats('root');
  lines.push('Murano Product Manager — Report');
  lines.push('===============================');
  if (settings.plannedValue) lines.push(`Planned total: ${formatCurrency(settings.plannedValue)}`);
  if (settings.endDate) {
    const end = new Date(settings.endDate);
    const today = new Date(); today.setHours(0,0,0,0);
    const rawDays = Math.ceil((end.getTime() - today.getTime())/(1000*60*60*24));
    const daysLeft = Math.max(0, rawDays);
    lines.push(`End date: ${end.toISOString().slice(0,10)}  (Days left: ${daysLeft})`);
  }
  try { ensureDailyProgress(); } catch {}
  const fixedDailyGoal = Math.round(Number(appState?.dailyProgress?.fixedGoal || 0));
  if (fixedDailyGoal) lines.push(`Daily goal: ${formatCurrency(fixedDailyGoal)}`);
  lines.push(`Total quantity: ${statsAll.totalQty} pc`);
  lines.push(`Total value: ${formatCurrency(statsAll.totalValue)}`);
  lines.push('');

  function walk(folderId, depth = 0) {
    const indent = '  '.repeat(depth);
    const f = appState.folders[folderId];
    if (!f) return;
    const st = computeStats(folderId);
    lines.push(`${indent}Folder: ${f.name}  — Qty: ${st.totalQty}, Value: ${formatCurrency(st.totalValue)}`);
    for (const pid of f.products) {
      const p = appState.products[pid];
      if (!p) continue;
      const qty = Number(p.quantity || 0);
      const price = Number(p.price || 0);
      const val = qty * price;
      lines.push(`${indent}  • ${p.name} — Qty: ${qty}, Value: ${formatCurrency(val)}`);
    }
    for (const sf of f.subfolders) walk(sf, depth+1);
  }
  walk('root', 0);
  return lines.join('\n');
}

function openReportModal() {
  const wrap = document.createElement('div');
  wrap.style.display = 'grid';
  wrap.style.gap = '10px';
  const pre = document.createElement('textarea');
  pre.readOnly = true;
  pre.style.width = '100%'; pre.style.minHeight = '320px'; pre.style.padding = '10px';
  pre.style.border = '1px solid #d1d5db'; pre.style.borderRadius = '8px';
  pre.value = generateAppReportText();
  wrap.appendChild(pre);

  openModal({
    title: 'Report',
    body: wrap,
    actions: [
      { label: 'Copy', keepOpen: true, onClick: async () => {
          const doExecCopy = () => {
            try {
              const ta = document.createElement('textarea');
              ta.value = pre.value; ta.setAttribute('readonly', ''); ta.style.position = 'absolute'; ta.style.left = '-9999px';
              document.body.appendChild(ta); ta.select();
              const ok = document.execCommand('copy'); document.body.removeChild(ta);
              return ok;
            } catch { return false; }
          };
          if (doExecCopy()) { showToast('Report copied'); return; }
          try { await navigator.clipboard.writeText(pre.value); showToast('Report copied'); }
          catch { showToast('Copy failed'); }
        } },
      { label: 'Share', keepOpen: true, onClick: async () => {
          const payload = { title: 'Murano Report', text: pre.value };
          if (navigator.share) {
            try { await navigator.share(payload); showToast('Share opened'); return; }
            catch (err) { /* cancelled or unsupported */ }
          }
          // Fallback: copy to clipboard
          try {
            const ta = document.createElement('textarea'); ta.value = pre.value; ta.setAttribute('readonly',''); ta.style.position='absolute'; ta.style.left='-9999px'; document.body.appendChild(ta); ta.select();
            const ok = document.execCommand('copy'); document.body.removeChild(ta);
            if (ok) { showToast('Copied to clipboard'); return; }
          } catch {}
          try { await navigator.clipboard.writeText(pre.value); showToast('Copied to clipboard'); }
          catch { showToast('Share not supported'); }
        } },
      { label: 'Download', onClick: () => { try { const blob = new Blob([pre.value], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `murano_report_${new Date().toISOString().slice(0,10)}.txt`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); } catch {} } },
      { label: 'Close' }
    ]
  });
}

// Image resize to max WxH (returns dataURL)
function resizeImageToDataURL(file, maxW = 300, maxH = 300) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Crop to centered square then resize to 300x300
        const side = Math.min(img.width, img.height);
        const sx = Math.floor((img.width - side) / 2);
        const sy = Math.floor((img.height - side) / 2);
        const canvas = document.createElement('canvas');
        canvas.width = maxW;
        canvas.height = maxH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, sx, sy, side, side, 0, 0, maxW, maxH);
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
  modified = true; // mark as modified whenever any change is made
  
  // Immediately update UI to show unsaved state
  setSyncStatus('syncing');
  
  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(async () => {
    try {
      appState.lastModified = Date.now();
      await writeState(appState);
      // Trigger the robust save queue
      processSaveQueue();
    } catch (e) {
      console.error(e);
      // Even IndexedDB failures shouldn't stop us
      // We'll keep retrying
      processSaveQueue();
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
    products: {},
    productionLog: [],
    settings: { plannedValue: 0, endDate: null }
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

  // Skip stats if this folder is marked as independent
  if (folder.isIndependent) {
    return { totalQty: 0, totalValue: 0 };
  }

  // products in this folder
  for (const pid of folder.products) {
    const p = appState.products[pid];
    if (!p) continue;
    const qty = Number(p.quantity || 0);
    const price = Number(p.price || 0);
    totalQty += qty;
    totalValue += qty * price;
  }
  // subfolders (skip if subfolder is independent)
  for (const fid of folder.subfolders) {
    const sub = appState.folders[fid];
    if (sub && sub.isIndependent) continue; // skip independent subfolders
    const stats = computeStats(fid);
    totalQty += stats.totalQty;
    totalValue += stats.totalValue;
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
    span.textContent = (fid === 'root') ? __('Home') : (f?.name || __('Unknown'));
    span.addEventListener('click', () => {
      currentFolderId = fid;
      renderAll();
    });
    el.appendChild(span);
    if (idx < path.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'sep';
      sep.textContent = ' > ';
      el.appendChild(sep);
    }
  });
}

function renderFolderList(folderId = currentFolderId) {
  const container = document.getElementById('folder-list');
  container.innerHTML = '';
  // Reset stats bar
  const statsBar = document.getElementById('stats-bar');
  if (statsBar) statsBar.innerHTML = '';

  const rootUl = document.createElement('ul');
  rootUl.className = 'tree';

  const curFolder = appState.folders[folderId];
  if (!curFolder) return;

  // Always show stats bar (totals for entire database)
  if (statsBar) {
    const stats = computeStats('root');
    const wrap = document.createElement('div');
    wrap.className = 'stats-bar-inner';

    const settings = appState.settings || {};
    // Daily card first (if plan is set)
    if (settings.plannedValue && settings.endDate) {
      ensureDailyProgress();
      const currentValue = stats.totalValue;
      const startVal = Number(appState.dailyProgress?.startValue || 0);
      const addedToday = Math.max(0, Math.round(currentValue - startVal));
      const fixedDailyGoal = Number(appState.dailyProgress?.fixedGoal || 0);
      const remainingToday = Math.max(0, Math.round(fixedDailyGoal - addedToday));
      const extraToday = Math.max(0, Math.round(addedToday - fixedDailyGoal));

      const itemRemain = document.createElement('div');
      itemRemain.className = 'sb-item sb-daily';
      if (addedToday === 0) {
        itemRemain.innerHTML = `<div class="sb-col"><div class="sb-k">${__('Daily goal')}</div><div class="sb-v">${formatCurrency(fixedDailyGoal)}</div></div>`;
      } else if (addedToday < fixedDailyGoal) {
        itemRemain.innerHTML = `<div class="sb-col"><div class="sb-k sb-bad">${__('To do')}</div><div class="sb-v sb-bad">${formatCurrency(remainingToday)}</div></div>`;
      } else {
        itemRemain.innerHTML = `<div class="sb-col"><div class="sb-v sb-good" style="font-size:16px;">+${formatCurrency(extraToday)}</div></div>`;
      }
      wrap.appendChild(itemRemain);
    }

    // Then Days left
    if (settings.endDate) {
      const end = new Date(settings.endDate);
      const today = new Date(); today.setHours(0,0,0,0);
      const rawDays = Math.ceil((end.getTime() - today.getTime())/(1000*60*60*24));
      const daysLeft = Math.max(0, rawDays);
      const itemDays = document.createElement('div'); itemDays.className = 'sb-item'; itemDays.innerHTML = `<div class="sb-k">${__('Days left')}</div><div class="sb-v">${dayLabel(daysLeft)}</div>`;
      wrap.appendChild(itemDays);
    }

    // Finally totals: Qty and Value
    const itemQty = document.createElement('div'); itemQty.className = 'sb-item'; itemQty.innerHTML = `<div class="sb-k">${__('Total Qty')}</div><div class="sb-v">${stats.totalQty} ${__('pc')}</div>`;
    const itemVal = document.createElement('div'); itemVal.className = 'sb-item'; itemVal.innerHTML = `<div class="sb-k">${__('Total Value')}</div><div class="sb-v">${formatCurrency(stats.totalValue)}</div>`;
    wrap.appendChild(itemQty); wrap.appendChild(itemVal);

    statsBar.appendChild(wrap);
  }

  // Mixed order render (folders and products interleaved)
  const order = getFolderOrder(curFolder);
  const canReorderItems = order.length > 1;
  for (const key of order) {
    if (key.startsWith('f:')) {
      const fid = key.slice(2);
      const f = appState.folders[fid];
      if (!f) continue;
      const stats = computeStats(fid);
      const li = document.createElement('li');
      if (f.isIndependent) { li.classList.add('independent-folder'); }
      const left = document.createElement('div'); left.className = 'item-left';
      const icon = document.createElement('div'); icon.className = 'icon-box';
      if (f.imageUrl) { const img = document.createElement('img'); img.src = f.imageUrl; img.alt = 'folder'; icon.appendChild(img); }
      else { icon.textContent = '📁'; }
      const textCol = document.createElement('div'); textCol.className = 'text-col';
      const name = document.createElement('span'); name.className = 'name'; name.textContent = f.name;
      name.addEventListener('click', () => { currentFolderId = fid; renderAll(); });
      const meta = document.createElement('div'); meta.className = 'meta';
      const qtyLine = document.createElement('div'); qtyLine.className = 'meta-qty'; qtyLine.textContent = `${__('Qty:')} ${stats.totalQty}`;
      const valueLine = document.createElement('div'); valueLine.className = 'meta-value'; valueLine.textContent = formatCurrency(stats.totalValue);
      meta.appendChild(qtyLine); meta.appendChild(valueLine);
      textCol.appendChild(name); textCol.appendChild(meta);
      left.appendChild(icon); left.appendChild(textCol);
      left.style.cursor = 'pointer'; left.addEventListener('click', () => { currentFolderId = fid; renderAll(); });
      const actions = document.createElement('div'); actions.className = 'actions';
      const reorderBtn = createReorderHandle(li, curFolder, `f:${fid}`, f.name || 'Folder', !canReorderItems);
      const moreBtn = document.createElement('button'); moreBtn.textContent = '⋯'; moreBtn.title = __('More');
      moreBtn.addEventListener('click', (e) => { e.stopPropagation(); openFolderMenu(fid); });
      actions.appendChild(reorderBtn);
      actions.appendChild(moreBtn);
      li.appendChild(left); li.appendChild(actions); rootUl.appendChild(li);
    } else if (key.startsWith('p:')) {
      const pid = key.slice(2);
      const p = appState.products[pid];
      if (!p) continue;
      const pli = document.createElement('li');
      const leftp = document.createElement('div'); leftp.className = 'item-left';
      const picon = document.createElement('div'); picon.className = 'icon-box'; 
      if (p.imageUrl) { const im = document.createElement('img'); im.src = p.imageUrl; im.alt = 'product'; picon.appendChild(im); }
      else { picon.textContent = '📦'; }
      const ptext = document.createElement('div'); ptext.className = 'text-col'; 
      const pname = document.createElement('span'); pname.className = 'name'; pname.textContent = p.name;
      const pmeta = document.createElement('div'); pmeta.className = 'meta';
      const qty = Number(p.quantity || 0);
      const qtyLine = document.createElement('div'); qtyLine.className = 'meta-qty'; qtyLine.textContent = `${__('Qty:')} ${qty}`;
      
      // Check if this is in independent folder
      const isInIndependentFolder = isProductInIndependentFolder(p.id);
      
      if (!isInIndependentFolder) {
        // Only show value for products not in independent folders
        const price = Number(p.price || 0);
        const valueLine = document.createElement('div'); valueLine.className = 'meta-value'; valueLine.textContent = formatCurrency(qty * price);
        pmeta.appendChild(valueLine);
      } else if (p.isDynamic) {
        // Add link icon for dynamic components
        const linkIcon = document.createElement('div');
        linkIcon.className = 'meta-link';
        linkIcon.innerHTML = '🔗';
        linkIcon.style.marginLeft = '5px';
        linkIcon.title = __('Dynamic Component');
        qtyLine.appendChild(linkIcon);
      }
      
      pmeta.appendChild(qtyLine);
      ptext.appendChild(pname); ptext.appendChild(pmeta);
      leftp.appendChild(picon); leftp.appendChild(ptext);
      const actionsP = document.createElement('div'); actionsP.className = 'actions';
      // Add pencil icon if product has a note
      if (p.note && p.note.trim()) {
        const noteIcon = document.createElement('span'); noteIcon.textContent = '✏️'; noteIcon.setAttribute('aria-hidden', 'true');
        noteIcon.title = __('Has note');
        actionsP.appendChild(noteIcon);
      }
      const reorderBtnP = createReorderHandle(pli, curFolder, `p:${p.id}`, p.name || 'Product', !canReorderItems);
      const moreBtnP = document.createElement('button'); moreBtnP.textContent = '⋯'; moreBtnP.title = __('More');
      moreBtnP.addEventListener('click', (e) => { e.stopPropagation(); openProductMenu(p.id); });
      actionsP.appendChild(reorderBtnP);
      actionsP.appendChild(moreBtnP);
      leftp.style.cursor = 'pointer'; leftp.addEventListener('click', () => openProductPage(p.id));
      pli.appendChild(leftp); pli.appendChild(actionsP); rootUl.appendChild(pli);
    }
  }
  container.appendChild(rootUl);
}

function renderAll() {
  renderBreadcrumbs();
  renderFolderList();
  renderPriorityGraph();
  checkLowQuantityComponents();
  const historyPage = document.getElementById('history-page');
  if (historyPage && !historyPage.classList.contains('hidden')) {
    renderHistoryPage();
  }
}

// Find all products with warnThreshold set and check if they're below it
function checkLowQuantityComponents() {
  const lowQuantityProducts = [];
  
  for (const [productId, product] of Object.entries(appState.products || {})) {
    if (product.warnThreshold && product.warnThreshold > 0) {
      const quantity = Number(product.quantity || 0);
      if (quantity < product.warnThreshold) {
        lowQuantityProducts.push({
          id: productId,
          name: product.name,
          quantity: quantity,
          threshold: product.warnThreshold
        });
      }
    }
  }
  
  // Update warning icon visibility
  updateWarningIcon(lowQuantityProducts.length > 0);
  
  // Store for modal display
  window.lowQuantityProducts = lowQuantityProducts;
}

function updateWarningIcon(show) {
  let warningIcon = document.getElementById('warning-icon');
  
  // Create icon if it doesn't exist
  if (!warningIcon) {
    const midRightDiv = document.querySelector('#top-bar .mid-right');
    if (midRightDiv) {
      // Create simple red exclamation mark
      warningIcon = document.createElement('div');
      warningIcon.id = 'warning-icon';
      warningIcon.className = 'hidden';
      warningIcon.textContent = '!';
      warningIcon.style.display = 'inline-flex';
      warningIcon.style.alignItems = 'center';
      warningIcon.style.justifyContent = 'center';
      warningIcon.style.cursor = 'pointer';
      warningIcon.style.fontSize = '28px';
      warningIcon.style.fontWeight = '900';
      warningIcon.style.color = '#ef4444';
      warningIcon.style.lineHeight = '1';
      warningIcon.style.animation = 'warning-blink 1s ease-in-out infinite alternate';
      warningIcon.style.padding = '0 6px';
      midRightDiv.appendChild(warningIcon);
    }
  }
  
  if (!warningIcon) return;
  
  if (show) {
    warningIcon.classList.remove('hidden');
    warningIcon.style.display = 'inline-flex';
    warningIcon.onclick = showLowQuantityModal;
  } else {
    warningIcon.classList.add('hidden');
    warningIcon.style.display = 'none';
    warningIcon.onclick = null;
  }
}

function showLowQuantityModal() {
  const products = window.lowQuantityProducts || [];
  if (products.length === 0) return;
  
  const body = document.createElement('div');
  body.style.display = 'grid';
  body.style.gap = '12px';
  body.style.maxWidth = '500px';
  
  const title = document.createElement('div');
  title.textContent = '⚠️ Low Quantity Alert';
  title.style.fontWeight = '700';
  title.style.fontSize = '16px';
  title.style.color = '#ef4444';
  title.style.minWidth = '100%';
  title.style.textAlign = 'center';
  title.style.padding = '12px';
  title.style.borderBottom = '1px solid #ddd';
  body.appendChild(title);
  
  const list = document.createElement('div');
  list.style.display = 'grid';
  list.style.gap = '8px';
  list.style.maxHeight = 'calc(80vh - 200px)';
  list.style.overflowY = 'auto';
  
  products.forEach(product => {
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.justifyContent = 'space-between';
    item.style.alignItems = 'center';
    item.style.padding = '10px';
    item.style.background = '#fef2f2';
    item.style.border = '1px solid #fecaca';
    item.style.borderRadius = '6px';
    item.style.cursor = 'pointer';
    item.style.transition = 'all 0.2s';
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = product.name;
    nameSpan.style.fontWeight = '600';
    nameSpan.style.color = '#1f2937';
    nameSpan.style.flex = '1';
    
    const qtySpan = document.createElement('span');
    qtySpan.textContent = `${product.quantity} pc`;
    qtySpan.style.color = '#ef4444';
    qtySpan.style.fontWeight = '700';
    qtySpan.style.marginLeft = '10px';
    
    item.appendChild(nameSpan);
    item.appendChild(qtySpan);
    
    // Click to navigate to product
    item.addEventListener('click', () => {
      closeModal();
      openProductPage(product.id);
    });
    
    item.addEventListener('mouseenter', () => {
      item.style.background = '#fee2e2';
      item.style.borderColor = '#fca5a5';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.background = '#fef2f2';
      item.style.borderColor = '#fecaca';
    });
    
    list.appendChild(item);
  });
  
  body.appendChild(list);
  
  openModal({
    title: '',
    body: body
  });
}

function openFolderEditModal(folderId) {
  const f = appState.folders[folderId];
  if (!f) return;
  const wrap = document.createElement('div');
  
  // Name input
  const nameGroup = document.createElement('div');
  nameGroup.className = 'modal-form-group';
  const nameLabel = document.createElement('label');
  nameLabel.className = 'modal-form-label';
  nameLabel.textContent = __('Name');
  const nameInput = document.createElement('input');
  nameInput.className = 'modal-input';
  nameInput.type = 'text';
  nameInput.value = f.name || '';
  nameInput.addEventListener('focus', () => { try { nameInput.select(); } catch {} });
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  wrap.appendChild(nameGroup);

  // Image upload
  const imgGroup = document.createElement('div');
  imgGroup.className = 'modal-form-group';
  const imgLabel = document.createElement('label');
  imgLabel.className = 'modal-form-label';
  imgLabel.textContent = __('Image');
  const fileWrap = document.createElement('div');
  fileWrap.className = 'modal-file-wrap';
  const fileBtn = document.createElement('span');
  fileBtn.className = 'modal-file-btn';
  fileBtn.textContent = __('Choose Image');
  const imgInput = document.createElement('input');
  imgInput.type = 'file';
  imgInput.accept = 'image/*';
  imgInput.style.display = 'none';
  fileBtn.addEventListener('click', () => imgInput.click());
  fileWrap.appendChild(fileBtn);
  fileWrap.appendChild(imgInput);
  const preview = document.createElement('div');
  preview.className = 'modal-img-preview';
  if (f.imageUrl) {
    preview.innerHTML = `<img src="${f.imageUrl}" alt="folder" />`;
  }
  imgInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { const dataUrl = await resizeImageToDataURL(file, 300, 300); f.imageUrl = dataUrl; preview.innerHTML = `<img src="${f.imageUrl}" alt="folder" />`; saveStateDebounced(); }
    catch {}
  });
  imgGroup.appendChild(imgLabel);
  imgGroup.appendChild(fileWrap);
  imgGroup.appendChild(preview);
  wrap.appendChild(imgGroup);

  // "Make independent" checkbox (switch style)
  const indepRow = document.createElement('label');
  indepRow.className = 'modal-check-row';
  const indepCheckbox = document.createElement('input');
  indepCheckbox.type = 'checkbox';
  indepCheckbox.checked = f.isIndependent || false;
  const indepTrack = document.createElement('span');
  indepTrack.className = 'modal-check-track';
  const indepLabel = document.createElement('span');
  indepLabel.className = 'modal-check-label';
  indepLabel.textContent = __('Make independent (exclude from stats)');
  indepRow.appendChild(indepCheckbox);
  indepRow.appendChild(indepTrack);
  indepRow.appendChild(indepLabel);
  wrap.appendChild(indepRow);

  openModal({
    title: __('Edit Folder'),
    headerIcon: { symbol: '\uD83D\uDCC1', color: 'amber' },
    body: wrap,
    actions: [
      { label: __('Save'), onClick: () => {
          const newName = nameInput.value.trim();
          f.name = newName || f.name;
          f.isIndependent = indepCheckbox.checked;
          saveStateDebounced();
          renderAll();
        } },
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
  setTimeout(() => { try { nameInput.focus(); nameInput.select(); } catch {} }, 0);
}

// Create Product modal (name + optional image)
function openProductCreateModal(folderId) {
  const wrap = document.createElement('div');
  
  // Name input
  const nameGroup = document.createElement('div');
  nameGroup.className = 'modal-form-group';
  const nameLabel = document.createElement('label');
  nameLabel.className = 'modal-form-label';
  nameLabel.textContent = __('Name');
  const nameInput = document.createElement('input');
  nameInput.className = 'modal-input';
  nameInput.type = 'text';
  nameInput.value = '';
  nameInput.placeholder = 'Product name';
  nameInput.addEventListener('focus', () => { try { nameInput.select(); } catch {} });
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  wrap.appendChild(nameGroup);

  // Image upload
  const imgGroup = document.createElement('div');
  imgGroup.className = 'modal-form-group';
  const imgLabel = document.createElement('label');
  imgLabel.className = 'modal-form-label';
  imgLabel.textContent = __('Image') + ' ';
  const imgOpt = document.createElement('span');
  imgOpt.className = 'optional';
  imgOpt.textContent = '(optional)';
  imgLabel.appendChild(imgOpt);
  const fileWrap = document.createElement('div');
  fileWrap.className = 'modal-file-wrap';
  const fileBtn = document.createElement('span');
  fileBtn.className = 'modal-file-btn';
  fileBtn.textContent = __('Choose Image');
  const imgInput = document.createElement('input');
  imgInput.type = 'file';
  imgInput.accept = 'image/*';
  imgInput.style.display = 'none';
  fileBtn.addEventListener('click', () => imgInput.click());
  fileWrap.appendChild(fileBtn);
  fileWrap.appendChild(imgInput);
  const preview = document.createElement('div');
  preview.className = 'modal-img-preview';
  imgInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { const dataUrl = await resizeImageToDataURL(file, 300, 300); preview.innerHTML = `<img src="${dataUrl}" alt="product" />`; preview.dataset.src = dataUrl; }
    catch {}
  });
  imgGroup.appendChild(imgLabel);
  imgGroup.appendChild(fileWrap);
  imgGroup.appendChild(preview);
  wrap.appendChild(imgGroup);

  openModal({
    title: __('New Product'),
    headerIcon: { symbol: '\uD83D\uDCE6', color: 'green' },
    body: wrap,
    actions: [
      { label: 'Create', onClick: async () => {
          const id = uuid();
          const name = (nameInput.value || 'New Product').trim();
          const imageUrl = preview.dataset?.src || null;
          appState.products[id] = { id, name, price: 0, quantity: 0, note: '', imageUrl, targetQuantity: 0, priority: false };
          appState.folders[folderId].products.push(id);
          saveStateDebounced();
          renderAll();
        } },
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
  setTimeout(() => { try { nameInput.focus(); nameInput.select(); } catch {} }, 0);
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
    title.textContent = __('Edit Folder');
    const f = appState.folders[id];
    document.getElementById('editor-name').value = f?.name || '';
    document.getElementById('folder-fields').classList.remove('hidden');
    if (f?.imageUrl) {
      const prev = document.getElementById('folder-image-preview');
      prev.innerHTML = `<img src="${f.imageUrl}" alt="folder" />`;
      prev.classList.remove('hidden');
    }
  } else {
    title.textContent = id ? __('Edit Product') : __('New Product');
    const p = id ? appState.products[id] : { name: '', price: 0, quantity: 0, note: '', targetQuantity: 0, priority: false, shopCategory: '' };
    document.getElementById('editor-name').value = p.name || '';
    document.getElementById('editor-price').value = p.price ?? 0;
    document.getElementById('editor-quantity').value = p.quantity ?? 0;
    document.getElementById('editor-target').value = p.targetQuantity ?? 0;
    const prio = document.getElementById('editor-priority'); if (prio) prio.checked = !!p.priority;
    document.getElementById('product-fields').classList.remove('hidden');
    // Populate shop category dropdown
    const scSelect = document.getElementById('editor-shopcategory');
    if (scSelect) {
      scSelect.innerHTML = '<option value="">--</option>';
      for (const cat of (appState.shopCategories || [])) {
        for (const item of (cat.items || [])) {
          const opt = document.createElement('option');
          opt.value = item.id;
          opt.textContent = `${item.name} (${item.price}\u20AC) \u2014 ${cat.name}`;
          if (p.shopCategory === item.id) opt.selected = true;
          scSelect.appendChild(opt);
        }
      }
    }
    // Note is edited on product page; no custom fields UI
  }

  panel.classList.remove('hidden');
  // Back label
  const backBtn = document.getElementById('editor-close');
  if (backBtn) backBtn.textContent = '← ' + __('Back');
  // Focus and preselect name field
  const nameEl = document.getElementById('editor-name');
  setTimeout(() => { try { nameEl.focus(); nameEl.select(); } catch {} }, 0);
}

function closeEditor() {
  document.getElementById('editor-panel').classList.add('hidden');
  document.getElementById('main').classList.remove('with-editor');
}

function addCustomFieldRow(k = '', v = '') {
  const row = document.createElement('div');
  row.className = 'custom-field-row';
  const keyEl = document.createElement('input'); keyEl.placeholder = __('Key'); keyEl.value = k;
  const valEl = document.createElement('input'); valEl.placeholder = __('Value'); valEl.value = v;
  const del = document.createElement('button'); del.type = 'button'; del.textContent = __('Remove'); del.addEventListener('click', () => row.remove());
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
  openFolderEditModal(id);
}

function createProduct(folderId) {
  // Open creation modal instead of immediate creation
  openProductCreateModal(folderId);
}

function deleteFolder(folderId, options = {}) {
  const nested = !!options.nested;
  if (folderId === 'root') return showToast(__('Cannot delete root'));
  const f = appState.folders[folderId];
  if (!f) return;
  const folderName = f.name || 'Folder';
  const stats = computeFolderMovementStats(folderId);
  const removedValue = stats.totalValue || 0;
  const removedQty = stats.totalQty || 0;
  // recursively delete subfolders
  for (const sf of [...f.subfolders]) deleteFolder(sf, { nested: true });
  // delete products
  for (const pid of [...f.products]) delete appState.products[pid];
  // remove from parent
  const parent = appState.folders[f.parentId];
  if (parent) parent.subfolders = parent.subfolders.filter(x => x !== folderId);
  delete appState.folders[folderId];
  if (!nested && (removedValue > 0 || removedQty > 0)) {
    recordInventoryEvent({
      eventType: 'folder_deleted',
      folderId,
      folderName,
      delta: -removedQty,
      price: 0,
      value: -removedValue,
      source: 'delete',
      note: 'Deleted folder and removed its remaining stock.'
    });
  }
  if (!nested) {
    saveStateDebounced();
    renderAll();
  }
}

function deleteProduct(productId) {
  const p = appState.products[productId];
  if (!p) return;
  const productName = p.name || 'Product';
  // Compute value being removed for production log
  const removedValue = (Number(p.price || 0)) * (Number(p.quantity || 0));
  const removedQty = Number(p.quantity || 0);
  // find parent folder
  for (const f of Object.values(appState.folders)) {
    const idx = f.products.indexOf(productId);
    if (idx >= 0) { f.products.splice(idx, 1); break; }
  }
  delete appState.products[productId];
  // Log the removal as negative production
  if (removedValue > 0 || removedQty > 0) {
    recordInventoryEvent({
      eventType: 'product_deleted',
      productId,
      productName,
      delta: -removedQty,
      price: Number(p.price || 0),
      value: -removedValue,
      source: 'delete',
      note: 'Deleted product and removed remaining stock.'
    });
  }
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
    // Product save
    const p = id ? appState.products[id] : null;
    if (!p) return;
    const oldQty = Number(p.quantity || 0);
    p.name = name || p.name;
    p.price = Number(document.getElementById('editor-price').value || 0);
    p.quantity = Number(document.getElementById('editor-quantity').value || 0);
    p.targetQuantity = Number(document.getElementById('editor-target').value || 0);
    p.priority = !!document.getElementById('editor-priority').checked;
    const scSelect = document.getElementById('editor-shopcategory');
    if (scSelect) p.shopCategory = scSelect.value || '';
    if (p.quantity !== oldQty) {
      recordInventoryEvent({
        eventType: 'editor_adjustment',
        productId: p.id,
        productName: p.name || 'Product',
        delta: p.quantity - oldQty,
        price: Number(p.price || 0),
        value: (p.quantity - oldQty) * Number(p.price || 0),
        source: 'editor',
        note: 'Quantity was changed from the editor.'
      });
    }
    saveStateDebounced();
    renderAll();
    closeEditor();
  }
}

function onFolderImageSelected(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  resizeImageToDataURL(file, 300, 300).then((dataUrl) => {
    const id = document.getElementById('editor-entity-id').value;
    const f = appState.folders[id];
    if (!f) return;
    f.imageUrl = dataUrl;
    const prev = document.getElementById('folder-image-preview');
    prev.innerHTML = `<img alt="folder" src="${f.imageUrl}" />`;
    prev.classList.remove('hidden');
    saveStateDebounced();
  }).catch(() => {});
}

// ---------------------------- Menus ----------------------------
function openAddMenu(targetFolderId) {
  openModal({
    title: 'Dodaj mapu ili proizvod',
    bodyClassName: 'modal-body-compact',
    actionsLayout: 'stack',
    actions: [
      { label: __('New Folder'), onClick: () => createFolder(targetFolderId) },
      { label: __('New Product'), onClick: () => openProductCreateModal(targetFolderId) },
      { label: __('Cancel') }
    ]
  });
}

function openFolderMenu(folderId) {
  const folder = appState.folders[folderId];
  openModal({
    title: 'Folder actions',
    body: buildModalMenuHeader('📁', folder?.name || 'Folder', 'Choose what you want to do with this folder.'),
    bodyClassName: 'modal-body-compact',
    actionsLayout: 'stack',
    actions: [
      { label: __('Edit'), onClick: () => openFolderEditModal(folderId) },
      { label: 'New Subfolder', onClick: () => createFolder(folderId) },
      { label: __('New Product'), onClick: () => openProductCreateModal(folderId) },
      { label: __('Move to...'), onClick: () => openMoveDialog('folder', folderId) },
      { label: __('Delete'), onClick: () => confirmDeleteFolder(folderId) }
    ]
  });
}

function openProductMenu(productId) {
  const product = appState.products[productId];
  openModal({
    title: 'Product actions',
    body: buildModalMenuHeader('📦', product?.name || 'Product', 'Choose what you want to do with this product.'),
    bodyClassName: 'modal-body-compact',
    actionsLayout: 'stack',
    actions: [
      { label: __('Edit'), onClick: () => openProductEditModal(productId) },
      { label: 'Duplicate', onClick: () => duplicateProduct(productId) },
      { label: __('Move to...'), onClick: () => openMoveDialog('product', productId) },
      { label: (() => { const p = appState.products[productId]; return p?.priority ? 'Unmark priority' : 'Mark as priority'; })(), onClick: () => {
          const p = appState.products[productId]; if (!p) return; p.priority = !p.priority; saveStateDebounced(); renderAll();
        } },
      { label: __('Delete'), onClick: () => confirmDeleteProduct(productId) }
    ]
  });
}

function duplicateProduct(productId) {
  const p = appState.products[productId];
  if (!p) return;
  const id = uuid();
  const copy = { ...p, id, name: (p.name || 'Product') + ' (copy)' };
  appState.products[id] = copy;
  for (const f of Object.values(appState.folders)) {
    const idx = f.products.indexOf(productId);
    if (idx >= 0) { f.products.push(id); break; }
  }
  if (Number(copy.quantity || 0) > 0) {
    recordInventoryEvent({
      eventType: 'product_duplicated',
      productId: id,
      productName: copy.name || 'Product copy',
      delta: Number(copy.quantity || 0),
      price: Number(copy.price || 0),
      value: Number(copy.price || 0) * Number(copy.quantity || 0),
      source: 'duplicate',
      note: p.name ? `Duplicated from ${p.name}.` : 'Duplicated product.'
    });
  }
  saveStateDebounced();
  openProductEditModal(id);
}

function openMoveDialog(type, id) {
  const wrapper = document.createElement('div');
  const list = document.createElement('div');
  list.style.display = 'grid';
  list.style.gap = '6px';
  const radios = [];
  const addFolderOption = (fid, label, disabled) => {
    const row = document.createElement('label');
    row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.gap = '10px';
    row.style.padding = '8px 10px';
    row.style.borderRadius = '8px';
    row.style.border = '1px solid #e2e8f0';
    row.style.background = disabled ? '#f8fafc' : '#ffffff';
    row.style.cursor = disabled ? 'not-allowed' : 'pointer';
    row.style.opacity = disabled ? '0.5' : '1';
    row.style.transition = 'border-color 0.15s ease, background 0.15s ease';
    const r = document.createElement('input'); r.type = 'radio'; r.name = 'move-target'; r.value = fid; r.disabled = !!disabled;
    r.style.accentColor = '#3b82f6';
    const span = document.createElement('span');
    span.textContent = label;
    span.style.fontSize = '14px';
    span.style.fontWeight = disabled ? '400' : '600';
    span.style.color = disabled ? '#94a3b8' : '#0f172a';
    row.appendChild(r); row.appendChild(span);
    if (!disabled) {
      row.addEventListener('mouseenter', () => { row.style.borderColor = '#93c5fd'; row.style.background = '#f8faff'; });
      row.addEventListener('mouseleave', () => { row.style.borderColor = '#e2e8f0'; row.style.background = '#ffffff'; });
    }
    list.appendChild(row); radios.push(r);
  };
  const build = (fid, prefix) => {
    const f = appState.folders[fid];
    if (!f) return;
    const disabled = (type === 'folder' && (fid === id || isDescendantFolder(id, fid)));
    addFolderOption(fid, (prefix || '') + (f.name || 'Folder'), disabled);
    for (const sf of f.subfolders) build(sf, (prefix || '') + f.name + ' / ');
  };
  build('root', '');
  wrapper.appendChild(list);
  openModal({
    title: __('Move to...'),
    headerIcon: { symbol: '\u27A1', color: 'blue' },
    body: wrapper,
    actions: [
      { label: __('Confirm'), onClick: () => {
          const r = radios.find(x => x.checked);
          if (!r) return;
          const target = r.value;
          if (type === 'product') moveProductTo(id, target); else moveFolderTo(id, target);
        } },
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

function isDescendantFolder(folderId, maybeChildId) {
  if (folderId === maybeChildId) return true;
  const f = appState.folders[folderId];
  if (!f) return false;
  for (const sf of f.subfolders) {
    if (sf === maybeChildId) return true;
    if (isDescendantFolder(sf, maybeChildId)) return true;
  }
  return false;
}

function moveProductTo(productId, folderId) {
  const p = appState.products[productId];
  if (!p || !appState.folders[folderId]) return;
  for (const f of Object.values(appState.folders)) {
    const idx = f.products.indexOf(productId);
    if (idx >= 0) { f.products.splice(idx, 1); break; }
  }
  appState.folders[folderId].products.push(productId);
  saveStateDebounced();
  renderAll();
}

function moveFolderTo(folderId, targetFolderId) {
  if (folderId === 'root' || folderId === targetFolderId) return;
  const f = appState.folders[folderId];
  const target = appState.folders[targetFolderId];
  if (!f || !target) return;
  if (isDescendantFolder(folderId, targetFolderId)) return;
  const parent = appState.folders[f.parentId];
  if (parent) parent.subfolders = parent.subfolders.filter(x => x !== folderId);
  f.parentId = targetFolderId;
  target.subfolders.push(folderId);
  saveStateDebounced();
  renderAll();
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
      let addedFolders = 0;
      let updatedFolders = 0;
      let addedProducts = 0;
      let updatedProducts = 0;
      let mergedHistoryEntries = 0;

      const historySignature = (entry) => {
        const normalized = normalizeHistoryEntry(entry || {}, 0);
        return [
          normalized.ts,
          normalized.eventType,
          normalized.productId || '',
          normalized.productName || '',
          normalized.relatedProductId || '',
          normalized.folderId || '',
          normalized.delta,
          normalized.value,
          normalized.note || ''
        ].join('|');
      };

      const existingHistory = Array.isArray(appState.productionLog) ? appState.productionLog : [];
      const historySignatures = new Set(existingHistory.map(historySignature));

      // folders
      for (const [id, f] of Object.entries(data.folders || {})) {
        if (!appState.folders[id]) {
          appState.folders[id] = f;
          addedFolders += 1;
        } else {
          Object.assign(appState.folders[id], f);
          updatedFolders += 1;
        }
      }
      // products
      for (const [id, p] of Object.entries(data.products || {})) {
        if (!appState.products[id]) {
          appState.products[id] = p;
          addedProducts += 1;
        } else {
          Object.assign(appState.products[id], p);
          updatedProducts += 1;
        }
      }
      // history
      if (Array.isArray(data.productionLog) && data.productionLog.length) {
        appState.productionLog = appState.productionLog || [];
        for (const entry of data.productionLog) {
          const signature = historySignature(entry);
          if (historySignatures.has(signature)) continue;
          appState.productionLog.push(entry);
          historySignatures.add(signature);
          mergedHistoryEntries += 1;
        }
      }
      // ensure root exists
      if (!appState.folders.root) appState.folders.root = { id: 'root', name: 'Home', parentId: null, imageUrl: null, subfolders: [], products: [] };
      recordInventoryEvent({
        eventType: 'import_state',
        delta: 0,
        price: 0,
        value: 0,
        source: 'import',
        note: `Imported ${addedFolders} new folders, ${updatedFolders} updated folders, ${addedProducts} new products, ${updatedProducts} updated products, and ${mergedHistoryEntries} history entries.`
      });
      appState.lastModified = Date.now();
      await writeState(appState);
      showToast(__('Import complete'));
      renderAll();
    } catch (e) {
      console.error(e);
      showToast(__('Import failed: invalid JSON'));
      openModal({ title: 'Import failed', headerIcon: { symbol: '\u2716', color: 'red' }, size: 'small', body: 'Invalid JSON format.' });
    }
  };
  reader.readAsText(file);
}

// ---------------------------- Cloud Sync (Supabase Storage) ----------------------------
let pendingUpload = false;
let syncQueued = false;

function queueCloudSync() {
  if (!ENABLE_CLOUD) return;
  if (!navigator.onLine) { setSyncStatus('error'); return; }
  if (syncQueued) return;
  syncQueued = true;
  setTimeout(async () => {
    syncQueued = false;
    await uploadToCloud().catch(err => { console.warn(err); showToast('Cloud sync failed'); setSyncStatus('error'); });
  }, 800);
}

async function downloadFromCloud() {
  if (!ENABLE_CLOUD) return null;
  try {
    setSyncStatus('syncing');
    const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${FILE_PATH}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${SUPABASE_KEY}` } });
    if (!res.ok) { return null; }
    const data = await res.json();
    setSyncStatus('synced');
    return data;
  } catch (e) {
    setSyncStatus('error');
    throw e;
  }
}

async function uploadToCloud() {
  if (pendingUpload) return; // collapse bursts
  pendingUpload = true;
  try {
    setSyncStatus('syncing');
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
    setSyncStatus('synced');
    modified = false; // clear modified flag after successful upload
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
      headerIcon: { symbol: '\u26A0', color: 'amber' },
      body,
      actions: [
        { label: 'Overwrite Remote', onClick: () => resolve('overwrite') },
        { label: 'Load Remote', onClick: () => resolve('load_remote') },
        { label: 'Auto-merge', onClick: () => resolve('merge') },
        { label: 'Cancel', tone: 'secondary', onClick: () => resolve('cancel') },
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
        appState = remote; ensureStateFields(); await writeState(appState); renderAll(); modified = false; setSyncStatus('synced');
      } else if (choice === 'merge') {
        const snapshot = structuredClone(appState);
        const merged = autoMerge(appState, remote);
        appState = merged; ensureStateFields(); await writeState(appState); renderAll(); setSyncStatus('synced');
        // create downloadable snapshot of conflicts (simple)
        const blob = new Blob([JSON.stringify({ local: snapshot, remote }, null, 2)], { type: 'application/json' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'conflict.json'; a.click(); URL.revokeObjectURL(a.href);
      } else {
        setSyncStatus('error');
      }
    }
  } catch (e) {
    console.warn(e);
  }
}

// ── Shop Page ──────────────────────────────────────────────────

function openShopPage() {
  const page = document.getElementById('shop-page');
  const backBtn = document.getElementById('shop-back');
  if (!page) return;
  page.classList.remove('hidden');
  renderShopInventory();
  page.scrollTop = 0;
}

function closeShopPage() {
  const page = document.getElementById('shop-page');
  if (page) page.classList.add('hidden');
}

function calculateShopInventory() {
  // Returns { byCategory: { catItemId: { item, qty, totalValue } }, byGroup: { groupId: { name, totalQty, items: [...] } } }
  const result = { byItem: {}, byGroup: {} };
  const cats = appState.shopCategories || [];
  
  // Build lookup from cat item id to its group
  const itemToGroup = {};
  for (const cat of cats) {
    for (const item of (cat.items || [])) {
      itemToGroup[item.id] = { groupName: cat.name, groupId: cat.id, item };
    }
  }
  
  // Calculate what's in the shop (transfers - returns + on-site productions)
  // Shop qty for each product variant = sum of transfers - sum of returns + sum of on-site additions
  const variantQtys = {}; // { catItemId: qty }
  
  // Transfers (master confirmed only)
  for (const t of (appState.transferLog || [])) {
    if (t.masterConfirmDate) {
      for (const item of (t.items || [])) {
        const key = item.shopCategory;
        if (!key) continue;
        variantQtys[key] = (variantQtys[key] || 0) + item.qty;
      }
    }
  }
  
  // Returns
  for (const r of (appState.returnLog || [])) {
    for (const item of (r.items || [])) {
      const key = item.shopCategory;
      if (!key) continue;
      variantQtys[key] = (variantQtys[key] || 0) - item.qty;
    }
  }
  
  // On-site productions added to shop
  for (const o of (appState.onSiteProduction || [])) {
    if (o.addedToShop) {
      for (const item of (o.items || [])) {
        const key = item.shopCategory;
        if (!key) continue;
        variantQtys[key] = (variantQtys[key] || 0) + item.qty;
      }
    }
  }
  
  // Build grouped result
  const groups = {};
  for (const [itemId, qty] of Object.entries(variantQtys)) {
    if (qty <= 0) continue;
    const info = itemToGroup[itemId];
    if (!info) continue;
    const gId = info.groupId;
    if (!groups[gId]) {
      groups[gId] = { name: info.groupName, items: [] };
    }
    groups[gId].items.push({
      itemId,
      name: info.item.name,
      price: info.item.price,
      qty,
      value: qty * info.item.price
    });
  }
  
  return { byGroup: groups, itemToGroup };
}

function renderShopInventory() {
  const container = document.getElementById('shop-inventory');
  const pendingSection = document.getElementById('shop-pending');
  const pendingList = document.getElementById('shop-pending-list');
  const pendingCount = document.getElementById('shop-pending-count');
  if (!container) return;
  
  const inventory = calculateShopInventory();
  const groups = inventory.byGroup;
  
  container.innerHTML = '';
  
  const groupIds = Object.keys(groups);
  if (!groupIds.length) {
    container.innerHTML = '<div class="shop-inv-empty">Prodaja je trenutno prazna. Prenesite proizvode iz skladišta.</div>';
  } else {
    for (const gId of groupIds) {
      const group = groups[gId];
      const totalQty = group.items.reduce((s, i) => s + i.qty, 0);
      const totalValue = group.items.reduce((s, i) => s + i.value, 0);
      
      const groupDiv = document.createElement('div');
      groupDiv.className = 'shop-inv-group';
      
      const header = document.createElement('div');
      header.className = 'shop-inv-group-header';
      header.innerHTML = `<span class="shop-inv-group-toggle">\u25BC</span><span class="shop-inv-group-name">${escapeHtml(group.name)}</span><span class="shop-inv-group-total">${totalQty} kom / ${formatCurrency(totalValue)}</span> <button class="shop-inv-del" data-gid="${gId}" title="Izbri\u0161i kategoriju" type="button">\u2715</button>`;
      header.addEventListener('click', (e) => {
        if (e.target.closest('.shop-inv-del')) return; // let the delete button handle it
        const itemsDiv = groupDiv.querySelector('.shop-inv-items');
        if (itemsDiv) {
          itemsDiv.style.display = itemsDiv.style.display === 'none' ? 'grid' : 'none';
          const toggle = header.querySelector('.shop-inv-group-toggle');
          if (toggle) toggle.textContent = itemsDiv.style.display === 'none' ? '\u25B6' : '\u25BC';
        }
      });
      // Delete category button
      const delCatBtn = header.querySelector('.shop-inv-del');
      if (delCatBtn) {
        delCatBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const gId = delCatBtn.dataset.gid;
          const group = inventory.byGroup[gId];
          if (!group) return;
          const catName = group.name;
          openModal({
            title: 'Izbri\u0161i kategoriju',
            headerIcon: { symbol: '\u26A0', color: 'amber' },
            size: 'small',
            body: `Jeste li sigurni da želite izbrisati kategoriju "${escapeHtml(catName)}" iz prodaje? Svi proizvodi u ovoj kategoriji bit će uklonjeni.`,
            actions: [
              { label: 'Izbri\u0161i', tone: 'danger', onClick: () => {
                  const catItemIds = group.items.map(i => i.itemId);
                  appState.transferLog = (appState.transferLog || []).filter(t => {
                    return !(t.items || []).some(ti => catItemIds.includes(ti.shopCategory));
                  });
                  appState.onSiteProduction = (appState.onSiteProduction || []).filter(o => {
                    return !(o.items || []).some(oi => catItemIds.includes(oi.shopCategory));
                  });
                  appState.returnLog = (appState.returnLog || []).filter(r => {
                    return !(r.items || []).some(ri => catItemIds.includes(ri.shopCategory));
                  });
                  saveStateDebounced();
                  renderShopInventory();
                  showToast(`Kategorija "${escapeHtml(catName)}" izbrisana iz prodaje`);
                  closeModal();
              }},
              { label: 'Odustani', tone: 'secondary' }
            ]
          });
        });
      }
      groupDiv.appendChild(header);
      
      const itemsDiv = document.createElement('div');
      itemsDiv.className = 'shop-inv-items';
      
      for (const item of group.items) {
        const row = document.createElement('div');
        row.className = 'shop-inv-item';
        row.innerHTML = `<span class="shop-inv-item-name">${escapeHtml(item.name)}</span><span class="shop-inv-item-price">${item.price}\u20AC</span><span class="shop-inv-item-qty">${item.qty} kom</span><span class="shop-inv-item-value">${formatCurrency(item.value)}</span>`;
        itemsDiv.appendChild(row);
      }
      
      groupDiv.appendChild(itemsDiv);
      container.appendChild(groupDiv);
    }
    
    // Total summary at bottom
    const allQty = groupIds.reduce((s, gId) => s + groups[gId].items.reduce((si, i) => si + i.qty, 0), 0);
    const allVal = groupIds.reduce((s, gId) => s + groups[gId].items.reduce((si, i) => si + i.value, 0), 0);
    const totalRow = document.createElement('div');
    totalRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:10px;background:#f9fafb;font-size:14px;font-weight:700;border-top:2px solid #d1d5db;';
    totalRow.innerHTML = `<span style="flex:1;">Ukupno</span><span style="width:80px;text-align:right;color:#6b7280;">-</span><span style="width:80px;text-align:right;">${allQty} kom</span><span style="width:80px;text-align:right;">${formatCurrency(allVal)}</span>`;
    container.appendChild(totalRow);
  }
  
  // Pending transfers section
  const pending = appState.pendingTransfers || [];
  if (pending.length > 0) {
    pendingSection.classList.remove('hidden');
    pendingCount.textContent = pending.length;
    pendingList.innerHTML = '';
    // Group pending by category
    const pendingGroups = {};
    for (const p of pending) {
      const prod = appState.products[p.productId];
      const catInfo = getCategoryItemInfo(p.shopCategory);
      const key = p.shopCategory || '__unknown';
      if (!pendingGroups[key]) pendingGroups[key] = { catName: catInfo ? catInfo.item.name : 'Nepoznato', items: [] };
      pendingGroups[key].items.push({ name: prod?.name || '?', qty: p.qty });
    }
    for (const [key, g] of Object.entries(pendingGroups)) {
      const section = document.createElement('div');
      section.style.cssText = 'background:#ffffff;padding:6px 10px;font-size:13px;';
      section.innerHTML = `<div style="font-weight:700;margin-bottom:4px;">${escapeHtml(g.catName)}</div>`;
      for (const item of g.items) {
        section.innerHTML += `<div style="padding-left:14px;color:#374151;">${escapeHtml(item.name)}: ${item.qty} kom</div>`;
      }
      pendingList.appendChild(section);
    }
  } else {
    pendingSection.classList.add('hidden');
  }
}

function getCategoryItemInfo(itemId) {
  if (!itemId) return null;
  for (const cat of (appState.shopCategories || [])) {
    for (const item of (cat.items || [])) {
      if (item.id === itemId) return { group: cat, item };
    }
  }
  return null;
}

// ── Transfer from Warehouse ────────────────────────────────────

function transferFromWarehouse() {
  const body = document.createElement('div');
  body.style.cssText = 'display:grid;gap:8px;max-height:70vh;overflow:auto;';
  
  // Folder tree
  function renderTree(folderId, depth) {
    const folder = appState.folders[folderId];
    if (!folder) return '';
    let html = '';
    
    // Products in this folder
    for (const pid of (folder.products || [])) {
      const p = appState.products[pid];
      if (!p || Number(p.quantity || 0) <= 0) continue;
      const catInfo = getCategoryItemInfo(p.shopCategory);
      const catName = catInfo ? `${catInfo.group.name} / ${catInfo.item.name}` : '';
      html += `<div class="transfer-product" data-pid="${pid}" style="padding:6px 8px 6px ${depth * 16 + 16}px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:8px;cursor:pointer;border-radius:6px;margin:2px 0;">`;
      html += `<span style="flex:1;font-size:14px;">${escapeHtml(p.name)}</span>`;
      html += `<span style="color:#6b7280;font-size:12px;font-weight:600;">${Number(p.quantity || 0)} kom</span>`;
      if (catName) html += `<span style="color:#0ea5e9;font-size:11px;background:#e0f2fe;padding:2px 6px;border-radius:4px;">${escapeHtml(catName)}</span>`;
      html += `<span style="color:#9ca3af;font-size:12px;">${formatCurrency(Number(p.price || 0) * Number(p.quantity || 0))}</span>`;
      html += '</div>';
    }
    
    // Subfolders
    for (const sfId of (folder.subfolders || [])) {
      const sf = appState.folders[sfId];
      if (!sf) continue;
      if (!sf.products?.length && !sf.subfolders?.length) continue;
      html += `<div class="transfer-folder" data-fid="${sfId}" style="padding:6px 8px 6px ${depth * 16}px;display:flex;align-items:center;gap:6px;cursor:pointer;font-weight:600;font-size:14px;border-bottom:1px solid #f3f4f6;border-radius:6px;margin:2px 0;">`;
      html += `<span style="color:#6b7280;">\u25B6</span>`;
      html += `<span>${escapeHtml(sf.name)}</span>`;
      html += `</div>`;
      // Child products
      html += `<div class="transfer-children" style="display:none;">${renderTree(sfId, depth + 1)}</div>`;
    }
    
    return html;
  }
  
  body.innerHTML = `<div style="padding:4px 0;font-weight:600;font-size:14px;color:#374151;">Odaberite proizvod za prijenos:</div>` + renderTree('root', 0);
  
  // Add click handlers
  setTimeout(() => {
    body.querySelectorAll('.transfer-folder').forEach(el => {
      el.addEventListener('click', () => {
        const children = el.nextElementSibling;
        if (children && children.classList.contains('transfer-children')) {
          const isHidden = children.style.display === 'none';
          children.style.display = isHidden ? 'block' : 'none';
          const arrow = el.querySelector('span:first-child');
          if (arrow) arrow.textContent = isHidden ? '\u25BC' : '\u25B6';
        }
      });
    });
    
    body.querySelectorAll('.transfer-product').forEach(el => {
      el.addEventListener('click', () => {
        const pid = el.dataset.pid;
        if (!pid) return;
        const p = appState.products[pid];
        if (!p) return;
        openTransferQtyModal(pid);
      });
    });
  }, 0);
  
  openModal({
    title: __('Transfer from Warehouse') || 'Prijenos iz skladišta',
    headerIcon: { symbol: '\uD83D\uDCE6', color: 'blue' },
    body,
    actions: [
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

let _transferCatId = ''; // Selected category for current transfer
let _transferSavedBody = null; // Saved transfer modal state

function openTransferCategoryPicker(productId) {
  const modalBody = document.getElementById('modal-body');
  const modalActions = document.getElementById('modal-actions');
  const titleEl = document.getElementById('modal-title');
  if (!modalBody) return;
  
  // Save current state (entered qty)
  _transferSavedBody = { qty: document.getElementById('transfer-qty')?.value || '1' };
  
  if (titleEl) titleEl.textContent = 'Odaberi kategoriju';
  if (modalActions) modalActions.style.display = 'none';
  
  const catBody = document.createElement('div');
  catBody.style.cssText = 'display:grid;gap:4px;max-height:60vh;overflow:auto;';
  
  function renderCatTree() {
    catBody.innerHTML = '';
    const cats = appState.shopCategories || [];
    
    for (const cat of cats) {
      const groupDiv = document.createElement('div');
      groupDiv.style.cssText = 'background:#f9fafb;border-radius:8px;overflow:hidden;margin-bottom:4px;';
      
      const header = document.createElement('div');
      header.style.cssText = 'display:flex;align-items:center;gap:6px;padding:8px 10px;cursor:pointer;font-weight:700;font-size:14px;';
      header.innerHTML = `<span style="color:#6b7280;">\u25BC</span><span>${escapeHtml(cat.name)}</span>`;
      
      const itemsDiv = document.createElement('div');
      itemsDiv.style.cssText = 'display:grid;gap:1px;';
      
      for (const item of (cat.items || [])) {
        const itemRow = document.createElement('div');
        itemRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 10px 6px 24px;cursor:pointer;font-size:14px;border-radius:4px;margin:1px 4px;';
        itemRow.innerHTML = `<span style="flex:1;">${escapeHtml(item.name)}</span><span style="color:#6b7280;font-weight:600;">${item.price}\u20AC</span>`;
        itemRow.addEventListener('click', () => {
          _transferCatId = item.id;
          restoreTransferModal(productId);
          const lbl = document.getElementById('transfer-cat-label');
          if (lbl) lbl.textContent = `${cat.name} / ${item.name} (${item.price}\u20AC)`;
          const btn = document.getElementById('transfer-cat-btn');
          if (btn) btn.style.borderColor = '#22c55e';
        });
        itemsDiv.appendChild(itemRow);
      }
      
      groupDiv.appendChild(header);
      groupDiv.appendChild(itemsDiv);
      catBody.appendChild(groupDiv);
      
      header.addEventListener('click', () => {
        const visible = itemsDiv.style.display !== 'none';
        itemsDiv.style.display = visible ? 'none' : 'grid';
        header.querySelector('span:first-child').textContent = visible ? '\u25B6' : '\u25BC';
      });
    }
    
    // New category button
    const newBtn = document.createElement('button');
    newBtn.style.cssText = 'width:100%;padding:10px;border:1px dashed #0ea5e9;border-radius:8px;background:transparent;color:#0ea5e9;font-weight:700;font-size:14px;cursor:pointer;margin-top:6px;';
    newBtn.textContent = '\u2795  Nova kategorija';
    newBtn.addEventListener('click', () => {
      catBody.innerHTML = '';
      const form = document.createElement('div');
      form.style.cssText = 'display:grid;gap:10px;';
      form.innerHTML = `
        <div style="font-weight:700;font-size:14px;">Nova kategorija</div>
        <input id="new-cat-name" placeholder="Naziv (npr. Narukvica 12)" style="padding:8px 10px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;" />
        <input id="new-cat-price" placeholder="Cijena (€)" type="number" min="0" step="0.5" style="padding:8px 10px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;" />
        <input id="new-cat-group" placeholder="Grupa (npr. Narukvica)" style="padding:8px 10px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;" />
      `;
      const nameInput = form.querySelector('#new-cat-name');
      const priceInput = form.querySelector('#new-cat-price');
      nameInput.addEventListener('input', () => {
        const nums = nameInput.value.match(/\d+/g);
        if (nums && !priceInput.value) priceInput.value = nums[nums.length - 1];
      });
      
      const btns = document.createElement('div');
      btns.style.cssText = 'display:flex;gap:8px;margin-top:8px;';
      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Spremi';
      saveBtn.style.cssText = 'flex:1;padding:8px;border-radius:8px;border:1px solid #22c55e;background:#22c55e;color:#fff;font-weight:700;font-size:14px;cursor:pointer;';
      saveBtn.addEventListener('click', () => {
        const name = form.querySelector('#new-cat-name').value.trim();
        const price = parseFloat(form.querySelector('#new-cat-price').value);
        const groupName = form.querySelector('#new-cat-group').value.trim() || name.replace(/[\s]*\d+.*$/, '').trim() || name.replace(/\d+/g, '').trim();
        if (!name || !price) { showToast('Unesite naziv i cijenu'); return; }
        
        let group = (appState.shopCategories || []).find(g => g.name === groupName);
        if (!group) {
          group = { id: uuid(), name: groupName, items: [] };
          appState.shopCategories = appState.shopCategories || [];
          appState.shopCategories.push(group);
        }
        const newItem = { id: uuid(), name, price };
        group.items.push(newItem);
        _transferCatId = newItem.id;
        saveStateDebounced();
        
        restoreTransferModal(productId);
        const lbl = document.getElementById('transfer-cat-label');
        if (lbl) lbl.textContent = `${group.name} / ${name} (${price}\u20AC)`;
        const btn = document.getElementById('transfer-cat-btn');
        if (btn) btn.style.borderColor = '#22c55e';
        showToast('Kategorija kreirana');
      });
      btns.appendChild(saveBtn);
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Odustani';
      cancelBtn.style.cssText = 'flex:1;padding:8px;border-radius:8px;border:1px solid #d1d5db;background:#ffffff;color:#374151;font-weight:700;font-size:14px;cursor:pointer;';
      cancelBtn.addEventListener('click', () => renderCatTree());
      btns.appendChild(cancelBtn);
      catBody.appendChild(form);
      catBody.appendChild(btns);
    });
    catBody.appendChild(newBtn);
  }
  
  renderCatTree();
  modalBody.innerHTML = '';
  modalBody.appendChild(catBody);
}

function restoreTransferModal(productId) {
  const modalBody = document.getElementById('modal-body');
  const modalActions = document.getElementById('modal-actions');
  const titleEl = document.getElementById('modal-title');
  if (!modalBody) return;
  
  const p = appState.products[productId];
  if (!p) return;
  const maxQty = Number(p.quantity || 0);
  
  let defaultCatName = '';
  if (_transferCatId) {
    const ci = getCategoryItemInfo(_transferCatId);
    if (ci) defaultCatName = `${ci.group.name} / ${ci.item.name} (${ci.item.price}\u20AC)`;
  }
  
  const savedQty = _transferSavedBody?.qty || '1';
  
  if (titleEl) titleEl.textContent = 'Prijenos u prodaju';
  if (modalActions) modalActions.style.display = '';
  
  modalBody.innerHTML = `
    <div style="font-weight:700;font-size:16px;">${escapeHtml(p.name)}</div>
    <div style="color:#6b7280;font-size:14px;">Dostupno u skladištu: <strong>${maxQty} kom</strong></div>
    <label style="display:grid;gap:4px;">
      <span style="font-weight:600;font-size:13px;">Količina za prijenos</span>
      <input id="transfer-qty" type="number" min="1" max="${maxQty}" step="1" value="${savedQty}" style="padding:8px 10px;border-radius:8px;border:1px solid #d1d5db;font-size:16px;" />
    </label>
    <label style="display:grid;gap:4px;">
      <span style="font-weight:600;font-size:13px;">Kategorija prodaje</span>
      <button id="transfer-cat-btn" type="button" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;border-radius:8px;border:1px solid ${defaultCatName ? '#22c55e' : '#d1d5db'};background:#ffffff;font-size:14px;cursor:pointer;text-align:left;">
        <span id="transfer-cat-label" style="flex:1;color:${defaultCatName ? '#111827' : '#9ca3af'};">${defaultCatName || 'Odaberi kategoriju'}</span>
        <span style="color:#6b7280;">\u25BC</span>
      </button>
    </label>
  `;
  
  modalBody.querySelector('#transfer-cat-btn')?.addEventListener('click', () => openTransferCategoryPicker(productId));
}

function openTransferQtyModal(productId) {
  const p = appState.products[productId];
  if (!p) return;
  const maxQty = Number(p.quantity || 0);
  _transferCatId = p.shopCategory || '';
  
  const body = document.createElement('div');
  body.style.cssText = 'display:grid;gap:12px;max-width:400px;';
  
  // Find default category name
  let defaultCatName = '';
  if (_transferCatId) {
    const ci = getCategoryItemInfo(_transferCatId);
    if (ci) defaultCatName = `${ci.group.name} / ${ci.item.name} (${ci.item.price}\u20AC)`;
  }
  
  body.innerHTML = `
    <div style="font-weight:700;font-size:16px;">${escapeHtml(p.name)}</div>
    <div style="color:#6b7280;font-size:14px;">Dostupno u skladištu: <strong>${maxQty} kom</strong></div>
    <label style="display:grid;gap:4px;">
      <span style="font-weight:600;font-size:13px;">Količina za prijenos</span>
      <input id="transfer-qty" type="number" min="1" max="${maxQty}" step="1" value="${Math.min(maxQty, 1)}" style="padding:8px 10px;border-radius:8px;border:1px solid #d1d5db;font-size:16px;" />
    </label>
    <label style="display:grid;gap:4px;">
      <span style="font-weight:600;font-size:13px;">Kategorija prodaje</span>
      <button id="transfer-cat-btn" type="button" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;border-radius:8px;border:1px solid #d1d5db;background:#ffffff;font-size:14px;cursor:pointer;text-align:left;">
        <span id="transfer-cat-label" style="flex:1;color:${defaultCatName ? '#111827' : '#9ca3af'};">${defaultCatName || 'Odaberi kategoriju'}</span>
        <span style="color:#6b7280;">\u25BC</span>
      </button>
    </label>
  `;
  
  setTimeout(() => {
    body.querySelector('#transfer-cat-btn')?.addEventListener('click', () => openTransferCategoryPicker(productId));
  }, 50);
  
  openModal({
    title: 'Prijenos u prodaju',
    headerIcon: { symbol: '\uD83D\uDCE6', color: 'blue' },
    body,
    actions: [
      { label: 'Dodaj u prijenos', onClick: () => {
        const qty = parseInt(body.querySelector('#transfer-qty')?.value || '0', 10);
        const catId = _transferCatId;
        if (qty <= 0 || qty > maxQty) { showToast('Neispravna količina'); return; }
        if (!catId) { showToast('Odaberite kategoriju prodaje'); return; }
        
        // Decrease warehouse immediately
        p.quantity = maxQty - qty;
        
        // Add to pending transfers
  appState.pendingTransfers = appState.pendingTransfers || [];
  appState.pendingOnSite = appState.pendingOnSite || [];
        appState.pendingTransfers.push({
          productId,
          qty,
          shopCategory: catId,
          addedAt: Date.now()
        });
        
        // Log in history
        recordInventoryEvent({
          eventType: 'transfer_to_shop',
          productId,
          productName: p.name || 'Product',
          delta: -qty,
          price: Number(p.price || 0),
          value: -qty * Number(p.price || 0),
          source: 'transfer',
          note: `Transferred ${qty} pc to shop`
        });
        
        saveStateDebounced();
        renderAll();
        renderShopInventory();
        showToast(`Preneseno ${qty} kom: ${p.name}`);
        closeModal();
      }},
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

// ── Master Confirm / Decline ────────────────────────────────────

function masterConfirm() {
  const pending = appState.pendingTransfers || [];
  if (!pending.length) { showToast('Nema transakcija za potvrditi'); return; }
  
  // Ask user what to do with document
  openModal({
    title: 'Potvrdi sve',
    headerIcon: { symbol: '\u2705', color: 'green' },
    size: 'small',
    body: `Potvrđujete ${pending.length} transakcija. Želite li napraviti novi dokument ili ažurirati zadnji?`,
    actions: [
      { label: 'Novi dokument', onClick: () => {
        executeConfirm('new');
      }},
      { label: 'Ažuriraj zadnji', onClick: () => {
        executeConfirm('update');
      }},
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

function executeConfirm(docType) {
  const pending = appState.pendingTransfers || [];
  if (!pending.length) return;
  
  // Move pending to transferLog with master confirm date
  const logEntry = {
    id: uuid(),
    date: new Date().toISOString(),
    type: 'transfer',
    items: pending.map(p => ({ productId: p.productId, qty: p.qty, shopCategory: p.shopCategory })),
    masterConfirmDate: new Date().toISOString(),
    documentId: uuid()
  };
  
  appState.transferLog = appState.transferLog || [];
  appState.transferLog.push(logEntry);
  
  // Save document
  appState.documents = appState.documents || [];
  const docItems = buildDocumentItems();
  const doc = {
    id: logEntry.documentId,
    date: new Date().toISOString(),
    type: docType,
    items: docItems,
    totalCount: docItems.reduce((s, i) => s + i.qty, 0)
  };
  appState.documents.push(doc);
  
  // Clear pending
  appState.pendingTransfers = [];
  
  saveStateDebounced();
  renderAll();
  renderShopInventory();
  
  // Show document preview
  showDocumentPreview(docItems, docType);
}

function buildDocumentItems() {
  // Calculate current full shop inventory for the document
  const inventory = calculateShopInventory();
  const items = [];
  for (const g of Object.values(inventory.byGroup)) {
    for (const item of g.items) {
      items.push({
        name: item.name,
        price: item.price,
        qty: item.qty,
        value: item.value
      });
    }
  }
  return items;
}

function declineAll() {
  const pending = appState.pendingTransfers || [];
  if (!pending.length) { showToast('Nema transakcija za odustati'); return; }
  
  const totalItems = pending.length;
  
  openModal({
    title: 'Odustani od svega',
    headerIcon: { symbol: '\u26A0', color: 'amber' },
    size: 'small',
    body: `Odustajete od ${totalItems} transakcija. Svi proizvodi će se vratiti u skladište. Nastaviti?`,
    actions: [
      { label: 'Odustani od svega', tone: 'danger', onClick: () => {
        // Restore warehouse quantities
        for (const p of pending) {
          const prod = appState.products[p.productId];
          if (prod) {
            prod.quantity = Number(prod.quantity || 0) + p.qty;
            // Log reversal in history
            recordInventoryEvent({
              eventType: 'transfer_reversal',
              productId: p.productId,
              productName: prod.name || 'Product',
              delta: p.qty,
              price: Number(prod.price || 0),
              value: p.qty * Number(prod.price || 0),
              source: 'transfer_reversal',
              note: `Transfer of ${p.qty} pc was cancelled`
            });
          }
        }
        appState.pendingTransfers = [];
        saveStateDebounced();
        renderAll();
        renderShopInventory();
        showToast('Transakcije poništene, proizvodi vraćeni u skladište');
        closeModal();
      }},
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

// ── Shop Actions Menu ──────────────────────────────────────────

function openShopActionsMenu() {
  openModal({
    title: 'Akcije',
    headerIcon: { symbol: '\uD83D\uDCCB', color: 'slate' },
    actionsLayout: 'stack',
    actions: [
      { label: '\uD83D\uDCE6  Prijenos iz skladi\u0161ta', onClick: () => { closeModal(); transferFromWarehouse(); } },
      { label: '\uD83C\uDFF7  Proizvodnja na licu mjesta', onClick: () => { closeModal(); openInSeasonProduction(); } },
      { label: '\uD83D\uDCC4  Dokumenti', onClick: () => { closeModal(); openDocumentList(); } },
      { label: '\uD83D\uDD04  Povrat iz prodaje', onClick: () => { closeModal(); returnFromShop(); } },
      { label: '\uD83D\uDDD1\uFE0F  Isprazni prodaju', tone: 'danger', onClick: () => { closeModal(); clearShopAll(); } },
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

// ── On-Site Production Page ─────────────────────────────────────

let _onsitePick = null; // { productId, productName, shopCategory, price }

function openInSeasonProduction() {
  const page = document.getElementById('onsite-page');
  if (!page) return;
  _onsitePick = null;
  updateOnsitePickDisplay();
  page.classList.remove('hidden');
  renderOnSiteItems();
  page.scrollTop = 0;
}

function closeOnSitePage() {
  const page = document.getElementById('onsite-page');
  if (page) { page.classList.add('hidden'); openShopPage(); }
}

function updateOnsitePickDisplay() {
  const el = document.getElementById('onsite-selected-name');
  if (!el) return;
  if (_onsitePick) {
    const p = appState.products[_onsitePick.productId];
    el.textContent = p ? p.name : _onsitePick.productName;
    el.style.color = '#111827';
  } else {
    el.textContent = 'nije odabrano';
    el.style.color = '#9ca3af';
  }
}

function openOnsiteProductPicker() {
  const body = document.createElement('div');
  body.style.cssText = 'display:grid;gap:8px;max-height:70vh;overflow:auto;';
  
  function renderTree(folderId, depth) {
    const folder = appState.folders[folderId];
    if (!folder) return '';
    let html = '';
    
    for (const pid of (folder.products || [])) {
      const p = appState.products[pid];
      if (!p) continue;
      const catInfo = getCategoryItemInfo(p.shopCategory);
      const catTag = catInfo ? `${catInfo.item.name} (${catInfo.item.price}\u20AC)` : '';
      html += `<div class="onsite-pick-product" data-pid="${pid}" style="padding:6px 8px 6px ${depth * 16 + 16}px;display:flex;align-items:center;gap:8px;cursor:pointer;border-radius:6px;margin:2px 0;border-bottom:1px solid #f3f4f6;">`;
      html += `<span style="flex:1;font-size:14px;font-weight:600;">${escapeHtml(p.name)}</span>`;
      html += `<span style="color:#6b7280;font-size:12px;">${Number(p.quantity || 0)} kom</span>`;
      if (catTag) html += `<span style="color:#6366f1;font-size:11px;background:#eef2ff;padding:2px 6px;border-radius:4px;">${escapeHtml(catTag)}</span>`;
      html += `</div>`;
    }
    
    for (const sfId of (folder.subfolders || [])) {
      const sf = appState.folders[sfId];
      if (!sf) continue;
      if (!sf.products?.length && !sf.subfolders?.length) continue;
      html += `<div class="onsite-pick-folder" data-fid="${sfId}" style="padding:6px 8px 6px ${depth * 16}px;display:flex;align-items:center;gap:6px;cursor:pointer;font-weight:700;font-size:14px;border-bottom:1px solid #f3f4f6;border-radius:6px;margin:2px 0;">`;
      html += `<span style="color:#6b7280;">\u25B6</span>`;
      html += `<span>${escapeHtml(sf.name)}</span>`;
      html += `</div>`;
      html += `<div class="onsite-pick-children" style="display:none;">${renderTree(sfId, depth + 1)}</div>`;
    }
    return html;
  }
  
  body.innerHTML = `<div style="padding:4px 0;font-weight:600;font-size:14px;color:#374151;">Odaberite proizvod za unos:</div>`;
  body.innerHTML += renderTree('root', 0);
  
  setTimeout(() => {
    body.querySelectorAll('.onsite-pick-folder').forEach(el => {
      el.addEventListener('click', () => {
        const children = el.nextElementSibling;
        if (children && children.classList.contains('onsite-pick-children')) {
          const hidden = children.style.display === 'none';
          children.style.display = hidden ? 'block' : 'none';
          const arrow = el.querySelector('span:first-child');
          if (arrow) arrow.textContent = hidden ? '\u25BC' : '\u25B6';
        }
      });
    });
    body.querySelectorAll('.onsite-pick-product').forEach(el => {
      el.addEventListener('click', () => {
        const pid = el.dataset.pid;
        if (!pid) return;
        const p = appState.products[pid];
        if (!p) return;
        
        // Find best matching category
        let targetCat = p.shopCategory;
        if (!targetCat) {
          // Auto-match by price
          const prodPrice = Number(p.price || 0);
          for (const cat of (appState.shopCategories || [])) {
            for (const item of (cat.items || [])) {
              if (item.price === prodPrice) {
                targetCat = item.id;
                break;
              }
            }
            if (targetCat) break;
          }
        }
        
        if (targetCat) {
          const catInfo = getCategoryItemInfo(targetCat);
          _onsitePick = {
            productId: pid,
            productName: p.name,
            shopCategory: targetCat,
            price: catInfo ? catInfo.item.price : Number(p.price || 0)
          };
          closeModal();
          updateOnsitePickDisplay();
        } else {
          // No matching category found - let user pick
          closeModal();
          const pickBody = document.createElement('div');
          pickBody.style.cssText = 'display:grid;gap:10px;';
          pickBody.innerHTML = `<div style="font-size:14px;">Proizvod <strong>${escapeHtml(p.name)}</strong> (${Number(p.price || 0)}\u20AC) nema kategoriju prodaje. Odaberite:</div>`;
          const catSelect = document.createElement('select');
          catSelect.style.cssText = 'padding:8px 10px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;';
          catSelect.innerHTML = '<option value="">-- odaberite --</option>';
          for (const cat of (appState.shopCategories || [])) {
            for (const item of (cat.items || [])) {
              const opt = document.createElement('option');
              opt.value = item.id;
              opt.textContent = `${cat.name} / ${item.name} (${item.price}\u20AC)`;
              catSelect.appendChild(opt);
            }
          }
          pickBody.appendChild(catSelect);
          openModal({
            title: 'Odaberi kategoriju',
            headerIcon: { symbol: '\uD83C\uDFEA', color: 'slate' },
            body: pickBody,
            actions: [
              { label: 'Potvrdi', onClick: () => {
                  if (!catSelect.value) { showToast('Odaberite kategoriju'); return; }
                  const ci = getCategoryItemInfo(catSelect.value);
                  _onsitePick = {
                    productId: pid,
                    productName: p.name,
                    shopCategory: catSelect.value,
                    price: ci ? ci.item.price : Number(p.price || 0)
                  };
                  closeModal();
                  updateOnsitePickDisplay();
              }},
              { label: __('Cancel'), tone: 'secondary' }
            ]
          });
        }
      });
    });
  }, 0);
  
  openModal({
    title: 'Odaberi proizvod',
    headerIcon: { symbol: '\uD83D\uDCCB', color: 'indigo' },
    body,
    actions: [
      { label: __('Cancel'), tone: 'secondary', onClick: () => { closeModal(); } }
    ]
  });
}

function renderOnSiteItems() {
  const list = document.getElementById('onsite-list');
  if (!list) return;
  const items = appState.pendingOnSite || [];
  
  if (!items.length) {
    list.innerHTML = '<div class="onsite-empty">Jo\u0161 nema dodanih proizvoda. Dodajte prvi iznad.</div>';
    return;
  }
  
  list.innerHTML = '';
  for (const item of items) {
    const catInfo = getCategoryItemInfo(item.shopCategory);
    const displayName = catInfo ? `${catInfo.item.name} (${catInfo.item.price}\u20AC)` : item.name || 'Nepoznato';
    
    const row = document.createElement('div');
    row.className = 'onsite-item';
    row.innerHTML = `
      <span class="onsite-item-name">${escapeHtml(displayName)}</span>
      <button class="onsite-item-adj" data-adj="-1">\u2212</button>
      <span class="onsite-item-qty">${item.qty} kom</span>
      <button class="onsite-item-adj" data-adj="+1">+</button>
      <button class="onsite-item-del">\u2715</button>
    `;
    
    row.querySelectorAll('.onsite-item-adj').forEach(btn => {
      btn.addEventListener('click', () => {
        const delta = parseInt(btn.dataset.adj, 10);
        item.qty = Math.max(1, item.qty + delta);
        saveStateDebounced();
        renderOnSiteItems();
      });
    });
    
    row.querySelector('.onsite-item-del').addEventListener('click', () => {
      appState.pendingOnSite = (appState.pendingOnSite || []).filter(i => i.id !== item.id);
      saveStateDebounced();
      renderOnSiteItems();
    });
    
    list.appendChild(row);
  }
  
  const total = items.reduce((s, i) => s + i.qty, 0);
  const totalEl = document.createElement('div');
  totalEl.style.cssText = 'text-align:right;font-size:13px;color:#6b7280;padding:2px 4px 0;';
  totalEl.textContent = `Ukupno: ${total} kom`;
  list.appendChild(totalEl);
}

function addOnSiteItem() {
  const qtyInput = document.getElementById('onsite-qty');
  if (!qtyInput) return;
  
  if (!_onsitePick) { showToast('Prvo odaberite proizvod'); return; }
  const qty = parseInt(qtyInput.value || '0', 10);
  if (qty <= 0) { showToast('Unesite ispravnu koli\u010dinu'); return; }
  
  const catInfo = getCategoryItemInfo(_onsitePick.shopCategory);
  const catName = catInfo ? catInfo.item.name : 'Nepoznato';
  
  appState.pendingOnSite = appState.pendingOnSite || [];
  
  // If same product category already exists, increment qty
  const existing = appState.pendingOnSite.find(i => i.shopCategory === _onsitePick.shopCategory);
  if (existing) {
    existing.qty += qty;
  } else {
    appState.pendingOnSite.push({
      id: uuid(),
      productId: _onsitePick.productId,
      productName: _onsitePick.productName,
      shopCategory: _onsitePick.shopCategory,
      name: catName,
      qty,
      price: _onsitePick.price
    });
  }
  
  _onsitePick = null;
  updateOnsitePickDisplay();
  qtyInput.value = '1';
  saveStateDebounced();
  renderOnSiteItems();
  showToast(`Dodano: ${qty} x ${catName}`);
}

function confirmOnSiteItems() {
  const items = appState.pendingOnSite || [];
  if (!items.length) { showToast('Nema proizvoda za potvrditi'); return; }
  
  // Only option: update last document
  openModal({
    title: 'Potvrdi proizvodnju',
    headerIcon: { symbol: '\u2705', color: 'green' },
    size: 'small',
    body: `${items.reduce((s, i) => s + i.qty, 0)} proizvoda ide u prodaju. A\u017eurirati zadnji dokument?`,
    actions: [
      { label: '\uD83D\uDCC4  A\u017euriraj zadnji dokument', onClick: () => {
          executeOnSiteConfirm();
          closeModal();
        }},
      { label: 'Odustani', tone: 'secondary' }
    ]
  });
}

function executeOnSiteConfirm() {
  const items = appState.pendingOnSite || [];
  if (!items.length) return;
  
  // Log each item in productionLog and add to onSiteProduction
  const logItems = [];
  for (const item of items) {
    const catInfo = getCategoryItemInfo(item.shopCategory);
    const itemName = catInfo ? catInfo.item.name : 'Nepoznato';
    
    recordInventoryEvent({
      eventType: 'onsite_production',
      delta: item.qty,
      price: catInfo ? catInfo.item.price : 0,
      value: item.qty * (catInfo ? catInfo.item.price : 0),
      source: 'onsite',
      note: `On-site production: ${item.qty} x ${itemName}`
    });
    
    logItems.push({
      shopCategory: item.shopCategory,
      qty: item.qty,
      name: itemName,
      price: catInfo ? catInfo.item.price : 0
    });
  }
  
  // Save to onSiteProduction archive
  appState.onSiteProduction = appState.onSiteProduction || [];
  appState.onSiteProduction.push({
    id: uuid(),
    date: new Date().toISOString(),
    items: logItems,
    addedToShop: true
  });
  
  // Update last document
  const docs = appState.documents || [];
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const shopItems = buildDocumentItems();
  
  if (docs.length > 0) {
    docs[docs.length - 1] = {
      ...docs[docs.length - 1],
      items: shopItems,
      totalCount: shopItems.reduce((s, i) => s + i.qty, 0)
      // Keep old date - don't update
    };
  } else {
    docs.push({
      id: uuid(),
      date: new Date().toISOString(),
      type: 'update',
      items: shopItems,
      totalCount: shopItems.reduce((s, i) => s + i.qty, 0)
    });
  }
  
  // Clear pending
  appState.pendingOnSite = [];
  
  saveStateDebounced();
  renderShopInventory();
  closeOnSitePage();
  showToast('Proizvodi dodani u prodaju, dokument ažuriran');
}

function declineOnSiteAll() {
  const items = appState.pendingOnSite || [];
  if (!items.length) { showToast('Nema proizvoda za odustati'); return; }
  
  openModal({
    title: 'Odustani od unosa',
    headerIcon: { symbol: '\u26A0', color: 'amber' },
    size: 'small',
    body: `Odbacujete ${items.reduce((s, i) => s + i.qty, 0)} proizvoda. Ništa se ne dodaje u prodaju. Nastaviti?`,
    actions: [
      { label: 'Odustani od unosa', tone: 'danger', onClick: () => {
          appState.pendingOnSite = [];
          saveStateDebounced();
          renderOnSiteItems();
          showToast('Popis očišćen');
          closeModal();
        }},
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

// ── Clear Shop ──────────────────────────────────────────────────

function clearShopAll() {
  openModal({
    title: 'Isprazni prodaju',
    headerIcon: { symbol: '\u26A0', color: 'red' },
    size: 'small',
    body: 'Jeste li sigurni da želite izbrisati SVE podatke iz prodaje? Svi transferi, proizvodnja na licu mjesta i povrati bit će obrisani. Ova radnja je nepovratna!',
    actions: [
      { label: 'Isprazni prodaju', tone: 'danger', onClick: () => {
          const total = (appState.transferLog || []).length + (appState.pendingTransfers || []).length + (appState.onSiteProduction || []).length + (appState.returnLog || []).length;
          appState.transferLog = [];
          appState.pendingTransfers = [];
          appState.onSiteProduction = [];
          appState.returnLog = [];
          appState.pendingOnSite = [];
          appState.documents = [];
          saveStateDebounced();
          renderShopInventory();
          renderAll();
          showToast('Prodaja ispražnjena');
          closeModal();
      }},
      { label: 'Odustani', tone: 'secondary' }
    ]
  });
}

// ── Return from Shop ────────────────────────────────────────────

function returnFromShop() {
  const inventory = calculateShopInventory();
  const groups = inventory.byGroup;
  const groupIds = Object.keys(groups);
  
  if (!groupIds.length) { showToast('Prodaja je prazna, nema proizvoda za povrat'); return; }
  
  const body = document.createElement('div');
  body.style.cssText = 'display:grid;gap:8px;max-height:70vh;overflow:auto;';
  body.innerHTML = '<div style="font-weight:600;font-size:14px;color:#374151;">Odaberite proizvode za povrat u skladište:</div>';
  
  const returnData = {}; // { productName: { itemId, maxQty, input } }
  
  for (const gId of groupIds) {
    const group = groups[gId];
    const groupDiv = document.createElement('div');
    groupDiv.style.cssText = 'background:#f9fafb;border-radius:8px;padding:6px;margin-bottom:6px;';
    groupDiv.innerHTML = `<div style="font-weight:700;font-size:14px;margin-bottom:4px;">${escapeHtml(group.name)}</div>`;
    
    for (const item of group.items) {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:4px 0;';
      row.innerHTML = `
        <span style="flex:1;font-size:13px;">${escapeHtml(item.name)}</span>
        <span style="color:#6b7280;font-size:12px;">${item.qty} kom</span>
        <input class="return-qty" type="number" min="0" max="${item.qty}" step="1" value="${item.qty}" style="width:60px;padding:4px 6px;border-radius:6px;border:1px solid #d1d5db;font-size:13px;text-align:center;" />
      `;
      groupDiv.appendChild(row);
      
      returnData[item.itemId] = { maxQty: item.qty };
    }
    
    body.appendChild(groupDiv);
  }
  
  openModal({
    title: 'Povrat iz prodaje',
    headerIcon: { symbol: '\uD83D\uDD04', color: 'blue' },
    body,
    actions: [
      { label: 'Potvrdi povrat', onClick: () => {
        const inputs = body.querySelectorAll('.return-qty');
        const returns = [];
        let idx = 0;
        for (const gId of groupIds) {
          const group = groups[gId];
          for (const item of group.items) {
            const input = inputs[idx];
            const qty = parseInt(input?.value || '0', 10);
            if (qty > 0 && qty <= item.qty) {
              returns.push({ itemId: item.itemId, name: item.name, qty, price: item.price });
            }
            idx++;
          }
        }
        
        if (!returns.length) { showToast('Odaberite količinu za povrat'); return; }
        
        // Find which productIds map to these categories so we can restore warehouse
        for (const ret of returns) {
          // Find products with this shopCategory
          for (const p of Object.values(appState.products)) {
            if (!p) continue;
            if (p.shopCategory === ret.itemId) {
              // Restore warehouse
              p.quantity = Number(p.quantity || 0) + ret.qty;
            }
          }
        }
        
        // Log the return
  appState.returnLog = appState.returnLog || [];
  appState.savedSeasons = appState.savedSeasons || [];
        appState.returnLog.push({
          id: uuid(),
          date: new Date().toISOString(),
          items: returns.map(r => ({ shopCategory: r.itemId, qty: r.qty, name: r.name }))
        });
        
        // Log in history
        for (const ret of returns) {
          recordInventoryEvent({
            eventType: 'return_from_shop',
            delta: ret.qty,
            price: ret.price,
            value: ret.qty * ret.price,
            source: 'return',
            note: `Returned ${ret.qty} x ${ret.name} from shop to warehouse`
          });
        }
        
        saveStateDebounced();
        renderAll();
        renderShopInventory();
        autoArchiveIfNeeded();
        showToast('Povrat završen');
        closeModal();
      }},
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

// ── Document Preview ────────────────────────────────────────────

function showDocumentPreview(items, docType, customTitle) {
  const preview = document.getElementById('doc-preview');
  const body = document.getElementById('doc-preview-body');
  if (!preview || !body) return;
  
  const co = appState.companyInfo || {};
  const now = new Date();
  const date = formatDateHR(now);
  const timeStr = now.toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' });
  const title = customTitle || (docType === 'onsite' ? 'Popis izrađenih proizvoda na prodajnom mjestu' : 'Popis proizvoda na prodajnom mjestu');
  
  const docFilename = `${title}_${now.toISOString().slice(0,10)}_${timeStr.replace(':','-')}`;
  // Set page title immediately so iOS picks it up for PDF filename
  document.title = docFilename;
  
  let tableRows = '';
  for (const item of items) {
    tableRows += `<tr><td>${escapeHtml(item.name)}</td><td class="doc-price" style="text-align:right;">${item.price}\u20AC</td><td style="text-align:right;">${item.qty} kom</td></tr>`;
  }
  
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  
  body.innerHTML = `
    <div class="doc-a4">
      <div class="doc-header">
        <div class="doc-company">${escapeHtml(co.name || '')}</div>
        <div class="doc-info">${escapeHtml(co.address || '')}</div>
        <div class="doc-info">OIB: ${escapeHtml(co.oib || '')}</div>
        <div class="doc-info">${escapeHtml(co.phone || '')} ${co.email ? '| ' + escapeHtml(co.email) : ''}</div>
      </div>
      <div class="doc-title">${escapeHtml(title)}</div>
      <div class="doc-date">Nadnevak: ${date}</div>
      <table class="doc-table">
        <thead><tr><th>Proizvod</th><th class="price-header">Pojed. cijena</th><th style="text-align:right;">Količina</th></tr></thead>
        <tbody>${tableRows}</tbody>
        <tfoot><tr class="doc-total"><td>Ukupno</td><td></td><td style="text-align:right;">${totalQty} kom</td></tr></tfoot>
      </table>
    </div>
  `;
  
  preview.classList.remove('hidden');
  
  // Conditional page numbers: show only if content > 1 A4 page
  setTimeout(() => {
    const content = body.querySelector('.doc-a4');
    if (content) {
      const style = document.getElementById('page-number-style') || document.createElement('style');
      style.id = 'page-number-style';
      const h = content.scrollHeight;
      const a4Height = 1123; // approx A4 at 96dpi
      style.textContent = h > a4Height
        ? '@page { @bottom-center { content: counter(page); font-family: sans-serif; font-size: 10px; color: #9ca3af; } }'
        : '@page { @bottom-center { content: none; } }';
      document.head.appendChild(style);
    }
  }, 50);
  
  // Back button (restore original title)
  document.getElementById('doc-preview-back').onclick = () => {
    preview.classList.add('hidden');
    document.title = 'Murano Product Manager';
    if (docType === 'new' || docType === 'update') {
      openShopPage();
    }
  };
  
  // Single Akcije button → opens small modal
  document.getElementById('doc-actions-btn').onclick = () => {
    openModal({
      title: 'Akcije',
      headerIcon: { symbol: '\uD83D\uDCC4', color: 'slate' },
      actionsLayout: 'stack',
      actions: [
        { label: '\uD83D\uDDB1\uFE0F  Ispi\u0161i / Podijeli', onClick: () => { closeModal(); window.print(); } },
        { label: '\uD83D\uDCCB  Novi dokument', onClick: () => {
          closeModal();
          const newDoc = { id: uuid(), date: now.toISOString(), type: 'new', items, totalCount: totalQty };
          appState.documents = appState.documents || [];
          appState.documents.push(newDoc);
          saveStateDebounced();
          showToast('Novi dokument spremljen');
        }},
        { label: '\uD83D\uDD04  A\u017euriraj zadnji', onClick: () => {
          closeModal();
          const docs = appState.documents || [];
          if (docs.length > 0) {
            docs[docs.length - 1] = { ...docs[docs.length - 1], date: now.toISOString(), items, totalCount: totalQty };
          } else {
            docs.push({ id: uuid(), date: now.toISOString(), type: 'update', items, totalCount: totalQty });
          }
          saveStateDebounced();
          showToast('Dokument ažuriran');
        }},
        { label: 'Zatvori', tone: 'secondary' }
      ]
    });
  };
}

// ── Document List ────────────────────────────────────────────────

function openDocumentList() {
  const docs = appState.documents || [];
  
  if (!docs.length) {
    showToast('Nema spremljenih dokumenata');
    return;
  }
  
  const body = document.createElement('div');
  body.style.cssText = 'display:grid;gap:6px;max-height:60vh;overflow:auto;';
  
  for (let i = docs.length - 1; i >= 0; i--) {
    const doc = docs[i];
    const d = formatDateHR(new Date(doc.date)) + ' ' + new Date(doc.date).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' });
    const docTitle = doc.type === 'onsite' ? 'Popis izrađenih proizvoda na prodajnom mjestu' : 'Popis proizvoda na prodajnom mjestu';
    
    const card = document.createElement('div');
    card.style.cssText = 'background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;';
    
    const mainRow = document.createElement('div');
    mainRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 10px;cursor:pointer;';
    mainRow.innerHTML = `
      <span style="flex:1;font-size:13px;line-height:1.4;">
        <strong>${escapeHtml(docTitle)}</strong><br>
        <span style="color:#6b7280;font-size:12px;">${d}</span>
      </span>
      <span style="color:#374151;font-size:13px;font-weight:600;">${doc.totalCount} kom</span>
    `;
    mainRow.addEventListener('click', () => {
      const items = (doc.items || []).map(i => ({ name: i.name, price: i.price || 0, qty: i.qty || 0, value: (i.price || 0) * (i.qty || 0) }));
      closeModal();
      showDocumentPreview(items, doc.type, docTitle);
    });
    card.appendChild(mainRow);
    
    // Delete button
    const delRow = document.createElement('div');
    delRow.style.cssText = 'border-top:1px solid #f3f4f6;padding:4px 10px;text-align:right;';
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Izbri\u0161i';
    delBtn.style.cssText = 'padding:2px 10px;border-radius:4px;border:none;background:transparent;color:#ef4444;font-size:12px;cursor:pointer;';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal({
        title: 'Izbri\u0161i dokument',
        headerIcon: { symbol: '\u26A0', color: 'red' },
        size: 'small',
        body: `Jeste li sigurni da \u017eelite izbrisati dokument "${docTitle}" od ${d}?`,
        actions: [
          { label: 'Izbri\u0161i', tone: 'danger', onClick: () => {
            appState.documents = (appState.documents || []).filter(d => d.id !== doc.id);
            saveStateDebounced();
            closeModal();
            openDocumentList();
            showToast('Dokument izbrisan');
          }},
          { label: 'Odustani', tone: 'secondary' }
        ]
      });
    });
    delRow.appendChild(delBtn);
    card.appendChild(delRow);
    
    body.appendChild(card);
  }
  
  openModal({
    title: 'Spremljeni dokumenti',
    headerIcon: { symbol: '\uD83D\uDCC4', color: 'slate' },
    body,
    actions: [
      { label: __('Close'), tone: 'secondary' }
    ]
  });
}

function getProductPath(productId) {
  if (!productId || !appState.products?.[productId]) return '';
  const parts = [];
  const p = appState.products[productId];
  const catInfo = getCategoryItemInfo(p.shopCategory);
  const catStr = catInfo ? `${catInfo.group.name} / ${catInfo.item.name}` : '';
  
  // Folder hierarchy
  for (const f of Object.values(appState.folders || {})) {
    if (f && (f.products || []).includes(productId)) {
      let cur = f;
      parts.unshift(cur.name);
      while (cur.parentId && appState.folders[cur.parentId]) {
        cur = appState.folders[cur.parentId];
        if (cur.name !== 'Home' && cur.name !== 'Početna') parts.unshift(cur.name);
      }
      break;
    }
  }
  const folderStr = parts.join(' / ');
  if (catStr) return folderStr ? `${folderStr} / ${catStr}` : catStr;
  return folderStr;
}

// ── Season Management ────────────────────────────────────────────

function buildSeasonData(startDate, endDate) {
  // Calculate report data for a given date range across all products
  const seasonStart = new Date(startDate);
  const data = [];
  
  for (const [id, p] of Object.entries(appState.products || {})) {
    if (!p) continue;
    
    let producedBefore = 0, producedDuring = 0, transferred = 0, returned = 0;
    const log = appState.productionLog || [];
    const tLog = appState.transferLog || [];
    const rLog = appState.returnLog || [];
    
    for (const entry of log) {
      if (entry.productId !== id || Number(entry.delta) <= 0) continue;
      if (entry.eventType !== 'manual_add' && entry.eventType !== 'onsite_production') continue;
      const d = new Date(entry.ts || entry.date || 0);
      if (isNaN(d.getTime())) continue;
      if (d < seasonStart) producedBefore += Number(entry.delta);
      else producedDuring += Number(entry.delta);
    }
    
    for (const t of tLog) {
      if (!t.masterConfirmDate) continue;
      for (const item of (t.items || [])) {
        if (item.productId === id) transferred += item.qty;
      }
    }
    
    const productCatIds = new Set();
    for (const t of tLog) {
      if (!t.masterConfirmDate) continue;
      for (const item of (t.items || [])) {
        if (item.productId === id && item.shopCategory) productCatIds.add(item.shopCategory);
      }
    }
    
    for (const r of rLog) {
      for (const item of (r.items || [])) {
        if (item.shopCategory && productCatIds.has(item.shopCategory)) returned += item.qty;
      }
    }
    
    const currentQty = Number(p.quantity || 0);
    const sold = transferred - returned;
    if (sold === 0 && transferred === 0 && producedBefore === 0 && producedDuring === 0) continue;
    
    data.push({
      productId: id, productName: p.name, productPath: getProductPath(id), price: Number(p.price || 0),
      producedBefore, producedDuring, transferred, returned, sold, currentQty
    });
  }
  return data;
}

function renderSeasonReport(title, data, isArchived) {
  const body = document.createElement('div');
  body.style.cssText = 'display:grid;gap:8px;max-height:70vh;overflow:auto;';
  
  // Summary at top
  const totalSoldQty = data.reduce((s, d) => s + d.sold, 0);
  const totalSoldVal = data.reduce((s, d) => s + d.sold * d.price, 0);
  const summaryDiv = document.createElement('div');
  summaryDiv.style.cssText = 'background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:8px 12px;display:flex;gap:16px;align-items:center;';
  summaryDiv.innerHTML = `
    <span style="font-weight:700;font-size:15px;color:#166534;">Ukupno prodano:</span>
    <span style="font-weight:700;font-size:15px;color:#111827;">${totalSoldQty} kom</span>
    <span style="color:#9ca3af;">|</span>
    <span style="font-weight:700;font-size:15px;color:#166534;">Ukupna vrijednost:</span>
    <span style="font-weight:700;font-size:15px;color:#111827;">${formatCurrency(totalSoldVal)}</span>
  `;
  body.appendChild(summaryDiv);
  
  // Search
  const searchInput = document.createElement('input');
  searchInput.placeholder = '\uD83D\uDD0D  Pretra\u017Ei proizvod...';
  searchInput.style.cssText = 'width:100%;padding:8px 10px;border-radius:8px;border:1px solid #d1d5db;font-size:14px;box-sizing:border-box;';
  body.appendChild(searchInput);
  
  const listDiv = document.createElement('div');
  listDiv.style.cssText = 'display:grid;gap:6px;';
  body.appendChild(listDiv);
  
  function renderCards(query) {
    listDiv.innerHTML = '';
    const q = (query || '').toLowerCase().trim();
    let shown = 0;
    for (const d of data) {
      if (q && !d.productName.toLowerCase().includes(q)) continue;
      shown++;
      const card = document.createElement('div');
      card.style.cssText = 'background:#f9fafb;border-radius:8px;padding:8px;font-size:13px;';
      card.innerHTML = `
        <div style="font-weight:700;margin-bottom:2px;">${escapeHtml(d.productName)}</div>
        ${d.productPath ? `<div style="color:#9ca3af;font-size:12px;margin-bottom:6px;">${escapeHtml(d.productPath)}</div>` : ''}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 16px;color:#374151;">
          <span>Proizvedeno prije sezone:</span><span style="text-align:right;font-weight:600;">${d.producedBefore} kom</span>
          <span>+ Proizvedeno u sezoni:</span><span style="text-align:right;font-weight:600;color:#16a34a;">+${d.producedDuring} kom</span>
          <span>- Preneseno u prodaju:</span><span style="text-align:right;font-weight:600;color:#dc2626;">-${d.transferred} kom</span>
          <span>+ Vra\u0107eno iz prodaje:</span><span style="text-align:right;font-weight:600;color:#16a34a;">+${d.returned} kom</span>
          <span style="border-top:1px solid #d1d5db;padding-top:4px;font-weight:700;">= Prodano (izra\u010dunato):</span><span style="text-align:right;border-top:1px solid #d1d5db;padding-top:4px;font-weight:700;color:#2563eb;">${d.sold} kom</span>
          <span style="padding-top:2px;">Trenutno u skladi\u0161tu:</span><span style="text-align:right;font-weight:600;padding-top:2px;">${d.currentQty} kom</span>
        </div>
      `;
      listDiv.appendChild(card);
    }
    if (!shown) listDiv.innerHTML = '<div style="text-align:center;color:#9ca3af;padding:20px;">Nema proizvoda koji odgovaraju pretrazi</div>';
  }
  
  renderCards('');
  searchInput.addEventListener('input', () => renderCards(searchInput.value));
  
  openModal({
    title: title || 'Izvje\u0161taj sezone',
    headerIcon: { symbol: '\uD83D\uDCCA', color: 'blue' },
    size: 'large',
    body,
    actions: [{ label: __('Close'), tone: 'secondary' }]
  });
}

function archiveCurrentSeason() {
  const set = appState.settings || {};
  if (!set.endDate) return;
  const year = new Date(set.endDate).getFullYear();
  if (isNaN(year)) return;
  // Check if already archived
  if ((appState.savedSeasons || []).some(s => s.year === year)) return;
  
  const seasonStart = new Date(set.endDate);
  const data = buildSeasonData(seasonStart, new Date().toISOString());
  appState.savedSeasons = appState.savedSeasons || [];
  appState.savedSeasons.push({ id: uuid(), year, date: new Date().toISOString(), data });
  saveStateDebounced();
}

function openSeasonReports() {
  const set = appState.settings || {};
  const seasonStart = set.endDate ? new Date(set.endDate) : null;
  
  if (!seasonStart) {
    showToast('Prvo postavite datum po\u010Detka sezone u Postavke');
    return;
  }
  
  const year = seasonStart.getFullYear();
  const body = document.createElement('div');
  body.style.cssText = 'display:grid;gap:8px;';
  
  // Current season
  const curLabel = `Sezona ${year} (u tijeku)`;
  const curBtn = document.createElement('button');
  curBtn.style.cssText = 'width:100%;padding:12px;border-radius:10px;border:1px solid #0ea5e9;background:#e0f2fe;color:#0369a1;font-weight:700;font-size:15px;cursor:pointer;text-align:left;';
  curBtn.innerHTML = `\uD83D\uDCCC  ${escapeHtml(curLabel)}`;
  curBtn.addEventListener('click', () => {
    const data = buildSeasonData(seasonStart, new Date().toISOString());
    renderSeasonReport(curLabel, data, false);
  });
  body.appendChild(curBtn);
  
  // Archived seasons
  const saved = appState.savedSeasons || [];
  if (saved.length) {
    const archTitle = document.createElement('div');
    archTitle.style.cssText = 'font-weight:700;font-size:14px;color:#374151;margin-top:8px;';
    archTitle.textContent = 'Arhivirane sezone';
    body.appendChild(archTitle);
    
    for (const s of saved) {
      const btn = document.createElement('button');
      btn.style.cssText = 'width:100%;padding:12px;border-radius:10px;border:1px solid #e5e7eb;background:#ffffff;color:#374151;font-weight:600;font-size:14px;cursor:pointer;text-align:left;';
      btn.innerHTML = `\uD83D\uDCC1  Sezona ${s.year}`;
      btn.addEventListener('click', () => renderSeasonReport(`Sezona ${s.year}`, s.data, true));
      body.appendChild(btn);
    }
  }
  
  // Archived - empty message
  if (!saved.length) {
    const emptyMsg = document.createElement('div');
    emptyMsg.style.cssText = 'color:#9ca3af;font-size:14px;padding:16px;text-align:center;';
    emptyMsg.textContent = 'Još nema arhiviranih sezona. Sezona se automatski arhivira nakon \u0161to obavite povrat neprodanih proizvoda.';
    body.appendChild(emptyMsg);
  }
  
  openModal({
    title: 'Izvje\u0161taji sezona',
    headerIcon: { symbol: '\uD83D\uDCCA', color: 'blue' },
    body,
    actions: [{ label: __('Close'), tone: 'secondary' }]
  });
}

function autoArchiveIfNeeded() {
  // Check if shop is empty and season should be archived
  const inventory = calculateShopInventory();
  const hasItems = Object.keys(inventory.byGroup).length > 0;
  if (!hasItems && appState.settings?.endDate) {
    archiveCurrentSeason();
  }
}

// ── Legal Documents ──────────────────────────────────────────────

function openLegalDocuments() {
  const body = document.createElement('div');
  body.style.cssText = 'display:grid;gap:8px;';
  
  const set = appState.settings || {};
  const seasonStart = set.endDate ? new Date(set.endDate) : null;
  const year = seasonStart ? seasonStart.getFullYear() : new Date().getFullYear();
  const dateStr = seasonStart ? seasonStart.toLocaleDateString('hr-HR') : new Date().toLocaleDateString('hr-HR');
  
  const docBtn = document.createElement('button');
  docBtn.style.cssText = 'width:100%;padding:12px;border-radius:10px;border:1px solid #e5e7eb;background:#ffffff;color:#374151;font-weight:600;font-size:14px;cursor:pointer;text-align:left;display:flex;align-items:center;gap:8px;';
  docBtn.innerHTML = `\uD83D\uDCC4  Blagajni\u010Dki maksimum ${year}`;
  docBtn.addEventListener('click', () => generateBlagajnickiMaksimum(year, dateStr));
  body.appendChild(docBtn);
  
  openModal({
    title: 'Zakonski dokumenti',
    headerIcon: { symbol: '\uD83D\uDCCB', color: 'slate' },
    body,
    actions: [{ label: __('Close'), tone: 'secondary' }]
  });
}

function generateBlagajnickiMaksimum(year, dateStr) {
  const co = appState.companyInfo || {};
  const preview = document.getElementById('doc-preview');
  const body = document.getElementById('doc-preview-body');
  if (!preview || !body) return;
  
  const docFilename = `Blagajnicki_maksimum_${year}`;
  document.title = docFilename;
  
  const content = `
    <div class="doc-a4" style="padding:40px 40px;">
      <div style="text-align:left;margin-bottom:30px;font-size:13px;line-height:1.6;">
        <strong>${escapeHtml(co.name || '')}</strong><br>
        ${escapeHtml(co.address || '')}<br>
        OIB ${escapeHtml(co.oib || '')}
      </div>
      
      <div style="text-align:center;margin:30px 0;">
        <div style="font-size:11px;line-height:1.5;color:#374151;">
          Temeljem \u010Dlanka 29. zakona o fiskalizaciji u prometu gotovinom (NN-133/12)
          dana ${dateStr} donosi
        </div>
        <div style="font-size:16px;font-weight:800;margin:16px 0 20px;">ODLUKU</div>
        <div style="font-size:14px;font-weight:700;margin-bottom:20px;">O VISINI BLAGAJNI\u010CKOG MAKSIMUMA</div>
      </div>
      
      <div style="font-size:13px;line-height:1.8;margin:20px 0;">
        <div style="margin-bottom:12px;">
          <strong>I.</strong><br>
          Sukladno \u010Dl. 29. st. 2. zakona o fiskalizaciji u prometu gotovinom i \u010Dl. 3. zakona o poticanju razvoja malog gospodarstva, obrt je mikro subjekt.
        </div>
        <div style="margin-bottom:12px;">
          <strong>II.</strong><br>
          Utvr\u0111uje se blagajni\u010Dki maksimum za obrt u iznosu od <strong>2000 \u20AC</strong>.
        </div>
        <div>
          <strong>III.</strong><br>
          Ova odluka se primjenjuje od ${dateStr}. godine.
        </div>
      </div>
      
      <div style="text-align:right;margin-top:60px;padding-right:15%;font-size:13px;">
        <div style="margin-bottom:4px;">Potpis vl. obrta</div>
        <div style="margin-top:32px;color:#9ca3af;font-style:italic;">_________________________</div>
      </div>
    </div>
  `;
  
  body.innerHTML = content;
  preview.classList.remove('hidden');
  
  document.getElementById('doc-preview-back').onclick = () => {
    preview.classList.add('hidden');
    document.title = 'Murano Product Manager';
  };
  document.getElementById('doc-actions-btn').onclick = () => {
    openModal({
      title: 'Akcije',
      headerIcon: { symbol: '\uD83D\uDCC4', color: 'slate' },
      actionsLayout: 'stack',
      actions: [
        { label: '\uD83D\uDDB1\uFE0F  Ispi\u0161i / Podijeli', onClick: () => { closeModal(); window.print(); } },
        { label: 'Zatvori', tone: 'secondary' }
      ]
    });
  };
}

// ── # Test Data System ──────────────────────────────────────────

function deleteTestData() {
  // Find all test products (name starts with #)
  const testProductIds = [];
  const testFolderIds = [];
  
  for (const [id, p] of Object.entries(appState.products || {})) {
    if (p && p.name && p.name.startsWith('#')) {
      testProductIds.push(id);
    }
  }
  
  for (const [id, f] of Object.entries(appState.folders || {})) {
    if (f && f.name && f.name.startsWith('#')) {
      testFolderIds.push(id);
    }
  }
  
  const totalTestProducts = testProductIds.length;
  const totalTestFolders = testFolderIds.length;
  
  if (!totalTestProducts && !totalTestFolders) {
    showToast('Nema testnih podataka za brisanje');
    return;
  }
  
  // Count history entries
  let historyCount = 0;
  for (const entry of (appState.productionLog || [])) {
    if (testProductIds.includes(entry.productId)) historyCount++;
  }
  
  // Count transfer entries
  let transferCount = 0;
  for (const t of (appState.transferLog || [])) {
    for (const item of (t.items || [])) {
      if (testProductIds.includes(item.productId)) { transferCount++; break; }
    }
  }
  
  openModal({
    title: 'Izbriši testne podatke',
    headerIcon: { symbol: '\u26A0', color: 'red' },
    size: 'small',
    body: `Pronađeno: ${totalTestProducts} testnih proizvoda, ${totalTestFolders} testnih mapa, ${historyCount} zapisa povijesti, ${transferCount} prijenosa. Izbrisati sve bez traga?`,
    actions: [
      { label: 'Izbriši sve', tone: 'danger', onClick: () => {
        // Delete test products
        for (const id of testProductIds) {
          delete appState.products[id];
          // Remove from folder product lists
          for (const f of Object.values(appState.folders)) {
            if (f) f.products = (f.products || []).filter(pid => pid !== id);
          }
        }
        
        // Delete test folders recursively
        const allTestFolderIds = new Set(testFolderIds);
        // Also find subfolders of test folders
        for (const fid of testFolderIds) {
          collectSubfolderIds(fid, allTestFolderIds);
        }
        
        for (const fid of allTestFolderIds) {
          const f = appState.folders[fid];
          if (f) {
            // Remove any test products inside
            for (const pid of (f.products || [])) {
              delete appState.products[pid];
            }
            delete appState.folders[fid];
            // Remove from parent
            if (f.parentId && appState.folders[f.parentId]) {
              appState.folders[f.parentId].subfolders = (appState.folders[f.parentId].subfolders || []).filter(sf => sf !== fid);
            }
          }
        }
        
        // Delete history entries for test products
        appState.productionLog = (appState.productionLog || []).filter(entry => !testProductIds.includes(entry.productId));
        
        // Delete transfer log entries for test products
        appState.transferLog = (appState.transferLog || []).filter(t => {
          return !(t.items || []).some(item => testProductIds.includes(item.productId));
        });
        
        // Clear pending transfers for test products
        appState.pendingTransfers = (appState.pendingTransfers || []).filter(p => !testProductIds.includes(p.productId));
        
        // Delete on-site production entries
        appState.onSiteProduction = (appState.onSiteProduction || []).filter(o => {
          const hasTestItem = (o.items || []).some(i => {
            const p = Object.values(appState.products || {}).find(pr => pr && pr.shopCategory === i.shopCategory);
            return testProductIds.includes(p?.id);
          });
          return !hasTestItem;
        });
        
        // Delete return log entries for test products
        appState.returnLog = (appState.returnLog || []).filter(r => {
          return !(r.items || []).some(i => {
            const p = Object.values(appState.products || {}).find(pr => pr && pr.shopCategory === i.shopCategory);
            return testProductIds.includes(p?.id);
          });
        });
        
        saveStateDebounced();
        renderAll();
        showToast('Testni podaci izbrisani');
        closeModal();
      }},
      { label: __('Cancel'), tone: 'secondary' }
    ]
  });
}

function collectSubfolderIds(folderId, set) {
  const f = appState.folders[folderId];
  if (!f) return;
  for (const sfId of (f.subfolders || [])) {
    set.add(sfId);
    collectSubfolderIds(sfId, set);
  }
}

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// ---------------------------- Event Wiring ----------------------------
document.addEventListener('DOMContentLoaded', async () => {
  clearAllCookies();
  // Disable double-tap zoom and pinch zoom
  try {
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) e.preventDefault(); // block pinch
    }, { passive: false });
    let lastTap = 0;
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTap < 300) e.preventDefault(); // block double-tap
      lastTap = now;
    }, { passive: false });
  } catch {}
  // DB
  try { db = await openDB(); } catch (e) { console.error(e); showToast('IndexedDB error'); }
  // Remote-first: block until latest cloud backup is loaded
  const overlay0 = document.getElementById('refresh-overlay');
  try { overlay0?.classList.add('show'); } catch {}
  let loadedRemote0 = false;
  try { loadedRemote0 = await loadLatestCloudBackup(); } catch {}
  if (!loadedRemote0) {
    setSyncStatus('error');
    openModal({ title: 'Network Required', headerIcon: { symbol: '\u26A0', color: 'amber' }, size: 'small', body: 'Latest cloud save is required. Please connect to the internet to continue.', actions: [] });
    return;
  }
  try { overlay0?.classList.remove('show'); } catch {}

  // Ensure all state fields exist (for backward compatibility)
  ensureStateFields();
  
  // Auth: wait for password before showing anything
  try { await ensureAuthenticated(); } catch (e) { console.warn('Auth error', e); }

  // UI wiring
  document.getElementById('add-btn').addEventListener('click', () => openAddMenu(currentFolderId));
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) saveBtn.addEventListener('click', async () => { 
    if (modified) {
      showToast(__('Saving...'));
      processSaveQueue();
    } else {
      showToast(__('No changes to save'));
    }
  });
  const actionsBtn = document.getElementById('actions-btn');
  if (actionsBtn) actionsBtn.addEventListener('click', openActionsMenu);
  const importFileEl = document.getElementById('import-file');
  if (importFileEl) importFileEl.addEventListener('change', (e) => { const f = e.target.files?.[0]; if (f) importState(f); e.target.value = ''; });
  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
  
  // Shop page event wiring
  const shopBtn = document.getElementById('shop-btn');
  if (shopBtn) shopBtn.addEventListener('click', openShopPage);
  const shopBackBtn = document.getElementById('shop-back');
  if (shopBackBtn) shopBackBtn.addEventListener('click', closeShopPage);
  const shopAkcijeBtn = document.getElementById('shop-akcije-btn');
  if (shopAkcijeBtn) shopAkcijeBtn.addEventListener('click', openShopActionsMenu);
  
  // On-site page event wiring
  const onsiteBack = document.getElementById('onsite-back');
  if (onsiteBack) onsiteBack.addEventListener('click', closeOnSitePage);
  const onsiteSelect = document.getElementById('onsite-select-btn');
  if (onsiteSelect) onsiteSelect.addEventListener('click', openOnsiteProductPicker);
  const onsiteAdd = document.getElementById('onsite-add-btn');
  if (onsiteAdd) onsiteAdd.addEventListener('click', addOnSiteItem);
  const onsiteQty = document.getElementById('onsite-qty');
  if (onsiteQty) onsiteQty.addEventListener('keydown', (e) => { if (e.key === 'Enter') addOnSiteItem(); });
  const onsiteConfirm = document.getElementById('onsite-confirm-btn');
  if (onsiteConfirm) onsiteConfirm.addEventListener('click', confirmOnSiteItems);
  const onsiteDecline = document.getElementById('onsite-decline-btn');
  if (onsiteDecline) onsiteDecline.addEventListener('click', declineOnSiteAll);
  
  const shopConfirmBtn = document.getElementById('shop-confirm-btn');
  if (shopConfirmBtn) shopConfirmBtn.addEventListener('click', masterConfirm);
  const shopDeclineBtn = document.getElementById('shop-decline-btn');
  if (shopDeclineBtn) shopDeclineBtn.addEventListener('click', declineAll);
  // Season management buttons (added to Settings)
  const seasonReportBtn = document.getElementById('season-report-btn');
  if (seasonReportBtn) seasonReportBtn.addEventListener('click', showEndSeasonReport);
  const testDataBtn = document.getElementById('test-data-btn');
  if (testDataBtn) testDataBtn.addEventListener('click', deleteTestData);
  
  const historyBackBtn = document.getElementById('history-back');
  if (historyBackBtn) historyBackBtn.addEventListener('click', closeHistoryPage);
  const historySearch = document.getElementById('history-search');
  if (historySearch) historySearch.addEventListener('input', () => renderHistoryPage());
  const historyDate = document.getElementById('history-date');
  if (historyDate) historyDate.addEventListener('input', () => renderHistoryPage());
  const historyPeriodDayBtn = document.getElementById('history-period-day');
  if (historyPeriodDayBtn) historyPeriodDayBtn.addEventListener('click', () => setHistoryPeriodMode('day'));
  const historyPeriodWeekBtn = document.getElementById('history-period-week');
  if (historyPeriodWeekBtn) historyPeriodWeekBtn.addEventListener('click', () => setHistoryPeriodMode('week'));
  const historyPeriodMonthBtn = document.getElementById('history-period-month');
  if (historyPeriodMonthBtn) historyPeriodMonthBtn.addEventListener('click', () => setHistoryPeriodMode('month'));
  const historyTodayBtn = document.getElementById('history-today');
  if (historyTodayBtn) historyTodayBtn.addEventListener('click', () => {
    const dateInput = document.getElementById('history-date');
    if (!dateInput) return;
    dateInput.value = todayStr();
    renderHistoryPage();
  });
  const historyClearDateBtn = document.getElementById('history-clear-date');
  if (historyClearDateBtn) historyClearDateBtn.addEventListener('click', () => {
    const dateInput = document.getElementById('history-date');
    if (!dateInput) return;
    dateInput.value = '';
    renderHistoryPage();
  });
  const historyPrevPeriodBtn = document.getElementById('history-prev-period');
  if (historyPrevPeriodBtn) historyPrevPeriodBtn.addEventListener('click', () => shiftHistoryDateByPeriod(-1));
  const historyNextPeriodBtn = document.getElementById('history-next-period');
  if (historyNextPeriodBtn) historyNextPeriodBtn.addEventListener('click', () => shiftHistoryDateByPeriod(1));

  const historyTotopBtn = document.getElementById('history-totop');
  if (historyTotopBtn) historyTotopBtn.addEventListener('click', () => {
    const page = document.getElementById('history-page');
    if (page) page.scrollTop = 0;
  });

  // Start connection checker (monitors every 3 seconds)
  wasOffline = !navigator.onLine;
  startConnectionChecker();
  
  // Start remote watcher
  startRemoteBackupWatcher();
  
  // Initialize save queue system - if there are any pending changes from a previous session
  // this will ensure they get saved
  if (modified) {
    setSyncStatus('syncing');
    processSaveQueue();
  } else {
    // If no changes, show synced status
    setSyncStatus('synced');
  }

  // Search toggle for portrait mode
  const searchToggle = document.getElementById('search-toggle');
  const searchBar = document.getElementById('search-bar');
  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
      const isExpanded = searchBar.classList.contains('search-expanded');
      if (!isExpanded) {
        searchBar.classList.remove('search-collapsed');
        searchBar.classList.add('search-expanded');
        const input = document.getElementById('search-input');
        if (input) { input.value = ''; input.focus(); }
      } else {
        searchBar.classList.remove('search-expanded');
        searchBar.classList.add('search-collapsed');
      }
    });
    // Collapse when clicking outside (only in portrait mode)
    document.addEventListener('click', (e) => {
      if (window.innerHeight > window.innerWidth) { // portrait
        if (!searchBar.contains(e.target) && !searchToggle.contains(e.target)) {
          searchBar.classList.remove('search-expanded');
          searchBar.classList.add('search-collapsed');
        }
      }
    });
    // Collapse on Escape key (only in portrait mode)
    document.addEventListener('keydown', (e) => {
      const historyPage = document.getElementById('history-page');
      if (historyPage && !historyPage.classList.contains('hidden') && e.key === 'Escape') {
        closeHistoryPage();
        return;
      }
      if (window.innerHeight > window.innerWidth && e.key === 'Escape') {
        searchBar.classList.remove('search-expanded');
        searchBar.classList.add('search-collapsed');
      }
    });
    // Reset on orientation change
    window.addEventListener('orientationchange', () => {
      if (window.innerHeight > window.innerWidth) { // portrait
        searchBar.classList.remove('search-expanded');
        searchBar.classList.add('search-collapsed');
      } else {
        // in landscape keep normal view
        searchBar.classList.remove('search-collapsed');
        searchBar.classList.remove('search-expanded');
      }
    });
    // Also handle window resize (covers desktop resize and orientation change on some browsers)
    window.addEventListener('resize', () => {
      if (window.innerHeight > window.innerWidth) { // portrait
        // ensure collapsed state
        searchBar.classList.remove('search-expanded');
        searchBar.classList.add('search-collapsed');
      } else {
        // landscape / desktop: show bar
        searchBar.classList.remove('search-collapsed');
        searchBar.classList.remove('search-expanded');
      }
    });
  }

  const edClose = document.getElementById('editor-close'); if (edClose) edClose.addEventListener('click', closeEditor);
  const edForm = document.getElementById('editor-form'); if (edForm) edForm.addEventListener('submit', saveEditorForm);
  const delBtn = document.getElementById('delete-entity'); if (delBtn) delBtn.addEventListener('click', () => {
    const typeEl = document.getElementById('editor-entity-type');
    const idEl = document.getElementById('editor-entity-id');
    const type = typeEl ? typeEl.value : null;
    const id = idEl ? idEl.value : null;
    if (!type || !id) return;
    if (type === 'folder') confirmDeleteFolder(id); else confirmDeleteProduct(id);
    closeEditor();
  });
  const addCF = document.getElementById('add-custom-field'); if (addCF) addCF.addEventListener('click', () => addCustomFieldRow());
  const edImg = document.getElementById('editor-image'); if (edImg) edImg.addEventListener('change', onFolderImageSelected);
  const modalClose = document.getElementById('modal-close'); if (modalClose) modalClose.addEventListener('click', closeModal);

  attachSearch();

  // Latest cloud backup already loaded above
  ensureDailyProgress();
  renderAll();
  translateStaticUI();

  // initial cloud
  // If we already loaded a backup successfully, skip legacy single-file sync to avoid confusing statuses
  if (!backupLoaded) {
    await initialCloudSync();
  }
  
  // Warn user if they try to close/refresh with unsaved changes
  window.addEventListener('beforeunload', (e) => {
    if (modified) {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      return e.returnValue;
    }
  });

  

  // Product page events
  document.getElementById('pp-back').addEventListener('click', () => { closeProductPage(); });
  document.getElementById('pp-add-btn').addEventListener('click', () => adjustProductQuantity(+1));
  document.getElementById('pp-correct-btn').addEventListener('click', () => correctProductQuantity());
  document.getElementById('pp-upload-btn').addEventListener('click', () => document.getElementById('pp-image-file').click());
  document.getElementById('pp-image-file').addEventListener('change', onProductImageSelected);
  // Image preview on click
  document.getElementById('pp-image-preview').addEventListener('click', function() {
    if (this.src && !this.classList.contains('hidden')) {
      let overlay = document.getElementById('img-preview-overlay');
      if (!overlay) {
        overlay = document.createElement('div'); overlay.id = 'img-preview-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer;';
        const img = document.createElement('img'); img.id = 'img-preview-full';
        img.style.cssText = 'max-width:92vw;max-height:92vh;border-radius:8px;object-fit:contain;box-shadow:0 4px 24px rgba(0,0,0,0.4);';
        overlay.appendChild(img);
        overlay.addEventListener('click', () => overlay.classList.add('hidden'));
        document.body.appendChild(overlay);
      }
      document.getElementById('img-preview-full').src = this.src;
      overlay.classList.remove('hidden');
    }
  });
  document.getElementById('pp-edit').addEventListener('click', () => { if (productPageProductId) openProductEditModal(productPageProductId); });
  // Note autosaves on exit; no explicit Save button binding
  const adj = document.getElementById('pp-adjust-input');
  if (adj) {
    adj.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); adjustProductQuantity(+1); } });
    adj.addEventListener('focus', () => { 
      try { 
        adj.select(); // Auto-select the text
        const pp = document.getElementById('product-page'); 
        if (pp) pp.scrollTo({ top: 0, behavior: 'smooth' }); 
      } catch {} 
    });
  }
});

// ---------------------------- Product Page ----------------------------
function openProductPage(productId) {
  productPageProductId = productId;
  const p = appState.products[productId];
  if (!p) return;
  const inIndependentFolder = isProductInIndependentFolder(productId);
  
  // header
  document.getElementById('pp-title').textContent = p.name || 'Product';
  // info
  document.getElementById('pp-name').textContent = p.name || '';
  document.getElementById('pp-qty').textContent = Number(p.quantity || 0);
  const warningThresholdRow = document.getElementById('pp-warning-threshold')?.closest('.pp-row');
  if (warningThresholdRow) warningThresholdRow.remove();
  if (p.warnThreshold > 0) {
    const warningThresholdRowNew = document.createElement('div');
    warningThresholdRowNew.id = 'pp-warning-threshold';
    warningThresholdRowNew.className = 'pp-row';
    const warningThresholdLabel = document.createElement('div');
    warningThresholdLabel.className = 'pp-label';
    warningThresholdLabel.textContent = __('Warning threshold');
    const warningThresholdValue = document.createElement('div');
    warningThresholdValue.className = 'pp-value';
    warningThresholdValue.id = 'pp-warning-threshold-value';
    warningThresholdValue.textContent = p.warnThreshold || 0;
    warningThresholdRowNew.appendChild(warningThresholdLabel);
    warningThresholdRowNew.appendChild(warningThresholdValue);
    const infoGrid = document.querySelector('.pp-info-grid');
    const qtyRow = document.getElementById('pp-qty')?.closest('.pp-row');
    if (qtyRow && infoGrid) infoGrid.insertBefore(warningThresholdRowNew, qtyRow.nextSibling);
  }
  
  // Hide price, total, and target for products in independent folders
  const priceRow = document.getElementById('pp-price')?.closest('.pp-row');
  const totalRow = document.getElementById('pp-total')?.closest('.pp-row');
  const targetRow = document.getElementById('pp-target')?.closest('.pp-row');
  
  if (inIndependentFolder) {
    if (priceRow) priceRow.style.display = 'none';
    if (totalRow) totalRow.style.display = 'none';
    if (targetRow) targetRow.style.display = 'none';
  } else {
    if (priceRow) priceRow.style.display = '';
    if (totalRow) totalRow.style.display = '';
    if (targetRow) targetRow.style.display = '';
    document.getElementById('pp-price').textContent = formatCurrency(Number(p.price || 0));
    document.getElementById('pp-target').textContent = Number(p.targetQuantity || 0);
    document.getElementById('pp-total').textContent = formatCurrency(Number(p.price || 0) * Number(p.quantity || 0));
  }
  
  document.getElementById('pp-adjust-input').value = '';
  // image
  const prev = document.getElementById('pp-image-preview');
  if (p.imageUrl) { prev.src = p.imageUrl; prev.classList.remove('hidden'); }
  else { prev.src = ''; prev.classList.add('hidden'); }
  
  // Add "Used In" section for components in independent folders
  if (inIndependentFolder) {
    // Find or create the used-in card
    let usedInCard = document.getElementById('pp-used-in-card');
    if (!usedInCard) {
      const infoGrid = document.querySelector('.pp-info-grid');
      const parentDiv = infoGrid?.parentElement;
      
      if (parentDiv) {
        usedInCard = document.createElement('div');
        usedInCard.id = 'pp-used-in-card';
        usedInCard.className = 'pp-card';
        usedInCard.style.marginTop = '10px';
        
        const title = document.createElement('div');
        title.className = 'pp-card-title';
        title.textContent = __('Used In');
        
        const usedInGrid = document.createElement('div');
        usedInGrid.id = 'pp-used-in-grid';
        usedInGrid.style.display = 'flex';
        usedInGrid.style.flexWrap = 'wrap';
        usedInGrid.style.gap = '8px';
        usedInGrid.style.maxHeight = '120px';
        usedInGrid.style.overflowY = 'auto';
        usedInGrid.style.padding = '8px';
        usedInGrid.style.background = '#f9fafb';
        usedInGrid.style.borderRadius = '6px';
        usedInGrid.style.border = '1px solid #e5e7eb';
        
        usedInCard.appendChild(title);
        usedInCard.appendChild(usedInGrid);
        
        parentDiv.appendChild(usedInCard);
      }
    }
    
    // Populate the used-in section
    const usedInGrid = document.getElementById('pp-used-in-grid');
    if (usedInGrid) {
      usedInGrid.innerHTML = '';
      
      const usedInItems = getProductsUsingComponent(productId);
      
      if (usedInItems.length === 0) {
        const emptyRow = document.createElement('div');
        emptyRow.className = 'pp-row';
        emptyRow.style.justifyContent = 'center';
        emptyRow.style.padding = '10px';
        emptyRow.style.color = '#6b7280';
        emptyRow.textContent = __('Not used in any products');
        usedInGrid.appendChild(emptyRow);
      } else {
        // Create a compact single-line display with scrollable container
        usedInGrid.style.display = 'flex';
        usedInGrid.style.flexWrap = 'wrap';
        usedInGrid.style.gap = '8px';
        usedInGrid.style.maxHeight = '120px';
        usedInGrid.style.overflowY = 'auto';
        usedInGrid.style.padding = '8px';
        usedInGrid.style.background = '#f9fafb';
        usedInGrid.style.borderRadius = '6px';
        usedInGrid.style.border = '1px solid #e5e7eb';
        
        usedInItems.forEach(item => {
          const tag = document.createElement('div');
          tag.style.display = 'inline-flex';
          tag.style.alignItems = 'center';
          tag.style.gap = '6px';
          tag.style.padding = '6px 10px';
          tag.style.background = '#dbeafe';
          tag.style.border = '1px solid #93c5fd';
          tag.style.borderRadius = '20px';
          tag.style.fontSize = '13px';
          tag.style.whiteSpace = 'nowrap';
          tag.style.cursor = 'pointer';
          tag.style.transition = 'all 0.2s';
          
          const nameSpan = document.createElement('span');
          nameSpan.textContent = `${item.name} (${item.units})`;
          nameSpan.style.cursor = 'pointer';
          
          const removeBtn = document.createElement('span');
          removeBtn.textContent = '×';
          removeBtn.style.cursor = 'pointer';
          removeBtn.style.fontWeight = 'bold';
          removeBtn.style.fontSize = '16px';
          removeBtn.style.color = '#ef4444';
          removeBtn.style.marginLeft = '4px';
          removeBtn.style.transition = 'all 0.2s';
          
          // Hover effect
          tag.addEventListener('mouseenter', () => {
            tag.style.background = '#bfdbfe';
            tag.style.borderColor = '#60a5fa';
          });
          tag.addEventListener('mouseleave', () => {
            tag.style.background = '#dbeafe';
            tag.style.borderColor = '#93c5fd';
          });
          
          // Click on name to open that product
          nameSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            if (item.type === 'product') {
              openProductPage(item.id);
            } else if (item.type === 'folder') {
              currentFolderId = item.id;
              renderAll();
              closeProductPage();
            }
          });
          
          // Click on × to remove link
          removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal({
              title: 'Remove Link',
              headerIcon: { symbol: '!', color: 'red' },
              size: 'small',
              body: 'Unlink will break quantity sync. OK?',
              actions: [
                { label: __('Remove'), tone: 'danger', onClick: () => {
                  const component = appState.products[productId];
                  if (component && component.dynamicLinks) {
                    component.dynamicLinks = component.dynamicLinks.filter(link => 
                      !(link.type === item.type && link.targetId === item.id)
                    );
                  }
                  saveStateDebounced();
                  openProductPage(productId);
                } },
                { label: __('Cancel'), tone: 'secondary' }
              ]
            });
          });
          
          tag.appendChild(nameSpan);
          tag.appendChild(removeBtn);
          usedInGrid.appendChild(tag);
        });
      }
    }
  } else {
    // Not a component - remove used-in section if it exists
    const usedInCard = document.getElementById('pp-used-in-card');
    if (usedInCard) {
      usedInCard.remove();
    }
  }
  // note
  const noteEl = document.getElementById('pp-note');
  if (noteEl) {
    noteEl.value = p.note || '';
    // autosize to content (one-line min)
    const auto = () => { try { noteEl.style.height = 'auto'; noteEl.style.height = Math.max(36, noteEl.scrollHeight) + 'px'; } catch {} };
    noteEl.addEventListener('input', auto);
    setTimeout(auto, 0);
  }
  // ensure floating back exists (helps when keyboard covers header on small screens)
  try {
    const page = document.getElementById('product-page');
    let fab = document.getElementById('pp-back-fab');
    if (!fab) {
      fab = document.createElement('button');
      fab.id = 'pp-back-fab';
      fab.className = 'pp-fab-back';
      fab.type = 'button';
      fab.textContent = __('Back');
      fab.addEventListener('click', () => { closeProductPage(); });
      page.appendChild(fab);
    }
  } catch {}
  // show overlay
  document.getElementById('product-page').classList.remove('hidden');
}

function closeProductPage() {
  // Auto-save note on exit
  try { onSaveProductNote(); } catch {}
  document.getElementById('product-page').classList.add('hidden');
  productPageProductId = null;
  renderAll();
}

function adjustProductQuantity(direction) { // direction: +1 add, -1 remove
  if (!productPageProductId) return;
  const p = appState.products[productPageProductId];
  if (!p) return;
  const inputEl = document.getElementById('pp-adjust-input');
  const delta = Math.max(0, Number(inputEl.value || 0));
  if (delta === 0) { inputEl.focus(); showToast(__('Enter quantity')); return; }
  let qty = Number(p.quantity || 0);
  const newQty = direction > 0 ? qty + delta : Math.max(0, qty - delta);
  openModal({
    title: 'Confirm Quantity Change',
    headerIcon: { symbol: direction > 0 ? '\u2795' : '\u2796', color: direction > 0 ? 'green' : 'red' },
    size: 'small',
    body: `Change quantity from ${qty} to ${newQty}?`,
    actions: [
      { label: __('Confirm'), onClick: () => {
          p.quantity = newQty;
          const signed = direction > 0 ? delta : -delta;
          recordInventoryEvent({
            eventType: direction > 0 ? 'manual_add' : 'manual_remove',
            productId: p.id,
            productName: p.name || 'Product',
            delta: signed,
            price: Number(p.price || 0),
            value: Number(p.price || 0) * signed,
            source: 'product_page',
            note: direction > 0 ? 'Added quantity from the product page.' : 'Removed quantity from the product page.'
          });
          
          // Process dynamic link deductions if this is a sellable product and quantity increased
          if (direction > 0 && !isProductInIndependentFolder(productPageProductId)) {
            processDynamicLinkDeductions(productPageProductId, delta);
          }
          
          // Always save state after quantity changes
          saveStateDebounced();
          document.getElementById('pp-qty').textContent = p.quantity;
          // Only update total value for sellable products
          if (!isProductInIndependentFolder(productPageProductId)) {
            document.getElementById('pp-total').textContent = formatCurrency((Number(p.price || 0)) * p.quantity);
          }
          inputEl.value = '';
          renderFolderList(); // Re-render to reflect component quantity changes
          try { const adjEl = document.getElementById('pp-adjust-input'); adjEl && adjEl.blur(); } catch {}
          try { const pp = document.getElementById('product-page'); if (pp) pp.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
        } },
      { label: __('Cancel') }
    ]
  });
}

function correctProductQuantity() {
  if (!productPageProductId) return;
  const p = appState.products[productPageProductId];
  if (!p) return;
  const inputEl = document.getElementById('pp-adjust-input');
  const raw = String(inputEl.value || '').trim();
  if (raw === '') { inputEl.focus(); showToast(__('Enter quantity')); return; }
  const v = Number(raw);
  if (!Number.isFinite(v) || v < 0) { inputEl.focus(); showToast(__('Enter valid quantity')); return; }
  const newQty = Math.max(0, Math.floor(v));
  const currentQty = Number(p.quantity || 0);
  openModal({
    title: __('Ispravak'),
    headerIcon: { symbol: '\u270F', color: 'red' },
    size: 'small',
    body: `Promijeni količinu s ${currentQty} na ${newQty}? Ova radnja se ne bilježi u povijesti.`,
    actions: [
      { label: __('Confirm'), onClick: () => {
          p.quantity = newQty;
          // IMPORTANT: do NOT record this as an inventory event. This is an invisible correction.
          try { saveStateDebounced(); } catch {}
          const qtyEl = document.getElementById('pp-qty'); if (qtyEl) qtyEl.textContent = newQty;
          if (!isProductInIndependentFolder(productPageProductId)) {
            const totalEl = document.getElementById('pp-total'); if (totalEl) totalEl.textContent = formatCurrency(Number(p.price || 0) * newQty);
          }
          inputEl.value = '';
          renderFolderList();
          try { closeModal(); } catch {}
      }},
      { label: __('Cancel') }
    ]
  });
  try { inputEl.blur(); } catch {}
  showToast(__('Quantity corrected (no history recorded)'));
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
    saveStateDebounced();
  } catch (e) {
    // no-op
  }
}
