import React from "react";
import ServiceCard from "./ServiceCard";

type ServiceProps = {
  title: string;
  image: string;
  slug: string;
};

const ServiceList = ({ data }: { data: ServiceProps[] }) => {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      {/* <ServiceCard />
      <ServiceCard />
      <ServiceCard />
      <ServiceCard /> */}

      {data.map((service, i) => {
        return <ServiceCard key={i} service={service} />;
      })}
    </div>
  );
};

export default ServiceList;
