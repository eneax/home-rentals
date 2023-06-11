"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  selected = false,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col gap-3 p-4 rounded-xl border-2 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <span className="font-semibold">{label}</span>
    </div>
  );
};

export default CategoryInput;
