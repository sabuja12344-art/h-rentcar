import nodemailer from "nodemailer";

type InquiryEmailData = {
  name: string;
  phone: string;
  carInterest?: string;
  message?: string;
  pickupDate?: string;
  pickupTime?: string;
  returnDate?: string;
  returnTime?: string;
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

  const pickupInfo =
    data.pickupDate
      ? `${data.pickupDate}${data.pickupTime ? " " + data.pickupTime : ""}`
      : "미입력";
  const returnInfo =
    data.returnDate
      ? `${data.returnDate}${data.returnTime ? " " + data.returnTime : ""}`
      : "미입력";

  await transporter.sendMail({
    from: `"현대렌트카 상담" <${user}>`,
    to,
    subject: `[현대렌트카] 새 상담 신청 — ${data.name}`,
    text: [
      `이름: ${data.name}`,
      `연락처: ${data.phone}`,
      `희망 차종: ${data.carInterest || "미입력"}`,
      `배차 일시: ${pickupInfo}`,
      `반납 일시: ${returnInfo}`,
      `문의 내용:\n${data.message || "없음"}`,
    ].join("\n"),
  });
}
