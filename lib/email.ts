import nodemailer from "nodemailer";

type InquiryEmailData = {
  name: string;
  phone: string;
  carInterest?: string;
  type: string;
  message?: string;
};

export async function sendInquiryEmail(data: InquiryEmailData) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.EMAIL_TO;

  if (!host || !user || !pass || !to) return;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"H-RENT CAR 상담" <${user}>`,
    to,
    subject: `[H-RENT CAR] 새 상담 신청 — ${data.name} (${data.type})`,
    text: [
      `이름: ${data.name}`,
      `연락처: ${data.phone}`,
      `희망 차종: ${data.carInterest || "미입력"}`,
      `문의 유형: ${data.type}`,
      `문의 내용:\n${data.message || "없음"}`,
    ].join("\n"),
  });
}