import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { inr } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const saved = wishlist.includes(product.id);

  return (
    <article className="group card-lift overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative overflow-hidden">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={768}
            className="img-zoom aspect-4/3 w-full object-cover"
          />
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-sm bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
            {product.badge}
          </span>
        )}
        <button
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => {
            toggleWishlist(product.id);
            toast.success(saved ? "Removed from wishlist" : "Saved to wishlist");
          }}
          className="absolute right-3 top-3 rounded-full bg-card/90 p-2 shadow-sm transition-colors hover:bg-card"
        >
          <Heart className={cn("size-4", saved && "fill-accent text-accent")} />
        </button>
      </div>

      <div className="space-y-3 p-5">
        <div>
          <Link to="/product/$id" params={{ id: product.id }}>
            <h3 className="font-display text-lg leading-snug hover:text-accent">{product.name}</h3>
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">
            {product.material} · {product.finish}
          </p>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-medium">{inr(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            addToCart(product.id);
            toast.success(`${product.name} added to cart`);
          }}
        >
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
