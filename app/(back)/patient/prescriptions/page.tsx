import { getPrescriptions } from "@/actions/doctor";
import { auth } from "@/auth";
import { PrescriptionList } from "@/components/PrescriptionList";
import { useSession } from "@/components/providers/SessionContext";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

const PrescriptionsPage = async () => {
  const session = await auth();

  if (!session || session.user.role !== "USER") {
    redirect("/unauthorized");
  }

  const prescriptions = await getPrescriptions(session.user.id);
  return (
    <div className="max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-4">Mes ordonnances</h1>
      <PrescriptionList prescriptions={prescriptions} />
    </div>
  );
};

export default PrescriptionsPage;
