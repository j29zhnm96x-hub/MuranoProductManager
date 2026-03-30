# Murano Product Manager Agent Guide

## Start Here

This application is actively used for business operations. Make the smallest safe change that solves the task, and treat data integrity as the top priority.

Use this file as the orientation map for the repository. It is intentionally high level. When existing documentation and runtime behavior differ, trust the live application logic first.

## What The App Does

- Manages products inside a nested folder hierarchy.
- Tracks quantity, price, total value, target quantity, and daily production progress.
- Supports priority products for progress-focused production views.
- Supports independent folders for materials or components that should not count toward main business totals.
- Supports dynamic component links so producing finished goods can automatically deduct linked component stock.
- Keeps local browser copies of state and also syncs backups to Supabase Storage for cross-device use.

## Runtime Map

- `app.js`
  The main runtime file. It owns state, rendering, event wiring, save and sync behavior, settings, product and folder flows, dynamic links, low-stock warnings, and startup behavior.

- `index.html`
  The application shell. It provides the main containers, overlays, buttons, modal host, toast host, and service worker registration.

- `styles.css`
  All application styling and responsive behavior. This includes the top bar, stats, list layout, modal system, product page, warning and sync animations, and mobile search behavior.

- `service-worker.js`
  Offline shell caching. Changes here can affect update visibility, reload behavior, and how quickly users see new frontend versions.

- `public/sample_save.json`
  A schema example and fallback sample shape. Treat it as a reference file, not the canonical live source of business data.

- `warning-system.js`
  A standalone warning implementation that overlaps with logic already present in `app.js`. Do not assume this file is the active runtime path before editing warning behavior.

## State And Persistence Model

- The app revolves around a single in-memory application state.
- Folders and products are stored as ID-keyed maps, with a root folder as the top of the hierarchy.
- Production history, planning settings, and daily progress metadata live in the same overall state object.
- Local persistence uses IndexedDB for the current state and snapshot history.
- Cloud persistence uses Supabase Storage JSON backups, not relational database tables.
- The current boot flow is remote-first. Cloud availability and remote backup loading matter to startup behavior.
- Multi-device behavior depends on backup naming, client identity, remote polling, and automatic application of newer backups.

## Feature Areas

### Navigation And Hierarchy

- Breadcrumb navigation follows the current folder path.
- The main list mixes folders and products in a user-controlled order.
- Move and reorder actions affect hierarchy and display order together.

### Product Management

- Products support editing, image upload, notes, quantity changes, pricing, targets, and custom fields.
- Product detail flows are separate from the main list but share the same underlying state.

### Planning And Production Views

- The stats bar summarizes business totals and daily production planning.
- Priority products feed a dedicated progress view.
- Changes to totals, targets, or quantity logic can ripple into multiple visible areas.

### Independent Folders And Components

- Independent folders are special-purpose inventory spaces, usually for components or raw materials.
- Their contents are intentionally excluded from main totals and priority calculations.
- Component products can participate in dynamic link deductions when finished products are produced.

### Low-Stock Warnings

- Low-stock behavior is tied to warning thresholds on products.
- Warning display, visibility rules, and modal behavior should be treated as part of the main runtime flow, not as isolated UI decoration.

### Save, Sync, And Recovery

- User edits mark the state dirty, write locally, and feed the cloud save pipeline.
- Snapshot creation, retry behavior, backup upload, and remote refresh logic are tightly coupled.
- Import and export exist, but they do not replace the main sync path.

## Safe Edit Map

- If you change layout or add UI containers, update `index.html`, `styles.css`, and the selectors or event wiring in `app.js` together.
- If you change folder or product behavior, trace the full path: creation, editing, rendering, moving, deletion, and save triggering.
- If you change quantity logic, also inspect production logging, daily progress, dynamic link deductions, warning refresh, and totals.
- If you change settings or planning behavior, verify the settings flow, stats bar, daily progress logic, and any priority-related calculations.
- If you change save or sync behavior, review startup loading, local persistence, snapshot creation, cloud backup upload, remote refresh behavior, and unload protection as one system.
- If you change warning behavior, verify whether the active implementation is in `app.js` before touching the duplicate standalone file.
- If you change styling, test both desktop and narrow mobile layouts, especially the product page, top bar, search behavior, and modal flows.

