import { Minus, Plus } from "lucide-react";

// ---------------------------------------------------------------------------
// ExperienceInput.tsx — manual numeric entry for years of experience,
// replacing the old fixed-bucket buttons (0-2 / 2-5 / 5-10 / 10+).
// A stepper (-/+) plus a direct number field, so an 8-year associate isn't
// forced into an awkward bucket.
// PLACE AT: src/components/onboarding/ExperienceInput.tsx
// ---------------------------------------------------------------------------

function levelLabel(years: number): string {
  if (years <= 0) return "Just starting out";
  if (years <= 2) return "Early career";
  if (years <= 5) return "Growing your expertise";
  if (years <= 10) return "Experienced";
  return "Highly experienced";
}

export function ExperienceInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const clamp = (v: number) => Math.max(0, Math.min(40, v));

  return (
    <div className="atlas-exp">
      <div className="atlas-exp__control">
        <button
          type="button"
          className="atlas-exp__btn"
          onClick={() => onChange(clamp(value - 1))}
          aria-label="Decrease years of experience"
        >
          <Minus size={16} />
        </button>

        <div className="atlas-exp__value-wrap">
          <input
            type="number"
            className="atlas-exp__input"
            value={value}
            min={0}
            max={40}
            onChange={(e) => onChange(clamp(Number(e.target.value) || 0))}
            aria-label="Years of professional experience"
          />
          <span className="atlas-exp__unit">{value === 1 ? "year" : "years"}</span>
        </div>

        <button
          type="button"
          className="atlas-exp__btn"
          onClick={() => onChange(clamp(value + 1))}
          aria-label="Increase years of experience"
        >
          <Plus size={16} />
        </button>
      </div>

      <p className="atlas-exp__label">{levelLabel(value)}</p>
    </div>
  );
}
