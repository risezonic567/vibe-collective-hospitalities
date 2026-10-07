import { z } from "zod";
export const contactSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Please provide your full name (minimum 2 characters)" })
        .max(100, { message: "Name is too long" }),
    email: z
        .string()
        .email({ message: "Please provide a valid email address" }),
    phone: z
        .string()
        .min(7, { message: "Please provide a valid contact number" })
        .max(25, { message: "Phone number is too long" }),
    enquiryType: z.enum(["Wedding", "Event", "Hospitality", "Other"], {
        message: "Please select an enquiry category",
    }),
    eventDate: z.string().optional(),
    estimatedGuests: z.string().optional(),
    cityVenue: z.string().optional(),
    message: z
        .string()
        .min(10, { message: "Please share a few details about your vision (minimum 10 characters)" })
        .max(3000, { message: "Message is too long (maximum 3000 characters)" }),
    // Honeypot field - must be empty
    website: z.string().max(0, { message: "Spam detected" }).optional(),
});
