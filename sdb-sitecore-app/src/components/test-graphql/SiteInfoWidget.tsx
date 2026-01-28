"use client";

import React from "react";
import { useSiteInfo } from "src/hooks/useSiteInfo";

type SiteInfoWidgetProps = {
  siteName: string;
  language: string;
  routePath: string;
};

const SiteInfoWidget = ({
  siteName,
  language,
  routePath,
}: SiteInfoWidgetProps) => {
  const { data, isLoading, error } = useSiteInfo(siteName, language, routePath);

  if (isLoading)
    return <div className="p-4 border my-4">Loading Site Info...</div>;
  if (error)
    return (
      <div className="p-4 border my-4 text-red-500">Error loading info</div>
    );
  if (!data) return null;

  return (
    <div className="p-4 border my-4 bg-gray-50 rounded shadow-sm">
      <h3 className="font-bold text-lg mb-2">GraphQL Data Preview:</h3>

      <p>
        <strong>Site:</strong> {data.site.allSiteInfo.results[0]?.name}
      </p>

      <div className="mt-2 p-2 bg-white border">
        <strong>Rendered Item:</strong>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(data.layout.item, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default SiteInfoWidget;
