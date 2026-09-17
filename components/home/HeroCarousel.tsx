import { prisma } from "@/lib/prisma";
import { HeroCarouselClient } from "./HeroCarouselClient";

export async function HeroCarousel() {
  const banners = await prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return <HeroCarouselClient banners={banners} />;
}
