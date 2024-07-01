import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/common-utils";
import { ChatBubbleOvalLeftIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      createdAt: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });

  return posts;
}

export const metadata = {
  title: "Life",
};

export default async function LifePage() {
  const posts = await getPosts();

  console.log(posts);

  return (
    <div className="p-5 flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex flex-col gap-2 last:pb-0 last:border-b-0"
        >
          <h2 className="text-white text-2xl font-bold">{post.title}</h2>
          <p className="text-neutral-400">{post.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span>{formatToTimeAgo(post.createdAt.toISOString())}</span>
              <span>views {post.views}</span>
            </div>
            <div className="flex items-center gap-4 *:flex *:gap-1 *:items-center">
              <span>
                <HandRaisedIcon className="size-4" />
                {post._count.likes}
              </span>
              <span>
                <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                {post._count.comments}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
