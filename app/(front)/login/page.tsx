import { LoginForm } from "@/components/Forms/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="mt-20 flex  flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
