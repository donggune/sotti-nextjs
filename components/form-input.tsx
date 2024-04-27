import React from "react";

// type 설정할 때 type를 쓰든 interface 를 사용하든 취향차이임. 아무거나 해도됨
interface Props {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({ type, placeholder, required, errors }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-4 transition ring-neutral-200 focus:ring-sotti-main border-none placeholder:text-neutral-400"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
