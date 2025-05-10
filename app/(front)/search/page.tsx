// app/search/page.tsx
// import { searchDoctors } from "@/lib/searchDoctors";

// import { searchDoctors } from "@/actions/user";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const results = await searchDoctors(searchParams.q || "");

  //   console.log(q);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {results.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <ul className="space-y-3">
          {results.map((doc) => (
            <li key={doc.id} className="p-4 rounded-xl shadow bg-white">
              <div className="font-semibold text-lg">{doc.name}</div>
              {/* <div className="text-muted-foreground">{doc.}</div> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
