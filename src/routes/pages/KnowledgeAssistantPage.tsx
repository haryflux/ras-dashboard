import { useState, type FormEvent } from "react";
import { PlaceholderCard } from "../../components/PlaceholderCard";
import { SuccessState } from "../../components/states/SuccessState";
import { EmptyState } from "../../components/states/EmptyState";

// ---------------------------------------------------------------------------
// Associate "Knowledge Assistant" - a shell for the future RAG chat.
// The actual RAG/AI logic is OUT OF SCOPE for this ticket, so this only shows
// the input UI and a demo success message. It never calls AI directly.
// ---------------------------------------------------------------------------

export function KnowledgeAssistantPage() {
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    // No AI call here - just demonstrate the success state for the shell.
    setSent(true);
  };

  return (
    <div className="page">
      <div className="page__head">
        <h1>Knowledge Assistant 💬</h1>
        <p className="page__subtitle">
          Ask questions about approved training content. (AI answers are wired
          in a later ticket.)
        </p>
      </div>

      <PlaceholderCard title="Ask a question">
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-form__input"
            placeholder="e.g. Where is the sampling training?"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setSent(false);
            }}
            aria-label="Ask the knowledge assistant"
          />
          <button className="btn" type="submit">
            Ask
          </button>
        </form>

        <div className="chat-output">
          {sent ? (
            <SuccessState message="Question received — AI response coming in a future ticket." />
          ) : (
            <EmptyState message="Your answer will appear here." />
          )}
        </div>
      </PlaceholderCard>
    </div>
  );
}
