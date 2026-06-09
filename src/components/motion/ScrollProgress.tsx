import { motion, useScroll, useSpring } from "motion/react";

/** Slim gold progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[9997] h-[3px] origin-left bg-gradient-to-r from-primary via-gold-soft to-primary"
      style={{ scaleX }}
    />
  );
}
