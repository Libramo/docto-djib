import React, { useState } from "react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const AvailabilityTabContent = () => {
  const [bookDate, setBookDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <h2 className="font-bold py-2 uppercase text-balance flex justify-center wrap-break-word">
        Selectionner une date et une heure de rendez-vous.
      </h2>
      <div className="grid grid-cols-2">
        <div className="sm:col-span-1 col-span-full">
          <Calendar
            mode="single"
            selected={bookDate}
            onSelect={setBookDate}
            className="rounded-md border"
          />
        </div>
        <div className="sm:col-span-1 col-span-full">
          <h2 className="uppercase">
            {format(bookDate as Date, "EEEE d MMMM yyyy HH:mm", { locale: fr })}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityTabContent;
