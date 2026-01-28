import { defineConfig } from "@sitecore-content-sdk/nextjs/config";
/**
 * @type {import('@sitecore-content-sdk/nextjs/config').SitecoreConfig}
 * See the documentation for `defineConfig`:
 * https://doc.sitecore.com/xmc/en/developers/content-sdk/the-sitecore-configuration-file.html
 */
export default defineConfig({
  defaultLanguage: "en", // กำหนดภาษาหลักที่นี่
  multisite: {
    defaultSite: "sdb-sitecore-app", // ชื่อ Site ของคุณใน Sitecore
  },
  // ใส่ค่าอื่นๆ ที่จำเป็นสำหรับ XM Cloud เช่น siteName, edge api host เป็นต้น
});
