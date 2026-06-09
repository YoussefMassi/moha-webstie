import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  MapPin,
  User,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { fleet } from "@/data/fleet";
import { MagneticButton } from "@/components/motion/MagneticButton";

const imageModules = import.meta.glob<{ default: string }>(
  "/src/assets/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
);

function getCarImage(carId: string): string {
  const exts = ["jpg", "jpeg", "png", "webp", "avif"];
  for (const ext of exts) {
    const key = `/src/assets/${carId}.${ext}`;
    if (imageModules[key]) return imageModules[key].default;
  }
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

const pickupLocations = [
  "Marrakech Airport (RAK)",
  "Hotel Delivery – Medina",
  "Hotel Delivery – Hivernage",
  "City Center – Gueliz",
  "Mhamide (Agency)",
  "Custom Location",
];

const steps = ["Vehicle", "Schedule", "Location", "Details", "Confirm"];

interface BookingState {
  carId: string;
  start: string;
  startTime: string;
  end: string;
  endTime: string;
  pickup: string;
  customLocation: string;
  name: string;
  phone: string;
  country: string;
  email: string;
}

const COUNTRIES = [
  "Morocco", "France", "United Kingdom", "Germany", "Spain", "Italy",
  "Netherlands", "Belgium", "United States", "Saudi Arabia", "UAE",
  "Algeria", "Tunisia", "Other",
];

function buildWhatsApp(data: BookingState, days: number, total: number) {
  const car = fleet.find((c) => c.id === data.carId);
  const location = data.pickup === "Custom Location" ? data.customLocation : data.pickup;
  const msg = [
    "🚗 *MOHA LUX NEW BOOKING*",
    "",
    `👤 Name: ${data.name}`,
    `📞 Phone: ${data.phone}`,
    `🌍 Country: ${data.country}`,
    data.email ? `📧 Email: ${data.email}` : null,
    "",
    `🚘 Car: ${car?.brand} ${car?.name}`,
    "",
    `📅 Pickup:`,
    `${data.start} at ${data.startTime || "09:00"}`,
    "",
    `📅 Return:`,
    `${data.end} at ${data.endTime || "09:00"}`,
    "",
    `📍 Location: ${location}`,
    "",
    `⏱ Duration: ${days} day${days > 1 ? "s" : ""}`,
    `💰 Estimated Price: ${total.toLocaleString()} MAD`,
    "",
    "Please confirm availability.",
  ]
    .filter((l) => l !== null)
    .join("\n");
  return `https://wa.me/212696423863?text=${encodeURIComponent(msg)}`;
}

export function BookingFlow({ initialCar }: { initialCar?: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingState>({
    carId: initialCar && fleet.some((c) => c.id === initialCar) ? initialCar : fleet[0].id,
    start: "",
    startTime: "09:00",
    end: "",
    endTime: "09:00",
    pickup: pickupLocations[0],
    customLocation: "",
    name: "",
    phone: "",
    country: "Morocco",
    email: "",
  });

  const car = fleet.find((c) => c.id === data.carId)!;
  const carImg = getCarImage(data.carId);

  const days = useMemo(() => {
    if (!data.start || !data.end) return 0;
    const s = new Date(data.start).getTime();
    const e = new Date(data.end).getTime();
    if (e <= s) return 0;
    return Math.round((e - s) / 86400000);
  }, [data.start, data.end]);

  const total = days * car.pricePerDay;

  const set = (patch: Partial<BookingState>) => setData((d) => ({ ...d, ...patch }));

  const canNext =
    step === 0 ? !!data.carId
    : step === 1 ? days > 0
    : step === 2 ? !!data.pickup && (data.pickup !== "Custom Location" || !!data.customLocation.trim())
    : step === 3 ? data.name.trim().length > 1 && data.phone.length >= 6
    : true;

  const waLink = buildWhatsApp(data, days, total);

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      {/* Progress */}
      <div className="mx-auto mb-12 max-w-3xl">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{
                    backgroundColor: i <= step ? "oklch(0.82 0.11 85)" : "oklch(0.26 0.016 270)",
                    color: i <= step ? "oklch(0.18 0.02 270)" : "oklch(0.68 0.012 270)",
                    scale: i === step ? 1.1 : 1,
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </motion.div>
                <span className={`hidden text-[11px] uppercase tracking-wider sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-2 h-px flex-1 overflow-hidden bg-border">
                  <motion.div
                    className="h-full bg-primary"
                    initial={false}
                    animate={{ width: i < step ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Step panel */}
        <div className="glass-strong min-h-[420px] rounded-3xl p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" {...stepAnim}>
                <StepHeading icon={Sparkles} title="Choose your car" />
                <div className="grid gap-3 sm:grid-cols-2">
                  {fleet.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => set({ carId: c.id })}
                      className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                        data.carId === c.id
                          ? "border-primary bg-primary/10 shadow-gold"
                          : "border-border bg-secondary/30 hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={getCarImage(c.id)}
                        alt={`${c.brand} ${c.name}`}
                        loading="lazy"
                        className="h-16 w-20 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-display text-sm font-bold">{c.brand} {c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.category}</p>
                        <p className="mt-1 text-sm font-semibold text-gradient-gold">
                          {c.pricePerDay.toLocaleString()} MAD/day
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" {...stepAnim} className="space-y-6">
                <StepHeading icon={CalendarDays} title="Pick your dates" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Pickup date" icon={CalendarDays}>
                    <input type="date" value={data.start} onChange={(e) => set({ start: e.target.value })}
                      className="w-full bg-transparent text-foreground outline-none [color-scheme:dark]" />
                  </Field>
                  <Field label="Pickup time" icon={CalendarDays}>
                    <input type="time" value={data.startTime} onChange={(e) => set({ startTime: e.target.value })}
                      className="w-full bg-transparent text-foreground outline-none [color-scheme:dark]" />
                  </Field>
                  <Field label="Return date" icon={CalendarDays}>
                    <input type="date" value={data.end} onChange={(e) => set({ end: e.target.value })}
                      className="w-full bg-transparent text-foreground outline-none [color-scheme:dark]" />
                  </Field>
                  <Field label="Return time" icon={CalendarDays}>
                    <input type="time" value={data.endTime} onChange={(e) => set({ endTime: e.target.value })}
                      className="w-full bg-transparent text-foreground outline-none [color-scheme:dark]" />
                  </Field>
                </div>
                {days > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-primary/10 p-4 text-sm">
                    <span className="text-muted-foreground">{days} day{days > 1 ? "s" : ""} · </span>
                    <span className="font-bold text-primary">{(days * car.pricePerDay).toLocaleString()} MAD estimated</span>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" {...stepAnim} className="space-y-4">
                <StepHeading icon={MapPin} title="Pickup location" />
                <div className="grid gap-3">
                  {pickupLocations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => set({ pickup: loc })}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-sm transition-all ${
                        data.pickup === loc
                          ? "border-primary bg-primary/10 shadow-gold"
                          : "border-border bg-secondary/30 hover:border-primary/50"
                      }`}
                    >
                      <MapPin className={`h-4 w-4 shrink-0 ${data.pickup === loc ? "text-primary" : "text-muted-foreground"}`} />
                      {loc}
                    </button>
                  ))}
                </div>
                {data.pickup === "Custom Location" && (
                  <Field label="Custom address" icon={MapPin}>
                    <input
                      value={data.customLocation}
                      onChange={(e) => set({ customLocation: e.target.value })}
                      placeholder="Enter your address or hotel name"
                      className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/60"
                    />
                  </Field>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" {...stepAnim} className="space-y-4">
                <StepHeading icon={User} title="Your details" />
                <Field label="Full name *" icon={User}>
                  <input value={data.name} onChange={(e) => set({ name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/60" />
                </Field>
                <Field label="Phone number *" icon={User}>
                  <input value={data.phone} onChange={(e) => set({ phone: e.target.value })}
                    placeholder="+212 ..."
                    className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/60" />
                </Field>
                <Field label="Country" icon={User}>
                  <select value={data.country} onChange={(e) => set({ country: e.target.value })}
                    className="w-full bg-transparent text-foreground outline-none">
                    {COUNTRIES.map((c) => <option key={c} value={c} className="bg-card">{c}</option>)}
                  </select>
                </Field>
                <Field label="Email (optional)" icon={User}>
                  <input type="email" value={data.email} onChange={(e) => set({ email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/60" />
                </Field>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" {...stepAnim} className="space-y-5">
                <StepHeading icon={Check} title="Booking summary" />
                <div className="space-y-3 rounded-2xl border border-border/60 p-5 text-sm">
                  <Row label="Vehicle" value={`${car.brand} ${car.name}`} />
                  <Row label="Pickup" value={`${data.start} at ${data.startTime}`} />
                  <Row label="Return" value={`${data.end} at ${data.endTime}`} />
                  <Row label="Location" value={data.pickup === "Custom Location" ? data.customLocation : data.pickup} />
                  <Row label="Duration" value={`${days} day${days > 1 ? "s" : ""}`} />
                  <Row label="Name" value={data.name} />
                  <Row label="Phone" value={data.phone} />
                  <div className="border-t border-border/60 pt-3">
                    <Row label="Estimated Total" value={`${total.toLocaleString()} MAD`} gold />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Clicking &ldquo;Send via WhatsApp&rdquo; will open WhatsApp with your booking details pre-filled.
                  MOHA LUX CARS will confirm availability and finalize pricing.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary sidebar */}
        <aside className="glass sticky top-28 h-fit rounded-3xl p-6">
          <img src={carImg} alt={`${car.brand} ${car.name}`} loading="lazy"
            className="mb-4 aspect-[4/3] w-full rounded-2xl object-cover" />
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{car.brand}</p>
          <h4 className="font-display text-xl font-bold">{car.name}</h4>
          <p className="mt-1 text-xs text-muted-foreground">{car.category} · {car.transmission} · {car.fuel}</p>

          <div className="mt-5 space-y-2 border-t border-border/60 pt-4 text-sm">
            <Row label="Daily rate" value={`${car.pricePerDay.toLocaleString()} MAD`} />
            <Row label="Days" value={days ? String(days) : "—"} />
            <Row label="Delivery" value="Free" />
          </div>
          <div className="mt-4 flex items-end justify-between border-t border-border/60 pt-4">
            <span className="text-sm text-muted-foreground">Estimated Total</span>
            <motion.span key={total} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="font-display text-2xl font-extrabold text-gradient-gold">
              {total > 0 ? `${total.toLocaleString()} MAD` : "—"}
            </motion.span>
          </div>

          <a href="tel:+212696423863"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl glass py-3 text-xs font-medium text-muted-foreground hover:text-foreground">
            📞 +212 696 42 38 63
          </a>
        </aside>
      </div>

      {/* Navigation */}
      <div className="mx-auto mt-8 flex max-w-5xl items-center justify-between">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
          className="flex items-center gap-1 rounded-full px-5 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-0">
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        {step < 4 ? (
          <MagneticButton
            as="div"
            className={`flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity ${
              canNext
                ? "bg-gradient-to-r from-gold-soft to-primary text-primary-foreground shadow-gold"
                : "pointer-events-none bg-secondary text-muted-foreground opacity-50"
            }`}
          >
            <button type="button" disabled={!canNext} onClick={() => setStep((s) => Math.min(4, s + 1))}
              className="flex items-center gap-2">
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          </MagneticButton>
        ) : (
          <MagneticButton
            as="a"
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)]"
          >
            <MessageCircle className="h-4 w-4" />
            Send via WhatsApp
          </MagneticButton>
        )}
      </div>
    </div>
  );
}

const stepAnim = {
  initial: { opacity: 0, x: 30, filter: "blur(8px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -30, filter: "blur(8px)" },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

function StepHeading({ icon: Icon, title }: { icon: typeof User; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
        <Icon className="h-4 w-4 text-primary" />
      </span>
      <h3 className="font-display text-xl font-bold">{title}</h3>
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: typeof User; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2 rounded-2xl border border-border bg-secondary/30 px-4 py-3 transition-colors focus-within:border-primary">
        <Icon className="h-4 w-4 shrink-0 text-primary" />
        {children}
      </span>
    </label>
  );
}

function Row({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${gold ? "text-gradient-gold font-bold" : ""}`}>{value}</span>
    </div>
  );
}
