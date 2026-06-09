import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Facebook, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

const WA_LINK = "https://wa.me/212696423863";

export function CtaFooter() {
  return (
    <footer className="relative mt-20">
      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-6xl px-6 mb-16 scroll-mt-24">
        <Reveal className="mx-auto max-w-2xl text-center mb-12" direction="up">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Get in Touch</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">
            We&apos;re available <span className="text-gradient-gold">24/7</span>
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="tel:+212696423863"
            className="glass-strong group flex flex-col items-center gap-3 rounded-3xl p-8 text-center transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
              <Phone className="h-5 w-5 text-primary" />
            </span>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Call Us</p>
            <p className="font-display text-lg font-bold">+212 696 42 38 63</p>
            <p className="text-xs text-muted-foreground">Open 24/7</p>
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-strong group flex flex-col items-center gap-3 rounded-3xl p-8 text-center transition-transform duration-300 hover:-translate-y-1 border border-primary/20"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
              <MessageCircle className="h-5 w-5 text-primary" />
            </span>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</p>
            <p className="font-display text-lg font-bold">+212 696 42 38 63</p>
            <p className="text-xs text-muted-foreground">Instant reply</p>
          </a>
          <div className="glass-strong flex flex-col items-center gap-3 rounded-3xl p-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
              <MapPin className="h-5 w-5 text-primary" />
            </span>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Location</p>
            <p className="font-display text-lg font-bold">Mhamide, Marrakech</p>
            <p className="text-xs text-muted-foreground">40000, Morocco</p>
          </div>
        </div>

        {/* Google Maps embed */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-border/60">
          <iframe
            title="MOHA LUX CARS location"
            src="https://maps.google.com/maps?q=Mhamide+Marrakech+Morocco&output=embed"
            width="100%"
            height="300"
            loading="lazy"
            className="block"
            style={{ filter: "invert(0.9) hue-rotate(180deg) saturate(0.6)" }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] glass-strong px-8 py-16 text-center md:py-24">
            <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[oklch(0.6_0.14_260_/_0.2)] blur-[100px]" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-4xl font-extrabold md:text-6xl">
                Your Marrakech adventure <span className="text-gradient-gold">starts here</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
                Reserve in minutes via WhatsApp or our booking form. Airport delivery included.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton
                  as="div"
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-primary px-9 py-4 text-sm font-semibold text-primary-foreground shadow-gold"
                >
                  <Link to="/booking" className="flex items-center gap-2">
                    Reserve your car
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.25}
                  className="flex items-center gap-2 rounded-full glass px-9 py-4 text-sm font-semibold text-foreground"
                >
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Chat on WhatsApp
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <div className="mx-auto mt-20 max-w-7xl border-t border-border/60 px-6 py-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <span className="font-display text-lg font-bold uppercase tracking-[0.25em]">
              MOHA LUX<span className="text-gradient-gold"> CARS</span>
            </span>
            <p className="mt-4 text-sm text-muted-foreground">
              Premium car rental in Marrakech, Morocco. Airport delivery,
              24/7 service, handpicked fleet.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" />
              Open 24 hours · 7 days a week
            </div>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full glass transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Explore</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="/#fleet" className="hover:text-primary">Fleet</a></li>
                <li><a href="/#experience" className="hover:text-primary">Experience</a></li>
                <li><a href="/#reviews" className="hover:text-primary">Reviews</a></li>
                <li><Link to="/booking" className="hover:text-primary">Book now</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Fleet</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>Economy Cars</li>
                <li>Family SUVs</li>
                <li>Luxury Vehicles</li>
                <li>Airport Delivery</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" /> +212 696 42 38 63
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Mhamide, Marrakech 40000
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} MOHA LUX CARS. All rights reserved.</p>
          <p>Premium Car Rental · Marrakech, Morocco</p>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[9980] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </a>
    </footer>
  );
}
