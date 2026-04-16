/* global Deno */

// Subscribe / unsubscribe a Web Push endpoint for the authenticated user.
// POST   body { endpoint, keys: { p256dh, auth }, user_agent }
// DELETE body { endpoint }
// Both require an Authorization: Bearer <supabase-access-token> header.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || Deno.env.get("VITE_SUPABASE_URL") || "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

export default async (req) => {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return json(500, { error: "Supabase env vars eksik" });
  }

  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return json(401, { error: "Auth token yok" });

  const user = await resolveUser(token);
  if (!user) return json(401, { error: "Geçersiz token" });

  if (req.method === "POST") {
    const body = await req.json().catch(() => null);
    if (!body || !body.endpoint || !body.keys?.p256dh || !body.keys?.auth) {
      return json(400, { error: "Eksik subscription alanı" });
    }
    const row = {
      user_id: user.id,
      endpoint: body.endpoint,
      p256dh: body.keys.p256dh,
      auth_key: body.keys.auth,
      user_agent: body.user_agent || null,
      updated_at: new Date().toISOString(),
    };
    const upsertRes = await fetch(
      `${SUPABASE_URL}/rest/v1/push_subscriptions?on_conflict=endpoint`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify(row),
      },
    );
    if (!upsertRes.ok) {
      const errText = await upsertRes.text();
      return json(500, { error: `Supabase upsert failed: ${errText}` });
    }
    return json(200, { ok: true });
  }

  if (req.method === "DELETE") {
    const body = await req.json().catch(() => null);
    if (!body?.endpoint) return json(400, { error: "endpoint gerekli" });
    const deleteRes = await fetch(
      `${SUPABASE_URL}/rest/v1/push_subscriptions?endpoint=eq.${encodeURIComponent(body.endpoint)}&user_id=eq.${user.id}`,
      {
        method: "DELETE",
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
      },
    );
    if (!deleteRes.ok) {
      const errText = await deleteRes.text();
      return json(500, { error: `Supabase delete failed: ${errText}` });
    }
    return json(200, { ok: true });
  }

  return json(405, { error: "Method not allowed" });
};

async function resolveUser(token) {
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function json(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const config = { path: "/api/push-subscribe" };
