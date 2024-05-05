import Link from "next/link";

import { IoLogoGoogle } from "react-icons/io5";
import { ImGithub } from "react-icons/im";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        <Link className="primary-btn flex h-10 items-center justify-center gap-3" href="/google/start">
          <span>
            <IoLogoGoogle className="h-6 w-6" />
          </span>
          <span>Google</span>
        </Link>
        <Link className="primary-btn flex h-10 items-center justify-center gap-3" href="/github/start">
          <span>
            <ImGithub className="h-6 w-6" />
          </span>
          <span>Github</span>
        </Link>
      </div>
    </>
  );
}
