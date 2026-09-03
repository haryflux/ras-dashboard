import { motion } from "framer-motion";
import { Check } from "lucide-react";

// ---------------------------------------------------------------------------
// StepTracker.tsx — replaces the plain progress bar with a segmented,
// labelled step tracker so users see the whole journey shape immediately.
// PLACE AT: src/components/onboarding/StepTracker.tsx
// ---------------------------------------------------------------------------

const LABELS = ["Role", "Skills", "Goals", "Style", "Profile"];

export function StepTracker({ step, total }: { step: number; total: number }) {
  return (
    <div
      className="atlas-tracker"
      role="group"
      aria-label={`Step ${step} of ${total}: ${LABELS[step - 1]}`}
    >
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
        const isDone = n < step;
        const isActive = n === step;
        return (
          <div
            key={n}
            className={`atlas-tracker__step ${isDone ? "atlas-tracker__step--done" : ""} ${isActive ? "atlas-tracker__step--active" : ""}`}
          >
            {n < total && (
              <span className="atlas-tracker__line" aria-hidden="true">
                <motion.span
                  className="atlas-tracker__line-fill"
                  initial={false}
                  animate={{ width: isDone ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </span>
            )}
            <motion.span
              className="atlas-tracker__dot"
              aria-current={isActive ? "step" : undefined}
              animate={isActive ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {isDone ? <Check size={14} /> : n}
            </motion.span>
            <span className="atlas-tracker__label">{LABELS[n - 1]}</span>
          </div>
        );
      })}
    </div>
  );
}
