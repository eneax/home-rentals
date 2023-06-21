"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import { SafeListing, SafeUser } from "@/types";
import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listings/listing-card";

interface MyPropertiesProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const MyProperties: React.FC<MyPropertiesProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = React.useState<string>("");

  const onDelete = React.useCallback(
    async (id: string) => {
      setDeleteId(id);

      try {
        await axios.delete(`/api/listings/${id}`);
        toast.success("Listing deleted successfully.");
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
      <Heading title="Properties" subtitle="List of properties you own" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deleteId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default MyProperties;
