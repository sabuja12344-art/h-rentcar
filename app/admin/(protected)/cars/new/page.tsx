import { CarForm } from "@/components/admin/CarForm";
import { createCar } from "@/app/actions/cars";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "차량 추가 | 어드민" };

export default function AdminNewCarPage() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <Link href="/admin/cars" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}>← 차량 목록</Link>
        <span style={{ color: "#d1d5db" }}>/</span>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>차량 추가</h1>
      </div>
      <CarForm action={createCar} submitLabel="차량 추가" />
    </div>
  );
}
