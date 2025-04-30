import { Plus } from "lucide-react";

export const CreateButton = () => {
  return (
    <button className="flex cursor-pointer items-center rounded-full bg-tertiary p-2">
      <Plus size={14} className="stroke-text-highlight" />
    </button>
  );
};
