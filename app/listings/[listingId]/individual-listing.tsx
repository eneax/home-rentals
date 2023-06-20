"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import axios from "axios";

import { SafeListing, SafeReservation, SafeUser } from "@/types";
import useLoginModal from "@/hooks/use-login-modal";

import { categories } from "@/components/navbar/categories";
import Container from "@/components/container";
import ListingHead from "@/components/listings/listing-head";
import ListingInfo from "@/components/listings/listing-info";
import ListingReservation from "@/components/listings/listing-reservation";

const INITIAL_DATE_RANGE = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface IndividualListingProps {
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: SafeReservation[];
}

const IndividualListing: React.FC<IndividualListingProps> = ({
  currentUser,
  listing,
  reservations = [],
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(listing.price);
  const [dateRange, setDateRange] = React.useState<Range>(INITIAL_DATE_RANGE);
  const router = useRouter();
  const loginModal = useLoginModal();

  const disabledDates = React.useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = React.useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  const onCreateReservation = React.useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    try {
      await axios.post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      });

      toast.success("Listing reserved!");
      setDateRange(INITIAL_DATE_RANGE);
      router.push("/trips");
    } catch (error) {
      toast.error((error as Error).message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, dateRange, listing?.id, loginModal, router, totalPrice]);

  React.useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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

            <div className="order-first md:order-last md:col-span-3 mb-10">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                disabledDates={disabledDates}
                disabled={isLoading}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default IndividualListing;
