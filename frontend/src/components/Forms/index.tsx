import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";
import { FormChildren } from "./FormChildren";

export interface FormProps extends PropsWithChildren {
  onSubmit: (data: Record<string, object>) => void;
  schema?: z.Schema;
  formConfig?: UseFormReturn;
}
export function Form({ children, onSubmit, schema, formConfig }: FormProps) {
  if (!formConfig) {
    formConfig = buildFormConfig(schema);
  }

  return (
    <FormProvider {...formConfig}>
      <form onSubmit={formConfig.handleSubmit(onSubmit)} noValidate>
        <FormChildren>{children}</FormChildren>
      </form>
    </FormProvider>
  );
}

export function buildFormConfig(schema?: z.Schema): UseFormReturn {
  return schema ? useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) }) : useForm();
}
