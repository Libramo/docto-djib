import React from "react";

const SectionHeading = ({ title }: { title?: string }) => {
  return (
    <div className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
      {title}
    </div>
  );
};

export default SectionHeading;
