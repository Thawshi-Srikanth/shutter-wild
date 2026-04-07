import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getCustomerContactEmail,
  getAdminContactEmail,
} from "@/lib/emailTemplates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    if (!email || !firstName) {
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
      process.env.EMAIL_FROM || "Shutter Wild <noreply@shutter-wild.com>";

    const emailPromises = [];

    // Email to customer
    const customerEmailContent = getCustomerContactEmail(firstName);
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
        Subject: subject,
        Message: message,
      };

      const adminEmailContent = getAdminContactEmail(formData);
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
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 },
    );
  }
}
