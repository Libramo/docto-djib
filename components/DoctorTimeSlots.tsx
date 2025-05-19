"use client";

import { useState, useTransition } from "react";
import { fr } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "./ui/button";
import { Availability } from "@prisma/client";
// import { createAvailability } from "@/actions/availability"; // Server action

registerLocale("fr", fr);

type DoctorTimeSlotsProps = {
  doctorId?: string; // Needed to associate the slot to a specific doctor
  availabilities?: Availability[]; // Existing availabilities to display
};

export function DoctorTimeSlots({
  doctorId,
  availabilities,
}: DoctorTimeSlotsProps) {
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [isPending] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddSlot = async () => {
    if (!selectedTime) return;

    try {
      //   await createAvailability({ date: selectedTime });
      //   setSuccess("Créneau ajouté !");
      //   setError(null);
      console.log(alert("YES it ok"));
    } catch (error) {
      setSuccess(null);
      setError("Erreur ou doublon.");
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">
        Ajouter une disponibilité :
      </p>

      <DatePicker
        selected={selectedTime}
        onChange={(date) => setSelectedTime(date)}
        showTimeSelect
        timeIntervals={30}
        locale="fr"
        dateFormat="Pp"
        placeholderText="Choisir une date et une heure"
        className="w-full rounded-lg px-4 py-2 text-sm bg-white text-gray-800 border border-gray-300 shadow-sm"
      />

      <Button onClick={handleAddSlot} disabled={!selectedTime || isPending}>
        {isPending ? "Ajout..." : "Ajouter"}
      </Button>

      {success && <p className="text-green-600 text-sm">{success}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
