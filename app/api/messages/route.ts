import { timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import type { SecretMessage } from "@/lib/secret-message";

const MAX_RECIPIENT = 100;
const MAX_MESSAGE = 1000;

type Row = {
  id: string;
  recipient: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

const toMessage = (r: Row): SecretMessage => ({
  id: r.id,
  recipient: r.recipient,
  message: r.message,
  isRead: r.is_read,
  createdAt: r.created_at,
});

const error = (message: string, status: number) => Response.json({ error: message }, { status });

// GET dan PATCH hanya untuk presenter /baca.
function isPresenter(request: Request): boolean {
  const expected = process.env.BACA_PASSCODE;
  const given = request.headers.get("x-baca-passcode");
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error("Format permintaan tidak valid.", 400);
  }

  const { recipient, message } = (body ?? {}) as Record<string, unknown>;
  const to = typeof recipient === "string" ? recipient.trim() : "";
  const text = typeof message === "string" ? message.trim() : "";
  if (!to || !text) return error("Kolom untuk dan pesan wajib diisi.", 400);
  if (to.length > MAX_RECIPIENT || text.length > MAX_MESSAGE) return error("Pesan terlalu panjang.", 400);

  try {
    const { error: dbError } = await getSupabaseAdmin()
      .from("secret_messages")
      .insert({ recipient: to, message: text });
    if (dbError) throw dbError;
  } catch (e) {
    console.error("[messages] insert gagal:", e);
    return error("Pesan gagal disimpan. Coba lagi sebentar.", 500);
  }

  return Response.json({ ok: true }, { status: 201 });
}

export async function GET(request: Request) {
  if (!isPresenter(request)) return error("Passcode salah.", 401);

  try {
    const { data, error: dbError } = await getSupabaseAdmin()
      .from("secret_messages")
      .select("id, recipient, message, is_read, created_at")
      .order("created_at", { ascending: true });
    if (dbError) throw dbError;
    return Response.json({ messages: (data as Row[]).map(toMessage) });
  } catch (e) {
    console.error("[messages] select gagal:", e);
    return error("Gagal mengambil pesan.", 500);
  }
}

export async function PATCH(request: Request) {
  if (!isPresenter(request)) return error("Passcode salah.", 401);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error("Format permintaan tidak valid.", 400);
  }
  const { id, isRead } = (body ?? {}) as Record<string, unknown>;
  if (typeof id !== "string" || typeof isRead !== "boolean") return error("Data tidak valid.", 400);

  try {
    const { error: dbError } = await getSupabaseAdmin()
      .from("secret_messages")
      .update({ is_read: isRead })
      .eq("id", id);
    if (dbError) throw dbError;
  } catch (e) {
    console.error("[messages] update gagal:", e);
    return error("Gagal memperbarui status.", 500);
  }

  return Response.json({ ok: true });
}
