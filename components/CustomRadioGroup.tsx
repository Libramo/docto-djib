import { cn } from "@/lib/utils";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CircleCheck } from "lucide-react";
import { IconType } from "react-icons/lib";

type RadioOption = {
  value: "liberal" | "employed"; // "liberal", "employed"
  label: string; // "Liberal Worker"
  description?: string;
  icon?: IconType;
};

type CustomRadioGroupProps = {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
};

const CustomRadioGroup = ({
  options,
  onChange,
  value,
}: CustomRadioGroupProps) => {
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={onChange}
      className="max-w-md w-full flex flex-row gap-4"
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          className={cn(
            "relative group ring-[1px] ring-border py-2 px-3 text-start",
            "data-[state=checked]:ring-blue-500",
            "text-base",
            "w-full rounded-md"
          )}
        >
          <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-primary stroke-white group-data-[state=unchecked]:hidden" />
          {/* <CpuIcon className="mb-2.5 text-muted-foreground" /> */}
          <span className="text-sm">{option.label}</span>
          <p className="text-xs">{option.description}</p>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};

export default CustomRadioGroup;
