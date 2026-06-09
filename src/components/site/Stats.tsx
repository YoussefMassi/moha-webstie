import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";

const stats = [
  { to: 94, suffix: "+", label: "Verified Reviews" },
  { to: 4.9, decimals: 1, label: "Google Rating" },
  { to: 13, label: "Cars in Fleet" },
  { to: 24, suffix: "/7", label: "Available" },
];

export function Stats() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} direction="up">
            <div className="glass flex flex-col items-center rounded-3xl px-4 py-8 text-center transition-transform duration-500 hover:-translate-y-1">
              <span className="font-display text-4xl font-extrabold text-gradient-gold md:text-5xl">
                <Counter to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
              </span>
              <span className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
