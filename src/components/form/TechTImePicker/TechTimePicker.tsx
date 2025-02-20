import { Controller, useFormContext } from "react-hook-form";
import { TimeInput } from "@heroui/react";

type TechDatePicker = {
  name: string;
  label: string;
  defaultValue?: string | undefined;
};

const TechTimePicker = ({ name, label, defaultValue }: TechDatePicker) => {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <div>
            <TimeInput
              {...field}
              isRequired
              label={label}
              value={field.value || ""}
              onChange={(value) => field.onChange(value)}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default TechTimePicker;
