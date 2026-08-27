import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { inr } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — PD Paulandium" },
      { name: "description", content: "Confirm delivery details for your made-to-order furniture." },
      { property: "og:title", content: "Checkout — PD Paulandium" },
      { property: "og:description", content: "Confirm delivery details and place your order." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartDetailed, cartTotal, placeOrder } = useShop();
  const navigate = useNavigate();
  const delivery = cartTotal > 0 && cartTotal < 50000 ? 2500 : 0;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const order = placeOrder({
      name: String(f.get("name") ?? ""),
      email: String(f.get("email") ?? ""),
      phone: String(f.get("phone") ?? ""),
      address: String(f.get("address") ?? ""),
      city: String(f.get("city") ?? ""),
      pincode: String(f.get("pincode") ?? ""),
    });
    toast.success(`Order ${order.id} placed`);
    navigate({ to: "/orders" });
  }

  if (cartDetailed.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Checkout" title="Nothing to check out" />
        <div className="mx-auto max-w-7xl px-5 py-14">
          <Button asChild variant="gold">
            <Link to="/shop">Browse the collection</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Checkout" title="Delivery details" />
      <form onSubmit={onSubmit} className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_340px]">
        <div className="rounded-lg border border-border bg-card p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name" required />
            <Field id="phone" label="Phone" type="tel" required />
            <Field id="email" label="Email" type="email" required className="sm:col-span-2" />
            <Field id="address" label="Delivery address" required className="sm:col-span-2" />
            <Field id="city" label="City" required />
            <Field id="pincode" label="PIN code" required />
          </div>
          <div className="mt-8 rounded-md border border-border bg-muted/50 p-4 text-xs leading-relaxed text-muted-foreground">
            Payment is collected in two stages — a 40% advance to start production and the balance
            on installation. Our team will call to confirm the schedule.
          </div>
        </div>

        <aside className="h-max rounded-lg border border-border bg-card p-6">
          <h2 className="text-2xl">Order summary</h2>
          <div className="gold-rule mt-3 mb-5" />
          <ul className="space-y-3 text-sm">
            {cartDetailed.map((l) => (
              <li key={l.productId} className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  {l.name} × {l.qty}
                </span>
                <span>{inr(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery & installation</span>
              <span>{delivery === 0 ? "Free" : inr(delivery)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{inr(cartTotal + delivery)}</span>
            </div>
          </div>
          <Button type="submit" variant="gold" size="lg" className="mt-6 w-full">
            Place order
          </Button>
        </aside>
      </form>
    </>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  className,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} required={required} className="mt-2" />
    </div>
  );
}
