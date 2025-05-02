import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
import { StethoscopeIcon } from "lucide-react";

const TabbedItems = () => {
  const services = [
    {
      title: "Téléconsultation",
      image: "./globe.svg",
      slug: "teleconsultation",
    },
    {
      title: "Préscription à distance",
      image: "./globe.svg",
      slug: "tele",
    },
    {
      title: "Santé mentale",
      image: "./globe.svg",
      slug: "mental-health",
    },
    {
      title: "Téléconsultation",
      image: "./globe.svg",
      slug: "teleconsultation",
    },
  ];

  const tabs = [
    {
      title: "Services populaires",
      icon: <StethoscopeIcon />,
      component: <ServiceList data={services} />,
      content: [],
    },
    {
      title: "Médecins",
      component: <LinkCards />,
      content: ["Liban", "yonis"],
    },
    {
      title: "Specialités",
      component: <LinkCards />,
      content: [],
    },
    {
      title: "Symptomes",
      component: <LinkCards />,
      content: [],
    },
  ];

  return (
    <Tabs defaultValue={tabs[1].title} className="w-full">
      <TabsList className="flex flex-row">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.title} value={tab.title}>
            {tab.icon}
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.title} value={tab.title}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabbedItems;
