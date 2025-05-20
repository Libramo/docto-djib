import { auth } from "@/auth";
import { LoginForm } from "@/components/Forms/LoginForm";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  // const session = await auth();

  // if (session?.user) {
  //   redirect("/dashboard"); // if session exists, redirect to dashboard
  // }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="p-6 flex items-center justify-center">
        <LoginForm />
      </div>

      <div className="hidden lg:block sticky top-0 h-screen">
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

export default LoginPage;
