export const dynamic = "force-dynamic";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrustBand } from "@/components/home/TrustBand";
import { FleetSection } from "@/components/home/FleetSection";
import { PromoSection } from "@/components/home/PromoSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CategorySection } from "@/components/home/CategorySection";
import { ReviewSection } from "@/components/home/ReviewSection";
import { CTABanner } from "@/components/home/CTABanner";
import { FAQSection } from "@/components/home/FAQSection";
import { ConsultSection } from "@/components/home/ConsultSection";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <TrustBand />
      <FleetSection />
      <PromoSection />
      <ProcessSection />
      <CategorySection />
      <ReviewSection />
      <CTABanner />
      <FAQSection />
      <ConsultSection />
    </>
  );
}
