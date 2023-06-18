"use client";

import * as React from "react";

import { SafeListing, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";

import { categories } from "@/components/navbar/categories";
import Container from "@/components/container";
import ListingHead from "@/components/listings/listing-head";
import ListingInfo from "@/components/listings/listing-info";

interface IndividualListingProps {
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: Reservation[];
}

const IndividualListing: React.FC<IndividualListingProps> = ({
  currentUser,
  listing,
  reservations,
}) => {
  const category = React.useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              description={listing.description}
              locationValue={listing.locationValue}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              category={category}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default IndividualListing;
