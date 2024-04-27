import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {}

export async function POST(request: NextRequest) {
  // request.json(); <= request 의 body 돌려주고 promise를 리턴해준다
  const data = await request.json();
  return;
}
