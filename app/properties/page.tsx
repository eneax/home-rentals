import getCurrentUser from "@/app/actions/get-current-user";
import getListings from "@/app/actions/get-listings";

import EmptyState from "@/components/empty-state";
import MyProperties from "./my-properties";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Add a new property to get started."
      />
    );
  }

  return <MyProperties listings={listings} currentUser={currentUser} />;
}
