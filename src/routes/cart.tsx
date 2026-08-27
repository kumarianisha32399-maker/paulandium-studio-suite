import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { inr } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — PD Paulandium" },
      { name: "description", content: "Review the made-to-order pieces in your PD Paulandium cart." },
      { property: "og:title", content: "Your Cart — PD Paulandium" },
      { property: "og:description", content: "Review your selected furniture before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartDetailed, cartTotal, setQty, removeFromCart, clearCart } = useShop();
  const delivery = cartTotal > 0 && cartTotal < 50000 ? 2500 : 0;

  return (
    <>
      <PageHeader eyebrow="Checkout" title="Your cart" />
      <div className="mx-auto max-w-7xl px-5 py-14">
        {cartDetailed.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-14 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Button asChild variant="gold" className="mt-6">
              <Link to="/shop">Browse the collection</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              {cartDetailed.map((l) => (
                <div key={l.productId} className="flex gap-5 rounded-lg border border-border bg-card p-4">
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="size-28 shrink-0 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <Link to="/product/$id" params={{ id: l.productId }} className="text-lg hover:text-accent">
                        {l.name}
                      </Link>
                      <button onClick={() => removeFromCart(l.productId)} aria-label="Remove item">
                        <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-input">
                        <button className="p-2" onClick={() => setQty(l.productId, l.qty - 1)} aria-label="Decrease">
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm">{l.qty}</span>
                        <button className="p-2" onClick={() => setQty(l.productId, l.qty + 1)} aria-label="Increase">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-base">{inr(l.price * l.qty)}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={clearCart}>
                Clear cart
              </Button>
            </div>

            <aside className="h-max rounded-lg border border-border bg-card p-6">
              <h2 className="text-2xl">Summary</h2>
              <div className="gold-rule mt-3 mb-5" />
              <dl className="space-y-3 text-sm">
                <Line label="Subtotal" value={inr(cartTotal)} />
                <Line label="Delivery & installation" value={delivery === 0 ? "Free" : inr(delivery)} />
                <div className="border-t border-border pt-3">
                  <Line label="Total" value={inr(cartTotal + delivery)} bold />
                </div>
              </dl>
              <Button asChild variant="gold" size="lg" className="mt-6 w-full">
                <Link to="/checkout">Proceed to checkout</Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Made-to-order lead time: 4–6 weeks
              </p>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

function Line({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className={bold ? "font-medium" : "text-muted-foreground"}>{label}</dt>
      <dd className={bold ? "font-medium" : ""}>{value}</dd>
    </div>
  );
}
