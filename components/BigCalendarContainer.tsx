"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  View,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { addAvailability } from "@/actions/availability";
import { toast } from "react-toastify";

const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Define the messages for the French locale
const messages = {
  allDay: "Toute la journée",
  previous: "Précédent",
  next: "Suivant",
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "Événement",
  noEventsInRange: "Aucun événement à afficher.",
  showMore: (total: number) => `+${total} de plus`,
};

export const BigCalendarContainer = ({ doctorId }: { doctorId: string }) => {
  const [view, setView] = useState<View>(Views.WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    id: "",
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const handleAddEvent = async () => {
    try {
      const newAvailability = await addAvailability(
        newEvent.title,
        newEvent.start,
        newEvent.end,
        doctorId
      );

      console.log("NNNNNNNNNNNNNNNNNNNNNNN", newAvailability);

      setEvents([
        ...events,
        {
          title: newAvailability.title,
          start: newAvailability.startDate,
          end: newAvailability.endDate,
        },
      ]);

      setNewEvent({ id: "", title: "", start: new Date(), end: new Date() });

      toast.success(`You have successfully added a new availability slot.`);
    } catch (error) {
      console.error("Error adding event:", error);
      console.log(error);

      toast.error(`There was an error adding the event. Please try again.`);
    }
  };

  return (
    <div className="flex flex-col px-3 my-3 mx-4 space-y-6">
      {/* <div className="w-full"> */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["week", "day", "agenda"]}
        view={view}
        culture="fr"
        onView={handleOnChangeView}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
        messages={messages}
      />
      {/* </div> */}

      {/* <div className="w-full"> */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Ajouter un créneau</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau créneau</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              placeholder="Titre"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <Input
              type="datetime-local"
              value={newEvent.start.toISOString().slice(0, 16)}
              onChange={(e) =>
                setNewEvent({ ...newEvent, start: new Date(e.target.value) })
              }
            />
            <Input
              type="datetime-local"
              value={newEvent.end.toISOString().slice(0, 16)}
              onChange={(e) =>
                setNewEvent({ ...newEvent, end: new Date(e.target.value) })
              }
            />
            <Button onClick={handleAddEvent} className="w-full">
              Ajouter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* </div> */}
    </div>
  );
};

export default BigCalendarContainer;
