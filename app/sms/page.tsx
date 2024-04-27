"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { smsVerification } from "./actions";

const initState = {
  token: false,
  error: undefined,
};
export default function SMSLogin() {
  const [state, action] = useFormState(smsVerification, initState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
      </div>
      <form action={action} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            key="token"
            name="token"
            type="number"
            placeholder="인증번호"
            required
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            key="phone"
            name="phone"
            type="text"
            placeholder="휴대폰번호"
            required
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "인증하기" : "인증 문자 보내기"} />
      </form>
    </div>
  );
}
