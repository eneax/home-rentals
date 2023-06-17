import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const listing = await prisma.listing.create({
    data: {
      userId: currentUser.id,
      title: body.title,
      description: body.description,
      imageSrc: body.imageSrc,
      category: body.category,
      roomCount: body.roomCount,
      bathroomCount: body.bathroomCount,
      guestCount: body.guestCount,
      locationValue: body.location.value,
      price: parseInt(body.price, 10),
    },
  });

  return NextResponse.json(listing);
}
