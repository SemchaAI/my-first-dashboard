import { SignInForm } from "@/components/entities";

export default function Home() {
  return (
    <section className="flex h-dvh w-full flex-col">
      <div className="m-auto w-full max-w-1/3 min-w-80">
        <SignInForm />
      </div>
    </section>
  );
}
