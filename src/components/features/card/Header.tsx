import { Ellipsis } from "lucide-react";
import Link from "next/link";

interface IProps {
  title: string;
  link?: string;
  linkText?: string;
  icon?: boolean;
}

export const Header = ({
  title,
  link,
  linkText = "View all",
  icon,
}: IProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold text-text-highlight">{title}</h1>
      {link ? (
        <Link href={link}>
          {icon ? (
            <Ellipsis
              size={28}
              className="cursor-pointer stroke-text-primary"
            />
          ) : (
            <span>{linkText}</span>
          )}
        </Link>
      ) : (
        <Ellipsis size={28} className="cursor-pointer stroke-text-primary" />
      )}
    </div>
  );
};
