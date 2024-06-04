import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

const getCachedProducts = nextCache(getInitialProducts, ["products"], {
  revalidate: 60,
});

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 6,
    orderBy: {
      id: "desc",
    },
  });

  return products;
}

export type initialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export const metadata = {
  title: "Products",
};

//export const dynamic = "force-dynamic"; // dynamic 를 사용하면 옵션에따라 캐싱을 적용하지 않음, force-dynamic 을 사용하면 캐싱을 적용하지 않음
// export const revalidate = 60; // nextCache 와 같은 역할임

export default async function ProductPage() {
  const initialProducts = await getCachedProducts();

  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link href="/products/add" className="fixed bottom-24 right-10 bg-slate-50 rounded-full p-1">
        <CiCirclePlus className="size-10 text-2xl cursor-pointer" />
      </Link>
    </div>
  );
}
