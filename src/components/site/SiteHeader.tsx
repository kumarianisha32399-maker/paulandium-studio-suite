import { Link } from "@tanstack/react-router";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/store/shop";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/services", label: "Services" },
  { to: "/modular-kitchen", label: "Modular Kitchen" },
  { to: "/interior", label: "Interior" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { cartCount, wishlist } = useShop();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-tight">PD PAULANDIUM</span>
          <span className="eyebrow mt-1">The Furniture Studio</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-foreground/75 transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/wishlist" aria-label="Wishlist" className="relative rounded-md p-2 hover:bg-muted">
            <Heart className="size-5" />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative rounded-md p-2 hover:bg-muted">
            <ShoppingBag className="size-5" />
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </Link>
          <Button asChild variant="gold" size="sm" className="ml-2 hidden sm:inline-flex">
            <Link to="/contact">Book a Consultation</Link>
          </Button>
          <button
            className="ml-1 rounded-md p-2 hover:bg-muted lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-5 py-4 lg:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-foreground/80"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
      {children}
    </span>
  );
}
