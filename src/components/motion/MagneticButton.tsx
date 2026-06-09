import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "div";
  type?: "button" | "submit";
}

/**
 * Magnetic button: the element subtly follows the cursor while hovered,
 * with an inner glow that tracks the pointer.
 */
export function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.4,
  as = "button",
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = motion[as] as typeof motion.button;

  return (
    <Comp
      ref={ref as never}
      type={as === "button" ? type : undefined}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </Comp>
  );
}
