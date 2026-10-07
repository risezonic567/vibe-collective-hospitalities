import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contactSchema";
// In-memory rate limiter per IP: max 5 requests per 60 seconds
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
function isRateLimited(ip) {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (!record) {
        rateLimitMap.set(ip, { count: 1, firstRequest: now });
        return false;
    }
    if (now - record.firstRequest > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, firstRequest: now });
        return false;
    }
    record.count += 1;
    return record.count > MAX_REQUESTS_PER_WINDOW;
}
export async function POST(req) {
    try {
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "127.0.0.1";
        if (isRateLimited(ip)) {
            return NextResponse.json({
                success: false,
                error: "Too many enquiries submitted. Please wait a moment or call our concierge directly.",
            }, { status: 429 });
        }
        let body;
        try {
            body = await req.json();
        }
        catch {
            return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
        }
        // Check honeypot field
        if (typeof body === "object" && body !== null && "website" in body) {
            const hp = body.website;
            if (hp && String(hp).trim().length > 0) {
                return NextResponse.json({ success: false, error: "Spam submission detected" }, { status: 400 });
            }
        }
        const parseResult = contactSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json({
                success: false,
                error: "Validation failed",
                errors: parseResult.error.flatten().fieldErrors,
            }, { status: 400 });
        }
        const data = parseResult.data;
        // Check if SMTP environment variables are configured
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const mailFrom = process.env.MAIL_FROM || "info.vicoh@gmail.com";
        const mailTo = process.env.MAIL_TO || "info.vicoh@gmail.com";
        if (smtpHost && smtpUser && smtpPass) {
            try {
                const transporter = nodemailer.createTransport({
                    host: smtpHost,
                    port: smtpPort,
                    secure: smtpPort === 465,
                    auth: {
                        user: smtpUser,
                        pass: smtpPass,
                    },
                });
                await transporter.sendMail({
                    from: `"Vibe Collective Concierge" <${mailFrom}>`,
                    to: mailTo,
                    replyTo: data.email,
                    subject: `[Bespoke Enquiry] ${data.enquiryType}: ${data.name}`,
                    text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Type: ${data.enquiryType}
Event Date: ${data.eventDate || "Not specified"}
Guests: ${data.estimatedGuests || "Not specified"}
City/Venue: ${data.cityVenue || "Not specified"}

Message:
${data.message}
          `.trim(),
                    html: `
            <div style="font-family: serif; color: #1d3347; max-width: 600px; padding: 20px;">
              <h2 style="color: #b8975a; border-bottom: 1px solid #b8975a; padding-bottom: 10px;">New Bespoke Celebration Enquiry</h2>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Enquiry Type:</strong> ${data.enquiryType}</p>
              <p><strong>Proposed Date:</strong> ${data.eventDate || "Flexible / Not specified"}</p>
              <p><strong>Estimated Guests:</strong> ${data.estimatedGuests || "To be discussed"}</p>
              <p><strong>Desired City / Destination:</strong> ${data.cityVenue || "Not specified"}</p>
              <h3 style="color: #1d3347; margin-top: 20px;">Message & Vision:</h3>
              <p style="white-space: pre-wrap; background: #f7f3ec; padding: 15px; border-left: 3px solid #b8975a;">${data.message}</p>
            </div>
          `,
                });
            }
            catch (mailErr) {
                console.error("Nodemailer dispatch error:", mailErr);
                // We log error but don't fail the user if local SMTP fails
            }
        }
        else {
            // In development / demo mode: log sanitized summary to console
            console.log("=== [DEMO ENQUIRY DISPATCHED] ===");
            console.log({
                name: data.name,
                email: data.email,
                phone: data.phone,
                type: data.enquiryType,
                date: data.eventDate,
                guests: data.estimatedGuests,
                cityVenue: data.cityVenue,
                messageSnippet: data.message.slice(0, 80) + "...",
            });
            console.log("=================================");
        }
        return NextResponse.json({
            success: true,
            message: "Thank you for contacting Vibe Collective. Our senior event director will review your enquiry and connect with you within 24 hours.",
        });
    }
    catch (error) {
        console.error("Contact API unexpected error:", error);
        return NextResponse.json({ success: false, error: "An unexpected error occurred. Please try again." }, { status: 500 });
    }
}
