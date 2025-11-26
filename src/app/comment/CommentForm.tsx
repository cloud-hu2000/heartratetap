"use client";

import { useFormState, useFormStatus } from "react-dom";
import { create, type CommentFormState } from "./actions";

const initialState: CommentFormState = {
  status: "idle",
  message: ""
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="pill active" disabled={pending}>
      {pending ? "提交中…" : "提交建议"}
    </button>
  );
};

const CommentForm = () => {
  const [state, formAction] = useFormState(create, initialState);
  return (
    <form className="comment-form" action={formAction}>
      <label>
        标题
        <input name="title" type="text" placeholder="请输入标题" minLength={4} maxLength={80} required />
      </label>
      <label>
        详细描述
        <textarea
          name="description"
          placeholder="告诉我们你想改进的细节"
          rows={4}
          minLength={10}
          maxLength={1000}
          required
        />
      </label>
      <label>
        邮箱（选填）
        <input name="email" type="email" placeholder="方便进一步沟通" maxLength={120} />
      </label>
      <SubmitButton />
      {state.message && (
        <p className={`comment-form-message comment-form-message-${state.status}`}>{state.message}</p>
      )}
    </form>
  );
};

export default CommentForm;

