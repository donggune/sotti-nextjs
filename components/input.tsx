import React, { InputHTMLAttributes } from "react";

// type 설정할 때 type를 쓰든 interface 를 사용하든 취향차이임. 아무거나 해도됨
interface Props {
  name: string;
  errors?: string[];
}

export default function Input({ errors = [], name, ...props }: Props & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-4 transition ring-neutral-200 focus:ring-sotti-main border-none placeholder:text-neutral-400"
        {...props}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium text-sm">
          {error}
        </span>
      ))}
    </div>
  );
}
