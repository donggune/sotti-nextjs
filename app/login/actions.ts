"use server";

import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해 주세요").refine(checkEmailExists, "존재하지 않는 이메일이에요"),
  password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    // 이메일로 유저 조회 => Zod 에 적용
    // 유저 있으면 비번확인
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(result.data.password, user?.password ?? "");
    // 로그인 ( 로그인한다는건 사용자에게 쿠키를 보내는거와 같음 )
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      // 리다이렉트
      redirect("/");
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 틀렸어요"],
          email: [],
        },
      };
    }
  }
};
