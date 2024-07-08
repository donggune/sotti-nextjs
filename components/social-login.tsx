import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { IoLogoGoogle } from "react-icons/io5";

export default function SocialLogin() {
  return (
    <div className="w-full">
      <Separator className="my-4" />
      <Button variant="outline" asChild className="w-full">
        <Link href="/google/start" className="flex items-center justify-center gap-2">
          <IoLogoGoogle className="h-5 w-5" />
          <span>Google로 계속하기</span>
        </Link>
      </Button>
    </div>
  );
}
