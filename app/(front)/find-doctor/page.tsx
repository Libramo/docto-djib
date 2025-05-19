// app/find-doctor/page.tsx
// import DoctorCard from "@/components/DoctorCard";
import { fetchDoctors } from "@/actions/doctor";
import DoctorCard from "@/components/DoctorCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ query?: string | string[] }>;
}

export default async function FindDoctorPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = Array.isArray(params.query) ? params.query[0] : params.query;

  if (!query || query.trim() === "") {
    redirect("/");
  }
  const results = await fetchDoctors(query);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex flex-col flex-grow">
        <div className="flex flex-col items-center flex-grow">
          <div className="flex gap-16 max-w-[1308px] w-full px-8 py-16 mx-auto justify-between">
            {/* Zone de contenu principal */}
            <Card className="flex-1 max-w-4xl">
              <CardContent className="space-y-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {`${results.length} ${results.length === 1 ? "résultat" : "résultats"}`}
                  </p>
                  <h1 className="text-xl font-semibold break-words leading-relaxed">
                    Résultats de la recherche pour « {query} »
                  </h1>
                </div>

                {results.length > 0 ? (
                  <div className="space-y-6">
                    {results.map((doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Aucun médecin trouvé pour « {query} ».
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Sidebar */}
            <Card className="hidden lg:flex flex-col w-[320px] h-[75vh] sticky top-[104px] p-4">
              <CardContent className="text-muted-foreground">
                Contenu du panneau latéral
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// {results.length > 0 ? (
//           results.map((res) => (
//             <div key={res.id} className="border p-4 rounded-lg">
//               <h3 className="font-bold">{res.name}</h3>
//               {res.doctorSpecialties?.length > 0 && (
//                 <p className="text-sm text-gray-600">
//                   Specialties:{" "}
//                   {res.doctorSpecialties
//                     .map((s) => s.specialty.name)
//                     .join(", ")}
//                 </p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No doctors found{query && ` for "${query}"`}.</p>
//         )}
