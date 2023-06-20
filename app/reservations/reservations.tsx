"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import { SafeReservation, SafeUser } from "@/types";
import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listings/listing-card";

interface ReservationsProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const Reservations: React.FC<ReservationsProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = React.useState<string>("");

  const onCancel = React.useCallback(
    async (id: string) => {
      setDeleteId(id);

      try {
        await axios.delete(`/api/reservations/${id}`);
        toast.success("Reservation cancelled successfully.");
        router.refresh();
      } catch (error) {
        toast.error((error as Error).message ?? "Something went wrong");
      } finally {
        setDeleteId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Manage all your property reservations in one place."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Reservations;
