"use client";

import * as React from "react";
import { AiOutlineMenu } from "react-icons/ai";

import useRegisterModal from "@/hooks/use-register-modal";
import useLoginModal from "@/hooks/use-login-modal";

import Avatar from "@/components/avatar";
import MenuItem from "@/components/navbar/menu-item";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = React.useCallback(() => setIsOpen((value) => !value), []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block font-semibold text-sm px-3 py-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Your Home
        </div>
        <div
          onClick={toggleOpen}
          className="flex items-center gap-3 p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full hover:shadow-md transition cursor-pointer"
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 overflow-hidden w-[40vw] md:w-3/4 bg-white rounded-xl shadow-md text-sm">
          <div className="flex flex-col cursor-pointer">
            <React.Fragment>
              <MenuItem label="Login" onClick={loginModal.onOpen} />
              <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
            </React.Fragment>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
