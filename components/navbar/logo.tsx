"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      src="/images/logo.png"
      height="100"
      width="100"
      priority
      alt="Logo"
      className="hidden md:block cursor-pointer"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
