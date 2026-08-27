import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { categories, inr, products, services } from "@/data/catalog";
import type { Enquiry, Order } from "@/lib/types";
import { useShop } from "@/store/shop";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Studio Admin — PD Paulandium" },
      {
        name: "description",
        content: "Internal studio console for catalogue, orders and consultation enquiries.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Studio Admin — PD Paulandium" },
      {
        property: "og:description",
        content: "Internal studio console for catalogue, orders and enquiries.",
      },
    ],
  }),
  component: AdminPage,
});

const orderStatuses: Order["status"][] = [
  "Placed",
  "In Production",
  "Dispatched",
  "Delivered",
  "Cancelled",
];

const enquiryStatuses: Enquiry["status"][] = ["New", "Contacted", "Closed"];

type Tab = "overview" | "catalogue" | "orders" | "enquiries";

function AdminPage() {
  const { admin, ready } = useShop();
  if (!ready) return <div className="min-h-[60vh]" />;
  return admin ? <AdminConsole /> : <AdminLogin />;
}

function AdminLogin() {
  const { login } = useShop();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <PageHeader eyebrow="Studio" title="Admin sign in" />
      <div className="mx-auto max-w-md px-5 py-16">
        <form
          className="space-y-5 rounded-lg border border-border bg-card p-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (login(user, pass)) {
              toast.success("Welcome back to the studio console");
              setError("");
            } else {
              setError("Those credentials don't match our records.");
            }
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="admin-user">Username</Label>
            <Input
              id="admin-user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-pass">Password</Label>
            <Input
              id="admin-pass"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" variant="gold" className="w-full">
            Sign in
          </Button>
          <p className="text-xs text-muted-foreground">
            Demo access — username <span className="text-foreground">admin</span>, password{" "}
            <span className="text-foreground">paulandium</span>.
          </p>
        </form>
      </div>
    </>
  );
}

function AdminConsole() {
  const { orders, enquiries, wishlist, logout, updateOrderStatus, updateEnquiryStatus } = useShop();
  const [tab, setTab] = useState<Tab>("overview");

  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((t, o) => t + o.total, 0);

  const stats = [
    { label: "Revenue", value: inr(revenue) },
    { label: "Orders", value: String(orders.length) },
    { label: "Open enquiries", value: String(enquiries.filter((e) => e.status !== "Closed").length) },
    { label: "Products live", value: String(products.length) },
    { label: "Categories", value: String(categories.length) },
    { label: "Services", value: String(services.length) },
    { label: "Wishlisted", value: String(wishlist.length) },
    {
      label: "In production",
      value: String(orders.filter((o) => o.status === "In Production").length),
    },
  ];

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "catalogue", label: "Catalogue" },
    { id: "orders", label: "Orders" },
    { id: "enquiries", label: "Enquiries" },
  ];

  return (
    <>
      <PageHeader eyebrow="Studio console" title="Admin dashboard" />
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-2" aria-label="Admin sections">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? "page" : undefined}
                className={`rounded-sm border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                  tab === t.id
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <Button
            variant="outline"
            onClick={() => {
              logout();
              toast.success("Signed out");
            }}
          >
            Sign out
          </Button>
        </div>

        {tab === "overview" && (
          <section className="mt-10 space-y-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-card p-6">
                  <p className="eyebrow">{s.label}</p>
                  <p className="mt-3 text-2xl">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg">Orders by status</h2>
              <ul className="mt-5 space-y-3">
                {orderStatuses.map((s) => {
                  const count = orders.filter((o) => o.status === s).length;
                  const pct = orders.length ? (count / orders.length) * 100 : 0;
                  return (
                    <li key={s} className="text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>{s}</span>
                        <span>{count}</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                        <div
                          className="h-1.5 rounded-full bg-accent transition-[width]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {tab === "catalogue" && (
          <section className="mt-10 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b border-border text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">MRP</th>
                  <th className="px-5 py-4">Rating</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-border/60 last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="h-11 w-11 rounded-sm object-cover"
                        />
                        <span>{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{p.category}</td>
                    <td className="px-5 py-4">{inr(p.price)}</td>
                    <td className="px-5 py-4 text-muted-foreground">{inr(p.mrp)}</td>
                    <td className="px-5 py-4">{p.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {tab === "orders" && (
          <section className="mt-10 space-y-4">
            {orders.length === 0 ? (
              <EmptyState message="No orders have been placed yet." />
            ) : (
              orders.map((o) => (
                <article key={o.id} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-lg">{o.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(o.createdAt).toLocaleDateString("en-IN")} · {o.customer.name} ·{" "}
                        {o.customer.phone}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {o.customer.address}, {o.customer.city} {o.customer.pincode}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base">{inr(o.total)}</span>
                      <label className="sr-only" htmlFor={`status-${o.id}`}>
                        Order status
                      </label>
                      <select
                        id={`status-${o.id}`}
                        value={o.status}
                        onChange={(e) => {
                          updateOrderStatus(o.id, e.target.value as Order["status"]);
                          toast.success(`${o.id} marked ${e.target.value}`);
                        }}
                        className="rounded-sm border border-border bg-background px-3 py-2 text-xs"
                      >
                        {orderStatuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
                    {o.lines.map((l) => (
                      <li key={l.productId}>
                        {l.name} × {l.qty} — {inr(l.price * l.qty)}
                      </li>
                    ))}
                  </ul>
                </article>
              ))
            )}
          </section>
        )}

        {tab === "enquiries" && (
          <section className="mt-10 space-y-4">
            {enquiries.length === 0 ? (
              <EmptyState message="No consultation enquiries yet." />
            ) : (
              enquiries.map((e) => (
                <article key={e.id} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-lg">{e.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {e.email} · {e.phone} ·{" "}
                        {new Date(e.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div>
                      <label className="sr-only" htmlFor={`enq-${e.id}`}>
                        Enquiry status
                      </label>
                      <select
                        id={`enq-${e.id}`}
                        value={e.status}
                        onChange={(ev) => {
                          updateEnquiryStatus(e.id, ev.target.value as Enquiry["status"]);
                          toast.success(`Enquiry marked ${ev.target.value}`);
                        }}
                        className="rounded-sm border border-border bg-background px-3 py-2 text-xs"
                      >
                        {enquiryStatuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
                    {e.message}
                  </p>
                </article>
              ))
            )}
          </section>
        )}
      </div>
    </>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-14 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
