import { defineRouting } from "next-intl/routing";
import sitecoreConfig from "sitecore.config";

export const routing = defineRouting({
  // 1. ระบุรหัสภาษาทั้งหมดที่ระบบรองรับ (ต้องตรงกับใน Sitecore XM Cloud)
  locales: ["en", "th"],

  // 2. ระบุภาษาเริ่มต้น (ใช้ค่าจาก config หรือใส่ 'en' ไปเลยก็ได้)
  defaultLocale: sitecoreConfig.defaultLanguage,

  // 3. หัวใจสำคัญ: เปลี่ยนเป็น 'always' เพื่อบังคับให้ URL มี /en หรือ /th เสมอ
  localePrefix: "always",
});
