import { CarForm } from "@/components/admin/CarForm";
import { createCar } from "@/app/actions/cars";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "차량 추가 | 어드민" };

export default function AdminNewCarPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/cars" className="text-ink-dim hover:text-ink transition-colors text-[13px]">
          ← 차량 목록
        </Link>
        <span className="text-ink-dim">/</span>
        <h1 className="text-[20px] font-black">차량 추가</h1>
      </div>
      <CarForm action={createCar} submitLabel="차량 추가" />
    </div>
  );
}
