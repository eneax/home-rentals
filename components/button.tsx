"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  icon?: IconType;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon: Icon,
  disabled,
  outline,
  small,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        outline
          ? "bg-white border-black text-black "
          : "bg-rose-500 border-rose-500 text-white"
      } ${
        small
          ? "py-1 text-sm font-light border-[1px]"
          : "py-3 text-md font-semibold border-2"
      }`}
    >
      {Icon && <Icon size={24} className="absolute top-3 left-4" />}
      {label}
    </button>
  );
};

export default Button;
