import Image from "next/image";
import type { IInfoCard } from "@/utils/models/cards";

interface IProps {
  data: IInfoCard;
}
export const InfoCard = ({ data }: IProps) => {
  return (
    <div className="flex w-full gap-4 rounded-md bg-background p-4 md:w-[calc(50%-0.5rem)]">
      <Image src={data.url} alt="" width={24} height={24} className="h-6 w-6" />
      <div>
        <span className="text-xl font-semibold">{data.value}</span>
        <p className="text-sm text-text-secondary">{data.title}</p>
      </div>
    </div>
  );
};
