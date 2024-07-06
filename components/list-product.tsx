import { formatToTimeAgo, formatToWon } from "@/lib/common-utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface ListProductProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function ListProduct({ title, price, created_at, photo, id }: ListProductProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden">
        <Image src={`${photo}/avatar`} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">{formatToTimeAgo(created_at.toString())}</span>
        <span className="text-lg font-semibold">{formatToWon(price)}</span>
      </div>
    </Link>
  );
}
