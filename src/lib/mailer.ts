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
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Skip verification email.");
    return { delivered: false, reason: "missing_api_key" } as const;
  }
  const resend = new Resend(apiKey);
  const from = FROM_ADDRESS;
  const site = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const verifyUrl = `${site}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
  try {
    console.log('📨 sendVerificationEmail: sending verification email to', to);
    console.log('📨 sendVerificationEmail: verify URL:', verifyUrl);

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - HeartRateTap</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #0f2b33;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f8fafc;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(15, 43, 51, 0.08);
      border: 1px solid rgba(15, 43, 51, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #0f8c8c;
      margin-bottom: 16px;
    }
    .title {
      font-size: 24px;
      font-weight: 700;
      color: #0f2b33;
      margin: 0 0 12px 0;
      letter-spacing: -0.025em;
    }
    .subtitle {
      font-size: 16px;
      color: #5d6e73;
      margin: 0;
    }
    .content {
      margin: 32px 0;
    }
    .message {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .verify-button {
      display: inline-block;
      background: #0f8c8c;
      color: white;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      margin: 24px 0;
      box-shadow: 0 4px 12px rgba(15, 140, 140, 0.3);
      transition: all 0.2s ease;
    }
    .verify-button:hover {
      background: #0a6b6b;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(15, 140, 140, 0.4);
    }
    .warning {
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.2);
      border-radius: 8px;
      padding: 16px;
      margin: 24px 0;
      font-size: 14px;
      color: #92400e;
    }
    .footer {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid rgba(15, 43, 51, 0.1);
      font-size: 14px;
      color: #5d6e73;
      text-align: center;
    }
    .footer p {
      margin: 4px 0;
    }
    .link {
      color: #0f8c8c;
      text-decoration: none;
    }
    .link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">❤️ HeartRateTap</div>
      <h1 class="title">Verify Your Email Address</h1>
      <p class="subtitle">Complete your account setup to get started</p>
    </div>

    <div class="content">
      <p class="message">
        Hi there! Thank you for signing up for HeartRateTap. To ensure we can keep you updated
        about your heart rate monitoring and provide you with the best experience, please verify
        your email address by clicking the button below.
      </p>

      <div style="text-align: center;">
        <a href="${verifyUrl}" class="verify-button">Verify My Email Address</a>
      </div>

      <div class="warning">
        <strong>Important:</strong> This verification link will expire in 24 hours for security reasons.
        If you didn't create an account with HeartRateTap, please ignore this email.
      </div>

      <p style="font-size: 14px; color: #5d6e73; margin-top: 16px;">
        If the button doesn't work, you can also copy and paste this link into your browser:
        <br>
        <span style="word-break: break-all; color: #0f8c8c;">${verifyUrl}</span>
      </p>
    </div>

    <div class="footer">
      <p><strong>HeartRateTap</strong> - Free Online Heart Rate Monitor</p>
      <p>Questions? <a href="mailto:cloudhu2000@gmail.com" class="link">Contact our support team</a></p>
      <p style="font-size: 12px; color: #9ca3af;">
        This email was sent to you because you recently created an account on HeartRateTap.
        If you no longer wish to receive these emails, you can unsubscribe at any time.
      </p>
    </div>
  </div>
</body>
</html>`;

    await resend.emails.send({
      from: `HeartRate Tap <${from}>`,
      to,
      subject: "Verify Your Email Address - HeartRateTap",
      html: htmlContent,
      text: `Welcome to HeartRateTap! Please verify your email address by clicking this link: ${verifyUrl}

This link will expire in 24 hours. If you didn't create an account, please ignore this email.

Questions? Contact us at cloudhu2000@gmail.com

HeartRateTap - Free Online Heart Rate Monitor`
    });

    console.log('✅ sendVerificationEmail: email sent to', to);
    return { delivered: true } as const;
  } catch (error) {
    console.error("Failed to send verification email", error);
    return { delivered: false, reason: "resend_error", error: String(error) } as const;
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
