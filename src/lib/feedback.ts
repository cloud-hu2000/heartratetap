import crypto from "node:crypto";
import { sql } from "./db";

// Check if database is available (skip during build)
const isDbAvailable = typeof sql !== 'undefined' && sql !== null && sql;

type FeedbackRecord = {
  id: string;
  title: string;
  description: string;
  email: string | null;
  votes: number;
  status: string | null;
  created_at: string;
};

export type Feedback = {
  id: string;
  title: string;
  description: string;
  email: string | null;
  votes: number;
  status: "planned" | "in_progress" | "shipped" | "archived";
  createdAt: string;
};

const normalizeStatus = (status: string | null): Feedback["status"] => {
  if (!status) return "planned";
  const value = status.toLowerCase().trim();
  if (value === "planned") return "planned";
  if (value === "in_progress" || value === "in progress" || value === "in-progress") return "in_progress";
  if (value === "shipped" || value === "done" || value === "released" || value === "release") return "shipped";
  if (value === "archived") return "archived";
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn("Unknown feedback status, defaulting to planned:", status);
  }
  return "planned";
};

let tablesReady: Promise<void> | null = null;

const ensureTables = async () => {
  // Check if database is available
  if (!isDbAvailable) {
    return;
  }

  if (!tablesReady) {
    tablesReady = (async () => {
      await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;
      await sql`
        CREATE TABLE IF NOT EXISTS feedback_items (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          email TEXT,
          votes INTEGER NOT NULL DEFAULT 0,
          status TEXT NOT NULL DEFAULT 'planned',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        ALTER TABLE feedback_items
        ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'planned'
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS feedback_votes (
          feedback_id UUID NOT NULL REFERENCES feedback_items(id) ON DELETE CASCADE,
          device_hash TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY(feedback_id, device_hash)
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
  votes: record.votes,
  status: normalizeStatus(record.status),
  createdAt: record.created_at
});

export const fetchFeedbackList = async (): Promise<Feedback[]> => {
  // Check if database is available
  if (!isDbAvailable) {
    console.warn("Database not available, returning empty feedback list");
    return [];
  }
  await ensureTables();
  const rows = (await sql`
    SELECT id, title, description, email, votes, status, created_at
    FROM feedback_items
    ORDER BY votes DESC, created_at ASC
  `) as FeedbackRecord[];
  return rows.map(sanitizeFeedback);
};

export const createFeedback = async (data: { title: string; description: string; email: string | null }): Promise<Feedback> => {
  // Check if database is available
  if (!isDbAvailable) {
    throw new Error("Database not available");
  }
  await ensureTables();
  const rows = (await sql`
    INSERT INTO feedback_items (title, description, email, status)
    VALUES (${data.title}, ${data.description}, ${data.email}, 'planned')
    RETURNING id, title, description, email, votes, status, created_at
  `) as FeedbackRecord[];
  return sanitizeFeedback(rows[0]);
};

export const castVote = async (feedbackId: string, deviceId: string): Promise<Feedback | null> => {
  // Check if database is available
  if (!isDbAvailable) {
    console.warn("Database not available, skipping vote");
    return null;
  }

  await ensureTables();
  const deviceHash = crypto.createHash("sha256").update(deviceId).digest("hex");
  const insertResult = await sql`
    INSERT INTO feedback_votes (feedback_id, device_hash)
    VALUES (${feedbackId}, ${deviceHash})
    ON CONFLICT (feedback_id, device_hash) DO NOTHING
    RETURNING feedback_id
  `;
  if (insertResult.length === 0) {
    const rows = (await sql`
      SELECT id, title, description, email, votes, status, created_at
      FROM feedback_items
      WHERE id = ${feedbackId}
    `) as FeedbackRecord[];
    return rows.length ? sanitizeFeedback(rows[0]) : null;
  }
  const rows = (await sql`
    UPDATE feedback_items
    SET votes = votes + 1
    WHERE id = ${feedbackId}
    RETURNING id, title, description, email, votes, status, created_at
  `) as FeedbackRecord[];
  return rows.length ? sanitizeFeedback(rows[0]) : null;
};

