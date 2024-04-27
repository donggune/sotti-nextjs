"use server";

import { redirect } from "next/navigation";

export const handleSubmit = async (prevState: any, formData: FormData) => {
  console.log(` ${formData.get("email")}`);
  console.log(` ${formData.get("password")}`);

  redirect("/");

  return {
    errors: [],
  };
};
