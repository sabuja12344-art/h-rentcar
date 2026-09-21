export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarForm } from "@/components/admin/CarForm";
import { updateCar } from "@/app/actions/cars";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  return { title: car ? `${car.name} 수정 | 어드민` : "차량 없음 | 어드민" };
}

export default async function AdminEditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) notFound();
  const boundAction = updateCar.bind(null, car.id);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <Link href="/admin/cars" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}>← 차량 목록</Link>
        <span style={{ color: "#d1d5db" }}>/</span>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>{car.name} 수정</h1>
      </div>
      <CarForm action={boundAction} defaultValues={car} submitLabel="수정 저장" />
    </div>
  );
}
