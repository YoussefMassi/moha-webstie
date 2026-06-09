import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Luggage, Fuel, Settings2, CheckCircle, ChevronRight } from "lucide-react";
import { fleet, type Car } from "@/data/fleet";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

// ─── PHOTOS ───────────────────────────────────────────────────────────────────
// حط الصورة فـ src/assets/ بنفس الاسم ديال الـ id مثلاً: dacia-logan.png
// الكود كيحمل الصورة ديالها أوتوماتيك — ما كاينش حاجة تبدلها
// ─────────────────────────────────────────────────────────────────────────────

// Dynamic import map — Vite resolves these at build time
const imageModules = import.meta.glob<{ default: string }>(
  "/src/assets/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
);

function getCarImage(carId: string): string {
  // Try common extensions in order
  const exts = ["jpg", "jpeg", "png", "webp", "avif"];
  for (const ext of exts) {
    const key = `/src/assets/${carId}.${ext}`;
    if (imageModules[key]) return imageModules[key].default;
  }
  // Fallback Unsplash per car
  const fallbacks: Record<string, string> = {
    "renault-clio":      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    "dacia-logan":       "https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=800&q=80",
    "opel-corsa":        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
    "peugeot-208":       "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    "hyundai-i10":       "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    "kia-picanto":       "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    "dacia-duster":      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    "dacia-jogger":      "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&q=80",
    "vw-troc":           "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    "vw-golf":           "https://images.unsplash.com/photo-1471479917193-f00955256257?w=800&q=80",
    "range-rover-sport": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    "porsche-macan":     "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    "audi-a3":           "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80",
  };
  return fallbacks[carId] ?? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80";
}

const categories = ["All", "Economy", "City", "Family", "SUV", "Compact", "Luxury", "Luxury SUV"];

function buildWhatsApp(car: Car) {
  const msg = `🚗 MOHA LUX NEW BOOKING\n\n🚘 Car: ${car.brand} ${car.name}\n💰 Price: ${car.pricePerDay} MAD/day\n\nPlease confirm availability.`;
  return `https://wa.me/212696423863?text=${encodeURIComponent(msg)}`;
}

function CarCard({ car }: { car: Car }) {
  const [hovered, setHovered] = useState(false);
  const img = getCarImage(car.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-strong group relative flex flex-col overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-2"
      style={{
        boxShadow: hovered
          ? "0 30px 80px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)"
          : "0 10px 40px -10px rgba(0,0,0,0.4)",
      }}
    >
      {/* Tag */}
      {car.tag && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-gold-soft to-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-gold">
          {car.tag}
        </div>
      )}

      {/* Availability */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[10px] font-medium text-foreground">
        <CheckCircle className="h-3 w-3 text-emerald-400" />
        Available
      </div>

      {/* IMAGE — kbira */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={img}
          alt={`${car.brand} ${car.name}`}
          loading="lazy"
          className="h-full w-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      </div>

      {/* CONTENT — compact */}
      <div className="flex flex-col gap-2.5 p-3.5">

        {/* Name + Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{car.brand}</p>
            <h3 className="font-display text-base font-bold leading-tight">{car.name}</h3>
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-extrabold text-gradient-gold leading-none">
              {car.pricePerDay.toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground">MAD/day</p>
          </div>
        </div>

        {/* Specs — row inline compact */}
        <div className="flex flex-wrap gap-1.5">
          <Spec icon={Users} label={`${car.seats}P`} />
          <Spec icon={Luggage} label={`${car.luggage}B`} />
          <Spec icon={Settings2} label={car.transmission} />
          <Spec icon={Fuel} label={car.fuel} />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <MagneticButton
            as="a"
            href={buildWhatsApp(car)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-gold-soft to-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-gold"
          >
            Book Now
          </MagneticButton>
          <a
            href={`/booking?car=${car.id}`}
            className="flex items-center justify-center gap-1 rounded-xl glass px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:text-primary"
          >
            Details <ChevronRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Spec({ icon: Icon, label }: { icon: typeof Users; label: string }) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-secondary/20 px-2 py-1 text-[10px] text-muted-foreground">
      <Icon className="h-3 w-3 text-primary" />
      {label}
    </div>
  );
}

export function Fleet() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? fleet : fleet.filter((c) => c.category === active);

  return (
    <section id="fleet" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <Reveal className="mx-auto max-w-2xl text-center" direction="up">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">Our Fleet</span>
        <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">
          Choose your <span className="text-gradient-gold">perfect ride</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          From city cars to luxury SUVs — every vehicle is inspected, insured and delivered to you in Marrakech.
        </p>
      </Reveal>

      {/* Category Filter */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => {
          const count = cat === "All" ? fleet.length : fleet.filter((c) => c.category === cat).length;
          if (count === 0) return null;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-gradient-to-r from-gold-soft to-primary text-primary-foreground shadow-gold"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
              {cat !== "All" && <span className="ml-1.5 opacity-60">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA */}
      <Reveal className="mt-16 text-center" direction="up">
        <p className="text-muted-foreground">
          ما لقيتيش اللي بغيتي؟{" "}
          <a
            href="https://wa.me/212696423863"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-foreground"
          >
            كلمنا على WhatsApp
          </a>
        </p>
      </Reveal>
    </section>
  );
}
