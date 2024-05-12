import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

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

export default async function ProductPage() {
  const initialProducts = await getInitialProducts();

  return (
    <div>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
