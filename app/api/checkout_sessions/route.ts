import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { amount, tourTitle } = await req.json();

    if (!amount || !tourTitle) {
      return NextResponse.json(
        { error: "Amount and tour title are required" },
        { status: 400 },
      );
    }

    // Amount is passed in as the raw deposit number (e.g., 450)
    // Stripe expects the amount in cents
    const amountInCents = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "GBP", // Charge the deposit in Euros
            product_data: {
              name: `Expedition Deposit: ${tourTitle}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/booking/cancel`,
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
