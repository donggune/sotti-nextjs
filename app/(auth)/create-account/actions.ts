"use server";

import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkPasswords = ({ password, passwordConfirm }: { password: string; passwordConfirm: string }) => {
  return password === passwordConfirm;
};

const formSchema = z
  .object({
    name: z
      .string({
        required_error: "이름을 입력해 주세요",
        invalid_type_error: "이름에는 글자만 넣어주세요",
      })
      .trim(),
    email: z.string().email("올바른 이메일을 입력해 주세요").toLowerCase(),
    password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    passwordConfirm: z.string(),
  })
  .superRefine(async ({ email }, ctx) => {
    const userEmail = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (userEmail) {
      ctx.addIssue({
        code: "custom",
        message: "이미 가입된 이메일 주소에요",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않아요",
    path: ["passwordConfirm"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    // 이메일 중복 확인 => Zod 에 적용
    // 비번 해싱
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    // 저장
    const user = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    // 리다이렉트
    redirect("/login");
  }
}
