"use server";

import { PASSWORD_REGEX } from "@/lib/constants";
import { z } from "zod";

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

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }
}
