"use client";

import { deleteCar } from "@/app/actions/cars";

export function DeleteCarButton({ id, name }: { id: string; name: string }) {
  const action = deleteCar.bind(null, id);

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`"${name}"을(를) 삭제하시겠습니까?`)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="text-[12px] text-ink-dim hover:text-red-400 transition-colors"
      >
        삭제
      </button>
    </form>
  );
}
