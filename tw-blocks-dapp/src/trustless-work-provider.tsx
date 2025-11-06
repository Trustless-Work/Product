"use client";

import React from "react";
import { development, TrustlessWorkConfig } from "@trustless-work/escrow";

export function TrustlessWorkProvider({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
  return (
    <TrustlessWorkConfig baseURL={development} apiKey={apiKey}>
      {children}
    </TrustlessWorkConfig>
  );
}


