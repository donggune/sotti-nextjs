"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { login } from "./actions";

export default function Login() {
  const [state, action] = useFormState(login, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input type="email" placeholder="이메일" required name="email" errors={state?.fieldErrors.email} />
        <Input type="password" placeholder="비밀번호" required name="password" errors={state?.fieldErrors.password} />
        <Button text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
