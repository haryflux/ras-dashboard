import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ChevronDown } from "lucide-react";

// ---------------------------------------------------------------------------
// WhyWeAskThis.tsx — expandable "Why are we asking this?" block.
// PLACE AT: src/components/onboarding/WhyWeAskThis.tsx
//
// Usage:
//   <WhyWeAskThis>
//     Your role and service area tell us which audit skills matter most...
//   </WhyWeAskThis>
// ---------------------------------------------------------------------------

export function WhyWeAskThis({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="atlas-why">
      <button
        className="atlas-why__toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <Info size={14} className="atlas-why__icon" />
        <span>Why are we asking this?</span>
        <motion.span
          className="atlas-why__chevron"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="atlas-why__body">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
