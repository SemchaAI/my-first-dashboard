"use client";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";

interface DynamicFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  children: ReactNode;
  formControls?: ReactNode;
  title?: string;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  formControls,
  title,
}: DynamicFormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        className={
          "m-auto w-full max-w-lg min-w-80 p-1 " + `${title ? "" : "pt-7"}`
        }
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {title && (
          <h1 className="mb-2 pr-7 text-xl font-semibold text-text-highlight">
            {title}
          </h1>
        )}
        {children}
        {formControls}
      </form>
    </FormProvider>
  );
};
