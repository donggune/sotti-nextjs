import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Sotti",
    default: "Sotti",
  },
  description: "핸드메이드를 사랑하는 사람들을 위한 마켓",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#242528] text-white max-w-screen-sm mx-auto`}>{children}</body>
    </html>
  );
}
