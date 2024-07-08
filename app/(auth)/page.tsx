import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="flex flex-col items-center gap-2">
            <span className="text-6xl">🎁</span>
            <h1 className="text-3xl font-bold">Sotti</h1>
            <h2 className="text-xl font-medium">어서오세요 !</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link href="/create-account">시작하기</Link>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">이미 계정이 있나요?</span>
            <Button variant="link" asChild size="sm">
              <Link href="/login">로그인</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
