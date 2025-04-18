import { Logo, NavMenu } from "@/components/entities";
import { Header } from "@/components/widgets";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh">
      <aside className="flex w-[14%] min-w-[72px] flex-col gap-5 px-2 py-4 md:w-[8%] lg:w-[16%] lg:min-w-50 xl:w-[14%]">
        <Logo />
        <NavMenu />
      </aside>
      <div className="flex w-[86%] flex-col bg-foreground md:w-[92%] lg:w-[84%] xl:w-[86%]">
        <Header />
        <main className="flex flex-col p-4">{children}</main>
      </div>
    </div>
  );
}
