"use client";

import { SignInForm } from "@/components/entities";

export default function Home() {
  return (
    <section className="flex h-dvh w-full flex-col">
      <h1>Home</h1>
      <SignInForm />
    </section>
  );
}
