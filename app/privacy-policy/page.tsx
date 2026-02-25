import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Shutter Wild - Expeditions",
  description: "Privacy Policy for Shutter Wild Expeditions LTD.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col pt-24">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 w-full">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
          Privacy Policy
        </h1>
        <div className="prose max-w-none text-[#1A1A1A]/80 marker:text-[#1A1A1A]">
          <p className="mb-4">
            <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
          </p>
          <p className="mb-6">
            At Shutter Wild Expeditions LTD, accessible from our website, one of
            our main priorities is the privacy of our visitors. This Privacy
            Policy document contains types of information that is collected and
            recorded by us and how we use it.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            Information We Collect
          </h2>
          <p className="mb-6">
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            How We Use Your Information
          </h2>
          <p className="mb-6">
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>
              Communicate with you, either directly or through one of our
              partners, including for customer service, to provide you with
              updates and other information relating to the website, and for
              marketing and promotional purposes
            </li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            Log Files
          </h2>
          <p className="mb-6">
            Shutter Wild Expeditions LTD follows a standard procedure of using
            log files. These files log visitors when they visit websites. All
            hosting companies do this and a part of hosting services&apos;
            analytics. The information collected by log files include internet
            protocol (IP) addresses, browser type, Internet Service Provider
            (ISP), date and time stamp, referring/exit pages, and possibly the
            number of clicks.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
