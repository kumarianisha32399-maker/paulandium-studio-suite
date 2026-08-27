import { createFileRoute, Link } from "@tanstack/react-router";
import { interiorGallery, interiorCategoryImage } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/interior")({
  head: () => ({
    meta: [
      { title: "Interior Solutions & Project Gallery — PD Paulandium" },
      {
        name: "description",
        content:
          "Turnkey interiors for homes and offices: ceilings, panelling, flooring, lighting and bespoke joinery, delivered by one team.",
      },
      { property: "og:title", content: "Interior Solutions & Project Gallery — PD Paulandium" },
      {
        property: "og:description",
        content: "Turnkey interiors for homes and offices, delivered by one accountable team.",
      },
    ],
  }),
  component: InteriorPage,
});

function InteriorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interior solutions"
        title="Turnkey interiors, one accountable team"
        description="From false ceilings and panelling to flooring, lighting and the furniture that fills the room."
      />

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2">
        <img
          src={interiorCategoryImage}
          alt="Completed residential interior by PD Paulandium"
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-4/3 w-full rounded-lg object-cover"
        />
        <div>
          <p className="eyebrow">How we work</p>
          <h2 className="mt-2 text-4xl">One drawing set, one site team</h2>
          <div className="gold-rule mt-4" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Interiors go wrong at the handover points between trades. We keep civil, electrical,
            POP, painting, flooring and joinery inside one company, so the sequence is planned once
            and the responsibility never moves.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            You get a fixed scope, a dated schedule and weekly site photographs until the day we
            hand over the keys.
          </p>
          <Button asChild variant="gold" className="mt-7">
            <Link to="/contact">Plan your project</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <h2 className="text-3xl">Recent projects</h2>
        <div className="gold-rule mt-4 mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {interiorGallery.map((g) => (
            <figure key={g.title} className="group card-lift overflow-hidden rounded-lg border border-border bg-card">
              <img
                src={g.image}
                alt={g.title}
                loading="lazy"
                width={1024}
                height={683}
                className="img-zoom aspect-3/2 w-full object-cover"
              />
              <figcaption className="p-5 text-sm">{g.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
