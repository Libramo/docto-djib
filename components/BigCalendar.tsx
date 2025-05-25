"use client";

import { Calendar, dateFnsLocalizer, View, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fr } from "date-fns/locale";
import { useState } from "react";

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

const data = [
  {
    // id: 0,
    title: "training",
    start: new Date(2025, 5, 24, 9, 0, 0),
    end: new Date(2025, 5, 8, 13, 0, 0),
    // resourceId: 1,
  },
  {
    // id: 1,
    title: "late lunch",
    start: new Date(2025, 5, 8, 14, 0, 0),
    end: new Date(2025, 5, 8, 16, 30, 0),
    // resourceId: 2,
  },
  {
    // id: 2,
    title: "fight",
    start: new Date(2025, 4, 24, 8, 30, 0),
    end: new Date(2025, 4, 24, 12, 30, 0),
    // resourceId: 3,
  },
];

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
export const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["week", "day", "agenda"]}
      view={view}
      culture="fr"
      // style={{ height: "100%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
      messages={messages}
    />
  );
};
