import { Trash } from "lucide-react";

export const DeleteButton = () => {
  return (
    <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-secondary">
      <Trash size={14} className="stroke-background" />
    </button>
  );
};
