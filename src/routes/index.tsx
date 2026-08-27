import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Hammer, Ruler, ShieldCheck, Truck } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import bannerCraft from "@/assets/banners/banner-craft.jpg";
import aboutCraft from "@/assets/about/about-craft.jpg";
import { categories, products, services } from "@/data/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PD Paulandium — Handcrafted Furniture & Interiors" },
      {
        name: "description",
        content:
          "Made-to-order sofas, beds, wardrobes and modular kitchens, plus complete interior services. Designed and built in our own studio.",
      },
      { property: "og:title", content: "PD Paulandium — Handcrafted Furniture & Interiors" },
      {
        property: "og:description",
        content:
          "Made-to-order furniture and complete interior solutions, designed and built in our own studio.",
      },
    ],
  }),
  component: Home,
});

const promises = [
  { icon: Hammer, title: "Built in-house", copy: "Every piece is made in our own workshop, never outsourced." },
  { icon: Ruler, title: "Made to measure", copy: "Site measurement and drawings before a single cut is made." },
  { icon: ShieldCheck, title: "10-year warranty", copy: "On structure and joinery across all made-to-order work." },
  { icon: Truck, title: "White-glove delivery", copy: "Installed, levelled and cleaned by our own fitting team." },
];

function Home() {
  const bestsellers = products.filter((p) => p.badge === "Bestseller").slice(0, 4);
  const fresh = products.filter((p) => p.badge === "New" || p.badge === "Limited").slice(0, 4);

  return (
    <>
      <section className="relative isolate">
        <img
          src={heroHome}
          alt="Contemporary living room furnished by PD Paulandium"
          width={1600}
          height={900}
          className="h-[78vh] min-h-[520px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary/85 via-primary/55 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5">
            <div className="max-w-xl text-primary-foreground animate-fade-up">
              <p className="eyebrow">Est. 2004 · The Furniture Studio</p>
              <h1 className="mt-4 text-5xl leading-[1.05] md:text-6xl">
                Furniture worth keeping, interiors worth living in.
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-primary-foreground/80 md:text-base">
                PD Paulandium designs and builds furniture, modular kitchens and full interiors to
                order — solid materials, honest joinery, finishes applied by hand.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link to="/shop">Explore the Collection</Link>
                </Button>
                <Button asChild variant="onDark" size="lg">
                  <Link to="/contact">Book a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <div key={p.title} className="flex gap-4">
              <p.icon className="mt-0.5 size-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-medium">{p.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Section
        eyebrow="Browse"
        title="Shop by room"
        action={{ to: "/shop", label: "View all products" }}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group card-lift relative overflow-hidden rounded-lg"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                width={1024}
                height={768}
                className="img-zoom aspect-4/3 w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                <h3 className="text-2xl">{c.name}</h3>
                <p className="mt-1 text-xs text-primary-foreground/75">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Loved by our clients" title="Bestselling pieces">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <section className="relative isolate my-20">
        <img
          src={bannerCraft}
          alt="A craftsman sanding a walnut cabinet door"
          loading="lazy"
          width={1600}
          height={700}
          className="h-[420px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5">
            <div className="max-w-lg text-primary-foreground">
              <p className="eyebrow">Our workshop</p>
              <h2 className="mt-3 text-4xl">Two decades of joinery, one piece at a time</h2>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
                Timber is kiln-dried, joints are cut on our own machines, and every finish is
                hand-rubbed. Nothing leaves the floor until it has passed a full assembly check.
              </p>
              <Button asChild variant="hero" className="mt-7">
                <Link to="/about">Inside the studio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Beyond furniture" title="Complete interior services" action={{ to: "/services", label: "All services" }}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <Link
              key={s.slug}
              to="/services"
              hash={s.slug}
              className="card-lift overflow-hidden rounded-lg border border-border bg-card"
            >
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-16/10 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl">{s.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Just landed" title="New & limited pieces">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fresh.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid items-center gap-10 rounded-lg border border-border bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="eyebrow">Design consultation</p>
            <h2 className="mt-3 text-4xl">Tell us about your space</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Share your floor plan and we will come back with a layout, material palette and a
              transparent estimate — no obligation, no pressure.
            </p>
            <Button asChild variant="gold" size="lg" className="mt-7">
              <Link to="/contact">
                Start your project <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <img
            src={aboutCraft}
            alt="Detail of hand-finished joinery"
            loading="lazy"
            width={1024}
            height={768}
            className="aspect-4/3 w-full rounded-lg object-cover"
          />
        </div>
      </section>
    </>
  );
}

function Section({
  eyebrow,
  title,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  action?: { to: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 text-4xl">{title}</h2>
          <div className="gold-rule mt-4" />
        </div>
        {action && (
          <Link to={action.to} className="text-sm text-accent hover:underline">
            {action.label} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
