// import { useFormContext } from "react-hook-form";
// import { ReactNode } from "react";

// import { Select, SelectItem } from "@heroui/select";
// import { IInput } from "@/types";

// interface IProps {
//   variant?: "underlined" | "faded" | "flat" | "bordered";
//   size?: "sm" | "md" | "lg";
//   radius: "none" | "sm" | "md" | "lg" | "full";
//   label: ReactNode;
// }
// interface IProps extends IInput {
//   options: { key: string; label: ReactNode }[];
// }

// const TechSelect = ({
//   options,
//   name,
//   label,
//   radius,

//   disabled,
// }: IProps) => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <Select
//       {...register(name)}
//       className="min-w-full sm:min-w-[225px]"
//       errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
//       isDisabled={disabled}
//       isInvalid={!!errors[name]}
//       label={label}
//       radius={radius}
//       variant="bordered"
//     >
//       {options.map((options) => (
//         <SelectItem key={options.key}>{options.label}</SelectItem>
//       ))}
//     </Select>
//   );
// };

// export default TechSelect;

import { useFormContext } from "react-hook-form";
import { ReactNode } from "react";

import { Select, SelectItem } from "@heroui/select";
import { IInput } from "@/types";

interface IProps extends IInput {
  variant?: "underlined" | "faded" | "flat" | "bordered";
  size?: "sm" | "md" | "lg";
  radius: "none" | "sm" | "md" | "lg" | "full";
  label: ReactNode;
  options: { key: string; label: ReactNode; value: string }[];
  isMulti?: boolean;
}

const TechSelect = ({
  options,
  name,
  label,
  radius,
  disabled,
  isMulti,
}: IProps) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const handleChange = (selected: string[] | string) => {
    setValue(name, selected); // 🔥 Save multiple selected values properly
  };

  return (
    <Select
      selectedKeys={getValues(name)} // 🔥 Ensure selected values are stored properly
      onSelectionChange={handleChange} // 🔥 Handle multiple selections
      className="min-w-full sm:min-w-[225px]"
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isDisabled={disabled}
      isInvalid={!!errors[name]}
      label={label}
      radius={radius}
      variant="bordered"
      selectionMode={isMulti ? "multiple" : "single"} // 🔥 Enable multiple selections
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default TechSelect;
