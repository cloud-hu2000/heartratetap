"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createFeedback } from "@/lib/feedback";

export type CommentFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const schema = z.object({
  title: z.string().min(4, "标题至少4个字符").max(80, "标题不能超过80个字符"),
  description: z.string().min(10, "请提供更详细的描述").max(1000, "描述过长"),
  email: z
    .string()
    .email("邮箱格式不正确")
    .max(120, "邮箱过长")
    .optional()
    .or(z.literal(""))
});

const SUCCESS_STATE: CommentFormState = { status: "success", message: "提交成功，感谢建议！" };

export async function create(_prevState: CommentFormState, formData: FormData): Promise<CommentFormState> {
  try {
    const candidate = {
      title: (formData.get("title") as string | null) ?? "",
      description: (formData.get("description") as string | null) ?? "",
      email: (formData.get("email") as string | null) ?? ""
    };
    const parsed = schema.safeParse(candidate);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "请检查提交内容";
      return { status: "error", message };
    }
    const { title, description, email } = parsed.data;
    await createFeedback({
      title: title.trim(),
      description: description.trim(),
      email: email?.trim() || null
    });
    revalidatePath("/comment");
    return SUCCESS_STATE;
  } catch (error) {
    console.error("Server action create failed", error);
    return { status: "error", message: "提交失败，请稍后重试" };
  }
}

