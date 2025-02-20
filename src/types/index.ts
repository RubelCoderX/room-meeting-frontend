import { ReactNode } from "react";

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label?: ReactNode;
  name: string;
  disabled?: boolean;
}
