import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, FileText, CheckCircle2 } from "lucide-react";
import { WhyWeAskThis } from "../../../components/onboarding/WhyWeAskThis";
import { InfoTooltip } from "../../../components/onboarding/InfoTooltip";
import type { OnboardingData } from "../OnboardingShell";

// ---------------------------------------------------------------------------
// Step2.tsx — "What do you already know?"
// PLACE AT: src/routes/pages/onboarding-steps/Step2.tsx
//
// Groups skills into 3 labelled categories (Testing & Sampling, Compliance &
// Frameworks, Documentation), adds beginner tooltips for jargon, a live
// "N skills selected" counter, and a smooth reveal of the proficiency
// section once at least one skill is picked.
// ---------------------------------------------------------------------------

interface StepProps {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CATEGORIES: {
  label: string;
  icon: typeof Search;
  skills: { name: string; tip?: string }[];
}[] = [
  {
    label: "Testing & Sampling",
    icon: Search,
    skills: [
      { name: "SOC Walkthroughs", tip: "Tracing a transaction end-to-end to confirm a control operates as described." },
      { name: "Sampling", tip: "Selecting a representative subset of transactions to test, instead of reviewing 100% of records." },
      { name: "Policy Testing" },
    ],
  },
  {
    label: "Compliance & Frameworks",
    icon: Shield,
    skills: [
      { name: "HITRUST", tip: "A security & privacy framework used to certify how organizations protect sensitive data." },
      { name: "IT General Controls", tip: "Baseline IT controls (access, change management, operations) that support all other systems." },
      { name: "Risk Assessment" },
    ],
  },
  {
    label: "Documentation",
    icon: FileText,
    skills: [
      { name: "Documentation" },
      { name: "Report Writing" },
    ],
  },
];

const PROFICIENCY = ["Beginner", "Intermediate", "Advanced"];

export function Step2({ data, update, onNext, onBack }: StepProps) {
  const toggleSkill = (name: string) => {
    const has = data.skills.includes(name);
    update({ skills: has ? data.skills.filter((s) => s !== name) : [...data.skills, name] });
  };

  const setProf = (skill: string, level: string) => {
    update({ proficiency: { ...data.proficiency, [skill]: level } });
  };

  const canContinue = data.skills.length > 0;

  return (
    <div>
      <p className="atlas-step-label">Step 2 of 5 · Mapping your skills</p>
      <h1 className="atlas-page-h1">What do you already know?</h1>
      <p className="atlas-page-sub">
        Select the skills you use today — no wrong answers, and you can add more later as your
        learning journey evolves.
      </p>

      <div className="atlas-q">
        {CATEGORIES.map((cat) => (
          <div key={cat.label} className="atlas-skill-group">
            <p className="atlas-section-label">
              <cat.icon size={13} className="atlas-section-label__icon" /> {cat.label}
            </p>
            <div className="atlas-pills">
              {cat.skills.map((s) => (
                <span key={s.name} style={{ display: "inline-flex", alignItems: "center" }}>
                  <button
                    className={`atlas-pill ${data.skills.includes(s.name) ? "atlas-pill--active" : ""}`}
                    onClick={() => toggleSkill(s.name)}
                  >
                    {s.name}
                  </button>
                  {s.tip && <InfoTooltip label={s.name}>{s.tip}</InfoTooltip>}
                </span>
              ))}
            </div>
          </div>
        ))}

        <AnimatePresence>
          {data.skills.length > 0 && (
            <motion.p
              className="atlas-counter"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle2 size={14} className="atlas-counter__icon" />
              {data.skills.length} skill{data.skills.length > 1 ? "s" : ""} selected — most people
              start with 2–4
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Proficiency reveal — only once at least one skill is picked */}
      <AnimatePresence>
        {data.skills.length > 0 && (
          <motion.div
            className="atlas-q"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <h2>Tell us about your proficiency</h2>
            <p className="atlas-q__hint">
              Be honest — this just calibrates your starting difficulty, not a test score.
            </p>
            {data.skills.slice(0, 4).map((s) => (
              <div className="atlas-prof" key={s}>
                <span className="atlas-prof__name">{s}</span>
                <div className="atlas-prof__opts">
                  {PROFICIENCY.map((p) => (
                    <button
                      key={p}
                      className={`atlas-box ${data.proficiency[s] === p ? "atlas-box--active" : ""}`}
                      onClick={() => setProf(s, p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <WhyWeAskThis>
        This prevents two bad experiences: content that's too basic (boring) or too advanced
        (overwhelming). We recalibrate as you progress.
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
