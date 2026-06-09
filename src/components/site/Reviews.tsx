import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { Reveal, StaggerGroup, staggerItem } from "@/components/motion/Reveal";

const reviews = [
  {
    name: "Youssef Massi",
    role: "Google Review",
    text: "Moha Lux offers a very good rental car service. The booking process is simple and the cars are clean, well-maintained, and comfortable to drive. Customer service is friendly and responsive, always ready to help and answer questions quickly. Prices are fair compared to the quality of service provided.",
    rating: 5,
  },
  {
    name: "Ayoub El Hamzaoui",
    role: "Google Review",
    text: "Une agence sérieuse et fiable. J'ai loué plusieurs fois chez eux et je n'ai jamais été déçu. Les voitures sont bien entretenues et l'équipe est toujours disponible en cas de besoin.",
    rating: 5,
  },
  {
    name: "Daoud",
    role: "Google Review",
    text: "J'avais réservé une Dacia Lodgy 7 places mais ils m'ont offert une Dacia Jogger neuve et très propre à la place. Vraiment une belle surprise.",
    rating: 5,
  },
  {
    name: "Sonia",
    role: "Google Review",
    text: "Très satisfaite de ma location. Le véhicule était propre, en excellent état et parfaitement conforme à la description. Le service était rapide et professionnel avec une équipe accueillante et disponible.",
    rating: 5,
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <Reveal className="mx-auto max-w-2xl text-center" direction="up">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">94 Verified Reviews</span>
        <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">
          A reputation <span className="text-gradient-gold">built on trust</span>
        </h2>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-primary text-primary" />
            ))}
          </div>
          <span className="font-display text-xl font-bold text-gradient-gold">4.9</span>
          <span className="text-sm text-muted-foreground">/ 5 on Google</span>
        </div>
      </Reveal>

      <StaggerGroup className="mt-16 grid gap-5 md:grid-cols-2" stagger={0.1}>
        {reviews.map((r) => (
          <motion.div key={r.name} variants={staggerItem}>
            <div className="glass-strong group relative h-full overflow-hidden rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1">
              <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/15" />
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-5 text-lg leading-relaxed text-foreground/90">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft to-primary font-display text-sm font-bold text-primary-foreground">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}
