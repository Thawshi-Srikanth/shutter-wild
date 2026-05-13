import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getCustomerEnquiryEmail,
  getAdminEnquiryEmail,
} from "@/lib/emailTemplates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tourName, firstName, lastName, email, phone, message } = body;

    if (!tourName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail =
      process.env.EMAIL_FROM || "Shutter Wild <noreply@shutterwild.co.uk>";

    const emailPromises = [];

    // Email to customer
    const customerEmailContent = getCustomerEnquiryEmail(tourName);
    emailPromises.push(
      transporter.sendMail({
        from: fromEmail,
        to: email,
        subject: customerEmailContent.subject,
        text: customerEmailContent.text,
        html: customerEmailContent.html,
      }),
    );

    // Email to admin
    if (adminEmail) {
      const formData = {
        FirstName: firstName,
        LastName: lastName,
        EmailAddress: email,
        PhoneNumber: phone,
        Message: message,
      };

      const adminEmailContent = getAdminEnquiryEmail(tourName, formData);
      emailPromises.push(
        transporter.sendMail({
          from: fromEmail,
          to: adminEmail,
          replyTo: email,
          subject: adminEmailContent.subject,
          text: adminEmailContent.text,
          html: adminEmailContent.html,
        }),
      );
    }

    await Promise.all(emailPromises);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 },
    );
  }
}
