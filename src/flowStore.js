// IndexedDB-based session flow store
// Safe: all ops are async + try/catch, never crashes the app

const DB_NAME = "yeahh_body";
const DB_VERSION = 1;
const STORE = "flow";

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

// key: "session" for classic, "session2" for full activation
export async function saveFlow(state, key = "session") {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put({ ...state, savedAt: Date.now() }, key);
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
    db.close();
  } catch (e) {
    console.warn("flowStore.save failed:", e);
  }
}

export async function loadFlow(key = "session") {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(key);
    const result = await new Promise((res, rej) => { req.onsuccess = () => res(req.result); req.onerror = rej; });
    db.close();

    if (!result || !result.workoutActive) return null;

    const ageHours = (Date.now() - (result.savedAt || 0)) / (1000 * 60 * 60);
    if (!isFinite(ageHours) || ageHours > 12) { await clearFlow(key); return null; }

    if (typeof result.day !== "number" || result.day < 0) return null;
    if (!result.expandedEx || typeof result.expandedEx !== "string") return null;

    return result;
  } catch (e) {
    console.warn("flowStore.load failed:", e);
    return null;
  }
}

export async function clearFlow(key = "session") {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(key);
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
    db.close();
  } catch (e) {
    console.warn("flowStore.clear failed:", e);
  }
}
