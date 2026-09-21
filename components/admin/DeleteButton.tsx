"use client";

interface Props {
  action: () => Promise<void>;
  label?: string;
}

export function DeleteButton({ action }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("정말 삭제할까요?")) e.preventDefault();
      }}
    >
      <button
        type="submit"
        style={{ fontSize: "12px", color: "#94a3b8", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        onMouseEnter={e => (e.currentTarget.style.color = "#dc2626")}
        onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
      >
        삭제
      </button>
    </form>
  );
}
