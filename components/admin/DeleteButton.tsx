"use client";

interface Props {
  action: () => Promise<void>;
  label?: string;
}

export function DeleteButton({ action, label = "삭제" }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`${label === "삭제" ? "정말 삭제할까요?" : label}`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-[12px] text-red-400/60 hover:text-red-400 transition-colors"
      >
        삭제
      </button>
    </form>
  );
}
