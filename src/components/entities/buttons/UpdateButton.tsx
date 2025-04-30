import { Settings } from "lucide-react";

export const UpdateButton = () => {
  return (
    <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary">
      <Settings size={14} className="stroke-background" />
    </button>
  );
};
