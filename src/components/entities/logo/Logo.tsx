import { Album } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center justify-center lg:justify-start gap-1">
      <Album size={32} />
      <span className="hidden sm:w-[3ch] lg:w-fit lg:block overflow-hidden">
        ITSchool
      </span>
    </div>
  );
};
