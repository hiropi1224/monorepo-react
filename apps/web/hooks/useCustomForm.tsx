/* eslint-disable no-unused-vars */
import {
  FormProviderProps,
  UseForm,
  UseFormReturnType,
  createFormContext,
} from "@mantine/form";
import { FormValues } from "../types/form";
import { FC } from "react";

const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();

export const useCustomForm = (): {
  FormProvider: FC<
    FormProviderProps<
      UseFormReturnType<FormValues, (values: FormValues) => FormValues>
    >
  >;
  useFormContext: () => UseFormReturnType<
    FormValues,
    (values: FormValues) => FormValues
  >;
  useForm: UseForm<FormValues, (values: FormValues) => FormValues>;
} => {
  return { FormProvider, useFormContext, useForm } as const;
};
