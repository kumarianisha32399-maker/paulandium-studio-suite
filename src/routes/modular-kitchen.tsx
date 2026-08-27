import { createFileRoute, Link } from "@tanstack/react-router";
import { kitchenLayouts, products } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/modular-kitchen")({
  head: () => ({
    meta: [
      { title: "Modular Kitchens — PD Paulandium" },
      {
        name: "description",
        content:
          "L-shaped, U-shaped, parallel, island and peninsula modular kitchens built with marine ply and premium soft-close hardware.",
      },
      { property: "og:title", content: "Modular Kitchens — PD Paulandium" },
      {
        property: "og:description",
        content: "Six kitchen layouts, built to measure with marine ply and soft-close hardware.",
      },
    ],
  }),
  component: KitchenPage,
});

const steps = [
  { n: "01", t: "Measure", d: "We survey the site, note services and confirm appliance sizes." },
  { n: "02", t: "Design", d: "Layout drawings and 3D views with a material and hardware palette." },
  { n: "03", t: "Build", d: "Carcasses and shutters fabricated in our workshop to the millimetre." },
  { n: "04", t: "Install", d: "Fitted, levelled and handed over with a hardware warranty pack." },
];

function KitchenPage() {
  const kitchenProducts = products.filter((p) => p.category === "modular-kitchen");

  return (
    <>
      <PageHeader
        eyebrow="Modular kitchen"
        title="A kitchen measured to your millimetre"
        description="Marine-ply carcasses, hand-selected shutters and hardware rated for a hundred thousand cycles."
      />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-3xl">Choose your layout</h2>
        <div className="gold-rule mt-4 mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kitchenLayouts.map((k) => (
            <article key={k.name} className="card-lift overflow-hidden rounded-lg border border-border bg-card">
              <img
                src={k.image}
                alt={`${k.name} modular kitchen`}
                loading="lazy"
                width={1024}
                height={683}
                className="aspect-3/2 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl">{k.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{k.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-display text-4xl text-accent">{s.n}</p>
              <p className="mt-2 text-lg">{s.t}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-3xl">Kitchen modules & packages</h2>
        <div className="gold-rule mt-4 mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kitchenProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Button asChild variant="gold" size="lg" className="mt-10">
          <Link to="/contact">Book a kitchen consultation</Link>
        </Button>
      </section>
    </>
  );
}
