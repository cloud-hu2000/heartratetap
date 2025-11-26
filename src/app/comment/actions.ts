"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createFeedback } from "@/lib/feedback";

export type CommentFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const schema = z.object({
  title: z.string().min(4, "The title needs at least 4 characters").max(80, "The title is too long"),
  description: z.string().min(10, "Please add a bit more detail").max(1000, "The description is too long"),
  email: z
    .string()
    .email("Please provide a valid email")
    .max(120, "The email is too long")
    .optional()
    .or(z.literal(""))
});

const SUCCESS_STATE: CommentFormState = { status: "success", message: "Thanks! Your idea was submitted." };

export async function create(_prevState: CommentFormState, formData: FormData): Promise<CommentFormState> {
  try {
    const candidate = {
      title: (formData.get("title") as string | null) ?? "",
      description: (formData.get("description") as string | null) ?? "",
      email: (formData.get("email") as string | null) ?? ""
    };
    const parsed = schema.safeParse(candidate);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Please check your submission";
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
    return { status: "error", message: "Submission failed, please try again later" };
  }
}

