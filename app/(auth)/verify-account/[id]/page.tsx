// import { getUserById } from "@/actions/users";
// import VerifyTokenForm from "@/components/VerifyTokenForm";

import { getUserById } from "@/actions/user";
import VerifyTokenForm from "@/components/Frontend/VerifyToken";
import Image from "next/image";

export default async function VerifyAccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //Get a User
  const { id } = await params;
  const user = await getUserById(id);
  const userToken = user?.token;

  return (
    // <section className="bg-gray-50 dark:bg-gray-900">
    //   <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //     <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //       <div className="p-6 space-y-4 md:space-y-6 sm:p-8 items-center justify-center">
    //         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
    //           Verifier votre compte
    //         </h1>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="p-6 flex items-center justify-center ">
        <VerifyTokenForm userToken={userToken} id={id} />
      </div>

      <div className="hidden lg:block sticky top-0 h-screen bg-red-500">
        <Image
          src="/doctor1.jpg"
          alt="Image du docteur"
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
