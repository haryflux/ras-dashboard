import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

// ---------------------------------------------------------------------------
// InfoTooltip.tsx — a small, keyboard-accessible info icon with a definition
// popover. Use it next to jargon like "HITRUST" or "Sampling".
// PLACE AT: src/components/onboarding/InfoTooltip.tsx
//
// Usage:
//   <InfoTooltip label="Sampling">
//     Selecting a representative subset of transactions to test, instead
//     of reviewing 100% of records.
//   </InfoTooltip>
// ---------------------------------------------------------------------------

export function InfoTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <span className="atlas-info" ref={ref}>
      <button
        type="button"
        className="atlas-info__btn"
        aria-label={`What does "${label}" mean?`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
      >
        <HelpCircle size={13} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            className="atlas-info__pop"
            role="tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
