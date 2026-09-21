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
      <button type="submit" style={{ fontSize: "12px", color: "#94a3b8", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        onMouseEnter={e => (e.currentTarget.style.color = "#dc2626")}
        onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
      >
        삭제
      </button>
    </form>
  );
}
