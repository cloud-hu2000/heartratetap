import { NextResponse } from "next/server";
import { clearSessionCookie, clearSessionHintCookie, makeAuthCheckedCookie } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", clearSessionCookie());
  res.headers.append("Set-Cookie", clearSessionHintCookie());
  res.headers.append("Set-Cookie", makeAuthCheckedCookie(process.env.NODE_ENV === "production"));
  return res;
}


