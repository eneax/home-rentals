"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { differenceInDays } from "date-fns";
import { BiSearch } from "react-icons/bi";

import useSearchModal from "@/hooks/use-search-modal";
import useCountries from "@/hooks/use-countries";

const Search = () => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = React.useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Place";
  }, [locationValue, getByValue]);

  const durationLabel = React.useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      let diff = differenceInDays(end, start);

      if (diff === 0) {
        return (diff = 1);
      }

      return `${diff} Days`;
    }

    return "Time";
  }, [startDate, endDate]);

  const guestLabel = React.useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold text-sm px-6">{locationLabel}</div>
        <div className="hidden sm:block font-semibold text-sm text-center px-6 border-x-[1px] flex-1">
          {durationLabel}
        </div>
        <div className="flex items-center gap-3 text-sm pl-6 pr-2 text-gray-600">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="bg-rose-500 text-white p-2 rounded-full">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
