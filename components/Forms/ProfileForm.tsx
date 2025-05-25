"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProfileFormValues, profileSchema } from "@/validations/zodSchemas";
import { toast } from "react-toastify";
import { updateUserProfile, uploadAvatar } from "@/actions/user";
import { User } from "@prisma/client";
import Image from "next/image";

export type ProfileFormProps = {
  userId: string;
  user: User;
};

const formatDate = (date: Date | null): string => {
  if (!date) return "";
  const isoString = date.toISOString();
  return isoString.slice(0, 10);
};

export default function ProfileForm({ user, userId }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.image || null
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      gender: user.gender || undefined,
      dateOfBirth: formatDate(user.dateOfBirth),
    },
  });

  console.log("YEEEEEEEEEEEEEEEEEEEEEE", user.name);

  const onSubmit = async (values: ProfileFormValues) => {
    console.log("FIRST", values);

    try {
      let imageUrl = user.image || "";

      if (file) {
        imageUrl = await uploadAvatar(userId, file);
      }

      await updateUserProfile(userId, { ...values, image: imageUrl });
      console.log("NOOOOOOOOOOOOO", { ...values, image: imageUrl });

      toast.success("Profile mis à jour !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur : Impossible de mettre à jour le profil");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} />
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
                  disabled
                  type="email"
                  placeholder="Votre email"
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
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="Numéro de téléphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MALE">Homme</SelectItem>
                  <SelectItem value="FEMALE">Femme</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de naissance</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Image</FormLabel>
          {previewUrl && (
            <div className="mb-4">
              <Image
                src={previewUrl}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-full"
              />
            </div>
          )}
          <FormControl>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Mise à jour..." : "Mettre à jour"}
        </Button>
      </form>
    </Form>
  );
}
