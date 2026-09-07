import { useState, useRef, useEffect, type FormEvent } from "react";
import { Paperclip, Mic, MicOff, Copy, Check, RotateCcw, X, FileText } from "lucide-react";
import { PlaceholderCard } from "../../components/PlaceholderCard";

// ---------------------------------------------------------------------------
// Knowledge Assistant — Copilot-style chat.
// REPLACES: src/routes/pages/KnowledgeAssistantPage.tsx
//
// New features (all zero-dependency):
//   - Document upload (attach files, referenced in the answer)
//   - Voice input via the browser's native Web Speech API (no library needed;
//     gracefully hides the mic button if the browser doesn't support it)
//   - Animated "thinking" indicator before each answer
//   - Copy-to-clipboard on every AI response
//   - "New chat" to reset the conversation
//
// The AI itself is still a canned demo responder — swapping this for a real
// RAG call later only means changing `demoAnswer()` to an API call.
// ---------------------------------------------------------------------------

interface Msg {
  from: "user" | "bot";
  text: string;
  cite?: string;
  files?: string[];
}

const SUGGESTIONS = [
  "Where is the sampling training?",
  "Explain SOC walkthroughs",
  "What is materiality?",
  "How do I document a control test?",
];

function demoAnswer(q: string, files: string[]): Msg {
  const lower = q.toLowerCase();

  if (files.length > 0) {
    return {
      from: "bot",
      text: `Based on "${files[0]}" and our approved SOC/HITRUST content, here's a summary relevant to your question. Once the real document engine is connected, this will read the actual file content instead of just its name.`,
      cite: `Source: ${files[0]} (uploaded) + internal training content`,
    };
  }
  if (lower.includes("sampling"))
    return { from: "bot", text: "Sampling training lives in the SOC Module 2 materials. Start with the 'SOC Sampling' section, then review the Materiality & Sampling memo for how to size a sample when the population is between 52 and 100.", cite: "Source: SOC Module 2 · Materiality & Sampling Memo" };
  if (lower.includes("walkthrough"))
    return { from: "bot", text: "A SOC walkthrough is where you trace a transaction end-to-end to confirm a control operates as described. See SOC Module 2 — 'SOC Walkthrough Documentation' for the expected steps and evidence.", cite: "Source: SOC Module 2 · Walkthrough Documentation" };
  if (lower.includes("materiality"))
    return { from: "bot", text: "Materiality is the threshold above which a misstatement could influence decisions. Review the Materiality & Sampling memo for how it drives sample sizes on SOC engagements.", cite: "Source: Materiality & Sampling Memo" };
  return { from: "bot", text: "Great question! Once the RAG engine is connected, I'll answer this using our approved SOC and HITRUST training content — with citations to the exact source document.", cite: "Source: (AI retrieval — coming in a later ticket)" };
}

// Minimal typing for the Web Speech API (not in default TS lib).
type SpeechRecognitionLike = {
  start: () => void;
  stop: () => void;
  onresult: ((e: any) => void) | null;
  onend: (() => void) | null;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
};

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function KnowledgeAssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hi! I'm your Knowledge Assistant. Ask me anything about our approved SOC & HITRUST training content, or attach a document and I'll factor it in. Try one of the suggestions below to get started. 👇" },
  ]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const speechSupported = getSpeechRecognition() !== null;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim() && files.length === 0) return;
    const userMsg: Msg = { from: "user", text: text || "(sent with attachment)", files: files.length ? [...files] : undefined };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);

    const attachedFiles = [...files];
    setFiles([]);

    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [...m, demoAnswer(text, attachedFiles)]);
    }, 900);
  };

  const onSubmit = (e: FormEvent) => { e.preventDefault(); send(input); };

  const handleFilePick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []).map((f) => f.name);
    setFiles((prev) => [...prev, ...picked]);
    e.target.value = ""; // allow picking the same file again later
  };
  const removeFile = (name: string) => setFiles((f) => f.filter((n) => n !== name));

  const toggleVoice = () => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript ?? "";
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const copyMessage = (text: string, idx: number) => {
    navigator.clipboard?.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const newChat = () => {
    setMessages([{ from: "bot", text: "New conversation started. What would you like to know?" }]);
    setFiles([]);
    setInput("");
  };

  return (
    <div className="page">
      <div className="page__head">
        <h1>Knowledge Assistant 💬</h1>
        <p className="page__subtitle">Ask questions about approved training content and get grounded answers with sources.</p>
      </div>

      <PlaceholderCard title="Chat" icon="💬" badge="AI">
        <div className="chat">
          <div className="chat__toolbar">
            <button className="chat__tool-btn" onClick={newChat} title="Start a new chat">
              <RotateCcw size={14} /> New chat
            </button>
          </div>

          <div className="chat__scroll" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from === "user" ? "msg--user" : "msg--bot"}`}>
                {m.text}
                {m.files && m.files.length > 0 && (
                  <div className="msg__files">
                    {m.files.map((f) => (
                      <span key={f} className="msg__file-chip"><FileText size={12} /> {f}</span>
                    ))}
                  </div>
                )}
                {m.cite && <span className="msg__cite">📎 {m.cite}</span>}
                {m.from === "bot" && i > 0 && (
                  <button className="msg__copy" onClick={() => copyMessage(m.text, i)} title="Copy response">
                    {copiedIdx === i ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                )}
              </div>
            ))}

            {thinking && (
              <div className="msg msg--bot msg--thinking">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
          </div>

          {/* Attached file chips (pending, not yet sent) */}
          {files.length > 0 && (
            <div className="chat__attachments">
              {files.map((f) => (
                <span key={f} className="attachment-chip">
                  <FileText size={13} /> {f}
                  <button onClick={() => removeFile(f)} aria-label={`Remove ${f}`}><X size={12} /></button>
                </span>
              ))}
            </div>
          )}

          <div className="suggests">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="suggest" onClick={() => send(s)}>{s}</button>
            ))}
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              multiple
            />
            <button type="button" className="chat-icon-btn" onClick={handleFilePick} title="Attach a document">
              <Paperclip size={17} />
            </button>

            {speechSupported && (
              <button
                type="button"
                className={`chat-icon-btn ${listening ? "chat-icon-btn--active" : ""}`}
                onClick={toggleVoice}
                title={listening ? "Stop listening" : "Ask by voice"}
              >
                {listening ? <MicOff size={17} /> : <Mic size={17} />}
              </button>
            )}

            <input
              className="chat-form__input"
              placeholder={listening ? "Listening..." : "Ask a question..."}
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
