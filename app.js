function showResetStatsConfirm() {
  // Build warning body
  const body = document.createElement('div');
  body.style.display = 'grid'; body.style.gap = '10px'; body.style.maxWidth = '520px';
  const warn = document.createElement('div'); warn.textContent = 'ARE YOU SURE YOU WISH TO DELETE ALL PRODUCT STATISTICS, THIS IS IRREVERSABLE'; warn.style.color = '#ef4444'; warn.style.fontWeight = '700'; warn.style.textAlign = 'center';
  const note = document.createElement('div'); note.textContent = 'This will set the Quantity of every product to 0. Folders, products and settings remain unchanged.'; note.style.textAlign = 'center';
  const countdownEl = document.createElement('div'); countdownEl.style.textAlign = 'center'; countdownEl.style.color = '#6b7280';
  body.appendChild(warn); body.appendChild(note); body.appendChild(countdownEl);

  let seconds = 10;
  let confirmBtnRef = null;

  const tick = () => {
    countdownEl.textContent = `You can confirm in ${seconds}s`;
    if (confirmBtnRef) confirmBtnRef.disabled = seconds > 0;
    if (seconds > 0) { seconds -= 1; setTimeout(tick, 1000); }
    else { countdownEl.textContent = 'You may proceed.'; }
  };

  openModal({
    title: 'Confirm Reset Stats',
    body,
    actions: [
      { label: 'Confirm', onClick: () => { resetAllProductQuantities(); } },
      { label: 'Cancel' }
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
    p.quantity = 0;
  }
  saveStateDebounced();
  ensureDailyProgress();
  renderAll();
  showToast('All product quantities reset to 0');
}
// ---------------------------- Priority Graph ----------------------------
function renderPriorityGraph() {
  const box = document.getElementById('priority-graph');
  if (!box) return;
  const list = Object.values(appState.products || {}).filter(p => !!p.priority && Number(p.targetQuantity || 0) > 0);
  if (!list.length) { box.innerHTML = ''; box.classList.add('hidden'); return; }
  box.classList.remove('hidden');
  // Sort by progress ascending (least produced near top)
  list.sort((a,b) => (a.quantity/(a.targetQuantity||1)) - (b.quantity/(b.targetQuantity||1)));
  const wrap = document.createElement('div');
  wrap.innerHTML = `<div class="pg-title">Priority Progress</div>`;
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
    const bar = document.createElement('div'); bar.className = 'pg-bar';
    const fill = document.createElement('div'); fill.className = 'pg-fill';
    const ratio = Math.max(0, Math.min(1, Number(p.quantity||0) / Number(p.targetQuantity||1)));
    const pct = Math.round(ratio * 100);
    fill.style.width = `${pct}%`; bar.appendChild(fill);
    const percent = document.createElement('div'); percent.className = 'pg-percent'; percent.textContent = `${pct}%`;
    const color = pctColor(pct);
    percent.style.color = color;
    const meta = document.createElement('div'); meta.className = 'pg-meta';
    meta.innerHTML = `${Number(p.quantity||0)} / ${Number(p.targetQuantity||0)} pc <span style="color:${color}">(${pct}%)</span>`;
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

// ---------------------------- Auth ----------------------------
const APP_PASSCODE = '9277';
const AUTH_SESSION_KEY = 'murano_auth_ok';
 
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
  ensureAudioCtx();
  loadClickBuffer();
  tryBeep();
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
      clickCtx = new (window.AudioContext || window.webkitAudioContext)();
      clickGain = clickCtx.createGain();
      clickGain.gain.value = 0.25; // louder
      clickGain.connect(clickCtx.destination);
    }
    if (clickCtx.state === 'suspended') {
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
        ensureAudioCtx();
        const buf = await clickCtx.decodeAudioData(arr.slice(0));
        if (buf) { clickBuffer = buf; break; }
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
  return false;
}
try {
  // Unlock audio on first gesture
  document.addEventListener('pointerdown', unlockClickAudio, { capture: true, passive: true });
  document.addEventListener('touchstart', unlockClickAudio, { capture: true, passive: true });
  document.addEventListener('mousedown', unlockClickAudio, { capture: true, passive: true });
  document.addEventListener('keydown', unlockClickAudio, { capture: true, passive: true });
  // Play on common interaction endpoints
  const onInteract = () => { playClick(); };
  document.addEventListener('click', onInteract, true);
  document.addEventListener('pointerup', onInteract, true);
  document.addEventListener('touchend', onInteract, true);
  document.addEventListener('mousedown', onInteract, true);
  document.addEventListener('mouseup', onInteract, true);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') playClick();
  }, true);
} catch {}


