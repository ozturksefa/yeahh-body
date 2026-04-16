// ═══ Web Push subscription helpers ═══
// Thin client-side layer on top of the browser Push API. Hides VAPID
// key handling and wire format of the POST to /api/push-subscribe.

import { supabase } from "./supabaseClient";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || "";

export function isPushSupported() {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

export function notificationPermission() {
  if (typeof Notification === "undefined") return "unsupported";
  return Notification.permission; // "default" | "granted" | "denied"
}

export async function getExistingSubscription() {
  if (!isPushSupported()) return null;
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return null;
    return await reg.pushManager.getSubscription();
  } catch {
    return null;
  }
}

export async function subscribeToPush() {
  if (!isPushSupported()) throw new Error("Push desteklenmiyor");
  if (!VAPID_PUBLIC_KEY) throw new Error("VAPID public key tanımlı değil");

  const reg = await navigator.serviceWorker.ready;
  const perm = await Notification.requestPermission();
  if (perm !== "granted") throw new Error("İzin verilmedi");

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  await postSubscription(sub);
  return sub;
}

export async function unsubscribeFromPush() {
  const sub = await getExistingSubscription();
  if (!sub) return;
  try {
    // Remove server-side first so the cron job stops targeting this
    // endpoint even if the client-side unsubscribe fails.
    const { data: session } = await supabase.auth.getSession();
    await fetch("/api/push-subscribe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(session?.session?.access_token
          ? { Authorization: `Bearer ${session.session.access_token}` }
          : {}),
      },
      body: JSON.stringify({ endpoint: sub.endpoint }),
    });
  } catch { /* best effort */ }
  await sub.unsubscribe();
}

async function postSubscription(sub) {
  const payload = sub.toJSON();
  const { data: session } = await supabase.auth.getSession();
  const res = await fetch("/api/push-subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(session?.session?.access_token
        ? { Authorization: `Bearer ${session.session.access_token}` }
        : {}),
    },
    body: JSON.stringify({
      endpoint: payload.endpoint,
      keys: payload.keys,
      user_agent: navigator.userAgent,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `POST /api/push-subscribe failed (${res.status})`);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i += 1) output[i] = rawData.charCodeAt(i);
  return output;
}
