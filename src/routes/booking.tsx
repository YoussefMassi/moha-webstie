import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AnimatedBackground } from "@/components/motion/AnimatedBackground";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Navbar } from "@/components/site/Navbar";
import { BookingFlow } from "@/components/site/BookingFlow";
import { CtaFooter } from "@/components/site/CtaFooter";

const searchSchema = z.object({
  car: z.string().optional(),
});

export const Route = createFileRoute("/booking")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Reserve Your Car — MOHA LUX CARS" },
      {
        name: "description",
        content:
          "Reserve a luxury car in Morocco in minutes. Pick your vehicle, dates and city — door-to-door delivery included.",
      },
      { property: "og:title", content: "Reserve Your Car — MOHA LUX CARS" },
      {
        property: "og:description",
        content: "Reserve a premium car in Marrakech in minutes with MOHA LUX CARS.",
      },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const { car } = Route.useSearch();
  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground particleCount={14} />
      <Navbar />
      <main>
        <div className="mx-auto max-w-5xl px-6 pt-28 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Reservation</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold md:text-6xl">
            Build your <span className="text-gradient-gold">perfect drive</span>
          </h1>
        </div>
        <BookingFlow initialCar={car} />
        <CtaFooter />
      </main>
    </div>
  );
}
