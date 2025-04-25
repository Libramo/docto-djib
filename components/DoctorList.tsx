import React from "react";
import SectionHeading from "./SectionHeading";
import ToggleButton from "./ToggleButton";
import Link from "next/link";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {
  return (
    <div className="bg-pink-100 py-8 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Teleconsultation" />

        <div className="py-4 flex items-center justify-between">
          <ToggleButton />
          <Link className="" href="#">
            See all
          </Link>
        </div>
        <div className="py-6">
          <DoctorCard isInPerson={false} />
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
