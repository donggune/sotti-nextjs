"use server";

import db from "@/lib/db";

export async function getMoreProducts(page: number) {
  console.log("page : ", page);

  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: page * 6,
    take: 6,
    orderBy: {
      id: "desc",
    },
  });

  return products;
}
