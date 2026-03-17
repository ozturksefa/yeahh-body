// IndexedDB-based session flow store
// Safe: all ops are async + try/catch, never crashes the app

const DB_NAME = "yeahh_body";
const DB_VERSION = 1;
const STORE = "flow";
const KEY = "session";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// Save flow state: { day, expandedEx, workoutActive, savedAt }
export async function saveFlow(state) {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put({ ...state, savedAt: Date.now() }, KEY);
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
    db.close();
  } catch (e) {
    console.warn("flowStore.save failed:", e);
  }
}

// Load flow state — returns null if nothing saved or stale (>12h)
export async function loadFlow() {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(KEY);
    const result = await new Promise((res, rej) => { req.onsuccess = () => res(req.result); req.onerror = rej; });
    db.close();

    if (!result || !result.workoutActive) return null;

    // Stale check: older than 12 hours
    const ageHours = (Date.now() - (result.savedAt || 0)) / (1000 * 60 * 60);
    if (!isFinite(ageHours) || ageHours > 12) {
      await clearFlow();
      return null;
    }

    // Validate
    if (typeof result.day !== "number" || result.day < 0 || result.day > 3) return null;
    if (!result.expandedEx || typeof result.expandedEx !== "string") return null;

    return result;
  } catch (e) {
    console.warn("flowStore.load failed:", e);
    return null;
  }
}

// Clear flow state
export async function clearFlow() {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(KEY);
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
    db.close();
  } catch (e) {
    console.warn("flowStore.clear failed:", e);
  }
}
