import React from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center flex-col justify-center px-4">
      <div className="text-center max-w-2xl flex flex-col">
        <h1 className="text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          Restez en bonne santé. <br />
          Trouver un{" "}
          <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
            docteur
          </span>{" "}
          <br />
          maintenant.
        </h1>
      </div>

      <div className="mt-12 flex items-center justify-center gap-4">
        <SearchBar query={""} />
      </div>
    </div>
  );
};

export default Hero;
