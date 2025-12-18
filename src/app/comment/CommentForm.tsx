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
      {pending ? "Submitting…" : "Submit idea"}
    </button>
  );
};

const CommentForm = () => {
  const [state, formAction] = useFormState(create, initialState);
  return (
    <form className="comment-form" action={formAction}>
      <label>
        Title
        <input name="title" type="text" placeholder="Give your idea a title" maxLength={80} />
      </label>
      <label>
        Details
        <textarea
          name="description"
          placeholder="Tell us exactly what you would like us to improve"
          rows={4}
          maxLength={1000}
        />
      </label>
      <label>
        Email (optional)
        <input name="email" type="email" placeholder="We will reach out if we need clarification" maxLength={120} />
      </label>
      <SubmitButton />
      {state.message && (
        <p className={`comment-form-message comment-form-message-${state.status}`}>{state.message}</p>
      )}
    </form>
  );
};

export default CommentForm;

