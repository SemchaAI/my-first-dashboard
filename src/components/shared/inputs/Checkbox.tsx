import { forwardRef } from "react";
import { Check, X } from "lucide-react";
import type { ICheckbox } from "@/utils/models/inputs";

export const Checkbox = forwardRef<HTMLInputElement, ICheckbox>(
  (
    {
      id,
      name,
      label,
      value,
      onChange,
      checked,
      endAdornment,
      disabled,
      error,
    },
    ref,
  ) => {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          onChange={(e) => !disabled && onChange?.(e.target.checked)}
          checked={checked}
          value={value}
          id={`${name}-${id}`}
          className="hidden"
          disabled={disabled}
        />
        <label
          htmlFor={`${name}-${id}`}
          className={`user-select-none flex cursor-pointer items-center gap-2 ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-lg border p-0.5 transition-colors ${
              checked ? "border-primary bg-primary" : "border-border"
            }`}
          >
            {checked && <Check size={18} className="text-dark" />}
            {disabled && <X size={18} className="text-error" />}
          </div>
          <div className={`${error && "text-error"}`}>{label}</div>
        </label>
        {endAdornment}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
