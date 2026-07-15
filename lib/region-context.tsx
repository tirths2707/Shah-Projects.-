"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { regions, type RegionId, type RegionConfig } from "./regions";

const COOKIE_NAME = "snackit-region";

interface RegionContextValue {
  region: RegionConfig;
  regionId: RegionId;
  setRegionId: (id: RegionId) => void;
}

const RegionContext = createContext<RegionContextValue | null>(null);

export function RegionProvider({
  initialRegionId,
  children,
}: {
  initialRegionId: RegionId;
  children: ReactNode;
}) {
  const [regionId, setRegionIdState] = useState<RegionId>(initialRegionId);

  function setRegionId(id: RegionId) {
    setRegionIdState(id);
    document.cookie = `${COOKIE_NAME}=${id}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
  }

  return (
    <RegionContext.Provider value={{ region: regions[regionId], regionId, setRegionId }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within a RegionProvider");
  return ctx;
}
