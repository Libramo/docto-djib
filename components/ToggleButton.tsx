import React from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const ToggleButton = () => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Switch className="" />
        <Label>2 hours</Label>
      </div>
    </div>
  );
};

export default ToggleButton;
