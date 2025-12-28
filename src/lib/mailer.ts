import { Resend } from "resend";
import type { Feedback } from "./feedback";

const FEEDBACK_TARGET = process.env.FEEDBACK_TARGET_EMAIL ?? "961035277@qq.com";
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL ?? "feedback@heartratetap.com";

export const sendFeedbackEmail = async (feedback: Feedback) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Skip feedback email notification.");
    return { delivered: false, reason: "missing_api_key" } as const;
  }
  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from: `HeartRate Tap <${FROM_ADDRESS}>`,
      to: FEEDBACK_TARGET,
      subject: `New feedback idea: ${feedback.title}`,
      text: [
        `Title: ${feedback.title}`,
        `Description: ${feedback.description}`,
        `User email: ${feedback.email ?? "Not provided"}`,
        `Votes: ${feedback.votes}`,
        `Submitted at: ${new Date(feedback.createdAt).toISOString()}`
      ].join("\n\n")
    });
    return { delivered: true } as const;
  } catch (error) {
    console.error("Failed to send feedback email", error);
    return { delivered: false, reason: "resend_error" } as const;
  }
};

export const notifyNewFeedback = async (feedback: Feedback) => sendFeedbackEmail(feedback);

export const sendVerificationEmail = async (to: string, token: string) => {
  const apiKey = process.env.RESEND_API_KEY;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Skip verification email.");
    return { delivered: false, reason: "missing_api_key" } as const;
  }
  const resend = new Resend(apiKey);
  const from = FROM_ADDRESS;
  const site = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const verifyUrl = `${site}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
  try {
    await resend.emails.send({
      from: `HeartRate Tap <${from}>`,
      to,
      subject: "Verify your email for HeartRateTap",
      text: `Click to verify your email: ${verifyUrl}`
    });
    return { delivered: true } as const;
  } catch (error) {
    console.error("Failed to send verification email", error);
    return { delivered: false, reason: "resend_error" } as const;
  }
};

export const sendPasswordResetEmail = async (to: string, token: string) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Skip password reset email.");
    return { delivered: false, reason: "missing_api_key" } as const;
  }
  const resend = new Resend(apiKey);
  const from = FROM_ADDRESS;
  const site = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const resetUrl = `${site}/reset-password?token=${encodeURIComponent(token)}`;
  try {
    await resend.emails.send({
      from: `HeartRate Tap <${from}>`,
      to,
      subject: "Reset your HeartRateTap password",
      text: `Reset your password: ${resetUrl}`
    });
    return { delivered: true } as const;
  } catch (error) {
    console.error("Failed to send password reset email", error);
    return { delivered: false, reason: "resend_error" } as const;
  }
};
