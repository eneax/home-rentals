"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

import { SafeUser } from "@/types";

import useRegisterModal from "@/hooks/use-register-modal";
import useLoginModal from "@/hooks/use-login-modal";
import useRentModal from "@/hooks/use-rent-modal";

import Avatar from "@/components/avatar";
import MenuItem from "@/components/navbar/menu-item";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = React.useCallback(() => setIsOpen((value) => !value), []);

  const onRent = React.useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block font-semibold text-sm px-3 py-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your Home
        </div>
        <div
          onClick={toggleOpen}
          className="flex items-center gap-3 p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full hover:shadow-md transition cursor-pointer"
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 overflow-hidden w-[40vw] md:w-3/4 bg-white rounded-xl shadow-md text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <React.Fragment>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem label="My favorites" onClick={() => {}} />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem label="My properties" onClick={() => {}} />
                <MenuItem label="Airbnb my home" onClick={rentModal.onOpen} />

                <hr />

                <MenuItem label="Logout" onClick={() => signOut()} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
