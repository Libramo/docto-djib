"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AvailabilityTabContent from "./AvailabilityTabContent";

export function DoctorDetails() {
  const [isActive, setIsActive] = useState("availability");

  return (
    <div className="max-w-4xl p-4 justify-center">
      <Tabs value={isActive} onValueChange={setIsActive} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="services"
            className={cn(isActive === "services" ? "!bg-blue-500" : "")}
          >
            Détail des services
          </TabsTrigger>
          <TabsTrigger
            value="availability"
            className={cn(isActive === "availability" ? "!bg-blue-500" : "")}
          >
            Créneaux
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <div>Services</div>
        </TabsContent>
        <TabsContent value="availability">
          <AvailabilityTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
