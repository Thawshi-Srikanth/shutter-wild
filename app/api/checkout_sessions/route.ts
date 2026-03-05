import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { amount, tourTitle, tourDate, tourImage, customerEmail } =
      await req.json();

    if (!amount || !tourTitle) {
      return NextResponse.json(
        { error: "Amount and tour title are required" },
        { status: 400 },
      );
    }

    const origin = req.headers.get("origin") || "";

    // Stripe requires public, valid URLs for images
    // Localhost URLs will cause a 400 Bad Request
    let imageUrl = tourImage?.startsWith("http")
      ? tourImage
      : `${origin}${tourImage || ""}`;

    if (imageUrl.includes("localhost") || imageUrl.includes("127.0.0.1")) {
      imageUrl = ""; // Clear to undefined to pass Stripe validation
    }

    // Amount is passed in as the raw deposit number (e.g., 450)
    // Stripe expects the amount in cents
    const amountInCents = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "GBP", // Charge the deposit in GBP
            product_data: {
              name: `Expedition Deposit: ${tourTitle}`,
              description: `Booking deposit for ${tourTitle} (${tourDate})`,
              images: imageUrl ? [imageUrl] : undefined,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: customerEmail,
      success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/booking/cancel`,
    });

    // Return the checkout session URL for redirecting
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Error creating checkout session" },
      { status: 500 },
    );
  }
}
