import { StethoscopeIcon, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DoctorCard = ({ isInPerson }: { isInPerson: boolean }) => {
  const timeStamps = [
    { time: "8:10", periode: "PM" },
    { time: "9:10", periode: "PM" },
    { time: "10:10", periode: "PM" },
    { time: "11:10", periode: "PM" },
    { time: "12:10", periode: "PM" },
  ];

  return (
    <div
      className="border border-gray-300 hover:border-gray-500 
    bg-white inline-flex flex-col px-3 py-6 duration-300"
    >
      <Link href="#">
        <h2 className="tracking-widest font-bold">Liban Yonis MD</h2>
        <p> Balbala, djibouti</p>
        <div className="flex items-center py-4">
          <div className="relative">
            <Image
              src="./globe.svg"
              height={207}
              width={243}
              alt=""
              className="w-24 h-24 rounded-full object-cover"
            />
            {isInPerson && (
              <div className="absolute bg-blue-200  p-1 rounded-full right-3 bottom-2">
                <Video />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 shrink-0">
            <p className="flex items-center ml-3">
              <StethoscopeIcon className="w-4 h-4 mr-2 " />
              <span>Family medecine</span>
            </p>
            <p className="bg-green-200 py-3 px-6 ml-3 uppercase">
              Disponible aujourd'hui
            </p>
          </div>
        </div>
      </Link>
      <div className="pt-3 border-t border-gray-400 ">
        <h3 className="flex gap-4 justify-between items-center">
          <span>Fri, Apr 25</span>$46 $36 with Sesame Plus
        </h3>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {timeStamps.map((item, i) => (
            <Link
              className="bg-blue-200 rounded-md px-2 text-sm py-1 flex  justify-center"
              key={i}
              href="#"
            >
              {item.time} {item.periode}
            </Link>
          ))}
          <Link className="text-blue-500" href="#">
            Plus...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
