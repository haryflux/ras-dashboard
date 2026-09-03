import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { WhyWeAskThis } from "../../../components/onboarding/WhyWeAskThis";
import { ExperienceInput } from "../../../components/onboarding/ExperienceInput";
import type { OnboardingData } from "../OnboardingShell";

// ---------------------------------------------------------------------------
// Step1.tsx — "Let's get to know you"
// PLACE AT: src/routes/pages/onboarding-steps/Step1.tsx
//
// Covers: role, service area, and a manually-entered years-of-experience
// field (replacing the old fixed 0-2/2-5/5-10/10+ buckets).
// ---------------------------------------------------------------------------

interface StepProps {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export function Step1({ data, update, onNext, onBack }: StepProps) {
  const canContinue = data.role !== "" && data.serviceArea !== "";

  return (
    <div>
      <motion.p className="atlas-step-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Step 1 of 5 · Getting to know you
      </motion.p>

      <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp}>
        <h1 className="atlas-page-h1">Let's get to know you</h1>
        <p className="atlas-page-sub">
          Answer 3 quick questions so RAS Hub can start shaping a learning path around your
          actual job — not a generic course list.
        </p>
      </motion.div>

      {/* Role */}
      <motion.div className="atlas-q" custom={1} initial="hidden" animate="show" variants={fadeUp}>
        <h2>
          <Briefcase size={18} className="atlas-q-icon" /> What's your current role?
        </h2>
        <p className="atlas-q__hint">Pick the closest match — this shapes the difficulty and focus of what we recommend.</p>
        <select
          className="atlas-select"
          value={data.role}
          onChange={(e) => update({ role: e.target.value })}
        >
          <option value="">Select your role — e.g. Analyst, Senior Associate, Manager</option>
          <option>Analyst</option>
          <option>Associate</option>
          <option>Senior Associate</option>
          <option>Assistant Manager</option>
          <option>Manager</option>
        </select>
      </motion.div>

      {/* Service area */}
      <motion.div className="atlas-q" custom={2} initial="hidden" animate="show" variants={fadeUp}>
        <h2>
          <MapPin size={18} className="atlas-q-icon" /> Which service area do you work in?
        </h2>
        <p className="atlas-q__hint">
          Different service lines need different skills — this keeps your content relevant. Not
          sure? Pick the closest match — you can refine this anytime in Settings.
        </p>
        <select
          className="atlas-select"
          value={data.serviceArea}
          onChange={(e) => update({ serviceArea: e.target.value })}
        >
          <option value="">Select your service area</option>
          <option>Technology Assurance (SOC / HITRUST / IT Audit)</option>
          <option>Internal Audit</option>
          <option>Regulatory Compliance</option>
          <option>Credit Risk Management</option>
        </select>
      </motion.div>

      {/* Experience — manual entry */}
      <motion.div className="atlas-q" custom={3} initial="hidden" animate="show" variants={fadeUp}>
        <h2>How much professional experience do you have?</h2>
        <p className="atlas-q__hint">No wrong answer here — this just sets your starting difficulty.</p>
        <ExperienceInput
          value={data.experience}
          onChange={(v) => update({ experience: v })}
        />
      </motion.div>

      <motion.div custom={4} initial="hidden" animate="show" variants={fadeUp}>
        <WhyWeAskThis>
          Your role and service area let our AI recommend the right starting skills instead of a
          generic course catalog. Nothing here is locked — you can update it anytime.
        </WhyWeAskThis>
      </motion.div>

      <div className="atlas-nav">
        <button className="atlas-link" onClick={onBack}>← Back</button>
        <button className="atlas-cta" onClick={onNext} disabled={!canContinue}>
          Continue <span className="atlas-cta__arrow">→</span>
        </button>
      </div>
    </div>
  );
}
