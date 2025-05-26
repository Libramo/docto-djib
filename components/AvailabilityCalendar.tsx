"use client";
import { useState } from "react";
import {
  format,
  addWeeks,
  startOfWeek,
  addDays,
  differenceInCalendarWeeks,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowBigLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Availability } from "@prisma/client";

export function AvailabilityCalendar({
  availabilities,
}: {
  availabilities: Availability[];
}) {
  const [weekOffset, setWeekOffset] = useState(0);

  const weekStart = startOfWeek(addWeeks(new Date(), weekOffset), {
    weekStartsOn: 0, //The week starts the sunday
  });

  const weekDates = Array.from({ length: 7 }).map((_, i) =>
    addDays(weekStart, i)
  );

  const slotsByDay = weekDates.map((date) => {
    const slots = availabilities.filter((slot) => {
      const d = new Date(slot.startDate);
      return d.toDateString() === date.toDateString();
    });

    return slots.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  });

  const isWeekEmpty = slotsByDay.every((daySlots) => daySlots.length === 0);

  const nextSlot = availabilities
    .filter((slot) => new Date(slot.startDate) > weekDates[6]) // after current week
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )[0];

  const goToNextSlot = () => {
    if (!nextSlot) return;

    const nextSlotDate = new Date(nextSlot.startDate);
    const baseWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const targetWeekStart = startOfWeek(nextSlotDate, { weekStartsOn: 1 });

    const nextOffset = differenceInCalendarWeeks(
      targetWeekStart,
      baseWeekStart,
      {
        weekStartsOn: 1,
      }
    );

    setWeekOffset(nextOffset);
  };

  return (
    <div className="relative">
      {/* Days header */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-700 mb-2">
        {weekDates.map((date, idx) => (
          <div key={idx}>
            <div>{format(date, "EEE", { locale: fr })}</div>
            <div className="text-xs text-muted-foreground">
              {format(date, "dd MMM", { locale: fr })}
            </div>
          </div>
        ))}
      </div>

      {/* Time slots grid */}
      <div className="grid grid-cols-7 gap-2">
        {slotsByDay.map((slots, idx) => (
          <div key={idx} className="flex flex-col space-y-4 items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-xs text-gray-800">
                {slots[i] ? (
                  <Button className="border !px-1 !py-0">
                    {format(new Date(slots[i].startDate), "HH:mm")}
                  </Button>
                ) : (
                  <Button variant={"ghost"} disabled>
                    —
                  </Button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {isWeekEmpty && (
        <div className="absolute inset-x-0 top-[4.5rem] bottom-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            {nextSlot ? (
              <button
                onClick={goToNextSlot}
                className="bg-white px-4 py-2 shadow rounded flex items-center space-x-2 hover:bg-gray-50 border"
              >
                <Eye className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-blue-600">
                  Prochain RDV le{" "}
                  {format(new Date(nextSlot.startDate), "dd MMMM yyyy", {
                    locale: fr,
                  })}
                </p>
                <span className="text-blue-600">❯</span>
              </button>
            ) : (
              <div className="bg-white px-4 py-2 shadow rounded border text-sm text-gray-500">
                Aucune disponibilité restante
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <Button
          variant="ghost"
          size={"icon"}
          onClick={() => setWeekOffset(weekOffset - 1)}
        >
          <ArrowBigLeft />
        </Button>
        <Button variant="ghost" onClick={() => setWeekOffset(weekOffset + 1)}>
          {/* ArrowBigLeft */}
          <ArrowBigLeft className="rotate-180" />
        </Button>
      </div>
    </div>
  );
}
