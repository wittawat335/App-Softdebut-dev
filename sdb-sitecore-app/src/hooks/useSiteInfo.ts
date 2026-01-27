import { useQuery } from "@tanstack/react-query";

type SiteInfoData = {
  name: string;
  language: string;
};

const fetchSiteInfo = async (siteName: string): Promise<SiteInfoData> => {
  const endpoint = "/api/graphql-proxy";

  const graphqlQuery = `
    query test($site: String!) {
      site {
        siteInfo(site: $site) {
          name
          language
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
      variables: { site: siteName },
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();

  return json.data.site.siteInfo;
};

export const useSiteInfo = (siteName: string) => {
  return useQuery<SiteInfoData>({
    queryKey: ["siteInfo", siteName],
    queryFn: () => fetchSiteInfo(siteName),
    enabled: !!siteName,
  });
};
