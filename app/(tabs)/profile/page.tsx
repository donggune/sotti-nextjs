import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      include: {
        products: true, // 사용자의 상품 정보를 함께 가져옵니다
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function ProfilePage() {
  const user = await getUser();

  const logout = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">{user.name} 님의 프로필</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">이메일</p>
            <p>{user.email}</p>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">내가 등록한 상품</h3>
            {user.products.length > 0 ? (
              <ul className="space-y-2">
                {user.products.map((product) => (
                  <li key={product.id} className="flex justify-between items-center">
                    <span>{product.title}</span>
                    <span className="text-sm text-gray-500">{product.price}원</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">등록한 상품이 없습니다.</p>
            )}
          </div>
          <Separator />
          <div className="flex justify-between">
            <Button asChild variant="outline">
              <Link href="/products/new">상품 등록하기</Link>
            </Button>
            <form action={logout}>
              <Button type="submit" variant="outline">
                로그아웃
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
