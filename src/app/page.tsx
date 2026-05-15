import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { WhyUs } from "../components/WhyUs";
import { Pricing } from "../components/Pricing";
import { Cta } from "../components/Cta";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
