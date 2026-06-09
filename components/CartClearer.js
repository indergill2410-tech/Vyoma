"use client";

import { useEffect } from "react";
import { useCart } from "./Providers";

// Clears the cart once on the success page — payment succeeded, the bag is done.
export default function CartClearer() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
