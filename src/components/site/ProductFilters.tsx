import type { Category, Product } from "@/lib/types";
import { inr } from "@/data/catalog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export interface Filters {
  q: string;
  categories: string[];
  max: number;
  sort: "featured" | "price-asc" | "price-desc" | "rating";
}

export const MAX_PRICE = 300000;

export const defaultFilters: Filters = { q: "", categories: [], max: MAX_PRICE, sort: "featured" };

export function applyFilters(products: Product[], f: Filters) {
  const q = f.q.trim().toLowerCase();
  const list = products.filter(
    (p) =>
      p.price <= f.max &&
      (f.categories.length === 0 || f.categories.includes(p.category)) &&
      (q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)),
  );
  switch (f.sort) {
    case "price-asc":
      return [...list].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...list].sort((a, b) => b.price - a.price);
    case "rating":
      return [...list].sort((a, b) => b.rating - a.rating);
    default:
      return list;
  }
}

export function ProductFilters({
  filters,
  onChange,
  categories,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  categories: Category[];
}) {
  const toggle = (slug: string) =>
    onChange({
      ...filters,
      categories: filters.categories.includes(slug)
        ? filters.categories.filter((c) => c !== slug)
        : [...filters.categories, slug],
    });

  return (
    <aside className="h-max space-y-7 rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
      <div>
        <label className="eyebrow" htmlFor="search">
          Search
        </label>
        <Input
          id="search"
          value={filters.q}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
          placeholder="Sofa, teak, wardrobe…"
          className="mt-2"
        />
      </div>

      <div>
        <p className="eyebrow">Room</p>
        <div className="mt-3 space-y-2">
          {categories.map((c) => (
            <label key={c.slug} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={filters.categories.includes(c.slug)}
                onChange={() => toggle(c.slug)}
                className="size-4 accent-[var(--accent)]"
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow">Max price</p>
        <Slider
          className="mt-4"
          min={10000}
          max={MAX_PRICE}
          step={5000}
          value={[filters.max]}
          onValueChange={([v]) => onChange({ ...filters, max: v })}
        />
        <p className="mt-2 text-xs text-muted-foreground">Up to {inr(filters.max)}</p>
      </div>

      <div>
        <label className="eyebrow" htmlFor="sort">
          Sort by
        </label>
        <select
          id="sort"
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as Filters["sort"] })}
          className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Highest rated</option>
        </select>
      </div>

      <Button variant="ghost" size="sm" className="w-full" onClick={() => onChange(defaultFilters)}>
        Reset filters
      </Button>
    </aside>
  );
}
