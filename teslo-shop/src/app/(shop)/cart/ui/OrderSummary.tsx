"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);

  // Access calculated state properties directly
  const itemsInCart = useCartStore((state) => state.itemsInCart);
  const subTotal = useCartStore((state) => state.subTotal);
  const tax = useCartStore((state) => state.tax);
  const total = useCartStore((state) => state.total);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded) {
      router.replace("/empty");
    }
  }, [itemsInCart, loaded, router]);

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
