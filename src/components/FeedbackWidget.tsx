"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

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

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
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
      setMessage({ type: "error", text: "Please add a little more detail." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, email })
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorBody?.error ?? "Submission failed, please try again");
      }

      setForm(INITIAL_FORM);
      setMessage({ type: "success", text: "Thanks! Your feedback has been sent privately to the team." });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Submission failed, please try again" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-widget">
      {isOpen && (
        <section id="feedback-panel" className="feedback-panel" aria-label="Send product feedback">
          <div className="feedback-panel-header">
            <div>
              <p className="feedback-panel-label">Private feedback</p>
              <h3>Tell us what to improve</h3>
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

          <form className="feedback-form" onSubmit={handleSubmit}>
            <label>
              Title
              <input
                type="text"
                value={form.title}
                onChange={handleChange("title")}
                placeholder="Describe the issue or suggestion"
                maxLength={80}
              />
            </label>
            <label>
              Details
              <textarea
                value={form.description}
                onChange={handleChange("description")}
                placeholder="Share the context needed to understand it"
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
                placeholder="For a follow-up if needed"
                maxLength={120}
              />
            </label>
            <button type="submit" className="pill active" disabled={submitting}>
              {submitting ? "Sending…" : "Send feedback"}
            </button>
          </form>

          {message && <p className={`feedback-message feedback-message-${message.type}`}>{message.text}</p>}
        </section>
      )}

      <button
        type="button"
        className="feedback-toggle"
        aria-expanded={isOpen}
        aria-controls="feedback-panel"
        onClick={() => setIsOpen((previous) => !previous)}
      >
        {isOpen ? "Close feedback" : "Send feedback"}
      </button>
    </div>
  );
};

export default FeedbackWidget;
