"use client";

import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";

type FeedbackItem = {
  id: string;
  title: string;
  description: string;
  email: string | null;
  votes: number;
  createdAt: string;
};

type FormState = {
  title: string;
  description: string;
  email: string;
};

const INITIAL_FORM: FormState = {
  title: "",
  description: "",
  email: ""
};

const VOTE_STORAGE_KEY = "heart-feedback-votes";
const DEVICE_STORAGE_KEY = "heart-feedback-device";

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [voting, setVoting] = useState<Record<string, boolean>>({});
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => (b.votes === a.votes ? a.createdAt.localeCompare(b.createdAt) : b.votes - a.votes)),
    [items]
  );

  const storeVotedIds = useCallback((next: Set<string>) => {
    setVotedIds(new Set(next));
    if (typeof window !== "undefined") {
      window.localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(Array.from(next)));
    }
  }, []);

  const loadVotedIds = useCallback(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(VOTE_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: string[] = JSON.parse(raw);
      setVotedIds(new Set(parsed));
    } catch {
      window.localStorage.removeItem(VOTE_STORAGE_KEY);
    }
  }, []);

  const ensureDeviceId = useCallback(() => {
    if (typeof window === "undefined") return null;
    const existing = window.localStorage.getItem(DEVICE_STORAGE_KEY);
    if (existing) return existing;
    const randomId =
      window.crypto && "randomUUID" in window.crypto
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    window.localStorage.setItem(DEVICE_STORAGE_KEY, randomId);
    return randomId;
  }, []);

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch("/api/feedback", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to load feedback");
      }
      const data = (await response.json()) as { feedback: FeedbackItem[] };
      setItems(data.feedback ?? []);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Unable to load the feedback list" });
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    loadVotedIds();
  }, [loadVotedIds]);

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = form.title.trim();
    const description = form.description.trim();
    const email = form.email.trim();

    if (title.length < 4) {
      setMessage({ type: "error", text: "Title needs at least 4 characters." });
      return;
    }
    if (description.length < 10) {
      setMessage({ type: "error", text: "Please add a bit more detail to your idea." });
      return;
    }

    setSubmitting(true);
    setMessage(null);
    try {
      const payload = {
        title,
        description,
        email
      };
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorBody?.error ?? "Submission failed, please try again");
      }
      const { feedback } = (await response.json()) as { feedback: FeedbackItem };
      setItems((prev) => [feedback, ...prev]);
      setForm(INITIAL_FORM);
      setMessage({
        type: "success",
        text: "Thanks! Your idea has been recorded. You can now see it on the Top Ideas page."
      });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Submission failed, please try again" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (feedbackId: string) => {
    if (votedIds.has(feedbackId)) {
      setMessage({ type: "error", text: "You already voted for this idea" });
      return;
    }
    const deviceId = ensureDeviceId();
    if (!deviceId) {
      setMessage({ type: "error", text: "Unable to identify this device, please try again" });
      return;
    }
    setVoting((prev) => ({ ...prev, [feedbackId]: true }));
    setMessage(null);
    try {
      const response = await fetch("/api/feedback/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId, deviceId })
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Voting failed");
      }
      const { feedback } = (await response.json()) as { feedback: FeedbackItem };
      setItems((prev) => prev.map((item) => (item.id === feedback.id ? feedback : item)));
      const next = new Set(votedIds);
      next.add(feedbackId);
      storeVotedIds(next);
      setMessage({ type: "success", text: "Thanks for supporting this idea" });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Voting failed" });
    } finally {
      setVoting((prev) => ({ ...prev, [feedbackId]: false }));
    }
  };

  return (
    <div className="feedback-widget">
      <button
        type="button"
        className="feedback-toggle"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "Close feedback panel" : "Feedback & leaderboard"}
      </button>

      {isOpen && (
        <div
          className="feedback-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Feedback dialog"
          onClick={() => setIsOpen(false)}
        >
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            <div className="feedback-panel-header">
              <div>
                <p className="feedback-panel-label">Feedback box</p>
                <h3>Tell us what to improve next</h3>
              </div>
              <button
                type="button"
                className="feedback-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close feedback"
              >
                ×
              </button>
            </div>

            <div className="feedback-body">
              <form className="feedback-form" onSubmit={handleSubmit}>
                <label>
                  Title
                  <input
                    type="text"
                    value={form.title}
                    onChange={handleChange("title")}
                    placeholder="Describe your idea in one sentence"
                    maxLength={80}
                  />
                </label>
                <label>
                  Details
                  <textarea
                    value={form.description}
                    onChange={handleChange("description")}
                    placeholder="Share as much context as possible"
                    rows={4}
                    maxLength={1000}
                  />
                </label>
                <label>
                  Email (optional)
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="So we can follow up if needed"
                  />
                </label>
                <button type="submit" className="pill active" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit idea"}
                </button>
              </form>

              {message && (
                <p className={`feedback-message feedback-message-${message.type}`}>
                  {message.text}{" "}
                  {message.type === "success" && (
                    <Link href="/roadmap" className="blog-inline-cta">
                      View Top Ideas
                    </Link>
                  )}
                </p>
              )}

              <div className="feedback-list">
                <div className="feedback-list-headline">
                  <h4>Community leaderboard</h4>
                  <span>{sortedItems.length} ideas</span>
                </div>
                {sortedItems.length === 0 && <p className="feedback-empty">No ideas yet. Be the first to share!</p>}
                {sortedItems.map((item) => (
                  <article key={item.id} className="feedback-item">
                    <div>
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                      <span className="feedback-item-time">
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "2-digit"
                        })}
                      </span>
                    </div>
                    <button
                      type="button"
                      className={`feedback-vote ${votedIds.has(item.id) ? "feedback-vote-disabled" : ""}`}
                      onClick={() => handleVote(item.id)}
                      disabled={votedIds.has(item.id) || voting[item.id]}
                    >
                      <span>{item.votes}</span>
                      <small>{votedIds.has(item.id) ? "Voted" : voting[item.id] ? "Voting…" : "Support"}</small>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .feedback-toggle {
          cursor: pointer;
        }
        /* overlay covers viewport so panel doesn't push content */
        .feedback-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
        }
        .feedback-modal {
          background: var(--bg, #fff);
          width: min(900px, 96vw);
          max-height: 90vh;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .feedback-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--line, rgba(0,0,0,0.06));
        }
        .feedback-close {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          line-height: 1;
        }
        .feedback-body {
          padding: 1rem 1.25rem 1.5rem;
          overflow: auto;
        }
        .feedback-form label {
          display: block;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }
        .feedback-form input,
        .feedback-form textarea {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.25rem;
          border: 1px solid var(--line, rgba(0,0,0,0.08));
          border-radius: 6px;
          background: var(--bg, #fff);
        }
        .feedback-list {
          margin-top: 1rem;
        }
        .feedback-item {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--line, rgba(0,0,0,0.04));
        }
        @media (max-width: 640px) {
          .feedback-modal {
            width: 100%;
            border-radius: 8px;
            max-height: 95vh;
          }
          .feedback-panel-header {
            padding: 0.75rem;
          }
          .feedback-body {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FeedbackWidget;

