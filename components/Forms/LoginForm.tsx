"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { loginFormSchema } from "@/validations/zodSchemas";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  GithubIcon,
  InstagramIcon,
  LoaderPinwheel,
  OctagonAlertIcon,
  TwitterIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
// import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // console.log(values);

    try {
      setIsLoading(true);
      console.log("Attempting to sign in with credentials:", values);

      const loginData = await signIn("credentials", {
        ...values,
        redirect: false,
        redirectTo: "/dashboard",
      });

      console.log("SignIn response:", loginData);

      if (loginData?.error) {
        setIsLoading(false);
        toast.error("Sign-in error: Check your credentials");
        setShowNotification(true);
      } else {
        // Sign-in was successful
        setShowNotification(false);
        form.reset();
        setIsLoading(false);
        toast.success("Login Successful", { position: "top-center" });
        console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", loginData.url);
        // router.refresh();
        router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }
  return (
    <div className="max-w-xs m-auto w-full flex flex-col items-center">
      {showNotification && (
        <Alert variant="destructive" className="w-full">
          <OctagonAlertIcon className="h-4 w-4" />
          <AlertTitle>Erreur de connexion</AlertTitle>
          <AlertDescription>
            Une erreur est survenue lors de l&apos;authentification, verifiez
            votre mot de passe et votre email
          </AlertDescription>
        </Alert>
      )}
      <p className="mt-4 text-xl font-bold tracking-tight">Se connecter</p>
      <div className="mt-8 flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10"
        >
          <GithubIcon className="!h-[18px] !w-[18px]" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10"
        >
          <InstagramIcon className="!h-[18px] !w-[18px]" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10"
        >
          <TwitterIcon className="!h-[18px] !w-[18px]" />
        </Button>
      </div>
      <div className="my-7 w-full flex items-center justify-center overflow-hidden">
        <Separator />
        <span className="text-sm px-2">OR</span>
        <Separator />
      </div>

      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={cn("mt-4 w-full", "dark:text-gray-200")}
            disabled={isLoading}
          >
            {isLoading && (
              <span>
                <LoaderPinwheel className="animate-spin" />
              </span>
            )}
            {isLoading ? "Connexion en cours..." : "Se connecter."}
          </Button>
        </form>
      </Form>
      <div className="mt-5 space-y-5">
        <Link
          href="#"
          className="text-sm block underline text-muted-foreground text-center"
        >
          Mot de passe oublié?
        </Link>
        <p className="text-sm text-center">
          Vous n&apos;avez pas encore de compte ?
          <Link
            href="/register"
            className="ml-1 underline text-muted-foreground"
          >
            Créez-en un.
          </Link>
        </p>
      </div>
    </div>
  );
}
