"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type searchBarProps = {
  query?: string;
};
export default function SearchBar({ query }: searchBarProps) {
  const handleQuery = async () => {
    alert(`query is ${query}`);
  };

  return (
    <form onSubmit={handleQuery}>
      <div className="w-full flex flex-row gap-5">
        <div className="flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Recherchez..."
            className="border-0 focus-visible:ring-0 shadow-none"
          />
        </div>

        <Button type="submit" variant="outline" size="lg">
          Recherchez
        </Button>
      </div>
    </form>
  );
}
