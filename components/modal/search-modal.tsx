"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import queryString from "query-string";
import { formatISO } from "date-fns";

import useSearchModal from "@/hooks/use-search-modal";

import Modal from "./modal";
import CountrySelect, {
  CountrySelectValue,
} from "@/components/inputs/country-select";
import Heading from "@/components/heading";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

interface SearchModalProps {}

const SearchModal: React.FC<SearchModalProps> = ({}) => {
  const router = useRouter();
  const params = useSearchParams();

  const searchModal = useSearchModal();

  const [step, setStep] = React.useState(STEPS.LOCATION);
  const [location, setLocation] = React.useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = React.useState(1);
  const [roomCount, setRoomCount] = React.useState(1);
  const [bathroomCount, setBathroomCount] = React.useState(1);
  const [dateRange, setDateRange] = React.useState<Range>({
    key: "selection",
    startDate: new Date(),
    endDate: new Date(),
  });

  const Map = React.useMemo(
    () => dynamic(() => import("@/components/map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onBack = React.useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = React.useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = React.useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    onNext,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    params,
    router,
    searchModal,
  ]);

  const actionLabel = React.useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where are you going?"
        subtitle="Find the perfect place to stay, for every getaway."
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchModal.onOpen}
      title="Filters"
      actionLabel="Search"
      body={bodyContent}
    />
  );
};

export default SearchModal;
