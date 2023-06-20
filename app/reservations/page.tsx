import getCurrentUser from "@/app/actions/get-current-user";
import getReservations from "@/app/actions/get-reservations";

import EmptyState from "@/components/empty-state";
import Reservations from "./reservations";

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="You must be logged in to view this page."
      />
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return <Reservations reservations={reservations} currentUser={currentUser} />;
}
