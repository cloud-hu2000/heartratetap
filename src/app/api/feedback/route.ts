import { NextResponse } from "next/server";
import { z } from "zod";
import { createFeedback, fetchFeedbackList } from "@/lib/feedback";
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

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const feedback = await fetchFeedbackList();
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "无法获取意见列表" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = feedbackSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: "字段格式有误" }, { status: 400 });
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
    return NextResponse.json({ error: "提交失败，请稍后重试" }, { status: 500 });
  }
}

