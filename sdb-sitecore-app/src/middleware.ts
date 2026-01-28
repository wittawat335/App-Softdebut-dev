// src/middleware.ts
import { type NextRequest, type NextFetchEvent } from "next/server";
import createIntlMiddleware from "next-intl/middleware"; // เพิ่มการ import นี้
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

// 1. สร้าง next-intl middleware จากการตั้งค่าใน routing.ts
const intlMiddleware = createIntlMiddleware(routing);

// 2. ตั้งค่า Sitecore Middlewares
const locale = new LocaleMiddleware({
  sites,
  locales: routing.locales.slice(),
  // เชื่อมต่อ intlMiddleware เข้ากับ Sitecore LocaleMiddleware
  intlMiddleware,
  skip: () => false,
});

const multisite = new AppRouterMultisiteMiddleware({
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

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // รันระบบ Middleware ของ Sitecore
  // ระบบจะทำการ Redirect ไปยังภาษาเริ่มต้น (เช่น /en) ทันทีหากยังไม่มี Prefix
  return defineMiddleware(locale, multisite, redirects, personalize).exec(
    req,
    ev,
  );
}

export const config = {
  matcher: [
    "/",
    // ตรวจสอบว่า matcher ครอบคลุมเส้นทางที่ต้องการเติม Prefix ทั้งหมด
    "/((?!api/|sitemap|robots|_next/|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg).*)",
  ],
};
