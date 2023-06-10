"use client";

import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/images/logo.png"
      height="100"
      width="100"
      priority
      alt="Logo"
      className="hidden md:block cursor-pointer"
    />
  );
};

export default Logo;
