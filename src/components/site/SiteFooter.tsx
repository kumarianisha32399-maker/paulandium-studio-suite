import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { categories, services } from "@/data/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl">PD PAULANDIUM</p>
          <p className="eyebrow mt-1">The Furniture Studio</p>
          <p className="mt-5 max-w-xs text-sm text-primary-foreground/70">
            Furniture and interiors made to order, from our workshop to your home. Solid materials,
            honest joinery, finishes applied by hand.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-medium tracking-wide">Shop</p>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-accent">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-medium tracking-wide">Services</p>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to="/services" hash={s.slug} className="hover:text-accent">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-medium tracking-wide">Studio</p>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>PD Paulandium Studio, Industrial Area Phase II, New Delhi 110020</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href="tel:+919810000000" className="hover:text-accent">
                +91 98100 00000
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href="mailto:studio@pdpaulandium.com" className="hover:text-accent">
                studio@pdpaulandium.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-primary-foreground/55 sm:flex-row">
          <p>© {new Date().getFullYear()} PD Paulandium. All rights reserved.</p>
          <Link to="/admin" className="hover:text-accent">
            Studio Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
