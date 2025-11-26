import { NextResponse } from "next/server";
import { z } from "zod";
import { castVote } from "@/lib/feedback";

const voteSchema = z.object({
  feedbackId: z.string().uuid(),
  deviceId: z.string().min(8).max(128)
});

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = voteSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: "非法投票参数" }, { status: 400 });
    }
    const feedback = await castVote(parsed.data.feedbackId, parsed.data.deviceId);
    if (!feedback) {
      return NextResponse.json({ error: "找不到该建议" }, { status: 404 });
    }
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "投票失败，请稍后重试" }, { status: 500 });
  }
}

