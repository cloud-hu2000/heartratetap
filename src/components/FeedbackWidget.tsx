"use client";

import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";

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
        throw new Error("加载反馈失败");
      }
      const data = (await response.json()) as { feedback: FeedbackItem[] };
      setItems(data.feedback ?? []);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "无法加载意见列表" });
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
    setSubmitting(true);
    setMessage(null);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        email: form.email.trim()
      };
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorBody?.error ?? "提交失败，请稍后再试");
      }
      const { feedback } = (await response.json()) as { feedback: FeedbackItem };
      setItems((prev) => [feedback, ...prev]);
      setForm(INITIAL_FORM);
      setMessage({ type: "success", text: "已收到你的建议，感谢支持！" });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "提交失败，请稍后再试" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (feedbackId: string) => {
    if (votedIds.has(feedbackId)) {
      setMessage({ type: "error", text: "你已经投过票啦" });
      return;
    }
    const deviceId = ensureDeviceId();
    if (!deviceId) {
      setMessage({ type: "error", text: "无法识别设备，稍后再试" });
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
        throw new Error(body?.error ?? "投票失败");
      }
      const { feedback } = (await response.json()) as { feedback: FeedbackItem };
      setItems((prev) => prev.map((item) => (item.id === feedback.id ? feedback : item)));
      const next = new Set(votedIds);
      next.add(feedbackId);
      storeVotedIds(next);
      setMessage({ type: "success", text: "已助力该建议" });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "投票失败" });
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
        {isOpen ? "收起意见箱" : "反馈与排行"}
      </button>

      {isOpen && (
        <div className="feedback-panel">
          <div className="feedback-panel-header">
            <div>
              <p className="feedback-panel-label">意见箱</p>
              <h3>告诉我们下一步如何改进</h3>
            </div>
            <button type="button" className="feedback-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <form className="feedback-form" onSubmit={handleSubmit}>
            <label>
              标题
              <input
                type="text"
                value={form.title}
                onChange={handleChange("title")}
                placeholder="一句话描述你的想法"
                required
                minLength={4}
                maxLength={80}
              />
            </label>
            <label>
              详细描述
              <textarea
                value={form.description}
                onChange={handleChange("description")}
                placeholder="越详细越容易安排开发优先级"
                rows={4}
                required
                minLength={10}
                maxLength={1000}
              />
            </label>
            <label>
              联系邮箱（选填）
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="方便我们与你进一步沟通"
              />
            </label>
            <button type="submit" className="pill active" disabled={submitting}>
              {submitting ? "提交中…" : "提交建议"}
            </button>
          </form>

          {message && (
            <p className={`feedback-message feedback-message-${message.type}`}>
              {message.text}
            </p>
          )}

          <div className="feedback-list">
            <div className="feedback-list-headline">
              <h4>社区排行</h4>
              <span>{sortedItems.length} 条建议</span>
            </div>
            {sortedItems.length === 0 && <p className="feedback-empty">暂时还没有建议，快来当第一个吧。</p>}
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
                  <small>{votedIds.has(item.id) ? "已投票" : voting[item.id] ? "投票中…" : "支持"}</small>
                </button>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackWidget;

