"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#1A1A1A]">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 block">
          [ Get In Touch ]
        </span>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium mb-6">
          Reach{" "}
          <span className="font-bold border-b-2 border-black pb-2">OUT.</span>
        </h1>
        <p className="max-w-2xl text-lg text-gray-600 leading-relaxed font-sans">
          Whether you have a question about an upcoming expedition, wish to
          discuss custom private tours, or simply want to share your passion for
          wildlife along with a story, we&apos;d love to hear from you.
        </p>
      </section>

      {/* Contact Content */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Contact Details */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-black/5 p-4 rounded-full">
                  <Mail className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-medium mb-1">
                    Email Us
                  </h3>
                  <p className="text-gray-600 mb-2">
                    For general inquiries and booking.
                  </p>
                  <Link
                    href="mailto:hello@shutterwild.com"
                    className="font-bold hover:Stext-gray-500 transition-colors"
                  >
                    hello@shutterwild.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black/5 p-4 rounded-full">
                  <Phone className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-medium mb-1">
                    Call Us
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Mon-Fri from 9am to 6pm GMT.
                  </p>
                  <Link
                    href="tel:+447557763222"
                    className="font-bold hover:text-gray-500 transition-colors"
                  >
                    07557 763222
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black/5 p-4 rounded-full">
                  <MapPin className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-medium mb-1">
                    Visiting
                  </h3>
                  <p className="text-gray-600 mb-2">
                    We operate globally, but our HQ is in.
                  </p>
                  <address className="not-italic font-bold">
                    London, United Kingdom
                  </address>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-black/10">
              <h3 className="font-serif text-2xl font-medium mb-6">Socials</h3>
              <div className="flex gap-4">
                <Link
                  href="https://www.facebook.com/thinesht"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1A1A1A] text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </Link>
                <Link
                  href="https://www.instagram.com/thineshtphotography"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1A1A1A] text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm">
            <h2 className="font-serif text-3xl mb-8 font-medium">
              Send a Message
            </h2>
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-[#2C3E2E]/10 p-4 rounded-full mb-6">
                  <CheckCircle2 className="w-12 h-12 text-[#2C3E2E]" />
                </div>
                <h3 className="font-serif text-3xl mb-4">Message Sent</h3>
                <p className="text-gray-600 max-w-sm mb-8">
                  Your message is received. Thank you for contacting us! We will
                  get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="firstName"
                      className="text-xs font-bold uppercase tracking-wider text-gray-500"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-bold uppercase tracking-wider text-gray-500"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold uppercase tracking-wider text-gray-500"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="text-xs font-bold uppercase tracking-wider text-gray-500"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-xs font-bold uppercase tracking-wider text-gray-500"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors appearance-none"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="expedition">Expedition Inquiry</option>
                    <option value="private">Private Custom Tour</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold uppercase tracking-wider text-gray-500"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-4 bg-[#2C3E2E] text-white px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#1A261C] transition-colors self-start flex items-center gap-3 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
