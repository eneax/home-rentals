"use client";

import * as React from "react";
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src ?? "/images/avatar.jpg"}
      alt="Avatar"
      height="30"
      width="30"
      className="rounded-full"
    />
  );
};

export default Avatar;
