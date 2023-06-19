import * as React from "react";

import getCurrentUser from "@/app/actions/get-current-user";
import getListingById from "@/app/actions/get-listing-by-id";
import getReservations from "@/app/actions/get-reservations";

import EmptyState from "@/components/empty-state";
import IndividualListing from "./individual-listing";

interface IParams {
  listingId?: string;
}

export default async function IndividualListingPage({
  params,
}: {
  params: IParams;
}) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <React.Fragment>
      <IndividualListing
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </React.Fragment>
  );
}
