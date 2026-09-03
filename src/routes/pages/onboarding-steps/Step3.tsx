import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lightbulb } from "lucide-react";
import { WhyWeAskThis } from "../../../components/onboarding/WhyWeAskThis";
import { AIInsightChip } from "../../../components/onboarding/AIInsightChip";
import type { OnboardingData } from "../OnboardingShell";

// ---------------------------------------------------------------------------
// Step3.tsx — "Tell us where you want to go"
// PLACE AT: src/routes/pages/onboarding-steps/Step3.tsx
//
// The emotional core of onboarding. Adds tappable starter prompts, a
// collapsed "See an example answer" accordion, an encouraging (not
// pressuring) word counter, and the AIInsightChip that proves the AI is
// "listening" as the user types.
// ---------------------------------------------------------------------------

interface StepProps {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const STARTERS = [
  "I want to get better at…",
  "I'm working toward…",
  "I'm preparing for…",
];

const EXAMPLE =
  "I'm an Analyst who wants to get comfortable running SOC walkthroughs independently, and eventually move into a Senior Associate role within a year.";

export function Step3({ data, update, onNext, onBack }: StepProps) {
  const [showExample, setShowExample] = useState(false);
  const wordCount = data.goal.trim() ? data.goal.trim().split(/\s+/).length : 0;
  const canContinue = data.goal.trim().length > 0;

  const applyStarter = (s: string) => {
    if (!data.goal.trim()) update({ goal: s + " " });
  };

  return (
    <div>
      <p className="atlas-step-label">Step 3 of 5 · The one question that matters most</p>
      <h1 className="atlas-page-h1">Tell us where you want to go</h1>
      <p className="atlas-page-sub">
        Not sure how to phrase it? A few honest sentences is more than enough — there's no
        perfect answer here.
      </p>

      <div className="atlas-q">
        <p className="atlas-section-label">
          <Lightbulb size={13} className="atlas-section-label__icon" /> Need inspiration? Tap one to start
        </p>
        <div className="atlas-starter-row">
          {STARTERS.map((s) => (
            <button key={s} className="atlas-starter" onClick={() => applyStarter(s)}>
              "{s}"
            </button>
          ))}
        </div>

        <div className="atlas-textarea-wrap">
          <p className="atlas-textarea-title">What would you like to learn? Why is it important to you? What are you working toward?</p>
          <textarea
            className="atlas-textarea"
            placeholder="Start typing here..."
            value={data.goal}
            onChange={(e) => update({ goal: e.target.value })}
            maxLength={2400}
          />
          <div className="atlas-textarea__count">
            {wordCount === 0 ? "Even 2–3 sentences helps a lot" : `${wordCount} / 300 words`}
          </div>
        </div>

        <AIInsightChip text={data.goal} />

        <button
          className="atlas-example-toggle"
          onClick={() => setShowExample((v) => !v)}
          aria-expanded={showExample}
        >
          See an example answer
          <motion.span animate={{ rotate: showExample ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {showExample && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: "hidden" }}
            >
              <p className="atlas-example-text">"{EXAMPLE}"</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <WhyWeAskThis>
        Skills tell us <em>what</em> you know. This tells us <em>why</em> it matters to you — and
        that's what makes your learning path feel personal instead of generic.
      </WhyWeAskThis>

      <div className="atlas-nav">
        <button className="atlas-link" onClick={onBack}>← Back</button>
        <button className="atlas-cta" onClick={onNext} disabled={!canContinue}>
          Continue <span className="atlas-cta__arrow">→</span>
        </button>
      </div>
    </div>
  );
}
