import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "motion/react";
import { ArrowRight, Star, ShieldCheck, Clock } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { MagneticButton } from "@/components/motion/MagneticButton";

const headline = ["Drive", "Marrakech", "in", "absolute", "luxury."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, oklch(0.82 0.11 85 / 0.18), transparent 55%)`;

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const waLink = `https://wa.me/212696423863?text=${encodeURIComponent("Bonjour MOHA LUX CARS, je souhaite réserver un véhicule.")}`;

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <img
          src={heroCar}
          alt="Luxury SUV on a Moroccan desert highway at dusk"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 bg-background/30" />
      </motion.div>

      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          4.9/5 · Marrakech&apos;s premier car rental
        </motion.div>

        <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-8xl">
          <span className="sr-only">Drive Marrakech in absolute luxury.</span>
          <span aria-hidden className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {headline.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.45 + i * 0.12,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={i === 4 ? "text-gradient-gold" : ""}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mx-auto mt-7 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          Premium car rental in Marrakech. Airport delivery, 24/7 service,
          and a handpicked fleet from economy to luxury — all at your fingertips.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton
            as="div"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold"
          >
            <Link to="/booking" className="flex items-center gap-2">
              Reserve your car
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
          <MagneticButton
            as="div"
            strength={0.25}
            className="rounded-full glass px-8 py-4 text-sm font-semibold text-foreground"
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: Star, label: "4.9/5 · 94 Reviews" },
            { icon: ShieldCheck, label: "Airport Delivery" },
            { icon: Clock, label: "Open 24/7" },
          ].map((b, i) => (
            <motion.div
              key={b.label}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-foreground"
            >
              <b.icon className="h-3.5 w-3.5 text-primary" />
              {b.label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1">
          <motion.span
            className="h-2 w-1 rounded-full bg-primary"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
