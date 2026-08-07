import { sql } from "./db";

const isDbAvailable = typeof sql !== "undefined" && sql !== null && sql;

type FeedbackRecord = {
  id: string;
  title: string;
  description: string;
  email: string | null;
  created_at: string;
};

export type Feedback = {
  id: string;
  title: string;
  description: string;
  email: string | null;
  createdAt: string;
};

let tablesReady: Promise<void> | null = null;

const ensureTables = async () => {
  if (!isDbAvailable) return;

  if (!tablesReady) {
    tablesReady = (async () => {
      await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;
      await sql`
        CREATE TABLE IF NOT EXISTS feedback_items (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          email TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
    })();
  }

  return tablesReady;
};

const sanitizeFeedback = (record: FeedbackRecord): Feedback => ({
  id: record.id,
  title: record.title,
  description: record.description,
  email: record.email,
  createdAt: record.created_at
});

export const createFeedback = async (data: {
  title: string;
  description: string;
  email: string | null;
}): Promise<Feedback> => {
  if (!isDbAvailable) {
    throw new Error("Database not available");
  }

  try {
    await ensureTables();
    const rows = (await sql`
      INSERT INTO feedback_items (title, description, email)
      VALUES (${data.title}, ${data.description}, ${data.email})
      RETURNING id, title, description, email, created_at
    `) as FeedbackRecord[];
    return sanitizeFeedback(rows[0]);
  } catch (error) {
    console.error("Failed to create feedback in database:", error);
    throw new Error("Failed to save feedback. Please try again later.");
  }
};