## High-Risk Areas

- Cloud sync behavior is a critical path. Small changes can break startup, overwrite newer remote data, or prevent other devices from refreshing correctly.
- Data shape changes are risky because the app stores whole-state snapshots locally and remotely.
- Independent folders affect totals by exclusion. A small mistake here can make business numbers look correct in one screen and wrong in another.
- Dynamic links affect inventory indirectly. Incorrect edits can silently corrupt component stock counts.
- Service worker changes can make frontend fixes appear inconsistent until caches are refreshed.
- Existing docs are useful, but some of them describe a safer or broader model than the current runtime actually uses.

## Safety Checklist

Use this checklist before and after changes, especially when the task touches business data.

### Before Editing

- Classify the task first: UI, state/model, quantity logic, or persistence/sync.
- Identify which user flows the change can affect beyond the obvious screen.
- If the task changes stored data shape, inspect import/export, local persistence, cloud backups, and remote reload behavior together.
- If the task changes warnings, dynamic links, totals, or daily progress, treat those as connected features rather than isolated widgets.
- If runtime behavior and docs disagree, follow the running code and update documentation only after verifying the live path.

### After Editing

- For product or folder changes, verify create, edit, move, delete, and reload behavior.
- For quantity or pricing changes, verify totals, daily progress, production history, priority progress, and independent-folder exclusion rules.
- For component-link changes, verify both the finished product change and the indirect component deduction result.
- For warning changes, verify icon visibility, modal behavior, and product navigation from the warning flow.
- For layout changes, verify desktop and narrow mobile layouts, especially the top bar, search UI, modals, and product page overlay.

### Extra Checks For Save And Sync Work

- Verify that a normal edit still writes locally and reaches cloud backup successfully.
- Verify that the app still behaves predictably if the network drops during editing and then returns.
- Verify that opening the app on another device still picks up the latest remote state without duplicating or silently discarding newer work.
- Verify that remote refresh behavior does not overwrite local intent unexpectedly.
- Verify that startup still has a safe path when cloud state is missing, stale, or temporarily unavailable.
- Verify that any backup retention change still leaves a practical recovery path.

### Stop And Recheck If

- A change requires touching both save behavior and startup loading at the same time.
- A change alters how IDs, folders, products, or production history are shaped or merged.
- A change depends on `warning-system.js` unless you have confirmed it is the active runtime path.
- A change appears harmless in one screen but changes totals, sync status, or remote refresh timing elsewhere.

## Existing Documentation Map

- `docs/01_CORE_FEATURES.md`
  General feature overview and user-facing concepts.

- `docs/02_DYNAMIC_LINKING.md`
  Concepts around independent folders, component links, and warning behavior.

- `docs/03_DATA_SYNC.md`
  Intended persistence and sync model. Use it as context, but verify runtime behavior in `app.js` before changing data flow.

- `docs/04_SETTINGS_AUTH.md`
  Settings, auth, deployment, and configuration notes.

- `docs/05_UI_INTERACTIONS.md`
  End-to-end user workflows and screen-level interaction expectations.

- `SAVE_SYSTEM_IMPLEMENTATION.md`
  Design intent for the robust save queue and retry model.

## Guidance For Future Agents

- Start by identifying whether the task is a UI change, a state/model change, or a persistence/sync change.
- Treat `app.js` as the canonical behavior source unless the task explicitly includes a refactor away from it.
- Prefer focused edits over broad cleanup in this repository.
- Do not assume an unused helper, duplicate file, or existing document is part of the active runtime path without checking.
- After touching anything related to data, mentally walk through edit, save, reload, offline, and multi-device scenarios before declaring the task safe.