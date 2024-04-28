import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }

  notFound();
}

export default async function Page() {
  const user = await getUser();

  const logout = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <>
      <h1>{user?.name} 님의 마이페이지</h1>
      <form action={logout}>
        <button>Logout</button>
      </form>
    </>
  );
}
