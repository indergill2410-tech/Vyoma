"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_REGION, isRegion } from "@/lib/regions";

// ── Region (Australia only for now) ──────────────────────────────────────────
const RegionContext = createContext(null);

// ── Cart ─────────────────────────────────────────────────────────────────────
// Shopify is the commerce backend. A cart line is a Shopify product variant,
// identified by its variantId (the Storefront `merchandiseId`). Checkout hands
// the whole line list to Shopify, which creates the hosted checkout.
const CartContext = createContext(null);

const REGION_KEY = "vyoma.region";
const CART_KEY = "vyoma.cart.v2"; // v2: Shopify-variant lines (v1 was local catalog)

// A line's identity is its Shopify variant id.
function lineId(item) {
  return item.variantId;
}

export function Providers({ children }) {
  const [region, setRegionState] = useState(DEFAULT_REGION);
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const r = localStorage.getItem(REGION_KEY);
      if (r && isRegion(r)) setRegionState(r);
      const c = localStorage.getItem(CART_KEY);
      if (c) setItems(JSON.parse(c));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(REGION_KEY, region);
  }, [region, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function setRegion(r) {
    if (isRegion(r)) setRegionState(r);
  }

  // next: { variantId, handle, productTitle, variantTitle, image, amount, currencyCode, qty }
  function addItem(next) {
    if (!next || !next.variantId) return;
    setItems((prev) => {
      const id = lineId(next);
      const found = prev.find((it) => lineId(it) === id);
      if (found) {
        return prev.map((it) =>
          lineId(it) === id
            ? { ...it, qty: Math.min(10, it.qty + (next.qty || 1)) }
            : it
        );
      }
      return [...prev, { ...next, qty: Math.min(10, next.qty || 1) }];
    });
    setDrawerOpen(true);
  }

  function updateQty(id, qty) {
    setItems((prev) =>
      prev
        .map((it) => (lineId(it) === id ? { ...it, qty } : it))
        .filter((it) => it.qty > 0)
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((it) => lineId(it) !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const count = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items]
  );

  const regionValue = useMemo(() => ({ region, setRegion, hydrated }), [
    region,
    hydrated,
  ]);

  const cartValue = useMemo(
    () => ({
      items,
      count,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      lineId,
      drawerOpen,
      setDrawerOpen,
      hydrated,
    }),
    [items, count, drawerOpen, hydrated]
  );

  return (
    <RegionContext.Provider value={regionValue}>
      <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within Providers");
  return ctx;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within Providers");
  return ctx;
}
