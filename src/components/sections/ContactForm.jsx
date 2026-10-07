"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { contactSchema } from "@/lib/contactSchema";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { getWeddingBySlug, getEventBySlug, getDestinationBySlug, } from "@/lib/content";
export function ContactForm() {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get("type");
    const refParam = searchParams.get("ref");
    const titleParam = searchParams.get("title");
    const enquiryType = ["Wedding", "Event", "Hospitality", "Other"].includes(typeParam)
        ? typeParam
        : "Wedding";
    let enquiryTitle = titleParam || "";
    if (!enquiryTitle && refParam) {
        const wedding = getWeddingBySlug(refParam);
        const event = getEventBySlug(refParam);
        const destination = getDestinationBySlug(refParam);
        enquiryTitle = wedding?.title || event?.title || destination?.title || refParam.replace(/-/g, " ");
    }
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        enquiryType,
        eventDate: "",
        estimatedGuests: "",
        cityVenue: "",
        message: enquiryTitle ? `I would like to enquire regarding "${enquiryTitle}". ` : "",
        website: "", // honeypot
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear inline error on change
        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(null);
        // Validate using Zod
        const result = contactSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path[0];
                if (!fieldErrors[key]) {
                    fieldErrors[key] = issue.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }
        setErrors({});
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                if (data.errors) {
                    const remoteErrors = {};
                    Object.entries(data.errors).forEach(([field, msgs]) => {
                        remoteErrors[field] = Array.isArray(msgs) ? msgs[0] : String(msgs);
                    });
                    setErrors(remoteErrors);
                }
                throw new Error(data.error || "Failed to submit enquiry");
            }
            setIsSuccess(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                enquiryType: "Wedding",
                eventDate: "",
                estimatedGuests: "",
                cityVenue: "",
                message: "",
                website: "",
            });
        }
        catch (err) {
            if (err instanceof Error) {
                setServerError(err.message);
            }
            else {
                setServerError("An unexpected error occurred. Please try again.");
            }
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (isSuccess) {
        return (<div className="bg-[#ffffff] border border-[#b8975a]/40 p-8 sm:p-12 text-center rounded-[2px] shadow-sm animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-full bg-[#1d3347] text-[#b8975a] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8"/>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347] mb-3">
          Enquiry Received with Discretion
        </h3>
        <p className="text-base text-[#4a5a6a] max-w-md mx-auto mb-8 font-light leading-relaxed">
          Thank you. Our senior event director has received your correspondence and will contact you within 24 hours to schedule an introductory consultation.
        </p>
        <button type="button" onClick={() => setIsSuccess(false)} className="inline-flex items-center justify-center px-6 py-3 border border-[#1d3347] text-xs font-sans tracking-[0.2em] uppercase font-medium text-[#1d3347] hover:bg-[#1d3347] hover:text-[#f7f3ec] transition-all duration-300 cursor-pointer">
          Send Another Note
        </button>
      </div>);
    }
    return (<form onSubmit={handleSubmit} noValidate className="bg-[#ffffff] border border-[#e8dfd0] p-6 sm:p-10 lg:p-12 rounded-[2px] shadow-sm space-y-6">
      {serverError && (<div role="alert" className="p-4 bg-red-50 border-l-4 border-red-800 text-red-900 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-800 mt-0.5"/>
          <span>{serverError}</span>
        </div>)}

      {/* Honeypot field (hidden from real users) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="form-website-field">Leave this empty</label>
        <input type="text" id="form-website-field" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off"/>
      </div>

      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-sans uppercase tracking-[0.15em] text-[#14202b] font-medium mb-2">
            Full Name <span className="text-[#b8975a]">*</span>
          </label>
          <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} placeholder="Lady / Lord / Mr / Ms..." aria-invalid={!!errors.name} aria-describedby={errors.name ? "error-name" : undefined} required className={`w-full px-4 py-3 bg-[#fdfbf7] border text-sm text-[#14202b] placeholder:text-[#536474]/50 focus:bg-[#ffffff] focus:outline-none focus:border-[#b8975a] transition-colors rounded-[2px] ${errors.name ? "border-red-600 bg-red-50/20" : "border-[#e8dfd0]"}`}/>
          {errors.name && (<p id="error-name" className="text-xs text-red-700 mt-1.5">
              {errors.name}
            </p>)}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-sans uppercase tracking-[0.15em] text-[#14202b] font-medium mb-2">
            Email Address <span className="text-[#b8975a]">*</span>
          </label>
          <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} placeholder="concierge@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "error-email" : undefined} required className={`w-full px-4 py-3 bg-[#fdfbf7] border text-sm text-[#14202b] placeholder:text-[#536474]/50 focus:bg-[#ffffff] focus:outline-none focus:border-[#b8975a] transition-colors rounded-[2px] ${errors.email ? "border-red-600 bg-red-50/20" : "border-[#e8dfd0]"}`}/>
          {errors.email && (<p id="error-email" className="text-xs text-red-700 mt-1.5">
              {errors.email}
            </p>)}
        </div>
      </div>

      {/* Row 2: Phone and Enquiry Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-phone" className="block text-xs font-sans uppercase tracking-[0.15em] text-[#14202b] font-medium mb-2">
            Contact Phone <span className="text-[#b8975a]">*</span>
          </label>
          <input type="tel" id="contact-phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98000 00000" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "error-phone" : undefined} required className={`w-full px-4 py-3 bg-[#fdfbf7] border text-sm text-[#14202b] placeholder:text-[#536474]/50 focus:bg-[#ffffff] focus:outline-none focus:border-[#b8975a] transition-colors rounded-[2px] ${errors.phone ? "border-red-600 bg-red-50/20" : "border-[#e8dfd0]"}`}/>
          {errors.phone && (<p id="error-phone" className="text-xs text-red-700 mt-1.5">
              {errors.phone}
            </p>)}
        </div>

        <div>
          <label htmlFor="contact-enquiry-type" className="block text-xs font-sans uppercase tracking-[0.15em] text-[#14202b] font-medium mb-2">
            Enquiry Type <span className="text-[#b8975a]">*</span>
          </label>
          <select id="contact-enquiry-type" name="enquiryType" value={formData.enquiryType} onChange={handleChange} aria-invalid={!!errors.enquiryType} aria-describedby={errors.enquiryType ? "error-enquiryType" : undefined} required className={`w-full px-4 py-3 bg-[#fdfbf7] border text-sm text-[#14202b] focus:bg-[#ffffff] focus:outline-none focus:border-[#b8975a] transition-colors rounded-[2px] ${errors.enquiryType ? "border-red-600" : "border-[#e8dfd0]"}`}>
            <option value="Wedding">Destination & Luxury Wedding</option>
            <option value="Event">Corporate Conclave / Milestone Gala</option>
            <option value="Hospitality">Curated Estate Stay & Retreat</option>
            <option value="Other">Private Dining / Other Experience</option>
          </select>
          {errors.enquiryType && (<p id="error-enquiryType" className="text-xs text-red-700 mt-1.5">
              {errors.enquiryType}
            </p>)}
        </div>
      </div>

      {/* Row 3: Event Date, Estimated Guests, City/Venue */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="contact-event-date" className="block text-xs font-sans uppercase tracking-[0.15em] text-[#14202b] font-medium mb-2">
            Target Date
          </label>
          <input type="text" id="contact-event-date" name="eventDate" value={formData.eventDate} onChange={handleChange} placeholder="e.g. Winter 2026 / Nov 15" className="w-full px-4 py-3 bg-[#fdfbf7] border border-[#e8dfd0] text-sm text-[#14202b] placeholder:text-[#536474]/50 focus:bg-[#ffffff] focus:outline-none focus:border-[#b8975a] transition-colors rounded-[2px]"/>
        </div>

        <div>
          <label htmlFor="contact-guests" className="block text-xs font-sans uppercase tracking-[0.15em] text-[#14202b] font-medium mb-2">
            Estimated Guests
          </label>
          <input type="text" id="contact-guests" name="estimatedGuests" value={formData.estimatedGuests} onChange={handleChange} placeholder="e.g. 150 – 300" className="w-full px-4 py-3 bg-[#fdfbf7] border border-[#e8dfd0] text-sm text-[#14202b] placeholder:text-[#536474]/50 focus:bg-[#ffffff] focus:outline-none focus:border-[#b8975a] transition-colors rounded-[2px]"/>
        </div>

        <div>
          <label htmlFor="contact-city-venue" className="block text-xs font-sans uppercase tracking-[0.15em] text-[#14202b] font-medium mb-2">
            City / Preferred Venue
          </label>
          <input type="text" id="contact-city-venue" name="cityVenue" value={formData.cityVenue} onChange={handleChange} placeholder="e.g. Udaipur, Lake Como, Goa" className="w-full px-4 py-3 bg-[#fdfbf7] border border-[#e8dfd0] text-sm text-[#14202b] placeholder:text-[#536474]/50 focus:bg-[#ffffff] focus:outline-none focus:border-[#b8975a] transition-colors rounded-[2px]"/>
        </div>
      </div>

      {/* Row 4: Message */}
      <div>
        <label htmlFor="contact-message" className="block text-xs font-sans uppercase tracking-[0.15em] text-[#14202b] font-medium mb-2">
          Your Vision & Expectations <span className="text-[#b8975a]">*</span>
        </label>
        <textarea id="contact-message" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Kindly share your thoughts, inspirations, expected scale, or specific requirements..." aria-invalid={!!errors.message} aria-describedby={errors.message ? "error-message" : undefined} required className={`w-full px-4 py-3 bg-[#fdfbf7] border text-sm text-[#14202b] placeholder:text-[#536474]/50 focus:bg-[#ffffff] focus:outline-none focus:border-[#b8975a] transition-colors rounded-[2px] ${errors.message ? "border-red-600 bg-red-50/20" : "border-[#e8dfd0]"}`}/>
        {errors.message && (<p id="error-message" className="text-xs text-red-700 mt-1.5">
            {errors.message}
          </p>)}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#1d3347] text-[#f7f3ec] border border-[#1d3347] hover:bg-[#142433] hover:border-[#b8975a] font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-[2px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group">
          {isSubmitting ? (<>
              <Loader2 className="w-4 h-4 mr-3 animate-spin text-[#b8975a]"/>
              Transmitting Enquiry...
            </>) : (<>
              Request Private Consultation
              <ArrowRight className="w-4 h-4 ml-3 text-[#b8975a] group-hover:translate-x-1 transition-transform"/>
            </>)}
        </button>
      </div>
    </form>);
}
