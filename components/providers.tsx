"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider className="min-h-[inherit]">{children}</HeroUIProvider>
  );
};

export default Providers;
