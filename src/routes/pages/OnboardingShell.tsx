import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepTracker } from "../../components/onboarding/StepTracker";
import { LiveProfilePanel } from "../../components/onboarding/LiveProfilePanel";
import { ThemeToggle } from "../../components/onboarding/ThemeToggle";
import { Step1 } from "./onboarding-steps/Step1";
import { Step2 } from "./onboarding-steps/Step2";
import { Step3 } from "./onboarding-steps/Step3";
import { Step4 } from "./onboarding-steps/Step4";
import { Step5 } from "./onboarding-steps/Step5";
import "./onboarding.css";

// ---------------------------------------------------------------------------
// OnboardingShell.tsx — wraps all 5 onboarding steps.
// PLACE AT: src/routes/pages/OnboardingShell.tsx
//
// Holds ALL the wizard's form state in one place (the "single source of
// truth") and passes down only what each step needs. The LiveProfilePanel
// reads straight from this same state, which is what makes it update live
// as the user answers questions on the left.
//
// This file REPLACES your old Onboarding.tsx. In App.tsx, import
// { OnboardingShell } instead of { Onboarding } and use it on the
// "/onboarding" route.
// ---------------------------------------------------------------------------

const TOTAL_STEPS = 5;

export interface OnboardingData {
  role: string;
  serviceArea: string;
  experience: number; // manual entry, in years
  skills: string[];
  proficiency: Record<string, string>;
  goal: string;
  learningTypes: string[];
  time: string;
}

const initialData: OnboardingData = {
  role: "",
  serviceArea: "",
  experience: 0,
  skills: [],
  proficiency: {},
  goal: "",
  learningTypes: [],
  time: "",
};

export function OnboardingShell() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);

  const update = (patch: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...patch }));

  const next = () => (step < TOTAL_STEPS ? setStep(step + 1) : navigate("/associate/dashboard"));
  const back = () => (step > 1 ? setStep(step - 1) : navigate("/login"));

  return (
    <div className="atlas-root">
      <ThemeToggle />
      <div className="atlas-layout" style={{ maxWidth: 1040 }}>
        <div className="atlas-main">
          <StepTracker step={step} total={TOTAL_STEPS} />

          {step === 1 && <Step1 data={data} update={update} onNext={next} onBack={back} />}
          {step === 2 && <Step2 data={data} update={update} onNext={next} onBack={back} />}
          {step === 3 && <Step3 data={data} update={update} onNext={next} onBack={back} />}
          {step === 4 && <Step4 data={data} update={update} onNext={next} onBack={back} />}
          {step === 5 && <Step5 data={data} onNext={next} onBack={back} />}
        </div>

        <LiveProfilePanel
          role={data.role || undefined}
          experience={data.experience > 0 ? String(data.experience) : undefined}
          skills={data.skills.length > 0 ? data.skills : undefined}
          goalSummary={data.goal.trim().length > 12 ? data.goal.trim() : undefined}
          learningStyle={data.learningTypes.length > 0 ? data.learningTypes[0] : undefined}
        />
      </div>
    </div>
  );
}
