import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Star, Truck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { getCategory, getProduct, inr, products } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — PD Paulandium" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — PD Paulandium`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const [qty, setQty] = useState(1);
  const saved = wishlist.includes(product.id);
  const category = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-8 text-xs text-muted-foreground">
        <Link to="/shop" className="hover:text-accent">
          Shop
        </Link>
        {" / "}
        {category && (
          <Link to="/category/$slug" params={{ slug: category.slug }} className="hover:text-accent">
            {category.name}
          </Link>
        )}
        {" / "}
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-10 lg:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          width={1024}
          height={768}
          className="aspect-4/3 w-full rounded-lg object-cover"
        />

        <div>
          {product.badge && <p className="eyebrow">{product.badge}</p>}
          <h1 className="mt-2 text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 text-accent">
              <Star className="size-4 fill-accent" />
              {product.rating}
            </span>
            <span>· {product.reviews} reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl">{inr(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{inr(product.mrp)}</span>
            <span className="rounded-sm bg-success/10 px-2 py-0.5 text-xs text-success">
              Save {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
            </span>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <dl className="mt-7 grid grid-cols-2 gap-4 border-y border-border py-6 text-sm">
            <Spec label="Material" value={product.material} />
            <Spec label="Finish" value={product.finish} />
            <Spec label="Dimensions" value={product.dimensions} />
            <Spec label="Lead time" value="4–6 weeks, made to order" />
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border border-input">
              <button className="p-2.5" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button className="p-2.5" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              variant="gold"
              size="lg"
              onClick={() => {
                addToCart(product.id, qty);
                toast.success(`${product.name} added to cart`);
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                toggleWishlist(product.id);
                toast.success(saved ? "Removed from wishlist" : "Saved to wishlist");
              }}
            >
              <Heart className={cn("size-4", saved && "fill-accent text-accent")} />
              {saved ? "Saved" : "Wishlist"}
            </Button>
          </div>

          <div className="mt-8 space-y-3 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <Truck className="size-4 text-accent" /> Free white-glove delivery and installation.
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" /> 10-year warranty on structure and joinery.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16">
          <h2 className="text-3xl">You may also like</h2>
          <div className="gold-rule mt-4 mb-8" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
