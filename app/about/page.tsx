import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F0] selection:bg-[#2C3E2E] selection:text-white">
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12 lg:px-24 text-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2C3E2E] mb-6 block">
            [ About ShutterWild Expeditions ]
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-12">
            ABOUT US
          </h1>

          <div className="space-y-8 text-lg md:text-xl text-[#1A1A1A]/80 leading-relaxed font-light">
            <p>
              <strong className="font-medium text-[#1A1A1A]">
                ShutterWild Expeditions Ltd
              </strong>{" "}
              was founded with a simple vision — to create immersive wildlife
              photography journeys built around ethical encounters, fieldcraft
              knowledge, and meaningful storytelling.
            </p>
            <p>
              Led by award-recognised wildlife photographer Thinesh
              Thirugnanasampanthar, our expeditions are designed for
              photographers who want more than just sightings — they want
              understanding, positioning, behaviour, light, and decisive
              moments.
            </p>
            <p>
              We operate in carefully selected locations across Europe, Asia,
              and beyond — from Arctic raptors in winter landscapes to big cats
              in remote wilderness habitats. Every expedition is intentionally
              small in group size, allowing for personalised guidance, stronger
              photographic opportunities, and a deeper connection with the
              environment.
            </p>
            <blockquote className="border-l-4 border-[#2C3E2E] pl-6 py-2 my-12 italic text-2xl font-serif text-[#1A1A1A]">
              &quot;Our focus is not volume tourism. It is quality, patience,
              and ethical wildlife photography.&quot;
            </blockquote>
            <p>
              Whether you are refining your portfolio, working toward
              distinctions, or simply passionate about wildlife, ShutterWild
              Expeditions offers:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-base md:text-lg">
              <li>Small, curated groups</li>
              <li>Professional photographic guidance in the field</li>
              <li>Ethical wildlife practices</li>
              <li>Carefully planned logistics and local expertise</li>
              <li>Opportunities to capture portfolio-level images</li>
            </ul>
            <p className="pt-8 font-serif text-2xl italic text-[#1A1A1A]">
              This is not just a tour. It is a photographic experience designed
              with intention.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
