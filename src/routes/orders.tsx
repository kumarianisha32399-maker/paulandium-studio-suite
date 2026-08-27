import { createFileRoute, Link } from "@tanstack/react-router";
import { inr } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Your Orders — PD Paulandium" },
      { name: "description", content: "Track the production and delivery status of your orders." },
      { property: "og:title", content: "Your Orders — PD Paulandium" },
      { property: "og:description", content: "Track production and delivery status of your orders." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const { orders } = useShop();

  return (
    <>
      <PageHeader eyebrow="Account" title="Your orders" />
      <div className="mx-auto max-w-7xl space-y-5 px-5 py-14">
        {orders.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-14 text-center">
            <p className="text-sm text-muted-foreground">No orders yet.</p>
            <Button asChild variant="gold" className="mt-6">
              <Link to="/shop">Start shopping</Link>
            </Button>
          </div>
        ) : (
          orders.map((o) => (
            <article key={o.id} className="rounded-lg border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg">{o.id}</p>
                  <p className="text-xs text-muted-foreground">
                    Placed {new Date(o.createdAt).toLocaleDateString("en-IN")} · {o.customer.name}
                  </p>
                </div>
                <span className="rounded-sm bg-accent/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-accent">
                  {o.status}
                </span>
              </div>
              <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                {o.lines.map((l) => (
                  <li key={l.productId} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      {l.name} × {l.qty}
                    </span>
                    <span>{inr(l.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-right text-base font-medium">{inr(o.total)}</p>
            </article>
          ))
        )}
      </div>
    </>
  );
}
