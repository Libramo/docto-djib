import { getUserById } from "@/actions/user";
import { auth } from "@/auth";
import { LoginForm } from "@/components/Forms/LoginForm";
import { prisma } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    // Fetch the user from the DB to check verification
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isVerfied: true }, // only fetch what’s needed
    });

    if (user && !user.isVerfied) {
      redirect(`/verify-account/${session.user.id}`); // Not verified
    }

    redirect("/dashboard"); // Verified and authenticated
  }

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
