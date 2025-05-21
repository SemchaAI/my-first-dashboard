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
          "m-auto w-full max-w-[90dvw] min-w-80 p-1 " + `${title ? "" : "pt-7"}`
        }
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {title && (
          // pr-7
          <h2 className="mb-2 text-center text-2xl font-semibold text-text-highlight">
            {title}
          </h2>
        )}
        {children}
        {formControls}
      </form>
    </FormProvider>
  );
};
