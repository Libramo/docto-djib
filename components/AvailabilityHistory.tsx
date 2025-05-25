import { Availability } from "@prisma/client";

export const AvailabilityHistory = ({ data }: { data: Availability[] }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Historique des créneaux</h3>
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.id} className="text-sm text-gray-700">
            🕐 {new Date(item.startDate).toLocaleString()} →{" "}
            {new Date(item.endDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
