"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TfiThemifyFaviconAlt } from "react-icons/tfi";
import { TfiPackage } from "react-icons/tfi";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800">
      <Link href="/products" className="flex flex-col items-center">
        {pathname === "/products" ? <TfiPackage /> : <TfiThemifyFaviconAlt />}
        <span>Sotti</span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center">
        <TfiThemifyFaviconAlt />
        <span>채팅</span>
      </Link>
      <Link href="/life" className="flex flex-col items-center">
        <TfiThemifyFaviconAlt />
        <span>생활</span>
      </Link>
      <Link href="/live" className="flex flex-col items-center">
        <TfiThemifyFaviconAlt />
        <span>라이브</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center">
        <TfiThemifyFaviconAlt />
        <span>나의</span>
      </Link>
    </div>
  );
}
