import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Luxury loading screen: brand mark draws in over an animated gold sweep,
 * then lifts away. Shows once per session on first mount.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("md_loaded")) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("md_loaded", "1");
      } catch {
        /* ignore */
      }
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 mesh-bg opacity-60" />
          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ letterSpacing: "0.6em", opacity: 0 }}
              animate={{ letterSpacing: "0.35em", opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-2xl font-bold uppercase shimmer-text md:text-4xl"
            >
              MOHA LUX CARS
            </motion.div>

            <div className="relative h-px w-56 overflow-hidden rounded-full bg-border">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <motion.span
              className="text-xs uppercase tracking-[0.4em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Luxury · Morocco
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
