import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// ---------------------------------------------------------------------------
// LiveProfilePanel.tsx — the persistent side panel that builds up live as the
// user answers each onboarding step. This is the #1 ranked fix: it turns the
// flow from "answer questions -> get a result" into "watch something be built
// for me in real time".
// PLACE AT: src/components/onboarding/LiveProfilePanel.tsx
// ---------------------------------------------------------------------------

interface Props {
  role?: string;
  experience?: string;
  skills?: string[];
  goalSummary?: string;
  learningStyle?: string;
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export function LiveProfilePanel({ role, experience, skills, goalSummary, learningStyle }: Props) {
  const hasAnything = role || (skills && skills.length > 0) || goalSummary || learningStyle;

  return (
    <aside className="atlas-panel" aria-label="Your profile so far">
      <p className="atlas-panel__title">
        <Sparkles size={13} className="atlas-panel__sparkle" /> YOUR PROFILE IS BUILDING…
      </p>

      <AnimatePresence mode="popLayout">
        {!hasAnything && (
          <motion.p
            key="empty"
            className="atlas-panel__empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Answer the questions on the left and watch your profile take shape here.
          </motion.p>
        )}

        {role && (
          <motion.div key="role" className="atlas-panel__row" variants={rowVariants} initial="hidden" animate="show">
            <p className="atlas-panel__k">Role</p>
            <p className="atlas-panel__v">{role}{experience ? ` · ${experience} yrs experience` : ""}</p>
          </motion.div>
        )}

        {skills && skills.length > 0 && (
          <motion.div key="skills" className="atlas-panel__row" variants={rowVariants} initial="hidden" animate="show">
            <p className="atlas-panel__k">Skills</p>
            <div className="atlas-panel__chips">
              {skills.map((s, i) => (
                <motion.span
                  key={s}
                  className="atlas-panel__chip"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {learningStyle && (
          <motion.div key="style" className="atlas-panel__row" variants={rowVariants} initial="hidden" animate="show">
            <p className="atlas-panel__k">Learning style</p>
            <p className="atlas-panel__v">{learningStyle}</p>
          </motion.div>
        )}

        {goalSummary && (
          <motion.div key="goal" className="atlas-panel__row" variants={rowVariants} initial="hidden" animate="show">
            <p className="atlas-panel__k">Your goal</p>
            <p className="atlas-panel__goal">"{goalSummary}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
