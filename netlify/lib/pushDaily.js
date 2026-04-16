// Shared logic for the daily push senders. We ship two scheduled
// functions — one for weekdays at 07:00 Istanbul and one for weekends
// at 09:00 Istanbul — so the athlete gets pinged slightly later on
// Cumartesi/Pazar. Both share the same message-shape + subscription-
// prune pipeline; that pipeline lives here.
//
// Kept outside netlify/functions/ so Netlify doesn't try to deploy it
// as its own function (underscore-prefixed naming is convention-only,
// not enforced).

import webpush from "web-push";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY || "";
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:admin@yeahh.body";

const DAY_MAP = {
  0: { sub: "PAZAR", training: true, focus: "Recovery Strength + Zone 2", duration: "~60 dk" },
  1: { sub: "PAZARTESİ", training: false, focus: "Aktif Recovery + Hazırlık", duration: "~30 dk" },
  2: { sub: "SALI", training: true, focus: "Pull + Press Foundation", duration: "~80 dk" },
  3: { sub: "ÇARŞAMBA", training: false, focus: "Recovery + Support Skill", duration: "~25 dk" },
  4: { sub: "PERŞEMBE", training: true, focus: "Lower Control + Upper Back", duration: "~72 dk" },
  5: { sub: "CUMA", training: false, focus: "Mobilite + Cumartesi Hazırlığı", duration: "~20 dk" },
  6: { sub: "CUMARTESİ", training: true, focus: "Athletic Volume + Posterior Chain", duration: "~85 dk" },
};

const WEEKEND_DOWS = new Set([0, 6]); // Sunday, Saturday (Istanbul local).

function getIstanbulDow(now) {
  // Istanbul is UTC+3 year-round (no DST since 2016).
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 3 * 3600 * 1000);
  return ist.getDay();
}

/**
 * Runs the daily push sweep. `mode` decides whether to skip today:
 *   - "weekday": only send Mon–Fri (Istanbul)
 *   - "weekend": only send Sat–Sun (Istanbul)
 * Two crons (one per mode) mean we can fire them at different local
 * times without complicating the message logic.
 */
export async function runDailyPush({ mode }) {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !VAPID_PUBLIC || !VAPID_PRIVATE) {
    return jsonResponse(500, { error: "Missing env vars" });
  }

  const now = new Date();
  const istanbulDow = getIstanbulDow(now);
  const isWeekend = WEEKEND_DOWS.has(istanbulDow);
  const shouldRun = mode === "weekend" ? isWeekend : !isWeekend;

  if (!shouldRun) {
    return jsonResponse(200, {
      ok: true,
      skipped: true,
      reason: `mode=${mode}, day=${DAY_MAP[istanbulDow].sub}`,
    });
  }

  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);

  const meta = DAY_MAP[istanbulDow];
  const title = `Bugün ${meta.sub} · ${meta.focus}`;
  const body = meta.training
    ? `${meta.duration}. Ön-set + ısınma, başla.`
    : "Hafif gün. Yürüyüş + bakım yeter.";

  const subsRes = await fetch(
    `${SUPABASE_URL}/rest/v1/push_subscriptions?select=endpoint,p256dh,auth_key,preferences`,
    {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
    },
  );
  if (!subsRes.ok) {
    const text = await subsRes.text();
    return jsonResponse(500, { error: `Supabase select failed: ${text}` });
  }
  const subs = await subsRes.json();

  const payload = JSON.stringify({ title, body, url: "/", tag: "yb-daily" });

  let sent = 0;
  let removed = 0;
  let failed = 0;

  for (const sub of subs) {
    const prefs = sub.preferences || {};
    if (prefs.morning === false) continue;
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth_key },
        },
        payload,
        { TTL: 3600 },
      );
      sent += 1;
    } catch (err) {
      if (err?.statusCode === 404 || err?.statusCode === 410) {
        await fetch(
          `${SUPABASE_URL}/rest/v1/push_subscriptions?endpoint=eq.${encodeURIComponent(sub.endpoint)}`,
          {
            method: "DELETE",
            headers: {
              apikey: SERVICE_ROLE_KEY,
              Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
            },
          },
        );
        removed += 1;
      } else {
        failed += 1;
      }
    }
  }

  return jsonResponse(200, {
    ok: true,
    mode,
    day: meta.sub,
    total: subs.length,
    sent,
    removed,
    failed,
  });
}

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
