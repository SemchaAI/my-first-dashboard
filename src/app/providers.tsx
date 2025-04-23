"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { toastOptions } from "@/utils/config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster position="top-right" toastOptions={toastOptions} />
    </SessionProvider>
  );
}
