import { useState, type FormEvent } from "react";
import { PlaceholderCard } from "../../components/PlaceholderCard";

// ---------------------------------------------------------------------------
// Knowledge Assistant — chat SHELL for the future RAG assistant.
// The real AI/RAG is a separate ticket, so replies here are canned demo text.
// The UI shows suggestion chips, a message thread, and mock source citations
// so the experience feels complete for the demo. No AI is called from here.
// ---------------------------------------------------------------------------

interface Msg { from: "user" | "bot"; text: string; cite?: string }

const SUGGESTIONS = [
  "Where is the sampling training?",
  "Explain SOC walkthroughs",
  "What is materiality?",
  "How do I document a control test?",
];

// Canned demo answers (placeholder until RAG is wired).
function demoAnswer(q: string): Msg {
  const lower = q.toLowerCase();
  if (lower.includes("sampling"))
    return { from: "bot", text: "Sampling training lives in the SOC Module 2 materials. Start with the 'SOC Sampling' section, then review the Materiality & Sampling memo for how to size a sample when the population is between 52 and 100.", cite: "Source: SOC Module 2 · Materiality & Sampling Memo" };
  if (lower.includes("walkthrough"))
    return { from: "bot", text: "A SOC walkthrough is where you trace a transaction end-to-end to confirm a control operates as described. See SOC Module 2 — 'SOC Walkthrough Documentation' for the expected steps and evidence.", cite: "Source: SOC Module 2 · Walkthrough Documentation" };
  if (lower.includes("materiality"))
    return { from: "bot", text: "Materiality is the threshold above which a misstatement could influence decisions. Review the Materiality & Sampling memo for how it drives sample sizes on SOC engagements.", cite: "Source: Materiality & Sampling Memo" };
  return { from: "bot", text: "Great question! Once the RAG engine is connected, I'll answer this using our approved SOC and HITRUST training content — with citations to the exact source document.", cite: "Source: (AI retrieval — coming in a later ticket)" };
}

export function KnowledgeAssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hi! I'm your Knowledge Assistant. Ask me anything about our approved SOC & HITRUST training content. Try one of the suggestions below to get started. 👇" },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }, demoAnswer(text)]);
    setInput("");
  };

  const onSubmit = (e: FormEvent) => { e.preventDefault(); send(input); };

  return (
    <div className="page">
      <div className="page__head">
        <h1>Knowledge Assistant 💬</h1>
        <p className="page__subtitle">Ask questions about approved training content and get grounded answers with sources.</p>
      </div>

      <PlaceholderCard title="Chat" icon="💬" badge="AI">
        <div className="chat">
          <div className="chat__scroll">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from === "user" ? "msg--user" : "msg--bot"}`}>
                {m.text}
                {m.cite && <span className="msg__cite">📎 {m.cite}</span>}
              </div>
            ))}
          </div>

          {/* Suggestion chips */}
          <div className="suggests">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="suggest" onClick={() => send(s)}>{s}</button>
            ))}
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <input
              className="chat-form__input"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Ask the knowledge assistant"
            />
            <button className="btn" type="submit">Ask</button>
          </form>
        </div>
      </PlaceholderCard>
    </div>
  );
}
