"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type SearchBarProps = {
  query?: string;
};
export default function SearchBar({ query = "" }: SearchBarProps) {
  const [search, setSearch] = useState(query);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = search.trim();
    if (trimmed) {
      router.push(`/find-doctor?query=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex flex-row gap-5">
        <div className="flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Recherchez..."
            className="border-0 focus-visible:ring-0 shadow-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button type="submit" variant="outline" size="lg">
          Recherchez
        </Button>
      </div>
    </form>
  );
}
