"use client";
import React, { useState } from "react";
import {
  ComponentPropsCollection,
  ComponentPropsContext,
  Page,
  SitecoreProvider,
} from "@sitecore-content-sdk/nextjs";
import scConfig from "sitecore.config";
import components from ".sitecore/component-map.client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { LoadingProvider } from "@/contexts/LoadingContext";

export default function Providers({
  children,
  page,
  componentProps = {},
}: {
  children: React.ReactNode;
  page: Page;
  componentProps?: ComponentPropsCollection;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        {" "}
        <SitecoreProvider
          api={scConfig.api}
          componentMap={components}
          page={page}
          loadImportMap={() => import(".sitecore/import-map.client")}
        >
          <ComponentPropsContext value={componentProps}>
            {children}
          </ComponentPropsContext>
        </SitecoreProvider>
      </LoadingProvider>

      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
