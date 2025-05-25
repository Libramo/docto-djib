"use server";
import EmailTemplate from "@/components/Emails/EmailTemplate";
import { prisma } from "@/lib/db";
import { generateToken } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import {
  ProfileFormValues,
  RegisterFormValues,
} from "@/validations/zodSchemas";
import { SupabaseClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

export async function createUser(formData: RegisterFormValues) {
  const resend = new Resend(process.env.RESEND_API_KEY as string);
  const { name, email, role, phone, password, doctorStatus, specialty } =
    formData;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        data: null,
        error: `Un utilisateur avec l' email : [ ${email} ]  existe déja dans la base de donnée`,
        status: 409,
      };
    }

    // Encrypt the Password =>bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //Generate Token
    const userToken = generateToken();

    let specialtyRecord = null;
    if (specialty) {
      specialtyRecord = await prisma.specialty.findUnique({
        where: { name: specialty }, // assumes label is unique
      });

      if (!specialtyRecord) {
        return {
          data: null,
          error: `La spécialité "${specialty}" est introuvable.`,
          status: 400,
        };
      }
    }

    const employmentStatusRecord =
      role === "DOCTOR" && doctorStatus
        ? await prisma.employmentStatus.findUnique({
            where: { name: doctorStatus }, // doctorStatus like 'liberal'
          })
        : null;

    if (role === "DOCTOR" && doctorStatus && !employmentStatusRecord) {
      throw new Error("Invalid doctor status.");
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role,
        token: userToken,
        ...(role === "DOCTOR" && specialty && doctorStatus
          ? {
              employmentStatusId: employmentStatusRecord?.id, // must be a string enum or reference in your schema
              doctorSpecialties: {
                create: [
                  {
                    specialty: {
                      connect: {
                        id: specialtyRecord?.id,
                      },
                    },
                  },
                ],
              },
            }
          : {}),
      },

      include: {
        doctorSpecialties: true,
      },
    });

    //Send an Email with the Token on the link as a search param
    const token = newUser.token;

    // const userId = newUser.id;
    const linkText = "Verifiez votre compte";
    const message =
      "Merci de vous être inscrit. Pour finaliser votre inscription, veuillez entrer ce code à 6 chiffres sur notre site :";

    const sendMail = await resend.emails.send({
      from: "Docto-Djib <contact@blyanalytics.com>",
      to: email,
      subject: "Verication de votre adresse email",
      react: EmailTemplate({
        username: name.trim().split(" ")[0],
        token,
        linkText,
        message,
      }),
    });

    console.log(token);
    console.log(sendMail);
    console.log(newUser);

    return {
      data: newUser,
      error: null,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
}

export async function getUserById(id: string) {
  if (id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function updateUserById(userId: string) {
  if (userId) {
    try {
      const updateUser = prisma.user.update({
        where: { id: userId },
        data: {
          isVerfied: true,
        },
      });
      return updateUser;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function updateUserProfile(
  userId: string,
  data: ProfileFormValues
) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined, // on ignore la mise à jour si vide
    },
  });

  revalidatePath("/profile");
}

export async function uploadAvatar(userId: string, file: File) {
  const filePath = `/patients/${userId}.png`;

  const supabase = await createClient();

  const { error } = await supabase.storage
    .from("avatar")
    .upload(filePath, file, {
      upsert: true, // overwrite if exists
      contentType: file.type,
    });

  if (error) throw error;

  // Get public URL (or use signed URL if private)
  const { data } = supabase.storage.from("avatar").getPublicUrl(filePath);
  return data.publicUrl;
}
