"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SocialLogin from "@/components/social-login";
import { createAccount } from "./actions";
import { useFormState } from "react-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>계정 만들기</CardTitle>
          <CardDescription>아래 양식을 작성하여 계정을 만드세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" type="text" placeholder="이름" required name="name" />
              {state?.fieldErrors.name && <p className="text-sm text-red-500">{state.fieldErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="이메일" required name="email" />
              {state?.fieldErrors.email && <p className="text-sm text-red-500">{state.fieldErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" placeholder="비밀번호" required name="password" />
              {state?.fieldErrors.password && <p className="text-sm text-red-500">{state.fieldErrors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
              <Input id="passwordConfirm" type="password" placeholder="*********" required name="passwordConfirm" />
              {state?.fieldErrors.passwordConfirm && (
                <p className="text-sm text-red-500">{state.fieldErrors.passwordConfirm}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              계정 만들기
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <SocialLogin />
        </CardFooter>
      </Card>
    </div>
  );
}
