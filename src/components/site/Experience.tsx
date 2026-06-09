import { motion } from "motion/react";
import { Plane, Clock, Star, ShieldCheck, MapPin, Zap } from "lucide-react";
import { Reveal, StaggerGroup, staggerItem } from "@/components/motion/Reveal";

const features = [
  {
    icon: Plane,
    title: "Airport Delivery",
    desc: "Your car will be waiting at Marrakech Menara Airport (RAK) when you land — no queues, no stress.",
  },
  {
    icon: Clock,
    title: "Open 24/7",
    desc: "Early morning flight or late night arrival? We're always available to assist you.",
  },
  {
    icon: Star,
    title: "4.9/5 Google Rating",
    desc: "94 verified reviews from real customers. We're proud of every single one.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured Fleet",
    desc: "Every vehicle comes with full insurance coverage. Drive with complete peace of mind.",
  },
  {
    icon: MapPin,
    title: "Hotel Delivery",
    desc: "We deliver directly to your riad, hotel or villa anywhere in Marrakech.",
  },
  {
    icon: Zap,
    title: "Instant WhatsApp Booking",
    desc: "Book in minutes via WhatsApp. We confirm availability and details instantly.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <Reveal className="mx-auto max-w-2xl text-center" direction="up">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">Why Choose Us</span>
        <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">
          The MOHA LUX <span className="text-gradient-gold">experience</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          More than a car rental — a premium mobility service built around your comfort.
        </p>
      </Reveal>

      <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {features.map((f, i) => (
          <motion.div key={f.title} variants={staggerItem}>
            <div className="glass group relative h-full overflow-hidden rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
                <f.icon className="h-5 w-5 text-primary" />
              </span>
              <h3 className="relative mt-5 font-display text-lg font-bold">{f.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}
