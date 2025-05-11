// app/find-doctor/page.tsx
import DoctorCard from "@/components/DoctorCard";
import { prisma } from "@/lib/db";

interface Props {
  searchParams: { query?: string };
}

export default async function FindDoctorPage({ searchParams }: Props) {
  const query = searchParams.query || "";

  try {
    const doctors = await prisma.user.findMany({
      where: {
        role: "DOCTOR",
        doctorSpecialties: {
          some: {
            specialty: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        },
      },
      include: {
        doctorSpecialties: {
          include: {
            specialty: true,
          },
        },
      },
    });

    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Résultats pour « {query} »
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              //   <DoctorCard key={doctor.id} doctor={doctor} />
              <div key={doctor.id}>{doctor.name}</div>
            ))
          ) : (
            <p>Aucun médecin trouvé.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des médecins :", error);
    return (
      <div className="p-4 text-red-600">
        Une erreur est survenue lors de la recherche. Veuillez réessayer plus
        tard.
      </div>
    );
  }
}
