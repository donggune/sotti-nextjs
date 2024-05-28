"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  photo: z.string({
    required_error: "사진을 추가해주세요.",
  }),
  title: z
    .string({
      required_error: "제목을 입력해주세요.",
    })
    .min(5, {
      message: "제목은 5자 이상으로 입력해주세요.",
    }),
  description: z
    .string({
      required_error: "설명을 입력해주세요.",
    })
    .min(10, {
      message: "설명은 10자 이상으로 입력해주세요.",
    }),
  price: z.coerce
    .number({
      required_error: "가격을 입력해주세요.",
    })
    .min(100, {
      message: "가격은 100원 이상으로 입력해주세요.",
    }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };

  data.photo = "/banana.jpg";

  const result = productSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          title: result.data.title,
          price: result.data.price,
          description: result.data.description,
          photo: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      redirect(`/products/${product.id}`);
    }
  }
}
