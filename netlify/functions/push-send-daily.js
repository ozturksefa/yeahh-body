/* global Deno */

// Scheduled function — runs every morning and pushes a short "today is X
// day" reminder to every subscription whose preferences allow it.
//
// Schedule is declared via the `config` export at the bottom (Netlify
// Scheduled Functions, cron syntax). Adjust the cron there if you want
// a different time-of-day. Default: 07:00 UTC = 10:00 TR.
//
// Content is intentionally one line. The reader should glance, know
// today's day, and close the notification.

import webpush from "https://esm.sh/web-push@3.6.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || Deno.env.get("VITE_SUPABASE_URL") || "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const VAPID_PUBLIC = Deno.env.get("VAPID_PUBLIC_KEY") || "";
const VAPID_PRIVATE = Deno.env.get("VAPID_PRIVATE_KEY") || "";
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:admin@yeahh.body";

// Mirrors the program's day map. Tue/Thu/Sat/Sun are training days.
// Monday/Friday are prep/recovery; Wednesday is support skill day.
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

  // Work out today's Istanbul-local date + day, independent of the
  // runtime region.
  const now = new Date();
  const istanbulDow = getIstanbulDow(now);
  const meta = DAY_MAP[istanbulDow];

  const title = meta.training ? `Bugün ${meta.sub} · ${meta.focus}` : `Bugün ${meta.sub} · ${meta.focus}`;
  const body = meta.training
    ? `${meta.duration}. Ön-set + ısınma, başla.`
    : "Hafif gün. Yürüyüş + bakım yeter.";

  // Pull every subscription; filter by preferences.morning === true.
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

  const payload = JSON.stringify({
    title,
    body,
    url: "/",
    tag: "yb-daily",
  });

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

// Scheduled functions can't have a custom path — Netlify owns routing.
// The cron runs every morning at 07:00 UTC (10:00 Istanbul). Adjust here
// or override via the Netlify UI once you know the local time you want.
export const config = {
  schedule: "0 7 * * *",
};
