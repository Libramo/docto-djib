"use client";
import React from "react";
import { Button } from "./ui/button";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";

const AuthChoice = () => {
  const router = useRouter();
  return (
    <div className="rounded-xl p-10 shadow-lg  w-full max-w-md text-center space-y-6">
      <h1 className="text-2xl text-balance font-semibold">
        Inscrivez-vous ou connectez-vous
      </h1>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">
            Nouveau sur{" "}
            <span className="hidden font-extrabold tracking-widest lg:inline-block mr-4 items-center gap-2 lg:mr-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              {siteConfig.name} ?
            </span>
          </p>
          <Button className="w-full" onClick={() => router.push("/register")}>
            S&apos;inscrire
          </Button>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">
            J&apos;ai déjà un compte{" "}
            <span className="hidden font-extrabold tracking-widest lg:inline-block mr-4 items-center gap-2 lg:mr-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </p>
          <Button
            variant={"outline"}
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Se connecter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthChoice;
