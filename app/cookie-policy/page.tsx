import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cookie Policy | Shutter Wild - Expeditions",
  description: "Cookie Policy for Shutter Wild Expeditions LTD.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen flex flex-col pt-24">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 w-full">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
          Cookie Policy
        </h1>
        <div className="prose max-w-none text-[#1A1A1A]/80">
          <p className="mb-4">
            <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
          </p>
          <p className="mb-6">
            This Cookie Policy explains what cookies are and how we use them.
            You should read this policy so you can understand what type of
            cookies we use, or the information we collect using cookies and how
            that information is used.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            What are cookies?
          </h2>
          <p className="mb-6">
            Cookies are small text files that are stored on your computer or
            mobile device when you visit a website. They are widely used in
            order to make websites work, or work more efficiently, as well as to
            provide information to the owners of the site.
          </p>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            How do we use cookies?
          </h2>
          <p className="mb-6">
            We use cookies for a variety of reasons detailed below.
            Unfortunately, in most cases, there are no industry standard options
            for disabling cookies without completely disabling the functionality
            and features they add to this site.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Essential Cookies:</strong> These cookies are essential to
              provide you with services available through our website and to
              enable you to use some of its features.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> These cookies are used to
              collect information about traffic to our website and how users use
              our website. The information gathered does not identify any
              individual visitor.
            </li>
            <li>
              <strong>Preference Cookies:</strong> These cookies allow our
              website to remember choices you make when you use our website,
              such as remembering your login details or language preference.
            </li>
          </ul>

          <h2 className="font-serif text-2xl mt-12 mb-4 text-[#1A1A1A]">
            Managing Cookies
          </h2>
          <p className="mb-6">
            If you prefer to avoid the use of cookies on the website, first you
            must disable the use of cookies in your browser and then delete the
            cookies saved in your browser associated with this website. You may
            use this option for preventing the use of cookies at any time.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
