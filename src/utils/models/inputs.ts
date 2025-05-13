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
  defaultValue?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
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

export interface IOption {
  label: string;
  value: string | number;
  color?: string;
}

export interface ISelectProps {
  options: IOption[];
  value: IOption | IOption[] | undefined;
  onChange: (option: IOption | IOption[] | undefined) => void;
  placeholder?: string;
  menuPortalTarget?: HTMLElement;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isMulti?: boolean;
}
