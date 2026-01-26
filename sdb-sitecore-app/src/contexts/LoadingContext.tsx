"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Spinner } from "@/ui/Spinner"; 

type LoadingContextType = {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoading = () => setLoadingCount((prev) => prev + 1);
  const hideLoading = () => setLoadingCount((prev) => Math.max(0, prev - 1));
  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && <Spinner />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
