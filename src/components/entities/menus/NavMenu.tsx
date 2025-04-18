"use client";
import Link from "next/link";
import { icons, LucideIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { menu } from "@/utils/config";

export const NavMenu = () => {
  const { data, status } = useSession();
  const role = data?.user.role;
  if (status === "unauthenticated" || !role) return null;

  return (
    <nav className="flex flex-col gap-5">
      {menu.map((item) => (
        <div key={item.title}>
          <span className="hidden text-text-secondary lg:block">
            {item.title}
          </span>
          <ul className="flex flex-col gap-2 pt-5">
            {item.items.map((subItem) => {
              const Icon = icons[
                subItem.icon as keyof typeof icons
              ] as LucideIcon;
              if (subItem.visible.includes(role)) {
                return (
                  <li key={subItem.label}>
                    <Link
                      className="flex items-center justify-center gap-2 rounded-md px-4 py-2 transition-colors hover:bg-primary-highlight lg:justify-start"
                      href={subItem.href}
                    >
                      <Icon width={20} />
                      <span className="hidden lg:block">{subItem.label}</span>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
};
