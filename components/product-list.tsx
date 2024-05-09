"use client";

import { initialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./list-product";
import { useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";
import { useSearchParams } from "next/navigation";

interface ProductListProps {
  initialProducts: initialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const onMoreProducts = async () => {
    setIsLoading(true);
    const moreProducts = await getMoreProducts(page + 1);
    if (moreProducts.length !== 0) {
      setPage((prev) => prev + 1);
      setProducts((prev) => [...prev, ...moreProducts]);
      setIsLoading(false);
    } else {
      setIsLastPage(true);
    }
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {!isLastPage && (
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={onMoreProducts} disabled={isLoading}>
          {isLoading ? "Loading..." : "더 보기"}
        </button>
      )}
    </div>
  );
}
