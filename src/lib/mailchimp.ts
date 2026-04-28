import crypto from "crypto";

function getDataCenter(): string | null {
  const key = process.env.MAILCHIMP_API_KEY;
  if (!key) return null;
  const dc = key.split("-")[1];
  return dc || null;
}

function getApiBase(): string | null {
  const dc = getDataCenter();
  return dc ? `https://${dc}.api.mailchimp.com/3.0` : null;
}

function authHeader(): Record<string, string> {
  const key = process.env.MAILCHIMP_API_KEY;
  return key
    ? { Authorization: `Basic ${Buffer.from(`anystring:${key}`).toString("base64")}` }
    : {};
}

export interface MailchimpAudience {
  id: string;
  name: string;
  member_count: number;
}

export async function listAudiences(): Promise<MailchimpAudience[]> {
  const base = getApiBase();
  if (!base) return [];
  try {
    const res = await fetch(`${base}/lists?count=50&fields=lists.id,lists.name,lists.stats.member_count`, {
      headers: { ...authHeader() },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    interface ListItem {
      id: string;
      name: string;
      stats?: { member_count?: number };
    }
    return (data.lists || []).map((l: ListItem) => ({
      id: l.id,
      name: l.name,
      member_count: l.stats?.member_count || 0,
    }));
  } catch {
    return [];
  }
}

export interface SubscribeInput {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  tags?: string[];
}

export async function subscribeContact(audienceId: string, input: SubscribeInput): Promise<{ ok: boolean; error?: string }> {
  const base = getApiBase();
  if (!base) return { ok: false, error: "Mailchimp non configuré" };
  if (!audienceId) return { ok: false, error: "Audience ID manquant" };

  // Mailchimp utilise un hash MD5 de l'email lowercase pour upsert
  const subscriberHash = crypto.createHash("md5").update(input.email.toLowerCase()).digest("hex");

  try {
    const res = await fetch(`${base}/lists/${audienceId}/members/${subscriberHash}`, {
      method: "PUT",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({
        email_address: input.email,
        status_if_new: "subscribed",
        merge_fields: {
          FNAME: input.firstName || "",
          LNAME: input.lastName || "",
          PHONE: input.phone || "",
        },
        tags: input.tags || [],
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      return { ok: false, error: err.detail || `Erreur ${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function pingMailchimp(): Promise<{ ok: boolean; account?: string; error?: string }> {
  const base = getApiBase();
  if (!base) return { ok: false, error: "MAILCHIMP_API_KEY manquant" };
  try {
    const res = await fetch(`${base}/ping`, { headers: { ...authHeader() }, cache: "no-store" });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const data = await res.json();
    return { ok: true, account: data.health_status || "OK" };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
