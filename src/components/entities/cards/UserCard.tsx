import Image from "next/image";
import { Calendar, DropletIcon, Mail, Phone } from "lucide-react";
import { IUserCard } from "@/utils/models/cards";
import { InfoCard } from "./InfoCard";

interface IProps {
  user: IUserCard;
  children?: React.ReactNode;
}

export const UserCard = async ({ user, children }: IProps) => {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row">
      {/* teacher card */}
      <div className="flex flex-1 flex-col gap-4 rounded-md bg-primary px-4 py-6 sm:flex-row">
        <div className="flex w-full justify-center sm:block sm:w-1/3">
          <Image
            src={user.avatar || "/static/img/avatar.png"}
            alt={user.username}
            width={144}
            height={144}
            className="aspect-square rounded-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col justify-between gap-4 sm:w-2/3">
          <div>
            <div className="flex gap-0.5">
              <h1 className="text-xl font-semibold text-text-highlight">
                {user.name} {user.surname}
              </h1>
              {children}
            </div>

            <p className="text-sm text-text-primary">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="flex flex-wrap justify-between gap-y-2 text-xs font-medium text-text-highlight">
            <div className="flex grow flex-wrap justify-between">
              <div className="flex min-w-1/2 items-center gap-1">
                <DropletIcon
                  size={14}
                  className="w-3.5 stroke-text-highlight"
                />
                <span>{user.bloodType}</span>
              </div>
              <div className="flex min-w-1/2 items-center gap-1">
                <Calendar size={14} className="w-3.5 stroke-text-highlight" />
                <span>
                  {user.birthday.toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="flex grow flex-wrap justify-between">
              <div className="flex min-w-1/2 items-center gap-1">
                <Mail size={14} className="min-w-3.5 stroke-text-highlight" />
                <span>{user.email}</span>
              </div>
              <div className="flex min-w-1/2 items-center gap-1">
                <Phone size={14} className="w-3.5 stroke-text-highlight" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* statistic cardList */}
      <div className="flex flex-1 flex-wrap gap-4">
        {user.statistic.map((statistic) => (
          <InfoCard key={statistic.title} data={statistic} />
        ))}
      </div>
    </div>
  );
};
