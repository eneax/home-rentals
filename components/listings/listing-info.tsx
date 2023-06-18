"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import { SafeUser } from "@/types";
import useCountries from "@/hooks/use-countries";

import Avatar from "@/components/avatar";
import ListingCategory from "@/components/listings/listing-category";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  locationValue: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  locationValue,
  guestCount,
  roomCount,
  bathroomCount,
  category,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="flex flex-col col-span-4 gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-semibold text-xl">
          <h3>Hosted by {user?.name}</h3>
          <Avatar src={user?.image} />
        </div>

        <div className="flex items-center gap-4 font-light text-neutral-500">
          <span>{guestCount} guests</span>
          <span>{roomCount} rooms</span>
          <span>{bathroomCount} bathrooms</span>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <hr />
      <p className="font-light text-lg text-neutral-500">{description}</p>
      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
