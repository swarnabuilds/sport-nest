import HeroBanner from "../../components/HeroBanner";
import PopularSports from "@/components/PopularSports";
import FeaturedFacilities from "@/components/FeaturedFacilities";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div>
         
        <HeroBanner />
        <PopularSports />
        <FeaturedFacilities />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
    </div>
     
  );
}
