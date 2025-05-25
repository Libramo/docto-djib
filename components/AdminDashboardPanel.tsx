// components/dashboard/AdminDashboardPanel.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, Users, CalendarCheck, UserPlus, Bell } from "lucide-react";
import { useSession } from "./providers/SessionContext";
import { redirect } from "next/navigation";

export const AdminDashboardPanel = () => {
  const session = useSession();
  const user = session?.user;

  if (!user || user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Users className="text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Médecins</p>
              <p className="text-lg font-semibold">12</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Users className="text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Patients</p>
              <p className="text-lg font-semibold">85</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <CalendarCheck className="text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">RDV en attente</p>
              <p className="text-lg font-semibold">6</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Bell className="text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Notifications</p>
              <p className="text-lg font-semibold">2</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="default">
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter un médecin
        </Button>
        <Button variant="secondary">
          <BarChart2 className="mr-2 h-4 w-4" />
          Voir les logs
        </Button>
      </div>

      {/* Exemple de graphique ou d’activité */}
      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">Activité récente</h2>
          <p className="text-sm text-muted-foreground">
            (Zone réservée pour un graphique ou un tableau d’activité à venir)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
