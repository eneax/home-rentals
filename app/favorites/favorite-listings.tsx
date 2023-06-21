import { SafeListing, SafeUser } from "@/types";

import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listings/listing-card";

interface FavoriteListingsProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoriteListings: React.FC<FavoriteListingsProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorite Listings"
        subtitle="Your favorite listings are saved here."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteListings;
