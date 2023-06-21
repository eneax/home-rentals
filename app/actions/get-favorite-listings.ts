import prisma from "@/lib/prismadb";
import getCurrentUser from "./get-current-user";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavoriteListings = favoriteListings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeFavoriteListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