function ensureAuthOverlayElements() {
  if (document.getElementById('auth-overlay')) return;
  const ov = document.createElement('div'); ov.id = 'auth-overlay';
  const box = document.createElement('div'); box.className = 'auth-box';
  const title = document.createElement('div'); title.className = 'auth-title'; title.textContent = 'Unlock';
  const desc = document.createElement('div'); desc.className = 'auth-desc'; desc.textContent = 'Authenticate to continue';
  const pad = document.createElement('div'); pad.id = 'auth-pad'; pad.className = '';
  const inp = document.createElement('input'); inp.id = 'auth-code'; inp.type = 'password'; inp.inputMode = 'numeric'; inp.maxLength = 4; inp.autocomplete = 'off'; inp.placeholder = '• • • •';
  const keys = document.createElement('div'); keys.className = 'pad-grid';
  const buttons = ['1','2','3','4','5','6','7','8','9','⌫','0','OK'];
  for (const k of buttons) {
    const b = document.createElement('button'); b.textContent = k; b.dataset.key = k; keys.appendChild(b);
    try { b.addEventListener('click', () => playClick()); } catch {}
  }
  pad.appendChild(inp); pad.appendChild(keys);
  box.appendChild(title); box.appendChild(desc); box.appendChild(pad);
  ov.appendChild(box); document.body.appendChild(ov);
  // Passcode only: show keypad immediately
  pad.classList.remove('hidden');
  setTimeout(()=>inp.focus(),0);
  keys.addEventListener('click', (e) => {
    const t = e.target; if (!(t instanceof HTMLElement)) return; const key = t.dataset.key; if (!key) return;
    if (key === '⌫') { inp.value = inp.value.slice(0,-1); return; }
    if (key === 'OK') { tryPasscode(); return; }
    if (/^\d$/.test(key) && inp.value.length < 4) inp.value += key;
  });
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); tryPasscode(); }
    if (e.key === 'Backspace') return;
    if (!/\d/.test(e.key)) e.preventDefault();
  });
  function tryPasscode() {
    if (inp.value === APP_PASSCODE) { sessionStorage.setItem(AUTH_SESSION_KEY, '1'); ov.classList.add('hidden'); }
    else { inp.value = ''; inp.focus(); }
  }
}

async function ensureAuthenticated() {
  try { if (sessionStorage.getItem(AUTH_SESSION_KEY) === '1') return; } catch {}
  ensureAuthOverlayElements();
  const ov = document.getElementById('auth-overlay');
  ov.classList.remove('hidden');
  // Passcode-only per requirements (biometrics disabled)
  // Fallback waits for passcode entry; do not resolve until authenticated
  await new Promise((resolve) => {
    const watcher = setInterval(() => {
      if (sessionStorage.getItem(AUTH_SESSION_KEY) === '1') { clearInterval(watcher); resolve(); }
    }, 200);
  });
}

