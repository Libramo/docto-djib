import { RegisterForm } from "@/components/Forms/RegisterForm";
import React from "react";

const RegisterPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { role, plan } = await searchParams;
  return (
    <div className=" flex flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm role={role as string} plan={plan as string} />
      </div>
    </div>
  );
};

export default RegisterPage;
