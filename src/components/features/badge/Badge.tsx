interface IProps {
  total: number;
}

export const Badge = ({ total }: IProps) => {
  return (
    <div
      className={`absolute -top-1 -right-2 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-secondary-accent text-xs leading-3 text-white once`}
    >
      {total > 9 ? "9+" : total}
    </div>
  );
};
