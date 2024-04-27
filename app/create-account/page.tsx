"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { createAccount } from "./actions";
import { useFormState } from "react-dom";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to create your account!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput type="text" placeholder="이름" required name="name" errors={state?.fieldErrors.name} />
        <FormInput type="email" placeholder="이메일" required name="email" errors={state?.fieldErrors.email} />
        <FormInput
          type="password"
          placeholder="비밀번호"
          required
          name="password"
          errors={state?.fieldErrors.password}
        />
        <FormInput
          type="password"
          placeholder="비밀번호 확인"
          required
          name="passwordConfirm"
          errors={state?.fieldErrors.passwordConfirm}
        />
        <FormButton text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
