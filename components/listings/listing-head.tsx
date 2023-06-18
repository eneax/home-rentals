"use client";

import * as React from "react";
import Image from "next/image";

import { SafeUser } from "@/types";
import useCountries from "@/hooks/use-countries";

import Heading from "@/components/heading";
import HeartButton from "@/components/heart-button";

interface ListingHeadProps {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <React.Fragment>
      <Heading
        title={title}
        subtitle={`${location?.label}, ${location?.region}`}
      />

      <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
        <Image
          fill
          src={imageSrc}
          alt={title}
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ListingHead;
