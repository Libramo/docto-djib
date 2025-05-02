// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { HiSearchCircle } from "react-icons/hi";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 lg:py-0">
        <div className="my-auto">
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight">
            Recherchez par <br /> nom du médecin, <br /> spécialités...
          </h1>

          <div className="mt-12 flex items-center">
            {/* <Button size="lg" className="rounded-full text-base">
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="!h-5 !w-5" /> Watch Demo
            </Button> */}

            <div className="flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
              <HiSearchCircle className="h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder=""
                className="border-0 focus-visible:ring-0 shadow-none"
              />
            </div>
            <Button className="shadow rounded-br-full rounded-tr-full text-foreground">
              Subscribe
            </Button>
          </div>
        </div>

        {/* <div className="w-full aspect-video lg:aspect-auto lg:w-[1000px] lg:h-screen bg-accent rounded-xl lg:rounded-none" /> */}
      </div>
    </div>
  );
};

export default Hero;
