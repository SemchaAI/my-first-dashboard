import { Ellipsis } from "lucide-react";

interface IProps {
  type: string;
}

export const UserCard = ({ type }: IProps) => {
  return (
    <li className="min-w-32 flex-1 rounded-2xl p-4 odd:bg-secondary even:bg-tertiary">
      <div className="flex grow items-center justify-between">
        <span className="rounded-full bg-white px-2 py-1 text-xs text-success">
          2025/25
        </span>
        <Ellipsis size={24} className="cursor-pointer stroke-white" />
      </div>
      <h1 className="my-4 text-2xl font-bold text-text-highlight">1,234</h1>
      <p className="text-sm font-medium text-text-primary capitalize">
        {type + "s"}
      </p>
    </li>
  );
};
