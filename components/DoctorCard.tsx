import { StethoscopeIcon, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { DoctorTimeSlots } from "./DoctorTimeSlots";
import { Availability, User } from "@prisma/client";
import { Button } from "./ui/button";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
// import { AvailableSlotsList } from "./AvailableSlotList";
// import AvailabilityCalendar from "./AvailabilityCalendar";

type DoctorWithDetails = User & {
  doctorSpecialties: {
    specialty: {
      name: string;
    };
  }[];
  availabilities: Availability[];
};

interface Props {
  doctor: DoctorWithDetails;
}

const DoctorCard = ({ doctor }: Props) => {
  const isAvailable = doctor.availabilities?.some(
    (a) => new Date(a.startDate) > new Date() && !a.isBooked
  );

  return (
    <Card key={doctor.id} className="border rounded-lg shadow-sm p-6">
      <div className="grid md:grid-cols-8 gap-6">
        {/* Left side: Image, name, specialty, address, status */}
        <div className="md:col-span-3 flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={doctor.image || ""}
                alt={doctor.name as string}
              />
              <AvatarFallback>{doctor.name?.[0]}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
          </div>

          {doctor.doctorSpecialties?.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {doctor.doctorSpecialties.map((s) => s.specialty.name).join(", ")}
            </p>
          )}
          <div className="text-sm text-muted-foreground mt-2 space-y-1">
            {doctor.address && <p>{doctor.address}</p>}
            <Badge variant={isAvailable ? "default" : "outline"}>
              {isAvailable ? "Disponible" : "Indisponible"}
            </Badge>
          </div>
          <div className="mt-auto">
            <Button className="w-full mt-auto uppercase">
              prendre rendez-vous
            </Button>
          </div>
        </div>

        {/* Right side: available appointments */}
        <div className="md:col-span-5">
          <p className="text-sm text-muted-foreground mb-2 font-medium">
            Prochaines disponibilités :
          </p>
          {doctor.availabilities?.length ? (
            <AvailabilityCalendar availabilities={doctor.availabilities} />
          ) : (
            <p className="text-sm italic text-gray-400">Aucune disponibilité</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;
