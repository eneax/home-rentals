import getCurrentUser from "@/app/actions/get-current-user";
import getFavoriteListings from "@/app/actions/get-favorite-listings";

import EmptyState from "@/components/empty-state";
import FavoriteListings from "./favorite-listings";

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();
  const favoriteListings = await getFavoriteListings();

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No Favorites"
        subtitle="You don't have any favorite listings yet."
      />
    );
  }

  return (
    <FavoriteListings listings={favoriteListings} currentUser={currentUser} />
  );
}
