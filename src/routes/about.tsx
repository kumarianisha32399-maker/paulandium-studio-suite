import { createFileRoute, Link } from "@tanstack/react-router";
import aboutShowroom from "@/assets/about/about-showroom.jpg";
import aboutCraft from "@/assets/about/about-craft.jpg";
import aboutDesign from "@/assets/about/about-design.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Studio — PD Paulandium" },
      {
        name: "description",
        content:
          "Two decades of furniture making and interior fit-outs. Meet the workshop, the process and the people behind PD Paulandium.",
      },
      { property: "og:title", content: "About the Studio — PD Paulandium" },
      {
        property: "og:description",
        content: "Two decades of furniture making and interior fit-outs, all under one roof.",
      },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { k: "20+", v: "Years in the trade" },
  { k: "1,800+", v: "Projects delivered" },
  { k: "43", v: "Catalogue pieces" },
  { k: "9", v: "In-house services" },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="A workshop first, a showroom second"
        description="PD Paulandium began as a two-bench joinery in 2004. The benches are still here — there are just a great many more of them."
      />

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2">
        <img
          src={aboutShowroom}
          alt="The PD Paulandium showroom floor"
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-4/3 w-full rounded-lg object-cover"
        />
        <div>
          <p className="eyebrow">The studio</p>
          <h2 className="mt-2 text-4xl">Built by the people who design it</h2>
          <div className="gold-rule mt-4" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Our designers walk the shop floor daily. A drawing that cannot be built cleanly never
            leaves the studio, and a finish that will not survive a decade of family life never
            reaches a client's home.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We buy timber by the log, kiln-dry it ourselves, and keep a moisture log for every
            batch that enters the workshop.
          </p>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.k}>
              <p className="font-display text-5xl text-accent">{s.k}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2">
        <div className="md:order-2">
          <p className="eyebrow">Craft</p>
          <h2 className="mt-2 text-4xl">Joinery you will never see</h2>
          <div className="gold-rule mt-4" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Mortise and tenon where it matters, dowelled and glued frames elsewhere, and hardware
            chosen for its cycle rating rather than its price. The parts nobody photographs are the
            parts that decide how long a piece lasts.
          </p>
        </div>
        <img
          src={aboutCraft}
          alt="Hand finishing a timber joint"
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-4/3 w-full rounded-lg object-cover"
        />
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 md:grid-cols-2">
        <img
          src={aboutDesign}
          alt="Design team reviewing interior drawings"
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-4/3 w-full rounded-lg object-cover"
        />
        <div>
          <p className="eyebrow">Design</p>
          <h2 className="mt-2 text-4xl">Your brief, drawn properly</h2>
          <div className="gold-rule mt-4" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Every project starts with a measured survey and ends with a drawing set you keep. In
            between, we agree a material palette, a schedule and a fixed price.
          </p>
          <Button asChild variant="gold" className="mt-7">
            <Link to="/contact">Talk to the studio</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