// ---------------------------- Daily Progress ----------------------------
function todayStr() {
  const d = new Date(); d.setHours(0,0,0,0); return d.toISOString().slice(0,10);
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
    // Same day: if current total is less than start value, reset start to current
    // This handles the case where everything was deleted
    if (stats.totalValue < appState.dailyProgress.startValue) {
      appState.dailyProgress.startValue = stats.totalValue || 0;
      try { saveStateDebounced(); } catch {}
    }
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

// ---------------------------- Reorder (Drag & Drop) ----------------------------
let dragSrcEl = null;
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
function attachReorderDnD(li, kind, id, curFolder) {
  // Long-press to enable dragging
  li.setAttribute('draggable', 'false');
  li.dataset.kind = kind;
  li.dataset.id = id; // id can be raw id or mixed key like 'f:ID' or 'p:ID'
  let lpTimer = null;
  const enableDrag = () => { li.setAttribute('draggable', 'true'); li.classList.add('drag-ready'); };
  const disableDrag = () => { li.setAttribute('draggable', 'false'); li.classList.remove('drag-ready'); };

  const clearLP = () => { if (lpTimer) { clearTimeout(lpTimer); lpTimer = null; } };
  li.addEventListener('pointerdown', () => { clearLP(); lpTimer = setTimeout(enableDrag, 200); });
  li.addEventListener('pointerup', () => { clearLP(); });
  li.addEventListener('pointerleave', () => { clearLP(); });
  li.addEventListener('pointercancel', () => { clearLP(); });

  li.addEventListener('dragstart', (e) => {
    dragSrcEl = li;
    li.classList.add('dragging');
    try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', id); } catch {}
  });
  li.addEventListener('dragend', () => {
    li.classList.remove('dragging');
    document.querySelectorAll('.drop-before').forEach(n => n.classList.remove('drop-before'));
    dragSrcEl = null;
    // Disable drag until next long-press
    disableDrag();
  });
  li.addEventListener('dragover', (e) => {
    e.preventDefault();
    const target = li;
    if (!dragSrcEl || dragSrcEl === target) return;
    const rect = target.getBoundingClientRect();
    const before = (e.clientY - rect.top) < rect.height / 2;
    target.classList.toggle('drop-before', before);
  });
  li.addEventListener('dragleave', () => {
    li.classList.remove('drop-before');
  });
  li.addEventListener('drop', (e) => {
    e.preventDefault();
    li.classList.remove('drop-before');
    if (!dragSrcEl || dragSrcEl === li) return;
    const srcId = dragSrcEl.dataset.id;
    const dstId = li.dataset.id;
    const arr = kind === 'order' ? getFolderOrder(curFolder) : (kind === 'folder' ? curFolder.subfolders : curFolder.products);
    const srcIdx = arr.indexOf(srcId);
    const dstIdx = arr.indexOf(dstId);
    if (srcIdx < 0 || dstIdx < 0) return;
    // Determine insertion index (before or after)
    const rect = li.getBoundingClientRect();
    const before = (e.clientY - rect.top) < rect.height / 2;
    // Remove src
    arr.splice(srcIdx, 1);
    let insertAt = dstIdx;
    if (!before) insertAt = dstIdx + (srcIdx < dstIdx ? 0 : 1);
    else insertAt = dstIdx + (srcIdx < dstIdx ? -1 : 0);
    if (insertAt < 0) insertAt = 0;
    if (insertAt > arr.length) insertAt = arr.length;
    arr.splice(insertAt, 0, srcId);
    if (kind === 'order') setFolderOrder(curFolder, arr);
    saveStateDebounced();
    renderAll();
  });
}

// ---------------------------- Autosave Pipeline ----------------------------
let autosaveInProgress = false;
let autosaveQueued = false;
let lastAutosaveTs = 0;
let lastUploadedBackupName = null; // name like save_YYYY-MM-DD_hh-mm-ss.json
let lastAppliedBackupName = null;  // last remote backup name that we loaded into app
let remotePollTimerId = null;

async function runAutosave(downloadAlso = false) {
  if (autosaveInProgress) { autosaveQueued = true; return; }
  if (!navigator.onLine || !ENABLE_CLOUD) { autosaveQueued = true; return; }
  try {
    autosaveInProgress = true;
    setSyncStatus('Syncing…'); // yellow blink
    // Use the same pipeline as manual Save button
    await saveSnapshot(downloadAlso);
    await uploadBackupToCloud();
    // If both above succeeded, uploadBackupToCloud will set status; ensure saved state here too
    setSyncStatus('Backup saved'); // green with check
    lastAutosaveTs = Date.now();
  } catch (e) {
    console.warn('Autosave failed', e);
    setSyncStatus('Upload error');
    autosaveQueued = true;
  } finally {
    autosaveInProgress = false;
    if (autosaveQueued && navigator.onLine) {
      autosaveQueued = false;
      // Debounce small bursts
      setTimeout(() => runAutosave(false), 500);
    }
  }
}

function scheduleAutosave() {
  // Try immediately; if offline it will queue
  runAutosave(false);
}

// (moved: computeProductionInRange/exportProductionPDF defined later once)

function openActionsMenu() {
  const body = document.createElement('div');
  const saveBtn = document.createElement('button'); saveBtn.textContent = 'Save (snapshot + cloud)'; saveBtn.type = 'button';
  const importBtn = document.createElement('button'); importBtn.textContent = 'Import JSON'; importBtn.type = 'button';
  const exportBtn = document.createElement('button'); exportBtn.textContent = 'Export JSON'; exportBtn.type = 'button';
  [saveBtn, importBtn, exportBtn].forEach(b => { b.style.display = 'block'; b.style.marginBottom = '8px'; });
  body.appendChild(saveBtn); body.appendChild(importBtn); body.appendChild(exportBtn);
  openModal({
    title: 'Actions',
    body,
    actions: [ { label: 'Close' } ]
  });
  saveBtn.addEventListener('click', async () => { await saveSnapshot(true); await uploadBackupToCloud(); closeModal(); });
  importBtn.addEventListener('click', () => { document.getElementById('import-file').click(); closeModal(); });
  exportBtn.addEventListener('click', () => { exportState(); closeModal(); });
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
      backupLoaded = true;
      setSyncStatus('Synced');
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
    setSyncStatus('Backup saved');
    // Retention: keep only latest 3 backups
    await pruneBackups(3).catch(err => console.warn('Prune failed', err));
    lastUploadedBackupName = fileName;
    // Persist the latest name we created (so other tabs/devices can compare)
    try { localStorage.setItem(LAST_BACKUP_NAME_KEY, fileName); lastKnownBackupName = fileName; } catch {}
  } catch (e) {
    console.warn(e);
    setSyncStatus('Upload error');
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
      setSyncStatus('Synced');
      return true;
    }
  } catch (e) {
    console.warn('Apply remote backup failed', e);
    setSyncStatus('Cloud error');
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
        setSyncStatus('Checking cloud…');
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
  nameInput.addEventListener('focus', () => { try { nameInput.select(); } catch {} });
  nameRow.appendChild(nameLabel); nameRow.appendChild(nameInput);

  const priceRow = document.createElement('div'); priceRow.style.marginTop = '10px';
  const priceLabel = document.createElement('div'); priceLabel.textContent = 'Price'; priceLabel.style.marginBottom = '4px';
  const priceInput = document.createElement('input'); priceInput.type = 'number'; priceInput.step = '0.01'; priceInput.min = '0'; priceInput.value = p.price || 0; priceInput.style.width = '100%'; priceInput.style.padding = '8px'; priceInput.style.border = '1px solid #d1d5db'; priceInput.style.borderRadius = '8px'; priceInput.inputMode = 'decimal';
  priceInput.addEventListener('focus', () => { try { priceInput.select(); } catch {} });
  priceRow.appendChild(priceLabel); priceRow.appendChild(priceInput);

  // Target Quantity row (under Price)
  const targetRow = document.createElement('div'); targetRow.style.marginTop = '10px';
  const targetLabel = document.createElement('div'); targetLabel.textContent = 'Target Quantity'; targetLabel.style.marginBottom = '4px';
  const targetInput = document.createElement('input'); targetInput.type = 'number'; targetInput.step = '1'; targetInput.min = '0'; targetInput.value = p.targetQuantity || 0; targetInput.style.width = '100%'; targetInput.style.padding = '8px'; targetInput.style.border = '1px solid #d1d5db'; targetInput.style.borderRadius = '8px'; targetInput.inputMode = 'numeric';
  targetInput.addEventListener('focus', () => { try { targetInput.select(); } catch {} });
  targetRow.appendChild(targetLabel); targetRow.appendChild(targetInput);

  wrap.appendChild(nameRow);
  wrap.appendChild(priceRow);
  wrap.appendChild(targetRow);

  openModal({
    title: 'Edit Product',
    body: wrap,
    actions: [
      { label: 'Save', onClick: () => {
          const newName = nameInput.value.trim();
          const newPrice = Number(priceInput.value || 0);
          const newTarget = Number(targetInput.value || 0);
          openModal({
            title: 'Confirm Save',
            body: 'Apply these changes to the product?',
            actions: [
              { label: 'Confirm', onClick: () => {
                  p.name = newName || p.name;
                  p.price = newPrice;
                  p.targetQuantity = newTarget;
                  saveStateDebounced();
                  // update product page fields
                  document.getElementById('pp-title').textContent = p.name;
                  document.getElementById('pp-name').textContent = p.name;
                  document.getElementById('pp-price').textContent = formatCurrency(p.price);
                  document.getElementById('pp-qty').textContent = p.quantity || 0;
                  document.getElementById('pp-target').textContent = p.targetQuantity || 0;
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
  setTimeout(() => { try { nameInput.focus(); nameInput.select(); } catch {} }, 0);
  try { document.getElementById('modal-close').textContent = '← Back'; } catch {}
}

function openSettings() {
  const wrap = document.createElement('div');
  wrap.className = 'settings-wrap';
  const plannedGroup = document.createElement('div'); plannedGroup.className = 'set-row';
  const plannedLabel = document.createElement('label'); plannedLabel.className = 'set-col'; plannedLabel.innerHTML = `<div class="set-k">Planned total</div>`;
  const plannedInput = document.createElement('input'); plannedInput.type = 'number'; plannedInput.min = '0'; plannedInput.step = '1'; plannedInput.inputMode = 'numeric'; plannedInput.placeholder = 'e.g. 30000'; plannedInput.value = appState.settings?.plannedValue ?? '';
  plannedLabel.appendChild(plannedInput);
  const dateLabel = document.createElement('label'); dateLabel.className = 'set-col'; dateLabel.innerHTML = `<div class="set-k">End date</div>`;
  const dateInput = document.createElement('input'); dateInput.type = 'date'; dateInput.value = appState.settings?.endDate ? new Date(appState.settings.endDate).toISOString().slice(0,10) : '';
  dateLabel.appendChild(dateInput);
  plannedGroup.appendChild(plannedLabel); plannedGroup.appendChild(dateLabel);
  wrap.appendChild(plannedGroup);
  // Autosize inputs to their display length using the size attribute
  const autosizeInput = (el, extra = 4, min = 8) => {
    try {
      let len = 0;
      if (el.type === 'number') {
        const n = Number(el.value || 0);
        const formatted = new Intl.NumberFormat().format(isFinite(n) ? n : 0);
        len = formatted.length;
      } else if (el.type === 'date') {
        const s = String(el.value || el.placeholder || 'YYYY-MM-DD');
        len = s.length;
      } else {
        len = String(el.value || el.placeholder || '').length;
      }
      el.size = Math.max(min, len + extra);
      el.style.width = 'auto';
    } catch {}
  };
  autosizeInput(plannedInput, 4, 10);
  autosizeInput(dateInput, 2, 10);
  plannedInput.addEventListener('input', () => autosizeInput(plannedInput, 4, 10));
  plannedInput.addEventListener('change', () => autosizeInput(plannedInput, 4, 10));
  dateInput.addEventListener('input', () => autosizeInput(dateInput, 2, 10));
  dateInput.addEventListener('change', () => autosizeInput(dateInput, 2, 10));
  // Make both inputs the same width (use the date input's rendered width)
  const syncWidths = () => {
    try {
      // Temporarily reset widths to measure natural date width
      plannedInput.style.width = 'auto';
      dateInput.style.width = 'auto';
      plannedInput.style.minWidth = '0';
      dateInput.style.minWidth = '0';
      const w = Math.ceil(dateInput.getBoundingClientRect().width);
      if (w && isFinite(w)) {
        plannedInput.style.width = `${w}px`;
        dateInput.style.width = `${w}px`;
      }
    } catch {}
  };
  // Initial and reactive sync
  setTimeout(syncWidths, 0);
  window.addEventListener('resize', syncWidths, { once: true });
  dateInput.addEventListener('input', syncWidths);
  dateInput.addEventListener('change', syncWidths);
  plannedInput.addEventListener('input', syncWidths);
  plannedInput.addEventListener('change', syncWidths);
  openModal({
    title: 'Settings',
    body: wrap,
    actions: [
      { label: 'Reset Stats', onClick: () => showResetStatsConfirm() },
      { label: 'Show Report', onClick: () => { setTimeout(() => openReportModal(), 0); } },
      { label: 'Save', onClick: () => {
          appState.settings = appState.settings || {};
          appState.settings.plannedValue = Number(plannedInput.value || 0);
          if (dateInput.value) {
            const endLocal = new Date(`${dateInput.value}T23:59:59`);
            appState.settings.endDate = endLocal.toISOString();
          } else {
            appState.settings.endDate = null;
          }
          // Recompute today's goal immediately to reflect changes
          recomputeDailyGoalNow();
          saveStateDebounced();
          renderAll();
          showToast('Settings saved');
        } }
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
    // Style destructive actions as red
    try {
      const lbl = String(a.label || '').toLowerCase();
      if (lbl.includes('delete') || lbl.includes('remove') || lbl.includes('reset')) b.classList.add('danger');
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
function closeModal() { document.getElementById('modal').classList.add('hidden'); }

function setSyncStatus(text) {
  const el = document.getElementById('sync-status');
  if (!el) return;
  // reset
  el.classList.remove('status-active', 'status-ok', 'status-error', 'status-saved');
  el.textContent = '';
  el.setAttribute('aria-label', String(text || ''));

  const t = String(text || '').toLowerCase();
  // Active: checking, uploading, syncing
  if (t.includes('checking') || t.includes('upload') || t.includes('sync') && !(t.includes('saved') || t.includes('synced'))) {
    el.classList.add('status-active');
    return;
  }
  // Error states
  if (t.includes('offline') || t.includes('error') || t.includes('fail')) {
    el.classList.add('status-error');
    return;
  }
  // Saved/synced OK
  if (t.includes('saved') || t.includes('synced') || t.includes('backup saved')) {
    el.classList.add('status-saved');
    el.textContent = '✓';
    return;
  }
  // Generic OK/online
  if (t.includes('online') || t.includes('ok') || t.includes('ready')) {
    el.classList.add('status-ok');
    return;
  }
  // default: leave neutral gray
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
  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(async () => {
    try {
      appState.lastModified = Date.now();
      await writeState(appState);
      // Trigger autosave to cloud backup (same logic as Save button)
      scheduleAutosave();
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
      const goalReached = addedToday >= fixedDailyGoal;
      const goalLabel = goalReached ? 'Produced today' : 'Daily goal';
      const goalValue = goalReached ? formatCurrency(addedToday) : formatCurrency(fixedDailyGoal);
      itemRemain.innerHTML = `
        <div class="sb-col">
          <div class="sb-k">${goalLabel}</div>
          <div class="sb-v">${goalValue}</div>
        </div>
        <div class="sb-col">
          <div class="sb-k sb-bad">To do</div>
          <div class="sb-v sb-bad">${formatCurrency(remainingToday)}</div>
        </div>
        ${extraToday>0?`<div class="sb-col">
          <div class="sb-k sb-good">Extra</div>
          <div class="sb-v sb-good">+${formatCurrency(extraToday)}</div>
        </div>`:''}
      `;
      wrap.appendChild(itemRemain);
    }

    // Then Days left
    if (settings.endDate) {
      const end = new Date(settings.endDate);
      const today = new Date(); today.setHours(0,0,0,0);
      const rawDays = Math.ceil((end.getTime() - today.getTime())/(1000*60*60*24));
      const daysLeft = Math.max(0, rawDays);
      const itemDays = document.createElement('div'); itemDays.className = 'sb-item'; itemDays.innerHTML = `<div class="sb-k">Days left</div><div class="sb-v">${daysLeft}</div>`;
      wrap.appendChild(itemDays);
    }

    // Finally totals: Qty and Value
    const itemQty = document.createElement('div'); itemQty.className = 'sb-item'; itemQty.innerHTML = `<div class="sb-k">Total Qty</div><div class="sb-v">${stats.totalQty} pc</div>`;
    const itemVal = document.createElement('div'); itemVal.className = 'sb-item'; itemVal.innerHTML = `<div class="sb-k">Total Value</div><div class="sb-v">${formatCurrency(stats.totalValue)}</div>`;
    wrap.appendChild(itemQty); wrap.appendChild(itemVal);

    statsBar.appendChild(wrap);
  }

  // Mixed order render (folders and products interleaved)
  const order = getFolderOrder(curFolder);
  for (const key of order) {
    if (key.startsWith('f:')) {
      const fid = key.slice(2);
      const f = appState.folders[fid];
      if (!f) continue;
      const stats = computeStats(fid);
      const li = document.createElement('li');
      const left = document.createElement('div'); left.className = 'item-left';
      const icon = document.createElement('div'); icon.className = 'icon-box';
      if (f.imageUrl) { const img = document.createElement('img'); img.src = f.imageUrl; img.alt = 'folder'; icon.appendChild(img); }
      else { icon.textContent = '📁'; }
      const textCol = document.createElement('div'); textCol.className = 'text-col';
      const name = document.createElement('span'); name.className = 'name'; name.textContent = f.name;
      name.addEventListener('click', () => { currentFolderId = fid; renderAll(); });
      const meta = document.createElement('span'); meta.className = 'meta'; meta.textContent = `Qty: ${stats.totalQty}   ${formatCurrency(stats.totalValue)}`;
      textCol.appendChild(name); textCol.appendChild(meta);
      left.appendChild(icon); left.appendChild(textCol);
      left.style.cursor = 'pointer'; left.addEventListener('click', () => { currentFolderId = fid; renderAll(); });
      const actions = document.createElement('div'); actions.className = 'actions';
      const actIcon = document.createElement('span'); actIcon.textContent = '📁'; actIcon.setAttribute('aria-hidden', 'true');
      const moreBtn = document.createElement('button'); moreBtn.textContent = '⋯'; moreBtn.title = 'More';
      moreBtn.addEventListener('click', (e) => { e.stopPropagation(); openFolderMenu(fid); });
      actions.appendChild(actIcon);
      actions.appendChild(moreBtn);
      // Use unified order DnD with mixed key
      attachReorderDnD(li, 'order', `f:${fid}`, curFolder);
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
      pname.addEventListener('click', () => openProductPage(p.id));
      const pmeta = document.createElement('span'); pmeta.className = 'meta';
      const qty = Number(p.quantity || 0); const price = Number(p.price || 0);
      pmeta.textContent = `Qty: ${qty}   ${formatCurrency(qty * price)}`;
      ptext.appendChild(pname); ptext.appendChild(pmeta);
      leftp.appendChild(picon); leftp.appendChild(ptext);
      leftp.style.cursor = 'pointer'; leftp.addEventListener('click', () => openProductPage(p.id));
      const actionsP = document.createElement('div'); actionsP.className = 'actions';
      const moreBtnP = document.createElement('button'); moreBtnP.textContent = '⋯'; moreBtnP.title = 'More';
      moreBtnP.addEventListener('click', (e) => { e.stopPropagation(); openProductMenu(p.id); });
      actionsP.appendChild(moreBtnP);
      // Use unified order DnD with mixed key
      attachReorderDnD(pli, 'order', `p:${p.id}`, curFolder);
      pli.appendChild(leftp); pli.appendChild(actionsP); rootUl.appendChild(pli);
    }
  }

  container.appendChild(rootUl);
}

function renderAll() {
  renderBreadcrumbs();
  renderFolderList();
  renderPriorityGraph();
}

function openFolderEditModal(folderId) {
  const f = appState.folders[folderId];
  if (!f) return;
  const wrap = document.createElement('div');
  const nameRow = document.createElement('div');
  const nameLabel = document.createElement('div'); nameLabel.textContent = 'Name'; nameLabel.style.marginBottom = '4px';
  const nameInput = document.createElement('input'); nameInput.type = 'text'; nameInput.value = f.name || ''; nameInput.style.width = '100%'; nameInput.style.padding = '8px'; nameInput.style.border = '1px solid #d1d5db'; nameInput.style.borderRadius = '8px';
  nameInput.addEventListener('focus', () => { try { nameInput.select(); } catch {} });
  nameRow.appendChild(nameLabel); nameRow.appendChild(nameInput);

  const imgRow = document.createElement('div'); imgRow.style.marginTop = '10px';
  const imgLabel = document.createElement('div'); imgLabel.textContent = 'Image'; imgLabel.style.marginBottom = '4px';
  const imgInput = document.createElement('input'); imgInput.type = 'file'; imgInput.accept = 'image/*';
  const preview = document.createElement('div'); preview.style.marginTop = '6px'; preview.innerHTML = f.imageUrl ? `<img src="${f.imageUrl}" alt="folder" style="max-width:100%;border-radius:8px;border:1px solid #e5e7eb;"/>` : '';
  imgInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { const dataUrl = await resizeImageToDataURL(file, 300, 300); f.imageUrl = dataUrl; preview.innerHTML = `<img src="${f.imageUrl}" alt="folder" style="max-width:100%;border-radius:8px;border:1px solid #e5e7eb;"/>`; saveStateDebounced(); }
    catch {}
  });
  imgRow.appendChild(imgLabel); imgRow.appendChild(imgInput); imgRow.appendChild(preview);

  wrap.appendChild(nameRow);
  wrap.appendChild(imgRow);

  openModal({
    title: 'Edit Folder',
    body: wrap,
    actions: [
      { label: 'Save', onClick: () => {
          const newName = nameInput.value.trim();
          f.name = newName || f.name;
          saveStateDebounced();
          renderAll();
        } },
      { label: 'Cancel' }
    ]
  });
  setTimeout(() => { try { nameInput.focus(); nameInput.select(); } catch {} }, 0);
}

// Create Product modal (name + optional image)
function openProductCreateModal(folderId) {
  const wrap = document.createElement('div');
  const nameRow = document.createElement('div');
  const nameLabel = document.createElement('div'); nameLabel.textContent = 'Name'; nameLabel.style.marginBottom = '4px';
  const nameInput = document.createElement('input'); nameInput.type = 'text'; nameInput.placeholder = 'Product name'; nameInput.style.width = '100%'; nameInput.style.padding = '8px'; nameInput.style.border = '1px solid #cbd5e1'; nameInput.style.borderRadius = '8px';
  nameInput.addEventListener('focus', () => { try { nameInput.select(); } catch {} });
  nameRow.appendChild(nameLabel); nameRow.appendChild(nameInput);

  const imgRow = document.createElement('div'); imgRow.style.marginTop = '10px';
  const imgLabel = document.createElement('div'); imgLabel.textContent = 'Image'; imgLabel.style.marginBottom = '4px';
  const imgInput = document.createElement('input'); imgInput.type = 'file'; imgInput.accept = 'image/*';
  const preview = document.createElement('div'); preview.style.marginTop = '6px';
  imgInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { const dataUrl = await resizeImageToDataURL(file, 300, 300); preview.innerHTML = `<img src="${dataUrl}" alt="product" style="max-width:100%;border-radius:8px;border:1px solid #cbd5e1;"/>`; preview.dataset.src = dataUrl; }
    catch {}
  });
  imgRow.appendChild(imgLabel); imgRow.appendChild(imgInput); imgRow.appendChild(preview);

  wrap.appendChild(nameRow);
  wrap.appendChild(imgRow);

  openModal({
    title: 'New Product',
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
      { label: 'Cancel' }
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
    const p = id ? appState.products[id] : { name: '', price: 0, quantity: 0, note: '', targetQuantity: 0, priority: false };
    document.getElementById('editor-name').value = p.name || '';
    document.getElementById('editor-price').value = p.price ?? 0;
    document.getElementById('editor-quantity').value = p.quantity ?? 0;
    document.getElementById('editor-target').value = p.targetQuantity ?? 0;
    const prio = document.getElementById('editor-priority'); if (prio) prio.checked = !!p.priority;
    document.getElementById('product-fields').classList.remove('hidden');
    // Note is edited on product page; no custom fields UI
  }

  panel.classList.remove('hidden');
  // Back label
  const backBtn = document.getElementById('editor-close');
  if (backBtn) backBtn.textContent = '← Back';
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
  openFolderEditModal(id);
}

function createProduct(folderId) {
  // Open creation modal instead of immediate creation
  openProductCreateModal(folderId);
}

function deleteFolder(folderId) {
  if (folderId === 'root') return showToast('Cannot delete root');
  const f = appState.folders[folderId];
  if (!f) return;
  // Compute total value being removed for production log
  const stats = computeStats(folderId);
  const removedValue = stats.totalValue || 0;
  const removedQty = stats.totalQty || 0;
  // recursively delete subfolders
  for (const sf of [...f.subfolders]) deleteFolder(sf);
  // delete products
  for (const pid of [...f.products]) delete appState.products[pid];
  // remove from parent
  const parent = appState.folders[f.parentId];
  if (parent) parent.subfolders = parent.subfolders.filter(x => x !== folderId);
  delete appState.folders[folderId];
  // Log the removal as negative production
  if (removedValue > 0 || removedQty > 0) {
    appState.productionLog = appState.productionLog || [];
    appState.productionLog.push({ ts: Date.now(), productId: null, delta: -removedQty, price: 0, value: -removedValue });
  }
  saveStateDebounced();
  renderAll();
}

function deleteProduct(productId) {
  const p = appState.products[productId];
  if (!p) return;
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
    appState.productionLog = appState.productionLog || [];
    appState.productionLog.push({ ts: Date.now(), productId, delta: -removedQty, price: Number(p.price || 0), value: -removedValue });
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
    p.name = name || p.name;
    p.price = Number(document.getElementById('editor-price').value || 0);
    p.quantity = Number(document.getElementById('editor-quantity').value || 0);
    p.targetQuantity = Number(document.getElementById('editor-target').value || 0);
    p.priority = !!document.getElementById('editor-priority').checked;
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
    title: 'Choose item to create',
    body: 'Choose item to create',
    actions: [
      { label: 'New Folder', onClick: () => createFolder(targetFolderId) },
      { label: 'New Product', onClick: () => openProductCreateModal(targetFolderId) },
      { label: 'Cancel' }
    ]
  });
}

function openFolderMenu(folderId) {
  const header = document.createElement('div');
  header.style.display = 'flex'; header.style.alignItems = 'center'; header.style.gap = '8px';
  const icon = document.createElement('span'); icon.textContent = '📁';
  const label = document.createElement('span'); label.textContent = 'Select an action';
  header.appendChild(icon); header.appendChild(label);
  openModal({
    title: 'Folder actions',
    body: header,
    actions: [
      { label: 'Edit', onClick: () => openFolderEditModal(folderId) },
      { label: 'New Subfolder', onClick: () => createFolder(folderId) },
      { label: 'New Product', onClick: () => openProductCreateModal(folderId) },
      { label: 'Move to…', onClick: () => openMoveDialog('folder', folderId) },
      { label: 'Delete', onClick: () => confirmDeleteFolder(folderId) }
    ]
  });
}

function openProductMenu(productId) {
  openModal({
    title: 'Product actions',
    body: 'Select an action',
    actions: [
      { label: 'Edit', onClick: () => openProductEditModal(productId) },
      { label: 'Duplicate', onClick: () => duplicateProduct(productId) },
      { label: 'Move to…', onClick: () => openMoveDialog('product', productId) },
      { label: (() => { const p = appState.products[productId]; return p?.priority ? 'Unmark priority' : 'Mark as priority'; })(), onClick: () => {
          const p = appState.products[productId]; if (!p) return; p.priority = !p.priority; saveStateDebounced(); renderAll();
        } },
      { label: 'Delete', onClick: () => confirmDeleteProduct(productId) }
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
  saveStateDebounced();
  openProductEditModal(id);
}

function openMoveDialog(type, id) {
  const wrapper = document.createElement('div');
  const list = document.createElement('div');
  list.style.display = 'grid';
  list.style.gap = '8px';
  const radios = [];
  const addFolderOption = (fid, label, disabled) => {
    const row = document.createElement('label');
    row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.gap = '8px';
    const r = document.createElement('input'); r.type = 'radio'; r.name = 'move-target'; r.value = fid; r.disabled = !!disabled;
    const span = document.createElement('span'); span.textContent = label;
    row.appendChild(r); row.appendChild(span); list.appendChild(row); radios.push(r);
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
    title: 'Move to…',
    body: wrapper,
    actions: [
      { label: 'Confirm', onClick: () => {
          const r = radios.find(x => x.checked);
          if (!r) return;
          const target = r.value;
          if (type === 'product') moveProductTo(id, target); else moveFolderTo(id, target);
        } },
      { label: 'Cancel' }
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
    if (!res.ok) { return null; }
    const data = await res.json();
    setSyncStatus('Synced');
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
  clearAllCookies();
  try { await ensureAuthenticated(); } catch {}
  // DB
  try { db = await openDB(); } catch (e) { console.error(e); showToast('IndexedDB error'); }
  appState = await readState();
  if (!appState) appState = initEmptyState();
  await maybeLoadSample();

  // UI wiring
  document.getElementById('add-btn').addEventListener('click', () => openAddMenu(currentFolderId));
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) saveBtn.addEventListener('click', async () => { await saveSnapshot(true); await uploadBackupToCloud(); showToast('Saved'); });
  const actionsBtn = document.getElementById('actions-btn');
  if (actionsBtn) actionsBtn.addEventListener('click', openActionsMenu);
  const importFileEl = document.getElementById('import-file');
  if (importFileEl) importFileEl.addEventListener('change', (e) => { const f = e.target.files?.[0]; if (f) importState(f); e.target.value = ''; });
  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) settingsBtn.addEventListener('click', openSettings);

  // Connectivity listeners: keep status accurate and flush queued autosave when back online
  window.addEventListener('online', () => {
    setSyncStatus('Online');
    if (autosaveQueued) runAutosave(false);
  });
  window.addEventListener('offline', () => {
    setSyncStatus('Offline');
  });
  // Set initial status based on connectivity
  setSyncStatus(navigator.onLine ? 'Online' : 'Offline');
  // Start remote watcher
  startRemoteBackupWatcher();

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

  // Try load latest backup from cloud before first render
  await loadLatestCloudBackup();
  ensureDailyProgress();
  renderAll();

  // network status
  const updateNet = () => setSyncStatus(navigator.onLine ? 'Online' : 'Offline');
  window.addEventListener('online', () => { updateNet(); queueCloudSync(); });
  window.addEventListener('offline', updateNet);
  updateNet();

  // initial cloud
  // If we already loaded a backup successfully, skip legacy single-file sync to avoid confusing statuses
  if (!backupLoaded) {
    await initialCloudSync();
  }

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
  // Note autosaves on exit; no explicit Save button binding
  const adj = document.getElementById('pp-adjust-input');
  if (adj) {
    adj.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); adjustProductQuantity(+1); } });
    adj.addEventListener('focus', () => { try { const pp = document.getElementById('product-page'); if (pp) pp.scrollTo({ top: 0, behavior: 'smooth' }); } catch {} });
  }
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
  document.getElementById('pp-target').textContent = Number(p.targetQuantity || 0);
  document.getElementById('pp-total').textContent = formatCurrency(Number(p.price || 0) * Number(p.quantity || 0));
  document.getElementById('pp-adjust-input').value = '';
  // image
  const prev = document.getElementById('pp-image-preview');
  if (p.imageUrl) { prev.src = p.imageUrl; prev.classList.remove('hidden'); }
  else { prev.src = ''; prev.classList.add('hidden'); }
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
      fab.textContent = 'Back';
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
  if (delta === 0) { inputEl.focus(); showToast('Enter quantity'); return; }
  let qty = Number(p.quantity || 0);
  const newQty = direction > 0 ? qty + delta : Math.max(0, qty - delta);
  openModal({
    title: 'Confirm Quantity Change',
    body: `Change quantity from ${qty} to ${newQty}?`,
    actions: [
      { label: 'Confirm', onClick: () => {
          p.quantity = newQty;
          // log production change
          const signed = direction > 0 ? delta : -delta;
          appState.productionLog = appState.productionLog || [];
          appState.productionLog.push({ ts: Date.now(), productId: p.id, delta: signed, price: Number(p.price||0), value: Number(p.price||0) * signed });
          saveStateDebounced();
          document.getElementById('pp-qty').textContent = p.quantity;
          document.getElementById('pp-total').textContent = formatCurrency((Number(p.price || 0)) * p.quantity);
          renderFolderList();
          try { const adjEl = document.getElementById('pp-adjust-input'); adjEl && adjEl.blur(); } catch {}
          try { const pp = document.getElementById('product-page'); if (pp) pp.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
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
    saveStateDebounced();
  } catch (e) {
    // no-op
  }
}
