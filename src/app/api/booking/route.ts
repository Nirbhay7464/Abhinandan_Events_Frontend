import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      preferredContact,
      eventType,
      guestCount,
      eventDate,
      budget,
      venue,
      notes,
    } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, message: "Full name and email required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    /* ==================================================
       1️⃣ EMAIL TO ADMIN (Styled Template)
    ================================================== */

    await transporter.sendMail({
      from: `"Abhinandan Events" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🎉 New Booking Inquiry Received",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f8f6f1; padding:40px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; padding:40px; border-radius:12px;">
            
            <h2 style="color:#000; margin-bottom:20px;">New Booking Inquiry</h2>

            <table style="width:100%; border-collapse:collapse;">
              <tr><td style="padding:8px 0;"><strong>Name:</strong></td><td>${fullName}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Phone:</strong></td><td>${phone || "-"}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Preferred Contact:</strong></td><td>${preferredContact || "-"}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Event Type:</strong></td><td>${eventType || "-"}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Date:</strong></td><td>${eventDate || "-"}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Guests:</strong></td><td>${guestCount || "-"}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Budget:</strong></td><td>${budget || "-"}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Venue:</strong></td><td>${venue || "-"}</td></tr>
            </table>

            <div style="margin-top:30px;">
              <strong>Additional Notes:</strong>
              <p style="background:#f4f4f4; padding:15px; border-radius:8px;">
                ${notes || "No additional notes provided."}
              </p>
            </div>

            <p style="margin-top:30px; font-size:12px; color:#999;">
              Sent from Abhinandan Events website.
            </p>

          </div>
        </div>
      `,
    });

    /* ==================================================
       2️⃣ AUTO-REPLY EMAIL TO CLIENT
    ================================================== */

    await transporter.sendMail({
      from: `"Abhinandan Events" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✨ We've Received Your Inquiry",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f8f6f1; padding:40px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; padding:40px; border-radius:12px;">
            
            <h2 style="color:#000;">Hello ${fullName},</h2>

            <p style="margin-top:20px; font-size:15px; line-height:1.6; color:#444;">
              Thank you for reaching out to <strong>Abhinandan Events</strong>.
            </p>

            <p style="font-size:15px; line-height:1.6; color:#444;">
              We have successfully received your booking inquiry and our team is reviewing your details.
            </p>

            <p style="font-size:15px; line-height:1.6; color:#444;">
              You can expect a response from us within <strong>24 hours</strong>.
            </p>

            <div style="margin-top:30px; padding:20px; background:#f4f4f4; border-radius:8px;">
              <strong>Your Submitted Details:</strong>
              <p style="margin:10px 0 0 0;">
                Event: ${eventType || "-"} <br/>
                Date: ${eventDate || "-"} <br/>
                Guests: ${guestCount || "-"}
              </p>
            </div>

            <p style="margin-top:30px; font-size:14px; color:#666;">
              Warm regards,<br/>
              <strong>Abhinandan Events Team</strong>
            </p>

          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Booking submitted successfully",
    });

  } catch (error) {
    console.error("❌ Booking error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit booking" },
      { status: 500 }
    );
  }
}