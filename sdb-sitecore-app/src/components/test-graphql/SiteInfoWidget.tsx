// components/test-graphql/SiteInfoWidget.tsx
"use client"; // 👈 สำคัญมาก: ต้องใส่บรรทัดนี้เพื่อให้ใช้ useQuery ได้

import React from "react";
import { useSiteInfo } from "src/hooks/useSiteInfo"; // 👈 path ไปยัง hook ที่คุณสร้าง

type SiteInfoWidgetProps = {
  siteName: string;
  language: string;
  routePath: string;
};

const SiteInfoWidget = ({ siteName, language, routePath }: SiteInfoWidgetProps) => {
  // เรียกใช้ Hook ที่นี่
  const { data, isLoading, error } = useSiteInfo(siteName, language, routePath);

  if (isLoading) return <div className="p-4 border my-4">Loading Site Info...</div>;
  if (error) return <div className="p-4 border my-4 text-red-500">Error loading info</div>;
  if (!data) return null;

  return (
    <div className="p-4 border my-4 bg-gray-50 rounded shadow-sm">
      <h3 className="font-bold text-lg mb-2">GraphQL Data Preview:</h3>
      
      {/* ตัวอย่างการแสดงผลข้อมูล */}
      <p><strong>Site:</strong> {data.site.allSiteInfo.results[0]?.name}</p>
      
      {/* Layout rendered data */}
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