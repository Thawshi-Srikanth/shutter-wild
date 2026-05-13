import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";
import { tours } from "@/data/tours";
import {
  getCustomerBookingEmail,
  getAdminBookingEmail,
} from "@/lib/emailTemplates";

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

      // Inject full rich tour data so emails have Location & Date
      const richTour = tours.find((t) => t.slug === tour.slug) || tour;

      // Send confirmation emails
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_PORT === "465",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const customerEmail = session.customer_details?.email;
        const adminEmail = process.env.ADMIN_EMAIL;
        const fromEmail =
          process.env.EMAIL_FROM || "Shutter Wild <noreply@shutterwild.co.uk>";

        const emailPromises = [];

        // Email to applicant
        if (customerEmail) {
          const customerEmailContent = getCustomerBookingEmail(
            richTour,
            session,
          );
          emailPromises.push(
            transporter.sendMail({
              from: fromEmail,
              to: customerEmail,
              subject: customerEmailContent.subject,
              text: customerEmailContent.text,
              html: customerEmailContent.html,
            }),
          );
        }

        // Email to admin
        if (adminEmail) {
          const adminEmailContent = getAdminBookingEmail(richTour, session);
          emailPromises.push(
            transporter.sendMail({
              from: fromEmail,
              to: adminEmail,
              subject: adminEmailContent.subject,
              text: adminEmailContent.text,
              html: adminEmailContent.html,
            }),
          );
        }

        await Promise.all(emailPromises);
        console.log("Successfully sent confirmation emails");
      } catch (emailError) {
        console.error("Failed to send confirmation emails:", emailError);
        // We do not fail the webhook request if email sending fails
      }

      // Revalidate the tour page and the main tours list so the UI reflects the new slot count
      revalidatePath(`/tours/${tour.slug}`);
      revalidatePath("/tours");
      revalidatePath("/");
    } catch (dbError) {
      console.error("Database update failed:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
