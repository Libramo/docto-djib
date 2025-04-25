import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

type submitButtonProps = {
  title: string;
  buttonType?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
};
const SubmitButton = ({
  title,
  buttonType = "submit",
  isLoading = false,
}: submitButtonProps) => {
  return (
    <Button
      type={buttonType}
      className={cn(
        "w-full flex items-center justify-center gap-4",
        isLoading && "bg-primary/10 text-black cursor-progress"
      )}
      disabled={isLoading}
    >
      {isLoading && <Loader className="w-4 h-4 animate-spin" />}
      {title}
    </Button>
  );
};

export default SubmitButton;
