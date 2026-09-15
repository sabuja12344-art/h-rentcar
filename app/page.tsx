import { HeroSection } from "@/components/home/HeroSection";
import { FleetSection } from "@/components/home/FleetSection";
import { CategorySection } from "@/components/home/CategorySection";
import { ConsultSection } from "@/components/home/ConsultSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FleetSection />
      <CategorySection />
      <ConsultSection />
    </>
  );
}
