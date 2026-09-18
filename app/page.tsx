import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FleetSection } from "@/components/home/FleetSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CategorySection } from "@/components/home/CategorySection";
import { ReviewSection } from "@/components/home/ReviewSection";
import { FAQSection } from "@/components/home/FAQSection";
import { ConsultSection } from "@/components/home/ConsultSection";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <FleetSection />
      <ProcessSection />
      <CategorySection />
      <ReviewSection />
      <FAQSection />
      <ConsultSection />
    </>
  );
}
