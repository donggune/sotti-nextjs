import LikeButton from "@/components/like-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconFilled } from "@heroicons/react/24/solid";
import { revalidateTag, unstable_cache as nextCache } from "next/cache";
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
          },
        },
      },
    });

    return post;
  } catch (e) {
    return null;
  }
}

async function getCachedPost(postId: number) {
  const post = nextCache(getPost, [`post-detail-${postId}`], {
    tags: [`post-detail-${postId}`],
    revalidate: 180,
  });
  return post(postId);
}

async function getLikeStatus(postId: number, userId: string) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });

  return { likeCount, isLiked: Boolean(isLiked) };
}

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const likeStatus = nextCache(getLikeStatus, ["post-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return likeStatus(postId, session.id!);
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const post = await getCachedPost(id);

  if (!post) {
    return notFound();
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(id);

  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-2">
        <Image width={28} height={28} src={post.user.avatar!} alt={post.user.name} className="size-11 rounded-full" />
        <div>
          <span className="text-sm font-semibold">{post.user.name}</span>
          <div className="text-sm">
            <span>{formatToTimeAgo(post.createdAt.toString())}</span>
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

        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      </div>
    </div>
  );
}
