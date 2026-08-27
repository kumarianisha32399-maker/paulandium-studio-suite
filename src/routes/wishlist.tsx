import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — PD Paulandium" },
      { name: "description", content: "The PD Paulandium pieces you have saved for later." },
      { property: "og:title", content: "Your Wishlist — PD Paulandium" },
      { property: "og:description", content: "The furniture you have saved for later." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = wishlist.flatMap((id) => {
    const p = getProduct(id);
    return p ? [p] : [];
  });

  return (
    <>
      <PageHeader eyebrow="Saved" title="Your wishlist" />
      <div className="mx-auto max-w-7xl px-5 py-14">
        {items.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-14 text-center">
            <p className="text-sm text-muted-foreground">You have not saved any pieces yet.</p>
            <Button asChild variant="gold" className="mt-6">
              <Link to="/shop">Browse the collection</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
