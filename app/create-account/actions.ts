"use server";

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
      .min(3, "이름이 너무 짧아요")
      .max(10, "이름이 너무 길어요"),
    email: z.string().email("이메일 형식이 아니에요"),
    password: z.string().min(10, "비밀번호가 너무 짧아요"),
    passwordConfirm: z.string().min(10, "비밀번호 확인이 너무 짧아요"),
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
