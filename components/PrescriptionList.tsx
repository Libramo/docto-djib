"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useSession } from "./providers/SessionContext";
import { redirect } from "next/navigation";
import { Prescription } from "@prisma/client";
import { prisma } from "@/lib/db";
import { ExtendedPrescription } from "@/types/types";
import { getPrescriptions } from "@/actions/doctor";

type Props = {
  prescriptions: ExtendedPrescription[];
};

export const PrescriptionList = ({ prescriptions }: Props) => {
  return (
    <div className="space-y-4">
      {prescriptions.length !== 0 ? (
        prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="border p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-medium">
                Médecin : Dr. {prescription.doctor.name}
              </p>
              <p>
                Date : {format(new Date(prescription.createdAt), "dd MMM yyyy")}
              </p>
              <p>Durée : {prescription.durationDays} jours</p>
            </div>
            <a
              href={prescription.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Télécharger PDF
            </a>
          </div>
        ))
      ) : (
        <div>Aucune ordonnance pour le moment </div>
      )}
    </div>
  );
};
