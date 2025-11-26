import { Resend } from "resend";
import type { Feedback } from "./feedback";

const FEEDBACK_TARGET = process.env.FEEDBACK_TARGET_EMAIL ?? "961035277@qq.com";
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL ?? "feedback@heartratetap.com";

export const sendFeedbackEmail = async (feedback: Feedback) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY 未设置，跳过邮件通知");
    return { delivered: false, reason: "missing_api_key" } as const;
  }
  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from: `HeartRate Tap <${FROM_ADDRESS}>`,
      to: FEEDBACK_TARGET,
      subject: `新的用户建议：${feedback.title}`,
      text: [
        `标题：${feedback.title}`,
        `描述：${feedback.description}`,
        `用户邮箱：${feedback.email ?? "未提供"}`,
        `当前票数：${feedback.votes}`,
        `提交时间：${new Date(feedback.createdAt).toISOString()}`
      ].join("\n\n")
    });
    return { delivered: true } as const;
  } catch (error) {
    console.error("发送邮件失败", error);
    return { delivered: false, reason: "resend_error" } as const;
  }
};

export const notifyNewFeedback = async (feedback: Feedback) => sendFeedbackEmail(feedback);

