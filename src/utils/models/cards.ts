export interface IInfoCard {
  title: string;
  value: number | string;
  url: string;
}

export interface IUserCard {
  avatar: string | null;
  username: string;
  name: string;
  surname: string;
  bloodType: string;
  birthday: Date;
  email: string;
  phone: string | null;
  statistic: IInfoCard[];
}
