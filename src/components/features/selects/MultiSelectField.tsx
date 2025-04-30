"use client";
import { Controller, useFormContext } from "react-hook-form";
import { IMultiSelect } from "@/utils/models/inputs";
import { MultiSelect } from "@/components/features";

interface IProps extends IMultiSelect {
  name: string;
}

export const MultiSelectField = ({ options, name, ...rest }: IProps) => {
  const {
    control,
    formState: { errors },
    //  setValue,
  } = useFormContext();
  const error = errors[name]?.message as string;
  return (
    <div className="flex flex-col">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <MultiSelect options={options} {...field} {...rest} />
        )}
      />
      <p className="flex h-6 items-center pl-2 text-xs text-danger">
        {error ? error : ""}
      </p>
    </div>
  );
};
