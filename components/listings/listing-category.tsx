"use client";

import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-600" />

        <div className="flex flex-col">
          <span className="font-semibold text-lg">{label}</span>
          <span className="font-light text-neutral-500">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
