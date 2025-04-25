"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { FcGoogle } from "react-icons/fc";
import { registerFormSchema } from "@/validations/zodSchemas";
import SubmitButton from "./SubmitButton";
import { useState } from "react";

import { createUser } from "@/actions/user";
import { toast } from "react-toastify";
import { UserRole } from "@prisma/client";

type RegisterFormProps = React.ComponentProps<"div"> & {
  userRole?: UserRole; // or `UserRole` if you're using an enum
};

export function RegisterForm({
  userRole = "USER",
  className,
  ...props
}: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: userRole,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // console.log(values);

    setIsLoading(true);

    try {
      const user = await createUser(values);
      if (user && user.status === 200) {
        console.log("User Created successfully");
        form.reset();
        setIsLoading(false);
        toast.success("User Created successfully");
        console.log(user.data);
      } else {
        console.log(user.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Docto djib</h1>
                  <p className="text-balance text-muted-foreground text-sm">
                    Veuillez renseigner les informations suivantes
                  </p>
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom complet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="Téléphone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Mot de passe</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <SubmitButton
                  title="S'inscrire"
                  buttonType="submit"
                  // isLoading
                />

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Ou connectez vous avec
                  </span>
                </div>
                <div>
                  <Button variant="outline" className="w-full">
                    <FcGoogle />
                    <span className="sr-only">Login with Google</span>
                  </Button>
                </div>
                <div className="text-center text-xs">
                  Vous avez déja un compte ?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 text-balance text-center text-xs"
                  >
                    Connectez-vous
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="/globe.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
