import { createFileRoute } from "@tanstack/react-router";
import { AnimatedBackground } from "@/components/motion/AnimatedBackground";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { LoadingScreen } from "@/components/motion/LoadingScreen";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustMarquee } from "@/components/site/TrustMarquee";
import { Stats } from "@/components/site/Stats";
import { Fleet } from "@/components/site/Fleet";
import { Experience } from "@/components/site/Experience";
import { Reviews } from "@/components/site/Reviews";
import { CtaFooter } from "@/components/site/CtaFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOHA LUX CARS — Premium Car Rental in Marrakech" },
      {
        name: "description",
        content:
          "Rent Porsche, Range Rover, Mercedes and more across Morocco. Door-to-door delivery, full insurance and 24/7 concierge in Marrakech, Casablanca & beyond.",
      },
      { property: "og:title", content: "MOHA LUX CARS — Premium Car Rental in Marrakech" },
      {
        property: "og:description",
        content: "An effortless, cinematic luxury car rental experience across Morocco.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <TrustMarquee />
        <Stats />
        <Fleet />
        <Experience />
        <Reviews />
        <CtaFooter />
      </main>
    </div>
  );
}
