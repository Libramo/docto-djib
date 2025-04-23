import React from "react";
import TabbedItems from "./TabbedItems";

const TabbedSection = () => {
  return (
    <section className="pb-12 pt-20 dark:bg-dark lg:py-[60px] ">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-20">
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Faites vous consulter par les meilleurs docteurs de la
                république.
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center max-w-6xl mx-auto">
          <TabbedItems />
        </div>
      </div>
    </section>
  );
};

export default TabbedSection;

// const ServiceCard = ({
//   icon,
//   title,
//   details,
// }: {
//   icon: ReactNode;
//   title: string;
//   details: string;
// }) => {
//   return (
//     <>
//       <div className="w-full px-4 md:w-1/2 lg:w-1/3">
//         <div className="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
//           <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
//             {icon}
//           </div>
//           <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
//             {title}
//           </h4>
//           <p className="text-body-color dark:text-dark-6">{details}</p>
//         </div>
//       </div>
//     </>
//   );
// };
