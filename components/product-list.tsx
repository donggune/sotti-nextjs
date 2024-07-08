"use client";

import { initialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./list-product";
import { useEffect, useRef, useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface ProductListProps {
  initialProducts: initialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const element = entries[0];
        if (element.isIntersecting) {
          observer.unobserve(element.target);
          setIsLoading(true);
          const moreProducts = await getMoreProducts(page + 1);
          if (moreProducts.length !== 0) {
            setProducts((prev) => [...prev, ...moreProducts]);
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured categories */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">인기 카테고리</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {["악세서리", "의류", "홈데코", "문구", "가방"].map((category) => (
            <Button key={category} variant="outline" className="h-auto py-4">
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section>
        <h2 className="text-xl font-semibold mb-4">추천 상품</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ListProduct key={product.id} {...product} />
          ))}
          {!isLastPage && (
            <span ref={trigger} className="bg-blue-500 text-white p-2 rounded-md">
              {isLoading ? "Loading..." : "더 보기"}
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
