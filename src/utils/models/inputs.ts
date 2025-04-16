export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  rounded?: boolean;
}
export interface IField extends IInput {
  id: string;
  EyeIcon?: boolean;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;

  label: string;
  type: string;
  placeholder?: string;
}
