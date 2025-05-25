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
import { registerFormSchema } from "@/validations/zodSchemas";
import { useState } from "react";

import { createUser } from "@/actions/user";
import { toast } from "react-toastify";
import { UserRole } from "@prisma/client";
// import Image from "next/image";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { FaGoogle, FaStethoscope } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import CustomRadioGroup from "../CustomRadioGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// import { useSearchParams } from "next/navigation";

type RegisterFormProps = React.ComponentProps<"div"> & {
  userRole?: UserRole; // or `UserRole` if you're using an enum
  specialties: string[];
};

export function RegisterForm({
  userRole = "USER",
  specialties,
}: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: userRole,
      doctorStatus: "employed",
      specialty: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values);
    setIsLoading(true);

    try {
      const user = await createUser(values);
      if (user && user.status === 200) {
        console.log("User Created successfully");
        form.reset();
        setIsLoading(false);
        toast.success("User Created successfully");
        console.log(user.data);
        router.push(`/verify-account/${user.data?.id}`);
      } else {
        console.log(user.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-md m-auto w-full flex flex-col items-center">
      <p className="mt-4 text-xl font-bold tracking-tight">Inscription</p>
      {userRole === "DOCTOR" && (
        <div className="flex items-center justify-center mt-4">
          <p className="mb-4 text-sm text-center text-balance">
            Bienvenu <span className="font-semibold">Docteur</span>, remplissez
            les champs ci-dessous pour créer votre compte
          </p>
        </div>
      )}

      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nom complet"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Télépone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Téléphone"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {userRole === "DOCTOR" && (
            <>
              <FormField
                control={form.control}
                name="doctorStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <FormControl>
                      <CustomRadioGroup
                        options={[
                          { label: "Libéral(e)", value: "liberal" },
                          { label: "Salarié", value: "employed" },
                        ]}
                        onChange={field.onChange}
                        value={field.value as string}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spécialité</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisissez votre spécialité" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="grid-cols-2">
                        {specialties?.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant={"default"} className="mt-4 w-full">
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Création de compte..." : "Créer mon compte"}
          </Button>

          <div className="my-7 w-full flex items-center justify-center overflow-hidden">
            <Separator />
            <span className="text-sm px-2">OU</span>
            <Separator />
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full h-10 w-10"
            >
              <FaGoogle className="!h-[18px] !w-[18px]" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full h-10 w-10"
            >
              <FaGoogle className="!h-[18px] !w-[18px]" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full h-10 w-10"
            >
              <FaGoogle className="!h-[18px] !w-[18px]" />
            </Button>
          </div>
        </form>
      </Form>

      <p className="mt-5 text-sm text-center">
        Vous avez déja un compte ?
        <Link href="/login" className="ml-1 underline text-muted-foreground">
          Connectez-vous
        </Link>
      </p>
    </div>
  );
}
