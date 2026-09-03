import { motion } from "framer-motion";
import { Puzzle, BookOpen, Layers, Sparkles, Newspaper, Clock } from "lucide-react";
import { WhyWeAskThis } from "../../../components/onboarding/WhyWeAskThis";
import type { OnboardingData } from "../OnboardingShell";

// ---------------------------------------------------------------------------
// Step4.tsx — "How do you like to learn?"
// PLACE AT: src/routes/pages/onboarding-steps/Step4.tsx
//
// Upgrades the flat pill buttons into icon cards with a 1-line description
// each, gives "Interactive AI" a NEW badge to promote the differentiator,
// and uses the same consistent gradient CTA as every other step (fixing the
// outlined-button inconsistency flagged in the audit).
// ---------------------------------------------------------------------------

interface StepProps {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const LEARNING_TYPES = [
  { name: "Hands-on Exercises", icon: Puzzle, desc: "Practice by doing, not just reading" },
  { name: "Full Courses", icon: BookOpen, desc: "Structured, in-depth modules" },
  { name: "Case Studies", icon: Layers, desc: "Real-world scenarios to work through" },
  { name: "Interactive AI", icon: Sparkles, desc: "Chat-style practice with an AI mentor", badge: "NEW" },
  { name: "Reading Material/Blogs", icon: Newspaper, desc: "Short articles and reference guides" },
];

const TIME_OPTIONS = ["Under 15 Min", "15-30 Min", "30-60 Min", "More than 1 Hour"];

export function Step4({ data, update, onNext, onBack }: StepProps) {
  const toggleType = (name: string) => {
    const has = data.learningTypes.includes(name);
    update({ learningTypes: has ? data.learningTypes.filter((t) => t !== name) : [...data.learningTypes, name] });
  };

  const canContinue = data.learningTypes.length > 0 && data.time !== "";

  return (
    <div>
      <p className="atlas-step-label">Step 4 of 5 · Matching your learning style</p>
      <h1 className="atlas-page-h1">How do you like to learn?</h1>
      <p className="atlas-page-sub">
        Same skills, different delivery — pick what fits how you actually work.
      </p>

      <div className="atlas-q">
        <p className="atlas-section-label">What kind of learning do you enjoy?</p>
        <div className="atlas-icard-grid">
          {LEARNING_TYPES.map((t) => {
            const Icon = t.icon;
            const active = data.learningTypes.includes(t.name);
            return (
              <motion.button
                key={t.name}
                className={`atlas-icard ${active ? "atlas-icard--active" : ""}`}
                onClick={() => toggleType(t.name)}
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -2 }}
              >
                {t.badge && <span className="atlas-icard__badge">{t.badge}</span>}
                <Icon size={20} className="atlas-icard__icon" />
                <div>
                  <p className="atlas-icard__title">{t.name}</p>
                  <p className="atlas-icard__desc">{t.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="atlas-q">
        <h2>
          <Clock size={18} className="atlas-q-icon" /> How much time can you usually give?
        </h2>
        <p className="atlas-q__hint">
          Even 15 minutes a day adds up — short, consistent sessions work great.
        </p>
        <div className="atlas-boxes">
          {TIME_OPTIONS.map((o) => (
            <button
              key={o}
              className={`atlas-box ${data.time === o ? "atlas-box--active" : ""}`}
              onClick={() => update({ time: o })}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <WhyWeAskThis>
        This decides whether we send quick daily drills or deeper weekly modules — so your
        learning fits your calendar instead of fighting it.
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
