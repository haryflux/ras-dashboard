import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

function generateInsight(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("certif"))
    return "Sounds like certification progress matters a lot to you. We'll prioritize content that builds toward that.";
  if (lower.includes("senior") || lower.includes("manager") || lower.includes("promot"))
    return "Sounds like you're focused on growing into your next role. We'll factor that into your roadmap.";
  if (lower.includes("audit") || lower.includes("soc") || lower.includes("sampling") || lower.includes("hitrust"))
    return "Sounds like you're focused on hands-on audit skills. We'll lean into practical, scenario-based learning.";
  return "This helps us understand your direction and shape a more personal learning path.";
}

type Phase = "idle" | "thinking" | "done";

export function AIInsightChip({ text }: { text: string }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [insight, setInsight] = useState("");

  useEffect(() => {
    if (text.trim().length < 12) {
      setPhase("idle");
      return;
    }
    setPhase("thinking");
    const thinkTimer = setTimeout(() => {
      setInsight(generateInsight(text));
      setPhase("done");
    }, 1200);
    return () => clearTimeout(thinkTimer);
  }, [text]);

  return (
    <AnimatePresence mode="wait">
      {phase === "thinking" && (
        <motion.div
          key="thinking"
          className="atlas-ai-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="atlas-ai-dot" />
          <span className="atlas-ai-thinking-text">Thinking about your goal…</span>
        </motion.div>
      )}
      {phase === "done" && (
        <motion.div
          key="done"
          className="atlas-insight"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          aria-live="polite"
        >
          <Sparkles size={14} className="atlas-insight__icon" />
          {insight}
        </motion.div>
      )}
    </AnimatePresence>
  );
}