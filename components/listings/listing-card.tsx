"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import useCountries from "@/hooks/use-countries";
import { SafeListing, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";

import HeartButton from "@/components/heart-button";
import Button from "@/components/button";

interface ListingCardProps {
  currentUser?: SafeUser | null;
  data: SafeListing;
  reservation?: Reservation;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  currentUser,
  data,
  reservation,
  disabled = false,
  actionId = "",
  actionLabel,
  onAction,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = React.useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = React.useMemo(() => {
    if (!reservation) return null;

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="group col-span-1 cursor-pointer"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="w-full flex flex-col gap-2">
        <div className="relative w-full overflow-hidden rounded-xl aspect-square">
          <Image
            fill
            src={data.imageSrc}
            alt={`Listing ${data.title}`}
            className="w-full h-full object-cover group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <h3 className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </h3>

        <span className="font-light text-neutral-500">
          {reservationDate || data.category}
        </span>

        <div className="flex items-center gap-1">
          <span className="font-semibold">€ {price}</span>
          {!reservation && <span className="font-light">/ night</span>}
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
