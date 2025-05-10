import { getSpecialties } from "@/actions/doctor";
import { RegisterForm } from "@/components/Forms/RegisterForm";
import { UserRole } from "@prisma/client";
import Image from "next/image";
import React from "react";

const RegisterPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const specialties = await getSpecialties();
  const { role } = await searchParams;
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Registration Form */}
      <div className="p-6 flex items-center justify-center">
        <RegisterForm
          userRole={role as UserRole}
          specialties={specialties?.map((s) => s.name) as string[]}
        />
      </div>

      {/* Right: Sticky and Stretched Image */}
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
};

export default RegisterPage;
