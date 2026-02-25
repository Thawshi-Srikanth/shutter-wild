import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Shutter Wild - Expeditions",
  description: "Terms of Service for Shutter Wild Expeditions LTD.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen flex flex-col pt-24">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 w-full">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
          Terms of Service
        </h1>
        <div className="prose max-w-none text-[#1A1A1A]/80">
          <p className="mb-4">
            <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
          </p>
          <p className="mb-6">
            Welcome to Shutter Wild Expeditions LTD. By accessing this website,
            we assume you accept these terms and conditions. Do not continue to
            use our website if you do not agree to take all of the terms and
            conditions stated on this page.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            License
          </h2>
          <p className="mb-6">
            Unless otherwise stated, Shutter Wild Expeditions LTD and/or its
            licensors own the intellectual property rights for all material on
            the site. All intellectual property rights are reserved. You may
            access this from the website for your own personal use subjected to
            restrictions set in these terms and conditions.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            User Responsibilities
          </h2>
          <p className="mb-6">As a user of this website, you agree not to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              Republish material from Shutter Wild Expeditions LTD without
              permission.
            </li>
            <li>Sell, rent, or sub-license material from the website.</li>
            <li>Reproduce, duplicate or copy material from the site.</li>
            <li>Redistribute content from Shutter Wild Expeditions LTD.</li>
          </ul>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            Booking Expeditions
          </h2>
          <p className="mb-6">
            By booking a wildlife photography expedition with us, you agree to
            our specific booking terms, cancellation policies, and field
            guidelines, which are provided separately upon inquiry or booking
            confirmation.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
