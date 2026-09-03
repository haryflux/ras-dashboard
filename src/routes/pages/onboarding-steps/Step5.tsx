import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Pencil, Rocket, PlayCircle } from "lucide-react";
import type { OnboardingData } from "../OnboardingShell";

// ---------------------------------------------------------------------------
// Step5.tsx — "Here's your personalized learning profile"
// PLACE AT: src/routes/pages/onboarding-steps/Step5.tsx
//
// The payoff screen. Reveals the assembled profile progressively (role ->
// skills -> goal), fires a lightweight confetti burst once assembly
// finishes, shows a "first recommended module" teaser, and gives "Edit
// responses" a real button instead of a muted footnote.
//
// Respects prefers-reduced-motion: if set, everything appears instantly and
// no confetti fires (handled via the `motionOk` check below).
// ---------------------------------------------------------------------------

interface StepProps {
  data: OnboardingData;
  onNext: () => void;
  onBack: () => void;
}

// A handful of little emoji "confetti" pieces with randomized horizontal
// offsets and fall durations — pure CSS animation, no extra library needed.
const CONFETTI = ["🎉", "✨", "🎊", "⭐", "💫", "🎉", "✨", "🎊"];

export function Step5({ data, onNext, onBack }: StepProps) {
  const [assembled, setAssembled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const motionOk =
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    // Mark "fully assembled" once the last piece (goal) would have faded in,
    // then fire the confetti burst as the reward moment.
    const t = setTimeout(() => {
      setAssembled(true);
      if (motionOk) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1500);
      }
    }, 1100);
    return () => clearTimeout(t);
  }, [motionOk]);

  const goalText =
    data.goal.trim().length > 0
      ? data.goal.trim()
      : "You're looking to strengthen your Technology Assurance skills and build a more structured learning path toward your next career goal.";

  return (
    <div>
      <p className="atlas-step-label">Step 5 of 5 · Your profile is ready ✨</p>
      <h1 className="atlas-page-h1">Here's your personalized learning profile</h1>
      <p className="atlas-page-sub">
        Built from everything you just shared — and it'll keep learning as you go.
      </p>

      <div className="atlas-confetti-wrap" aria-hidden="true">
        {showConfetti &&
          CONFETTI.map((c, i) => (
            <span
              key={i}
              className="atlas-confetti"
              style={{
                left: `${8 + i * 11}%`,
                animationDelay: `${i * 0.06}s`,
              }}
            >
              {c}
            </span>
          ))}
      </div>

      <div className="atlas-summary">
        <p className="atlas-summary__label">YOUR LEARNING PROFILE</p>
        <p className="atlas-summary__ai">
          <Sparkles size={13} className="atlas-sparkle-icon" /> AI-Generated
        </p>

        <motion.div
          className="atlas-summary__grid"
          initial={motionOk ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div>
            <p className="atlas-summary__k">Role</p>
            <p className="atlas-summary__v">{data.role || "Analyst"}</p>
          </div>
          <div>
            <p className="atlas-summary__k">Experience</p>
            <p className="atlas-summary__v">{data.experience} {data.experience === 1 ? "year" : "years"}</p>
          </div>
        </motion.div>

        <p className="atlas-summary__k">Skills</p>
        <motion.div
          className="atlas-summary__skills"
          initial={motionOk ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {(data.skills.length ? data.skills.slice(0, 5) : ["SOC Walkthroughs"]).map((s) => (
            <span key={s} className="atlas-box" style={{ cursor: "default" }}>{s}</span>
          ))}
        </motion.div>

        <p className="atlas-summary__k">Your goal</p>
        <motion.div
          className="atlas-goalbox"
          initial={motionOk ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          {goalText}
          <small>Generated from your goals and responses.</small>
        </motion.div>
      </div>

      {assembled && (
        <motion.div
          className="atlas-next-module"
          initial={motionOk ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PlayCircle size={26} className="atlas-next-module__playicon" />
          <div>
            <p className="atlas-next-module__label">Your first recommended module</p>
            <p className="atlas-next-module__title">SOC Walkthrough Fundamentals</p>
            <p className="atlas-next-module__meta">20 min · Beginner-friendly</p>
          </div>
        </motion.div>
      )}

      <div className="atlas-edit-row">
        <button className="atlas-cta atlas-cta--secondary" onClick={onBack}>
          <Pencil size={15} /> Edit your responses
        </button>
      </div>
      <p className="atlas-foot-note">
        Your profile evolves automatically as you keep learning — nothing's permanent.
      </p>

      <div className="atlas-nav">
        <button className="atlas-link" onClick={onBack}>← Back</button>
        <button className="atlas-cta" onClick={onNext}>
          <Rocket size={16} /> Start Learning
        </button>
      </div>
    </div>
  );
}
