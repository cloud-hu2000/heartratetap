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
      return NextResponse.json({ error: "Invalid vote payload" }, { status: 400 });
    }
    const feedback = await castVote(parsed.data.feedbackId, parsed.data.deviceId);
    if (!feedback) {
      return NextResponse.json({ error: "Feedback item not found" }, { status: 404 });
    }
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Vote failed, please try again later" }, { status: 500 });
  }
}

