"use client";
import { useFormContext, useWatch } from "react-hook-form";
import { Eye, EyeOff, X } from "lucide-react";
import { Input } from "@/components/shared";
import type { IField } from "@/utils/models/inputs";
import { useState } from "react";

export const InputField = ({
  id,
  label,
  autoComplete,
  type,
  hidden,
  placeholder = label,
  defaultValue,
  EyeIcon,
  Icon,
  props,
}: IField) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const rawValue = useWatch({ name: id }) || "";
  const error = errors[id]?.message as string;
  const [currType, setCurrType] = useState(type);

  const onClickClear = () => {
    setValue(id, "");
  };

  return (
    <div className={`${hidden ? "hidden" : "flex min-w-60 flex-col gap-px"}`}>
      <label className="pl-2 text-xs text-text-primary" htmlFor={id}>
        {label}:
      </label>
      <div className="group relative flex">
        {Icon && (
          <Icon className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 transition-colors group-focus-within:stroke-secondary-accent" />
        )}
        <Input
          type={currType}
          id={id}
          className="w-full pt-2.5 pr-5 pb-2.5 pl-10 focus:border-secondary-accent"
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(id)}
          {...props}
          defaultValue={defaultValue}
        />
        {EyeIcon && (
          <button
            className="absolute right-3 flex translate-y-1/2"
            onClick={() =>
              setCurrType((prev) => (prev === "text" ? "password" : "text"))
            }
            type="button"
          >
            {type === "password" ? (
              <Eye className="cursor-pointer transition-colors hover:stroke-secondary-accent focus:stroke-secondary-accent" />
            ) : (
              <EyeOff className="cursor-pointer transition-colors hover:stroke-secondary-accent focus:stroke-secondary-accent" />
            )}
          </button>
        )}
        {!EyeIcon && rawValue && type !== "date" ? (
          <X
            className="absolute right-3 flex translate-y-1/2 cursor-pointer transition-colors hover:stroke-secondary-accent focus:stroke-secondary-accent"
            onClick={onClickClear}
            role="button"
          />
        ) : null}
      </div>
      <div className="flex h-6 items-center pl-2 text-xs text-danger">
        {error}
      </div>
    </div>
  );
};
