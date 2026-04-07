import Stripe from "stripe";

export const getCustomerBookingEmail = (
  tour: any,
  session: Stripe.Checkout.Session,
) => {
  const subject = `Booking Confirmed: ${tour.title} Expedition`;

  const text = `Dear Photographer,\n\nThank you for booking the "${tour.title}" expedition with Shutter Wild!\n\nYour spot is securely confirmed.\n\nAmount Paid: ${(session.amount_total || 0) / 100} ${session.currency?.toUpperCase() || "GBP"}\n\nWe will be in touch with further details shortly.\n\nBest regards,\nThe Shutter Wild Team`;

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F4F0; font-family: Helvetica, Arial, sans-serif; color: #1A1A1A;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#F4F4F0">
        <tr>
            <td align="center" style="padding: 40px 15px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #e0e0e0; max-width: 600px; width: 100%;">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color: #1A1A1A; padding: 40px 20px;">
                            <h1 style="color: #F4F4F0; font-family: Georgia, serif; margin: 0; font-size: 28px; font-weight: normal; letter-spacing: 2px;">SHUTTER WILD</h1>
                            <p style="color: #aaaaaa; margin: 10px 0 0 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Expeditions</p>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="font-family: Georgia, serif; font-size: 24px; margin-top: 0; margin-bottom: 20px; font-weight: normal; color: #1A1A1A;">Booking Confirmed</h2>
                            <p style="line-height: 1.6; margin-bottom: 25px; font-size: 15px; color: #333333;">Dear Photographer,</p>
                            <p style="line-height: 1.6; margin-bottom: 25px; font-size: 15px; color: #333333;">Thank you for securing your spot on the <strong>${tour.title}</strong> expedition. We are thrilled to have you join us.</p>
                            
                            <!-- Details Table -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="15" style="background-color: #F4F4F0; margin-bottom: 25px;">
                                <tr>
                                    <td style="border-bottom: 1px solid #dddddd;">
                                        <span style="font-size: 11px; color: #666666; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Expedition</span>
                                        <strong style="color: #1A1A1A;">${tour.title}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span style="font-size: 11px; color: #666666; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Amount Paid</span>
                                        <strong style="color: #1A1A1A;">${(session.amount_total || 0) / 100} ${session.currency?.toUpperCase() || "GBP"}</strong>
                                    </td>
                                </tr>
                            </table>

                            <p style="line-height: 1.6; margin-bottom: 25px; font-size: 15px; color: #333333;">We will be in touch shortly with a detailed itinerary, packing lists, and pre-departure information. Make sure you check our important documentation regarding travel insurance and camera gear policies on our website.</p>
                            <p style="line-height: 1.6; margin-bottom: 0; font-size: 15px; color: #333333;">Best regards,<br><br><strong style="color: #1A1A1A;">The Shutter Wild Team</strong></p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #F4F4F0; border-top: 1px solid #eeeeee; padding: 20px; font-size: 12px; color: #888888; font-family: Helvetica, Arial, sans-serif;">
                            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Shutter Wild. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;

  return { subject, text, html };
};

export const getAdminBookingEmail = (
  tour: any,
  session: Stripe.Checkout.Session,
) => {
  const subject = `New Booking Received: ${tour.title}`;

  const text = `A new booking has been made!\n\nTour: ${tour.title}\nCustomer Email: ${session.customer_details?.email || "Not provided"}\nAmount: ${(session.amount_total || 0) / 100} ${session.currency?.toUpperCase() || "GBP"}\nStripe Session ID: ${session.id}\n\n${Object.entries(
    session.metadata || {},
  )
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n")}\n\nPlease check the admin dashboard for more details.`;

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9; font-family: Helvetica, Arial, sans-serif; color: #333333;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f9f9f9">
        <tr>
            <td align="center" style="padding: 40px 15px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #dddddd; border-top: 4px solid #1A1A1A;">
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="margin-top: 0; margin-bottom: 20px; font-size: 20px; color: #1A1A1A;">New Booking Alert</h2>
                            <p style="margin-bottom: 20px; color: #333333;">A new payment was successfully captured via Stripe.</p>
                            
                            <table width="100%" border="0" cellspacing="0" cellpadding="12" style="background-color: #F4F4F0; margin-bottom: 20px;">
                                <tr>
                                    <td width="30%" style="border-bottom: 1px solid #e0e0e0; color: #666666; font-size: 13px;"><strong>Expedition:</strong></td>
                                    <td width="70%" style="border-bottom: 1px solid #e0e0e0; color: #1A1A1A;"><strong>${tour.title}</strong></td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 1px solid #e0e0e0; color: #666666; font-size: 13px;"><strong>Date:</strong></td>
                                    <td style="border-bottom: 1px solid #e0e0e0; color: #1A1A1A;">${tour.date}</td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 1px solid #e0e0e0; color: #666666; font-size: 13px;"><strong>Customer Email:</strong></td>
                                    <td style="border-bottom: 1px solid #e0e0e0; color: #1A1A1A;"><a href="mailto:${session.customer_details?.email || ""}" style="color: #1A1A1A;">${session.customer_details?.email || "Not provided"}</a></td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 1px solid #e0e0e0; color: #666666; font-size: 13px;"><strong>Amount Paid:</strong></td>
                                    <td style="border-bottom: 1px solid #e0e0e0; color: #1A1A1A;">${(session.amount_total || 0) / 100} ${session.currency?.toUpperCase() || "GBP"}</td>
                                </tr>
                                ${Object.entries(session.metadata || {})
                                  .filter(
                                    ([key]) =>
                                      key !== "tourId" && key !== "tourSlug",
                                  )
                                  .map(
                                    ([key, value]) => `
                                <tr>
                                    <td style="border-bottom: 1px solid #e0e0e0; color: #666666; font-size: 13px;"><strong>${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:</strong></td>
                                    <td style="border-bottom: 1px solid #e0e0e0; color: #1A1A1A;">${value}</td>
                                </tr>
                                `,
                                  )
                                  .join("")}
                                <tr>
                                    <td style="color: #666666; font-size: 13px;"><strong>Stripe Session:</strong></td>
                                    <td style="font-size: 12px; color: #888888;">${session.id}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;

  return { subject, text, html };
};
