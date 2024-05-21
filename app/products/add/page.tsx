"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useState } from "react";
import { FaImage } from "react-icons/fa";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const onImageChange = () => {};
  return (
    <div>
      <form className="flex flex-col gap-4 p-5">
        <label
          htmlFor="photo"
          className="flex flex-col items-center justify-center border-2 aspect-square rounded-md border-neutral-400 border-dashed cursor-pointer"
        >
          <span>
            <FaImage className="text-gray-400 size-44" />
          </span>
          <span className="text-sm text-gray-400">사진을 추가해주세요.</span>
        </label>
        <Input onChange={onImageChange} type="file" name="photo" id="photo" className="hidden" />
        <Input type="text" name="title" placeholder="제목" />
        <Input type="text" name="price" placeholder="가격" />
        <Input type="text" name="description" placeholder="상품 상세 내용" />
        <Button text="저장" />
      </form>
    </div>
  );
}
