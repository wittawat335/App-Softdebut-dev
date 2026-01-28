import {
  NextResponse,
  type NextRequest,
  type NextFetchEvent,
} from "next/server";
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
  sites,
  locales: routing.locales.slice(), // ดึงค่า ['en', 'th'] จาก routing.ts
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

// --- 2. Main Middleware Function ---
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // --- ส่วน Admin Authentication ---
  // Regex นี้ดักจับ: /admin, /en/admin, /th/admin ทั้งหมด
  const adminRegex = /^(\/[a-z]{2})?\/admin/;

  if (adminRegex.test(pathname)) {
    // ถ้าเข้าหน้า Login ให้ผ่านไปได้เลย
    if (pathname.includes("/admin/login")) {
      return NextResponse.next();
    }

    // ตรวจสอบ Token
    const token = req.cookies.get("admin_token");

    // ถ้าไม่มี Token -> ดีดกลับไปหน้า Login
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // ถ้ามี Token -> อนุญาตให้เข้าได้ (และจบการทำงานตรงนี้ ไม่ไปรัน Sitecore ต่อ)
    return NextResponse.next();
  }
  // ----------------------------------

  // --- ส่วน Sitecore Logic (จะทำงานเมื่อไม่ใช่หน้า Admin) ---
  return defineMiddleware(locale, multisite, redirects, personalize).exec(
    req,
    ev,
  );
}

export const config = {
  matcher: [
    "/",
    "/((?!api/|sitemap|robots|_next/|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg).*)",
  ],
};
