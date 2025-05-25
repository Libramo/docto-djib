// components/dashboard/DashboardOverview.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MessageSquare, Calendar, Users, Stethoscope } from "lucide-react";
import { useSession } from "./providers/SessionContext";

export function DashboardOverview() {
  const session = useSession();
  const user = session?.user;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Bienvenue, {user.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Carte des RDV */}
        <Card>
          <CardHeader>
            <CardTitle>Prochains rendez-vous</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Vous avez 3 rendez-vous cette semaine.</p>
            <Link href="/doctor/appointments" className="text-sm">
              Voir tous les rendez-vous
            </Link>
          </CardContent>
        </Card>

        {/* Carte des messages */}
        <Card>
          <CardHeader>
            <CardTitle>Messages récents</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-items-end">
            <p>2 nouveaux messages non lus.</p>
            <Link href="/messages" className="text-sm">
              Accéder à la messagerie
            </Link>
          </CardContent>
        </Card>

        {/* Carte de navigation (personnalisée selon le rôle) */}
        {user.role === "ADMIN" && (
          <Card>
            <CardHeader>
              <CardTitle>Panneau Administrateur</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Gérer les utilisateurs et le système.</p>
              <Link href="/admin/dashboard" className="text-sm text-blue-600">
                Accéder au panneau
              </Link>
            </CardContent>
          </Card>
        )}

        {user.role === "DOCTOR" && (
          <Card>
            <CardHeader>
              <CardTitle>Mes Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Consultez les dossiers de vos patients.</p>
              <Link href="/doctor/patients" className="text-sm text-blue-600">
                Voir les patients
              </Link>
            </CardContent>
          </Card>
        )}

        {user.role === "USER" && (
          <Card>
            <CardHeader>
              <CardTitle>Mon Historique Médical</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Consultez vos prescriptions et vos dossiers.</p>
              <Link href="/medical-history" className="text-sm text-blue-600">
                Voir l&apos;historique
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
