"use client";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const FixedBookButton = () => {
  return (
    <div className="fixed bottom-0 w-full shadow-2xl py-8 px-6 bg-white z-50  border-gray-50">
      <div className="max-w-4xl mx-auto gap-4 flex justify-between">
        <div className="w-full">
          <p className="font-bold text-xl">56$</p>
          <p className="text-sm font-semibold">Mardi 05 avril 2025</p>
        </div>

        <div className="w-full">
          <Button
            variant="outline"
            className="inline-flex px-4 items-center w-full py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-500 hover:text-slate-50"
          >
            <Plus className="w-5 h-5 mr-1" />
            Reserver créneau
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FixedBookButton;
