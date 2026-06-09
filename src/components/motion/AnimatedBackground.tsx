import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

/**
 * Cinematic ambient background: animated gradient mesh, floating gradient
 * orbs and drifting particles. Fixed behind all content.
 */
export function AnimatedBackground({ particleCount = 26 }: { particleCount?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate on the client only to avoid SSR hydration mismatches.
    const arr: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
    }));
    setParticles(arr);
  }, [particleCount]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base mesh tint */}
      <div className="absolute inset-0 mesh-bg" />

      {/* Floating gradient orbs */}
      <div className="absolute -left-40 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-primary/15 blur-[120px] animate-float-slow" />
      <div className="absolute right-[-15%] top-[20%] h-[40rem] w-[40rem] rounded-full bg-[oklch(0.6_0.14_260_/_0.16)] blur-[140px] animate-float-slower" />
      <div className="absolute bottom-[-15%] left-[20%] h-[32rem] w-[32rem] rounded-full bg-[oklch(0.7_0.13_160_/_0.12)] blur-[130px] animate-float-slow" />

      {/* Drifting particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/60"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle vignette + grain feel */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_50%,oklch(0.12_0.012_270_/_0.7)_100%)]" />
    </div>
  );
}
