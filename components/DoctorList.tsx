import React from "react";
import SectionHeading from "./SectionHeading";
import ToggleButton from "./ToggleButton";
import Link from "next/link";
// import DoctorCard from "./DoctorCard";
import DoctorsListCarousel from "./DoctorsCarousel";

const DoctorList = ({
  isInPerson,
  className,
}: {
  isInPerson?: boolean;
  className?: string;
}) => {
  const doctors = [
    {
      name: "Liban Yonis",
    },
    {
      name: "Liban Yonis",
    },
    {
      name: "Liban Yonis",
    },
  ];
  return (
    <div className={className}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={isInPerson ? "Consultation physique" : "Téléconsultation"}
        />

        <div className="py-4 flex items-center justify-between">
          <ToggleButton />
          <Link className="" href="#">
            Tout
          </Link>
        </div>
        <div className="py-6">
          <DoctorsListCarousel doctors={doctors} isInPerson={isInPerson} />
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
