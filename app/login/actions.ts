"use server";

import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해 주세요"),
  password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }
};
