"use client";

import { useState } from "react";
import { useSession } from "./providers/SessionContext";
import { redirect } from "next/navigation";

export function DoctorPatientsList() {
  // En vrai cas, tu récupèrerais les patients via une API ou prop
  const [patients, setPatients] = useState([
    {
      id: "1",
      name: "Ali Mohamed",
      age: 45,
      lastAppointment: "2025-05-10",
      status: "Actif",
    },
    {
      id: "2",
      name: "Fatouma Ibrahim",
      age: 33,
      lastAppointment: "2025-04-22",
      status: "Inactif",
    },
  ]);

  const session = useSession();

  console.log(
    "YOUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU,",
    session?.user.role
  );

  if (!session?.user || session.user.role !== "DOCTOR") {
    redirect("/unauthorized");
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Mes patients</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un patient..."
        className="w-full px-4 py-2 border rounded-md"
      />

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Âge</th>
              <th className="px-4 py-2">Dernier RDV</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-t text-sm">
                <td className="px-4 py-2">{patient.name}</td>
                <td className="px-4 py-2">{patient.age}</td>
                <td className="px-4 py-2">{patient.lastAppointment}</td>
                <td className="px-4 py-2">{patient.status}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline">
                    Consulter le dossier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
