"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

const Providers = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  return (
    <HeroUIProvider className="min-h-[inherit]" navigate={push}>
      {children}
    </HeroUIProvider>
  );
};

export default Providers;
