import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen">
      <div className="space-y-3 flex-col items-center justify-center">
        <div className="flex">
          <h1 className="text-6xl font-semibold py-10 mx-auto">
            Essayez gratuitement doctoDjib
          </h1>
        </div>
        <div className="flex">
          <Button className="mx-auto " variant={"outline"} asChild>
            <Link href={"/register?role=DOCTOR"}>
              Commencer avec la version gratuite
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
