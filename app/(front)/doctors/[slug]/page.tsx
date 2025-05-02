import { DoctorDetails } from "@/components/DoctorDetails";
import FixedBookButton from "@/components/FixedBookButton";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const DoctorsPage = () => {
  return (
    <div className="bg-slate-200 py-24 min-h-screen">
      <div className="bg-white max-w-4xl border border-gray-50 mx-auto shadow-2xl">
        <div className="py-6 px-8">
          <div className="flex items-center justify-between">
            <div className="">
              <div className="flex flex-col">
                <h2>Liban</h2>
                <p>Cardio</p>
              </div>
              <p>SMI 1</p>
              <p>En physique</p>
            </div>

            <Image
              src="/doctor1.jpg"
              height={207}
              width={243}
              alt=""
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          <DoctorDetails />
        </div>
      </div>

      <div>
        <FixedBookButton />
      </div>
    </div>
  );
};

export default DoctorsPage;
