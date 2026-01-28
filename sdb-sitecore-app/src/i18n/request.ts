import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import client from "src/lib/sitecore-client";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  // รับค่า Locale ที่ส่งมาจาก Next.js
  const requested = await requestLocale;
  const [parsedSite, parsedLocale] = requested?.split("_") || [];

  // ตรวจสอบว่าภาษานั้นมีในระบบจริงไหม ถ้าไม่มีให้ใช้ Default
  const locale = hasLocale(routing.locales, parsedLocale)
    ? parsedLocale
    : routing.defaultLocale;

  console.log("Request Locale:", requested, "=> Using Locale:", locale);

  // ดึง Dictionary จาก Sitecore
  const messages: Record<string, object> = {};
  messages[parsedSite] = await client.getDictionary({
    locale,
    site: parsedSite,
  });

  return {
    locale,
    messages,
  };
});
