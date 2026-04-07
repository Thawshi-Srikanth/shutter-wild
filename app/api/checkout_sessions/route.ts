import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      amount,
      tourTitle,
      tourDate,
      tourImage,
      customerEmail,
      tourId,
      tourSlug,
      formData,
    } = body;

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

    if (imageUrl) {
      // Stripe requires proper URL encoding (e.g. for spaces and non-ASCII chars)
      imageUrl = encodeURI(imageUrl);
    }

    if (imageUrl.includes("localhost") || imageUrl.includes("127.0.0.1")) {
      imageUrl = ""; // Clear to undefined to pass Stripe validation
    }

    // Amount is passed in as the raw deposit number (e.g., 450)
    // Stripe expects the amount in cents
    const amountInCents = Math.round(amount * 100);

    const cleanMetadata: Record<string, any> = {};
    if (formData) {
      if (formData.firstName) {
        cleanMetadata.Participant =
          `${formData.title || ""} ${formData.firstName} ${formData.lastName || ""}`.trim();
      }
      cleanMetadata.Mobile = formData.mobile;
      if (formData.street) {
        const addrTokens = [
          formData.houseName,
          formData.street,
          formData.city,
          formData.county,
          formData.postCode,
          formData.country,
        ].filter(Boolean);
        cleanMetadata.Address = addrTokens.join(", ");
      }

      if (formData.emFirstName) {
        cleanMetadata.EmergencyContact =
          `${formData.emTitle || ""} ${formData.emFirstName} ${formData.emLastName || ""} (${formData.emRelationship || ""})`.trim();
        cleanMetadata.EmDayPhone = formData.emDayPhone;
        cleanMetadata.EmEveningPhone = formData.emEveningPhone;
      }

      if (formData.emStreet) {
        const emAddrTokens = [
          formData.emHouseName,
          formData.emStreet,
          formData.emCity,
          formData.emCounty,
          formData.emPostCode,
          formData.emCountry,
        ].filter(Boolean);
        cleanMetadata.EmAddress = emAddrTokens.join(", ");
      }

      cleanMetadata.SingleSupplement = formData.singleSupplement ? "Yes" : "No";
      if (formData.dietary) cleanMetadata.Dietary = formData.dietary;
      if (formData.medical) cleanMetadata.MedicalInfo = formData.medical;
    }

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
      allow_promotion_codes: true,
      customer_email: customerEmail,
      metadata: {
        tourId: String(tourId || tourTitle).substring(0, 40),
        tourSlug: String(tourSlug || "").substring(0, 40),
        ...Object.fromEntries(
          Object.entries(cleanMetadata)
            .filter(([_, v]) => v !== null && v !== undefined && v !== "")
            .slice(0, 48)
            .map(([k, v]) => [k.substring(0, 40), String(v).substring(0, 500)]),
        ),
      },
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
