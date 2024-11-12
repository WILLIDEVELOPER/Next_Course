"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = async () => {
    const stock = await getStockBySlug(slug);
    setStock(stock);
    setIsLoading(false);
  };

  useEffect(() => {
    getStock();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} antialiased text-lg font-bold bg-gray-200 animate-pulse`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased text-lg font-bold`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};
