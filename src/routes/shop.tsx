import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, products } from "@/data/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductFilters, type Filters, defaultFilters, applyFilters } from "@/components/site/ProductFilters";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Furniture — PD Paulandium" },
      {
        name: "description",
        content:
          "Browse 43 made-to-order pieces across living, bedroom, dining, kitchen, wardrobe, office and custom furniture.",
      },
      { property: "og:title", content: "Shop All Furniture — PD Paulandium" },
      {
        property: "og:description",
        content: "Made-to-order furniture across every room, built in our own workshop.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const list = useMemo(() => applyFilters(products, filters), [filters]);

  return (
    <>
      <PageHeader
        eyebrow={`${products.length} pieces`}
        title="The full collection"
        description="Every piece is made to order. Filter by room, price and material to find your starting point."
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[260px_1fr]">
        <ProductFilters filters={filters} onChange={setFilters} categories={categories} />
        <div>
          <p className="mb-6 text-xs text-muted-foreground">
            Showing {list.length} of {products.length} products
          </p>
          {list.length === 0 ? (
            <p className="rounded-lg border border-border bg-card p-10 text-center text-sm text-muted-foreground">
              No products match these filters.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
