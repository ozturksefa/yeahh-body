// Scheduled function — runs every morning and pushes a short "today is X
// day" reminder to every subscription whose preferences allow it.
//
// Scheduled functions can't declare a custom path (Netlify routes them
// itself). Manual testing happens via the Netlify Functions UI or the
// netlify-cli `netlify functions:invoke` command. Default cron runs at
// 07:00 UTC (10:00 Istanbul).
//
// Runtime: Node (Netlify classic functions). Uses process.env and the
// npm `web-push` package.

import webpush from "web-push";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY || "";
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:admin@yeahh.body";

// Mirrors the program's day map. Tue/Thu/Sat/Sun are training days.
const DAY_MAP = {
  0: { sub: "PAZAR", training: true, focus: "Recovery Strength + Zone 2", duration: "~60 dk" },
  1: { sub: "PAZARTESİ", training: false, focus: "Aktif Recovery + Hazırlık", duration: "~30 dk" },
  2: { sub: "SALI", training: true, focus: "Pull + Press Foundation", duration: "~80 dk" },
  3: { sub: "ÇARŞAMBA", training: false, focus: "Recovery + Support Skill", duration: "~25 dk" },
  4: { sub: "PERŞEMBE", training: true, focus: "Lower Control + Upper Back", duration: "~72 dk" },
  5: { sub: "CUMA", training: false, focus: "Mobilite + Cumartesi Hazırlığı", duration: "~20 dk" },
  6: { sub: "CUMARTESİ", training: true, focus: "Athletic Volume + Posterior Chain", duration: "~85 dk" },
};

export default async () => {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !VAPID_PUBLIC || !VAPID_PRIVATE) {
    return new Response(JSON.stringify({ error: "Missing env vars" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);

  const now = new Date();
  const istanbulDow = getIstanbulDow(now);
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
    return new Response(JSON.stringify({ error: `Supabase select failed: ${text}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
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
      // 404 / 410 mean the subscription has expired; prune it so future
      // runs aren't spent on zombies.
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

  return new Response(
    JSON.stringify({ ok: true, sent, removed, failed, total: subs.length, day: meta.sub }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};

function getIstanbulDow(now) {
  // Istanbul is UTC+3 year-round (no DST since 2016).
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 3 * 3600 * 1000);
  return ist.getDay();
}

export const config = {
  schedule: "0 7 * * *",
};
