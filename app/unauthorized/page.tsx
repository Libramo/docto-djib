import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex mx-auto items-center justify-center">
      <div className="flex items-center justify-center gap-4 flex-col">
        <h1 className="text-3xl text-wrap">
          YOU ARE NOT AUTHORIZED TO SEE THIS PAGE
        </h1>
        <Link className="w-full" href="/">
          <Button className="w-full" variant={"outline"}>
            Accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
