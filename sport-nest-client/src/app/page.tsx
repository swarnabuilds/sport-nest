import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import PopularSports from "@/components/PopularSports";
import FeaturedFacilities from "@/components/FeaturedFacilities";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
         <Navbar />
        <HeroBanner />
        <PopularSports />
        <FeaturedFacilities />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
        <Footer />
    </div>
     
  );
}
