"use client";

import { useState } from "react";
import { useSession } from "./providers/SessionContext";
import { redirect } from "next/navigation";

export function DoctorAppointments() {
  // Exemple statique de RDV (remplace par une vraie source API plus tard)
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      patientName: "Ahmed Youssouf",
      date: "2025-05-20",
      time: "10:30",
      status: "À venir",
    },
    {
      id: "2",
      patientName: "Mariam Ali",
      date: "2025-05-10",
      time: "15:00",
      status: "Passé",
    },
  ]);

  const session = useSession();

  if (!session?.user || session.user.role !== "DOCTOR") {
    redirect("/unauthorized");
  }
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Mes rendez-vous</h1>

      {/* Liste des rendez-vous */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-4 py-2">Patient</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Heure</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((rdv) => (
              <tr key={rdv.id} className="border-t text-sm">
                <td className="px-4 py-2">{rdv.patientName}</td>
                <td className="px-4 py-2">{rdv.date}</td>
                <td className="px-4 py-2">{rdv.time}</td>
                <td className="px-4 py-2">{rdv.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-600 hover:underline">
                    Voir profil
                  </button>
                  <button className="text-green-600 hover:underline">
                    Confirmer
                  </button>
                  <button className="text-red-600 hover:underline">
                    Annuler
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔜 Intégration future : calendrier interactif */}
      {/* Ex: FullCalendar.io, react-calendar */}
    </div>
  );
}
