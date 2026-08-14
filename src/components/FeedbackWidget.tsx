"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Feedback");
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
      setMessage({ type: "error", text: t("titleError") });
      return;
    }
    if (description.length < 10) {
      setMessage({ type: "error", text: t("detailsError") });
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
        throw new Error(errorBody?.error ?? t("submitError"));
      }

      setForm(INITIAL_FORM);
      setMessage({ type: "success", text: t("success") });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : t("submitError") });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-widget">
      {isOpen && (
        <section id="feedback-panel" className="feedback-panel" aria-label={t("panelAria")}>
          <div className="feedback-panel-header">
            <div>
              <p className="feedback-panel-label">{t("private")}</p>
              <h3>{t("heading")}</h3>
            </div>
            <button
              type="button"
              className="feedback-close"
              onClick={() => setIsOpen(false)}
              aria-label={t("close")}
            >
              ×
            </button>
          </div>

          <form className="feedback-form" onSubmit={handleSubmit}>
            <label>
              {t("title")}
              <input
                type="text"
                value={form.title}
                onChange={handleChange("title")}
                placeholder={t("titlePlaceholder")}
                maxLength={80}
              />
            </label>
            <label>
              {t("details")}
              <textarea
                value={form.description}
                onChange={handleChange("description")}
                placeholder={t("detailsPlaceholder")}
                rows={4}
                maxLength={1000}
              />
            </label>
            <label>
              {t("email")}
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder={t("emailPlaceholder")}
                maxLength={120}
              />
            </label>
            <button type="submit" className="pill active" disabled={submitting}>
              {submitting ? t("sending") : t("send")}
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
        {isOpen ? t("close") : t("send")}
      </button>
    </div>
  );
};

export default FeedbackWidget;
