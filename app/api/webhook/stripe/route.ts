import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { tourId, tourSlug } = session.metadata || {};

    if (!tourId) {
      console.error("No tourId found in session metadata");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    try {
      // Find the tour in the database
      const tour = await prisma.tour.findFirst({
        where: {
          OR: [{ id: tourId }, { slug: tourSlug }],
        },
      });

      if (!tour) {
        console.error(`Tour not found: ${tourId}`);
        return NextResponse.json({ error: "Tour not found" }, { status: 404 });
      }

      // Update available slots and create a booking in a transaction
      await prisma.$transaction([
        prisma.tour.update({
          where: { id: tour.id },
          data: {
            availableSlots: {
              decrement: 1,
            },
          },
        }),
        prisma.booking.create({
          data: {
            tourId: tour.id,
            customerEmail:
              session.customer_details?.email || "unknown@example.com",
            amount: session.amount_total || 0,
            stripeSessionId: session.id,
          },
        }),
      ]);

      console.log(`Successfully updated slots for tour: ${tour.title}`);
    } catch (dbError) {
      console.error("Database update failed:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
