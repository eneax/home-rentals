"use client";

import { BiSearch } from "react-icons/bi";

import useSearchModal from "@/hooks/use-search-modal";

const Search = () => {
  const searchModal = useSearchModal();

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold text-sm px-6">Place</div>
        <div className="hidden sm:block font-semibold text-sm text-center px-6 border-x-[1px] flex-1">
          Time
        </div>
        <div className="flex items-center gap-3 text-sm pl-6 pr-2 text-gray-600">
          <div className="hidden sm:block">Add Guests</div>
          <div className="bg-rose-500 text-white p-2 rounded-full">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
