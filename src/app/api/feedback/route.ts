import { NextResponse } from "next/server";
import { z } from "zod";
import { createFeedback } from "@/lib/feedback";
import { notifyNewFeedback } from "@/lib/mailer";

const feedbackSchema = z.object({
  title: z.string().min(4).max(80),
  description: z.string().min(10).max(1000),
  email: z
    .string()
    .email()
    .max(120)
    .optional()
    .or(z.literal(""))
});

// Use Node.js runtime to reduce edge function usage
export const runtime = 'nodejs';
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = feedbackSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: "Payload validation failed" }, { status: 400 });
    }
    const { title, description, email } = parsed.data;
    const feedback = await createFeedback({
      title: title.trim(),
      description: description.trim(),
      email: email?.trim() || null
    });
    await notifyNewFeedback(feedback);
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Submission failed, please try again later" }, { status: 500 });
  }
}
