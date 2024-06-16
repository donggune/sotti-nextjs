import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return post;
  } catch (e) {
    return null;
  }
}

async function getLike(postId: number) {
  const session = await getSession();
  const like = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: session.id!,
      },
    },
  });
  return Boolean(like);
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const post = await getPost(id);

  if (!post) {
    return notFound();
  }

  const likePost = async () => {
    "use server";
    const session = await getSession();
    try {
      await db.like.create({
        data: {
          postId: id,
          userId: session.id!,
        },
      });
    } catch (e) {}
  };

  const disLikePost = async () => {
    "use server";

    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          postId: id,
          userId: session.id!,
        },
      },
    });
  };

  const isLiked = await getLike(id);

  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-2">
        <Image width={28} height={28} src={post.user.avatar!} alt={post.user.name} className="size-11 rounded-full" />
        <div>
          <span className="text-sm font-semibold">{post.user.name}</span>
          <div className="text-sm">
            <span>{formatToTimeAgo(post.createdAt.toISOString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex gap-4">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>{post.views}</span>
        </div>
        <form action={isLiked ? disLikePost : likePost}>
          <button className="flex items-center gap-2 text-neutral-400 text-sm">
            <HandThumbUpIcon className="size-5" />
            <span>{post._count.likes}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
