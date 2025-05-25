"use client";

import { Availability } from "@prisma/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface AvailableSlotsListProps {
  doctorId: string;
  availabilities: Availability[];
}

export function AvailableSlotsList({
  doctorId,
  availabilities,
}: AvailableSlotsListProps) {
  const router = useRouter();

  // Filtrer les créneaux disponibles non réservés et futurs
  const futureAvailableSlots = availabilities
    .filter((slot) => !slot.isBooked && new Date(slot.startDate) > new Date())
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

  const handleBook = (slotId: string) => {
    // TODO: intégrer l’action de réservation
    console.log("Réserver le créneau :", slotId);
    // router.push(`/booking/${slotId}`); // ou ouvrir un modal, ou faire un POST...
  };

  if (!futureAvailableSlots.length) {
    return (
      <p className="text-sm italic text-gray-500">Aucun créneau disponible</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {futureAvailableSlots.map((slot) => (
        <div
          key={slot.id}
          className="border p-3 rounded-md shadow-sm flex items-center justify-between"
        >
          <span className="text-sm text-muted-foreground">
            {new Date(slot.startDate).toLocaleString("fr-FR", {
              weekday: "long",
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <Button size="sm" onClick={() => handleBook(slot.id)}>
            Réserver
          </Button>
        </div>
      ))}
    </div>
  );
}
