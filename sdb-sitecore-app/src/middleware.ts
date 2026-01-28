import { type NextRequest, type NextFetchEvent } from "next/server";
import {
  defineMiddleware,
  AppRouterMultisiteMiddleware,
  PersonalizeMiddleware,
  RedirectsMiddleware,
  LocaleMiddleware,
} from "@sitecore-content-sdk/nextjs/middleware";
import sites from ".sitecore/sites.json";
import scConfig from "sitecore.config";
import { routing } from "./i18n/routing";

// --- 1. ตั้งค่า Sitecore Middlewares ---

const locale = new LocaleMiddleware({
  /**
   * รายชื่อ Site ทั้งหมดจาก sites.json
   */
  sites,
  /**
   * รายชื่อภาษาที่รองรับ โดยดึงมาจาก src/i18n/routing.ts
   * ปัจจุบันคือ ['en', 'th']
   */
  locales: routing.locales.slice(),
  /**
   * ตั้งค่าเป็น false เพื่อให้ Middleware ทำงานเสมอ
   * เพื่อจัดการเรื่องการเติม Prefix ภาษาใน URL
   */
  skip: () => false,
});

const multisite = new AppRouterMultisiteMiddleware({
  /**
   * รายชื่อ Site สำหรับระบุว่า URL นี้เป็นของ Site ไหน
   */
  sites,
  ...scConfig.api.edge,
  ...scConfig.multisite,
  skip: () => false,
});

const redirects = new RedirectsMiddleware({
  sites,
  ...scConfig.api.edge,
  ...scConfig.api.local,
  ...scConfig.redirects,
  skip: () => false,
});

const personalize = new PersonalizeMiddleware({
  sites,
  ...scConfig.api.edge,
  ...scConfig.personalize,
  skip: () => false,
});

// --- 2. Main Middleware Function ---

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  /**
   * การทำงานหลัก:
   * 1. LocaleMiddleware จะตรวจสอบ URL
   * 2. หากไม่มี Prefix ภาษา (เช่น /) และคุณตั้ง localePrefix: 'always' ใน routing.ts
   * ระบบจะทำการ Redirect ไปยังภาษาเริ่มต้นทันที (เช่น /en)
   */
  return defineMiddleware(locale, multisite, redirects, personalize).exec(
    req,
    ev,
  );
}

export const config = {
  /*
   * กำหนดเส้นทางที่ต้องการให้ Middleware ทำงาน
   * ครอบคลุมหน้า Root (/) และเส้นทางอื่นๆ ทั้งหมด ยกเว้นไฟล์ระบบและ API
   */
  matcher: [
    "/",
    "/((?!api/|sitemap|robots|_next/|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg).*)",
  ],
};
