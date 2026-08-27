import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { services } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Interior & Fit-Out Services — PD Paulandium" },
      {
        name: "description",
        content:
          "Furniture manufacturing, modular kitchens, POP work, painting, wooden flooring, blinds, civil and electrical work under one roof.",
      },
      { property: "og:title", content: "Interior & Fit-Out Services — PD Paulandium" },
      {
        property: "og:description",
        content: "Nine in-house services covering every stage of a home or office fit-out.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Everything a fit-out needs, under one roof"
        description="Nine in-house service lines, one project manager, one accountable team from drawing to handover."
      />

      <div className="mx-auto max-w-7xl space-y-20 px-5 py-16">
        {services.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            className="grid scroll-mt-28 items-center gap-10 md:grid-cols-2"
          >
            <img
              src={s.image}
              alt={s.name}
              loading="lazy"
              width={1024}
              height={768}
              className={`aspect-4/3 w-full rounded-lg object-cover ${i % 2 ? "md:order-2" : ""}`}
            />
            <div>
              <p className="eyebrow">Service {String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-4xl">{s.name}</h2>
              <div className="gold-rule mt-4" />
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-7">
                <Link to="/contact">Request a quote</Link>
              </Button>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
