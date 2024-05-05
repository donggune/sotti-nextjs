import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaUser } from "react-icons/fa";

async function getIsOwner(userId: string) {
  const session = await getSession();
  return session?.id === userId;
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });

  return product;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  const isOwner = await getIsOwner(product.userId);
  return (
    <div>
      <div className="relative aspect-square">
        <Image fill src={product.photo} alt={product.title} />
      </div>

      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full">
          {product.user.avatar !== null ? (
            <Image src={product.user.avatar} width={40} height={40} alt={product.user.name} />
          ) : (
            <FaUser className="size-full" />
          )}
        </div>
        <div>
          <h3>{product.user.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex items-center justify-between">
        <span className="text-xl font-bold">{formatToWon(product.price)}</span>
        {isOwner ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">Delete</button>
        ) : null}
        <Link className="bg-sotti-main px-5 py-2.5 rounded-md text-white font-semibold" href={``}>
          구매하기
        </Link>
      </div>
    </div>
  );
}
