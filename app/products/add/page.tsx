"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { uploadProduct } from "./actions";
import { MB } from "@/lib/constants";
import { useFormState } from "react-dom";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    if (!files) {
      return;
    }

    const file = files[0];

    if (!file) {
      setPreview("");
      return;
    }

    if (file.size > MB) {
      alert("사진은 10MB 이하로 업로드 해주세요.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("사진 파일만 업로드 해주세요.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const [state, action] = useFormState(uploadProduct, null);
  return (
    <div>
      <form action={action} className="flex flex-col gap-4 p-5">
        <label
          htmlFor="photo"
          className="flex flex-col items-center justify-center border-2 aspect-square rounded-md border-neutral-400 border-dashed cursor-pointer bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {preview === "" ? (
            <>
              <span>
                <FaImage className="text-gray-400 size-44" />
              </span>
              <span className="text-sm text-gray-400">사진을 추가해주세요.</span>
            </>
          ) : null}
        </label>
        <Input onChange={onImageChange} type="file" name="photo" id="photo" accept="image/*" className="hidden" />
        <Input type="text" name="title" placeholder="제목" errors={state?.fieldErrors.title} />
        <Input type="text" name="price" placeholder="가격" errors={state?.fieldErrors.price} />
        <Input type="text" name="description" placeholder="상품 상세 내용" errors={state?.fieldErrors.description} />
        <Button text="저장" />
      </form>
    </div>
  );
}
