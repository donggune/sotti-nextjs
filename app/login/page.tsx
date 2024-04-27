"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleSubmit } from "./actions";

export default function Login() {
  const [state, action] = useFormState(handleSubmit, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput type="email" placeholder="이메일" required name="email" />
        <FormInput type="password" placeholder="비밀번호" required name="password" />
        <FormButton text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
