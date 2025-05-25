import { getUserById } from "@/actions/user";
import VerifyTokenForm from "@/components/Frontend/VerifyToken";
import Image from "next/image";

export default async function VerifyAccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //Get a User
  const { id } = await params;
  const user = await getUserById(id);
  const userToken = user?.token;

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="p-6 flex items-center justify-center ">
        <VerifyTokenForm userToken={userToken} id={id} />
      </div>

      <div className="hidden lg:block sticky top-0 h-screen">
        <Image
          src="/doctor1.jpg"
          alt="Image du docteur"
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
