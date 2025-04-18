"use client";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Settings, LogOut } from "lucide-react";

export const UserButton = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const user = session?.user;

  if (!user) return null;
  return (
    <div className="relative">
      <div className="flex items-center gap-2" onClick={() => setOpen(!open)}>
        <div className="flex flex-col">
          <p className="text-sm leading-3.5 font-medium text-text-highlight">
            {user.username}
          </p>
          <p className="text-right text-xs leading-3 text-text-primary">
            {user.role}
          </p>
        </div>
        <Image
          src={user.avatar || "/static/img/avatar.png"}
          width={32}
          height={32}
          alt="user avatar"
          className="cursor-pointer rounded-full fill-secondary"
        />
      </div>
      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-xl bg-background p-4 shadow-2xl">
          <div className="flex items-center justify-between gap-2">
            <button className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-text-primary">
              <Settings
                size={24}
                className="transition-all group-hover:rotate-90 group-hover:stroke-secondary-accent"
              />
            </button>
            <button
              onClick={() => signOut()}
              className="flex grow cursor-pointer justify-center gap-2 rounded-md bg-danger px-4 py-2 text-sm text-white transition-colors hover:bg-secondary-accent"
            >
              <LogOut size={20} className="stroke-background" /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
