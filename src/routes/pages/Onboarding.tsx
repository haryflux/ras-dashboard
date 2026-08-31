import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./onboarding.css";

// ---------------------------------------------------------------------------
// Onboarding.tsx  —  ATLAS-inspired 5-step profile-building wizard.
// PLACE AT: src/routes/pages/Onboarding.tsx
//
// Adapted to RAS content (Tech Assurance roles, SOC/HITRUST skills). All
// selections are held in local state; the final step shows an AI-style
// profile summary and routes into the dashboard. No backend needed.
// ---------------------------------------------------------------------------

const TOTAL = 5;

const TECH_SKILLS = ["SOC Walkthroughs", "Sampling", "Policy Testing", "HITRUST", "IT General Controls", "Documentation", "Risk Assessment", "Report Writing"];
const LEARNING_TYPES = ["Hands-on Exercises", "Full Courses", "Case Studies", "Interactive AI", "Reading Material/Blogs"];
const PROFICIENCY = ["Beginner", "Intermediate", "Advanced"];

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // --- collected answers ---
  const [role, setRole] = useState("");
  const [dept, setDept] = useState("");
  const [experience, setExperience] = useState("0-2 years");
  const [skills, setSkills] = useState<string[]>(["SOC Walkthroughs", "Sampling"]);
  const [prof, setProf] = useState<Record<string, string>>({});
  const [goal, setGoal] = useState("");
  const [types, setTypes] = useState<string[]>(["Hands-on Exercises", "Interactive AI"]);
  const [time, setTime] = useState("30-60 Min");

  const pct = (step / TOTAL) * 100;
  const wordCount = goal.trim() ? goal.trim().split(/\s+/).length : 0;

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const next = () => (step < TOTAL ? setStep(step + 1) : navigate("/associate/dashboard"));
  const back = () => (step > 1 ? setStep(step - 1) : navigate("/login"));

  return (
    <div className="atlas-root">
      <div className="atlas-wizard">
        <p className="atlas-step-label">Step {step} of {TOTAL}</p>
        <div className="atlas-track">
          <div className="atlas-track__bar" style={{ width: `${pct}%` }} />
        </div>

        {/* ---------- STEP 1: Role / dept / experience ---------- */}
        {step === 1 && (
          <>
            <div className="atlas-q">
              <h2>What best describes your current role?</h2>
              <p className="atlas-q__hint">This helps RAS Hub understand the context of your learning needs.</p>
              <select className="atlas-select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select your role</option>
                <option>Analyst</option>
                <option>Associate</option>
                <option>Senior Associate</option>
                <option>Assistant Manager</option>
                <option>Manager</option>
              </select>
            </div>

            <div className="atlas-q">
              <h2>Which service area do you work in?</h2>
              <p className="atlas-q__hint">This helps us tailor learning content to your work context.</p>
              <select className="atlas-select" value={dept} onChange={(e) => setDept(e.target.value)}>
                <option value="">Select your service area</option>
                <option>Technology Assurance (SOC / HITRUST / IT Audit)</option>
                <option>Internal Audit</option>
                <option>Regulatory Compliance</option>
                <option>Credit Risk Management</option>
              </select>
            </div>

            <div className="atlas-q">
              <h2>How much professional experience do you have?</h2>
              <p className="atlas-q__hint">Choose the option that best reflects your current experience.</p>
              <div className="atlas-boxes">
                {["0-2 years", "2-5 years", "5-10 years", "10+ years"].map((o) => (
                  <button key={o} className={`atlas-box ${experience === o ? "atlas-box--active" : ""}`} onClick={() => setExperience(o)}>{o}</button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ---------- STEP 2: Skills + proficiency ---------- */}
        {step === 2 && (
          <>
            <div className="atlas-q">
              <h2>What skills do you currently work with?</h2>
              <p className="atlas-q__hint">Select the skills you're familiar with. You can add more later as your learning journey evolves.</p>
              <div className="atlas-pills">
                {TECH_SKILLS.map((s) => (
                  <button key={s} className={`atlas-pill ${skills.includes(s) ? "atlas-pill--active" : ""}`} onClick={() => toggle(skills, setSkills, s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className="atlas-q">
              <h2>Tell us about your proficiency</h2>
              <p className="atlas-q__hint">How comfortable are you with the skills you selected?</p>
              {skills.slice(0, 4).map((s) => (
                <div className="atlas-prof" key={s}>
                  <span className="atlas-prof__name">{s}</span>
                  <div className="atlas-prof__opts">
                    {PROFICIENCY.map((p) => (
                      <button key={p} className={`atlas-box ${prof[s] === p ? "atlas-box--active" : ""}`} onClick={() => setProf({ ...prof, [s]: p })}>{p}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ---------- STEP 3: Goals ---------- */}
        {step === 3 && (
          <div className="atlas-q">
            <h2>What do you want to achieve?</h2>
            <p className="atlas-q__hint">Tell RAS Hub about your career and learning goals. The more context you provide, the better we can personalize your learning journey.</p>
            <div className="atlas-textarea-wrap">
              <p className="atlas-textarea-title">Tell us about your goals...</p>
              <textarea
                className="atlas-textarea"
                placeholder="What would you like to learn? Why is it important to you? What are you working toward?"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                maxLength={2400}
              />
              <div className="atlas-textarea__count">{wordCount} / 300 words</div>
            </div>
            <p className="atlas-foot-note">Your response will help RAS Hub personalize your learning path.</p>
          </div>
        )}

        {/* ---------- STEP 4: Learning preferences ---------- */}
        {step === 4 && (
          <>
            <div className="atlas-q">
              <h2>How do you prefer to learn?</h2>
              <p className="atlas-q__hint">Tell us how you like to spend your learning time, so RAS Hub can recommend experiences that fit naturally into your routine.</p>
              <p style={{ fontWeight: 700, margin: "6px 0 12px" }}>What types of learning do you enjoy?</p>
              <div className="atlas-pills">
                {LEARNING_TYPES.map((t) => (
                  <button key={t} className={`atlas-pill ${types.includes(t) ? "atlas-pill--active" : ""}`} onClick={() => toggle(types, setTypes, t)}>{t}</button>
                ))}
              </div>
            </div>

            <div className="atlas-q">
              <h2>How much time can you usually spend learning?</h2>
              <p className="atlas-q__hint">This helps RAS Hub recommend learning activities that fit your schedule.</p>
              <div className="atlas-boxes">
                {["Under 15 Min", "15-30 Min", "30-60 Min", "More than 1 Hour"].map((o) => (
                  <button key={o} className={`atlas-box ${time === o ? "atlas-box--active" : ""}`} onClick={() => setTime(o)}>{o}</button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ---------- STEP 5: AI profile summary ---------- */}
        {step === 5 && (
          <div className="atlas-q">
            <h2>Here's what we understand about you</h2>
            <p className="atlas-q__hint">Based on what you've shared, RAS Hub has created your initial learning profile.</p>
            <div className="atlas-summary">
              <p className="atlas-summary__label">YOUR LEARNING PROFILE</p>
              <p className="atlas-summary__ai">✦ AI-Generated</p>
              <div className="atlas-summary__grid">
                <div>
                  <p className="atlas-summary__k">Role</p>
                  <p className="atlas-summary__v">{role || "Analyst"}</p>
                </div>
                <div>
                  <p className="atlas-summary__k">Experience</p>
                  <p className="atlas-summary__v">{experience}</p>
                </div>
              </div>
              <p className="atlas-summary__k">Skills</p>
              <div className="atlas-summary__skills">
                {(skills.length ? skills.slice(0, 5) : ["SOC Walkthroughs"]).map((s) => (
                  <span key={s} className="atlas-box" style={{ cursor: "default" }}>{s}</span>
                ))}
              </div>
              <p className="atlas-summary__k">Your goal</p>
              <div className="atlas-goalbox">
                {goal.trim()
                  ? goal
                  : "You're looking to strengthen your Technology Assurance skills and build a more structured learning path toward your next career goal."}
                <small>Generated from your goals and responses.</small>
              </div>
            </div>
            <p className="atlas-foot-note">Something look off? You can go back and edit your responses.</p>
          </div>
        )}

        {/* ---------- Footer nav ---------- */}
        <div className="atlas-nav">
          <button className="atlas-link" onClick={back}>← Back</button>
          <button className="atlas-link atlas-link--next" onClick={next}>
            {step === TOTAL ? "Start Learning" : "Continue"} →
          </button>
        </div>
      </div>
    </div>
  );
}
