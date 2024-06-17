"use client";

import { disLikePost, likePost } from "@/app/posts/[id]/actions";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}
export default function LikeButton({ isLiked, likeCount, postId }: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic({ isLiked, likeCount }, (currentState, payload) => {
    return {
      isLiked: !currentState.isLiked,
      likeCount: currentState.isLiked ? currentState.likeCount - 1 : currentState.likeCount + 1,
    };
  });

  const handleClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await disLikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  return (
    <button
      className={`flex items-center gap-2 text-neutral-400 text-sm
          ${state.isLiked ? "text-sotti-main" : ""}`}
      onClick={handleClick}
    >
      {state.isLiked ? <HeartIconFilled className="size-5" /> : <HeartIcon className="size-5" />}
      <span>{state.likeCount}</span>
    </button>
  );
}
