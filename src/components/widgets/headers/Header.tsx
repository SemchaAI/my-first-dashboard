import { Badge } from "@/components/features";
import { Bell, MessageCircleMore } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="hidden rounded-2xl bg-background px-4 py-2 md:flex">
        {/* search input */}
        <p className="text-sm leading-3.5">search</p>
      </div>
      <div className="flex grow items-center justify-end gap-5">
        {/* notifications */}
        <div className="relative cursor-pointer items-center justify-center rounded-full bg-background p-2">
          <MessageCircleMore size={20} />
          <Badge total={5} />
        </div>
        <div className="relative cursor-pointer items-center justify-center rounded-full bg-background p-2">
          <Bell size={20} />
          <Badge total={123} />
        </div>
        {/* user profile */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <p className="text-sm leading-3.5 font-medium text-text-highlight">
              John Doe
            </p>
            <p className="text-right text-xs leading-3 text-text-primary">
              Admin
            </p>
          </div>
          {/* <UserCircle
            size={32}
            className="fill-secondary cursor-pointer"
          /> */}
          <Image
            src="/static/img/avatar.png"
            width={32}
            height={32}
            alt="user avatar"
            className="cursor-pointer rounded-full fill-secondary"
          />
        </div>
      </div>
    </header>
  );
};
