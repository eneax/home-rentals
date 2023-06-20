import getCurrentUser from "@/app/actions/get-current-user";
import getReservations from "@/app/actions/get-reservations";

import EmptyState from "@/components/empty-state";
import MyTrips from "./my-trips";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="You must be logged in to view this page."
      />
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="You have not reserved any trips yet!"
      />
    );
  }

  return <MyTrips reservations={reservations} currentUser={currentUser} />;
}
