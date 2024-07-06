import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">🎁</span>
        <h1 className="text-4xl">Sotti</h1>
        <h2 className="text-2xl">Sotti에 어서오세요 !</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Button>
          <Link href="/create-account" className="primary-btn py-2.5 text-lg ">
            시작하기
          </Link>
        </Button>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Button variant="outline">
            <Link href="/login" className="hover:underline">
              로그인
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
