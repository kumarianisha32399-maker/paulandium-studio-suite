import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Enquiry, Order } from "@/lib/types";
import { getProduct } from "@/data/catalog";

const KEY = "pdp_store_v1";

interface State {
  cart: CartLine[];
  wishlist: string[];
  orders: Order[];
  enquiries: Enquiry[];
  admin: boolean;
}

const empty: State = { cart: [], wishlist: [], orders: [], enquiries: [], admin: false };

interface ShopValue extends State {
  ready: boolean;
  addToCart: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  cartCount: number;
  cartTotal: number;
  cartDetailed: { productId: string; name: string; price: number; qty: number; image: string }[];
  placeOrder: (customer: Order["customer"]) => Order;
  addEnquiry: (e: Omit<Enquiry, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  updateEnquiryStatus: (id: string, status: Enquiry["status"]) => void;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

const ShopContext = createContext<ShopValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...empty, ...JSON.parse(raw) });
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const addToCart = useCallback((productId: string, qty = 1) => {
    setState((s) => {
      const found = s.cart.find((l) => l.productId === productId);
      return {
        ...s,
        cart: found
          ? s.cart.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l))
          : [...s.cart, { productId, qty }],
      };
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setState((s) => ({
      ...s,
      cart: qty <= 0 ? s.cart.filter((l) => l.productId !== productId) : s.cart.map((l) => (l.productId === productId ? { ...l, qty } : l)),
    }));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((l) => l.productId !== productId) }));
  }, []);

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [] })), []);

  const toggleWishlist = useCallback((productId: string) => {
    setState((s) => ({
      ...s,
      wishlist: s.wishlist.includes(productId)
        ? s.wishlist.filter((w) => w !== productId)
        : [...s.wishlist, productId],
    }));
  }, []);

  const cartDetailed = useMemo(
    () =>
      state.cart.flatMap((l) => {
        const p = getProduct(l.productId);
        return p ? [{ productId: p.id, name: p.name, price: p.price, qty: l.qty, image: p.image }] : [];
      }),
    [state.cart],
  );

  const cartTotal = useMemo(() => cartDetailed.reduce((t, l) => t + l.price * l.qty, 0), [cartDetailed]);
  const cartCount = useMemo(() => state.cart.reduce((t, l) => t + l.qty, 0), [state.cart]);

  const placeOrder = useCallback(
    (customer: Order["customer"]) => {
      const lines = cartDetailed.map(({ productId, name, price, qty }) => ({ productId, name, price, qty }));
      const order: Order = {
        id: "PDP-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
        createdAt: new Date().toISOString(),
        customer,
        lines,
        total: lines.reduce((t, l) => t + l.price * l.qty, 0),
        status: "Placed",
      };
      setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }));
      return order;
    },
    [cartDetailed],
  );

  const addEnquiry = useCallback((e: Omit<Enquiry, "id" | "createdAt" | "status">) => {
    setState((s) => ({
      ...s,
      enquiries: [
        { ...e, id: "ENQ-" + Math.random().toString(36).slice(2, 8).toUpperCase(), createdAt: new Date().toISOString(), status: "New" },
        ...s.enquiries,
      ],
    }));
  }, []);

  const updateOrderStatus = useCallback((id: string, status: Order["status"]) => {
    setState((s) => ({ ...s, orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) }));
  }, []);

  const updateEnquiryStatus = useCallback((id: string, status: Enquiry["status"]) => {
    setState((s) => ({ ...s, enquiries: s.enquiries.map((e) => (e.id === id ? { ...e, status } : e)) }));
  }, []);

  const login = useCallback((user: string, pass: string) => {
    const ok = user.trim().toLowerCase() === "admin" && pass === "paulandium";
    if (ok) setState((s) => ({ ...s, admin: true }));
    return ok;
  }, []);

  const logout = useCallback(() => setState((s) => ({ ...s, admin: false })), []);

  const value: ShopValue = {
    ...state,
    ready,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    cartCount,
    cartTotal,
    cartDetailed,
    placeOrder,
    addEnquiry,
    updateOrderStatus,
    updateEnquiryStatus,
    login,
    logout,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
