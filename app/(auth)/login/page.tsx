import { auth } from "@/auth";
import { LoginForm } from "@/components/Forms/LoginForm";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard"); // if session exists, redirect to dashboard
  }

  return (
    // <div className="flex  flex-col items-center justify-center bg-muted p-6 md:p-10">
    // <div className="w-full max-w-sm md:max-w-3xl">
    <LoginForm />
    // </div>
    // </div>
  );
};

export default LoginPage;
