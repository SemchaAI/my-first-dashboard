"use client";
// import { toastOptions } from '@/utils/consts/ToastConfig';
import { SessionProvider } from "next-auth/react";
// import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      {/* <Toaster position="top-left" toastOptions={toastOptions} /> */}
    </SessionProvider>
  );
}
