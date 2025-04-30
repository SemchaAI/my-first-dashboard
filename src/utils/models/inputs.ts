import type { ReactNode } from "react";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  rounded?: boolean;
}
export interface IField extends IInput {
  id: string;
  EyeIcon?: boolean;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;

  hidden?: boolean;
  label: string;
  type: string;
  placeholder?: string;
}

export interface ICheckbox
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  endAdornment?: ReactNode;
  onChange?: (
    value: string | number | readonly string[] | undefined | boolean | null,
  ) => void;
  checked?: boolean;
  label: string;
  error?: string;
}

export interface IMultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
export interface IMultiSelect {
  options: IMultiSelectOption[];
  value: string[];
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  loading?: boolean;
  single?: boolean;
}
