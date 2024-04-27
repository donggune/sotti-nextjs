"use server";

import { SMS_PHONE_ERROR, SMS_TOKEN_ERROR } from "@/lib/constants";
import { redirect } from "next/navigation";
import validator from "validator";

import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .refine((phone) => validator.isMobilePhone(phone, "ko-KR"), SMS_PHONE_ERROR);

const tokenSchema = z.coerce.number().min(100000, SMS_TOKEN_ERROR).max(999999);

interface ActionState {
  token: boolean;
}
export const smsVerification = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get("phone");
  const token = formData.get("token");

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      redirect("/");
    }
  }
};
