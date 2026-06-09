const brands = [
  "Renault",
  "Dacia",
  "Volkswagen",
  "Peugeot",
  "Hyundai",
  "Kia",
  "Land Rover",
  "Porsche",
  "Audi",
  "Opel",
];

export function TrustMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-border/60 py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee gap-16">
        {[...brands, ...brands].map((b, i) => (
          <span
            key={b + i}
            className="font-display text-xl font-semibold uppercase tracking-[0.2em] text-muted-foreground/60"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
