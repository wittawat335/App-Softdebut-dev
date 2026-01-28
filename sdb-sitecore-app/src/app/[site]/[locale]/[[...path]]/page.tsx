import { isDesignLibraryPreviewData } from "@sitecore-content-sdk/nextjs/editing";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { SiteInfo } from "@sitecore-content-sdk/nextjs";
import sites from ".sitecore/sites.json";
import { routing } from "src/i18n/routing";
import scConfig from "sitecore.config";
import client from "src/lib/sitecore-client";
import Layout, { RouteFields } from "src/Layout";
import components from ".sitecore/component-map";
import Providers from "src/Providers";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import SiteInfoWidget from "components/test-graphql/SiteInfoWidget";

type PageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
    [key: string]: string | string[] | undefined;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { site, locale, path } = await params;
  const draft = await draftMode();

  // -------------------------------------------------------------------------
  // [Adjusted]: แจ้ง next-intl ว่าหน้านี้กำลังทำงานด้วยภาษาอะไร
  // ใช้รูปแบบ "${site}_${locale}" เพื่อให้สอดคล้องกับ logic ใน src/i18n/request.ts
  // สิ่งนี้จำเป็นสำหรับการเปิดใช้ Static Rendering และป้องกัน error "Dynamic usage of locale"
  // -------------------------------------------------------------------------
  setRequestLocale(`${site}_${locale}`);

  // Fetch the page data from Sitecore
  let page;
  if (draft.isEnabled) {
    const editingParams = await searchParams;
    if (isDesignLibraryPreviewData(editingParams)) {
      page = await client.getDesignLibraryData(editingParams);
    } else {
      page = await client.getPreview(editingParams);
    }
  } else {
    // ดึงข้อมูลหน้าเว็บตามภาษา (locale) และ site ที่ระบุ
    page = await client.getPage(path ?? [], { site, locale });
  }

  // If the page is not found, return a 404
  if (!page) {
    notFound();
  }

  // Fetch the component data from Sitecore
  const componentProps = await client.getComponentData(
    page.layout,
    {},
    components
  );

  return (
    // [Adjusted]: หุ้มด้วย NextIntlClientProvider เพื่อให้ Client Components ใช้งาน useTranslations ได้
    <NextIntlClientProvider>
      <Providers page={page} componentProps={componentProps}>
        {/* Widget สำหรับแสดงข้อมูล Site ปัจจุบัน (Optional) */}
        <Layout page={page} />
      </Providers>
    </NextIntlClientProvider>
  );
}

// -------------------------------------------------------------------------
// [Adjusted]: ฟังก์ชันสร้าง Static Paths (SSG) ตอน Build Time
// -------------------------------------------------------------------------
export const generateStaticParams = async () => {
  // ตรวจสอบว่าเป็นโหมด Production และ config อนุญาตให้ทำ SSG หรือไม่
  if (process.env.NODE_ENV !== "development" && scConfig.generateStaticPaths) {
    // กรอง Site ที่อนุญาตให้ทำงาน
    const defaultSite = scConfig.defaultSite;
    const allowedSites = defaultSite
      ? sites
          .filter((site: SiteInfo) => site.name === defaultSite)
          .map((site: SiteInfo) => site.name)
      : sites.map((site: SiteInfo) => site.name);

    // [Important]: ดึง Path ทั้งหมดจาก Sitecore สำหรับ "ทุกภาษา" ที่เรากำหนดใน routing.ts
    // routing.locales.slice() จะส่งค่า ['en', 'th'] (หรือภาษาอื่นๆ ที่ตั้งไว้) ไปให้ SDK
    return await client.getAppRouterStaticParams(
      allowedSites,
      routing.locales.slice()
    );
  }
  return [];
};

// Metadata fields for the page.
export const generateMetadata = async ({ params }: PageProps) => {
  const { path, site, locale } = await params;

  // ดึงข้อมูล Page เพื่อมาทำ Metadata (Title, Description)
  // Next.js จะ Cache Request นี้ให้อัตโนมัติ ไม่ต้องห่วงเรื่อง Performance
  const page = await client.getPage(path ?? [], { site, locale });
  return {
    title:
      (
        page?.layout.sitecore.route?.fields as RouteFields
      )?.Title?.value?.toString() || "Page",
  };
};