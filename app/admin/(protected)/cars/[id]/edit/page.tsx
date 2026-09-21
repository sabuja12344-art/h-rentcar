export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarForm } from "@/components/admin/CarForm";
import { updateCar } from "@/app/actions/cars";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  return { title: car ? `${car.name} 수정 | 어드민` : "차량 없음 | 어드민" };
}

export default async function AdminEditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });

  if (!car) notFound();

  const boundAction = updateCar.bind(null, car.id);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/cars" className="text-ink-dim hover:text-ink transition-colors text-[13px]">
          ← 차량 목록
        </Link>
        <span className="text-ink-dim">/</span>
        <h1 className="text-[20px] font-black">{car.name} 수정</h1>
      </div>
      <CarForm action={boundAction} defaultValues={car} submitLabel="수정 저장" />
    </div>
  );
}
