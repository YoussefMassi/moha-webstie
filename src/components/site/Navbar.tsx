import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";

const links = [
  { label: "Fleet", href: "/#fleet" },
  { label: "Experience", href: "/#experience" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[9990] flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-glass" : "border border-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-base font-bold uppercase tracking-[0.25em] text-foreground">
            MOHA LUX<span className="text-gradient-gold"> CARS</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+212696423863"
            className="flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-foreground"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            +212 696 42 38 63
          </a>
          <MagneticButton className="rounded-full bg-gradient-to-r from-gold-soft to-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold">
            <Link to="/booking">Reserve now</Link>
          </MagneticButton>
        </div>

        <button
          aria-label="Open menu"
          className="text-foreground md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9995] flex flex-col bg-background/95 p-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-bold uppercase tracking-[0.25em]">
                MOHA LUX<span className="text-gradient-gold"> CARS</span>
              </span>
              <button aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-16 flex flex-col gap-2">
              {[...links, { label: "Book Now", href: "/booking" }].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="border-b border-border py-5 font-display text-3xl font-semibold"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <a
                href="tel:+212696423863"
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Phone className="h-4 w-4 text-primary" />
                +212 696 42 38 63 · Open 24/7
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
