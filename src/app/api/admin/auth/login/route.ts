import { NextResponse } from "next/server";
import { checkCredentials, createSession, setSessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { user, password } = (await req.json()) as { user?: string; password?: string };
    if (!user || !password) {
      return NextResponse.json({ error: "Identifiants requis" }, { status: 400 });
    }
    if (!checkCredentials(user, password)) {
      return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
    }
    const token = await createSession(user);
    await setSessionCookie(token);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
