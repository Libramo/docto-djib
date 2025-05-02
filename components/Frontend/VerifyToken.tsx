"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
import SubmitButton from "../Forms/SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { toast } from "react-toastify";
import { updateUserById } from "@/actions/user";

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
      setShowNotification(false);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {showNotification && (
          //   <Alert color="failure" icon={HiInformationCircle}>
          //     <span className="font-medium">Wrong Token!</span> Please Check the
          //     token and Enter again
          //   </Alert>

          <Alert variant="destructive">
            <HiInformationCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Verifiez le code et saisissez-le à nouveau
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Saisissez le code ici 👇.</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
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
                Entez le code à six chiffres qui vous a été envoyé par email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Button type="submit">Submit</Button> */}
        <SubmitButton
          title={isloading ? "Verification..." : "Verifier le code"}
          isLoading={isloading}
        />
      </form>
    </Form>
  );
}
