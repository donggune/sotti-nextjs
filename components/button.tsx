"use client";
import { useFormStatus } from "react-dom";

interface Props {
  text: string;
}

export default function Button({ text }: Props) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="primary-btn h-10 disabled:bg-neutral-400">
      {pending ? "Loading..." : text}
    </button>
  );
}
