import { Prescription, User } from "@prisma/client";

export type ServiceProps = {
  title: string;
  image: string;
  slug: string;
};

export type ExtendedPrescription = Prescription & {
  doctor: User;
};

// export type RegisterInputProps = {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
// };

// export type LoginInputProps = {
//   username: string;
//   password: string;
// };
