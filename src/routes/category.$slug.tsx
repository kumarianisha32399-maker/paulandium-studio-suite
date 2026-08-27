import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, getCategory, products } from "@/data/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHeader } from "@/components/site/PageHeader";
import {
  ProductFilters,
  applyFilters,
  defaultFilters,
  type Filters,
} from "@/components/site/ProductFilters";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — PD Paulandium" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const title = `${category.name} Furniture — PD Paulandium`;
    return {
      meta: [
        { title },
        { name: "description", content: category.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: category.blurb },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const list = useMemo(
    () => applyFilters(products.filter((p) => p.category === category.slug), filters),
    [category.slug, filters],
  );

  return (
    <>
      <PageHeader eyebrow="Collection" title={category.name} description={category.blurb} />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[260px_1fr]">
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          categories={categories.filter((c) => c.slug === category.slug)}
        />
        <div>
          <p className="mb-6 text-xs text-muted-foreground">{list.length} products</p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
