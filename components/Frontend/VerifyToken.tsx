"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { REGEXP_ONLY_DIGITS } from "input-otp";

// import { Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  // InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Alert, AlertDescription } from "../ui/alert";
import { toast } from "react-toastify";
import { updateUserById } from "@/actions/user";
import { Button } from "../ui/button";

const FormSchema = z.object({
  token: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function VerifyTokenForm({
  userToken,
  id,
}: {
  userToken: number | undefined;
  id: string;
}) {
  const [isloading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const userInputToken = parseInt(data.token);
    console.log(data.token);
    console.log(userToken);

    if (userInputToken === userToken) {
      //Update User
      try {
        await updateUserById(id);
        setIsLoading(false);
        toast.success("Votre compte a été verifié");
        router.push("/login");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      setShowNotification(true);
      setIsLoading(false);
    }
    console.log(data);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {showNotification && (
            <Alert variant="destructive" className="mb-12">
              <HiInformationCircle />
              <AlertDescription>
                Votre code n&apos;est pas le bon. Verifiez le et saisissez-le à
                nouveau.
              </AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase mb-12 text-2xl justify-center">
                  Saisissez le code ici 👇.
                </FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    className="w-full"
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Entrez le code à six chiffres qui vous a été envoyé par email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full mt-12" type="submit" disabled={isloading}>
            {isloading ? "Verification..." : "Verifier le code"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
