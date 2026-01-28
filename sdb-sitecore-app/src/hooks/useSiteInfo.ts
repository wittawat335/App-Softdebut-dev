import { useQuery } from "@tanstack/react-query";

// 1. กำหนด Types ให้ตรงกับ Structure ของ Query ใหม่
type RouteData = {
  routePath: string;
  route: {
    id: string;
  };
};

type SiteResult = {
  name: string;
  routes: {
    results: RouteData[];
  };
};

type LayoutData = {
  item: {
    rendered: any; // หรือระบุ Type ที่ชัดเจนกว่านี้ถ้าทราบ structure ของ rendered
  };
};

// Type สำหรับ Response หลักที่รวมทั้ง Layout และ Site Info
type SiteFullData = {
  layout: LayoutData;
  site: {
    allSiteInfo: {
      results: SiteResult[];
    };
  };
};

// Type สำหรับ Variables ที่จะส่งไป
type FetchSiteParams = {
  siteName: string;
  language: string;
  routePath: string;
};

const fetchSiteInfo = async ({
  siteName,
  language,
  routePath,
}: FetchSiteParams): Promise<SiteFullData> => {
  const endpoint = "/api/graphql-proxy";

  // 2. แปลง Query ให้รับ Variables ($site, $language, $routePath)
  const graphqlQuery = `
    query getSiteData($site: String!, $language: String!, $routePath: String!) {
      layout(language: $language, routePath: $routePath, site: $site) {
        item {
          rendered
        }
      }
      site {
        allSiteInfo {
          results {
            name
            routes(first: 10, language: $language) {
              results {
                routePath
                route {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: graphqlQuery,
      variables: {
        site: siteName,
        language: language,
        routePath: routePath,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();

  // ส่งกลับ data ทั้งก้อน (layout + site)
  return json.data;
};

// 3. ปรับ Hook ให้รับค่าต่างๆ และใส่ใน QueryKey
export const useSiteInfo = (
  siteName: string,
  language: string = "en",
  routePath: string = "/",
) => {
  return useQuery<SiteFullData>({
    // ใส่ variables ทั้งหมดลงใน key เพื่อให้ refetch เมื่อค่าใดค่าหนึ่งเปลี่ยน
    queryKey: ["siteData", siteName, language, routePath],
    queryFn: () => fetchSiteInfo({ siteName, language, routePath }),
    enabled: !!siteName, // ทำงานเมื่อมี siteName
  });
};
