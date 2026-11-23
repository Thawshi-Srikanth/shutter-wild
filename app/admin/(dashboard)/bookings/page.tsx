import prisma from "@/lib/prisma";
import BookingsManager from "./BookingsManager";

export const revalidate = 0; // Force server-side evaluation

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tour: {
        select: {
          title: true,
          location: true,
          date: true,
        },
      },
    },
  });

  return <BookingsManager initialBookings={bookings} />;
}
