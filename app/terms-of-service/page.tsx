import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for booking and participating in ShutterWild Expeditions wildlife photography tours.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen flex flex-col pt-24">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 w-full">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 uppercase text-[#1A1A1A]">
          Terms & Conditions
        </h1>
        <div className="space-y-2 text-[#1A1A1A]/80 mb-12">
          <p className="font-medium text-[#1A1A1A]">
            SHUTTERWILD EXPEDITIONS LTD
          </p>
          <p>Company Number: 17011318</p>
          <p>Registered in England & Wales</p>
        </div>

        <hr className="border-t border-[#1A1A1A]/10 mb-12" />

        <div className="prose max-w-none text-[#1A1A1A]/80">
          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            1. About Us
          </h2>
          <p className="mb-6">
            SHUTTERWILD EXPEDITIONS LTD (“ShutterWild Expeditions”, “we”, “us”,
            “our”) operates small-group wildlife photography expeditions
            worldwide.
            <br />
            By booking a tour or using our website, you agree to these Terms &
            Conditions.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            2. Booking & Contract Formation
          </h2>
          <ul className="list-none mb-6 space-y-2 pl-0">
            <li>
              <strong>2.1</strong> A booking is confirmed only once ShutterWild
              Expeditions has received the required deposit and issued written
              confirmation.
            </li>
            <li>
              <strong>2.2</strong> The person making the booking confirms they
              have authority to accept these terms on behalf of all participants
              in their party.
            </li>
            <li>
              <strong>2.3</strong> All participants must be at least 18 years
              old unless otherwise agreed in writing.
            </li>
          </ul>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            3. Payments
          </h2>
          <ul className="list-none mb-6 space-y-2 pl-0">
            <li>
              <strong>3.1</strong> A non-refundable deposit is required to
              secure your place.
            </li>
            <li>
              <strong>3.2</strong> The remaining balance must be paid by the
              deadline stated on your invoice (typically 60 days prior to
              departure).
            </li>
            <li>
              <strong>3.3</strong> Failure to pay the balance by the due date
              may result in cancellation of your booking and forfeiture of
              deposit.
            </li>
            <li>
              <strong>3.4</strong> Prices are quoted in GBP (£) unless otherwise
              stated.
            </li>
            <li>
              <strong>3.5</strong> Any bank charges, card fees, or currency
              conversion costs are the responsibility of the participant.
            </li>
          </ul>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            4. Participant Cancellation
          </h2>
          <p className="mb-4">
            If you cancel your booking, the following charges apply:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>More than 90 days before departure – Deposit retained</li>
            <li>60–89 days before departure – 50% of total tour price</li>
            <li>30–59 days before departure – 75% of total tour price</li>
            <li>
              Less than 30 days before departure – 100% of total tour price
            </li>
          </ul>
          <p className="mb-6 mt-4">
            All cancellations must be made in writing.
            <br />
            ShutterWild Expeditions strongly recommends comprehensive travel
            insurance at the time of booking.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            5. Changes or Cancellation by ShutterWild Expeditions
          </h2>
          <p className="mb-4">
            ShutterWild Expeditions reserves the right to cancel or amend a tour
            due to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Insufficient bookings</li>
            <li>Safety concerns</li>
            <li>Government restrictions</li>
            <li>
              Force majeure events (natural disasters, pandemics, civil unrest,
              etc.)
            </li>
          </ul>
          <p className="mb-4 mt-4">
            If ShutterWild Expeditions cancels a tour, participants will be
            offered:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              A full refund of payments made to ShutterWild Expeditions, or
            </li>
            <li>The option to transfer to a future expedition.</li>
          </ul>
          <p className="mb-6 mt-4">
            ShutterWild Expeditions is not responsible for costs incurred
            outside of the booking (e.g., flights, visas, insurance).
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            6. Itinerary Changes
          </h2>
          <p className="mb-6">
            Wildlife expeditions are dynamic and subject to natural conditions.
            <br />
            ShutterWild Expeditions reserves the right to adjust itineraries,
            accommodation, hide sessions, or daily schedules in the interest of
            safety, logistics, or improving photographic opportunities.
            <br />
            Such changes do not constitute grounds for compensation.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            7. Wildlife & Photography Conditions
          </h2>
          <ul className="list-none mb-6 space-y-2 pl-0">
            <li>
              <strong>7.1</strong> Wildlife sightings cannot be guaranteed.
            </li>
            <li>
              <strong>7.2</strong> Photography success depends on weather,
              natural behaviour, and seasonal conditions.
            </li>
            <li>
              <strong>7.3</strong> All expeditions operate under ethical
              wildlife guidelines.
            </li>
          </ul>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            8. Travel Insurance (Mandatory)
          </h2>
          <p className="mb-4">
            All participants must hold comprehensive travel insurance covering:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Trip cancellation</li>
            <li>Medical expenses</li>
            <li>Emergency evacuation</li>
            <li>Personal liability</li>
            <li>Photography equipment</li>
          </ul>
          <p className="mb-6 mt-4">
            Proof of insurance may be requested prior to departure.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            9. Health & Fitness
          </h2>
          <p className="mb-4">
            Participants must ensure they are physically fit and medically
            capable of participating.
            <br />
            Some tours involve:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Cold climates</li>
            <li>Uneven terrain</li>
            <li>Early mornings</li>
            <li>Remote locations</li>
          </ul>
          <p className="mb-6 mt-4">
            It is the participant’s responsibility to disclose any medical
            conditions that may affect participation.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            10. Participant Conduct
          </h2>
          <p className="mb-4">Participants must:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Follow guide instructions</li>
            <li>Respect wildlife and habitats</li>
            <li>
              Act respectfully toward accommodation providers and fellow
              participants
            </li>
          </ul>
          <p className="mb-6 mt-4">
            ShutterWild Expeditions reserves the right to remove any participant
            whose behaviour endangers safety or disrupts the group. No refund
            will be issued in such circumstances.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            11. Liability
          </h2>
          <p className="mb-4">
            Participation in wildlife expeditions involves inherent risks.
            <br />
            SHUTTERWILD EXPEDITIONS LTD shall not be liable for:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Injury or illness</li>
            <li>Loss or damage to personal belongings or camera equipment</li>
            <li>Travel delays or cancellations</li>
            <li>Events beyond our reasonable control</li>
          </ul>
          <p className="mb-6 mt-4">
            Nothing in these Terms limits liability for death or personal injury
            caused by negligence.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            12. Image Usage
          </h2>
          <p className="mb-6">
            Participants retain copyright of their own images.
            <br />
            By participating, you grant ShutterWild Expeditions permission to
            use behind-the-scenes images or group photographs for promotional
            purposes unless you notify us otherwise in writing.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            13. Data Protection
          </h2>
          <p className="mb-6">
            Personal data is processed in accordance with the ShutterWild
            Expeditions Privacy Policy.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            14. Governing Law
          </h2>
          <p className="mb-6">
            These Terms are governed by the laws of England and Wales.
            <br />
            Any disputes shall be subject to the exclusive jurisdiction of the
            English courts.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            15. Assumption of Risk & Participant Acknowledgement
          </h2>
          <div className="mb-6">
            <p className="mb-4">
              <strong>15.1</strong> Participants acknowledge that wildlife
              photography expeditions may involve inherent risks including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Travel in remote or wilderness environments</li>
              <li>Extreme weather conditions</li>
              <li>Uneven or hazardous terrain</li>
              <li>Wildlife encounters</li>
              <li>Transportation by third-party providers</li>
            </ul>
            <ul className="list-none space-y-2 pl-0 mt-4">
              <li>
                <strong>15.2</strong> Participants voluntarily assume all risks
                associated with participation.
              </li>
              <li>
                <strong>15.3</strong> Participation is undertaken at the
                participant’s own discretion and risk.
              </li>
            </ul>
          </div>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            16. Limitation of Liability
          </h2>
          <div className="mb-6">
            <p className="mb-4">
              <strong>16.1</strong> SHUTTERWILD EXPEDITIONS LTD may engage
              third-party suppliers (accommodation providers, transport
              operators, hide operators, local guides).
            </p>
            <p className="mb-4">
              <strong>16.2</strong> SHUTTERWILD EXPEDITIONS LTD shall not be
              liable for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Acts or omissions of third-party providers</li>
              <li>Loss, theft, or damage to photography equipment</li>
              <li>Flight disruptions or airline insolvency</li>
              <li>Government travel restrictions</li>
              <li>Force majeure events beyond reasonable control</li>
            </ul>
            <ul className="list-none space-y-2 pl-0 mt-4">
              <li>
                <strong>16.3</strong> Liability, where legally applicable, shall
                be limited to the total amount paid for the expedition.
              </li>
              <li>
                <strong>16.4</strong> Nothing excludes liability for death or
                personal injury caused by negligence.
              </li>
            </ul>
          </div>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            17. UK Package Travel Regulations
          </h2>
          <p className="mb-4">
            Where a booking constitutes a “package” under The Package Travel and
            Linked Travel Arrangements Regulations 2018, SHUTTERWILD EXPEDITIONS
            LTD will provide services in accordance with those regulations.
            <br />
            Participants are responsible for:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Passport validity</li>
            <li>Visa requirements</li>
            <li>Health documentation</li>
            <li>Vaccinations</li>
          </ul>
          <p className="mb-6 mt-4">
            Unless explicitly stated, flights are not included and are arranged
            independently by participants.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            18. Participant Release
          </h2>
          <p className="mb-4">By confirming a booking, participants:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Confirm they understand the physical demands of the expedition
            </li>
            <li>Confirm they hold valid insurance</li>
            <li>
              Release SHUTTERWILD EXPEDITIONS LTD from claims arising from risks
              inherent in wildlife expeditions
            </li>
            <li>
              Accept that itineraries may change due to safety or environmental
              factors
            </li>
          </ul>
          <p className="mb-12 mt-4 font-medium">
            This acknowledgement forms part of the legally binding agreement
            between the participant and SHUTTERWILD EXPEDITIONS LTD.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
