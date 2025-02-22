/* eslint-disable @typescript-eslint/no-empty-object-type */
import { IInput } from "@/types";
import { DatePicker } from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  variant?: "underlined" | "faded" | "flat" | "bordered";
  size?: "sm" | "md" | "lg";
  radius: "none" | "sm" | "md" | "lg" | "full";
}

interface IProps extends IInput {}
const TechDatePicker = ({
  label,
  name,
  variant = "bordered",
  radius,
}: IProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { value, ...fields } }) => (
        <DatePicker
          className="min-w-full sm:min-w-[225px]"
          label={label}
          {...fields}
          errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
          isInvalid={!!errors[name]}
          radius={radius}
          variant={variant}
        />
      )}
    />
  );
};

export default TechDatePicker;
