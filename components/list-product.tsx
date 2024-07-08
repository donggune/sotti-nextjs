import { formatToTimeAgo, formatToWon } from "@/lib/common-utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ListProductProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function ListProduct({ title, price, created_at, photo, id }: ListProductProps) {
  return (
    <Link href={`/products/${id}`}>
      <Card>
        <CardHeader>
          <Image
            src={`${photo}/avatar`}
            alt={title}
            width={500}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <p className="text-muted-foreground mt-2">₩50,000</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">장바구니에 담기</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
