"use client";

import * as React from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = React.useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="kf4oerl4"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }: any) => (
        <div
          onClick={() => open?.()}
          className="relative flex flex-col items-center justify-center gap-4 p-20 cursor-pointer hover:opacity-70 transition border-dashed border-2 border-neutral-300 text-neutral-600"
        >
          <TbPhotoPlus size={50} />
          <span className="font-semibold text-lg">Upload photo</span>

          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={value}
                alt="Uploaded image"
                fill
                className="object-fit"
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
