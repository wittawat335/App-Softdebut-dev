"use client";

import React from "react";
import { useSiteInfo } from "@/hooks/useSiteInfo";

type Props = {
  siteName: string;
};

const SiteInfoWidget = ({ siteName }: Props) => {
  const { data, isLoading, error } = useSiteInfo(siteName);

  if (isLoading) return <div className="p-4">Loading Site Info...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading data</div>;

  return (
    <div className="p-4 m-4 border rounded shadow bg-white">
      <h3 className="text-lg font-bold mb-2">Data from Custom Hook:</h3>
      <ul className="list-disc pl-5">
        <li>
          <strong>Site Name:</strong> {data?.name}
        </li>
        <li>
          <strong>Language:</strong> {data?.language}
        </li>
      </ul>
    </div>
  );
};

export default SiteInfoWidget;
