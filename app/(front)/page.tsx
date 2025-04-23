import Brands from "@/components/Frontend/Brands";
import Hero from "@/components/Frontend/Hero";
import TabbedSection from "@/components/Frontend/TabbedSection";
// import Image from "next/image";

export default function Home() {
  return (
    <section>
      <Hero />
      <Brands />
      <TabbedSection />
    </section>
  );
}
